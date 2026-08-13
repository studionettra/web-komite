import { Head, useForm, router } from '@inertiajs/react';
import {
    PencilSimple,
    Trash,
    ToggleLeft,
    ToggleRight,
    X,
    Plus,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function StudentsIndex({
    classroom,
    students,
    allClassrooms = [],
}: {
    classroom: any;
    students: any[];
    allClassrooms?: any[];
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            parent_name: '',
            is_active: true,
            classroom_id: classroom?.id || '',
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (student: any) => {
        setIsEditing(true);
        setEditingId(student.id);
        clearErrors();
        setData({
            name: student.name,
            parent_name: student.parent_name || '',
            is_active: student.is_active,
            classroom_id: classroom?.id || '',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/korlas/students/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/korlas/students', {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setIsModalOpen(false);
                },
            });
        }
    };

    const toggleStatus = (student: any) => {
        router.put(`/korlas/students/${student.id}`, {
            name: student.name,
            parent_name: student.parent_name,
            is_active: !student.is_active,
            classroom_id: classroom.id,
        });
    };

    const deleteStudent = (id: number, name: string) => {
        confirmDelete(
            `Hapus siswa ${name}? Data pembayaran yang terkait juga mungkin akan terhapus.`,
            () => {
                router.delete(`/korlas/students/${id}`, {
                    data: { classroom_id: classroom.id },
                });
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title={`Kelola Siswa - ${classroom.name}`} />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Siswa
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelas: {classroom.name}
                    </p>
                </div>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                    {allClassrooms && allClassrooms.length > 0 && (
                        <div>
                            <select
                                value={classroom.id}
                                onChange={(e) => {
                                    router.get(
                                        '/korlas/students',
                                        { classroom_id: e.target.value },
                                        { preserveState: false },
                                    );
                                }}
                                className="w-full rounded-2xl border-slate-300 px-4 py-3 text-sm font-medium shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto sm:py-3.5"
                            >
                                {allClassrooms.map((c: any) => (
                                    <option key={c.id} value={c.id}>
                                        Pilih Kelas: {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button
                        onClick={openCreate}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        <span>Tambah Siswa</span>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isEditing ? 'Edit Siswa' : 'Tambah Siswa Baru'}
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
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Nama Anak / Siswa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        required
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                    {errors.name && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Nama Orang Tua / Wali
                                    </label>
                                    <input
                                        type="text"
                                        value={data.parent_name}
                                        onChange={(e) =>
                                            setData('parent_name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Contoh: Bapak Andi (Opsional)"
                                    />
                                    {errors.parent_name && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.parent_name}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Siswa'}
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
                                            Nama Siswa
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Orang Tua / Wali
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Status
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
                                    {students.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-4 py-8 text-center text-sm text-slate-500"
                                            >
                                                Belum ada data siswa di kelas
                                                ini. Silakan tambah data siswa
                                                di form samping.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student: any) => (
                                            <tr
                                                key={student.id}
                                                className={`transition-colors hover:bg-slate-50/80 ${!student.is_active ? 'bg-slate-50 opacity-60' : ''}`}
                                            >
                                                <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-slate-900">
                                                    {student.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                                    {student.parent_name || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                                    <button
                                                        onClick={() =>
                                                            toggleStatus(
                                                                student,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 transition-colors hover:text-blue-600"
                                                        title="Klik untuk mengubah status aktif/non-aktif"
                                                    >
                                                        {student.is_active ? (
                                                            <>
                                                                <ToggleRight
                                                                    weight="fill"
                                                                    className="h-6 w-6 text-emerald-500"
                                                                />
                                                                <span className="font-medium text-emerald-700">
                                                                    Aktif
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ToggleLeft
                                                                    weight="fill"
                                                                    className="h-6 w-6 text-slate-400"
                                                                />
                                                                <span className="font-medium text-slate-500">
                                                                    Non-Aktif
                                                                </span>
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 align-middle whitespace-nowrap">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openEdit(
                                                                    student,
                                                                )
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all hover:-translate-y-1 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20"
                                                            title="Edit Siswa"
                                                        >
                                                            <PencilSimple
                                                                weight="bold"
                                                                className="h-4 w-4"
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteStudent(
                                                                    student.id,
                                                                    student.name,
                                                                )
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 transition-all hover:-translate-y-1 hover:bg-rose-100 hover:shadow-lg hover:shadow-rose-500/20"
                                                            title="Hapus Siswa"
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
                        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500">
                            Total {students.length} Siswa
                        </div>
                    </div>
                </div>
        </DashboardLayout>
    );
}
