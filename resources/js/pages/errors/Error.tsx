import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ErrorPage({ status }: { status: number }) {
    const title =
        {
            503: '503',
            500: '500',
            404: '404',
            403: '403',
        }[status] || 'Error';

    const description =
        {
            503: 'Layanan sedang dalam perbaikan. Kami akan segera kembali.',
            500: 'Oops, terjadi kesalahan pada sistem kami. Coba lagi beberapa saat lagi.',
            404: 'Halaman tidak ditemukan. Mungkin alamatnya salah ketik atau halamannya sudah dipindah.',
            403: 'Maaf, Anda tidak memiliki akses ke halaman ini.',
        }[status] || 'Terjadi kesalahan tak terduga.';

    const heading =
        {
            503: 'Sedang Perbaikan',
            500: 'Kesalahan Sistem',
            404: 'Halaman Hilang',
            403: 'Akses Ditolak',
        }[status] || 'Terjadi Kesalahan';

    // Abstract Shapes for background (Kindergarten Theme)
    const shapes = [
        {
            color: 'bg-yellow-400',
            size: 'w-64 h-64',
            position: '-top-10 -left-20',
            borderRadius: 'rounded-full',
            animate: { y: [0, 20, 0], rotate: [0, 10, -10, 0] },
            duration: 8,
        },
        {
            color: 'bg-teal-400',
            size: 'w-48 h-48',
            position: 'top-20 -right-10',
            borderRadius: 'rounded-[40px]',
            animate: { y: [0, -30, 0], rotate: [0, -15, 10, 0] },
            duration: 9,
        },
        {
            color: 'bg-rose-400',
            size: 'w-56 h-56',
            position: '-bottom-16 -left-10',
            borderRadius: 'rounded-[60px]',
            animate: { y: [0, -20, 0], rotate: [0, 20, -10, 0] },
            duration: 10,
        },
        {
            color: 'bg-blue-300',
            size: 'w-40 h-40',
            position: 'bottom-10 right-10',
            borderRadius: 'rounded-full',
            animate: { y: [0, 15, 0], rotate: [0, -20, 15, 0] },
            duration: 7,
        },
    ];

    return (
        <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-orange-50/50 font-sans selection:bg-teal-200">
            <Head title={heading} />

            {/* Background Abstract Floating Shapes */}
            <div className="pointer-events-none absolute inset-0 opacity-30 blur-3xl sm:opacity-50 sm:blur-[60px]">
                {shapes.map((shape, i) => (
                    <motion.div
                        key={i}
                        className={`absolute ${shape.size} ${shape.position} ${shape.color} ${shape.borderRadius}`}
                        animate={shape.animate}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-lg px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative mb-6 inline-block">
                        <span className="text-[120px] leading-none font-black text-slate-800 drop-shadow-sm sm:text-[160px]">
                            {title}
                        </span>

                        {/* Playful indicator dots matching the status */}
                        <motion.div
                            className="absolute -top-4 -right-8 h-12 w-12 rounded-full bg-rose-400"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-4 -left-4 h-6 w-6 rounded-full bg-yellow-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: 0.5,
                            }}
                        />
                    </div>

                    <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
                        {heading}
                    </h1>

                    <p className="mx-auto mb-10 max-w-sm text-lg leading-relaxed text-slate-600">
                        {description}
                    </p>

                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95"
                        >
                            Kembali ke Beranda
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
