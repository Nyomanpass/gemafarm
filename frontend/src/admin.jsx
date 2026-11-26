import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Carrot,
  Tags,
  Images,
  BookOpen,
  Leaf,
  CalendarDays,
  Inbox,
  Settings,
  LogOut,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Menu,
  Download,
  Eye,
  Upload,
  ExternalLink,
} from "lucide-react";
import { useData } from "./data/store.jsx";
import {
  Logo,
  Button,
  Modal,
  Photo,
  Empty,
  formatDate,
} from "./components.jsx";
import { Field } from "./forms.jsx";
const modules = [
  ["", "Dashboard", LayoutDashboard],
  ["products", "Produk", Carrot],
  ["categories", "Kategori", Tags],
  ["gallery", "Galeri", Images],
  ["stories", "Artikel", BookOpen],
  ["programs", "Program", Leaf],
  ["visit-requests", "Kunjungan", CalendarDays],
  ["inquiries", "Inquiry", Inbox],
  ["settings", "Pengaturan", Settings],
];
const typeMap = { stories: "articles", "visit-requests": "visit_requests" };
const statusLabels = {
  pending: "Menunggu",
  contacted: "Dihubungi",
  confirmed: "Dikonfirmasi",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  rejected: "Ditolak",
  new: "Baru",
  closed: "Ditutup",
  published: "Terbit",
  draft: "Draft",
};
export function AdminLogin() {
  const navigate = useNavigate();
  function enter() {
    sessionStorage.setItem("gema-demo-access", "yes");
    navigate("/admin");
  }
  return (
    <main className="admin-login">
      <div className="login-picture">
        <Photo src="/images/farm.webp" alt="Kebun Gema Farm" />
        <div>
          <Logo light />
          <h1>
            Ruang untuk
            <br />
            menumbuhkan
            <br />
            cerita.
          </h1>
          <p>Gema Farm · Baturiti, Bali</p>
        </div>
      </div>
      <div className="login-content">
        <Logo />
        <span className="demo-badge mt-10">FRONTEND DEMO</span>
        <h2 className="mt-5">
          Selamat datang
          <br />
          di ruang pengelola.
        </h2>
        <p className="text-muted mt-5">
          Kelola konten, jelajahi dashboard, dan coba alur permintaan kunjungan.
        </p>
        <div className="info-box my-8">
          CMS ini adalah demo lokal tanpa autentikasi backend. Tidak memerlukan
          akun atau kata sandi. Perubahan hanya tersimpan di browser ini.
        </div>
        <Button onClick={enter} className="w-full">
          Masuk ke CMS Demo
        </Button>
        <Link to="/" className="back-link justify-center mt-7">
          Kembali ke Website
        </Link>
      </div>
    </main>
  );
}
export function Admin() {
  const [authorized, setAuthorized] = useState(null),
    [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, storageError } = useData();
  useEffect(() => {
    setAuthorized(sessionStorage.getItem("gema-demo-access") === "yes");
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  if (authorized === null)
    return <main className="p-10">Membuka CMS demo…</main>;
  if (!authorized) return <Navigate to="/admin/login" replace />;
  const route = pathname.split("/")[2] || "";
  const module = modules.find((x) => x[0] === route);
  if (!module) return <Navigate to="/admin" replace />;
  const type = typeMap[route] || route;
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <Logo />
        <div className="sidebar-label">WORKSPACE</div>
        <nav aria-label="Navigasi admin">
          {modules.map(([path, label, Icon]) => (
            <NavLink key={path} to={`/admin${path ? `/${path}` : ""}`} end>
              <Icon size={19} />
              {label}
              {path === "inquiries" &&
                data.inquiries.filter((x) => x.status === "new").length > 0 && (
                  <span className="nav-count">
                    {data.inquiries.filter((x) => x.status === "new").length}
                  </span>
                )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link to="/" target="_blank">
            <ExternalLink size={18} />
            Lihat Website
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("gema-demo-access");
              navigate("/admin/login");
            }}
          >
            <LogOut size={18} />
            Keluar Demo
          </button>
        </div>
      </aside>
      {open && (
        <button
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Tutup menu admin"
        />
      )}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="flex gap-3 items-center">
            <button
              className="admin-menu"
              aria-label="Buka menu admin"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
            <span className="text-muted">
              Workspace <span className="mx-3">/</span>
              <strong className="text-forest">{module[1]}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="demo-badge">DEMO LOKAL</span>
            <span className="admin-avatar">GF</span>
          </div>
        </header>
        <div className="admin-content">
          {storageError && (
            <p role="alert" className="error-message mb-5">
              {storageError}
            </p>
          )}
          {!route ? (
            <Dashboard />
          ) : route === "settings" ? (
            <SettingsPage />
          ) : ["inquiries", "visit-requests"].includes(route) ? (
            <Requests key={type} type={type} title={module[1]} />
          ) : (
            <ContentManager key={type} type={type} title={module[1]} />
          )}
        </div>
      </div>
    </div>
  );
}
function Dashboard() {
  const { data } = useData();
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">GEMA FARM WORKSPACE</p>
          <h1>Selamat datang, Pengelola.</h1>
          <p>Mari lihat apa yang bertumbuh di kebun digital Anda.</p>
        </div>
        <Link to="/" className="btn btn-outline" target="_blank">
          <Eye size={17} />
          Lihat Website
        </Link>
      </div>
      <div className="dashboard-stats">
        {[
          [
            Carrot,
            data.products.filter((x) => x.is_active).length,
            "Produk aktif",
            "products",
          ],
          [
            Inbox,
            data.inquiries.filter((x) => x.status === "new").length,
            "Inquiry baru",
            "inquiries",
          ],
          [
            CalendarDays,
            data.visit_requests.filter((x) => x.status === "pending").length,
            "Kunjungan menunggu",
            "visit-requests",
          ],
          [
            BookOpen,
            data.articles.filter((x) => x.status === "published").length,
            "Artikel terbit",
            "stories",
          ],
        ].map(([Icon, n, label, path]) => (
          <Link to={`/admin/${path}`} key={path}>
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <strong>{n}</strong>
            <p>{label}</p>
          </Link>
        ))}
      </div>
      <div className="dashboard-banner">
        <Leaf size={42} />
        <div>
          <h2>Kebun yang baik dimulai dari perhatian kecil.</h2>
          <p>
            Lengkapi kontak resmi dan ganti konten contoh sebelum website
            digunakan.
          </p>
        </div>
        <Link className="btn btn-light" to="/admin/settings">
          Atur Website
        </Link>
      </div>
      <div className="grid xl:grid-cols-2 gap-6">
        {[
          ["inquiries", "Inquiry terbaru"],
          ["visit_requests", "Permintaan kunjungan"],
        ].map(([type, title]) => (
          <section className="admin-panel" key={type}>
            <div className="flex justify-between items-center mb-5">
              <h2>{title}</h2>
              <Link
                className="text-sm text-leaf font-semibold"
                to={`/admin/${type.replace("_", "-")}`}
              >
                Lihat Semua
              </Link>
            </div>
            {!data[type].length ? (
              <div className="py-10 text-center">
                <Inbox className="mx-auto text-sage mb-3" size={32} />
                <p className="text-muted">Belum ada permintaan.</p>
                <Link
                  to={type === "inquiries" ? "/contact" : "/farm-experience"}
                  className="inline-block text-sm text-leaf mt-3"
                >
                  Coba formulir di website
                </Link>
              </div>
            ) : (
              data[type].slice(0, 5).map((x) => (
                <div className="request-row" key={x.id}>
                  <div>
                    <strong>{x.name}</strong>
                    <p>{x.company || x.institution || x.email}</p>
                  </div>
                  <Status value={x.status} />
                </div>
              ))
            )}
          </section>
        ))}
      </div>
      <p className="form-demo mt-7">
        Data JSON + localStorage · perubahan hanya berlaku pada browser ini.
      </p>
    </>
  );
}
function Status({ value }) {
  return (
    <span className={`status status-${value}`}>
      {statusLabels[value] || value}
    </span>
  );
}
const configs = {
  products: {
    label: "Produk",
    fields: [
      ["name", "Nama produk"],
      ["slug", "Slug URL"],
      ["category_id", "Kategori", "category"],
      ["image", "Foto produk", "image"],
      ["alt", "Teks alternatif gambar"],
      ["description", "Deskripsi", "textarea"],
      ["unit", "Satuan"],
      ["availability_status", "Ketersediaan", "available|seasonal|unavailable"],
      ["is_featured", "Tampilkan di beranda", "checkbox"],
      ["is_active", "Aktif / tampil di website", "checkbox"],
      ["is_sample", "Konten contoh", "checkbox"],
    ],
  },
  categories: {
    label: "Kategori",
    fields: [
      ["name", "Nama kategori"],
      ["slug", "Slug URL"],
      ["is_active", "Aktif", "checkbox"],
    ],
  },
  gallery: {
    label: "Foto",
    fields: [
      ["title", "Judul foto"],
      ["image", "Gambar", "image"],
      ["alt", "Teks alternatif"],
      ["category", "Kategori galeri"],
      ["sort_order", "Urutan", "number"],
      ["is_active", "Aktif", "checkbox"],
      ["is_sample", "Konten contoh", "checkbox"],
    ],
  },
  articles: {
    label: "Artikel",
    fields: [
      ["title", "Judul artikel"],
      ["slug", "Slug URL"],
      ["image", "Cover artikel", "image"],
      ["category", "Kategori"],
      ["excerpt", "Ringkasan", "textarea"],
      ["content", "Isi artikel (paragraf dipisahkan baris kosong)", "textarea"],
      ["published_at", "Tanggal terbit", "date"],
      ["meta_title", "Judul SEO"],
      ["meta_description", "Deskripsi SEO", "textarea"],
      ["status", "Status", "draft|published"],
      ["is_sample", "Konten contoh", "checkbox"],
    ],
  },
  programs: {
    label: "Program",
    fields: [
      ["title", "Nama program"],
      ["slug", "Slug URL"],
      ["image", "Cover program", "image"],
      ["description", "Deskripsi", "textarea"],
      ["activities", "Aktivitas (satu per baris)", "textarea"],
      ["duration", "Durasi"],
      ["facilities", "Fasilitas", "textarea"],
      ["is_active", "Aktif", "checkbox"],
      ["is_sample", "Konten contoh", "checkbox"],
    ],
  },
};
function ContentManager({ type, title }) {
  const { data, save, remove } = useData();
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [page, setPage] = useState(1),
    [edit, setEdit] = useState(null),
    [deleting, setDeleting] = useState(null),
    [notice, setNotice] = useState(""),
    [preview, setPreview] = useState(null);
  const config = configs[type];
  const filtered = data[type].filter(
    (x) =>
      `${x.name || x.title} ${x.category || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "all" ||
        (filter === "active"
          ? type === "articles"
            ? x.status === "published"
            : x.is_active
          : type === "articles"
            ? x.status === "draft"
            : !x.is_active)),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const items = filtered.slice(
    (Math.min(page, pages) - 1) * 8,
    Math.min(page, pages) * 8,
  );
  function del() {
    if (
      type === "categories" &&
      data.products.some((x) => x.category_id === deleting.id)
    ) {
      setNotice(
        "Kategori masih digunakan produk. Ubah kategori produk terlebih dahulu.",
      );
      setDeleting(null);
      return;
    }
    if (remove(type, deleting.id)) setNotice("Data berhasil dihapus.");
    setDeleting(null);
  }
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>{title}</h1>
          <p>Kelola {title.toLowerCase()} yang tampil di website Gema Farm.</p>
        </div>
        <Button
          onClick={() =>
            setEdit({
              is_active: true,
              is_sample: true,
              is_featured: false,
              status: "draft",
              sort_order: 0,
              unit: "kg",
              availability_status: "available",
              category_id: data.categories[0]?.id || "",
              published_at: new Date().toISOString().slice(0, 10),
            })
          }
        >
          <Plus size={18} />
          Tambah {config.label}
        </Button>
      </div>
      {notice && (
        <p className="notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Tutup pesan">
            <X size={16} />
          </button>
        </p>
      )}
      <section className="admin-panel">
        <div className="admin-list-tools">
          <label className="search-box">
            <Search size={18} />
            <input
              placeholder={`Cari ${title.toLowerCase()}…`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label={`Cari ${title}`}
            />
          </label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter status"
          >
            <option value="all">Semua status</option>
            <option value="active">
              {type === "articles" ? "Terbit" : "Aktif"}
            </option>
            <option value="inactive">
              {type === "articles" ? "Draft" : "Nonaktif"}
            </option>
          </select>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>{config.label}</th>
                <th>Kategori / slug</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id}>
                  <td>
                    <div className="table-name">
                      {x.image && (
                        <Photo src={x.image} alt={x.alt || x.title || x.name} />
                      )}
                      <div>
                        <strong>{x.name || x.title}</strong>
                        {x.is_sample && <small>Konten contoh</small>}
                      </div>
                    </div>
                  </td>
                  <td>
                    {type === "products"
                      ? data.categories.find((c) => c.id === x.category_id)
                          ?.name
                      : x.category || x.slug}
                  </td>
                  <td>
                    <Status
                      value={
                        type === "articles"
                          ? x.status
                          : x.is_active
                            ? "Aktif"
                            : "Nonaktif"
                      }
                    />
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        aria-label={`Pratinjau ${x.name || x.title}`}
                        onClick={() => setPreview(x)}
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        aria-label={`Edit ${x.name || x.title}`}
                        onClick={() => setEdit(x)}
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        aria-label={`Hapus ${x.name || x.title}`}
                        onClick={() => setDeleting(x)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && (
          <Empty
            title="Belum ada data"
            text="Tambahkan konten baru atau ubah pencarian Anda."
          />
        )}
        <div className="table-footer">
          <span>
            {filtered.length} data · Halaman {Math.min(page, pages)} dari{" "}
            {pages}
          </span>
          <div className="flex gap-3">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Sebelumnya
            </button>
            <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
              Berikutnya
            </button>
          </div>
        </div>
      </section>
      {edit && (
        <Editor
          key={edit.id || "new"}
          type={type}
          item={edit}
          onClose={() => setEdit(null)}
          onSave={(row) => {
            if (save(type, row)) {
              setEdit(null);
              setNotice("Perubahan tersimpan dan tampil pada website lokal.");
            }
          }}
        />
      )}
      {deleting && (
        <Modal onClose={() => setDeleting(null)} label="Konfirmasi hapus">
          <div className="p-8 max-w-md">
            <Trash2 className="text-red-600 mb-5" size={30} />
            <h2 className="text-2xl">
              Hapus {deleting.name || deleting.title}?
            </h2>
            <p className="text-muted my-5">
              Data ini akan dihapus dari browser dan website demo. Tindakan ini
              tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <Button outline onClick={() => setDeleting(null)}>
                Batal
              </Button>
              <Button className="bg-red-700!" onClick={del}>
                Ya, Hapus
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {preview && (
        <Modal onClose={() => setPreview(null)} label="Pratinjau konten">
          <div className="p-8 max-w-xl">
            {preview.image && (
              <Photo
                src={preview.image}
                alt={preview.alt || preview.title || preview.name}
                className="rounded-xl h-64 w-full mb-5"
              />
            )}
            <span className="demo-badge">PRATINJAU</span>
            <h2 className="text-2xl mt-4">{preview.name || preview.title}</h2>
            <p className="mt-4 whitespace-pre-line text-muted">
              {preview.content ||
                preview.description ||
                preview.alt ||
                preview.slug}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
function Editor({ type, item, onClose, onSave }) {
  const { data } = useData();
  const [draft, setDraft] = useState({ ...item }),
    [error, setError] = useState(""),
    [preview, setPreview] = useState(false);
  const config = configs[type];
  function update(key, val) {
    setDraft((old) => ({
      ...old,
      [key]: val,
      ...((key === "name" || key === "title") &&
      !item.id &&
      (!old.slug ||
        old.slug ===
          (old.name || old.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""))
        ? {
            slug: val
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          }
        : {}),
    }));
  }
  function submit(e) {
    e.preventDefault();
    setError("");
    if (draft.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) {
      setError("Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.");
      return;
    }
    if (
      draft.slug &&
      data[type].some((x) => x.id !== draft.id && x.slug === draft.slug)
    ) {
      setError("Slug sudah digunakan. Pilih slug yang berbeda.");
      return;
    }
    onSave(draft);
  }
  return (
    <Modal
      onClose={onClose}
      label={`${item.id ? "Edit" : "Tambah"} ${config.label}`}
    >
      <form onSubmit={submit} className="editor-form">
        <p className="eyebrow">CONTENT MANAGER</p>
        <h2 className="text-2xl mb-7">
          {item.id ? "Edit" : "Tambah"} {config.label}
        </h2>
        <div className="form-grid">
          {config.fields.map(([key, label, kind]) => (
            <div
              key={key}
              className={
                ["textarea", "image", "checkbox"].includes(kind)
                  ? "col-span-full"
                  : ""
              }
            >
              {kind === "checkbox" ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={!!draft[key]}
                    onChange={(e) => update(key, e.target.checked)}
                  />
                  {label}
                </label>
              ) : kind === "image" ? (
                <ImageField
                  value={draft[key]}
                  label={label}
                  onChange={(v) => update(key, v)}
                  setError={setError}
                />
              ) : (
                <Field
                  label={label}
                  required={
                    ![
                      "alt",
                      "meta_title",
                      "meta_description",
                      "facilities",
                    ].includes(key)
                  }
                >
                  {kind === "textarea" ? (
                    <textarea
                      required={
                        !["meta_description", "facilities"].includes(key)
                      }
                      rows={key === "content" ? 10 : 3}
                      value={draft[key] || ""}
                      onChange={(e) => update(key, e.target.value)}
                      maxLength={key === "content" ? 20000 : 3000}
                    />
                  ) : kind === "category" || kind?.includes("|") ? (
                    <select
                      required
                      value={draft[key] || ""}
                      onChange={(e) => update(key, e.target.value)}
                    >
                      {kind === "category" ? (
                        <>
                          <option value="">Pilih kategori</option>
                          {data.categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        kind.split("|").map((v) => (
                          <option key={v} value={v}>
                            {statusLabels[v] ||
                              {
                                available: "Tersedia (perlu konfirmasi)",
                                seasonal: "Musiman",
                                unavailable: "Belum tersedia",
                              }[v] ||
                              v}
                          </option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      required={!["alt", "meta_title"].includes(key)}
                      type={kind || "text"}
                      value={draft[key] ?? ""}
                      onChange={(e) =>
                        update(
                          key,
                          kind === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                        )
                      }
                      maxLength={200}
                      min={kind === "number" ? 0 : undefined}
                    />
                  )}
                </Field>
              )}
            </div>
          ))}
        </div>
        {error && (
          <p role="alert" className="error-message mt-5">
            {error}
          </p>
        )}
        {preview && (
          <div className="info-box mt-6">
            {draft.image && (
              <Photo
                src={draft.image}
                alt={draft.alt || draft.title || draft.name}
                className="h-48 rounded-lg w-full mb-4"
              />
            )}
            <h3>{draft.name || draft.title}</h3>
            <p className="whitespace-pre-line mt-3">
              {draft.content || draft.description || draft.alt}
            </p>
          </div>
        )}
        <div className="editor-actions">
          <Button outline type="button" onClick={() => setPreview(!preview)}>
            <Eye size={16} />
            {preview ? "Tutup Preview" : "Preview"}
          </Button>
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </Modal>
  );
}
function ImageField({ value, label, onChange, setError }) {
  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setError("Pilih JPG, PNG, atau WebP maksimal 2 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 6000 || img.height > 6000) {
          setError("Dimensi gambar maksimal 6000 px.");
          return;
        }
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas
          .getContext("2d")
          .drawImage(img, 0, 0, canvas.width, canvas.height);
        onChange(canvas.toDataURL("image/webp", 0.8));
        setError("");
      };
      img.onerror = () => setError("File gambar tidak valid.");
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="field">
      <span>{label} *</span>
      <div className="image-picker">
        {value && <Photo src={value} alt="Pratinjau gambar" />}
        <label className="upload-label">
          <Upload size={22} />
          <span>Unggah gambar</span>
          <small>JPG, PNG, WebP · maks. 2 MB</small>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={upload}
          />
        </label>
      </div>
      <input
        aria-label={`${label} lokasi aset`}
        required
        value={value || ""}
        placeholder="/images/farm.webp"
        onChange={(e) => {
          if (
            /^\/(images|uploads)\/[\w.-]*$/.test(e.target.value) ||
            !e.target.value
          )
            onChange(e.target.value);
        }}
        readOnly={value?.startsWith("data:")}
        className="text-sm!"
      />
    </div>
  );
}
function Requests({ type, title }) {
  const { data, save, remove } = useData();
  const [filter, setFilter] = useState("all"),
    [search, setSearch] = useState(""),
    [selected, setSelected] = useState(null),
    [deleting, setDeleting] = useState(null),
    [page, setPage] = useState(1);
  const visit = type === "visit_requests",
    statuses = visit
      ? [
          "pending",
          "contacted",
          "confirmed",
          "completed",
          "cancelled",
          "rejected",
        ]
      : ["new", "contacted", "closed"];
  const filtered = data[type].filter(
    (x) =>
      (filter === "all" || x.status === filter) &&
      `${x.name} ${x.email} ${x.company || x.institution || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>{title}</h1>
          <p>
            {visit
              ? "Tinjau rencana dan kelola status permintaan kunjungan."
              : "Kelola percakapan awal dan kebutuhan calon mitra."}
          </p>
        </div>
      </div>
      <section className="admin-panel">
        <div className="admin-list-tools">
          <label className="search-box">
            <Search size={18} />
            <input
              aria-label="Cari permintaan"
              placeholder="Cari nama, email, institusi…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter status"
          >
            <option value="all">Semua status</option>
            {statuses.map((x) => (
              <option key={x} value={x}>
                {statusLabels[x]}
              </option>
            ))}
          </select>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Nama / Institusi</th>
                <th>{visit ? "Tanggal pilihan" : "Kebutuhan"}</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice(
                  (Math.min(page, pages) - 1) * 8,
                  Math.min(page, pages) * 8,
                )
                .map((x) => (
                  <tr key={x.id}>
                    <td>
                      <strong>{x.name}</strong>
                      <p className="text-sm text-muted mt-1">
                        {x.company || x.institution || x.email}
                      </p>
                    </td>
                    <td>
                      {visit ? formatDate(x.preferred_date) : x.inquiry_type}
                    </td>
                    <td>
                      <Status value={x.status} />
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => setSelected({ ...x })}
                          aria-label={`Lihat permintaan ${x.name}`}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setDeleting(x)}
                          aria-label={`Hapus permintaan ${x.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && (
          <Empty
            title="Belum ada permintaan"
            text="Permintaan dari formulir demo akan muncul di sini."
          />
        )}
        <div className="table-footer">
          <span>
            {filtered.length} permintaan · Halaman {Math.min(page, pages)}/
            {pages}
          </span>
          <div className="flex gap-3">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Sebelumnya
            </button>
            <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
              Berikutnya
            </button>
          </div>
        </div>
      </section>
      {selected && (
        <Modal onClose={() => setSelected(null)} label="Detail permintaan">
          <form
            className="editor-form"
            onSubmit={(e) => {
              e.preventDefault();
              const old = data[type].find((x) => x.id === selected.id);
              const history =
                old.status !== selected.status
                  ? [
                      ...(old.history || []),
                      {
                        from: old.status,
                        to: selected.status,
                        at: new Date().toISOString(),
                      },
                    ]
                  : old.history || [];
              if (save(type, { ...selected, history })) setSelected(null);
            }}
          >
            <p className="eyebrow">DETAIL PERMINTAAN</p>
            <h2 className="text-2xl mb-6">{selected.name}</h2>
            <dl className="request-detail">
              {[
                ["Email", selected.email],
                ["WhatsApp", selected.phone],
                ["Institusi", selected.institution || selected.company || "—"],
                ...(visit
                  ? [
                      [
                        "Program",
                        data.programs.find((p) => p.id === selected.program_id)
                          ?.title || "Program dihapus",
                      ],
                      ["Tanggal pilihan", formatDate(selected.preferred_date)],
                      ["Peserta", selected.participants],
                    ]
                  : [["Kebutuhan", selected.inquiry_type]]),
                ["Pesan", selected.message],
                ["Persetujuan", formatDate(selected.consent_at)],
              ].map(([key, val]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
            <Field label="Status">
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({ ...selected, status: e.target.value })
                }
              >
                {statuses.map((x) => (
                  <option key={x} value={x}>
                    {statusLabels[x]}
                  </option>
                ))}
              </select>
            </Field>
            <div className="mt-5">
              <Field label="Catatan admin" required={false}>
                <textarea
                  rows={4}
                  value={selected.admin_notes}
                  onChange={(e) =>
                    setSelected({ ...selected, admin_notes: e.target.value })
                  }
                />
              </Field>
            </div>
            {selected.history?.length > 0 && (
              <div className="info-box mt-5">
                <h3>Riwayat status</h3>
                {selected.history.map((x, i) => (
                  <p key={i} className="mt-2 text-sm">
                    {statusLabels[x.from]} → {statusLabels[x.to]} ·{" "}
                    {new Date(x.at).toLocaleString("id-ID")}
                  </p>
                ))}
              </div>
            )}
            <Button type="submit" className="mt-6 w-full">
              Simpan Status
            </Button>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal onClose={() => setDeleting(null)} label="Hapus permintaan">
          <div className="p-8 max-w-md">
            <h2 className="text-2xl">Hapus permintaan {deleting.name}?</h2>
            <p className="my-5 text-muted">
              Data pribadi dan riwayat permintaan akan dihapus dari browser ini.
            </p>
            <div className="flex gap-3">
              <Button outline onClick={() => setDeleting(null)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  remove(type, deleting.id);
                  setDeleting(null);
                }}
              >
                Hapus Data
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
function SettingsPage() {
  const { data, save, reset } = useData();
  const [draft, setDraft] = useState({ ...data.settings }),
    [notice, setNotice] = useState(""),
    [confirm, setConfirm] = useState(false),
    [error, setError] = useState("");
  function exportData() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "gema-farm-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Pengaturan Website</h1>
          <p>Perbarui identitas, kontak, dan tampilan utama.</p>
        </div>
        <Button outline onClick={exportData}>
          <Download size={17} />
          Ekspor JSON
        </Button>
      </div>
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      <form
        className="admin-panel settings-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (save("settings", draft))
            setNotice("Pengaturan berhasil disimpan.");
        }}
      >
        <h2>Identitas & Kontak</h2>
        <p className="text-muted text-sm mb-7">
          Kosongkan kontak yang belum terverifikasi. Tombol WhatsApp akan aktif
          setelah nomor resmi diisi.
        </p>
        <div className="form-grid">
          {[
            ["site_name", "Nama website"],
            ["address", "Alamat"],
            ["whatsapp", "WhatsApp (format 628…)"],
            ["email", "Email resmi", "email"],
            ["instagram", "Tautan Instagram", "url"],
            ["maps_url", "Tautan Google Maps", "url"],
          ].map(([key, label, type]) => (
            <Field
              key={key}
              label={label}
              required={["site_name", "address"].includes(key)}
            >
              <input
                type={type || "text"}
                pattern={
                  type === "url"
                    ? "https://.*"
                    : key === "whatsapp"
                      ? "[1-9][0-9]{8,14}"
                      : undefined
                }
                required={["site_name", "address"].includes(key)}
                value={draft[key]}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              />
            </Field>
          ))}
        </div>
        <h2 className="mt-10">Beranda & Cerita</h2>
        <div className="space-y-5 mt-6">
          {[
            ["hero_title", "Judul hero"],
            ["hero_subtitle", "Deskripsi hero"],
            ["about_title", "Judul pengantar"],
            ["about_text", "Cerita pengantar"],
            ["seo_description", "Deskripsi SEO default"],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <textarea
                rows={key === "about_text" ? 4 : 2}
                value={draft[key]}
                required
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              />
            </Field>
          ))}
          <ImageField
            value={draft.hero_image}
            label="Foto hero"
            onChange={(v) => setDraft({ ...draft, hero_image: v })}
            setError={setError}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={draft.sample_content}
              onChange={(e) =>
                setDraft({ ...draft, sample_content: e.target.checked })
              }
            />
            Tampilkan penanda konten contoh
          </label>
        </div>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <Button className="mt-7" type="submit">
          Simpan Pengaturan
        </Button>
      </form>
      <section className="admin-panel mt-6">
        <h2>Data Demo</h2>
        <p className="text-muted my-4">
          Reset akan menghapus seluruh perubahan, inquiry, dan permintaan
          kunjungan lokal. Ekspor JSON terlebih dahulu untuk menyimpan salinan.
        </p>
        <Button outline onClick={() => setConfirm(true)}>
          Reset Data Demo
        </Button>
      </section>
      {confirm && (
        <Modal onClose={() => setConfirm(false)} label="Reset data demo">
          <div className="p-8 max-w-md">
            <h2 className="text-2xl">Kembalikan data awal?</h2>
            <p className="text-muted my-5">
              Semua perubahan dan data formulir di browser ini akan dihapus.
            </p>
            <div className="flex gap-3">
              <Button outline onClick={() => setConfirm(false)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  if (reset()) {
                    setConfirm(false);
                    window.location.reload();
                  }
                }}
              >
                Ya, Reset Data
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
