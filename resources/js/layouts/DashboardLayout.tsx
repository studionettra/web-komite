import { usePage, Link } from '@inertiajs/react';
import {
    HouseLine,
    Briefcase,
    Users,
    Wallet,
    UserGear,
    ShieldCheck,
    SignOut,
    List,
    X,
    CalendarBlank,
    Gear,
    ImageSquare,
    Newspaper,
    Tag,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { useState, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import appLogo from '../../images/logo/logo-komite-alikhlash-jatipadang.png';
import FlashMessage from '../components/FlashMessage';

const GlobalAlertModal = lazy(() => import('../components/GlobalAlertModal'));

const NavLink = ({
    href,
    icon: Icon,
    children,
    pathname,
    onClick,
    external,
}: any) => {
    // Exact match for dashboard to prevent it from being active on other routes
    const isActive =
        href === '/dashboard' ? pathname === href : pathname.startsWith(href);
    const className = `group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${
        isActive
            ? 'bg-blue-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
    }`;

    if (external) {
        return (
            <a href={href} className={className} onClick={onClick}>
                <Icon
                    weight={isActive ? 'bold' : 'duotone'}
                    className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}
                />
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={onClick} className={className}>
            <Icon
                weight={isActive ? 'bold' : 'duotone'}
                className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}
            />
            {children}
        </Link>
    );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname =
        typeof window !== 'undefined' ? window.location.pathname : '';

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans antialiased md:flex-row">
            <Toaster position="top-right" />
            <FlashMessage />
            <Suspense fallback={null}>
                <GlobalAlertModal />
            </Suspense>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-100 bg-white/95 text-slate-800 shadow-[20px_0_40px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:w-72 md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 shadow-inner">
                            <img
                                src={appLogo}
                                alt="Logo"
                                className="h-7 w-7 object-contain drop-shadow-sm"
                            />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight text-slate-800">
                            Dashboard
                            <span className="text-blue-500"> Komite</span>
                        </span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={closeSidebar}
                        className="rounded-xl bg-slate-50 p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 md:hidden"
                    >
                        <X weight="bold" className="h-5 w-5" />
                    </button>
                </div>

                <nav className="custom-scrollbar flex-1 space-y-1.5 overflow-y-auto px-3 py-6">
                    <NavLink
                        href="/dashboard"
                        icon={HouseLine}
                        pathname={pathname}
                        onClick={closeSidebar}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href="/programs"
                        icon={Briefcase}
                        pathname={pathname}
                        onClick={closeSidebar}
                    >
                        Program
                    </NavLink>
                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Sekretaris') && (
                        <NavLink
                            href="/banners"
                            icon={ImageSquare}
                            pathname={pathname}
                            onClick={closeSidebar}
                        >
                            Manajemen Banner
                        </NavLink>
                    )}
                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Sekretaris') && (
                        <NavLink
                            href="/academic-calendar"
                            icon={CalendarBlank}
                            pathname={pathname}
                            onClick={closeSidebar}
                        >
                            Kalender Akademik
                        </NavLink>
                    )}
                    <NavLink
                        href="/meetings"
                        icon={Users}
                        pathname={pathname}
                        onClick={closeSidebar}
                    >
                        Notulensi Rapat
                    </NavLink>
                    <NavLink
                        href="/transactions"
                        icon={Wallet}
                        pathname={pathname}
                        onClick={closeSidebar}
                    >
                        Keuangan
                    </NavLink>

                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Bendahara') && (
                        <>
                            <NavLink
                                href="/settings"
                                icon={Gear}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Pengaturan Keuangan
                            </NavLink>
                        </>
                    )}

                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Sekretaris') && (
                        <NavLink
                            href="/activities"
                            icon={List}
                            pathname={pathname}
                            onClick={closeSidebar}
                        >
                            Riwayat Aktivitas
                        </NavLink>
                    )}

                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Humas') && (
                        <>
                            <div className="px-4 pt-6 pb-2">
                                <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                                    Menu Humas
                                </p>
                            </div>
                            <NavLink
                                href="/admin/posts"
                                icon={Newspaper}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Kelola Kabar
                            </NavLink>
                            <NavLink
                                href="/admin/categories"
                                icon={Tag}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Kategori Kabar
                            </NavLink>
                        </>
                    )}

                    {(auth?.user?.roles?.[0]?.name === 'Superadmin' ||
                        auth?.user?.roles?.[0]?.name === 'Korlas') && (
                        <>
                            <div className="px-4 pt-6 pb-2">
                                <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                                    Menu Korlas
                                </p>
                            </div>
                            <NavLink
                                href="/korlas/students"
                                icon={Users}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Data Siswa
                            </NavLink>
                            <NavLink
                                href="/korlas/collections"
                                icon={Wallet}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Rekap Kas
                            </NavLink>
                        </>
                    )}

                    {auth?.user?.roles?.[0]?.name === 'Superadmin' && (
                        <>
                            <div className="px-4 pt-6 pb-2">
                                <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                                    Pengaturan
                                </p>
                            </div>

                            <NavLink
                                href="/users"
                                icon={UserGear}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Pengguna
                            </NavLink>
                            <NavLink
                                href="/admin/classrooms"
                                icon={Users}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Data Kelas
                            </NavLink>
                            <NavLink
                                href="/roles"
                                icon={ShieldCheck}
                                pathname={pathname}
                                onClick={closeSidebar}
                            >
                                Role & Hak Akses
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="border-t border-slate-100 bg-slate-50/50 p-5">
                    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 font-bold text-white shadow-md">
                            {auth?.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <div className="truncate text-sm font-bold text-slate-700">
                                {auth?.user?.name || 'User'}
                            </div>
                            <div className="truncate text-xs font-medium text-slate-500">
                                {auth?.user?.roles?.[0]?.name || 'Member'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/profile"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-px hover:bg-slate-50 hover:text-blue-600 hover:shadow active:scale-[0.98]"
                            title="Profil Saya"
                        >
                            <UserGear weight="fill" className="h-4 w-4" />
                            <span className="truncate">Profil</span>
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-600 shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-rose-100 hover:shadow active:scale-[0.98]"
                            title="Keluar"
                        >
                            <SignOut weight="bold" className="h-4 w-4" />
                            <span className="truncate">Logout</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex flex-1 flex-col">
                {/* Mobile Header (Hamburger Menu) */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 py-3 backdrop-blur-xl md:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="-ml-2 rounded-xl bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                            <List weight="bold" className="h-6 w-6" />
                        </button>
                        <span className="font-extrabold text-slate-800">
                            Menu
                        </span>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-bold text-white shadow-sm">
                        {auth?.user?.name?.charAt(0) || 'U'}
                    </div>
                </header>

                <div className="flex-1 bg-slate-50 p-4 md:p-8">{children}</div>
            </main>
        </div>
    );
}
