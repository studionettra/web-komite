import { Head, usePage, Link, useForm, router } from '@inertiajs/react';
import {
    CalendarBlank,
    FileText,
    UploadSimple,
    Trash,
    Image as ImageIcon,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    ArrowLeft,
    Plus,
    X,
    PencilSimple,
} from '@phosphor-icons/react';
import { useState, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

function TimeInput24({ value, onChange, required }: { value: string; onChange: (val: string) => void; required?: boolean }) {
    const [hour, minute] = (value || '00:00').split(':');
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    const baseClass = 'rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all hover:bg-white focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 appearance-none text-center';

    return (
        <div className="flex items-center gap-1.5">
            <select
                value={hour || '00'}
                onChange={(e) => onChange(`${e.target.value}:${minute || '00'}`)}
                className={`${baseClass} flex-1`}
                required={required}
            >
                {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                ))}
            </select>
            <span className="text-lg font-bold text-slate-500">:</span>
            <select
                value={minute || '00'}
                onChange={(e) => onChange(`${hour || '00'}:${e.target.value}`)}
                className={`${baseClass} flex-1`}
                required={required}
            >
                {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
        </div>
    );
}

function ActivityCard({ activity, programId, canManageProgram, onEdit }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { errors } = usePage().props as any;

    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            router.post(
                '/documents',
                {
                    program_id: programId,
                    program_activity_id: activity.id,
                    file: e.target.files[0],
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    },
                    onFinish: () => setIsUploading(false),
                },
            );
        }
    };

    const deleteDocument = (id: number) => {
        confirmDelete('Yakin ingin menghapus dokumen ini?', () => {
            router.delete(`/documents/${id}`, { preserveScroll: true });
        });
    };

    const deleteActivity = (id: number) => {
        confirmDelete(
            'Yakin ingin menghapus sesi program ini? Pastikan sesi ini sudah kosong dari laporan dan transaksi.',
            () => {
                router.delete(`/program-activities/${id}`, {
                    preserveScroll: true,
                });
            },
        );
    };

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return '-';
        }

        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isPlanned = activity.status === 'planned';

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-6 sm:flex-row sm:p-5">
                <div>
                    <h4 className="text-xl font-semibold text-slate-800">
                        {activity.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-2">
                            <CalendarBlank
                                weight="duotone"
                                className="h-4 w-4"
                            />
                            {formatDate(activity.activity_date)}
                        </div>
                        {activity.start_time && (
                            <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600">
                                {activity.start_time.substring(0, 5)} —{' '}
                                {activity.end_time?.substring(0, 5) ||
                                    'Selesai'}{' '}
                                WIB
                            </div>
                        )}
                    </div>
                    {activity.description && (
                        <p className="mt-2 text-sm text-slate-600">
                            {activity.description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span
                        className={`rounded-full px-4 py-2 text-xs font-bold shadow-sm ${activity.status === 'completed' ? 'bg-slate-100 text-slate-700' : activity.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                    >
                        {activity.status === 'completed'
                            ? 'Selesai'
                            : activity.status === 'ongoing'
                              ? 'Sedang Berlangsung'
                              : 'Akan Datang'}
                    </span>
                    {canManageProgram && (
                        <div className="ml-2 flex items-center gap-1.5">
                            <button
                                onClick={() => onEdit(activity)}
                                disabled={!isPlanned}
                                className={`flex items-center justify-center rounded-2xl p-2.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                                    isPlanned 
                                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                                        : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                }`}
                                title={isPlanned ? "Edit Sesi" : "Sesi tidak dapat diedit karena sedang/telah berlangsung"}
                            >
                                <PencilSimple weight="fill" className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => deleteActivity(activity.id)}
                                className="flex items-center justify-center rounded-2xl bg-rose-50 p-2.5 text-rose-600 transition-all hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
                                title="Hapus Sesi"
                            >
                                <Trash weight="fill" className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 sm:p-5">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h5 className="text-sm font-bold text-slate-700">
                            Lampiran & Dokumen ({activity.documents?.length || 0}/5)
                        </h5>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                            Format: JPG, PNG, PDF, DOC. Maksimal 5MB/file.
                        </p>
                    </div>
                    {canManageProgram && (activity.documents?.length || 0) < 5 && (
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 transition-all hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-sm disabled:translate-y-0 disabled:opacity-50"
                            >
                                <UploadSimple weight="fill" className="h-4 w-4" />
                                {isUploading ? 'Mengunggah...' : 'Unggah File'}
                            </button>
                        </div>
                    )}
                </div>

                {errors?.file && (
                    <div className="mb-6 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600">
                        {errors.file}
                    </div>
                )}

                {activity.documents?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-10 text-center">
                        <ImageIcon
                            weight="duotone"
                            className="mb-3 h-10 w-10 text-slate-300"
                        />
                        <p className="text-sm font-medium text-slate-500">
                            Belum ada lampiran di sesi ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {activity.documents?.map((doc: any) => {
                            const isImage = ['jpg', 'jpeg', 'png'].includes(
                                doc.file_type.toLowerCase(),
                            );

                            return (
                                <div
                                    key={doc.id}
                                    className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {isImage ? (
                                        <img
                                            src={`/storage/${doc.file_path}`}
                                            alt="Dokumentasi"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full flex-col items-center justify-center p-3">
                                            <FileText
                                                weight="duotone"
                                                className="mb-2 h-10 w-10 text-slate-400"
                                            />
                                            <span className="text-xs font-bold text-slate-500 uppercase">
                                                {doc.file_type}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                        <a
                                            href={`/storage/${doc.file_path}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900 transition-all hover:scale-105 hover:bg-slate-100"
                                        >
                                            Lihat
                                        </a>
                                        {canManageProgram && (
                                            <button
                                                onClick={() =>
                                                    deleteDocument(doc.id)
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition-all hover:scale-105 hover:bg-rose-600"
                                                title="Hapus"
                                            >
                                                <Trash
                                                    weight="fill"
                                                    className="h-5 w-5"
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Show({ program }: any) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.roles?.[0]?.name;
    const canManageProgram = ['Superadmin', 'Sekretaris'].includes(userRole);

    const [showActivityModal, setShowActivityModal] = useState(false);

    const {
        data: activityData,
        setData: setActivityData,
        post: postActivity,
        processing: processingActivity,
        errors: activityErrors,
        reset: resetActivity,
    } = useForm({
        program_id: program.id,
        title: '',
        activity_date: '',
        start_time: '',
        end_time: '',
        description: '',
    });

    const [editActivityModal, setEditActivityModal] = useState<any>(null);

    const {
        data: editData,
        setData: setEditData,
        put: putActivity,
        processing: processingEdit,
        errors: editErrors,
        reset: resetEdit,
        clearErrors: clearEditErrors,
    } = useForm({
        title: '',
        activity_date: '',
        start_time: '',
        end_time: '',
        description: '',
    });

    const submitActivity = (e: any) => {
        e.preventDefault();
        postActivity('/program-activities', {
            preserveScroll: true,
            onSuccess: () => {
                setShowActivityModal(false);
                resetActivity();
            },
        });
    };

    const openEditModal = (activity: any) => {
        setEditActivityModal(activity);
        setEditData({
            title: activity.title,
            activity_date: activity.activity_date ? activity.activity_date.substring(0, 10) : '',
            start_time: activity.start_time ? activity.start_time.substring(0, 5) : '',
            end_time: activity.end_time ? activity.end_time.substring(0, 5) : '',
            description: activity.description || '',
        });
        clearEditErrors();
    };

    const submitEditActivity = (e: any) => {
        e.preventDefault();
        if (!editActivityModal) return;
        
        putActivity(`/program-activities/${editActivityModal?.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditActivityModal(null);
                resetEdit();
            },
        });
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return '-';
        }

        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planned':
                return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'ongoing':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'completed':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'planned':
                return 'Akan Datang';
            case 'ongoing':
                return 'Sedang Berlangsung';
            case 'completed':
                return 'Selesai';
            default:
                return status;
        }
    };

    const getFrequencyText = (freq: string) => {
        switch (freq) {
            case 'monthly':
                return 'Bulanan';
            case 'holiday':
                return 'Hari Besar';
            case 'incidental':
                return 'Insidental';
            default:
                return freq;
        }
    };

    return (
        <DashboardLayout>
            <Head title={`Laporan: ${program.title}`} />

            {/* Modal Create Activity */}
            {showActivityModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-5">
                            <h3 className="text-2xl font-semibold text-slate-800">
                                Buat Sesi Program
                            </h3>
                            <button
                                onClick={() => setShowActivityModal(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={submitActivity}
                            className="space-y-6 p-5"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Judul Sesi
                                </label>
                                <input
                                    type="text"
                                    value={activityData.title}
                                    placeholder="Contoh: Laporan Januari 2026"
                                    onChange={(e) =>
                                        setActivityData('title', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                    required
                                />
                                {activityErrors.title && (
                                    <div className="mt-2 text-sm font-medium text-rose-500">
                                        {activityErrors.title}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Tanggal Pelaksanaan
                                </label>
                                <input
                                    type="date"
                                    value={activityData.activity_date}
                                    onChange={(e) =>
                                        setActivityData(
                                            'activity_date',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                    required
                                />
                                {activityErrors.activity_date && (
                                    <div className="mt-2 text-sm font-medium text-rose-500">
                                        {activityErrors.activity_date}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                        Jam Mulai (WIB)
                                    </label>
                                    <TimeInput24
                                        value={activityData.start_time}
                                        onChange={(val) =>
                                            setActivityData('start_time', val)
                                        }
                                        required
                                    />
                                    {activityErrors.start_time && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {activityErrors.start_time}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                        Jam Selesai (WIB)
                                    </label>
                                    <TimeInput24
                                        value={activityData.end_time}
                                        onChange={(val) =>
                                            setActivityData('end_time', val)
                                        }
                                        required
                                    />
                                    {activityErrors.end_time && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {activityErrors.end_time}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Keterangan (Opsional)
                                </label>
                                <textarea
                                    value={activityData.description}
                                    onChange={(e) =>
                                        setActivityData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                ></textarea>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processingActivity}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    {processingActivity
                                        ? 'Menyimpan...'
                                        : 'Simpan Sesi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit Activity */}
            {editActivityModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-5">
                            <h3 className="text-2xl font-semibold text-slate-800">
                                Edit Sesi Program
                            </h3>
                            <button
                                onClick={() => setEditActivityModal(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={submitEditActivity}
                            className="space-y-6 p-5"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Judul Sesi
                                </label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    placeholder="Contoh: Laporan Januari 2026"
                                    onChange={(e) =>
                                        setEditData('title', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                    required
                                />
                                {editErrors.title && (
                                    <div className="mt-2 text-sm font-medium text-rose-500">
                                        {editErrors.title}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Tanggal Pelaksanaan
                                </label>
                                <input
                                    type="date"
                                    value={editData.activity_date}
                                    onChange={(e) =>
                                        setEditData('activity_date', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                    required
                                />
                                {editErrors.activity_date && (
                                    <div className="mt-2 text-sm font-medium text-rose-500">
                                        {editErrors.activity_date}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                        Jam Mulai (WIB)
                                    </label>
                                    <TimeInput24
                                        value={editData.start_time}
                                        onChange={(val) =>
                                            setEditData('start_time', val)
                                        }
                                        required
                                    />
                                    {editErrors.start_time && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {editErrors.start_time}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                        Jam Selesai (WIB)
                                    </label>
                                    <TimeInput24
                                        value={editData.end_time}
                                        onChange={(val) =>
                                            setEditData('end_time', val)
                                        }
                                        required
                                    />
                                    {editErrors.end_time && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {editErrors.end_time}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Keterangan (Opsional)
                                </label>
                                <textarea
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData('description', e.target.value)
                                    }
                                    rows={3}
                                    className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                ></textarea>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processingEdit}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    {processingEdit
                                        ? 'Menyimpan...'
                                        : 'Perbarui Sesi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full space-y-6">
                {/* Top Nav */}
                <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-800"
                >
                    <ArrowLeft weight="bold" className="h-4 w-4" />
                    Kembali ke Daftar Program
                </Link>

                {/* Header Card */}
                <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-12 md:flex-row">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`rounded-full px-4 py-1.5 text-xs font-bold ${getStatusColor(program.status)}`}
                            >
                                {getStatusText(program.status)}
                            </span>
                            <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-800">
                                {getFrequencyText(program.frequency)}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 sm:text-5xl">
                            {program.title}
                        </h1>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {program.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                <CalendarBlank
                                    weight="fill"
                                    className="h-5 w-5 text-slate-400"
                                />
                                {formatDate(program.start_date)} —{' '}
                                {formatDate(program.end_date) || 'Berlanjut'}
                            </div>
                        </div>

                        {/* Panitia Assignment */}
                        {program.users && program.users.length > 0 && (
                            <div className="mt-6 border-t border-slate-100 pt-6">
                                <div className="mb-3 text-sm font-bold text-slate-700">
                                    Tim Panitia:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {program.users.map((u: any) => (
                                        <div
                                            key={u.id}
                                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${u.id === auth?.user?.id ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'}`}
                                        >
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] shadow-sm">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            {u.id === auth?.user?.id
                                                ? '★ Anda'
                                                : u.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Program Activities */}
                <div>
                    <div className="space-y-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <h3 className="text-2xl font-semibold text-slate-800">
                                Laporan Program
                            </h3>
                            {canManageProgram && (
                                <button
                                    onClick={() => setShowActivityModal(true)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                >
                                    <Plus weight="bold" className="h-4 w-4" />
                                    Sesi Baru
                                </button>
                            )}
                        </div>

                        {program.activities?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center shadow-sm">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                    <FileText
                                        weight="fill"
                                        className="h-10 w-10"
                                    />
                                </div>
                                <h4 className="text-2xl font-semibold text-slate-800">
                                    Belum ada sesi program
                                </h4>
                                <p className="mt-2 max-w-sm text-base font-medium text-slate-500">
                                    Buat sesi untuk mengelompokkan laporan per
                                    bulan atau per pelaksanaan program.
                                </p>
                                {canManageProgram && (
                                    <button
                                        onClick={() =>
                                            setShowActivityModal(true)
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                                    >
                                        <Plus
                                            weight="bold"
                                            className="h-5 w-5"
                                        />
                                        Buat Sesi Pertama
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {program.activities?.slice().sort((a: any, b: any) => {
                                    const now = new Date();
                                    now.setHours(0, 0, 0, 0);
                                    
                                    const dateA = new Date(a.activity_date);
                                    dateA.setHours(0, 0, 0, 0);
                                    
                                    const dateB = new Date(b.activity_date);
                                    dateB.setHours(0, 0, 0, 0);
                                    
                                    const diffA = Math.abs(dateA.getTime() - now.getTime());
                                    const diffB = Math.abs(dateB.getTime() - now.getTime());
                                    
                                    return diffA - diffB;
                                }).map((activity: any) => (
                                    <ActivityCard
                                        key={activity.id}
                                        activity={activity}
                                        programId={program.id}
                                        canManageProgram={canManageProgram}
                                        onEdit={openEditModal}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
