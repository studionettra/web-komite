import { Head, useForm, router, Link } from '@inertiajs/react';
import { PencilSimple, Trash, Plus, X } from '@phosphor-icons/react';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
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
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            put(`/users/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                    setIsModalOpen(false);
                },
            });
        } else {
            post('/users', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
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

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Manajemen Pengguna
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola akun pengguna, reset password, dan hak akses
                        sistem.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                >
                    <Plus weight="bold" className="h-5 w-5" />
                    <span>Pengguna Baru</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isEditing ? 'Edit Pengguna' : 'Pengguna Baru'}
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
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        required
                                        placeholder="Nama pengguna"
                                    />
                                    {errors.name && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        required
                                        placeholder="Alamat email"
                                    />
                                    {errors.email && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
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
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                        required={!isEditing}
                                        placeholder="Minimal 6 karakter"
                                    />
                                    {errors.password && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="relative z-20">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Role
                                    </label>
                                    <Select
                                        value={data.role}
                                        onChange={(val) => setData('role', val as string)}
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
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.role}
                                        </div>
                                    )}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
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
                                            Nama & Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                        >
                                            Role
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
        </DashboardLayout>
    );
}
