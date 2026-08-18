import { usePage } from '@inertiajs/react';
import { CheckCircle, Warning, XCircle, Info, X } from '@phosphor-icons/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { showDeleteSuccess } from '../utils/alertManager';

export default function FlashMessage() {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.alert) {
            const { type, title, message } = flash.alert;

            if (type === 'delete-success') {
                showDeleteSuccess(message || title);

                return;
            }

            // Kindergarten Custom Toast UI
            toast.custom(
                (t) => (
                    <div
                        className={`${
                            t.visible
                                ? 'animate-enter scale-100'
                                : 'animate-leave scale-95 opacity-0'
                        } pointer-events-auto flex w-full max-w-sm transform rounded-2xl border-2 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                            type === 'success'
                                ? 'border-emerald-300'
                                : type === 'error'
                                  ? 'border-red-300'
                                  : type === 'warning'
                                    ? 'border-amber-300'
                                    : 'border-blue-300'
                        }`}
                    >
                        <div className="w-0 flex-1 p-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    {type === 'success' && (
                                        <CheckCircle
                                            weight="fill"
                                            className="h-7 w-7 text-emerald-500 drop-shadow-sm"
                                        />
                                    )}
                                    {type === 'error' && (
                                        <XCircle
                                            weight="fill"
                                            className="h-7 w-7 text-red-500 drop-shadow-sm"
                                        />
                                    )}
                                    {type === 'warning' && (
                                        <Warning
                                            weight="fill"
                                            className="h-7 w-7 text-amber-500 drop-shadow-sm"
                                        />
                                    )}
                                    {(!type || type === 'info') && (
                                        <Info
                                            weight="fill"
                                            className="h-7 w-7 text-blue-500 drop-shadow-sm"
                                        />
                                    )}
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-base leading-tight font-semibold text-slate-800">
                                        {title}
                                    </p>
                                    {message && (
                                        <p className="mt-0.5 text-xs leading-snug font-bold text-slate-500">
                                            {message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l-2 border-slate-100/50">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="flex w-full items-center justify-center rounded-r-xl border border-transparent px-3 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 focus:outline-none"
                            >
                                <X weight="bold" className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ),
                {
                    duration: 4000,
                    position: 'top-right',
                },
            );
        }
    }, [flash]);

    return null;
}
