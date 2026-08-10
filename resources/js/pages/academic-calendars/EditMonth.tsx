import { Head, Link, useForm } from '@inertiajs/react';
import {
    CaretLeft,
    Plus,
    Trash,
    FloppyDisk,
    Clock,
    BookOpen,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../layouts/DashboardLayout';

const MONTHS = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i);

const getMonthIndex = (monthName: string) => {
    return MONTHS.indexOf(monthName);
};

const getMaxDays = (monthName: string, year: number | string) => {
    const monthIndex = getMonthIndex(monthName);

    if (monthIndex === -1 || !year) {
        return 31;
    }

    return new Date(Number(year), monthIndex + 1, 0).getDate();
};

const validateDateString = (
    dateString: string,
    maxDays: number,
): string | null => {
    if (!dateString) {
        return null;
    }

    const matches = dateString.match(/\d+/g);

    if (!matches) {
        return null;
    }

    for (const numStr of matches) {
        const num = parseInt(numStr, 10);

        if (num > maxDays) {
            return `Maksimal tanggal adalah ${maxDays}`;
        }
    }

    return null;
};

export default function AcademicCalendarsEditMonth({
    month,
    academicYear,
}: {
    month: any;
    academicYear: any;
}) {
    const { data, setData, put, processing } = useForm({
        name: month.name,
        year: month.year,
        effective_days: month.effective_days || '',
        activities: month.activities || [],
        learning_programs: month.learning_programs || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const maxDays = getMaxDays(data.name, data.year);

        const hasActivityError = data.activities.some(
            (act: any) => validateDateString(act.date_string, maxDays) !== null,
        );
        const hasProgramError = data.learning_programs.some(
            (prog: any) =>
                validateDateString(prog.date_string, maxDays) !== null,
        );

        if (hasActivityError || hasProgramError) {
            toast.error(
                `Ada tanggal yang melebihi jumlah hari maksimal (${maxDays} hari) di bulan ${data.name}. Silakan perbaiki terlebih dahulu.`,
            );

            return;
        }

        put(`/academic-calendar/months/${month.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Toast handles success
            },
        });
    };

    // --- Activities Helpers ---
    const addActivity = () => {
        setData('activities', [
            ...data.activities,
            {
                id: null,
                date_string: '',
                name: '',
                description: '',
                is_committee_program: false,
            },
        ]);
    };

    const updateActivity = (index: number, field: string, value: any) => {
        const newActivities = [...data.activities];
        newActivities[index][field] = value;
        setData('activities', newActivities);
    };

    const removeActivity = (index: number) => {
        const newActivities = [...data.activities];
        newActivities.splice(index, 1);
        setData('activities', newActivities);
    };

    // --- Learning Programs Helpers ---
    const addProgram = () => {
        setData('learning_programs', [
            ...data.learning_programs,
            {
                id: null,
                week_string: '',
                topic: '',
                date_string: '',
                sub_topic: '',
                description: '',
            },
        ]);
    };

    const updateProgram = (index: number, field: string, value: any) => {
        const newPrograms = [...data.learning_programs];
        newPrograms[index][field] = value;
        setData('learning_programs', newPrograms);
    };

    const removeProgram = (index: number) => {
        const newPrograms = [...data.learning_programs];
        newPrograms.splice(index, 1);
        setData('learning_programs', newPrograms);
    };

    return (
        <DashboardLayout>
            <Head title={`Kelola Bulan ${month.name}`} />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/academic-calendar/${academicYear.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                    >
                        <CaretLeft weight="bold" className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Agenda: {month.name} {month.year}
                        </h1>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Kelola kegiatan dan program pembelajaran untuk bulan ini.
                        </p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={submit}
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                    >
                        <FloppyDisk weight="bold" className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* General Info */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
                        Informasi Umum
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Nama Bulan <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Pilih Bulan</option>
                                {MONTHS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Tahun <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.year}
                                onChange={(e) =>
                                    setData('year', e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Pilih Tahun</option>
                                {YEARS.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Hari Efektif (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.effective_days}
                                onChange={(e) =>
                                    setData('effective_days', e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Activities Section */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <Clock weight="bold" className="h-5 w-5 text-blue-600" />
                            Kegiatan
                        </h2>
                        <button
                            type="button"
                            onClick={addActivity}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                        >
                            <Plus weight="bold" /> Tambah Kegiatan
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.activities.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-sm text-slate-500">
                                Belum ada kegiatan. Klik tombol "Tambah Kegiatan" di atas.
                            </div>
                        ) : (
                            data.activities.map(
                                (activity: any, index: number) => {
                                    const maxDays = getMaxDays(data.name, data.year);
                                    const dateError = validateDateString(activity.date_string, maxDays);

                                    return (
                                        <div
                                            key={index}
                                            className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 hover:shadow-md"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeActivity(index)}
                                                    className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                                    title="Hapus baris"
                                                >
                                                    <Trash weight="bold" className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                                                <div className="sm:col-span-3">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Tanggal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={activity.date_string || ''}
                                                        onChange={(e) => updateActivity(index, 'date_string', e.target.value)}
                                                        className={`w-full rounded-lg border ${dateError ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'} bg-slate-50 px-3 py-1.5 text-sm transition-all focus:bg-white focus:outline-none focus:ring-1`}
                                                        placeholder="Contoh: 14 - 31"
                                                    />
                                                    {dateError && (
                                                        <p className="mt-1 text-[10px] font-medium text-rose-500">
                                                            {dateError}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="sm:col-span-4">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Nama Kegiatan <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={activity.name}
                                                        onChange={(e) => updateActivity(index, 'name', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                                                        required
                                                    />
                                                </div>
                                                <div className="sm:col-span-5">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Keterangan / PJ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={activity.description || ''}
                                                        onChange={(e) => updateActivity(index, 'description', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                                                    />
                                                </div>
                                                <div className="sm:col-span-12">
                                                    <label className="flex cursor-pointer items-center gap-2 mt-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={activity.is_committee_program}
                                                            onChange={(e) => updateActivity(index, 'is_committee_program', e.target.checked)}
                                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-xs font-medium text-slate-700">
                                                            Program Komite (diselenggarakan oleh Komite Sekolah)
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )
                        )}
                    </div>
                </div>

                {/* Learning Programs Section */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <BookOpen weight="bold" className="h-5 w-5 text-emerald-600" />
                            Program Pembelajaran
                        </h2>
                        <button
                            type="button"
                            onClick={addProgram}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                        >
                            <Plus weight="bold" /> Tambah Program
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.learning_programs.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-sm text-slate-500">
                                Belum ada data program pembelajaran.
                            </div>
                        ) : (
                            data.learning_programs.map(
                                (program: any, index: number) => {
                                    const maxDays = getMaxDays(data.name, data.year);
                                    const dateError = validateDateString(program.date_string, maxDays);

                                    return (
                                        <div
                                            key={index}
                                            className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow focus-within:border-emerald-300 focus-within:ring-1 focus-within:ring-emerald-300 hover:shadow-md"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProgram(index)}
                                                    className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                                    title="Hapus baris"
                                                >
                                                    <Trash weight="bold" className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                                                <div className="sm:col-span-2">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Minggu Ke-
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={program.week_string || ''}
                                                        onChange={(e) => updateProgram(index, 'week_string', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                                        placeholder="I / II"
                                                    />
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Tanggal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={program.date_string || ''}
                                                        onChange={(e) => updateProgram(index, 'date_string', e.target.value)}
                                                        className={`w-full rounded-lg border ${dateError ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-500'} bg-slate-50 px-3 py-1.5 text-sm transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/20`}
                                                        placeholder="7 - 11"
                                                    />
                                                    {dateError && (
                                                        <p className="mt-1 text-[10px] font-medium text-rose-500">
                                                            {dateError}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="sm:col-span-7">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Topik Utama
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={program.topic || ''}
                                                        onChange={(e) => updateProgram(index, 'topic', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                                    />
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Sub Topik
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={program.sub_topic || ''}
                                                        onChange={(e) => updateProgram(index, 'sub_topic', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                                    />
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label className="mb-1 block text-[11px] font-bold text-slate-500 uppercase">
                                                        Keterangan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={program.description || ''}
                                                        onChange={(e) => updateProgram(index, 'description', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )
                        )}
                    </div>
                </div>

                <div className="flex justify-end border-t border-slate-200 pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="sm:w-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                    >
                        <FloppyDisk weight="bold" className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
