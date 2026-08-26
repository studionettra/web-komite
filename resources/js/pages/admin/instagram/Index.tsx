import { Head, router, useForm } from '@inertiajs/react';
import {
    PencilSimple,
    Plus,
    Trash,
    CheckCircle,
    XCircle,
    X,
    InstagramLogo,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function InstagramIndex({ posts }: { posts: any[] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            url: '',
            is_active: true,
            order: 0,
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (post: any) => {
        setIsEditing(true);
        setEditingId(post.id);
        clearErrors();
        setData({
            url: post.url || '',
            is_active: post.is_active,
            order: post.order || 0,
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/admin/instagram/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/admin/instagram', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Tindakan ini tidak dapat dibatalkan.',
            () => {
                router.delete(`/admin/instagram/${id}`, {
                    preserveScroll: true,
                });
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Feed Instagram" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Feed Instagram
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola tautan (URL) postingan Instagram yang akan
                        ditampilkan di beranda publik.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-pink-500 hover:to-purple-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-4 w-4" />
                    Tambah URL
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    URL Postingan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Urutan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="transition-colors hover:bg-slate-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                                                    <InstagramLogo
                                                        weight="duotone"
                                                        className="h-5 w-5"
                                                    />
                                                </div>
                                                <a
                                                    href={post.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-medium text-slate-700 hover:text-pink-600"
                                                >
                                                    {post.url.length > 40
                                                        ? post.url.substring(
                                                              0,
                                                              40,
                                                          ) + '...'
                                                        : post.url}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                                                {post.order}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {post.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                                                    <CheckCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-500/10 ring-inset">
                                                    <XCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEdit(post)
                                                    }
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                    title="Edit"
                                                >
                                                    <PencilSimple
                                                        weight="bold"
                                                        className="h-4 w-4"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(post.id)
                                                    }
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                                                    title="Hapus"
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
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                                            <InstagramLogo className="h-6 w-6 text-slate-400" />
                                        </div>
                                        <h3 className="mt-2 text-sm font-semibold text-slate-900">
                                            Belum Ada Data
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Mulai tambahkan tautan Instagram.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h3 className="text-lg font-semibold text-slate-800">
                                {isEditing ? 'Edit Tautan' : 'Tambah Tautan Baru'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-5">
                                {/* URL */}
                                <div>
                                    <label
                                        htmlFor="url"
                                        className="mb-2 block text-sm font-semibold text-slate-900"
                                    >
                                        URL Postingan Instagram <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        id="url"
                                        value={data.url}
                                        onChange={(e) =>
                                            setData('url', e.target.value)
                                        }
                                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10"
                                        placeholder="https://www.instagram.com/p/xxx/"
                                        autoComplete="off"
                                        required
                                    />
                                    {errors.url && (
                                        <p className="mt-1 text-sm text-rose-500">
                                            {errors.url}
                                        </p>
                                    )}
                                    <p className="mt-1.5 text-xs text-slate-500">
                                        Contoh: https://www.instagram.com/p/CwYxG90S1fH/
                                    </p>
                                </div>

                                {/* Order */}
                                <div>
                                    <label
                                        htmlFor="order"
                                        className="mb-2 block text-sm font-semibold text-slate-900"
                                    >
                                        Urutan Tampilan
                                    </label>
                                    <input
                                        type="number"
                                        id="order"
                                        value={data.order}
                                        onChange={(e) =>
                                            setData('order', Number(e.target.value))
                                        }
                                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10"
                                    />
                                    {errors.order && (
                                        <p className="mt-1 text-sm text-rose-500">
                                            {errors.order}
                                        </p>
                                    )}
                                    <p className="mt-1.5 text-xs text-slate-500">
                                        Angka lebih kecil akan tampil lebih awal (contoh: 0, 1, 2).
                                    </p>
                                </div>

                                {/* Is Active */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData('is_active', !data.is_active)
                                        }
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 focus:outline-none ${
                                            data.is_active
                                                ? 'bg-pink-600'
                                                : 'bg-slate-200'
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                                data.is_active
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                    <span className="text-sm font-semibold text-slate-900">
                                        Aktifkan Postingan Ini
                                    </span>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                                    disabled={processing}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:opacity-70"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Tautan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
