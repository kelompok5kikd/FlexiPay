# Wireframe — US-05: Verifikasi Identitas Pengguna FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang mengajukan layanan
- **Kebutuhan:** mengisi informasi identitas yang diperlukan dan melihat status verifikasi
- **Tujuan:** saya memahami tahapan verifikasi akun sebelum fitur terkait dapat digunakan
- **Prioritas:** Should
- **Ukuran:** L
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-05**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Verifikasi Identitas

2. Unggah/Pilih Dokumen

3. Status Verifikasi

## 4. Rancangan Wireframe

### 1. Verifikasi Identitas

```text
┌──────────────────────────────────────────┐
│ Verifikasi Identitas                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Verifikasi Identitas.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengisi informasi identitas yang diperlukan dan melihat status verifikasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Unggah/Pilih Dokumen

```text
┌──────────────────────────────────────────┐
│ Unggah/Pilih Dokumen                     │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Unggah/Pilih Dokumen.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengisi informasi identitas yang diperlukan dan melihat status verifikasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Status Verifikasi

```text
┌──────────────────────────────────────────┐
│ Status Verifikasi                        │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Status Verifikasi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengisi informasi identitas yang diperlukan dan melihat status verifikasi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** mengisi informasi identitas yang diperlukan dan melihat status verifikasi.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka bagian verifikasi identitas,  
   **Aksi:** halaman dimuat,  
   **Respons UI:** sistem menampilkan penjelasan tujuan verifikasi dan data yang diperlukan pada prototipe.

2. **Kondisi:** pengguna mengisi formulir identitas,  
   **Aksi:** pengguna mengirim data,  
   **Respons UI:** sistem memvalidasi kolom wajib dan format input sesuai aturan yang ditetapkan aplikasi.

3. **Kondisi:** kolom wajib belum lengkap atau format input tidak valid,  
   **Aksi:** formulir dikirim,  
   **Respons UI:** sistem menampilkan pesan kesalahan yang menunjukkan bagian yang perlu diperbaiki.

4. **Kondisi:** data formulir valid,  
   **Aksi:** pengguna mengirim formulir dalam MVP,  
   **Respons UI:** sistem menampilkan konfirmasi penerimaan data atau status simulasi sesuai kemampuan prototipe.

5. **Kondisi:** verifikasi belum terhubung ke penyedia resmi,  
   **Aksi:** data dikirim,  
   **Respons UI:** sistem tidak menyatakan identitas telah diverifikasi secara resmi.

6. **Kondisi:** pengguna membuka kembali halaman verifikasi,  
   **Aksi:** status verifikasi tersedia,  
   **Respons UI:** sistem menampilkan status terakhir yang tersimpan pada prototipe.

7. **Kondisi:** data identitas diperlukan untuk demonstrasi,  
   **Aksi:** tim melakukan pengujian,  
   **Respons UI:** tim menggunakan data dummy dan menghindari penyimpanan data identitas pribadi yang tidak diperlukan.

8. **Kondisi:** terjadi kegagalan saat menyimpan data atau memperbarui status,  
   **Aksi:** kegagalan terjadi,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan tidak menampilkan status berhasil secara keliru.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-05 — Verifikasi Identitas Pengguna FlexiPay.
- **Dokumen:** `user stories/US-05_*.md` dalam ZIP User Story FlexiPay.
