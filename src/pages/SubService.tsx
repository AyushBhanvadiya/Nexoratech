import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, BadgeCheck, CalendarCheck } from "lucide-react";
import Seo, { breadcrumbSchema, faqSchema, serviceSchema } from "../components/Seo";
import { Btn, CTA, ContactForm, FaqList, PageHero, Process, Reveal, SectionHead, SvcIcon, Testimonials, TrustMarquee } from "../components/ui";
import { IndustryIcon, MediaImage } from "../components/media";
import { SERVICES, corePath, findCore, findSub, subFaqs, subPath } from "../data/services";
import { CASES } from "../data/content";
import { CASE_IMG } from "../data/images";
import { INDUSTRIES, TEAM } from "../data/site";
import NotFound from "./NotFound";

const reviewer: Record<string, number> = {
  "digital-marketing": 2, "graphic-design": 3, "ui-ux-design": 3, "ai-ml-development": 1, "custom-software-development": 1,
  "web-cms-development": 1, "mobile-app-development": 0, "hire-dedicated-developers": 0,
};
const title = (k: string) => k.replace(/\b\w/g, (m) => m.toUpperCase()).replace(/\bUi Ux\b/, "UI/UX").replace(/\bAi Ml\b/, "AI/ML").replace(/\bAi\b/g, "AI").replace(/\bSeo\b/g, "SEO").replace(/\bPpc\b/g, "PPC").replace(/\bJs\b/g, "JS").replace(/\bIos\b/g, "iOS").replace(/\bApi\b/g, "API").replace(/\bCrm\b/g, "CRM").replace(/\bErp\b/g, "ERP").replace(/\bMvp\b/g, "MVP").replace(/\bNlp\b/g, "NLP").replace(/\bLlm\b/g, "LLM").replace(/\bSaas\b/g, "SaaS").replace(/\bAeo\b/g, "AEO").replace(/\bGeo\b/g, "GEO").replace(/\b3d\b/g, "3D").replace(/Wordpress/g, "WordPress");

