import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, ExternalLink, Camera, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/Seo";
import { PageHero } from "../components/ui";
import { cn } from "../utils/cn";

const PAGES = [
  { path: "/", name: "Home", note: "Main landing page" },
  { path: "/services", name: "Services Hub", note: "All 8 core services & 70 sub-services" },
  { path: "/services/digital-marketing", name: "Core Service: Digital Marketing Solutions", note: "Same layout for all 8 core service pages" },
  { path: "/services/digital-marketing/seo-services", name: "Sub-service: SEO Services", note: "Same layout for all 70 sub-service pages" },
  { path: "/about-us", name: "About Us", note: "Company, team & certifications" },
  { path: "/case-studies", name: "Case Studies", note: "Case studies listing" },
  { path: "/case-studies/ecommerce-seo-growth", name: "Case Study Detail", note: "Same layout for every case study" },
  { path: "/blog", name: "Blog", note: "Blog listing with categories" },
  { path: "/blog/technical-seo-checklist", name: "Blog Post", note: "Same layout for every blog post" },
  { path: "/contact-us", name: "Contact Us", note: "Contact details & form (no FAQs)" },
  { path: "/privacy-policy", name: "Privacy Policy", note: "Legal page" },
  { path: "/terms-of-service", name: "Terms of Service", note: "Legal page" },
  { path: "/sitemap", name: "HTML Sitemap", note: "Every page, for users & crawlers" },
  { path: "/site-plan", name: "Website Blueprint", note: "Full website plan" },
];

const DEVICES = { desktop: 1440, mobile: 390 } as const;
type Device = keyof typeof DEVICES;

function LongPage({ path, device }: { path: string; device: Device }) {
  const width = DEVICES[device];
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [cw, setCw] = useState(1000);
  const [h, setH] = useState(1400);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCw(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setLoading(true);
    setH(1400);
    return () => window.clearTimeout(timer.current);
  }, [path, device]);

  // Measure the real rendered height of the page (re-checks while images load).
  const onLoad = () => {
    let n = 0;
    const tick = () => {
      try {
        const root = frame.current?.contentDocument?.getElementById("root");
        const rh = root?.offsetHeight || 0;
        if (rh > 300) { setH(rh); setLoading(false); }
      } catch { setLoading(false); }
      if (++n < 25) timer.current = window.setTimeout(tick, 400);
    };
    tick();
  };

  const scale = Math.min(1, cw / width);
  const src = `${window.location.pathname}?preview=1#${path}`;

  return (
    <div ref={wrap} className="w-full">
      <div className={cn("relative mx-auto overflow-hidden bg-bg shadow-2xl shadow-black/15", device === "mobile" ? "rounded-[2.2rem] border-[10px] border-slate-900" : "rounded-2xl border border-line")}
        style={{ width: width * scale + (device === "mobile" ? 20 : 2), height: h * scale + (device === "mobile" ? 20 : 2) }}>
        <iframe key={path + device} ref={frame} src={src} title={`Full page preview: ${path}`} onLoad={onLoad} scrolling="no"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width, height: h, transform: `scale(${scale})` }} />
        {loading && (
          <div className="absolute inset-0 grid place-items-start justify-center bg-bg/90 pt-24">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted"><Loader2 className="h-5 w-5 animate-spin text-brand" />Rendering full page…</div>
          </div>
        )}
      </div>
      {!loading && <p className="mt-3 text-center text-xs text-muted">Full length: {width} × {h}px · shown at {Math.round(scale * 100)}%</p>}
    </div>
  );
}

export default function PagePreviews() {
  const [idx, setIdx] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const page = PAGES[idx];
  const go = (d: number) => { setIdx((i) => (i + d + PAGES.length) % PAGES.length); window.scrollTo({ top: 0 }); };

  return (
    <>
      <Seo title="Page Previews | Full-Page Website Screens | Nexovate" description="Full-length previews of every page template on the Nexovate website, on desktop and mobile." path="/page-previews" />
      <PageHero eyebrow="Page Previews" crumbs={[{ name: "Page Previews", path: "/page-previews" }]}
        title={<>Full-Page <span className="grad-text">Website Previews</span></>}
        sub={`${PAGES.length} pages shown at their full length, as they really render. One core service page and one sub-service page are shown, because every core service and every sub-service uses the same layout.`} />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="sticky top-[108px] z-30 -mx-4 mb-8 border-y border-line bg-bg/90 px-4 py-3 backdrop-blur-xl">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {PAGES.map((p, i) => (
                <button key={p.path} onClick={() => { setIdx(i); window.scrollTo({ top: 0 }); }}
                  className={cn("shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition", i === idx ? "grad-bg border-transparent text-white" : "border-line bg-surface hover:border-brand")}>
                  {String(i + 1).padStart(2, "0")} · {p.name.replace(/^(Core Service|Sub-service): /, "")}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand">Page {idx + 1} of {PAGES.length}</p>
              <h2 className="text-2xl font-bold md:text-3xl">{page.name}</h2>
              <p className="text-sm text-muted">{page.note} · <span className="font-mono">{page.path}</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-full border border-line bg-surface p-1">
                {(["desktop", "mobile"] as Device[]).map((d) => (
                  <button key={d} onClick={() => setDevice(d)} className={cn("flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold capitalize", device === d ? "grad-bg text-white" : "text-muted")}>
                    {d === "desktop" ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}{d}
                  </button>
                ))}
              </div>
              <a href={`${window.location.pathname}#${page.path}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold hover:border-brand">
                <ExternalLink className="h-4 w-4" />Open page
              </a>
            </div>
          </div>

          <LongPage path={page.path} device={device} />

          <div className="mt-8 flex justify-between gap-3">
            <button onClick={() => go(-1)} className="flex items-center gap-1 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-brand"><ChevronLeft className="h-4 w-4" />{PAGES[(idx - 1 + PAGES.length) % PAGES.length].name}</button>
            <button onClick={() => go(1)} className="flex items-center gap-1 rounded-full grad-bg px-5 py-3 text-sm font-semibold text-white">{PAGES[(idx + 1) % PAGES.length].name}<ChevronRight className="h-4 w-4" /></button>
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-surface p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold"><Camera className="h-5 w-5 text-brand" />How to save a full-page screenshot (PNG)</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>Click <b className="text-ink">Open page</b> to open the page in its own tab.</li>
              <li><b className="text-ink">Chrome / Edge:</b> press <kbd className="rounded border border-line bg-bg px-1.5">F12</kbd>, then <kbd className="rounded border border-line bg-bg px-1.5">Ctrl/Cmd + Shift + P</kbd>, type <b className="text-ink">“Capture full size screenshot”</b> and press Enter.</li>
              <li><b className="text-ink">Firefox:</b> right-click the page, choose <b className="text-ink">Take Screenshot</b>, then <b className="text-ink">Save full page</b>.</li>
              <li>Scroll to the bottom once before capturing, so every scroll animation has appeared.</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
