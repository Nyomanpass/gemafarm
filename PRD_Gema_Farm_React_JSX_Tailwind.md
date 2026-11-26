# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# GEMA FARM — Official Website & Farm Experience

**Versi:** 1.0  
**Tanggal:** 23 November 2026  
**Status:** Draft untuk validasi stakeholder  
**Jenis:** Company Profile, Katalog Produk, Farm Education, CMS  
**Frontend:** React.js (JSX), Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**Bahasa awal:** Indonesia (struktur siap bilingual)

---

## 1. Ringkasan Eksekutif

Gema Farm merupakan kegiatan/usaha pertanian di kawasan Baturiti, Bali, yang menampilkan hasil sayuran dan buah segar, aktivitas budidaya, pendekatan regenerative farming, dan kunjungan edukasi. Dokumentasi yang disampaikan menunjukkan adanya kunjungan mahasiswa pertukaran pelajar dari Meiji University, Jepang. Website bertujuan memperkenalkan identitas Gema Farm, menampilkan produk, menerima permintaan suplai, dan memfasilitasi permintaan kunjungan edukasi.

Website **bukan marketplace penuh**: pada versi pertama tidak ada keranjang belanja, payment gateway, perhitungan ongkir, atau sistem stok real-time. Konversi diarahkan ke WhatsApp dan formulir inquiry. Kunjungan menggunakan mekanisme **request, bukan booking otomatis**.

### 1.1 Tujuan bisnis
1. Memperkuat kredibilitas dan identitas visual Gema Farm.
2. Mempermudah calon pelanggan B2B/B2C menemukan produk dan menghubungi tim.
3. Menampilkan program dan dokumentasi edukasi pertanian.
4. Memudahkan admin mengelola konten tanpa mengedit source code.
5. Meningkatkan discoverability lewat SEO lokal dan konten berkualitas.

### 1.2 Audiens
- Hotel, villa, restoran, kafe, retailer, dan calon mitra suplai.
- Individu yang mencari informasi produk segar.
- Sekolah, universitas, komunitas, dan peserta farm visit.
- Wisatawan domestik/internasional.

### 1.3 Indikator keberhasilan
- Seluruh halaman publik responsif dan dapat diakses.
- Admin mampu menerbitkan/memperbarui produk, galeri, dan artikel.
- Inquiry supplier dan permintaan kunjungan tercatat dan dapat diproses.
- CTA WhatsApp berjalan dengan pesan terisi otomatis.
- Target Core Web Vitals: LCP ≤ 2,5 detik, INP ≤ 200 ms, CLS ≤ 0,1 pada p75 pengguna yang memenuhi syarat pengukuran.
- Pengukuran conversion event: klik WhatsApp, submit inquiry, submit visit request.

---

## 2. Referensi Visual dan Brand

Arah desain mengikuti gambar referensi ketiga: **hero fotografi kebun berskala besar, navbar putih floating/pill, overlay hijau gelap, heading besar, CTA hijau, grid foto editorial, whitespace luas, dan sudut rounded**. Foto Instagram Gema Farm pada gambar pertama dan kedua menjadi referensi materi konten, bukan aset otomatis yang boleh digunakan tanpa izin.

### 2.1 Palet warna
| Token | Hex | Pemakaian |
|---|---|---|
| `forest` | `#173D2A` | Hero overlay, footer, heading gelap |
| `leaf` | `#4C9A3D` | Primary CTA, link aktif |
| `sage` | `#A8C98A` | Aksen, badge |
| `cream` | `#F6F7F1` | Background section terang |
| `charcoal` | `#202820` | Body text |
| `white` | `#FFFFFF` | Card dan navbar |

### 2.2 Tipografi dan komponen
- Heading: **Plus Jakarta Sans** atau **Manrope**.
- Body: **Inter**.
- Container: maksimum 1280 px, padding mobile 20 px dan desktop 32 px.
- Navbar floating rounded-full dengan logo, menu, dan CTA `Contact Us`.
- Tombol rounded-full, hover halus, focus-visible jelas.
- Card gambar border radius 20–24 px, overlay gradient untuk keterbacaan.
- Motion: fade/slide ringan; patuhi `prefers-reduced-motion`.
- Kontras teks memenuhi WCAG AA; jangan mengandalkan warna saja untuk status.

