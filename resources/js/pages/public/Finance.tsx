import { Head } from '@inertiajs/react';
import PublicLayout from '../../layouts/PublicLayout';
import {
    ArrowUpRight,
    Table as TableIcon,
    Wallet,
    Coin,
    ChartLineUp,
    Money,
    FileText,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

export default function Finance({
    sheetUrl,
    sheetStatus,
    classroomSheetUrl,
    classroomSheetStatus,
    classroomName,
}: {
    sheetUrl: string | null;
    sheetStatus: 'active' | 'preparing' | 'hidden';
    classroomSheetUrl: string | null;
    classroomSheetStatus: 'active' | 'preparing' | 'hidden';
    classroomName: string | null;
}) {
    // Jika ada data kelas, otomatis fokus ke tab kelas
    const [activeTab, setActiveTab] = useState<'global' | 'classroom'>(
        classroomName ? 'classroom' : 'global',
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const getEmbedUrl = (url: string | null) => {
        if (!url) return '';
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
            let embed = `https://docs.google.com/spreadsheets/d/${match[1]}/edit?rm=minimal`;
            const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
            if (gidMatch && gidMatch[1]) {
                embed += `&gid=${gidMatch[1]}&single=true&widget=false&chrome=false`;
            }
            return embed;
        }
        return url;
    };

    const currentUrl = activeTab === 'classroom' ? classroomSheetUrl : sheetUrl;
    const isGlobalTab = activeTab === 'global';
    const isClassroomTab = activeTab === 'classroom';
    const currentStatus = isClassroomTab ? classroomSheetStatus : sheetStatus;

    return (
        <PublicLayout>
            <Head title="Transparansi Keuangan - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu">
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-emerald-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>

                {/* Animated Background Icons in Bubbles */}
                <div
                    className={`absolute top-10 -left-4 -z-10 origin-bottom-right transition-all delay-100 duration-1000 ease-out md:top-20 md:left-[10%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-15deg] opacity-80' : 'translate-x-[-20%] translate-y-[20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-100 shadow-lg shadow-emerald-200/50 md:h-28 md:w-28 md:rounded-[2rem]">
                        <Wallet
                            weight="duotone"
                            className="h-10 w-10 text-emerald-500 transition-transform hover:scale-110 md:h-14 md:w-14"
                        />
                    </div>
                </div>
                <div
                    className={`absolute -right-4 bottom-10 -z-10 origin-top-left transition-all delay-300 duration-1000 ease-out md:right-[12%] md:bottom-20 ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[20deg] opacity-80' : 'translate-x-[20%] translate-y-[-20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-lg shadow-pink-200/50 md:h-24 md:w-24">
                        <Money
                            weight="duotone"
                            className="h-8 w-8 text-pink-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>
                <div
                    className={`absolute top-20 -right-2 -z-10 origin-bottom-left transition-all delay-500 duration-1000 ease-out md:top-24 md:right-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[15deg] opacity-90' : 'translate-x-[20%] translate-y-[-10%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 shadow-lg shadow-yellow-200/50 md:h-20 md:w-20">
                        <Coin
                            weight="duotone"
                            className="h-8 w-8 text-yellow-500 transition-transform hover:scale-110 md:h-10 md:w-10"
                        />
                    </div>
                </div>
                <div
                    className={`absolute bottom-20 -left-2 -z-10 origin-top-right transition-all delay-700 duration-1000 ease-out md:bottom-24 md:left-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-10deg] opacity-80' : 'translate-x-[-30%] translate-y-[30%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-sky-100 shadow-lg shadow-sky-200/50 md:h-24 md:w-24 md:rounded-[2rem]">
                        <ChartLineUp
                            weight="duotone"
                            className="h-8 w-8 text-sky-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4">
                    <div className="inline-block rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-10">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            Transparansi Keuangan
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Laporan kas Komite yang dilaporkan secara jujur,
                            akuntabel, dan real-time kepada seluruh wali murid.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50/50 py-10 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Tab Navigation if classroom data is present */}
                    {classroomName && (
                        <div className="mb-8 flex justify-center sm:mb-12">
                            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 p-1.5 shadow-inner">
                                <button
                                    onClick={() => setActiveTab('classroom')}
                                    className={`relative flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold transition-all sm:px-8 sm:py-3 ${activeTab === 'classroom' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Kas Kelas ({classroomName})
                                </button>
                                <button
                                    onClick={() => setActiveTab('global')}
                                    className={`relative flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold transition-all sm:px-8 sm:py-3 ${activeTab === 'global' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Kas Keseluruhan
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 flex flex-col justify-between gap-3 text-center sm:mb-8">
                        <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                            {activeTab === 'classroom'
                                ? `Catatan Keuangan Kelas ${classroomName}`
                                : 'Catatan Keuangan Keseluruhan'}
                        </h2>
                    </div>

                    <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white shadow-2xl shadow-slate-200/50 sm:p-2">
                        {currentStatus === 'preparing' ? (
                            <div className="flex flex-col items-center justify-center rounded-[2rem] bg-amber-50 p-16 text-center text-slate-500">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 shadow-inner">
                                    <FileText
                                        className="h-10 w-10 animate-pulse text-amber-500"
                                        weight="duotone"
                                    />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800">
                                    Laporan Sedang Disiapkan
                                </h3>
                                <p className="max-w-md text-sm leading-relaxed font-medium">
                                    {isClassroomTab
                                        ? 'Koordinator Kelas sedang menyusun laporan keuangan saat ini. Silakan kembali lagi nanti.'
                                        : 'Bendahara kami sedang menyusun laporan keuangan saat ini. Silakan kembali lagi nanti.'}
                                </p>
                            </div>
                        ) : !currentUrl || currentStatus === 'hidden' ? (
                            <div className="flex flex-col items-center justify-center rounded-[2rem] bg-slate-50 p-16 text-center text-slate-500">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 shadow-inner">
                                    <TableIcon
                                        className="h-10 w-10 text-slate-400"
                                        weight="duotone"
                                    />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800">
                                    Laporan Belum Tersedia
                                </h3>
                                <p className="max-w-md text-sm leading-relaxed font-medium">
                                    Pengurus belum menautkan dokumen laporan
                                    keuangan.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col overflow-hidden rounded-[2rem] bg-slate-50">
                                <iframe
                                    src={getEmbedUrl(currentUrl)}
                                    className="h-[750px] w-full border-0 bg-white"
                                    title="Data Keuangan"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
