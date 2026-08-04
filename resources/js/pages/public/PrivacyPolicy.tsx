import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { ShieldCheck, ArrowLeft } from '@phosphor-icons/react';

export default function PrivacyPolicy() {
    return (
        <PublicLayout>
            <Head title="Kebijakan Privasi" />
            
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
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <ShieldCheck weight="duotone" className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Kebijakan Privasi</h1>
                                <p className="mt-2 text-slate-500">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-a:font-semibold">
                            <p className="lead text-lg text-slate-600">
                                Komite TKIT Al-Ikhlash ("Kami") sangat menghargai dan melindungi privasi serta data pribadi Anda. 
                                Kebijakan Privasi ini disusun berdasarkan ketentuan <strong>Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong> Republik Indonesia.
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Perolehan dan Pengumpulan Data Pribadi</h3>
                            <p>
                                Untuk memberikan layanan yang optimal, terutama dalam fitur transparansi keuangan, Kami mengumpulkan Data Pribadi yang Anda berikan secara langsung saat melakukan verifikasi, meliputi:
                            </p>
                            <ul>
                                <li><strong>Nama Siswa:</strong> Digunakan untuk mencocokkan identitas dengan database sekolah.</li>
                                <li><strong>Kelas Siswa:</strong> Digunakan untuk memfilter dan memberikan akses laporan keuangan yang tepat sasaran sesuai kelas anak Anda.</li>
                            </ul>
                            <p>
                                Kami mengumpulkan data ini secara sah dan transparan, semata-mata untuk keperluan internal Komite dan verifikasi hak akses orang tua/wali murid.
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Penggunaan Data Pribadi</h3>
                            <p>Berdasarkan asas pelindungan data, Kami menggunakan Data Pribadi Anda hanya untuk tujuan berikut:</p>
                            <ul>
                                <li>Memverifikasi status Anda sebagai orang tua/wali murid yang sah.</li>
                                <li>Memberikan akses yang aman ke dokumen laporan keuangan kelas terkait.</li>
                                <li>Mencegah akses yang tidak sah atau penyalahgunaan sistem oleh pihak luar.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Penyimpanan dan Keamanan Data Pribadi</h3>
                            <p>
                                Kami berkomitmen untuk melindungi Data Pribadi Anda dari akses, pengungkapan, atau modifikasi yang tidak sah. Data identitas siswa disimpan secara aman di dalam sistem basis data kami (database) dan hanya dapat dikelola oleh pengurus Komite yang memiliki otorisasi (Superadmin atau Korlas).
                            </p>
                            <p>
                                Kami tidak akan pernah menjual, menyewakan, atau membagikan Data Pribadi siswa kepada pihak ketiga untuk tujuan komersial apapun.
                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Hak Subjek Data Pribadi</h3>
                            <p>Sesuai dengan Pasal 5-14 UU PDP, Anda sebagai orang tua/wali murid (mewakili anak/siswa sebagai subjek data) memiliki hak untuk:</p>
                            <ul>
                                <li>Mendapatkan informasi tentang kejelasan identitas dan dasar kepentingan penggunaan data.</li>
                                <li>Meminta pembaruan atau perbaikan atas kesalahan dan/atau ketidakakuratan Data Pribadi.</li>
                                <li>Meminta penghapusan Data Pribadi apabila siswa telah lulus atau pindah dari TKIT Al-Ikhlash (berdasarkan kebijakan retensi data sekolah).</li>
                            </ul>
                            <p>Untuk menggunakan hak-hak tersebut, Anda dapat menghubungi Pengurus Komite atau Koordinator Kelas (Korlas) Anda.</p>

                            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Perubahan Kebijakan Privasi</h3>
                            <p>
                                Kami berhak untuk memperbarui atau mengubah Kebijakan Privasi ini kapan saja untuk menyesuaikan dengan perubahan layanan atau kepatuhan terhadap peraturan perundang-undangan terbaru. Setiap perubahan akan dicantumkan pada halaman ini dengan tanggal "Pembaruan Terakhir" yang disesuaikan.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
