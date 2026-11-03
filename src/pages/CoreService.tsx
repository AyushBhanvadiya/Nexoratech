import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Seo, { breadcrumbSchema, faqSchema, serviceSchema } from "../components/Seo";
import { Btn, CTA, FaqList, PageHero, Process, Reveal, SectionHead, Stats, SvcIcon, Testimonials } from "../components/ui";
import { SERVICES, corePath, findCore, subPath } from "../data/services";
import { BLOGS, CASES } from "../data/content";
import { MediaImage } from "../components/media";
import { BLOG_IMG, CASE_IMG } from "../data/images";
import NotFound from "./NotFound";

export default function CoreService() {
  const { core: slug } = useParams();
  const core = findCore(slug);
  if (!core) return <NotFound />;
  const path = corePath(core);
  const crumbs = [{ name: "Services", path: "/services" }, { name: core.name, path }];
  const cases = CASES.filter((c) => c.service === core.slug);
  const blogs = BLOGS.filter((b) => b.service === core.slug);
  const others = SERVICES.filter((c) => c.slug !== core.slug);

  return (
    <>
      <Seo title={core.metaTitle} description={core.metaDesc} path={path} keywords={[core.keyword, ...core.secondary]}
        schemas={[serviceSchema(core.name, core.metaDesc, path, core.keyword), breadcrumbSchema(crumbs), faqSchema(core.faqs)]} />
      <PageHero eyebrow={core.name} crumbs={crumbs}
        title={<>{core.keyword.replace(/\b\w/g, (m) => m.toUpperCase()).replace("Ui Ux", "UI/UX").replace("Ai Ml", "AI/ML")} <span className="grad-text">That Drive Real Results</span></>}
        sub={core.tagline + " Trusted by 500+ businesses worldwide."}>
        <div className="mt-8 flex flex-wrap gap-3"><Btn to="/contact-us">Get a Free Quote</Btn><Btn to="#services" variant="ghost">View Solutions</Btn></div>
      </PageHero>

      <section className="py-12"><div className="mx-auto max-w-5xl px-4"><Reveal className="rounded-3xl border-l-4 border-brand bg-surface p-8"><h2 className="text-2xl font-bold">What are {core.keyword}?</h2><p className="mt-3 text-lg leading-relaxed text-muted">{core.intro}</p></Reveal></div></section>

      <section className="py-16" id="services"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow={`${core.subs.length} Specialised Solutions`} title={<>Our {core.name} <span className="grad-text">Services</span></>} sub="Every solution is delivered by a dedicated expert team with a defined scope, timeline and KPIs." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{core.subs.map((s, i) => <Reveal key={s.slug} delay={(i % 6) * 60}><Link to={subPath(core, s)} className="card-hover group flex h-full flex-col rounded-3xl border border-line bg-surface p-6">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl grad-bg text-white"><SvcIcon name={core.icon} className="h-5 w-5" /></span><h3 className="text-lg font-bold group-hover:text-brand">{s.name}</h3></div>
          <p className="mt-3 flex-1 text-sm text-muted">{s.desc}</p><ul className="mt-4 grid grid-cols-2 gap-1.5 text-xs text-muted">{s.features.map((f) => <li key={f} className="flex gap-1"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand" />{f}</li>)}</ul>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link></Reveal>)}</div>
      </div></section>

      <section className="bg-surface py-20"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="The Nexovate Difference" title={<>Why businesses choose Nexovate for <span className="grad-text">{core.name}</span></>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{core.benefits.map((b, i) => <Reveal key={b.title} delay={i * 70} className="card-hover rounded-3xl border border-line bg-bg p-6"><div className="text-4xl font-black grad-text">0{i + 1}</div><h3 className="mt-3 text-lg font-bold">{b.title}</h3><p className="mt-2 text-sm text-muted">{b.text}</p></Reveal>)}</div>
      </div></section>

      <Stats />
      <section className="py-16"><div className="mx-auto max-w-6xl px-4"><SectionHead eyebrow="Proven Technology Stack" title={<>Tools & technologies <span className="grad-text">we master</span></>} /><div className="flex flex-wrap justify-center gap-3">{core.tech.map((t, i) => <Reveal key={t} delay={i * 30}><span className="card-hover inline-block rounded-2xl border border-line bg-surface px-5 py-3 font-semibold">{t}</span></Reveal>)}</div></div></section>

      <Process />

      {cases.length > 0 && <section className="py-20"><div className="mx-auto max-w-7xl px-4"><SectionHead eyebrow="Results That Speak" title={<>{core.name} <span className="grad-text">success stories</span></>} /><div className="grid gap-6 md:grid-cols-2">{cases.map((c) => <Link key={c.slug} to={`/case-studies/${c.slug}`} className="card-hover group overflow-hidden rounded-3xl border border-line bg-surface"><MediaImage src={CASE_IMG[c.slug].src} alt={CASE_IMG[c.slug].alt} /><div className="p-7"><span className="text-xs font-semibold uppercase text-brand">{c.industry} · {c.client}</span><h3 className="mt-2 text-xl font-bold">{c.title}</h3><div className="mt-5 grid grid-cols-3 gap-3">{c.results.map((r) => <div key={r.l}><div className="text-2xl font-black grad-text">{r.v}</div><div className="text-xs text-muted">{r.l}</div></div>)}</div></div></Link>)}</div></div></section>}

      <Testimonials />

      {blogs.length > 0 && <section className="bg-surface py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="mb-6 text-2xl font-bold">Related insights</h2><div className="grid gap-4 md:grid-cols-3">{blogs.map((b) => <Link key={b.slug} to={`/blog/${b.slug}`} className="card-hover group overflow-hidden rounded-2xl border border-line bg-bg"><MediaImage src={BLOG_IMG[b.slug].src} alt={BLOG_IMG[b.slug].alt} /><div className="p-5"><h3 className="font-bold">{b.title}</h3><p className="mt-1 text-sm text-muted">{b.read} min read</p></div></Link>)}</div></div></section>}

      <FaqList faqs={core.faqs} title={`${core.name} — FAQs`} />
      <section className="py-12"><div className="mx-auto max-w-7xl px-4"><h2 className="mb-6 text-2xl font-bold">Explore our other services</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{others.map((o) => <Link key={o.slug} to={corePath(o)} className="card-hover flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 font-semibold"><SvcIcon name={o.icon} className="h-5 w-5 text-brand" />{o.name}</Link>)}</div></div></section>
      <CTA title={`Let's discuss your ${core.name.toLowerCase()} project`} />
    </>
  );
}