# Wireframe — US-14: Validasi QRIS dan Konfirmasi Merchant

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan
- **Tujuan:** saya dapat memastikan detail merchant sesuai dengan tujuan pembayaran
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-14**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Daftar Merchant

2. Pencarian/Filter Merchant

3. Detail Merchant

## 4. Rancangan Wireframe

### 1. Daftar Merchant

```text
┌──────────────────────────────────────────┐
│ Daftar Merchant                          │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Daftar Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Pencarian/Filter Merchant

```text
┌──────────────────────────────────────────┐
│ Pencarian/Filter Merchant                │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pencarian/Filter Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Merchant

```text
┌──────────────────────────────────────────┐
│ Detail Merchant                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna telah memindai atau memilih contoh kode QRIS,  
   **Aksi:** hasil pemindaian tersedia,  
   **Respons UI:** sistem memeriksa apakah data QR memiliki format yang didukung oleh aplikasi atau simulasi.

2. **Kondisi:** data QR valid dan berisi informasi merchant yang dapat dibaca,  
   **Aksi:** validasi selesai,  
   **Respons UI:** sistem menampilkan informasi merchant yang tersedia untuk diperiksa pengguna.

3. **Kondisi:** data QR tidak valid, tidak lengkap, atau tidak didukung,  
   **Aksi:** validasi dilakukan,  
   **Respons UI:** sistem menolak melanjutkan alur dan menampilkan pesan kesalahan yang jelas.

4. **Kondisi:** informasi merchant ditampilkan,  
   **Aksi:** pengguna meninjau detailnya,  
   **Respons UI:** sistem memberi pilihan untuk melanjutkan atau membatalkan sebelum masuk ke tahap berikutnya.

5. **Kondisi:** pengguna membatalkan proses,  
   **Aksi:** pembatalan dipilih,  
   **Respons UI:** sistem menghentikan alur pembayaran dan kembali ke halaman yang sesuai tanpa menyatakan transaksi berhasil.

6. **Kondisi:** QRIS atau merchant hanya berupa data demo,  
   **Aksi:** hasil validasi ditampilkan,  
   **Respons UI:** sistem tidak menyatakan bahwa merchant atau kode QR telah diverifikasi oleh jaringan pembayaran resmi.

7. **Kondisi:** validasi gagal karena masalah pemrosesan,  
   **Aksi:** kegagalan terjadi,  
   **Respons UI:** sistem menampilkan status gagal dan tidak mengarahkan pengguna ke konfirmasi pembayaran seolah-olah validasi berhasil.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-14 — Validasi QRIS dan Konfirmasi Merchant.
- **Dokumen:** `user stories/US-14_*.md` dalam ZIP User Story FlexiPay.
