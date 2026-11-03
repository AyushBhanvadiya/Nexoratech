# Nexovate Website - Complete Chat Handoff

> **Update:** This document describes the historical site state before the Nexoratech admin/API upgrade. For the current local React + PostgreSQL application, read `LOCAL_SETUP.md` first. The current brand is **Nexoratech**, and the React admin dashboard is at `/#/admin`. The earlier "resume from revert" instruction below is historical and no longer the latest state.

This is a portable, detailed summary of the conversation and the actual project state. Paste this file into a new chat along with the project files, or ask the next assistant to read it first. It is a **handoff**, not a verbatim transcript. The source files remain the authority for exact code and copy.

## Read This First: Where We Stopped

- The latest instruction before this handoff was **revert the Batch 1 content update**. That revert has been made and built successfully. Continue from the **pre-Batch-1 website**, not from the large October 2026 copy the user pasted.
- The user says the project should resume from this point when they request further changes. Do not proactively reapply the pasted Batch 1 content or recreate the White Label pages.
- Keep the earlier design decisions, images, menu behavior, flanking-line eyebrows, and Page Previews tool unless explicitly asked to change them.
- Brand in this prototype: **Nexovate Technologies**. No actual client or company details have been verified.
- This document was created for continuity in a new chat. It does not itself change the website UI.

## What The User Originally Wanted

An attractive, dynamic React IT development agency website and a very detailed visual website plan. The initial specification called for:

- Home, About Us, Blogs, Case Studies, Contact Us, a Services overview, dedicated pages for all core and sub-services, and an SEO-friendly site structure.
- A Services mega menu: hover Services to see core services; hover a core service to see its sub-services. Mobile navigation should be usable too.
- Sections and content researched around market competitors, trust signals, authority, E-E-A-T, SEO, AEO, GEO, internal linking, and conversion.
- Approximately 6-8 FAQs with answers and FAQPage JSON-LD on pages except Contact.
- Unique metas, keywords, descriptive URLs, robots.txt and sitemap.xml.
- Animations, live visual themes, light/dark mode and responsive design.
- A detailed HTML-like visual site plan showing page structure and sections.

### Requested Service Taxonomy (all presently represented in `src/data/services.ts`)

1. **Digital Marketing Solutions** (4): SEO Services; Social Media Management; PPC Management; AI Marketing Services.
2. **Web & CMS Development** (8): Custom Web Development; WordPress Development; Shopify Development; React JS Development; Node JS Development; Angular JS Development; Vue JS Development; Python Development.
3. **Graphic Designing** (6): Brand & Identity Design; Illustration & Advertising Design; Web & App Design; 3D Design & Visualization; Motion Graphics & Animation; Packaging Design.
4. **Custom Software Development** (7): SaaS Product Engineering; Enterprise Software; CRM Development; ERP Development; MVP Development; API Development & Integration; QA, Testing & Performance Optimization.
5. **UI/UX Designing** (3): Website UI/UX Design; Mobile App UI/UX Design; Wireframing & Prototyping.
6. **AI/ML Development** (8): AI Agent Development; AI Chatbot Development; Natural Language Processing (NLP); LLM Development; AI Software Development; Generative AI Solutions; Custom AI Solutions; Data Engineering.
7. **Mobile App Development** (5): Android App Development; iOS App Development; React Native App Development; Flutter App Development; Cross Platform App Development.
8. **Hire Dedicated Developers** (22): Hire React JS Developers; Hire Node JS Developers; Hire Angular JS Developers; Hire Vue JS Developers; Hire Full-Stack Developers; Hire AI/ML Developers; Hire Mobile App Developers; Hire Android Developers; Hire iOS Developers; Hire Dedicated SEO Experts; Hire PPC Experts; Hire Meta Ads Experts; Hire Google Ads Experts; Hire Python Developers; Hire WordPress Developers; Hire Shopify Developers; Hire Social Media Managers; Hire Graphic Designers; Hire Flutter Developers; Hire AEO Experts; Hire GEO Experts; Hire Google Business Profile Experts.

