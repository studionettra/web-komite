import { Head, useForm } from '@inertiajs/react';
import {
    Gear,
    FloppyDisk,
    Link as LinkIcon,
    Info,
} from '@phosphor-icons/react';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Settings({ settings }: any) {
    const { data, setData, post, processing, errors } = useForm({
        google_spreadsheet_status:
            settings?.google_spreadsheet_status || 'hidden',
        google_spreadsheet_url: settings?.google_spreadsheet_url || '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post('/settings', {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>
            <Head title="Pengaturan Aplikasi" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Pengaturan Aplikasi
                    </h1>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                        Kelola konfigurasi sistem dan integrasi pihak ketiga.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                                <Gear weight="duotone" className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    Integrasi Google Sheets
                                </h3>
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    Atur tautan Spreadsheet untuk fitur Ekspor
                                    Transaksi.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                            <div className="flex gap-4">
                                <Info
                                    weight="fill"
                                    className="mt-0.5 h-6 w-6 shrink-0 text-blue-500"
                                />
                                <div className="text-sm font-medium text-blue-900">
                                    <p className="mb-1.5 font-semibold text-blue-800">
                                        Cara Mengatur Google Sheet (Mode
                                        Publik):
                                    </p>
                                    <ol className="ml-5 list-decimal space-y-1.5 opacity-90">
                                        <li>Buka laporan Google Sheet Anda.</li>
                                        <li>
                                            Klik tombol{' '}
                                            <strong>Share (Bagikan)</strong> di
                                            pojok kanan atas.
                                        </li>
                                        <li>
                                            Pada bagian Akses Umum (General
                                            Access), ubah menjadi{' '}
                                            <strong>
                                                Anyone with the link (Siapa saja
                                                yang memiliki link)
                                            </strong>
                                            .
                                        </li>
                                        <li>
                                            Pastikan hak aksesnya disetel
                                            sebagai{' '}
                                            <strong>Viewer (Pelihat)</strong>.
                                        </li>
                                        <li>
                                            Salin <em>link</em> Google Sheet
                                            tersebut dan <em>paste</em> di bawah
                                            ini.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status Pelaporan
                                </label>
                                <div className="mb-4 grid gap-4 sm:grid-cols-3">
                                    <label
                                        className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_spreadsheet_status === 'active' ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="google_spreadsheet_status"
                                                        value="active"
                                                        checked={
                                                            data.google_spreadsheet_status ===
                                                            'active'
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'google_spreadsheet_status',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                                                        Tampilkan Laporan
                                                    </span>
                                                </div>
                                                <span className="pl-8 text-xs font-medium text-slate-500">
                                                    Laporan kas besar (global)
                                                    dapat dilihat publik.
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                    <label
                                        className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_spreadsheet_status === 'preparing' ? 'border-amber-400 bg-amber-50 shadow-sm' : 'border-slate-100 bg-white hover:border-amber-200'}`}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="google_spreadsheet_status"
                                                        value="preparing"
                                                        checked={
                                                            data.google_spreadsheet_status ===
                                                            'preparing'
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'google_spreadsheet_status',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-5 w-5 text-amber-500 focus:ring-amber-400"
                                                    />
                                                    <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-amber-500">
                                                        Sedang Disiapkan
                                                    </span>
                                                </div>
                                                <span className="pl-8 text-xs font-medium text-slate-500">
                                                    Menampilkan pesan bahwa
                                                    admin sedang menyusun
                                                    laporan ini.
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                    <label
                                        className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${data.google_spreadsheet_status === 'hidden' ? 'border-slate-400 bg-slate-50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="google_spreadsheet_status"
                                                        value="hidden"
                                                        checked={
                                                            data.google_spreadsheet_status ===
                                                            'hidden'
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'google_spreadsheet_status',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-5 w-5 text-slate-600 focus:ring-slate-500"
                                                    />
                                                    <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-slate-600">
                                                        Sembunyikan
                                                    </span>
                                                </div>
                                                <span className="pl-8 text-xs font-medium text-slate-500">
                                                    Laporan disembunyikan /
                                                    offline dari halaman publik.
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                {errors.google_spreadsheet_status && (
                                    <p className="mb-4 text-sm font-medium text-rose-500">
                                        {errors.google_spreadsheet_status}
                                    </p>
                                )}
                            </div>

                            {data.google_spreadsheet_status === 'active' && (
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tautan (Link) Google Sheet
                                    </label>
                                    <div className="relative mt-2">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <LinkIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="url"
                                            value={data.google_spreadsheet_url}
                                            onChange={(e) =>
                                                setData(
                                                    'google_spreadsheet_url',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-3.5 pr-4 pl-12 font-medium transition-all outline-none hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/20"
                                            placeholder="Contoh: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFM..."
                                            required={
                                                data.google_spreadsheet_status ===
                                                'active'
                                            }
                                        />
                                    </div>
                                    {errors.google_spreadsheet_url && (
                                        <p className="mt-1.5 text-sm font-medium text-rose-500">
                                            {errors.google_spreadsheet_url}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    <FloppyDisk
                                        weight="bold"
                                        className="h-5 w-5"
                                    />
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Pengaturan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
