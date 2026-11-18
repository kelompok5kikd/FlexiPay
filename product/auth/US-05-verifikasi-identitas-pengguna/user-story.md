# User Stories

## US-05 Verifikasi Identitas Pengguna FlexiPay

- **Prioritas:** Should | **Ukuran:** L | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang mengajukan layanan, **saya ingin** mengisi informasi identitas yang diperlukan dan melihat status verifikasi, **agar** saya memahami tahapan verifikasi akun sebelum fitur terkait dapat digunakan.

### Acceptance Criteria

1. **Given** pengguna membuka bagian verifikasi identitas, **When** halaman dimuat, **Then** sistem menampilkan penjelasan tujuan verifikasi dan data yang diperlukan pada prototipe.
2. **Given** pengguna mengisi formulir identitas, **When** pengguna mengirim data, **Then** sistem memvalidasi kolom wajib dan format input sesuai aturan yang ditetapkan aplikasi.
3. **Given** kolom wajib belum lengkap atau format input tidak valid, **When** formulir dikirim, **Then** sistem menampilkan pesan kesalahan yang menunjukkan bagian yang perlu diperbaiki.
4. **Given** data formulir valid, **When** pengguna mengirim formulir dalam MVP, **Then** sistem menampilkan konfirmasi penerimaan data atau status simulasi sesuai kemampuan prototipe.
5. **Given** verifikasi belum terhubung ke penyedia resmi, **When** data dikirim, **Then** sistem tidak menyatakan identitas telah diverifikasi secara resmi.
6. **Given** pengguna membuka kembali halaman verifikasi, **When** status verifikasi tersedia, **Then** sistem menampilkan status terakhir yang tersimpan pada prototipe.
7. **Given** data identitas diperlukan untuk demonstrasi, **When** tim melakukan pengujian, **Then** tim menggunakan data dummy dan menghindari penyimpanan data identitas pribadi yang tidak diperlukan.
8. **Given** terjadi kegagalan saat menyimpan data atau memperbarui status, **When** kegagalan terjadi, **Then** sistem menampilkan pesan yang jelas dan tidak menampilkan status berhasil secara keliru.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi), BR-07 (pembatasan penggunaan data akun).
- **Catatan:** KYC atau verifikasi identitas sungguhan berada di luar cakupan MVP sebagaimana PRD awal, kecuali tim secara eksplisit memperbarui ruang lingkupnya.
