import { Link } from '@inertiajs/react';
import {
    CaretLeft,
    CaretRight,
    CalendarBlank,
    Clock,
} from '@phosphor-icons/react';
import { useState, useMemo, useEffect } from 'react';

export default function ProgramCalendar({
    activePrograms,
}: {
    activePrograms: any[];
}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const events = useMemo(() => {
        const evts: any[] = [];
        activePrograms.forEach((p) => {
            if (p.activities && p.activities.length > 0) {
                p.activities.forEach((act: any) => {
                    if (act.activity_date) {
                        evts.push({
                            id: `act-${act.id}`,
                            programId: p.id,
                            title: act.title || p.title,
                            description: p.description,
                            dateStr: act.activity_date.split('T')[0],
                            date: new Date(
                                act.activity_date.split('T')[0] + 'T00:00:00',
                            ),
                            startTime: act.start_time,
                            endTime: act.end_time,
                            type:
                                p.frequency === 'monthly'
                                    ? 'Bulanan'
                                    : p.frequency === 'holiday'
                                      ? 'PHBI'
                                      : 'Insidental',
                        });
                    }
                });
            } else if (p.start_date) {
                evts.push({
                    id: `prog-${p.id}`,
                    programId: p.id,
                    title: p.title,
                    description: p.description,
                    dateStr: p.start_date.split('T')[0],
                    date: new Date(p.start_date.split('T')[0] + 'T00:00:00'),
                    startTime: null,
                    endTime: null,
                    type:
                        p.frequency === 'monthly'
                            ? 'Bulanan'
                            : p.frequency === 'holiday'
                              ? 'PHBI'
                              : 'Insidental',
                });
            }
        });

        return evts.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [activePrograms]);

    // Automatically select the next upcoming event date if today has no events
    useEffect(() => {
        const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
        const hasEventToday = events.some((e) => e.dateStr === todayStr);

        if (!hasEventToday && events.length > 0) {
            const upcoming = events.find(
                (e) => e.date >= new Date(new Date().setHours(0, 0, 0, 0)),
            );

            /* eslint-disable react-hooks/set-state-in-effect */
            if (upcoming) {
                setSelectedDate(upcoming.date);
                setCurrentDate(upcoming.date);
            } else {
                // if no upcoming, just select the last one
                setSelectedDate(events[events.length - 1].date);
                setCurrentDate(events[events.length - 1].date);
            }
            /* eslint-enable react-hooks/set-state-in-effect */
        }
    }, [events]);

    const prevMonth = () =>
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
    const nextMonth = () =>
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        // Headers
        weekDays.forEach((day) => {
            days.push(
                <div
                    key={`header-${day}`}
                    className="py-2 text-center text-xs font-semibold text-slate-500"
                >
                    {day}
                </div>,
            );
        });

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isToday = new Date().toLocaleDateString('en-CA') === dateStr;
            const isSelected =
                selectedDate &&
                selectedDate.toLocaleDateString('en-CA') === dateStr;

            const dayEvents = events.filter((e) => e.dateStr === dateStr);
            const hasEvent = dayEvents.length > 0;

            days.push(
                <button
                    key={`day-${i}`}
                    onClick={() => setSelectedDate(dateObj)}
                    className={`relative flex aspect-square w-full flex-col items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${isSelected ? 'scale-105 bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'} ${isToday && !isSelected ? 'bg-blue-50 font-bold text-blue-600' : ''} `}
                >
                    <span>{i}</span>
                    {hasEvent && (
                        <div className="absolute bottom-1.5 flex gap-1">
                            {dayEvents.slice(0, 3).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5 ${isSelected ? 'bg-white' : 'bg-emerald-400'}`}
                                ></div>
                            ))}
                        </div>
                    )}
                </button>,
            );
        }

        return <div className="grid grid-cols-7 gap-2">{days}</div>;
    };

    const selectedEvents = selectedDate
        ? events.filter(
              (e) =>
                  e.dateStr ===
                  `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
          )
        : [];

    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    return (
        <section className="relative overflow-hidden border-t-[6px] border-dashed border-sky-100 bg-sky-50/40 py-20 sm:py-28">
            {/* Playful Background Blobs */}
            <div className="absolute top-0 right-0 -z-10 h-[50vh] w-[50vh] translate-x-1/4 -translate-y-1/4 rounded-full bg-emerald-300/10 mix-blend-multiply blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-[60vh] w-[60vh] -translate-x-1/4 translate-y-1/4 rounded-full bg-blue-300/10 mix-blend-multiply blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                            Jadwal Terdekat
                        </h2>
                        <p className="mt-3 text-lg leading-relaxed font-medium text-slate-600">
                            Pantau agenda dan sesi kegiatan komite secara
                            interaktif melalui kalender program kami.
                        </p>
                    </div>
                    <Link
                        href="/program"
                        className="inline-flex rounded-full border border-slate-200/60 bg-white/80 px-6 py-3.5 font-bold whitespace-nowrap text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md hover:shadow-slate-200/50"
                    >
                        Lihat Semua Program
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left Col: Calendar */}
                    <div className="h-fit rounded-[2.5rem] border border-white/60 bg-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-8 lg:col-span-5">
                        <div className="mb-8 flex items-center justify-between px-2">
                            <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                                {monthNames[currentDate.getMonth()]}{' '}
                                {currentDate.getFullYear()}
                            </h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={prevMonth}
                                    className="rounded-2xl border border-slate-100 bg-white p-3 text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md"
                                >
                                    <CaretLeft weight="fill" />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="rounded-2xl border border-slate-100 bg-white p-3 text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md"
                                >
                                    <CaretRight weight="fill" />
                                </button>
                            </div>
                        </div>
                        {renderCalendarGrid()}
                    </div>

                    {/* Right Col: Event Details */}
                    <div className="flex h-full flex-col lg:col-span-7">
                        <div className="mb-8 flex items-center gap-4 border-b border-slate-200/50 pb-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-blue-100 text-blue-500 shadow-inner">
                                <CalendarBlank
                                    weight="fill"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                    {selectedDate
                                        ? selectedDate.toLocaleDateString(
                                              'id-ID',
                                              {
                                                  weekday: 'long',
                                                  day: 'numeric',
                                                  month: 'long',
                                                  year: 'numeric',
                                              },
                                          )
                                        : 'Pilih Tanggal'}
                                </h4>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    {selectedEvents.length} kegiatan dijadwalkan
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6 rounded-[2.5rem] bg-white/40 p-3 backdrop-blur-sm sm:p-5">
                            {selectedEvents.length === 0 ? (
                                <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 text-slate-300">
                                        <CalendarBlank
                                            weight="fill"
                                            className="h-10 w-10"
                                        />
                                    </div>
                                    <p className="text-xl font-extrabold text-slate-600">
                                        Kosong Melompong!
                                    </p>
                                    <p className="mt-2 text-base font-medium text-slate-400">
                                        Belum ada jadwal kegiatan pada hari ini.
                                    </p>
                                </div>
                            ) : (
                                selectedEvents.map((evt, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex flex-col gap-6 rounded-[2.5rem] border border-white bg-white/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:flex-row sm:p-8"
                                    >
                                        <div className="flex-1">
                                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                                <span className="rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 uppercase">
                                                    {evt.type}
                                                </span>
                                                {evt.startTime && (
                                                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                                                        <Clock
                                                            weight="fill"
                                                            className="h-3.5 w-3.5"
                                                        />
                                                        {evt.startTime.substring(
                                                            0,
                                                            5,
                                                        )}{' '}
                                                        {evt.endTime
                                                            ? `- ${evt.endTime.substring(0, 5)}`
                                                            : ''}{' '}
                                                        WIB
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="mb-3 text-2xl leading-snug font-extrabold text-slate-800 transition-colors group-hover:text-blue-600">
                                                {evt.title}
                                            </h3>
                                            <p className="mb-6 line-clamp-2 text-base leading-relaxed text-slate-500">
                                                {evt.description ||
                                                    'Tidak ada deskripsi rinci untuk kegiatan ini.'}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-start border-t border-slate-100 pt-6 sm:w-auto sm:justify-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                                            <Link
                                                href={`/program?id=${evt.programId}`}
                                                className="inline-flex w-full items-center justify-center rounded-[1.5rem] bg-blue-600 px-8 py-4 font-extrabold whitespace-nowrap text-white shadow-[0_6px_15px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_10px_25px_rgba(37,99,235,0.35)] active:scale-95 sm:w-auto"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-12 flex justify-center border-t border-slate-100 pt-8">
                    <Link
                        href="/kalender-akademik"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-blue-200 bg-white px-5 py-4 text-xs font-extrabold tracking-wide text-blue-600 shadow-[0_8px_25px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 hover:shadow-[0_12px_30px_rgba(59,130,246,0.25)] active:scale-95 sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <CalendarBlank
                            weight="bold"
                            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 sm:h-6 sm:w-6"
                        />
                        <span className="text-center whitespace-nowrap">
                            Lihat Seluruh Kalender Akademik
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
