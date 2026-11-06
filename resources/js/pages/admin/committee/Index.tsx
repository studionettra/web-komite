import { Head, router, useForm } from '@inertiajs/react';
import {
    PencilSimple,
    Plus,
    Trash,
    CheckCircle,
    XCircle,
    X,
    ImageSquare,
    IdentificationCard,
    MagnifyingGlass,
    User,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState, useRef, useMemo } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { confirmDelete } from '../../../utils/alertManager';

interface CommitteeMemberItem {
    id: number;
    name: string;
    position: string;
    division: string;
    division_order: number;
    order: number;
    is_active: boolean;
    photo_path: string | null;
    photo_url: string | null;
}

const PRESET_DIVISIONS = [
    { name: 'Kepala Sekolah', order: 1 },
    { name: 'Pengurus Harian', order: 2 },
    { name: 'Bidang Media Sosial', order: 3 },
    { name: 'Bidang Konsumsi', order: 4 },
    { name: 'Bidang Humas', order: 5 },
];

export default function CommitteeIndex({
    members = [],
}: {
    members: CommitteeMemberItem[];
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedDivisionFilter, setSelectedDivisionFilter] =
        useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCustomDivision, setIsCustomDivision] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            position: '',
            division: 'Pengurus Harian',
            division_order: 2,
            order: 0,
            is_active: true,
            photo: null as File | null,
            _method: 'post',
        });

    const divisionList = useMemo(() => {
        const set = new Set<string>();
        PRESET_DIVISIONS.forEach((p) => set.add(p.name));
        members.forEach((m) => {
            if (m.division) set.add(m.division);
        });
        return Array.from(set);
    }, [members]);

    const filteredMembers = useMemo(() => {
        return members.filter((m) => {
            const matchesDivision =
                selectedDivisionFilter === 'all' ||
                m.division === selectedDivisionFilter;
            const matchesSearch =
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.division.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDivision && matchesSearch;
        });
    }, [members, selectedDivisionFilter, searchQuery]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDivisionSelect = (val: string) => {
        if (val === '__custom__') {
            setIsCustomDivision(true);
            setData((prev) => ({
                ...prev,
                division: '',
                division_order: 10,
            }));
        } else {
            setIsCustomDivision(false);
            const preset = PRESET_DIVISIONS.find((p) => p.name === val);
            setData((prev) => ({
                ...prev,
                division: val,
                division_order: preset ? preset.order : 10,
            }));
        }
    };

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        setImagePreview(null);
        setIsCustomDivision(false);
        reset();
        clearErrors();
        setData({
            name: '',
            position: '',
            division: 'Pengurus Harian',
            division_order: 2,
            order: 0,
            is_active: true,
            photo: null,
            _method: 'post',
        });
        setIsModalOpen(true);
    };

    const openEdit = (member: CommitteeMemberItem) => {
        setIsEditing(true);
        setEditingId(member.id);
        setImagePreview(member.photo_url || null);
        clearErrors();

        const isPreset = PRESET_DIVISIONS.some(
            (p) => p.name === member.division,
        );
        setIsCustomDivision(!isPreset);

        setData({
            name: member.name,
            position: member.position,
            division: member.division,
            division_order: member.division_order || 0,
            order: member.order || 0,
            is_active: member.is_active,
            photo: null,
            _method: 'put',
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            post(`/admin/committee-members/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/admin/committee-members', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Pengurus ini akan dihapus dari susunan organisasi dan foto akan dibersihkan dari server.',
            () => {
                router.delete(`/admin/committee-members/${id}`, {
                    preserveScroll: true,
                });
            },
        );
    };

    return (
        <DashboardLayout>
            <Head title="Struktur Pengurus Komite" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Struktur Pengurus Komite
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola susunan anggota dan divisi komite yang
                        ditampilkan pada halaman publik (/pengurus).
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-4 w-4" />
                    <span>Tambah Pengurus</span>
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setSelectedDivisionFilter('all')}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            selectedDivisionFilter === 'all'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Semua ({members.length})
                    </button>
                    {divisionList.map((div) => {
                        const count = members.filter(
                            (m) => m.division === div,
                        ).length;
                        return (
                            <button
                                key={div}
                                onClick={() => setSelectedDivisionFilter(div)}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                    selectedDivisionFilter === div
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {div} ({count})
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full sm:w-64">
                    <MagnifyingGlass className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nama / jabatan..."
                        className="w-full rounded-xl border border-slate-200 py-1.5 pr-4 pl-9 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Table of Committee Members */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                {filteredMembers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                            <IdentificationCard
                                weight="duotone"
                                className="h-8 w-8"
                            />
                        </div>
                        <h4 className="text-base font-bold text-slate-800">
                            Tidak Ada Data Pengurus
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                            {searchQuery || selectedDivisionFilter !== 'all'
                                ? 'Tidak ada anggota pengurus yang cocok dengan kriteria pencarian.'
                                : 'Belum ada data pengurus yang ditambahkan.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold text-slate-500 uppercase">
                                <tr>
                                    <th className="px-6 py-3.5">Pengurus</th>
                                    <th className="px-6 py-3.5">
                                        Divisi / Bidang
                                    </th>
                                    <th className="px-6 py-3.5">Jabatan</th>
                                    <th className="px-6 py-3.5 text-center">
                                        Urutan
                                    </th>
                                    <th className="px-6 py-3.5 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-3.5 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="transition-colors hover:bg-slate-50/50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                                                    {member.photo_url ? (
                                                        <img
                                                            src={
                                                                member.photo_url
                                                            }
                                                            alt={member.name}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                            <User
                                                                weight="bold"
                                                                className="h-5 w-5"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">
                                                        {member.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                {member.division}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">
                                            {member.position}
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium text-slate-500">
                                            #{member.order}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {member.is_active ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                                                    <CheckCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                                                    <XCircle
                                                        weight="fill"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEdit(member)
                                                    }
                                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                    title="Edit Pengurus"
                                                >
                                                    <PencilSimple
                                                        weight="bold"
                                                        className="h-4 w-4"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(member.id)
                                                    }
                                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                                                    title="Hapus Pengurus"
                                                >
                                                    <Trash
                                                        weight="bold"
                                                        className="h-4 w-4"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Form Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="custom-scrollbar relative max-h-[90vh] w-full max-w-xl transform overflow-y-auto rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    {isEditing
                                        ? 'Edit Data Pengurus'
                                        : 'Tambah Pengurus Baru'}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Isi informasi pengurus dan unggah foto
                                    profil.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={submit}
                            className="space-y-5 p-6 sm:p-8"
                        >
                            {/* Photo Upload */}
                            <div>
                                <label className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                    Foto Pengurus
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImageSquare
                                                weight="duotone"
                                                className="h-8 w-8 text-slate-300"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
                                        >
                                            Pilih Foto
                                        </button>
                                        <p className="mt-1.5 text-[11px] text-slate-400">
                                            Format: JPG, PNG, WEBP (Maksimal
                                            2MB). Disarankan foto rasio 1:1.
                                        </p>
                                    </div>
                                </div>
                                {errors.photo && (
                                    <p className="mt-1.5 text-xs text-rose-500">
                                        {errors.photo}
                                    </p>
                                )}
                            </div>

                            {/* Name & Title */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                    Nama Lengkap & Keterangan{' '}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Contoh: Eka Putri Rahayu (Una - BL2)"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-rose-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Division Selector */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                        Divisi / Bidang{' '}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={
                                            isCustomDivision
                                                ? '__custom__'
                                                : data.division
                                        }
                                        onChange={(e) =>
                                            handleDivisionSelect(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    >
                                        {PRESET_DIVISIONS.map((p) => (
                                            <option key={p.name} value={p.name}>
                                                {p.name}
                                            </option>
                                        ))}
                                        <option value="__custom__">
                                            + Divisi Lainnya...
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                        Jabatan{' '}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) =>
                                            setData('position', e.target.value)
                                        }
                                        placeholder="Contoh: Ketua, Anggota, Sekretaris"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.position && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {errors.position}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Custom Division Name (If Custom Selected) */}
                            {isCustomDivision && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                        Nama Divisi Baru{' '}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.division}
                                        onChange={(e) =>
                                            setData('division', e.target.value)
                                        }
                                        placeholder="Masukkan nama divisi baru..."
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.division && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {errors.division}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Ordering */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                        Urutan Divisi (Hierarki)
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={data.division_order}
                                        onChange={(e) =>
                                            setData(
                                                'division_order',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Urutan kelompok divisi di halaman publik
                                        (1 = teratas).
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase">
                                        Urutan Anggota di Divisi
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={data.order}
                                        onChange={(e) =>
                                            setData(
                                                'order',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Urutan kartu anggota dalam divisinya (1,
                                        2, 3...).
                                    </p>
                                </div>
                            </div>

                            {/* Is Active Toggle */}
                            <div className="flex items-center gap-3 pt-2">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                                </label>
                                <span className="text-sm font-semibold text-slate-700">
                                    Tampilkan di Halaman Publik
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : isEditing
                                          ? 'Perbarui Pengurus'
                                          : 'Simpan Pengurus'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
