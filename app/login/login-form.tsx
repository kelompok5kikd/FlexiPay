"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ onSuccess, redirectTo = "/" }: { onSuccess?: () => void; redirectTo?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), pin: form.get("pin") }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? "Email/PIN salah atau belum terdaftar."); return; }
      onSuccess?.();
      router.replace(redirectTo);
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung. Periksa koneksi lalu coba lagi.");
    } finally { setLoading(false); }
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>Email<input name="email" type="email" placeholder="nama@email.com" autoComplete="email" required maxLength={254} /></label>
    <label>PIN FlexiPay (6 digit)<input name="pin" type="password" inputMode="numeric" pattern="[0-9]{6}" placeholder="Masukkan 6 digit PIN" autoComplete="current-password" required minLength={6} maxLength={6} /></label>
    <p className="auth-error" role="alert">{error}</p>
    <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Memeriksa akun…" : "Masuk ke akun"}<span>→</span></button>
  </form>;
}
