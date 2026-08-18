import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    Table as TableIcon,
    FileText,
} from '@phosphor-icons/react';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function TransactionsIndex({
    sheetUrl,
    sheetStatus,
}: {
    sheetUrl: string | null;
    sheetStatus: 'active' | 'preparing' | 'hidden';
}) {
    const getEmbedUrl = (url: string | null) => {
        if (!url) {
return '';
}

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

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                    Catatan Keuangan Bendahara
                </h1>

                {sheetUrl && (
                    <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-md active:translate-y-0"
                    >
                        <span>Buka di Google Sheets</span>
                        <ArrowUpRight weight="bold" className="h-5 w-5" />
                    </a>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {sheetStatus === 'preparing' ? (
                    <div className="flex flex-col items-center justify-center p-12 py-20 text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
                            <FileText
                                className="h-10 w-10 text-amber-500"
                                weight="fill"
                            />
                        </div>
                        <h3 className="mb-3 text-2xl font-semibold text-slate-800">
                            Laporan Sedang Disiapkan
                        </h3>
                        <p className="max-w-md text-base font-medium text-slate-500">
                            Bendahara sedang menyusun laporan keuangan saat ini.
                            Silakan periksa kembali nanti.
                        </p>
                    </div>
                ) : sheetStatus === 'hidden' || !sheetUrl ? (
                    <div className="flex flex-col items-center justify-center p-12 py-20 text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50">
                            <TableIcon
                                className="h-10 w-10 text-slate-400"
                                weight="fill"
                            />
                        </div>
                        <h3 className="mb-3 text-2xl font-semibold text-slate-800">
                            Google Sheet Belum Terhubung
                        </h3>
                        <p className="max-w-md text-base font-medium text-slate-500">
                            Admin belum mengatur tautan Google Sheet untuk
                            keuangan di Pengaturan.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col bg-slate-50">
                        <iframe
                            src={getEmbedUrl(sheetUrl)}
                            className="h-[500px] w-full border-0 sm:h-[700px]"
                            title="Data Keuangan"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
