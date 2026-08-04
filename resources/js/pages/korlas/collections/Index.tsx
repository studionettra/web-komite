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

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Data Kas Kelas
                    </h1>
                    {classroom && (
                        <p className="text-sm text-slate-500 mt-1">
                            Menampilkan data keuangan untuk Kelas <strong>{classroom.name}</strong>
                        </p>
                    )}
                </div>
                
                {sheetUrl && (
                    <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                        <span>Buka Untuk Mengedit</span>
                        <ArrowUpRight weight="bold" />
                    </a>
                )}
            </div>

            {!classroom ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-12 flex flex-col items-center justify-center text-slate-500">
                    <TableIcon className="mb-4 h-12 w-12 text-slate-300" weight="light" />
                    <h3 className="mb-2 text-lg font-medium text-slate-700">Tidak Ada Kelas</h3>
                    <p className="text-center text-sm">
                        Akun kamu belum ditugaskan sebagai koordinator untuk kelas mana pun. Hubungi admin.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {!sheetUrl ? (
                        <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                            <TableIcon className="mb-4 h-12 w-12 text-slate-300" weight="light" />
                            <h3 className="mb-2 text-lg font-medium text-slate-700">Google Sheet Belum Terhubung</h3>
                            <p className="text-center text-sm">
                                Link Google Sheet untuk kelas <strong>{classroom.name}</strong> belum diatur. Silakan hubungi admin untuk menambahkan link.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col bg-white">
                            <iframe 
                                src={getEmbedUrl(sheetUrl)}
                                className="w-full h-[700px] border-0"
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
