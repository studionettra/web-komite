# Panduan Deployment ke Hostinger Shared Hosting

Catatan ini merupakan evaluasi dan panduan deployment berdasarkan tanggapan agent Hostinger terkait kompatibilitas stack aplikasi (Laravel 13, Inertia, React 19, Vite 8).

## Evaluasi Lingkungan Hostinger (Business Web Hosting)

Tanggapan dari agent Hostinger **100% akurat dan realistis** untuk lingkungan *Shared Hosting*. Berikut adalah analisis dari poin-poin yang disampaikan:

### 1. Build Vite/React di Lokal (Solusi Utama)
Di shared hosting, resource Node.js biasanya sangat terbatas atau versinya tertinggal.
Saran untuk melakukan build di komputer lokal (dengan menjalankan `npm run build`) lalu mengunggah folder `/public/build` beserta file backend adalah **best practice**. Ini menghemat resource server agar fokus melayani request HTTP dari user, bukan melakukan kompilasi asset.

### 2. Workaround untuk Queue Worker
Laravel mengandalkan worker (daemon) yang terus berjalan di latar belakang untuk tugas antrean (misal: kirim email). Shared hosting mematikan proses persistent yang berjalan terus-menerus.
Solusinya: Menggunakan **Cron Job** yang berjalan setiap menit (`* * * * *`) dengan menjalankan perintah:
```bash
php artisan queue:work --stop-when-empty
```
Ini berarti setiap menit, server akan mengecek apakah ada antrean. Jika ada akan diproses lalu worker berhenti. Jika tidak ada, worker langsung berhenti. Ini sangat aman untuk shared hosting.

### 3. Tidak Ada WebSockets (Real-time)
Aplikasi ini tidak menggunakan fitur WebSockets (seperti Laravel Reverb atau Pusher) yang membutuhkan persistent open connection. Oleh karena itu, aplikasi akan berjalan lancar dengan sistem request-response HTTP standar.

### 4. Rekomendasi VPS (Saran Jangka Panjang)
Untuk aplikasi berbasis SPA (React/Inertia) dengan traffic tinggi, VPS memang lebih ideal. Namun untuk tahap launching awal, paket Business Web Hosting sudah sangat mencukupi selama Anda mengikuti alur deployment di bawah ini.

---

## 🚀 Rekomendasi Alur Deployment (Deployment Flow)

Ketika Anda siap untuk deploy, ikuti langkah-langkah berikut:

1. **Lakukan Build Asset di Komputer Lokal:**
   Jalankan perintah ini di komputer Anda sebelum upload:
   ```bash
   npm run build
   ```
   Ini akan menghasilkan file terkompilasi di dalam direktori `public/build/`.

2. **Upload File ke Hostinger:**
   Anda bisa menggunakan Git (melalui fitur Git di hPanel / SSH) atau mengompres seluruh project menjadi file `.zip` (termasuk folder `/public/build/`) lalu mengekstraknya di File Manager Hostinger.
   *(Catatan: Jangan upload folder `node_modules` karena ukurannya sangat besar dan tidak dibutuhkan di production).*

3. **Install Dependensi PHP (via SSH/Terminal hPanel):**
   Masuk ke direktori project Anda di server, lalu jalankan:
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

4. **Migrasi Database:**
   Setelah mengatur file `.env` untuk koneksi database production, jalankan:
   ```bash
   php artisan migrate --force
   ```

5. **Konfigurasi Tambahan untuk Shared Hosting:**
   Anda mungkin akan membutuhkan pengaturan `.htaccess` khusus agar request diteruskan ke `/public/index.php` dan tidak terjadi *error 404* saat me-refresh halaman (routing frontend React).