### 2.3 Tone konten
Hangat, profesional, natural, edukatif, tidak membuat klaim yang belum diverifikasi. Gunakan foto asli kebun, hasil panen, kegiatan, dan tim. Klaim **“tanpa pengawet”**, **“organik”**, sertifikasi, dan metode regenerative farming hanya ditampilkan bila telah dikonfirmasi oleh pengelola.

---

## 3. Ruang Lingkup dan Prioritas

### 3.1 MVP (wajib)
- Homepage dinamis.
- About Gema Farm.
- Katalog produk dengan kategori, pencarian, detail, dan CTA WhatsApp.
- Farm Experience: daftar program, detail, dan form permintaan kunjungan.
- Gallery & Stories (galeri dan artikel).
- Contact & Partnership inquiry.
- CMS admin: login, dashboard, CRUD produk/kategori, galeri, artikel, program, pengelolaan request, pengaturan website.
- SEO teknis dasar, responsive design, keamanan form, deployment.

### 3.2 Fase lanjutan (opsional)
- Bahasa Inggris dengan konten terjemahan dan hreflang.
- Dashboard analitik internal, kalender slot kunjungan, multi-role admin.
- Portal mitra B2B, daftar harga khusus, integrasi stok dan pemesanan.

### 3.3 Di luar scope MVP
Checkout, payment gateway, tracking pengiriman, integrasi POS/ERP, marketplace multi-vendor, manajemen operasional lahan, sistem inventory real-time.

---

## 4. Sitemap dan Rute

| Rute publik | Halaman | Fungsi |
|---|---|---|
| `/` | Home | Landing utama dan CTA |
| `/about` | About Us | Cerita, nilai, lokasi, kegiatan |
| `/products` | Our Products | Filter, pencarian, daftar produk |
| `/products/:slug` | Product Detail | Foto, deskripsi, satuan, ketersediaan |
| `/farm-experience` | Farm Experience | Daftar program dan pengantar |
| `/farm-experience/:slug` | Program Detail | Deskripsi dan form request |
| `/gallery` | Gallery | Grid media dan kategori |
| `/stories` | Stories | Daftar artikel |
| `/stories/:slug` | Story Detail | Konten artikel dan SEO |
| `/contact` | Contact | Kontak, peta, form inquiry |
| `/privacy-policy` | Privacy Policy | Informasi pemrosesan data form |
| `/admin/login` | Admin Login | Autentikasi |
| `/admin` | Dashboard | Ringkasan data |
| `/admin/products` | Products CMS | CRUD produk |
| `/admin/categories` | Categories CMS | CRUD kategori |
| `/admin/gallery` | Gallery CMS | Kelola media |
| `/admin/stories` | Stories CMS | CRUD artikel |
| `/admin/programs` | Programs CMS | CRUD program |
| `/admin/visit-requests` | Visit Requests | Proses permintaan kunjungan |
| `/admin/inquiries` | Inquiries | Proses permintaan mitra |
| `/admin/settings` | Settings | Kontak, banner, logo, SEO |

---

## 5. Detail UI/UX Per Halaman

### 5.1 Homepage
1. **Floating Navbar:** logo Gema Farm, Home, About, Products, Farm Experience, Gallery/Stories, Contact, tombol `Explore Farm` atau `Contact Us`. Mobile hamburger dengan drawer.
2. **Hero:** foto/video asli kebun, overlay forest transparan, headline “Fresh from Nature, Grown with Care”, subheadline tentang Gema Farm di Baturiti, dua CTA `Explore Our Farm` dan `View Our Products`. Jika video digunakan, sediakan poster image dan fallback mobile.
3. **Introduction:** dua kolom (foto kebun + teks singkat) dengan CTA About.
4. **Featured Products:** 4–6 kartu produk yang ditandai `is_featured`, tombol `View All Products`.
5. **Farm Experience:** foto kegiatan edukasi, ringkasan program, CTA `Plan a Visit`.
6. **Our Farming Approach:** 3–4 nilai/praktik budidaya yang telah dikonfirmasi, ikon minimal.
7. **Gallery Highlights:** grid asimetris/masonry terkontrol berisi foto asli.
8. **Stories Preview:** tiga artikel terbaru.
9. **Partnership CTA:** banner forest green dengan tombol `Request Supply`.
10. **Location & Footer:** alamat terverifikasi, tautan Maps, email, Instagram, WhatsApp, navigasi, privacy policy.

