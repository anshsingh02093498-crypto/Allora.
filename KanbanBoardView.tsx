import React, { useState } from 'react';
import { Task, TaskWorkflowStatus } from '../../types';
import {
  Plus,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowLeft,
  User
} from 'lucide-react';

interface KanbanBoardViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onAddTask: (newTask: Partial<Task>) => void;
}

export const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({
  tasks,
  onSelectTask,
  onUpdateTask,
  onAddTask
}) => {
  const [addingInColumn, setAddingInColumn] = useState<string | null>(null);
  const [quickTitle, setQuickTitle] = useState<string>('');

  const columns: { id: TaskWorkflowStatus; label: string; headerColor: string; badgeColor: string }[] = [
    {
      id: 'New',
      label: 'New',
      headerColor: 'border-purple-400 text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'In development',
      label: 'In progress',
      headerColor: 'border-sky-400 text-sky-900',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'Review required',
      label: 'Review required',
      headerColor: 'border-amber-400 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'Deployed',
      label: 'Completed',
      headerColor: 'border-emerald-400 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    }
  ];

  const getTasksForColumn = (colId: TaskWorkflowStatus) => {
    return tasks.filter((t) => {
      const s = t.status.toLowerCase();
      if (colId === 'Deployed') return s.includes('deploy') || s.includes('complet');
      if (colId === 'In development') return s.includes('dev') || s.includes('progress');
      if (colId === 'Review required') return s.includes('review');
      if (colId === 'New') return s.includes('new') || s.includes('not started');
      return false;
    });
  };

  const handleMoveStatus = (task: Task, direction: 'forward' | 'back', e: React.MouseEvent) => {
    e.stopPropagation();
    const order: TaskWorkflowStatus[] = ['New', 'In development', 'Review required', 'Deployed'];
    const currentStatus = (task.status as TaskWorkflowStatus) || 'New';
    const currentIdx = order.indexOf(currentStatus);
    const newIdx = direction === 'forward' ? currentIdx + 1 : currentIdx - 1;
    if (newIdx >= 0 && newIdx < order.length) {
      onUpdateTask({ ...task, status: order[newIdx] });
    }
  };

  const handleQuickAdd = (colId: TaskWorkflowStatus, e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onAddTask({
      id: `T-${Date.now().toString().slice(-4)}`,
      name: quickTitle.trim(),
      assignee: 'Rahul Sharma',
      status: colId,
      blocked: false,
      duration: '7d',
      effortHours: 30,
      timeSpentHours: 0
    });
    setQuickTitle('');
    setAddingInColumn(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {columns.map((col) => {
        const colTasks = getTasksForColumn(col.id);
        const isAdding = addingInColumn === col.id;

        return (
          <div
            key={col.id}
            className="bg-slate-100/80 rounded-2xl p-3 border border-slate-200 flex flex-col min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-2 py-2 mb-2 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-800">{col.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${col.badgeColor}`}
                >
                  {colTasks.length}
                </span>
              </div>

              <button
                onClick={() => setAddingInColumn(col.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                title="Quick Add Task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Task Cards Container */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                >
                  {/* Card Title & Blocked Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {task.name}
                    </span>
                    {task.blocked && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200 shrink-0 flex items-center gap-0.5">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        Blocked
                      </span>
                    )}
                  </div>

                  {/* Subtask count if any */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-slate-400" />
                      <span>
                        {task.subtasks.filter((s) => s.status === 'Deployed').length}/
                        {task.subtasks.length} subtasks
                      </span>
                    </div>
                  )}

                  {/* Card Footer: Assignee & Stage Shifts */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-1.5">
                      {task.assigneeAvatar ? (
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assignee}
                          className="w-5 h-5 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold text-[9px] flex items-center justify-center">
                          {task.assignee.charAt(0)}
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[80px]">
                        {task.assignee}
                      </span>
                    </div>

                    {/* Move Controls */}
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {col.id !== 'New' && (
                        <button
                          onClick={(e) => handleMoveStatus(task, 'back', e)}
                          title="Move backward"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {col.id !== 'Deployed' && (
                        <button
                          onClick={(e) => handleMoveStatus(task, 'forward', e)}
                          title="Advance stage"
                          className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Add Form (Wrike Style "+ Item") */}
              {isAdding ? (
                <form
                  onSubmit={(e) => handleQuickAdd(col.id, e)}
                  className="bg-white p-3 rounded-xl border-2 border-indigo-500 shadow-sm space-y-2 animate-fade-in"
                >
                  <input
                    type="text"
                    autoFocus
                    value={quickTitle}
                    onChange={(e) => setQuickTitle(e.target.value)}
                    placeholder="Enter task name..."
                    className="w-full text-xs font-medium focus:outline-none placeholder:text-slate-400"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-700"
                    >
                      + Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingInColumn(null);
                        setQuickTitle('');
                      }}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setAddingInColumn(col.id)}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Item</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
