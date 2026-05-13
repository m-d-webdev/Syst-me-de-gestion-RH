"use client";

import { GET_ATTENDANCE } from "@/api/Attendance";
import Dialog from "@/components/Global/Dialog";
import { id } from "date-fns/locale/id";
import moment from "moment";

import { useState, useEffect } from "react";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];



// ─── Status styles ────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  present: {
    cell: "bg-emerald-50 text-emerald-900 hover:ring-1 hover:ring-emerald-400",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
    stat: "text-emerald-600",
  },
  absent: {
    cell: "bg-red-50 text-red-900 hover:ring-1 hover:ring-red-400",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800",
    stat: "text-red-500",
  },
  "half-day": {
    cell: "bg-amber-50 text-amber-900 hover:ring-1 hover:ring-amber-400",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800",
    stat: "text-amber-600",
  },
};

const STATUS_LABELS = {
  present: "Présent",
  absent: "Absent",
  "half-day": "Mi-journée",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-semibold ${colorClass}`}>{value}</span>
    </div>
  );
}

function CalendarCell({ day, record, isToday, isFuture, isWeekend, isSelected, onClick }) {
  if (!day) return <div />;

  const disabled = isFuture || isWeekend || !record;
  const styles = record ? STATUS_STYLES[record.status] : null;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={[
        "aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all",
        disabled
          ? "bg-gray-50 text-gray-300 cursor-default"
          : styles?.cell,
        isToday ? "ring-2 ring-gray-400 ring-offset-1" : "",
        isSelected ? "ring-2 ring-gray-800 ring-offset-1" : "",
      ].join(" ")}
    >
      <span>{day}</span>
      {record && (
        <span className={`w-1 h-1 rounded-full mt-0.5 ${styles?.dot}`} />
      )}
    </button>
  );
}

function DetailPanel({ record }) {
  if (!record) {
    return (
      <div className="mt-4 border border-gray-100 rounded-2xl p-4 min-h-[80px] flex items-center">
        <p className="text-sm text-gray-400">Cliquez sur un jour pour voir les détails</p>
      </div>
    );
  }

  const styles = STATUS_STYLES[record.status];
  const label = STATUS_LABELS[record.status];

  return (
    <div className="mt-4 border border-gray-100 rounded-2xl p-4 min-h-[80px]">
      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">{record.date}</p>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide">Statut</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md w-fit ${styles.badge}`}>{label}</span>
        </div>
        {record.checkIn && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Pointage</span>
            <span className="text-sm font-medium text-gray-800">{record.checkIn}</span>
          </div>
        )}
        {record.justification && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Justification</span>
            <span className="text-sm font-medium text-gray-800">{record.justification}</span>
          </div>
        )}
        {record.note && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Note</span>
            <span className="text-sm font-medium text-gray-800">{record.note}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const AttendanceModel = ({ userId, userName = "" }) => {

  const today = new Date();
  
  const goToPrev = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };

  const goToNext = () => {
    const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return;
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  // Stats
  let present = 0, absent = 0, halfDay = 0;
  Object.values(attendanceData).forEach(r => {
    if (r.isPresente) present++;
    else absent++;
  });
  const total = present + absent + halfDay;
  const rate = total > 0 ? Math.round(((present + halfDay * 0.5) / total) * 100) : 0;

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedRecord = selectedKey ? attendanceData[selectedKey] : null;


  return (
    <Dialog
      closeIfClickOutside={true}
      backWhenClose={true}
    >
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
          <span className="text-sm text-gray-400">{userName}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <StatCard label="Présent" value={present} colorClass={STATUS_STYLES.present.stat} />
          <StatCard label="Absent" value={absent} colorClass={STATUS_STYLES.absent.stat} />
          <StatCard label="Mi-journée" value={halfDay} colorClass={STATUS_STYLES["half-day"].stat} />
          <StatCard label="Taux" value={`${rate}%`} colorClass="text-gray-700" />
        </div>

        {/* Calendar */}
        {loading ? (
          <div className="h-48 flex items-center justify-center text-sm text-gray-400">Chargement…</div>
        ) : (
          <>
            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-[11px] font-medium text-gray-400 uppercase tracking-wider py-1">
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
                    record={attendanceData[key]}
                    isToday={cellDate.toDateString() === today.toDateString()}
                    isFuture={cellDate > today}
                    isWeekend={dow === 0 || dow === 6}
                    isSelected={selectedKey === key}
                    onClick={() => setSelectedKey(prev => prev === key ? null : key)}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-3">
              {["present", "absent", "half-day"].map(s => (
                <div key={s} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className={`w-2.5 h-2.5 rounded-sm ${STATUS_STYLES[s].dot}`} />
                  {STATUS_LABELS[s]}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Detail panel */}
        <DetailPanel record={selectedRecord} />
      </div>
    </Dialog>
  )
}

export default AttendanceModel

