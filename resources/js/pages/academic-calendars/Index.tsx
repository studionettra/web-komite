import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    CalendarBlank,
    PencilSimple,
    Trash,
    CaretRight,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

export default function AcademicCalendarsIndex({ years }: { years: any[] }) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.roles?.[0]?.name;
    const canManage = ['Superadmin', 'Sekretaris'].includes(userRole);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            is_active: false,
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
    };

    const openEdit = (year: any) => {
        setIsEditing(true);
        setEditingId(year.id);
        clearErrors();
        setData({
            name: year.name,
            is_active: year.is_active,
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/academic-calendar/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                },
            });
        } else {
            post('/academic-calendar', {
                onSuccess: () => reset(),
            });
        }
    };

    const deleteYear = (id: number, name: string) => {
        confirmDelete(
            `Hapus Tahun Ajaran ${name}? Semua data bulan di dalamnya akan ikut terhapus.`,
            () => {
                router.delete(`/academic-calendar/${id}`);
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title="Kelola Kalender Akademik" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Kalender Akademik
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola tahun ajaran dan bulan untuk kalender pendidikan.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {canManage && (
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                                <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                                    <CalendarBlank weight="bold" className="h-5 w-5 text-blue-600" />
                                    {isEditing
                                        ? 'Edit Tahun Ajaran'
                                        : 'Tambah Tahun Ajaran'}
                                </h2>
                                {isEditing && (
                                    <button
                                        onClick={openCreate}
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Tahun Ajaran (Contoh: 2026/2027)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                        placeholder="2026/2027"
                                    />
                                    {errors.name && (
                                        <div className="mt-1.5 text-xs font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-5 w-5 cursor-pointer rounded-md border-slate-300 text-blue-600 transition-colors focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="cursor-pointer text-xs font-semibold text-slate-700 select-none"
                                    >
                                        Aktifkan untuk Publik
                                    </label>
                                </div>
                                {errors.is_active && (
                                    <div className="mt-1.5 text-xs font-medium text-rose-500">
                                        {errors.is_active}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className={canManage ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Tahun Ajaran
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Bulan
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-right text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {years.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-4 py-8 text-center text-sm text-slate-500"
                                            >
                                                Belum ada data tahun ajaran.
                                            </td>
                                        </tr>
                                    )}
                                    {years.map((year: any) => (
                                        <tr
                                            key={year.id}
                                            className="transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <Link
                                                    href={`/academic-calendar/${year.id}`}
                                                    className="text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 hover:underline"
                                                >
                                                    {year.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-center whitespace-nowrap">
                                                {year.is_active ? (
                                                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-500/20 ring-inset">
                                                        Tidak Aktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm text-slate-600 whitespace-nowrap">
                                                {year.months_count} Bulan
                                            </td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <div className="flex justify-end gap-1.5">
                                                    <Link
                                                        href={`/academic-calendar/${year.id}`}
                                                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                                                    >
                                                        Kelola
                                                    </Link>
                                                    {canManage && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    openEdit(year)
                                                                }
                                                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                                title="Edit Tahun Ajaran"
                                                            >
                                                                <PencilSimple weight="bold" className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    deleteYear(year.id, year.name)
                                                                }
                                                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600"
                                                                title="Hapus Tahun Ajaran"
                                                            >
                                                                <Trash weight="bold" className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
