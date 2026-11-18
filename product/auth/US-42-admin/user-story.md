# US-42 — Halaman Admin FlexiPay untuk Monitoring Pengguna dan Penilaian Kelayakan Limit Kredit

## 1. Informasi User Story

- **ID:** US-42
- **Nama:** Halaman Admin untuk melihat pengguna yang registrasi, login, dan menilai kelayakan pemberian limit kredit
- **Epic:** Admin & Credit Assessment
- **Aktor utama:** Admin FlexiPay
- **Aktor terkait:** Pengguna FlexiPay / calon nasabah
- **Prioritas:** High

## 2. User Story

Sebagai **admin FlexiPay**, saya ingin masuk ke halaman admin yang hanya dapat diakses oleh akun admin resmi, melihat daftar pengguna yang telah registrasi dan aktivitas login mereka, serta memeriksa data dan kelayakan calon nasabah, agar saya dapat melakukan penilaian dan menetapkan keputusan pemberian limit kredit secara terkontrol.

## 3. Tujuan Fitur

Halaman admin menjadi area internal FlexiPay yang terpisah dari aplikasi pengguna. Admin dapat:
1. Login menggunakan akun admin yang dibuat atau diaktifkan melalui proses internal.
2. Melihat ringkasan jumlah pengguna terdaftar, pengguna aktif, aktivitas login, dan pengajuan limit yang menunggu pemeriksaan.
3. Melihat daftar pengguna beserta status registrasi dan aktivitas login terakhir.
4. Membuka detail profil dan data pengajuan limit calon nasabah.
5. Memeriksa kelengkapan dokumen dan informasi pendukung.
6. Mencatat hasil penilaian kelayakan.
7. Menyetujui pengajuan dengan menetapkan nominal limit, menolak pengajuan dengan alasan, atau meminta perbaikan data.
8. Melihat histori keputusan dan aktivitas admin.

**Catatan kebijakan:** sistem menyediakan alat bantu pemeriksaan dan pencatatan keputusan. Penetapan limit dilakukan oleh admin yang berwenang berdasarkan kebijakan kredit FlexiPay/mitra pembiayaan; bukan otomatis hanya karena pengguna berhasil registrasi atau login.

## 4. Ruang Lingkup Halaman Admin

### A. Login Admin
- Form email/username dan password.
- Hanya akun dengan role admin aktif yang dapat masuk.
- Akun pengguna biasa tidak boleh memperoleh akses admin dengan mengganti URL atau memanggil API secara langsung.
- Tidak tersedia registrasi admin publik.
- Sesi admin memiliki masa berlaku, logout, dan pengamanan percobaan login.
- Disarankan menggunakan MFA/OTP untuk akun admin.

### B. Dashboard Admin
Menampilkan ringkasan:
- Total pengguna terdaftar.
- Pengguna yang pernah login.
- Login terbaru / aktivitas login terbaru.
- Pengajuan limit menunggu review.
- Pengajuan disetujui, ditolak, atau perlu perbaikan.
- Ringkasan keputusan limit dalam rentang waktu tertentu.

### C. Data Pengguna
Daftar pengguna menampilkan:
- ID pengguna.
- Nama lengkap.
- Email dan nomor telepon terverifikasi.
- Tanggal registrasi.
- Status akun (aktif, nonaktif, dibatasi).
- Waktu login terakhir.
- Status verifikasi identitas.
- Status pengajuan limit.

Admin dapat mencari dan memfilter data berdasarkan nama, email, tanggal registrasi, status akun, status verifikasi, dan status pengajuan.

### D. Aktivitas Login
Admin berwenang dapat melihat catatan aktivitas autentikasi yang relevan:
- Waktu login.
- Hasil login (berhasil/gagal).
- Metode atau kanal login.
- Perangkat/browser dan alamat IP jika dikumpulkan sesuai kebijakan privasi.
- Waktu logout atau berakhirnya sesi jika tersedia.

Password, PIN transaksi, OTP, token sesi, dan data rahasia autentikasi tidak boleh ditampilkan pada halaman ini.

### E. Pemeriksaan Kelayakan Limit Kredit
Admin membuka detail calon nasabah dan memeriksa:
- Data identitas dan status verifikasi.
- Data pekerjaan atau usaha dan sumber penghasilan.
- Penghasilan dan pengeluaran rutin yang relevan.
- Kewajiban/cicilan berjalan yang dinyatakan pengguna.
- Riwayat transaksi atau pembayaran FlexiPay jika tersedia.
- Dokumen pendukung yang diunggah.
- Hasil pemeriksaan kelengkapan dan catatan verifikasi.

