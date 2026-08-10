import { Head, useForm, router } from '@inertiajs/react';
import { PencilSimple, Trash } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function CategoriesIndex({
    categories,
}: {
    categories: any[];
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

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
    };

    const openEdit = (category: any) => {
        setIsEditing(true);
        setEditingId(category.id);
        clearErrors();
        setData({
            name: category.name,
            color: category.color || '',
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/admin/categories/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                },
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => reset(),
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

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                    Manajemen Kategori
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
                            <h2 className="text-xl font-semibold text-slate-800">
                                {isEditing ? 'Edit Kategori' : 'Tambah Kategori'}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={openCreate}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Batal Edit
                                </button>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-3 py-2 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                    required
                                    placeholder="Contoh: Pengumuman"
                                />
                                {errors.name && (
                                    <div className="mt-1 text-xs text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-semibold text-slate-700">
                                    Warna Label Kategori
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { name: 'Biru', value: '#3b82f6' },
                                        { name: 'Hijau', value: '#10b981' },
                                        { name: 'Kuning', value: '#f59e0b' },
                                        { name: 'Merah', value: '#f43f5e' },
                                        { name: 'Ungu', value: '#a855f7' },
                                        { name: 'Abu-abu', value: '#64748b' },
                                    ].map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => setData('color', color.value)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all hover:scale-110 focus:outline-none ${
                                                data.color === color.value
                                                    ? 'scale-110 border-slate-800 shadow-md'
                                                    : 'border-transparent shadow-sm hover:border-slate-300'
                                            }`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        >
                                            {data.color === color.value && (
                                                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {errors.color && (
                                    <div className="mt-2 text-xs font-medium text-red-500">
                                        {errors.color}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50/50">
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
                                                className="px-6 py-8 text-center text-sm text-slate-500"
                                            >
                                                Belum ada data kategori.
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((category: any) => (
                                            <tr
                                                key={category.id}
                                                className="transition-all duration-200 hover:bg-blue-50/30"
                                            >
                                                <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-slate-800">
                                                    <div className="flex items-center gap-2">
                                                        {category.color && (
                                                            <span
                                                                className="h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: category.color }}
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
                                                            onClick={() => openEdit(category)}
                                                            className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-amber-100 hover:text-amber-600 hover:shadow-sm"
                                                            title="Edit Kategori"
                                                        >
                                                            <PencilSimple weight="bold" className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteCategory(category.id, category.name)}
                                                            className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-rose-100 hover:text-rose-600 hover:shadow-sm"
                                                            title="Hapus Kategori"
                                                        >
                                                            <Trash weight="bold" className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-500">
                            Total {categories.length} Kategori
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
