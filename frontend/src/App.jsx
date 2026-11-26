import React, { useEffect } from "react";
import { Routes, Route, useLocation, Outlet, Link } from "react-router-dom";
import { Navbar, Footer } from "./components.jsx";
import {
  Home,
  About,
  Products,
  ProductDetail,
  Experiences,
  ProgramDetail,
  Gallery,
  Stories,
  StoryDetail,
  Contact,
  Privacy,
  NotFound,
} from "./pages.jsx";
import { Admin, AdminLogin } from "./admin.jsx";
import { usePublicData } from "./data/store.jsx";
function NavigationEffects() {
  const { pathname, hash } = useLocation();
  const data = usePublicData();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
    const names = {
      "/": "Dari alam, dengan sepenuh hati",
      "/about": "Tentang Kami",
      "/products": "Produk Kebun",
      "/farm-experience": "Farm Experience",
      "/gallery": "Galeri",
      "/stories": "Cerita dari Kebun",
      "/contact": "Hubungi Kami",
      "/privacy-policy": "Kebijakan Privasi",
    };
    const slug = pathname.split("/").pop();
    const detail = [...data.products, ...data.programs, ...data.articles].find(
      (x) => x.slug === slug,
    );
    document.title = `${detail?.name || detail?.title || names[pathname] || (pathname.startsWith("/admin") ? "CMS Demo" : "Halaman tidak ditemukan")} | Gema Farm`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        detail?.meta_description ||
          detail?.description ||
          data.settings.seo_description,
      );
  }, [pathname, hash, data.settings.seo_description]);
  return null;
}
function PublicLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke konten
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <>
      <NavigationEffects />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="farm-experience" element={<Experiences />} />
          <Route path="farm-experience/:slug" element={<ProgramDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="stories" element={<Stories />} />
          <Route path="stories/:slug" element={<StoryDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}
