# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-08 --- Dashboard utama

``` mermaid
flowchart TD
    A([Mulai]) --> B[Login] --> C[Muat data akun] --> D{Data berhasil dimuat?}
    D -- Tidak --> E[Tampilkan opsi coba lagi] --> C
    D -- Ya --> F[Tampilkan dashboard] --> G{Pilih menu?}
    G -- Limit --> H[Ringkasan limit] --> F
    G -- Tagihan --> I[Daftar tagihan] --> F
    G -- Merchant --> J[Daftar merchant] --> F
    G -- Riwayat --> K[Riwayat transaksi] --> F
```
