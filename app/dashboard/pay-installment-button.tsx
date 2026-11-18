"use client";

import { useState } from "react";

export function PayInstallmentButton({ installmentId, label = "Bayar cicilan" }: { installmentId: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startPayment() {
    setLoading(true);
    setError("");
    try {
      // Reconcile with Midtrans first. A successful payment may already be
      // complete even if its notification or return redirect arrived late.
      const statusResponse = await fetch(`/api/installments/${encodeURIComponent(installmentId)}/status`, { cache: "no-store" });
      if (statusResponse.ok) {
        const status = await statusResponse.json() as { status?: string };
        if (status.status === "paid") {
          window.location.reload();
          return;
        }
      }
      const response = await fetch(`/api/installments/${encodeURIComponent(installmentId)}/payment`, { method: "POST" });
      const payload = await response.json() as { redirectUrl?: string; error?: string };
      if (!response.ok || !payload.redirectUrl) throw new Error(payload.error || "Pembayaran belum dapat dimulai.");
      window.location.assign(payload.redirectUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Pembayaran belum dapat dimulai.");
      setLoading(false);
    }
  }

  return <span className="dashboard-pay-control">
    <button type="button" className="dashboard-pay-button dashboard-pay-button-active" onClick={startPayment} disabled={loading}>
      {loading ? "Membuka…" : label}
    </button>
    {error && <small className="dashboard-pay-error" role="alert">{error}</small>}
  </span>;
}
