# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-05 --- Verifikasi identitas

``` mermaid
flowchart TD
    A([Mulai]) --> B[Isi data identitas dan unggah dokumen] --> C[Ambil foto wajah jika diminta] --> D{Data terbaca?}
    D -- Tidak --> E[Minta unggah ulang] --> B
    D -- Ya --> F[Kirim untuk pemeriksaan] --> G{Hasil verifikasi?}
    G -- Perlu perbaikan --> B
    G -- Ditolak --> H[Tampilkan status ditolak] --> I([Selesai])
    G -- Berhasil --> J[Tandai identitas terverifikasi] --> I
```
