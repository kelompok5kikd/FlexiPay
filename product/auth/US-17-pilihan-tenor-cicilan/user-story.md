# User Stories

## US-17 Pilihan Tenor Cicilan FlexiPay

- **Prioritas:** Could | **Ukuran:** M | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat dan memilih tenor cicilan yang tersedia, **agar** saya dapat memahami opsi jangka waktu pembayaran dan estimasi cicilan sebelum melanjutkan.

### Acceptance Criteria

1. **Given** pengguna berada pada tahap pemilihan tenor, **When** halaman ditampilkan, **Then** sistem menampilkan pilihan tenor yang tersedia pada konfigurasi atau data simulasi.
2. **Given** pilihan tenor ditampilkan, **When** pengguna memilih salah satu tenor, **Then** sistem menandai pilihan yang dipilih secara jelas.
3. **Given** pengguna memilih tenor yang tersedia, **When** ringkasan diperbarui, **Then** sistem menampilkan tenor terpilih dan estimasi cicilan hanya jika data perhitungan yang diperlukan tersedia.
4. **Given** pengguna belum memilih tenor dan pilihan diwajibkan, **When** pengguna mencoba melanjutkan, **Then** sistem meminta pengguna memilih tenor terlebih dahulu.
5. **Given** tenor yang dipilih tidak tersedia atau tidak valid, **When** pengguna mencoba melanjutkan, **Then** sistem menolak pilihan tersebut dan menampilkan pesan yang sesuai.
6. **Given** estimasi cicilan atau biaya belum didukung perhitungan yang disepakati, **When** pilihan tenor ditampilkan, **Then** sistem tidak mengarang nilai cicilan, bunga, biaya, atau total pembayaran.
7. **Given** pilihan tenor merupakan simulasi, **When** pengguna melihat hasilnya, **Then** sistem menjelaskan bahwa nilai dan pilihan tersebut bukan penawaran kredit nyata.
8. **Given** pengguna membatalkan proses sebelum konfirmasi akhir, **When** pembatalan dipilih, **Then** sistem tidak membuat status transaksi atau pembiayaan berhasil.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik input tidak valid), BR-06 (tidak mengklaim proses nyata tanpa integrasi).
- **Catatan:** Perhitungan cicilan, biaya, dan tenor yang mengikat memerlukan aturan bisnis resmi yang belum ditetapkan dalam PRD awal.
