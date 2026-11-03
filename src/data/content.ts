import type { Faq } from "./services";

export interface Blog {
  slug: string; title: string; excerpt: string; category: string; author: string; authorRole: string;
  date: string; read: number; keyword: string; service: string; body: { h: string; p: string[] }[]; faqs: Faq[];
}

export const BLOGS: Blog[] = [
  {
    slug: "what-is-generative-engine-optimization-geo",
    title: "What Is Generative Engine Optimization (GEO)? The 2026 Playbook",
    excerpt: "How to get your brand cited by ChatGPT, Gemini, Perplexity and Google AI Overviews — a step-by-step GEO framework.",
    category: "Digital Marketing", author: "Vikram Shah", authorRole: "Head of Digital Marketing", date: "2026-03-12", read: 9,
    keyword: "generative engine optimization", service: "digital-marketing",
    body: [
      { h: "What is GEO?", p: ["Generative Engine Optimization (GEO) is the practice of optimising content so AI-powered answer engines such as ChatGPT, Gemini, Claude and Perplexity cite and recommend your brand in their generated responses.", "Unlike classic SEO, which targets ranked blue links, GEO targets inclusion inside synthesised answers."] },
      { h: "Why GEO matters in 2026", p: ["A growing share of informational searches now end inside AI summaries. Brands absent from those answers lose visibility even if they rank on page one."] },
      { h: "7-step GEO framework", p: ["1) Build entity authority with consistent NAP and Organization schema. 2) Publish original data and statistics. 3) Answer questions in the first 40–60 words. 4) Use FAQ, HowTo and Article schema. 5) Earn citations on authoritative third-party sites. 6) Show author expertise (E-E-A-T). 7) Track AI visibility monthly."] },
    ],
    faqs: [
      { q: "Is GEO replacing SEO?", a: "No. GEO extends SEO. Strong technical SEO, authority and helpful content remain the foundation AI engines draw from." },
      { q: "How do I measure GEO success?", a: "Track brand mentions and citations across ChatGPT, Perplexity and Google AI Overviews for your target prompts, plus referral traffic from AI tools in GA4." },
      { q: "What content gets cited by AI engines?", a: "Concise, factual, well-structured content with original data, clear definitions, expert authorship and schema markup is cited most often." },
      { q: "How long does GEO take to show results?", a: "Most brands see initial AI citation improvements within 8–12 weeks of publishing optimised, authoritative content." },
      { q: "Does schema markup help GEO?", a: "Yes. Schema helps AI systems understand entities, relationships and facts, increasing the probability of accurate citation." },
      { q: "What is the difference between AEO and GEO?", a: "AEO optimises for direct answers such as featured snippets and voice assistants; GEO optimises for citation in generative AI responses." },
    ],
  },
  {
    slug: "custom-software-development-cost-guide",
    title: "Custom Software Development Cost in 2026: Complete Breakdown",
    excerpt: "Realistic cost ranges by project type, team location and engagement model — plus 9 ways to reduce cost without cutting quality.",
    category: "Software Development", author: "Laura Bennett", authorRole: "CTO", date: "2026-02-20", read: 11,
    keyword: "custom software development cost", service: "custom-software-development",
    body: [
      { h: "Average cost of custom software", p: ["Custom software typically costs $25,000–$80,000 for an MVP, $80,000–$250,000 for mid-size platforms and $250,000+ for enterprise systems."] },
      { h: "Key cost factors", p: ["Scope and features, UI complexity, integrations, compliance (HIPAA, PCI-DSS, GDPR), team location and engagement model all drive the final number."] },
      { h: "How to reduce cost", p: ["Start with an MVP, prioritise ruthlessly with MoSCoW, reuse open-source components, choose cross-platform where possible and work with a dedicated offshore team."] },
    ],
    faqs: [
      { q: "Why is custom software expensive?", a: "It requires skilled architects, developers, designers and QA engineers to build a solution tailored to unique requirements, along with security and scalability work." },
      { q: "Is offshore development cheaper?", a: "Yes, offshore teams in India or Eastern Europe can reduce costs by 40–60% while maintaining quality when processes are mature." },
      { q: "What is cheaper: fixed price or time & material?", a: "Fixed price suits small, well-defined scopes; time & material is usually more cost-efficient for evolving products." },
      { q: "How much does software maintenance cost?", a: "Annual maintenance typically costs 15–20% of the initial development cost." },
      { q: "Can I get an accurate estimate upfront?", a: "A discovery phase of 1–3 weeks produces a detailed scope and an accurate estimate with ±10% variance." },
      { q: "Does an MVP save money?", a: "Yes. An MVP validates demand before you invest in the full product, avoiding costly features users don't need." },
    ],
  },
  {
    slug: "flutter-vs-react-native",
    title: "Flutter vs React Native: Which Should You Choose in 2026?",
    excerpt: "A practical, benchmark-based comparison of performance, ecosystem, hiring and cost for cross-platform apps.",
    category: "Mobile Apps", author: "Arjun Mehta", authorRole: "Founder & CEO", date: "2026-01-28", read: 8,
    keyword: "flutter vs react native", service: "mobile-app-development",
    body: [
      { h: "Quick answer", p: ["Choose Flutter for pixel-perfect custom UI and consistent performance; choose React Native if your team knows JavaScript/React and you want to share code with a web app."] },
      { h: "Performance", p: ["Flutter compiles to native ARM code with its own rendering engine; React Native's New Architecture (Fabric, JSI) has closed much of the gap."] },
      { h: "Ecosystem & hiring", p: ["React Native benefits from the massive JavaScript ecosystem; Flutter's pub.dev ecosystem is growing quickly with strong Google backing."] },
    ],
    faqs: [
      { q: "Is Flutter faster than React Native?", a: "Flutter often has slightly better rendering performance for animation-heavy UIs, but for most business apps the difference is negligible." },
      { q: "Which is cheaper to develop?", a: "Both reduce cost by ~30–40% versus two native apps; the cheaper option depends on your team's existing skills." },
      { q: "Do big companies use Flutter?", a: "Yes, Google Pay, BMW, Alibaba and eBay Motors use Flutter in production." },
      { q: "Do big companies use React Native?", a: "Yes, Meta, Microsoft, Shopify and Discord use React Native in production apps." },
      { q: "Can I share code with my website?", a: "React Native allows easier code sharing with React web apps; Flutter supports web but is less common for SEO-focused sites." },
      { q: "Which is better for startups?", a: "Both work well; startups with JavaScript developers often choose React Native, while design-led startups often choose Flutter." },
    ],
  },
  {
    slug: "how-to-build-an-ai-chatbot-for-business",
    title: "How to Build an AI Chatbot for Your Business (Step-by-Step)",
    excerpt: "From use-case selection to RAG architecture, guardrails and ROI — everything to launch a production AI chatbot.",
    category: "AI/ML", author: "Laura Bennett", authorRole: "CTO", date: "2026-03-02", read: 10,
    keyword: "build an AI chatbot", service: "ai-ml-development",
    body: [
      { h: "Step 1: Define the use case", p: ["Start with high-volume, repetitive conversations — support FAQs, lead qualification or internal knowledge queries."] },
      { h: "Step 2: Choose architecture", p: ["Retrieval-Augmented Generation (RAG) grounds the LLM in your documents, reducing hallucinations and keeping answers current."] },
      { h: "Step 3: Add guardrails & measure", p: ["Implement content filters, human handoff, analytics and continuous evaluation to improve accuracy over time."] },
    ],
    faqs: [
      { q: "How much does an AI chatbot cost?", a: "Business AI chatbots typically cost $20,000–$60,000 to build, plus monthly LLM and hosting costs." },
      { q: "What is RAG?", a: "Retrieval-Augmented Generation retrieves relevant company documents and feeds them to an LLM so answers are accurate and grounded." },
      { q: "Can a chatbot integrate with my CRM?", a: "Yes, chatbots can create leads, tickets and records in Salesforce, HubSpot, Zoho and other CRMs via APIs." },
      { q: "Is an AI chatbot secure?", a: "With private deployments, encryption, PII redaction and role-based access, AI chatbots can meet GDPR and HIPAA requirements." },
      { q: "How long does it take to build?", a: "A production-ready AI chatbot usually takes 6–12 weeks." },
      { q: "Will it replace my support team?", a: "No, it handles repetitive queries so your team can focus on complex, high-value conversations." },
    ],
  },
  {
    slug: "technical-seo-checklist",
    title: "The Ultimate Technical SEO Checklist (50+ Points)",
    excerpt: "Crawlability, indexation, Core Web Vitals, schema and internal linking — the audit our SEO team uses.",
    category: "SEO", author: "Vikram Shah", authorRole: "Head of Digital Marketing", date: "2025-12-15", read: 12,
    keyword: "technical SEO checklist", service: "digital-marketing",
    body: [
      { h: "Crawlability & indexation", p: ["Validate robots.txt, XML sitemaps, canonical tags, status codes and noindex usage."] },
      { h: "Core Web Vitals", p: ["Target LCP under 2.5s, INP under 200ms and CLS under 0.1 using image optimisation, code splitting and caching."] },
      { h: "Structured data", p: ["Implement Organization, Service, BreadcrumbList, FAQPage and Article schema to enhance SERP visibility."] },
    ],
    faqs: [
      { q: "What is technical SEO?", a: "Technical SEO optimises a website's infrastructure so search engines can crawl, render and index it efficiently." },
      { q: "How often should I run a technical SEO audit?", a: "Run a full audit quarterly and monitor critical issues weekly using Search Console and crawling tools." },
      { q: "Do Core Web Vitals affect rankings?", a: "Yes, they are part of Google's page experience signals and impact both rankings and conversions." },
      { q: "Is an XML sitemap required?", a: "It isn't mandatory, but it helps search engines discover and prioritise important URLs." },
      { q: "What is a canonical tag?", a: "A canonical tag tells search engines which URL is the preferred version of duplicate or similar pages." },
      { q: "Does schema markup improve rankings?", a: "Schema doesn't directly boost rankings but enables rich results that improve click-through rates." },
    ],
  },
  {
    slug: "ui-ux-design-process",
    title: "Our 7-Stage UI/UX Design Process That Boosts Conversions",
    excerpt: "The exact research-to-handoff workflow we use to design products users love.",
    category: "UI/UX", author: "Priya Nair", authorRole: "Design Director", date: "2025-11-22", read: 7,
    keyword: "UI UX design process", service: "ui-ux-design",
    body: [
      { h: "Discovery & research", p: ["Stakeholder workshops, user interviews and analytics reviews reveal real problems to solve."] },
      { h: "Wireframes & prototypes", p: ["Low-fidelity wireframes validate structure before high-fidelity prototypes test interactions."] },
      { h: "Test & hand off", p: ["Usability testing guides iteration; a Figma design system ensures pixel-perfect development."] },
    ],
    faqs: [
      { q: "What are the stages of UX design?", a: "Discovery, research, information architecture, wireframing, visual design, prototyping/testing and handoff." },
      { q: "How long does UI/UX design take?", a: "A typical website or app design takes 4–10 weeks depending on scope." },
      { q: "Why is user research important?", a: "It ensures design decisions are based on real user needs rather than assumptions, reducing costly rework." },
      { q: "What is a design system?", a: "A design system is a library of reusable components, tokens and guidelines that keeps product UI consistent." },
      { q: "What is usability testing?", a: "Usability testing observes real users completing tasks to identify friction points in a design." },
      { q: "Do you design in Figma?", a: "Yes, Figma is our primary tool for design, prototyping and developer handoff." },
    ],
  },
];

