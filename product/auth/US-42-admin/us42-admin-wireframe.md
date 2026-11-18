# Wireframe — US-42 Halaman Admin

## Ringkasan User Story
**US-42:** Halaman Admin untuk mengecek siapa saja yang sudah registrasi dan login serta kelayakan nasabah.

## Tujuan
Membuat halaman admin terpusat agar admin dapat memantau data registrasi, aktivitas login, dan status kelayakan nasabah FlexiPay.

## Alur Pengguna
1. Admin login ke sistem FlexiPay.
2. Admin membuka menu **Data Nasabah**.
3. Sistem menampilkan daftar nasabah dan statusnya.
4. Admin mencari atau memfilter nasabah.
5. Admin membuka detail nasabah bila diperlukan.
6. Admin kembali ke daftar nasabah.

## Screen 1 — Dashboard / Daftar Nasabah

```text
+-----------------------------------------------------------------------+
| FLEXIPAY ADMIN                                      Admin [Profil v]  |
+-------------------+---------------------------------------------------+
| MENU              | DATA NASABAH                                      |
|                   | Pantau registrasi, login, dan kelayakan nasabah   |
| > Dashboard       |                                                   |
| > Data Nasabah    | +--------------+ +--------------+ +-------------+ |
|                   | | Total        | | Sudah Pernah | | Belum Pernah| |
|                   | | Registrasi   | | Login        | | Login       | |
|                   | |     120      | |      95      | |     25      | |
|                   | +--------------+ +--------------+ +-------------+ |
|                   |                                                   |
|                   | Ringkasan Kelayakan                               |
|                   | +--------------+ +--------------+ +-------------+ |
|                   | | Layak        | | Tidak Layak  | | Diproses    | |
|                   | |      70      | |      10      | |     40      | |
|                   | +--------------+ +--------------+ +-------------+ |
|                   |                                                   |
|                   | [Cari nama / ID nasabah...................] [Cari]|
|                   | Registrasi [Semua v] Login [Semua v]              |
|                   | Kelayakan [Semua v]                 [Reset Filter]|
|                   |                                                   |
|                   | +------------------------------------------------+|
|                   | | ID   | Nama | Registrasi | Login | Kelayakan   ||
|                   | |------|------|------------|-------|-------------||
|                   | | FP01 | ...  | Terdaftar  | Sudah | Layak       ||
|                   | | FP02 | ...  | Terdaftar  | Belum | Diproses    ||
|                   | | FP03 | ...  | Terdaftar  | Sudah | Tidak Layak ||
|                   | +------------------------------------------------+|
|                   |                                                   |
|                   |                         [<] 1  2  3 [>]           |
+-------------------+---------------------------------------------------+
```

*Angka dan data pada sketsa hanya contoh untuk menjelaskan tata letak, bukan data FlexiPay sebenarnya.*

### Komponen
| Komponen | Fungsi |
|---|---|
| Sidebar | Navigasi halaman admin |
| Kartu total registrasi | Menampilkan jumlah nasabah yang sudah registrasi |
| Kartu status login | Menampilkan jumlah nasabah yang sudah dan belum pernah login |
| Ringkasan kelayakan | Menampilkan jumlah nasabah berdasarkan status kelayakan |
| Kolom pencarian | Mencari nasabah berdasarkan nama atau ID |
| Filter registrasi | Menyaring berdasarkan status registrasi |
| Filter login | Menyaring berdasarkan status login |
| Filter kelayakan | Menyaring berdasarkan status kelayakan |
| Tabel nasabah | Menampilkan data ringkas nasabah |
| Pagination | Berpindah antarhalaman daftar |

### Kolom Tabel
- ID Nasabah
- Nama Nasabah
- Status Registrasi
- Status Login
- Status Kelayakan
- Aksi / Detail

## Screen 2 — Detail Nasabah

