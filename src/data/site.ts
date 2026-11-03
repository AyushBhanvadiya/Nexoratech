import { px } from "./images";

// Central brand config — change once, updates everywhere (metas, schema, footer, etc.)
export const SITE = {
  name: "Nexoratech",
  short: "Nexoratech",
  domain: "https://www.nexoratech.com",
  tagline: "Engineering Digital Growth",
  email: "hello@nexoratech.com",
  sales: "sales@nexoratech.com",
  phone: "+1 (415) 555-0142",
  phone2: "+91 98765 43210",
  address: "350 Mission Street, Suite 1200, San Francisco, CA 94105, USA",
  addressIN: "4th Floor, Tech Park, SG Highway, Ahmedabad, Gujarat 380054, India",
  founded: 2014,
  logoText: "Nexoratech",
  socials: {
    linkedin: "https://www.linkedin.com/company/nexoratech",
    x: "https://x.com/nexoratech",
    instagram: "https://www.instagram.com/nexoratech",
    facebook: "https://www.facebook.com/nexoratech",
    youtube: "https://www.youtube.com/@nexoratech",
    clutch: "https://clutch.co/profile/nexoratech",
  },
  stats: [
    { value: 12, suffix: "+", label: "Years of Experience" },
    { value: 850, suffix: "+", label: "Projects Delivered" },
    { value: 320, suffix: "+", label: "In-house Experts" },
    { value: 98, suffix: "%", label: "Client Retention" },
  ],
};

export const THEMES = [
  { id: "indigo", name: "Indigo Nebula", a: "#6366f1", b: "#06b6d4" },
  { id: "emerald", name: "Emerald Tech", a: "#10b981", b: "#84cc16" },
  { id: "sunset", name: "Sunset Fusion", a: "#f97316", b: "#ec4899" },
  { id: "ocean", name: "Ocean Pulse", a: "#0ea5e9", b: "#6366f1" },
  { id: "royal", name: "Royal Neon", a: "#8b5cf6", b: "#f43f5e" },
] as const;

// Real brand logo sources (official marks via Simple Icons CDN / Wikimedia Commons / site favicons)
const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
const wm = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=200`;
const fav = (domain: string, sz = 128) => `https://www.google.com/s2/favicons?domain=${domain}&sz=${sz}`;

export const TRUST_BADGES = [
  { name: "ISO 9001:2015", caption: "Quality Management", logo: wm("ISO_Logo_(Red_square).svg") },
  { name: "ISO 27001", caption: "Information Security", logo: wm("ISO_Logo_(Red_square).svg") },
  { name: "Clutch Top 1000", caption: "Verified Reviews", logo: fav("clutch.co") },
  { name: "Google Partner", caption: "Certified Agency", logo: si("google") },
  { name: "Meta Business Partner", caption: "Ads Certified", logo: si("meta") },
  { name: "AWS Partner", caption: "Cloud Partner", logo: wm("Amazon_Web_Services_Logo.svg") },
  { name: "Microsoft Partner", caption: "Solutions Partner", logo: wm("Microsoft_logo.svg") },
  { name: "GoodFirms Top Developer", caption: "Top-rated Company", logo: fav("goodfirms.co") },
  { name: "Shopify Partner", caption: "Certified Experts", logo: si("shopify") },
  { name: "NASSCOM Member", caption: "Industry Body", logo: fav("nasscom.in", 64) },
];

export const CLIENTS = [
  { name: "Google", logo: si("google") },
  { name: "Microsoft", logo: wm("Microsoft_logo.svg") },
  { name: "Amazon Web Services", logo: wm("Amazon_Web_Services_Logo.svg") },
  { name: "Shopify", logo: si("shopify") },
  { name: "Meta", logo: si("meta") },
  { name: "Spotify", logo: si("spotify") },
  { name: "Airbnb", logo: si("airbnb") },
  { name: "Stripe", logo: si("stripe") },
  { name: "Samsung", logo: si("samsung") },
  { name: "PayPal", logo: si("paypal") },
];

export const INDUSTRIES = [
  "Healthcare", "FinTech & Banking", "eCommerce & Retail", "EdTech", "Real Estate", "Logistics",
  "Travel & Hospitality", "Manufacturing", "Media & Entertainment", "SaaS & Startups",
];

export const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "CTO, FinEdge Capital", photo: px(33680700, 200, 200), text: "Nexoratech rebuilt our lending platform in 5 months. Their engineering rigor, weekly demos and transparent reporting made them feel like an in-house team.", rating: 5 },
  { name: "Rahul Verma", role: "Founder, Shopora", photo: px(7752803, 200, 200), text: "Organic traffic grew 312% in 9 months after their SEO and Shopify revamp. Revenue from search is now our #1 channel.", rating: 5 },
  { name: "Daniel Okafor", role: "VP Product, HealthNova", photo: px(36432729, 200, 200), text: "Their AI team shipped a HIPAA-compliant triage chatbot that cut support load by 48%. Truly domain experts.", rating: 5 },
  { name: "Emily Chen", role: "Marketing Head, EduSpark", photo: px(8837498, 200, 200), text: "From brand identity to app UI, the design team nailed it. Our app store rating went from 3.6 to 4.8.", rating: 5 },
];

export const TEAM = [
  { name: "Arjun Mehta", role: "Founder & CEO", bio: "18+ years in enterprise software; ex-Infosys architect; led 300+ digital transformation programs.", initials: "AM" },
  { name: "Laura Bennett", role: "Chief Technology Officer", bio: "Cloud & AI architect, AWS Certified Solutions Architect Professional, ex-Accenture.", initials: "LB" },
  { name: "Vikram Shah", role: "Head of Digital Marketing", bio: "Google & Meta certified; scaled 120+ brands with SEO, AEO & performance marketing.", initials: "VS" },
  { name: "Priya Nair", role: "Design Director", bio: "Award-winning UI/UX leader, 14 years crafting products for Fortune 500 and startups.", initials: "PN" },
];
