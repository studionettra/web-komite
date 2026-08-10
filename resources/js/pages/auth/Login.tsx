import { useForm, Head } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
    EnvelopeSimple,
    LockKey,
    WarningCircle,
    Sparkle,
} from '@phosphor-icons/react';
import appLogo from '../../../images/logo/logo-komite-alikhlash-jatipadang.png';
import PublicLayout from '../../layouts/PublicLayout';

export default function Login() {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            email: '',
            password: '',
            remember: false,
            'cf-turnstile-response': '',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        clearErrors();
        let hasError = false;

        if (!data.email) {
            setError('email', 'Email wajib diisi untuk login.');
            hasError = true;
        }

        if (!data.password) {
            setError('password', 'Password wajib diisi untuk login.');
            hasError = true;
        }

        if (!data['cf-turnstile-response']) {
            setError(
                'cf-turnstile-response',
                'Silakan verifikasi keamanan terlebih dahulu.',
            );
            hasError = true;
        }

        if (hasError) {
            return;
        }

        post('/login');
    };

    return (
        <PublicLayout>
            <Head title="Login Pengurus" />
            <div className="relative flex items-center justify-center overflow-hidden bg-sky-50 px-4 py-20 sm:py-32">
                {/* Playful Background Elements */}
                <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-blue-400/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-pink-400/20 mix-blend-multiply blur-3xl"></div>

                <div className="mt-3 relative w-full max-w-md rounded-2xl border border-white/50 bg-white/80 p-6 shadow-2xl shadow-sky-900/10 backdrop-blur-xl sm:p-10">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-1/2 h-1.5 w-1/3 -translate-x-1/2 rounded-b-full bg-linear-to-r from-blue-400 via-sky-400 to-emerald-400"></div>

                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="relative mb-5">
                            <div className="absolute -inset-2 animate-pulse rounded-full bg-sky-100"></div>
                            <img
                                src={appLogo}
                                alt="Logo Komite"
                                className="relative h-16 w-16 object-contain drop-shadow-sm"
                            />
                            <Sparkle
                                weight="fill"
                                className="absolute -top-2 -right-2 h-6 w-6 animate-bounce text-yellow-400"
                            />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Login Pengurus
                        </h2>
                        <p className="mt-2 text-sm font-medium text-slate-500">
                            Masuk ke Dashboard Komite
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6" noValidate>
                        {errors.email && (
                            <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/80 p-4 text-sm font-medium text-red-600 backdrop-blur-sm">
                                <WarningCircle
                                    weight="fill"
                                    className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                                />
                                <span>{errors.email}</span>
                            </div>
                        )}
                        <div>
                            <label
                                className="mb-2 block text-sm font-bold text-slate-700"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <EnvelopeSimple
                                        weight="duotone"
                                        className="h-5 w-5"
                                    />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className={`w-full rounded-2xl border bg-slate-50 py-3.5 pr-4 pl-11 text-sm font-medium text-slate-900 transition-all focus:bg-white focus:ring-4 focus:outline-none ${
                                        errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                                    }`}
                                    placeholder="Masukkan email Anda"
                                    required
                                    autoFocus
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && (
                                <div className="mt-1.5 text-xs font-medium text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                className="mb-2 block text-sm font-bold text-slate-700"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <LockKey
                                        weight="duotone"
                                        className="h-5 w-5"
                                    />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className={`w-full rounded-2xl border bg-slate-50 py-3.5 pr-4 pl-11 text-sm font-medium text-slate-900 transition-all focus:bg-white focus:ring-4 focus:outline-none ${
                                        errors.password
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                                    }`}
                                    placeholder="Masukkan password Anda"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && (
                                <div className="mt-1.5 text-xs font-medium text-red-500">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 cursor-pointer rounded-md border-slate-300 text-sky-600 transition-colors focus:ring-sky-500"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2.5 block cursor-pointer text-sm font-medium text-slate-600 select-none"
                            >
                                Ingat Saya
                            </label>
                        </div>

                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                                <Turnstile
                                    siteKey={
                                        import.meta.env.VITE_TURNSTILE_SITE_KEY
                                    }
                                    onSuccess={(token) =>
                                        setData('cf-turnstile-response', token)
                                    }
                                    onExpire={() =>
                                        setData('cf-turnstile-response', '')
                                    }
                                    onError={() =>
                                        setData('cf-turnstile-response', '')
                                    }
                                />
                            </div>
                            {errors['cf-turnstile-response'] && (
                                <div className="mt-2 text-center text-xs font-medium text-red-500">
                                    {errors['cf-turnstile-response']}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-linear-to-r from-blue-500 to-sky-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/40 focus:ring-4 focus:ring-sky-200 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {processing ? 'Memproses...' : 'Masuk Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
