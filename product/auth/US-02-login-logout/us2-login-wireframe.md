# Wireframe — US-02: Login dan Logout FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah memiliki akun
- **Kebutuhan:** login dan logout dengan aman
- **Tujuan:** saya dapat mengakses halaman akun dan mengakhiri sesi ketika selesai menggunakan aplikasi
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 2

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-02**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Login

2. Beranda Setelah Login

3. Konfirmasi Logout

## 4. Rancangan Wireframe

### 1. Login

```text
┌──────────────────────────────────────────┐
│ Login                                    │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Login.
- Konten utama: informasi yang diperlukan untuk kebutuhan **login dan logout dengan aman**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Beranda Setelah Login

```text
┌──────────────────────────────────────────┐
│ Beranda Setelah Login                    │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Beranda Setelah Login.
- Konten utama: informasi yang diperlukan untuk kebutuhan **login dan logout dengan aman**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Konfirmasi Logout

```text
┌──────────────────────────────────────────┐
│ Konfirmasi Logout                        │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Konfirmasi Logout.
- Konten utama: informasi yang diperlukan untuk kebutuhan **login dan logout dengan aman**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** login dan logout dengan aman.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berada di halaman login,  
   **Aksi:** pengguna memasukkan kredensial yang valid dan menekan tombol Login,  
   **Respons UI:** sistem memverifikasi data dan mengarahkan pengguna ke halaman utama setelah autentikasi berhasil.

2. **Kondisi:** pengguna memasukkan email atau kata sandi yang tidak valid,  
   **Aksi:** pengguna menekan tombol Login,  
   **Respons UI:** sistem menolak login dan menampilkan pesan kesalahan yang jelas tanpa membocorkan kredensial.

3. **Kondisi:** pengguna belum mengisi kolom wajib,  
   **Aksi:** pengguna menekan tombol Login,  
   **Respons UI:** sistem meminta pengguna melengkapi kolom yang diperlukan.

4. **Kondisi:** autentikasi gagal,  
   **Aksi:** pesan kesalahan ditampilkan,  
   **Respons UI:** kata sandi tidak ditampilkan kembali dalam bentuk teks biasa dan pengguna dapat mencoba lagi.

5. **Kondisi:** pengguna sudah login,  
   **Aksi:** pengguna memilih Logout dan mengonfirmasi jika konfirmasi tersedia,  
   **Respons UI:** sistem mengakhiri sesi pengguna dan mengarahkan pengguna ke halaman publik atau login.

6. **Kondisi:** pengguna sudah logout,  
   **Aksi:** pengguna mencoba membuka halaman yang memerlukan autentikasi melalui sesi sebelumnya,  
   **Respons UI:** sistem tidak memberikan akses menggunakan sesi yang telah berakhir.

7. **Kondisi:** pengguna sedang login,  
   **Aksi:** pengguna memuat ulang halaman,  
   **Respons UI:** status sesi ditangani secara konsisten sesuai mekanisme autentikasi yang digunakan aplikasi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-02 — Login dan Logout FlexiPay.
- **Dokumen:** `user stories/US-02_*.md` dalam ZIP User Story FlexiPay.
