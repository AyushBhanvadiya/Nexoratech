import Seo from "../components/Seo";
import { Btn } from "../components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-24 text-center">
      <Seo title="Page Not Found | Nexovate" description="The page you're looking for doesn't exist." path="/404" />
      <div>
        <div className="text-9xl font-black grad-text">404</div>
        <h1 className="mt-4 text-3xl font-bold">This page drifted into orbit</h1>
        <p className="mt-3 text-muted">The page you requested doesn't exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3"><Btn to="/">Back Home</Btn><Btn to="/services" variant="ghost">Our Services</Btn></div>
      </div>
    </section>
  );
}
