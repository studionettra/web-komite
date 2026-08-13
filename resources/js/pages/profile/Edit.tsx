import { Head, useForm, usePage } from '@inertiajs/react';
import { User, LockKey, FloppyDisk } from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Edit({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user as any;
    const isSuperadmin = user?.roles?.[0]?.name === 'Superadmin';

    const {
        data: profileData,
        setData: setProfileData,
        patch: patchProfile,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileSuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        patch: patchPassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        recentlySuccessful: passwordSuccessful,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        patchProfile('/profile');
    };

    const submitPassword: FormEventHandler = (e) => {
        e.preventDefault();
        patchPassword('/profile', {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Profil Saya" />

            <div className="mb-8">
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                    Profil Saya
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Kelola informasi profil dan keamanan akun Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Informasi Profil */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-5">
                    <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-blue-50 text-blue-600">
                            <User weight="fill" className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Informasi Profil
                            </h2>
                            <p className="text-sm text-slate-500">
                                Perbarui nama dan alamat email akun Anda.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitProfile} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) =>
                                    setProfileData('name', e.target.value)
                                }
                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-semibold transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                required
                            />
                            {profileErrors.name && (
                                <p className="mt-2 text-sm font-medium text-rose-500">
                                    {profileErrors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) =>
                                    setProfileData('email', e.target.value)
                                }
                                className={`w-full rounded-2xl border-2 px-4 py-3 font-semibold transition-all focus:outline-none ${!isSuperadmin ? 'cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20'}`}
                                required
                                disabled={!isSuperadmin}
                            />
                            {!isSuperadmin && (
                                <p className="mt-2 text-xs font-semibold text-slate-400">
                                    * Alamat email tidak dapat diubah selain
                                    oleh Superadmin.
                                </p>
                            )}
                            {profileErrors.email && (
                                <p className="mt-2 text-sm font-medium text-rose-500">
                                    {profileErrors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={profileProcessing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                            >
                                <FloppyDisk weight="fill" className="h-5 w-5" />
                                {profileProcessing
                                    ? 'Menyimpan...'
                                    : 'Simpan Profil'}
                            </button>

                            {profileSuccessful && (
                                <span className="animate-in fade-in slide-in-from-left-2 text-sm font-bold text-emerald-500 duration-300">
                                    Tersimpan! ✨
                                </span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Ubah Password */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-5">
                    <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-amber-50 text-amber-500">
                            <LockKey weight="fill" className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Ubah Password
                            </h2>
                            <p className="text-sm text-slate-500">
                                Pastikan akun Anda menggunakan password yang
                                aman.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitPassword} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password Saat Ini
                            </label>
                            <input
                                type="password"
                                value={passwordData.current_password}
                                onChange={(e) =>
                                    setPasswordData(
                                        'current_password',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-semibold transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                required
                            />
                            {passwordErrors.current_password && (
                                <p className="mt-2 text-sm font-medium text-rose-500">
                                    {passwordErrors.current_password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password Baru
                            </label>
                            <input
                                type="password"
                                value={passwordData.password}
                                onChange={(e) =>
                                    setPasswordData('password', e.target.value)
                                }
                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-semibold transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                required
                            />
                            {passwordErrors.password && (
                                <p className="mt-2 text-sm font-medium text-rose-500">
                                    {passwordErrors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Konfirmasi Password Baru
                            </label>
                            <input
                                type="password"
                                value={passwordData.password_confirmation}
                                onChange={(e) =>
                                    setPasswordData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-semibold transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                required
                            />
                            {passwordErrors.password_confirmation && (
                                <p className="mt-2 text-sm font-medium text-rose-500">
                                    {passwordErrors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={passwordProcessing}
                                className="flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-[0_6px_15px_rgba(245,158,11,0.2)] transition-all hover:-translate-y-1 hover:bg-amber-600 hover:shadow-sm disabled:translate-y-0 disabled:opacity-70"
                            >
                                <LockKey weight="fill" className="h-5 w-5" />
                                {passwordProcessing
                                    ? 'Menyimpan...'
                                    : 'Simpan Password'}
                            </button>

                            {passwordSuccessful && (
                                <span className="animate-in fade-in slide-in-from-left-2 text-sm font-bold text-emerald-500 duration-300">
                                    Tersimpan! ✨
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
