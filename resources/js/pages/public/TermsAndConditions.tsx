import { Head, Link } from '@inertiajs/react';
import { Scroll, ArrowLeft } from '@phosphor-icons/react';
import PublicLayout from '@/layouts/PublicLayout';

export default function TermsAndConditions() {
    return (
        <PublicLayout>
            <Head title="Syarat dan Ketentuan - Komite KBIT-TKIT Al-Ikhlash" />

            <div className="relative z-0 overflow-hidden bg-slate-50 pt-28 pb-12 sm:pt-36 sm:pb-20">
                {/* Decorative Background Blobs */}
                <div className="absolute top-0 right-0 -z-10 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-amber-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-300/20 mix-blend-multiply blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-amber-600"
                        >
                            <ArrowLeft weight="bold" className="h-4 w-4" />
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-10 lg:p-12">
                        <div className="mb-10 flex flex-col items-center gap-5 border-b border-slate-100 pb-10 text-center md:flex-row md:text-left">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-amber-100 shadow-inner">
                                <Scroll
                                    weight="fill"
                                    className="h-8 w-8 text-amber-600"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    Syarat dan Ketentuan
                                </h1>
                                <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
                                    Pembaruan Terakhir:{' '}
                                    {new Date().toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-slate prose-amber prose-headings:font-extrabold prose-h3:text-xl prose-p:leading-relaxed prose-a:font-semibold max-w-none">
                            <p className="lead text-medium font-medium text-slate-600">
                                Selamat datang di Sistem Informasi Komite TKIT
                                Al-Ikhlash. Dengan mengakses dan menggunakan
                                situs web ini, Anda dianggap telah membaca,
                                memahami, dan menyetujui seluruh Syarat dan
                                Ketentuan di bawah ini.
                            </p>
                            <br />
                            <p className="lead text-sm font-medium">
                                Syarat dan Ketentuan ini tunduk pada hukum
                                negara Republik Indonesia, khususnya{' '}
                                <strong>
                                    Undang-Undang Nomor 11 Tahun 2008 tentang
                                    Informasi dan Transaksi Elektronik
                                    sebagaimana telah diubah dengan
                                    Undang-Undang Nomor 1 Tahun 2024 (UU ITE)
                                </strong>
                                .
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                1. Definisi dan Penggunaan Layanan
                            </h3>
                            <p>
                                Sistem ini disediakan sebagai wadah informasi
                                program, kalender akademik, dan transparansi
                                laporan keuangan khusus bagi orang tua/wali
                                murid TKIT Al-Ikhlash. Penggunaan sistem ini
                                semata-mata untuk kepentingan internal antara
                                Komite, Sekolah, dan Wali Murid.
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                2. Kewajiban dan Larangan Pengguna
                            </h3>
                            <p>
                                Dalam menggunakan situs ini, Anda secara tegas{' '}
                                <strong className="text-red-500">
                                    DILARANG
                                </strong>{' '}
                                untuk:
                            </p>
                            <div className="not-prose my-8 grid gap-4">
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <span className="text-sm font-extrabold">
                                            1
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Menyebarkan Laporan Keuangan
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Mengunduh (download), mengambil
                                            tangkapan layar (screenshot),
                                            dan/atau mendistribusikan laporan
                                            keuangan komite/kelas ke media
                                            sosial atau pihak ketiga yang tidak
                                            berkepentingan (Pasal 26 UU ITE
                                            mengenai kerahasiaan informasi
                                            elektronik tertutup).
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <span className="text-sm font-extrabold">
                                            2
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Pemalsuan Identitas
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Melakukan manipulasi, mencoba login,
                                            atau menggunakan nama siswa lain
                                            untuk mendapatkan akses yang bukan
                                            merupakan hak Anda.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <span className="text-sm font-extrabold">
                                            3
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Peretasan (Hacking)
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Melakukan tindakan yang merusak,
                                            mengganggu, atau membebani
                                            infrastruktur server secara tidak
                                            wajar (DoS/DDoS) maupun mencoba
                                            mengeksploitasi kerentanan sistem.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                3. Hak Kekayaan Intelektual
                            </h3>
                            <p>
                                Seluruh konten yang terdapat di dalam situs ini,
                                termasuk namun tidak terbatas pada logo, desain
                                antarmuka, teks, grafik, dan susunan kode
                                (source code) adalah milik Komite TKIT
                                Al-Ikhlash dan/atau pengembang pihak ketiga yang
                                ditunjuk, serta dilindungi oleh hukum Hak Cipta.
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                4. Batasan Tanggung Jawab (Disclaimer)
                            </h3>
                            <p>
                                Komite berupaya semaksimal mungkin untuk
                                menyajikan informasi yang akurat dan tepat
                                waktu. Namun demikian:
                            </p>
                            <div className="not-prose my-8 grid gap-4">
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                            <span className="text-sm font-extrabold">
                                                A
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Kalender Akademik & Program
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Jadwal kegiatan dan program komite
                                            dapat berubah sewaktu-waktu
                                            menyesuaikan kondisi aktual atau
                                            kebijakan pihak sekolah. Komite
                                            tidak bertanggung jawab atas
                                            kerugian materiil/immateriil akibat
                                            perubahan jadwal tersebut.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                            <span className="text-sm font-extrabold">
                                                B
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Layanan Eksternal
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Penggunaan layanan pihak ketiga
                                            (misalnya Google Sheets untuk
                                            menampilkan laporan keuangan) tunduk
                                            pada syarat dan ketentuan layanan
                                            Google itu sendiri. Gangguan pada
                                            pihak ketiga di luar kendali Komite.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                5. Pelanggaran Syarat dan Ketentuan
                            </h3>
                            <div className="not-prose my-6">
                                <div className="flex flex-col items-center gap-4 rounded-2xl bg-amber-50 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                        <span className="text-2xl">⚠️</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-semibold text-amber-900">
                                        Apabila Anda melanggar sebagian atau
                                        seluruh Syarat dan Ketentuan ini, Komite
                                        berhak secara sepihak untuk memblokir
                                        akses Anda ke dalam sistem, mencabut hak
                                        istimewa pengguna, hingga mengambil
                                        langkah hukum yang diperlukan sesuai
                                        dengan ketentuan perundang-undangan yang
                                        berlaku.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
