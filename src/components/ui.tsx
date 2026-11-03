import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Megaphone, Globe, Palette, Code2, PenTool, Brain, Smartphone, Users, ChevronDown, ChevronRight, Star,
  ArrowRight, Home, Quote, CheckCircle2, Send, type LucideIcon,
} from "lucide-react";
import type { Faq } from "../data/services";
import { CLIENTS, SITE, TESTIMONIALS, TRUST_BADGES, SITE as S } from "../data/site";
import { EyebrowTag } from "../eyebrow";
import { Avatar, LogoImg } from "./media";
import { IS_PREVIEW } from "../preview";
import { getPageDoc, API_BASE } from "../cms";
import { cn } from "../utils/cn";

const ICONS: Record<string, LucideIcon> = { Megaphone, Globe, Palette, Code2, PenTool, Brain, Smartphone, Users };
export function SvcIcon({ name, className }: { name: string; className?: string }) {
  const I = ICONS[name] || Code2;
  return <I className={className} />;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, sub, center = true }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean }) {
  const section = getPageDoc(window.location.hash.slice(1) || "/").sections?.[eyebrow];
  return (
    <Reveal className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      <EyebrowTag text={eyebrow} center={center} />
      <h2 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">{section?.title || title}</h2>
      {(section?.sub || sub) && <p className="mt-4 text-lg text-muted">{section?.sub || sub}</p>}
    </Reveal>
  );
}

