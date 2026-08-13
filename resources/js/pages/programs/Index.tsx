import { Head, useForm, router, Link, usePage } from '@inertiajs/react';
import {
    PencilSimple,
    Trash,
    Target,
    CheckCircle,
    Clock,
    FlagBanner,
    FileText,
    X,
    Plus,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import Select from '../../components/ui/Select';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

export default function ProgramsIndex({ programs }: { programs: any }) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.roles?.[0]?.name;
    const canManageProgram = ['Superadmin', 'Sekretaris'].includes(userRole);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: '',
            description: '',
            frequency: 'monthly',
            status: 'planned',
            start_date: '',
            end_date: '',
            images: [] as File[],
            existing_images: [] as string[],
            _method: 'post',
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        setData('_method', 'post');
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (program: any) => {
        setIsEditing(true);
        setEditingId(program.id);
        clearErrors();
        setData({
            title: program.title,
            description: program.description,
            frequency: program.frequency,
            status: program.status,
            start_date: program.start_date
                ? program.start_date.split('T')[0]
                : '',
            end_date: program.end_date ? program.end_date.split('T')[0] : '',
            images: [],
            existing_images: program.images || [],
            _method: 'put',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            post(`/programs/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setData('_method', 'post');
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
                forceFormData: true,
            });
        } else {
            post('/programs', {
                onSuccess: () => {
                    reset();
                    setData('_method', 'post');
                    setIsModalOpen(false);
                },
                forceFormData: true,
            });
        }
    };

    const deleteProgram = (id: number, title: string) => {
        confirmDelete(`Hapus program ${title}?`, () => {
            router.delete(`/programs/${id}`);
        });
    };

    const frequencyLabel = (freq: string) => {
        const labels: any = {
            monthly: 'Bulanan',
            incidental: 'Insidental',
        };

        return labels[freq] || freq;
    };

    const statusBadge = (status: string) => {
        if (status === 'planned') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold tracking-wider text-slate-700 uppercase">
                    <Clock weight="bold" className="h-3.5 w-3.5" />
                    Akan Datang
                </span>
            );
        }

        if (status === 'ongoing') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
                    <FlagBanner weight="bold" className="h-3.5 w-3.5" />
                    Sedang Berlangsung
                </span>
            );
        }

        if (status === 'completed') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                    <CheckCircle weight="bold" className="h-3.5 w-3.5" />
                    Selesai
                </span>
            );
        }

        return status;
    };

    return (
        <DashboardLayout>
            <Head title="Daftar Program" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Daftar Program
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Daftar agenda dan pelaksanaan program komite.
                    </p>
                </div>
                {canManageProgram && (
                    <button
                        onClick={openCreate}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        <span>Tambah Program</span>
                    </button>
                )}
            </div>

            {canManageProgram && isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isEditing ? 'Edit Program' : 'Tambah Program'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="space-y-6 px-8 py-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Nama Program
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        required
                                    />
                                    {errors.title && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Deskripsi Singkat
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        required
                                    ></textarea>
                                    {errors.description && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Gambar Banner (Opsional, Maks 5)
                                    </label>

                                    {isEditing && data.existing_images && data.existing_images.length > 0 && (
                                        <div className="mb-3">
                                            <p className="mb-1.5 text-xs font-medium text-slate-500">
                                                Banner saat ini:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {data.existing_images.map((img: string, idx: number) => (
                                                    <div
                                                        key={idx}
                                                        className="relative overflow-hidden rounded-xl border border-slate-200"
                                                    >
                                                        <img
                                                            src={`/storage/${img}`}
                                                            alt={`Current banner ${idx + 1}`}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="h-24 w-32 object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setData(
                                                                    'existing_images',
                                                                    data.existing_images.filter((i) => i !== img),
                                                                )
                                                            }
                                                            className="absolute right-1 top-1 rounded-full bg-rose-500 p-1 text-white shadow-sm hover:bg-rose-600 focus:outline-none"
                                                        >
                                                            <Trash className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setData('images', Array.from(e.target.files));
                                            }
                                        }}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-100 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-blue-700 hover:file:bg-blue-200"
                                    />
                                    {isEditing && (
                                        <p className="mt-2 text-xs font-semibold text-slate-400">
                                            * Upload gambar baru akan ditambahkan ke daftar gambar.
                                        </p>
                                    )}
                                    {errors.images && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.images}
                                        </div>
                                    )}
                                </div>
                                <div className="relative z-20 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Kategori
                                        </label>
                                        <Select
                                            value={data.frequency}
                                            onChange={(val) => setData('frequency', val as string)}
                                            options={[
                                                { value: 'monthly', label: 'Bulanan' },
                                                { value: 'incidental', label: 'Insidental' },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Status
                                        </label>
                                        <Select
                                            value={data.status}
                                            onChange={(val) => setData('status', val as string)}
                                            options={[
                                                { value: 'planned', label: 'Akan Datang' },
                                                { value: 'ongoing', label: 'Sedang Berlangsung' },
                                                { value: 'completed', label: 'Selesai' },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-6">
                                    <p className="mb-4 rounded-xl bg-slate-50 p-4 text-xs font-semibold leading-relaxed text-slate-500">
                                        Isi tanggal di bawah jika ini adalah acara 1x jalan{' '}
                                        <span className="italic text-slate-400">
                                            (Contoh: Market Day, Lomba HUT RI)
                                        </span>
                                        . Kosongkan jika program rutin memiliki sesi berulang{' '}
                                        <span className="italic text-slate-400">
                                            (Contoh: Jumat Berbagi, Renang)
                                        </span>
                                        .
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Tanggal Mulai (Opsional)
                                            </label>
                                            <input
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Tanggal Selesai (Opsional)
                                            </label>
                                            <input
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-300 transition-all ring-inset hover:bg-slate-50 sm:w-auto"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95 sm:w-auto"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Program'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Program
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Status & Kategori
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
                                    {programs.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-12 text-center text-sm text-slate-500"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <Target
                                                        weight="duotone"
                                                        className="mb-4 h-16 w-16 text-slate-200"
                                                    />
                                                    <p className="text-base font-medium">
                                                        Belum ada data program
                                                        kerja.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {programs.data.map((program: any) => (
                                        <tr
                                            key={program.id}
                                            className="transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={`/programs/${program.id}`}
                                                    className="font-bold text-slate-900 transition-colors hover:text-blue-600"
                                                >
                                                    {program.title}
                                                </Link>
                                                <div className="mt-1 line-clamp-1 text-sm text-slate-500">
                                                    {program.description}
                                                </div>
                                                {program.users &&
                                                    program.users.length >
                                                        0 && (
                                                        <div className="mt-2 flex flex-wrap gap-1">
                                                            {program.users.map(
                                                                (u: any) => (
                                                                    <span
                                                                        key={
                                                                            u.id
                                                                        }
                                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.id === auth?.user?.id ? 'border border-blue-200 bg-blue-100 text-blue-700' : 'border border-slate-200 bg-slate-100 text-slate-600'}`}
                                                                    >
                                                                        {u.id ===
                                                                        auth
                                                                            ?.user
                                                                            ?.id
                                                                            ? '★ Anda'
                                                                            : u.name}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="mb-1">
                                                    {statusBadge(
                                                        program.status,
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {frequencyLabel(
                                                        program.frequency,
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right align-top whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/programs/${program.id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-600 transition-all hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-sm"
                                                        title="Detail & Laporan"
                                                    >
                                                        <FileText
                                                            weight="fill"
                                                            className="h-4 w-4"
                                                        />
                                                        <span className="hidden sm:inline">
                                                            Laporan
                                                        </span>
                                                    </Link>
                                                    {canManageProgram && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    openEdit(
                                                                        program,
                                                                    )
                                                                }
                                                                className="flex items-center justify-center rounded-2xl bg-blue-50 px-3 text-blue-600 transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm"
                                                                title="Edit Program"
                                                            >
                                                                <PencilSimple weight="fill" className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    deleteProgram(
                                                                        program.id,
                                                                        program.title,
                                                                    )
                                                                }
                                                                className="flex items-center justify-center rounded-2xl bg-rose-50 px-3 text-rose-600 transition-all hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
                                                                title="Hapus Program"
                                                            >
                                                                <Trash weight="fill" className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {programs.total > 0 && (
                            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:gap-0">
                                <div className="text-xs font-medium text-slate-500">
                                    Menampilkan {programs.from || 0} - {programs.to || 0} dari total{' '}
                                    {programs.total} program
                                </div>
                                {programs.links && programs.links.length > 3 && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {programs.links.map((link: any, idx: number) => (
                                            link.url ? (
                                                <Link
                                                    key={idx}
                                                    href={link.url}
                                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-slate-800 text-white shadow-sm'
                                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                </Link>
                                            ) : (
                                                <span
                                                    key={idx}
                                                    className="rounded-lg px-3 py-1.5 text-sm font-medium bg-transparent text-slate-400 opacity-50 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
        </DashboardLayout>
    );
}
