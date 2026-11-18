# Wireframe — US-13: Scan QRIS untuk Pembayaran

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** memindai kode QRIS pada merchant
- **Tujuan:** saya dapat memulai alur pembayaran melalui QRIS menggunakan FlexiPay
- **Prioritas:** Should
- **Ukuran:** L
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-13**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Pemindai/Pilih QRIS

2. Validasi QRIS

3. Konfirmasi Merchant

## 4. Rancangan Wireframe

### 1. Pemindai/Pilih QRIS

```text
┌──────────────────────────────────────────┐
│ Pemindai/Pilih QRIS                      │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pemindai/Pilih QRIS.
- Konten utama: informasi yang diperlukan untuk kebutuhan **memindai kode QRIS pada merchant**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Validasi QRIS

```text
┌──────────────────────────────────────────┐
│ Validasi QRIS                            │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Validasi QRIS.
- Konten utama: informasi yang diperlukan untuk kebutuhan **memindai kode QRIS pada merchant**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Konfirmasi Merchant

```text
┌──────────────────────────────────────────┐
│ Konfirmasi Merchant                      │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Konfirmasi Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **memindai kode QRIS pada merchant**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** memindai kode QRIS pada merchant.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login dan membuka fitur scan QRIS,  
   **Aksi:** halaman scan ditampilkan,  
   **Respons UI:** sistem menampilkan antarmuka pemindaian atau simulasi pemindaian sesuai kemampuan MVP.

2. **Kondisi:** perangkat dan aplikasi mendukung akses kamera,  
   **Aksi:** pengguna memberikan izin kamera dan memulai pemindaian,  
   **Respons UI:** sistem dapat memproses kode QR yang didukung.

3. **Kondisi:** pengguna menolak izin kamera atau kamera tidak tersedia,  
   **Aksi:** fitur scan dibuka,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan pilihan alternatif jika tersedia.

4. **Kondisi:** kode QR berhasil terbaca,  
   **Aksi:** hasil pemindaian diproses,  
   **Respons UI:** sistem meneruskan informasi QR ke tahap validasi sebelum pembayaran dilanjutkan.

5. **Kondisi:** kode QR tidak terbaca atau formatnya tidak didukung,  
   **Aksi:** pemindaian diproses,  
   **Respons UI:** sistem menampilkan pesan gagal dan memberi kesempatan untuk mencoba kembali.

6. **Kondisi:** MVP belum terhubung dengan layanan QRIS atau penyedia pembayaran,  
   **Aksi:** pengguna menjalankan fitur scan,  
   **Respons UI:** sistem menandai proses sebagai simulasi dan tidak mengklaim pembayaran nyata telah dimulai.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-13 — Scan QRIS untuk Pembayaran.
- **Dokumen:** `user stories/US-13_*.md` dalam ZIP User Story FlexiPay.
