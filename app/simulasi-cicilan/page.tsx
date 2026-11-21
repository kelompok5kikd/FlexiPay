import { connection } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { getAvailableCredit } from "@/lib/commerce-db";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../site-footer";
import { CreditSimulator } from "./credit-simulator";

export const metadata = { title: "Simulasi cicilan — FlexiPay" };
export const instant = false;

export default async function Page() {
  await connection();
  const user = await getCurrentUser();
  const totalLimit = user ? await getAvailableCredit(user.id) : 0;

  return <main className="credit-page">
    <SiteHeader user={user} activePath="/simulasi-cicilan" totalLimit={totalLimit} />
    <div className="credit-wrap credit-simulator-wrap">
      <div className="credit-heading">
        <div className="credit-eyebrow"><i /> FLEXIPAY FINANCING</div>
        <h1>Simulasi <em>cicilan.</em></h1>
        <p>Masukkan nominal limit dan tenor untuk melihat perkiraan angsuran serta total pembayaran. Bunga simulasi mengikuti perhitungan FlexiPay sebesar 0,5% flat per bulan.</p>
      </div>
      <CreditSimulator />
    </div>
    <SiteFooter />
  </main>;
}
