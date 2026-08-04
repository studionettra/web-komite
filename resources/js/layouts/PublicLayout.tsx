import { Link, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
    House,
    Users,
    Briefcase,
    Wallet,
    SignIn,
    MapPin,
    EnvelopeSimple,
    Phone,
    WhatsappLogo,
    Book,
    Backpack,
    Pencil,
    Smiley,
    PaperPlaneTilt,
    Star,
    Sun,
} from '@phosphor-icons/react';
import { Toaster } from 'react-hot-toast';
import appLogo from '../../images/logo/logo-komite-alikhlash-jatipadang.png';
import FlashMessage from '../components/FlashMessage';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { url } = usePage();
    const footerRef = useRef(null);
    const isLoaded = useInView(footerRef, { once: true, amount: 0.2 });

    const navLinkClass = (path: string) =>
        `transition-colors font-medium ${url === path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
            <Toaster position="top-right" />
            <FlashMessage />

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md transition-all duration-300">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4 sm:px-6 md:justify-between lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5 sm:gap-3"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                                <img
                                    src={appLogo}
                                    alt="Logo Komite"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="mb-1 text-[8.5px] leading-none font-bold tracking-widest text-slate-500 uppercase sm:text-[10px]">
                                    Komite KBIT-TKIT
                                </span>
                                <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-[11px] leading-none font-extrabold whitespace-nowrap text-transparent transition-all duration-300 group-hover:to-blue-600 sm:text-sm">
                                    Al-Ikhlash Pasar Minggu
                                </span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden items-center gap-8 text-sm md:flex">
                        <Link href="/" className={navLinkClass('/')}>
                            Beranda
                        </Link>
                        <Link
                            href="/pengurus"
                            className={navLinkClass('/pengurus')}
                        >
                            Pengurus
                        </Link>
                        <Link
                            href="/program"
                            className={navLinkClass('/program')}
                        >
                            Program
                        </Link>
                        <Link
                            href="/keuangan"
                            className={navLinkClass('/keuangan')}
                        >
                            Keuangan
                        </Link>
                    </nav>

                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/login"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-all hover:-translate-y-px hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200 active:scale-95"
                            title="Login Pengurus"
                        >
                            <SignIn weight="bold" className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pb-16 md:pb-0">{children}</main>

            {/* Footer */}
            {!url.startsWith('/login') && (
                <footer
                    ref={footerRef}
                    className="relative z-0 mt-auto overflow-hidden border-t-[6px] border-dashed border-sky-200 bg-sky-50 pt-16 pb-44 md:pb-12"
                >
                    {/* Animated Background Icons */}
                    <div
                        className={`absolute top-4 left-10 -z-10 origin-bottom-right text-yellow-400 transition-all delay-100 duration-1000 ease-out ${isLoaded ? '-translate-x-[20%] translate-y-[20%] scale-100 rotate-[-15deg] opacity-70' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Sun
                            weight="duotone"
                            className="h-28 w-28 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute top-10 right-[15%] -z-10 origin-bottom-left text-sky-400 transition-all delay-300 duration-1000 ease-out ${isLoaded ? '-translate-x-[50%] -translate-y-[20%] scale-100 rotate-[10deg] opacity-70' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <PaperPlaneTilt
                            weight="duotone"
                            className="h-24 w-24 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute bottom-20 left-[20%] -z-10 origin-top-left text-emerald-400 transition-all delay-500 duration-1000 ease-out ${isLoaded ? 'translate-x-[50%] -translate-y-[20%] scale-100 rotate-[25deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Smiley
                            weight="duotone"
                            className="h-32 w-32 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute right-10 bottom-10 -z-10 origin-top-right text-pink-400 transition-all delay-700 duration-1000 ease-out ${isLoaded ? '-translate-x-[30%] -translate-y-[30%] scale-100 rotate-[-20deg] opacity-70' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Backpack
                            weight="duotone"
                            className="h-28 w-28 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute top-1/2 right-[5%] -z-10 origin-center text-yellow-500 transition-all delay-[900ms] duration-1000 ease-out ${isLoaded ? 'translate-x-[10%] -translate-y-[50%] scale-100 rotate-[45deg] opacity-80' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Star
                            weight="duotone"
                            className="h-20 w-20 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute bottom-4 left-4 -z-10 origin-center text-purple-400 transition-all delay-[1100ms] duration-1000 ease-out ${isLoaded ? 'translate-x-[20%] -translate-y-[20%] scale-100 rotate-[-15deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Pencil
                            weight="duotone"
                            className="h-24 w-24 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>
                    <div
                        className={`absolute top-1/3 left-4 -z-10 origin-center text-blue-400 transition-all delay-[1300ms] duration-1000 ease-out ${isLoaded ? 'translate-x-[30%] translate-y-[10%] scale-100 rotate-[15deg] opacity-60' : 'translate-x-0 translate-y-0 scale-50 rotate-0 opacity-0'}`}
                    >
                        <Book
                            weight="duotone"
                            className="h-20 w-20 cursor-default drop-shadow-sm transition-transform hover:scale-110"
                        />
                    </div>

                    <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 grid grid-cols-1 gap-8 rounded-[2rem] border border-white bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                            {/* Column 1: Visi Misi */}
                            <div className="space-y-4">
                                <p className="mt-8 text-justify text-sm leading-relaxed text-slate-600">
                                    <strong>Komite TKIT Al-Ikhlash</strong>{' '}
                                    hadir sebagai jembatan integritas antara
                                    pihak sekolah dan orang tua. Kami
                                    berkomitmen memberikan kebermanfaatan
                                    melalui program sosial, menjaga transparansi
                                    keuangan, serta membangun alur komunikasi
                                    yang berkesinambungan demi menunjang
                                    optimalisasi perkembangan siswa.
                                </p>
                            </div>

                            {/* Column 2: Kontak & Alamat */}
                            <div>
                                <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-800 uppercase">
                                    Kontak TKIT Al-Ikhlash
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <div className="shrink-0 rounded-full bg-blue-100 p-2">
                                            <MapPin
                                                weight="fill"
                                                className="h-4 w-4 text-blue-600"
                                            />
                                        </div>
                                        <span className="mt-1 leading-relaxed">
                                            Jl. Raya Ragunan No.11 2, RT.4/RW.3,
                                            Jati Padang, Ps. Minggu, Kota
                                            Jakarta Selatan, Daerah Khusus
                                            Ibukota Jakarta 12540
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="shrink-0 rounded-full bg-sky-100 p-2">
                                            <EnvelopeSimple
                                                weight="fill"
                                                className="h-4 w-4 text-sky-600"
                                            />
                                        </div>
                                        <a
                                            href="mailto:alikhlash.pm@gmail.com"
                                            className="mt-0.5 transition-colors hover:text-blue-600"
                                        >
                                            alikhlash.pm@gmail.com
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="shrink-0 rounded-full bg-indigo-100 p-2">
                                            <Phone
                                                weight="fill"
                                                className="h-4 w-4 text-indigo-600"
                                            />
                                        </div>
                                        <a
                                            href="tel:0217817879"
                                            className="mt-0.5 transition-colors hover:text-indigo-600"
                                        >
                                            021-7817879
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="shrink-0 rounded-full bg-emerald-100 p-2">
                                            <WhatsappLogo
                                                weight="fill"
                                                className="h-4 w-4 text-emerald-600"
                                            />
                                        </div>
                                        <a
                                            href="https://wa.me/6285888842519"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-0.5 transition-colors hover:text-emerald-600"
                                        >
                                            085888842519
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: Maps */}
                            <div>
                                <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-800 uppercase">
                                    Lokasi TKIT Al-Ikhlash
                                </h3>
                                <div className="group relative h-48 overflow-hidden rounded-2xl border-4 border-white shadow-sm ring-1 ring-slate-100">
                                    <div className="pointer-events-none absolute inset-0">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8290979778344!2d106.8294313!3d-6.2861827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f21a803622c1%3A0x6a0f39f910c09389!2sTKIT%20TPA%20Al-Ikhlas!5e0!3m2!1sen!2sid!4v1785754314231!5m2!1sen!2sid"
                                            className="h-full w-full border-0"
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Peta Lokasi TKIT Al-Ikhlash"
                                        ></iframe>
                                    </div>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=-6.2861827,106.8294313"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10"
                                        aria-label="Buka di Google Maps"
                                        title="Buka Peta di Google Maps"
                                    >
                                        <div className="flex scale-95 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-slate-700 opacity-0 shadow-md backdrop-blur-sm transition-all group-hover:scale-100 group-hover:opacity-100">
                                            Buka Maps
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t-2 border-sky-100 pt-6 text-center text-sm font-medium text-slate-500 sm:flex-row">
                            <span className="order-2 sm:order-1 sm:w-1/3 sm:text-left">
                                &copy; {new Date().getFullYear()} Hak Cipta
                                Dilindungi.
                            </span>
                            
                            <div className="order-1 flex items-center justify-center gap-4 font-bold sm:order-2 sm:w-1/3">
                                <Link href="/kebijakan-privasi" className="text-slate-600 hover:text-blue-600 transition-colors">
                                    Kebijakan Privasi
                                </Link>
                                <span className="text-slate-300">|</span>
                                <Link href="/syarat-dan-ketentuan" className="text-slate-600 hover:text-blue-600 transition-colors">
                                    Syarat &amp; Ketentuan
                                </Link>
                            </div>

                            <span className="order-3 sm:w-1/3 sm:text-right">
                                Powered by{' '}
                                <a
                                    href="https://www.instagram.com/studionettra"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-sky-600 transition-colors hover:text-blue-600"
                                >
                                    Studio Nettra
                                </a>
                            </span>
                        </div>
                    </div>
                </footer>
            )}

            {/* Mobile Bottom Navigation (Floating Glass Pill) */}
            <div
                className="pointer-events-none fixed bottom-0 left-0 z-50 w-full px-4 md:hidden"
                style={{
                    paddingBottom:
                        'calc(1.25rem + env(safe-area-inset-bottom))',
                }}
            >
                <nav className="pointer-events-auto overflow-hidden rounded-[1.25rem] border border-white/60 bg-white/75 shadow-2xl shadow-slate-300/40 backdrop-blur-xl">
                    <div className="flex h-17 items-center justify-around px-1">
                        <Link
                            href="/"
                            className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${url === '/' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <House
                                size={24}
                                weight={url === '/' ? 'fill' : 'regular'}
                            />
                            <span className="text-[10px] font-medium">
                                Beranda
                            </span>
                        </Link>
                        <Link
                            href="/pengurus"
                            className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${url === '/pengurus' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Users
                                size={24}
                                weight={
                                    url === '/pengurus' ? 'fill' : 'regular'
                                }
                            />
                            <span className="text-[10px] font-medium">
                                Pengurus
                            </span>
                        </Link>
                        <Link
                            href="/program"
                            className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${url.startsWith('/program') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Briefcase
                                size={24}
                                weight={
                                    url.startsWith('/program')
                                        ? 'fill'
                                        : 'regular'
                                }
                            />
                            <span className="text-[10px] font-medium">
                                Program
                            </span>
                        </Link>
                        <Link
                            href="/keuangan"
                            className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${url.startsWith('/keuangan') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Wallet
                                size={24}
                                weight={
                                    url.startsWith('/keuangan')
                                        ? 'fill'
                                        : 'regular'
                                }
                            />
                            <span className="text-[10px] font-medium">
                                Keuangan
                            </span>
                        </Link>
                        <Link
                            href="/login"
                            className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${url === '/login' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <SignIn
                                size={24}
                                weight={url === '/login' ? 'fill' : 'regular'}
                            />
                            <span className="text-[10px] font-medium">
                                Login
                            </span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}
