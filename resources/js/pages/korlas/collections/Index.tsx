import { Head } from '@inertiajs/react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ArrowUpRight, Table as TableIcon } from '@phosphor-icons/react';

export default function KorlasCollectionsIndex({
    classroom,
    sheetUrl,
}: {
    classroom: any | null;
    sheetUrl: string | null;
}) {
    // Transform normal Google Sheet URL to an embed-friendly URL
    // Using rm=minimal hides the top toolbars but keeps the sheet tabs at the bottom
    const getEmbedUrl = (url: string | null) => {
        if (!url) return '';
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
            return `https://docs.google.com/spreadsheets/d/${match[1]}/edit?rm=minimal`;
        }
        return url;
    };

    return (
        <DashboardLayout>
            <Head title="Data Kas Kelas" />

            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                        Data Kas Kelas
                    </h1>
                    {classroom && (
                        <p className="mt-1 text-sm text-slate-500">
                            Menampilkan data keuangan untuk Kelas{' '}
                            <strong>{classroom.name}</strong>
                        </p>
                    )}
                </div>

                {sheetUrl && (
                    <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 sm:px-4"
                    >
                        <span>Buka Untuk Mengedit</span>
                        <ArrowUpRight weight="bold" />
                    </a>
                )}
            </div>

            {!classroom ? (
                <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
                    <TableIcon
                        className="mb-4 h-12 w-12 text-slate-300"
                        weight="light"
                    />
                    <h3 className="mb-2 text-base font-medium text-slate-700 sm:text-lg">
                        Tidak Ada Kelas
                    </h3>
                    <p className="max-w-sm text-center text-sm text-slate-500">
                        Akun kamu belum ditugaskan sebagai koordinator untuk
                        kelas mana pun. Hubungi admin.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {!sheetUrl ? (
                        <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                            <TableIcon
                                className="mb-4 h-12 w-12 text-slate-300"
                                weight="light"
                            />
                            <h3 className="mb-2 text-base font-medium text-slate-700 sm:text-lg">
                                Google Sheet Belum Terhubung
                            </h3>
                            <p className="max-w-sm text-center text-sm text-slate-500">
                                Link Google Sheet untuk kelas{' '}
                                <strong>{classroom.name}</strong> belum diatur.
                                Silakan hubungi admin untuk menambahkan link.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col bg-white">
                            <iframe
                                src={getEmbedUrl(sheetUrl)}
                                className="h-[500px] w-full border-0 sm:h-[700px]"
                                title="Data Kas Kelas"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}
