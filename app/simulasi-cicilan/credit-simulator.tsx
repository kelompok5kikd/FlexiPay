"use client";

import { FormEvent, useState } from "react";
import {
  calculateInstallmentTerms,
  MAX_CREDIT_TENOR_MONTHS,
} from "@/lib/credit-calculator";

const rupiah = (value: number) => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}).format(value);

type Simulation = {
  limit: number;
  tenor: number;
  terms: ReturnType<typeof calculateInstallmentTerms>;
};

export function CreditSimulator() {
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [error, setError] = useState("");

  function clearResult() {
    setSimulation(null);
    setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const limit = Number(form.get("limit"));
    const tenor = Number(form.get("tenor"));

    if (!Number.isSafeInteger(limit) || limit < 1) {
      setSimulation(null);
      setError("Masukkan nominal limit berupa bilangan bulat yang valid.");
      return;
    }

    if (!Number.isInteger(tenor) || tenor < 1 || tenor > MAX_CREDIT_TENOR_MONTHS) {
      setSimulation(null);
      setError(`Pilih tenor antara 1 dan ${MAX_CREDIT_TENOR_MONTHS} bulan.`);
      return;
    }

    try {
      const terms = calculateInstallmentTerms(limit, tenor);
      setSimulation({ limit, tenor, terms });
      setError("");
    } catch (calculationError) {
      if (calculationError instanceof RangeError) {
        setSimulation(null);
        setError(calculationError.message);
        return;
      }
      throw calculationError;
    }
  }

  return <form className="credit-card credit-simulator-form" onSubmit={submit}>
    <div className="credit-fields">
      <label>Nominal limit yang ingin disimulasikan (Rp)
        <input name="limit" type="number" min="1" step="1" inputMode="numeric" required onChange={clearResult} />
      </label>
      <label>Tenor
        <select name="tenor" defaultValue="" required onChange={clearResult}>
          <option value="" disabled>Pilih tenor</option>
          {Array.from({ length: MAX_CREDIT_TENOR_MONTHS }, (_, index) => {
            const tenor = index + 1;
            return <option key={tenor} value={tenor}>{tenor} bulan</option>;
          })}
        </select>
      </label>
    </div>
    {error && <p className="credit-error" role="alert">{error}</p>}
    <div className="credit-actions">
      <button className="credit-next" type="submit">Hitung simulasi <span>→</span></button>
    </div>
    {simulation && <section className="credit-terms credit-simulator-result" aria-live="polite" aria-atomic="true">
      <h2>Hasil simulasi</h2>
      <p><span>Limit</span><b>{rupiah(simulation.limit)}</b></p>
      <p><span>Tenor</span><b>{simulation.tenor} bulan</b></p>
      <p><span>Bunga flat per bulan (0,5%)</span><b>{rupiah(simulation.terms.interestPerMonth)}</b></p>
      <p><span>Angsuran per bulan</span><b>{rupiah(simulation.terms.installmentPerMonth)}</b></p>
      <p><span>Total pembayaran</span><b>{rupiah(simulation.terms.totalRepayment)}</b></p>
    </section>}
    <p className="credit-simulator-disclaimer">Simulasi ini merupakan perkiraan. Limit dan tenor final mengikuti hasil peninjauan pengajuan oleh tim admin.</p>
  </form>;
}
