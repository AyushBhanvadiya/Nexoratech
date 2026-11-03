import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { LayoutDashboard, Layers3, FileText, Newspaper, BriefcaseBusiness, Image, Palette as PaletteIcon, Settings2, Inbox, LogOut, Plus, Search, Save, Trash2, ExternalLink, Menu, X, AlertTriangle, UploadCloud, Eye, Code2, ChevronRight } from "lucide-react";
import { API_BASE, getBaseline, useCms, type CmsDoc, type PageDoc } from "../cms";
import { DEFAULT_PALETTE, setPalette, type Palette } from "../theme";
import { SERVICES } from "../data/services";
import { BLOGS, CASES } from "../data/content";
import { SITE, TESTIMONIALS, TRUST_BADGES, CLIENTS, TEAM } from "../data/site";

type View = "overview" | "pages" | "services" | "blogs" | "cases" | "media" | "appearance" | "identity" | "inbox";
type Item = { kind: string; key: string; label: string; data: Record<string, any> };
type Lead = { id: number; name: string; email: string; phone: string; company: string; service: string; budget: string; message: string; status: string; created_at: string };
const SIDEBAR: { id: View; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "WORKSPACE" },
  { id: "pages", label: "Page Content & SEO", icon: FileText, group: "CONTENT" },
  { id: "services", label: "Services", icon: Layers3, group: "CONTENT" },
  { id: "blogs", label: "Blog Posts", icon: Newspaper, group: "CONTENT" },
  { id: "cases", label: "Case Studies", icon: BriefcaseBusiness, group: "CONTENT" },
  { id: "media", label: "Media Library", icon: Image, group: "ASSETS" },
  { id: "appearance", label: "Colors & Fonts", icon: PaletteIcon, group: "APPEARANCE" },
  { id: "identity", label: "Site Identity", icon: Settings2, group: "SETTINGS" },
  { id: "inbox", label: "Enquiries", icon: Inbox, group: "SETTINGS" },
];
const FIXED_PAGES = [
  ["/", "Home"], ["/services", "Services overview"], ["/about-us", "About us"], ["/contact-us", "Contact us"],
  ["/blog", "Blog overview"], ["/case-studies", "Case studies overview"], ["/privacy-policy", "Privacy policy"],
  ["/terms-of-service", "Terms of service"], ["/sitemap", "HTML sitemap"],
];
const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";
const box = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const token = () => sessionStorage.getItem("nexoratech-token");
const authHeaders = () => ({ Authorization: `Bearer ${token()}` });

