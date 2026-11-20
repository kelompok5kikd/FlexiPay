import { connection } from "next/server";
import { cookies } from "next/headers";
import { getAdminForSession, getAdminOverview } from "@/lib/admin-db";
import { AdminLoginForm } from "./admin-login-form";
import { AdminDashboard } from "./admin-dashboard";
import { listAdminCreditApplications } from "@/lib/credit-applications";
import { getAdminCommerceOrders } from "@/lib/commerce-db";

export const metadata = { title: "Portal Admin — FlexiPay" };
export const instant = false;

export default async function AdminPage() {
  await connection();
  const cookieStore = await cookies();
  const admin = await getAdminForSession(cookieStore.get("flexipay_admin_session")?.value);
  if (admin) {
    const [overview, applications, commerceOrders] = await Promise.all([
      getAdminOverview(),
      admin.role === "admin_viewer" ? [] : listAdminCreditApplications(),
      admin.role === "admin_viewer" ? [] : getAdminCommerceOrders(),
    ]);
    return <AdminDashboard admin={admin} overview={overview} applications={applications} commerceOrders={commerceOrders} />;
  }
  return <main className="admin-login-page"><section className="admin-login-card"><a className="admin-login-brand" href="/"><img src="/flexipay-logo.png" alt="FlexiPay" /></a><div className="admin-login-eyebrow"><span/> INTERNAL ACCESS</div><h1>Portal Admin</h1><p>Masuk untuk memantau akun pengguna dan review pengajuan limit.</p><AdminLoginForm /><a className="admin-back-home" href="/">← Kembali ke website FlexiPay</a><small className="admin-login-note">Akses terbatas untuk admin FlexiPay.</small></section></main>;
}
