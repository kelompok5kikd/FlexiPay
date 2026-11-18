# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-17 --- Pilihan tenor cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Tampilkan tenor tersedia] --> C[Pilih tenor] --> D[Hitung estimasi cicilan] --> E{Tenor memenuhi ketentuan?}
    E -- Tidak --> F[Tampilkan tenor tidak tersedia] --> B
    E -- Ya --> G[Tampilkan cicilan dan jadwal] --> H[Konfirmasi tenor] --> I([Lanjut US-18])
```
