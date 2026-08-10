import { Head, router } from '@inertiajs/react';
import {
    CaretDown,
    CalendarBlank,
    Clock,
    BookOpen,
    CheckCircle,
    Flag,
    Bell,
    Star,
    PaperPlaneTilt,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';

export default function AcademicCalendar({ academicYear, allYears }: any) {
    const [openMonths, setOpenMonths] = useState<number[]>(
        academicYear?.months?.length > 0 ? [academicYear.months[0].id] : [],
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const toggleMonth = (id: number) => {
        setOpenMonths((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
        );
    };

    const handleYearChange = (e: any) => {
        router.get(
            '/kalender-akademik',
            { year_id: e.target.value },
            { preserveState: true },
        );
    };

    if (!academicYear) {
        return (
            <PublicLayout>
                <Head title="Kalender Akademik - KBIT-TKIT Al-Ikhlash">
                <meta name="robots" content="noindex, nofollow" />
            </Head>
                <div className="flex min-h-[50vh] items-center justify-center">
                    <p className="text-slate-500">
                        Belum ada data kalender akademik.
                    </p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head
                title={`Kalender Akademik ${academicYear.name} - KBIT-TKIT Al-Ikhlash`}
            />

            {/* Header Section */}
            {/* Header Section */}
            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-sky-300/20 mix-blend-multiply blur-3xl"></div>

                {/* Animated Background Icons in Bubbles */}
                <div
                    className={`absolute top-10 -left-4 -z-10 origin-bottom-right transition-all delay-100 duration-1000 ease-out md:top-20 md:left-[10%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-15deg] opacity-80' : 'translate-x-[-20%] translate-y-[20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-100 shadow-lg shadow-blue-200/50 md:h-28 md:w-28 md:rounded-[2rem]">
                        <BookOpen
                            weight="duotone"
                            className="h-10 w-10 text-blue-500 transition-transform hover:scale-110 md:h-14 md:w-14"
                        />
                    </div>
                </div>
                <div
                    className={`absolute -right-4 bottom-10 -z-10 origin-top-left transition-all delay-300 duration-1000 ease-out md:right-[12%] md:bottom-20 ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[20deg] opacity-80' : 'translate-x-[20%] translate-y-[-20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-lg shadow-pink-200/50 md:h-24 md:w-24">
                        <Bell
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
                        <Flag
                            weight="duotone"
                            className="h-8 w-8 text-emerald-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="inline-block rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-10">
                        <div className="mb-4 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-extrabold text-blue-700">
                                <CalendarBlank
                                    className="h-4 w-4"
                                    weight="bold"
                                />
                                Tahun Ajaran {academicYear.name}
                            </span>
                        </div>
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            Kalender Akademik
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Agenda kegiatan sekolah dan program pembelajaran
                            selama satu tahun penuh. Jadwal dapat berubah
                            sewaktu-waktu sesuai dengan kondisi dan kebijakan
                            sekolah.
                        </p>

                        {allYears.length > 1 && (
                            <div className="mt-8">
                                <select
                                    value={academicYear.id}
                                    onChange={handleYearChange}
                                    className="rounded-full border-2 border-slate-200 bg-white py-3 pr-10 pl-5 text-sm font-bold text-slate-700 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                >
                                    {allYears.map((year: any) => (
                                        <option key={year.id} value={year.id}>
                                            Tahun Ajaran {year.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <div className="bg-white py-12 md:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {academicYear.months?.map((month: any) => {
                            const isOpen = openMonths.includes(month.id);

                            return (
                                <div
                                    key={month.id}
                                    className="hover-float overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 sm:rounded-[2.5rem]"
                                >
                                    <button
                                        onClick={() => toggleMonth(month.id)}
                                        className="flex w-full items-center justify-between bg-slate-50/80 p-5 text-left transition-colors hover:bg-slate-100 sm:p-8"
                                    >
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-900 sm:text-3xl">
                                                {month.name} {month.year}
                                            </h2>
                                            {month.effective_days && (
                                                <p className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                                                    Hari Efektif:{' '}
                                                    {month.effective_days}
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform duration-300 sm:h-12 sm:w-12 ${isOpen ? 'rotate-180 bg-blue-500 text-white' : 'bg-white text-slate-500'}`}
                                        >
                                            <CaretDown
                                                className="h-6 w-6"
                                                weight={
                                                    isOpen ? 'bold' : 'regular'
                                                }
                                            />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-100 bg-white p-5 sm:p-6 md:p-8">
                                            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                                                {/* Kegiatan */}
                                                <div className="rounded-3xl bg-slate-50/50 p-6 sm:p-8">
                                                    <h3 className="mb-6 flex items-center gap-3 text-lg font-extrabold text-slate-900 sm:mb-8 sm:text-2xl">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-inner">
                                                            <Clock
                                                                className="h-6 w-6"
                                                                weight="duotone"
                                                            />
                                                        </div>
                                                        Kegiatan & Agenda
                                                    </h3>
                                                    {month.activities?.length >
                                                    0 ? (
                                                        <ul className="space-y-5">
                                                            {[
                                                                ...month.activities,
                                                            ]
                                                                .sort(
                                                                    (
                                                                        a: any,
                                                                        b: any,
                                                                    ) =>
                                                                        (a.start_day ||
                                                                            0) -
                                                                        (b.start_day ||
                                                                            0),
                                                                )
                                                                .map(
                                                                    (
                                                                        activity: any,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                activity.id
                                                                            }
                                                                            className="relative flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md"
                                                                        >
                                                                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                                                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                                                            </div>
                                                                            <div className="min-w-0 flex-1 space-y-1.5">
                                                                                {activity.date_string && (
                                                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold tracking-wide text-blue-600">
                                                                                        Tgl.{' '}
                                                                                        {
                                                                                            activity.date_string
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                <p className="text-sm font-bold text-slate-800">
                                                                                    {
                                                                                        activity.name
                                                                                    }
                                                                                </p>
                                                                                {activity.description && (
                                                                                    <p className="text-sm leading-relaxed font-medium text-slate-500">
                                                                                        {
                                                                                            activity.description
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                                {activity.is_committee_program && (
                                                                                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                                                                                        Program
                                                                                        Komite
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </li>
                                                                    ),
                                                                )}
                                                        </ul>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-10 text-center">
                                                            <CalendarBlank
                                                                className="mb-2 h-10 w-10 text-slate-300"
                                                                weight="duotone"
                                                            />
                                                            <p className="text-sm font-medium text-slate-500">
                                                                Tidak ada agenda
                                                                khusus di bulan
                                                                ini.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Program Pembelajaran */}
                                                <div className="rounded-3xl bg-slate-50/50 p-6 sm:p-8">
                                                    <h3 className="mb-6 flex items-center gap-3 text-lg font-extrabold text-slate-900 sm:mb-8 sm:text-2xl">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shadow-inner">
                                                            <BookOpen
                                                                className="h-6 w-6"
                                                                weight="duotone"
                                                            />
                                                        </div>
                                                        Program Pembelajaran
                                                    </h3>
                                                    {month.learning_programs
                                                        ?.length > 0 ? (
                                                        <ul className="space-y-5">
                                                            {[
                                                                ...month.learning_programs,
                                                            ]
                                                                .sort(
                                                                    (
                                                                        a: any,
                                                                        b: any,
                                                                    ) =>
                                                                        (a.start_day ||
                                                                            0) -
                                                                        (b.start_day ||
                                                                            0),
                                                                )
                                                                .map(
                                                                    (
                                                                        program: any,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                program.id
                                                                            }
                                                                            className="rounded-xl border-2 border-slate-100 bg-slate-50 p-4 sm:rounded-3xl sm:p-6"
                                                                        >
                                                                            <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
                                                                                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                                                                    Minggu{' '}
                                                                                    {
                                                                                        program.week_string
                                                                                    }
                                                                                </span>
                                                                                <span className="text-xs font-medium text-slate-500">
                                                                                    Tgl.{' '}
                                                                                    {
                                                                                        program.date_string
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <h4 className="font-semibold text-slate-900">
                                                                                {
                                                                                    program.topic
                                                                                }
                                                                            </h4>
                                                                            {program.sub_topic && (
                                                                                <p className="mt-1 text-sm text-slate-600">
                                                                                    {
                                                                                        program.sub_topic
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                            {program.description && (
                                                                                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
                                                                                    <CheckCircle
                                                                                        className="h-4 w-4"
                                                                                        weight="fill"
                                                                                    />
                                                                                    {
                                                                                        program.description
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </li>
                                                                    ),
                                                                )}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-sm text-slate-500">
                                                            Tidak ada data
                                                            program
                                                            pembelajaran.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
