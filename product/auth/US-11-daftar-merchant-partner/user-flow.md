# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-11 --- Daftar merchant partner

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka menu Merchant] --> C[Muat daftar merchant] --> D{Berhasil dimuat?}
    D -- Tidak --> E[Tampilkan coba lagi] --> C
    D -- Ya --> F[Tampilkan daftar] --> G[Pilih merchant] --> H[Tampilkan detail merchant] --> I([Selesai])
```
