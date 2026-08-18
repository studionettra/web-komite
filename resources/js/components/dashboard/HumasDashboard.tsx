import { Link } from '@inertiajs/react';
import {
    Article,
    FileText,
    PencilSimpleLine,
    Tag,
    ClockCounterClockwise,
    CheckCircle,
    Users,
    ArrowUpRight,
    ChartLineUp,
} from '@phosphor-icons/react';

export default function HumasDashboard({
    metrics,
    recent_posts: recentPosts,
    analytics,
}: any) {
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="mb-1 px-1 text-lg font-bold tracking-tight text-slate-900">
                Ringkasan Kabar & Informasi
            </h2>

            {/* Quick Actions & Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Write New Action Card */}
                <div className="col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-900/20 sm:col-span-2 lg:col-span-2">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                            <MegaphoneIcon /> Publikasi
                        </div>
                        <h3 className="text-xl font-bold sm:text-2xl">
                            Ada kabar terbaru?
                        </h3>
                        <p className="mt-2 text-sm text-blue-100">
                            Tulis dan sebarkan informasi terbaru terkait agenda
                            sekolah, kegiatan komite, maupun prestasi anak didik
                            kita.
                        </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/admin/posts/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-blue-50"
                        >
                            <PencilSimpleLine
                                weight="bold"
                                className="h-4 w-4"
                            />
                            Tulis Kabar
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
                        >
                            Kelola Semua Kabar
                        </Link>
                    </div>
                </div>

                {/* Published Metric */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-emerald-50 opacity-50"></div>
                    <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                <CheckCircle
                                    weight="duotone"
                                    className="h-6 w-6"
                                />
                            </div>
                            <span className="text-sm font-bold text-slate-600">
                                Kabar Terbit
                            </span>
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-extrabold text-slate-800">
                                {metrics?.published_posts || 0}
                            </span>
                            <span className="ml-2 text-sm font-medium text-slate-500">
                                artikel
                            </span>
                        </div>
                    </div>
                </div>

                {/* Draft Metric */}
                <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-amber-50 opacity-50"></div>
                    <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                <FileText
                                    weight="duotone"
                                    className="h-6 w-6"
                                />
                            </div>
                            <span className="text-sm font-bold text-slate-600">
                                Konsep (Draft)
                            </span>
                        </div>
                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <span className="text-3xl font-extrabold text-slate-800">
                                    {metrics?.draft_posts || 0}
                                </span>
                                <span className="ml-2 text-sm font-medium text-slate-500">
                                    artikel
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="mt-2">
                <h2 className="mb-4 px-1 text-lg font-bold tracking-tight text-slate-900">
                    Kinerja Website (7 Hari Terakhir)
                </h2>

                {analytics?.error ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <ChartLineUp weight="duotone" className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-700">
                            Analitik Belum Tersedia
                        </h4>
                        <p className="mt-1 max-w-sm text-xs text-slate-500">
                            {analytics.message ||
                                'Data statistik pengunjung belum bisa dimuat saat ini.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Card 1: Visitors */}
                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition-all hover:shadow-md hover:shadow-blue-900/5">
                            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-blue-50/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                        Total Pengunjung
                                    </div>
                                    <div className="mt-2 text-4xl font-extrabold tracking-tighter text-slate-900">
                                        {analytics?.visitors || 0}
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                    <Users
                                        weight="duotone"
                                        className="h-6 w-6"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Page Views */}
                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition-all hover:shadow-md hover:shadow-emerald-900/5">
                            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-50/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                        Tayangan Halaman
                                    </div>
                                    <div className="mt-2 text-4xl font-extrabold tracking-tighter text-slate-900">
                                        {analytics?.pageViews || 0}
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                                    <ArrowUpRight
                                        weight="duotone"
                                        className="h-6 w-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Posts Table */}
                <div className="col-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-blue-100 p-1.5 text-blue-600">
                                <ClockCounterClockwise
                                    weight="fill"
                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Riwayat Tulisan Terakhir
                            </h3>
                        </div>
                        <Link
                            href="/admin/posts"
                            className="text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentPosts?.length > 0 ? (
                            recentPosts.map((post: any) => (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-slate-50 sm:p-5"
                                >
                                    <div className="flex flex-1 items-start gap-4">
                                        <div className="hidden sm:block">
                                            {post.image_path ? (
                                                <img
                                                    src={`/storage/${post.image_path}`}
                                                    alt={post.title}
                                                    className="h-12 w-16 rounded-lg object-cover shadow-sm"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-400 shadow-inner">
                                                    <Article
                                                        weight="duotone"
                                                        className="h-6 w-6"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="line-clamp-1 text-sm font-bold text-slate-800 sm:text-base">
                                                {post.title}
                                            </h4>
                                            <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <ClockCounterClockwise className="h-3.5 w-3.5" />
                                                    {new Date(
                                                        post.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                                <span className="text-slate-300">
                                                    •
                                                </span>
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                                        post.is_published
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}
                                                >
                                                    {post.is_published
                                                        ? 'Terbit'
                                                        : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm hover:border-blue-200 hover:text-blue-600 sm:px-3 sm:py-1.5"
                                    >
                                        <span className="hidden text-xs font-bold sm:block">
                                            Edit
                                        </span>
                                        <PencilSimpleLine
                                            className="h-4 w-4 sm:hidden"
                                            weight="bold"
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-sm text-slate-500">
                                Belum ada artikel yang ditulis.
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Shortcut */}
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-purple-100 p-1.5 text-purple-600">
                                    <Tag
                                        weight="fill"
                                        className="h-4 w-4 sm:h-5 sm:w-5"
                                    />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Label & Kategori
                                </h3>
                            </div>
                        </div>
                        <div className="p-5 text-center">
                            <p className="mb-4 text-xs font-medium text-slate-500">
                                Kategorikan kabar agar pengunjung lebih mudah
                                menemukan topik yang relevan.
                            </p>
                            <Link
                                href="/admin/categories"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-purple-100 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-100"
                            >
                                <Tag className="h-4 w-4" weight="bold" /> Kelola
                                Kategori
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MegaphoneIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
        >
            <path d="M192,104a32,32,0,0,1-32,32H112a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48A32,32,0,0,1,192,104Zm46.12-16.12A48.06,48.06,0,0,0,160,40H112a24,24,0,0,0-24,24V80H40a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16H90.22L116.5,213.52A15.93,15.93,0,0,0,127.81,216h.38a16,16,0,0,0,15.68-12.86L155.33,144H160a48.06,48.06,0,0,0,78.12-47.88ZM160,128H148a8,8,0,0,0-7.85,6.43L128.69,192,104.9,146.42A8,8,0,0,0,97.81,144H40V96H88v48a8,8,0,0,0,16,0V64a8,8,0,0,1,8-8h48A32,32,0,0,1,160,128Z"></path>
        </svg>
    );
}
