# Wireframe — US-12: Pencarian Merchant Fashion dan Lifestyle

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** mencari merchant berdasarkan nama atau kategori fashion dan lifestyle
- **Tujuan:** saya dapat menemukan merchant yang relevan dengan kebutuhan saya
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-12**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

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
- Konten utama: informasi yang diperlukan untuk kebutuhan **mencari merchant berdasarkan nama atau kategori fashion dan lifestyle**.
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
- Konten utama: informasi yang diperlukan untuk kebutuhan **mencari merchant berdasarkan nama atau kategori fashion dan lifestyle**.
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
- Konten utama: informasi yang diperlukan untuk kebutuhan **mencari merchant berdasarkan nama atau kategori fashion dan lifestyle**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** mencari merchant berdasarkan nama atau kategori fashion dan lifestyle.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka halaman merchant,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** sistem menyediakan kolom pencarian jika fitur pencarian termasuk dalam rancangan final.

2. **Kondisi:** pengguna memasukkan kata kunci yang cocok dengan nama merchant,  
   **Aksi:** pencarian dijalankan,  
   **Respons UI:** sistem menampilkan merchant yang sesuai dengan kata kunci tersebut.

3. **Kondisi:** pengguna memilih atau memasukkan kategori fashion atau lifestyle,  
   **Aksi:** pencarian atau penyaringan dijalankan,  
   **Respons UI:** sistem menampilkan merchant yang sesuai dengan kategori yang tersedia pada data.

4. **Kondisi:** tidak ada merchant yang cocok dengan kata kunci,  
   **Aksi:** hasil pencarian ditampilkan,  
   **Respons UI:** sistem menampilkan keterangan bahwa hasil tidak ditemukan.

5. **Kondisi:** kolom pencarian kosong,  
   **Aksi:** pengguna menjalankan pencarian,  
   **Respons UI:** sistem menampilkan daftar awal atau memberi arahan yang sesuai dengan perilaku pencarian yang ditetapkan.

6. **Kondisi:** pengguna mengubah kata kunci,  
   **Aksi:** pencarian dijalankan kembali,  
   **Respons UI:** daftar hasil diperbarui berdasarkan kata kunci terbaru.

7. **Kondisi:** data merchant yang digunakan merupakan data dummy,  
   **Aksi:** hasil pencarian ditampilkan,  
   **Respons UI:** hasil tidak diklaim sebagai daftar merchant partner nyata yang belum terverifikasi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-12 — Pencarian Merchant Fashion dan Lifestyle.
- **Dokumen:** `user stories/US-12_*.md` dalam ZIP User Story FlexiPay.
