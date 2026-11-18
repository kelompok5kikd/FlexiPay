# Wireframe — US-19: Rincian Biaya dan Ketentuan Cicilan FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat rincian biaya dan ketentuan cicilan
- **Tujuan:** saya dapat memahami komponen pembayaran sebelum melanjutkan transaksi
- **Prioritas:** Could
- **Ukuran:** M
- **Sprint:** 5

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-19**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Rincian Biaya

2. Ketentuan Cicilan

3. Persetujuan Pengguna

## 4. Rancangan Wireframe

### 1. Rincian Biaya

```text
┌──────────────────────────────────────────┐
│ Rincian Biaya                            │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Rincian Biaya.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat rincian biaya dan ketentuan cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Ketentuan Cicilan

```text
┌──────────────────────────────────────────┐
│ Ketentuan Cicilan                        │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ketentuan Cicilan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat rincian biaya dan ketentuan cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Persetujuan Pengguna

```text
┌──────────────────────────────────────────┐
│ Persetujuan Pengguna                     │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Persetujuan Pengguna.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat rincian biaya dan ketentuan cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat rincian biaya dan ketentuan cicilan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka rincian biaya dan ketentuan cicilan,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** sistem menampilkan komponen biaya dan ketentuan yang telah ditetapkan pada konfigurasi atau data prototipe.

2. **Kondisi:** nominal biaya tersedia,  
   **Aksi:** rincian ditampilkan,  
   **Respons UI:** seluruh nominal menggunakan format Rupiah yang konsisten.

3. **Kondisi:** terdapat komponen seperti pokok, biaya layanan, atau komponen lain yang telah disahkan dalam aturan produk,  
   **Aksi:** rincian ditampilkan,  
   **Respons UI:** setiap komponen dijelaskan secara terpisah dan totalnya sesuai perhitungan yang ditetapkan.

4. **Kondisi:** informasi biaya atau ketentuan belum ditentukan,  
   **Aksi:** pengguna membuka halaman,  
   **Respons UI:** sistem tidak mengarang tarif, denda, bunga, atau biaya lain dan menampilkan keterangan bahwa informasi belum tersedia.

5. **Kondisi:** ketentuan cicilan ditampilkan,  
   **Aksi:** pengguna meninjau informasi,  
   **Respons UI:** sistem menyajikan tenor, jadwal pembayaran, dan ketentuan relevan hanya jika data tersebut telah ditetapkan.

6. **Kondisi:** biaya atau ketentuan menggunakan data simulasi,  
   **Aksi:** informasi ditampilkan,  
   **Respons UI:** sistem memberi label bahwa data merupakan contoh dan bukan penawaran final.

7. **Kondisi:** pengguna melanjutkan ke tahap berikutnya,  
   **Aksi:** konfirmasi ditampilkan,  
   **Respons UI:** pengguna dapat meninjau rincian yang sama sebelum menyetujui transaksi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-19 — Rincian Biaya dan Ketentuan Cicilan FlexiPay.
- **Dokumen:** `user stories/US-19_*.md` dalam ZIP User Story FlexiPay.
