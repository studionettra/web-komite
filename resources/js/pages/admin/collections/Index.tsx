import { Head, Link } from '@inertiajs/react';
import { Eye, CheckCircle, ClockCounterClockwise } from '@phosphor-icons/react';
import DashboardLayout from '../../../layouts/DashboardLayout';

export default function AdminCollectionsIndex({
    collections,
}: {
    collections: any;
}) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const monthNames = [
        '',
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    return (
        <DashboardLayout>
            <Head title="Verifikasi Setoran Kelas" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                    Verifikasi Setoran Kelas
                </h1>
                <p className="text-sm font-medium text-slate-500">
                    Daftar laporan pengumpulan dana kas dan donasi dari
                    Koordinator Kelas.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Periode & Kelas
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Total Setoran
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {collections.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        Belum ada setoran masuk dari Korlas.
                                    </td>
                                </tr>
                            ) : (
                                collections.data.map((collection: any) => (
                                    <tr
                                        key={collection.id}
                                        className="transition-colors hover:bg-slate-50/50"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-800">
                                                {collection.classroom.name}
                                            </div>
                                            <div className="text-sm font-medium text-slate-500">
                                                {monthNames[collection.month]}{' '}
                                                {collection.year}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-800">
                                                {formatCurrency(
                                                    parseFloat(
                                                        collection.total_kas,
                                                    ) +
                                                        parseFloat(
                                                            collection.total_jumat_berkah,
                                                        ),
                                                )}
                                            </div>
                                            <div className="mt-1 text-xs font-medium text-slate-500">
                                                Kas:{' '}
                                                {formatCurrency(
                                                    collection.total_kas,
                                                )}{' '}
                                                | Jumat:{' '}
                                                {formatCurrency(
                                                    collection.total_jumat_berkah,
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center whitespace-nowrap">
                                            {collection.status ===
                                            'submitted' ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/20 ring-inset">
                                                    <ClockCounterClockwise weight="bold" />{' '}
                                                    Menunggu Verifikasi
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 ring-inset">
                                                    <CheckCircle weight="bold" />{' '}
                                                    Terverifikasi
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <Link
                                                href={`/admin/collections/${collection.id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                            >
                                                <Eye weight="bold" />
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
