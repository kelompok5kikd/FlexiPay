# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-21 --- Pemrosesan payment gateway

``` mermaid
flowchart TD
    A([Mulai]) --> B[Kirim permintaan ke payment gateway] --> C[Proses pembayaran] --> D{Status pembayaran?}
    D -- Berhasil --> E[Simpan status berhasil dan referensi] --> H[Tampilkan hasil]
    D -- Menunggu --> F[Simpan status menunggu] --> I[Tampilkan status menunggu]
    D -- Gagal --> G[Simpan status gagal] --> J[Tampilkan kegagalan dan opsi tindak lanjut]
    H --> K([Selesai])
    I --> K
    J --> K
```