**Kriteria:** hero readable pada 360 px; navbar tidak menutupi CTA; semua foto memiliki alt; CTA dapat diklik dan mengarah ke tujuan benar.

### 5.2 About
- Hero foto + heading.
- Our Story, Mission & Values, Farming Approach, Farm Location, Team (opsional), dokumentasi milestone.
- CTA ke katalog dan kunjungan.
- Semua data sejarah/luas lahan/sertifikasi berasal dari admin dan harus diverifikasi.

### 5.3 Products
- Header dan deskripsi.
- Filter kategori, search debounce, empty state, pagination/load more.
- Product card: foto, nama, kategori, satuan opsional, status ketersediaan, CTA detail.
- Detail: galeri foto, deskripsi, satuan, status, produk terkait, CTA WhatsApp dengan pesan otomatis berisi nama produk.
- **Tidak wajib menampilkan harga**; harga dan stok dapat berubah dan dikonfirmasi langsung.

### 5.4 Farm Experience
- Intro program dan manfaat kunjungan.
- Kartu program yang diaktifkan admin.
- Detail program: tujuan, aktivitas, durasi jika tersedia, fasilitas jika dikonfirmasi, galeri, FAQ, form permintaan.
- Cerita kunjungan mahasiswa Meiji University dapat dimuat sebagai dokumentasi dengan persetujuan dan caption faktual.
- Form: nama, institusi, email, nomor WhatsApp, program, tanggal pilihan, jumlah peserta, pesan, persetujuan kebijakan privasi.
- Tanggal adalah **preferensi**, bukan konfirmasi otomatis. Admin memverifikasi ketersediaan.

### 5.5 Gallery & Stories
- Galeri filter kategori dan lightbox; video thumbnail tidak autoplay dengan suara.
- Artikel: cover, judul, excerpt, tanggal, kategori, slug, body rich text ter-sanitasi, metadata SEO.
- Related stories dan empty state.

### 5.6 Contact
- Informasi alamat, WhatsApp, email, Instagram, Google Maps embed/link.
- Form partnership: nama, perusahaan/institusi, email, nomor telepon, tipe kebutuhan, pesan, consent.
- Validasi input, pesan sukses/gagal, anti-spam.

---

## 6. Alur Pengguna

### 6.1 Inquiry supplier
`Home/Products → Filter/Search → Product Detail → Request Supply → WhatsApp (prefilled message)`

Alternatif: `Contact → Isi form partnership → Validasi → Simpan inquiry (new) → Notifikasi sukses → Admin follow-up`.

### 6.2 Permintaan kunjungan
`Home → Farm Experience → Program Detail → Form Request → Validasi → Simpan pending → Admin hubungi pemohon → Confirmed / Rejected → Completed`.

Status request: `pending`, `contacted`, `confirmed`, `completed`, `cancelled`, `rejected`. Semua transisi dilakukan admin, dengan timestamp perubahan.

### 6.3 Pengelolaan konten
`Admin Login → Dashboard → Pilih Modul → Create/Edit → Validasi → Simpan → Publish/Unpublish → Perubahan tampil di website`.

---

## 7. Admin CMS: Kebutuhan Fungsional

