# Gema Farm — Frontend Demo

Website React JSX + Vite + Tailwind CSS untuk Gema Farm, mengikuti PRD dan arahan terakhir: **frontend saja, data JSON, tanpa backend**.

## Menjalankan

Memerlukan Node.js 22.12+ (dibangun dengan Node 24).

```bash
npm install
npm run dev
```

Buka http://127.0.0.1:5173. CMS demo: http://127.0.0.1:5173/admin/login. Klik **Masuk ke CMS Demo**, tanpa akun/kata sandi. Ini bukan autentikasi produksi.

```bash
npm run build       # build + prerender 19 halaman publik dari JSON
npm run preview     # periksa hasil build
npm test            # uji data, rute, form, dan perubahan CMS
npm run format      # format source
```

## Halaman

- Beranda: hero, pengantar, produk unggulan, farm experience, nilai, galeri, cerita, CTA kemitraan, footer.
- Tentang Kami.
- Produk: pencarian debounce, filter kategori, load more, detail, dan produk terkait.
- Farm Experience: daftar program, detail, FAQ, dan form permintaan kunjungan.
- Galeri: filter kategori, lightbox, navigasi keyboard.
- Cerita: filter, pencarian, detail artikel.
- Kontak: form inquiry, lokasi, dan kontak yang dapat diatur.
- Kebijakan Privasi, halaman 404.
- CMS demo: dashboard, CRUD produk/kategori/galeri/artikel/program, permintaan kunjungan, inquiry, dan pengaturan.

## Data dan penyimpanan

Data awal: `frontend/src/data/content.json`. Tidak ada API atau database. Saat pertama dibuka, website memakai JSON ini. Perubahan CMS dan form disimpan di `localStorage` dengan key `gema-farm-demo-v1`. Perubahan juga disinkronkan ke tab lain pada origin yang sama. Data tidak dikirim ke pengelola dan tidak tersinkron antarperangkat.

- Pengaturan CMS → **Ekspor JSON** mengunduh seluruh data lokal. File ekspor berisi data form bila ada; perlakukan sebagai data pribadi.
- Agar perubahan menjadi data awal build berikutnya, ganti isi `frontend/src/data/content.json` dengan JSON ekspor yang sudah diperiksa. Kosongkan `inquiries` dan `visit_requests` sebelum dibagikan atau dipublikasikan.
- **Reset Data Demo** mengembalikan JSON awal dan menghapus perubahan/inquiry/kunjungan lokal.
- Upload menerima JPG/PNG/WebP, maksimal 2 MB dan 6000 px. Gambar diperkecil ke maksimum 1400 px lalu disimpan sebagai data URL. Kapasitas localStorage terbatas; aplikasi menampilkan error bila penuh.
- Artikel memakai teks paragraf biasa, tidak menjalankan HTML pengguna.
- Form menandai sukses hanya setelah localStorage berhasil. Tanggal kunjungan adalah preferensi, bukan booking otomatis.

## Konten resmi

Foto berasal dari folder `img` yang disediakan. Salinan WebP teroptimasi berada di `frontend/public/images`; sumber asli tidak diubah. `node scripts/prepare-images.js` membuat ulang salinan.

Produk, program, artikel, dan caption awal ditandai sebagai contoh. Nama anggota tim, sertifikasi, klaim organik/regenerative, dan dokumentasi Meiji tidak direkayasa. Nomor WhatsApp, email, Instagram, dan lokasi Maps sengaja kosong sampai pengelola memasukkan kontak resmi. CTA produk mengarah ke form kontak selama WhatsApp belum diisi.

## Build statis dan SEO

Build merender HTML nyata untuk halaman publik dari JSON sehingga konten awal tersedia tanpa menunggu JavaScript. CMS tetap client-side. Perubahan localStorage hanya berlaku di browser dan tidak mengubah HTML hasil build. Slug baru dari CMS demo dapat dibuka setelah JavaScript aktif; lakukan build ulang setelah memasukkan data ke JSON untuk prerender rute baru.

Untuk canonical dan sitemap gunakan domain nyata:

```bash
SITE_URL=https://domain-anda.example npm run build
```

`dist/` dapat dipasang di hosting statis dengan fallback `/index.html` untuk rute CMS dan rute demo baru. Contoh Nginx:

```nginx
location / { try_files $uri $uri/ /index.html; }
```

Tidak ada deployment atau backend pada tahap ini. Font Inter dan Plus Jakarta Sans dimuat dari Google Fonts dengan fallback sans-serif bila offline.

## Struktur

- `frontend/src/pages.jsx`: halaman publik.
- `frontend/src/components.jsx`: komponen reusable, layout, card, modal.
- `frontend/src/forms.jsx`: form dan validasi frontend.
- `frontend/src/admin.jsx`: CMS demo.
- `frontend/src/data/store.jsx`: state dan penyimpanan lokal.
- `frontend/src/styles.css`: token Tailwind, gaya komponen, dan responsive layout.
- `scripts/prerender.js`: HTML statis dan sitemap.

## Batas tahap frontend

Belum ada autentikasi nyata, pengiriman pesan/email, sinkronisasi server, database, stok real-time, atau backend upload. UI dan alur demo dapat digunakan untuk review sebelum integrasi backend. Pengujian visual browser otomatis belum dilakukan karena akses Chrome tidak diizinkan pada sesi pengerjaan.