Actual data count: **8 core services + 63 sub-services** (4+8+6+7+3+8+5+22). Some marketing copy and the Page Previews labels still say "70+"; these claims are inaccurate relative to the current data and should be corrected when the user next asks for copy cleanup. Do not invent seven missing services to reach 70.

## Conversation Timeline And Decisions

1. **Initial implementation:** Built React/Vite/TypeScript/Tailwind site with services data, FAQ generation, Home/About/Contact/Blog/Case Studies, dynamic metas and JSON-LD, sitemap, robots, visual Website Blueprint, theme picker and mega menu. The prototype uses a single static Vite build and HashRouter.
2. **Eyebrow dot request:** User rejected the tiny round dot shown before section labels. It was removed. The shared section label component was updated; unique section-label text was introduced.
3. **Eyebrow design exploration:** User rejected the rounded outlined pill and asked for design ideas first. A live `/eyebrow-styles` lab was created with ten options: Gradient Line, Side Bar, Tech Slash, Sharp Outline, Pure Gradient, HUD Brackets, Hashtag Mono, Flanking Lines, Square Accent and Underline Swipe.
4. **Final eyebrow selection:** User selected **08 - Flanking Lines** everywhere. The default style in `src/eyebrow.tsx` is `lines`; the shared `EyebrowTag` is used by `SectionHead` and `PageHero`. The two gradient hairlines flank the uppercase text. User then reported the hairlines were above the text in left-aligned sections; this was fixed using `items-center`, `justify-center`, `leading-none` and `w-fit`. Keep vertical centering correct.
5. **Mega-menu horizontal positioning:** User showed left clipping because the menu was centered on the Services link. It was re-anchored to the entire header to sit in the center of the screen.
6. **Mega-menu hover / spacing:** User did not want the header color to change on hover or a gap between header and menu. The menu was moved outside the blurred nav bar, immediately below the nav bar, with no top border and only bottom corners rounded.
7. **Sticky top strip and menu scroll:** User wanted the email/phone/ratings/top utility strip to remain sticky with the nav. It now stays visible at the top. Scroll was removed from ordinary service panels, then reintroduced **only for Hire Dedicated Developers** (more than ten sub-services); the middle column has `max-h-[62vh] overflow-y-auto`. Other core menus must not show a scroll bar.
8. **Visual assets / menu close:** User requested named certification images, industry-specific icons, recognizable brand logos/names in the scrolling strip, reviewer portraits instead of initials, and topic-appropriate 16:9 blog and case-study images. These are present in `src/data/site.ts`, `src/data/images.ts`, `src/components/media.tsx`, and relevant pages. The logo/photo assets are remote. Hover leaving the visible mega-menu (including empty left/right screen area) should close it: the outer full-width positioning wrapper has `pointer-events-none` and the actual menu has `pointer-events-auto`; a short 30 ms close timer is used.
9. **Long-page screenshot request:** There is no browser/screenshot-capture tool in this workspace. The assistant created `/page-previews`, a real page viewer with desktop/mobile iframe previews and browser instructions for saving screenshots. It previews 14 representative routes, using only Digital Marketing for a core-service example and SEO Services for a sub-service example. **No actual PNG screenshots were generated.** The last standalone page created in the project before the content experiment was `src/pages/PagePreviews.tsx` (plus `src/preview.ts`); it is still present.
10. **Batch 1 copy experiment:** User pasted a very long October 2026 content document covering Home, About, Digital Marketing, SEO, and three new White Label pages. The assistant applied it. User then explicitly requested a revert. **The entire Batch 1 implementation was reverted**: prior Home/About/Digital Marketing/SEO copy and generic page layouts returned; the three White Label page routes, page component and data were removed; footer and sitemap returned to their previous state. This is the current baseline. Do not treat the pasted Batch 1 document as currently live content.

## Current Route Map

Routing is in `src/App.tsx` using `HashRouter`, so preview links look like `/#/services/...`.

