import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import {
    ArrowUpRight,
    Table as TableIcon,
    Gear,
    X,
} from '@phosphor-icons/react';
import { useState } from 'react';

export default function KorlasCollectionsIndex({
    classroom,
    sheetUrl,
    sheetStatus,
}: {
    classroom: any | null;
    sheetUrl: string | null;
    sheetStatus: 'active' | 'preparing' | 'hidden';
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

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const { data, setData, put, processing, errors, reset, clearErrors } =
        useForm({
            google_sheet_status: sheetStatus,
            google_sheet_link: sheetUrl || '',
        });

    const openSettingsModal = () => {
        clearErrors();
        setData({
            google_sheet_status: sheetStatus,
            google_sheet_link: sheetUrl || '',
        });
        setIsSettingsModalOpen(true);
    };

    const submitSettings = (e: React.FormEvent) => {
        e.preventDefault();
        put('/korlas/collections/settings', {
            onSuccess: () => {
                setIsSettingsModalOpen(false);
            },
        });
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

                <div className="flex flex-wrap items-center gap-2">
                    {classroom && (
                        <button
                            onClick={openSettingsModal}
                            className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                        >
                            <Gear
                                weight="fill"
                                className="h-5 w-5 text-slate-500"
                            />
                            <span>Atur Laporan</span>
                        </button>
                    )}
                    {sheetUrl && (
                        <a
                            href={sheetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-md"
                        >
                            <span>Buka Google Sheet</span>
                            <ArrowUpRight weight="bold" className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>

            {!classroom ? (
                <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-12 shadow-sm sm:p-20">
                    <TableIcon
                        className="mb-6 h-16 w-16 text-slate-200"
                        weight="duotone"
                    />
                    <h3 className="mb-3 text-lg font-semibold text-slate-800 sm:text-xl">
                        Belum Ada Kelas Aktif
                    </h3>
                    <p className="max-w-md text-center text-base text-slate-500">
                        Akun Anda belum ditugaskan sebagai koordinator untuk
                        kelas mana pun. Silakan hubungi admin sekolah.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    {sheetStatus === 'preparing' ? (
                        <div className="flex flex-col items-center justify-center p-12 sm:p-20">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    className="text-amber-500"
                                >
                                    <path
                                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                                        opacity="0.2"
                                    ></path>
                                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                                </svg>
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-slate-800 sm:text-xl">
                                Laporan Sedang Disiapkan
                            </h3>
                            <p className="max-w-md text-center text-base text-slate-500">
                                Status laporan kas kelas{' '}
                                <strong>{classroom.name}</strong> saat ini
                                disetel sebagai "Sedang Disiapkan". Anda bisa
                                menyusun dan merapikan datanya terlebih dahulu
                                sebelum membagikannya.
                            </p>
                        </div>
                    ) : !sheetUrl || sheetStatus === 'hidden' ? (
                        <div className="flex flex-col items-center justify-center p-12 sm:p-20">
                            <TableIcon
                                className="mb-6 h-16 w-16 text-slate-200"
                                weight="duotone"
                            />
                            <h3 className="mb-3 text-lg font-semibold text-slate-800 sm:text-xl">
                                Laporan Disembunyikan
                            </h3>
                            <p className="max-w-md text-center text-base text-slate-500">
                                Laporan kas untuk kelas{' '}
                                <strong>{classroom.name}</strong> belum diatur
                                atau sengaja disembunyikan. Anda dapat
                                mengaturnya kembali melalui tombol "Atur
                                Laporan" di atas.
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

            {/* Modal Pengaturan Laporan */}
            {isSettingsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSettingsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Pengaturan Laporan Kas
                            </h3>
                            <button
                                onClick={() => setIsSettingsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={submitSettings}>
                            <div className="px-8 py-6">
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-bold text-slate-700">
                                        Visibilitas Laporan
                                    </label>
                                    <div className="space-y-3">
                                        <label
                                            className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${data.google_sheet_status === 'active' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            value="active"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'active'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value as any,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-base font-bold text-slate-900">
                                                            Aktif & Terlihat
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-sm text-slate-500">
                                                        Wali murid dapat
                                                        langsung melihat laporan
                                                        di halaman mereka.
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${data.google_sheet_status === 'preparing' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            value="preparing"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'preparing'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value as any,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-amber-600 focus:ring-amber-500"
                                                        />
                                                        <span className="text-base font-bold text-slate-900">
                                                            Sedang Disusun
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-sm text-slate-500">
                                                        Hanya Anda yang dapat
                                                        melihat laporan. Wali
                                                        murid melihat notifikasi
                                                        "Sedang Disiapkan".
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${data.google_sheet_status === 'hidden' ? 'border-slate-400 bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            value="hidden"
                                                            checked={
                                                                data.google_sheet_status ===
                                                                'hidden'
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'google_sheet_status',
                                                                    e.target
                                                                        .value as any,
                                                                )
                                                            }
                                                            className="h-5 w-5 text-slate-600 focus:ring-slate-500"
                                                        />
                                                        <span className="text-base font-bold text-slate-900">
                                                            Sembunyikan Total
                                                        </span>
                                                    </div>
                                                    <span className="pl-8 text-sm text-slate-500">
                                                        Laporan disembunyikan
                                                        sepenuhnya dari akses
                                                        wali murid.
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.google_sheet_status && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.google_sheet_status}
                                        </div>
                                    )}
                                </div>

                                {data.google_sheet_status === 'active' && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="mb-2 block text-sm font-bold text-slate-700">
                                            Link Google Sheet (Akses Publik /
                                            Anyone with link)
                                        </label>
                                        <input
                                            type="url"
                                            value={data.google_sheet_link}
                                            onChange={(e) =>
                                                setData(
                                                    'google_sheet_link',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                            placeholder="https://docs.google.com/spreadsheets/d/..."
                                            required={
                                                data.google_sheet_status ===
                                                'active'
                                            }
                                        />
                                        {errors.google_sheet_link && (
                                            <div className="mt-2 text-sm font-medium text-rose-500">
                                                {errors.google_sheet_link}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col-reverse gap-3 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSettingsModalOpen(false)
                                    }
                                    className="inline-flex w-full justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm ring-1 ring-slate-300 transition-all ring-inset hover:bg-slate-50 sm:w-auto"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="sm:w-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Pengaturan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