export default function SubService() {
  const { core: cs, sub: ss } = useParams();
  const core = findCore(cs);
  const sub = findSub(core, ss);
  if (!core || !sub) return <NotFound />;
  const isHire = core.slug === "hire-dedicated-developers";
  const path = subPath(core, sub);
  const crumbs = [{ name: "Services", path: "/services" }, { name: core.name, path: corePath(core) }, { name: sub.name, path }];
  const faqs = subFaqs(core, sub);
  const K = title(sub.keyword);
  const metaTitle = `${K} | ${isHire ? "Top 3% Talent, 48-Hr Onboarding" : "Expert Company"} | Nexovate`.slice(0, 68);
  const metaDesc = `${isHire ? `${K} on hourly, part-time or full-time basis.` : `Professional ${sub.keyword} by Nexovate.`} ${sub.desc} Free consultation & quote in 48 hours.`.slice(0, 158);
  const siblings = core.subs.filter((x) => x.slug !== sub.slug);
  const rev = TEAM[reviewer[core.slug] ?? 0];
  const kase = CASES.find((c) => c.service === core.slug) || CASES[0];
  const related = SERVICES.filter((c) => c.slug !== core.slug).slice(0, 4);

  return (
    <>
      <Seo title={metaTitle} description={metaDesc} path={path} keywords={[sub.keyword, ...sub.secondary, core.keyword]}
        schemas={[serviceSchema(sub.name, metaDesc, path, sub.keyword), breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero eyebrow={core.name} crumbs={crumbs} title={<>{K} <span className="grad-text">{isHire ? "in 48 Hours" : "That Deliver ROI"}</span></>} sub={sub.desc}>
        <div className="mt-8 flex flex-wrap gap-3"><Btn to="/contact-us">{isHire ? "Hire Now — Free Trial" : "Get a Free Quote"}</Btn><Btn to="#faqs" variant="ghost">Read FAQs</Btn></div>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted"><span className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-brand" />Reviewed by {rev.name}, {rev.role}</span><span className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-brand" />Updated May 2026</span></div>
      </PageHero>

      <TrustMarquee />

      <section className="py-16"><div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_340px]">
        <article className="prose-c">
          <Reveal className="mb-8 rounded-3xl border-l-4 border-brand bg-surface p-7"><p className="!mb-1 text-xs font-bold uppercase tracking-widest !text-brand">Quick Answer</p><p className="!mb-0 text-lg !text-ink">{isHire
            ? `To ${sub.keyword}, share your requirements with Nexovate, interview pre-vetted candidates within 24–48 hours and onboard your chosen expert with a 2-week risk-free trial — starting from $18/hour.`
            : `${sub.name} from Nexovate ${sub.desc.charAt(0).toLowerCase() + sub.desc.slice(1)} Delivered by certified specialists with transparent pricing and measurable KPIs.`}</p></Reveal>
          <h2>{isHire ? `Why ${K} from Nexovate?` : `Expert ${K} for Growing Businesses`}</h2>
          <p>{isHire
            ? `Finding reliable ${sub.name.replace(/^Hire /, "").toLowerCase()} is slow and expensive. Nexovate removes the hiring risk with a bench of pre-vetted professionals who have shipped real projects across ${INDUSTRIES.slice(0, 4).join(", ")} and more.`
            : `As part of our ${core.name.toLowerCase()} practice, our ${sub.name.toLowerCase()} team has delivered projects for startups, SMBs and enterprises in 30+ countries. We combine deep technical expertise with business understanding, so every deliverable is tied to outcomes like revenue, efficiency or user growth.`}</p>
          <p>Whether you're starting from scratch or improving an existing solution, we begin with a discovery session to understand your goals, audience and constraints, then craft a roadmap with clear milestones, timelines and success metrics.</p>
          <h2>What's Included in Our {sub.name} {isHire ? "Engagement" : "Services"}</h2>
          <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{sub.features.map((f, i) => <Reveal key={f} delay={i * 60} className="card-hover rounded-2xl border border-line bg-surface p-5"><CheckCircle2 className="h-6 w-6 text-brand" /><h3 className="!mt-3 !text-base font-bold">{f}</h3><p className="!mb-0 text-sm">Delivered with best practices, documentation and measurable quality benchmarks.</p></Reveal>)}</div>
          <h2>Business Benefits</h2><ul>{core.benefits.map((b) => <li key={b.title}><b className="text-ink">{b.title}:</b> {b.text}</li>)}</ul>
          {isHire && <><h2>Flexible Hiring Models & Pricing</h2><div className="not-prose my-6 grid gap-4 md:grid-cols-3">{[["Hourly", "$18–$40/hr", "Pay as you go, ideal for small tasks"], ["Part-Time", "$1,600+/mo", "80 hours per month"], ["Full-Time", "$2,800+/mo", "160 hours, dedicated to you"]].map(([t, p, d], i) => <div key={t} className={`rounded-2xl border p-5 ${i === 2 ? "border-brand bg-brand/5" : "border-line bg-surface"}`}><h3 className="!mt-0 font-bold">{t}</h3><div className="mt-2 text-2xl font-black grad-text">{p}</div><p className="!mb-0 mt-1 text-sm">{d}</p></div>)}</div><h2>How to Hire in 4 Simple Steps</h2><ul><li>Share your requirements and tech stack.</li><li>Receive hand-picked profiles within 24 hours.</li><li>Interview and assess your shortlisted candidates.</li><li>Onboard in 48 hours with a 2-week risk-free trial.</li></ul></>}
          <h2>Industries We Serve</h2><div className="not-prose flex flex-wrap gap-2">{INDUSTRIES.map((i) => <span key={i} className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-brand/10 text-brand"><IndustryIcon name={i} className="h-4 w-4" /></span>{i}</span>)}</div>
          <h2>Technologies & Tools</h2><div className="not-prose flex flex-wrap gap-2">{core.tech.map((t) => <span key={t} className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold">{t}</span>)}</div>
          <div className="not-prose mt-10 flex gap-4 rounded-3xl border border-line bg-surface p-6"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full grad-bg font-bold text-white">{rev.initials}</div><div><p className="text-xs font-semibold uppercase tracking-wider text-brand">Expert Reviewed</p><p className="font-bold">{rev.name} — {rev.role}</p><p className="text-sm text-muted">{rev.bio}</p></div></div>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start"><div className="rounded-3xl border border-line bg-surface p-5"><h3 className="mb-3 flex items-center gap-2 font-bold"><SvcIcon name={core.icon} className="h-5 w-5 text-brand" />{core.name}</h3><ul className="max-h-[22rem] space-y-1 overflow-y-auto"><li><Link to={corePath(core)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand hover:bg-bg">Overview →</Link></li>{siblings.map((x) => <li key={x.slug}><Link to={subPath(core, x)} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-bg hover:text-brand">{x.name}</Link></li>)}</ul></div><div className="rounded-3xl grad-bg p-6 text-white"><h3 className="text-xl font-bold">Free consultation</h3><p className="mt-2 text-sm text-white/85">Talk to a {sub.name.replace(/^Hire /, "")} expert. Get a proposal in 48 hours.</p><Link to="/contact-us" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">Contact Us <ArrowRight className="h-4 w-4" /></Link></div></aside>
      </div></section>

      <Process />
      <section className="py-16"><div className="mx-auto max-w-5xl px-4"><Link to={`/case-studies/${kase.slug}`} className="card-hover group grid gap-6 overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-[1fr_1fr]"><MediaImage src={CASE_IMG[kase.slug].src} alt={CASE_IMG[kase.slug].alt} className="h-full min-h-56 !aspect-video md:!aspect-auto"><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-4 left-5 text-white"><div className="text-5xl font-black">{kase.results[0].v}</div><div className="text-sm">{kase.results[0].l}</div></div></MediaImage><div className="p-7"><span className="text-xs font-semibold uppercase text-brand">Featured Case Study</span><h3 className="mt-2 text-2xl font-bold">{kase.title}</h3><p className="mt-2 text-muted">{kase.summary}</p><span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand">Read case study <ArrowRight className="h-4 w-4" /></span></div></Link></div></section>
      <Testimonials />
      <FaqList faqs={faqs} title={`${sub.name} — FAQs`} />
      <section className="py-12"><div className="mx-auto max-w-7xl px-4"><SectionHead eyebrow="Complete Your Stack" title="You may also need" /><div className="grid gap-4 md:grid-cols-4">{related.map((c) => <Link key={c.slug} to={subPath(c, c.subs[0])} className="card-hover rounded-2xl border border-line bg-surface p-5"><SvcIcon name={c.icon} className="h-6 w-6 text-brand" /><h3 className="mt-3 font-bold">{c.subs[0].name}</h3><p className="text-xs text-muted">{c.name}</p></Link>)}</div></div></section>
      <section className="py-12"><div className="mx-auto max-w-4xl px-4"><SectionHead eyebrow="Free Quote Request" title={<>Start your <span className="grad-text">{sub.name}</span> project</>} /><ContactForm /></div></section>
      <CTA />
    </>
  );
}