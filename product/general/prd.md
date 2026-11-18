# PRD: FlexiPay

## 1. Ringkasan

FlexiPay adalah rancangan aplikasi layanan Buy Now, Pay Later (BNPL)
yang membantu pengguna melakukan transaksi sekarang dan mengelola
pembayaran di kemudian hari melalui satu aplikasi digital. Produk ini
ditujukan bagi pengguna yang membutuhkan cara praktis untuk melihat
informasi layanan, memantau transaksi, dan memahami kewajiban
pembayarannya.

Dokumen ini menjadi acuan awal untuk pengembangan MVP FlexiPay dalam
proyek Scrum. Detail fitur mengikuti ruang lingkup prototipe aplikasi;
integrasi keuangan dan transaksi nyata tidak diasumsikan tersedia
kecuali ditetapkan kemudian oleh tim.

## 2. Problem Statement

Pengguna membutuhkan cara yang praktis untuk memahami layanan PayLater,
melihat informasi transaksi, dan memantau tagihan karena informasi
tersebut dapat terasa tersebar atau kurang mudah dipahami jika tidak
disajikan dalam satu alur aplikasi yang jelas.

FlexiPay dirancang untuk menyatukan informasi utama layanan, aktivitas
transaksi, dan informasi pembayaran agar pengguna dapat memahami status
penggunaan layanan dengan lebih mudah.

## 3. Persona

Pengguna utama dijelaskan lebih lanjut dalam `personas.md`.

-   **Persona utama:** pengguna digital yang membutuhkan opsi pembayaran
    fleksibel dan terbiasa menggunakan aplikasi pada ponsel.
-   **Kebutuhan utama:** memahami layanan FlexiPay, mengakses halaman
    utama, melihat aktivitas transaksi, dan mengetahui informasi tagihan
    atau pembayaran yang tersedia.
-   **Catatan:** nama, usia, pekerjaan, kebiasaan, dan hambatan spesifik
    persona perlu diselaraskan dengan hasil riset atau persona final
    tim.

## 4. Tujuan dan Metrik

-   **Tujuan 1:** pengguna dapat menemukan informasi utama layanan
    FlexiPay melalui navigasi aplikasi yang jelas.
-   **Tujuan 2:** pengguna dapat memahami informasi transaksi dan
    tagihan yang ditampilkan pada prototipe.
-   **Tujuan 3:** pengguna dapat menyelesaikan alur utama aplikasi tanpa
    kebingungan yang menghambat.
-   **Metrik kegunaan:** minimal 4 dari 5 responden uji coba dapat
    menemukan informasi transaksi atau tagihan yang diminta tanpa
    bantuan.
-   **Metrik penyelesaian tugas:** minimal 4 dari 5 responden dapat
    menyelesaikan skenario penggunaan utama yang ditentukan tim.
-   **Metrik pemahaman:** minimal 4 dari 5 responden dapat menjelaskan
    status transaksi atau tagihan berdasarkan informasi yang
    ditampilkan.
-   **Catatan:** target di atas merupakan target awal untuk pengujian
    prototipe dan dapat diperbarui setelah pengujian pertama.

## 5. Scope MVP

### Masuk dalam MVP

-   Menyediakan halaman awal atau beranda FlexiPay sebagai titik masuk
    pengguna.
-   Menyediakan navigasi ke bagian utama aplikasi sesuai rancangan
    UI/UX.
-   Menampilkan informasi layanan PayLater yang relevan dengan
    prototipe.
-   Menampilkan ringkasan atau daftar transaksi menggunakan data
    prototipe/dummy.
-   Menampilkan informasi tagihan atau pembayaran yang tersedia pada
    rancangan aplikasi.
-   Menyediakan halaman akun atau profil jika termasuk dalam rancangan
    layar final.
-   Menampilkan keadaan antarmuka untuk kondisi penting, seperti data
    tersedia, data kosong, atau input yang tidak valid, sesuai alur yang
    disepakati tim.

### Tidak masuk dalam MVP

-   Pemrosesan pembayaran uang sungguhan.
-   Integrasi dengan bank, penyedia pembayaran, atau merchant eksternal.
-   Pengajuan kredit dan penilaian kelayakan kredit secara nyata.
-   Verifikasi identitas/KYC yang terhubung ke layanan resmi.
-   Penarikan dana atau pencairan kredit nyata.
-   Pengiriman notifikasi transaksi melalui SMS, WhatsApp, atau push
    notification sungguhan.
-   Klaim bahwa prototipe merupakan layanan keuangan yang sudah
    beroperasi atau telah memperoleh persetujuan regulator.

## 6. Fitur dan Prioritas

Prioritas berikut adalah usulan awal untuk MVP dan perlu disesuaikan
dengan layar serta alur FlexiPay yang telah disepakati kelompok.

-   **Must:** halaman awal/beranda yang menampilkan informasi utama
    FlexiPay.
-   **Must:** navigasi ant halaman utama yang konsisten dan dapat
    digunakan.
-   **Must:** tampilan informasi transaksi dengan data prototipe.
-   **Must:** tampilan informasi tagihan atau pembayaran yang relevan
    dengan rancangan aplikasi.
