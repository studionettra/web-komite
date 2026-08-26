import { Head, Link } from '@inertiajs/react';
import { ShieldCheck, ArrowLeft } from '@phosphor-icons/react';
import PublicLayout from '@/layouts/PublicLayout';

export default function PrivacyPolicy() {
    return (
        <PublicLayout>
            <Head title="Kebijakan Privasi - Komite KBIT-TKIT Al-Ikhlash" />

            <div className="relative z-0 overflow-hidden bg-slate-50 pt-28 pb-12 sm:pt-36 sm:pb-20">
                {/* Decorative Background Blobs */}
                <div className="absolute top-0 right-0 -z-10 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-300/20 mix-blend-multiply blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-blue-600"
                        >
                            <ArrowLeft weight="bold" className="h-4 w-4" />
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-10 lg:p-12">
                        <div className="mb-10 flex flex-col items-center gap-5 border-b border-slate-100 pb-10 text-center md:flex-row md:text-left">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-blue-100 shadow-inner">
                                <ShieldCheck
                                    weight="fill"
                                    className="h-8 w-8 text-blue-600"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    Kebijakan Privasi
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

                        <div className="prose prose-slate prose-blue prose-headings:font-extrabold prose-h3:text-xl prose-p:leading-relaxed prose-a:font-semibold max-w-none">
                            <p className="lead text-medium font-medium text-slate-600">
                                Komite TKIT Al-Ikhlash ("Kami") sangat
                                menghargai dan melindungi privasi serta data
                                pribadi Anda. Kebijakan Privasi ini disusun
                                berdasarkan ketentuan{' '}
                                <strong>
                                    Undang-Undang Nomor 27 Tahun 2022 tentang
                                    Pelindungan Data Pribadi (UU PDP)
                                </strong>{' '}
                                Republik Indonesia.
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                1. Perolehan dan Pengumpulan Data Pribadi
                            </h3>
                            <p>
                                Untuk memberikan layanan yang optimal, terutama
                                dalam fitur transparansi keuangan, Kami
                                mengumpulkan Data Pribadi yang Anda berikan
                                secara langsung saat melakukan verifikasi,
                                meliputi:
                            </p>
                            <div className="not-prose my-8 grid gap-4">
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-sm font-extrabold">
                                            1
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Nama Siswa
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Digunakan untuk mencocokkan
                                            identitas dengan database sekolah.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-sm font-extrabold">
                                            2
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Kelas Siswa
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Digunakan untuk memfilter dan
                                            memberikan akses laporan keuangan
                                            yang tepat sasaran sesuai kelas anak
                                            Anda.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>
                                Kami mengumpulkan data ini secara sah dan
                                transparan, semata-mata untuk keperluan internal
                                Komite dan verifikasi hak akses orang tua/wali
                                murid.
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                2. Penggunaan Data Pribadi
                            </h3>
                            <p>
                                Berdasarkan asas pelindungan data, Kami
                                menggunakan Data Pribadi Anda hanya untuk tujuan
                                berikut:
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
                                    <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                        Memverifikasi status Anda sebagai orang
                                        tua/wali murid yang sah.
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
                                    <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                        Memberikan akses yang aman ke dokumen
                                        laporan keuangan kelas terkait.
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                            <span className="text-sm font-extrabold">
                                                C
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                        Mencegah akses yang tidak sah atau
                                        penyalahgunaan sistem oleh pihak luar.
                                    </div>
                                </div>
                            </div>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                3. Penyimpanan dan Keamanan Data Pribadi
                            </h3>
                            <p>
                                Kami berkomitmen untuk melindungi Data Pribadi
                                Anda dari akses, pengungkapan, atau modifikasi
                                yang tidak sah. Data identitas siswa disimpan
                                secara aman di dalam sistem basis data kami
                                (database) dan hanya dapat dikelola oleh
                                pengurus Komite yang memiliki otorisasi
                                (Superadmin atau Korlas).
                            </p>
                            <div className="not-prose my-6">
                                <div className="flex flex-col items-center gap-4 rounded-2xl bg-blue-50 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <p className="text-sm leading-relaxed font-semibold text-blue-900">
                                        Kami tidak akan pernah menjual,
                                        menyewakan, atau membagikan Data Pribadi
                                        siswa kepada pihak ketiga untuk tujuan
                                        komersial apapun.
                                    </p>
                                </div>
                            </div>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                4. Hak Subjek Data Pribadi
                            </h3>
                            <p>
                                Sesuai dengan Pasal 5-14 UU PDP, Anda sebagai
                                orang tua/wali murid (mewakili anak/siswa
                                sebagai subjek data) memiliki hak untuk:
                            </p>
                            <div className="not-prose my-8 grid gap-4">
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        </div>
                                    </div>
                                    <div className="mt-0.5 text-sm leading-relaxed font-medium text-slate-600">
                                        Mendapatkan informasi tentang kejelasan
                                        identitas dan dasar kepentingan
                                        penggunaan data.
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        </div>
                                    </div>
                                    <div className="mt-0.5 text-sm leading-relaxed font-medium text-slate-600">
                                        Meminta pembaruan atau perbaikan atas
                                        kesalahan dan/atau ketidakakuratan Data
                                        Pribadi.
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 shrink-0 text-blue-500">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        </div>
                                    </div>
                                    <div className="mt-0.5 text-sm leading-relaxed font-medium text-slate-600">
                                        Meminta penghapusan Data Pribadi apabila
                                        siswa telah lulus atau pindah dari TKIT
                                        Al-Ikhlash (berdasarkan kebijakan
                                        retensi data sekolah).
                                    </div>
                                </div>
                            </div>
                            <p>
                                Untuk menggunakan hak-hak tersebut, Anda dapat
                                menghubungi Pengurus Komite atau Koordinator
                                Kelas (Korlas) Anda.
                            </p>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                5. Penggunaan Cookies dan Pelacakan (Tracking)
                            </h3>
                            <p>
                                Komite TKIT Al-Ikhlash sangat menghargai privasi Anda dalam menelusuri situs ini:
                            </p>
                            <div className="not-prose my-8 grid gap-4">
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-sm font-extrabold">1</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Tidak Ada Pelacakan Pemasaran
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Kami <strong>tidak</strong> menggunakan <i>Tracking Cookies</i> pihak ketiga (seperti Google Analytics atau Facebook Pixel) untuk memantau gerak-gerik atau riwayat penjelajahan Anda di halaman publik seperti Kabar Terkini.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <span className="text-sm font-extrabold">2</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Cookies Esensial Keamanan
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Kami hanya menggunakan <i>Cookies</i> fungsional yang aktif semata-mata saat Anda <i>Login</i> untuk mengakses fitur <strong>Laporan Keuangan</strong> dan <strong>Kalender Akademik</strong>, guna memvalidasi sesi Anda secara aman dan melindungi situs dari pemalsuan permintaan silang.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                        <span className="text-sm font-extrabold">3</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-slate-800">
                                            Log Audit Akses
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed font-medium text-slate-600">
                                            Untuk menjaga transparansi, sistem kami dapat mencatat riwayat (log) ketika sebuah akun otentik mengakses laporan keuangan dan kalender akademik. Hal ini merupakan standar keamanan internal, bukan pelacakan profil personal.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mt-10 mb-4 font-bold text-slate-800">
                                6. Perubahan Kebijakan Privasi
                            </h3>
                            <p>
                                Kami berhak untuk memperbarui atau mengubah
                                Kebijakan Privasi ini kapan saja untuk
                                menyesuaikan dengan perubahan layanan atau
                                kepatuhan terhadap peraturan perundang-undangan
                                terbaru. Setiap perubahan akan dicantumkan pada
                                halaman ini dengan tanggal "Pembaruan Terakhir"
                                yang disesuaikan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
