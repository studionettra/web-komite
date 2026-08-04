import { Head } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ArrowUpRight, Table as TableIcon } from '@phosphor-icons/react';

export default function TransactionsIndex({
    transactions,
    sheetUrl,
}: {
    transactions: any[];
    sheetUrl: string | null;
}) {
    // Check if we have headers
    const hasData = transactions && transactions.length > 0;
    const headers = hasData ? Object.keys(transactions[0]) : [];

    return (
        <DashboardLayout>
            <Head title="Keuangan" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    Catatan Keuangan Bendahara
                </h1>
                
                {sheetUrl && (
                    <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                        <span>Buka di Google Sheets</span>
                        <ArrowUpRight weight="bold" />
                    </a>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {!sheetUrl ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <TableIcon className="mb-4 h-12 w-12 text-slate-300" weight="light" />
                        <h3 className="mb-2 text-lg font-medium text-slate-700">Google Sheet Belum Terhubung</h3>
                        <p className="text-center text-sm">
                            Admin belum mengatur tautan Google Sheet untuk keuangan di pengaturan sistem (.env).
                        </p>
                    </div>
                ) : !hasData ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <TableIcon className="mb-4 h-12 w-12 text-slate-300" weight="light" />
                        <h3 className="mb-2 text-lg font-medium text-slate-700">Data Tidak Ditemukan</h3>
                        <p className="text-center text-sm">
                            Tidak ada data yang ditemukan, atau Google Sheet belum diatur menjadi <strong>"Anyone with the link can view"</strong>.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    {headers.map((header) => (
                                        <th
                                            key={header}
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {transactions.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="transition-colors hover:bg-slate-50/80"
                                    >
                                        {headers.map((header) => (
                                            <td key={`${index}-${header}`} className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                                {row[header]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs font-medium text-slate-500">
                            Menampilkan {transactions.length} baris dari Google Sheet
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