function PageTitle({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-1 text-xs font-bold uppercase tracking-[.2em] text-indigo-600">{eyebrow}</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1><p className="mt-1 text-sm text-slate-500">{detail}</p></div>{action}</div>;
}
function Button({ children, onClick, kind = "primary", disabled, type = "button" }: { children: ReactNode; onClick?: () => void; kind?: "primary" | "secondary" | "danger"; disabled?: boolean; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${kind === "primary" ? "bg-indigo-600 text-white hover:bg-indigo-700" : kind === "danger" ? "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{children}</button>;
}
function Field({ name, value, onChange, multiline }: { name: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return <label className="block"><span className={labelClass}>{name}</span>{multiline ? <textarea className={inputClass} rows={4} value={value} onChange={(e) => onChange(e.target.value)} /> : <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />}</label>;
}
function JsonField({ name, value, onChange }: { name: string; value: any; onChange: (v: any) => void }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value ?? [], null, 2));
  const [error, setError] = useState("");
  useEffect(() => { setDraft(JSON.stringify(value ?? [], null, 2)); setError(""); }, [name]);
  return <label className="block"><span className={labelClass}>{name} <span className="normal-case font-normal text-slate-400">(JSON list/object)</span></span><textarea spellCheck={false} rows={7} className={`${inputClass} font-mono text-xs ${error ? "border-red-400" : ""}`} value={draft} onChange={(e) => { setDraft(e.target.value); try { const parsed = JSON.parse(e.target.value); onChange(parsed); setError(""); } catch { setError("Invalid JSON - fix it before saving."); } }} />{error && <span className="text-xs text-red-600">{error}</span>}</label>;
}

export default function Admin() {
  useEffect(() => {
    document.title = "Nexoratech Admin";
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    robots.content = "noindex, nofollow";
  }, []);
  const { docs, connected, refresh } = useCms();
  const [authenticated, setAuthenticated] = useState(!!token());
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [overview, setOverview] = useState<{ documents: { kind: string; count: number }[]; leadsByDay: { day: string; count: number }[] }>({ documents: [], leadsByDay: [] });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  async function api(url: string, opts: RequestInit = {}) {
    const response = await fetch(API_BASE + url, { ...opts, headers: { ...authHeaders(), ...(opts.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...opts.headers } });
    if (response.status === 401) { sessionStorage.removeItem("nexoratech-token"); setAuthenticated(false); throw new Error("Session expired. Please sign in again."); }
    if (!response.ok) throw new Error((await response.json()).error || "Request failed");
    return response.status === 204 ? null : response.json();
  }
  useEffect(() => {
    if (!authenticated || !connected) return;
    void Promise.all([api('/api/admin/overview'), api('/api/admin/leads')]).then(([o, l]) => { setOverview(o); setLeads(l); }).catch((e) => setNotice(e.message));
  }, [authenticated, connected, view]);
  useEffect(() => {
    if (!authenticated || !connected || docs.length) return;
    const base = getBaseline();
    const documents = [
      { kind: "settings", key: "general", data: { site: base.site, testimonials: base.testimonials, badges: base.badges, clients: base.clients, team: base.team } },
      { kind: "theme", key: "main", data: DEFAULT_PALETTE },
      ...base.services.map((s) => ({ kind: "service", key: s.slug, data: s })),
      ...base.blogs.map((b) => ({ kind: "blog", key: b.slug, data: b })),
      ...base.cases.map((c) => ({ kind: "case", key: c.slug, data: c })),
    ];
    void api('/api/admin/seed', { method: 'POST', body: JSON.stringify({ documents }) }).then(refresh).catch((e) => setNotice(e.message));
  }, [authenticated, connected, docs.length]);

  const doc = (kind: string, key: string) => docs.find((d) => d.kind === kind && d.key === key)?.data;
  const pages = useMemo(() => [
    ...FIXED_PAGES, ...SERVICES.flatMap((c) => [[`/services/${c.slug}`, c.name], ...c.subs.map((s) => [`/services/${c.slug}/${s.slug}`, s.name])]),
    ...BLOGS.map((b) => [`/blog/${b.slug}`, b.title]), ...CASES.map((c) => [`/case-studies/${c.slug}`, c.title]),
  ], [docs]);
  const items: Item[] = view === "pages" ? pages.map(([key, label]) => ({ kind: "page", key, label, data: doc("page", key) || { heroTitle: "", heroSub: "", seoTitle: "", seoDescription: "", sections: {}, faqs: [], replacements: {} } }))
    : view === "services" ? SERVICES.flatMap((core) => [
      { kind: "service", key: core.slug, label: core.name, data: core },
      ...core.subs.map((sub) => ({ kind: "subservice", key: `${core.slug}/${sub.slug}`, label: `  ↳ ${sub.name}`, data: sub })),
    ]) : view === "blogs" ? BLOGS.map((x) => ({ kind: "blog", key: x.slug, label: x.title, data: x }))
    : view === "cases" ? CASES.map((x) => ({ kind: "case", key: x.slug, label: x.title, data: x })) : [];
  const filtered = items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()) || item.key.includes(search.toLowerCase()));

  function choose(item: Item) { setSelected(item); setDraft(structuredClone(item.data)); setNotice(""); }
  function update(k: string, value: any) { setDraft((d) => ({ ...d, [k]: value })); }
  function newItem() {
    const kind = view === "blogs" ? "blog" : view === "cases" ? "case" : "service";
    const example = kind === "blog" ? { slug: "new-article", title: "New article", excerpt: "", category: "Insights", author: "Editorial team", authorRole: "", date: new Date().toISOString().slice(0, 10), read: 5, keyword: "", service: SERVICES[0].slug, body: [{ h: "Introduction", p: ["Write your article here."] }], faqs: [] }
      : kind === "case" ? { slug: "new-case-study", title: "New case study", client: "", industry: "", service: SERVICES[0].slug, summary: "", challenge: "", solution: "", results: [], tech: [], faqs: [] }
      : { slug: "new-service", name: "New service", icon: "Code2", tagline: "", keyword: "", secondary: [], metaTitle: "", metaDesc: "", intro: "", benefits: [], tech: [], faqs: [], subs: [] };
    choose({ kind, key: example.slug, label: String(("title" in example ? example.title : example.name) || "New item"), data: example });
  }
  async function save(kind: string, key: string, data: Record<string, any>) {
    setSaving(true); setNotice("");
    try {
      const targetKey = key.includes("new-") && data.slug ? (kind === "subservice" ? `${key.split('/')[0]}/${data.slug}` : data.slug) : key;
      if (data.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error("Slugs must use lowercase letters, digits and hyphens.");
      await api(`/api/admin/documents/${kind}`, { method: "PUT", body: JSON.stringify({ key: targetKey, data }) });
      await refresh(); setNotice("Saved. The public website has been updated.");
      if (selected) setSelected({ ...selected, key: targetKey, data });
    } catch (e) { setNotice(e instanceof Error ? e.message : "Could not save."); }
    finally { setSaving(false); }
  }
  async function remove() {
    if (!selected || !confirm(`Delete ${selected.label}? This removes the CMS override.`)) return;
    try { await api(`/api/admin/documents/${selected.kind}?key=${encodeURIComponent(selected.key)}`, { method: "DELETE" }); await refresh(); setSelected(null); setNotice("CMS override removed."); }
    catch (e) { setNotice(e instanceof Error ? e.message : "Could not delete."); }
  }

  if (!authenticated) return <Login onSuccess={() => { setAuthenticated(true); void refresh(); }} />;
  return <div className="min-h-screen bg-[#f5f6fa] font-sans text-slate-800">
    {sidebarOpen && <button className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0c1230] text-slate-300 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6"><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 font-black text-white">N</div><div><b className="block text-base tracking-tight text-white">Nexoratech</b><span className="text-[10px] font-semibold uppercase tracking-[.23em] text-indigo-300">Control Center</span></div><button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden"><X size={18}/></button></div>
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-6">{SIDEBAR.map((it, i) => { const I = it.icon; return <div key={it.id}>{(i === 0 || SIDEBAR[i - 1].group !== it.group) && <p className="px-4 pb-2 pt-5 text-[10px] font-bold tracking-[.18em] text-slate-500 first:pt-0">{it.group}</p>}<button onClick={() => { setView(it.id); setSelected(null); setSearch(""); setSidebarOpen(false); setNotice(""); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${view === it.id ? "bg-indigo-500/20 text-white ring-1 ring-indigo-400/30" : "hover:bg-white/5 hover:text-white"}`}><I size={18} className={view === it.id ? "text-indigo-400" : "text-slate-500"} />{it.label}{view === it.id && <ChevronRight size={15} className="ml-auto text-indigo-300" />}</button></div>; })}</div>
      <div className="border-t border-white/10 p-4"><a href="/#/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm hover:bg-white/5"><ExternalLink size={16}/> View website</a><button onClick={() => { sessionStorage.removeItem("nexoratech-token"); setAuthenticated(false); }} className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm hover:bg-white/5"><LogOut size={16}/> Sign out</button></div>
    </aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl md:px-10"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 lg:hidden"><Menu size={20}/></button><span className="text-sm text-slate-500">Workspace <span className="mx-2">/</span> <b className="text-slate-900">{SIDEBAR.find((x) => x.id === view)?.label}</b></span></div><div className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-500" : "bg-amber-500"}`} /><span className="hidden text-xs font-medium text-slate-500 sm:block">{connected ? "PostgreSQL connected" : "API offline"}</span><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">AD</div></div></header>
      <main className="mx-auto max-w-[1440px] p-5 md:p-10">
        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"><AlertTriangle size={17}/>{notice}<button className="ml-auto" onClick={() => setNotice("")}><X size={15}/></button></div>}
        {!connected && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">The API is offline. Start PostgreSQL, run database setup and start the API. Editing is disabled until it connects. See LOCAL_SETUP.md.</div>}
        {view === "overview" && <Overview docs={docs} leads={leads} chart={overview.leadsByDay} navigate={setView} connected={connected} />}
        {(["pages","services","blogs","cases"] as View[]).includes(view) && <div>
          <PageTitle eyebrow="CONTENT MANAGEMENT" title={({ pages: "Page content & SEO", services: "Services directory", blogs: "Editorial / blog posts", cases: "Case studies" } as Record<View, string>)[view] || ""} detail={view === "pages" ? "Choose a page to edit its headings, SEO, FAQs and any visible text." : "Edit structured content. Changes are published as soon as you save."} action={view !== "pages" && <Button onClick={newItem}><Plus size={16}/>New {view === "services" ? "service" : view === "blogs" ? "post" : "case study"}</Button>} />
          <div className="grid gap-5 xl:grid-cols-[340px_1fr]"><div className={`${box} self-start overflow-hidden`}><div className="relative border-b border-slate-100 p-4"><Search className="absolute left-7 top-7 text-slate-400" size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search content..." className={`${inputClass} !pl-10`} /></div><div className="max-h-[70vh] overflow-y-auto p-2">{filtered.map((item) => <button key={item.kind + item.key} onClick={() => choose(item)} className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${selected?.key === item.key && selected.kind === item.kind ? "bg-indigo-50 font-semibold text-indigo-700" : "hover:bg-slate-50"}`}><span className="line-clamp-2">{item.label}</span><span className="mt-1 block truncate text-[11px] text-slate-400">{item.key}</span></button>)}{!filtered.length && <p className="p-5 text-sm text-slate-400">No matching items.</p>}</div></div>
          <div className={`${box} min-h-[450px] p-5 md:p-7`}>{selected ? <ContentEditor key={selected.kind + selected.key} item={selected} draft={draft} update={update} save={() => void save(selected.kind, selected.key, draft)} remove={() => void remove()} saving={saving} connected={connected} onAddSub={() => choose({ kind: "subservice", key: `${selected.key}/new-sub-service`, label: "New sub-service", data: { slug: "new-sub-service", name: "New sub-service", keyword: "", secondary: [], desc: "", features: [] } })} /> : <div className="grid min-h-[400px] place-content-center text-center"><div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-500"><FileText size={28}/></div><h2 className="text-lg font-semibold">Select something to edit</h2><p className="mt-1 max-w-sm text-sm text-slate-400">Open a page or document from the list on the left. All changes are saved to PostgreSQL.</p></div>}</div></div>
        </div>}
        {view === "appearance" && <Appearance data={doc("theme", "main") || DEFAULT_PALETTE} save={(d) => void save("theme", "main", d)} saving={saving} connected={connected} />}
        {view === "identity" && <Identity data={doc("settings", "general") || { site: SITE, testimonials: TESTIMONIALS, badges: TRUST_BADGES, clients: CLIENTS, team: TEAM }} save={(d) => void save("settings", "general", d)} saving={saving} connected={connected} />}
        {view === "media" && <MediaLibrary docs={docs.filter((d) => d.kind === "media")} api={api} refresh={refresh} connected={connected} />}
        {view === "inbox" && <InboxView leads={leads} api={api} refresh={() => void api('/api/admin/leads').then(setLeads)} />}
      </main>
    </div>
  </div>;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) { e.preventDefault(); setBusy(true); setError(""); try { const r = await fetch(`${API_BASE}/api/admin/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error); sessionStorage.setItem("nexoratech-token", data.token); onSuccess(); } catch (err) { setError(err instanceof Error ? err.message : "Could not connect to API."); } finally { setBusy(false); } }
  return <div className="grid min-h-screen place-items-center bg-[#0c1230] p-5"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-9 shadow-2xl"><div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-xl font-black text-white">N</div><div><b className="text-xl text-slate-900">Nexoratech</b><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Admin workspace</p></div></div><h1 className="text-3xl font-bold text-slate-950">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Sign in to manage your website.</p><form onSubmit={submit} className="mt-8 space-y-5"><Field name="Email address" value={email} onChange={setEmail}/><label className="block"><span className={labelClass}>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required /></label>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button></form><p className="mt-7 text-center text-xs text-slate-400">Protected administrator access · PostgreSQL API</p><Link to="/" className="mt-4 block text-center text-xs font-semibold text-indigo-600">Back to website</Link></div></div>;
}

function Overview({ docs, leads, chart, navigate, connected }: { docs: CmsDoc[]; leads: Lead[]; chart: { day: string; count: number }[]; navigate: (v: View) => void; connected: boolean }) {
  const stats = [{ label: "Core services", value: SERVICES.length, icon: Layers3 }, { label: "Sub-services", value: SERVICES.reduce((n, c) => n + c.subs.length, 0), icon: Code2 }, { label: "Blog posts", value: BLOGS.length, icon: Newspaper }, { label: "Enquiries", value: leads.length, icon: Inbox }];
  return <><PageTitle eyebrow="GOOD TO SEE YOU" title="Dashboard overview" detail="Your content, enquiries and publishing activity in one place." action={<a href="/#/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"><Eye size={16}/>View live site</a>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, icon: Icon }) => <div key={label} className={`${box} p-6`}><div className="flex justify-between"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={21}/></div><span className="text-xs text-emerald-600">Live data</span></div><strong className="mt-6 block text-4xl tracking-tight text-slate-950">{value}</strong><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]"><div className={`${box} p-6`}><h2 className="text-lg font-bold">Enquiries · last 30 days</h2><p className="mb-5 mt-1 text-sm text-slate-400">Actual submissions from the website form</p><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.22}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#edf0f5" strokeDasharray="3 3"/><XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} /><Tooltip/><Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fill="url(#leadsGradient)" /></AreaChart></ResponsiveContainer></div>{!chart.length && <p className="text-center text-xs text-slate-400">No enquiries yet. The chart will fill as visitors submit forms.</p>}</div><div className={`${box} p-6`}><h2 className="text-lg font-bold">Quick actions</h2><div className="mt-4 space-y-2">{[["Edit homepage", "pages", FileText], ["Update services", "services", Layers3], ["Write a blog post", "blogs", Newspaper], ["Change brand colors", "appearance", PaletteIcon], ["Check enquiries", "inbox", Inbox]].map(([label, v, Icon]) => { const I = Icon as typeof FileText; return <button key={label as string} onClick={() => navigate(v as View)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left text-sm font-medium hover:border-indigo-200 hover:bg-indigo-50"><I size={17} className="text-indigo-500"/>{label as string}<ChevronRight size={14} className="ml-auto text-slate-300"/></button>; })}</div><p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">{connected ? `Connected to PostgreSQL · ${docs.length} saved CMS overrides` : "Connect your PostgreSQL API to publish changes."}</p></div></div></>;
}

function ContentEditor({ item, draft, update, save, remove, saving, connected, onAddSub }: { item: Item; draft: Record<string, any>; update: (k: string, v: any) => void; save: () => void; remove: () => void; saving: boolean; connected: boolean; onAddSub: () => void }) {
  const isPage = item.kind === "page";
  const titleField = item.kind === "blog" || item.kind === "case" ? "title" : "name";
  const [original, setOriginal] = useState(""); const [replacement, setReplacement] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [imageAlt, setImageAlt] = useState(""); const [imageUrl, setImageUrl] = useState("");
  const scalar = isPage ? ["heroTitle", "heroSub", "seoTitle", "seoDescription"] : item.kind === "subservice" ? ["name", "slug", "keyword", "desc"] : item.kind === "service" ? ["name", "slug", "icon", "tagline", "keyword", "metaTitle", "metaDesc", "intro"] : item.kind === "blog" ? ["title", "slug", "excerpt", "category", "author", "authorRole", "date", "read", "keyword", "service"] : ["title", "slug", "client", "industry", "service", "summary", "challenge", "solution"];
  const objects = isPage ? ["faqs"] : item.kind === "subservice" ? ["secondary", "features"] : item.kind === "service" ? ["secondary", "benefits", "tech", "faqs"] : item.kind === "blog" ? ["body", "faqs"] : ["results", "tech", "faqs"];
  const page = draft as PageDoc;
  const addReplacement = () => { if (!original.trim()) return; update("replacements", { ...(page.replacements || {}), [original.trim()]: replacement }); setOriginal(""); setReplacement(""); };
  const addSection = () => { if (!sectionName.trim()) return; update("sections", { ...(page.sections || {}), [sectionName.trim()]: { title: "", sub: "" } }); setSectionName(""); };
  const addImage = () => { if (!imageAlt.trim() || !imageUrl.trim()) return; update("images", { ...(page.images || {}), [imageAlt.trim()]: { src: imageUrl.trim() } }); setImageAlt(""); setImageUrl(""); };
  return <div><div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5"><div><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{item.kind} · {item.key}</p><h2 className="mt-1 text-xl font-bold text-slate-950">{isPage ? item.label : (draft[titleField] || item.label)}</h2></div><div className="flex gap-2">{item.kind === "service" && <Button kind="secondary" onClick={onAddSub}><Plus size={14}/>Sub-service</Button>}<a href={`/#${isPage ? item.key : item.kind === "blog" ? `/blog/${item.key}` : item.kind === "case" ? `/case-studies/${item.key}` : item.kind === "subservice" ? `/services/${item.key}` : `/services/${item.key}`}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold">View <ExternalLink size={14}/></a></div></div>
    <div className="mt-6 grid gap-5 md:grid-cols-2">{scalar.map((key) => <div key={key} className={['intro', 'desc', 'heroSub', 'seoDescription', 'summary', 'challenge', 'solution', 'excerpt'].includes(key) ? "md:col-span-2" : ""}><Field name={key.replace(/([A-Z])/g, " $1")} value={String(draft[key] ?? "")} onChange={(v) => update(key, key === "read" ? Number(v) : v)} multiline={['intro', 'desc', 'heroSub', 'seoDescription', 'summary', 'challenge', 'solution', 'excerpt'].includes(key)}/></div>)}</div>
    {isPage && <><div className="mt-8 border-t border-slate-100 pt-7"><h3 className="text-lg font-bold">Section headings and introductions</h3><p className="mb-4 text-sm text-slate-500">Enter the exact section eyebrow label, then set its heading and intro. Existing sections update instantly.</p><div className="space-y-3">{Object.entries(page.sections || {}).map(([name, val]) => <div key={name} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="mb-3 flex justify-between text-sm font-bold">{name}<button onClick={() => { const next = { ...page.sections }; delete next[name]; update("sections", next); }} className="text-rose-500"><Trash2 size={15}/></button></div><div className="grid gap-3 sm:grid-cols-2"><Field name="Heading" value={val.title || ""} onChange={(v) => update("sections", { ...page.sections, [name]: { ...val, title: v } })}/><Field name="Supporting text" value={val.sub || ""} onChange={(v) => update("sections", { ...page.sections, [name]: { ...val, sub: v } })}/></div></div>)}</div><div className="mt-3 flex gap-2"><input className={inputClass} placeholder="Exact eyebrow label (e.g. Our Core Services)" value={sectionName} onChange={(e) => setSectionName(e.target.value)}/><Button onClick={addSection} kind="secondary"><Plus size={16}/> Add</Button></div></div>
      <div className="mt-8 border-t border-slate-100 pt-7"><h3 className="text-lg font-bold">Any page text</h3><p className="mb-4 text-sm text-slate-500">Replace exact visible text, including paragraphs, button text and labels. Copy the original text from the page and paste it below.</p><div className="space-y-3">{Object.entries(page.replacements || {}).map(([from, to]) => <div key={from} className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_1fr_auto]"><p className="text-sm text-slate-500">{from}</p><p className="text-sm font-semibold text-slate-800">{to}</p><button onClick={() => { const next = { ...page.replacements }; delete next[from]; update("replacements", next); }} className="text-rose-500"><Trash2 size={16}/></button></div>)}</div><div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><textarea className={inputClass} rows={3} placeholder="Original exact text" value={original} onChange={(e) => setOriginal(e.target.value)}/><textarea className={inputClass} rows={3} placeholder="New text" value={replacement} onChange={(e) => setReplacement(e.target.value)}/><Button onClick={addReplacement} kind="secondary"><Plus size={16}/> Add</Button></div></div>
      <div className="mt-8 border-t border-slate-100 pt-7"><h3 className="text-lg font-bold">Page images</h3><p className="mb-4 text-sm text-slate-500">Replace any on-page image using its current alt text. Upload a new image in Media Library, then paste its URL here.</p>{Object.entries(page.images || {}).map(([alt, value]) => <div key={alt} className="mb-2 flex items-center justify-between rounded-xl border border-slate-200 p-3 text-sm"><span>{alt} → {value.src}</span><button onClick={() => { const next = { ...page.images }; delete next[alt]; update("images", next); }} className="text-rose-500"><Trash2 size={16}/></button></div>)}<div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><input className={inputClass} placeholder="Existing image alt text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)}/><input className={inputClass} placeholder="New image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/><Button onClick={addImage} kind="secondary"><Plus size={16}/> Add</Button></div></div>
    </>}
    <div className="mt-7 grid gap-5">{objects.map((key) => <JsonField key={key} name={key} value={draft[key]} onChange={(v) => update(key, v)} />)}{item.kind === "service" && <p className="text-xs text-slate-500">Sub-services are edited individually in the left list. To add a new sub-service, use the JSON data field below or create a core service first.</p>}
      {!isPage && <details className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer text-sm font-semibold text-slate-600">Advanced: full JSON document (including nested items and images)</summary><div className="mt-4"><JsonField name="Full document" value={draft} onChange={(v) => { Object.keys(draft).forEach((k) => { if (!(k in v)) update(k, undefined); }); Object.entries(v).forEach(([k, value]) => update(k, value)); }} /></div></details>}
    </div>
    <div className="sticky bottom-3 z-10 mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur"><Button disabled={!connected || saving} onClick={save}><Save size={16}/>{saving ? "Saving..." : "Save & publish"}</Button><Button kind="danger" disabled={!connected} onClick={remove}><Trash2 size={16}/>Remove override</Button><p className="my-auto ml-auto text-xs text-slate-400">Saved changes appear on the website within 30 seconds.</p></div>
  </div>;
}

function Appearance({ data, save, saving, connected }: { data: Record<string, any>; save: (d: Record<string, any>) => void; saving: boolean; connected: boolean }) {
  const [palette, setDraft] = useState<Palette>({ ...DEFAULT_PALETTE, ...data });
  useEffect(() => { setDraft({ ...DEFAULT_PALETTE, ...data }); }, [JSON.stringify(data)]);
  const update = (key: keyof Palette, value: string) => { const next = { ...palette, [key]: value }; setDraft(next); setPalette(next); };
  return <><PageTitle eyebrow="DESIGN SYSTEM" title="Colors & typography" detail="You choose the live website's palette. Visitors can only toggle light and dark mode." action={<Button disabled={!connected || saving} onClick={() => save(palette)}><Save size={16}/>Save live theme</Button>}/><div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]"><div className={`${box} p-6`}><h2 className="text-lg font-bold">Brand palette</h2><p className="mb-6 mt-1 text-sm text-slate-500">Choose any hex color; changes preview here immediately and publish when saved.</p><div className="grid gap-5 sm:grid-cols-2">{(["brand", "brand2", "ink", "muted", "surface"] as (keyof Palette)[]).map((key) => <div key={key}><label className={labelClass}>{key === "brand2" ? "Gradient end" : key === "brand" ? "Primary / gradient start" : key + " (light mode)"}</label><div className="flex gap-2"><input type="color" value={palette[key]} onChange={(e) => update(key, e.target.value)} className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200"/><input className={inputClass} value={palette[key]} onChange={(e) => update(key, e.target.value)} /></div></div>)}</div><div className="mt-8 border-t border-slate-100 pt-6"><h3 className="mb-4 font-bold">Fonts</h3><div className="grid gap-4 sm:grid-cols-2">{(["displayFont", "bodyFont"] as const).map((key) => <label key={key} className="block"><span className={labelClass}>{key === "displayFont" ? "Headings" : "Body copy"}</span><select className={inputClass} value={palette[key]} onChange={(e) => update(key, e.target.value)}>{["Space Grotesk", "Plus Jakarta Sans", "Inter", "Manrope", "DM Sans", "Outfit", "Poppins"].map((font) => <option key={font}>{font}</option>)}</select></label>)}</div><p className="mt-3 text-xs text-slate-400">The available Google Fonts are preloaded by the site.</p></div></div><div className={`${box} self-start overflow-hidden`}><div className="p-6"><h2 className="text-lg font-bold">Live preview</h2><p className="mt-1 text-sm text-slate-500">Your color choices as visitors will see them.</p></div><div className="p-8" style={{ background: palette.surface }}><div className="rounded-2xl bg-white p-7 shadow-lg"><p className="text-xs font-bold uppercase tracking-widest" style={{ color: palette.brand }}>NEXORATECH · OUR SERVICES</p><h3 className="mt-3 text-3xl font-bold" style={{ color: palette.ink, fontFamily: palette.displayFont }}>Build what's next.</h3><p className="mt-3 text-sm" style={{ color: palette.muted, fontFamily: palette.bodyFont }}>A considered digital experience, shaped by the color palette you control.</p><span className="mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: `linear-gradient(110deg,${palette.brand},${palette.brand2})` }}>Get started →</span></div></div></div></div></>;
}

function Identity({ data, save, saving, connected }: { data: Record<string, any>; save: (d: Record<string, any>) => void; saving: boolean; connected: boolean }) {
  const [draft, setDraft] = useState(structuredClone(data));
  useEffect(() => setDraft(structuredClone(data)), [JSON.stringify(data)]);
  const set = (key: string, value: any) => setDraft((d: any) => ({ ...d, [key]: value }));
  const setSite = (key: string, value: string) => set("site", { ...draft.site, [key]: value });
  return <><PageTitle eyebrow="GLOBAL SETTINGS" title="Site identity & trust" detail="Edit company information, social links, testimonials, client logos, credentials and team profiles." action={<Button disabled={!connected || saving} onClick={() => save(draft)}><Save size={16}/>Save settings</Button>}/><div className="grid gap-5 lg:grid-cols-2"><div className={`${box} p-6`}><h2 className="mb-5 text-lg font-bold">Company details</h2><div className="space-y-4">{["name", "short", "logoText", "domain", "tagline", "email", "sales", "phone", "phone2", "address", "addressIN", "founded"].map((k) => <Field key={k} name={k} value={String(draft.site?.[k] || "")} onChange={(v) => setSite(k, v)} multiline={k.startsWith("address")}/>)}</div></div><div className="space-y-5"><div className={`${box} p-6`}><h2 className="mb-4 text-lg font-bold">Social profiles & key metrics</h2><JsonField name="Social links" value={draft.site?.socials} onChange={(v) => setSite("socials", v)}/><div className="mt-4"><JsonField name="Homepage stats" value={draft.site?.stats} onChange={(v) => setSite("stats", v)}/></div></div><div className={`${box} space-y-5 p-6`}><h2 className="text-lg font-bold">Content collections</h2>{["testimonials", "badges", "clients", "team"].map((key) => <JsonField key={key} name={key} value={draft[key]} onChange={(v) => set(key, v)}/>)}</div></div></div></>;
}

function MediaLibrary({ docs, api, refresh, connected }: { docs: CmsDoc[]; api: (url: string, opts?: RequestInit) => Promise<any>; refresh: () => Promise<void>; connected: boolean }) {
  const [file, setFile] = useState<File | null>(null); const [name, setName] = useState(""); const [alt, setAlt] = useState(""); const [mapping, setMapping] = useState(""); const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(false);
  async function upload() { if (!file) return; setBusy(true); try { const fd = new FormData(); fd.set("image", file); fd.set("name", name || file.name); fd.set("alt", alt); const uploaded = await api('/api/admin/upload', { method: 'POST', body: fd }); if (mapping) await api('/api/admin/documents/media', { method: 'PUT', body: JSON.stringify({ key: mapping, data: { name: name || file.name, alt, url: uploaded.data.url, size: file.size } }) }); await refresh(); setFile(null); setName(""); setAlt(""); setMapping(""); setNotice("Image uploaded and published."); } catch (e) { setNotice(e instanceof Error ? e.message : "Upload failed."); } finally { setBusy(false); } }
  const options = [...BLOGS.map((b) => ({ key: `blog/${b.slug}`, label: `Blog: ${b.title}` })), ...CASES.map((c) => ({ key: `case/${c.slug}`, label: `Case: ${c.title}` }))];
  return <><PageTitle eyebrow="ASSET MANAGER" title="Media library" detail="Upload images, add descriptive alt text, and assign a 16:9 cover to any blog or case study." /><div className={`${box} p-6`}><div className="grid gap-4 md:grid-cols-2"><label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-center hover:bg-indigo-100"><UploadCloud size={32} className="text-indigo-500"/><b className="mt-2 text-sm">{file?.name || "Choose an image"}</b><span className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, AVIF · max 5 MB</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)}/></label><div className="space-y-3"><Field name="Image name" value={name} onChange={setName}/><Field name="Alt text (accessibility and SEO)" value={alt} onChange={setAlt}/><label className="block"><span className={labelClass}>Assign as cover image (optional)</span><select className={inputClass} value={mapping} onChange={(e) => setMapping(e.target.value)}><option value="">Add to library only</option>{options.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}</select></label><Button onClick={() => void upload()} disabled={!connected || !file || busy}><UploadCloud size={16}/>{busy ? "Uploading..." : "Upload image"}</Button></div></div>{notice && <p className="mt-4 text-sm text-indigo-600">{notice}</p>}</div><h2 className="mb-4 mt-8 text-lg font-bold">Uploaded images <span className="text-sm font-normal text-slate-400">({docs.length})</span></h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{docs.filter((d) => d.key.indexOf('/') === -1).map((d) => <div key={d.key} className={`${box} overflow-hidden`}><img className="aspect-video w-full bg-slate-100 object-cover" src={`${API_BASE}${d.data.url}`} alt={d.data.alt || d.data.name}/><div className="p-4"><b className="block truncate text-sm">{d.data.name}</b><p className="mt-1 truncate text-xs text-slate-400">{d.data.alt || "No alt text"}</p><button onClick={() => { void navigator.clipboard.writeText(`${API_BASE}${d.data.url}`); setNotice("Image URL copied."); }} className="mt-3 text-xs font-semibold text-indigo-600">Copy URL</button></div></div>)}</div></>;
}

function InboxView({ leads, api, refresh }: { leads: Lead[]; api: (url: string, opts?: RequestInit) => Promise<any>; refresh: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = leads.filter((l) => `${l.name} ${l.email} ${l.service}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageTitle eyebrow="SALES INBOX" title="Website enquiries" detail="Live submissions from contact and quote forms, stored in PostgreSQL." /><div className={`${box} overflow-hidden`}><div className="border-b border-slate-100 p-4"><input placeholder="Search enquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} max-w-md`}/></div><div className="divide-y divide-slate-100">{filtered.map((l) => <div key={l.id} className="grid gap-3 p-5 lg:grid-cols-[1fr_1.5fr_auto]"><div><b className="text-sm">{l.name}</b><p className="text-xs text-slate-500">{l.email} {l.phone && `· ${l.phone}`}</p><p className="mt-1 text-xs text-indigo-500">{l.company || l.service || "General enquiry"}</p></div><div><p className="text-sm text-slate-700">{l.message}</p><p className="mt-2 text-xs text-slate-400">{new Date(l.created_at).toLocaleString()} {l.budget && `· Budget: ${l.budget}`}</p></div><select value={l.status} onChange={(e) => void api(`/api/admin/leads/${l.id}`, { method: "PATCH", body: JSON.stringify({ status: e.target.value }) }).then(refresh)} className="self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold"><option value="new">New</option><option value="in-progress">In progress</option><option value="closed">Closed</option></select></div>)}{!filtered.length && <p className="p-10 text-center text-sm text-slate-400">No enquiries yet.</p>}</div></div></>;
}