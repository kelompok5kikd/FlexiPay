# User Stories

## US-20 Konfirmasi Transaksi Menggunakan PIN FlexiPay

- **Prioritas:** Should | **Ukuran:** L | **Sprint:** 5
- **Sebagai** pengguna FlexiPay, **saya ingin** mengonfirmasi transaksi menggunakan PIN, **agar** transaksi tidak dapat dilanjutkan hanya karena seseorang mengakses halaman akun saya.

### Acceptance Criteria

1. **Given** pengguna telah meninjau ringkasan transaksi, **When** pengguna memilih untuk mengonfirmasi, **Then** sistem meminta PIN sesuai rancangan keamanan aplikasi.
2. **Given** pengguna memasukkan PIN yang benar dan sesi masih valid, **When** PIN diverifikasi, **Then** sistem mengizinkan proses berlanjut ke tahap berikutnya.
3. **Given** pengguna memasukkan PIN yang salah, **When** PIN diverifikasi, **Then** sistem menolak konfirmasi dan menampilkan pesan yang tidak membocorkan informasi sensitif.
4. **Given** pengguna belum membuat PIN atau PIN tidak tersedia, **When** pengguna mencoba mengonfirmasi transaksi, **Then** sistem meminta pengguna menyelesaikan pengaturan PIN terlebih dahulu atau menghentikan proses sesuai aturan aplikasi.
5. **Given** terjadi beberapa percobaan PIN yang gagal, **When** batas percobaan yang ditetapkan tercapai, **Then** sistem menerapkan pembatasan atau penundaan sesuai kebijakan keamanan yang telah dikonfigurasi.
6. **Given** PIN dimasukkan, **When** data diproses atau disimpan, **Then** PIN tidak ditampilkan sebagai teks biasa atau disimpan dalam bentuk teks biasa.
7. **Given** pengguna membatalkan konfirmasi, **When** pembatalan dipilih, **Then** proses transaksi dihentikan dan tidak ditandai berhasil.
8. **Given** pembayaran belum terhubung dengan penyedia pembayaran nyata, **When** PIN berhasil diverifikasi, **Then** sistem hanya melanjutkan alur prototipe dan tidak menyatakan pembayaran telah berhasil.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai hasil), BR-05 (umpan balik input tidak valid), BR-06 (tidak mengklaim transaksi nyata tanpa integrasi), BR-07 (akses dan data akun dibatasi).
- **Catatan:** Kebijakan panjang PIN, batas percobaan, dan mekanisme penyimpanan harus ditetapkan dalam spesifikasi keamanan aplikasi.
