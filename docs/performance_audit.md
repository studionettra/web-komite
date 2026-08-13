# 🚀 Audit Performa Web Komite

Hasil investigasi menyeluruh codebase untuk menemukan semua peluang peningkatan kecepatan situs.

---

## Ringkasan Temuan

| Kategori | Temuan | Dampak |
|---|---|---|
| 🖼️ Image Optimization | 18 dari 20 `<img>` tanpa `loading="lazy"` | 🔴 Tinggi |
| 📦 Bundle Size | Framer Motion, Swiper, Elfsight dimuat tanpa code-splitting | 🔴 Tinggi |
| 🗄️ Server Caching | Tidak ada cache sama sekali di controller | 🔴 Tinggi |
| 🔄 Inertia Deferred Props | Tidak dimanfaatkan | 🟡 Sedang |
| 🛡️ N+1 Prevention | `preventLazyLoading()` belum diaktifkan | 🟡 Sedang |
| 📐 Image Dimensions | Tidak ada `width`/`height` pada `<img>` (CLS) | 🟡 Sedang |
| 🌐 Third-party Script | Elfsight CDN blocking di Home page | 🟡 Sedang |
| 🗜️ Compression | Tidak ada konfigurasi Gzip/Brotli | 🟡 Sedang |

---

## 1. 🖼️ Image Lazy Loading (Dampak: TINGGI)

**Masalah**: 18/20 tag `<img>` tidak pakai `loading="lazy"`. Browser memuat SEMUA gambar sekaligus saat halaman dibuka.

**Yang perlu `loading="lazy"`** (7 gambar publik, below-the-fold):

