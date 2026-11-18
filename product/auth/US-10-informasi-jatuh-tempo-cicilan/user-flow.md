# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-10 --- Informasi jatuh tempo cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka tagihan] --> C[Pilih cicilan] --> D[Tampilkan jatuh tempo, nominal, status] --> E{Sudah lunas?}
    E -- Ya --> F[Tampilkan status lunas] --> G([Selesai])
    E -- Tidak --> H[Tampilkan sisa tagihan dan opsi bayar] --> G
```
