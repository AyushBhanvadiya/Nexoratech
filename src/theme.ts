import { useSyncExternalStore } from "react";

export type Palette = { brand: string; brand2: string; ink: string; muted: string; surface: string; displayFont: string; bodyFont: string };
export const DEFAULT_PALETTE: Palette = {
  brand: "#6366f1", brand2: "#06b6d4", ink: "#0b1020", muted: "#5b6478", surface: "#f6f7fb",
  displayFont: "Space Grotesk", bodyFont: "Plus Jakarta Sans",
};
let dark = typeof localStorage !== "undefined" && localStorage.getItem("nx-dark") === "1";
const subs = new Set<() => void>();
function applyDark() {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("nx-dark", dark ? "1" : "0");
  subs.forEach((f) => f());
}
applyDark();

export function setPalette(p: Partial<Palette>) {
  const root = document.documentElement;
  const values = { ...DEFAULT_PALETTE, ...p };
  const validColor = /^#[0-9a-fA-F]{6}$/;
  for (const [key, css] of [["brand", "--brand"], ["brand2", "--brand-2"], ["ink", "--ink-light"], ["muted", "--muted-light"], ["surface", "--surface-light"]] as const) {
    if (validColor.test(values[key])) root.style.setProperty(css, values[key]);
  }
  const safeFont = (s: string) => /^[A-Za-z0-9 ,'-]{1,80}$/.test(s) ? s : DEFAULT_PALETTE.bodyFont;
  root.style.setProperty("--font-body-choice", `"${safeFont(values.bodyFont)}"`);
  root.style.setProperty("--font-display-choice", `"${safeFont(values.displayFont)}"`);
}

export function useTheme() {
  const isDark = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => dark);
  return { dark: isDark, setDark: (next: boolean) => { dark = next; applyDark(); } };
}
