import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
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

export default function Home({ heroProgram, activePrograms, upcomingSessions }: any) {
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
            <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {heroProgram ? (
                        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:gap-16">
                            {/* Text Content */}
                            <div className="w-full lg:w-1/2">
                                <div
                                    className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${heroProgram.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}
                                >
                                    {heroProgram.status === 'ongoing'
                                        ? 'Sedang Berlangsung'
                                        : 'Program Terdekat'}
                                </div>
                                <h1 className="mb-4 text-3xl leading-[1.15] font-bold tracking-tight text-slate-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {heroProgram.title}
                                </h1>
                                <p className="mb-6 max-w-lg text-base leading-relaxed text-slate-600 sm:mb-8 sm:text-lg">
                                    {heroProgram.description ||
                                        'Mari dukung dan sukseskan program komite ini bersama-sama demi kemajuan pendidikan anak-anak kita.'}
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link
                                        href={`/program?id=${heroProgram.id}`}
                                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-blue-700"
                                    >
                                        Detail Program
                                    </Link>
                                    {(() => {
                                        const nearestSession = upcomingSessions?.find((s: any) => s.program_id === heroProgram.id);
                                        const displayDate = nearestSession ? nearestSession.activity_date : heroProgram.start_date;

                                        return displayDate ? (
                                            <div className="inline-flex items-center gap-2 px-4 py-3.5 font-medium text-slate-500">
                                                <svg
                                                    className="h-5 w-5"
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

                            {/* Image Content */}
                            <div className="relative z-10 w-full group lg:w-1/2">
                                {/* Animated Background Icons */}
                                {/* Top Left */}
                                <div className={`absolute top-4 left-4 -z-10 text-blue-300 transition-all duration-1000 ease-out delay-100 origin-bottom-right ${isLoaded ? '-translate-x-[50%] -translate-y-[50%] rotate-[-15deg] opacity-100 scale-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-50'}`}>
                                    <GraduationCap weight="duotone" className="h-16 w-16 drop-shadow-lg sm:h-28 sm:w-28" />
                                </div>
                                {/* Top Right */}
                                <div className={`absolute top-4 right-4 -z-10 text-yellow-400 transition-all duration-1000 ease-out delay-300 origin-bottom-left ${isLoaded ? 'translate-x-[50%] -translate-y-[50%] rotate-[20deg] opacity-100 scale-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-50'}`}>
                                    <Palette weight="duotone" className="h-14 w-14 drop-shadow-lg sm:h-24 sm:w-24" />
                                </div>
                                {/* Bottom Right */}
                                <div className={`absolute bottom-4 right-4 -z-10 text-emerald-300 transition-all duration-1000 ease-out delay-500 origin-top-left ${isLoaded ? 'translate-x-[50%] translate-y-[50%] rotate-[30deg] opacity-100 scale-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-50'}`}>
                                    <BookOpen weight="duotone" className="h-20 w-20 drop-shadow-lg sm:h-32 sm:w-32" />
                                </div>
                                {/* Bottom Left */}
                                <div className={`absolute bottom-4 left-4 -z-10 text-pink-300 transition-all duration-1000 ease-out delay-700 origin-top-right ${isLoaded ? '-translate-x-[50%] translate-y-[50%] rotate-[-25deg] opacity-100 scale-100' : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-50'}`}>
                                    <Backpack weight="duotone" className="h-14 w-14 drop-shadow-lg sm:h-24 sm:w-24" />
                                </div>
                                
                                <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-xl transition-transform duration-700 group-hover:scale-[1.02] sm:rounded-3xl sm:shadow-2xl">
                                    {heroProgram ? (
                                        heroProgram.image ? (
                                            <img
                                                src={`/storage/${heroProgram.image}`}
                                                alt={heroProgram.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            (() => {
                                                const placeholder = getHeroPlaceholder(heroProgram.title);
                                                return (
                                                    <div className={`flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105 ${placeholder.bg}`}>
                                                        {placeholder.icon}
                                                    </div>
                                                );
                                            })()
                                        )
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-200">
                                            <ChalkboardTeacher weight="duotone" className="h-32 w-32" />
                                        </div>
                                    )}
                                    {/* Decorative elements */}
                                    <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl"></div>
                                    <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <h1 className="mb-4 text-3xl leading-[1.15] font-bold tracking-tight text-slate-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                                Transparansi untuk{' '}
                                <br className="hidden sm:block" />
                                <span className="text-blue-600">
                                    Pendidikan Anak Kita
                                </span>
                            </h1>
                            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:mb-8 sm:text-lg">
                                Temukan informasi program kerja, laporan
                                keuangan, dan ruang partisipasi secara terbuka
                                dari Komite KBIT-TKIT Al-Ikhlash Pasar Minggu.
                            </p>
                        </div>
                    )}

                    {/* Upcoming Sessions Content (Inside Hero Section) */}
                    {upcomingSessions && upcomingSessions.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-200/80 sm:mt-20 sm:pt-12">
                            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:mb-8 sm:flex-row sm:gap-4">
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">Program Yang Akan Datang</h2>
                                    <p className="mt-1 text-sm text-slate-600 sm:mt-2 sm:text-base">Jadwal sesi program yang akan datang</p>
                                </div>
                                <Link href="/program" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
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
            </section>

            {/* Active Programs Snippet */}
            <ProgramCalendar
                activePrograms={
                    heroProgram
                        ? [heroProgram, ...activePrograms]
                        : activePrograms
                }
            />

            {/* Financial CTA Banner */}
            <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg sm:rounded-3xl">
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

                        <div className="relative flex flex-col items-center justify-between gap-6 p-6 sm:gap-8 sm:p-8 md:flex-row md:p-12 lg:p-16">
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                    Transparansi
                                </div>
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">
                                    Laporan Keuangan
                                </h2>
                                <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
                                    Kami berkomitmen untuk mengelola dana komite
                                    secara transparan dan akuntabel. Akses
                                    seluruh rincian pemasukan dan pengeluaran
                                    program secara terbuka.
                                </p>
                            </div>

                            <div className="w-full shrink-0 md:w-auto">
                                <Link
                                    href="/keuangan"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-100 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:w-auto"
                                >
                                    <svg
                                        className="h-5 w-5"
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
            <section className="bg-white py-12 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:mb-12 sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 text-white">
                                <svg
                                    className="h-6 w-6"
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
                                <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    Ikuti Aktivitas Kami di Instagram
                                </h2>
                            </div>
                        </div>
                        <a
                            href="https://www.instagram.com/tkit.alikhlash/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500 px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
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
