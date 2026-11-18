"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ className = "logout-button" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }
  return <button className={className} onClick={logout} disabled={loading}>{loading ? "Keluar…" : "Keluar dari akun"}</button>;
}
