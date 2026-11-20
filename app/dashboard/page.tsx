import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SiteHeader } from "../site-header";
import { getCurrentUser } from "@/lib/current-user";
import { getAvailableCredit, getUserCommerceOrders } from "@/lib/commerce-db";
import { getApprovedLimitForUser, getCreditApplicationForUser } from "@/lib/credit-applications";
import { getUserInstallments } from "@/lib/installment-payments";
import { ProfileEditor } from "./profile-editor";
import { PayInstallmentButton } from "./pay-installment-button";
import { PaymentStatusWatcher } from "./payment-status-watcher";

export const metadata = { title: "Dashboard nasabah — FlexiPay" };
export const instant = false;

const money = (value: number) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0,
}).format(value);

const dateTime = (value: string) => new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta",
}).format(new Date(value));

const dateOnly = (value: string) => new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long", timeZone: "Asia/Jakarta",
}).format(new Date(`${value}T00:00:00.000Z`));

const statusLabels: Record<string, string> = {
  confirmed: "Terkonfirmasi", processing: "Diproses", completed: "Selesai", cancelled: "Dibatalkan",
};

const applicationLabels: Record<string, string> = {
  submitted: "Menunggu review", in_review: "Dalam peninjauan", needs_revision: "Perlu perbaikan",
  approved: "Disetujui", rejected: "Ditolak",
};