Admin dapat memilih status:
- **Menunggu review**
- **Dalam pemeriksaan**
- **Perlu perbaikan data**
- **Layak**
- **Tidak layak**
- **Disetujui**
- **Ditolak**

Status **Layak** adalah hasil penilaian; status **Disetujui** berarti keputusan pemberian limit telah ditetapkan oleh pejabat/admin yang berwenang.

### F. Penetapan Limit
Jika pengajuan dinyatakan layak dan disetujui:
- Admin memasukkan nominal limit yang disetujui.
- Sistem memvalidasi nominal terhadap batas minimum/maksimum dan kebijakan produk yang dikonfigurasi.
- Admin mencatat alasan/pertimbangan keputusan.
- Sistem menyimpan identitas admin, waktu keputusan, nominal limit, dan versi kebijakan/parameter yang digunakan bila tersedia.
- Limit baru aktif setelah keputusan disimpan dan akun memenuhi syarat aktivasi.

Jika ditolak:
- Admin wajib memasukkan alasan penolakan.
- Sistem menyimpan keputusan dan mengubah status pengajuan.
- Pengguna dapat menerima notifikasi status sesuai mekanisme notifikasi FlexiPay.

Jika perlu perbaikan:
- Admin mencatat data/dokumen yang harus diperbaiki.
- Pengguna diberi notifikasi untuk melengkapi pengajuan.

## 5. Alur Utama

1. Admin membuka URL halaman admin FlexiPay.
2. Sistem menampilkan halaman login admin.
3. Admin memasukkan email/username dan password.
4. Backend memvalidasi kredensial, status akun, role, dan faktor autentikasi tambahan bila diaktifkan.
5. Jika bukan admin atau akun tidak aktif, akses ditolak.
6. Jika valid, sistem membuat sesi admin dan menampilkan dashboard.
7. Admin membuka menu Pengguna.
8. Sistem menampilkan daftar pengguna terdaftar dan informasi login terakhir.
9. Admin memilih pengguna atau pengajuan limit.
10. Sistem menampilkan profil, status verifikasi, data pengajuan, dokumen, dan histori relevan.
11. Admin memeriksa data dan mengisi hasil penilaian.
12. Admin memilih Perlu Perbaikan, Tidak Layak, atau Layak.
13. Jika Layak, admin yang berwenang menetapkan nominal limit dan menyimpan keputusan.
14. Sistem mencatat audit trail dan memperbarui status pengajuan/akun limit.
15. Sistem mengirim atau menjadwalkan notifikasi kepada pengguna sesuai status.
16. Admin dapat kembali ke daftar dan memeriksa pengajuan lainnya.

## 6. Acceptance Criteria

### A. Akses Admin
- [ ] Halaman admin memiliki proses login tersendiri atau jalur autentikasi yang membedakan role admin.
- [ ] Hanya akun dengan role admin yang aktif yang dapat mengakses dashboard dan API admin.
- [ ] Pengguna biasa tidak dapat mengakses halaman/API admin meskipun mengetahui URL.
- [ ] Registrasi admin tidak tersedia untuk publik.
- [ ] Login gagal menampilkan pesan yang aman tanpa membocorkan apakah email terdaftar.
- [ ] Sistem menerapkan pembatasan percobaan login dan pencatatan aktivitas autentikasi.
- [ ] Admin dapat logout dan sesi tidak dapat digunakan kembali setelah logout.

### B. Monitoring Pengguna
- [ ] Dashboard menampilkan jumlah pengguna terdaftar.
- [ ] Admin dapat melihat daftar pengguna yang telah registrasi.
- [ ] Admin dapat melihat tanggal registrasi dan status akun.
- [ ] Admin dapat melihat waktu login terakhir.
- [ ] Admin dapat membuka riwayat login sesuai hak akses.
- [ ] Admin dapat mencari dan memfilter daftar pengguna.
- [ ] Data sensitif autentikasi seperti password, PIN, OTP, dan token tidak pernah ditampilkan.

### C. Penilaian Kelayakan
- [ ] Admin dapat melihat data pengajuan limit dari pengguna.
- [ ] Admin dapat memeriksa status verifikasi identitas dan dokumen pendukung.
- [ ] Admin dapat mencatat hasil pemeriksaan dan catatan penilaian.
- [ ] Admin dapat mengubah status menjadi Dalam Pemeriksaan, Perlu Perbaikan, Layak, atau Tidak Layak sesuai kewenangan.
- [ ] Sistem mewajibkan alasan ketika pengajuan ditolak atau diminta perbaikan.
- [ ] Admin berwenang dapat menetapkan nominal limit pada pengajuan yang layak.
- [ ] Nominal limit divalidasi terhadap parameter kebijakan yang berlaku.
- [ ] Sistem menyimpan siapa yang mengambil keputusan dan kapan keputusan dibuat.
- [ ] Perubahan keputusan dan limit tercatat dalam audit trail.

