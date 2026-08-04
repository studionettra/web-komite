import { Head, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import {
    LockKey,
    ShieldCheck,
    Spinner,
    UsersThree,
    CaretDown,
    WhatsappLogo,
} from '@phosphor-icons/react';
import { verify } from '../../routes/public/finance/index';

export default function FinanceGate({
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
        post(verify.url(), {
            onError: () => {
                setFailedAttempts((prev) => prev + 1);
            },
            onSuccess: (page) => {
                if ((page.props as any).flash?.alert?.type === 'error') {
                    setFailedAttempts((prev) => prev + 1);
                }
            }
        });
    };

    return (
        <PublicLayout>
            <Head title="Verifikasi Akses Laporan Keuangan" />

            <section className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-20">
                <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                    <div className="bg-emerald-600 px-8 py-10 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                            <LockKey
                                className="h-8 w-8 text-white"
                                weight="duotone"
                            />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-white">
                            Area Terbatas
                        </h2>
                        <p className="text-sm leading-relaxed text-emerald-100">
                            Laporan keuangan ini bersifat terbatas dan hanya
                            dapat diakses secara eksklusif oleh Wali Murid                    
                            KBIT-TKIT Al-Ikhlash Pasar Minggu.
                        </p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="classroom_id"
                                    className="mb-2 block text-sm font-medium text-slate-700"
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
                                        className={`block w-full cursor-pointer appearance-none rounded-xl border py-3.5 pr-10 pl-12 text-left shadow-sm transition-all sm:text-sm ${
                                            errors.classroom_id
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                                        } ${
                                            isDropdownOpen
                                                ? 'border-emerald-500 bg-white ring-4 ring-emerald-500/20'
                                                : 'bg-slate-50/50 hover:border-emerald-300 focus:bg-white focus:ring-4'
                                        } ${processing ? 'cursor-not-allowed opacity-70' : ''}`}
                                    >
                                        <span
                                            className={`block truncate ${data.classroom_id ? 'text-slate-700' : 'text-slate-400'}`}
                                        >
                                            {data.classroom_id
                                                ? classrooms.find(
                                                      (c) =>
                                                          c.id ==
                                                          data.classroom_id,
                                                  )?.name
                                                : '-- Pilih Kelas --'}
                                        </span>
                                    </button>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-4">
                                        <CaretDown
                                            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="ring-opacity-5 animate-in fade-in slide-in-from-top-2 absolute z-20 mt-2 w-full origin-top-right rounded-xl border border-slate-100 bg-white py-2 shadow-lg ring-1 shadow-slate-200/50 ring-black">
                                            <ul className="max-h-60 overflow-auto">
                                                {classrooms.map((c) => (
                                                    <li
                                                        key={c.id}
                                                        onClick={() =>
                                                            handleSelect(c.id)
                                                        }
                                                        className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                                                            data.classroom_id ==
                                                            c.id
                                                                ? 'bg-emerald-50 font-bold text-emerald-700'
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
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.classroom_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="student_name"
                                    className="mb-2 block text-sm font-medium text-slate-700"
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
                                        className={`block w-full border py-3.5 pr-4 pl-12 ${errors.student_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'} rounded-xl bg-slate-50/50 shadow-sm transition-all hover:border-emerald-300 focus:bg-white focus:ring-4 sm:text-sm`}
                                        placeholder="Contoh: Budi Santoso"
                                        value={data.student_name}
                                        onChange={(e) =>
                                            setData(
                                                'student_name',
                                                e.target.value,
                                            )
                                        }
                                        disabled={processing}
                                    />
                                </div>
                                {errors.student_name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.student_name}
                                    </p>
                                )}
                                <p className="mt-3 text-xs text-slate-500">
                                    * Masukkan nama lengkap anak Anda sesuai
                                    dengan yang terdaftar di sekolah. Huruf
                                    besar/kecil tidak masalah.
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="agreed"
                                        name="agreed"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                                        checked={data.agreed}
                                        onChange={(e) => setData('agreed', e.target.checked)}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agreed" className="text-slate-600">
                                        Saya menyetujui{' '}
                                        <a href="/syarat-dan-ketentuan" target="_blank" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
                                            syarat dan ketentuan
                                        </a>{' '}
                                        akses data ini.
                                    </label>
                                    {errors.agreed && (
                                        <p className="mt-1 text-xs text-red-600">{errors.agreed}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-xl border border-transparent bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/30 focus:outline-none active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="h-5 w-5 animate-spin" />
                                        Memverifikasi...
                                    </span>
                                ) : (
                                    'Akses Laporan'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                            <p className="mb-4 text-sm text-slate-500">
                                Mengalami kendala atau nama anak tidak
                                ditemukan?
                            </p>
                            <a
                                href={failedAttempts >= 3 ? "https://wa.me/6285720093349" : "#"}
                                target={failedAttempts >= 3 ? "_blank" : undefined}
                                rel={failedAttempts >= 3 ? "noreferrer" : undefined}
                                onClick={(e) => {
                                    if (failedAttempts < 3) e.preventDefault();
                                }}
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                                    failedAttempts >= 3 
                                        ? "bg-[#25D366]/10 text-[#25D366] hover:-translate-y-0.5 hover:bg-[#25D366]/20 active:translate-y-0 cursor-pointer"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                <WhatsappLogo
                                    className="h-5 w-5"
                                    weight="fill"
                                />
                                Hubungi Administrator
                            </a>
                            {failedAttempts < 3 && (
                                <p className="mt-3 text-xs font-medium text-amber-500">
                                    * Tombol ini akan aktif jika Anda gagal memverifikasi data sebanyak {3 - failedAttempts} kali lagi.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