export interface CaseStudy {
  slug: string; title: string; client: string; industry: string; service: string; summary: string;
  challenge: string; solution: string; results: { v: string; l: string }[]; tech: string[]; faqs: Faq[];
}

const csFaqs = (client: string, svc: string): Faq[] => [
  { q: `What problem did ${client} need to solve?`, a: `${client} needed a scalable ${svc} solution to remove operational bottlenecks, improve customer experience and support rapid growth.` },
  { q: `How long did the ${client} project take?`, a: `The project was delivered in agile phases over 4–6 months, with the first production release in under 10 weeks.` },
  { q: "What engagement model was used?", a: "A dedicated cross-functional team (PM, designers, engineers, QA) working in two-week sprints with weekly demos." },
  { q: "How were results measured?", a: "KPIs were agreed during discovery and tracked through analytics dashboards before and after launch." },
  { q: "Is the solution still supported by Nexovate?", a: "Yes, Nexovate continues to provide maintenance, monitoring and roadmap development under an SLA." },
  { q: "Can a similar solution work for my business?", a: "Yes. Book a free consultation and we will assess how a similar approach can be tailored to your goals." },
];

export const CASES: CaseStudy[] = [
  { slug: "fintech-lending-platform", title: "Rebuilding a Digital Lending Platform for 5x Scale", client: "FinEdge Capital", industry: "FinTech", service: "custom-software-development", summary: "Cloud-native lending platform processing 40,000+ loan applications monthly.", challenge: "Legacy monolith caused 12-minute approval delays and frequent downtime.", solution: "Microservices on AWS, automated credit scoring with ML and a React-based borrower portal.", results: [{ v: "5x", l: "Throughput" }, { v: "92%", l: "Faster approvals" }, { v: "99.98%", l: "Uptime" }], tech: ["Node.js", "React", "AWS", "PostgreSQL", "Python ML"], faqs: csFaqs("FinEdge Capital", "fintech software") },
  { slug: "ecommerce-seo-growth", title: "312% Organic Growth for a D2C Shopify Brand", client: "Shopora", industry: "eCommerce", service: "digital-marketing", summary: "SEO + Shopify revamp turning organic search into the top revenue channel.", challenge: "Slow theme, thin product content and zero topical authority.", solution: "Shopify OS 2.0 rebuild, technical SEO, topical content clusters and digital PR.", results: [{ v: "312%", l: "Organic traffic" }, { v: "2.4x", l: "Revenue" }, { v: "180+", l: "Page-1 keywords" }], tech: ["Shopify", "Ahrefs", "GA4", "Schema"], faqs: csFaqs("Shopora", "SEO and eCommerce") },
  { slug: "healthcare-ai-chatbot", title: "HIPAA-Compliant AI Triage Chatbot", client: "HealthNova", industry: "Healthcare", service: "ai-ml-development", summary: "RAG-based AI assistant handling patient queries 24/7.", challenge: "Support team overwhelmed by 15,000 monthly repetitive patient queries.", solution: "Secure LLM chatbot with RAG over clinical FAQs, EHR integration and human handoff.", results: [{ v: "48%", l: "Ticket reduction" }, { v: "24/7", l: "Availability" }, { v: "4.7★", l: "Patient CSAT" }], tech: ["Python", "LangChain", "Azure OpenAI", "FHIR"], faqs: csFaqs("HealthNova", "AI chatbot") },
  { slug: "edtech-mobile-app", title: "Flutter Learning App Reaching 1M+ Students", client: "EduSpark", industry: "EdTech", service: "mobile-app-development", summary: "Cross-platform learning app with offline lessons and gamification.", challenge: "Fragmented native apps with poor ratings and high maintenance cost.", solution: "Unified Flutter app, redesigned UX, offline sync and live classes.", results: [{ v: "1M+", l: "Downloads" }, { v: "4.8★", l: "Store rating" }, { v: "40%", l: "Lower cost" }], tech: ["Flutter", "Firebase", "Node.js", "Agora"], faqs: csFaqs("EduSpark", "mobile app") },
  { slug: "logistics-erp", title: "Custom ERP Unifying 22 Warehouses", client: "Logistiq", industry: "Logistics", service: "custom-software-development", summary: "Real-time inventory, fleet and billing in a single ERP.", challenge: "Spreadsheets and disconnected tools causing stock errors.", solution: "Custom ERP with barcode scanning, route optimisation and BI dashboards.", results: [{ v: "35%", l: "Ops cost saved" }, { v: "99.5%", l: "Stock accuracy" }, { v: "22", l: "Warehouses" }], tech: [".NET", "Angular", "Azure", "Power BI"], faqs: csFaqs("Logistiq", "ERP") },
  { slug: "proptech-brand-ux", title: "Brand & UX Overhaul for a PropTech Startup", client: "PropNest", industry: "Real Estate", service: "ui-ux-design", summary: "New identity and product UX that doubled demo bookings.", challenge: "Inconsistent brand and confusing property search flow.", solution: "Brand identity system, UX research and a redesigned search & booking journey.", results: [{ v: "2.1x", l: "Demo bookings" }, { v: "-38%", l: "Bounce rate" }, { v: "+65%", l: "Time on site" }], tech: ["Figma", "Maze", "React"], faqs: csFaqs("PropNest", "UI/UX and branding") },
];

