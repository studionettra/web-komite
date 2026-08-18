import { Head, Link, router } from '@inertiajs/react';
import {
    CaretRight,
    MagnifyingGlass,
    Tag,
    Newspaper,
    Megaphone,
    ChatCircle,
    BellRinging,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import PublicLayout from '../../../layouts/PublicLayout';

export default function PostsIndex({
    posts,
    categories,
    currentCategory,
    currentSearch,
}: {
    posts: any;
    categories: any[];
    currentCategory: string | null;
    currentSearch?: string;
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState(currentSearch || '');

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleCategoryChange = (slug: string) => {
        const params: any = {};

        if (search) {
params.search = search;
}

        if (currentCategory !== slug) {
            params.category = slug;
        }

        router.get('/kabar', params);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: any = {};

        if (currentCategory) {
params.category = currentCategory;
}

        if (search) {
params.search = search;
}

        router.get('/kabar', params, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head>
                <title>Kabar Komite - KBIT-TKIT Al-Ikhlash Pasar Minggu</title>
                <meta
                    name="description"
                    content="Kumpulan berita, artikel, dan kabar terbaru dari kegiatan Komite KBIT-TKIT Al-Ikhlash Pasar Minggu."
                />
            </Head>

            {/* Header Section */}
            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-300/20 mix-blend-multiply blur-3xl"></div>

                {/* Animated Background Icons in Bubbles */}
                <div
                    className={`absolute top-10 -left-4 -z-10 origin-bottom-right transition-all delay-100 duration-1000 ease-out md:top-20 md:left-[10%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-15deg] opacity-80' : 'translate-x-[-20%] translate-y-[20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-100 shadow-lg shadow-blue-200/50 md:h-28 md:w-28 md:rounded-[2rem]">
                        <Megaphone
                            weight="duotone"
                            className="h-10 w-10 text-blue-500 transition-transform hover:scale-110 md:h-14 md:w-14"
                        />
                    </div>
                </div>
                <div
                    className={`absolute -right-4 bottom-10 -z-10 origin-top-left transition-all delay-300 duration-1000 ease-out md:right-[12%] md:bottom-20 ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[20deg] opacity-80' : 'translate-x-[20%] translate-y-[-20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-lg shadow-pink-200/50 md:h-24 md:w-24">
                        <Newspaper
                            weight="duotone"
                            className="h-8 w-8 text-pink-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>
                <div
                    className={`absolute top-20 -right-2 -z-10 origin-bottom-left transition-all delay-500 duration-1000 ease-out md:top-24 md:right-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[15deg] opacity-90' : 'translate-x-[20%] translate-y-[-10%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 shadow-lg shadow-yellow-200/50 md:h-20 md:w-20">
                        <ChatCircle
                            weight="duotone"
                            className="h-8 w-8 text-yellow-500 transition-transform hover:scale-110 md:h-10 md:w-10"
                        />
                    </div>
                </div>
                <div
                    className={`absolute bottom-20 -left-2 -z-10 origin-top-right transition-all delay-700 duration-1000 ease-out md:bottom-24 md:left-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-10deg] opacity-80' : 'translate-x-[-30%] translate-y-[30%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 shadow-lg shadow-emerald-200/50 md:h-24 md:w-24 md:rounded-[2rem]">
                        <BellRinging
                            weight="duotone"
                            className="h-8 w-8 text-emerald-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="inline-block rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-10">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold text-blue-600 ring-1 ring-blue-500/20 ring-inset sm:mb-6">
                            <Tag weight="bold" className="h-4 w-4" />
                            Kabar Terbaru
                        </span>
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            Berita &{' '}
                            <span className="text-blue-600">Informasi</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Ikuti perkembangan terbaru, artikel, dan informasi
                            seputar kegiatan komite dan sekolah TKIT Al-Ikhlash.
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="relative mx-auto mt-8 max-w-lg"
                        >
                            <input
                                type="text"
                                placeholder="Cari kabar apa hari ini? 🔍"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border-[4px] border-slate-900 bg-white py-3 pr-16 pl-6 text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0ea5e9] transition-all placeholder:text-slate-400 focus:-translate-y-1 focus:shadow-[6px_6px_0_#0ea5e9] focus:ring-4 focus:ring-sky-200 focus:outline-none sm:py-4 sm:text-lg"
                            />
                            <button
                                type="submit"
                                className="absolute top-2 right-2 bottom-2 flex aspect-square items-center justify-center rounded-full bg-blue-500 text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:translate-y-0 active:scale-95"
                            >
                                <MagnifyingGlass
                                    weight="bold"
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {posts.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-slate-100 bg-white p-16 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <MagnifyingGlass
                                    weight="duotone"
                                    className="mb-4 h-16 w-16 text-slate-300"
                                />
                                <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                                    Belum ada kabar
                                </h3>
                                <p className="text-slate-500">
                                    {currentSearch
                                        ? `Pencarian "${currentSearch}" tidak ditemukan.`
                                        : currentCategory
                                          ? 'Belum ada kabar untuk kategori ini.'
                                          : 'Belum ada kabar yang diterbitkan.'}
                                </p>
                                {(currentCategory || currentSearch) && (
                                    <Link
                                        href="/kabar"
                                        className="mt-6 font-bold text-blue-600 hover:underline"
                                    >
                                        Lihat Semua Kabar
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {posts.data.map(
                                        (post: any, index: number) => (
                                            <article
                                                key={post.id}
                                                className={`group flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${index === 0 ? 'md:col-span-2 md:flex-row' : ''}`}
                                            >
                                                <div
                                                    className={`relative overflow-hidden bg-slate-100 ${index === 0 ? 'md:w-1/2 md:shrink-0' : 'aspect-video'}`}
                                                >
                                                    {post.image_path ? (
                                                        <img
                                                            src={`/storage/${post.image_path}`}
                                                            alt={post.title}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                                            <Newspaper
                                                                weight="duotone"
                                                                className="h-16 w-16 text-slate-300"
                                                            />
                                                        </div>
                                                    )}

                                                    {post.category && (
                                                        <div className="absolute top-4 left-4">
                                                            <span
                                                                className="inline-flex rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md"
                                                                style={{
                                                                    backgroundColor:
                                                                        post
                                                                            .category
                                                                            .color
                                                                            ? `${post.category.color}e6`
                                                                            : 'rgba(59, 130, 246, 0.9)',
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                {
                                                                    post
                                                                        .category
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div
                                                    className={`flex flex-1 flex-col p-8 ${index === 0 ? 'md:justify-center' : ''}`}
                                                >
                                                    <div className="mb-4 flex items-center text-xs font-bold text-slate-500">
                                                        <span>
                                                            {new Date(
                                                                post.published_at,
                                                            ).toLocaleDateString(
                                                                'id-ID',
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                        <span className="mx-2">
                                                            •
                                                        </span>
                                                        <span>
                                                            {post.author?.name}
                                                        </span>
                                                    </div>

                                                    <h2
                                                        className={`mb-4 line-clamp-3 font-extrabold text-slate-900 transition-colors group-hover:text-blue-600 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                                                    >
                                                        <Link
                                                            href={`/kabar/${post.slug}`}
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    </h2>

                                                    {/* Extract text from trix content for excerpt */}
                                                    <div
                                                        className="mb-6 line-clamp-3 leading-relaxed font-medium text-slate-600"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                post.content
                                                                    .replace(
                                                                        /<[^>]+>/g,
                                                                        ' ',
                                                                    )
                                                                    .substring(
                                                                        0,
                                                                        150,
                                                                    ) + '...',
                                                        }}
                                                    />

                                                    <div className="mt-auto">
                                                        <Link
                                                            href={`/kabar/${post.slug}`}
                                                            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Baca Selengkapnya
                                                            <CaretRight
                                                                weight="bold"
                                                                className="h-4 w-4"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        ),
                                    )}
                                </div>

                                {/* Pagination */}
                                {posts.links && posts.links.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {posts.links.map(
                                                (link: any, i: number) => (
                                                    <Link
                                                        key={i}
                                                        href={link.url || '#'}
                                                        className={`inline-flex min-w-[40px] items-center justify-center rounded-xl px-3 py-2 text-sm font-extrabold transition-all ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                                : 'border border-slate-100 bg-white text-slate-600 hover:bg-slate-50'
                                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-28 space-y-8">
                            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <h3 className="mb-4 border-b border-slate-100 pb-4 text-lg font-extrabold text-slate-800">
                                    Kategori
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => router.get('/kabar')}
                                            className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${!currentCategory ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            <span>Semua Kabar</span>
                                        </button>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        category.slug,
                                                    )
                                                }
                                                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${currentCategory === category.slug ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {category.color && (
                                                        <span
                                                            className="h-2.5 w-2.5 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    category.color,
                                                            }}
                                                        ></span>
                                                    )}
                                                    <span>{category.name}</span>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
