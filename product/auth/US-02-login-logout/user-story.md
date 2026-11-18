# User Stories

## US-02 Login dan Logout FlexiPay

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 2
- **Sebagai** pengguna FlexiPay yang sudah memiliki akun, **saya ingin** login dan logout dengan aman, **agar** saya dapat mengakses halaman akun dan mengakhiri sesi ketika selesai menggunakan aplikasi.

### Acceptance Criteria

1. **Given** pengguna berada di halaman login, **When** pengguna memasukkan kredensial yang valid dan menekan tombol Login, **Then** sistem memverifikasi data dan mengarahkan pengguna ke halaman utama setelah autentikasi berhasil.
2. **Given** pengguna memasukkan email atau kata sandi yang tidak valid, **When** pengguna menekan tombol Login, **Then** sistem menolak login dan menampilkan pesan kesalahan yang jelas tanpa membocorkan kredensial.
3. **Given** pengguna belum mengisi kolom wajib, **When** pengguna menekan tombol Login, **Then** sistem meminta pengguna melengkapi kolom yang diperlukan.
4. **Given** autentikasi gagal, **When** pesan kesalahan ditampilkan, **Then** kata sandi tidak ditampilkan kembali dalam bentuk teks biasa dan pengguna dapat mencoba lagi.
5. **Given** pengguna sudah login, **When** pengguna memilih Logout dan mengonfirmasi jika konfirmasi tersedia, **Then** sistem mengakhiri sesi pengguna dan mengarahkan pengguna ke halaman publik atau login.
6. **Given** pengguna sudah logout, **When** pengguna mencoba membuka halaman yang memerlukan autentikasi melalui sesi sebelumnya, **Then** sistem tidak memberikan akses menggunakan sesi yang telah berakhir.
7. **Given** pengguna sedang login, **When** pengguna memuat ulang halaman, **Then** status sesi ditangani secara konsisten sesuai mekanisme autentikasi yang digunakan aplikasi.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-05 (umpan balik input tidak valid), BR-07 (pembatasan akses data akun).
- **Catatan:** Implementasi autentikasi harus mengikuti mekanisme yang benar-benar digunakan pada aplikasi. Kriteria sesi setelah reload disesuaikan dengan rancangan teknis final.
