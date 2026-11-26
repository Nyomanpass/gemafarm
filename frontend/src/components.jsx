import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sprout,
  Menu,
  X,
  MapPin,
  Instagram,
  Mail,
  Leaf,
  Check,
  ChevronDown,
  MessageCircle,
  Sun,
  Heart,
  Users,
} from "lucide-react";
import { usePublicData } from "./data/store.jsx";
export function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? "text-white" : "text-forest"}`}
      aria-label="Gema Farm beranda"
    >
      <img
        src={light ? "/images/logo_putih.png" : "/images/logo.png"}
        alt="Gema Farm"
        width="1254"
        height="1254"
        className="brand-logo-image"
      />
    </Link>
  );
}
export function Button({
  to,
  children,
  outline = false,
  light = false,
  className = "",
  ...props
}) {
  const cls = `btn ${outline ? "btn-outline" : light ? "btn-light" : "btn-primary"} ${className}`;
  return to ? (
    <Link className={cls} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  ...props
}) {
  return (
    <img
      src={src || "/images/farm.webp"}
      alt={alt || "Suasana kebun"}
      className={`photo ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith("/images/farm.webp"))
          e.currentTarget.src = "/images/farm.webp";
      }}
      {...props}
    />
  );
}
export function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? "text-sage" : "text-leaf"}`}>
      <span />
      {children}
    </p>
  );
}
const links = [
  ["/", "Beranda"],
  ["/about", "Tentang Kami"],
  ["/products", "Produk"],
  ["/farm-experience", "Farm Experience"],
  ["/gallery", "Galeri"],
  ["/stories", "Cerita"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const light = !scrolled && ["/", "/about", "/products", "/farm-experience", "/gallery", "/stories", "/contact"].includes(pathname);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className={`nav-wrap nav-redesign ${scrolled ? "nav-scrolled" : ""} ${light ? "nav-light" : ""} ${open ? "nav-open" : ""}`}
    >
      <nav className="navbar" aria-label="Navigasi utama">
        <div className="nav-brand">
          <Logo light={light} />
          <div className="nav-brand-note" aria-hidden="true">
            <span>Rooted in nature.</span>
            <small>BATURITI, BALI</small>
          </div>
        </div>
        <div className="desktop-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </div>
        <Button to="/contact" className="nav-contact">
          <MessageCircle size={17} strokeWidth={1.6} />
          Mari Terhubung
        </Button>
        <button
          ref={toggleRef}
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span>{open ? "Tutup" : "Menu"}</span>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label="Navigasi mobile"
        >
          <p className="mobile-nav-label">JELAJAHI GEMA FARM</p>
          <div className="mobile-nav-links">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
                <Leaf size={16} aria-hidden="true" />
              </NavLink>
            ))}
          </div>
          <div className="mobile-nav-footer">
            <p>
              Dari kebun,
              <br />
              untuk cerita yang baik.
            </p>
            <Button to="/contact">
              <MessageCircle size={17} />
              Hubungi Kami
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  const { settings: s } = usePublicData();
  return (
    <footer className="footer">
      <div className="container grid gap-12 md:grid-cols-[1.7fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-white/65">
            Tumbuh bersama alam.
            <br />
            Berbagi kebaikan dari kebun.
          </p>
          <div className="mt-6 flex gap-3">
            {s.instagram && (
              <a
                className="social"
                href={s.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Gema Farm"
              >
                <Instagram size={18} />
              </a>
            )}
            {s.email && (
              <a
                className="social"
                href={`mailto:${s.email}`}
                aria-label="Email Gema Farm"
              >
                <Mail size={18} />
              </a>
            )}
            <Link
              className="social"
              to="/contact"
              aria-label="Hubungi Gema Farm"
            >
              <MessageCircle size={18} />
            </Link>
          </div>
        </div>
        <div>
          <h3>Jelajahi</h3>
          {links.slice(1, 4).map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Kenali Lebih Dekat</h3>
          <Link to="/gallery">Galeri Kebun</Link>
          <Link to="/stories">Cerita dari Kebun</Link>
          <Link to="/contact">Kemitraan</Link>
        </div>
        <div>
          <h3>Temukan Kami</h3>
          <p className="flex items-start gap-2 text-white/65">
            <MapPin size={20} className="shrink-0 mt-1" />
            {s.address}
          </p>
          <p className="mt-4 text-sm text-white/50">
            Kunjungan melalui permintaan dan konfirmasi tim.
          </p>
          {s.maps_url && (
            <a href={s.maps_url} target="_blank" rel="noreferrer">
              Lihat di Google Maps
            </a>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Gema Farm. Growing with nature.
        </span>
        <div className="flex gap-6">
          <Link to="/privacy-policy">Kebijakan Privasi</Link>
          <Link to="/admin/login">Admin Demo</Link>
        </div>
      </div>
    </footer>
  );
}
export function Partnership() {
  return (
    <section className="container section">
      <div className="partnership">
        <div className="relative z-10">
          <Eyebrow light>LET'S GROW TOGETHER</Eyebrow>
          <h2>
            Kebaikan dari kebun,
            <br />
            untuk usaha Anda.
          </h2>
          <p>
            Untuk restoran, hotel, kafe, dan setiap dapur yang menghargai
            kesegaran.
          </p>
        </div>
        <Button
          to="/contact?type=supply"
          light
          className="relative z-10 shrink-0"
        >
          Diskusikan Kebutuhan Suplai
        </Button>
        <Sprout className="partnership-art" />
      </div>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/farm.webp",
  children,
}) {
  return (
    <section className="page-hero">
      <Photo src={image} alt={title} priority />
      <div className="hero-shade" />
      <div className="container relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1>{title.replace(/\\n/g, "\n")}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  to,
  link = "Lihat Selengkapnya",
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title.replace(/\\n/g, "\n")}</h2>
        {text && <p className="section-copy">{text}</p>}
      </div>
      {to && (
        <Button to={to} outline>
          {link}
        </Button>
      )}
    </div>
  );
}
export function ProductCard({ item }) {
  const { categories } = usePublicData();
  return (
    <Link to={`/products/${item.slug}`} className="product-card group">
      <div className="product-image">
        <Photo src={item.image} alt={item.alt || item.name} />
        <span className="product-status">
          {item.availability_status === "seasonal"
            ? "Musiman"
            : item.availability_status === "unavailable"
              ? "Belum tersedia"
              : "Pilihan kebun"}
        </span>
        <span className="product-peek">Lihat detail</span>
      </div>
      <div className="flex justify-between items-start gap-4 pt-5">
        <div>
          <p className="card-meta">
            {categories.find((x) => x.id === item.category_id)?.name}
          </p>
          <h3 className="mt-1 text-xl">{item.name}</h3>
        </div>
        <span className="product-unit">/{item.unit}</span>
      </div>
    </Link>
  );
}
export function StoryCard({ item }) {
  return (
    <Link to={`/stories/${item.slug}`} className="story-card group">
      <div className="overflow-hidden rounded-2xl">
        <Photo src={item.image} alt={item.title} className="aspect-[1.5]" />
      </div>
      <div className="card-meta mt-5 flex items-center gap-3">
        <span className="text-leaf">{item.category}</span>
        <span>·</span>
        <time>{formatDate(item.published_at)}</time>
      </div>
      <h3 className="mt-3 text-xl leading-snug">{item.title}</h3>
      <p className="mt-3 text-muted leading-relaxed">{item.excerpt}</p>
      <span className="inline-block mt-5 text-sm font-semibold border-b border-leaf pb-1">
        Baca Cerita
      </span>
    </Link>
  );
}
export function ProgramCard({ item, index = 0 }) {
  return (
    <Link to={`/farm-experience/${item.slug}`} className="program-card">
      <Photo src={item.image} alt={item.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/10 to-transparent" />
      <div className="absolute inset-x-7 bottom-7 text-white">
        <p className="text-xs tracking-widest uppercase text-sage mb-3">
          {["JELAJAHI", "PELAJARI", "TERHUBUNG"][index % 3]}
        </p>
        <h3 className="text-2xl">{item.title}</h3>
        <p className="text-white/80 mt-3 leading-relaxed">{item.description}</p>
        <span className="inline-block mt-5 text-sm border-b border-white/50 pb-1">
          Kenali Program
        </span>
      </div>
    </Link>
  );
}
export function Values() {
  return (
    <div className="values-grid">
      {[
        [
          Leaf,
          "Dekat dengan alam",
          "Mengenal sumber pangan dan menghargai proses tumbuhnya.",
        ],
        [
          Heart,
          "Dirawat dengan hati",
          "Perhatian pada setiap langkah, dari kebun hingga hasil panen.",
        ],
        [
          Users,
          "Tumbuh bersama",
          "Membuka percakapan dan ruang belajar untuk semua.",
        ],
        [
          Sun,
          "Kebaikan sehari-hari",
          "Membawa hasil kebun lebih dekat dengan kehidupan Anda.",
        ],
      ].map(([Icon, title, text]) => (
        <div key={title}>
          <Icon size={30} strokeWidth={1.4} />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
export function SampleNote({
  children = "Pilihan produk, program, dan cerita di website ini merupakan contoh untuk pratinjau. Detail akan dikonfirmasi oleh pengelola.",
}) {
  const { settings } = usePublicData();
  return settings.sample_content ? (
    <p className="sample-note">
      <Leaf size={15} className="shrink-0" />
      {children}
    </p>
  ) : null;
}
export function Empty({
  title = "Belum ada yang ditemukan",
  text = "Coba kata kunci atau kategori lainnya.",
  children,
}) {
  return (
    <div className="empty">
      <Sprout size={44} />
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
export function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
export function Modal({ children, onClose, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const prev = document.activeElement;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      prev?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Tutup dialog"
      >
        <X />
      </button>
      {children}
    </dialog>
  );
}
export function FAQ() {
  return (
    <div className="faq">
      {[
        [
          "Apakah kunjungan langsung terkonfirmasi?",
          "Belum. Formulir merupakan permintaan kunjungan. Tim akan menghubungi Anda untuk mendiskusikan jadwal, kegiatan, dan ketersediaan.",
        ],
        [
          "Siapa saja yang dapat mengajukan kunjungan?",
          "Individu, keluarga, sekolah, universitas, dan komunitas dapat mendiskusikan kebutuhan kunjungan bersama tim.",
        ],
        [
          "Apa yang perlu disiapkan?",
          "Sampaikan jumlah peserta, tujuan belajar, dan kebutuhan khusus. Perlengkapan, fasilitas, durasi, dan biaya akan dikonfirmasi sebelum kunjungan.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function WhatsAppButton({ product }) {
  const { settings: s } = usePublicData();
  const text = `Halo Gema Farm, saya ingin menanyakan ${product ? `ketersediaan dan suplai ${product}` : "informasi produk dan kunjungan"}.`;
  return s.whatsapp ? (
    <a
      className="btn btn-primary"
      href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={18} />
      Tanyakan via WhatsApp
    </a>
  ) : (
    <Button
      to={`/contact${product ? `?product=${encodeURIComponent(product)}` : ""}`}
    >
      <MessageCircle size={18} />
      Tanyakan Ketersediaan
    </Button>
  );
}
