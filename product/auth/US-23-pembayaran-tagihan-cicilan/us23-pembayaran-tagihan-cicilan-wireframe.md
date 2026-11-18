# Wireframe — US-23: Pembayaran Tagihan Cicilan FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang memiliki tagihan
- **Kebutuhan:** membayar tagihan cicilan melalui alur pembayaran yang tersedia
- **Tujuan:** kewajiban pembayaran saya dapat diproses dan status tagihan diperbarui sesuai hasil pembayaran
- **Prioritas:** Must
- **Ukuran:** L
- **Sprint:** 6

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-23**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Ringkasan Limit dan Tagihan

2. Detail Tagihan

## 4. Rancangan Wireframe

### 1. Ringkasan Limit dan Tagihan

```text
┌──────────────────────────────────────────┐
│ Ringkasan Limit dan Tagihan              │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Limit dan Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membayar tagihan cicilan melalui alur pembayaran yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Tagihan

```text
┌──────────────────────────────────────────┐
│ Detail Tagihan                           │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membayar tagihan cicilan melalui alur pembayaran yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** membayar tagihan cicilan melalui alur pembayaran yang tersedia.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login dan memiliki tagihan yang dapat dibayar,  
   **Aksi:** pengguna membuka detail tagihan,  
   **Respons UI:** sistem menampilkan nominal, tanggal jatuh tempo, dan status tagihan sesuai data.

2. **Kondisi:** tagihan berstatus dapat dibayar,  
   **Aksi:** pengguna memilih tombol bayar,  
   **Respons UI:** sistem menampilkan ringkasan pembayaran sebelum pengguna melanjutkan.

3. **Kondisi:** pengguna menyetujui ringkasan pembayaran,  
   **Aksi:** alur pembayaran dijalankan,  
   **Respons UI:** sistem meneruskan pengguna ke proses pembayaran yang tersedia atau simulasi yang ditetapkan untuk MVP.

4. **Kondisi:** pembayaran berhasil dikonfirmasi oleh penyedia atau simulasi yang valid,  
   **Aksi:** hasil pembayaran diproses,  
   **Respons UI:** status tagihan diperbarui sesuai hasil tersebut.

5. **Kondisi:** pembayaran masih menunggu konfirmasi,  
   **Aksi:** pengguna melihat status tagihan,  
   **Respons UI:** sistem menampilkan status menunggu dan tidak menyatakan tagihan telah lunas.

6. **Kondisi:** pembayaran gagal atau dibatalkan,  
   **Aksi:** hasil diproses,  
   **Respons UI:** sistem menampilkan status yang sesuai dan tidak mengubah tagihan menjadi lunas.

7. **Kondisi:** pengguna mencoba membayar tagihan yang sudah lunas atau tidak memenuhi syarat pembayaran,  
   **Aksi:** permintaan diproses,  
   **Respons UI:** sistem menolak pembayaran tersebut dan memberikan informasi yang jelas.

8. **Kondisi:** pembayaran nyata belum terintegrasi pada MVP,  
   **Aksi:** pengguna menjalankan fitur,  
   **Respons UI:** sistem memberi label simulasi dan tidak menyatakan dana sungguhan telah berpindah.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-23 — Pembayaran Tagihan Cicilan FlexiPay.
- **Dokumen:** `user stories/US-23_*.md` dalam ZIP User Story FlexiPay.
