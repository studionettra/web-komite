import { Link } from '@inertiajs/react';
import { Users, Wallet, Info, ArrowRight } from '@phosphor-icons/react';

export default function KorlasDashboard({ classroom, students_count }: any) {
    if (!classroom) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm sm:p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-50 text-slate-400">
                    <Info weight="fill" className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    Belum Ada Kelas
                </h3>
                <p className="max-w-md text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Akun Anda saat ini belum ditautkan ke kelas mana pun.
                    Silakan hubungi Admin untuk penugasan kelas agar Anda dapat
                    mengelola data siswa dan laporan keuangan.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="px-1 text-lg font-bold tracking-tight text-slate-900">
                    Ringkasan Kelas {classroom.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                        Bulan:{' '}
                        {new Date().toLocaleDateString('id-ID', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Siswa */}
                <div className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Users weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Total Siswa Aktif
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {students_count || 0}
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/korlas/students"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-5 py-3 text-sm font-bold text-blue-600 transition-all hover:bg-blue-100 hover:shadow-sm"
                        >
                            Kelola Siswa{' '}
                            <ArrowRight weight="bold" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Status Setoran */}
                <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Wallet weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Laporan Setoran Kelas
                    </div>
                    <div className="mt-2 text-sm font-semibold text-slate-900">
                        Tersinkronisasi dengan Google Sheets
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/korlas/collections"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-100 hover:shadow-sm"
                        >
                            Buka Laporan Setoran{' '}
                            <ArrowRight weight="bold" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Info Tambahan */}
                <div className="group rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ">
                    <div className="mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
                            <Info weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">
                        Panduan Korlas
                    </h3>
                    <p className="text-xs leading-relaxed font-bold text-slate-300">
                        Pastikan seluruh data siswa terinput. Untuk laporan
                        keuangan kelas (uang kas/donasi), Anda dapat menautkan
                        link Google Sheet dan mengatur status tayangnya secara
                        mandiri dari menu Data Kas Kelas.
                    </p>
                </div>
            </div>
        </div>
    );
}
