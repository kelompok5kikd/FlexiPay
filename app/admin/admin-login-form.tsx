"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), pin: form.get("pin") }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? "Login admin gagal."); return; }
      router.refresh();
    } catch { setError("Tidak dapat terhubung. Coba lagi."); }
    finally { setLoading(false); }
  }
  return <form className="admin-login-form" onSubmit={submit}>
    <label>Email admin<input name="email" type="email" placeholder="nama@flexipay.id" autoComplete="username" required suppressHydrationWarning /></label>
    <label>PIN admin<input name="pin" type="password" inputMode="numeric" pattern="[0-9]{6}" placeholder="Masukkan 6 digit PIN" autoComplete="current-password" required maxLength={6} suppressHydrationWarning /></label>
    {error && <p className="admin-form-error" role="alert">{error}</p>}
    <button type="submit" disabled={loading}>{loading ? "Memeriksa…" : "Masuk ke portal admin"}<span>→</span></button>
  </form>;
}
