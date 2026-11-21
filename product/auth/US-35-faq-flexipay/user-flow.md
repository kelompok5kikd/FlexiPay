# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-35 --- FAQ FlexiPay

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka FAQ] --> C[Tampilkan kategori dan pertanyaan] --> D[Cari atau pilih pertanyaan] --> E{Hasil ditemukan?}
    E -- Tidak --> F[Tampilkan tidak ada hasil] --> D
    E -- Ya --> G[Tampilkan jawaban] --> H{Masih perlu bantuan?}
    H -- Ya --> I[Buka customer support] --> Z([Selesai])
    H -- Tidak --> Z
```