| Route | Page / purpose |
| --- | --- |
| `/` | Home |
| `/services` | All-services overview |
| `/services/:core` | One template for eight core services |
| `/services/:core/:sub` | One template for 63 sub-services |
| `/about-us` | Company, milestones, leadership, certifications |
| `/contact-us` | Contact details and form; no FAQs |
| `/blog` and `/blog/:slug` | Blog index and six example posts |
| `/case-studies` and `/case-studies/:slug` | Case index and six example studies |
| `/privacy-policy`, `/terms-of-service` | Legal placeholder copy |
| `/sitemap` | Human-readable sitemap |
| `/site-plan` | Interactive Website Blueprint (page architecture/SEO/design plan) |
| `/eyebrow-styles` | Live eyebrow design laboratory; Flanking Lines is the default, but styles may be temporarily previewed |
| `/page-previews` | Representative full-length desktop/mobile page previews; NOT image files |
| `*` | 404 |

The current Digital Marketing URL is **`/services/digital-marketing`**, and SEO Services is **`/services/digital-marketing/seo-services`**. The later `/services/digital-marketing-solutions` URL from the reverted Batch 1 copy is **not current**. White Label pages `/white-label-services...` are **not present**. The XML sitemap matches the restored `/services/digital-marketing` URL.

## Current Site Design And Behaviors

- Theme colors are CSS variables in `src/index.css`, with Indigo Nebula, Emerald Tech, Sunset Fusion, Ocean Pulse and Royal Neon, plus light/dark mode. `src/theme.ts` stores and broadcasts theme choices.
- The fixed header contains a persistent utility strip (email/phone, rating, certifications and links to internal blueprint/style/preview tools), main nav (Services, About Us, Case Studies, Blogs, Contact Us), quote CTA and theme controls.
- The Services mega menu is a three-column, centered panel: core services, hovered service's sub-services, and consultation CTA. It attaches to the nav's bottom edge. The Hire Dedicated Developers sub-service list alone scrolls; others do not. On mobile there is a collapsible service navigation drawer.
- Section eyebrows are **Flanking Lines** by default (two gradient horizontal strokes vertically centered on uppercase text, no dot and no rounded badge). A developer should preserve their left and centered alignment when editing them.
- Main page sections use reveal-on-scroll, a moving logo marquee, animated stats, hover effects, rotating words in the Home hero, FAQ accordions, and image frames.
- `src/components/media.tsx` contains `IndustryIcon` (different Lucide symbol for each industry), `Avatar`, `LogoImg`, and `MediaImage` (16:9, object-fit cover, fallback).
- Blog/case imagery is mapped by slug in `src/data/images.ts` to Pexels URLs. Review portrait photos are also Pexels stock. Blog and case-card imagery should remain 16:9.
- Testimonials include stock photos and invented names. These are **not real client identity photos**, even though they look like portraits. Do not publish as real reviews.
- Badge images / scrolling brand marks use remote Simple Icons, Wikimedia, or Google favicons. Recognizable third-party marks are present, but the company is **not verified as a client or partner of any named brand**. Do not claim they are clients without permission and proof.
- The `/site-plan` page includes a research/competitor synthesis, information architecture, page-template breakdown, keyword mapping, linking strategy, themes, modules and launch roadmap. Treat it as a prototype plan, not verified market research.
- `/page-previews` shows one representative core page and one representative sub-service page. Preview mode (`src/preview.ts`) reveals all animation sections and shows final counter values inside the iframe. Instructions explain how to capture actual full-page PNG files via a browser.

## Architecture / File Guide

