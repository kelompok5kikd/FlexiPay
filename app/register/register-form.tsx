"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FormError = { field?: string; message: string } | null;

export function RegisterForm({ onSuccess, afterRegistrationPath = "/login?registered=1" }: { onSuccess?: () => void; afterRegistrationPath?: string }) {
  const router = useRouter();
  const [error, setError] = useState<FormError>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"), phone: form.get("phone"), email: form.get("email"),
          pin: form.get("pin"), acceptTerms: form.get("acceptTerms") === "on",
        }),
      });
      const result = await response.json();
      if (!response.ok) { setError({ field: result.field, message: result.error ?? "Registrasi belum berhasil." }); return; }
      if (onSuccess) onSuccess();
      else router.push(afterRegistrationPath);
    } catch {
      setError({ message: "Tidak dapat terhubung. Periksa koneksi lalu coba lagi." });
    } finally { setLoading(false); }
  }

  const errorFor = (field: string) => error?.field === field ? <small className="field-error" role="alert">{error.message}</small> : null;
  return <form className="auth-form register-form" onSubmit={submit}>
    <label>Nama lengkap<input name="fullName" type="text" placeholder="Nama kamu" autoComplete="name" required minLength={2} maxLength={100} /></label>
    <label>Nomor HP<input name="phone" type="tel" placeholder="08xxxxxxxxxx" autoComplete="tel" required maxLength={18} />{errorFor("phone")}</label>
    <label>Email<input name="email" type="email" placeholder="nama@email.com" autoComplete="email" required maxLength={254} />{errorFor("email")}</label>
    <label>Kata sandi<input name="password" type="password" placeholder="Masukkan kata sandi" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
    <label>PIN FlexiPay (6 digit)<input name="pin" type="password" inputMode="numeric" pattern="[0-9]{6}" placeholder="Masukkan 6 digit PIN" autoComplete="new-password" required minLength={6} maxLength={6} />{errorFor("pin")}</label>
    <label className="terms-label"><input name="acceptTerms" type="checkbox" required /> <span>Saya menyetujui syarat dan ketentuan FlexiPay.</span></label>
    {errorFor("acceptTerms")}
    {error && !error.field && <p className="auth-error" role="alert">{error.message}</p>}
    <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Membuat akun…" : "Buat akun"}<span>→</span></button>
  </form>;
}
