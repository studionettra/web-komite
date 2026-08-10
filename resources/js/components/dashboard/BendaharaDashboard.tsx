import { Link } from '@inertiajs/react';
import { Wallet, ArrowUpRight } from '@phosphor-icons/react';

export default function BendaharaDashboard() {
    return (
        <div className="space-y-8">
            <h2 className="px-1 text-lg font-bold tracking-tight text-slate-900">
                Pusat Pengelolaan Keuangan
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-bl-full bg-emerald-50 opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                    <div className="relative z-10 mb-4 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <Wallet weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="relative z-10 mb-2 text-xl font-semibold tracking-tight text-slate-900">
                        Buku Kas (Google Sheets)
                    </div>
                    <p className="relative z-10 mb-6 text-sm font-medium text-slate-500">
                        Lihat dan kelola sinkronisasi laporan keuangan komite
                        yang terhubung dengan Google Sheets publik.
                    </p>
                    <Link
                        href="/transactions"
                        className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-sm"
                    >
                        Buka Laporan Keuangan{' '}
                        <ArrowUpRight weight="bold" className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
