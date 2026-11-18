# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-03 --- Registrasi akun

``` mermaid
flowchart TD
    A([Mulai]) --> B[Isi data pendaftaran] --> C[Setujui syarat dan ketentuan] --> D{Data valid dan lengkap?}
    D -- Tidak --> E[Tampilkan kesalahan] --> B
    D -- Ya --> F{Akun sudah terdaftar?}
    F -- Ya --> G[Tampilkan pesan akun terdaftar] --> B
    F -- Tidak --> H[Buat akun berstatus belum terverifikasi] --> I[Mulai verifikasi nomor HP] --> J([Selesai])
```