export const HOME_FAQS: Faq[] = [
  { q: "What IT services does Nexovate provide?", a: "Nexovate provides digital marketing, web & CMS development, graphic design, custom software development, UI/UX design, AI/ML development, mobile app development and dedicated developer hiring for startups, SMBs and enterprises worldwide." },
  { q: "Why choose Nexovate as your IT development partner?", a: "Clients choose Nexovate for 12+ years of experience, 850+ delivered projects, 320+ in-house experts, ISO 9001 & 27001 certified processes, transparent pricing and a 98% client retention rate." },
  { q: "Which industries do you work with?", a: "We serve healthcare, fintech, eCommerce, EdTech, real estate, logistics, travel, manufacturing, media and SaaS companies across the USA, UK, Europe, Middle East, Australia and India." },
  { q: "How much does a software or website project cost?", a: "Websites start from around $3,000, mobile apps from $15,000 and custom software MVPs from $25,000. We provide a free, detailed estimate within 48 hours after a discovery call." },
  { q: "Do you sign an NDA before discussing my project?", a: "Yes. We sign a mutual NDA before any detailed discussion, and all intellectual property and source code belong to you." },
  { q: "What engagement models do you offer?", a: "We offer Fixed Price, Time & Material and Dedicated Team models, plus hourly, part-time and full-time options for hiring dedicated developers." },
  { q: "How do you communicate during a project?", a: "You get a dedicated project manager, sprint demos every two weeks, daily or weekly updates via Slack, Teams or email, and full access to project tools like Jira." },
  { q: "Do you provide support after project launch?", a: "Yes. Every project includes a free warranty period followed by flexible maintenance and support plans with defined SLAs." },
];

