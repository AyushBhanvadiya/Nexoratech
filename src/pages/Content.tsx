import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import Seo, { articleSchema, breadcrumbSchema, faqSchema } from "../components/Seo";
import { CTA, FaqList, PageHero, Reveal, SvcIcon } from "../components/ui";
import { BLOGS, BLOG_INDEX_FAQS, CASES, CASE_INDEX_FAQS } from "../data/content";
import { SERVICES, corePath, findCore } from "../data/services";
import { TEAM } from "../data/site";
import { MediaImage } from "../components/media";
import { BLOG_IMG, CASE_IMG } from "../data/images";
import { cn } from "../utils/cn";
import NotFound from "./NotFound";

export function BlogIndex() {
  const cats = ["All", ...Array.from(new Set(BLOGS.map((b) => b.category)))];
  const [cat, setCat] = useState("All");
  const list = BLOGS.filter((b) => cat === "All" || b.category === cat);
  const crumbs = [{ name: "Blog", path: "/blog" }];
  return (
    <>
      <Seo title="IT, AI, Software & Marketing Blog | Expert Insights | Nexovate" description="Expert guides on software development, AI/ML, mobile apps, UI/UX, SEO, AEO & GEO written by Nexovate practitioners with 10+ years of experience." path="/blog" schemas={[breadcrumbSchema(crumbs), faqSchema(BLOG_INDEX_FAQS)]} />
      <PageHero eyebrow="Blog & Insights" crumbs={crumbs} title={<>Insights from <span className="grad-text">Practitioners</span>, Not Copywriters</>} sub="Actionable guides, cost breakdowns and frameworks from our engineers, designers and marketers." />
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold", cat === c ? "grad-bg border-transparent text-white" : "border-line bg-surface hover:border-brand")}>{c}</button>)}</div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <Link to={`/blog/${b.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
                  <MediaImage src={BLOG_IMG[b.slug].src} alt={BLOG_IMG[b.slug].alt}>
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">{b.category}</span>
                  </MediaImage>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-bold group-hover:text-brand">{b.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted">{b.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted"><span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{b.author}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{b.read} min</span></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FaqList faqs={BLOG_INDEX_FAQS} />
      <CTA />
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const b = BLOGS.find((x) => x.slug === slug);
  if (!b) return <NotFound />;
  const path = `/blog/${b.slug}`;
  const crumbs = [{ name: "Blog", path: "/blog" }, { name: b.title, path }];
  const core = findCore(b.service);
  const author = TEAM.find((t) => t.name === b.author);
  return (
    <>
      <Seo type="article" title={`${b.title} | Nexovate Blog`} description={b.excerpt} path={path} keywords={[b.keyword]} schemas={[articleSchema(b.title, b.excerpt, path, b.author, b.date), breadcrumbSchema(crumbs), faqSchema(b.faqs)]} />
      <PageHero eyebrow={b.category} crumbs={crumbs} title={b.title} sub={b.excerpt}>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted"><span>By <b className="text-ink">{b.author}</b>, {b.authorRole}</span><span>Published {new Date(b.date).toLocaleDateString("en-US", { dateStyle: "long" })}</span><span>{b.read} min read</span></div>
      </PageHero>
      <section className="pb-10">
        <div className="mx-auto max-w-5xl px-4">
          <MediaImage src={BLOG_IMG[b.slug].src} alt={BLOG_IMG[b.slug].alt} className="rounded-3xl border border-line shadow-xl" />
        </div>
      </section>
      <section className="pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[240px_1fr_280px]">
          <aside className="hidden lg:block"><div className="sticky top-28 rounded-2xl border border-line bg-surface p-5"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Table of Contents</p>{b.body.map((s, i) => <a key={s.h} href={`#s${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`s${i}`)?.scrollIntoView({ behavior: "smooth" }); }} className="block py-1.5 text-sm text-muted hover:text-brand">{s.h}</a>)}</div></aside>
          <article className="prose-c">
            <div className="mb-8 rounded-2xl border-l-4 border-brand bg-surface p-6"><p className="!mb-1 text-xs font-bold uppercase !text-brand">Key Takeaway</p><p className="!mb-0 !text-ink">{b.body[0].p[0]}</p></div>
            {b.body.map((s, i) => <div key={s.h} id={`s${i}`}><h2>{s.h}</h2>{s.p.map((p) => <p key={p}>{p}</p>)}</div>)}
            {author && <div className="mt-10 flex gap-4 rounded-3xl border border-line bg-surface p-6"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full grad-bg font-bold text-white">{author.initials}</div><div><p className="!mb-0 font-bold !text-ink">About the author: {author.name}</p><p className="!mb-0 text-sm">{author.bio}</p></div></div>}
          </article>
          <aside className="space-y-5">{core && <Link to={corePath(core)} className="card-hover sticky top-28 block rounded-3xl grad-bg p-6 text-white"><SvcIcon name={core.icon} className="h-7 w-7" /><h3 className="mt-3 text-lg font-bold">Need help with {core.name}?</h3><p className="mt-1 text-sm text-white/85">{core.tagline}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Explore service <ArrowRight className="h-4 w-4" /></span></Link>}</aside>
        </div>
      </section>
      <FaqList faqs={b.faqs} />
      <section className="pb-12"><div className="mx-auto max-w-7xl px-4"><h2 className="mb-5 text-2xl font-bold">Keep reading</h2><div className="grid gap-4 md:grid-cols-3">{BLOGS.filter((x) => x.slug !== b.slug).slice(0, 3).map((x) => <Link key={x.slug} to={`/blog/${x.slug}`} className="card-hover group overflow-hidden rounded-2xl border border-line bg-surface"><MediaImage src={BLOG_IMG[x.slug].src} alt={BLOG_IMG[x.slug].alt} /><div className="p-5"><span className="text-xs font-semibold text-brand">{x.category}</span><h3 className="mt-1 font-bold">{x.title}</h3></div></Link>)}</div></div></section>
      <CTA />
    </>
  );
}

export function CaseIndex() {
  const crumbs = [{ name: "Case Studies", path: "/case-studies" }];
  return (
    <>
      <Seo title="Case Studies | Proven IT Project Results | Nexovate" description="Explore Nexovate case studies across fintech, healthcare, eCommerce, EdTech and logistics — real challenges, solutions and measurable results." path="/case-studies" schemas={[breadcrumbSchema(crumbs), faqSchema(CASE_INDEX_FAQS)]} />
      <PageHero eyebrow="Case Studies" crumbs={crumbs} title={<>Proof Over <span className="grad-text">Promises</span></>} sub="Measurable outcomes from real client engagements across industries." />
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 80}>
              <Link to={`/case-studies/${c.slug}`} className="card-hover group block overflow-hidden rounded-3xl border border-line bg-surface">
                <MediaImage src={CASE_IMG[c.slug].src} alt={CASE_IMG[c.slug].alt}>
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">{c.industry}</span>
                </MediaImage>
                <div className="grad-bg grid grid-cols-3 gap-3 p-5 text-white">{c.results.map((r) => <div key={r.l}><div className="text-2xl font-black">{r.v}</div><div className="text-xs opacity-90">{r.l}</div></div>)}</div>
                <div className="p-7"><span className="text-xs font-semibold uppercase text-brand">{c.industry} · {c.client}</span><h2 className="mt-2 text-xl font-bold group-hover:text-brand">{c.title}</h2><p className="mt-2 text-muted">{c.summary}</p><div className="mt-4 flex flex-wrap gap-2">{c.tech.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</span>)}</div></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FaqList faqs={CASE_INDEX_FAQS} />
      <CTA />
    </>
  );
}

export function CaseDetail() {
  const { slug } = useParams();
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return <NotFound />;
  const path = `/case-studies/${c.slug}`;
  const crumbs = [{ name: "Case Studies", path: "/case-studies" }, { name: c.client, path }];
  const core = SERVICES.find((s) => s.slug === c.service)!;
  return (
    <>
      <Seo title={`${c.title} | ${c.client} Case Study | Nexovate`} description={`${c.summary} See how Nexovate delivered ${c.results.map((r) => `${r.v} ${r.l.toLowerCase()}`).join(", ")}.`.slice(0, 158)} path={path} schemas={[breadcrumbSchema(crumbs), faqSchema(c.faqs), articleSchema(c.title, c.summary, path, "Nexovate Team", "2026-01-15")]} />
      <PageHero eyebrow={`${c.industry} Case Study`} crumbs={crumbs} title={c.title} sub={c.summary} />
      <section className="pb-10"><div className="mx-auto max-w-5xl px-4"><MediaImage src={CASE_IMG[c.slug].src} alt={CASE_IMG[c.slug].alt} className="rounded-3xl border border-line shadow-xl" /></div></section>
      <section className="pb-12"><div className="mx-auto grid max-w-5xl grid-cols-3 gap-4 px-4">{c.results.map((r) => <Reveal key={r.l} className="rounded-3xl border border-line bg-surface p-6 text-center"><div className="text-4xl font-black grad-text md:text-5xl">{r.v}</div><div className="mt-1 text-sm text-muted">{r.l}</div></Reveal>)}</div></section>
      <section className="pb-16"><div className="prose-c mx-auto max-w-3xl px-4">
        <h2>Client Overview</h2><p><b className="text-ink">{c.client}</b> is a leading {c.industry.toLowerCase()} company. They partnered with Nexovate's <Link to={corePath(core)} className="font-semibold text-brand">{core.name}</Link> team.</p>
        <h2>The Challenge</h2><p>{c.challenge}</p>
        <h2>Our Solution</h2><p>{c.solution}</p>
        <h2>Technology Stack</h2><div className="flex flex-wrap gap-2">{c.tech.map((t) => <span key={t} className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold">{t}</span>)}</div>
        <h2>The Results</h2><ul>{c.results.map((r) => <li key={r.l}><b className="text-ink">{r.v}</b> {r.l.toLowerCase()}</li>)}</ul>
      </div></section>
      <FaqList faqs={c.faqs} />
      <CTA title="Want results like these?" />
    </>
  );
}
