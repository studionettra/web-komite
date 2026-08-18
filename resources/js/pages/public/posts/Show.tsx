import { Head, Link } from '@inertiajs/react';
import {
    CaretLeft,
    CalendarBlank,
    User,
    Tag,
    ShareNetwork,
    CaretRight,
} from '@phosphor-icons/react';
import PublicLayout from '../../../layouts/PublicLayout';

export default function PostShow({
    post,
    relatedPosts,
}: {
    post: any;
    relatedPosts: any[];
}) {
    const defaultTitle = `${post.title} | Komite TKIT Al-Ikhlash`;
    const defaultDesc = post.content.replace(/<[^>]+>/g, ' ').substring(0, 160);

    const title = post.seo_title || defaultTitle;
    const description = post.seo_description || defaultDesc;

    // Handle sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: post.title,
                    text: description,
                    url: shareUrl,
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareUrl);
            alert('Tautan disalin ke clipboard!');
        }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {post.image_path && (
                    <meta
                        property="og:image"
                        content={`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${post.image_path}`}
                    />
                )}
                <meta property="og:type" content="article" />
            </Head>

            <article className="bg-white">
                {/* Hero Section */}
                <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-300/20 mix-blend-multiply blur-3xl"></div>

                    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Link
                            href="/kabar"
                            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-white/60 backdrop-blur-md transition-all hover:bg-white hover:text-blue-600"
                        >
                            <CaretLeft weight="bold" className="h-4 w-4" />
                            Kembali ke Kabar
                        </Link>

                        {post.category && (
                            <div className="mb-4 flex justify-center sm:mb-6">
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md"
                                    style={{
                                        backgroundColor: post.category.color
                                            ? `${post.category.color}1a`
                                            : 'rgba(59, 130, 246, 0.1)',
                                        color: post.category.color || '#2563eb',
                                    }}
                                >
                                    <Tag weight="fill" className="h-3 w-3" />
                                    {post.category.name}
                                </span>
                            </div>
                        )}

                        <h1 className="mx-auto mb-4 max-w-[25ch] text-3xl leading-tight font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-500">
                            <div className="flex items-center gap-2">
                                <CalendarBlank
                                    weight="duotone"
                                    className="h-5 w-5 text-blue-500"
                                />
                                <time dateTime={post.published_at}>
                                    {new Date(
                                        post.published_at,
                                    ).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <User
                                    weight="duotone"
                                    className="h-5 w-5 text-blue-500"
                                />
                                <span>{post.author?.name}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                {post.image_path && (
                    <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-4 sm:-mt-24 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 shadow-sky-900/10 ring-slate-900/5 sm:rounded-[2.5rem]">
                            <img
                                src={`/storage/${post.image_path}`}
                                alt={post.title}
                                fetchPriority="high"
                                decoding="async"
                                className="h-auto max-h-[50vh] w-full object-cover sm:max-h-[70vh]"
                            />
                        </div>
                    </div>
                )}

                {/* Content Body */}
                <div className="mx-auto max-w-[65ch] px-4 py-16 sm:px-6 lg:px-8">
                    <div
                        className="prose prose-lg prose-slate prose-headings:font-extrabold prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-md max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Button */}
                    <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                        <span className="font-bold text-slate-600">
                            Bagikan tulisan ini:
                        </span>
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-100"
                        >
                            <ShareNetwork weight="bold" className="h-4 w-4" />
                            Bagikan
                        </button>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="border-t border-slate-200/60 bg-slate-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-end justify-between">
                            <h2 className="text-2xl font-extrabold text-slate-900">
                                Kabar Terkait
                            </h2>
                            <Link
                                href="/kabar"
                                className="hidden items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 sm:inline-flex"
                            >
                                Lihat Semua Kabar
                                <CaretRight weight="bold" className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {relatedPosts.map((relatedPost: any) => (
                                <article
                                    key={relatedPost.id}
                                    className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                                >
                                    {relatedPost.image_path && (
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                            <img
                                                src={`/storage/${relatedPost.image_path}`}
                                                alt={relatedPost.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-3 text-xs font-bold text-slate-500">
                                            {new Date(
                                                relatedPost.published_at,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        <h3 className="mb-4 line-clamp-2 font-extrabold text-slate-900 transition-colors group-hover:text-blue-600">
                                            <Link
                                                href={`/kabar/${relatedPost.slug}`}
                                            >
                                                {relatedPost.title}
                                            </Link>
                                        </h3>
                                        <div className="mt-auto">
                                            <Link
                                                href={`/kabar/${relatedPost.slug}`}
                                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
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
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Link
                                href="/kabar"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                            >
                                Lihat Semua Kabar
                                <CaretRight weight="bold" className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
