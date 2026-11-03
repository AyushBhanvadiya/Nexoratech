import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, Clock, Target, Eye, Heart, Award } from "lucide-react";
import Seo, { breadcrumbSchema, faqSchema } from "../components/Seo";
import { Badges, CTA, ContactForm, FaqList, PageHero, Process, Reveal, SectionHead, Stats, SvcIcon, Testimonials } from "../components/ui";
import { SERVICES, corePath, subPath } from "../data/services";
import { ABOUT_FAQS, BLOGS, CASES, SERVICES_INDEX_FAQS } from "../data/content";
import { SITE, TEAM } from "../data/site";

export function ServicesIndex() {
  const crumbs = [{ name: "Services", path: "/services" }];
  return (
    <>
      <Seo title="IT Services & Solutions | Software, AI, Apps, Marketing | Nexovate" description="Explore Nexovate's IT services: custom software, AI/ML, mobile apps, web & CMS, UI/UX, graphic design, digital marketing and dedicated developers." path="/services" keywords={["IT services", "IT solutions company", "software development services"]} schemas={[breadcrumbSchema(crumbs), faqSchema(SERVICES_INDEX_FAQS)]} />
      <PageHero eyebrow="Our Services" crumbs={crumbs} title={<>IT Services That <span className="grad-text">Build, Launch & Grow</span> Your Business</>} sub="8 core practices and 70+ specialised solutions — from strategy and design to engineering, AI and growth marketing." />
      <section className="pb-20">
        <div className="mx-auto max-w-7xl space-y-6 px-4">
          {SERVICES.map((c, i) => (
            <Reveal key={c.slug} delay={60}>
              <div className="card-hover grid gap-6 rounded-3xl border border-line bg-surface p-7 md:grid-cols-[1fr_1.6fr]">
                <div>
                  <span className="text-sm font-bold text-brand">0{i + 1}</span>
                  <div className="mt-2 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl grad-bg text-white"><SvcIcon name={c.icon} className="h-6 w-6" /></span><h2 className="text-2xl font-bold">{c.name}</h2></div>
                  <p className="mt-3 text-muted">{c.tagline}</p>
                  <Link to={corePath(c)} className="mt-4 inline-flex items-center gap-1 font-semibold text-brand">Explore {c.name} <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {c.subs.map((s) => <Link key={s.slug} to={subPath(c, s)} className="rounded-full border border-line bg-bg px-4 py-2 text-sm hover:border-brand hover:text-brand">{s.name}</Link>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Process />
      <FaqList faqs={SERVICES_INDEX_FAQS} />
      <CTA />
    </>
  );
}

export function About() {
  const crumbs = [{ name: "About Us", path: "/about-us" }];
  const timeline = [["2014", "Founded in San Francisco with a team of 6 engineers."], ["2017", "Opened global delivery center in Ahmedabad, India."], ["2019", "ISO 9001 & 27001 certified; crossed 300 projects."], ["2022", "Launched AI/ML practice and became Google & Meta Partner."], ["2024", "Reached 300+ team members and 30+ countries."], ["2026", "850+ projects delivered; GEO & AI agent leadership."]];
  return (
    <>
      <Seo title="About Nexovate | Trusted IT Development Company Since 2014" description="Learn about Nexovate Technologies — 12+ years, 320+ experts, ISO certified IT company delivering software, AI, apps and marketing to clients in 30+ countries." path="/about-us" keywords={["about Nexovate", "IT company", "software company team"]} schemas={[breadcrumbSchema(crumbs), faqSchema(ABOUT_FAQS), { "@context": "https://schema.org", "@type": "AboutPage", name: "About Nexovate", url: SITE.domain + "/about-us" }]} />
      <PageHero eyebrow="About Us" crumbs={crumbs} title={<>We Engineer <span className="grad-text">Digital Growth</span> Since 2014</>} sub="Nexovate is a team of 320+ engineers, designers, marketers and AI specialists helping ambitious companies build products people love." />
      <Stats />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {[{ I: Target, t: "Our Mission", d: "To turn technology into measurable business outcomes for every client we serve." }, { I: Eye, t: "Our Vision", d: "To be the most trusted technology growth partner for 10,000 businesses by 2030." }, { I: Heart, t: "Our Values", d: "Ownership, transparency, craftsmanship and continuous learning." }].map(({ I, t, d }, i) => (
            <Reveal key={t} delay={i * 80} className="card-hover rounded-3xl border border-line bg-surface p-8"><I className="h-9 w-9 text-brand" /><h2 className="mt-4 text-2xl font-bold">{t}</h2><p className="mt-2 text-muted">{d}</p></Reveal>
          ))}
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHead eyebrow="Our Milestones" title={<>12 years of <span className="grad-text">building & learning</span></>} />
          <div className="relative border-l-2 border-brand/30 pl-8">
            {timeline.map(([y, t], i) => (
              <Reveal key={y} delay={i * 60} className="relative mb-8">
                <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full grad-bg ring-4 ring-surface" />
                <div className="text-2xl font-black grad-text">{y}</div><p className="text-muted">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead eyebrow="Meet The Minds" title={<>The experts <span className="grad-text">behind Nexovate</span></>} sub="Real people, real credentials — the E-E-A-T behind every project." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="card-hover rounded-3xl border border-line bg-surface p-6 text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full grad-bg text-2xl font-bold text-white">{m.initials}</div>
                <h3 className="mt-4 text-lg font-bold">{m.name}</h3><p className="text-sm font-semibold text-brand">{m.role}</p><p className="mt-2 text-sm text-muted">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-16"><div className="mx-auto max-w-6xl px-4"><SectionHead eyebrow="Certifications & Partnerships" title={<><Award className="inline h-9 w-9 text-brand" /> Recognised & certified</>} /><Badges /></div></section>
      <Testimonials />
      <FaqList faqs={ABOUT_FAQS} />
      <CTA title="Join 500+ companies growing with Nexovate" />
    </>
  );
}

export function Contact() {
  const crumbs = [{ name: "Contact Us", path: "/contact-us" }];
  return (
    <>
      <Seo title="Contact Nexovate | Get a Free IT Project Quote in 48 Hours" description="Contact Nexovate for software, AI, app, web, design or marketing projects. Free consultation, NDA on request and a detailed quote within 48 hours." path="/contact-us" schemas={[breadcrumbSchema(crumbs), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Nexovate", url: SITE.domain + "/contact-us" }]} />
      <PageHero eyebrow="Contact Us" crumbs={crumbs} title={<>Let's Build Something <span className="grad-text">Great Together</span></>} sub="Tell us about your project. A senior consultant will respond within 24 business hours." />
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            {[{ I: Mail, t: "Email", v: SITE.email, h: `mailto:${SITE.email}` }, { I: Phone, t: "USA", v: SITE.phone, h: `tel:${SITE.phone}` }, { I: Phone, t: "India", v: SITE.phone2, h: `tel:${SITE.phone2}` }, { I: MapPin, t: "Headquarters", v: SITE.address }, { I: MapPin, t: "Delivery Center", v: SITE.addressIN }, { I: Clock, t: "Hours", v: "Mon–Fri, 9 AM – 7 PM (PST & IST)" }].map(({ I, t, v, h }) => (
              <Reveal key={t + v} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl grad-bg text-white"><I className="h-5 w-5" /></span>
                <div><p className="text-sm text-muted">{t}</p>{h ? <a href={h} className="font-semibold hover:text-brand">{v}</a> : <p className="font-semibold">{v}</p>}</div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}><ContactForm /></Reveal>
        </div>
      </section>
      <section className="pb-20"><div className="mx-auto max-w-7xl px-4"><div className="grid h-80 place-items-center overflow-hidden rounded-3xl border border-line bg-surface grid-bg"><p className="flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-brand" />Google Map embed — San Francisco & Ahmedabad offices</p></div></div></section>
    </>
  );
}

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const isP = kind === "privacy";
  const path = isP ? "/privacy-policy" : "/terms-of-service";
  const name = isP ? "Privacy Policy" : "Terms of Service";
  return (
    <>
      <Seo title={`${name} | Nexovate`} description={`Read the ${name} of Nexovate Technologies.`} path={path} />
      <PageHero eyebrow="Legal" crumbs={[{ name, path }]} title={name} sub="Last updated: May 1, 2026" />
      <section className="pb-20"><div className="prose-c mx-auto max-w-3xl px-4">
        <h2>1. Overview</h2><p>This {name.toLowerCase()} explains how {SITE.name} handles {isP ? "personal information collected through our website and services" : "the use of our website and services"}.</p>
        <h2>2. {isP ? "Information We Collect" : "Use of Services"}</h2><p>{isP ? "We collect information you provide via forms (name, email, phone, company) and analytics data such as pages visited and device information." : "You agree to use our website lawfully and not to misuse, copy or disrupt our content or services."}</p>
        <h2>3. {isP ? "How We Use Information" : "Intellectual Property"}</h2><p>{isP ? "To respond to enquiries, deliver services, improve our website and send relevant communications with your consent." : "All website content is owned by Nexovate unless stated otherwise. Client project IP is governed by individual contracts."}</p>
        <h2>4. Contact</h2><p>Questions? Email {SITE.email}.</p>
      </div></section>
    </>
  );
}

export function HtmlSitemap() {
  return (
    <>
      <Seo title="HTML Sitemap | Nexovate" description="Browse every page on the Nexovate website — services, sub-services, blogs and case studies." path="/sitemap" />
      <PageHero eyebrow="Sitemap" crumbs={[{ name: "Sitemap", path: "/sitemap" }]} title="HTML Sitemap" sub="Every page on our website, organised for humans and search engines." />
      <section className="pb-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        <div><h2 className="mb-3 font-bold">Main</h2>{[["/", "Home"], ["/services", "Services"], ["/about-us", "About Us"], ["/case-studies", "Case Studies"], ["/blog", "Blog"], ["/contact-us", "Contact Us"], ["/site-plan", "Website Blueprint"]].map(([to, l]) => <Link key={to} to={to} className="block py-1 text-sm text-muted hover:text-brand">{l}</Link>)}</div>
        {SERVICES.map((c) => <div key={c.slug}><h2 className="mb-3 font-bold"><Link to={corePath(c)} className="hover:text-brand">{c.name}</Link></h2>{c.subs.map((s) => <Link key={s.slug} to={subPath(c, s)} className="block py-1 text-sm text-muted hover:text-brand">{s.name}</Link>)}</div>)}
        <div><h2 className="mb-3 font-bold">Blog</h2>{BLOGS.map((b) => <Link key={b.slug} to={`/blog/${b.slug}`} className="block py-1 text-sm text-muted hover:text-brand">{b.title}</Link>)}</div>
        <div><h2 className="mb-3 font-bold">Case Studies</h2>{CASES.map((b) => <Link key={b.slug} to={`/case-studies/${b.slug}`} className="block py-1 text-sm text-muted hover:text-brand">{b.title}</Link>)}</div>
      </div></section>
    </>
  );
}
