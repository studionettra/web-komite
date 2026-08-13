import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import {
    UsersThree,
    CalendarBlank,
    ListChecks,
    PencilSimple,
    Trash,
    Note,
    CheckCircle,
    X,
    CaretDown,
    Paperclip,
    FilePdf,
    Image as ImageIcon,
    WhatsappLogo,
    Plus,
} from '@phosphor-icons/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { confirmDelete } from '../../utils/alertManager';

const COMMITTEE_MEMBERS = [
    'Mama Una BL2 (Eka)',
    'Mama Gani BL1 (Nova)',
    'Mama Daania KBIT (Denissa)',
    'Mama Sarah B (Rima)',
    'Mama Athar B (Vita)',
    'Mama Shanum BL1 (Widya)',
    'Mama Baarik B (Rosmanih)',
    'Mama Thariq A2 (Kunairoh)',
    'Mama Fath A2 (Sarah)',
    'Mama Razka BL2 (Rahma)',
    'Mama Rayya A1 (Bella)',
    'Mama Ryu A1 (Tuti A.)',
];

export default function MeetingsIndex({ meetings }: { meetings: any }) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.roles?.[0]?.name;
    const isAnggota = userRole === 'Anggota Komite';
    const canManageMeeting = ['Superadmin', 'Sekretaris'].includes(userRole);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attendeeSearch, setAttendeeSearch] = useState('');

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            date: '',
            agenda: '',
            attendees: '',
            decisions: '',
            follow_up: '',
            documents: [] as File[],
        });

    const selectedAttendees = data.attendees
        ? data.attendees
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
        : [];

    const toggleAttendee = (name: string) => {
        let newSelected;

        if (selectedAttendees.includes(name)) {
            newSelected = selectedAttendees.filter((a) => a !== name);
        } else {
            newSelected = [...selectedAttendees, name];
        }

        setData('attendees', newSelected.join(', '));
    };

    const selectAllAttendees = () => {
        setData('attendees', COMMITTEE_MEMBERS.join(', '));
    };

    const deselectAllAttendees = () => {
        setData('attendees', '');
    };

    const filteredMembers = COMMITTEE_MEMBERS.filter((name) =>
        name.toLowerCase().includes(attendeeSearch.toLowerCase()),
    );

    const openCreate = () => {
        setIsEditing(false);
        setEditingId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEdit = (meeting: any) => {
        setIsEditing(true);
        setEditingId(meeting.id);
        clearErrors();
        setData({
            date: meeting.date ? meeting.date.split('T')[0] : '',
            agenda: meeting.agenda,
            attendees: meeting.attendees || '',
            decisions: meeting.decisions,
            follow_up: meeting.follow_up || '',
            documents: [],
        });
        setIsModalOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && editingId) {
            router.post(
                `/meetings/${editingId}`,
                {
                    ...data,
                    _method: 'put',
                },
                {
                    onSuccess: () => {
                        reset();
                        setIsEditing(false);
                        setEditingId(null);
                        setIsModalOpen(false);
                    },
                    preserveScroll: true,
                },
            );
        } else {
            post('/meetings', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
                preserveScroll: true,
            });
        }
    };

    const deleteMeeting = (id: number, agenda: string) => {
        confirmDelete(`Hapus notulensi untuk agenda: ${agenda}?`, () => {
            router.delete(`/meetings/${id}`);
        });
    };

    const shareToWhatsApp = (meeting: any) => {
        const formattedDate = meeting.date
            ? new Date(meeting.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              })
            : '-';

        let text = `*NOTULENSI RAPAT KOMITE*\n`;
        text += `*Tanggal:* ${formattedDate}\n`;
        text += `*Agenda:* ${meeting.agenda}\n\n`;

        if (meeting.attendees) {
            text += `*Daftar Hadir:*\n`;
            const attendeesArray = meeting.attendees
                .split(',')
                .map((a: string) => a.trim());
            attendeesArray.forEach((a: string) => {
                text += `- ${a}\n`;
            });
            text += `\n`;
        }

        if (meeting.decisions) {
            text += `*Hasil Keputusan:*\n${meeting.decisions}\n\n`;
        }

        if (meeting.follow_up) {
            text += `*Tindak Lanjut:*\n${meeting.follow_up}\n\n`;
        }

        if (meeting.documents && meeting.documents.length > 0) {
            text += `*Lampiran Dokumen:*\n`;
            meeting.documents.forEach((doc: any) => {
                // Ensure absolute URL
                const fileUrl = new URL(
                    `/storage/${doc.file_path}`,
                    window.location.origin,
                ).href;
                text += `${fileUrl}\n`;
            });
        }

        const encodedText = encodeURIComponent(text);

        // Cek limitasi kasar, jika lebih dari 2000 char mungkin bermasalah di beberapa browser
        if (encodedText.length > 4000) {
            // Fallback copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert(
                    'Teks terlalu panjang untuk link WhatsApp, namun teks telah berhasil di-copy. Silakan paste secara manual di WhatsApp.',
                );
            });
            return;
        }

        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    };

    return (
        <DashboardLayout>
            <Head title="Notulensi Rapat" />

            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                        Notulensi Rapat
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Catat keputusan dan tindak lanjut dari setiap pertemuan
                        komite.
                    </p>
                </div>
                {canManageMeeting && (
                    <button
                        onClick={openCreate}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-md active:translate-y-0 sm:w-auto"
                    >
                        <Plus weight="bold" className="h-5 w-5" />
                        <span>Catat Notulensi</span>
                    </button>
                )}
            </div>

            {canManageMeeting && isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar transform rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8">
                        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <Note weight="duotone" className="h-6 w-6 text-blue-600" />
                                {isEditing ? 'Edit Notulensi' : 'Catat Notulensi'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X weight="bold" className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="space-y-6 px-8 py-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tanggal
                                    </label>
                                    <input
                                        type={data.date ? 'date' : 'text'}
                                        placeholder="dd/mm/yyyy"
                                        value={data.date}
                                        onFocus={(e: any) => {
                                            e.target.type = 'date';
                                            if (e.target.showPicker) {
                                                e.target.showPicker();
                                            }
                                        }}
                                        onBlur={(e: any) => {
                                            if (!e.target.value) {
                                                e.target.type = 'text';
                                            }
                                        }}
                                        onClick={(e: any) => {
                                            if (e.target.type === 'date' && e.target.showPicker) {
                                                e.target.showPicker();
                                            }
                                        }}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        required
                                    />
                                    {errors.date && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Agenda Utama
                                    </label>
                                    <input
                                        type="text"
                                        value={data.agenda}
                                        onChange={(e) => setData('agenda', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Contoh: Rapat Koordinasi Tahunan"
                                        required
                                    />
                                    {errors.agenda && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.agenda}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="relative">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Daftar Hadir
                                    </label>

                                    <div
                                        className={`custom-scrollbar flex max-h-40 min-h-[3.5rem] w-full cursor-pointer flex-wrap items-start gap-1.5 overflow-y-auto rounded-2xl border-2 bg-slate-50 px-4 py-3 font-medium transition-all hover:bg-white sm:gap-2 ${isDropdownOpen ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-slate-200'}`}
                                        onClick={() => setIsDropdownOpen(true)}
                                    >
                                        {selectedAttendees.length === 0 && (
                                            <span className="ml-1 text-sm font-normal text-slate-400">
                                                Pilih pengurus yang hadir...
                                            </span>
                                        )}

                                        {selectedAttendees.map((name) => (
                                            <span
                                                key={name}
                                                className="inline-flex items-center gap-1 rounded-xl border-2 border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 shadow-sm transition-all hover:border-blue-300 sm:px-3 sm:py-1 sm:text-sm"
                                            >
                                                {name}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleAttendee(name);
                                                    }}
                                                    className="rounded-md p-0.5 transition-colors hover:bg-blue-200/50 hover:text-blue-900 focus:outline-none"
                                                >
                                                    <X weight="bold" className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}

                                        <div className="ml-auto pl-2 text-slate-400">
                                            <CaretDown
                                                weight="bold"
                                                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {isDropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    setAttendeeSearch('');
                                                }}
                                            ></div>
                                            <div className="custom-scrollbar absolute z-50 mt-2 flex max-h-80 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                                                <div className="border-b border-slate-100 p-2">
                                                    <input
                                                        type="text"
                                                        value={attendeeSearch}
                                                        onChange={(e) => setAttendeeSearch(e.target.value)}
                                                        placeholder="Cari nama pengurus..."
                                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            selectAllAttendees();
                                                            setIsDropdownOpen(false);
                                                            setAttendeeSearch('');
                                                        }}
                                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                                    >
                                                        Pilih Semua
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={deselectAllAttendees}
                                                        className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                                                    >
                                                        Hapus Semua
                                                    </button>
                                                </div>
                                                <div className="max-h-60 overflow-y-auto py-1.5">
                                                    {filteredMembers.length === 0 ? (
                                                        <div className="px-4 py-3 text-center text-sm text-slate-500">
                                                            Nama tidak ditemukan.
                                                        </div>
                                                    ) : (
                                                        filteredMembers.map((name) => {
                                                            const isSelected = selectedAttendees.includes(name);

                                                            return (
                                                                <button
                                                                    key={name}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (!isSelected) {
                                                                            toggleAttendee(name);
                                                                        }
                                                                        setAttendeeSearch('');
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    disabled={isSelected}
                                                                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                                                                        isSelected
                                                                            ? 'cursor-not-allowed bg-slate-50/50 text-slate-400'
                                                                            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                                                                    }`}
                                                                >
                                                                    {name}
                                                                    {isSelected && (
                                                                        <CheckCircle
                                                                            weight="fill"
                                                                            className="h-4 w-4 text-slate-300"
                                                                        />
                                                                    )}
                                                                </button>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Keputusan
                                    </label>
                                    <textarea
                                        value={data.decisions}
                                        onChange={(e) => setData('decisions', e.target.value)}
                                        rows={4}
                                        placeholder="Tuliskan hasil atau keputusan rapat..."
                                        className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                        required
                                    ></textarea>
                                    {errors.decisions && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.decisions}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tindak Lanjut
                                    </label>
                                    <textarea
                                        value={data.follow_up}
                                        onChange={(e) => setData('follow_up', e.target.value)}
                                        rows={3}
                                        placeholder="Siapa melakukan apa..."
                                        className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Lampiran Dokumen{' '}
                                        <span className="font-normal text-slate-400">
                                            (Opsional)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) =>
                                                setData('documents', Array.from(e.target.files || []))
                                            }
                                            className="block w-full rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm text-slate-500 transition-colors file:mr-4 file:rounded-xl file:border-0 file:bg-blue-100 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                                        />
                                    </div>
                                    {isEditing && (
                                        <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                                            <Note weight="bold" className="text-blue-500" />
                                            Upload file baru akan ditambahkan ke lampiran yang sudah ada. Maks 5MB/file.
                                        </p>
                                    )}
                                    {!isEditing && (
                                        <p className="mt-2 text-xs text-slate-400">
                                            Maksimal 5MB/file (PDF, JPG, PNG).
                                        </p>
                                    )}
                                    {errors.documents && (
                                        <div className="mt-2 text-sm font-medium text-rose-500">
                                            {errors.documents}
                                        </div>
                                    )}
                                    {Object.keys(errors)
                                        .filter((key) => key.startsWith('documents.'))
                                        .map((key) => (
                                            <div
                                                key={key}
                                                className="mt-2 text-sm font-medium text-rose-500"
                                            >
                                                {errors[key as keyof typeof errors]}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-300 transition-all ring-inset hover:bg-slate-50 sm:w-auto"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95 sm:w-auto"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Notulensi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full">
                    {!canManageMeeting ? (
                        <div className="space-y-6">
                            {meetings.data.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm sm:p-20">
                                    <UsersThree
                                        weight="duotone"
                                        className="mb-6 h-16 w-16 text-slate-200"
                                    />
                                    <h3 className="text-lg font-semibold text-slate-800 sm:text-xl">
                                        Belum Ada Notulensi
                                    </h3>
                                    <p className="mt-3 max-w-sm text-base text-slate-500">
                                        Belum ada catatan rapat komite yang
                                        dipublikasikan.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative ml-3 space-y-12 border-l-[3px] border-slate-100 py-6 sm:ml-6">
                                    {meetings.data.map((meeting: any) => (
                                        <div
                                            key={meeting.id}
                                            className="group relative pl-6 sm:pl-10"
                                        >
                                            {/* Timeline dot */}
                                            <div className="absolute top-2 -left-[0.85rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-blue-100 shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:bg-blue-500 sm:-left-[0.85rem]">
                                                <div className="h-2 w-2 rounded-full bg-blue-600 group-hover:bg-white"></div>
                                            </div>

                                            {/* Date Badge */}
                                            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase">
                                                <CalendarBlank
                                                    weight="bold"
                                                    className="h-4 w-4"
                                                />
                                                {meeting.date
                                                    ? new Date(
                                                          meeting.date,
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                          {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          },
                                                      )
                                                    : '-'}
                                            </div>

                                            {/* Content Card */}
                                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:p-5">
                                                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                                                    {meeting.agenda}
                                                </h3>

                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div className="rounded-[1.5rem] border-2 border-emerald-100/50 bg-emerald-50/50 p-5">
                                                        <div className="mb-4 flex items-center gap-2">
                                                            <CheckCircle
                                                                weight="fill"
                                                                className="h-6 w-6 text-emerald-500"
                                                            />
                                                            <h4 className="text-base font-bold text-emerald-900">
                                                                Hasil Keputusan
                                                            </h4>
                                                        </div>
                                                        <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">
                                                            {meeting.decisions}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {meeting.follow_up && (
                                                            <div className="rounded-[1.5rem] border-2 border-orange-100/50 bg-orange-50/50 p-5">
                                                                <div className="mb-4 flex items-center gap-2">
                                                                    <ListChecks
                                                                        weight="fill"
                                                                        className="h-6 w-6 text-orange-500"
                                                                    />
                                                                    <h4 className="text-base font-bold text-orange-900">
                                                                        Tindak
                                                                        Lanjut
                                                                    </h4>
                                                                </div>
                                                                <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">
                                                                    {
                                                                        meeting.follow_up
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}

                                                        {meeting.attendees && (
                                                            <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                                                                <UsersThree
                                                                    weight="duotone"
                                                                    className="h-5 w-5 shrink-0"
                                                                />
                                                                <div>
                                                                    <span className="mb-1 block font-semibold text-slate-700">
                                                                        Daftar
                                                                        Hadir:
                                                                    </span>
                                                                    <span className="leading-relaxed">
                                                                        {
                                                                            meeting.attendees
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {meeting.documents &&
                                                            meeting.documents
                                                                .length > 0 && (
                                                                <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3 text-sm">
                                                                    <Paperclip
                                                                        weight="duotone"
                                                                        className="mt-0.5 h-5 w-5 shrink-0 text-slate-400"
                                                                    />
                                                                    <div className="w-full">
                                                                        <span className="mb-2 block font-semibold text-slate-700">
                                                                            Lampiran
                                                                            Dokumen:
                                                                        </span>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {meeting.documents.map(
                                                                                (
                                                                                    doc: any,
                                                                                ) => (
                                                                                    <a
                                                                                        key={
                                                                                            doc.id
                                                                                        }
                                                                                        href={`/storage/${doc.file_path}`}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                                                    >
                                                                                        {doc.file_type.toLowerCase() ===
                                                                                        'pdf' ? (
                                                                                            <FilePdf
                                                                                                weight="fill"
                                                                                                className="h-4 w-4 text-rose-500"
                                                                                            />
                                                                                        ) : (
                                                                                            <ImageIcon
                                                                                                weight="fill"
                                                                                                className="h-4 w-4 text-blue-500"
                                                                                            />
                                                                                        )}
                                                                                        File{' '}
                                                                                        {doc.file_type.toUpperCase()}
                                                                                    </a>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {meetings.links && meetings.links.length > 3 && (
                                <div className="mt-8 flex flex-wrap justify-center gap-1.5">
                                    {meetings.links.map(
                                        (link: any, k: number) =>
                                            link.url ? (
                                                <Link
                                                    key={k}
                                                    href={link.url}
                                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${link.active ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={k}
                                                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-400"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ),
                                    )}
                                </div>
                            )}
                            {meetings.total > 0 && (
                                <div className="mt-4 text-center">
                                    <div className="inline-block rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                                        Menampilkan{' '}
                                        {(meetings.current_page - 1) *
                                            meetings.per_page +
                                            1}{' '}
                                        -{' '}
                                        {Math.min(
                                            meetings.current_page *
                                                meetings.per_page,
                                            meetings.total,
                                        )}{' '}
                                        dari {meetings.total} catatan
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="overflow-hidden md:overflow-x-auto">
                                <table className="block min-w-full divide-y divide-slate-100 md:table">
                                    <thead className="hidden bg-slate-50 md:table-header-group">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                            >
                                                Tanggal & Agenda
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                            >
                                                Keputusan
                                            </th>
                                            {canManageMeeting && (
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
                                                >
                                                    Aksi
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="block divide-y divide-slate-100 bg-white md:table-row-group">
                                        {meetings.data.length === 0 && (
                                            <tr className="block md:table-row">
                                                <td
                                                    colSpan={
                                                        canManageMeeting ? 3 : 2
                                                    }
                                                    className="px-4 py-12 text-center text-sm text-slate-500"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <UsersThree
                                                            weight="duotone"
                                                            className="mb-4 h-16 w-16 text-slate-200"
                                                        />
                                                        <p className="text-base font-medium">
                                                            Belum ada data
                                                            notulensi rapat.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {meetings.data.map((meeting: any) => (
                                            <tr
                                                key={meeting.id}
                                                className="block border-b border-slate-100 p-4 transition-colors last:border-0 hover:bg-slate-50/80 sm:p-5 md:table-row md:border-0 md:p-0"
                                            >
                                                <td className="block px-0 py-2 align-top md:table-cell md:px-4 md:py-4 lg:px-6">
                                                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                                        <CalendarBlank weight="bold" />
                                                        {meeting.date
                                                            ? new Date(
                                                                  meeting.date,
                                                              ).toLocaleDateString(
                                                                  'id-ID',
                                                                  {
                                                                      day: 'numeric',
                                                                      month: 'short',
                                                                      year: 'numeric',
                                                                  },
                                                              )
                                                            : ''}
                                                    </div>
                                                    <div className="text-sm leading-snug font-bold text-slate-900">
                                                        {meeting.agenda}
                                                    </div>
                                                    {meeting.attendees && (
                                                        <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
                                                            <UsersThree
                                                                weight="bold"
                                                                className="mt-0.5 shrink-0 text-slate-400"
                                                            />
                                                            <span className="leading-relaxed whitespace-pre-wrap">
                                                                {
                                                                    meeting.attendees
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="mt-3 block px-0 py-2 align-top md:mt-0 md:table-cell md:px-4 md:py-4 lg:px-6">
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle
                                                            weight="fill"
                                                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                                        />
                                                        <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                                                            {meeting.decisions}
                                                        </div>
                                                    </div>
                                                    {meeting.follow_up && (
                                                        <div className="mt-2 flex items-start gap-2 border-t border-slate-100 pt-2">
                                                            <ListChecks
                                                                weight="bold"
                                                                className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                                                            />
                                                            <div className="text-xs leading-relaxed font-medium whitespace-pre-wrap text-slate-600">
                                                                {
                                                                    meeting.follow_up
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                    {meeting.documents &&
                                                        meeting.documents
                                                            .length > 0 && (
                                                            <div className="mt-2 flex items-start gap-2 border-t border-slate-100 pt-2">
                                                                <Paperclip
                                                                    weight="bold"
                                                                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                                                                />
                                                                <div className="flex flex-wrap gap-2">
                                                                    {meeting.documents.map(
                                                                        (
                                                                            doc: any,
                                                                        ) => (
                                                                            <a
                                                                                key={
                                                                                    doc.id
                                                                                }
                                                                                href={`/storage/${doc.file_path}`}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                                            >
                                                                                {doc.file_type.toLowerCase() ===
                                                                                'pdf' ? (
                                                                                    <FilePdf
                                                                                        weight="fill"
                                                                                        className="text-rose-500"
                                                                                    />
                                                                                ) : (
                                                                                    <ImageIcon
                                                                                        weight="fill"
                                                                                        className="text-blue-500"
                                                                                    />
                                                                                )}
                                                                                Lihat
                                                                                Lampiran
                                                                            </a>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                </td>
                                                {canManageMeeting && (
                                                    <td className="mt-4 block border-t border-slate-100 px-0 pt-4 text-right align-top whitespace-nowrap md:mt-0 md:table-cell md:border-0 md:px-4 md:py-4 lg:px-6">
                                                        <div className="grid grid-cols-3 gap-3 md:flex md:justify-end md:gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    shareToWhatsApp(
                                                                        meeting,
                                                                    )
                                                                }
                                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-sm md:h-10 md:w-10 md:rounded-full md:bg-transparent md:p-0 md:text-emerald-500 md:hover:-translate-y-0 md:hover:bg-emerald-50 md:hover:shadow-none"
                                                                title="Share via WhatsApp"
                                                            >
                                                                <WhatsappLogo
                                                                    weight="fill"
                                                                    className="h-5 w-5 md:h-5 md:w-5"
                                                                />
                                                                <span className="md:hidden">
                                                                    Share
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    openEdit(
                                                                        meeting,
                                                                    )
                                                                }
                                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm md:h-10 md:w-10 md:rounded-full md:bg-transparent md:p-0 md:text-blue-500 md:hover:-translate-y-0 md:hover:bg-blue-50 md:hover:shadow-none"
                                                                title="Edit Notulensi"
                                                            >
                                                                <PencilSimple
                                                                    weight="fill"
                                                                    className="h-5 w-5 md:h-5 md:w-5"
                                                                />
                                                                <span className="md:hidden">
                                                                    Edit
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    deleteMeeting(
                                                                        meeting.id,
                                                                        meeting.agenda,
                                                                    )
                                                                }
                                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition-all hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-sm md:h-10 md:w-10 md:rounded-full md:bg-transparent md:p-0 md:text-rose-500 md:hover:-translate-y-0 md:hover:bg-rose-50 md:hover:shadow-none"
                                                                title="Hapus Notulensi"
                                                            >
                                                                <Trash
                                                                    weight="fill"
                                                                    className="h-5 w-5 md:h-5 md:w-5"
                                                                />
                                                                <span className="md:hidden">
                                                                    Hapus
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {meetings.links && meetings.links.length > 3 && (
                                <div className="flex flex-wrap justify-center gap-1.5 border-t border-slate-100 bg-white px-4 py-3 sm:justify-start sm:px-6 sm:py-4">
                                    {meetings.links.map(
                                        (link: any, k: number) =>
                                            link.url ? (
                                                <Link
                                                    key={k}
                                                    href={link.url}
                                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${link.active ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={k}
                                                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-400"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ),
                                    )}
                                </div>
                            )}
                            {meetings.total > 0 && (
                                <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs font-medium text-slate-500 sm:px-6 sm:py-4 sm:text-left">
                                    Menampilkan{' '}
                                    {(meetings.current_page - 1) *
                                        meetings.per_page +
                                        1}{' '}
                                    -{' '}
                                    {Math.min(
                                        meetings.current_page *
                                            meetings.per_page,
                                        meetings.total,
                                    )}{' '}
                                    dari total {meetings.total} notulensi
                                </div>
                            )}
                        </div>
                    )}
                </div>
        </DashboardLayout>
    );
}
