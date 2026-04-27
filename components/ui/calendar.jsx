import { useState, useCallback } from "react";
import moment from "moment";

const DAYS = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
moment.locale("fr");

export const HOLIDAYS = [
  "1-1", // Nouvel An
  "11-1", // Manifeste de l'indépendance
  "1-5", // Fête du travail
  "30-7", // Fête du Trône
  "14-8", // Allégeance Oued Eddahab
  "20-8", // Révolution du Roi et du Peuple
  "21-8", // Fête de la Jeunesse
  "6-11", // Marche Verte
  "18-11", // Fête de l’Indépendance
  "20-3", // Aïd Al-Fitr (approx)
  "21-3", // Aïd Al-Fitr (2nd day)
  "27-5", // Aïd Al-Adha (approx)
  "28-5", // Aïd Al-Adha (2nd day)
  "16-7", // 1er Moharram (Hijri New Year)
  "25-9", // Aïd Al-Mawlid (approx)
];
export default function Calendar({ onSelect, day }) {
  const today = moment(day, "DD-MM-yyyy");
  const [current, setCurrent] = useState(today.clone().startOf("month"));
  const [selected, setSelected] = useState(day);

  const prevMonth = () => setCurrent((c) => c.clone().subtract(1, "month"));
  const nextMonth = () => setCurrent((c) => c.clone().add(1, "month"));

  const handleSelect = useCallback(
    (day) => {
      const formatted = day.format("D-M-YYYY");
      setSelected(formatted);
      if (onSelect) onSelect(formatted);
    },
    [onSelect]
  );

  const startDay = current.clone().startOf("month").day();
  const daysInMonth = current.daysInMonth();

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const isToday = (d) => {
    const today2 = moment();
    const current2 = today2.clone().startOf("month");
    return d &&
      current2.year() === current.year() &&
      current2.month() === current.month() &&
      d === today2.date();
  }

  const isFuture = (d) => {
    return false;
    // const today2 = moment();
    // const current2 = today2.clone().startOf("month");

    // return current2.clone().date(d).isAfter(today2, "day");
  };

  const isSelected = (d) => {
    if (!d || !selected) return false;
    return selected === `${d}-${current.month() + 1}-${current.year()}`;
  };

  const isWeekend = (d) => {
    if (!d) return false;
    const dow = current.clone().date(d).day();
    return dow === 0 || dow === 6;
  };

  const isHoliday = (d) => {
    if (!d) return false;
    const key = `${d}-${current.month() + 1}`;
    return HOLIDAYS.includes(key);
  };

  const getDayClasses = (d) => {
    const future = isFuture(d);
    const sel = isSelected(d);
    const tod = isToday(d);
    const weekend = isWeekend(d);
    const holiday = isHoliday(d);

    const base =
      "text-center text-sm py-2 rounded-lg select-none transition-colors duration-150";

    if (!d) return base;
    if (weekend)
      return `${base} bg-red-100 text-red-400 border border-red-200 cursor-default opacity-80`;
    if (holiday)
      return `${base} bg-green-100 text-green-400 border border-green-200 cursor-default opacity-80`;
    if (sel)
      return `${base} bg-blue-500 text-white border border-blue-700 font-semibold`;
    if (future)
      return `${base} text-gray-400 opacity-40 cursor-default`;
    if (tod)
      return `${base} border border-chart-1 text-chart-1 cursor-pointer hover:bg-blue-50`;
    return `${base} text-gray-800 cursor-pointer hover:bg-gray-100`;
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-sm border border-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-lg"
        >
          ‹
        </button>
        <span className="text-sm font-medium  text-right ">
          <span className="opacity-70 mr-4 ">
            ( {current.format("MMMM")} )
          </span>
          {current.format("MM/YYYY")}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-lg"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((d, di) => (
            <div
              key={di}
              className={getDayClasses(d)}
              onClick={() =>
                d && !isHoliday(d) && !isFuture(d) && !isWeekend(d) && handleSelect(current.clone().date(d))
              }
            >
              {d || ""}
            </div>
          ))}
        </div>
      ))}
      <div className="flex gap-5 items-center  mt-3" >

        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-green-300"></div> <p>jour férié</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-300"></div> <p>week-end</p>
        </div>
      </div>
    </div>
  );
}