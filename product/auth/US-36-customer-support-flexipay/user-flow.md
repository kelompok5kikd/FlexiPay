# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-36 --- Customer support

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka Customer Support] --> C[Tampilkan kanal bantuan] --> D[Pilih kanal] --> E{Kanal tersedia?}
    E -- Tidak --> F[Tampilkan kanal alternatif] --> C
    E -- Ya --> G[Kirim pertanyaan atau masalah] --> H[Permintaan diterima] --> I[Tampilkan konfirmasi/tindak lanjut] --> Z([Selesai])
```