-   **Must:** validasi dasar pada formulir atau input yang tersedia
    dalam prototipe.
-   **Should:** halaman detail transaksi atau tagihan jika tercakup
    dalam rancangan UI/UX.
-   **Should:** halaman profil dan informasi akun jika tercakup dalam
    rancangan UI/UX.
-   **Could:** pencarian atau penyaringan transaksi jika dibutuhkan dan
    waktu pengembangan mencukupi.
-   **Won't (untuk MVP ini):** pembayaran nyata, integrasi lembaga
    keuangan, dan keputusan kredit otomatis.

## 7. Aturan Bisnis

-   **BR-01:** seluruh nominal uang yang ditampilkan harus menggunakan
    format mata uang Rupiah (Rp) secara konsisten.
-   **BR-02:** status transaksi dan tagihan harus ditampilkan sesuai
    data yang tersedia; aplikasi tidak boleh menampilkan status berhasil
    jika data prototipe tidak menyatakan berhasil.
-   **BR-03:** data yang digunakan untuk demonstrasi harus ditandai dan
    diperlakukan sebagai data dummy jika bukan data transaksi nyata.
-   **BR-04:** setiap informasi tagihan yang ditampilkan harus memuat
    keterangan yang cukup untuk membedakan nominal, tanggal terkait, dan
    statusnya apabila data tersebut tersedia.
-   **BR-05:** pengguna harus menerima umpan balik yang jelas ketika
    input tidak valid atau suatu tindakan tidak dapat dilanjutkan.
-   **BR-06:** prototipe tidak boleh menyatakan bahwa pembayaran atau
    pengajuan kredit telah diproses secara nyata apabila belum ada
    integrasi layanan yang mendukungnya.
-   **BR-07:** fitur yang membutuhkan autentikasi hanya boleh
    menampilkan data akun pengguna yang sesuai dengan skenario
    prototipe; penggunaan data pribadi nyata tidak diperlukan untuk
    demonstrasi.

## 8. Non-Fungsional

-   **Kemudahan penggunaan:** navigasi, label, dan informasi utama harus
    mudah dipahami oleh pengguna aplikasi ponsel.
-   **Konsistensi:** komponen, istilah, format nominal, dan status harus
    konsisten di seluruh halaman.
-   **Responsivitas:** tampilan harus dapat digunakan pada ukuran layar
    ponsel yang menjadi target prototipe.
-   **Kinerja:** perpindahan halaman dan interaksi utama harus terasa
    responsif selama demonstrasi.
-   **Keamanan dasar:** jangan menyimpan atau menampilkan kata sandi
    dalam teks biasa dan jangan menggunakan data pribadi nyata untuk
    data demo.
-   **Privasi:** hanya tampilkan informasi yang dibutuhkan untuk
    skenario penggunaan.
-   **Aksesibilitas:** teks penting harus terbaca, tombol memiliki label
    yang jelas, dan informasi tidak dibedakan hanya melalui warna.
-   **Keandalan:** halaman utama dan alur MVP harus dapat dijalankan
    berulang kali selama pengujian tanpa error yang menghalangi tugas
    utama.

## 9. Asumsi dan Risiko

### Asumsi

-   FlexiPay diposisikan sebagai aplikasi layanan PayLater/BNPL
    berdasarkan konteks proyek yang tersedia.
-   MVP yang dikerjakan adalah prototipe untuk kebutuhan proyek
    akademik, bukan sistem pembayaran atau pemberian kredit yang
    benar-benar beroperasi.
-   Data transaksi, tagihan, dan akun untuk demonstrasi dapat
    menggunakan data dummy.
-   Rincian final halaman dan fitur mengikuti rancangan UI/UX FlexiPay
    yang disepakati oleh kelompok.
-   Target metrik pada bagian 4 merupakan target awal yang dapat
    direvisi setelah pengujian pengguna.

### Risiko

-   Fitur yang tercantum dalam rancangan layar belum seluruhnya
    terkonfirmasi sebagai bagian dari MVP.
-   Pengguna dapat salah mengira data dummy sebagai transaksi atau
    tagihan nyata jika penanda prototipe tidak jelas.
-   Ruang lingkup dapat melebar apabila integrasi pembayaran, verifikasi
    identitas, atau proses kredit nyata dimasukkan.
-   Informasi tagihan yang tidak konsisten dapat membuat pengguna salah
    memahami kewajiban pembayaran.
-   Pengujian dengan jumlah responden terbatas belum tentu mewakili
    seluruh calon pengguna.

### Hal yang perlu dikonfirmasi oleh tim

-   Daftar fitur dan halaman final yang benar-benar terlihat pada
    rancangan FlexiPay.
-   Apakah alur login/registrasi termasuk dalam MVP atau hanya simulasi.
-   Informasi tagihan dan transaksi apa saja yang perlu ditampilkan.
-   Apakah fitur profil, limit, riwayat transaksi, dan pembayaran
    termasuk dalam cakupan final.
-   Target pengguna dan metrik keberhasilan setelah persona serta hasil
    uji pengguna ditetapkan.
