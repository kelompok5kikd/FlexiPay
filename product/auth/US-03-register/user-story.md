# User Stories

## US-03 Register Akun FlexiPay

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 2
- **Sebagai** calon pengguna FlexiPay, **saya ingin** membuat akun melalui formulir registrasi, **agar** saya dapat memiliki akun untuk mengakses fitur aplikasi yang memerlukan login.

### Acceptance Criteria

1. **Given** calon pengguna membuka halaman registrasi, **When** halaman selesai dimuat, **Then** sistem menampilkan formulir dengan kolom wajib yang ditetapkan, seperti nama lengkap, email, kata sandi, dan konfirmasi kata sandi jika digunakan pada rancangan.
2. **Given** calon pengguna mengisi semua kolom wajib dengan format yang valid, **When** pengguna mengirim formulir registrasi, **Then** sistem memvalidasi data sebelum membuat akun.
3. **Given** pengguna memasukkan email dengan format tidak valid, **When** formulir dikirim, **Then** sistem menolak data tersebut dan menampilkan pesan kesalahan pada kolom terkait.
4. **Given** kata sandi dan konfirmasi kata sandi tidak cocok, **When** pengguna mengirim formulir, **Then** sistem menolak registrasi dan meminta pengguna memperbaiki konfirmasi kata sandi.
5. **Given** email yang dimasukkan sudah terdaftar, **When** pengguna mengirim formulir, **Then** sistem tidak membuat akun duplikat dan menampilkan pesan yang sesuai.
6. **Given** semua data valid dan email belum terdaftar, **When** pengguna menyelesaikan registrasi, **Then** sistem menyimpan akun dan menampilkan konfirmasi bahwa registrasi berhasil.
7. **Given** registrasi berhasil, **When** sistem menampilkan hasil, **Then** pengguna mendapat arahan untuk login atau diarahkan ke halaman berikutnya sesuai alur aplikasi.
8. **Given** registrasi gagal karena kesalahan validasi atau penyimpanan, **When** kegagalan terjadi, **Then** sistem menampilkan pesan yang mudah dipahami dan tidak menyatakan akun berhasil dibuat.
9. **Given** kata sandi dimasukkan pada formulir, **When** data akun diproses atau disimpan, **Then** kata sandi tidak disimpan dalam bentuk teks biasa.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-05 (umpan balik input tidak valid), BR-07 (penggunaan data akun sesuai kebutuhan).
- **Catatan:** Kolom registrasi final, mekanisme verifikasi email, dan kebijakan kata sandi mengikuti keputusan tim serta implementasi aplikasi. Verifikasi identitas/KYC sungguhan tidak termasuk MVP berdasarkan PRD.
