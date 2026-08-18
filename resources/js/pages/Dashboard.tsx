import { Head, usePage } from '@inertiajs/react';
import bannerImage from '../../images/banners/image-banner-dashboard-komite.png';
import AnggotaDashboard from '../components/dashboard/AnggotaDashboard';
import BendaharaDashboard from '../components/dashboard/BendaharaDashboard';
import HumasDashboard from '../components/dashboard/HumasDashboard';
import KorlasDashboard from '../components/dashboard/KorlasDashboard';
import SekretarisDashboard from '../components/dashboard/SekretarisDashboard';
import SuperadminDashboard from '../components/dashboard/SuperadminDashboard';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Dashboard(props: any) {
    const { auth } = usePage().props as any;
    const { role } = props;

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const renderDashboard = () => {
        switch (role) {
            case 'Superadmin':
                return (
                    <SuperadminDashboard
                        {...props}
                        formatRupiah={formatRupiah}
                    />
                );
            case 'Bendahara':
                return (
                    <BendaharaDashboard
                        {...props}
                        formatRupiah={formatRupiah}
                    />
                );
            case 'Sekretaris':
                return (
                    <SekretarisDashboard
                        {...props}
                        formatRupiah={formatRupiah}
                    />
                );
            case 'Korlas':
                return (
                    <KorlasDashboard {...props} formatRupiah={formatRupiah} />
                );
            case 'Humas':
                return <HumasDashboard {...props} />;
            default:
                return (
                    <AnggotaDashboard {...props} formatRupiah={formatRupiah} />
                );
        }
    };

    return (
        <DashboardLayout>
            <Head title="Dashboard Komite" />

            <div className="w-full space-y-8">
                {/* Hero / Greeting Section */}
                <div className="relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 shadow-[0_8px_30px_rgba(59,130,246,0.08)] ring-1 ring-white sm:p-8">
                    {/* Playful background blobs */}
                    <div className="pointer-events-none absolute top-0 right-0 z-0 -mt-16 -mr-16 h-80 w-80 rounded-full bg-blue-400/20 mix-blend-multiply blur-3xl"></div>
                    <div className="pointer-events-none absolute bottom-0 left-0 z-0 -mb-16 -ml-16 h-80 w-80 rounded-full bg-emerald-400/20 mix-blend-multiply blur-3xl"></div>
                    <div className="pointer-events-none absolute top-1/2 left-1/3 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-200/20 mix-blend-multiply blur-3xl"></div>

                    {/* Integrated Banner Image (Photo Background Style) */}
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-full md:block md:w-1/2 lg:w-6/12"
                        style={{
                            WebkitMaskImage:
                                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 70%, black 100%)',
                            maskImage:
                                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 70%, black 100%)',
                        }}
                    >
                        <img
                            src={bannerImage}
                            alt="Dashboard Banner"
                            className="h-full w-full object-cover object-right-top opacity-70 mix-blend-multiply transition-all duration-1000 hover:scale-105 hover:opacity-90"
                        />
                    </div>

                    <div className="relative z-10 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.25rem] bg-white text-2xl font-bold text-blue-600 shadow-xl ring-4 shadow-blue-900/5 ring-white/50 backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:-rotate-6">
                            {auth?.user?.name?.charAt(0) || 'K'}
                        </div>
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-blue-600 uppercase shadow-sm backdrop-blur-md">
                                <div className="relative flex h-2 w-2 items-center justify-center">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </div>
                                Logged in as {role}
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-800 drop-shadow-sm sm:text-3xl">
                                Selamat Datang, <br className="sm:hidden" />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {auth?.user?.name || 'Pengurus'}
                                </span>
                            </h1>
                            <p className="mt-4 max-w-lg text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                                {role === 'Bendahara'
                                    ? 'Kelola arus kas, pantau pemasukan dan pengeluaran, serta pastikan transparansi keuangan komite terjaga.'
                                    : role === 'Sekretaris'
                                      ? 'Kelola administrasi, catat notulensi rapat, dan pastikan seluruh dokumen program kerja terarsip dengan baik.'
                                      : role === 'Superadmin'
                                        ? 'Pantau dan kelola seluruh aktivitas, program kerja, serta transparansi kas Komite dengan mudah dari panel ini.'
                                        : role === 'Korlas'
                                          ? 'Kelola pendataan siswa dan proses pengumpulan uang kas/donasi kelas Anda dengan efisien.'
                                          : role === 'Humas'
                                            ? 'Kelola informasi publik, publikasikan kabar terbaru, dan sebarkan dokumentasi kegiatan komite kepada orang tua.'
                                            : 'Pantau transparansi kas, agenda program kerja, dan hasil keputusan rapat secara mudah di sini.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Role Specific Dashboard */}
                {renderDashboard()}
            </div>
        </DashboardLayout>
    );
}