```text
+-----------------------------------------------------------------------+
| FLEXIPAY ADMIN                                      Admin [Profil v]  |
+-------------------+---------------------------------------------------+
| MENU              | DATA NASABAH > DETAIL NASABAH                     |
|                   |                                                   |
|   Dashboard       | [< Kembali ke Daftar]                             |
| > Data Nasabah    |                                                   |
|                   | INFORMASI NASABAH                                 |
|                   | +-----------------------------------------------+ |
|                   | | ID Nasabah       : FP-001                     | |
|                   | | Nama             : Nama Nasabah               | |
|                   | | Email            : n******@email.com          | |
|                   | | Tanggal Registrasi: dd/mm/yyyy                | |
|                   | +-----------------------------------------------+ |
|                   |                                                   |
|                   | INFORMASI LOGIN                                   |
|                   | +-----------------------------------------------+ |
|                   | | Status Login     : Sudah / Belum Pernah Login | |
|                   | | Login Terakhir   : dd/mm/yyyy hh:mm           | |
|                   | +-----------------------------------------------+ |
|                   |                                                   |
|                   | STATUS KELAYAKAN                                  |
|                   | +-----------------------------------------------+ |
|                   | | Status           : Layak / Tidak Layak /      | |
|                   | |                    Dalam Pemeriksaan          | |
|                   | | Keterangan       : Jika tersedia              | |
|                   | +-----------------------------------------------+ |
|                   |                                                   |
|                   | [Kembali ke Daftar]                               |
+-------------------+---------------------------------------------------+
```

### Komponen
- Breadcrumb untuk menunjukkan posisi halaman.
- Tombol kembali ke daftar nasabah.
- Informasi dasar nasabah.
- Status registrasi dan informasi login.
- Status kelayakan dan keterangan jika tersedia.

## Interaksi
1. Admin memilih menu **Data Nasabah**.
2. Sistem memuat ringkasan dan tabel nasabah.
3. Admin memasukkan kata kunci atau memilih filter.
4. Sistem memperbarui daftar sesuai pencarian dan filter.
5. Admin memilih salah satu data untuk membuka detail.
6. Sistem menampilkan detail nasabah.
7. Admin menekan tombol kembali untuk kembali ke daftar.

## Status dan Kondisi Tampilan
- **Loading:** tampilkan indikator saat data sedang dimuat.
- **Data kosong:** tampilkan pesan bahwa belum ada data nasabah.
- **Hasil pencarian kosong:** tampilkan pesan “Nasabah tidak ditemukan”.
- **Error:** tampilkan pesan gagal memuat data dan opsi coba lagi.
- **Status belum tersedia:** tampilkan “Belum tersedia” atau “Belum dinilai”; jangan menyamakannya dengan “Tidak Layak”.

## Catatan
- Data pada wireframe bersifat ilustratif.
- Status kelayakan harus mengikuti aturan bisnis dan hasil pemeriksaan resmi FlexiPay.
- User story belum menyatakan bahwa admin dapat mengubah atau memutuskan kelayakan, sehingga aksi persetujuan/penolakan tidak dimasukkan.
- Hak akses admin harus diperiksa oleh sistem.
- Jangan menampilkan password, OTP, atau token autentikasi.
- Data pribadi ditampilkan seperlunya dan sesuai kewenangan admin.

## Acceptance Criteria
- [ ] Admin yang berwenang dapat membuka halaman Data Nasabah.
- [ ] Daftar nasabah yang sudah registrasi dapat dilihat.
- [ ] Status login nasabah dapat dilihat berdasarkan catatan sistem.
- [ ] Status kelayakan nasabah dapat dilihat.
- [ ] Admin dapat mencari nasabah.
- [ ] Admin dapat memfilter daftar berdasarkan registrasi, login, dan kelayakan.
- [ ] Admin dapat membuka detail nasabah.
- [ ] Sistem menyediakan tampilan loading, kosong, dan error.
- [ ] Status yang belum dinilai dibedakan dari status tidak layak.