### D. Konsistensi dan Notifikasi
- [ ] Keputusan dan perubahan limit tersimpan secara konsisten.
- [ ] Pengajuan yang belum disetujui tidak otomatis memperoleh limit aktif.
- [ ] Pengguna menerima notifikasi status keputusan jika kanal notifikasi tersedia.
- [ ] Perubahan limit tidak boleh dilakukan oleh role yang tidak memiliki kewenangan.
- [ ] Daftar pengguna dan detail pengajuan hanya menampilkan data sesuai role dan kebutuhan kerja.

## 7. Business Rules

| Kode | Aturan |
|---|---|
| BR-01 | Akses admin hanya untuk akun internal ber-role admin yang aktif. |
| BR-02 | Tidak ada self-registration untuk role admin. |
| BR-03 | Registrasi atau login pengguna tidak otomatis menghasilkan limit kredit. |
| BR-04 | Penilaian kelayakan dilakukan berdasarkan data dan dokumen yang tersedia serta kebijakan kredit yang berlaku. |
| BR-05 | Hanya admin/pejabat dengan permission penetapan limit yang dapat menyetujui nominal limit. |
| BR-06 | Nominal limit harus berada dalam parameter produk dan kebijakan yang berlaku. |
| BR-07 | Penolakan dan permintaan perbaikan wajib memiliki alasan. |
| BR-08 | Semua keputusan dan perubahan data penting harus dicatat di audit trail. |
| BR-09 | Password, PIN, OTP, dan token autentikasi tidak boleh ditampilkan atau dicatat dalam log aplikasi. |
| BR-10 | Riwayat login hanya digunakan untuk operasional dan keamanan sesuai kebijakan privasi serta retensi data. |
| BR-11 | Data pribadi dan dokumen calon nasabah hanya dapat diakses oleh petugas yang memiliki kewenangan. |
| BR-12 | Jika membutuhkan maker-checker, penetapan limit dapat mensyaratkan admin pemeriksa berbeda dari admin pemberi persetujuan. |

## 8. Data Input dan Output

### Input Admin
- Email/username dan password.
- Faktor autentikasi tambahan (jika diaktifkan).
- Catatan hasil pemeriksaan.
- Status hasil review.
- Alasan perbaikan atau penolakan.
- Nominal limit yang disetujui.
- Catatan keputusan.

### Output Sistem
- Dashboard monitoring pengguna.
- Daftar pengguna dan status registrasi.
- Riwayat login yang relevan.
- Detail pengajuan dan dokumen.
- Status kelayakan.
- Keputusan dan nominal limit.
- Audit trail.
- Notifikasi status pengajuan.

## 9. Kondisi Error

| Kondisi | Respons sistem |
|---|---|
| Kredensial admin salah | Tolak login dan catat percobaan gagal. |
| Akun admin nonaktif/dikunci | Tolak akses dan tampilkan pesan aman. |
| Pengguna biasa membuka halaman admin | Tolak akses (403) dan catat kejadian keamanan. |
| Sesi admin kedaluwarsa | Minta admin login kembali. |
| Data pengajuan belum lengkap | Tandai data yang kurang dan sediakan status Perlu Perbaikan. |
| Nominal limit di luar kebijakan | Tolak penyimpanan dan tampilkan batas yang berlaku kepada admin berwenang. |
| Admin tidak memiliki permission | Tolak aksi dan catat percobaan akses. |
| Gagal menyimpan keputusan | Batalkan perubahan; jangan mengaktifkan limit sebagian. |

## 10. Catatan Implementasi

- Gunakan Role-Based Access Control (RBAC), minimal role `admin_viewer`, `credit_reviewer`, dan `credit_approver` bila proses maker-checker diterapkan.
- Backend wajib memeriksa role/permission pada setiap endpoint; menyembunyikan menu di frontend saja tidak cukup.
- Gunakan password hashing yang kuat, MFA untuk admin, cookie sesi `HttpOnly`, `Secure`, `SameSite`, proteksi CSRF sesuai arsitektur, dan rate limiting.
- Audit trail sebaiknya append-only dan menyimpan actor, action, entity, entity_id, timestamp, serta ringkasan perubahan tanpa menyimpan rahasia autentikasi.
- Dokumen identitas dan dokumen keuangan harus disimpan privat, menggunakan kontrol akses dan URL sementara bila perlu.
- Kriteria kelayakan, scoring, batas limit, dan dokumen wajib harus ditetapkan berdasarkan kebijakan kredit resmi FlexiPay/mitra pembiayaan; US ini tidak menetapkan formula scoring atau ambang kredit tertentu.
