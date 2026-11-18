# Wireframe — US-11: Daftar Merchant Partner FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat daftar merchant partner
- **Tujuan:** saya dapat mengetahui merchant yang ditampilkan sebagai tempat penggunaan layanan FlexiPay
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-11**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Daftar Merchant

2. Pencarian/Filter Merchant

3. Detail Merchant

## 4. Rancangan Wireframe

### 1. Daftar Merchant

```text
┌──────────────────────────────────────────┐
│ Daftar Merchant                          │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Daftar Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat daftar merchant partner**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Pencarian/Filter Merchant

```text
┌──────────────────────────────────────────┐
│ Pencarian/Filter Merchant                │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pencarian/Filter Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat daftar merchant partner**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Merchant

```text
┌──────────────────────────────────────────┐
│ Detail Merchant                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Merchant.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat daftar merchant partner**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat daftar merchant partner.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka halaman merchant partner,  
   **Aksi:** halaman berhasil dimuat,  
   **Respons UI:** sistem menampilkan daftar merchant yang tersedia pada data aplikasi.

2. **Kondisi:** daftar merchant tersedia,  
   **Aksi:** pengguna melihat sebuah item merchant,  
   **Respons UI:** sistem menampilkan informasi yang disediakan, seperti nama merchant, kategori, dan logo jika tersedia.

3. **Kondisi:** data merchant belum tersedia,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan keadaan kosong atau pesan bahwa daftar belum tersedia.

4. **Kondisi:** pengguna memilih salah satu merchant,  
   **Aksi:** merchant memiliki halaman detail,  
   **Respons UI:** sistem membuka detail merchant yang sesuai.

5. **Kondisi:** merchant ditampilkan hanya sebagai contoh atau data dummy,  
   **Aksi:** pengguna melihat daftar,  
   **Respons UI:** tampilan tidak mengklaim adanya kemitraan nyata yang belum dikonfirmasi.

6. **Kondisi:** daftar merchant gagal dimuat,  
   **Aksi:** kegagalan terjadi,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan menyediakan cara untuk mencoba kembali jika didukung.

7. **Kondisi:** pengguna membuka halaman melalui perangkat berbeda,  
   **Aksi:** daftar ditampilkan,  
   **Respons UI:** daftar tetap mudah dibaca dan digunakan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-11 — Daftar Merchant Partner FlexiPay.
- **Dokumen:** `user stories/US-11_*.md` dalam ZIP User Story FlexiPay.
