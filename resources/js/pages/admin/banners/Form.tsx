import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, FloppyDisk, ImageSquare as ImageIcon } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState, useRef } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

export default function BannerForm({ banner }: { banner?: any }) {
    const isEditing = !!banner;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        banner?.image ? `/storage/${banner.image}` : null
    );

    const { data, setData, post, processing, errors, post: updatePost } = useForm({
        title: banner?.title || '',
        image: null as File | null,
        is_active: banner?.is_active ?? true,
        order: banner?.order || 0,
        _method: isEditing ? 'put' : 'post', // Inertia hack for file uploads with PUT
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            updatePost(`/banners/${banner.id}`);
        } else {
            post('/banners');
        }
    };

    return (
        <DashboardLayout>
            <Head title={isEditing ? 'Edit Banner' : 'Tambah Banner'} />

            <div className="mx-auto w-full max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/banners"
                        className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                        <ArrowLeft weight="bold" className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                            {isEditing ? 'Edit Banner' : 'Tambah Banner Baru'}
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {isEditing 
                                ? 'Ubah informasi atau gambar banner ucapan ini.' 
                                : 'Unggah gambar banner baru untuk ditampilkan di halaman utama.'}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <form onSubmit={submit} className="p-6 sm:p-8">
                        <div className="space-y-6">
                            {/* Image Upload Area */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Gambar Banner <span className="text-rose-500">*</span>
                                </label>
                                
                                <div 
                                    className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all hover:bg-slate-50 ${errors.image ? 'border-rose-400 bg-rose-50' : 'border-slate-300'} ${imagePreview ? 'h-auto min-h-64' : 'h-64'}`}
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
                                                <ImageIcon weight="duotone" className="h-8 w-8" />
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
                                    <p className="mt-2 text-xs text-rose-500">{errors.image}</p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                    Judul Banner (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 transition-colors hover:bg-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: Selamat Hari Raya Idul Fitri"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-rose-500">{errors.title}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-6 sm:flex-row">
                                {/* Order */}
                                <div className="flex-1">
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Urutan Tampil
                                    </label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 transition-colors hover:bg-white focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                    <p className="mt-1.5 text-xs text-slate-500">
                                        Angka lebih kecil akan tampil lebih dulu (0, 1, 2).
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="flex-1">
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Status
                                    </label>
                                    <label className="relative mt-2 inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <div className="peer h-7 w-14 rounded-full bg-slate-200 transition-colors after:absolute after:top-[2px] after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                                        <span className="ml-3 text-sm font-semibold text-slate-700">
                                            {data.is_active ? 'Banner Aktif' : 'Banner Disembunyikan'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                            <Link
                                href="/banners"
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-[0.98] disabled:opacity-70"
                            >
                                <FloppyDisk weight="bold" className="h-5 w-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Banner'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
