# Wireframe — US-26: Bukti Pembayaran dan Penanganan Transaksi Gagal

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal
- **Tujuan:** saya memiliki catatan pembayaran serta mengetahui langkah berikutnya jika terjadi masalah
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 6

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-26**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Hasil Transaksi

2. Detail Bukti Pembayaran

3. Penanganan Transaksi Gagal

## 4. Rancangan Wireframe

### 1. Hasil Transaksi

```text
┌──────────────────────────────────────────┐
│ Hasil Transaksi                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Hasil Transaksi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Bukti Pembayaran

```text
┌──────────────────────────────────────────┐
│ Detail Bukti Pembayaran                  │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Bukti Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Penanganan Transaksi Gagal

```text
┌──────────────────────────────────────────┐
│ Penanganan Transaksi Gagal               │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Penanganan Transaksi Gagal.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pembayaran telah dikonfirmasi berhasil oleh sumber status yang valid,  
   **Aksi:** pengguna membuka detail transaksi,  
   **Respons UI:** sistem menampilkan bukti atau ringkasan pembayaran dengan informasi yang tersedia, seperti nomor referensi, tanggal, nominal, dan status.

2. **Kondisi:** pembayaran masih menunggu konfirmasi,  
   **Aksi:** pengguna membuka detail transaksi,  
   **Respons UI:** sistem tidak menerbitkan bukti yang menyatakan pembayaran berhasil.

3. **Kondisi:** transaksi gagal atau dibatalkan,  
   **Aksi:** status ditampilkan,  
   **Respons UI:** sistem menjelaskan bahwa pembayaran belum berhasil dan memberikan arahan yang sesuai jika tersedia.

4. **Kondisi:** transaksi gagal karena gangguan sementara,  
   **Aksi:** pengguna melihat informasi kegagalan,  
   **Respons UI:** sistem dapat menyediakan opsi mencoba kembali hanya jika aman dan didukung, tanpa membuat transaksi ganda.

5. **Kondisi:** sistem belum menerima konfirmasi final dari penyedia pembayaran,  
   **Aksi:** pengguna memeriksa transaksi,  
   **Respons UI:** sistem menampilkan status menunggu verifikasi dan tidak menyimpulkan pembayaran gagal atau berhasil tanpa dasar.

6. **Kondisi:** bukti pembayaran berasal dari data simulasi,  
   **Aksi:** bukti ditampilkan,  
   **Respons UI:** sistem memberi label simulasi dan tidak menyatakannya sebagai bukti pembayaran resmi.

7. **Kondisi:** pengguna membuka detail transaksi,  
   **Aksi:** sistem memuat data,  
   **Respons UI:** hanya informasi transaksi milik akun pengguna yang ditampilkan.

8. **Kondisi:** bukti gagal dimuat atau tidak tersedia,  
   **Aksi:** pengguna membuka halaman,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan tidak membuat bukti palsu.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-26 — Bukti Pembayaran dan Penanganan Transaksi Gagal.
- **Dokumen:** `user stories/US-26_*.md` dalam ZIP User Story FlexiPay.
