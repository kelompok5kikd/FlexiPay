# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-02 --- Login dan logout

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka halaman login] --> C[Masukkan kredensial] --> D{Kredensial valid?}
    D -- Tidak --> E[Tampilkan kesalahan] --> C
    D -- Ya --> F[Buat sesi dan tampilkan dashboard] --> G{Logout?}
    G -- Tidak --> F
    G -- Ya --> H[Hapus sesi] --> I([Selesai])
```
