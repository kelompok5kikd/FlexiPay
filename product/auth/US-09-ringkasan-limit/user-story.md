# User Stories

## US-09 Ringkasan Limit, Transaksi, dan Tagihan

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang sudah login, **saya ingin** melihat ringkasan limit, transaksi, dan tagihan, **agar** saya dapat memantau informasi penggunaan layanan dari satu tempat.

### Acceptance Criteria

1. **Given** pengguna sudah login dan membuka dashboard, **When** data tersedia, **Then** sistem menampilkan ringkasan limit, transaksi, dan tagihan sesuai data akun.
2. **Given** informasi limit tersedia, **When** ringkasan ditampilkan, **Then** sistem menampilkan nominal limit dalam format Rupiah yang konsisten.
3. **Given** informasi transaksi tersedia, **When** ringkasan ditampilkan, **Then** sistem menampilkan ringkasan transaksi beserta status yang sesuai data.
4. **Given** informasi tagihan tersedia, **When** ringkasan ditampilkan, **Then** sistem menampilkan total atau ringkasan tagihan yang dapat dibedakan dari transaksi lainnya.
5. **Given** salah satu jenis data belum tersedia, **When** ringkasan dimuat, **Then** sistem menampilkan keadaan kosong atau keterangan belum tersedia untuk bagian tersebut.
6. **Given** data transaksi atau tagihan menggunakan data dummy, **When** ringkasan ditampilkan, **Then** informasi tidak diklaim sebagai data keuangan nyata.
7. **Given** pengguna membuka ringkasan, **When** data sedang dimuat atau terjadi kegagalan, **Then** sistem menampilkan indikator pemuatan atau pesan kegagalan yang jelas dan tidak mengganti data dengan nilai yang menyesatkan.
8. **Given** pengguna sedang login, **When** ringkasan dimuat, **Then** hanya data yang sesuai dengan akun pengguna yang ditampilkan.

### Referensi

- **PRD:** Bagian 4 Tujuan dan Metrik, Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-07 (akses data sesuai akun).
