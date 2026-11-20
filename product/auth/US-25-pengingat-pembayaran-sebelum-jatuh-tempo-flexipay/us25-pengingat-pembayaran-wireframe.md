# Wireframe — US-25: Pengingat Pembayaran Sebelum Jatuh Tempo

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang memiliki tagihan belum lunas
- **Kebutuhan:** menerima atau melihat pengingat sebelum tanggal jatuh tempo
- **Tujuan:** saya dapat mempersiapkan pembayaran tepat waktu
- **Prioritas:** Could
- **Ukuran:** M
- **Sprint:** 6

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-25**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Daftar Tagihan

2. Detail Jatuh Tempo

3. Pengaturan Pengingat

## 4. Rancangan Wireframe

### 1. Daftar Tagihan

```text
┌──────────────────────────────────────────┐
│ Daftar Tagihan                           │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Daftar Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **menerima atau melihat pengingat sebelum tanggal jatuh tempo**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Jatuh Tempo

```text
┌──────────────────────────────────────────┐
│ Detail Jatuh Tempo                       │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Jatuh Tempo.
- Konten utama: informasi yang diperlukan untuk kebutuhan **menerima atau melihat pengingat sebelum tanggal jatuh tempo**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Pengaturan Pengingat

```text
┌──────────────────────────────────────────┐
│ Pengaturan Pengingat                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pengaturan Pengingat.
- Konten utama: informasi yang diperlukan untuk kebutuhan **menerima atau melihat pengingat sebelum tanggal jatuh tempo**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** menerima atau melihat pengingat sebelum tanggal jatuh tempo.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna memiliki tagihan belum lunas dengan tanggal jatuh tempo yang tersedia,  
   **Aksi:** tanggal pengingat yang dikonfigurasi tercapai,  
   **Respons UI:** sistem menyiapkan pengingat sesuai mekanisme yang didukung aplikasi.

2. **Kondisi:** pengingat ditampilkan di dalam aplikasi,  
   **Aksi:** pengguna membuka notifikasi atau bagian pengingat,  
   **Respons UI:** informasi menunjukkan tagihan terkait dan tanggal jatuh tempo sesuai data.

3. **Kondisi:** tagihan telah lunas sebelum waktu pengingat,  
   **Aksi:** sistem memeriksa tagihan,  
   **Respons UI:** sistem tidak menampilkan pengingat yang menyatakan tagihan tersebut masih perlu dibayar.

4. **Kondisi:** tanggal jatuh tempo atau status tagihan belum tersedia,  
   **Aksi:** sistem memeriksa pengingat,  
   **Respons UI:** sistem tidak membuat pengingat dengan tanggal atau status yang dikarang.

5. **Kondisi:** pengingat otomatis belum didukung pada MVP,  
   **Aksi:** pengguna melihat fitur pengingat,  
   **Respons UI:** sistem menjelaskan keterbatasan tersebut atau hanya menampilkan simulasi yang diberi label.

6. **Kondisi:** pengingat berhasil dibuat,  
   **Aksi:** pengingat ditampilkan,  
   **Respons UI:** isi pesan jelas, tidak menyesatkan, dan tidak menyatakan denda atau biaya yang belum ditetapkan.

7. **Kondisi:** pengguna membuka pengingat,  
   **Aksi:** pengguna memilih tautan atau aksi yang tersedia,  
   **Respons UI:** sistem mengarahkan pengguna ke detail tagihan yang sesuai jika navigasi tersebut didukung.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-25 — Pengingat Pembayaran Sebelum Jatuh Tempo.
- **Dokumen:** `user stories/US-25_*.md` dalam ZIP User Story FlexiPay.
