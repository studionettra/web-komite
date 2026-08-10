import { Link } from '@inertiajs/react';
import { Wallet, Megaphone, CalendarBlank } from '@phosphor-icons/react';

export default function AnggotaDashboard({
    active_programs: activePrograms,
    recent_meetings: recentMeetings,
    financeBalance = 0,
}: any) {
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="mb-1 px-1 text-lg font-bold tracking-tight text-slate-900">
                Informasi Komite
            </h2>

            {/* Transparency Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-900/20 ">
                <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                            <Wallet weight="bold" /> Transparansi Kas
                        </div>
                        <div className="mb-0.5 text-sm font-bold tracking-tight text-emerald-50">
                            Laporan Keuangan Terbuka
                        </div>
                        <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Rp {financeBalance.toLocaleString('id-ID')}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/transactions"
                            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-600 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-md"
                        >
                            Lihat Rincian
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Active Programs */}
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-blue-100 p-1.5 text-blue-600">
                                <Megaphone
                                    weight="fill"
                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Program Berjalan
                            </h3>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {activePrograms?.length > 0 ? (
                            activePrograms.map((prog: any) => (
                                <div
                                    key={prog.id}
                                    className="group p-4 transition-colors hover:bg-slate-50/50 sm:p-5"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
                                                {prog.title}
                                            </h4>
                                            <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-500">
                                                {prog.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/programs?id=${prog.id}`}
                                            className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-5 text-center text-sm text-slate-500">
                                Belum ada agenda program saat ini.
                            </div>
                        )}
                    </div>
                </div>

                {/* Notulensi Rapat */}
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-amber-100 p-1.5 text-amber-600">
                                <CalendarBlank
                                    weight="fill"
                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Hasil Rapat Terakhir
                            </h3>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentMeetings?.length > 0 ? (
                            recentMeetings.map((meeting: any) => (
                                <div
                                    key={meeting.id}
                                    className="p-4 transition-colors hover:bg-slate-50/50 sm:p-5"
                                >
                                    <div className="text-sm font-semibold text-slate-900 sm:text-base">
                                        {meeting.title}
                                    </div>
                                    <div className="mt-1 mb-3 text-xs font-bold text-slate-400">
                                        {new Date(
                                            meeting.date,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    <div className="line-clamp-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 italic">
                                        "
                                        {meeting.notes ||
                                            'Belum ada notulensi tertulis.'}
                                        "
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-5 text-center text-sm text-slate-500">
                                Belum ada catatan rapat.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
