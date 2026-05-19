import { useState, useEffect } from "react";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

// ─── Status config (only present / absent based on isPresente) ───────────────
const STATUS = {
  present: {
    cell: "bg-emerald-50 text-emerald-900 hover:ring-1 hover:ring-emerald-400",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
    stat: "text-emerald-600",
    label: "Présent",
  },
  absent: {
    cell: "bg-red-50 text-red-900 hover:ring-1 hover:ring-red-400",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800",
    stat: "text-red-500",
    label: "Absent",
  },
};

// ─── Parse "D-M-YYYY" or "DD-MM-YYYY" from DB into a normalised "DD-MM-YYYY" key
function normaliseDate(dateStr) {
  const [d, m, y] = dateStr.split("-");
  return `${d.padStart(2, "0")}-${m.padStart(2, "0")}-${y}`;
}

// ─── Build a lookup map from the API response ─────────────────────────────────
// Expected shape: { success, data: [...records], user: {...} }
function buildIndex(records) {
  return records.reduce((acc, r) => {
    const key = normaliseDate(r.date);
    acc[key] = { ...r, _key: key };
    return acc;
  }, {});
}

// ─── Fetch attendance for a given user / month / year ────────────────────────
async function fetchAttendance(userId, year, month) {
  const res = await fetch(
    `/api/attendance/user/${userId}?month=${month + 1}&year=${year}`
  );
  if (!res.ok) throw new Error("Erreur lors du chargement des données");
  const json = await res.json();
  // json = { success, data: [...], user: {...} }
  return {
    index: buildIndex(json.data),
    user: json.user,
  };
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-2xl font-semibold ${colorClass}`}>{value}</span>
    </div>
  );
}

// ─── CalendarCell ─────────────────────────────────────────────────────────────
function CalendarCell({ day, record, isToday, isFuture, isWeekend, isSelected, onClick }) {
  if (!day) return <div />;

  const disabled = isFuture || isWeekend || !record;
  // derive status from isPresente boolean
  const statusKey = record ? (record.isPresente ? "present" : "absent") : null;
  const styles = statusKey ? STATUS[statusKey] : null;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={[
        "aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all select-none",
        disabled ? "bg-gray-50 text-gray-300 cursor-default" : styles?.cell,
        isToday ? "ring-2 ring-gray-400 ring-offset-1" : "",
        isSelected ? "ring-2 ring-gray-800 ring-offset-1" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{day}</span>
      {record && (
        <span className={`w-1 h-1 rounded-full mt-0.5 ${styles?.dot}`} />
      )}
    </button>
  );
}

// ─── DetailPanel ──────────────────────────────────────────────────────────────
function DetailPanel({ record }) {
  if (!record) {
    return (
      <div className="mt-4 border border-gray-100 rounded-2xl p-4 min-h-[80px] flex items-center">
        <p className="text-sm text-gray-400">
          Cliquez sur un jour pour voir les détails
        </p>
      </div>
    );
  }

  const statusKey = record.isPresente ? "present" : "absent";
  const styles = STATUS[statusKey];

  return (
    <div className="mt-4 border border-gray-100 rounded-2xl p-4 min-h-[80px]">
      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">
        {normaliseDate(record.date)}
      </p>
      <div className="flex flex-wrap gap-6">

        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide">Statut</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md w-fit ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        {/* Check-in */}
        {record.checkIn && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Pointage</span>
            <span className="text-sm font-medium text-gray-800">{record.checkIn}</span>
          </div>
        )}

        {/* Justification */}
        {record.justification && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Justification</span>
            <span className="text-sm font-medium text-gray-800">{record.justification}</span>
          </div>
        )}

        {/* Note */}
        {record.note && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Note</span>
            <span className="text-sm font-medium text-gray-800">{record.note}</span>
          </div>
        )}

        {/* Created at */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide">Enregistré le</span>
          <span className="text-sm font-medium text-gray-800">
            {new Date(record.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit", month: "long", year: "numeric",
            })}
          </span>
        </div>

      </div>
    </div>
  );
}

// ─── UserBadge ────────────────────────────────────────────────────────────────
function UserBadge({ user }) {
  if (!user) return null;
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 uppercase">
        {user.firstName?.[0]}{user.lastName?.[0]}
      </div>
      <span className="text-sm text-gray-500 font-medium">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AttendanceHistory({ userId }) {
  const today = new Date();

  const [attendanceIndex, setAttendanceIndex] = useState({});
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [viewYear, setViewYear] = useState(moment().year());
  const [viewMonth, setViewMonth] = useState(moment().month() + 1);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetData = async () => {
    setLoading(true);
    const res = await GET_ATTENDANCE({ id: userId, data: { viewMonth, viewYear } });
    setAttendanceData(res.data);
    setUser(res.user);
    setLoading(false);
  }

  useEffect(() => {
    GetData()
  }, [userId, viewYear, viewMonth]);


  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const goToPrev = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const goToNext = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  // Stats — derived from isPresente boolean
  const records = Object.values(attendanceIndex);
  const present = records.filter((r) => r.isPresente).length;
  const absent = records.filter((r) => !r.isPresente).length;
  const total = records.length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedRecord = selectedKey ? attendanceIndex[selectedKey] : null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-lg w-full mx-auto font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrev}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
          >
            ‹
          </button>
          <span className="text-base font-semibold text-gray-800 w-36 text-center">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={goToNext}
            disabled={isCurrentMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
        <UserBadge user={user} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <StatCard label="Présent" value={present} colorClass={STATUS.present.stat} />
        <StatCard label="Absent" value={absent} colorClass={STATUS.absent.stat} />
        <StatCard label="Taux" value={`${rate}%`} colorClass="text-gray-700" />
      </div>

      {/* Calendar */}
      {loading ? (
        <div className="h-48 flex items-center justify-center text-sm text-gray-400">
          Chargement…
        </div>
      ) : error ? (
        <div className="h-48 flex items-center justify-center text-sm text-red-400">
          {error}
        </div>
      ) : (
        <>
          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="text-center text-[11px] font-medium text-gray-400 uppercase tracking-wider py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const cellDate = new Date(viewYear, viewMonth, day);
              const dow = cellDate.getDay();
              const dd = String(day).padStart(2, "0");
              const mm = String(viewMonth + 1).padStart(2, "0");
              const key = `${dd}-${mm}-${viewYear}`;
              return (
                <CalendarCell
                  key={key}
                  day={day}
                  record={attendanceIndex[key]}
                  isToday={cellDate.toDateString() === today.toDateString()}
                  isFuture={cellDate > today}
                  isWeekend={dow === 0 || dow === 6}
                  isSelected={selectedKey === key}
                  onClick={() =>
                    setSelectedKey((prev) => (prev === key ? null : key))
                  }
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3">
            {["present", "absent"].map((s) => (
              <div key={s} className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className={`w-2.5 h-2.5 rounded-sm ${STATUS[s].dot}`} />
                {STATUS[s].label}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Detail panel */}
      <DetailPanel record={selectedRecord} />
    </div>
  );
}