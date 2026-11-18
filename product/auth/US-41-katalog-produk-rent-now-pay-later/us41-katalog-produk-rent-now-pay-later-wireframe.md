# Wireframe — US-41
## Tampilan Pilihan Product dan Tampilan Pilihan Rent Now Pay Later

**Produk:** FlexiPay  
**Dokumen:** Wireframe  
**Versi:** 1.0  
**Tipe:** Low-fidelity mobile

## 1. Tujuan
Menyediakan tampilan untuk melihat dan memilih produk, kemudian melihat opsi Rent Now Pay Later beserta informasi yang diperlukan sebelum pengguna melanjutkan.

## 2. Alur Pengguna
1. Pengguna membuka halaman pilihan produk.
2. Sistem menampilkan daftar produk.
3. Pengguna memilih produk.
4. Sistem menampilkan ringkasan produk dan opsi pembayaran.
5. Pengguna memilih Rent Now Pay Later.
6. Sistem menampilkan status ketersediaan/limit dan rincian pembayaran yang relevan.
7. Pengguna meninjau informasi lalu melanjutkan atau kembali.

## 3. Screen 1 — Pilihan Product

### Sketsa Low-Fidelity

```text
┌──────────────────────────────────┐
│ ‹ Kembali       Pilih Product    │
├──────────────────────────────────┤
│ [ Cari nama product...        🔍 ]│
│                                  │
│ Kategori                          │
│ [Semua] [Fashion] [Lifestyle]    │
│ Merchant: [Pilih merchant   ▾]   │
│                                  │
│ ┌──────────────┐ ┌─────────────┐ │
│ │ GAMBAR       │ │ GAMBAR      │ │
│ │ PRODUK 1     │ │ PRODUK 2    │ │
│ └──────────────┘ └─────────────┘ │
│ Nama Product 1  Nama Product 2   │
│ Rp xxx.xxx     Rp xxx.xxx        │
│ Merchant A     Merchant B        │
│ [Lihat Detail] [Lihat Detail]    │
│                                  │
│ ┌──────────────┐ ┌─────────────┐ │
│ │ GAMBAR       │ │ GAMBAR      │ │
│ │ PRODUK 3     │ │ PRODUK 4    │ │
│ └──────────────┘ └─────────────┘ │
│ Nama Product 3  Nama Product 4   │
│ Rp xxx.xxx     Rp xxx.xxx        │
│ Merchant C     Merchant D        │
│ [Lihat Detail] [Lihat Detail]    │
├──────────────────────────────────┤
│ Beranda | Product | Transaksi    │
└──────────────────────────────────┘
```

### Komponen UI
| Komponen | Fungsi |
|---|---|
| Header dan tombol kembali | Judul dan navigasi kembali |
| Search bar | Mencari produk berdasarkan nama |
| Filter kategori | Menyaring kategori produk |
| Filter merchant | Memilih merchant |
| Product card | Gambar, nama, harga, dan merchant |
| Lihat Detail | Membuka detail produk |
| Bottom navigation | Navigasi utama aplikasi |

### Interaksi dan State
- Search bar mencari berdasarkan kata kunci.
- Filter menyaring produk sesuai kategori atau merchant.
- Kartu/tombol Lihat Detail membuka detail produk.
- **Loading:** placeholder kartu.
- **Success:** daftar produk tampil.
- **Empty:** “Produk tidak ditemukan” dengan opsi hapus filter.
- **Error:** pesan gagal memuat dan tombol coba lagi.

## 4. Screen 2 — Pilihan Rent Now Pay Later

### Sketsa Low-Fidelity