| File | Baris | Konteks |
|---|---|---|
| [Home.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/Home.tsx#L632) | 632 | Post images (Kabar Terbaru) |
| [Programs.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/Programs.tsx#L345) | 345 | Card program |
| [Programs.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/Programs.tsx#L557) | 557 | Dokumentasi modal |
| [posts/Show.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/posts/Show.tsx#L159) | 159 | Related post images |
| [posts/Index.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/posts/Index.tsx#L160) | 160 | Post list images |
| [programs/Show.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/programs/Show.tsx#L238) | 238 | Dokumentasi program |
| [programs/Index.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/programs/Index.tsx#L236) | 236 | Program existing images |

**Yang JANGAN diberi lazy load** (above-the-fold, justru memperlambat LCP):
- Hero banner Swiper (Home.tsx baris 193, 216)
- Featured image post (posts/Show.tsx baris 106) — tambahkan `fetchPriority="high"` agar LCP lebih cepat
- Logo navbar/sidebar (kecil, selalu terlihat)

---

## 2. 📐 Image Dimensions — CLS (Dampak: SEDANG)

**Masalah**: Hampir semua `<img>` tidak punya atribut `width` dan `height`. Ini menyebabkan **Cumulative Layout Shift (CLS)** — konten bergeser saat gambar selesai dimuat.

**Solusi**: Gunakan CSS `aspect-ratio` pada container (sebagian sudah via `aspect-video`, `aspect-[4/3]`), tapi yang belum punya container aspect-ratio perlu ditambahkan.

---

## 3. 📦 Bundle Size — Code Splitting (Dampak: TINGGI)

**Masalah**: Tidak ada `React.lazy()` di seluruh project. Semua halaman dan library besar dimuat dalam satu bundle.

Library berat yang terdeteksi:

| Package | Ukuran ±  | Hanya dipakai di |
|---|---|---|
| `framer-motion` v12 | ~120KB gzipped | 4 file (Organization, Error, PublicLayout, GlobalAlertModal) |
| `swiper` v14 | ~50KB gzipped | 1 file (Home.tsx) |
| `trix` editor | ~80KB gzipped | 1 file (admin posts form) |
| `@marsidev/react-turnstile` | ~10KB | 1 file |
| Elfsight CDN script | External | 1 file (Home.tsx) — blocking! |

**Solusi**:
- Gunakan **dynamic import** / `React.lazy()` untuk halaman yang pakai library berat
- Swiper hanya dipakai di Home → import dinamis
- Trix hanya di admin → pastikan tidak terbawa ke bundle publik
- Inertia v3 sudah otomatis code-split per page via `@inertiajs/vite` plugin ✅, tapi library yang di-import tetap ikut bundle halaman itu

---

## 4. 🗄️ Server-Side Caching (Dampak: TINGGI)

**Masalah**: **Nol penggunaan `Cache::`** di seluruh application. Setiap request menjalankan query database dari awal, termasuk data yang jarang berubah.

Data yang layak di-cache:

| Data | Controller | TTL yang Disarankan |
|---|---|---|
| Banner aktif | [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L70) | 5-15 menit |
| Program + activities | [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L56) | 5-10 menit |
| Recent posts (homepage) | [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L72) | 5 menit |
| Organization data | [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L83) | 1 jam (statis) |
| Programs listing (publik) | [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L213) | 10 menit |

**Contoh implementasi**:
```php
$banners = Cache::remember('banners.active', 600, function () {
    return Banner::where('is_active', true)->orderBy('order')->get();
});
```

---

## 5. 🔄 Inertia v3 Deferred Props (Dampak: SEDANG)

**Masalah**: `Inertia::defer()` dan `Inertia::optional()` sama sekali tidak digunakan. Semua props dikirim sekaligus dalam initial page load.

**Contoh yang bisa di-defer**:
- [HomeController](file:///c:/laragon/www/web-komite/app/Http/Controllers/HomeController.php#L74-L80): `recentPosts` dan `activePrograms` bisa di-defer karena berada di bawah fold
- Related posts di post detail bisa `Inertia::defer()`
- Activity logs di dashboard bisa `Inertia::defer()`

```php
return Inertia::render('public/Home', [
    'banners' => $banners,           // langsung (above-fold)
    'heroProgram' => $heroProgram,   // langsung (above-fold)
    'activePrograms' => Inertia::defer(fn () => $activePrograms),
    'recentPosts' => Inertia::defer(fn () => $recentPosts),
    'upcomingSessions' => Inertia::defer(fn () => $upcomingSessions),
]);
```

---

## 6. 🛡️ N+1 Query Prevention (Dampak: SEDANG)

**Masalah**: `Model::preventLazyLoading()` belum diaktifkan di [AppServiceProvider](file:///c:/laragon/www/web-komite/app/Providers/AppServiceProvider.php). Tidak ada proteksi terhadap N+1 queries.

**Solusi**: Tambahkan ke `configureDefaults()`:
```php
Model::preventLazyLoading(! app()->isProduction());
```

---

## 7. 🌐 Third-Party Script (Dampak: SEDANG)

**Masalah**: [Home.tsx](file:///c:/laragon/www/web-komite/resources/js/pages/public/Home.tsx#L36) memuat script Elfsight CDN (`elfsightcdn.com/platform.js`) secara **eager** di `useEffect`. Script ini blocking dan menambah waktu load halaman utama.

**Solusi**: Muat hanya ketika widget masuk viewport menggunakan `IntersectionObserver`:
```tsx
useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            const script = document.createElement('script');
            script.src = 'https://elfsightcdn.com/platform.js';
            script.async = true;
            document.body.appendChild(script);
            observer.disconnect();
        }
    });
    const target = document.querySelector('.elfsight-app-...');
    if (target) observer.observe(target);
}, []);
```

---

## 8. 🗜️ Compression (Dampak: SEDANG)

**Masalah**: Tidak ada konfigurasi Gzip/Brotli di level aplikasi. Ini bergantung sepenuhnya pada web server (Nginx/Apache).

**Solusi**: Pastikan di server production sudah aktif:
- **Nginx**: `gzip on;` + `brotli on;`
- **Apache**: `mod_deflate` + `mod_brotli`
- Atau gunakan **Laravel Cloud** yang handle ini otomatis

---

## 9. 🔒 Query Optimization (Dampak: RENDAH-SEDANG)

**Temuan di [ProgramController](file:///c:/laragon/www/web-komite/app/Http/Controllers/ProgramController.php#L18)**:
```php
$allPrograms = Program::with(['users', 'activities'])->get()->sortBy(...)
```

Masalah: `->get()->sortBy()` mengambil SEMUA program lalu sorting di PHP. Seharusnya sorting di database:
```php
Program::with(['users', 'activities'])->orderByRaw('...' )->paginate(15)
```

---

## 10. ⚡ Hero Image LCP (Dampak: SEDANG)

**Masalah**: Hero banner dan featured image tidak punya `fetchPriority="high"`. Browser tidak tahu mana gambar yang paling penting.

**Solusi** untuk gambar above-the-fold:
```tsx
<img
    src={`/storage/${banner.image}`}
    alt={banner.title || 'Banner'}
    fetchPriority="high"
    decoding="async"
    className="..."
/>
```

---

## Prioritas Implementasi (Rekomendasi)

| Urutan | Aksi | Estimasi Dampak | Effort |
|---|---|---|---|
| 1 | ✅ Tambah `loading="lazy"` ke 7 gambar publik | Hemat bandwidth 30-60% | Kecil |
| 2 | ✅ Tambah `fetchPriority="high"` ke hero images | LCP lebih cepat 200-500ms | Kecil |
| 3 | ✅ Cache query di HomeController | Response time turun 50-80% | Kecil |
| 4 | ✅ Defer Inertia props (below-fold) | Initial payload lebih ringan | Kecil |
| 5 | ✅ Lazy load Elfsight script (IntersectionObserver) | Home page load lebih cepat | Kecil |
| 6 | ⚙️ Aktifkan `preventLazyLoading()` | Deteksi N+1 | Kecil |
| 7 | ⚙️ Pastikan Gzip/Brotli di server | Transfer size turun 60-80% | Kecil |
| 8 | ⚙️ Optimasi query ProgramController | Kurangi beban server | Sedang |

> [!TIP]
> Item 1-5 bisa dikerjakan sekarang dengan perubahan minimal dan dampak signifikan. Mau saya eksekusi semua?
