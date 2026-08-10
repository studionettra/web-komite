import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ModalState = {
    isOpen: boolean;
    mode: 'confirm' | 'success';
    message: string;
    onConfirm?: () => void;
};

export default function GlobalAlertModal() {
    const [state, setState] = useState<ModalState>({
        isOpen: false,
        mode: 'confirm',
        message: '',
    });

    useEffect(() => {
        const handleConfirm = (e: any) => {
            setState({
                isOpen: true,
                mode: 'confirm',
                message: e.detail.message,
                onConfirm: e.detail.onConfirm,
            });
        };

        const handleSuccess = (e: any) => {
            setState({
                isOpen: true,
                mode: 'success',
                message: e.detail.message,
            });

            // Automatically close success modal after 3 seconds
            setTimeout(() => {
                setState((prev) =>
                    prev.mode === 'success' ? { ...prev, isOpen: false } : prev,
                );
            }, 3000);
        };

        window.addEventListener('open-confirm-modal', handleConfirm);
        window.addEventListener('show-delete-success-modal', handleSuccess);

        return () => {
            window.removeEventListener('open-confirm-modal', handleConfirm);
            window.removeEventListener(
                'show-delete-success-modal',
                handleSuccess,
            );
        };
    }, []);

    const close = () => {
        setState((prev) => ({ ...prev, isOpen: false }));
    };

    const confirm = () => {
        if (state.onConfirm) {
            state.onConfirm();
        }

        close();
    };

    return (
        <AnimatePresence>
            {state.isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={state.mode === 'confirm' ? close : undefined}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.5,
                            duration: 0.4,
                        }}
                        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-5"
                    >
                        {state.mode === 'confirm' ? (
                            <>
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-inner">
                                    <WarningCircle
                                        weight="fill"
                                        className="h-8 w-8 drop-shadow-sm"
                                    />
                                </div>
                                <h3 className="mb-3 text-2xl font-semibold text-slate-800">
                                    Konfirmasi Hapus
                                </h3>
                                <p className="mb-8 text-sm leading-relaxed font-bold text-slate-500">
                                    {state.message}
                                </p>
                                <div className="mt-8 flex w-full gap-3">
                                    <button
                                        onClick={close}
                                        className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition-all hover:-translate-y-1 hover:bg-slate-200 active:scale-95"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirm}
                                        className="flex-1 rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_15px_rgba(244,63,94,0.3)] transition-all hover:-translate-y-1 hover:bg-rose-600 hover:shadow-sm active:scale-95"
                                    >
                                        Ya, Hapus
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.6,
                                        delay: 0.1,
                                    }}
                                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 shadow-inner"
                                >
                                    <CheckCircle
                                        weight="fill"
                                        className="h-8 w-8 drop-shadow-sm"
                                    />
                                </motion.div>
                                <h3 className="mb-3 text-2xl font-semibold text-slate-800">
                                    Berhasil!
                                </h3>
                                <p className="mb-8 text-sm leading-relaxed font-bold text-slate-500">
                                    {state.message}
                                </p>
                                <button
                                    onClick={close}
                                    className="mt-6 w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition-all hover:-translate-y-1 hover:bg-slate-200 active:scale-95"
                                >
                                    Tutup
                                </button>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
