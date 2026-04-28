import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import Dialog from "@/components/Global/Dialog";
import { employeesForTest } from "@/lib/utils";

async function fetchAttendance(userId, month, year) {
    await new Promise((r) => setTimeout(r, 400));

    const daysInMonth = moment({ year, month }).daysInMonth();
    const records = {};

    let seed = userId + year * 12 + month;
    const rng = () => {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        return (seed >>> 0) / 4294967296;
    };

    for (let d = 1; d <= daysInMonth; d++) {
        const dow = moment({ year, month, day: d }).day();
        if (dow === 0 || dow === 6) continue;
        const r = rng();
        if (r < 0.76) {
            records[d] = {
                status: "present",
                checkIn: `${8}:${String(Math.floor(rng() * 60)).padStart(2, "0")} AM`,
            };
        } else if (r < 0.9) {
            records[d] = {
                status: "late",
                checkIn: `${9 + Math.floor(rng() * 2)}:${String(Math.floor(rng() * 60)).padStart(2, "0")} AM`,
            };
        } else {
            records[d] = { status: "absent", checkIn: null };
        }
    }
    const employee = employeesForTest.find(i => i._id == userId)
    return {
        employee,
        records,
    };
}
// ─────────────────────────────────────────────────────────────────────────────

const MONTH_OPTIONS = moment.months().map((label, value) => ({ label, value }));
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => moment().year() - i);
const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const STATUS_CONFIG = {
    present: {
        cell: "bg-emerald-50 hover:border-emerald-200",
        text: "text-emerald-900",
        dot: "bg-emerald-500",
        label: "Present",
        stat: "text-emerald-600",
        legend: "bg-emerald-500",
    },
    absent: {
        cell: "bg-orange-50 hover:border-orange-200",
        text: "text-orange-900",
        dot: "bg-orange-500",
        label: "Absent",
        stat: "text-orange-600",
        legend: "bg-orange-500",
    },
    late: {
        cell: "bg-amber-50 hover:border-amber-200",
        text: "text-amber-900",
        dot: "bg-amber-500",
        label: "Late",
        stat: "text-amber-600",
        legend: "bg-amber-500",
    },
};

// ─── DayCell ─────────────────────────────────────────────────────────────────
function DayCell({ day, record, isWeekend, isToday }) {
    const [hovered, setHovered] = useState(false);

    if (day === null) return <div className="aspect-square" />;

    const cfg = record ? STATUS_CONFIG[record.status] : null;

    const cellBase =
        "aspect-square rounded-lg flex flex-col items-center justify-center relative cursor-default border border-transparent transition-colors duration-150";

    const cellColor = isWeekend
        ? "bg-gray-100"
        : cfg
            ? cfg.cell
            : "";

    const todayRing = isToday ? "ring-2 ring-blue-400 ring-offset-1" : "";

    const tooltip =
        cfg && !isWeekend
            ? record.checkIn
                ? `${cfg.label} · ${record.checkIn}`
                : "Absent"
            : null;

    return (
        <div
            className={`${cellBase} ${cellColor} ${todayRing}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span
                className={`text-sm leading-none ${isWeekend ? "text-gray-400" : cfg ? cfg.text : "text-gray-800"
                    }`}
            >
                {day}
            </span>

            {cfg && !isWeekend && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${cfg.dot}`} />
            )}

            {tooltip && hovered && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap z-10 text-gray-700 shadow-sm pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EmployeeAttendance({ onClose, _id }) {
    const [month, setMonth] = useState(moment().month());
    const [year, setYear] = useState(moment().year());
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!_id) return;
        setLoading(true);
        setData(null);
        fetchAttendance(_id, month, year)
            .then(setData)
            .finally(() => setLoading(false));
    }, [_id, month, year]);

    const { calendarCells, stats } = useMemo(() => {
        if (!data) return { calendarCells: [], stats: null };

        const daysInMonth = moment({ year, month }).daysInMonth();
        const firstDow = moment({ year, month, day: 1 }).day();

        const cells = Array(firstDow).fill(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);

        let present = 0, absent = 0, late = 0, total = 0;
        Object.values(data.records).forEach((r) => {
            total++;
            if (r.status === "present") present++;
            else if (r.status === "absent") absent++;
            else if (r.status === "late") late++;
        });

        return { calendarCells: cells, stats: { total, present, absent, late } };
    }, [data, month, year]);

    const today = moment();
    const initials = data?.employee?.initials ?? `#${_id}`;

    return (
        <Dialog backWhenClose={false} onClose={onClose} closeIfClickOutside={true}>

            <div className="max-w-2xl w-[580] p-2">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    {/* <div className="w-11 h-11 rounded-full flex items-center justify-center font-medium text-sm shrink-0"> */}
                    <img src={data?.employee?.pic} className="min-w-15 w-15 h-15 object-cover rounded-full" alt="" />
                    {/* </div> */}
                    <div className="flex flex-col items-start justify-start">
                        <p className="text-lg font-semibold ">
                            {data?.employee?.firstName ?? "—"} {data?.employee?.lastName ?? "—"}
                        </p>
                        <p className="text-sm text-gray-600">
                            {data?.employee?.grade ?? `ID: ${_id}`}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 mb-6">
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {MONTH_OPTIONS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {YEAR_OPTIONS.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p className="text-sm text-gray-400 py-4">Loading…</p>
                ) : (
                    <>
                        {/* Stats */}
                        {stats && (
                            <div className="grid grid-cols-4 gap-3 mb-6">
                                <div className="bg-background rounded-xl p-3">
                                    <p className="text-xs text-gray-500 mb-1">Jours ouvrables</p>
                                    <p className="text-2xl font-medium text-gray-800">{stats.total}</p>
                                </div>
                                <div className="bg-background rounded-xl p-3">
                                    <p className="text-xs text-gray-500 mb-1">Présent</p>
                                    <p className="text-2xl font-medium text-emerald-600">{stats.present}</p>
                                </div>
                                <div className="bg-background rounded-xl p-3">
                                    <p className="text-xs text-gray-500 mb-1">Absent</p>
                                    <p className="text-2xl font-medium text-orange-600">{stats.absent}</p>
                                </div>
                            </div>
                        )}

                        {/* Calendar */}
                        <div className="grid grid-cols-7 gap-1">
                            {DAY_NAMES.map((d) => (
                                <div
                                    key={d}
                                    className="text-center text-xs font-medium text-gray-400 py-1.5 uppercase tracking-wide"
                                >
                                    {d}
                                </div>
                            ))}

                            {calendarCells.map((day, i) => {
                                if (day === null) return <div key={`e-${i}`} className="aspect-square" />;
                                const dow = moment({ year, month, day }).day();
                                const isWeekend = dow === 0 || dow === 6;
                                const isToday =
                                    today.year() === year &&
                                    today.month() === month &&
                                    today.date() === day;
                                return (
                                    <DayCell
                                        key={day}
                                        day={day}
                                        record={data?.records?.[day]}
                                        isWeekend={isWeekend}
                                        isToday={isToday}
                                    />
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex gap-4 mt-4 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                Present
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                Absent
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                Late
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                Weekend
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
}
