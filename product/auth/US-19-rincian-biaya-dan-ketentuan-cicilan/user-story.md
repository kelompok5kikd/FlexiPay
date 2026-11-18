# User Stories

## US-19 Rincian Biaya dan Ketentuan Cicilan FlexiPay

- **Prioritas:** Could | **Ukuran:** M | **Sprint:** 5
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat rincian biaya dan ketentuan cicilan, **agar** saya dapat memahami komponen pembayaran sebelum melanjutkan transaksi.

### Acceptance Criteria

1. **Given** pengguna membuka rincian biaya dan ketentuan cicilan, **When** halaman ditampilkan, **Then** sistem menampilkan komponen biaya dan ketentuan yang telah ditetapkan pada konfigurasi atau data prototipe.
2. **Given** nominal biaya tersedia, **When** rincian ditampilkan, **Then** seluruh nominal menggunakan format Rupiah yang konsisten.
3. **Given** terdapat komponen seperti pokok, biaya layanan, atau komponen lain yang telah disahkan dalam aturan produk, **When** rincian ditampilkan, **Then** setiap komponen dijelaskan secara terpisah dan totalnya sesuai perhitungan yang ditetapkan.
4. **Given** informasi biaya atau ketentuan belum ditentukan, **When** pengguna membuka halaman, **Then** sistem tidak mengarang tarif, denda, bunga, atau biaya lain dan menampilkan keterangan bahwa informasi belum tersedia.
5. **Given** ketentuan cicilan ditampilkan, **When** pengguna meninjau informasi, **Then** sistem menyajikan tenor, jadwal pembayaran, dan ketentuan relevan hanya jika data tersebut telah ditetapkan.
6. **Given** biaya atau ketentuan menggunakan data simulasi, **When** informasi ditampilkan, **Then** sistem memberi label bahwa data merupakan contoh dan bukan penawaran final.
7. **Given** pengguna melanjutkan ke tahap berikutnya, **When** konfirmasi ditampilkan, **Then** pengguna dapat meninjau rincian yang sama sebelum menyetujui transaksi.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (data sesuai konfigurasi), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim ketentuan finansial nyata tanpa dasar dan integrasi).
- **Catatan:** Tarif dan ketentuan final harus mengikuti keputusan produk serta persyaratan mitra pembiayaan yang berlaku.