| ID | Modul | Kebutuhan | Prioritas |
|---|---|---|---|
| ADM-01 | Auth | Login, logout, proteksi route, hash password | P0 |
| ADM-02 | Dashboard | Ringkasan produk, artikel, inquiry, visit requests | P0 |
| ADM-03 | Products | CRUD, kategori, foto, featured, status | P0 |
| ADM-04 | Categories | CRUD kategori, slug unik | P0 |
| ADM-05 | Gallery | Upload media, kategori, urutan, alt | P0 |
| ADM-06 | Stories | Draft/publish, rich text aman, SEO fields | P0 |
| ADM-07 | Programs | CRUD program dan status aktif | P0 |
| ADM-08 | Visit Requests | List, detail, filter, update status, catatan | P0 |
| ADM-09 | Inquiries | List, detail, filter, update status, catatan | P0 |
| ADM-10 | Settings | Logo, kontak, alamat, social, hero, SEO default | P0 |
| ADM-11 | Analytics | Ringkasan kunjungan/conversion | P1 |
| ADM-12 | Multi-role | Admin/editor | P2 |

P0 = MVP, P1 = peningkatan, P2 = lanjutan.

### 7.1 Dashboard UI
Sidebar desktop dan drawer mobile. Topbar dengan breadcrumb dan tombol logout. Cards: total produk aktif, inquiry baru, request kunjungan pending, artikel terbit. Tabel 5 inquiry dan 5 permintaan kunjungan terbaru. Tidak perlu grafik rumit pada MVP.

### 7.2 Validasi CMS
- Judul/nama wajib, slug unik, status eksplisit.
- Upload hanya MIME gambar yang diizinkan; batas ukuran dan dimensi dikonfigurasi.
- Preview sebelum publish; hapus file lama hanya jika tidak dipakai entitas lain.
- Konfirmasi untuk tindakan delete; pagination dan pencarian pada list.

---

## 8. Arsitektur Teknis

### 8.1 Stack final
- **Frontend:** React.js dengan **JSX** (bukan TSX), Vite, React Router DOM, Tailwind CSS, Axios atau Fetch API, React Hook Form + Zod (opsional), Lucide React, Framer Motion untuk animasi ringan.
- **Backend:** Node.js LTS, Express.js, Sequelize ORM (atau query layer konsisten), MySQL 8.
- **Auth:** session cookie HTTP-only, Secure, SameSite, CSRF protection sesuai arsitektur; login rate limit.
- **Media:** file storage persisten/object storage; metadata disimpan di MySQL.
- **Deployment:** Docker/Coolify atau VPS dengan Nginx dan HTTPS.
- **SEO:** Karena Vite SPA tidak otomatis SSR, gunakan **prerender/SSG untuk halaman publik yang SEO-critical** atau rendering server-side terpisah; jangan mengandalkan client-only rendering untuk artikel/produk. Admin tetap SPA.

### 8.2 Struktur folder yang disarankan
```text
gema-farm/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer, PageContainer
│   │   │   ├── ui/              # Button, Input, Modal, Badge
│   │   │   ├── products/        # ProductCard, ProductFilters
│   │   │   ├── experiences/     # ProgramCard, VisitForm
│   │   │   └── sections/        # Hero, FeaturedProducts, GalleryGrid
│   │   ├── pages/
│   │   │   ├── public/          # Home, About, Products, etc.
│   │   │   └── admin/           # Login, Dashboard, CRUD pages
│   │   ├── layouts/            # PublicLayout, AdminLayout
│   │   ├── routes/             # AppRouter, ProtectedRoute
│   │   ├── hooks/
│   │   ├── services/           # api.js, productService.js, etc.
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── migrations/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── uploads/              # mount persisten bila local storage
│   └── package.json
├── docs/
├── docker-compose.yml
├── .env.example
└── README.md
```

### 8.3 Tailwind theme
Gunakan CSS variables atau konfigurasi Tailwind yang konsisten:
```css
@import "tailwindcss";
@theme {
  --color-forest: #173D2A;
  --color-leaf: #4C9A3D;
  --color-sage: #A8C98A;
  --color-cream: #F6F7F1;
  --color-charcoal: #202820;
}
```

Contoh komponen JSX:
```jsx
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-forest text-white">
      <img
        src="/images/gema-farm-hero.webp"
        alt="Area pertanian Gema Farm"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-sage">Gema Farm · Baturiti, Bali</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Fresh from Nature, Grown with Care.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          Explore fresh produce and meaningful farm experiences.
        </p>
        <a href="/products" className="mt-8 inline-flex rounded-full bg-leaf px-7 py-3 font-semibold text-white hover:brightness-110">
          Explore Our Products
        </a>
      </div>
    </section>
  );
}
```

