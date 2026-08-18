import { Head } from '@inertiajs/react';
import { UsersThree, Smiley, Backpack, Confetti } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Static image imports from resources/images
import anggotaHumasMamaFath from '../../../images/komite/anggota-humas-mama-fath.jpeg';
import anggotaHumasMamaThariq from '../../../images/komite/anggota-humas-mama-thariq.jpeg';
import anggotaKonsumsiMamaRayya from '../../../images/komite/anggota-konsumsi-mama-rayya.jpeg';
import anggotaKonsumsiMamaRyu from '../../../images/komite/anggota-konsumsi-mama-ryu.jpeg';
import anggotaSosmedMamaBaarik from '../../../images/komite/anggota-sosmed-mama-baarik.jpeg';
import anggotaSosmedMamaShanum from '../../../images/komite/angota-sosmed-mama-shanum.jpeg';
import bendaharaMamaSarah from '../../../images/komite/bendahara-mama-sarah.jpeg';
import kepalaSekolah from '../../../images/komite/kepala-sekolah-Ibu-Rifdah, S.Pd..jpg';
import ketuaKomiteMamaUna from '../../../images/komite/ketua-komite-mama-una.jpeg';
import ketuaKonsumsiMamaRazka from '../../../images/komite/ketua-konsumsi-mama-razka.jpeg';
import ketuaSosmedMamaAthar from '../../../images/komite/ketua-sosmed-mama-athar.jpeg';
import sekretarisMamaDaania from '../../../images/komite/sekretaris-mama-daania.jpeg';
import wakilKetuaMamaGhani from '../../../images/komite/wakil-ketua-mama-ghani.jpeg';
import PublicLayout from '../../layouts/PublicLayout';

