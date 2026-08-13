import { Head, router, useForm } from '@inertiajs/react';
import {
    PencilSimple,
    Plus,
    Trash,
    CheckCircle,
    XCircle,
    X,
    ImageSquare as ImageIcon,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState, useRef } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function BannersIndex({ banners }: { banners: any[] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        image: null as File | null,
        is_active: true,
        order: 0,
        _method: 'post',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        setImagePreview(null);
        reset();
        clearErrors();
        setData('_method', 'post');
        setIsModalOpen(true);
    };

    const openEdit = (banner: any) => {
        setIsEditing(true);
        setEditingId(banner.id);
        setImagePreview(banner.image ? `/storage/${banner.image}` : null);
        clearErrors();
        setData({
            title: banner.title || '',
            image: null,
            is_active: banner.is_active,
            order: banner.order || 0,
            _method: 'put',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            post(`/banners/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/banners', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Tindakan ini tidak dapat dibatalkan dan gambar akan dihapus dari server.',
            () => {
                router.delete(`/banners/${id}`, {
                    preserveScroll: true,
                });
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Banner" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Banner
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola banner ucapan dan banner insidental yang
                        tampil di halaman publik.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-5 w-5" />
                    <span>Tambah Banner</span>
                </button>
            </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsModalOpen(false)}
                        ></div>
                        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {isEditing ? 'Edit Banner' : 'Tambah Banner Baru'}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X weight="bold" className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={submit}>
                                <div className="space-y-8 px-8 py-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Gambar Banner{' '}
                                            <span className="text-rose-500">*</span>
                                        </label>

                                        <div
                                            className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md ${errors.image ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50/50'} ${imagePreview ? 'h-auto min-h-[16rem]' : 'h-64'}`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                            />

                                            {imagePreview ? (
                                                <div className="group relative w-full">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                        <span className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                                                            Klik untuk mengganti gambar
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                        <ImageIcon
                                                            weight="duotone"
                                                            className="h-8 w-8"
                                                        />
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        Klik untuk mengunggah gambar
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        PNG, JPG atau WEBP (Maks. 2MB)
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {errors.image && (
                                            <p className="mt-2 text-xs text-rose-500">
                                                {errors.image}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Judul Banner (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                            placeholder="Contoh: Selamat Hari Raya Idul Fitri"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm font-medium text-rose-500">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-6 sm:flex-row">
                                        <div className="flex-1">
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Urutan Tampil
                                            </label>
                                            <input
                                                type="number"
                                                value={data.order}
                                                onChange={(e) =>
                                                    setData('order', parseInt(e.target.value))
                                                }
                                                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                                min="0"
                                            />
                                            <p className="mt-2 text-xs text-slate-500">
                                                Angka lebih kecil akan tampil lebih dulu (0, 1, 2).
                                            </p>
                                        </div>

                                        <div className="flex-1">
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Status
                                            </label>
                                            <label className="relative mt-2.5 inline-flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={data.is_active}
                                                    onChange={(e) =>
                                                        setData('is_active', e.target.checked)
                                                    }
                                                />
                                                <div className="peer h-7 w-14 rounded-full bg-slate-200 transition-colors peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                                <span className="ml-3 text-sm font-semibold text-slate-700">
                                                    {data.is_active
                                                        ? 'Banner Aktif'
                                                        : 'Banner Disembunyikan'}
                                                </span>
                                            </label>
                                        </div>
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
                                        {processing ? 'Menyimpan...' : 'Simpan Banner'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3">
                                        Gambar / Judul
                                    </th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Urutan</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {banners.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-8 text-center text-slate-500"
                                        >
                                            Belum ada banner yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr
                                            key={banner.id}
                                            className="transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 shadow-sm transition-transform hover:scale-105">
                                                        <img
                                                            src={`/storage/${banner.image}`}
                                                            alt={
                                                                banner.title ||
                                                                'Banner'
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-slate-800">
                                                        {banner.title ||
                                                            '- Tanpa Judul -'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {banner.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                        <CheckCircle
                                                            weight="fill"
                                                            className="h-4 w-4"
                                                        />
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                        <XCircle
                                                            weight="fill"
                                                            className="h-4 w-4"
                                                        />
                                                        Nonaktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-700">
                                                {banner.order}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(banner)}
                                                        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-amber-100 hover:text-amber-600 hover:shadow-sm focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                                        title="Edit"
                                                    >
                                                        <PencilSimple weight="bold" className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                banner.id,
                                                            )
                                                        }
                                                        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-rose-100 hover:text-rose-600 hover:shadow-sm focus:ring-4 focus:ring-rose-500/20 focus:outline-none"
                                                        title="Hapus"
                                                    >
                                                        <Trash weight="bold" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </DashboardLayout>
    );
}
