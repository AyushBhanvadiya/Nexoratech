import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Award, Clock, Users, Star, Zap, Rocket, Briefcase } from "lucide-react";
import Seo, { faqSchema } from "../components/Seo";
import { Badges, Btn, CTA, ContactForm, FaqList, Process, Reveal, SectionHead, Stats, SvcIcon, Testimonials, TrustMarquee } from "../components/ui";
import { IndustryIcon, MediaImage } from "../components/media";
import { SERVICES, corePath, subPath } from "../data/services";
import { BLOGS, CASES, HOME_FAQS } from "../data/content";
import { BLOG_IMG, CASE_IMG } from "../data/images";
import { INDUSTRIES, SITE } from "../data/site";
import { getPageDoc } from "../cms";

const WORDS = ["Software", "AI Solutions", "Mobile Apps", "Websites", "Brands", "Growth"];

export default function Home() {
  const [w, setW] = useState(0);
  const page = getPageDoc("/");
  useEffect(() => { const t = setInterval(() => setW((x) => (x + 1) % WORDS.length), 2200); return () => clearInterval(t); }, []);
  return (
    <>
      <Seo title="IT Development Company | Software, AI, Apps & Marketing | Nexovate"
        description="Nexovate is a trusted IT development company offering custom software, AI/ML, mobile apps, web development, UI/UX, graphic design & digital marketing. 850+ projects, 4.9★ rated."
        path="/" keywords={["IT development company", "software development company", "IT services company", "AI development company", "mobile app development company", "digital marketing agency"]}
        schemas={[faqSchema(HOME_FAQS), { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.domain, potentialAction: { "@type": "SearchAction", target: `${SITE.domain}/search?q={query}`, "query-input": "required name=query" } }]} />

      <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
        <div className="grid-bg absolute inset-0" />
        <div className="blob absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-3xl" />
        <div className="blob absolute -right-32 top-32 h-[28rem] w-[28rem] rounded-full bg-brand2/25 blur-3xl" style={{ animationDelay: "-6s" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm">
              <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span>
              4.9/5 from 186+ verified Clutch reviews
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-7xl">{page.heroTitle || <>IT Development Company Engineering{" "}<span key={w} className="fade-down inline-block grad-text">{WORDS[w]}</span></>}</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{page.heroSub || "We design, build and scale custom software, AI solutions, mobile apps and high-performing websites — then grow them with SEO and digital marketing. One accountable partner from idea to market leadership."}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn to="/contact-us">Book a Free Consultation</Btn><Btn to="/services" variant="ghost">Explore Services</Btn></div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand" />ISO 27001 Secure</span>
              <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-brand" />48-hr Proposal</span>
              <span className="flex items-center gap-2"><Award className="h-5 w-5 text-brand" />NDA & IP Protected</span>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="spin-slow absolute inset-0 rounded-full border-2 border-dashed border-brand/30" />
              <div className="absolute inset-10 rounded-full grad-bg opacity-90 blur-[2px]" />
              <div className="absolute inset-10 grid place-items-center rounded-full"><div className="text-center text-white"><div className="text-6xl font-black" style={{ fontFamily: "var(--font-display)" }}>850+</div><div className="text-sm font-medium opacity-90">Products Shipped</div></div></div>
              {SERVICES.slice(0, 6).map((c, i) => {
                const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
                return <Link key={c.slug} to={corePath(c)} className="floaty absolute flex items-center gap-2 rounded-2xl border border-line bg-bg/90 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur hover:border-brand"
                  style={{ left: `${50 + Math.cos(ang) * 48}%`, top: `${50 + Math.sin(ang) * 48}%`, transform: "translate(-50%,-50%)", animationDelay: `${i * -1}s` }}><SvcIcon name={c.icon} className="h-4 w-4 text-brand" />{c.name.split(" ")[0]} {c.name.split(" ")[1]?.replace("&", "") || ""}</Link>;
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <TrustMarquee />

      <section className="py-24"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Our Core Services" title={<>End-to-end <span className="grad-text">IT development services</span> under one roof</>} sub="Eight specialised practices, 70+ solutions — designed to work together so your product, brand and growth engine stay perfectly aligned." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{SERVICES.map((c, i) => <Reveal key={c.slug} delay={i * 60} className="card-hover group flex flex-col rounded-3xl border border-line bg-surface p-6">
          <div className="grid h-12 w-12 place-items-center rounded-2xl grad-bg text-white transition group-hover:rotate-6 group-hover:scale-110"><SvcIcon name={c.icon} className="h-6 w-6" /></div>
          <h3 className="mt-5 text-xl font-bold"><Link to={corePath(c)} className="hover:text-brand">{c.name}</Link></h3><p className="mt-2 text-sm text-muted">{c.tagline}</p>
          <ul className="mt-4 flex-1 space-y-1.5">{c.subs.slice(0, 4).map((s) => <li key={s.slug}><Link to={subPath(c, s)} className="text-sm text-muted hover:text-brand">→ {s.name}</Link></li>)}</ul>
          <Link to={corePath(c)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">Explore {c.subs.length} services <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
        </Reveal>)}</div>
      </div></section>

      <Stats />
      <section className="py-24"><div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
        <div><SectionHead center={false} eyebrow="The Nexovate Advantage" title={<>Experience you can <span className="grad-text">verify</span>, results you can measure</>} sub="We don't ask for blind trust. Every claim is backed by certifications, verified reviews, real case studies and named experts." /><Btn to="/about-us">Meet Our Leadership</Btn></div>
        <div className="grid gap-4 sm:grid-cols-2">{[
          { I: Award, t: "12+ Years of Experience", d: "Since 2014, delivering for startups to Fortune 500 brands across 30+ countries." },
          { I: Users, t: "320+ In-house Experts", d: "No freelancers. Certified engineers, designers, marketers and data scientists." },
          { I: ShieldCheck, t: "Enterprise-grade Security", d: "ISO 27001, GDPR, HIPAA-ready processes and signed NDAs." },
          { I: Zap, t: "Agile & Transparent", d: "Bi-weekly demos, live dashboards and a dedicated PM for every project." },
        ].map(({ I, t, d }, i) => <Reveal key={t} delay={i * 80} className="card-hover rounded-3xl border border-line bg-surface p-6"><I className="h-8 w-8 text-brand" /><h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></Reveal>)}</div>
      </div><div className="mx-auto mt-14 max-w-6xl px-4"><Badges /></div></section>

      <Process />

      <section className="py-24"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Industries We Serve" title={<>Domain expertise across <span className="grad-text">10+ industries</span></>} />
        <div className="flex flex-wrap justify-center gap-3">{INDUSTRIES.map((ind, i) => <Reveal key={ind} delay={i * 40}><span className="card-hover inline-flex items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-2.5 pr-5 font-medium"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand"><IndustryIcon name={ind} className="h-5 w-5" /></span>{ind}</span></Reveal>)}</div>
      </div></section>

      <section className="bg-surface py-24"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Featured Success Stories" title={<>Real projects. <span className="grad-text">Real outcomes.</span></>} sub="A snapshot of measurable results we've delivered for our clients." />
        <div className="grid gap-6 md:grid-cols-3">{CASES.slice(0, 3).map((c, i) => <Reveal key={c.slug} delay={i * 80}><Link to={`/case-studies/${c.slug}`} className="card-hover group block h-full overflow-hidden rounded-3xl border border-line bg-bg">
          <MediaImage src={CASE_IMG[c.slug].src} alt={CASE_IMG[c.slug].alt}><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">{c.industry}</span><div className="absolute bottom-4 left-5 text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>{c.results[0].v} <span className="text-sm font-medium">{c.results[0].l}</span></div></MediaImage>
          <div className="p-6"><p className="text-sm text-muted">{c.client}</p><h3 className="mt-1 text-lg font-bold group-hover:text-brand">{c.title}</h3><p className="mt-2 text-sm text-muted">{c.summary}</p></div>
        </Link></Reveal>)}</div><div className="mt-10 text-center"><Btn to="/case-studies" variant="ghost">View All Case Studies</Btn></div>
      </div></section>

      <section className="py-24"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Flexible Engagement Models" title={<>The right model for <span className="grad-text">your goals & budget</span></>} />
        <div className="grid gap-6 md:grid-cols-3">{[
          { I: Briefcase, t: "Fixed Price", d: "Best for well-defined scopes with clear deliverables, timeline and budget.", f: ["Fixed budget", "Defined milestones", "Low risk"] },
          { I: Clock, t: "Time & Material", d: "Ideal for evolving products where flexibility and iteration matter.", f: ["Pay for actual effort", "Change anytime", "Agile sprints"] },
          { I: Rocket, t: "Dedicated Team", d: "A full-time extension of your team for long-term product development.", f: ["Full control", "Scale on demand", "48-hr onboarding"] },
        ].map(({ I, t, d, f }, i) => <Reveal key={t} delay={i * 80} className={`card-hover rounded-3xl border p-8 ${i === 2 ? "border-brand bg-brand/5" : "border-line bg-surface"}`}><I className="h-9 w-9 text-brand" /><h3 className="mt-4 text-2xl font-bold">{t}</h3><p className="mt-2 text-muted">{d}</p><ul className="mt-5 space-y-2 text-sm">{f.map((x) => <li key={x}>✓ {x}</li>)}</ul></Reveal>)}</div>
      </div></section>

      <Testimonials />
      <section className="bg-surface py-24"><div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Latest From Our Blog" title={<>Expert guides from <span className="grad-text">our practitioners</span></>} />
        <div className="grid gap-6 md:grid-cols-3">{BLOGS.slice(0, 3).map((b, i) => <Reveal key={b.slug} delay={i * 80}><Link to={`/blog/${b.slug}`} className="card-hover group block h-full overflow-hidden rounded-3xl border border-line bg-bg"><MediaImage src={BLOG_IMG[b.slug].src} alt={BLOG_IMG[b.slug].alt} /><div className="p-6"><span className="text-xs font-semibold uppercase tracking-wider text-brand">{b.category}</span><h3 className="mt-3 text-lg font-bold group-hover:text-brand">{b.title}</h3><p className="mt-2 text-sm text-muted">{b.excerpt}</p><p className="mt-4 text-xs text-muted">By {b.author} · {b.read} min read</p></div></Link></Reveal>)}</div>
      </div></section>
      <FaqList faqs={HOME_FAQS} />
      <section className="pb-10"><div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_1.3fr]">
        <Reveal><SectionHead center={false} eyebrow="Start Your Project" title={<>Get your <span className="grad-text">free project estimate</span></>} sub="Tell us what you're building. A senior consultant will reply within 24 hours with ideas, timeline and cost." /><ul className="space-y-3 text-muted"><li>✓ Free 30-minute strategy session</li><li>✓ Detailed proposal in 48 hours</li><li>✓ NDA signed before discussion</li></ul></Reveal>
        <Reveal delay={120}><ContactForm compact /></Reveal>
      </div></section>
      <CTA />
    </>
  );
}