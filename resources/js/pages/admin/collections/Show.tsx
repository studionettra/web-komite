import { Head, useForm, Link } from '@inertiajs/react';
import {
    CaretLeft,
    CheckCircle,
    WarningCircle,
    Receipt,
    ArrowRight,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

export default function AdminCollectionsShow({
    collection,
}: {
    collection: any;
}) {
    const { post, processing } = useForm();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const submitVerification: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/collections/${collection.id}/verify`);
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
            <Head title={`Detail Setoran - ${collection.classroom.name}`} />

            <div className="mb-6 flex items-center gap-5">
                <Link
                    href="/admin/collections"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-100 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                >
                    <CaretLeft weight="bold" className="h-6 w-6" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                        Detail Setoran Kelas
                    </h1>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                        Kelas: {collection.classroom.name} | Periode:{' '}
                        {monthNames[collection.month]} {collection.year}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-8 py-6">
                            <h2 className="text-xl font-semibold text-slate-800">
                                Rincian Pembayaran Siswa
                            </h2>
                            <span className="rounded-full border border-slate-100 bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
                                Total {collection.details.length} Data
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Siswa
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Uang Kas
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Jumat Berbagi
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {collection.details.map((detail: any) => (
                                        <tr
                                            key={detail.id}
                                            className="transition-all duration-200 hover:bg-blue-50/30"
                                        >
                                            <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                                                {detail.student.name}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-medium text-slate-600">
                                                {formatCurrency(
                                                    detail.kas_amount,
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-medium text-slate-600">
                                                {formatCurrency(
                                                    detail.jumat_berkah_amount,
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm">
                                                {detail.is_paid ? (
                                                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 ring-inset">
                                                        Lunas
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 ring-1 ring-rose-500/20 ring-inset">
                                                        Belum
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 lg:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold text-slate-800">
                            Rekap & Verifikasi
                        </h2>

                        <div className="mb-8 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-500">
                                    Total Uang Kas
                                </span>
                                <span className="font-semibold text-slate-800">
                                    {formatCurrency(collection.total_kas)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-500">
                                    Total Jumat Berbagi
                                </span>
                                <span className="font-semibold text-slate-800">
                                    {formatCurrency(
                                        collection.total_jumat_berkah,
                                    )}
                                </span>
                            </div>
                            <div className="border-t-2 border-dashed border-slate-100 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-800">
                                        Total Transfer
                                    </span>
                                    <span className="text-2xl font-black text-blue-600">
                                        {formatCurrency(
                                            parseFloat(collection.total_kas) +
                                                parseFloat(
                                                    collection.total_jumat_berkah,
                                                ),
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 rounded-2xl border-2 border-slate-100 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <Receipt
                                        className="h-5 w-5"
                                        weight="fill"
                                    />
                                </div>
                                <span className="font-semibold text-slate-800">
                                    Bukti Transfer
                                </span>
                            </div>
                            {collection.transfer_proof ? (
                                <a
                                    href={`/storage/${collection.transfer_proof}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative block overflow-hidden rounded-xl border-2 border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors group-hover:bg-slate-900/10">
                                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                                            Lihat Penuh
                                        </span>
                                    </div>
                                    <img
                                        src={`/storage/${collection.transfer_proof}`}
                                        alt="Bukti Transfer"
                                        className="w-full object-cover"
                                    />
                                </a>
                            ) : (
                                <div className="py-4 text-center text-sm text-slate-500">
                                    Tidak ada lampiran bukti.
                                </div>
                            )}
                        </div>

                        {collection.status === 'submitted' ? (
                            <form onSubmit={submitVerification}>
                                <div className="mb-6 flex gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-amber-800 shadow-inner">
                                    <WarningCircle
                                        weight="fill"
                                        className="mt-0.5 h-6 w-6 shrink-0 text-amber-500"
                                    />
                                    <p className="text-sm font-medium">
                                        Pastikan mutasi di rekening sesuai
                                        dengan total transfer sebelum melakukan
                                        verifikasi.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    <CheckCircle
                                        weight="bold"
                                        className="h-5 w-5"
                                    />
                                    {processing
                                        ? 'Memproses...'
                                        : 'Verifikasi & Masukkan ke Saldo'}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-6 text-center text-emerald-700">
                                <CheckCircle
                                    weight="fill"
                                    className="h-10 w-10 text-emerald-500"
                                />
                                <div>
                                    <span className="block text-lg font-black">
                                        Telah Diverifikasi
                                    </span>
                                    {collection.verifier && (
                                        <span className="mt-1 block text-sm font-medium text-emerald-600/80">
                                            Oleh: {collection.verifier.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
