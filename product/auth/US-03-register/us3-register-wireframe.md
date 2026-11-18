# Wireframe — US-03: Register Akun FlexiPay

## 1. Informasi User Story

- **Aktor:** calon pengguna FlexiPay
- **Kebutuhan:** membuat akun melalui formulir registrasi
- **Tujuan:** saya dapat memiliki akun untuk mengakses fitur aplikasi yang memerlukan login
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 2

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-03**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Form Registrasi

2. Verifikasi Data

3. Registrasi Berhasil

## 4. Rancangan Wireframe

### 1. Form Registrasi

```text
┌──────────────────────────────────────────┐
│ Form Registrasi                          │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Form Registrasi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membuat akun melalui formulir registrasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Verifikasi Data

```text
┌──────────────────────────────────────────┐
│ Verifikasi Data                          │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Verifikasi Data.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membuat akun melalui formulir registrasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Registrasi Berhasil

```text
┌──────────────────────────────────────────┐
│ Registrasi Berhasil                      │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Registrasi Berhasil.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membuat akun melalui formulir registrasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** membuat akun melalui formulir registrasi.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** calon pengguna membuka halaman registrasi,  
   **Aksi:** halaman selesai dimuat,  
   **Respons UI:** sistem menampilkan formulir dengan kolom wajib yang ditetapkan, seperti nama lengkap, email, kata sandi, dan konfirmasi kata sandi jika digunakan pada rancangan.

2. **Kondisi:** calon pengguna mengisi semua kolom wajib dengan format yang valid,  
   **Aksi:** pengguna mengirim formulir registrasi,  
   **Respons UI:** sistem memvalidasi data sebelum membuat akun.

3. **Kondisi:** pengguna memasukkan email dengan format tidak valid,  
   **Aksi:** formulir dikirim,  
   **Respons UI:** sistem menolak data tersebut dan menampilkan pesan kesalahan pada kolom terkait.

4. **Kondisi:** kata sandi dan konfirmasi kata sandi tidak cocok,  
   **Aksi:** pengguna mengirim formulir,  
   **Respons UI:** sistem menolak registrasi dan meminta pengguna memperbaiki konfirmasi kata sandi.

5. **Kondisi:** email yang dimasukkan sudah terdaftar,  
   **Aksi:** pengguna mengirim formulir,  
   **Respons UI:** sistem tidak membuat akun duplikat dan menampilkan pesan yang sesuai.

6. **Kondisi:** semua data valid dan email belum terdaftar,  
   **Aksi:** pengguna menyelesaikan registrasi,  
   **Respons UI:** sistem menyimpan akun dan menampilkan konfirmasi bahwa registrasi berhasil.

7. **Kondisi:** registrasi berhasil,  
   **Aksi:** sistem menampilkan hasil,  
   **Respons UI:** pengguna mendapat arahan untuk login atau diarahkan ke halaman berikutnya sesuai alur aplikasi.

8. **Kondisi:** registrasi gagal karena kesalahan validasi atau penyimpanan,  
   **Aksi:** kegagalan terjadi,  
   **Respons UI:** sistem menampilkan pesan yang mudah dipahami dan tidak menyatakan akun berhasil dibuat.

9. **Kondisi:** kata sandi dimasukkan pada formulir,  
   **Aksi:** data akun diproses atau disimpan,  
   **Respons UI:** kata sandi tidak disimpan dalam bentuk teks biasa.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-03 — Register Akun FlexiPay.
- **Dokumen:** `user stories/US-03_*.md` dalam ZIP User Story FlexiPay.
