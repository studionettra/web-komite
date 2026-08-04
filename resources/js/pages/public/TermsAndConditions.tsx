import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { Scroll, ArrowLeft } from '@phosphor-icons/react';

export default function TermsAndConditions() {
    return (
        <PublicLayout>
            <Head title="Syarat dan Ketentuan" />
            
            <div className="bg-slate-50 py-12 sm:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft weight="bold" />
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:p-12">
                        <div className="mb-10 flex items-center gap-4 border-b border-slate-100 pb-10">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                <Scroll weight="duotone" className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Syarat dan Ketentuan</h1>
                                <p className="mt-2 text-slate-500">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="prose prose-slate prose-amber max-w-none prose-headings:font-bold prose-a:font-semibold">
                            <p className="lead text-lg text-slate-600">
                                Selamat datang di Sistem Informasi Komite TKIT Al-Ikhlash. Dengan mengakses dan menggunakan situs web ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan di bawah ini.
                            </p>
                            <p>
                                Syarat dan Ketentuan ini tunduk pada hukum negara Republik Indonesia, khususnya <strong>Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik sebagaimana telah diubah dengan Undang-Undang Nomor 1 Tahun 2024 (UU ITE)</strong>.
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Definisi dan Penggunaan Layanan</h3>
                            <p>
                                Sistem ini disediakan sebagai wadah informasi program, kalender akademik, dan transparansi laporan keuangan khusus bagi orang tua/wali murid TKIT Al-Ikhlash. Penggunaan sistem ini semata-mata untuk kepentingan internal antara Komite, Sekolah, dan Wali Murid.
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Kewajiban dan Larangan Pengguna</h3>
                            <p>Dalam menggunakan situs ini, Anda secara tegas <strong>DILARANG</strong> untuk:</p>
                            <ul>
                                <li>
                                    <strong>Menyebarkan Laporan Keuangan:</strong> Mengunduh (download), mengambil tangkapan layar (screenshot), dan/atau mendistribusikan laporan keuangan komite/kelas ke media sosial atau pihak ketiga yang tidak berkepentingan (Pasal 26 UU ITE mengenai kerahasiaan informasi elektronik tertutup).
                                </li>
                                <li>
                                    <strong>Pemalsuan Identitas:</strong> Melakukan manipulasi, mencoba login, atau menggunakan nama siswa lain untuk mendapatkan akses yang bukan merupakan hak Anda.
                                </li>
                                <li>
                                    <strong>Peretasan (Hacking):</strong> Melakukan tindakan yang merusak, mengganggu, atau membebani infrastruktur server secara tidak wajar (DoS/DDoS) maupun mencoba mengeksploitasi kerentanan sistem.
                                </li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Hak Kekayaan Intelektual</h3>
                            <p>
                                Seluruh konten yang terdapat di dalam situs ini, termasuk namun tidak terbatas pada logo, desain antarmuka, teks, grafik, dan susunan kode (source code) adalah milik Komite TKIT Al-Ikhlash dan/atau pengembang pihak ketiga yang ditunjuk, serta dilindungi oleh hukum Hak Cipta. 
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Batasan Tanggung Jawab (Disclaimer)</h3>
                            <p>
                                Komite berupaya semaksimal mungkin untuk menyajikan informasi yang akurat dan tepat waktu. Namun demikian:
                            </p>
                            <ul>
                                <li><strong>Kalender Akademik &amp; Program:</strong> Jadwal kegiatan dan program komite dapat berubah sewaktu-waktu menyesuaikan kondisi aktual atau kebijakan pihak sekolah. Komite tidak bertanggung jawab atas kerugian materiil/immateriil akibat perubahan jadwal tersebut.</li>
                                <li><strong>Layanan Eksternal:</strong> Penggunaan layanan pihak ketiga (misalnya Google Sheets untuk menampilkan laporan keuangan) tunduk pada syarat dan ketentuan layanan Google itu sendiri. Gangguan pada pihak ketiga di luar kendali Komite.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Pelanggaran Syarat dan Ketentuan</h3>
                            <p>
                                Apabila Anda melanggar sebagian atau seluruh Syarat dan Ketentuan ini, Komite berhak secara sepihak untuk memblokir akses Anda ke dalam sistem, mencabut hak istimewa pengguna, hingga mengambil langkah hukum yang diperlukan sesuai dengan ketentuan perundang-undangan yang berlaku.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
