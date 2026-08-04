import { Link } from '@inertiajs/react';
import {
    Users,
    Wallet,
    Info,
    ArrowRight,
} from '@phosphor-icons/react';

export default function KorlasDashboard({
    classroom,
    students_count,
}: any) {
    if (!classroom) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Info weight="duotone" className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Belum Ada Kelas
                </h3>
                <p className="max-w-md text-slate-500">
                    Akun Anda saat ini belum ditautkan ke kelas mana pun. Silakan hubungi Admin untuk penugasan kelas agar Anda dapat mengelola data siswa dan laporan keuangan.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="px-1 text-lg font-semibold text-slate-900">
                    Ringkasan Kelas {classroom.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Bulan: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Siswa */}
                <div className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Users weight="duotone" className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mb-1 text-sm font-medium text-slate-500">
                        Total Siswa Aktif
                    </div>
                    <div className="text-3xl font-semibold tracking-tight text-slate-900">
                        {students_count || 0}
                    </div>
                    <div className="mt-4">
                        <Link
                            href="/korlas/students"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                        >
                            Kelola Siswa <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>

                {/* Status Setoran */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Wallet weight="duotone" className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mb-1 text-sm font-medium text-slate-500">
                        Laporan Setoran Kelas
                    </div>
                    <div className="text-sm font-medium text-slate-900 mt-2">
                        Tersinkronisasi dengan Google Sheets
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/korlas/collections"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                        >
                            Buka Laporan Setoran <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>

                {/* Info Tambahan */}
                <div className="group rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
                            <Info weight="duotone" className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="mb-2 font-bold">Panduan Korlas</h3>
                    <p className="text-sm leading-relaxed text-slate-300">
                        Pastikan seluruh data siswa terinput. Untuk laporan keuangan (uang kas/donasi kelas), pengurus kelas dapat mengisinya langsung dari Google Sheets.
                    </p>
                </div>
            </div>
        </div>
    );
}
