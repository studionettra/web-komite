import { Head } from '@inertiajs/react';
import {
    X,
    FileText,
    CalendarBlank,
    Clock,
    FolderOpen,
    CheckCircle,
    CalendarPlus,
    Star,
    ListChecks,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';

export default function Programs({ programs }: any) {
    const [selectedProgram, setSelectedProgram] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'jadwal' | 'laporan'>('jadwal');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (id && programs) {
            const program = programs.find((p: any) => p.id === parseInt(id));

            if (program) {
                openProgram(program);
            }
        }
    }, [programs]);

    function openProgram(program: any) {
        setSelectedProgram(program);
        setActiveTab('jadwal');
    }

    const hasReports = (program: any) => {
        const hasDirectDocs = program.documents && program.documents.length > 0;
        const hasActivityDocs =
            program.activities &&
            program.activities.some(
                (act: any) => act.documents && act.documents.length > 0,
            );

        return hasDirectDocs || hasActivityDocs;
    };

    const getRelevantDate = (program: any) => {
        if (!program.activities || program.activities.length === 0) {
            return program.start_date;
        }

        const now = new Date();

        for (const activity of program.activities) {
            const actDate = new Date(activity.activity_date);
            const endTimeStr = activity.end_time || '23:59:59';
            const actEnd = new Date(`${activity.activity_date}T${endTimeStr}`);

            if (actEnd >= now) {
                return activity.activity_date;
            }
        }

        return program.activities[program.activities.length - 1].activity_date;
    };

    const renderJadwal = (program: any) => {
        if (!program.activities || program.activities.length === 0) {
            return (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center text-slate-500">
                    <CalendarBlank
                        className="mx-auto mb-3 h-12 w-12 text-slate-300"
                        weight="duotone"
                    />
                    Belum ada rincian jadwal / sesi untuk program ini.
                </div>
            );
        }

        // Sort activities by date ASC for timeline and assign global index
        const sortedActivities = [...program.activities]
            .sort(
                (a: any, b: any) =>
                    new Date(a.activity_date).getTime() -
                    new Date(b.activity_date).getTime(),
            )
            .map((act, index) => ({ ...act, globalIndex: index + 1 }));

        // Group by month
        const grouped: { [key: string]: any[] } = {};
        sortedActivities.forEach((act) => {
            const date = new Date(act.activity_date);
            const monthYear = date.toLocaleDateString('id-ID', {
                month: 'long',
                year: 'numeric',
            });

            if (!grouped[monthYear]) {
                grouped[monthYear] = [];
            }

            grouped[monthYear].push(act);
        });

        return (
            <div className="space-y-6">
                {Object.entries(grouped).map(([monthYear, activities]) => (
                    <div
                        key={monthYear}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-5 py-3 text-sm font-bold tracking-wider text-slate-700 uppercase">
                            <CalendarBlank
                                weight="bold"
                                className="text-blue-600"
                            />
                            {monthYear}
                        </div>
                        <div className="divide-y divide-slate-100">
                            {activities.map((act: any) => (
                                <div
                                    key={act.id}
                                    className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-600 shadow-sm">
                                            {act.globalIndex}
                                        </div>
                                        <div>
                                            <h4 className="text-base leading-snug font-bold text-slate-900">
                                                {act.title}
                                            </h4>
                                            {act.description && (
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {act.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 flex-col rounded-lg border border-slate-100 bg-white px-4 py-2 text-sm shadow-sm sm:items-end">
                                        <span className="mb-0.5 text-xs font-bold tracking-wide text-slate-800 uppercase">
                                            {new Date(
                                                act.activity_date,
                                            ).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                            })}
                                        </span>
                                        <span className="mb-1 font-medium text-slate-500">
                                            {new Date(
                                                act.activity_date,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        {act.start_time && (
                                            <span className="mt-0.5 flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600">
                                                <Clock
                                                    weight="bold"
                                                    className="h-3 w-3"
                                                />
                                                {act.start_time.substring(0, 5)}{' '}
                                                -{' '}
                                                {act.end_time
                                                    ? act.end_time.substring(
                                                          0,
                                                          5,
                                                      )
                                                    : 'Selesai'}{' '}
                                                WIB
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderReports = (program: any) => {
        if (!hasReports(program)) {
            return (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center text-slate-500">
                    <FolderOpen
                        className="mx-auto mb-3 h-12 w-12 text-slate-300"
                        weight="duotone"
                    />
                    Belum ada arsip dokumentasi atau laporan.
                </div>
            );
        }

        return (
            <div className="space-y-8">
                {/* Direct Documents */}
                {program.documents && program.documents.length > 0 && (
                    <div>
                        <h4 className="mb-3 text-sm font-bold tracking-wider text-slate-700 uppercase">
                            Laporan Umum
                        </h4>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {program.documents.map((doc: any) => (
                                <DocumentCard key={doc.id} doc={doc} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Documents */}
                {program.activities &&
                    program.activities
                        .filter(
                            (act: any) =>
                                act.documents && act.documents.length > 0,
                        )
                        .map((act: any) => (
                            <div key={act.id}>
                                <div className="mb-3 flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-slate-800">
                                        {act.title}
                                    </h4>
                                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                                        <CalendarBlank weight="bold" />
                                        {new Date(
                                            act.activity_date,
                                        ).toLocaleDateString('id-ID', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                    {act.documents.map((doc: any) => (
                                        <DocumentCard key={doc.id} doc={doc} />
                                    ))}
                                </div>
                            </div>
                        ))}
            </div>
        );
    };

    return (
        <PublicLayout>
            <Head>
                <title>Program Kerja - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu</title>
                <meta name="description" content="Informasi lengkap mengenai program kerja, kegiatan, dan agenda Komite KBIT-TKIT Al-Ikhlash Pasar Minggu." />
            </Head>

            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-sky-300/20 mix-blend-multiply blur-3xl"></div>

                {/* Animated Background Icons in Bubbles */}
                <div
                    className={`absolute top-10 -left-4 -z-10 origin-bottom-right transition-all delay-100 duration-1000 ease-out md:top-20 md:left-[10%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-15deg] opacity-80' : 'translate-x-[-20%] translate-y-[20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-100 shadow-lg shadow-blue-200/50 md:h-28 md:w-28 md:rounded-[2rem]">
                        <CheckCircle
                            weight="duotone"
                            className="h-10 w-10 text-blue-500 transition-transform hover:scale-110 md:h-14 md:w-14"
                        />
                    </div>
                </div>
                <div
                    className={`absolute -right-4 bottom-10 -z-10 origin-top-left transition-all delay-300 duration-1000 ease-out md:right-[12%] md:bottom-20 ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[20deg] opacity-80' : 'translate-x-[20%] translate-y-[-20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-lg shadow-pink-200/50 md:h-24 md:w-24">
                        <ListChecks
                            weight="duotone"
                            className="h-8 w-8 text-pink-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>
                <div
                    className={`absolute top-20 -right-2 -z-10 origin-bottom-left transition-all delay-500 duration-1000 ease-out md:top-24 md:right-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[15deg] opacity-90' : 'translate-x-[20%] translate-y-[-10%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 shadow-lg shadow-yellow-200/50 md:h-20 md:w-20">
                        <Star
                            weight="duotone"
                            className="h-8 w-8 text-yellow-500 transition-transform hover:scale-110 md:h-10 md:w-10"
                        />
                    </div>
                </div>
                <div
                    className={`absolute bottom-20 -left-2 -z-10 origin-top-right transition-all delay-700 duration-1000 ease-out md:bottom-24 md:left-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-10deg] opacity-80' : 'translate-x-[-30%] translate-y-[30%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 shadow-lg shadow-emerald-200/50 md:h-24 md:w-24 md:rounded-[2rem]">
                        <CalendarPlus
                            weight="duotone"
                            className="h-8 w-8 text-emerald-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="inline-block rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-10">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            Daftar Program
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Seluruh inisiatif dan program Komite KBIT-TKIT
                            Al-Ikhlash Pasar Minggu disusun untuk mendukung
                            perkembangan peserta didik secara optimal.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-24">
                {/* Playful Background Elements */}
                <div className="absolute top-1/4 -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 -left-32 -z-10 h-[600px] w-[600px] rounded-full bg-sky-200/30 mix-blend-multiply blur-3xl"></div>
                <div className="absolute top-3/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-100/30 mix-blend-multiply blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {programs.length === 0 ? (
                        <div className="py-20 text-center text-slate-500">
                            Belum ada data program kerja.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                            {programs.map((program: any) => (
                                <div
                                    key={program.id}
                                    onClick={() => openProgram(program)}
                                    className="group relative flex cursor-pointer flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 sm:p-5"
                                >
                                    {/* Image Header with inset */}
                                    <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                                        {program.images &&
                                        program.images.length > 0 ? (
                                            <img
                                                src={`/storage/${program.images[0]}`}
                                                alt={program.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-blue-50/50 text-blue-200 transition-transform duration-500 group-hover:scale-105">
                                                <CalendarBlank
                                                    weight="duotone"
                                                    className="h-16 w-16"
                                                />
                                            </div>
                                        )}
                                        {/* Floating Badge inside image */}
                                        <div className="absolute top-3 left-3">
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md ${
                                                    program.frequency ===
                                                    'monthly'
                                                        ? 'bg-emerald-500/90 text-white'
                                                        : program.frequency ===
                                                            'holiday'
                                                          ? 'bg-rose-500/90 text-white'
                                                          : 'bg-amber-500/90 text-white'
                                                }`}
                                            >
                                                {program.frequency === 'monthly'
                                                    ? 'Bulanan'
                                                    : program.frequency ===
                                                        'holiday'
                                                      ? 'PHBI'
                                                      : 'Insidental'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col px-2">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-sm font-bold text-slate-400">
                                                {getRelevantDate(program)
                                                    ? new Date(
                                                          getRelevantDate(
                                                              program,
                                                          ),
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                          {
                                                              month: 'long',
                                                              year: 'numeric',
                                                          },
                                                      )
                                                    : '-'}
                                            </span>

                                            {/* Status Dot indicator */}
                                            {program.status === 'ongoing' ? (
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-emerald-600 uppercase">
                                                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                                                    Berlangsung
                                                </span>
                                            ) : program.status === 'planned' ? (
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-amber-500 uppercase">
                                                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                                                    Akan Datang
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                                                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                                    Selesai
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="mb-2 text-xl leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                                            {program.title}
                                        </h3>

                                        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">
                                            {program.description}
                                        </p>

                                        <div className="mt-auto flex justify-end">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md">
                                                Lihat Detail
                                                <svg
                                                    className="h-3 w-3"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Detail Program */}
            {selectedProgram && (
                <div className="custom-scrollbar fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-3 backdrop-blur-sm sm:p-6">
                    <div className="animate-in fade-in zoom-in-95 my-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl duration-200 sm:rounded-3xl">
                        <div className="z-10 flex shrink-0 items-start justify-between border-b border-slate-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-900 sm:text-2xl">
                                    {selectedProgram.title}
                                </h2>
                                <div className="mt-2 flex items-center gap-3">
                                    <span className="text-sm font-medium text-slate-500">
                                        {selectedProgram.frequency === 'monthly'
                                            ? 'Program Bulanan'
                                            : selectedProgram.frequency ===
                                                'holiday'
                                              ? 'Program PHBI'
                                              : 'Program Insidental'}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                    {selectedProgram.status === 'ongoing' ? (
                                        <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>{' '}
                                            Sedang Berlangsung
                                        </span>
                                    ) : selectedProgram.status === 'planned' ? (
                                        <span className="flex items-center gap-1.5 text-sm font-bold text-orange-500">
                                            <div className="h-2 w-2 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50"></div>{' '}
                                            Akan Datang
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                                            <div className="h-2 w-2 rounded-full bg-slate-400"></div>{' '}
                                            Selesai
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProgram(null)}
                                className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex shrink-0 gap-4 overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 pt-3 sm:gap-6 sm:px-6 sm:pt-4">
                            <button
                                onClick={() => setActiveTab('jadwal')}
                                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-bold transition-colors ${activeTab === 'jadwal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                <Clock
                                    weight={
                                        activeTab === 'jadwal'
                                            ? 'fill'
                                            : 'regular'
                                    }
                                    className="h-5 w-5"
                                />
                                Jadwal / Agenda
                            </button>
                            <button
                                onClick={() => setActiveTab('laporan')}
                                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-bold transition-colors ${activeTab === 'laporan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                <FolderOpen
                                    weight={
                                        activeTab === 'laporan'
                                            ? 'fill'
                                            : 'regular'
                                    }
                                    className="h-5 w-5"
                                />
                                Arsip Laporan
                            </button>
                        </div>

                        <div className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                            {selectedProgram.description && (
                                <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm leading-relaxed text-slate-700">
                                    {selectedProgram.description}
                                </div>
                            )}

                            <div>
                                {activeTab === 'jadwal'
                                    ? renderJadwal(selectedProgram)
                                    : renderReports(selectedProgram)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

function DocumentCard({ doc }: { doc: any }) {
    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(
        doc.file_type.toLowerCase(),
    );

    return (
        <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {isImage ? (
                <img
                    src={`/storage/${doc.file_path}`}
                    alt="Dokumentasi"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-3">
                    <FileText
                        weight="duotone"
                        className="mb-2 h-8 w-8 text-slate-400 transition-colors group-hover:text-blue-500"
                    />
                    <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                        {doc.file_type}
                    </span>
                </div>
            )}

            <a
                href={`/storage/${doc.file_path}`}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
                <span className="translate-y-2 transform rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition-all duration-300 group-hover:translate-y-0 hover:bg-slate-100">
                    Lihat
                </span>
            </a>
        </div>
    );
}
