# User Stories

## US-36 Customer Support FlexiPay

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 8
- **Sebagai** pengguna FlexiPay, **saya ingin** mengakses customer support melalui kanal bantuan yang tersedia, **agar** saya dapat memperoleh bantuan ketika mengalami kendala penggunaan aplikasi atau transaksi.

### Acceptance Criteria

1. **Given** pengguna membuka bagian customer support, **When** halaman dimuat, **Then** sistem menampilkan kanal bantuan yang benar-benar tersedia dan jam layanan jika telah ditetapkan.
2. **Given** kanal bantuan tersedia, **When** pengguna memilih salah satu kanal, **Then** sistem membuka kanal atau menampilkan instruksi penggunaan yang sesuai.
3. **Given** pengguna ingin menjelaskan kendala, **When** formulir bantuan tersedia dan dikirim dengan data valid, **Then** sistem menampilkan konfirmasi bahwa permintaan telah diterima.
4. **Given** kolom wajib pada formulir belum lengkap, **When** pengguna mengirim permintaan, **Then** sistem menolak pengiriman dan menunjukkan kolom yang perlu diperbaiki.
5. **Given** kanal bantuan sedang tidak tersedia, **When** pengguna membuka halaman, **Then** sistem menjelaskan kondisi tersebut dan menampilkan alternatif jika ada.
6. **Given** sistem belum terhubung dengan layanan customer support, **When** pengguna membuka fitur, **Then** sistem tidak mengklaim pesan telah diterima petugas dan memberi label demo atau menampilkan kanal yang valid.
7. **Given** permintaan bantuan berisi data pribadi, **When** data dikirim, **Then** sistem hanya meminta informasi yang diperlukan dan membatasi akses sesuai kewenangan.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Catatan:** Kanal dukungan, jam operasional, dan alur penanganan perlu ditetapkan oleh tim produk.
