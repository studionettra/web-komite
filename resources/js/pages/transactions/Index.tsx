import { Head } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ArrowUpRight, Table as TableIcon, FileText } from '@phosphor-icons/react';

export default function TransactionsIndex({
    sheetUrl,
    sheetStatus,
}: {
    sheetUrl: string | null;
    sheetStatus: 'active' | 'preparing' | 'hidden';
}) {
    const getEmbedUrl = (url: string | null) => {
        if (!url) return '';
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
            let embed = `https://docs.google.com/spreadsheets/d/${match[1]}/edit?rm=minimal`;
            const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
            if (gidMatch && gidMatch[1]) {
                // &single=true&widget=false menyembunyikan tab di bawah agar hanya menampilkan sheet spesifik
                embed += `&gid=${gidMatch[1]}&single=true&widget=false&chrome=false`;
            }
            return embed;
        }
        return url;
    };

    return (
        <DashboardLayout>
            <Head title="Keuangan" />

            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
                <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                    Catatan Keuangan Bendahara
                </h1>

                {sheetUrl && (
                    <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 sm:px-4"
                    >
                        <span>Buka di Google Sheets</span>
                        <ArrowUpRight weight="bold" />
                    </a>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {sheetStatus === 'preparing' ? (
                    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                            <FileText
                                className="h-8 w-8 text-amber-500"
                                weight="duotone"
                            />
                        </div>
                        <h3 className="mb-2 text-base font-medium text-slate-700 sm:text-lg">
                            Laporan Sedang Disiapkan
                        </h3>
                        <p className="max-w-sm text-center text-sm text-slate-500">
                            Bendahara sedang menyusun laporan keuangan saat ini. Silakan periksa kembali nanti.
                        </p>
                    </div>
                ) : sheetStatus === 'hidden' || !sheetUrl ? (
                    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                        <TableIcon
                            className="mb-4 h-12 w-12 text-slate-300"
                            weight="light"
                        />
                        <h3 className="mb-2 text-base font-medium text-slate-700 sm:text-lg">
                            Google Sheet Belum Terhubung
                        </h3>
                        <p className="max-w-sm text-center text-sm text-slate-500">
                            Admin belum mengatur tautan Google Sheet untuk keuangan di Pengaturan.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col bg-white">
                        <iframe
                            src={getEmbedUrl(sheetUrl)}
                            className="h-[500px] sm:h-[700px] w-full border-0"
                            title="Data Keuangan"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
