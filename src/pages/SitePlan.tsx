import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronDown, Layers, Search, Palette, Map, Network, FileCode2, Rocket, Target, LayoutTemplate, Boxes, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import { PageHero, Reveal, SvcIcon } from "../components/ui";
import { useTheme } from "../components/Header";
import { SERVICES, corePath, subPath } from "../data/services";
import { BLOGS, CASES } from "../data/content";
import { THEMES } from "../data/site";
import { cn } from "../utils/cn";

const TOC = [
  ["research", "1. Market & Competitor Research", Search], ["header", "2. Header & Mega Menu Plan", Layers], ["ia", "3. Site Architecture (All Pages)", Map],
  ["templates", "4. Page Templates & Sections", LayoutTemplate], ["keywords", "5. Keyword Map & Metas", Target], ["seo", "6. SEO • AEO • GEO • E-E-A-T", Sparkles],
  ["linking", "7. Internal Linking Strategy", Network], ["design", "8. Design System & Themes", Palette], ["modules", "9. Modules & Features", Boxes],
  ["tech", "10. Tech Architecture & Files", FileCode2], ["roadmap", "11. Launch Roadmap", Rocket],
] as const;

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-14">
      <Reveal><h2 className="mb-6 text-3xl font-bold md:text-4xl">{title}</h2></Reveal>
      {children}
    </section>
  );
}
const Card = ({ children, className }: { children: ReactNode; className?: string }) => <div className={cn("rounded-2xl border border-line bg-surface p-5", className)}>{children}</div>;
const Check = ({ items }: { items: string[] }) => <ul className="space-y-2">{items.map((i) => <li key={i} className="flex gap-2 text-sm text-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{i}</li>)}</ul>;

export default function SitePlan() {
  const { dark, setDark } = useTheme();
  const [openKw, setOpenKw] = useState<string | null>(SERVICES[0].slug);
  const totalSubs = SERVICES.reduce((a, c) => a + c.subs.length, 0);
  const totalPages = 1 + 1 + SERVICES.length + totalSubs + 1 + 1 + BLOGS.length + 1 + CASES.length + 1 + 4;

  return (
    <>
      <Seo title="Website Blueprint & Plan | Nexovate" description="Complete website plan: research, architecture, page templates, keyword map, SEO/AEO/GEO strategy, design system and roadmap." path="/site-plan" />
      <PageHero eyebrow="📐 Website Blueprint" crumbs={[{ name: "Website Blueprint", path: "/site-plan" }]}
        title={<>The Complete <span className="grad-text">Website Plan</span></>}
        sub={`Every page, module, section, keyword and design decision for the Nexovate IT website — ${totalPages} pages, ${SERVICES.length} core services, ${totalSubs} sub-services, all live and clickable.`}>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[[totalPages, "Total Pages"], [SERVICES.length, "Core Services"], [totalSubs, "Sub-service Pages"], ["6–8", "FAQs / Page"], ["9", "Schema Types"]].map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-line bg-surface p-4"><div className="text-3xl font-black grad-text">{v}</div><div className="text-xs text-muted">{l}</div></div>
          ))}
        </div>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1 rounded-2xl border border-line bg-surface p-3">
            {TOC.map(([id, label, I]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-bg hover:text-brand">
                <I className="h-4 w-4 shrink-0" />{label}
              </button>
            ))}
          </nav>
        </aside>

        <div>
          {/* 1 RESEARCH */}
          <Block id="research" title="1. Market & Competitor Research">
            <p className="mb-6 text-muted">We analysed leading IT service websites (Simform, Radixweb, Hidden Brains, Appinventiv, ScienceSoft, Intellectsoft, Infosys, TCS) and growth agencies (WebFX, Ignite Visibility) for patterns that drive trust, rankings and conversions.</p>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-surface text-left"><tr>{["Pattern", "What leaders do", "How we apply it"].map((h) => <th key={h} className="p-4 font-bold">{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ["Trust signals", "Clutch/GoodFirms badges, ISO certs, client logos above the fold", "Hero rating chip, logo marquee, badge row, review stars on every page"],
                    ["Authority", "Years in business, team size, project counts with animated counters", "Stats module (12+ yrs, 850+ projects, 320+ experts, 98% retention)"],
                    ["E-E-A-T", "Named leaders, author bios, 'reviewed by' expert boxes", "Expert-reviewed box on every service page, author bios on blogs, team page"],
                    ["Mega menus", "Multi-column menus grouping services & sub-services with a promo card", "3-panel hover mega menu: core list → sub-services → CTA card"],
                    ["Service pages", "Long-form, answer-first content, tech stack, process, case studies, FAQs", "Standardised 14-section service template (see §4)"],
                    ["Conversion", "Sticky CTA, short forms, '48-hr proposal', NDA promise", "CTA in header, mid-page, sidebar, footer; NDA checkbox in form"],
                    ["Internal linking", "Hub-and-spoke service clusters + contextual blog links", "Pillar (core) ↔ cluster (sub) ↔ blog ↔ case study linking"],
                    ["AI search (GEO)", "Concise definitions, statistics, FAQs, structured data", "'Quick Answer' block, 'What is X?' definitions, FAQPage schema"],
                  ].map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className={cn("p-4 align-top", i === 0 ? "font-semibold" : "text-muted")}>{c}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card><h3 className="font-bold">🎯 Target Audience</h3><p className="mt-2 text-sm text-muted">Startup founders, SMB owners, CTOs/VPs of Engineering, marketing heads in US, UK, EU, AU, UAE & India.</p></Card>
              <Card><h3 className="font-bold">🔍 Search Intent Mix</h3><p className="mt-2 text-sm text-muted">Commercial (“mobile app development company”), transactional (“hire react developers”), informational (“cost of custom software”).</p></Card>
              <Card><h3 className="font-bold">💡 Differentiators</h3><p className="mt-2 text-sm text-muted">One partner for build + design + growth; AEO/GEO expertise; 48-hr hiring; transparent pricing ranges.</p></Card>
            </div>
          </Block>

          {/* 2 HEADER */}
          <Block id="header" title="2. Header & Mega Menu Plan">
            <div className="grid gap-4 md:grid-cols-2">
              <Card><h3 className="font-bold">✅ Your idea (implemented)</h3><p className="mt-2 text-sm text-muted">Services · About Us · Blogs · Case Studies · Contact Us. Hover Services → core services; hover a core service → its sub-services.</p></Card>
              <Card className="border-brand/50"><h3 className="font-bold">🚀 Our enhancements (implemented)</h3>
                <Check items={["3-panel mega menu: core list | sub-services grid | promo CTA card with trust stats", "Sticky utility bar for email, phone and ratings", "Sticky glass navigation", "Primary 'Get a Free Quote' button always visible", "Admin-managed theme + visitor light/dark toggle", "Mobile: accordion drawer (core → subs) with full CTA", "'View all' link to each core page in the menu (pillar linking)"]} />
              </Card>
            </div>
            <Card className="mt-4"><h3 className="font-bold">💡 Optional future additions</h3><Check items={["Add 'Industries' top-level item (Healthcare, FinTech…) for industry landing pages — strong for long-tail SEO", "Make 'Hire Developers' a separate top-level item since it has 22 sub-pages and transactional intent", "Global search (⌘K) across services, blogs and case studies", "Announcement bar for offers / events"]} /></Card>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line">
              <div className="flex items-center justify-between bg-surface px-4 py-2 text-xs text-muted"><span>✉ email · ☎ phone</span><span>⭐ 4.9 Clutch · ISO 27001</span></div>
              <div className="flex items-center justify-between border-y border-line px-4 py-3 text-sm font-semibold"><span className="grad-text text-lg">Nexoratech</span><span className="hidden gap-5 md:flex"><span className="text-brand">Services ▾</span><span>About Us</span><span>Case Studies</span><span>Blogs</span><span>Contact Us</span></span><span className="rounded-full grad-bg px-3 py-1 text-xs text-white">Get a Free Quote</span></div>
              <div className="grid grid-cols-[1fr_1.6fr_1fr] text-xs">
                <div className="space-y-1 bg-surface p-3">{SERVICES.map((c, i) => <div key={c.slug} className={cn("rounded px-2 py-1", i === 0 && "bg-bg font-semibold text-brand")}>{c.name}</div>)}</div>
                <div className="grid grid-cols-2 content-start gap-1 p-3">{SERVICES[0].subs.map((s) => <div key={s.slug} className="rounded px-2 py-1 hover:bg-surface">• {s.name}</div>)}</div>
                <div className="grad-bg p-3 text-white"><b>Not sure where to start?</b><p className="mt-1 opacity-90">Free strategy call · 850+ projects · 4.9★</p></div>
              </div>
            </div>
          </Block>

          {/* 3 IA */}
          <Block id="ia" title="3. Site Architecture — Every Page (click to open)">
            <div className="mb-4 rounded-2xl border border-line bg-surface p-4 font-mono text-xs text-muted">
              / · /services · /services/&#123;core&#125; · /services/&#123;core&#125;/&#123;sub-service&#125; · /about-us · /case-studies · /case-studies/&#123;slug&#125; · /blog · /blog/&#123;slug&#125; · /contact-us · /privacy-policy · /terms-of-service · /sitemap · /sitemap.xml · /robots.txt
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card><h3 className="mb-2 font-bold">Main Pages</h3>{[["/", "Home"], ["/services", "Services Hub"], ["/about-us", "About Us"], ["/case-studies", "Case Studies"], ["/blog", "Blog"], ["/contact-us", "Contact Us"], ["/sitemap", "HTML Sitemap"], ["/privacy-policy", "Privacy Policy"], ["/terms-of-service", "Terms"]].map(([to, l]) => <Link key={to} to={to} className="block py-0.5 text-sm text-muted hover:text-brand">→ {l}</Link>)}</Card>
              <Card><h3 className="mb-2 font-bold">Blog Posts ({BLOGS.length})</h3>{BLOGS.map((b) => <Link key={b.slug} to={`/blog/${b.slug}`} className="block py-0.5 text-sm text-muted hover:text-brand">→ {b.title}</Link>)}</Card>
              <Card><h3 className="mb-2 font-bold">Case Studies ({CASES.length})</h3>{CASES.map((b) => <Link key={b.slug} to={`/case-studies/${b.slug}`} className="block py-0.5 text-sm text-muted hover:text-brand">→ {b.title}</Link>)}</Card>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {SERVICES.map((c) => (
                <Card key={c.slug}>
                  <Link to={corePath(c)} className="flex items-center gap-2 font-bold hover:text-brand"><SvcIcon name={c.icon} className="h-5 w-5 text-brand" />{c.name} <span className="text-xs font-normal text-muted">({c.subs.length})</span></Link>
                  <p className="mb-2 font-mono text-[11px] text-muted">{corePath(c)}</p>
                  <div className="flex flex-wrap gap-1.5">{c.subs.map((s) => <Link key={s.slug} to={subPath(c, s)} className="rounded-full border border-line bg-bg px-2.5 py-1 text-xs hover:border-brand hover:text-brand">{s.name}</Link>)}</div>
                </Card>
              ))}
            </div>
          </Block>

          {/* 4 TEMPLATES */}
          <Block id="templates" title="4. Page Templates & Sections">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Home", "/", ["Utility bar + sticky header", "Hero: H1 with primary keyword, rotating words, dual CTA, trust chips, orbit visual", "Client logo marquee", "8 core service cards with sub-links", "Animated stats counters", "Why Us (E-E-A-T) + certification badges", "6-step process", "Industries", "Case study cards", "Engagement models", "Testimonials", "Blog insights", "8 FAQs + FAQPage schema", "Lead form", "CTA band + Footer"]],
                ["Core Service (×8)", "/services/{core}", ["Breadcrumb + keyword hero", "AEO 'What are X?' definition block", "Sub-service grid (cluster links)", "Why choose us (4 benefits)", "Stats", "Tech stack", "Process", "Related case studies", "Testimonials", "Related blogs", "6–7 FAQs", "Other core services cross-links", "CTA"]],
                ["Sub-service (×" + totalSubs + ")", "/services/{core}/{sub}", ["Breadcrumb hero + 'Reviewed by' expert + updated date", "Logo marquee", "Quick Answer (featured-snippet target)", "Long-form overview (H2s with keyword variants)", "What's included feature cards", "Business benefits", "Industries & tech", "Expert reviewer box (E-E-A-T)", "Sticky sidebar: sibling links + CTA", "Process, case study, testimonials", "7 FAQs + schema", "Related services", "Full lead form"]],
                ["Hire Developer (×22)", "/services/hire-dedicated-developers/{role}", ["Everything in Sub-service template, plus:", "Hiring models & price cards", "4-step hiring process", "Risk-free trial / replacement guarantee", "Hire-specific FAQs (cost, onboarding, interview, replacement)"]],
                ["About Us", "/about-us", ["Hero", "Stats", "Mission/Vision/Values", "Timeline", "Leadership with credentials", "Certifications", "Testimonials", "6 FAQs", "CTA"]],
                ["Blog & Post", "/blog, /blog/{slug}", ["Category filter", "Post: author + date, key takeaway, sticky TOC", "Contextual service CTA sidebar", "Author bio box", "6 FAQs + BlogPosting schema", "Related posts"]],
                ["Case Studies", "/case-studies/{slug}", ["Result metrics hero", "Overview, challenge, solution, stack, results", "Link back to service", "6 FAQs"]],
                ["Contact (no FAQs)", "/contact-us", ["Contact cards (email, phones, addresses, hours)", "Qualified form: service, budget, NDA", "Map", "ContactPage schema"]],
              ].map(([t, p, list]) => (
                <Card key={t as string}><h3 className="font-bold">{t as string}</h3><p className="mb-3 font-mono text-[11px] text-brand">{p as string}</p><ol className="list-decimal space-y-1 pl-5 text-sm text-muted">{(list as string[]).map((x) => <li key={x}>{x}</li>)}</ol></Card>
              ))}
            </div>
          </Block>

          {/* 5 KEYWORDS */}
          <Block id="keywords" title="5. Keyword Map & Meta Plan">
            <p className="mb-4 text-muted">One primary keyword per URL (no cannibalisation), secondary/LSI terms in H2s and body, meta titles ≤ 60 chars, descriptions 140–158 chars.</p>
            <div className="space-y-3">
              {SERVICES.map((c) => (
                <div key={c.slug} className="overflow-hidden rounded-2xl border border-line">
                  <button onClick={() => setOpenKw(openKw === c.slug ? null : c.slug)} className="flex w-full items-center justify-between bg-surface p-4 text-left font-semibold">
                    <span>{c.name} — <span className="text-brand">“{c.keyword}”</span></span><ChevronDown className={cn("h-4 w-4 transition", openKw === c.slug && "rotate-180")} />
                  </button>
                  {openKw === c.slug && (
                    <div className="overflow-x-auto">
                      <div className="border-b border-line p-4 text-sm"><b>Meta title:</b> {c.metaTitle}<br /><b>Meta description:</b> <span className="text-muted">{c.metaDesc}</span><br /><b>Secondary:</b> <span className="text-muted">{c.secondary.join(", ")}</span></div>
                      <table className="w-full min-w-[600px] text-sm">
                        <thead className="text-left text-xs uppercase text-muted"><tr><th className="p-3">Page</th><th className="p-3">Primary keyword</th><th className="p-3">Slug</th></tr></thead>
                        <tbody>{c.subs.map((s) => <tr key={s.slug} className="border-t border-line"><td className="p-3"><Link to={subPath(c, s)} className="hover:text-brand">{s.name}</Link></td><td className="p-3 text-brand">{s.keyword}</td><td className="p-3 font-mono text-xs text-muted">/{s.slug}</td></tr>)}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Block>

          {/* 6 SEO */}
          <Block id="seo" title="6. SEO • AEO • GEO • E-E-A-T Requirements">
            <div className="grid gap-4 md:grid-cols-2">
              <Card><h3 className="mb-3 font-bold">🔧 Technical SEO</h3><Check items={["Unique title, meta description, canonical, OG & Twitter tags per page", "Clean, lowercase, hyphenated, keyword slugs", "sitemap.xml (all URLs, priority, lastmod) + robots.txt", "HTML sitemap for users", "Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1", "WebP/AVIF images, lazy-load, width/height, descriptive alt text", "SSR / prerendering for production (Next.js or vite-plugin-ssg)", "HTTPS, 301 redirects, custom 404, hreflang if multi-region"]} /></Card>
              <Card><h3 className="mb-3 font-bold">🧩 Structured Data (JSON-LD)</h3><Check items={["Organization (+ aggregateRating, sameAs) — sitewide", "WebSite + SearchAction — home", "Service — core & sub-service pages", "BreadcrumbList — all inner pages", "FAQPage — every page except Contact", "BlogPosting — blog posts & case studies", "AboutPage / ContactPage", "Person — authors & reviewers", "Review — testimonials (verified only)"]} /></Card>
              <Card><h3 className="mb-3 font-bold">🗣 AEO (Answer Engine Optimization)</h3><Check items={["'Quick Answer' / 'What is X?' blocks answering in 40–60 words", "6–8 FAQs per page phrased as real queries (cost, time, process, why)", "Question-style H2/H3 headings", "Lists & tables that win featured snippets", "Conversational answers for voice search"]} /></Card>
              <Card><h3 className="mb-3 font-bold">🤖 GEO (Generative Engine Optimization)</h3><Check items={["Clear entity definition of the brand everywhere (same NAP)", "Original stats & numbers (cost ranges, timelines, results)", "Citable, factual sentences; no fluff", "Third-party mentions: Clutch, G2, GoodFirms, LinkedIn, PR", "Track citations in ChatGPT, Gemini, Perplexity & AI Overviews"]} /></Card>
              <Card className="md:col-span-2"><h3 className="mb-3 font-bold">🏅 E-E-A-T Signals</h3><div className="grid gap-2 md:grid-cols-2"><Check items={["Experience: real case studies with metrics", "Expertise: named author & 'Reviewed by' expert on every service page", "Authoritativeness: certifications, partner badges, awards"]} /><Check items={["Trust: address, phone, privacy/terms, NDA, ISO 27001", "'Last updated' dates on content", "Leadership page with credentials & LinkedIn"]} /></div></Card>
            </div>
          </Block>

          {/* 7 LINKING */}
          <Block id="linking" title="7. Internal Linking Strategy (Hub & Spoke)">
            <div className="grid items-center gap-4 md:grid-cols-5">
              {[["Home", "links to all 8 cores"], ["Services Hub", "links all cores + 70 subs"], ["Core (Pillar)", "↔ its subs, cases, blogs, other cores"], ["Sub (Cluster)", "↔ siblings, parent, related subs"], ["Blog / Case", "→ relevant service pages"]].map(([t, d], i) => (
                <div key={t} className="relative rounded-2xl grad-bg p-4 text-center text-white"><b>{t}</b><p className="mt-1 text-xs opacity-90">{d}</p>{i < 4 && <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-brand md:block">→</span>}</div>
              ))}
            </div>
            <Card className="mt-4"><Check items={["Mega menu + footer expose every core & popular sub (crawl depth ≤ 3)", "Breadcrumbs on every inner page", "Sidebar sibling links on all sub-service pages", "'You may also need' cross-sell links between services", "Contextual anchors with keyword-rich (not exact-match spam) text", "Blogs link to the money page they support; service pages link back to guides"]} /></Card>
          </Block>

          {/* 8 DESIGN */}
          <Block id="design" title="8. Design System & Themes">
            <p className="mb-4 text-muted">Site colors and fonts are set by the administrator. Visitors can switch between light and dark mode only. The palette concepts below are for reference.</p>
            <div className="flex flex-wrap gap-3">
              {THEMES.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-line p-3 pr-5">
                  <span className="h-10 w-10 rounded-xl" style={{ background: `linear-gradient(135deg, ${t.a}, ${t.b})` }} /><span className="text-sm font-semibold">{t.name}</span>
                </div>
              ))}
              <button onClick={() => setDark(!dark)} className="rounded-2xl border border-line px-5 font-semibold">{dark ? "☀ Light mode" : "🌙 Dark mode"}</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card><h3 className="font-bold">Typography</h3><p className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Space Grotesk</p><p className="text-sm text-muted">Headings</p><p className="mt-2 text-xl">Plus Jakarta Sans</p><p className="text-sm text-muted">Body text</p></Card>
              <Card><h3 className="mb-2 font-bold">Color Tokens</h3>{["brand", "brand-2", "bg", "surface", "ink", "muted", "line"].map((v) => <div key={v} className="flex items-center gap-2 py-0.5 text-sm"><span className="h-4 w-4 rounded border border-line" style={{ background: `var(--${v})` }} />--{v}</div>)}</Card>
              <Card><h3 className="mb-2 font-bold">Motion</h3><Check items={["Scroll reveal (IntersectionObserver)", "Counter animations", "Floating orbit hero", "Logo marquee", "Card lift + glow on hover", "Animated gradient blobs", "Respect prefers-reduced-motion"]} /></Card>
            </div>
          </Block>

          {/* 9 MODULES */}
          <Block id="modules" title="9. Modules & Features">
            <div className="grid gap-3 md:grid-cols-3">
              {["Mega menu navigation", "Admin-managed colors & fonts + visitor dark mode", "Dynamic SEO head manager", "JSON-LD schema generator", "FAQ accordion + schema", "Breadcrumbs", "PostgreSQL-backed contact leads", "Animated stats counters", "Testimonials", "Client logo marquee", "Case study engine", "Blog with categories, TOC, author box", "HTML + XML sitemap", "Cookie consent (GDPR) — phase 2", "Live chat / AI chatbot — phase 2", "Built-in PostgreSQL CMS", "Analytics: GA4, GTM, Clarity, Search Console", "Industry landing pages — phase 2"].map((m) => <Card key={m} className="!p-4 text-sm font-medium">⚡ {m}</Card>)}
            </div>
          </Block>

          {/* 10 TECH */}
          <Block id="tech" title="10. Tech Architecture & Project Files">
            <div className="grid gap-4 md:grid-cols-2">
              <Card><h3 className="mb-2 font-bold">Stack</h3><Check items={["React 19 + TypeScript + Vite", "React Router (data-driven routes for 90+ pages)", "Tailwind CSS v4 with CSS-variable theming", "lucide-react icons", "Production: prerender/SSR (Next.js App Router or vite-ssg) so crawlers get full HTML", "Hosting: Vercel / Netlify / AWS CloudFront", "CMS: headless (Strapi/Sanity) for blogs & case studies"]} /></Card>
              <Card><h3 className="mb-2 font-bold">Folder Structure</h3><pre className="overflow-x-auto text-xs leading-relaxed text-muted">{`src/
 ├ data/
 │  ├ site.ts        brand, stats, themes, team
 │  ├ services.ts    8 cores, ${totalSubs} subs, FAQs, keywords
 │  └ content.ts     blogs, case studies, page FAQs
 ├ components/
 │  ├ Header.tsx     mega menu, theme switcher
 │  ├ Footer.tsx     deep internal links
 │  ├ Seo.tsx        metas, canonical, JSON-LD
 │  └ ui.tsx         reusable sections
 ├ pages/            Home, CoreService, SubService,
 │                   Pages, Content, SitePlan
public/
 ├ robots.txt
 └ sitemap.xml`}</pre></Card>
            </div>
          </Block>

          {/* 11 ROADMAP */}
          <Block id="roadmap" title="11. Launch Roadmap">
            <div className="grid gap-4 md:grid-cols-4">
              {[["Week 1–2", "Discovery", ["Keyword research", "Competitor audit", "IA & wireframes"]], ["Week 3–5", "Design & Content", ["UI kit & themes", "Copywriting (E-E-A-T)", "FAQ + schema writing"]], ["Week 6–9", "Development", ["React build", "SSR/prerender", "CMS & forms"]], ["Week 10+", "Launch & Grow", ["QA & CWV", "Search Console + sitemap", "Content & link building"]]].map(([w, t, l]) => (
                <Card key={w as string}><span className="text-xs font-bold text-brand">{w as string}</span><h3 className="mt-1 text-lg font-bold">{t as string}</h3><div className="mt-2"><Check items={l as string[]} /></div></Card>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </>
  );
}