```text
┌──────────────────────────────────┐
│ ‹ Kembali   Pilihan Pembayaran   │
├──────────────────────────────────┤
│ Produk yang dipilih              │
│ ┌──────────────────────────────┐ │
│ │ [Gambar]  Nama Product       │ │
│ │           Merchant           │ │
│ │           Harga: Rp xxx.xxx  │ │
│ └──────────────────────────────┘ │
│                                  │
│ Pilih opsi yang tersedia         │
│ ┌──────────────────────────────┐ │
│ │ ( ) Rent Now Pay Later       │ │
│ │     Lihat ketentuan dan      │ │
│ │     rincian pembayaran       │ │
│ └──────────────────────────────┘ │
│                                  │
│ Informasi FlexiPay               │
│ Limit tersedia : Rp xxx.xxx     │
│ Status         : [Tersedia/...] │
│                                  │
│ Rincian pembayaran               │
│ Harga produk   : Rp xxx.xxx     │
│ Biaya layanan  : Ditampilkan*   │
│ Tenor          : Sesuai opsi*   │
│ Total bayar    : Ditampilkan*   │
│ Jadwal bayar   : Ditampilkan*   │
│                                  │
│ [ ] Saya memahami rincian dan   │
│     ketentuan pembayaran        │
│ ┌──────────────────────────────┐ │
│ │          Lanjutkan           │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

*Nilai aktual harus berasal dari sistem dan ketentuan yang berlaku, bukan angka tetap pada wireframe.*

### Komponen UI
| Komponen | Fungsi |
|---|---|
| Ringkasan produk | Menampilkan produk yang dipilih |
| Pilihan Rent Now Pay Later | Memilih opsi pada US-41 |
| Informasi limit | Menampilkan limit jika relevan |
| Status ketersediaan | Menjelaskan apakah opsi dapat digunakan |
| Rincian pembayaran | Biaya, tenor, total kewajiban, dan jadwal pembayaran |
| Checkbox persetujuan | Konfirmasi bahwa pengguna telah meninjau informasi |
| Lanjutkan | Menuju tahap berikutnya jika persyaratan terpenuhi |

### Interaksi dan State
- Pengguna memilih Rent Now Pay Later.
- Sistem memeriksa ketersediaan dan kelayakan berdasarkan ketentuan FlexiPay.
- Sistem menampilkan rincian pembayaran sebelum persetujuan.
- Tombol Lanjutkan aktif setelah opsi dipilih, informasi tersedia, dan persetujuan diwajibkan telah diberikan.
- Pengguna dapat kembali tanpa kehilangan produk yang dipilih.
- **Opsi tersedia:** opsi dapat dipilih dan rincian tampil.
- **Limit tidak mencukupi:** tampilkan pesan dan cegah kelanjutan.
- **Opsi tidak tersedia:** jelaskan bahwa opsi tidak dapat digunakan.
- **Gagal memuat rincian:** tampilkan pesan dan tombol coba lagi.
- **Siap melanjutkan:** informasi wajib tampil dan persetujuan diberikan.

## 5. Validasi dan Aturan Tampilan
- Harga terlihat pada daftar dan ringkasan produk.
- Produk berasal dari katalog/merchant yang tersedia.
- Opsi hanya dapat dipilih jika didukung produk dan merchant.
- Limit dan kelayakan berasal dari hasil sistem, bukan nilai statis.
- Biaya, tenor, total pembayaran, dan tanggal jatuh tempo ditampilkan sebelum persetujuan.
- Jangan mengasumsikan tenor, bunga, biaya, atau mekanisme sewa yang belum ditentukan.

## 6. Acceptance Criteria
- [ ] Pengguna dapat melihat daftar produk.
- [ ] Kartu produk menampilkan informasi dasar dan harga.
- [ ] Pengguna dapat mencari atau menyaring produk jika fitur tersedia.
- [ ] Pengguna dapat memilih produk dan melihat ringkasannya.
- [ ] Opsi Rent Now Pay Later ditampilkan sesuai ketersediaan.
- [ ] Status limit/kelayakan ditampilkan jika diperlukan.
- [ ] Rincian biaya dan kewajiban tersedia sebelum persetujuan.
- [ ] Pengguna tidak dapat melanjutkan jika opsi tidak tersedia atau syarat belum terpenuhi.
- [ ] Tersedia state loading, empty, dan error.
- [ ] Pengguna dapat kembali ke daftar produk.

## 7. Catatan Asumsi
Judul US-41 yang tersedia belum memastikan apakah Rent Now Pay Later merupakan opsi pembayaran, produk sewa, atau fitur tersendiri. Belum diketahui pula apakah daftar produk berasal dari katalog aplikasi, merchant tertentu, atau hasil pemindaian QRIS. Rincian aturan bisnis perlu dikonfirmasi kepada product owner. Wireframe ini adalah rancangan awal dan tidak menetapkan ketentuan bisnis yang belum diberikan.
