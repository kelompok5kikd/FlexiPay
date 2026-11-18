# Wireframe — US-24: Riwayat Pembayaran Cicilan FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang memiliki atau pernah memiliki tagihan cicilan
- **Kebutuhan:** melihat riwayat pembayaran cicilan
- **Tujuan:** saya dapat memeriksa pembayaran yang pernah dilakukan beserta statusnya
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 6

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-24**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Riwayat Pembayaran Cicilan

2. Filter Riwayat

3. Detail Pembayaran

## 4. Rancangan Wireframe

### 1. Riwayat Pembayaran Cicilan

```text
┌──────────────────────────────────────────┐
│ Riwayat Pembayaran Cicilan               │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Riwayat Pembayaran Cicilan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat pembayaran cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Filter Riwayat

```text
┌──────────────────────────────────────────┐
│ Filter Riwayat                           │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Filter Riwayat.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat pembayaran cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Pembayaran

```text
┌──────────────────────────────────────────┐
│ Detail Pembayaran                        │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat pembayaran cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat riwayat pembayaran cicilan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login,  
   **Aksi:** pengguna membuka halaman riwayat pembayaran cicilan,  
   **Respons UI:** sistem menampilkan daftar pembayaran cicilan yang terkait dengan akun tersebut.

2. **Kondisi:** riwayat pembayaran tersedia,  
   **Aksi:** daftar ditampilkan,  
   **Respons UI:** setiap item menampilkan informasi yang tersedia, seperti tanggal, nominal, tagihan terkait, dan status pembayaran.

3. **Kondisi:** pengguna memilih salah satu item riwayat,  
   **Aksi:** detail dibuka,  
   **Respons UI:** sistem menampilkan detail yang sesuai dengan catatan pembayaran yang dipilih.

4. **Kondisi:** belum ada pembayaran yang tercatat,  
   **Aksi:** halaman riwayat dibuka,  
   **Respons UI:** sistem menampilkan keterangan bahwa riwayat belum tersedia.

5. **Kondisi:** status pembayaran belum terkonfirmasi,  
   **Aksi:** riwayat ditampilkan,  
   **Respons UI:** status tetap ditampilkan sebagai menunggu atau status lain yang sesuai, bukan otomatis berhasil.

6. **Kondisi:** riwayat menggunakan data dummy,  
   **Aksi:** informasi ditampilkan,  
   **Respons UI:** sistem memberi label simulasi agar tidak disalahartikan sebagai riwayat keuangan nyata.

7. **Kondisi:** pengguna membuka riwayat,  
   **Aksi:** data dimuat,  
   **Respons UI:** sistem hanya menampilkan riwayat milik akun yang sedang login.

8. **Kondisi:** terjadi kegagalan saat mengambil riwayat,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan pesan kesalahan dan tidak menampilkan data yang tidak terverifikasi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-24 — Riwayat Pembayaran Cicilan FlexiPay.
- **Dokumen:** `user stories/US-24_*.md` dalam ZIP User Story FlexiPay.
