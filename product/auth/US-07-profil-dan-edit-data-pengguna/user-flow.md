# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-07 --- Profil dan edit data

``` mermaid
flowchart TD
    A([Mulai]) --> B[Login dan buka Profil] --> C[Tampilkan data profil] --> D[Edit data] --> E[Simpan] --> F{Data valid?}
    F -- Tidak --> G[Tampilkan kesalahan] --> D
    F -- Ya --> H[Simpan perubahan dan tampilkan profil terbaru] --> I([Selesai])
```
