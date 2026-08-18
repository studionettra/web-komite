import { Head, useForm, router } from '@inertiajs/react';
import { PencilSimple, Trash, Plus, X } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import Select from '../../../components/ui/Select';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function ClassroomsIndex({
    classrooms,
    korlasUsers,
}: {
    classrooms: any[];
    korlasUsers: any[];
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            korlas_id: '',
            google_sheet_status: 'hidden',
            google_sheet_link: '',
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (classroom: any) => {
        setIsEditing(true);
        setEditingId(classroom.id);
        clearErrors();
        setData({
            name: classroom.name,
            korlas_id: classroom.korlas_id ? String(classroom.korlas_id) : '',
            google_sheet_status: classroom.google_sheet_status || 'hidden',
            google_sheet_link: classroom.google_sheet_link || '',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/admin/classrooms/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/admin/classrooms', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const deleteClassroom = (id: number, name: string) => {
        confirmDelete(
            `Hapus kelas ${name}? Data siswa dan setoran terkait juga akan terhapus.`,
            () => {
                router.delete(`/admin/classrooms/${id}`);
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Kelas" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Kelas
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola data kelas, jurusan, dan korlas yang bertugas
                        serta wali kelas.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-5 w-5" />
                    <span>Kelas Baru</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="custom-scrollbar relative max-h-[90vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isEditing ? 'Edit Kelas' : 'Tambah Kelas Baru'}
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
                                        Nama Kelas
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                        required
                                        placeholder="Contoh: A1"
                                    />
                                    {errors.name && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-medium text-slate-700">
                                        Status Laporan Kas Kelas
                                    </label>
                                    <div className="mb-5 space-y-3">
                                        <label
                                            className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_sheet_status === 'active' ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="google_sheet_status"
                                                            value="active"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'active'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                                                            Tampilkan Laporan
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-xs font-medium text-slate-500">
                                                        Laporan langsung dapat
                                                        dilihat oleh publik/wali
                                                        murid yang mengakses
                                                        kelas ini.
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_sheet_status === 'preparing' ? 'border-amber-400 bg-amber-50 shadow-sm' : 'border-slate-100 bg-white hover:border-amber-200'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="google_sheet_status"
                                                            value="preparing"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'preparing'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-amber-500 focus:ring-amber-400"
                                                        />
                                                        <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-amber-500">
                                                            Sedang Disiapkan
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-xs font-medium text-slate-500">
                                                        Menampilkan pesan bahwa
                                                        laporan ini sedang
                                                        disusun, tidak bisa
                                                        dilihat publik.
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_sheet_status === 'hidden' ? 'border-slate-400 bg-slate-50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="google_sheet_status"
                                                            value="hidden"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'hidden'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-slate-600 focus:ring-slate-500"
                                                        />
                                                        <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-slate-600">
                                                            Sembunyikan
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-xs font-medium text-slate-500">
                                                        Fitur dinonaktifkan /
                                                        offline (muncul pesan
                                                        bahwa laporan belum
                                                        terhubung).
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.google_sheet_status && (
                                        <div className="mb-2 text-sm font-medium text-rose-500">
                                            {errors.google_sheet_status}
                                        </div>
                                    )}
                                </div>

                                {data.google_sheet_status === 'active' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Link Google Sheet
                                        </label>
                                        <input
                                            type="url"
                                            value={data.google_sheet_link}
                                            onChange={(e) =>
                                                setData(
                                                    'google_sheet_link',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                            placeholder="https://docs.google.com/spreadsheets/d/..."
                                            required={
                                                data.google_sheet_status ===
                                                'active'
                                            }
                                        />
                                        {errors.google_sheet_link && (
                                            <div className="mt-2 text-sm font-medium text-rose-500">
                                                {errors.google_sheet_link}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="relative z-20">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Koordinator Kelas (Korlas)
                                    </label>
                                    <Select
                                        value={data.korlas_id}
                                        onChange={(val) =>
                                            setData('korlas_id', val as string)
                                        }
                                        options={[
                                            {
                                                value: '',
                                                label: 'Kosong / Belum Ada',
                                            },
                                            ...korlasUsers.map((r) => ({
                                                value: String(r.id),
                                                label: r.name,
                                            })),
                                        ]}
                                        placeholder="Pilih Korlas..."
                                    />
                                    {errors.korlas_id && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.korlas_id}
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
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Kelas'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                    >
                                        Nama Kelas
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                    >
                                        Koordinator Kelas
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {classrooms.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-4 py-8 text-center text-sm text-slate-500"
                                        >
                                            Belum ada data kelas.
                                        </td>
                                    </tr>
                                ) : (
                                    classrooms.map((classroom: any) => (
                                        <tr
                                            key={classroom.id}
                                            className="transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-slate-800">
                                                {classroom.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                                {classroom.korlas ? (
                                                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-600 ring-1 ring-blue-500/10 ring-inset">
                                                        {classroom.korlas.name}
                                                    </span>
                                                ) : (
                                                    <span className="font-medium text-slate-400 italic">
                                                        Belum Ada Korlas
                                                    </span>
                                                )}
                                                {classroom.google_sheet_link && (
                                                    <a
                                                        href={
                                                            classroom.google_sheet_link
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="ml-2 inline-flex rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-600 ring-1 ring-emerald-500/10 transition-colors ring-inset hover:bg-emerald-100"
                                                    >
                                                        Link Sheet
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right align-top whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEdit(classroom)
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                        title="Edit Kelas"
                                                    >
                                                        <PencilSimple
                                                            weight="bold"
                                                            className="h-4 w-4"
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteClassroom(
                                                                classroom.id,
                                                                classroom.name,
                                                            )
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600"
                                                        title="Hapus Kelas"
                                                    >
                                                        <Trash
                                                            weight="bold"
                                                            className="h-4 w-4"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">
                        Total {classrooms.length} Kelas
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
