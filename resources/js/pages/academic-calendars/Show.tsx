import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    CalendarBlank,
    PencilSimple,
    Trash,
    Plus,
    CaretLeft,
    X,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        year: '',
        effective_days: '',
    });

    const openCreate = () => {
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/academic-calendar/${academicYear.id}/months`, {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
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

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                    <Link
                        href="/academic-calendar"
                        className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:-translate-x-1 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 hover:shadow-md sm:mt-0 sm:h-11 sm:w-11"
                    >
                        <CaretLeft weight="bold" className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                            Tahun Ajaran {academicYear.name}
                        </h1>
                        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base">
                            Daftar bulan dan agenda dalam kalender akademik ini.
                        </p>
                    </div>
                </div>
                {canManage && (
                    <button
                        onClick={openCreate}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        <span>Tambah Bulan</span>
                    </button>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="flex items-center gap-3 text-lg font-semibold text-slate-900">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Plus weight="bold" className="h-5 w-5" />
                                </div>
                                Tambah Bulan Baru
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={submit}>
                            <div className="space-y-6 px-8 py-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Nama Bulan <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
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
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tahun <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.year}
                                        onChange={(e) =>
                                            setData('year', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
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
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.year}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Hari Efektif (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.effective_days}
                                        onChange={(e) =>
                                            setData('effective_days', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        placeholder="Contoh: 15 hari"
                                    />
                                    {errors.effective_days && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.effective_days}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-300 transition-all ring-inset hover:bg-slate-50 sm:w-auto"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95 sm:w-auto"
                                >
                                    {processing ? 'Menyimpan...' : 'Tambah Bulan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {academicYear.months?.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center shadow-sm">
                            <CalendarBlank
                                weight="duotone"
                                className="mb-4 h-16 w-16 text-slate-300"
                            />
                            <h3 className="text-lg font-bold text-slate-700">Belum Ada Bulan</h3>
                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Anda belum menambahkan bulan pada tahun ajaran ini.
                            </p>
                            {canManage && (
                                <button
                                    onClick={openCreate}
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all ring-inset hover:bg-slate-50"
                                >
                                    <Plus weight="bold" className="h-4 w-4" />
                                    Tambah Bulan Pertama
                                </button>
                            )}
                        </div>
                    )}
                    
                    {academicYear.months?.map((month: any) => (
                        <div
                            key={month.id}
                            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                        >
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
                            
                            <div className="relative z-10">
                                <div className="mb-5 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                                            <span className="text-sm font-bold uppercase leading-none tracking-wider">
                                                {month.name.substring(0, 3)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-slate-800">
                                                {month.name}
                                            </h3>
                                            <span className="text-sm font-semibold text-blue-600">
                                                {month.year}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {canManage && (
                                        <button
                                            onClick={() => deleteMonth(month.id, month.name)}
                                            className="rounded-xl bg-rose-50 p-2.5 text-rose-500 opacity-0 transition-all hover:bg-rose-100 hover:text-rose-600 group-hover:opacity-100"
                                            title="Hapus Bulan"
                                        >
                                            <Trash weight="fill" className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500">Hari Efektif</span>
                                        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                                            {month.effective_days || '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500">Agenda Kegiatan</span>
                                        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                                            {month.activities_count || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500">Program Belajar</span>
                                        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                                            {month.learning_programs_count || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative z-10 mt-5 pt-5 border-t border-slate-100">
                                <Link
                                    href={`/academic-calendar/months/${month.id}/edit`}
                                    className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg"
                                >
                                    <PencilSimple weight="bold" className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-12" />
                                    Kelola Data Bulan Ini
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
