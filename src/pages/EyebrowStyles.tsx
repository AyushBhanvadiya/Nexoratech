import { Check, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import { PageHero, Reveal } from "../components/ui";
import { EYEBROW_STYLES, EyebrowTag, useEyebrowStyle } from "../eyebrow";
import { cn } from "../utils/cn";

export default function EyebrowStyles() {
  const { style, setStyle } = useEyebrowStyle();
  return (
    <>
      <Seo title="Eyebrow Style Lab | Pick a Section Label Design | Nexovate" description="Preview 10 eyebrow label designs for website sections. Apply any style live across the whole site and choose the perfect look." path="/eyebrow-styles" />
      <PageHero eyebrow="Eyebrow Style Lab" crumbs={[{ name: "Eyebrow Styles", path: "/eyebrow-styles" }]}
        title={<>Pick the <span className="grad-text">perfect section label</span></>}
        sub="10 design ideas for the label above every section heading. Click “Apply” — it updates every section across the entire website instantly. Tell us which number you want and we'll lock it in." />
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
          {EYEBROW_STYLES.map((s, i) => {
            const active = style === s.id;
            return (
              <Reveal key={s.id} delay={(i % 2) * 80}>
                <div className={cn("card-hover flex h-full flex-col overflow-hidden rounded-3xl border bg-surface", active ? "border-brand shadow-xl shadow-brand/10" : "border-line")}>
                  {/* live preview mock of a section */}
                  <div className="grid-bg relative grid min-h-52 place-items-center border-b border-line bg-bg p-8 text-center">
                    <div>
                      <EyebrowTag text="Our Core Services" center />
                      <h3 className="mt-3 text-2xl font-bold md:text-3xl">End-to-end services <span className="grad-text">under one roof</span></h3>
                      <p className="mt-2 text-sm text-muted">Every section on your site will use this exact label style.</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-bold">{s.name}</h2>
                      {active && <span className="flex items-center gap-1.5 rounded-full grad-bg px-3 py-1 text-xs font-bold text-white"><Check className="h-3.5 w-3.5" />Applied</span>}
                    </div>
                    <p className="mt-1 flex-1 text-sm text-muted">{s.blurb}</p>
                    <button onClick={() => setStyle(s.id)}
                      className={cn("mt-5 w-full rounded-full py-3 text-sm font-semibold transition", active ? "border border-brand/40 bg-brand/10 text-brand" : "grad-bg text-white shadow-lg shadow-brand/25 hover:scale-[1.02]")}>
                      {active ? "✓ Active style — click to keep" : "Apply this style site-wide"}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl px-4">
          <div className="flex gap-4 rounded-3xl border border-line bg-surface p-6">
            <Sparkles className="h-6 w-6 shrink-0 text-brand" />
            <p className="text-sm text-muted"><b className="text-ink">How to choose:</b> 01 & 08 are the safest premium picks for enterprise clients · 03 & 06 give a strong tech/AI personality · 05 & 10 are bolder and more modern. Your choice persists in the browser — just tell me the number (e.g. “I want 03”) and I'll make it the fixed style, and remove this lab page if you like.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
