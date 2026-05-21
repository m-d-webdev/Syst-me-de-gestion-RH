'use client';

import { useState, useEffect, useCallback } from 'react';
import KanbanColumn from '@/components/board/KanbanColumn';
import ListView from '@/components/board/ListView';
import TaskModal from '@/components/board/TaskModal';
import { CREATE_TACHE, DELETE_TACHE, GET_TACHES, UPDATE_TACHE } from '@/api/Tache';
import { GET_USERS } from '@/api/Employers/User';

const COLUMNS = [
  { id: 'todo', label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'in_review', label: 'En révision' },
  { id: 'done', label: 'Terminé' },
];

export default function BoardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);   // null | { mode: 'create'|'edit', task?, defaultStatus? }
  const [dragTask, setDragTask] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [toast, setToast] = useState(null);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = { archived: 'false', limit: 100 };
      if (search) params.search = search;
      const res = await GET_TACHES({ params });
      setTasks(res.data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Toast ────────────────────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Modal helpers ────────────────────────────────────────────────────────
  const openCreate = (defaultStatus) => setModal({ mode: 'create', defaultStatus });
  const openEdit = (task) => setModal({ mode: 'edit', task });
  const closeModal = () => setModal(null);

  // ── CRUD handlers ────────────────────────────────────────────────────────
  const handleSave = async (formData) => {
    if (modal.mode === 'create') {
      const res = await CREATE_TACHE({ body: formData });
      setTasks((prev) => [...prev, res.data]);
      showToast('Task created');
    } else {
      const res = await UPDATE_TACHE({ id: modal.task._id, body: formData });
      setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      showToast('Task updated');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task permanently?')) return;
    await DELETE_TACHE({ id });
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast('Task deleted');
  };

  const handleArchive = async (id) => {
    await UPDATE_TACHE({ id, body: { archived: true } });
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast('Task archived');
  };

  // ── Drag & Drop ──────────────────────────────────────────────────────────
  const handleDragStart = (task) => setDragTask(task);

  const handleDrop = async (targetColumnId) => {
    if (!dragTask || dragTask.status === targetColumnId) { setDragTask(null); return; }
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === dragTask._id ? { ...t, status: targetColumnId } : t))
    );
    try {
      await UPDATE_TACHE({ id: dragTask._id, body: { status: targetColumnId } });
    } catch {
      fetchTasks(); // rollback
    }
    setDragTask(null);
    setDragOverCol(null);
  };

  // ── Derived data ─────────────────────────────────────────────────────────
  const tasksByColumn = (colId) => tasks.filter((t) => t.status === colId);

  const [WillAssignedTo, setWillAssignedTo] = useState([]);

  const GetWillAssignedToUsers = async () => {
    const res = await GET_USERS({ role: "hr_agent" });
    setWillAssignedTo(res.data)
  }

  useEffect(() => {
    GetWillAssignedToUsers();
  }, [])


  return (
    <div className="min-h-screen  w-full font-sans">
      {/* Ambient background */}

      <main className="relative">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              <p className="text-[13px] text-slate-500">Loading tasks...</p>
            </div>
          </div>
        ) : viewMode === 'board' ? (
          /* ── Kanban Board ── */
          <div className="flex gap-4 px-6 py-6 overflow-x-auto min-h-[calc(100vh-60px)] items-start">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={tasksByColumn(col.id)}
                onAddTask={openCreate}
                onEditTask={openEdit}
                onDeleteTask={handleDelete}
                onArchiveTask={handleArchive}
                onDragStart={handleDragStart}
                onDragOver={setDragOverCol}
                onDrop={handleDrop}
                dragOverColumn={dragOverCol}
              />
            ))}
          </div>
        ) : (
          /* ── List View ── */
          <div className="px-6 py-6">
            <div className="bg-[#131525] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-white">All Tasks</h2>
                <span className="text-[11px] text-slate-500">{tasks.length} tasks</span>
              </div>
              <ListView
                tasks={tasks}
                onEdit={openEdit}
                onDelete={handleDelete}
                onArchive={handleArchive}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <TaskModal
          WillAssignedTo={WillAssignedTo}
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`
          fixed bottom-5 right-5 z-50 flex items-center gap-2.5
          px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium
          border animate-in slide-in-from-bottom-3 duration-300
          ${toast.type === 'error'
            ? 'bg-rose-950 border-rose-500/30 text-rose-200'
            : 'bg-[#1e2132] border-white/[0.08] text-slate-200'}
        `}>
          <span className={`w-1.5 h-1.5 rounded-full ${toast.type === 'error' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
          {toast.msg}
        </div>
      )}
    </div>
  );
}