export function FaqList({ faqs, title = "Frequently Asked Questions", eyebrow = "Questions, Answered" }: { faqs: Faq[]; title?: string; eyebrow?: string }) {
  const savedFaqs = getPageDoc(window.location.hash.slice(1) || "/").faqs;
  const pageFaqs = savedFaqs?.length ? savedFaqs : faqs;
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20" id="faqs">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHead eyebrow={eyebrow} title={title} sub="Quick, direct answers to the questions our clients ask most." />
        <div className="space-y-3">
          {pageFaqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div className={cn("rounded-2xl border bg-surface transition", open === i ? "border-brand/50" : "border-line")}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={open === i}>
                  <h3 className="text-base font-semibold md:text-lg">{f.q}</h3>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-brand transition", open === i && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden"><p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
      <Link to="/" className="flex items-center gap-1 hover:text-brand"><Home className="h-3.5 w-3.5" />Home</Link>
      {items.map((it, i) => (
        <span key={it.path} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {i === items.length - 1 ? <span className="text-ink">{it.name}</span> : <Link to={it.path} className="hover:text-brand">{it.name}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ eyebrow, title, sub, crumbs, children }: { eyebrow: string; title: ReactNode; sub: string; crumbs: { name: string; path: string }[]; children?: ReactNode }) {
  const page = getPageDoc(window.location.hash.slice(1) || "/");
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <div className="grid-bg absolute inset-0" />
      <div className="blob absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
      <div className="blob absolute -right-20 top-40 h-72 w-72 rounded-full bg-brand2/25 blur-3xl" style={{ animationDelay: "-5s" }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <Breadcrumbs items={crumbs} />
        <Reveal className="mt-6 max-w-4xl">
          <EyebrowTag text={eyebrow} />
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">{page.heroTitle || title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-muted md:text-xl">{page.heroSub || sub}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function Btn({ to, children, variant = "primary", className }: { to: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const cls = cn(
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition",
    variant === "primary" ? "grad-bg text-white shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:scale-[1.03]" : "border border-line bg-surface hover:border-brand",
    className);
  const inner = <>{children}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>;
  if (to.startsWith("#")) return <button type="button" className={cls} onClick={() => document.getElementById(to.slice(1))?.scrollIntoView({ behavior: "smooth" })}>{inner}</button>;
  return <Link to={to} className={cls}>{inner}</Link>;
}

export function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(IS_PREVIEW ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || IS_PREVIEW) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1600); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
        {SITE.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="rounded-3xl border border-line bg-surface p-6 text-center">
            <div className="text-4xl font-bold grad-text md:text-5xl" style={{ fontFamily: "var(--font-display)" }}><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TrustMarquee() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-line bg-surface py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-muted">Trusted by 500+ startups & enterprises worldwide</p>
      <div className="overflow-hidden">
        <div className="marquee flex w-max">
          {items.map((c, i) => (
            <div key={i} className="mr-5 flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
              <LogoImg src={c.logo} name={c.name} className="h-8 w-8" />
              <span className="whitespace-nowrap text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Badges() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {TRUST_BADGES.map((b) => (
        <div key={b.name} className="card-hover flex items-center gap-3 rounded-2xl border border-line bg-bg p-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white p-2">
            <LogoImg src={b.logo} name={b.name} className="h-full w-full" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold leading-tight">{b.name}</span>
            <span className="mt-0.5 block text-xs text-muted">{b.caption}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Verified Client Reviews" title={<>Rated <span className="grad-text">4.9/5</span> on Clutch & Google</>} sub="Verified feedback from founders, CTOs and marketing leaders." />
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="card-hover rounded-3xl border border-line bg-surface p-7">
              <Quote className="h-8 w-8 text-brand" />
              <p className="mt-4 text-lg leading-relaxed">“{t.text}”</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={t.photo} name={t.name} className="h-14 w-14 shrink-0" />
                  <div><div className="font-semibold">{t.name}</div><div className="text-sm text-muted">{t.role}</div></div>
                </div>
                <div className="flex">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ steps }: { steps?: { t: string; d: string }[] }) {
  const list = steps || [
    { t: "Discover", d: "Workshops, research and requirement analysis to define goals and KPIs." },
    { t: "Strategize", d: "Architecture, roadmap, estimates and success metrics agreed upfront." },
    { t: "Design", d: "Wireframes, UI design and interactive prototypes validated with users." },
    { t: "Build", d: "Agile sprints with bi-weekly demos, code reviews and CI/CD." },
    { t: "Test", d: "Manual + automated QA, security and performance testing." },
    { t: "Launch & Grow", d: "Deployment, monitoring, optimisation and continuous support." },
  ];
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Our Delivery Process" title={<>A proven <span className="grad-text">6-step delivery</span> process</>} sub="Predictable timelines, zero surprises and full transparency at every stage." />
        <div className="grid gap-5 md:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.t} delay={i * 70} className="card-hover relative overflow-hidden rounded-3xl border border-line bg-bg p-7">
              <span className="absolute -right-2 -top-4 text-8xl font-black text-brand/10">{String(i + 1).padStart(2, "0")}</span>
              <div className="grid h-10 w-10 place-items-center rounded-xl grad-bg font-bold text-white">{i + 1}</div>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA({ title = "Ready to build something remarkable?", sub = "Get a free consultation and a detailed project estimate within 48 hours." }: { title?: string; sub?: string }) {
  return (
    <section className="px-4 py-20">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] grad-bg p-10 text-white md:p-16">
        <div className="spin-slow absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
        <div className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-white/85">{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact-us" className="rounded-full bg-white px-7 py-3.5 font-semibold text-ink shadow-xl transition hover:scale-105">Get a Free Quote</Link>
            <a href={`tel:${S.phone}`} className="rounded-full border border-white/40 px-7 py-3.5 font-semibold transition hover:bg-white/10">{S.phone}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSending(true); setError("");
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await fetch(`${API_BASE}/api/leads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      if (!response.ok) throw new Error((await response.json()).error || "Could not send your request.");
      setSent(true);
    } catch (err) { setError(err instanceof Error ? err.message : "API unavailable. Please email us instead."); }
    finally { setSending(false); }
  };
  if (sent) return (
    <div className="rounded-3xl border border-brand/40 bg-surface p-10 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-brand" />
      <h3 className="mt-4 text-2xl font-bold">Thank you! We'll be in touch within 24 hours.</h3>
      <p className="mt-2 text-muted">A solution consultant will review your requirements and reach out with next steps.</p>
    </div>
  );
  const input = "w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-line bg-surface p-6 md:grid-cols-2 md:p-8">
      <input name="name" required placeholder="Full Name *" className={input} aria-label="Full name" />
      <input name="email" required type="email" placeholder="Business Email *" className={input} aria-label="Email" />
      <input name="phone" placeholder="Phone Number" className={input} aria-label="Phone" />
      <input name="company" placeholder="Company Name" className={input} aria-label="Company" />
      {!compact && (
        <>
          <select name="service" className={input} aria-label="Service" defaultValue="">
            <option value="" disabled>Service Interested In</option>
            {["Digital Marketing", "Web & CMS Development", "Graphic Design", "Custom Software", "UI/UX Design", "AI/ML Development", "Mobile App Development", "Hire Dedicated Developers"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select name="budget" className={input} aria-label="Budget" defaultValue="">
            <option value="" disabled>Estimated Budget</option>
            {["< $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000 – $100,000", "$100,000+"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </>
      )}
      <textarea name="message" rows={4} placeholder="Tell us about your project *" required className={cn(input, "md:col-span-2")} aria-label="Message" />
      <label className="flex items-start gap-2 text-sm text-muted md:col-span-2"><input type="checkbox" className="mt-1 accent-[var(--brand)]" /> Sign an NDA before we discuss my project</label>
      {error && <p role="alert" className="text-sm text-red-500 md:col-span-2">{error} You can also email {SITE.email}.</p>}
      <button disabled={sending} className="grad-bg flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:scale-[1.02] disabled:opacity-60 md:col-span-2">
        <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send My Request"}
      </button>
      <p className="text-center text-xs text-muted md:col-span-2">🔒 100% confidential. We reply within 24 business hours.</p>
    </form>
  );
}
