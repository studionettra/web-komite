import { Head, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
    LockKey,
    ShieldCheck,
    Spinner,
    UsersThree,
    CaretDown,
    WhatsappLogo,
} from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
// We will use standard router instead of wayfinder if we are not sure, or we can use Inertia's post directly

export default function AcademicCalendarGate({
    classrooms = [],
}: {
    classrooms: any[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        student_name: '',
        classroom_id: '',
        agreed: false,
    });

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (classroomId: string) => {
        setData('classroom_id', classroomId);
        setIsDropdownOpen(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kalender-akademik/verify', {
            onError: () => {
                setFailedAttempts((prev) => prev + 1);
            },
            onSuccess: (page) => {
                if ((page.props as any).flash?.alert?.type === 'error') {
                    setFailedAttempts((prev) => prev + 1);
                }
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Verifikasi Akses Kalender Akademik">
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-sky-50 px-4 py-20 sm:py-32">
                {/* Playful Background Elements */}
                <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-blue-400/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-pink-400/20 mix-blend-multiply blur-3xl"></div>

                <div className="relative mt-3 w-full max-w-md rounded-[2.5rem] border border-white/50 bg-white/80 p-6 shadow-2xl shadow-sky-900/10 backdrop-blur-xl sm:p-10">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-1/2 h-1.5 w-1/3 -translate-x-1/2 rounded-b-full bg-linear-to-r from-blue-400 via-sky-400 to-emerald-400"></div>

                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="relative mb-5">
                            <div className="absolute -inset-2 animate-pulse rounded-full bg-sky-100"></div>
                            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50 drop-shadow-sm">
                                <LockKey
                                    className="h-8 w-8 text-blue-500"
                                    weight="duotone"
                                />
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">
                            Area Terbatas
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed font-medium text-slate-500">
                            Kalender akademik dan kurikulum bersifat eksklusif
                            dan hanya dapat diakses oleh Wali Murid KBIT-TKIT
                            Al-Ikhlash.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="classroom_id"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Kelas Anak
                            </label>
                            <div className="relative" ref={dropdownRef}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                                    <UsersThree
                                        className="h-5 w-5 text-slate-400"
                                        weight="duotone"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        !processing &&
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className={`block w-full cursor-pointer appearance-none rounded-2xl border py-3.5 pr-10 pl-11 text-left text-sm font-medium transition-all ${
                                        errors.classroom_id
                                            ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                                    } ${
                                        isDropdownOpen
                                            ? 'border-sky-400 bg-white ring-4 ring-sky-100'
                                            : 'bg-slate-50 focus:bg-white focus:ring-4 focus:outline-none'
                                    } ${processing ? 'cursor-not-allowed opacity-70' : ''}`}
                                >
                                    <span
                                        className={`block truncate ${data.classroom_id ? 'text-slate-900' : 'text-slate-400'}`}
                                    >
                                        {data.classroom_id
                                            ? classrooms.find(
                                                  (c) =>
                                                      c.id == data.classroom_id,
                                              )?.name
                                            : '-- Pilih Kelas --'}
                                    </span>
                                </button>
                                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-4">
                                    <CaretDown
                                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-sky-500' : ''}`}
                                        weight="bold"
                                    />
                                </div>

                                {isDropdownOpen && (
                                    <div className="ring-opacity-5 animate-in fade-in slide-in-from-top-2 absolute z-20 mt-2 w-full origin-top-right rounded-2xl border border-slate-100 bg-white py-2 shadow-xl ring-1 shadow-sky-900/5 ring-slate-100">
                                        <ul className="max-h-60 overflow-auto px-2">
                                            {classrooms.map((c) => (
                                                <li
                                                    key={c.id}
                                                    onClick={() =>
                                                        handleSelect(c.id)
                                                    }
                                                    className={`mb-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-700 ${
                                                        data.classroom_id ==
                                                        c.id
                                                            ? 'bg-sky-50 text-sky-700'
                                                            : 'text-slate-700'
                                                    }`}
                                                >
                                                    {c.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {errors.classroom_id && (
                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    {errors.classroom_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="student_name"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Nama Lengkap Anak (Siswa)
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <ShieldCheck
                                        className="h-5 w-5 text-slate-400"
                                        weight="duotone"
                                    />
                                </div>
                                <input
                                    id="student_name"
                                    type="text"
                                    className={`w-full rounded-2xl border bg-slate-50 py-3.5 pr-4 pl-11 text-sm font-medium text-slate-900 transition-all focus:bg-white focus:ring-4 focus:outline-none ${
                                        errors.student_name
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                                    }`}
                                    placeholder="Contoh: Budi Santoso"
                                    value={data.student_name}
                                    onChange={(e) =>
                                        setData('student_name', e.target.value)
                                    }
                                    disabled={processing}
                                />
                            </div>
                            {errors.student_name && (
                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    {errors.student_name}
                                </p>
                            )}
                            <p className="mt-2 text-xs leading-relaxed font-medium text-slate-400">
                                * Masukkan nama lengkap anak Anda sesuai dengan
                                yang terdaftar di sekolah.
                            </p>
                        </div>

                        <div className="flex items-start pl-1">
                            <div className="flex h-5 items-center">
                                <input
                                    id="agreed"
                                    name="agreed"
                                    type="checkbox"
                                    className="h-4.5 w-4.5 cursor-pointer rounded-md border-slate-300 text-sky-600 transition-colors focus:ring-sky-500"
                                    checked={data.agreed}
                                    onChange={(e) =>
                                        setData('agreed', e.target.checked)
                                    }
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="agreed"
                                    className="cursor-pointer font-medium text-slate-600 select-none"
                                >
                                    Saya menyetujui{' '}
                                    <a
                                        href="/syarat-dan-ketentuan"
                                        target="_blank"
                                        className="font-bold text-sky-600 transition-colors hover:text-sky-500 hover:underline"
                                    >
                                        syarat dan ketentuan
                                    </a>{' '}
                                    akses data.
                                </label>
                                {errors.agreed && (
                                    <p className="mt-1 text-xs font-medium text-red-500">
                                        {errors.agreed}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full justify-center rounded-full bg-linear-to-r from-blue-500 to-sky-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/40 focus:ring-4 focus:ring-sky-200 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="h-5 w-5 animate-spin" />
                                    Memverifikasi...
                                </span>
                            ) : (
                                'Akses Kalender'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                        <p className="mb-4 text-sm font-medium text-slate-500">
                            Kendala verifikasi atau nama tidak ditemukan?
                        </p>
                        <a
                            href={
                                failedAttempts >= 3
                                    ? 'https://wa.me/6285720093349'
                                    : '#'
                            }
                            target={failedAttempts >= 3 ? '_blank' : undefined}
                            rel={failedAttempts >= 3 ? 'noreferrer' : undefined}
                            onClick={(e) => {
                                if (failedAttempts < 3) {
e.preventDefault();
}
                            }}
                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition-all ${
                                failedAttempts >= 3
                                    ? 'cursor-pointer border-transparent bg-[#25D366]/10 text-[#25D366] shadow-sm hover:-translate-y-0.5 hover:bg-[#25D366]/20 active:translate-y-0'
                                    : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                            }`}
                        >
                            <WhatsappLogo className="h-5 w-5" weight="fill" />
                            Hubungi Administrator
                        </a>
                        {failedAttempts < 3 && (
                            <p className="mt-3 text-[11px] font-medium text-amber-500">
                                * Tombol aktif jika gagal memverifikasi{' '}
                                {3 - failedAttempts} kali lagi.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