> Catatan: file foto `/images/gema-farm-hero.webp` adalah placeholder path. Gunakan foto resmi Gema Farm setelah mendapat izin.

---

## 9. Database MySQL — Rancangan Entitas

Seluruh tabel memiliki primary key `id`, `created_at`, `updated_at` kecuali tabel yang secara sengaja memakai key-value.

| Tabel | Kolom inti | Relasi/catatan |
|---|---|---|
| `users` | name, email UNIQUE, password_hash, role, is_active | Admin |
| `product_categories` | name, slug UNIQUE, sort_order, is_active | 1:N products |
| `products` | category_id FK, name, slug UNIQUE, description, unit, availability_status, is_featured, is_active | 1:N images |
| `product_images` | product_id FK, image_url, alt_text, sort_order | Media produk |
| `articles` | title, slug UNIQUE, excerpt, content, cover_image, status, published_at, meta_title, meta_description | Blog |
| `gallery_items` | title, category, media_type, media_url, alt_text, sort_order, is_active | Foto/video |
| `visit_programs` | title, slug UNIQUE, description, cover_image, is_active | 1:N requests |
| `visit_requests` | program_id FK, name, institution, email, phone, preferred_date, participants, message, status, admin_notes, consent_at | Form kunjungan |
| `inquiries` | name, company, email, phone, inquiry_type, message, status, admin_notes, consent_at | Form partnership |
| `site_settings` | setting_key UNIQUE, setting_value | Kontak, logo, hero, SEO |
| `homepage_sections` | section_key UNIQUE, title, subtitle, image_url, is_active, sort_order | CMS homepage |

**Index penting:** `products(category_id, is_active)`, `products(slug)`, `articles(slug, status)`, `visit_requests(status, created_at)`, `inquiries(status, created_at)`.

**Enum aplikasi:** availability = `available | seasonal | unavailable`; article status = `draft | published`; inquiry status = `new | contacted | closed`; visit status = `pending | contacted | confirmed | completed | cancelled | rejected`.

**Prinsip privasi:** simpan data personal seperlunya, batasi akses admin, tentukan masa retensi, dan sediakan kebijakan privasi yang jelas.

---

## 10. REST API Contract (v1)

Prefix: `/api/v1`; JSON response standar: `{ "success": true, "data": ..., "message": "..." }`. Pagination: `page`, `limit`, `total`, `totalPages`. Error response menyertakan `message` dan `errors` yang aman.

