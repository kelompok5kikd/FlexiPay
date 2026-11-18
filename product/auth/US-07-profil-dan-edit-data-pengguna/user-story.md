# User Stories

## US-07 Profil dan Edit Data Pengguna FlexiPay

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang sudah login, **saya ingin** melihat profil dan memperbarui data akun yang diizinkan, **agar** informasi akun saya tetap sesuai dan mudah dikelola.

### Acceptance Criteria

1. **Given** pengguna sudah login, **When** pengguna membuka halaman profil, **Then** sistem menampilkan data profil yang tersimpan untuk akun tersebut.
2. **Given** pengguna belum login, **When** pengguna mencoba membuka halaman profil, **Then** sistem meminta pengguna login terlebih dahulu.
3. **Given** pengguna memilih fungsi edit profil, **When** formulir edit dibuka, **Then** sistem menampilkan data yang dapat diubah sesuai rancangan aplikasi.
4. **Given** pengguna mengubah data dengan format valid, **When** pengguna menyimpan perubahan, **Then** sistem memvalidasi dan menyimpan perubahan serta menampilkan konfirmasi berhasil.
5. **Given** pengguna mengosongkan kolom wajib atau memasukkan format yang tidak valid, **When** perubahan disimpan, **Then** sistem menolak perubahan dan menunjukkan kolom yang harus diperbaiki.
6. **Given** proses penyimpanan gagal, **When** pengguna menyimpan perubahan, **Then** sistem menampilkan pesan kegagalan dan tidak memberi konfirmasi berhasil secara keliru.
7. **Given** perubahan profil berhasil disimpan, **When** pengguna membuka kembali halaman profil, **Then** sistem menampilkan data terbaru.
8. **Given** pengguna melihat atau mengedit profil, **When** data ditampilkan, **Then** sistem hanya menampilkan informasi milik akun yang sedang login dan tidak membuka data akun pengguna lain.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-02 (data/status sesuai penyimpanan), BR-05 (umpan balik input tidak valid), BR-07 (pembatasan akses data akun).
- **Catatan:** Daftar kolom profil yang dapat diedit harus mengikuti rancangan UI/UX final dan tidak mencakup perubahan data sensitif yang belum didukung sistem.
