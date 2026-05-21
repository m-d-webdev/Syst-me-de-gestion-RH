'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Tag, User, Paperclip, MoreHorizontal, AlertCircle } from 'lucide-react';


const PRIORITY_CONFIG = {
  low: { label: 'Faible', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  medium: { label: 'Moyenne', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  high: { label: 'Élevée', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  urgent: { label: 'Urgente', color: 'bg-rose-500/15 text-rose-500 border-rose-500/80' },
};

const LABEL_COLORS = [
  'bg-violet-500', 'bg-sky-500 ', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-pink-500',
];


export default function TaskCard({ task, onEdit, onDelete, onArchive, isDragging }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const PageRef = useRef();

  const handleClickOutside = (e) => {
    if (!PageRef.current?.contains(e.target) &&menuOpen ) {
      setMenuOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <div
      className={`
        ${task.priority === 'urgent' ? "border-red-500/80 " : "hover:border-white/[0.14]"}
        group relative bg-background border border-foreground/15 rounded-xl p-3.5
        cursor-grab active:cursor-grabbing select-none
        transition-all duration-200
        hover:bg-accent/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5
        ${isDragging ? 'opacity-50 rotate-2 scale-105 shadow-2xl shadow-black/50' : ''}
      `}
    >
      {/* Labels */}
      {task.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {task.labels.slice(0, 4).map((label, i) => (
            <span
              key={i}
              className={`${LABEL_COLORS[i % LABEL_COLORS.length]} text-white  font-medium tracking-tight text-[10px] p-[1] px-2  rounded-sm opacity-90`}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <p className="text-lg font-semibold tracking-tight  leading-snug mb-2.5 pr-5">
        {task.title}
      </p>

      {/* Description excerpt */}
      {task.description && (
        <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Priority badge */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-full border ${priority.color}`}>
          {task.priority === 'urgent' && <AlertCircle size={12} />}
          {priority.label}
        </span>

        {/* Due date */}
        {task.dueDate && (
          <span className={`inline-flex  items-center gap-1 text-[12px] font-medium ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
            <Calendar size={10} />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          {/* Assignee avatar */}
          {task.assignedTo ? (
            <div className="px-3 p-1 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white" title={task.assignedTo.firstName}>
              <i className="bi bi-person-check-fill mr-2"></i> {task.assignedTo.firstName} {task.assignedTo.lastName}
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border border-dashed border-white/20 flex items-center justify-center">
              <User size={9} className="text-slate-600" />
            </div>
          )}

          {/* Attachments count */}
          {task.attachments?.length > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-slate-600">
              <Paperclip size={9} /> {task.attachments.length}
            </span>
          )}

          {/* Labels count */}
          {task.labels?.length > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-slate-600">
              <Tag size={9} /> {task.labels.length}
            </span>
          )}
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-all"
          >
            <MoreHorizontal size={13} />
          </button>

          {menuOpen && (
            <>
              <div ref={PageRef} className="absolute right-0 bottom-full mb-1 z-20 bg-[#2a2f47] border border-white/10 rounded-lg shadow-xl py-1 w-36 text-[12px]">
                <button onClick={() => { onEdit(task); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                  Modifier la tâche
                </button>
                <button onClick={() => { onArchive(task._id); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                  Archiver
                </button>
                <div className="h-px bg-white/10 my-1" />
                <button onClick={() => { onDelete(task._id); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors">
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