### 10.1 Public endpoints
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/site-settings/public` | Kontak dan pengaturan publik |
| GET | `/homepage` | Section homepage |
| GET | `/categories` | Kategori aktif |
| GET | `/products?search=&category=&page=&limit=` | Katalog |
| GET | `/products/:slug` | Detail produk |
| GET | `/programs` | Program aktif |
| GET | `/programs/:slug` | Detail program |
| POST | `/visit-requests` | Kirim permintaan kunjungan |
| POST | `/inquiries` | Kirim inquiry supplier/umum |
| GET | `/gallery?category=&page=` | Galeri |
| GET | `/articles?page=&limit=` | Artikel terbit |
| GET | `/articles/:slug` | Detail artikel |

### 10.2 Protected admin endpoints
| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Sesi admin |
| GET | `/admin/dashboard` | Ringkasan |
| GET/POST | `/admin/products` | List/create produk |
| GET/PUT/DELETE | `/admin/products/:id` | Detail/edit/delete |
| GET/POST | `/admin/categories` | List/create kategori |
| PUT/DELETE | `/admin/categories/:id` | Edit/delete kategori |
| GET/POST | `/admin/gallery` | List/create media |
| PUT/DELETE | `/admin/gallery/:id` | Edit/delete media |
| GET/POST | `/admin/articles` | List/create artikel |
| PUT/DELETE | `/admin/articles/:id` | Edit/delete artikel |
| GET/POST | `/admin/programs` | List/create program |
| PUT/DELETE | `/admin/programs/:id` | Edit/delete program |
| GET | `/admin/visit-requests` | List request |
| GET/PATCH | `/admin/visit-requests/:id` | Detail/update status/catatan |
| GET | `/admin/inquiries` | List inquiry |
| GET/PATCH | `/admin/inquiries/:id` | Detail/update status/catatan |
| GET/PUT | `/admin/settings` | Pengaturan website |
| POST | `/admin/uploads` | Upload media tervalidasi |

Semua endpoint admin wajib middleware autentikasi dan otorisasi. Batasi upload dan ukuran payload. POST public menggunakan rate limiting, honeypot/CAPTCHA adaptif bila perlu, dan validasi server-side.

### 10.3 Contoh payload visit request
```json
{
  "program_id": 1,
  "name": "Nama Pengunjung",
  "institution": "Universitas / Komunitas",
  "email": "visitor@example.com",
  "phone": "+6281234567890",
  "preferred_date": "2026-12-10",
  "participants": 20,
  "message": "Ingin belajar tentang budidaya sayuran",
  "privacy_consent": true
}
```

Validasi: tanggal tidak di masa lalu (berdasarkan zona waktu Bali), peserta bilangan positif dengan batas wajar, email valid, phone dinormalisasi, consent wajib, sanitasi pesan.

---

## 11. SEO dan Aksesibilitas

- Unique `<title>`, meta description, canonical untuk tiap halaman.
- Sitemap XML berisi URL publik terindeks, robots.txt, Open Graph/Twitter cards.
- JSON-LD `Organization`/`LocalBusiness` sesuai data yang valid; `Article` untuk stories; `Product` hanya dengan atribut yang tersedia dan akurat.
- Prerender/SSR halaman detail produk dan artikel agar crawler mendapat HTML konten.
- URL slug stabil; redirect 301 saat slug berubah.
- Alt text foto, heading hierarchy H1/H2, keyboard navigation, focus indicator, label form, error yang diumumkan aksesibel.
- Jika bilingual aktif: rute `/id/...` dan `/en/...`, terjemahan asli, `hreflang` dan language switcher.

---

## 12. Keamanan, Reliabilitas, dan Operasional

- HTTPS, secure cookies, hash password Argon2/bcrypt, login rate limiting, CSRF protection.
- CORS allowlist bila frontend/backend berbeda origin.
- ORM parameterized queries, input validation, XSS sanitization pada rich text.
- Upload whitelist MIME, batas ukuran, nama file acak, cegah executable uploads.
- Logging tanpa membocorkan data sensitif, backup database terjadwal dan uji restore.
- Secret di environment variables, bukan di repository.
- Media disimpan persisten (Docker volume/object storage), bukan hanya layer container.
- Monitoring uptime, health endpoint, graceful error page, fallback gambar.

---

## 13. Work Breakdown Structure (WBS)

| ID | Aktivitas | Deliverable | Estimasi |
|---|---|---|---|
| 1 | Discovery & verifikasi data Gema Farm | Daftar konten, scope final | 2–3 hari |
| 2 | Wireframe & visual design | Desain desktop/mobile | 4–5 hari |
| 3 | Setup repo, React JSX, Tailwind, routing | Skeleton aplikasi | 1–2 hari |
| 4 | Frontend halaman publik | 6 halaman utama + detail | 5–6 hari |
| 5 | MySQL schema & Express API | Database dan REST API | 3–4 hari |
| 6 | CMS admin | Dashboard dan CRUD | 4–5 hari |
| 7 | Integrasi forms, upload, WhatsApp | Alur konversi aktif | 2–3 hari |
| 8 | SEO, QA, keamanan, responsive | Checklist UAT | 2–3 hari |
| 9 | Deployment dan handover | Website live + panduan admin | 1–2 hari |

**Estimasi total:** sekitar **24–33 hari kerja** secara berurutan; beberapa pekerjaan dapat berjalan paralel. Estimasi bergantung pada ketersediaan foto, copywriting, revisi, dan jumlah konten.

---

## 14. Acceptance Criteria / Definition of Done

### Website publik
- [ ] Semua rute publik dapat dibuka dan memiliki loading/error/empty state.
- [ ] Layout bekerja di 360 px, tablet, dan desktop tanpa horizontal overflow.
- [ ] Navbar mobile, tombol CTA, dan footer berfungsi.
- [ ] Produk bisa dicari/difilter, detail produk tampil benar.
- [ ] WhatsApp CTA membentuk pesan dengan nama produk yang tepat.
- [ ] Form inquiry dan kunjungan divalidasi frontend/backend dan tersimpan.
- [ ] Pengunjung melihat pesan sukses tanpa menerima konfirmasi booking palsu.
- [ ] Galeri, artikel, dan program hanya menampilkan konten aktif/terbit.
- [ ] SEO metadata dan sitemap tersedia; halaman penting dapat dirender untuk crawler.

### Admin
- [ ] Admin login/logout aman; rute admin tidak bisa diakses anonim.
- [ ] Admin CRUD produk, kategori, galeri, artikel, program.
- [ ] Admin mengubah hero, kontak, dan sosial media dari settings.
- [ ] Admin melihat dan memproses inquiry serta visit request.
- [ ] Upload file dibatasi dan tervalidasi.
- [ ] Penghapusan data membutuhkan konfirmasi.

### Deployment
- [ ] HTTPS aktif dan environment production terkonfigurasi.
- [ ] Backup DB dan storage persisten tersedia.
- [ ] Tidak ada secret di frontend atau git.
- [ ] Error log dan monitoring dasar aktif.
- [ ] Panduan penggunaan CMS diserahkan ke pengelola.

---

## 15. Risiko dan Keputusan yang Harus Dikonfirmasi

| Topik | Status | Tindakan |
|---|---|---|
| Logo resmi dan brand guideline | Belum dikonfirmasi | Minta file resolusi tinggi |
| Foto/video asli kebun | Belum tersedia sebagai aset produksi | Minta izin dan file asli |
| Daftar produk, satuan, status musiman | Belum lengkap | Validasi dengan pengelola |
| Klaim “tanpa pengawet”, organik, regenerative | Perlu verifikasi | Jangan publikasikan klaim spesifik tanpa dasar |
| Program, durasi, fasilitas, biaya kunjungan | Belum dikonfirmasi | Tetapkan sebelum publikasi |
| Dokumentasi Meiji University | Disebutkan pengguna | Verifikasi caption dan izin foto |
| Alamat lengkap, kontak, tautan Maps | Perlu verifikasi | Isi settings resmi |
| Domain dan hosting | Belum dipilih | Putuskan saat deployment |
| Bahasa Inggris | P1 | Siapkan arsitektur, aktifkan setelah konten siap |

---

## 16. Arahan Implementasi untuk Developer / Coding Agent

1. Bangun proyek menggunakan **React.js dengan file `.jsx` dan Tailwind CSS**, bukan TypeScript/TSX.
2. Gunakan komponen reusable; pisahkan layout publik dan admin.
3. Buat responsive UI dengan kualitas visual mendekati referensi website pertanian premium: floating navbar, photographic hero, dark forest overlay, editorial grid, card rounded, CTA leaf green.
4. Hindari dummy data yang menyamar sebagai fakta Gema Farm; data awal diberi label contoh atau dimasukkan setelah verifikasi.
5. Bangun API Express modular, MySQL migration/seed, validasi server-side, dan protected admin routes.
6. Semua konten utama harus dikelola melalui CMS; jangan hardcode daftar produk di JSX production.
7. Implementasikan form inquiry dan visit request end-to-end dengan status admin.
8. Pastikan SEO publik memakai prerender/SSR strategy yang nyata; Vite SPA saja tidak dianggap cukup.
9. Siapkan `.env.example`, README setup, perintah migrasi, deployment, dan test checklist.
10. Jangan menambah fitur checkout, pembayaran, atau ERP di luar MVP tanpa persetujuan.

**Hasil akhir yang diharapkan:** website Gema Farm yang modern, cepat, mobile-friendly, mudah diperbarui, dan efektif untuk memperkenalkan produk segar serta pengalaman edukasi pertanian.
