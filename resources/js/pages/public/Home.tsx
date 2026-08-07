import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {
    Heart,
    Trophy,
    BowlFood,
    PersonSimpleSwim,
    Storefront,
    ChalkboardTeacher,
    UsersThree,
    Handshake,
    Tree,
    GraduationCap,
    CalendarBlank,
    BookOpen,
    Backpack,
    Palette
} from '@phosphor-icons/react';
import ProgramCalendar from '../../components/public/ProgramCalendar';
import PublicLayout from '../../layouts/PublicLayout';

export default function Home({ heroProgram, activePrograms, upcomingSessions, banners }: any) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);

        // Skrip untuk membersihkan watermark secara agresif lewat Javascript
        const cleanerInterval = setInterval(() => {
            // Cari elemen link yang mengarah ke elfsight
            const links = document.querySelectorAll(
                'a[href*="elfsight.com"], a[href*="elfsight"]',
            );
            links.forEach((link) => {
                // Sembunyikan elemen
                (link as HTMLElement).style.setProperty(
                    'display',
                    'none',
                    'important',
                );
            });

            // Cari elemen badge dengan nama class spesifik
            const badges = document.querySelectorAll(
                '[class*="Badge__Container"], [class*="Watermark__Container"], .eapps-link',
            );
            badges.forEach((badge) => {
                (badge as HTMLElement).style.setProperty(
                    'display',
                    'none',
                    'important',
                );
            });

            // Cek jika ada shadow root
            const widget = document.querySelector(
                '.elfsight-app-81fba1fa-87f5-4b47-bdbd-1eff0f9bdbf6',
            );

            if (widget && widget.shadowRoot) {
                const shadowLinks = widget.shadowRoot.querySelectorAll(
                    'a[href*="elfsight.com"]',
                );
                shadowLinks.forEach((link) => {
                    (link as HTMLElement).style.setProperty(
                        'display',
                        'none',
                        'important',
                    );
                });

                const shadowBadges = widget.shadowRoot.querySelectorAll(
                    '[class*="Badge__Container"], [class*="Watermark__Container"]',
                );
                shadowBadges.forEach((badge) => {
                    (badge as HTMLElement).style.setProperty(
                        'display',
                        'none',
                        'important',
                    );
                });
            }
        }, 300);

        return () => {
            clearInterval(cleanerInterval);

            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const getProgramIcon = (title: string) => {
        if (!title) return <CalendarBlank weight="fill" className="absolute -bottom-4 -right-4 z-0 h-20 w-20 text-slate-100 transition-colors duration-500 group-hover:text-blue-100 sm:-bottom-6 sm:-right-6 sm:h-28 sm:w-28" />;

        const t = title.toLowerCase();
        const iconClass = "absolute -bottom-4 -right-4 z-0 h-20 w-20 rotate-[-10deg] text-slate-100 transition-colors duration-500 group-hover:text-blue-100 sm:-bottom-6 sm:-right-6 sm:h-28 sm:w-28";

        if (t.includes('berbagi')) return <Heart weight="fill" className={iconClass} />;
        if (t.includes('lomba') || t.includes('hut')) return <Trophy weight="fill" className={iconClass} />;
        if (t.includes('makan')) return <BowlFood weight="fill" className={iconClass} />;
        if (t.includes('renang')) return <PersonSimpleSwim weight="fill" className={iconClass} />;
        if (t.includes('market')) return <Storefront weight="fill" className={iconClass} />;
        if (t.includes('guru')) return <ChalkboardTeacher weight="fill" className={iconClass} />;
        if (t.includes('gathering')) return <UsersThree weight="fill" className={iconClass} />;
        if (t.includes('halal')) return <Handshake weight="fill" className={iconClass} />;
        if (t.includes('piknik')) return <Tree weight="fill" className={iconClass} />;
        if (t.includes('pelepasan') || t.includes('seni')) return <GraduationCap weight="fill" className={iconClass} />;

        return <CalendarBlank weight="fill" className={iconClass} />;
    };

    const getHeroPlaceholder = (title: string) => {
        if (!title) return { icon: <CalendarBlank weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-blue-50 text-blue-300" };
        const t = title.toLowerCase();
        
        if (t.includes('berbagi')) return { icon: <Heart weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-rose-50 text-rose-300" };
        if (t.includes('lomba') || t.includes('hut')) return { icon: <Trophy weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-amber-50 text-amber-300" };
        if (t.includes('makan')) return { icon: <BowlFood weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-orange-50 text-orange-300" };
        if (t.includes('renang')) return { icon: <PersonSimpleSwim weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-cyan-50 text-cyan-300" };
        if (t.includes('market')) return { icon: <Storefront weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-emerald-50 text-emerald-300" };
        if (t.includes('guru')) return { icon: <ChalkboardTeacher weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-indigo-50 text-indigo-300" };
        if (t.includes('gathering')) return { icon: <UsersThree weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-fuchsia-50 text-fuchsia-300" };
        if (t.includes('halal')) return { icon: <Handshake weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-teal-50 text-teal-300" };
        if (t.includes('piknik')) return { icon: <Tree weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-green-50 text-green-300" };
        if (t.includes('pelepasan') || t.includes('seni')) return { icon: <GraduationCap weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-violet-50 text-violet-300" };

        return { icon: <CalendarBlank weight="duotone" className="h-32 w-32 drop-shadow-md" />, bg: "bg-blue-50 text-blue-300" };
    };
    return (
        <PublicLayout>
            <Head title="Beranda - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu" />

            {/* Hero Section */}
            <section className="relative w-full bg-slate-900 border-b border-slate-800">
                {heroProgram || (banners && banners.length > 0) ? (
                    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
                        <Swiper
                            modules={[Autoplay, EffectFade, Pagination]}
                            effect="fade"
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            loop={true}
                            className="h-full w-full [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet-active]:bg-white"
                        >
                            {/* 1. Incidental Banners */}
                            {banners && banners.map((banner: any) => (
                                <SwiperSlide key={`banner-${banner.id}`}>
                                    <div className="group relative h-full w-full bg-slate-900">
                                        <img
                                            src={`/storage/${banner.image}`}
                                            alt={banner.title || 'Banner'}
                                            className="h-full w-full object-cover object-center transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                                        />
                                        {/* Optional subtle gradient at bottom just for pagination visibility */}
                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* 2. Program Images + Info Overlay */}
                            {heroProgram && heroProgram.images && heroProgram.images.length > 0 ? (
                                heroProgram.images.map((img: string, idx: number) => (
                                    <SwiperSlide key={`prog-img-${idx}`}>
                                        <div className="group relative h-full w-full bg-slate-900">
                                            <img
                                                src={`/storage/${img}`}
                                                alt={`${heroProgram.title} - ${idx + 1}`}
                                                className="h-full w-full object-cover object-center transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                                            />
                                            {/* Dark Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/20"></div>
                                            <div className="absolute inset-0 flex items-end pb-20 sm:items-center sm:pb-0">
                                                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                                    <div className="max-w-3xl text-left">
                                                        <div
                                                            className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md sm:mb-4 sm:gap-2 sm:px-3 sm:py-1 sm:text-xs ${heroProgram.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/30 text-blue-300'}`}
                                                        >
                                                            {heroProgram.status === 'ongoing'
                                                                ? 'Sedang Berlangsung'
                                                                : 'Program Terdekat'}
                                                        </div>
                                                        <h1 className="mb-3 text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-lg sm:mb-6 sm:text-5xl lg:text-6xl">
                                                            {heroProgram.title}
                                                        </h1>
                                                        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-slate-200 drop-shadow sm:mb-8 sm:text-lg lg:text-xl">
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
                                                                const nearestSession = upcomingSessions?.find((s: any) => s.program_id === heroProgram.id);
                                                                const displayDate = nearestSession ? nearestSession.activity_date : heroProgram.start_date;

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
                                                                                strokeWidth={2}
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                            />
                                                                        </svg>
                                                                        {new Date(
                                                                            displayDate,
                                                                        ).toLocaleDateString('id-ID', {
                                                                            day: 'numeric',
                                                                            month: 'long',
                                                                            year: 'numeric',
                                                                        })}
                                                                    </div>
                                                                ) : null;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : heroProgram ? (
                                <SwiperSlide key="prog-img-fallback">
                                    <div className="relative h-full w-full bg-slate-900">
                                        <div className={`absolute inset-0 flex h-full w-full items-center justify-center bg-slate-900 text-slate-800`}>
                                            <CalendarBlank weight="duotone" className="h-64 w-64 opacity-10" />
                                        </div>
                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent"></div>
                                        <div className="absolute inset-0 flex items-end pb-20 sm:items-center sm:pb-0">
                                            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                                <div className="max-w-3xl text-left">
                                                    <div
                                                        className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md sm:mb-4 sm:gap-2 sm:px-3 sm:py-1 sm:text-xs ${heroProgram.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/30 text-blue-300'}`}
                                                    >
                                                        {heroProgram.status === 'ongoing'
                                                            ? 'Sedang Berlangsung'
                                                            : 'Program Terdekat'}
                                                    </div>
                                                    <h1 className="mb-3 text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-lg sm:mb-6 sm:text-5xl lg:text-6xl">
                                                        {heroProgram.title}
                                                    </h1>
                                                    <p className="mb-5 max-w-2xl text-sm leading-relaxed text-slate-200 drop-shadow sm:mb-8 sm:text-lg lg:text-xl">
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
                                                            const nearestSession = upcomingSessions?.find((s: any) => s.program_id === heroProgram.id);
                                                            const displayDate = nearestSession ? nearestSession.activity_date : heroProgram.start_date;

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
                                                                            strokeWidth={2}
                                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    {new Date(
                                                                        displayDate,
                                                                    ).toLocaleDateString('id-ID', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                    })}
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
                ) : (
                    <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-32 lg:px-8 lg:py-40">
                        <h1 className="mb-3 text-2xl leading-[1.15] font-bold tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
                            Transparansi untuk{' '}
                            <br className="hidden sm:block" />
                            <span className="text-blue-500">
                                Pendidikan Anak Kita
                            </span>
                        </h1>
                        <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:mb-8 sm:text-lg lg:text-xl">
                            Temukan informasi program kerja, laporan
                            keuangan, dan ruang partisipasi secara terbuka
                            dari Komite KBIT-TKIT Al-Ikhlash Pasar Minggu.
                        </p>
                    </div>
                )}
            </section>
            
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Upcoming Sessions Content (Inside Hero Section) */}
                {upcomingSessions && upcomingSessions.length > 0 && (
                    <div className="mt-8 mb-8 pt-6 border-t border-slate-200/80 sm:mt-20 sm:mb-12 sm:pt-12">
                        <div className="mb-5 flex flex-col items-center justify-between gap-2 sm:mb-8 sm:flex-row sm:gap-4">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">Program Yang Akan Datang</h2>
                                <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-base">Jadwal sesi program yang akan datang</p>
                            </div>
                            <Link href="/program" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 sm:gap-2 sm:text-sm">
                                Lihat Semua Program <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                                {upcomingSessions.map((session: any) => (
                                    <div key={session.id} className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-300 sm:rounded-2xl sm:p-6">
                                        <div className="relative z-10">
                                            <div className="mb-3 flex flex-wrap items-center justify-between gap-1 sm:mb-4">
                                                <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition-colors group-hover:bg-blue-100">
                                                    {new Date(session.activity_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                {(session.start_time || session.end_time) && (
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        {session.start_time?.substring(0, 5) || ''} {session.end_time ? `- ${session.end_time.substring(0, 5)}` : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="mb-1.5 text-base font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:mb-2 sm:text-lg">{session.title}</h4>
                                            {session.program && (
                                                <p className="text-sm font-medium text-slate-500 line-clamp-2">{session.program.title}</p>
                                            )}
                                        </div>
                                        {getProgramIcon(session.program?.title || session.title)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            {/* Active Programs Snippet */}
            <ProgramCalendar
                activePrograms={
                    heroProgram
                        ? [heroProgram, ...activePrograms]
                        : activePrograms
                }
            />

            {/* Financial CTA Banner */}
            <section className="border-t border-slate-200 bg-slate-50 py-8 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-xl bg-slate-900 shadow-lg sm:rounded-3xl">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg
                                className="h-full w-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 100 C 20 0 50 0 100 100 Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>

                        <div className="relative flex flex-col items-center justify-between gap-5 p-5 sm:gap-8 sm:p-8 md:flex-row md:p-12 lg:p-16">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-300 uppercase sm:mb-4 sm:gap-2 sm:px-3 sm:text-xs">
                                    Transparansi
                                </div>
                                <h2 className="mb-2 text-xl font-bold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">
                                    Laporan Keuangan
                                </h2>
                                <p className="text-xs leading-relaxed text-slate-300 sm:text-lg">
                                    Kami berkomitmen untuk mengelola dana komite
                                    secara transparan dan akuntabel. Akses
                                    seluruh rincian pemasukan dan pengeluaran
                                    program secara terbuka.
                                </p>
                            </div>

                            <div className="w-full shrink-0 md:w-auto">
                                <Link
                                    href="/keuangan"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-100 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:w-auto"
                                >
                                    <svg
                                        className="h-4 w-4 sm:h-5 sm:w-5"
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

            {/* Instagram Feed Section */}
            <section className="bg-white py-8 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:mb-12 sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 text-white sm:h-12 sm:w-12">
                                <svg
                                    className="h-5 w-5 sm:h-6 sm:w-6"
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
                            <div>
                                <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    Ikuti Aktivitas Kami di Instagram
                                </h2>
                            </div>
                        </div>
                        <a
                            href="https://www.instagram.com/tkit.alikhlash/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-purple-600 to-pink-500 px-4 py-2 text-xs font-bold whitespace-nowrap text-white shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
                        >
                            Follow Now
                        </a>
                    </div>

                    <div className="mt-6 min-h-75 w-full sm:mt-8">
                        <div
                            className="elfsight-app-81fba1fa-87f5-4b47-bdbd-1eff0f9bdbf6"
                            data-elfsight-app-lazy="true"
                        ></div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
