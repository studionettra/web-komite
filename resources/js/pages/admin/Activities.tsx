import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ClockCounterClockwise, Trash, PencilSimple, Plus, ShieldCheck, User, CalendarBlank } from '@phosphor-icons/react';

const parseUserAgent = (ua: string) => {
    if (!ua || ua === '-') return '-';
    
    let browser = 'Unknown Browser';
    if (ua.includes('Firefox') || ua.includes('FxiOS')) browser = 'Firefox';
    else if (ua.includes('SamsungBrowser')) browser = 'Samsung Internet';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
    else if (ua.includes('Edg')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome') || ua.includes('CriOS')) browser = 'Google Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    
    let os = 'Unknown OS';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac OS')) os = 'Mac OS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    
    return `${browser} pada ${os}`;
};

const renderDescription = (activity: any) => {
    if (activity.log_name === 'finance_access' || activity.log_name === 'academic_access') {
        const status = activity.properties?.status === 'success' ? 'Berhasil' : 'Gagal';
        const accessType = activity.log_name === 'finance_access' ? 'keuangan' : 'kalender akademik';
        return (
            <div>
                <span className={`font-semibold ${status === 'Berhasil' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {status} mengakses {accessType}
                </span>
                <div className="mt-1 text-xs text-slate-500">
                    Nama Input: <span className="font-medium text-slate-700">{activity.properties?.input_name || '-'}</span> <br/>
                    Kelas: <span className="font-medium text-slate-700">{activity.properties?.classroom_name || `ID: ${activity.properties?.classroom_id}`}</span> <br/>
                    IP Address: <span className="font-medium text-slate-700">{activity.properties?.ip_address || '-'}</span> <br/>
                    Browser/OS: <span className="font-medium text-slate-700" title={activity.properties?.user_agent}>{parseUserAgent(activity.properties?.user_agent)}</span>
                </div>
            </div>
        );
    }

    if (activity.log_name === 'auth') {
        const isLogin = activity.description === 'login';
        return (
            <div>
                <span className={`font-semibold ${isLogin ? 'text-blue-600' : 'text-slate-600'}`}>
                    {isLogin ? 'Berhasil Login ke Sistem' : 'Logout dari Sistem'}
                </span>
                <div className="mt-1 text-xs text-slate-500">
                    IP Address: <span className="font-medium text-slate-700">{activity.properties?.ip_address || '-'}</span> <br/>
                    Browser/OS: <span className="font-medium text-slate-700" title={activity.properties?.user_agent}>{parseUserAgent(activity.properties?.user_agent)}</span>
                </div>
            </div>
        );
    }

    const actionMap: Record<string, { label: string, icon: any, color: string }> = {
        created: { label: 'Menambahkan data', icon: Plus, color: 'text-emerald-600' },
        updated: { label: 'Memperbarui data', icon: PencilSimple, color: 'text-blue-600' },
        deleted: { label: 'Menghapus data', icon: Trash, color: 'text-rose-600' },
    };
    const actionData = actionMap[activity.event];
    
    let subject = '';
    if (activity.subject_type) {
        const parts = activity.subject_type.split('\\');
        subject = parts[parts.length - 1];
    }

    let itemName = '';
    if (activity.properties?.attributes) {
        itemName = activity.properties.attributes.title || activity.properties.attributes.name || '';
    } else if (activity.properties?.old) {
        itemName = activity.properties.old.title || activity.properties.old.name || '';
    }

    return (
        <div className="flex items-start gap-3">
            {actionData ? (
                <div className={`mt-0.5 rounded-full p-1.5 bg-slate-50 ${actionData.color}`}>
                    <actionData.icon weight="bold" className="h-4 w-4" />
                </div>
            ) : (
                <div className="mt-0.5 rounded-full p-1.5 bg-slate-50 text-slate-400">
                    <ClockCounterClockwise weight="bold" className="h-4 w-4" />
                </div>
            )}
            <div>
                <span className="text-slate-700">{actionData ? actionData.label : activity.description}</span> <span className="font-medium">{subject}</span> {itemName ? <span className="font-semibold text-slate-900">"{itemName}"</span> : ''}
            </div>
        </div>
    );
};

export default function Activities({ activities }: { activities: any }) {
    return (
        <DashboardLayout>
            <Head title="Riwayat Aktivitas" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Riwayat Aktivitas
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Pantau semua aktivitas dan perubahan sistem.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">Waktu</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">Subjek</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">Aktivitas</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {activities.data.length > 0 ? activities.data.map((activity: any) => (
                                <tr key={activity.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <ClockCounterClockwise weight="duotone" className="h-4 w-4 text-slate-400" />
                                            {new Date(activity.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-900">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <User weight="fill" className="h-3 w-3" />
                                            </div>
                                            {activity.causer ? activity.causer.name : (activity.properties?.input_name || 'System / Guest')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {activity.log_name === 'finance_access' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                <ShieldCheck weight="bold" className="h-3.5 w-3.5" />
                                                Akses Keuangan
                                            </span>
                                        ) : activity.log_name === 'academic_access' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-700/10">
                                                <CalendarBlank weight="bold" className="h-3.5 w-3.5" />
                                                Akses Kalender
                                            </span>
                                        ) : activity.log_name === 'auth' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                <User weight="bold" className="h-3.5 w-3.5" />
                                                Otentikasi
                                            </span>
                                        ) : activity.event === 'created' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-700/10">
                                                <Plus weight="bold" className="h-3.5 w-3.5" />
                                                Dibuat
                                            </span>
                                        ) : activity.event === 'updated' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                <PencilSimple weight="bold" className="h-3.5 w-3.5" />
                                                Diperbarui
                                            </span>
                                        ) : activity.event === 'deleted' ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-700/10">
                                                <Trash weight="bold" className="h-3.5 w-3.5" />
                                                Dihapus
                                            </span>
                                        ) : (
                                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 capitalize ring-1 ring-inset ring-slate-500/10">
                                                {activity.event}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600 break-words max-w-sm">
                                        {renderDescription(activity)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                                        Belum ada aktivitas yang dicatat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {activities.links && activities.links.length > 3 && (
                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 flex justify-between items-center">
                        <div className="hidden sm:block text-sm font-medium text-slate-500">
                            Menampilkan <span className="font-semibold text-blue-600">{activities.from || 0}</span> sampai <span className="font-semibold text-blue-600">{activities.to || 0}</span> dari <span className="font-semibold text-slate-800">{activities.total || 0}</span> hasil
                        </div>
                        <nav className="isolate inline-flex -space-x-px rounded-2xl shadow-sm" aria-label="Pagination">
                            {activities.links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url || '#'}
                                    className={`relative inline-flex items-center px-4 py-2.5 text-sm font-bold transition-all duration-200 border ${
                                        link.active 
                                            ? 'z-10 bg-blue-500 text-white shadow-md border-blue-500' 
                                            : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:text-blue-600'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-px hover:z-10'} ${
                                        index === 0 ? 'rounded-l-2xl' : ''
                                    } ${
                                        index === activities.links.length - 1 ? 'rounded-r-2xl' : ''
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
