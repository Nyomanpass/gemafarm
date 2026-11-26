import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { useData, usePublicData } from "./data/store.jsx";
import { Button } from "./components.jsx";
export function Field({
  label,
  name,
  type = "text",
  required = true,
  children,
  ...props
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <span className="text-leaf"> *</span>}
      </span>
      {children || (
        <input name={name} type={type} required={required} {...props} />
      )}
    </label>
  );
}
export function RequestForm({ program }) {
  const visit = !!program;
  const { save, storageError } = useData();
  const { programs } = usePublicData();
  const [params] = useSearchParams();
  const [success, setSuccess] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  async function submit(e) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const value = Object.fromEntries(new FormData(form));
    if (value.website) return;
    if (!/^\+?[0-9\s()-]{9,22}$/.test(value.phone)) {
      setError("Masukkan nomor WhatsApp yang valid (9–15 digit).");
      return;
    }
    if (visit && value.preferred_date < today) {
      setError("Tanggal pilihan tidak boleh di masa lalu.");
      return;
    }
    if (value.message.trim().length < 10) {
      setError("Ceritakan kebutuhan Anda minimal 10 karakter.");
      return;
    }
    setBusy(true);
    const row = {
      ...value,
      privacy_consent: true,
      consent_at: new Date().toISOString(),
      phone: value.phone.replace(/[\s()-]/g, ""),
      status: visit ? "pending" : "new",
      admin_notes: "",
      history: [],
      ...(visit ? { participants: Number(value.participants) } : {}),
    };
    delete row.website;
    if (save(visit ? "visit_requests" : "inquiries", row)) {
      setSuccess(true);
      form.reset();
    } else
      setError("Data belum tersimpan. Periksa kapasitas penyimpanan browser.");
    setBusy(false);
  }
  if (success)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={50} />
        <h3>
          {visit ? "Permintaan kunjungan tersimpan" : "Pesan Anda tersimpan"}
        </h3>
        <p>
          Data demo tersimpan di browser ini dan bisa dilihat di CMS. Belum
          dikirim kepada tim Gema Farm.
          {visit && " Tanggal pilihan bukan konfirmasi booking."}
        </p>
        <Button outline onClick={() => setSuccess(false)}>
          Kirim Permintaan Lain
        </Button>
      </div>
    );
  return (
    <form className="request-form" onSubmit={submit}>
      <div className="mb-7">
        <h3 className="text-2xl">
          {visit ? "Rencanakan kunjungan Anda" : "Mari mulai percakapan"}
        </h3>
        <p className="text-muted mt-3">
          {visit
            ? "Ceritakan rencana Anda. Setiap kunjungan dimulai dengan percakapan."
            : "Bagikan kebutuhan Anda, mulai dari hasil kebun hingga peluang kerja sama."}
        </p>
      </div>
      <div className="form-grid">
        <Field
          label="Nama lengkap"
          name="name"
          autoComplete="name"
          maxLength={100}
          placeholder="Nama Anda"
        />
        <Field
          label={visit ? "Institusi / komunitas" : "Perusahaan / institusi"}
          name={visit ? "institution" : "company"}
          autoComplete="organization"
          required={false}
          maxLength={150}
          placeholder={visit ? "Nama institusi" : "Nama perusahaan"}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          maxLength={254}
        />
        <Field
          label="Nomor WhatsApp"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="08xxxxxxxxxx"
          maxLength={22}
        />
        {visit ? (
          <>
            <Field label="Program">
              <select name="program_id" required defaultValue={program.id}>
                {programs.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Tanggal pilihan"
              name="preferred_date"
              type="date"
              min={today}
            />
            <Field
              label="Jumlah peserta"
              name="participants"
              type="number"
              min="1"
              max="500"
              placeholder="Contoh: 20"
            />
          </>
        ) : (
          <div className="col-span-full">
            <Field label="Kebutuhan Anda">
              <select
                name="inquiry_type"
                defaultValue={
                  params.get("type") === "supply"
                    ? "Suplai rutin"
                    : "Produk segar"
                }
              >
                {[
                  "Produk segar",
                  "Suplai rutin",
                  "Kunjungan edukasi",
                  "Kerja sama lainnya",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
          </div>
        )}
        <div className="col-span-full">
          <Field label="Pesan">
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={4}
              placeholder={
                visit
                  ? "Tujuan kunjungan atau kebutuhan khusus…"
                  : "Ceritakan kebutuhan, jumlah, dan rencana Anda…"
              }
              defaultValue={
                params.get("product")
                  ? `Halo, saya ingin menanyakan ${params.get("product")}.`
                  : ""
              }
            />
          </Field>
        </div>
      </div>
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="privacy_consent" required />
        <span>
          Saya menyetujui pemrosesan data sesuai{" "}
          <Link to="/privacy-policy" target="_blank">
            Kebijakan Privasi
          </Link>
          .
        </span>
      </label>
      {(error || storageError) && (
        <p className="error-message" role="alert">
          {error || storageError}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={busy}>
        <Send size={17} />
        {busy
          ? "Menyimpan…"
          : visit
            ? "Kirim Permintaan Kunjungan"
            : "Kirim Pesan"}
      </Button>
      <p className="form-demo">
        <ShieldCheck size={16} />
        Mode demo: data hanya disimpan di browser Anda.
      </p>
    </form>
  );
}
