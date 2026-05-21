'use client';

import { useState } from 'react';
import { Calendar, AlertCircle, ChevronUp, ChevronDown, Minus, Edit2, Archive, Trash2 } from 'lucide-react';

const STATUS_CONFIG = {
  todo:        { label: 'To Do',       color: 'bg-slate-500/20 text-slate-400',    dot: 'bg-slate-400' },
  in_progress: { label: 'In Progress', color: 'bg-violet-500/20 text-violet-400',  dot: 'bg-violet-400' },
  in_review:   { label: 'In Review',   color: 'bg-amber-500/20 text-amber-400',    dot: 'bg-amber-400' },
  done:        { label: 'Done',        color: 'bg-emerald-500/20 text-emerald-400', dot: 'bg-emerald-400' },
};

const PRIORITY_CONFIG = {
  low:    { label: 'Low',    color: 'text-emerald-400', icon: <ChevronDown size={12} /> },
  medium: { label: 'Medium', color: 'text-amber-400',   icon: <Minus size={12} /> },
  high:   { label: 'High',   color: 'text-orange-400',  icon: <ChevronUp size={12} /> },
  urgent: { label: 'Urgent', color: 'text-rose-400',    icon: <AlertCircle size={12} /> },
};

export default function ListView({ tasks, onEdit, onDelete, onArchive }) {
  const [sortKey, setSortKey]   = useState('createdAt');
  const [sortDir, setSortDir]   = useState('desc');

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...tasks].sort((a, b) => {
    let aVal = a[sortKey], bVal = b[sortKey];
    if (sortKey === 'dueDate') { aVal = aVal ? new Date(aVal) : Infinity; bVal = bVal ? new Date(bVal) : Infinity; }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => sortKey === col
    ? (sortDir === 'asc' ? <ChevronUp size={11} className="text-violet-400" /> : <ChevronDown size={11} className="text-violet-400" />)
    : <ChevronDown size={11} className="text-slate-700" />;

  const formatDate = (d) => d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
    : '—';

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {[
              { key: 'title',    label: 'Task' },
              { key: 'status',   label: 'Status' },
              { key: 'priority', label: 'Priority' },
              { key: 'dueDate',  label: 'Due Date' },
              { key: 'assignedTo', label: 'Assignee' },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-300 transition-colors select-none"
              >
                <span className="flex items-center gap-1">
                  {label} <SortIcon col={key} />
                </span>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((task, i) => {
            const status   = STATUS_CONFIG[task.status]   || STATUS_CONFIG.todo;
            const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

            return (
              <tr
                key={task._id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
              >
                {/* Title */}
                <td className="px-4 py-3.5">
                  <div className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${status.dot}`} />
                    <div>
                      <p className={`font-medium ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-slate-600 text-[10px] mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                      {task.labels?.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {task.labels.map((l, j) => (
                            <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                              {l}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1 font-semibold ${priority.color}`}>
                    {priority.icon} {priority.label}
                  </span>
                </td>

                {/* Due date */}
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1 ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
                    {task.dueDate && <Calendar size={10} />}
                    {formatDate(task.dueDate)}
                  </span>
                </td>

                {/* Assignee */}
                <td className="px-4 py-3.5">
                  {task.assignedTo ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white">
                        {task.assignedTo.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span className="text-slate-400">{task.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-slate-700">Unassigned</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onArchive(task._id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                    >
                      <Archive size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {sorted.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-slate-600 text-[13px]">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
