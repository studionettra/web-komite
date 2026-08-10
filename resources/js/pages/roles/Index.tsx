import { Head, useForm, router } from '@inertiajs/react';
import { Trash, ShieldCheck } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

export default function RolesIndex({ roles }: { roles: any[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/roles', {
            onSuccess: () => reset('name'),
        });
    };

    const deleteRole = (id: number, name: string) => {
        confirmDelete(`Apakah Anda yakin ingin menghapus role ${name}?`, () => {
            router.delete(`/roles/${id}`);
        });
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Role" />

            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
                    Manajemen Role
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-5">
                        <h2 className="mb-8 flex items-center gap-3 text-xl font-semibold text-slate-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <ShieldCheck weight="fill" className="h-6 w-6" />
                            </div>
                            Tambah Role Baru
                        </h2>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    className="mb-2 block text-sm font-bold text-slate-700"
                                    htmlFor="name"
                                >
                                    Nama Role
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                                    required
                                />
                                {errors.name && (
                                    <div className="mt-2 text-sm font-medium text-rose-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Role'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase sm:px-8"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase sm:px-8"
                                    >
                                        Nama Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase sm:px-8"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="transition-colors hover:bg-slate-50/80"
                                    >
                                        <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-slate-500 sm:px-8">
                                            {role.id}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold whitespace-nowrap text-slate-900 sm:px-8">
                                            {role.name}
                                        </td>
                                        <td className="px-4 py-3 text-right align-top whitespace-nowrap sm:px-8">
                                            {role.name !== 'Superadmin' && (
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            deleteRole(
                                                                role.id,
                                                                role.name,
                                                            )
                                                        }
                                                        className="flex items-center justify-center rounded-2xl bg-rose-50 p-2.5 text-rose-600 transition-all hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm"
                                                        title="Hapus Role"
                                                    >
                                                        <Trash
                                                            weight="fill"
                                                            className="h-5 w-5"
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
