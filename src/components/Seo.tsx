import { useEffect } from "react";
import { SITE } from "../data/site";
import type { Faq } from "../data/services";
import { getPageDoc } from "../cms";

interface Props {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  schemas?: object[];
  type?: string;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export default function Seo({ title, description, path, keywords = [], schemas = [], type = "website" }: Props) {
  useEffect(() => {
    const url = SITE.domain + path;
    const page = getPageDoc(path);
    const pageTitle = (page.seoTitle || title).replace(/Nexovate/g, "Nexoratech");
    const pageDescription = (page.seoDescription || description).replace(/Nexovate/g, "Nexoratech");
    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    if (keywords.length) setMeta("name", "keywords", keywords.join(", "));
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:image", `${SITE.domain}/og/${path.split("/").filter(Boolean).pop() || "home"}.jpg`);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);

    let canon = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = url;

    document.head.querySelectorAll("script[data-seo]").forEach((n) => n.remove());
    [orgSchema(), ...schemas.map((sc: any) => sc?.["@type"] === "FAQPage" && page.faqs?.length ? faqSchema(page.faqs) : sc)].forEach((sc) => {
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.dataset.seo = "1";
      tag.text = JSON.stringify(sc).replace(/Nexovate/g, "Nexoratech").replace(/nexovate/g, "nexoratech");
      document.head.appendChild(tag);
    });
  }, [title, description, path, keywords.join(","), JSON.stringify(schemas)]);
  return null;
}

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.domain,
  logo: `${SITE.domain}/logo.png`,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", streetAddress: "350 Mission Street, Suite 1200", addressLocality: "San Francisco", addressRegion: "CA", postalCode: "94105", addressCountry: "US" },
  sameAs: Object.values(SITE.socials),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "186" },
});

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE.domain + it.path })),
});

export const serviceSchema = (name: string, description: string, path: string, serviceType: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: SITE.domain + path,
  provider: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  areaServed: ["US", "GB", "CA", "AU", "AE", "IN", "EU"],
});

export const articleSchema = (title: string, description: string, path: string, author: string, date: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: SITE.domain + path,
  datePublished: date,
  dateModified: date,
  author: { "@type": "Person", name: author },
  publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.domain}/logo.png` } },
});
