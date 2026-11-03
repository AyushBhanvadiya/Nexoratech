import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CoreService from "./pages/CoreService";
import SubService from "./pages/SubService";
import { About, Contact, HtmlSitemap, Legal, ServicesIndex } from "./pages/Pages";
import { BlogIndex, BlogPost, CaseDetail, CaseIndex } from "./pages/Content";
import SitePlan from "./pages/SitePlan";
import EyebrowStyles from "./pages/EyebrowStyles";
import NotFound from "./pages/NotFound";
import PagePreviews from "./pages/PagePreviews";
import { IS_PREVIEW } from "./preview";
import { CmsProvider, PageTextOverrides, useCms } from "./cms";
import Admin from "./pages/Admin";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// NOTE: HashRouter is used because this preview ships as a single static file.
// For production SEO, switch to BrowserRouter + SSR/prerendering so every clean URL in sitemap.xml serves full HTML.
function Website() {
  const { revision } = useCms();
  return (
    <HashRouter>
      <ScrollTop />
      <PageTextOverrides />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<>
          <Header />
          <main className={IS_PREVIEW ? "" : "min-h-screen"}>
          <Routes key={revision}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:core" element={<CoreService />} />
          <Route path="/services/:core/:sub" element={<SubService />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseIndex />} />
          <Route path="/case-studies/:slug" element={<CaseDetail />} />
          <Route path="/privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="/terms-of-service" element={<Legal kind="terms" />} />
          <Route path="/sitemap" element={<HtmlSitemap />} />
          <Route path="/site-plan" element={<SitePlan />} />
          <Route path="/eyebrow-styles" element={<EyebrowStyles />} />
          <Route path="/page-previews" element={<PagePreviews />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
          <Footer />
        </>} />
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return <CmsProvider><Website /></CmsProvider>;
}
