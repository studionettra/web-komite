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
            <Head title="Transparansi Keuangan - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu" />

            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-20 text-center sm:pt-32 sm:pb-32">
                {/* Animated Background Icons */}
                <div
                    className={`absolute top-4 -left-4 -z-10 origin-bottom-right text-emerald-400 transition-all delay-100 duration-1000 ease-out md:top-10 md:left-[10%] ${isLoaded ? '-translate-x-[20%] translate-y-[20%] scale-100 rotate-[-15deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                >
                    <Wallet
                        weight="duotone"
                        className="h-16 w-16 cursor-default drop-shadow-sm transition-transform hover:scale-110 md:h-28 md:w-28"
                    />
                </div>
                <div
                    className={`absolute -right-4 bottom-4 -z-10 origin-top-left text-pink-400 transition-all delay-300 duration-1000 ease-out md:right-[15%] md:bottom-10 ${isLoaded ? 'translate-x-[20%] -translate-y-[20%] scale-100 rotate-[25deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                >
                    <Money
                        weight="duotone"
                        className="h-16 w-16 cursor-default drop-shadow-sm transition-transform hover:scale-110 md:h-24 md:w-24"
                    />
                </div>
                <div
                    className={`absolute top-12 -right-2 -z-10 origin-bottom-left text-yellow-400 transition-all delay-500 duration-1000 ease-out md:top-20 md:right-[10%] ${isLoaded ? '-translate-x-[20%] -translate-y-[10%] scale-100 rotate-[10deg] opacity-70' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                >
                    <Coin
                        weight="duotone"
                        className="h-16 w-16 cursor-default drop-shadow-sm transition-transform hover:scale-110 md:h-20 md:w-20"
                    />
                </div>
                <div
                    className={`absolute bottom-12 -left-2 -z-10 origin-top-right text-blue-400 transition-all delay-700 duration-1000 ease-out md:bottom-20 md:left-[15%] ${isLoaded ? 'translate-x-[30%] -translate-y-[30%] scale-100 rotate-[-20deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                >
                    <ChartLineUp
                        weight="duotone"
                        className="h-16 w-16 cursor-default drop-shadow-sm transition-transform hover:scale-110 md:h-24 md:w-24"
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4">
                    <div className="inline-block rounded-2xl border border-white bg-white/60 p-5 shadow-sm backdrop-blur-md sm:rounded-3xl sm:p-8">
                        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-4xl md:text-5xl">
                            Transparansi Keuangan
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-lg">
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
                        <div className="mb-6 flex gap-3 overflow-x-auto border-b border-slate-200 sm:mb-8 sm:gap-6">
                            <button
                                onClick={() => setActiveTab('classroom')}
                                className={`whitespace-nowrap px-2 pb-3 text-xs font-bold tracking-wide uppercase transition-all sm:pb-4 sm:text-sm ${activeTab === 'classroom' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Laporan Kas Kelas ({classroomName})
                            </button>
                            <button
                                onClick={() => setActiveTab('global')}
                                className={`whitespace-nowrap px-2 pb-3 text-xs font-bold tracking-wide uppercase transition-all sm:pb-4 sm:text-sm ${activeTab === 'global' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Laporan Kas Keseluruhan
                            </button>
                        </div>
                    )}

                    <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
                        <h2 className="text-lg font-bold text-slate-800 sm:text-2xl">
                            {activeTab === 'classroom'
                                ? `Catatan Keuangan Kelas ${classroomName}`
                                : 'Catatan Keuangan Keseluruhan'}
                        </h2>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 sm:rounded-3xl">
                        {currentStatus === 'preparing' ? (
                            <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                                    <FileText
                                        className="h-8 w-8 text-amber-500"
                                        weight="duotone"
                                    />
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-slate-700">
                                    Laporan Sedang Disiapkan
                                </h3>
                                <p className="text-center text-sm">
                                    {isClassroomTab 
                                        ? 'Koordinator Kelas sedang menyusun laporan keuangan saat ini. Silakan kembali lagi nanti.'
                                        : 'Bendahara kami sedang menyusun laporan keuangan saat ini. Silakan kembali lagi nanti.'}
                                </p>
                            </div>
                        ) : !currentUrl || currentStatus === 'hidden' ? (
                            <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                                <TableIcon
                                    className="mb-4 h-12 w-12 text-slate-300"
                                    weight="light"
                                />
                                <h3 className="mb-2 text-lg font-medium text-slate-700">
                                    Laporan Belum Tersedia
                                </h3>
                                <p className="text-center text-sm">
                                    Pengurus belum menautkan dokumen laporan
                                    keuangan.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col bg-white">
                                <iframe
                                    src={getEmbedUrl(currentUrl)}
                                    className="h-[700px] w-full border-0"
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
