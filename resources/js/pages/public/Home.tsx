import { Head, Link } from '@inertiajs/react';
import {
    CalendarBlank,
    ChalkboardTeacher,
    Clock,
    BowlFood,
    GraduationCap,
    Handshake,
    Heart,
    PersonSimpleSwim,
    Storefront,
    Tree,
    Trophy,
    UsersThree,
    ArrowUpRight,
    Article,
    InstagramLogo,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import ProgramCalendar from '../../components/public/ProgramCalendar';
import PublicLayout from '../../layouts/PublicLayout';
import { InstagramEmbed } from 'react-social-media-embed';

export default function Home({
    heroProgram,
    activePrograms,
    upcomingSessions,
    banners,
    recentPosts,
    instagramPosts,
}: any) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getProgramIcon = (title: string) => {
        if (!title) {
            return (
                <CalendarBlank
                    weight="fill"
                    className="absolute -right-4 -bottom-4 z-0 h-20 w-20 text-slate-100 transition-colors duration-500 group-hover:text-blue-100 sm:-right-6 sm:-bottom-6 sm:h-28 sm:w-28"
                />
            );
        }

        const t = title.toLowerCase();
        const iconClass =
            'absolute -bottom-4 -right-4 z-0 h-20 w-20 rotate-[-10deg] text-slate-100 transition-colors duration-500 group-hover:text-blue-100 sm:-bottom-6 sm:-right-6 sm:h-28 sm:w-28';

        if (t.includes('berbagi')) {
            return <Heart weight="fill" className={iconClass} />;
        }

        if (t.includes('lomba') || t.includes('hut')) {
            return <Trophy weight="fill" className={iconClass} />;
        }

        if (t.includes('makan')) {
            return <BowlFood weight="fill" className={iconClass} />;
        }

        if (t.includes('renang')) {
            return <PersonSimpleSwim weight="fill" className={iconClass} />;
        }

        if (t.includes('market')) {
            return <Storefront weight="fill" className={iconClass} />;
        }

        if (t.includes('guru')) {
            return <ChalkboardTeacher weight="fill" className={iconClass} />;
        }

        if (t.includes('gathering')) {
            return <UsersThree weight="fill" className={iconClass} />;
        }

        if (t.includes('halal')) {
            return <Handshake weight="fill" className={iconClass} />;
        }

        if (t.includes('piknik')) {
            return <Tree weight="fill" className={iconClass} />;
        }

        if (t.includes('pelepasan') || t.includes('seni')) {
            return <GraduationCap weight="fill" className={iconClass} />;
        }

        return <CalendarBlank weight="fill" className={iconClass} />;
    };

    return (
        <PublicLayout>
            <Head>
                <title>
                    Beranda - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu
                </title>
                <meta
                    name="description"
                    content="Website resmi Komite KBIT-TKIT Al-Ikhlash Pasar Minggu. Dapatkan informasi terbaru seputar program, transparansi keuangan, dan kegiatan sekolah."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative w-full border-b-[6px] border-dashed border-sky-200 bg-linear-to-b from-sky-100/60 to-sky-50 pt-24 pb-8 sm:pt-32 sm:pb-12">
                {heroProgram || (banners && banners.length > 0) ? (
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative h-112.5 w-full overflow-hidden rounded-4xl bg-slate-900 shadow-2xl shadow-sky-900/10 sm:h-137.5 sm:rounded-[3rem] lg:h-162.5">
                            <Swiper
                                modules={[Autoplay, EffectFade, Pagination]}
                                effect="fade"
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                observer={true}
                                observeParents={true}
                                className="h-full w-full [&_.swiper-pagination]:bottom-6! sm:[&_.swiper-pagination]:bottom-10! [&_.swiper-pagination-bullet]:mx-1.5! [&_.swiper-pagination-bullet]:h-2! [&_.swiper-pagination-bullet]:w-2! [&_.swiper-pagination-bullet]:border [&_.swiper-pagination-bullet]:border-white/80 [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:shadow-[0_0_3px_rgba(0,0,0,0.5)] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:scale-125 [&_.swiper-pagination-bullet-active]:border-white [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet-active]:shadow-[0_0_6px_rgba(0,0,0,0.6)]"
                            >
                                {/* 1. Incidental Banners */}
                                {banners &&
                                    Array.isArray(banners) &&
                                    banners.map(
                                        (banner: any, index: number) => (
                                            <SwiperSlide
                                                key={`banner-${banner.id}`}
                                            >
                                                <div className="group relative h-full w-full bg-slate-900">
                                                    <picture className="block h-full w-full">
                                                        <source
                                                            srcSet={`/storage/${banner.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}?v=2`}
                                                            type="image/webp"
                                                        />
                                                        <img
                                                            src={`/storage/${banner.image}?v=2`}
                                                            alt={
                                                                banner.title ||
                                                                'Banner'
                                                            }
                                                            fetchPriority={
                                                                index === 0
                                                                    ? 'high'
                                                                    : 'auto'
                                                            }
                                                            loading={
                                                                index === 0
                                                                    ? 'eager'
                                                                    : 'lazy'
                                                            }
                                                            className="h-full w-full object-cover object-center transition-transform duration-10000 ease-linear group-hover:scale-110"
                                                        />
                                                    </picture>
                                                    {/* Optional subtle gradient at bottom just for pagination visibility */}
                                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-950/50 to-transparent"></div>
                                                </div>
                                            </SwiperSlide>
                                        ),
                                    )}

                                {/* 2. Program Images + Info Overlay */}
                                {heroProgram &&
                                heroProgram.images &&
                                heroProgram.images.length > 0 ? (
                                    heroProgram.images.map(
                                        (img: string, idx: number) => (
                                            <SwiperSlide
                                                key={`prog-img-${idx}`}
                                            >
                                                <div className="group relative h-full w-full bg-slate-900">
                                                    <picture className="block h-full w-full">
                                                        <source
                                                            srcSet={`/storage/${img.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`}
                                                            type="image/webp"
                                                        />
                                                        <img
                                                            src={`/storage/${img}`}
                                                            alt={`${heroProgram.title} - ${idx + 1}`}
                                                            fetchPriority={
                                                                (!banners ||
                                                                    banners.length ===
                                                                        0) &&
                                                                idx === 0
                                                                    ? 'high'
                                                                    : 'auto'
                                                            }
                                                            loading={
                                                                (!banners ||
                                                                    banners.length ===
                                                                        0) &&
                                                                idx === 0
                                                                    ? 'eager'
                                                                    : 'lazy'
                                                            }
                                                            className="h-full w-full object-cover object-center transition-transform duration-10000 ease-linear group-hover:scale-110"
                                                        />
                                                    </picture>
                                                    {/* Playful Bottom Gradient Overlay */}
                                                    <div className="absolute inset-x-0 top-1/3 bottom-0 bg-linear-to-t from-sky-950/95 via-sky-900/50 to-transparent"></div>
                                                    <div className="absolute inset-0 flex items-end pb-16 sm:pb-20 lg:pb-24">
                                                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                                            <div className="max-w-3xl text-left">
                                                                <div
                                                                    className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md sm:mb-3 sm:gap-2 sm:px-3 sm:py-1 sm:text-xs ${heroProgram.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/30 text-blue-300'}`}
                                                                >
                                                                    {heroProgram.status ===
                                                                    'ongoing'
                                                                        ? 'Sedang Berlangsung'
                                                                        : 'Program Terdekat'}
                                                                </div>
                                                                <h1 className="mb-2 text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-lg sm:mb-3 sm:text-5xl lg:text-6xl">
                                                                    {
                                                                        heroProgram.title
                                                                    }
                                                                </h1>
                                                                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-200 drop-shadow sm:mb-5 sm:text-lg lg:text-xl">
                                                                    {heroProgram.description ||
                                                                        'Mari dukung dan sukseskan program komite ini bersama-sama demi kemajuan pendidikan anak-anak kita.'}
                                                                </p>
                                                                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                                                    <Link
                                                                        href={`/program?id=${heroProgram.id}`}
                                                                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-px hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] sm:px-6 sm:py-3.5 sm:text-base"
                                                                    >
                                                                        Detail
                                                                        Program
                                                                    </Link>
                                                                    {(() => {
                                                                        const nearestSession =
                                                                            upcomingSessions?.find(
                                                                                (
                                                                                    s: any,
                                                                                ) =>
                                                                                    s.program_id ===
                                                                                    heroProgram.id,
                                                                            );
                                                                        const displayDate =
                                                                            nearestSession
                                                                                ? nearestSession.activity_date
                                                                                : heroProgram.start_date;

                                                                        return displayDate ? (
                                                                            <div className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-300 drop-shadow sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base">
                                                                                <svg
                                                                                    className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                    />
                                                                                </svg>
                                                                                {new Date(
                                                                                    displayDate,
                                                                                ).toLocaleDateString(
                                                                                    'id-ID',
                                                                                    {
                                                                                        day: 'numeric',
                                                                                        month: 'long',
                                                                                        year: 'numeric',
                                                                                    },
                                                                                )}
                                                                            </div>
                                                                        ) : null;
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ),
                                    )
                                ) : heroProgram ? (
                                    <SwiperSlide key="prog-img-fallback">
                                        <div className="relative h-full w-full bg-slate-900">
                                            <div
                                                className={`absolute inset-0 flex h-full w-full items-center justify-center bg-slate-900 text-slate-800`}
                                            >
                                                <CalendarBlank
                                                    weight="duotone"
                                                    className="h-64 w-64 opacity-10"
                                                />
                                            </div>
                                            {/* Playful Bottom Gradient Overlay */}
                                            <div className="absolute inset-x-0 top-1/3 bottom-0 bg-linear-to-t from-sky-950/95 via-sky-900/50 to-transparent"></div>
                                            <div className="absolute inset-0 flex items-end pb-16 sm:pb-20 lg:pb-24">
                                                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                                    <div className="max-w-3xl text-left">
                                                        <div
                                                            className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md sm:mb-3 sm:gap-2 sm:px-3 sm:py-1 sm:text-xs ${heroProgram.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/30 text-blue-300'}`}
                                                        >
                                                            {heroProgram.status ===
                                                            'ongoing'
                                                                ? 'Sedang Berlangsung'
                                                                : 'Program Terdekat'}
                                                        </div>
                                                        <h1 className="mb-2 text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-lg sm:mb-3 sm:text-5xl lg:text-6xl">
                                                            {heroProgram.title}
                                                        </h1>
                                                        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-200 drop-shadow sm:mb-5 sm:text-lg lg:text-xl">
                                                            {heroProgram.description ||
                                                                'Mari dukung dan sukseskan program komite ini bersama-sama demi kemajuan pendidikan anak-anak kita.'}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                                            <Link
                                                                href={`/program?id=${heroProgram.id}`}
                                                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-px hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] sm:px-6 sm:py-3.5 sm:text-base"
                                                            >
                                                                Detail Program
                                                            </Link>
                                                            {(() => {
                                                                const nearestSession =
                                                                    upcomingSessions?.find(
                                                                        (
                                                                            s: any,
                                                                        ) =>
                                                                            s.program_id ===
                                                                            heroProgram.id,
                                                                    );
                                                                const displayDate =
                                                                    nearestSession
                                                                        ? nearestSession.activity_date
                                                                        : heroProgram.start_date;

                                                                return displayDate ? (
                                                                    <div className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-300 drop-shadow sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base">
                                                                        <svg
                                                                            className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                            />
                                                                        </svg>
                                                                        {new Date(
                                                                            displayDate,
                                                                        ).toLocaleDateString(
                                                                            'id-ID',
                                                                            {
                                                                                day: 'numeric',
                                                                                month: 'long',
                                                                                year: 'numeric',
                                                                            },
                                                                        )}
                                                                    </div>
                                                                ) : null;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ) : null}
                            </Swiper>
                        </div>
                    </div>
                ) : (
                    <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                        {/* Playful Background Elements for Fallback */}
                        <div className="absolute top-0 right-0 -z-10 h-[50vh] w-[50vh] translate-x-1/4 -translate-y-1/4 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -z-10 h-[60vh] w-[60vh] -translate-x-1/4 translate-y-1/4 rounded-full bg-pink-300/20 mix-blend-multiply blur-3xl"></div>

                        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-16">
                            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
                                Transparansi untuk{' '}
                                <br className="hidden sm:block" />
                                <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                                    Pendidikan Anak Kita
                                </span>
                            </h1>
                            <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:mb-8 sm:text-lg lg:text-xl">
                                Temukan informasi program kerja, laporan
                                keuangan, dan ruang partisipasi secara terbuka
                                dari Komite KBIT-TKIT Al-Ikhlash Pasar Minggu.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section className="relative overflow-hidden bg-white py-12 sm:py-20">
                {/* Decorative background blobs for Upcoming Sessions */}
                <div className="absolute top-1/4 -left-32 -z-10 h-96 w-96 rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
                <div className="absolute top-1/2 -right-32 -z-10 h-80 w-80 rounded-full bg-pink-100/40 mix-blend-multiply blur-3xl"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Upcoming Sessions Content (Inside Hero Section) */}
                    {upcomingSessions &&
                        Array.isArray(upcomingSessions) &&
                        upcomingSessions.length > 0 && (
                            <div className="relative mt-4 mb-4 sm:mt-8 sm:mb-8">
                                <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:mb-12 sm:flex-row sm:text-left">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                                            Program Yang Akan Datang
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
                                            Jadwal sesi program yang akan datang
                                        </p>
                                    </div>
                                    <Link
                                        href="/program"
                                        className="group inline-flex items-center gap-1.5 rounded-full border-2 border-blue-200 bg-white px-6 py-2.5 text-sm font-extrabold text-blue-600 shadow-[0_4px_15px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 hover:shadow-[0_8px_20px_rgba(59,130,246,0.25)] active:scale-95 sm:gap-2 sm:px-8 sm:py-3.5 sm:text-base"
                                    >
                                        Lihat Semua{' '}
                                        <span
                                            aria-hidden="true"
                                            className="text-lg transition-transform group-hover:translate-x-1"
                                        >
                                            &rarr;
                                        </span>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {upcomingSessions.map((session: any) => (
                                        <div
                                            key={session.id}
                                            className="group relative overflow-hidden rounded-4xl border border-slate-100/60 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 sm:rounded-[2.5rem] sm:p-8"
                                        >
                                            {/* Decorative soft glow */}
                                            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-50/50 blur-3xl transition-all duration-500 group-hover:bg-blue-100/50"></div>

                                            <div className="relative z-10">
                                                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-blue-600 uppercase transition-colors group-hover:bg-blue-100">
                                                        {new Date(
                                                            session.activity_date,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </span>
                                                    {(session.start_time ||
                                                        session.end_time) && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                                                            <Clock
                                                                weight="bold"
                                                                className="h-3 w-3"
                                                            />
                                                            {session.start_time?.substring(
                                                                0,
                                                                5,
                                                            ) || ''}{' '}
                                                            {session.end_time
                                                                ? `- ${session.end_time.substring(0, 5)}`
                                                                : ''}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="mb-2 text-lg leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-xl">
                                                    {session.title}
                                                </h4>
                                                {session.program && (
                                                    <p className="line-clamp-2 text-sm leading-relaxed font-medium text-slate-500">
                                                        {session.program.title}
                                                    </p>
                                                )}
                                            </div>
                                            {getProgramIcon(
                                                session.program?.title ||
                                                    session.title,
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </section>

            {/* Active Programs Snippet */}
            <ProgramCalendar
                activePrograms={
                    heroProgram
                        ? [
                              heroProgram,
                              ...(Array.isArray(activePrograms)
                                  ? activePrograms
                                  : []),
                          ]
                        : Array.isArray(activePrograms)
                          ? activePrograms
                          : []
                }
            />

            {/* Financial CTA Banner */}
            <section className="relative overflow-hidden border-t-[6px] border-dashed border-emerald-100 bg-emerald-50/40 py-12 sm:py-24">
                {/* Subtle Dots Background */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                ></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-900/10 sm:rounded-[3rem]">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                            <svg
                                className="h-full w-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 100 C 30 20 70 20 100 100 Z M0 0 L100 0 L100 100 C70 80 30 80 0 100 Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        {/* Playful floating circle */}
                        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
                        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl"></div>

                        <div className="relative flex flex-col items-center justify-between gap-6 p-6 sm:gap-8 sm:p-10 md:flex-row md:p-14 lg:p-16">
                            <div className="max-w-2xl text-center md:text-left">
                                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md sm:mb-5 sm:gap-2 sm:px-4 sm:text-xs">
                                    Transparansi
                                </div>
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:mb-5 sm:text-3xl md:text-4xl">
                                    Laporan Keuangan
                                </h2>
                                <p className="text-sm leading-relaxed text-emerald-50 sm:text-lg">
                                    Kami berkomitmen untuk mengelola dana komite
                                    secara transparan dan akuntabel. Akses
                                    seluruh rincian pemasukan dan pengeluaran
                                    program secara terbuka.
                                </p>
                            </div>

                            <div className="mt-2 w-full shrink-0 md:mt-0 md:w-auto">
                                <Link
                                    href="/keuangan"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-transparent bg-white px-6 py-3.5 text-sm font-extrabold tracking-wide text-emerald-600 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] active:scale-95 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:w-auto"
                                >
                                    <svg
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Lihat Laporan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kabar Terkini (Recent Posts) Section */}
            <section className="relative overflow-hidden border-t-[6px] border-dashed border-sky-100 bg-sky-50/30 py-16 sm:py-24">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 -z-10 -mt-20 -mr-20 h-96 w-96 rounded-full bg-sky-200/40 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 -mb-20 -ml-20 h-80 w-80 rounded-full bg-blue-200/40 mix-blend-multiply blur-3xl"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sky-200/50 bg-white/60 px-3 py-1.5 text-[11px] font-bold tracking-wider text-sky-700 uppercase backdrop-blur-md sm:mb-5 sm:gap-2 sm:px-4 sm:text-xs">
                                Kabar Terkini
                            </div>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl">
                                Berita & Informasi Komite
                            </h2>
                            <p className="text-base leading-relaxed font-medium text-slate-600 sm:text-lg">
                                Ikuti berbagai kegiatan, informasi penting, dan
                                cerita inspiratif dari keluarga besar KBIT-TKIT
                                Al-Ikhlash.
                            </p>
                        </div>
                        <div className="flex shrink-0 justify-center md:justify-end">
                            <Link
                                href="/kabar"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-transparent bg-slate-900 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base"
                            >
                                Lihat Semua Kabar
                                <ArrowUpRight
                                    className="h-5 w-5"
                                    weight="bold"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {recentPosts &&
                        Array.isArray(recentPosts) &&
                        recentPosts.length > 0 ? (
                            recentPosts.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={`/kabar/${post.slug}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-lg shadow-sky-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl hover:shadow-sky-900/10"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                        {post.image_path ? (
                                            <img
                                                src={`/storage/${post.image_path}`}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                <Article
                                                    weight="duotone"
                                                    className="h-20 w-20"
                                                />
                                            </div>
                                        )}
                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-slate-700 uppercase shadow-sm backdrop-blur-md">
                                            {new Date(
                                                post.published_at ||
                                                    post.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                                        <h3 className="mb-4 line-clamp-3 text-xl leading-snug font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600">
                                            {post.title}
                                        </h3>
                                        {/* Footer / Read More Action */}
                                        <div className="mt-auto flex items-center pt-4 text-sm font-bold text-sky-600">
                                            Baca selengkapnya
                                            <ArrowUpRight
                                                className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                weight="bold"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-1 flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200/60 bg-white/40 p-12 text-center sm:p-16 md:col-span-3">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <Article
                                        weight="duotone"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">
                                    Belum Ada Kabar
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Kabar atau artikel terbaru belum tersedia
                                    saat ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Instagram Feed Section */}
            <section className="relative overflow-hidden border-t-[6px] border-dashed border-pink-100 bg-pink-50/30 pt-16 pb-20 sm:pt-28 sm:pb-32">
                {/* Decorative Background Blobs for Instagram */}
                <div className="absolute -top-40 -left-40 -z-10 h-125 w-125 rounded-full bg-pink-200/30 mix-blend-multiply blur-3xl"></div>
                <div className="absolute top-1/2 -right-40 -z-10 h-150 w-150 -translate-y-1/2 rounded-full bg-yellow-200/30 mix-blend-multiply blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col items-center justify-center text-center sm:mb-20">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 text-white shadow-xl shadow-pink-500/20 sm:h-24 sm:w-24 sm:rounded-4xl">
                            <svg
                                className="h-10 w-10 sm:h-12 sm:w-12"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                            Ikuti Aktivitas Kami di Instagram
                        </h2>
                        <p className="mb-8 max-w-2xl text-base leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Dapatkan pembaruan terbaru, lihat keseruan kegiatan
                            anak-anak, dan terhubung dengan komunitas komite
                            KBIT-TKIT Al-Ikhlash.
                        </p>
                        <a
                            href="https://www.instagram.com/tkit.alikhlash/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl sm:text-base"
                        >
                            Follow @tkit.alikhlash
                        </a>
                    </div>

                    <div className="relative mt-8 min-h-75 w-full sm:mt-12">
                        {/* Soft background framing for widget */}
                        <div className="absolute -inset-4 rounded-[3rem] bg-white/60 shadow-xl shadow-sky-900/5 backdrop-blur-md sm:-inset-6"></div>
                        <div className="relative z-10 mx-auto w-full max-w-6xl">
                            {isMounted && instagramPosts?.length > 0 ? (
                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 sm:space-y-0">
                                    {instagramPosts.map((post: any) => {
                                        const cleanUrl = post.url.split('?')[0];

                                        return (
                                            <div
                                                key={post.id}
                                                className="group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50"
                                            >
                                                <div className="w-full bg-white flex justify-center">
                                                    <InstagramEmbed 
                                                        url={cleanUrl} 
                                                        width="100%" 
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-20 text-center shadow-sm">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                                        <InstagramLogo className="h-8 w-8" weight="duotone" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">
                                        Belum ada post Instagram yang ditautkan.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
