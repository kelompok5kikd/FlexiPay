# Wireframe — US-20: Konfirmasi Transaksi Menggunakan PIN FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** mengonfirmasi transaksi menggunakan PIN
- **Tujuan:** transaksi tidak dapat dilanjutkan hanya karena seseorang mengakses halaman akun saya
- **Prioritas:** Should
- **Ukuran:** L
- **Sprint:** 5

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-20**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Input PIN

2. Validasi PIN

3. Hasil Autentikasi

## 4. Rancangan Wireframe

### 1. Input PIN

```text
┌──────────────────────────────────────────┐
│ Input PIN                                │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Input PIN.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengonfirmasi transaksi menggunakan PIN**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Validasi PIN

```text
┌──────────────────────────────────────────┐
│ Validasi PIN                             │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Validasi PIN.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengonfirmasi transaksi menggunakan PIN**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Hasil Autentikasi

```text
┌──────────────────────────────────────────┐
│ Hasil Autentikasi                        │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Hasil Autentikasi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengonfirmasi transaksi menggunakan PIN**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** mengonfirmasi transaksi menggunakan PIN.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna telah meninjau ringkasan transaksi,  
   **Aksi:** pengguna memilih untuk mengonfirmasi,  
   **Respons UI:** sistem meminta PIN sesuai rancangan keamanan aplikasi.

2. **Kondisi:** pengguna memasukkan PIN yang benar dan sesi masih valid,  
   **Aksi:** PIN diverifikasi,  
   **Respons UI:** sistem mengizinkan proses berlanjut ke tahap berikutnya.

3. **Kondisi:** pengguna memasukkan PIN yang salah,  
   **Aksi:** PIN diverifikasi,  
   **Respons UI:** sistem menolak konfirmasi dan menampilkan pesan yang tidak membocorkan informasi sensitif.

4. **Kondisi:** pengguna belum membuat PIN atau PIN tidak tersedia,  
   **Aksi:** pengguna mencoba mengonfirmasi transaksi,  
   **Respons UI:** sistem meminta pengguna menyelesaikan pengaturan PIN terlebih dahulu atau menghentikan proses sesuai aturan aplikasi.

5. **Kondisi:** terjadi beberapa percobaan PIN yang gagal,  
   **Aksi:** batas percobaan yang ditetapkan tercapai,  
   **Respons UI:** sistem menerapkan pembatasan atau penundaan sesuai kebijakan keamanan yang telah dikonfigurasi.

6. **Kondisi:** PIN dimasukkan,  
   **Aksi:** data diproses atau disimpan,  
   **Respons UI:** PIN tidak ditampilkan sebagai teks biasa atau disimpan dalam bentuk teks biasa.

7. **Kondisi:** pengguna membatalkan konfirmasi,  
   **Aksi:** pembatalan dipilih,  
   **Respons UI:** proses transaksi dihentikan dan tidak ditandai berhasil.

8. **Kondisi:** pembayaran belum terhubung dengan penyedia pembayaran nyata,  
   **Aksi:** PIN berhasil diverifikasi,  
   **Respons UI:** sistem hanya melanjutkan alur prototipe dan tidak menyatakan pembayaran telah berhasil.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-20 — Konfirmasi Transaksi Menggunakan PIN FlexiPay.
- **Dokumen:** `user stories/US-20_*.md` dalam ZIP User Story FlexiPay.
