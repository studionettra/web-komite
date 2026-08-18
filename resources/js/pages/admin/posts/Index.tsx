import { Head, Link, router } from '@inertiajs/react';
import {
    PencilSimple,
    Trash,
    Plus,
    CheckCircle,
    XCircle,
} from '@phosphor-icons/react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

export default function PostsIndex({ posts }: { posts: any }) {
    const deletePost = (id: number, title: string) => {
        confirmDelete(`Hapus kabar "${title}"?`, () => {
            router.delete(`/admin/posts/${id}`);
        });
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Kabar" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Kabar
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola artikel, berita, atau informasi terkini.
                    </p>
                </div>
                <Link
                    href="/admin/posts/create"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-5 w-5" />
                    <span>Tulis Kabar Baru</span>
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Judul Kabar
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Kategori
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Tanggal Terbit
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
                            {posts.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        Belum ada kabar yang ditulis.
                                    </td>
                                </tr>
                            ) : (
                                posts.data.map((post: any) => (
                                    <tr
                                        key={post.id}
                                        className="transition-colors hover:bg-slate-50/50"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <span className="line-clamp-1 text-sm font-semibold text-slate-900">
                                                    {post.title}
                                                </span>
                                                <span className="mt-0.5 line-clamp-1 text-xs font-medium text-slate-500">
                                                    {post.author?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-500">
                                            {post.category ? (
                                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                                    {post.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-medium text-slate-400 italic">
                                                    Tanpa Kategori
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                                            {post.is_published ? (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                                                    <CheckCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Terbit
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-500/20 ring-inset">
                                                    <XCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-600">
                                            {post.published_at
                                                ? new Date(
                                                      post.published_at,
                                                  ).toLocaleDateString(
                                                      'id-ID',
                                                      {
                                                          day: 'numeric',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right align-middle whitespace-nowrap">
                                            <div className="flex justify-end gap-1.5">
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                    title="Edit Kabar"
                                                >
                                                    <PencilSimple
                                                        weight="bold"
                                                        className="h-4 w-4"
                                                    />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deletePost(
                                                            post.id,
                                                            post.title,
                                                        )
                                                    }
                                                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600"
                                                    title="Hapus Kabar"
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
                {posts.links && posts.links.length > 3 && (
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-xs font-medium text-slate-500">
                            Menampilkan {posts.from} - {posts.to} dari{' '}
                            {posts.total}
                        </span>
                        <div className="flex items-center gap-1">
                            {posts.links.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`inline-flex min-w-[32px] items-center justify-center rounded-lg px-2 py-1 text-xs font-semibold transition-colors ${link.active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
