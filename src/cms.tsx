import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SERVICES } from "./data/services";
import { BLOGS, CASES } from "./data/content";
import { SITE, TESTIMONIALS, TRUST_BADGES, CLIENTS, TEAM } from "./data/site";
import { BLOG_IMG, CASE_IMG } from "./data/images";
import { DEFAULT_PALETTE, setPalette } from "./theme";

export const API_BASE = ((import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
export type CmsDoc = { kind: string; key: string; data: Record<string, any>; updated_at?: string };
export type PageDoc = { heroTitle?: string; heroSub?: string; seoTitle?: string; seoDescription?: string; sections?: Record<string, { title?: string; sub?: string }>; faqs?: { q: string; a: string }[]; replacements?: Record<string, string>; images?: Record<string, { src: string; alt?: string }> };
const brandize = <T,>(value: T): T => JSON.parse(JSON.stringify(value).replace(/Nexovate/g, "Nexoratech").replace(/nexovate/g, "nexoratech"));
const originals = {
  services: brandize(SERVICES), blogs: brandize(BLOGS), cases: brandize(CASES), site: brandize(SITE),
  testimonials: brandize(TESTIMONIALS), badges: brandize(TRUST_BADGES), clients: brandize(CLIENTS), team: brandize(TEAM),
  blogImages: structuredClone(BLOG_IMG), caseImages: structuredClone(CASE_IMG),
};
const clone = <T,>(v: T): T => structuredClone(v);
const replaceArray = <T,>(target: T[], data: T[]) => target.splice(0, target.length, ...data);
const cache = new Map<string, CmsDoc>();
const docId = (kind: string, key: string) => `${kind}:${key}`;
export const getPageDoc = (path: string): PageDoc => (cache.get(docId("page", path))?.data || {}) as PageDoc;
export const getCmsDocs = () => [...cache.values()];
export const getBaseline = () => originals;

function applyDocs(docs: CmsDoc[]) {
  const published = docs.map((d) => ({ ...d, data: brandize(d.data) }));
  cache.clear(); published.forEach((d) => cache.set(docId(d.kind, d.key), d));
  replaceArray(SERVICES, clone(originals.services));
  replaceArray(BLOGS, clone(originals.blogs));
  replaceArray(CASES, clone(originals.cases));
  Object.assign(SITE, clone(originals.site));
  replaceArray(TESTIMONIALS, clone(originals.testimonials));
  replaceArray(TRUST_BADGES, clone(originals.badges));
  replaceArray(CLIENTS, clone(originals.clients));
  replaceArray(TEAM, clone(originals.team));
  Object.assign(BLOG_IMG, clone(originals.blogImages));
  Object.assign(CASE_IMG, clone(originals.caseImages));

  for (const d of published) {
    const data = d.data;
    if (d.kind === "settings" && d.key === "general") {
      Object.assign(SITE, data.site || {});
      if (Array.isArray(data.testimonials)) replaceArray(TESTIMONIALS, data.testimonials);
      if (Array.isArray(data.badges)) replaceArray(TRUST_BADGES, data.badges);
      if (Array.isArray(data.clients)) replaceArray(CLIENTS, data.clients);
      if (Array.isArray(data.team)) replaceArray(TEAM, data.team);
    }
    if (d.kind === "service") {
      const idx = SERVICES.findIndex((x) => x.slug === d.key);
      if (idx >= 0) SERVICES[idx] = { ...SERVICES[idx], ...data };
      else if (data.slug) SERVICES.push(data as typeof SERVICES[number]);
    }
    if (d.kind === "blog" || d.kind === "case") {
      const arr = d.kind === "blog" ? BLOGS : CASES;
      const idx = arr.findIndex((x) => x.slug === d.key);
      if (idx >= 0) Object.assign(arr[idx], data);
      else if (data.slug) (arr as any[]).push(data);
    }
  }
  for (const d of published) {
    if (d.kind === "subservice") {
      const [parent, slug] = d.key.split("/");
      const core = SERVICES.find((x) => x.slug === parent);
      if (!core) continue;
      const idx = core.subs.findIndex((x) => x.slug === slug);
      if (idx >= 0) core.subs[idx] = { ...core.subs[idx], ...d.data };
      else if (d.data.slug) core.subs.push(d.data as typeof core.subs[number]);
    }
    if (d.kind === "media") {
      const target = d.key.startsWith("blog/") ? BLOG_IMG : d.key.startsWith("case/") ? CASE_IMG : null;
      if (target) target[d.key.split("/")[1]] = { src: d.data.url?.startsWith("/") ? API_BASE + d.data.url : d.data.url, alt: d.data.alt || "" };
    }
  }
  setPalette(published.find((d) => d.kind === "theme" && d.key === "main")?.data || DEFAULT_PALETTE);
}

// Apply the new brand even while the API is unavailable; the site has a complete built-in fallback.
applyDocs([]);

type Ctx = { docs: CmsDoc[]; connected: boolean; loading: boolean; refresh: () => Promise<void>; revision: number };
const CmsContext = createContext<Ctx>({ docs: [], connected: false, loading: true, refresh: async () => {}, revision: 0 });
export const useCms = () => useContext(CmsContext);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [docs, setDocs] = useState<CmsDoc[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const signature = useRef("");
  const refresh = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/public`, { cache: "no-store" });
      if (!response.ok) throw new Error("API offline");
      const next = await response.json() as CmsDoc[];
      const current = JSON.stringify(next);
      if (current !== signature.current) {
        applyDocs(next); setDocs(next); setRevision((n) => n + 1);
        signature.current = current;
      }
      setConnected(true);
    } catch { setConnected(false); }
    finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); const timer = window.setInterval(() => void refresh(), 30000); return () => window.clearInterval(timer); }, []);
  return <CmsContext.Provider value={{ docs, connected, loading, refresh, revision }}>{children}</CmsContext.Provider>;
}

// Page-level copy overrides let admins replace any visible text without changing a template.
export function PageTextOverrides() {
  const { pathname } = useLocation();
  const { revision } = useCms();
  useEffect(() => {
    const replacements = getPageDoc(pathname).replacements || {};
    const main = document.querySelector('main');
    if (!main) return;
    const originals = new WeakMap<Text, string>();
    const apply = () => {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        const parent = text.parentElement;
        if (!parent || parent.closest('script, style, textarea, input, [data-cms-ignore]')) continue;
        const source = originals.get(text) ?? text.textContent ?? '';
        originals.set(text, source);
        const exact = source.trim();
        const replacement = replacements[exact] ?? replacements[exact.replace(/Nexovate/g, "Nexoratech")];
        const next = replacement !== undefined ? source.replace(exact, replacement) : source.replace(/Nexovate/g, "Nexoratech");
        if (text.textContent !== next) text.textContent = next;
      }
      for (const image of main.querySelectorAll('img')) {
        const current = getPageDoc(pathname).images?.[image.alt];
        const target = current?.src?.startsWith('/') ? API_BASE + current.src : current?.src;
        if (target && image.getAttribute('src') !== target) image.setAttribute('src', target);
        if (current?.alt && image.alt !== current.alt) image.alt = current.alt;
      }
    };
    apply();
    const observer = new MutationObserver(() => { observer.disconnect(); apply(); observer.observe(main, { subtree: true, childList: true, characterData: true }); });
    observer.observe(main, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [pathname, revision]);
  return null;
}