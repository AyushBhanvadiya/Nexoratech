import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { pool } from './db.mjs';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('Set a JWT_SECRET of at least 32 characters in .env.');
}
const app = express();
const port = Number(process.env.API_PORT || 3001);
const origin = process.env.WEB_ORIGIN || 'http://localhost:5173';
const uploads = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/uploads');
fs.mkdirSync(uploads, { recursive: true });
app.disable('x-powered-by');
app.use(cors({ origin }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploads, { maxAge: '1d' }));

const kinds = new Set(['settings','theme','page','service','subservice','blog','case','media']);
const safeKey = (s) => typeof s === 'string' && s.length > 0 && s.length < 240 && /^[\w/.-]+$/.test(s) && !s.includes('..');
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

function auth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch { res.status(401).json({ error: 'Please sign in again.' }); }
}

app.get('/api/health', wrap(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true, database: 'connected' });
}));

app.get('/api/public', wrap(async (_req, res) => {
  const { rows } = await pool.query('SELECT kind, key, data, updated_at FROM cms_documents ORDER BY kind, key');
  res.set('Cache-Control', 'no-store').json(rows);
}));

const failed = new Map();
app.post('/api/admin/login', wrap(async (req, res) => {
  const email = String(req.body?.email || '').toLowerCase().trim();
  const password = String(req.body?.password || '');
  const attempt = failed.get(req.ip);
  if (attempt && attempt.count >= 8 && Date.now() - attempt.since < 15 * 60_000) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
  const { rows } = await pool.query('SELECT id, email, password_hash FROM admin_users WHERE email=$1', [email]);
  const valid = rows[0] && await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) {
    const current = attempt && Date.now() - attempt.since < 15 * 60_000 ? attempt : { count: 0, since: Date.now() };
    failed.set(req.ip, { ...current, count: current.count + 1 });
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  failed.delete(req.ip);
  const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, process.env.JWT_SECRET, { expiresIn: '8h', algorithm: 'HS256' });
  res.json({ token, email: rows[0].email });
}));

app.get('/api/admin/overview', auth, wrap(async (_req, res) => {
  const [docs, leads] = await Promise.all([
    pool.query('SELECT kind, COUNT(*)::int AS count FROM cms_documents GROUP BY kind'),
    pool.query(`SELECT date_trunc('day', created_at)::date AS day, COUNT(*)::int AS count FROM leads WHERE created_at >= NOW()-INTERVAL '30 days' GROUP BY 1 ORDER BY 1`),
  ]);
  res.json({ documents: docs.rows, leadsByDay: leads.rows });
}));

app.post('/api/admin/seed', auth, wrap(async (req, res) => {
  const input = req.body?.documents;
  if (!Array.isArray(input) || input.length > 150) return res.status(400).json({ error: 'Invalid initial documents.' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const d of input) {
      if (!kinds.has(d.kind) || !safeKey(d.key) || !d.data || typeof d.data !== 'object') throw new Error('Invalid seed document.');
      await client.query('INSERT INTO cms_documents(kind,key,data) VALUES($1,$2,$3::jsonb) ON CONFLICT DO NOTHING', [d.kind, d.key, JSON.stringify(d.data)]);
    }
    await client.query('COMMIT');
    res.json({ ok: true, count: input.length });
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
}));

app.put('/api/admin/documents/:kind', auth, wrap(async (req, res) => {
  const { kind } = req.params;
  const { key } = req.body || {};
  if (!kinds.has(kind) || !safeKey(key) || !req.body?.data || typeof req.body.data !== 'object' || Array.isArray(req.body.data)) {
    return res.status(400).json({ error: 'Invalid document or data.' });
  }
  const { rows } = await pool.query(
    `INSERT INTO cms_documents(kind,key,data) VALUES($1,$2,$3::jsonb)
     ON CONFLICT(kind,key) DO UPDATE SET data=EXCLUDED.data, updated_at=NOW()
     RETURNING kind,key,data,updated_at`, [kind, key, JSON.stringify(req.body.data)]
  );
  res.json(rows[0]);
}));
app.delete('/api/admin/documents/:kind', auth, wrap(async (req, res) => {
  if (!kinds.has(req.params.kind) || !safeKey(req.query.key)) return res.status(400).json({ error: 'Invalid document.' });
  await pool.query('DELETE FROM cms_documents WHERE kind=$1 AND key=$2', [req.params.kind, req.query.key]);
  res.status(204).end();
}));

const storage = multer.diskStorage({ destination: uploads, filename: (_req, file, cb) => cb(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`) });
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)) });
app.post('/api/admin/upload', auth, upload.single('image'), wrap(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Choose a JPG, PNG, WebP or AVIF image up to 5 MB.' });
  const url = `/uploads/${req.file.filename}`;
  const data = { name: req.body.name || req.file.originalname, url, alt: req.body.alt || '', size: req.file.size };
  await pool.query('INSERT INTO cms_documents(kind,key,data) VALUES($1,$2,$3::jsonb)', ['media', req.file.filename, JSON.stringify(data)]);
  res.status(201).json({ kind: 'media', key: req.file.filename, data });
}));

app.post('/api/leads', wrap(async (req, res) => {
  const { name, email, phone, company, service, budget, message } = req.body || {};
  if (!name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '') || !message?.trim() || String(message).length > 5000) return res.status(400).json({ error: 'Name, valid email and message are required.' });
  await pool.query('INSERT INTO leads(name,email,phone,company,service,budget,message) VALUES($1,$2,$3,$4,$5,$6,$7)', [name.trim(), email.trim(), phone || '', company || '', service || '', budget || '', message.trim()]);
  res.status(201).json({ ok: true });
}));
app.get('/api/admin/leads', auth, wrap(async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 250');
  res.json(rows);
}));
app.patch('/api/admin/leads/:id', auth, wrap(async (req, res) => {
  const status = req.body?.status;
  if (!['new','in-progress','closed'].includes(status)) return res.status(400).json({ error: 'Invalid status.' });
  const { rows } = await pool.query('UPDATE leads SET status=$1 WHERE id=$2 RETURNING *', [status, req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Lead not found.' });
  res.json(rows[0]);
}));

app.get('/sitemap.xml', wrap(async (_req, res) => {
  const domain = 'https://www.nexoratech.com';
  const xml = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml'), 'utf8');
  const urls = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const { rows } = await pool.query("SELECT kind, key, data FROM cms_documents WHERE kind IN ('service','subservice','blog','case')");
  for (const row of rows) {
    if (row.data.archived) {
      const prefix = row.kind === 'service' || row.kind === 'subservice' ? '/services/' : row.kind === 'blog' ? '/blog/' : '/case-studies/';
      urls.delete(domain + prefix + row.key);
      continue;
    }
    const prefix = row.kind === 'service' || row.kind === 'subservice' ? '/services/' : row.kind === 'blog' ? '/blog/' : '/case-studies/';
    urls.add(domain + prefix + row.key);
  }
  const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map((url) => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>`);
}));

// After `npm run build`, the API can also host the compiled single-file site on the same port.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
if (fs.existsSync(path.join(dist, 'index.html'))) {
  app.use(express.static(dist));
  app.use((req, res, next) => req.path.startsWith('/api/') ? next() : res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.message });
  res.status(500).json({ error: 'Server error. Please try again.' });
});
app.listen(port, '127.0.0.1', () => console.log(`Nexoratech API listening at http://localhost:${port}`));