# Wireframe — US-21: Pemrosesan dan Status Pembayaran melalui Payment Gateway

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat proses dan status pembayaran melalui payment gateway
- **Tujuan:** saya mengetahui apakah pembayaran berhasil, masih diproses, atau gagal
- **Prioritas:** Should
- **Ukuran:** L
- **Sprint:** 5

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-21**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Proses Pembayaran

2. Status Pembayaran

3. Detail Transaksi

## 4. Rancangan Wireframe

### 1. Proses Pembayaran

```text
┌──────────────────────────────────────────┐
│ Proses Pembayaran                        │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Proses Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat proses dan status pembayaran melalui payment gateway**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Status Pembayaran

```text
┌──────────────────────────────────────────┐
│ Status Pembayaran                        │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Status Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat proses dan status pembayaran melalui payment gateway**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Transaksi

```text
┌──────────────────────────────────────────┐
│ Detail Transaksi                         │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Transaksi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat proses dan status pembayaran melalui payment gateway**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat proses dan status pembayaran melalui payment gateway.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna telah menyelesaikan tahap konfirmasi yang diwajibkan,  
   **Aksi:** aplikasi memulai pembayaran melalui integrasi yang tersedia,  
   **Respons UI:** sistem mengirim permintaan sesuai spesifikasi penyedia payment gateway.

2. **Kondisi:** penyedia payment gateway mengembalikan status menunggu atau diproses,  
   **Aksi:** status diterima dan divalidasi,  
   **Respons UI:** sistem menampilkan status pembayaran sebagai menunggu atau diproses.

3. **Kondisi:** penyedia mengonfirmasi pembayaran berhasil melalui respons yang valid,  
   **Aksi:** sistem memverifikasi hasilnya,  
   **Respons UI:** status transaksi diperbarui menjadi berhasil sesuai respons resmi.

4. **Kondisi:** penyedia mengembalikan status gagal atau pembayaran kedaluwarsa,  
   **Aksi:** status diterima,  
   **Respons UI:** sistem menampilkan status gagal atau kedaluwarsa sesuai respons.

5. **Kondisi:** respons penyedia belum diterima atau hasilnya belum pasti,  
   **Aksi:** pengguna memeriksa status,  
   **Respons UI:** sistem tidak langsung menandai pembayaran berhasil dan menampilkan status menunggu verifikasi.

6. **Kondisi:** terjadi gangguan jaringan atau kesalahan integrasi,  
   **Aksi:** permintaan pembayaran gagal diproses,  
   **Respons UI:** sistem menampilkan pesan yang sesuai dan menghindari pembuatan transaksi ganda akibat percobaan ulang.

7. **Kondisi:** aplikasi menerima notifikasi status dari penyedia,  
   **Aksi:** notifikasi diproses,  
   **Respons UI:** sistem memvalidasi sumber dan isi notifikasi sesuai mekanisme keamanan penyedia sebelum memperbarui status.

8. **Kondisi:** MVP belum terhubung dengan payment gateway,  
   **Aksi:** pengguna menjalankan alur pembayaran,  
   **Respons UI:** sistem menyajikan simulasi yang jelas dan tidak mengklaim pembayaran nyata telah diproses.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-21 — Pemrosesan dan Status Pembayaran melalui Payment Gateway.
- **Dokumen:** `user stories/US-21_*.md` dalam ZIP User Story FlexiPay.
