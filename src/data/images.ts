// Stock photography (Pexels, free commercial licence). All blog / case-study images are cropped to exact 16:9 (1200×675).
export const px = (id: number, w = 1200, h = 675) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export interface Img { src: string; alt: string }
const img = (id: number, alt: string): Img => ({ src: px(id), alt });

export const BLOG_IMG: Record<string, Img> = {
  "what-is-generative-engine-optimization-geo": img(8386369, "Robotic hand reaching toward the sky, representing AI search and generative engine optimization"),
  "custom-software-development-cost-guide": img(6804068, "Team of software developers working at computers in a modern office"),
  "flutter-vs-react-native": img(969462, "Hand holding a smartphone showing mobile app icons"),
  "how-to-build-an-ai-chatbot-for-business": img(16380906, "Smartphone displaying an AI chatbot interface"),
  "technical-seo-checklist": img(12969403, "Laptop displaying a website analytics and SEO dashboard"),
  "ui-ux-design-process": img(15543118, "Whiteboard covered in sticky notes during a UX design workshop"),
};

export const CASE_IMG: Record<string, Img> = {
  "fintech-lending-platform": img(8938729, "Woman using a smartphone and credit card for a digital banking payment"),
  "ecommerce-seo-growth": img(6956903, "Laptop surrounded by shopping bags and boxes representing eCommerce growth"),
  "healthcare-ai-chatbot": img(5452300, "Doctor holding a tablet using digital healthcare technology"),
  "edtech-mobile-app": img(5965545, "Student using a tablet for online learning on campus"),
  "logistics-erp": img(4483860, "Workers organising shelves of boxes inside a large warehouse"),
  "proptech-brand-ux": img(37224965, "Modern apartment building against a clear blue sky"),
};

export const fallbackImg: Img = { src: px(6804068), alt: "Nexoratech technology team" };
