import bcrypt from 'bcryptjs';
import { pool } from './db.mjs';

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
  console.error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env first.');
  process.exit(1);
}

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS cms_documents (
      kind TEXT NOT NULL,
      key TEXT NOT NULL,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY(kind, key),
      CONSTRAINT valid_kind CHECK(kind IN ('settings','theme','page','service','subservice','blog','case','media'))
    );
    CREATE TABLE IF NOT EXISTS leads (
      id BIGINT GENERATED ALWAYS AS ID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT,
      budget TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await pool.query(
    `INSERT INTO admin_users(email,password_hash) VALUES($1,$2)
     ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash`,
    [process.env.ADMIN_EMAIL.toLowerCase().trim(), hash]
  );
  console.log('PostgreSQL tables ready. Admin login:', process.env.ADMIN_EMAIL);
} catch (error) {
  console.error('Database setup failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}