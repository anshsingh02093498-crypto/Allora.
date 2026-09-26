import React, { useState } from 'react';
import { Task, Subtask, TaskWorkflowStatus } from '../../types';
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  SlidersHorizontal,
  Share2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserPlus
} from 'lucide-react';

interface WrikeTableViewProps {
  tasks: Task[];
  projectName: string;
  onSelectTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onAddTask: (newTask: Partial<Task>) => void;
}

export const WrikeTableView: React.FC<WrikeTableViewProps> = ({
  tasks,
  projectName,
  onSelectTask,
  onUpdateTask,
  onAddTask
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'T-101': true,
    'T-102': true,
    'T-103': true
  });
  const [activeDropdownTaskId, setActiveDropdownTaskId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [showNewTaskRow, setShowNewTaskRow] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('Rahul Sharma');

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('deploy') || s.includes('complet')) {
      return {
        label: 'Deployed',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        dot: 'bg-emerald-500'
      };
    }
    if (s.includes('dev') || s.includes('progress')) {
      return {
        label: 'In development',
        bg: 'bg-sky-50 text-sky-800 border-sky-300',
        dot: 'bg-sky-500'
      };
    }
    if (s.includes('review')) {
      return {
        label: 'Review required',
        bg: 'bg-amber-50 text-amber-800 border-amber-300',
        dot: 'bg-amber-500'
      };
    }
    if (s.includes('block')) {
      return {
        label: 'Blocked',
        bg: 'bg-rose-50 text-rose-800 border-rose-300',
        dot: 'bg-rose-500'
      };
    }
    return {
      label: 'New',
      bg: 'bg-purple-50 text-purple-800 border-purple-300',
      dot: 'bg-purple-500'
    };
  };

  const statusOptions: TaskWorkflowStatus[] = [
    'Deployed',
    'In development',
    'Review required',
    'New',
    'Blocked'
  ];

  const handleStatusSelect = (task: Task, newStatus: TaskWorkflowStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateTask({ ...task, status: newStatus });
    setActiveDropdownTaskId(null);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(filterText.toLowerCase()) ||
      t.assignee.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus =
      selectedStatusFilter === 'All' ||
      t.status.toLowerCase().includes(selectedStatusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleCreateNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    onAddTask({
      id: `T-${Date.now().toString().slice(-4)}`,
      name: newTaskName.trim(),
      assignee: newTaskAssignee,
      status: 'New',
      blocked: false,
      startDate: '2026-09-20',
      dueDate: '2026-10-10',
      duration: '14d',
      effortHours: 40,
      timeSpentHours: 0
    });
    setNewTaskName('');
    setShowNewTaskRow(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* Top Action Toolbar (Mirroring Wrike's Table Header) */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Quick Search in Table */}
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search table tasks..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Quick Filter */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {['All', 'Deployed', 'In development', 'Review required', 'New'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatusFilter === st
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewTaskRow(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Main Hierarchical Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[280px]">Name</th>
              <th className="py-3 px-4 min-w-[180px]">Assignee</th>
              <th className="py-3 px-4 min-w-[160px]">Status</th>
              <th className="py-3 px-4 min-w-[90px]">Duration</th>
              <th className="py-3 px-4 min-w-[90px]">Effort</th>
              <th className="py-3 px-4 min-w-[90px]">Time Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 text-xs text-slate-800">
            {filteredTasks.map((task, idx) => {
              const isExpanded = !!expandedRows[task.id];
              const badge = getStatusBadge(task.status);
              const hasSubtasks = task.subtasks && task.subtasks.length > 0;

              return (
                <React.Fragment key={task.id}>
                  {/* Parent Task Row */}
                  <tr
                    onClick={() => onSelectTask(task)}
                    className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-[11px] text-slate-400 font-semibold">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      {hasSubtasks ? (
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(task.id, e)}
                          className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      ) : (
                        <span className="w-6 inline-block" />
                      )}
                      <span className="group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                        {task.name}
                        {task.blocked && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                            Blocked
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {task.assigneeAvatar ? (
                          <img
                            src={task.assigneeAvatar}
                            alt={task.assignee}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                            {task.assignee.charAt(0)}
                          </div>
                        )}
                        <span className="font-semibold text-slate-700">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 relative">
                      {/* Interactive Status Pill Dropdown */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownTaskId(
                            activeDropdownTaskId === task.id ? null : task.id
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all shadow-2xs ${badge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                      </button>

                      {activeDropdownTaskId === task.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-4 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-40 space-y-1 animate-scale-in"
                        >
                          {statusOptions.map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={(e) => handleStatusSelect(task, st, e)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center justify-between"
                            >
                              <span>{st}</span>
                              {task.status.toLowerCase() === st.toLowerCase() && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-medium">
                      {task.duration || '12d'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-medium">
                      {task.effortHours || 40}h
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 font-bold">
                      {task.timeSpentHours || 0}h
                    </td>
                  </tr>

                  {/* Expandable Subtask Rows (Indented Wrike Style) */}
                  {hasSubtasks &&
                    isExpanded &&
                    task.subtasks!.map((st, sIdx) => {
                      const stBadge = getStatusBadge(st.status);
                      return (
                        <tr
                          key={st.id}
                          onClick={() => onSelectTask(task)}
                          className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors cursor-pointer text-[11px]"
                        >
                          <td className="py-2.5 px-4 text-center font-mono text-slate-300">
                            {idx + 1}.{sIdx + 1}
                          </td>
                          <td className="py-2.5 px-4 pl-12 flex items-center gap-2 text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span>{st.name}</span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-500 font-medium">
                            {st.assignee}
                          </td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stBadge.bg}`}
                            >
                              {stBadge.label}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-400">
                            {st.duration || '3d'}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-400">12h</td>
                          <td className="py-2.5 px-4 font-mono text-slate-500">10h</td>
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}

            {/* Inline New Task Row Form */}
            {showNewTaskRow && (
              <tr className="bg-indigo-50/40 border-t-2 border-indigo-500">
                <td className="py-3 px-4 text-center font-mono text-slate-400">+</td>
                <td className="py-3 px-4" colSpan={2}>
                  <form onSubmit={handleCreateNewTask} className="flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      placeholder="Enter task name (e.g. Integrate Redis caching)..."
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-indigo-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <select
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      className="px-2 py-1.5 rounded-xl bg-white border border-indigo-300 text-xs"
                    >
                      <option value="Rahul Sharma">Rahul Sharma</option>
                      <option value="Aman Verma">Aman Verma</option>
                      <option value="Priya Nair">Priya Nair</option>
                      <option value="Karan Singhania">Karan Singhania</option>
                      <option value="Kabir Mehta">Kabir Mehta</option>
                    </select>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewTaskRow(false)}
                      className="px-2 py-1 rounded-xl text-slate-500 text-xs hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  </form>
                </td>
                <td colSpan={4} className="py-3 px-4 text-right text-xs text-slate-400">
                  Press enter to save
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => setShowNewTaskRow(true)}
          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add new task</span>
        </button>

        <span className="font-medium">
          Showing {filteredTasks.length} of {tasks.length} tasks in {projectName}
        </span>
      </div>
    </div>
  );
};
