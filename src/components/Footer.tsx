import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SERVICES, corePath, subPath } from "../data/services";
import { SITE } from "../data/site";

export default function Footer() {
  const popular = [
    [0, 0], [3, 0], [6, 0], [1, 1], [5, 1], [1, 2], [3, 4], [5, 0], [6, 3], [2, 0],
  ].map(([c, s]) => ({ core: SERVICES[c], sub: SERVICES[c].subs[s] }));
  const hire = SERVICES[7].subs.slice(0, 10);
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl grad-bg text-lg font-black text-white">N</span>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{SITE.logoText}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{SITE.name} is a full-service IT development company delivering software, AI, mobile apps, design and digital marketing since {SITE.founded}.</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" />{SITE.address}</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" />{SITE.addressIN}</li>
              <li><a href={`mailto:${SITE.email}`} className="flex gap-2 hover:text-brand"><Mail className="h-4 w-4 text-brand" />{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone}`} className="flex gap-2 hover:text-brand"><Phone className="h-4 w-4 text-brand" />{SITE.phone}</a></li>
            </ul>
            <div className="mt-5 flex gap-2">
              {([["in", "LinkedIn", SITE.socials.linkedin], ["X", "X", SITE.socials.x], ["IG", "Instagram", SITE.socials.instagram], ["f", "Facebook", SITE.socials.facebook], ["YT", "YouTube", SITE.socials.youtube]] as const).map(([t, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-line text-xs font-bold hover:border-brand hover:text-brand" aria-label={label}>{t}</a>
              ))}
            </div>
          </div>
          <FooterCol title="Core Services" links={SERVICES.map((c) => ({ to: corePath(c), label: c.name }))} />
          <FooterCol title="Popular Solutions" links={popular.map(({ core, sub }) => ({ to: subPath(core, sub), label: sub.name }))} />
          <FooterCol title="Hire Experts" links={hire.map((s) => ({ to: subPath(SERVICES[7], s), label: s.name }))} />
          <FooterCol title="Company" links={[
            { to: "/about-us", label: "About Us" }, { to: "/case-studies", label: "Case Studies" }, { to: "/blog", label: "Blog" },
            { to: "/services", label: "All Services" }, { to: "/contact-us", label: "Contact Us" }, { to: "/site-plan", label: "Website Blueprint" }, { to: "/eyebrow-styles", label: "Eyebrow Style Lab" }, { to: "/page-previews", label: "Page Previews" },
            { to: "/privacy-policy", label: "Privacy Policy" }, { to: "/terms-of-service", label: "Terms of Service" }, { to: "/sitemap", label: "HTML Sitemap" },
          ]} />
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>ISO 9001:2015 • ISO 27001 • GDPR Compliant • Google & Meta Partner</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => <li key={l.to}><Link to={l.to} className="text-sm text-muted transition hover:text-brand">{l.label}</Link></li>)}
      </ul>
    </div>
  );
}
