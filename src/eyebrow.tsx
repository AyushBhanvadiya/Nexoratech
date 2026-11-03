import { useSyncExternalStore } from "react";
import { cn } from "./utils/cn";

export type EyebrowStyleId =
  | "line" | "bar" | "slash" | "sharp" | "gradient"
  | "brackets" | "hash" | "lines" | "square" | "underline";

type State = { style: EyebrowStyleId };
// Fixed site-wide style: 08 · Flanking Lines
let state: State = { style: "lines" as EyebrowStyleId };
const subs = new Set<() => void>();

function setStyle(style: EyebrowStyleId) {
  state = { style };
  localStorage.setItem("nx-eyebrow", style);
  subs.forEach((f) => f());
}

export function useEyebrowStyle() {
  const s = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state);
  return { style: s.style, setStyle };
}

export const EYEBROW_STYLES: { id: EyebrowStyleId; name: string; blurb: string }[] = [
  { id: "line", name: "01 · Gradient Line", blurb: "A short gradient rule above the label. Clean, editorial, the most popular premium look." },
  { id: "bar", name: "02 · Side Bar", blurb: "A bold vertical gradient bar beside the label. Strong, confident, very common on award-winning SaaS sites." },
  { id: "slash", name: "03 · Tech Slash", blurb: "// Double slash prefix. Developer/tech feel — signals engineering culture instantly." },
  { id: "sharp", name: "04 · Sharp Outline", blurb: "Squared (non-rounded) outline tag. Crisp, structured, corporate-tech." },
  { id: "gradient", name: "05 · Pure Gradient", blurb: "Just the label in a brand gradient — zero decoration. Minimal and bold." },
  { id: "brackets", name: "06 · HUD Brackets", blurb: "Corner brackets like a targeting frame. Futuristic, AI/tech vibe." },
  { id: "hash", name: "07 · Hashtag Mono", blurb: "Code-style monospace hashtag. Modern, editorial, startup energy." },
  { id: "lines", name: "08 · Flanking Lines", blurb: "Label centered between two gradient hairlines. Elegant, balanced, classic." },
  { id: "square", name: "09 · Square Accent", blurb: "A small solid square accent block (instead of a round dot). Simple, geometric, sharp." },
  { id: "underline", name: "10 · Underline Swipe", blurb: "Label with a thick gradient underline that matches the text width. Graphic, punchy." },
];

export function EyebrowTag({ text, center = false }: { text: string; center?: boolean }) {
  const { style } = useEyebrowStyle();
  const align = center ? "items-center justify-center text-center" : "items-start";
  const label = "text-xs font-extrabold uppercase tracking-[0.28em]";

  switch (style) {
    case "line":
      return (
        <span className={cn("flex w-fit flex-col gap-2", align)}>
          <span className="h-[3px] w-10 grad-bg" />
          <span className={cn(label, "text-brand")}>{text}</span>
        </span>
      );
    case "bar":
      return (
        <span className={cn("flex items-center gap-3", align)}>
          <span className="h-5 w-1.5 grad-bg" />
          <span className={cn(label, "text-brand")}>{text}</span>
        </span>
      );
    case "slash":
      return (
        <span className={cn("flex items-baseline gap-2", align)}>
          <span className="grad-text text-xl font-black leading-none">//</span>
          <span className={cn(label, "text-ink")}>{text}</span>
        </span>
      );
    case "sharp":
      return (
        <span className="inline-flex items-center border-2 border-brand/40 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.24em] text-brand">
          {text}
        </span>
      );
    case "brackets":
      return (
        <span className={cn("relative inline-block px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-brand", center && "text-center")}>
          <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-brand" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-brand" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-brand" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-brand" />
          {text}
        </span>
      );
    case "hash":
      return (
        <span className={cn("flex items-center gap-2 font-mono", align)}>
          <span className="text-base font-bold leading-none text-brand">#</span>
          <span className={cn("font-bold", label, "text-ink")}>{text}</span>
        </span>
      );
    case "lines":
      return (
        <span className={cn("flex w-fit items-center justify-center gap-4", center && "mx-auto")}>
          <span className="h-px w-12 grad-bg" />
          <span className={cn(label, "leading-none text-brand")}>{text}</span>
          <span className="h-px w-12 grad-bg" />
        </span>
      );
    case "square":
      return (
        <span className={cn("flex items-center gap-2.5", align)}>
          <span className="h-2.5 w-2.5 grad-bg" />
          <span className={cn(label, "text-brand")}>{text}</span>
        </span>
      );
    case "underline":
      return (
        <span className={cn("flex w-fit flex-col gap-1.5", align)}>
          <span className={cn(label, "text-ink")}>{text}</span>
          <span className="h-1 w-full grad-bg" />
        </span>
      );
    case "gradient":
    default:
      return (
        <span className={cn("block w-fit", align)}>
          <span className={cn(label, "grad-text")}>{text}</span>
        </span>
      );
  }
}
