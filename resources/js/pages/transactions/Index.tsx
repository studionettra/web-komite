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
                            Admin belum mengatur tautan Google Sheet untuk
                            keuangan di pengaturan sistem (.env).
                        </p>
                    </div>
                ) : !hasData ? (
                    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                        <TableIcon
                            className="mb-4 h-12 w-12 text-slate-300"
                            weight="light"
                        />
                        <h3 className="mb-2 text-base font-medium text-slate-700 sm:text-lg">
                            Data Tidak Ditemukan
                        </h3>
                        <p className="max-w-sm text-center text-sm text-slate-500">
                            Tidak ada data yang ditemukan, atau Google Sheet
                            belum diatur menjadi{' '}
                            <strong>"Anyone with the link can view"</strong>.
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
                                            className="px-4 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase sm:px-6 sm:py-4"
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
                                            <td
                                                key={`${index}-${header}`}
                                                className="px-4 py-3 text-sm whitespace-nowrap text-slate-600 sm:px-6 sm:py-4"
                                            >
                                                {row[header]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500 sm:px-6 sm:py-4">
                            Menampilkan {transactions.length} baris dari Google
                            Sheet
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
