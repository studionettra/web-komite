import { Head, useForm, router, Link } from '@inertiajs/react';
import { PencilSimple, Trash, Plus } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import Select from '../../components/ui/Select';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

export default function UsersIndex({
    users,
    roles,
}: {
    users: any;
    roles: any[];
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            email: '',
            password: '',
            role: '',
        });

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
    };

    const openEdit = (user: any) => {
        setIsEditing(true);
        setEditingId(user.id);
        clearErrors();
        setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.roles[0]?.name || '',
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/users/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                },
            });
        } else {
            post('/users', {
                onSuccess: () => reset(),
            });
        }
    };

    const deleteUser = (id: number, name: string) => {
        confirmDelete(`Hapus pengguna ${name}?`, () => {
            router.delete(`/users/${id}`);
        });
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Pengguna" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Manajemen Pengguna
                </h1>
                {!isEditing && (
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                    >
                        <Plus weight="bold" className="h-4 w-4" />
                        Tambah Pengguna
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                            <h2 className="text-base font-semibold text-slate-900">
                                {isEditing
                                    ? 'Edit Pengguna'
                                    : 'Pengguna Baru'}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={openCreate}
                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Batal
                                </button>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    placeholder="Nama pengguna"
                                />
                                {errors.name && (
                                    <div className="mt-1.5 text-xs font-medium text-rose-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    placeholder="Alamat email"
                                />
                                {errors.email && (
                                    <div className="mt-1.5 text-xs font-medium text-rose-500">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Password{' '}
                                    {isEditing && (
                                        <span className="font-normal text-slate-400">
                                            (Kosongkan jika tetap)
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required={!isEditing}
                                    placeholder="Minimal 6 karakter"
                                />
                                {errors.password && (
                                    <div className="mt-1.5 text-xs font-medium text-rose-500">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="relative z-20">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Role
                                </label>
                                <Select
                                    value={data.role}
                                    onChange={(val) =>
                                        setData('role', val as string)
                                    }
                                    options={[
                                        { value: '', label: 'Pilih Role...' },
                                        ...roles.map((r) => ({
                                            value: r.name,
                                            label: r.name,
                                        })),
                                    ]}
                                    placeholder="Pilih Role..."
                                />
                                {errors.role && (
                                    <div className="mt-1.5 text-xs font-medium text-rose-500">
                                        {errors.role}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Pengguna'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-8 xl:col-span-9">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Nama & Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-right text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {users.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">
                                                Tidak ada data pengguna.
                                            </td>
                                        </tr>
                                    ) : (
                                        users.data.map((user: any) => (
                                            <tr
                                                key={user.id}
                                                className="transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-xs text-slate-500 mt-0.5">
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/60 ring-inset">
                                                        {user.roles[0]?.name || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <div className="flex justify-end gap-1.5">
                                                        <button
                                                            onClick={() => openEdit(user)}
                                                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                                                            title="Edit Pengguna"
                                                        >
                                                            <PencilSimple weight="bold" className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user.id, user.name)}
                                                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600"
                                                            title="Hapus Pengguna"
                                                        >
                                                            <Trash weight="bold" className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination & Footer */}
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row">
                            <div className="text-xs font-medium text-slate-500">
                                Menampilkan <span className="font-semibold text-slate-900">{users.from || 0}</span> -{' '}
                                <span className="font-semibold text-slate-900">{users.to || 0}</span> dari{' '}
                                <span className="font-semibold text-slate-900">{users.total}</span> data
                            </div>
                            
                            {users.links && users.links.length > 3 && (
                                <div className="flex items-center gap-1">
                                    {users.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`inline-flex min-w-[32px] items-center justify-center rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors ${
                                                link.active
                                                    ? 'bg-slate-900 text-white'
                                                    : 'text-slate-600 hover:bg-slate-200'
                                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
