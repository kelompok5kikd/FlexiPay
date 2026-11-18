# User Stories

## US-23 Pembayaran Tagihan Cicilan FlexiPay

- **Prioritas:** Must | **Ukuran:** L | **Sprint:** 6
- **Sebagai** pengguna FlexiPay yang memiliki tagihan, **saya ingin** membayar tagihan cicilan melalui alur pembayaran yang tersedia, **agar** kewajiban pembayaran saya dapat diproses dan status tagihan diperbarui sesuai hasil pembayaran.

### Acceptance Criteria

1. **Given** pengguna sudah login dan memiliki tagihan yang dapat dibayar, **When** pengguna membuka detail tagihan, **Then** sistem menampilkan nominal, tanggal jatuh tempo, dan status tagihan sesuai data.
2. **Given** tagihan berstatus dapat dibayar, **When** pengguna memilih tombol bayar, **Then** sistem menampilkan ringkasan pembayaran sebelum pengguna melanjutkan.
3. **Given** pengguna menyetujui ringkasan pembayaran, **When** alur pembayaran dijalankan, **Then** sistem meneruskan pengguna ke proses pembayaran yang tersedia atau simulasi yang ditetapkan untuk MVP.
4. **Given** pembayaran berhasil dikonfirmasi oleh penyedia atau simulasi yang valid, **When** hasil pembayaran diproses, **Then** status tagihan diperbarui sesuai hasil tersebut.
5. **Given** pembayaran masih menunggu konfirmasi, **When** pengguna melihat status tagihan, **Then** sistem menampilkan status menunggu dan tidak menyatakan tagihan telah lunas.
6. **Given** pembayaran gagal atau dibatalkan, **When** hasil diproses, **Then** sistem menampilkan status yang sesuai dan tidak mengubah tagihan menjadi lunas.
7. **Given** pengguna mencoba membayar tagihan yang sudah lunas atau tidak memenuhi syarat pembayaran, **When** permintaan diproses, **Then** sistem menolak pembayaran tersebut dan memberikan informasi yang jelas.
8. **Given** pembayaran nyata belum terintegrasi pada MVP, **When** pengguna menjalankan fitur, **Then** sistem memberi label simulasi dan tidak menyatakan dana sungguhan telah berpindah.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai hasil), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi), BR-07 (akses data sesuai akun).
