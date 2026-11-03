export interface Faq { q: string; a: string }
export interface SubService {
  slug: string;
  name: string;
  keyword: string;
  secondary: string[];
  desc: string;
  features: string[];
}
export interface CoreService {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  keyword: string;
  secondary: string[];
  metaTitle: string;
  metaDesc: string;
  intro: string;
  benefits: { title: string; text: string }[];
  tech: string[];
  faqs: Faq[];
  subs: SubService[];
}

const s = (slug: string, name: string, keyword: string, desc: string, features: string[], secondary: string[] = []): SubService => ({ slug, name, keyword, desc, features, secondary });

export const SERVICES: CoreService[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing Solutions",
    icon: "Megaphone",
    tagline: "Data-driven growth across search, social, paid and AI channels.",
    keyword: "digital marketing services",
    secondary: ["digital marketing agency", "online marketing company", "performance marketing", "ROI-driven marketing"],
    metaTitle: "Digital Marketing Services | ROI-Driven Agency | Nexovate",
    metaDesc: "Grow traffic, leads & revenue with Nexovate's digital marketing services — SEO, social media, PPC and AI marketing backed by 12+ years of proven results.",
    intro: "Digital marketing services are integrated strategies — SEO, social media, paid advertising and AI-powered automation — that help businesses attract, convert and retain customers online. At Nexovate, certified strategists combine search data, creative storytelling and conversion analytics to deliver measurable pipeline growth, not vanity metrics.",
    benefits: [
      { title: "Full-Funnel Strategy", text: "Awareness to retention plans mapped to your buyer journey and revenue goals." },
      { title: "Transparent Reporting", text: "Live Looker Studio dashboards tracking leads, CAC, ROAS and organic share of voice." },
      { title: "Certified Specialists", text: "Google Ads, Meta Blueprint, HubSpot and SEMrush certified team members." },
      { title: "AEO & GEO Ready", text: "Content optimised for Google AI Overviews, ChatGPT, Perplexity and voice assistants." },
    ],
    tech: ["Google Analytics 4", "Search Console", "SEMrush", "Ahrefs", "Google Ads", "Meta Ads Manager", "HubSpot", "Looker Studio"],
    faqs: [
      { q: "What are digital marketing services?", a: "Digital marketing services are online strategies such as SEO, social media management, pay-per-click advertising, content marketing and AI marketing used to increase a brand's visibility, traffic, leads and sales across search engines, social platforms and AI answer engines." },
      { q: "How much do digital marketing services cost?", a: "Digital marketing packages at Nexovate typically start from $1,000 per month for small businesses and scale to $10,000+ per month for enterprise multi-channel campaigns. Pricing depends on channels, competition, ad spend and content volume." },
      { q: "How long does it take to see results from digital marketing?", a: "PPC and paid social can generate leads within 1–2 weeks. SEO usually shows meaningful ranking and traffic growth within 3–6 months, while compounding organic results appear after 6–12 months of consistent effort." },
      { q: "Which digital marketing channel is best for my business?", a: "The best channel depends on your audience and goals. B2B companies often see the highest ROI from SEO, LinkedIn and Google Ads, while B2C and eCommerce brands typically benefit from Meta Ads, Instagram, Shopping campaigns and influencer content." },
      { q: "Do you provide monthly reports?", a: "Yes. Every client receives a live dashboard plus a monthly strategy report covering traffic, rankings, conversions, cost per lead, ROAS and next-month action items, reviewed in a call with your account manager." },
      { q: "What is AEO and GEO in digital marketing?", a: "AEO (Answer Engine Optimization) structures content so it appears in featured snippets and voice answers. GEO (Generative Engine Optimization) optimises brand content to be cited by AI tools like ChatGPT, Gemini and Perplexity." },
      { q: "Do you work with small businesses and startups?", a: "Yes. We offer flexible startup-friendly plans with no long-term lock-in, focusing first on the highest-impact channels so smaller budgets still generate measurable growth." },
    ],
    subs: [
      s("seo-services", "SEO Services", "SEO services", "Technical, on-page, off-page and local SEO that grows organic rankings, traffic and qualified leads sustainably.", ["Technical SEO audits & Core Web Vitals", "Keyword research & content strategy", "White-hat link building", "Local SEO & Google Business Profile"], ["search engine optimization company", "SEO agency", "organic traffic growth"]),
      s("social-media-management", "Social Media Management", "social media management services", "End-to-end content calendars, community management and analytics across Instagram, LinkedIn, Facebook, X and YouTube.", ["Platform-specific content calendars", "Reels, carousels & short-form video", "Community & reputation management", "Influencer collaboration"], ["social media marketing agency", "SMM services"]),
      s("ppc-management", "PPC Management", "PPC management services", "ROI-focused Google Ads, Bing, Meta and LinkedIn campaigns engineered for lower CPA and higher ROAS.", ["Search, Shopping & Performance Max", "Meta & LinkedIn lead generation", "Landing page CRO", "Conversion tracking & GA4 setup"], ["pay per click agency", "Google Ads management"]),
      s("ai-marketing-services", "AI Marketing Services", "AI marketing services", "Leverage AI for predictive audiences, content automation, personalization and GEO visibility in AI search.", ["AI content & creative automation", "Predictive lead scoring", "Generative Engine Optimization (GEO)", "Marketing automation workflows"], ["AI powered marketing", "AI digital marketing agency"]),
    ],
  },
  {
    slug: "web-cms-development",
    name: "Web & CMS Development",
    icon: "Globe",
    tagline: "Fast, secure, SEO-ready websites and web apps on modern stacks.",
    keyword: "web development services",
    secondary: ["website development company", "CMS development services", "custom web application development"],
    metaTitle: "Web & CMS Development Services | Custom Websites | Nexovate",
    metaDesc: "Custom web & CMS development services — WordPress, Shopify, React, Node, Angular, Vue & Python. Fast, secure, SEO-friendly websites built by 320+ experts.",
    intro: "Web and CMS development services cover the design, engineering and maintenance of websites and web applications using frameworks like React, Node.js and Python, and content management systems such as WordPress and Shopify. Nexovate builds performance-first, accessible and SEO-optimised web platforms that scale with your business.",
    benefits: [
      { title: "Performance First", text: "90+ Lighthouse scores, Core Web Vitals passed and CDN-optimised delivery." },
      { title: "SEO Built-in", text: "Schema markup, clean URLs, sitemaps and semantic HTML from day one." },
      { title: "Secure by Design", text: "OWASP Top 10 practices, SSL, WAF and regular security patching." },
      { title: "Easy to Manage", text: "Intuitive CMS dashboards so your team can update content without developers." },
    ],
    tech: ["React", "Next.js", "Node.js", "Angular", "Vue", "Python", "WordPress", "Shopify", "Laravel", "AWS"],
    faqs: [
      { q: "What do web development services include?", a: "Web development services include requirement analysis, UI/UX design, front-end and back-end development, CMS integration, API development, testing, deployment, hosting setup, SEO configuration and ongoing maintenance." },
      { q: "How much does it cost to build a website?", a: "A business website typically costs $3,000–$15,000, an eCommerce store $8,000–$40,000 and a custom web application $25,000+. Final pricing depends on features, integrations, design complexity and content volume." },
      { q: "How long does website development take?", a: "A standard corporate website takes 4–8 weeks, an eCommerce site 8–12 weeks and complex web applications 3–6 months, including design, development, QA and launch." },
      { q: "Which CMS is best: WordPress or Shopify?", a: "WordPress is best for content-rich websites, blogs and flexible business sites, while Shopify is ideal for eCommerce stores needing secure checkout, inventory and payment features out of the box." },
      { q: "Will my website be SEO-friendly and mobile responsive?", a: "Yes. Every Nexovate website is mobile-first, passes Core Web Vitals, and includes schema markup, meta tags, XML sitemap, robots.txt and clean URL structure as standard." },
      { q: "Do you provide website maintenance after launch?", a: "Yes. We offer monthly maintenance plans covering security updates, backups, uptime monitoring, performance tuning, content updates and feature enhancements." },
    ],
    subs: [
      s("custom-web-development", "Custom Web Development", "custom web development services", "Bespoke websites and web applications engineered around your exact business workflows.", ["Custom portals & dashboards", "Progressive Web Apps (PWA)", "Headless CMS architecture", "Third-party API integrations"]),
      s("wordpress-development", "WordPress Development", "WordPress development services", "Custom WordPress themes, plugins, WooCommerce stores and high-performance WP hosting setups.", ["Custom theme & Gutenberg blocks", "Plugin development", "WooCommerce stores", "Speed & security hardening"]),
      s("shopify-development", "Shopify Development", "Shopify development services", "High-converting Shopify & Shopify Plus stores, custom themes, apps and migrations.", ["Custom Shopify themes (OS 2.0)", "Shopify Plus & headless Hydrogen", "Custom apps & checkout extensions", "Store migration"]),
      s("react-js-development", "React JS Development", "React JS development services", "Scalable, lightning-fast single-page apps and Next.js websites built with React.", ["SPA & Next.js SSR apps", "Component libraries", "State management (Redux, Zustand)", "React migration"]),
      s("node-js-development", "Node JS Development", "Node JS development services", "Real-time, event-driven back-ends, APIs and microservices powered by Node.js.", ["REST & GraphQL APIs", "Microservices architecture", "Real-time apps with WebSockets", "Serverless functions"]),
      s("angular-js-development", "Angular JS Development", "Angular development services", "Enterprise-grade Angular applications with robust architecture and TypeScript.", ["Enterprise SPAs", "AngularJS to Angular migration", "Angular Material UI", "Unit & e2e testing"]),
      s("vue-js-development", "Vue JS Development", "Vue JS development services", "Lightweight, reactive Vue.js and Nuxt applications with clean, maintainable code.", ["Vue 3 & Nuxt apps", "Pinia state management", "Component development", "Vue migration"]),
      s("python-development", "Python Development", "Python development services", "Django, Flask and FastAPI back-ends, automation scripts and data-driven web apps.", ["Django & FastAPI apps", "Automation & scraping", "Data dashboards", "AI/ML integration"]),
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Designing",
    icon: "Palette",
    tagline: "Memorable brand visuals that communicate and convert.",
    keyword: "graphic design services",
    secondary: ["graphic design company", "branding agency", "creative design services"],
    metaTitle: "Graphic Design Services | Branding & Creative | Nexovate",
    metaDesc: "Professional graphic design services — brand identity, illustration, web & app design, 3D, motion graphics and packaging that make your brand unforgettable.",
    intro: "Graphic design services transform brand strategy into visual assets — logos, identities, advertising creatives, packaging, 3D renders and motion graphics. Nexovate's creative studio blends design thinking with marketing insight so every visual you publish builds recognition and drives action.",
    benefits: [
      { title: "Strategy-led Creative", text: "Every design rooted in audience research and brand positioning." },
      { title: "Unlimited Revisions", text: "Collaborative feedback rounds until you're 100% satisfied." },
      { title: "Full Source Files", text: "You own all rights with editable AI, PSD, Figma and print-ready files." },
      { title: "Multi-format Delivery", text: "Assets optimised for web, print, social, OOH and video." },
    ],
    tech: ["Adobe Illustrator", "Photoshop", "After Effects", "Figma", "Blender", "Cinema 4D", "InDesign", "Premiere Pro"],
    faqs: [
      { q: "What do graphic design services include?", a: "Graphic design services include logo and brand identity design, marketing collateral, social media creatives, illustrations, advertising banners, web and app visuals, packaging design, 3D visualisation and motion graphics." },
      { q: "How much does professional graphic design cost?", a: "Logo design starts around $500, complete brand identity packages range from $2,500–$10,000, and monthly creative retainers start at $1,200 depending on volume and complexity." },
      { q: "How long does a branding project take?", a: "A logo takes 1–2 weeks, while a complete brand identity with guidelines typically takes 3–6 weeks including research, concepts, revisions and final delivery." },
      { q: "Will I own the copyright of the designs?", a: "Yes. Upon final payment, full intellectual property rights and editable source files are transferred to you." },
      { q: "Do you design for both print and digital?", a: "Yes. We deliver CMYK print-ready files and RGB digital assets optimised for websites, apps, social platforms and digital ads." },
      { q: "Can you work with our existing brand guidelines?", a: "Absolutely. Our designers follow your brand book precisely or can refresh and extend it when your brand evolves." },
    ],
    subs: [
      s("brand-identity-design", "Brand & Identity Design", "brand identity design services", "Logos, color systems, typography and brand guidelines that build instant recognition.", ["Logo design", "Brand guidelines book", "Stationery & collateral", "Brand refresh"]),
      s("illustration-advertising-design", "Illustration & Advertising Design", "advertising design services", "Custom illustrations and scroll-stopping ad creatives for digital and print campaigns.", ["Custom illustrations", "Social & display ad creatives", "Brochures & flyers", "Billboards & OOH"]),
      s("web-app-design", "Web & App Design", "web and app design services", "Pixel-perfect visual design for websites, landing pages and mobile apps.", ["Landing page design", "App visual design", "Icon sets", "Design systems"]),
      s("3d-design-visualization", "3D Design & Visualization", "3D design services", "Photorealistic 3D product renders, architectural visualisation and 3D assets.", ["Product rendering", "Architectural visualisation", "3D modelling", "AR-ready assets"]),
      s("motion-graphics-animation", "Motion Graphics & Animation", "motion graphics services", "Explainer videos, animated ads and UI motion that tell your story in seconds.", ["2D/3D explainer videos", "Animated social ads", "Logo animation", "Lottie UI animations"]),
      s("packaging-design", "Packaging Design", "packaging design services", "Shelf-ready packaging and label design that sells your product at first glance.", ["Product packaging", "Label design", "Dielines & mockups", "Sustainable packaging"]),
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    icon: "Code2",
    tagline: "Tailor-made software that automates, scales and differentiates.",
    keyword: "custom software development services",
    secondary: ["software development company", "bespoke software development", "enterprise application development"],
    metaTitle: "Custom Software Development Services | Nexovate",
    metaDesc: "Custom software development services — SaaS, enterprise, CRM, ERP, MVP, APIs and QA. Agile delivery, ISO 27001 security and 850+ projects delivered.",
    intro: "Custom software development is the process of designing, building and maintaining software tailored to a specific organisation's processes, users and goals — unlike off-the-shelf tools. Nexovate delivers secure, scalable custom software using agile sprints, cloud-native architecture and rigorous QA.",
    benefits: [
      { title: "Agile Delivery", text: "2-week sprints with demos, so you see progress continuously." },
      { title: "Cloud-Native", text: "Scalable architectures on AWS, Azure and GCP with DevOps automation." },
      { title: "IP Ownership", text: "100% source code ownership and NDA-protected development." },
      { title: "Long-term Support", text: "SLA-backed maintenance, monitoring and feature evolution." },
    ],
    tech: [".NET", "Java", "Node.js", "Python", "Go", "React", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Azure"],
    faqs: [
      { q: "What is custom software development?", a: "Custom software development is building software specifically designed for an organisation's unique workflows, users and business goals, offering better fit, scalability, integration and competitive advantage than off-the-shelf products." },
      { q: "How much does custom software development cost?", a: "Custom software projects generally range from $25,000 for an MVP to $250,000+ for enterprise platforms. Cost depends on scope, integrations, compliance requirements, team size and timeline." },
      { q: "How long does it take to build custom software?", a: "An MVP typically takes 8–14 weeks, while full-scale enterprise software can take 4–12 months, delivered incrementally through agile sprints." },
      { q: "Which engagement models do you offer?", a: "We offer Fixed Price for well-defined scopes, Time & Material for evolving requirements, and Dedicated Team models for long-term product development." },
      { q: "Will I own the source code?", a: "Yes. You receive full intellectual property rights and source code ownership, protected by NDA and contractual IP assignment clauses." },
      { q: "How do you ensure software quality and security?", a: "We follow ISO 27001 security practices, code reviews, automated testing, CI/CD pipelines, OWASP standards and performance testing before every release." },
      { q: "Can you modernise our legacy software?", a: "Yes. We migrate legacy systems to modern cloud-native architectures with minimal downtime using phased re-engineering and data migration strategies." },
    ],
    subs: [
      s("saas-product-engineering", "SaaS Product Engineering", "SaaS development services", "Multi-tenant, subscription-ready SaaS platforms built for scale from day one.", ["Multi-tenant architecture", "Subscription billing (Stripe)", "Role-based access", "Usage analytics"]),
      s("enterprise-software", "Enterprise Software", "enterprise software development", "Robust enterprise applications that integrate systems and automate complex operations.", ["Workflow automation", "Legacy modernisation", "Enterprise integrations", "Business intelligence"]),
      s("crm-development", "CRM Development", "custom CRM development", "Custom CRM systems and Salesforce/HubSpot customisation for sales and support teams.", ["Lead & pipeline management", "Sales automation", "Customer portals", "CRM integrations"]),
      s("erp-development", "ERP Development", "custom ERP development", "Custom ERP software unifying finance, inventory, HR and operations in one platform.", ["Inventory & supply chain", "Finance & accounting", "HRMS & payroll", "Odoo customisation"]),
      s("mvp-development", "MVP Development", "MVP development services", "Validate ideas fast with lean MVPs launched in 8–12 weeks.", ["Product discovery workshop", "Rapid prototyping", "Lean feature prioritisation", "Investor-ready launch"]),
      s("api-development-integration", "API Development & Integration", "API development services", "Secure, documented REST & GraphQL APIs and seamless third-party integrations.", ["REST & GraphQL APIs", "Payment & ERP integrations", "API gateway & security", "OpenAPI documentation"]),
      s("qa-testing-performance-optimization", "QA, Testing & Performance Optimization", "software testing services", "Manual and automated QA, load testing and performance tuning for flawless releases.", ["Automated test suites", "Load & stress testing", "Security testing", "Performance optimisation"]),
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Designing",
    icon: "PenTool",
    tagline: "Research-driven experiences users love and businesses profit from.",
    keyword: "UI UX design services",
    secondary: ["UI/UX design agency", "user experience design company", "product design services"],
    metaTitle: "UI/UX Design Services | User Experience Agency | Nexovate",
    metaDesc: "UI/UX design services for websites and mobile apps — user research, wireframing, prototyping and design systems that boost engagement and conversions.",
    intro: "UI/UX design services focus on how a digital product looks (User Interface) and how it works and feels (User Experience). Nexovate's product designers use user research, information architecture, wireframes, interactive prototypes and usability testing to craft intuitive interfaces that increase conversions and retention.",
    benefits: [
      { title: "User Research", text: "Interviews, personas and journey maps grounded in real user data." },
      { title: "Conversion Focus", text: "UX decisions tied to measurable KPIs like sign-ups and checkout rates." },
      { title: "Accessible Design", text: "WCAG 2.2 AA compliant interfaces for every user." },
      { title: "Dev-Ready Handoff", text: "Figma design systems with tokens and specs for seamless development." },
    ],
    tech: ["Figma", "FigJam", "Adobe XD", "Maze", "Hotjar", "Framer", "Miro", "ProtoPie"],
    faqs: [
      { q: "What is the difference between UI and UX design?", a: "UX design defines how a product works — user flows, structure and usability — while UI design defines how it looks — colors, typography, buttons and visual layout. Great products need both." },
      { q: "How much do UI/UX design services cost?", a: "UI/UX design for a website typically costs $3,000–$15,000 and for a mobile app $8,000–$30,000, depending on screens, research depth and prototyping requirements." },
      { q: "What is your UI/UX design process?", a: "Our process includes discovery, user research, information architecture, wireframing, visual design, interactive prototyping, usability testing and developer handoff." },
      { q: "Which tools do your designers use?", a: "Our designers primarily use Figma for design and prototyping, along with Maze and Hotjar for usability testing and Miro for collaborative workshops." },
      { q: "Can you redesign our existing product?", a: "Yes. We conduct a UX audit to identify friction points, then redesign flows and interfaces to improve usability, conversions and brand consistency." },
      { q: "Do you design accessible interfaces?", a: "Yes. All designs follow WCAG 2.2 AA guidelines including color contrast, keyboard navigation, readable typography and screen-reader-friendly structure." },
    ],
    subs: [
      s("website-ui-ux-design", "Website UI/UX Design", "website UI UX design", "Conversion-optimised website experiences, from landing pages to complex portals.", ["UX audit & heuristics", "Information architecture", "Responsive UI design", "CRO-driven layouts"]),
      s("mobile-app-ui-ux-design", "Mobile App UI/UX Design", "mobile app UI UX design", "Intuitive iOS and Android app interfaces following Human Interface & Material guidelines.", ["iOS & Material design", "User flows & onboarding", "Micro-interactions", "App store visuals"]),
      s("wireframing-prototyping", "Wireframing & Prototyping", "wireframing and prototyping services", "Low to high-fidelity wireframes and clickable prototypes to validate ideas early.", ["Lo-fi wireframes", "Interactive prototypes", "Usability testing", "Stakeholder presentations"]),
    ],
  },
  {
    slug: "ai-ml-development",
    name: "AI/ML Development",
    icon: "Brain",
    tagline: "Production-grade AI that automates work and unlocks new revenue.",
    keyword: "AI ML development services",
    secondary: ["artificial intelligence development company", "machine learning development", "generative AI development"],
    metaTitle: "AI/ML Development Services | Generative AI Company | Nexovate",
    metaDesc: "AI & ML development services — AI agents, chatbots, NLP, LLMs, generative AI and data engineering. Responsible, secure AI solutions built for real ROI.",
    intro: "AI/ML development services involve designing, training and deploying artificial intelligence and machine learning models — from AI agents and chatbots to LLM-powered applications and predictive analytics — that automate tasks and improve decisions. Nexovate builds responsible, secure and measurable AI solutions integrated into your existing systems.",
    benefits: [
      { title: "Use-Case Discovery", text: "AI readiness assessment to identify the highest-ROI opportunities." },
      { title: "Responsible AI", text: "Bias testing, guardrails, explainability and data privacy compliance." },
      { title: "LLM Expertise", text: "OpenAI, Claude, Gemini, Llama and fine-tuned open-source models." },
      { title: "MLOps", text: "Monitoring, retraining pipelines and scalable model deployment." },
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "OpenAI", "LangChain", "LlamaIndex", "Hugging Face", "Pinecone", "AWS SageMaker", "Azure AI"],
    faqs: [
      { q: "What are AI/ML development services?", a: "AI/ML development services include building AI agents, chatbots, natural language processing systems, LLM applications, computer vision, predictive analytics and data pipelines that let businesses automate processes and make data-driven decisions." },
      { q: "How much does AI development cost?", a: "AI proof-of-concepts start around $15,000, AI chatbots and agents from $20,000–$60,000, and enterprise AI platforms $100,000+, depending on data complexity, model choice and integrations." },
      { q: "How long does it take to build an AI solution?", a: "A proof of concept takes 4–6 weeks, a production AI chatbot or agent 8–12 weeks, and custom ML platforms 3–6 months." },
      { q: "Is my data safe when building AI solutions?", a: "Yes. We use private deployments, encryption, role-based access and compliance with GDPR, HIPAA and SOC 2 practices. Your data is never used to train public models." },
      { q: "What is the difference between AI, ML and generative AI?", a: "AI is the broad field of machines performing intelligent tasks; ML is a subset where systems learn from data; generative AI is a type of ML that creates new content such as text, images and code." },
      { q: "Can AI be integrated into our existing software?", a: "Yes. We integrate AI capabilities into existing CRMs, ERPs, websites and apps through secure APIs without replacing your current systems." },
      { q: "Do you build custom LLMs or use existing models?", a: "Both. We recommend the right approach — prompt engineering, RAG, fine-tuning or custom model training — based on accuracy needs, data, cost and privacy." },
    ],
    subs: [
      s("ai-agent-development", "AI Agent Development", "AI agent development services", "Autonomous AI agents that plan, use tools and complete multi-step business tasks.", ["Multi-agent workflows", "Tool & API calling", "Memory & reasoning", "Human-in-the-loop controls"]),
      s("ai-chatbot-development", "AI Chatbot Development", "AI chatbot development services", "Smart, context-aware chatbots for support, sales and internal knowledge.", ["RAG knowledge bots", "WhatsApp & web chat", "Voice assistants", "CRM integration"]),
      s("natural-language-processing", "Natural Language Processing (NLP)", "NLP development services", "Extract meaning from text with sentiment analysis, classification and entity extraction.", ["Sentiment analysis", "Document intelligence", "Text classification", "Speech-to-text"]),
      s("llm-development", "LLM Development", "LLM development services", "Fine-tuned and RAG-powered large language model applications for your domain.", ["LLM fine-tuning", "RAG pipelines", "Prompt engineering", "LLM evaluation & guardrails"]),
      s("ai-software-development", "AI Software Development", "AI software development", "End-to-end AI-powered software products, from idea to scalable deployment.", ["AI product strategy", "Computer vision", "Predictive analytics", "MLOps"]),
      s("generative-ai-solutions", "Generative AI Solutions", "generative AI development services", "Generate text, images, code and video with secure, brand-aligned GenAI tools.", ["Content generation", "Image & video generation", "Code assistants", "Enterprise GenAI platforms"]),
      s("custom-ai-solutions", "Custom AI Solutions", "custom AI solutions", "Bespoke AI models tailored to your proprietary data and business challenges.", ["AI readiness assessment", "Custom model training", "Recommendation engines", "Fraud detection"]),
      s("data-engineering", "Data Engineering", "data engineering services", "Modern data pipelines, warehouses and lakes that power analytics and AI.", ["ETL/ELT pipelines", "Snowflake & BigQuery", "Data lakes", "Real-time streaming"]),
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    icon: "Smartphone",
    tagline: "Native and cross-platform apps users download — and keep.",
    keyword: "mobile app development services",
    secondary: ["mobile app development company", "app developers", "iOS and Android app development"],
    metaTitle: "Mobile App Development Services | iOS & Android | Nexovate",
    metaDesc: "Mobile app development services for Android, iOS, React Native & Flutter. Scalable, secure apps with 4.7★ average store ratings. Get a free estimate.",
    intro: "Mobile app development services cover strategy, UI/UX design, native or cross-platform engineering, back-end integration, testing and app store launch for iOS and Android. Nexovate has shipped 250+ mobile apps across healthcare, fintech, retail and on-demand industries.",
    benefits: [
      { title: "Native & Cross-Platform", text: "Swift, Kotlin, React Native and Flutter expertise under one roof." },
      { title: "Store Launch Support", text: "ASO, compliance checks and guaranteed App Store & Play Store submission." },
      { title: "Secure Apps", text: "OWASP MASVS standards, encryption and secure authentication." },
      { title: "Post-Launch Growth", text: "Analytics, crash monitoring and continuous feature releases." },
    ],
    tech: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "GraphQL", "Node.js", "AWS Amplify"],
    faqs: [
      { q: "How much does it cost to develop a mobile app?", a: "Simple apps cost $15,000–$40,000, mid-complexity apps $40,000–$100,000 and complex enterprise apps $100,000+, depending on features, platforms, integrations and design." },
      { q: "How long does mobile app development take?", a: "A basic app takes 2–3 months, a medium-complexity app 4–6 months and a complex app 6–9 months from discovery to store launch." },
      { q: "Should I build a native or cross-platform app?", a: "Choose native (Swift/Kotlin) for maximum performance and device-specific features; choose cross-platform (Flutter/React Native) to launch on iOS and Android faster with one codebase and lower cost." },
      { q: "Do you publish apps on the App Store and Google Play?", a: "Yes. We handle the complete submission process including store listings, screenshots, ASO, compliance reviews and release management." },
      { q: "Will my app work offline?", a: "Yes, we can build offline-first apps with local storage and background sync so users can work without internet and data syncs automatically when reconnected." },
      { q: "Do you provide app maintenance?", a: "Yes. We offer maintenance plans for OS updates, bug fixes, performance monitoring, security patches and new feature development." },
    ],
    subs: [
      s("android-app-development", "Android App Development", "Android app development services", "High-performance native Android apps in Kotlin with Jetpack Compose.", ["Kotlin & Jetpack Compose", "Wear OS & Android TV", "Play Store optimisation", "Material 3 design"]),
      s("ios-app-development", "iOS App Development", "iOS app development services", "Elegant, secure native iOS apps in Swift & SwiftUI for iPhone, iPad and Watch.", ["Swift & SwiftUI", "iPad & watchOS apps", "Apple Pay & HealthKit", "App Store compliance"]),
      s("react-native-app-development", "React Native App Development", "React Native app development", "One JavaScript codebase delivering near-native apps on iOS and Android.", ["Cross-platform UI", "Native module bridging", "Expo & OTA updates", "Web code sharing"]),
      s("flutter-app-development", "Flutter App Development", "Flutter app development services", "Beautiful, fast Flutter apps for mobile, web and desktop from a single codebase.", ["Dart & Flutter 3", "Custom animations", "Firebase integration", "Multi-platform builds"]),
      s("cross-platform-app-development", "Cross Platform App Development", "cross platform app development", "Reduce cost and time-to-market with cross-platform apps that feel native.", ["Single codebase strategy", "Kotlin Multiplatform", "Shared business logic", "Consistent UX"]),
    ],
  },
  {
    slug: "hire-dedicated-developers",
    name: "Hire Dedicated Developers",
    icon: "Users",
    tagline: "Pre-vetted experts who integrate with your team in 48 hours.",
    keyword: "hire dedicated developers",
    secondary: ["dedicated development team", "offshore developers", "staff augmentation services"],
    metaTitle: "Hire Dedicated Developers & Experts | 48-Hr Onboarding | Nexovate",
    metaDesc: "Hire dedicated developers, designers and marketing experts — React, Node, AI/ML, mobile, SEO, PPC & more. Top 3% talent, flexible models, 2-week risk-free trial.",
    intro: "Hiring dedicated developers means engaging full-time, pre-vetted professionals who work exclusively on your project under your direction, without the cost and delay of in-house recruitment. Nexovate provides top 3% engineers, designers and marketers with flexible hourly, part-time and full-time models and a risk-free trial.",
    benefits: [
      { title: "Top 3% Talent", text: "5-stage vetting: technical tests, live coding, soft-skill and culture checks." },
      { title: "48-Hour Onboarding", text: "Interview shortlisted profiles and start within 2 days." },
      { title: "Flexible Models", text: "Hourly, part-time, full-time or full dedicated teams." },
      { title: "Risk-Free Trial", text: "2-week trial with free replacement guarantee." },
    ],
    tech: ["Jira", "Slack", "GitHub", "Zoom", "Confluence", "ClickUp", "Notion", "Time Doctor"],
    faqs: [
      { q: "How do I hire dedicated developers from Nexovate?", a: "Share your requirements, receive pre-vetted profiles within 24–48 hours, interview candidates, select your developer and start with a 2-week risk-free trial." },
      { q: "How much does it cost to hire a dedicated developer?", a: "Dedicated developers start from $18–$45 per hour or $2,800–$6,500 per month full-time, depending on technology, seniority and engagement model." },
      { q: "What hiring models do you offer?", a: "We offer hourly (pay as you go), part-time (80 hours/month), full-time (160 hours/month) and dedicated team models with a project manager." },
      { q: "Will the developer work in my time zone?", a: "Yes. Our developers provide 4–8 hours of time-zone overlap with US, UK, EU and Australian clients for real-time collaboration." },
      { q: "Can I replace a developer if I'm not satisfied?", a: "Yes. We offer a free replacement guarantee at any time, with a new pre-vetted professional onboarded within 48 hours." },
      { q: "Who owns the code and work produced?", a: "You do. All intellectual property is transferred to you under a signed NDA and IP agreement." },
      { q: "How do I track my dedicated developer's work?", a: "You get daily stand-ups, Jira/ClickUp task tracking, time-tracking reports and direct communication via Slack, Teams or Zoom." },
    ],
    subs: [
      s("hire-react-js-developers", "Hire React JS Developers", "hire React JS developers", "Senior React & Next.js developers for SPAs, dashboards and SaaS frontends.", ["React 19 & Next.js", "TypeScript", "Redux / Zustand", "Testing Library"]),
      s("hire-node-js-developers", "Hire Node JS Developers", "hire Node JS developers", "Back-end Node.js engineers for APIs, microservices and real-time apps.", ["Express & NestJS", "Microservices", "GraphQL", "AWS Lambda"]),
      s("hire-angular-js-developers", "Hire Angular JS Developers", "hire Angular developers", "Enterprise Angular developers skilled in TypeScript and RxJS.", ["Angular 17+", "RxJS & NgRx", "Angular Material", "Migration experience"]),
      s("hire-vue-js-developers", "Hire Vue JS Developers", "hire Vue JS developers", "Vue.js and Nuxt specialists for fast, reactive interfaces.", ["Vue 3 & Nuxt", "Pinia", "Vite", "Composition API"]),
      s("hire-full-stack-developers", "Hire Full-Stack Developers", "hire full stack developers", "MERN, MEAN and Python full-stack engineers who own features end-to-end.", ["MERN / MEAN stack", "Python + React", "DevOps basics", "Database design"]),
      s("hire-ai-ml-developers", "Hire AI/ML Developers", "hire AI ML developers", "AI engineers experienced in LLMs, RAG, computer vision and MLOps.", ["LLMs & LangChain", "PyTorch & TensorFlow", "Computer vision", "MLOps"]),
      s("hire-mobile-app-developers", "Hire Mobile App Developers", "hire mobile app developers", "Native and cross-platform mobile developers for iOS and Android.", ["Swift & Kotlin", "Flutter & React Native", "App store releases", "Firebase"]),
      s("hire-android-developers", "Hire Android Developers", "hire Android developers", "Kotlin experts building performant Android apps with Jetpack Compose.", ["Kotlin", "Jetpack Compose", "MVVM architecture", "Play Console"]),
      s("hire-ios-developers", "Hire iOS Developers", "hire iOS developers", "Swift & SwiftUI developers for polished Apple ecosystem apps.", ["Swift & SwiftUI", "Combine", "Core Data", "TestFlight"]),
      s("hire-dedicated-seo-experts", "Hire Dedicated SEO Experts", "hire SEO experts", "Dedicated SEO specialists for technical, on-page and link-building work.", ["Technical audits", "Content optimisation", "Link building", "Rank tracking"]),
      s("hire-ppc-experts", "Hire PPC Experts", "hire PPC experts", "Certified PPC managers who lower CPA and scale profitable campaigns.", ["Google & Bing Ads", "Bid strategy", "A/B testing", "Conversion tracking"]),
      s("hire-meta-ads-experts", "Hire Meta Ads Experts", "hire Meta ads experts", "Facebook & Instagram ads specialists for lead gen and eCommerce scaling.", ["Meta Pixel & CAPI", "Advantage+ campaigns", "Creative testing", "Retargeting"]),
      s("hire-google-ads-experts", "Hire Google Ads Experts", "hire Google Ads experts", "Google Ads certified experts for Search, Shopping, PMax and YouTube.", ["Search & Shopping", "Performance Max", "YouTube Ads", "Smart bidding"]),
      s("hire-python-developers", "Hire Python Developers", "hire Python developers", "Python engineers for Django, FastAPI, automation and data work.", ["Django & FastAPI", "Pandas & NumPy", "Automation", "Celery & Redis"]),
      s("hire-wordpress-developers", "Hire WordPress Developers", "hire WordPress developers", "WordPress experts for custom themes, plugins and WooCommerce.", ["Custom themes", "Plugin development", "WooCommerce", "Speed optimisation"]),
      s("hire-shopify-developers", "Hire Shopify Developers", "hire Shopify developers", "Shopify & Shopify Plus developers for themes, apps and CRO.", ["Liquid & OS 2.0", "Shopify apps", "Hydrogen", "CRO"]),
      s("hire-social-media-managers", "Hire Social Media Managers", "hire social media managers", "Dedicated social media managers to grow your audience and engagement.", ["Content calendars", "Community management", "Reels strategy", "Analytics"]),
      s("hire-graphic-designers", "Hire Graphic Designers", "hire graphic designers", "Creative designers for branding, ads, social and print collateral.", ["Branding", "Social creatives", "Print design", "Figma & Adobe CC"]),
      s("hire-flutter-developers", "Hire Flutter Developers", "hire Flutter developers", "Flutter developers delivering beautiful cross-platform apps fast.", ["Dart", "Bloc / Riverpod", "Firebase", "Custom widgets"]),
      s("hire-aeo-experts", "Hire AEO Experts", "hire AEO experts", "Answer Engine Optimization experts to win featured snippets and voice answers.", ["FAQ & schema strategy", "Featured snippets", "Voice search", "People Also Ask"]),
      s("hire-geo-experts", "Hire GEO Experts", "hire GEO experts", "Generative Engine Optimization experts to get your brand cited in AI answers.", ["AI citation strategy", "Entity optimisation", "LLM visibility tracking", "Authority content"]),
      s("hire-google-business-profile-experts", "Hire Google Business Profile Experts", "hire Google Business Profile experts", "GBP specialists who boost local pack rankings, reviews and calls.", ["GBP optimisation", "Review management", "Local citations", "Map pack ranking"]),
    ],
  },
];

export const findCore = (slug?: string) => SERVICES.find((c) => c.slug === slug);
export const findSub = (core?: CoreService, slug?: string) => core?.subs.find((x) => x.slug === slug);
export const subPath = (core: CoreService, sub: SubService) => `/services/${core.slug}/${sub.slug}`;
export const corePath = (core: CoreService) => `/services/${core.slug}`;

// AEO-styled FAQ generator for sub-service pages (each page gets 7 unique, keyword-aware Q&As)
export function subFaqs(core: CoreService, sub: SubService): Faq[] {
  const isHire = core.slug === "hire-dedicated-developers";
  const role = sub.name.replace(/^Hire\s+/i, "");
  if (isHire) {
    return [
      { q: `Why should I ${sub.keyword} from Nexovate?`, a: `Nexovate gives you access to the top 3% of pre-vetted ${role} with proven experience in ${sub.features.slice(0, 3).join(", ")}. You get 48-hour onboarding, time-zone overlap, NDA protection and a 2-week risk-free trial.` },
      { q: `How much does it cost to hire ${role}?`, a: `${role} at Nexovate start from $18–$40 per hour, or $2,800–$6,000 per month full-time, depending on experience level (junior, mid or senior) and the engagement model you choose.` },
      { q: `How quickly can I onboard dedicated ${role}?`, a: `You receive matching profiles within 24 hours, can interview the same week, and your selected expert can start within 48 hours of approval.` },
      { q: `What skills do your ${role} have?`, a: `Our ${role} are skilled in ${sub.features.join(", ")}, along with agile workflows, clear English communication and daily reporting.` },
      { q: `What engagement models are available to ${sub.keyword}?`, a: `You can hire ${role} on an hourly, part-time (80 hrs/month), full-time (160 hrs/month) or dedicated team basis, and scale up or down with 2 weeks' notice.` },
      { q: `Can I interview the ${role} before hiring?`, a: `Yes. You personally interview and technically assess every shortlisted candidate, and you only pay once you approve the professional.` },
      { q: `Do I get a replacement if the expert isn't the right fit?`, a: `Yes. Nexovate offers a free, no-questions-asked replacement guarantee, with a new pre-vetted ${role.replace(/s$/, "")} onboarded within 48 hours.` },
    ];
  }
  return [
    { q: `What ${sub.name.endsWith("s") ? "are" : "is"} ${sub.name}?`, a: `${sub.name} is a specialised offering within ${core.name.toLowerCase()} that ${sub.desc.charAt(0).toLowerCase() + sub.desc.slice(1)} It typically includes ${sub.features.join(", ").toLowerCase()}.` },
    { q: `Why choose Nexovate for ${sub.keyword}?`, a: `Nexovate combines 12+ years of experience, 320+ in-house experts and ISO-certified processes to deliver ${sub.keyword} with transparent pricing, dedicated project managers and measurable KPIs.` },
    { q: `How much do ${sub.keyword} cost?`, a: `Pricing for ${sub.keyword} depends on scope, complexity and timeline. Most projects start from a fixed-price discovery phase, and we share a detailed, no-obligation estimate within 48 hours of understanding your requirements.` },
    { q: `How long does a ${sub.name} project take?`, a: `Smaller ${sub.name.toLowerCase()} engagements take 2–6 weeks, while larger, multi-phase projects run 2–6 months. We deliver in agile sprints so you see working results every two weeks.` },
    { q: `What is your process for ${sub.name.toLowerCase()}?`, a: `Our process follows five steps: discovery and research, strategy and planning, design and execution, testing and quality assurance, and launch with ongoing optimisation and support.` },
    { q: `Which industries do you serve with ${sub.name.toLowerCase()}?`, a: `We deliver ${sub.name.toLowerCase()} for healthcare, fintech, eCommerce, education, real estate, logistics, SaaS and startups, adapting compliance and strategy to each industry.` },
    { q: `Do you provide support after delivering ${sub.name.toLowerCase()}?`, a: `Yes. Every engagement includes a free support window, followed by optional monthly plans for maintenance, optimisation, reporting and continuous improvement.` },
  ];
}