export default async function DashboardPage() {
  await connection();
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/dashboard")}`);

  const [approvedLimit, availableLimit, application, orders, bills] = await Promise.all([
    getApprovedLimitForUser(user.id),
    getAvailableCredit(user.id),
    getCreditApplicationForUser(user.id),
    getUserCommerceOrders(user.id),
    getUserInstallments(user.id),
  ]);
  const usedLimit = Math.max(0, approvedLimit - availableLimit);
  const tenor = application?.status === "approved" ? application.approvedTenor ?? 0 : 0;
  const todayParts = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Jakarta" }).formatToParts(new Date());
  const today = Object.fromEntries(todayParts.map((part) => [part.type, part.value]));
  const todayKey = `${today.year}-${today.month}-${today.day}`;
  const nextBill = bills.find((bill) => bill.status === "unpaid") ?? null;
  const monthlyBills = bills.filter((bill) => bill.status === "unpaid" && bill.dueDate.slice(0, 7) === todayKey.slice(0, 7));
  const pendingInstallmentIds = bills.filter((bill) => bill.status === "unpaid" && bill.paymentStatus === "pending").map((bill) => bill.id);
  return <main className="customer-dashboard">
    <PaymentStatusWatcher installmentIds={pendingInstallmentIds} />
    <SiteHeader user={user} activePath="/dashboard" totalLimit={approvedLimit} />
    <div className="customer-dashboard-content">
      <div className="customer-dashboard-heading">
        <div><span className="dashboard-label"><i /> FLEXIPAY · DASHBOARD NASABAH</span><h1>Halo, {user.fullName.split(/\s+/)[0]}.</h1><p>Pantau limit dan aktivitas akun FlexiPay kamu dari satu tempat.</p></div>
        <Link className="dashboard-profile-link" href="#profil">Profil saya <span>↓</span></Link>
      </div>

      <section className="dashboard-summary-grid" aria-label="Ringkasan akun">
        <article className="dashboard-summary-card dashboard-limit-card"><span>Total limit disetujui</span><strong>{money(approvedLimit)}</strong><small>{application?.status === "approved" ? "Limit aktif dari pengajuan yang disetujui" : "Limit akan tersedia setelah pengajuan disetujui"}</small></article>
        <article className="dashboard-summary-card"><span>Limit tersedia</span><strong>{money(availableLimit)}</strong><small>Bisa digunakan untuk transaksi FlexiPay</small></article>
        <article className="dashboard-summary-card"><span>Limit terpakai</span><strong>{money(usedLimit)}</strong><small>Akumulasi transaksi dari akun ini</small></article>
        <article className="dashboard-summary-card"><span>Tagihan terdekat</span><strong className={nextBill ? "" : "dashboard-unavailable"}>{nextBill ? money(nextBill.amount) : money(0)}</strong><small>{nextBill ? `Jatuh tempo ${dateOnly(nextBill.dueDate)}` : "Tagihan muncul setelah transaksi limit digunakan"}</small></article>
      </section>

      <section className="dashboard-bills" aria-labelledby="dashboard-bills-title">
        <div className="dashboard-section-heading"><div><span className="dashboard-section-kicker">JADWAL PEMBAYARAN · MIDTRANS</span><h2 id="dashboard-bills-title">Tagihan & cicilan</h2></div><span className="dashboard-record-count">{monthlyBills.length} jatuh tempo bulan ini</span></div>
        <p className="dashboard-bills-note">Satu cicilan ditagih per bulan sebesar angsuran yang disetujui admin, tanpa dipisah berdasarkan barang. Jatuh tempo pertama satu bulan setelah penggunaan limit pertama.</p>
        {bills.length ? <div className="dashboard-bill-list">{bills.map((bill) => {
          const isPastDue = bill.status === "unpaid" && bill.dueDate < todayKey;
          const previousBill = bills.find((item) => item.installmentNumber === bill.installmentNumber - 1);
          const isSequenceLocked = bill.installmentNumber > 1 && (!previousBill || previousBill.dueDate >= todayKey);
          const canPay = bill.status === "unpaid" && !isSequenceLocked;
          const isPending = bill.paymentStatus === "pending" && Boolean(bill.redirectUrl);
          const billStatus = bill.status === "paid" ? "Lunas" : isPending ? "Menunggu pembayaran Midtrans" : isSequenceLocked ? "Dibuka setelah jatuh tempo cicilan sebelumnya" : isPastDue ? "Lewat jatuh tempo · tetap bisa dibayar" : bill.dueDate > todayKey ? "Bisa dibayar sebelum jatuh tempo" : "Jatuh tempo · siap dibayar";
          return <article className="dashboard-bill-row" key={bill.id}>
          <span className={`dashboard-bill-date ${isPastDue ? "past-due" : ""}`}><b>{new Intl.DateTimeFormat("id-ID", { day: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(`${bill.dueDate}T00:00:00.000Z`))}</b><small>{new Intl.DateTimeFormat("id-ID", { month: "short", timeZone: "Asia/Jakarta" }).format(new Date(`${bill.dueDate}T00:00:00.000Z`))}</small></span>
          <span className="dashboard-bill-main"><strong>Cicilan FlexiPay</strong><small>Angsuran bulanan · Cicilan {bill.installmentNumber} dari {bill.tenor}</small></span>
          <span className="dashboard-bill-amount"><b>{money(bill.amount)}</b><small>{billStatus}</small></span>
          {bill.status === "paid" ? <button type="button" className="dashboard-pay-button" disabled>Lunas</button> : canPay ? <PayInstallmentButton installmentId={bill.id} label={isPending ? "Lanjutkan pembayaran" : "Bayar cicilan"} /> : <button type="button" className="dashboard-pay-button" disabled title="Cicilan ini terbuka setelah jatuh tempo cicilan sebelumnya">Bayar cicilan</button>}
        </article>;
        })}</div> : <div className="dashboard-empty dashboard-bills-empty"><span>⌁</span><h3>Belum ada jadwal cicilan</h3><p>{tenor > 0 ? "Jadwal akan muncul setelah transaksi menggunakan limit FlexiPay." : "Jadwal cicilan akan muncul setelah limit kredit disetujui dan digunakan."}</p></div>}
        <small className="dashboard-bills-disclaimer">Pembayaran diproses melalui Midtrans. Status tagihan berubah menjadi lunas setelah notifikasi pembayaran diverifikasi oleh server.</small>
      </section>

      {application && <section className={`dashboard-application dashboard-application-${application.status}`}>
        <div><span className="dashboard-section-kicker">PENGAJUAN KREDIT TERAKHIR</span><h2>{applicationLabels[application.status] ?? application.status}</h2><p>Nomor pengajuan {application.applicationNumber}{application.adminNote ? ` · Catatan admin: ${application.adminNote}` : ""}</p></div>
        <Link href="/pengajuan-kredit">Lihat pengajuan <span>→</span></Link>
      </section>}

      <section className="dashboard-history" aria-labelledby="dashboard-history-title">
        <div className="dashboard-section-heading"><div><span className="dashboard-section-kicker">AKTIVITAS AKUN</span><h2 id="dashboard-history-title">Riwayat transaksi</h2></div><span className="dashboard-record-count">{orders.length} transaksi</span></div>
        {orders.length ? <div className="dashboard-order-list">{orders.map((order) => <Link className="dashboard-order-row" href={`/transaksi/${encodeURIComponent(order.referenceNumber)}`} key={order.id}>
          <span className={`dashboard-order-icon ${order.orderType === "rental" ? "rental" : "product"}`} aria-hidden="true">{order.orderType === "rental" ? "⌂" : "▧"}</span>
          <span className="dashboard-order-main"><strong>{order.itemName}</strong><small>{order.referenceNumber} · {dateTime(order.createdAt)}</small></span>
          <span className="dashboard-order-meta"><b>{money(order.totalAmount)}</b><small>{statusLabels[order.status] ?? order.status}</small></span>
          <span className="dashboard-order-arrow" aria-hidden="true">→</span>
        </Link>)}</div> : <div className="dashboard-empty"><span>↗</span><h3>Belum ada transaksi</h3><p>Transaksi FlexiPay yang berhasil akan muncul di sini beserta waktu, nominal, dan detailnya.</p><Link href="/produk">Jelajahi katalog <span>→</span></Link></div>}
      </section>

      <ProfileEditor fullName={user.fullName} email={user.email} phone={user.phone} createdAt={user.createdAt} avatarUrl={user.avatarUrl} />
      <p className="dashboard-demo-note">Jadwal cicilan dibuat berdasarkan limit yang disetujui dan penggunaan limit pertama.</p>
    </div>
  </main>;
}
