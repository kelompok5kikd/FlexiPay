# Wireframe — US-36: Customer Support FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** mengakses customer support melalui kanal bantuan yang tersedia
- **Tujuan:** saya dapat memperoleh bantuan ketika mengalami kendala penggunaan aplikasi atau transaksi
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 8

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-36**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Pusat Bantuan

2. Pilihan Kanal Bantuan

3. Percakapan/Status Bantuan

## 4. Rancangan Wireframe

### 1. Pusat Bantuan

```text
┌──────────────────────────────────────────┐
│ Pusat Bantuan                            │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pusat Bantuan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengakses customer support melalui kanal bantuan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Pilihan Kanal Bantuan

```text
┌──────────────────────────────────────────┐
│ Pilihan Kanal Bantuan                    │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pilihan Kanal Bantuan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengakses customer support melalui kanal bantuan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Percakapan/Status Bantuan

```text
┌──────────────────────────────────────────┐
│ Percakapan/Status Bantuan                │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Percakapan/Status Bantuan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **mengakses customer support melalui kanal bantuan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** mengakses customer support melalui kanal bantuan yang tersedia.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna membuka bagian customer support,  
   **Aksi:** halaman dimuat,  
   **Respons UI:** sistem menampilkan kanal bantuan yang benar-benar tersedia dan jam layanan jika telah ditetapkan.

2. **Kondisi:** kanal bantuan tersedia,  
   **Aksi:** pengguna memilih salah satu kanal,  
   **Respons UI:** sistem membuka kanal atau menampilkan instruksi penggunaan yang sesuai.

3. **Kondisi:** pengguna ingin menjelaskan kendala,  
   **Aksi:** formulir bantuan tersedia dan dikirim dengan data valid,  
   **Respons UI:** sistem menampilkan konfirmasi bahwa permintaan telah diterima.

4. **Kondisi:** kolom wajib pada formulir belum lengkap,  
   **Aksi:** pengguna mengirim permintaan,  
   **Respons UI:** sistem menolak pengiriman dan menunjukkan kolom yang perlu diperbaiki.

5. **Kondisi:** kanal bantuan sedang tidak tersedia,  
   **Aksi:** pengguna membuka halaman,  
   **Respons UI:** sistem menjelaskan kondisi tersebut dan menampilkan alternatif jika ada.

6. **Kondisi:** sistem belum terhubung dengan layanan customer support,  
   **Aksi:** pengguna membuka fitur,  
   **Respons UI:** sistem tidak mengklaim pesan telah diterima petugas dan memberi label demo atau menampilkan kanal yang valid.

7. **Kondisi:** permintaan bantuan berisi data pribadi,  
   **Aksi:** data dikirim,  
   **Respons UI:** sistem hanya meminta informasi yang diperlukan dan membatasi akses sesuai kewenangan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-36 — Customer Support FlexiPay.
- **Dokumen:** `user stories/US-36_*.md` dalam ZIP User Story FlexiPay.
