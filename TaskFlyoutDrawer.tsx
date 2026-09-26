import React, { useState } from 'react';
import { Task, Subtask, TaskWorkflowStatus } from '../types';
import {
  X,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus,
  MessageSquare,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface TaskFlyoutDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (updated: Task) => void;
}

export const TaskFlyoutDrawer: React.FC<TaskFlyoutDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateTask
}) => {
  if (!isOpen || !task) return null;

  const [status, setStatus] = useState<string>(task.status);
  const [name, setName] = useState<string>(task.name);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState(task.comments || []);
  const [showStatusPicker, setShowStatusPicker] = useState<boolean>(false);

  const statusOptions: { label: TaskWorkflowStatus; bg: string; text: string }[] = [
    { label: 'Deployed', bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-800' },
    { label: 'In development', bg: 'bg-sky-100 border-sky-300', text: 'text-sky-800' },
    { label: 'Review required', bg: 'bg-amber-100 border-amber-300', text: 'text-amber-800' },
    { label: 'New', bg: 'bg-purple-100 border-purple-300', text: 'text-purple-800' },
    { label: 'Blocked', bg: 'bg-rose-100 border-rose-300', text: 'text-rose-800' }
  ];

  const handleStatusChange = (newStatus: TaskWorkflowStatus) => {
    setStatus(newStatus);
    setShowStatusPicker(false);
    onUpdateTask({ ...task, status: newStatus, name, subtasks, comments });
  };

  const handleToggleSubtask = (stId: string) => {
    const updated = subtasks.map((st) =>
      st.id === stId
        ? {
            ...st,
            status: (st.status === 'Deployed' || st.status === 'Completed'
              ? 'In development'
              : 'Deployed') as TaskWorkflowStatus
          }
        : st
    );
    setSubtasks(updated);
    onUpdateTask({ ...task, status, name, subtasks: updated, comments });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSt: Subtask = {
      id: `ST-${Date.now()}`,
      name: newSubtaskTitle.trim(),
      assignee: task.assignee,
      status: 'New',
      duration: '2d'
    };
    const updated = [...subtasks, newSt];
    setSubtasks(updated);
    setNewSubtaskTitle('');
    onUpdateTask({ ...task, status, name, subtasks: updated, comments });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newComm = {
      id: `comm-${Date.now()}`,
      author: 'Arjun Sharma (You)',
      text: newComment.trim(),
      timestamp: 'Just now'
    };
    const updated = [...comments, newComm];
    setComments(updated);
    setNewComment('');
    onUpdateTask({ ...task, status, name, subtasks, comments: updated });
  };

  const currentStatusObj =
    statusOptions.find((o) => o.label.toLowerCase() === status.toLowerCase()) || {
      label: status as TaskWorkflowStatus,
      bg: 'bg-slate-100 border-slate-300',
      text: 'text-slate-800'
    };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-400">#{task.id}</span>

            {/* Status Dropdown Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStatusPicker(!showStatusPicker)}
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all ${currentStatusObj.bg} ${currentStatusObj.text}`}
              >
                <span>{status}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showStatusPicker && (
                <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-50 space-y-1">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleStatusChange(opt.label)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        status === opt.label ? 'bg-slate-100 font-bold' : ''
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded text-[11px] ${opt.bg} ${opt.text}`}>
                        {opt.label}
                      </span>
                      {status === opt.label && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {task.blocked && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                BLOCKED
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Task Name Field */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                onUpdateTask({ ...task, name: e.target.value });
              }}
              className="text-xl font-extrabold text-slate-900 w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors pb-1"
              placeholder="Task name"
            />
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3" /> Assignee
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                {task.assigneeAvatar ? (
                  <img
                    src={task.assigneeAvatar}
                    alt={task.assignee}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                    {task.assignee.charAt(0)}
                  </div>
                )}
                <span className="font-bold text-slate-800">{task.assignee}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Dates &amp; Duration
              </span>
              <div className="font-semibold text-slate-700 pt-0.5">
                {task.startDate || 'Jul 01'} → {task.dueDate || task.deadline || 'Aug 20'}
                {task.duration && (
                  <span className="ml-1 text-slate-400 font-mono text-[11px]">({task.duration})</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Effort &amp; Time Spent
              </span>
              <div className="font-semibold text-slate-700 pt-0.5">
                {task.timeSpentHours || 0}h logged / {task.effortHours || 40}h estimated
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Role Domain
              </span>
              <div className="font-semibold text-slate-700 pt-0.5">{task.role || 'Full-Stack'}</div>
            </div>
          </div>

          {/* Subtasks Hierarchy List (Wrike Style) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Subtasks ({subtasks.filter((s) => s.status === 'Deployed' || s.status === 'Completed').length}/{subtasks.length})
              </h4>
              <span className="text-[11px] font-semibold text-slate-400">Expandable in Table View</span>
            </div>

            <div className="space-y-2">
              {subtasks.map((st) => {
                const isDone = st.status === 'Deployed' || st.status === 'Completed';
                return (
                  <div
                    key={st.id}
                    onClick={() => handleToggleSubtask(st.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={`truncate font-medium ${isDone ? 'line-through' : ''}`}>
                        {st.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : st.status === 'In development'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Subtask Input */}
            <form onSubmit={handleAddSubtask} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="+ Add a subtask (e.g. Write unit tests)..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </form>
          </div>

          {/* Activity & Comments Thread */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Activity &amp; Collaboration Stream
            </h4>

            <div className="space-y-3">
              {comments.map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-slate-900">{comm.author}</span>
                    <span className="text-slate-400 font-mono">{comm.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{comm.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="space-y-2 pt-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
                placeholder="Write a comment or mention @team..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">All updates sync across Table, Board &amp; Gantt</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
