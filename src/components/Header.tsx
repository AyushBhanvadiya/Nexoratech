import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Moon, Sun, Phone, Mail, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { SERVICES, corePath, subPath } from "../data/services";
import { SITE } from "../data/site";
import { SvcIcon } from "./ui";
import { cn } from "../utils/cn";

import { useTheme } from "../theme";
export { useTheme };

function ThemeSwitcher() {
  const { dark, setDark } = useTheme();
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-brand">
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}

function MegaMenu({ close, onEnter, onLeave }: { close: () => void; onEnter: () => void; onLeave: () => void }) {
  const [active, setActive] = useState(0);
  const core = SERVICES[active];
  const many = core.subs.length > 10;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full z-50 hidden justify-center lg:flex">
      <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="fade-down pointer-events-auto grid w-[min(1180px,96vw)] grid-cols-[290px_1fr_260px] overflow-hidden rounded-b-3xl border border-t-0 border-line bg-bg shadow-2xl shadow-black/10">
        <div className="border-r border-line bg-surface p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted">Core Services</p>
          {SERVICES.map((c, i) => (
            <Link key={c.slug} to={corePath(c)} onClick={close} onMouseEnter={() => setActive(i)}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", active === i ? "bg-bg text-brand shadow-sm" : "hover:bg-bg/60")}>
              <span className={cn("grid h-8 w-8 place-items-center rounded-lg", active === i ? "grad-bg text-white" : "bg-bg text-brand")}><SvcIcon name={c.icon} className="h-4 w-4" /></span>
              <span className="flex-1">{c.name}</span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Link>
          ))}
        </div>
        <div className={cn("p-6", many && "max-h-[62vh] overflow-y-auto")}>
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="text-lg font-bold">{core.name}</h3>
              <p className="text-sm text-muted">{core.tagline}</p>
            </div>
            <Link to={corePath(core)} onClick={close} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className={cn("grid gap-1", many ? "grid-cols-3" : "grid-cols-2")}>
            {core.subs.map((s) => (
              <Link key={s.slug} to={subPath(core, s)} onClick={close} className="group rounded-xl p-2.5 transition hover:bg-surface">
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:text-brand">
                  <ChevronRight className="h-3 w-3 shrink-0 text-brand" />{s.name}
                </div>
                {!many && <p className="mt-1 line-clamp-2 pl-3.5 text-xs text-muted">{s.desc}</p>}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden grad-bg p-6 text-white">
          <div className="spin-slow absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
          <Sparkles className="h-7 w-7" />
          <h4 className="mt-4 text-xl font-bold">Not sure where to start?</h4>
          <p className="mt-2 text-sm text-white/85">Book a free 30-min strategy call with a solution architect.</p>
          <div className="mt-5 space-y-2 text-sm">
            <div className="rounded-xl bg-white/15 p-3"><b>850+</b> projects delivered</div>
            <div className="rounded-xl bg-white/15 p-3"><b>4.9★</b> rated on Clutch</div>
          </div>
          <Link to="/contact-us" onClick={close} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { to: "/about-us", label: "About Us" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blogs" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openCore, setOpenCore] = useState<string | null>(null);
  const loc = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);
  const openMega = () => { window.clearTimeout(closeTimer.current); setMega(true); };
  const closeMegaSoon = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setMega(false), 30); };
  useEffect(() => { const f = () => setScrolled(window.scrollY > 20); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setMega(false); setMobile(false); }, [loc.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden h-9 border-b border-line bg-surface text-xs text-muted md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">
          <div className="flex gap-5">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-brand"><Mail className="h-3.5 w-3.5" />{SITE.email}</a>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 hover:text-brand"><Phone className="h-3.5 w-3.5" />{SITE.phone}</a>
          </div>
          <div className="flex items-center gap-4"><span>⭐ 4.9/5 on Clutch</span><span>ISO 9001 & 27001 Certified</span><Link to="/site-plan" className="font-semibold text-brand">📐 Website Blueprint</Link><Link to="/eyebrow-styles" className="font-semibold text-brand">✏️ Eyebrow Styles</Link><Link to="/page-previews" className="font-semibold text-brand">🖼️ Page Previews</Link></div>
        </div>
      </div>
      <div className="relative">
      <div className={cn("transition-all", scrolled ? "border-b border-line bg-bg/85 shadow-sm backdrop-blur-xl" : "bg-bg/60 backdrop-blur-md")}>
        <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
            <span className="grid h-10 w-10 place-items-center rounded-xl grad-bg text-lg font-black text-white">N</span>
            <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{SITE.logoText}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            <div className="-my-6 py-6" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
              <NavLink to="/services" className={({ isActive }) => cn("flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition hover:text-brand", (isActive || mega) && "text-brand")}>
                Services <ChevronDown className={cn("h-4 w-4 transition", mega && "rotate-180")} />
              </NavLink>
            </div>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => cn("rounded-full px-4 py-2 text-sm font-semibold transition hover:text-brand", isActive && "text-brand")}>{n.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Link to="/contact-us" className="hidden rounded-full grad-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:scale-105 md:inline-flex">Get a Free Quote</Link>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mega && <MegaMenu close={() => setMega(false)} onEnter={openMega} onLeave={closeMegaSoon} />}
      </div>

      {mobile && (
        <div className="fade-down max-h-[calc(100vh-72px)] overflow-y-auto border-b border-line bg-bg px-4 pb-8 lg:hidden">
          <p className="pt-4 text-xs font-semibold uppercase tracking-wider text-muted">Services</p>
          {SERVICES.map((c) => (
            <div key={c.slug} className="border-b border-line">
              <button onClick={() => setOpenCore(openCore === c.slug ? null : c.slug)} className="flex w-full items-center gap-3 py-3 text-left font-semibold">
                <SvcIcon name={c.icon} className="h-4 w-4 text-brand" /><span className="flex-1">{c.name}</span>
                <ChevronDown className={cn("h-4 w-4 transition", openCore === c.slug && "rotate-180")} />
              </button>
              {openCore === c.slug && (
                <div className="grid gap-1 pb-3 pl-7">
                  <Link to={corePath(c)} className="py-1 text-sm font-semibold text-brand">Overview →</Link>
                  {c.subs.map((s) => <Link key={s.slug} to={subPath(c, s)} className="py-1 text-sm text-muted">{s.name}</Link>)}
                </div>
              )}
            </div>
          ))}
          {NAV.map((n) => <Link key={n.to} to={n.to} className="block border-b border-line py-3 font-semibold">{n.label}</Link>)}
          <Link to="/site-plan" className="block border-b border-line py-3 font-semibold text-brand">📐 Website Blueprint</Link>
          <Link to="/eyebrow-styles" className="block border-b border-line py-3 font-semibold text-brand">✏️ Eyebrow Style Lab</Link>
          <Link to="/page-previews" className="block border-b border-line py-3 font-semibold text-brand">🖼️ Page Previews</Link>
          <Link to="/contact-us" className="mt-5 block rounded-full grad-bg py-3 text-center font-semibold text-white">Get a Free Quote</Link>
        </div>
      )}
    </header>
  );
}
