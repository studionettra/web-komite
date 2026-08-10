import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    CalendarBlank,
    PencilSimple,
    Trash,
    Plus,
    CaretLeft,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

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

export default function AcademicCalendarsShow({
    academicYear,
}: {
    academicYear: any;
}) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.roles?.[0]?.name;
    const canManage = ['Superadmin', 'Sekretaris'].includes(userRole);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        year: '',
        effective_days: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/academic-calendar/${academicYear.id}/months`, {
            onSuccess: () => reset(),
        });
    };

    const deleteMonth = (id: number, name: string) => {
        confirmDelete(
            `Hapus bulan ${name}? Semua data agenda dan program di dalamnya akan hilang.`,
            () => {
                router.delete(`/academic-calendar/months/${id}`);
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title={`Kelola Tahun Ajaran ${academicYear.name}`} />

            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/academic-calendar"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                >
                    <CaretLeft weight="bold" className="h-4 w-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Tahun Ajaran {academicYear.name}
                    </h1>
                    <p className="mt-0.5 text-sm text-slate-500">
                        Daftar bulan dan agenda dalam kalender akademik ini.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {canManage && (
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-base font-semibold text-slate-900">
                                <Plus weight="bold" className="h-5 w-5 text-emerald-600" />
                                Tambah Bulan Baru
                            </h2>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Nama Bulan{' '}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Bulan
                                        </option>
                                        {MONTHS.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.name && (
                                        <div className="mt-1.5 text-xs font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Tahun{' '}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.year}
                                        onChange={(e) =>
                                            setData('year', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Tahun
                                        </option>
                                        {YEARS.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.year && (
                                        <div className="mt-1.5 text-xs font-medium text-rose-500">
                                            {errors.year}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Hari Efektif (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.effective_days}
                                        onChange={(e) =>
                                            setData(
                                                'effective_days',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Contoh: 15 hari"
                                    />
                                    {errors.effective_days && (
                                        <div className="mt-1.5 text-xs font-medium text-rose-500">
                                            {errors.effective_days}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Tambah Bulan'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className={canManage ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {academicYear.months?.length === 0 && (
                            <div className="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-slate-500 shadow-sm">
                                <CalendarBlank
                                    weight="duotone"
                                    className="mx-auto mb-3 h-10 w-10 text-slate-400"
                                />
                                <p className="text-sm font-medium">
                                    Belum ada data bulan di tahun ajaran ini.
                                </p>
                            </div>
                        )}
                        {academicYear.months?.map((month: any) => (
                            <div
                                key={month.id}
                                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md"
                            >
                                <div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {month.name} {month.year}
                                        </h3>
                                        {canManage && (
                                            <button
                                                onClick={() =>
                                                    deleteMonth(
                                                        month.id,
                                                        month.name,
                                                    )
                                                }
                                                className="rounded-md p-1.5 text-slate-400 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
                                                title="Hapus Bulan"
                                            >
                                                <Trash
                                                    weight="bold"
                                                    className="h-4 w-4"
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-2 space-y-2 text-xs text-slate-600">
                                        <div className="flex justify-between border-b border-slate-50 pb-1.5">
                                            <span className="font-medium">
                                                Hari Efektif
                                            </span>
                                            <span className="font-semibold text-slate-900">
                                                {month.effective_days || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-50 pb-1.5">
                                            <span className="font-medium">
                                                Kegiatan
                                            </span>
                                            <span className="font-semibold text-slate-900">
                                                {month.activities_count || 0}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                Program Belajar
                                            </span>
                                            <span className="font-semibold text-slate-900">
                                                {month.learning_programs_count || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-slate-100">
                                    <Link
                                        href={`/academic-calendar/months/${month.id}/edit`}
                                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <PencilSimple
                                            weight="bold"
                                            className="h-3.5 w-3.5"
                                        />
                                        Kelola Agenda
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
