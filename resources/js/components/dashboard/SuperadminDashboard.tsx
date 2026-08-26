import { Link, usePage } from '@inertiajs/react';
import { Briefcase, Users, ArrowUpRight } from '@phosphor-icons/react';

export default function SuperadminDashboard({
    metrics,
    ongoing_programs: ongoingPrograms,
    analytics,
}: any) {
    const { auth } = usePage<any>().props;

    return (
        <div className="space-y-4 sm:space-y-6">
            <h2 className="mb-2 px-1 text-lg font-bold tracking-tight text-slate-900">
                Ringkasan Aktivitas Komite
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Briefcase weight="fill" className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                        Total Program Kerja
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {metrics?.programs || 0}
                    </div>
                </div>

                <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <Users weight="fill" className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                        Notulensi Rapat
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {metrics?.meetings || 0}
                    </div>
                </div>

                <div className="group rounded-xl border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
                            <Users weight="fill" className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mb-2 text-sm font-semibold text-slate-100">
                        Aksi Cepat
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                        <Link
                            href="/admin/classrooms"
                            className="inline-flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                        >
                            Kelola Kelas & Korlas{' '}
                            <ArrowUpRight
                                weight="bold"
                                className="h-3.5 w-3.5"
                            />
                        </Link>
                        {auth?.is_primary_superadmin && (
                            <Link
                                href="/users"
                                className="inline-flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                            >
                                Kelola Pengguna{' '}
                                <ArrowUpRight
                                    weight="bold"
                                    className="h-3.5 w-3.5"
                                />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="mt-6">
                <h2 className="mb-4 px-1 text-lg font-bold tracking-tight text-slate-900">
                    Kinerja Website (7 Hari Terakhir)
                </h2>
                {analytics?.error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                        {analytics.message || 'Gagal memuat data analitik.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Users weight="duotone" className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-500">
                                    Total Pengunjung
                                </div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {analytics?.visitors || 0}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <ArrowUpRight
                                    weight="duotone"
                                    className="h-6 w-6"
                                />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-500">
                                    Tayangan Halaman
                                </div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {analytics?.pageViews || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Program Ongoing */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Program Berlangsung
                        </h3>
                        <Link
                            href="/programs"
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {ongoingPrograms?.length === 0 && (
                            <div className="p-5 text-center text-sm font-medium text-slate-500">
                                Tidak ada program yang sedang berlangsung.
                            </div>
                        )}
                        {ongoingPrograms?.map((prog: any) => (
                            <div
                                key={prog.id}
                                className="p-4 transition-colors hover:bg-slate-50/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Link
                                            href={`/programs/${prog.id}`}
                                            className="text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600"
                                        >
                                            {prog.title}
                                        </Link>
                                        <div className="mt-0.5 line-clamp-1 text-xs font-medium text-slate-500">
                                            {prog.description}
                                        </div>
                                    </div>
                                    <span className="shrink-0 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 uppercase">
                                        Ongoing
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
