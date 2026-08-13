import { Head, Link, useForm } from '@inertiajs/react';
import { CaretLeft, Image as ImageIcon } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import Select from '../../../components/ui/Select';
import DashboardLayout from '../../../layouts/DashboardLayout';
import 'trix/dist/trix.css';
import 'trix';

export default function PostForm({
    post,
    categories,
}: {
    post: any | null;
    categories: any[];
}) {
    const isEditing = !!post;

    const { data, setData, post: postForm, processing, errors } = useForm({
        title: post?.title || '',
        content: post?.content || '',
        image: null as File | null,
        category_id: post?.category_id ? String(post.category_id) : '',
        is_published: post?.is_published ?? false,
        seo_title: post?.seo_title || '',
        seo_description: post?.seo_description || '',
        _method: isEditing ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        post?.image_path ? `/storage/${post.image_path}` : null
    );

    const trixInputRef = useRef<HTMLInputElement>(null);
    const trixEditorRef = useRef<any>(null);

    useEffect(() => {
        const handleTrixChange = (e: any) => {
            if (trixInputRef.current) {
                setData('content', trixInputRef.current.value);
            }
        };

        const handleTrixAttachment = async (e: any) => {
            if (e.attachment.file) {
                const attachment = e.attachment;
                const file = attachment.file;
                const formData = new FormData();
                formData.append('file', file);

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/admin/posts/upload-image', true);
                
                // For Laravel CSRF protection if needed, though Inertia handles most of it
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                if (csrfToken) {
                    xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
                }

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded * 100) / event.total);
                        attachment.setUploadProgress(progress);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.url) {
                                attachment.setAttributes({
                                    url: response.url,
                                    href: response.url,
                                });
                            }
                        } catch (e) {
                            console.error('Failed to parse upload response');
                        }
                    } else {
                        console.error('Upload failed', xhr.status);
                        toast.error('Gagal mengunggah gambar. Pastikan format valid dan ukuran maksimal 2MB.');
                    }
                };

                xhr.onerror = () => {
                    console.error('Network error during upload');
                    toast.error('Gagal mengunggah gambar karena kesalahan jaringan.');
                };

                xhr.send(formData);
            }
        };

        const editor = trixEditorRef.current;
        if (editor) {
            editor.addEventListener('trix-change', handleTrixChange);
            editor.addEventListener('trix-attachment-add', handleTrixAttachment);
        }

        return () => {
            if (editor) {
                editor.removeEventListener('trix-change', handleTrixChange);
                editor.removeEventListener('trix-attachment-add', handleTrixAttachment);
            }
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Inertia doesn't support PUT with multipart/form-data directly in the method field if passing File
        // but passing _method: 'PUT' inside data with POST request handles it in Laravel.
        const url = isEditing ? `/admin/posts/${post.id}` : '/admin/posts';

        postForm(url, {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Ukuran gambar maksimal 2MB');
                e.target.value = '';
                return;
            }
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <DashboardLayout>
            <Head title={isEditing ? 'Edit Kabar' : 'Tulis Kabar Baru'} />

            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/admin/posts"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                >
                    <CaretLeft weight="bold" className="h-4 w-4" />
                </Link>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        {isEditing ? 'Edit Kabar' : 'Tulis Kabar Baru'}
                    </h1>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    placeholder="Masukkan judul kabar..."
                                />
                                {errors.title && (
                                    <div className="mt-1.5 text-xs text-rose-500">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Konten
                                </label>
                                <div className="prose prose-slate max-w-none rounded-xl border border-slate-200 bg-slate-50 overflow-hidden [&>trix-toolbar]:bg-white [&>trix-toolbar]:border-b [&>trix-toolbar]:border-slate-200">
                                    <input id="trix-content" type="hidden" name="content" value={data.content} ref={trixInputRef} />
                                    {/* @ts-ignore */}
                                    <trix-editor input="trix-content" ref={trixEditorRef} class="trix-content min-h-[300px] p-4 text-sm outline-none bg-white font-medium text-slate-700"></trix-editor>
                                </div>
                                {errors.content && (
                                    <div className="mt-1.5 text-xs text-rose-500">
                                        {errors.content}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="mb-4 text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
                            SEO & Meta
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    SEO Title
                                </label>
                                <input
                                    type="text"
                                    value={data.seo_title}
                                    onChange={(e) => setData('seo_title', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Biarkan kosong untuk menggunakan judul asli"
                                />
                                {errors.seo_title && (
                                    <div className="mt-1.5 text-xs text-rose-500">
                                        {errors.seo_title}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    SEO Description
                                </label>
                                <textarea
                                    value={data.seo_description}
                                    onChange={(e) => setData('seo_description', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Ringkasan singkat untuk pencarian Google..."
                                    rows={3}
                                />
                                {errors.seo_description && (
                                    <div className="mt-1.5 text-xs text-rose-500">
                                        {errors.seo_description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-slate-700">
                                    Status Publikasi
                                </label>
                                <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-semibold text-slate-700 select-none">Terbitkan Kabar Ini</span>
                                </label>
                            </div>

                            <div className="relative z-20">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Kategori
                                </label>
                                <Select
                                    value={data.category_id}
                                    onChange={(val) => setData('category_id', val as string)}
                                    options={[
                                        { value: '', label: 'Tanpa Kategori' },
                                        ...categories.map((c) => ({
                                            value: String(c.id),
                                            label: c.name,
                                        })),
                                    ]}
                                    placeholder="Pilih kategori..."
                                />
                                {errors.category_id && (
                                    <div className="mt-1.5 text-xs text-rose-500">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700">
                                Gambar Sampul
                            </label>
                            <span className="text-[10px] font-medium text-slate-500">Maks. 2MB</span>
                        </div>
                        
                        <div className="relative overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition-colors hover:border-blue-400 hover:bg-blue-50">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                            />
                            {imagePreview ? (
                                <div className="relative aspect-video w-full">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                                        <span className="text-xs font-semibold text-white">Ganti Gambar</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                    <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
                                    <span className="text-xs font-semibold text-slate-600">Klik untuk unggah</span>
                                    <span className="text-[10px] font-medium mt-0.5">Format: JPG, PNG, WEBP</span>
                                </div>
                            )}
                        </div>
                        {errors.image && (
                            <div className="mt-1.5 text-xs text-rose-500">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                    >
                        {processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Terbitkan Kabar')}
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
