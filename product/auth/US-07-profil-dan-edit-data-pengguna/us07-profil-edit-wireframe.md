# Wireframe — US-07: Profil dan Edit Data Pengguna FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah login
- **Kebutuhan:** melihat profil dan memperbarui data akun yang diizinkan
- **Tujuan:** informasi akun saya tetap sesuai dan mudah dikelola
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-07**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Profil Pengguna

2. Edit Data Profil

3. Konfirmasi Perubahan

## 4. Rancangan Wireframe

### 1. Profil Pengguna

```text
┌──────────────────────────────────────────┐
│ Profil Pengguna                          │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Profil Pengguna.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat profil dan memperbarui data akun yang diizinkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Edit Data Profil

```text
┌──────────────────────────────────────────┐
│ Edit Data Profil                         │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Edit Data Profil.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat profil dan memperbarui data akun yang diizinkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Konfirmasi Perubahan

```text
┌──────────────────────────────────────────┐
│ Konfirmasi Perubahan                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Konfirmasi Perubahan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat profil dan memperbarui data akun yang diizinkan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat profil dan memperbarui data akun yang diizinkan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login,  
   **Aksi:** pengguna membuka halaman profil,  
   **Respons UI:** sistem menampilkan data profil yang tersimpan untuk akun tersebut.

2. **Kondisi:** pengguna belum login,  
   **Aksi:** pengguna mencoba membuka halaman profil,  
   **Respons UI:** sistem meminta pengguna login terlebih dahulu.

3. **Kondisi:** pengguna memilih fungsi edit profil,  
   **Aksi:** formulir edit dibuka,  
   **Respons UI:** sistem menampilkan data yang dapat diubah sesuai rancangan aplikasi.

4. **Kondisi:** pengguna mengubah data dengan format valid,  
   **Aksi:** pengguna menyimpan perubahan,  
   **Respons UI:** sistem memvalidasi dan menyimpan perubahan serta menampilkan konfirmasi berhasil.

5. **Kondisi:** pengguna mengosongkan kolom wajib atau memasukkan format yang tidak valid,  
   **Aksi:** perubahan disimpan,  
   **Respons UI:** sistem menolak perubahan dan menunjukkan kolom yang harus diperbaiki.

6. **Kondisi:** proses penyimpanan gagal,  
   **Aksi:** pengguna menyimpan perubahan,  
   **Respons UI:** sistem menampilkan pesan kegagalan dan tidak memberi konfirmasi berhasil secara keliru.

7. **Kondisi:** perubahan profil berhasil disimpan,  
   **Aksi:** pengguna membuka kembali halaman profil,  
   **Respons UI:** sistem menampilkan data terbaru.

8. **Kondisi:** pengguna melihat atau mengedit profil,  
   **Aksi:** data ditampilkan,  
   **Respons UI:** sistem hanya menampilkan informasi milik akun yang sedang login dan tidak membuka data akun pengguna lain.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-07 — Profil dan Edit Data Pengguna FlexiPay.
- **Dokumen:** `user stories/US-07_*.md` dalam ZIP User Story FlexiPay.
