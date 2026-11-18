# Wireframe — US-01: Landing Page FlexiPay

## 1. Informasi User Story

- **Aktor:** calon pengguna
- **Kebutuhan:** melihat landing page FlexiPay yang menjelaskan layanan dan manfaat utamanya
- **Tujuan:** saya dapat memahami FlexiPay sebelum memutuskan untuk menggunakan aplikasi
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 2

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-01**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Landing Page

2. Informasi Produk

3. Ajakan Daftar/Login

## 4. Rancangan Wireframe

### 1. Landing Page

```text
┌──────────────────────────────────────────┐
│ Landing Page                             │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Landing Page.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat landing page FlexiPay yang menjelaskan layanan dan manfaat utamanya**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Informasi Produk

```text
┌──────────────────────────────────────────┐
│ Informasi Produk                         │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Informasi Produk.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat landing page FlexiPay yang menjelaskan layanan dan manfaat utamanya**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Ajakan Daftar/Login

```text
┌──────────────────────────────────────────┐
│ Ajakan Daftar/Login                      │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ajakan Daftar/Login.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat landing page FlexiPay yang menjelaskan layanan dan manfaat utamanya**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat landing page FlexiPay yang menjelaskan layanan dan manfaat utamanya.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** calon pengguna membuka alamat website FlexiPay,  
   **Aksi:** halaman berhasil dimuat,  
   **Respons UI:** sistem menampilkan landing page dengan identitas FlexiPay.

2. **Kondisi:** landing page ditampilkan,  
   **Aksi:** pengguna melihat bagian beranda,  
   **Respons UI:** pengguna dapat menemukan penjelasan singkat tentang FlexiPay dan manfaat utamanya.

3. **Kondisi:** landing page ditampilkan,  
   **Aksi:** pengguna memilih menu navigasi,  
   **Respons UI:** sistem mengarahkan pengguna ke bagian yang sesuai, seperti Beranda, Keunggulan, Pilihan Produk, atau Cara Kerja, sesuai rancangan yang disepakati.

4. **Kondisi:** pengguna membuka landing page dari perangkat dengan ukuran layar berbeda,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** tata letak menyesuaikan ukuran layar dan konten utama tetap dapat dibaca.

5. **Kondisi:** pengguna melihat landing page,  
   **Aksi:** pengguna memilih tombol ajakan bertindak yang tersedia,  
   **Respons UI:** sistem mengarahkan pengguna ke halaman atau bagian tujuan yang sesuai.

6. **Kondisi:** halaman sedang dimuat atau terjadi kegagalan memuat konten,  
   **Aksi:** kondisi tersebut terjadi,  
   **Respons UI:** sistem memberikan tampilan yang wajar dan tidak menampilkan informasi transaksi palsu.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-01 — Landing Page FlexiPay.
- **Dokumen:** `user stories/US-01_*.md` dalam ZIP User Story FlexiPay.
