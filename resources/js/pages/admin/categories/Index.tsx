import { Head, useForm, router } from '@inertiajs/react';
import { PencilSimple, Trash, X, Plus } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function CategoriesIndex({ categories }: { categories: any[] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            color: '',
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (category: any) => {
        setIsEditing(true);
        setEditingId(category.id);
        clearErrors();
        setData({
            name: category.name,
            color: category.color || '',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/admin/categories/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const deleteCategory = (id: number, name: string) => {
        confirmDelete(`Hapus kategori ${name}?`, () => {
            router.delete(`/admin/categories/${id}`);
        });
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Kategori" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                    Manajemen Kategori
                </h1>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-5 w-5" />
                    <span>Tambah Kategori</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="custom-scrollbar relative max-h-[90vh] w-full max-w-xl transform overflow-y-auto rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isEditing
                                    ? 'Edit Kategori'
                                    : 'Tambah Kategori'}
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
                                        Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        required
                                        placeholder="Contoh: Pengumuman"
                                    />
                                    {errors.name && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-medium text-slate-700">
                                        Warna Label Kategori
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { name: 'Biru', value: '#3b82f6' },
                                            { name: 'Hijau', value: '#10b981' },
                                            {
                                                name: 'Kuning',
                                                value: '#f59e0b',
                                            },
                                            { name: 'Merah', value: '#f43f5e' },
                                            { name: 'Ungu', value: '#a855f7' },
                                            {
                                                name: 'Abu-abu',
                                                value: '#64748b',
                                            },
                                        ].map((color) => (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        'color',
                                                        color.value,
                                                    )
                                                }
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all hover:scale-110 focus:outline-none ${
                                                    data.color === color.value
                                                        ? 'scale-110 border-slate-800 shadow-md ring-2 ring-slate-800 ring-offset-2'
                                                        : 'border-transparent shadow-sm hover:border-slate-300'
                                                }`}
                                                style={{
                                                    backgroundColor:
                                                        color.value,
                                                }}
                                                title={color.name}
                                            >
                                                {data.color === color.value && (
                                                    <svg
                                                        className="h-5 w-5 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.color && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.color}
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
                                        : 'Simpan Kategori'}
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
                                        Nama Kategori
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                    >
                                        Slug
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                    >
                                        Total Post
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
                                {categories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-8 text-center text-sm text-slate-500"
                                        >
                                            Belum ada data kategori.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category: any) => (
                                        <tr
                                            key={category.id}
                                            className="transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-slate-800">
                                                <div className="flex items-center gap-2">
                                                    {category.color && (
                                                        <span
                                                            className="h-3 w-3 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    category.color,
                                                            }}
                                                        ></span>
                                                    )}
                                                    {category.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                                {category.slug}
                                            </td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                                {category.posts_count}
                                            </td>
                                            <td className="px-4 py-3 text-right align-top whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEdit(category)
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                        title="Edit Kategori"
                                                    >
                                                        <PencilSimple
                                                            weight="bold"
                                                            className="h-4 w-4"
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteCategory(
                                                                category.id,
                                                                category.name,
                                                            )
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600"
                                                        title="Hapus Kategori"
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
                        Total {categories.length} Kategori
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
