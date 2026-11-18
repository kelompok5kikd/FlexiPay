# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-18 --- Simulasi cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Ambil nominal dan tenor] --> C[Hitung cicilan dan total pembayaran] --> D[Tampilkan simulasi] --> E{Disetujui pengguna?}
    E -- Tidak --> F[Ubah tenor atau kembali] --> B
    E -- Ya --> G([Lanjut US-19])
```
