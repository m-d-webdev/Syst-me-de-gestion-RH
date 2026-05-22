'use client';

import { useState, useEffect } from 'react';
import { X, Tag, Calendar, User, AlignLeft, Type, Flag, Plus, Trash2 } from 'lucide-react';
import Loader1 from '../Global/Loader1';
import { GET_USERS } from '@/api/Employers/User';
import Select2 from '../ui/select2';
const PRIORITIES = [
  { value: 'low', label: 'Faible', color: 'text-emerald-400' },
  { value: 'medium', label: 'Moyenne', color: 'text-amber-400' },
  { value: 'high', label: 'Élevée', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgente', color: 'text-rose-400' },
];

const STATUSES = [
  { value: 'todo', label: 'À faire' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'in_review', label: 'En révision' },
  { value: 'done', label: 'Terminé' },
];
const LABEL_SUGGESTIONS = [
  'Absences',
  'Formation',
  'Administration',
  'Congés',
  'Urgent',
  'Recrutement',
  'Paie',
  'Contrats',
  'Évaluation',
  'Discipline',
];
export default function TaskModal({ task, defaultStatus, onClose, onSave, WillAssignedTo = [] }) {
  const isEdit = !!task;

  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || defaultStatus || 'todo',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    labels: task?.labels || [],
    assignedTo: task?.assignedTo || null
  });

  const [labelInput, setLabelInput] = useState('');
  const [LoadingWillAssignedTo, setLoadingWillAssignedTo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addLabel = (label) => {
    const trimmed = label.trim();
    if (trimmed && !form.labels.includes(trimmed)) {
      set('labels', [...form.labels, trimmed]);
    }
    setLabelInput('');
  };

  const removeLabel = (label) => set('labels', form.labels.filter((l) => l !== label));

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    try {
      await onSave({
        ...form,
        dueDate: form.dueDate || null,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg  border bg-background rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/20">
          <h2 className="text-[15px] font-semibold text-foreground">
            {isEdit ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg  hover:text-white hover:bg-foreground/10 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <Type size={10} /> Titre
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Que faut-il faire ?"
              className="w-full bg-accent border border-foreground/15 rounded-xl px-3.5 py-2.5 texttext-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60  transition-all"
              autoFocus
            />
            {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <AlignLeft size={10} /> Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Ajouter plus de détails..."
              rows={3}
              className="w-full bg-accent border border-foreground/15 rounded-xl px-3.5 py-2.5 text-[13px] placeholder-slate-600 focus:outline-none focus:border-violet-500/60  transition-all resize-none"
            />
          </div>
          <div className="flex w-full mt-3">
            <Select2
              label='Assigné à'
              icon={<User className='w-4 h-4' />}
              parentClassName={"w-full !h-[45] !bg-accent max-w-none px-0"}
              onChange={(e) => set('assignedTo', e)}
              list={WillAssignedTo.map(u => ({ innerText: `${u.firstName} ${u.lastName}`, value: u._id }))}
            />

          </div>
          {/* Status + Priority row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="w-full bg-accent border border-foreground/15 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-violet-500/60 transition-all appearance-none cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                <Flag size={10} /> Priorité
              </label>
              <select
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className="w-full bg-accent border border-foreground/15 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-violet-500/60 transition-all appearance-none cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Calendar size={10} />Date limite
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => set('dueDate', e.target.value)}
              className="w-full  border border-foreground/15 rounded-xl px-3.5 py-2.5 text-[13px] focus:outline-none focus:border-violet-500/60 transition-all "
            />
          </div>

          {/* Labels */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <Tag size={10} /> Étiquettes
            </label>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {LABEL_SUGGESTIONS.filter((s) => !form.labels.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => addLabel(s)}
                  className="text-[10px] px-2 py-0.5 rounded-full  hover:bg-violet-500/20 opacity-70 transition-all"
                >
                  + {s}
                </button>
              ))}
            </div>

            {/* Active labels */}
            {form.labels.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.labels.map((l) => (
                  <span key={l} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-chart-1/5 text-chart-1  border border-chart-2/30">
                    {l}
                    <button onClick={() => removeLabel(l)} className="hover:text-rose-400 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom label input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLabel(labelInput); } }}
                placeholder="Étiquette personnalisée..."
                className="flex-1 bg-accent border border-foreground/15 rounded-xl px-3 py-2 text-[12px]   focus:outline-none focus:border-violet-500/60 transition-all"
              />
              <button
                onClick={() => addLabel(labelInput)}
                className="px-3 py-2 bg-accent border border-foreground/15 rounded-xl  transition-all"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium   bg-sidebar border border-foreground/20 rounded-xl transition-all"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 flex gap-2 justify-center items-center text-[13px] font-semibold text-white bg-chart-1 hover:bg-violet-500 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-violet-500/20"
          >
            {loading ? <>Enregistrement <Loader1 wh=" w-[15] h-[15]" className='before:border-white' /> </> : isEdit ? 'Enregistrer les modifications' : 'Créer une tâche'}
          </button>
        </div>
      </div>
    </div>
  );
}
