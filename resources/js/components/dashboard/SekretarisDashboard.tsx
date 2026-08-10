import { Link } from '@inertiajs/react';
import {
    Briefcase,
    Users,
    FileText,
    CalendarBlank,
    ArrowUpRight,
} from '@phosphor-icons/react';

export default function SekretarisDashboard({
    metrics,
    recent_meetings: recentMeetings,
    upcoming_programs: upcomingPrograms,
}: any) {
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="mb-2 px-1 text-lg font-bold tracking-tight text-slate-900">
                Ringkasan Administratif
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="group rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <Users weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Total Notulensi Rapat
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {metrics?.meetings || 0}
                    </div>
                </div>

                <div className="group rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Briefcase weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Program Kerja
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {metrics?.programs || 0}
                    </div>
                </div>

                <div className="group rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            <FileText weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Total Dokumen Lampiran
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-slate-900">
                        {metrics?.documents || 0}
                    </div>
                </div>

                <div className="group rounded-xl border border-slate-100 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
                            <FileText weight="fill" className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mb-2 text-sm font-semibold text-slate-100">
                        Aksi Cepat Sekretaris
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <Link
                            href="/meetings"
                            className="inline-flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                        >
                            Buat Notulensi Rapat <ArrowUpRight weight="bold" />
                        </Link>
                        <Link
                            href="/programs"
                            className="inline-flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                        >
                            Kelola Program Kerja <ArrowUpRight weight="bold" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Rapat Terakhir */}
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2 sm:px-6">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Rapat Terakhir
                        </h3>
                        <Link
                            href="/meetings"
                            className="text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                            Kelola Rapat
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentMeetings?.map((meeting: any) => (
                            <div
                                key={meeting.id}
                                className="flex items-start gap-4 p-4 transition-colors hover:bg-slate-50/50 sm:p-5"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                    <CalendarBlank
                                        weight="fill"
                                        className="h-4 w-4"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 sm:text-base">
                                        {meeting.title}
                                    </div>
                                    <div className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        {new Date(
                                            meeting.date,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    {meeting.notes && (
                                        <div className="mt-3 line-clamp-2 text-sm font-medium text-slate-600">
                                            {meeting.notes.substring(0, 100)}...
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agenda Program */}
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2 sm:px-6">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Agenda Program Mendatang
                        </h3>
                        <Link
                            href="/programs"
                            className="text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {upcomingPrograms?.map((program: any) => (
                            <div
                                key={program.id}
                                className="p-4 transition-colors hover:bg-slate-50/50 sm:p-5"
                            >
                                <Link
                                    href={`/programs/${program.id}`}
                                    className="block"
                                >
                                    <div className="text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 sm:text-base">
                                        {program.title}
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        <CalendarBlank
                                            weight="fill"
                                            className="h-4 w-4 text-slate-400"
                                        />
                                        {program.start_date
                                            ? new Date(
                                                  program.start_date,
                                              ).toLocaleDateString('id-ID', {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: 'numeric',
                                              })
                                            : '-'}
                                        {program.status === 'completed' ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold tracking-wider text-green-700 uppercase">
                                                Selesai
                                            </span>
                                        ) : program.status === 'planned' ? (
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-600 uppercase">
                                                Akan Datang
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold tracking-wider text-amber-700 uppercase">
                                                Berlangsung
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
