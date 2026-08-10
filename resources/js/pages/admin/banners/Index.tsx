import { Head, Link, router } from '@inertiajs/react';
import {
    PencilSimple,
    Plus,
    Trash,
    CheckCircle,
    XCircle,
} from '@phosphor-icons/react';
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
                        <p className="mt-2 text-sm font-medium text-slate-500">
                            Kelola banner ucapan dan banner insidental yang
                            tampil di halaman publik.
                        </p>
                    </div>
                    <Link
                        href="/banners/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        Tambah Banner
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
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
                                            className="transition-all duration-200 hover:bg-blue-50/30"
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
                                                    <Link
                                                        href={`/banners/${banner.id}/edit`}
                                                        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-amber-100 hover:text-amber-600 hover:shadow-sm focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                                        title="Edit"
                                                    >
                                                        <PencilSimple
                                                            weight="bold"
                                                            className="h-5 w-5"
                                                        />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                banner.id,
                                                            )
                                                        }
                                                        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-rose-100 hover:text-rose-600 hover:shadow-sm focus:ring-4 focus:ring-rose-500/20 focus:outline-none"
                                                        title="Hapus"
                                                    >
                                                        <Trash
                                                            weight="bold"
                                                            className="h-5 w-5"
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
                </div>
            </div>
        </DashboardLayout>
    );
}