export const ABOUT_FAQS: Faq[] = [
  { q: "When was Nexovate founded?", a: "Nexovate Technologies was founded in 2014 and has grown into a 320+ member IT services company with offices in the USA and India." },
  { q: "Where is Nexovate located?", a: "Our headquarters are in San Francisco, USA, with a global delivery center in Ahmedabad, India, serving clients in 30+ countries." },
  { q: "What certifications does Nexovate hold?", a: "Nexovate is ISO 9001:2015 and ISO 27001 certified and is a Google Partner, Meta Business Partner, AWS Partner, Microsoft Partner and Shopify Partner." },
  { q: "What is Nexovate's mission?", a: "Our mission is to engineer digital growth for businesses by combining technology, design and marketing into measurable outcomes." },
  { q: "How big is the Nexovate team?", a: "We have 320+ in-house professionals including engineers, designers, marketers, QA specialists, data scientists and project managers." },
  { q: "Does Nexovate work with startups?", a: "Yes. About 40% of our clients are startups, and we offer MVP development, startup-friendly pricing and technical co-founder style partnerships." },
];

export const BLOG_INDEX_FAQS: Faq[] = [
  { q: "What topics does the Nexovate blog cover?", a: "Our blog covers software development, AI/ML, mobile apps, UI/UX, SEO, AEO, GEO, digital marketing and technology cost guides." },
  { q: "Who writes the Nexovate blog?", a: "Articles are written and reviewed by Nexovate practitioners — engineers, designers and marketers with 10+ years of hands-on experience." },
  { q: "How often is the blog updated?", a: "We publish new articles weekly and review existing guides every quarter to keep data and recommendations current." },
  { q: "Can I republish your articles?", a: "You may quote short excerpts with attribution and a link to the original article; full republishing requires written permission." },
  { q: "Can I request a topic?", a: "Yes, send your topic suggestion via our contact page and our editorial team will consider it." },
  { q: "Do you accept guest posts?", a: "We accept a limited number of expert guest contributions that meet our editorial and E-E-A-T standards." },
];

