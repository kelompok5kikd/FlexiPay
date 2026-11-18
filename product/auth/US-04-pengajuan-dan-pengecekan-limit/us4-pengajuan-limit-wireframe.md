# Wireframe — US-04: Pengajuan dan Pengecekan Limit FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah memiliki akun
- **Kebutuhan:** mengajukan layanan dan melihat informasi limit yang tersedia
- **Tujuan:** saya mengetahui apakah saya dapat menggunakan layanan FlexiPay dan berapa limit yang ditampilkan untuk akun saya
- **Prioritas:** Must
- **Ukuran:** L
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-04**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Ringkasan Limit

2. Form Pengajuan Limit

3. Hasil Pengajuan

## 4. Rancangan Wireframe

### 1. Ringkasan Limit

```text
┌──────────────────────────────────────────┐
│ Ringkasan Limit                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Limit.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengajukan layanan dan melihat informasi limit yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Form Pengajuan Limit

```text
┌──────────────────────────────────────────┐
│ Form Pengajuan Limit                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Form Pengajuan Limit.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengajukan layanan dan melihat informasi limit yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Hasil Pengajuan

```text
┌──────────────────────────────────────────┐
│ Hasil Pengajuan                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Hasil Pengajuan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengajukan layanan dan melihat informasi limit yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** mengajukan layanan dan melihat informasi limit yang tersedia.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login,  
   **Aksi:** pengguna membuka fitur pengajuan FlexiPay,  
   **Respons UI:** sistem menampilkan informasi dan langkah pengajuan yang tersedia.

2. **Kondisi:** pengguna belum login,  
   **Aksi:** pengguna mencoba membuka fitur pengajuan yang memerlukan akun,  
   **Respons UI:** sistem meminta pengguna login terlebih dahulu.

3. **Kondisi:** pengguna mengisi seluruh data pengajuan yang diwajibkan pada prototipe,  
   **Aksi:** pengguna mengirim pengajuan,  
   **Respons UI:** sistem memvalidasi kelengkapan dan format data sebelum melanjutkan.

4. **Kondisi:** data pengajuan belum lengkap atau formatnya tidak valid,  
   **Aksi:** pengguna mengirim pengajuan,  
   **Respons UI:** sistem menolak pengiriman dan menunjukkan bagian yang harus diperbaiki.

5. **Kondisi:** data pengajuan valid,  
   **Aksi:** pengguna mengirim pengajuan pada MVP,  
   **Respons UI:** sistem menyimpan atau menampilkan status pengajuan sesuai kemampuan prototipe dan tidak mengklaim adanya keputusan kredit nyata jika belum terintegrasi.

6. **Kondisi:** informasi limit tersedia untuk akun pengguna,  
   **Aksi:** pengguna membuka halaman limit,  
   **Respons UI:** sistem menampilkan nilai limit dan informasi pemakaian yang tersedia dengan format Rupiah yang konsisten.

7. **Kondisi:** informasi limit belum tersedia,  
   **Aksi:** pengguna membuka halaman limit,  
   **Respons UI:** sistem menampilkan status belum tersedia atau instruksi yang sesuai, bukan angka yang menyesatkan.

8. **Kondisi:** limit ditampilkan berdasarkan data dummy,  
   **Aksi:** pengguna melihat informasi limit,  
   **Respons UI:** tampilan memberi konteks yang jelas bahwa data tersebut merupakan simulasi jika diperlukan untuk mencegah salah paham.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-04 — Pengajuan dan Pengecekan Limit FlexiPay.
- **Dokumen:** `user stories/US-04_*.md` dalam ZIP User Story FlexiPay.
