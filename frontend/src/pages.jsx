import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Leaf,
  MapPin,
  Sun,
  Search,
  Check,
  Clock,
  Users,
  Mail,
  MessageCircle,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Expand,
  BookOpen,
  Sprout,
} from "lucide-react";
import { usePublicData } from "./data/store.jsx";
import {
  Button,
  Photo,
  Eyebrow,
  SectionHeading,
  ProductCard,
  StoryCard,
  ProgramCard,
  Values,
  Partnership,
  PageHero,
  SampleNote,
  Empty,
  Modal,
  FAQ,
  WhatsAppButton,
  formatDate,
} from "./components.jsx";
import { RequestForm } from "./forms.jsx";
const farmChapters = [
  { image: "farm", label: "AKAR KAMI", title: "Berawal dari Baturiti.", text: "Gema Farm mempertemukan cerita kebun, hasil pangan, dan kehidupan di Baturiti, Bali. Kenali tempat dan orang-orang di baliknya.", to: "/about", link: "Cerita Gema Farm" },
  { image: "vegetable-harvest", label: "HASIL KEBUN", title: "Beragam warna, satu kebun.", text: "Dari sayuran hijau hingga hasil panen penuh warna, temukan pilihan hasil kebun dan tanyakan ketersediaannya bersama tim kami.", to: "/products", link: "Jelajahi hasil kebun" },
  { image: "experience", label: "RUANG BELAJAR", title: "Dekat dengan alam.", text: "Luangkan waktu untuk mengenal tanaman, mengamati proses tumbuh, dan membuka percakapan tentang asal makanan kita.", to: "/farm-experience", link: "Kenali pengalaman kebun" },
  { image: "radish", label: "TUMBUH BERSAMA", title: "Dari kebun ke dapur Anda.", text: "Kami membuka percakapan dengan restoran, hotel, kafe, dan usaha yang ingin mengenal hasil kebun untuk kebutuhan dapurnya.", to: "/contact?type=supply", link: "Mari bekerja sama" },
];
function FarmChapters() {
  const trackRef = useRef(null);
  const [position, setPosition] = useState({ start: true, end: false });
  useEffect(() => {
    const track = trackRef.current;
    const update = () => setPosition({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => { track.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  function slide(direction) {
    const track = trackRef.current;
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <section className="farm-chapters" aria-labelledby="farm-chapters-title">
      <div className="container section">
        <div className="farm-chapters-heading">
          <div>
            <Eyebrow>EMPAT CERITA, SATU GEMA FARM</Eyebrow>
            <h2 id="farm-chapters-title">Kenali Gema Farm<br />lebih dekat.</h2>
            <p className="section-copy mt-5">Geser untuk menemukan cerita di balik kebun kami.</p>
          </div>
          <div className="farm-chapters-controls">
            <button type="button" onClick={() => slide(-1)} disabled={position.start} aria-label="Cerita sebelumnya" aria-controls="farm-chapters-track"><ChevronLeft size={22} /></button>
            <button type="button" onClick={() => slide(1)} disabled={position.end} aria-label="Cerita berikutnya" aria-controls="farm-chapters-track"><ChevronRight size={22} /></button>
          </div>
        </div>
        <div className="farm-chapters-track" id="farm-chapters-track" ref={trackRef} tabIndex={0} role="region" aria-label="Cerita Gema Farm, geser untuk melihat kartu lainnya">
          {farmChapters.map((chapter, index) => (
            <article className="farm-chapter" key={chapter.label}>
              <div className="farm-chapter-photo">
                <Photo src={`/images/${chapter.image}.webp`} alt={chapter.title} />
                <span>0{index + 1} / 04</span>
              </div>
              <div className="farm-chapter-copy">
                <span className="farm-chapter-label">{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <Link to={chapter.to}>{chapter.link}<ChevronRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Home() {
  const { settings: s, products, articles, gallery } = usePublicData();
  return (
    <>
      <section className="home-hero">
        <Photo
          src={s.hero_image}
          alt="Hamparan sayuran hijau di kebun"
          priority
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-location">
            <MapPin size={15} /> BATURITI, BALI
          </div>
          <h1>
            {s.hero_title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                <span className={i > 0 ? "text-sage" : ""}>{line}</span>
              </React.Fragment>
            ))}
          </h1>
          <p>{s.hero_subtitle}</p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Button to="/farm-experience">Jelajahi Kebun Kami</Button>
            <Button to="/products" outline className="hero-secondary">
              Lihat Produk
            </Button>
          </div>
        </div>
        <div className="hero-bottom container">
          <span className="flex gap-2 items-center">
            <Sprout size={19} /> ROOTED IN NATURE. GROWN WITH LOVE.
          </span>
          <a href="#introduction" className="scroll-hint">
            Temukan cerita kami <span>↓</span>
          </a>
        </div>
        <div className="hero-inset">
          <Photo
            src="/images/farmer.webp"
            alt="Hasil panen dan senyum di kebun"
          />
          <div>
            <span>FROM OUR FARM</span>
            <p>
              Kebaikan yang
              <br />
              tumbuh setiap hari.
            </p>
          </div>
        </div>
      </section>
      <div className="nature-strip">
        <span>
          <Leaf />
          Hasil kebun pilihan
        </span>
        <i />
        <span>
          <Sun />
          Tumbuh di Baturiti
        </span>
        <i />
        <span>
          <Users />
          Pengalaman yang bermakna
        </span>
      </div>
      <section id="introduction" className="container section intro-grid">
        <div className="intro-photos">
          <Photo
            src="/images/farmer.webp"
            alt="Membawa sayuran segar dari kebun"
            className="intro-main"
          />
          <Photo
            src="/images/lettuce.webp"
            alt="Selada hijau dalam keranjang"
            className="intro-small"
          />
          <div className="intro-seal">
            <Sprout size={32} />
            <span>
              GOOD ROOTS.
              <br />
              GOOD FOOD.
            </span>
          </div>
        </div>
        <div>
          <Eyebrow>HELLO FROM GEMA FARM</Eyebrow>
          <h2>{s.about_title}</h2>
          <p className="section-copy mt-6">{s.about_text}</p>
          <p className="section-copy mt-4">
            Lebih dari hasil panen, kami ingin berbagi hubungan yang lebih dekat
            dengan makanan, alam, dan sesama.
          </p>
          <Button to="/about" outline className="mt-8">
            Kenali Cerita Kami
          </Button>
        </div>
      </section>
      <FarmChapters />
      <section className="bg-cream">
        <div className="container section">
          <SectionHeading
            eyebrow="FRESH PICKS"
            title="Kesegaran, langsung dari kebun."
            text="Kenali ragam hasil kebun untuk meja makan dan kebutuhan usaha Anda."
            to="/products"
            link="Semua Produk"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((x) => x.is_featured)
              .slice(0, 4)
              .map((x) => (
                <ProductCard key={x.id} item={x} />
              ))}
          </div>
          <SampleNote />
        </div>
      </section>
      <section className="container section">
        <div className="experience-feature">
          <Photo
            src="/images/experience.webp"
            alt="Suasana belajar bersama di kebun"
          />
          <div className="experience-shade" />
          <div className="experience-content">
            <Eyebrow light>FARM EXPERIENCE</Eyebrow>
            <h2>
              Langkah kecil ke kebun.
              <br />
              Pengalaman besar
              <br />
              untuk dibawa pulang.
            </h2>
            <p>
              Rasakan udara segar, kenali tanaman, dan temukan cerita di balik
              setiap hasil panen.
            </p>
            <Button to="/farm-experience" light>
              Rencanakan Kunjungan
            </Button>
          </div>
          <span className="experience-label">
            <Leaf size={16} /> LEARN. CONNECT. GROW.
          </span>
        </div>
      </section>
      <section className="container pb-24">
        <div className="text-center mb-12">
          <Eyebrow>OUR WAY OF GROWING</Eyebrow>
          <h2>Hal-hal baik dimulai dari akar.</h2>
        </div>
        <Values />
      </section>
      <section className="bg-cream">
        <div className="container section">
          <SectionHeading
            eyebrow="LITTLE MOMENTS, BIG MEANING"
            title="Sepotong kehidupan di kebun."
            to="/gallery"
            link="Jelajahi Galeri"
          />
          <div className="home-gallery">
            {gallery.slice(0, 4).map((x, i) => (
              <Link
                key={x.id}
                to="/gallery"
                className={`home-gallery-item gallery-${i}`}
              >
                <Photo src={x.image} alt={x.alt} />
                <span>{x.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="STORIES FROM THE FARM"
          title="Cerita yang terus bertumbuh."
          to="/stories"
          link="Semua Cerita"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((x) => (
            <StoryCard key={x.id} item={x} />
          ))}
        </div>
      </section>
      <Partnership />
    </>
  );
}
export function About() {
  const { settings: s } = usePublicData();
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="Dari tanah yang subur,\ntumbuh cerita yang baik."
        description="Mengenal Gema Farm dan hubungan sederhana yang menghubungkan kita dengan alam."
        image="/images/farmer.webp"
      />
      <section className="container section grid gap-14 md:grid-cols-2 items-center">
        <div>
          <Eyebrow>BERKENALAN DENGAN GEMA FARM</Eyebrow>
          <h2>{s.about_title}</h2>
          <p className="section-copy mt-6">{s.about_text}</p>
          <p className="section-copy mt-4">
            Website ini membuka pintu untuk mengenal hasil kebun, berbagi
            pertanyaan, dan merencanakan pengalaman edukasi. Kami percaya
            hubungan yang baik dimulai dari percakapan yang jujur.
          </p>
        </div>
        <Photo
          src="/images/harvest.webp"
          alt="Ragam sayuran dari kebun"
          className="rounded-3xl aspect-[1.15]"
        />
      </section>
      <section className="bg-cream">
        <div className="container section">
          <SectionHeading
            eyebrow="WHAT MATTERS TO US"
            title="Menjaga yang dekat.\nMenumbuhkan yang baik."
            text="Nilai yang menjadi arah pengalaman kami bersama alam dan sesama."
          />
          <Values />
        </div>
      </section>
      <section className="container section grid gap-14 md:grid-cols-2 items-center">
        <Photo
          src="/images/farm.webp"
          alt="Tanaman sayuran di dataran tinggi"
          className="rounded-3xl aspect-square"
        />
        <div>
          <Eyebrow>A PLACE TO CONNECT</Eyebrow>
          <h2>
            Kebun yang mengundang
            <br />
            rasa ingin tahu.
          </h2>
          <p className="section-copy mt-6">
            Ada banyak hal yang dapat dipelajari saat kita melambat dan
            mengamati. Mengenal tanaman, berbicara tentang pangan, dan melihat
            alam dari dekat.
          </p>
          <div className="mt-8 space-y-4">
            {[
              "Mengenal tanaman dan hasil kebun",
              "Membuka ruang belajar bersama",
              "Menghubungkan kebun dan kebutuhan dapur",
            ].map((x) => (
              <p key={x} className="flex gap-3 items-center">
                <Check size={20} className="text-leaf" />
                {x}
              </p>
            ))}
          </div>
          <Button className="mt-8" to="/farm-experience">
            Temukan Pengalaman Anda
          </Button>
        </div>
      </section>
      <section className="about-connect">
        <div className="container section">
          <div className="about-connect-grid">
            <div className="about-connect-photo">
              <Photo
                src="/images/vegetable-harvest.webp"
                alt="Aneka sayuran hasil panen dalam keranjang di Gema Farm"
              />
              <span><MapPin size={16} /> {s.address}</span>
            </div>
            <div className="about-connect-copy">
              <Eyebrow>DARI BATURITI, UNTUK CERITA BARU</Eyebrow>
              <h2>Mari lebih dekat<br />dengan kebun kami.</h2>
              <p className="section-copy">
                Kenali hasil panen, temukan pengalaman belajar, atau
                bicarakan kebutuhan sayuran untuk dapur Anda. Semua
                dimulai dari sebuah percakapan.
              </p>
              <div className="about-connect-options">
                <div>
                  <span className="about-connect-number">01 / KUNJUNGAN</span>
                  <h3>Luangkan waktu untuk alam.</h3>
                  <p>Rencanakan kunjungan ke {s.address}. Jadwal dan titik pertemuan dikonfirmasi bersama tim.</p>
                  <Link to="/contact" className="about-connect-link">
                    Rencanakan Pertemuan <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div>
                  <span className="about-connect-number">02 / KEMITRAAN</span>
                  <h3>Bawa kesegaran ke dapur Anda.</h3>
                  <p>Diskusikan kebutuhan hasil kebun untuk restoran, hotel, kafe, maupun usaha Anda.</p>
                  <Link to="/contact?type=supply" className="about-connect-link">
                    Diskusikan Kebutuhan Suplai <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export function Products() {
  const { products, categories } = usePublicData();
  const [search, setSearch] = useState(""),
    [debounced, setDebounced] = useState(""),
    [category, setCategory] = useState("all"),
    [limit, setLimit] = useState(8);
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setLimit(8);
    }, 250);
    return () => clearTimeout(t);
  }, [search]);
  const items = products.filter(
    (x) =>
      (category === "all" || x.category_id === category) &&
      `${x.name} ${x.description}`
        .toLowerCase()
        .includes(debounced.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="OUR FRESH PRODUCE"
        title="Dari kebun,\nuntuk kebaikan setiap hari."
        description="Temukan hasil kebun pilihan. Kesegaran untuk dapur Anda, percakapan untuk kebutuhan usaha Anda."
        image="/images/harvest.webp"
      />
      <section className="container section">
        <SectionHeading
          eyebrow="EXPLORE THE HARVEST"
          title="Pilihan dari kebun kami."
        />
        <div className="catalog-toolbar">
          <div className="filter-tabs" aria-label="Kategori produk">
            {[{ id: "all", name: "Semua Produk" }, ...categories].map((c) => (
              <button
                key={c.id}
                className={category === c.id ? "active" : ""}
                onClick={() => {
                  setCategory(c.id);
                  setLimit(8);
                }}
                aria-pressed={category === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari hasil kebun…"
              aria-label="Cari produk"
            />
          </label>
        </div>
        <div className="flex justify-between text-sm text-muted mb-7">
          <span>{items.length} produk ditemukan</span>
          <span>Harga & ketersediaan dikonfirmasi</span>
        </div>
        {items.length ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, limit).map((x) => (
              <ProductCard key={x.id} item={x} />
            ))}
          </div>
        ) : (
          <Empty>
            <Button
              outline
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            >
              Reset Pencarian
            </Button>
          </Empty>
        )}
        {items.length > limit && (
          <div className="text-center mt-10">
            <Button outline onClick={() => setLimit(limit + 8)}>
              Muat Lebih Banyak
            </Button>
          </div>
        )}
        <SampleNote />
      </section>
      <Partnership />
    </>
  );
}
export function ProductDetail() {
  const { slug } = useParams();
  const { products, categories } = usePublicData();
  const item = products.find((x) => x.slug === slug);
  if (!item) return <NotFound />;
  return (
    <>
      <div className="detail-top container">
        <Link to="/products" className="back-link">
          <ChevronLeft size={16} />
          Semua Produk
        </Link>
        <div className="product-detail">
          <Photo
            src={item.image}
            alt={item.alt || item.name}
            priority
            className="product-detail-photo"
          />
          <div>
            <Eyebrow>
              {categories.find((x) => x.id === item.category_id)?.name}
            </Eyebrow>
            <h1>{item.name}</h1>
            <p className="section-copy mt-6">{item.description}</p>
            <div className="detail-facts">
              <div>
                <span>Satuan</span>
                <strong>Per {item.unit}</strong>
              </div>
              <div>
                <span>Ketersediaan</span>
                <strong>
                  {
                    {
                      available: "Konfirmasi dengan tim",
                      seasonal: "Mengikuti musim",
                      unavailable: "Belum tersedia",
                    }[item.availability_status]
                  }
                </strong>
              </div>
            </div>
            <p className="text-muted mb-7">
              Harga, jumlah, dan jadwal suplai mengikuti kondisi panen.
              Diskusikan kebutuhan Anda bersama kami.
            </p>
            <WhatsAppButton product={item.name} />
            {item.is_sample && (
              <SampleNote>
                Pilihan produk contoh. Informasi belum merupakan penawaran
                resmi.
              </SampleNote>
            )}
            <details className="product-tip">
              <summary>Tips menyimpan hasil kebun</summary>
              <p>
                Simpan sayuran sesuai jenisnya di tempat yang bersih. Cuci
                dengan air mengalir sebelum diolah, dan tanyakan penanganan yang
                tepat saat melakukan pemesanan.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="container section">
        <SectionHeading
          eyebrow="MORE FROM THE FARM"
          title="Kenali pilihan lainnya."
          to="/products"
          link="Semua Produk"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .filter((x) => x.id !== item.id)
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.id} item={x} />
            ))}
        </div>
      </section>
      <Partnership />
    </>
  );
}
export function Experiences() {
  const { programs } = usePublicData();
  return (
    <>
      <PageHero
        eyebrow="FARM EXPERIENCE"
        title="Datang dengan rasa ingin tahu.\nPulang dengan cerita baru."
        description="Ambil jeda dari rutinitas. Temukan pengalaman belajar dan hubungan yang lebih dekat dengan alam."
        image="/images/experience.webp"
      >
        <Button
          to="#programs"
          light
          className="mt-7"
          onClick={() =>
            document
              .getElementById("programs")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Temukan Program
        </Button>
      </PageHero>
      <section id="programs" className="container section">
        <SectionHeading
          eyebrow="FIND YOUR EXPERIENCE"
          title="Ada cerita untuk setiap langkah."
          text="Untuk penjelajah kecil, pembelajar, dan siapa pun yang ingin mengenal kebun."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((x, i) => (
            <ProgramCard key={x.id} item={x} index={i} />
          ))}
        </div>
        <SampleNote>
          Program di atas merupakan contoh. Aktivitas, durasi, fasilitas, dan
          biaya perlu dikonfirmasi.
        </SampleNote>
      </section>
      <section className="bg-cream">
        <div className="container section">
          <SectionHeading
            eyebrow="A LITTLE PLAN, A MEANINGFUL DAY"
            title="Kunjungan yang dimulai\ndari percakapan."
          />
          <div className="grid md:grid-cols-3 gap-10">
            {[
              [
                BookOpen,
                "Pilih pengalaman",
                "Kenali program dan tentukan hal yang ingin Anda pelajari.",
              ],
              [
                MessageCircle,
                "Ceritakan rencana",
                "Ajukan tanggal pilihan, jumlah peserta, dan kebutuhan kelompok.",
              ],
              [
                Users,
                "Konfirmasi bersama",
                "Tim akan mendiskusikan jadwal dan detail kegiatan sebelum kunjungan.",
              ],
            ].map(([Icon, title, text]) => (
              <div key={title}>
                <Icon className="text-leaf mb-5" size={32} />
                <h3 className="text-xl">{title}</h3>
                <p className="section-copy mt-3">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container section grid md:grid-cols-2 gap-12">
        <div>
          <Eyebrow>GOOD TO KNOW</Eyebrow>
          <h2>
            Sebelum melangkah
            <br />
            ke kebun.
          </h2>
          <p className="section-copy mt-5">
            Beberapa hal untuk membantu merencanakan pengalaman Anda.
          </p>
        </div>
        <FAQ />
      </section>
      <Partnership />
    </>
  );
}
export function ProgramDetail() {
  const { slug } = useParams();
  const { programs } = usePublicData();
  const p = programs.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  return (
    <>
      <PageHero
        eyebrow="A GEMA FARM EXPERIENCE"
        title={p.title}
        description={p.description}
        image={p.image}
      />
      <section className="container section program-detail">
        <div>
          <Link to="/farm-experience" className="back-link">
            <ChevronLeft size={16} />
            Semua Pengalaman
          </Link>
          <Eyebrow>YOUR DAY AT THE FARM</Eyebrow>
          <h2>
            Belajar, mengamati,
            <br />
            dan terhubung.
          </h2>
          <p className="section-copy mt-5">{p.description}</p>
          <h3 className="text-xl mt-9 mb-5">Hal yang dapat dieksplorasi</h3>
          <ul className="space-y-4">
            {p.activities
              .split("\n")
              .filter(Boolean)
              .map((x) => (
                <li className="flex gap-3" key={x}>
                  <Check className="text-leaf shrink-0" size={20} />
                  {x}
                </li>
              ))}
          </ul>
          <div className="info-box mt-9">
            <p className="flex gap-3 items-center">
              <Clock size={20} />
              <strong>{p.duration}</strong>
            </p>
            <p className="text-muted mt-3">{p.facilities}</p>
          </div>
          <Photo
            src="/images/lettuce.webp"
            alt="Selada di kebun"
            className="rounded-2xl w-full h-64 mt-9"
          />
          <h3 className="text-xl mt-9 mb-5">Pertanyaan umum</h3>
          <FAQ />
          {p.is_sample && (
            <SampleNote>
              Program contoh untuk pratinjau. Jadwal dan rincian kegiatan belum
              ditetapkan.
            </SampleNote>
          )}
        </div>
        <div>
          <RequestForm program={p} />
        </div>
      </section>
    </>
  );
}
export function Gallery() {
  const { gallery } = usePublicData();
  const [filter, setFilter] = useState("Semua"),
    [selected, setSelected] = useState(null);
  const items = gallery.filter(
    (x) => filter === "Semua" || x.category === filter,
  );
  const current = items.findIndex((x) => x.id === selected?.id);
  function change(n) {
    setSelected(items[(current + n + items.length) % items.length]);
  }
  useEffect(() => {
    if (!selected) return;
    const key = (e) => {
      if (e.key === "ArrowLeft") change(-1);
      if (e.key === "ArrowRight") change(1);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [selected, items]);
  return (
    <>
      <PageHero
        eyebrow="LIFE AT THE FARM"
        title="Cerita yang tertangkap,\nkenangan yang tumbuh."
        description="Sepotong suasana kebun, warna hasil panen, dan momen kedekatan dengan alam."
      />
      <section className="container section">
        <div className="filter-tabs justify-center mb-12">
          {["Semua", ...new Set(gallery.map((x) => x.category))].map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={filter === x ? "active" : ""}
              aria-pressed={filter === x}
            >
              {x}
            </button>
          ))}
        </div>
        {items.length ? (
          <div className="gallery-grid">
            {items.map((x, i) => (
              <button
                className={`gallery-tile ${i % 5 === 0 ? "tall" : ""}`}
                key={x.id}
                onClick={() => setSelected(x)}
                aria-label={`Perbesar ${x.title}`}
              >
                <Photo src={x.image} alt={x.alt} />
                <div>
                  <span>{x.category}</span>
                  <h3>{x.title}</h3>
                </div>
                <Expand className="expand-icon" size={22} />
              </button>
            ))}
          </div>
        ) : (
          <Empty />
        )}
        <SampleNote>
          Foto menggunakan aset yang disediakan untuk desain. Caption dan izin
          publikasi perlu diverifikasi pengelola.
        </SampleNote>
      </section>
      {selected && (
        <Modal onClose={() => setSelected(null)} label={selected.title}>
          <div className="lightbox">
            <Photo src={selected.image} alt={selected.alt} priority />
            <div className="lightbox-caption">
              <div>
                <h3>{selected.title}</h3>
                <p>
                  {selected.category} · {current + 1} / {items.length}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => change(-1)} aria-label="Foto sebelumnya">
                  <ChevronLeft />
                </button>
                <button onClick={() => change(1)} aria-label="Foto berikutnya">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Partnership />
    </>
  );
}
export function Stories() {
  const { articles } = usePublicData();
  const [filter, setFilter] = useState("Semua"),
    [search, setSearch] = useState("");
  const items = articles.filter(
    (x) =>
      (filter === "Semua" || x.category === filter) &&
      `${x.title} ${x.excerpt}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="JOURNAL FROM THE FARM"
        title="Cerita kecil.\nSudut pandang baru."
        description="Tentang hasil kebun, pembelajaran, dan hal-hal sederhana yang membuat kita lebih dekat dengan alam."
        image="/images/lettuce.webp"
      />
      <section className="container section">
        <div className="catalog-toolbar mb-10">
          <div className="filter-tabs">
            {["Semua", ...new Set(articles.map((x) => x.category))].map((x) => (
              <button
                className={filter === x ? "active" : ""}
                key={x}
                onClick={() => setFilter(x)}
                aria-pressed={filter === x}
              >
                {x}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={19} />
            <input
              placeholder="Cari cerita…"
              aria-label="Cari cerita"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        {items.length ? (
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((x) => (
              <StoryCard key={x.id} item={x} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
        <SampleNote>
          Artikel awal merupakan konten contoh, bukan dokumentasi aktivitas yang
          telah diverifikasi.
        </SampleNote>
      </section>
      <Partnership />
    </>
  );
}
export function StoryDetail() {
  const { slug } = useParams();
  const { articles } = usePublicData();
  const a = articles.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  return (
    <>
      <article className="story-detail container">
        <Link to="/stories" className="back-link">
          <ChevronLeft size={16} />
          Semua Cerita
        </Link>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>{a.category}</Eyebrow>
          <h1>{a.title}</h1>
          <p className="mt-6 text-muted">
            {formatDate(a.published_at)} <span className="mx-3">·</span>Gema
            Farm Journal
          </p>
        </div>
        <Photo src={a.image} alt={a.title} className="story-cover" priority />
        <div className="article-body">
          {a.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {a.is_sample && (
            <SampleNote>Artikel contoh untuk pratinjau website.</SampleNote>
          )}
          <div className="mt-10 pt-8 border-t border-forest/15">
            <Button to="/farm-experience" outline>
              Temukan Pengalaman di Kebun
            </Button>
          </div>
        </div>
      </article>
      <section className="container section">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title="Cerita lainnya dari kebun."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {articles
            .filter((x) => x.id !== a.id)
            .slice(0, 3)
            .map((x) => (
              <StoryCard item={x} key={x.id} />
            ))}
        </div>
      </section>
    </>
  );
}
export function Contact() {
  const { settings: s } = usePublicData();
  return (
    <>
      <PageHero
        eyebrow="LET'S CONNECT"
        title="Hal baik dimulai\ndari sebuah percakapan."
        description="Tertarik dengan hasil kebun, kunjungan, atau peluang kerja sama? Kami senang mengenal Anda."
        image="/images/harvest.webp"
      />
      <section className="container section contact-grid">
        <div>
          <Eyebrow>WE'D LOVE TO HEAR FROM YOU</Eyebrow>
          <h2>
            Mari tumbuh
            <br />
            bersama.
          </h2>
          <p className="section-copy mt-5">
            Untuk kebutuhan pribadi, dapur usaha, maupun pengalaman belajar,
            ceritakan rencana Anda kepada kami.
          </p>
          <div className="contact-details">
            <div>
              <MapPin />
              <div>
                <h3>Temukan kami</h3>
                <p>{s.address}</p>
                <small>Alamat lengkap dikonfirmasi saat kunjungan.</small>
              </div>
            </div>
            <div>
              <MessageCircle />
              <div>
                <h3>WhatsApp</h3>
                {s.whatsapp ? (
                  <a
                    href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Halo Gema Farm, saya ingin bertanya.")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    +{s.whatsapp}
                  </a>
                ) : (
                  <p>Kontak resmi akan tersedia segera.</p>
                )}
              </div>
            </div>
            <div>
              <Mail />
              <div>
                <h3>Email</h3>
                {s.email ? (
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                ) : (
                  <p>Gunakan formulir untuk mencoba alur inquiry.</p>
                )}
              </div>
            </div>
            {s.instagram && (
              <div>
                <Instagram />
                <div>
                  <h3>Ikuti cerita kami</h3>
                  <a href={s.instagram} target="_blank" rel="noreferrer">
                    Instagram Gema Farm
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="location-card">
            <Photo
              src="/images/farm.webp"
              alt="Suasana kebun di dataran tinggi"
            />
            <div>
              <MapPin size={24} />
              <h3>Baturiti, Bali</h3>
              {s.maps_url ? (
                <a
                  href={s.maps_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-light mt-4"
                >
                  Buka Google Maps
                </a>
              ) : (
                <p>Titik lokasi akan dilengkapi oleh pengelola.</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <RequestForm />
        </div>
      </section>
    </>
  );
}
export function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="YOUR PRIVACY MATTERS"
        title="Kebijakan Privasi"
        description="Informasi yang jelas tentang data yang Anda bagikan."
      />
      <section className="container section">
        <div className="article-body">
          <h2>Privasi pada versi demo</h2>
          <p>
            Website ini adalah prototipe frontend. Formulir tidak mengirimkan
            data ke server atau kepada pengelola Gema Farm. Seluruh data yang
            dimasukkan hanya disimpan di localStorage pada browser dan perangkat
            yang Anda gunakan.
          </p>
          <h3>Data yang disimpan</h3>
          <p>
            Form menyimpan nama, institusi atau perusahaan, email, nomor
            telepon, kebutuhan, pesan, serta tanggal dan jumlah peserta untuk
            permintaan kunjungan. Persetujuan dan waktu pengisian juga dicatat.
          </p>
          <h3>Akses dan masa penyimpanan</h3>
          <p>
            Data demo dapat dilihat melalui CMS demo pada browser yang sama.
            Jangan memasukkan informasi sensitif. Data bertahan sampai Anda
            menghapus data situs melalui pengaturan browser atau mereset data
            demo pada halaman pengaturan CMS.
          </p>
          <h3>Menghapus data</h3>
          <p>
            Hapus inquiry atau permintaan kunjungan melalui CMS demo, atau
            gunakan tombol reset data demo untuk mengembalikan seluruh data ke
            kondisi awal. Menghapus data browser juga akan menghapus semua data
            lokal.
          </p>
          <h3>Tautan pihak ketiga</h3>
          <p>
            Jika kontak resmi telah diisi, tautan WhatsApp, email, Instagram,
            atau Maps dapat membuka layanan pihak ketiga. Kebijakan privasi
            layanan tersebut berlaku saat Anda menggunakannya.
          </p>
          <h3>Sebelum website dipublikasikan</h3>
          <p>
            Pengelola perlu menetapkan kontak privasi, dasar pemrosesan, masa
            retensi, dan mekanisme permintaan penghapusan data sebelum
            mengaktifkan pengumpulan data melalui backend.
          </p>
          <Button to="/contact" outline>
            Ke Halaman Kontak
          </Button>
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <div className="container not-found">
      <Eyebrow>A LITTLE OFF THE PATH</Eyebrow>
      <span className="text-8xl text-sage font-semibold">404</span>
      <h1>Jalurnya belum ditemukan.</h1>
      <p className="section-copy">
        Halaman mungkin telah dipindahkan atau kontennya belum diterbitkan.
      </p>
      <Button to="/">Kembali ke Beranda</Button>
    </div>
  );
}