export default function Organization() {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => setIsLoaded(true), []);

    const pengurus = [
        {
            title: 'Kepala Sekolah',
            members: [
                {
                    role: 'Kepala Sekolah',
                    name: 'Ibu Rifda, S.Pd.',
                    image: kepalaSekolah,
                },
            ],
        },
        {
            title: 'Pengurus Harian',
            members: [
                {
                    role: 'Ketua',
                    name: 'Eka Putri Rahayu (Una - BL2)',
                    image: ketuaKomiteMamaUna,
                },
                {
                    role: 'Wakil Ketua',
                    name: 'Noval Aysha Pratiwi (Ghani - BL1)',
                    image: wakilKetuaMamaGhani,
                },
                {
                    role: 'Sekretaris',
                    name: 'Denissa Indriana (Daania - KBIT)',
                    image: sekretarisMamaDaania,
                },
                {
                    role: 'Bendahara',
                    name: 'Karima Salsabila (Sarah - B)',
                    image: bendaharaMamaSarah,
                },
            ],
        },
        {
            title: 'Bidang Media Sosial',
            members: [
                {
                    role: 'Ketua',
                    name: 'Novita Diah Lestari (Athar - KBIT)',
                    image: ketuaSosmedMamaAthar,
                },
                {
                    role: 'Anggota',
                    name: 'Widiya Juliana (Shanum - BL1)',
                    image: anggotaSosmedMamaShanum,
                },
                {
                    role: 'Anggota',
                    name: 'Rosmanih (Baarik - B)',
                    image: anggotaSosmedMamaBaarik,
                },
            ],
        },
        {
            title: 'Bidang Konsumsi',
            members: [
                {
                    role: 'Ketua',
                    name: 'Rahmawati (Razka - BL2)',
                    image: ketuaKonsumsiMamaRazka,
                },
                {
                    role: 'Anggota',
                    name: 'Tuti Alawiyah (Ryu - A1)',
                    image: anggotaKonsumsiMamaRyu,
                },
                {
                    role: 'Anggota',
                    name: 'Nabila Rivmi (Rayya - A1)',
                    image: anggotaKonsumsiMamaRayya,
                },
            ],
        },
        {
            title: 'Bidang Humas',
            members: [
                {
                    role: 'Ketua',
                    name: 'Nurlaila Zahra (Fath - A2)',
                    image: anggotaHumasMamaFath,
                },
                {
                    role: 'Anggota',
                    name: 'Kunairoh (Thariq - A2)',
                    image: anggotaHumasMamaThariq,
                },
            ],
        },
    ];

    const getInitials = (name: string) => {
        const match = name.match(/\(([^)]+)\)/);

        if (match) {
            return match[1].charAt(0).toUpperCase();
        }

        return (
            name.split(' ')[1]?.charAt(0).toUpperCase() ||
            name.charAt(0).toUpperCase()
        );
    };

    return (
        <PublicLayout>
            <Head>
                <title>
                    Susunan Pengurus - Komite KBIT-TKIT Al-Ikhlash Pasar Minggu
                </title>
                <meta
                    name="description"
                    content="Profil dan susunan pengurus Komite KBIT-TKIT Al-Ikhlash Pasar Minggu. Kenali tim yang berdedikasi mendukung pendidikan anak Anda."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative z-0 overflow-hidden border-b-[6px] border-dashed border-sky-200 bg-sky-50 pt-28 pb-16 text-center sm:pt-32 sm:pb-24">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-300/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-sky-300/20 mix-blend-multiply blur-3xl"></div>

                {/* Animated Background Icons in Bubbles */}
                <div
                    className={`absolute top-10 -left-4 -z-10 origin-bottom-right transition-all delay-100 duration-1000 ease-out md:top-20 md:left-[10%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-15deg] opacity-80' : 'translate-x-[-20%] translate-y-[20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-100 shadow-lg shadow-blue-200/50 md:h-28 md:w-28 md:rounded-[2rem]">
                        <UsersThree
                            weight="duotone"
                            className="h-10 w-10 text-blue-500 transition-transform hover:scale-110 md:h-14 md:w-14"
                        />
                    </div>
                </div>
                <div
                    className={`absolute -right-4 bottom-10 -z-10 origin-top-left transition-all delay-300 duration-1000 ease-out md:right-[12%] md:bottom-20 ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[20deg] opacity-80' : 'translate-x-[20%] translate-y-[-20%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-lg shadow-pink-200/50 md:h-24 md:w-24">
                        <Confetti
                            weight="duotone"
                            className="h-8 w-8 text-pink-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>
                <div
                    className={`absolute top-20 -right-2 -z-10 origin-bottom-left transition-all delay-500 duration-1000 ease-out md:top-24 md:right-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[15deg] opacity-90' : 'translate-x-[20%] translate-y-[-10%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 shadow-lg shadow-yellow-200/50 md:h-20 md:w-20">
                        <Smiley
                            weight="duotone"
                            className="h-8 w-8 text-yellow-500 transition-transform hover:scale-110 md:h-10 md:w-10"
                        />
                    </div>
                </div>
                <div
                    className={`absolute bottom-20 -left-2 -z-10 origin-top-right transition-all delay-700 duration-1000 ease-out md:bottom-24 md:left-[15%] ${isLoaded ? 'translate-x-0 translate-y-0 scale-100 rotate-[-10deg] opacity-80' : 'translate-x-[-30%] translate-y-[30%] scale-50 rotate-0 opacity-0'}`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 shadow-lg shadow-emerald-200/50 md:h-24 md:w-24 md:rounded-[2rem]">
                        <Backpack
                            weight="duotone"
                            className="h-8 w-8 text-emerald-500 transition-transform hover:scale-110 md:h-12 md:w-12"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-10"
                    >
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:mb-6 sm:text-5xl">
                            Struktur Kepengurusan
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-lg">
                            Mengenal lebih dekat para pengurus Komite KBIT-TKIT
                            Al-Ikhlash Pasar Minggu Periode 2026-2027 yang
                            berdedikasi tinggi untuk kemajuan peserta didik dan
                            sekolah.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Structure Grid */}
            <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-20 sm:pb-32">
                {/* Modern Grid Background */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:4rem_4rem]"></div>

                {/* Seamless Gradient from Hero */}
                <div className="absolute top-0 right-0 left-0 -z-10 h-40 bg-gradient-to-b from-sky-50 to-transparent"></div>

                {/* Playful Background Elements */}
                <div className="absolute top-1/4 -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-blue-200/30 mix-blend-multiply blur-3xl"></div>
                <div className="absolute -right-32 bottom-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-yellow-200/20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute top-3/4 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-pink-200/20 mix-blend-multiply blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {pengurus.map((divisi, idx) => (
                        <div
                            key={idx}
                            className="border-b-2 border-dashed border-slate-200 py-12 last:border-0 sm:py-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="mb-10 sm:mb-16"
                            >
                                <h2 className="flex items-center justify-center gap-3 text-center text-2xl font-extrabold tracking-tight text-slate-800 sm:justify-start sm:text-3xl">
                                    <div className="h-4 w-4 shrink-0 rounded-full bg-linear-to-tr from-pink-400 to-orange-400 shadow-sm shadow-pink-500/40"></div>
                                    {divisi.title}
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
                                {divisi.members.map((member, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{
                                            once: true,
                                            margin: '-50px',
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.15,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                        className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2 sm:items-start"
                                    >
                                        <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-4 border-transparent bg-slate-50 shadow-sm transition-all duration-500 group-hover:border-sky-100 group-hover:shadow-xl group-hover:shadow-sky-500/10 sm:mb-6 sm:rounded-[2.5rem]">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                                                        member.role ===
                                                        'Kepala Sekolah'
                                                            ? 'scale-[1.6] object-[center_15%] group-hover:scale-[1.7]'
                                                            : 'object-center group-hover:scale-[1.15]'
                                                    }`}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-5xl font-extrabold text-slate-300 transition-colors duration-500 group-hover:bg-sky-50 group-hover:text-sky-400">
                                                    {getInitials(member.name)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
                                            <h3 className="text-sm leading-tight font-extrabold text-slate-800 transition-colors group-hover:text-sky-600 sm:text-base">
                                                {member.name}
                                            </h3>
                                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-hover:bg-sky-100 group-hover:text-sky-700">
                                                {member.role}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
