// Preview mode: the site renders inside the Page Previews viewer (loaded with ?preview=1).
// All scroll animations are shown immediately so the full page renders like a screenshot.
export const IS_PREVIEW = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("preview");

if (IS_PREVIEW) document.documentElement.classList.add("preview");
