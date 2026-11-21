# Wireframe — US-35: FAQ FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna atau calon pengguna FlexiPay
- **Kebutuhan:** membaca daftar pertanyaan yang sering diajukan
- **Tujuan:** saya dapat memahami fitur, cara penggunaan, dan ketentuan layanan tanpa harus langsung menghubungi customer support
- **Prioritas:** Could
- **Ukuran:** S
- **Sprint:** 8

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-35**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Daftar FAQ

2. Pencarian FAQ

3. Detail Jawaban

## 4. Rancangan Wireframe

### 1. Daftar FAQ

```text
┌──────────────────────────────────────────┐
│ Daftar FAQ                               │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Daftar FAQ.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membaca daftar pertanyaan yang sering diajukan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Pencarian FAQ

```text
┌──────────────────────────────────────────┐
│ Pencarian FAQ                            │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pencarian FAQ.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membaca daftar pertanyaan yang sering diajukan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Jawaban

```text
┌──────────────────────────────────────────┐
│ Detail Jawaban                           │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Jawaban.
- Konten utama: informasi yang diperlukan untuk kebutuhan **membaca daftar pertanyaan yang sering diajukan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** membaca daftar pertanyaan yang sering diajukan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka halaman FAQ,  
   **Aksi:** halaman dimuat,  
   **Respons UI:** sistem menampilkan daftar pertanyaan dan jawaban yang telah disetujui.

2. **Kondisi:** daftar FAQ tersedia,  
   **Aksi:** pengguna memilih salah satu pertanyaan,  
   **Respons UI:** sistem menampilkan jawaban yang sesuai.

3. **Kondisi:** FAQ dikelompokkan berdasarkan topik,  
   **Aksi:** pengguna memilih kategori,  
   **Respons UI:** sistem menampilkan pertanyaan yang termasuk kategori tersebut.

4. **Kondisi:** fitur pencarian FAQ tersedia,  
   **Aksi:** pengguna memasukkan kata kunci,  
   **Respons UI:** sistem menampilkan pertanyaan yang relevan atau pesan bahwa hasil tidak ditemukan.

5. **Kondisi:** belum ada FAQ yang tersedia,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan keterangan yang jelas dan jalur bantuan alternatif jika tersedia.

6. **Kondisi:** informasi terkait biaya, cicilan, atau ketentuan belum disahkan,  
   **Aksi:** FAQ ditampilkan,  
   **Respons UI:** sistem tidak mengarang jawaban dan hanya menampilkan informasi yang telah disetujui.

7. **Kondisi:** pengguna membuka FAQ dari perangkat berbeda,  
   **Aksi:** halaman dimuat,  
   **Respons UI:** konten tetap mudah dibaca dan digunakan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-35 — FAQ FlexiPay.
- **Dokumen:** `user stories/US-35_*.md` dalam ZIP User Story FlexiPay.