export const CASE_INDEX_FAQS: Faq[] = [
  { q: "What are Nexovate case studies?", a: "Our case studies document real client projects, including the challenge, solution, technology stack and measurable business results." },
  { q: "Are your case study results verified?", a: "Yes, results are based on client analytics data and approved by clients before publication; many are also reviewed on Clutch." },
  { q: "Can I speak with a past client?", a: "Yes, we can arrange reference calls with relevant past clients after an initial consultation." },
  { q: "Do you have case studies in my industry?", a: "We have delivered projects across 10+ industries; contact us for industry-specific portfolios not published publicly due to NDAs." },
  { q: "Why are some client names anonymised?", a: "Some clients require confidentiality under NDA, so we share results without revealing identifying details." },
  { q: "How can I start a similar project?", a: "Book a free consultation; we'll analyse your requirements and propose a tailored solution and estimate within 48 hours." },
];

export const SERVICES_INDEX_FAQS: Faq[] = [
  { q: "What are Nexovate's core services?", a: "Our eight core services are Digital Marketing, Web & CMS Development, Graphic Design, Custom Software Development, UI/UX Design, AI/ML Development, Mobile App Development and Hire Dedicated Developers." },
  { q: "Can you handle a project end-to-end?", a: "Yes. We cover strategy, design, development, testing, launch and marketing, so you work with a single accountable partner." },
  { q: "How do I choose the right service?", a: "Book a free consultation; our solution architects assess your goals and recommend the right mix of services and engagement model." },
  { q: "Do you offer bundled packages?", a: "Yes, we offer bundled packages such as website + SEO, or app + UI/UX + launch marketing at discounted rates." },
  { q: "Do you work with international clients?", a: "Yes, we serve clients in the USA, UK, Canada, Europe, the Middle East, Australia and India with overlapping time zones." },
  { q: "How quickly can you start?", a: "Most projects kick off within 5–7 business days after the proposal is signed; dedicated developers can start within 48 hours." },
];