| File | Role |
| --- | --- |
| `src/App.tsx` | Entry component and all routes, HashRouter |
| `src/pages/Home.tsx` | Original pre-Batch-1 Home copy and layout with 16:9 blog/case images |
| `src/pages/CoreService.tsx` | Original shared core-service layout |
| `src/pages/SubService.tsx` | Original shared sub-service layout; SEO Services is generic again |
| `src/pages/Pages.tsx` | Services index, About, Contact, legal and HTML sitemap |
| `src/pages/Content.tsx` | Blog and case index/detail pages |
| `src/pages/SitePlan.tsx` | Detailed Website Blueprint |
| `src/pages/EyebrowStyles.tsx` | Style selection demo |
| `src/pages/PagePreviews.tsx` | **Last added utility page**, long page viewer, 14 representative routes |
| `src/pages/NotFound.tsx` | 404 page |
| `src/components/Header.tsx` | Sticky header, three-column mega menu, mobile navigation, theme controls |
| `src/components/Footer.tsx` | Footer with deep service linking and internal tools |
| `src/components/ui.tsx` | Shared SectionHead, FAQs, breadcrumbs, page hero, Process, Stats, CTA, forms, testimonials, marquee |
| `src/components/media.tsx` | Images, industry icons and image fallbacks |
| `src/components/Seo.tsx` | Dynamic title/meta/OG/canonical, JSON-LD schemas |
| `src/data/services.ts` | All eight services, 63 sub-services, metadata, FAQ generation, URL helpers |
| `src/data/content.ts` | Six blog posts, six case studies, Home/About/index FAQs |
| `src/data/site.ts` | Brand/contact placeholders, themes, stats, trust badges, logos, testimonial and team placeholders |
| `src/data/images.ts` | Remote 16:9 blog/case stock image mapping |
| `src/eyebrow.tsx` | Flanking Lines default style and 10 style options |
| `src/theme.ts` | Theme state |
| `src/preview.ts` | Embedded page preview mode |
| `src/index.css` | Tailwind/CSS tokens, animations, reveal effects |
| `public/sitemap.xml`, `public/robots.txt` | Static SEO files |
| `index.html` | Static HTML entry point and font links |

There is no `src/pages/WhiteLabel.tsx` or `src/data/whiteLabel.ts` now: both were deleted during the requested revert.

## SEO / Content Status And Honest Caveats

- Current dynamic metadata, canonical, OG/Twitter tags, Service/FAQPage/BreadcrumbList/BlogPosting JSON-LD are client-rendered from `src/components/Seo.tsx`.
- **Production SEO is not finished:** HashRouter and a client-rendered, single-file SPA are not the same as individual server-rendered or prerendered pages with crawlable clean URLs. The XML sitemap advertises clean URLs even though the current app navigates to `/#/...`. Production should migrate to a proper clean-URL, prerendered/SSR setup and deploy matching URLs before claiming full SEO readiness.
- `src/components/Seo.tsx` includes an `AggregateRating` in Organization schema again because the user requested restoring the pre-Batch-1 state. This is not proof of verified rating eligibility; review self-serving Organization markup before launch.
- Stats, founding year, addresses, phone numbers, brand/domain, reviews, client names, case studies, team identities, certifications and partner labels are **prototype claims/placeholders, not verified facts**. Replace with real evidence and approvals before launch.
- The contact form currently displays a success state only; there is no backend, email or CRM integration.
- Blog/case pages and service pages are data-driven prototypes. FAQ copy on most sub-service pages is templated. Perform actual keyword research, unique copy editing, fact-checking and image/license review before production.
- Some site copy says "70+" sub-services; actual dataset has 63. See count note above.
- The Page Previews tool shows pages; it does not export or store screenshots. If real PNGs are required, capture them in a browser.
- External images/logos require a network connection and may fail; visual fallback components exist, but production should host approved assets locally.

## Last Request And Exact Resume Instruction

The user's last project-change request was: **"revert again i dont want this so revert and give me again my previous site."** The change was completed. The last assistant build output was successful (`vite build`, 1945 modules transformed; single-file output roughly 515 kB / 155 kB gzip). That build confirmed compilation, not visual browser testing.

The current request is to write this handoff file. For a new chat, the suggested starting prompt is:

> Read `PROJECT_HANDOFF.md` and the existing React project first. This is the restored pre-Batch-1 Nexovate site. Keep the current UI and earlier fixes. Implement only the new change I describe next. Do not reapply the reverted October 2026 Batch 1 content or White Label pages unless I explicitly ask.

When updating this project later, inspect the relevant existing files, make focused edits, and run the project's build verification. Avoid claiming visual or live browser validation unless it was actually performed.