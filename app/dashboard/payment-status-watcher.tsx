"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PaymentStatusWatcher({ installmentIds }: { installmentIds: string[] }) {
  const router = useRouter();

  useEffect(() => {
    // Keep reconciling pending invoices even when Midtrans returns to a URL
    // without the optional `payment=returned` query parameter.
    if (installmentIds.length === 0) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = async () => {
      for (const installmentId of installmentIds) {
        try {
          const response = await fetch(`/api/installments/${encodeURIComponent(installmentId)}/status`, { cache: "no-store" });
          if (!response.ok) continue;
          const result = await response.json() as { status?: string };
          if (result.status === "paid" || (result.status && result.status !== "pending" && result.status !== "unpaid")) {
            router.refresh();
            return;
          }
        } catch {
          // Retry on the next interval if the network or Midtrans is temporarily unavailable.
        }
      }
      if (!cancelled) timer = setTimeout(check, 8000);
    };

    void check();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [installmentIds, router]);

  return null;
}
