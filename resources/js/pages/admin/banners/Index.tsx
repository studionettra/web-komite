import { Head, Link, router } from '@inertiajs/react';
import { PencilSimple, Plus, Trash, CheckCircle, XCircle } from '@phosphor-icons/react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function BannersIndex({ banners }: { banners: any[] }) {
    const handleDelete = (id: number) => {
        confirmDelete({
            title: 'Hapus Banner?',
            text: 'Tindakan ini tidak dapat dibatalkan dan gambar akan dihapus dari server.',
            onConfirm: () => {
                router.delete(`/banners/${id}`, {
                    preserveScroll: true,
                });
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Banner" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                            Manajemen Banner
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola banner ucapan dan banner insidental yang tampil di halaman publik.
                        </p>
                    </div>
                    <Link
                        href="/banners/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        Tambah Banner
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-700">
                                <tr>
                                    <th className="px-6 py-4">Gambar / Judul</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Urutan</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {banners.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                            Belum ada banner yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr key={banner.id} className="transition-colors hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                                                        <img 
                                                            src={`/storage/${banner.image}`} 
                                                            alt={banner.title || 'Banner'} 
                                                            className="h-full w-full object-cover" 
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-slate-800">
                                                        {banner.title || '- Tanpa Judul -'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {banner.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                        <CheckCircle weight="fill" className="h-4 w-4" />
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                        <XCircle weight="fill" className="h-4 w-4" />
                                                        Nonaktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                {banner.order}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/banners/${banner.id}/edit`}
                                                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                                        title="Edit"
                                                    >
                                                        <PencilSimple weight="bold" className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(banner.id)}
                                                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                                        title="Hapus"
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
                </div>
            </div>
        </DashboardLayout>
    );
}
