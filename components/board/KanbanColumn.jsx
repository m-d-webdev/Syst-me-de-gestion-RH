'use client';

import { useEffect, useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';
import { GET_USERS } from '@/api/Employers/User';

const COLUMN_ACCENT = {
  todo: 'from-slate-500/20 to-transparent border-slate-500/30',
  in_progress: 'from-violet-500/20 to-transparent border-violet-500/30',
  in_review: 'from-amber-500/20 to-transparent border-amber-500/30',
  done: 'from-emerald-500/20 to-transparent border-emerald-500/30',
};

const COLUMN_DOT = {
  todo: 'bg-slate-400',
  in_progress: 'bg-violet-400',
  in_review: 'bg-amber-400',
  done: 'bg-emerald-400',
};

export default function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onArchiveTask,
  onDragStart,
  onDragOver,
  onDrop,
  dragOverColumn,
}) {
  const [isOver, setIsOver] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
    onDragOver(column.id);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(column.id);
  };

  return (
    <div
      className="flex flex-col w-[272px] flex-shrink-0"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className={`
        flex items-center justify-between px-3 py-2.5 mb-2
        rounded-xl border bg-gradient-to-b
        ${COLUMN_ACCENT[column.id]}
      `}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${COLUMN_DOT[column.id]}`} />
          <span className="text-[13px] font-semibold  tracking-wide">
            {column.label}
          </span>
          <span className="text-[11px] font-medium text-slate-500 bg-accent/[0.06] px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 rounded-lg cursor-pointer  hover:bg-white/10 transition-all"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Drop zone */}
      <div
        className={`
          flex-1 flex flex-col gap-2.5 min-h-[120px] p-2 rounded-xl transition-all duration-200
          ${isOver ? 'bg-white/[0.04] ring-1 ring-violet-500/30' : 'bg-transparent'}
        `}
      >
        {tasks.map((task) => (
          <div
            key={task._id}
            draggable
            onDragStart={() => onDragStart(task)}
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onArchive={onArchiveTask}
            />
          </div>
        ))}

        {/* Empty state */}
        {tasks.length === 0 && !isOver && (
          <button
            onClick={() => onAddTask(column.id)}
            className="flex items-center justify-center gap-1.5 h-16 border border-dashed border-white/[0.08] rounded-xl text-[12px] text-slate-600 hover:text-slate-400 hover:border-white/20 transition-all"
          >
            <Plus size={12} />Ajouter une tâche
          </button>
        )}

        {/* Drop indicator */}
        {isOver && (
          <div className="h-1.5 rounded-full bg-violet-500/50 mx-2 animate-pulse" />
        )}
      </div>
    </div>
  );
}
