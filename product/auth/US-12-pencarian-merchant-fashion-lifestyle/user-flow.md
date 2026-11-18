# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-12 --- Pencarian merchant fashion dan lifestyle

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka pencarian] --> C[Masukkan kata kunci dan kategori] --> D[Cari merchant] --> E{Hasil ditemukan?}
    E -- Tidak --> F[Tampilkan tidak ada hasil] --> C
    E -- Ya --> G[Tampilkan hasil] --> H[Pilih merchant dan lihat detail] --> I([Selesai])
```
