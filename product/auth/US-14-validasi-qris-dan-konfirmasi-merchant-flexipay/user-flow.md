# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-14 --- Validasi QRIS dan merchant

``` mermaid
flowchart TD
    A([Mulai dari hasil scan]) --> B[Validasi format QR] --> C{QR valid?}
    C -- Tidak --> D[Tampilkan QR tidak valid] --> E{Scan ulang?}
    E -- Ya --> F[Kembali ke US-13]
    E -- Tidak --> Z([Selesai])
    C -- Ya --> G[Ambil data merchant] --> H{Merchant aktif dan dikenali?}
    H -- Tidak --> D
    H -- Ya --> I[Tampilkan merchant dan detail] --> J{Merchant sesuai?}
    J -- Tidak --> Z
    J -- Ya --> K([Lanjut US-15])
```
