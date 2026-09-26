import React, { useState } from 'react';
import { Task } from '../../types';
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface GanttChartViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const GanttChartView: React.FC<GanttChartViewProps> = ({ tasks, onSelectTask }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'T-101': true,
    'T-102': true,
    'T-103': true
  });
  const [zoomLevel, setZoomLevel] = useState<'weeks' | 'days'>('weeks');

  const timelineWeeks = [
    { label: 'Jul 1 - 7', startDay: 1 },
    { label: 'Jul 8 - 14', startDay: 8 },
    { label: 'Jul 15 - 21', startDay: 15 },
    { label: 'Jul 22 - 28', startDay: 22 },
    { label: 'Aug 1 - 7', startDay: 29 },
    { label: 'Aug 8 - 14', startDay: 36 },
    { label: 'Aug 15 - 21', startDay: 43 },
    { label: 'Aug 22 - 28', startDay: 50 },
    { label: 'Sep 1 - 7', startDay: 57 },
    { label: 'Sep 8 - 14', startDay: 64 },
    { label: 'Sep 15 - 21', startDay: 71 },
    { label: 'Sep 22 - 28', startDay: 78 }
  ];

  // Helper to map tasks to Gantt bar offsets and widths
  const getGanttBarStyle = (index: number, isSubtask = false) => {
    // Deterministic positions based on task index
    const offsets = [
      { left: 2, width: 22, color: 'bg-emerald-500' }, // T-101 Deployed
      { left: 18, width: 45, color: 'bg-indigo-600' }, // T-102 In dev
      { left: 45, width: 38, color: 'bg-amber-500' }, // T-103 Review required
      { left: 70, width: 20, color: 'bg-purple-500' }, // T-104 New
      { left: 82, width: 15, color: 'bg-slate-400' } // T-105 New
    ];

    const current = offsets[index % offsets.length];
    const leftPercent = isSubtask ? current.left + 4 : current.left;
    const widthPercent = isSubtask ? Math.max(10, current.width * 0.4) : current.width;

    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
      color: current.color
    };
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Top Gantt Toolbar */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Interactive Gantt Delivery Timeline</span>
          </div>
          <span className="text-[11px] text-slate-400">|</span>
          <span className="text-xs text-slate-500">Critical Path &amp; Milestone Dependencies</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-xs">
            <button
              onClick={() => setZoomLevel('days')}
              className={`px-2 py-1 rounded font-semibold ${
                zoomLevel === 'days' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              Days
            </button>
            <button
              onClick={() => setZoomLevel('weeks')}
              className={`px-2 py-1 rounded font-semibold ${
                zoomLevel === 'weeks' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              Weeks
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Pane Gantt Container */}
      <div className="flex overflow-x-auto min-h-[460px]">
        {/* Left Tree Pane (Task Titles & Dates) */}
        <div className="w-96 border-r border-slate-200 shrink-0 bg-white z-10">
          <div className="grid grid-cols-12 bg-slate-100/80 border-b border-slate-200 py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            <div className="col-span-6">Title</div>
            <div className="col-span-3 text-center">Start</div>
            <div className="col-span-3 text-center">Due Date</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {tasks.map((task, idx) => {
              const isExp = !!expanded[task.id];
              const hasSubs = task.subtasks && task.subtasks.length > 0;

              return (
                <React.Fragment key={task.id}>
                  {/* Parent Task */}
                  <div
                    onClick={() => onSelectTask(task)}
                    className="grid grid-cols-12 py-3.5 px-4 items-center hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="col-span-6 flex items-center gap-1.5 font-bold text-slate-900 truncate">
                      {hasSubs ? (
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(task.id, e)}
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                        >
                          {isExp ? (
                            <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                      ) : (
                        <span className="w-4" />
                      )}
                      <span className="truncate">{task.name}</span>
                    </div>

                    <div className="col-span-3 text-center font-mono text-[11px] text-slate-500">
                      {task.startDate || '07/01/26'}
                    </div>
                    <div className="col-span-3 text-center font-mono text-[11px] text-slate-500">
                      {task.dueDate || task.deadline || '08/20/26'}
                    </div>
                  </div>

                  {/* Subtasks */}
                  {hasSubs &&
                    isExp &&
                    task.subtasks!.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => onSelectTask(task)}
                        className="grid grid-cols-12 py-2.5 px-4 items-center bg-slate-50/50 hover:bg-slate-100/70 cursor-pointer transition-colors text-[11px]"
                      >
                        <div className="col-span-6 pl-7 flex items-center gap-1.5 text-slate-600 truncate font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          <span className="truncate">{st.name}</span>
                        </div>
                        <div className="col-span-3 text-center font-mono text-slate-400">07/05/26</div>
                        <div className="col-span-3 text-center font-mono text-slate-400">07/15/26</div>
                      </div>
                    ))}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Timeline Pane */}
        <div className="flex-1 min-w-[700px] overflow-x-auto relative bg-slate-50/30">
          {/* Timeline Header (Weeks/Days) */}
          <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-100/80 py-3 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            {timelineWeeks.map((week) => (
              <div key={week.label} className="border-r border-slate-200/60 px-1 truncate">
                {week.label}
              </div>
            ))}
          </div>

          {/* Gantt Timeline Rows */}
          <div className="divide-y divide-slate-100 relative">
            {tasks.map((task, idx) => {
              const isExp = !!expanded[task.id];
              const bar = getGanttBarStyle(idx);
              const hasSubs = task.subtasks && task.subtasks.length > 0;

              return (
                <React.Fragment key={`bar-${task.id}`}>
                  {/* Parent Bar Row */}
                  <div
                    onClick={() => onSelectTask(task)}
                    className="h-[49px] relative flex items-center px-2 hover:bg-indigo-50/30 cursor-pointer group transition-colors"
                  >
                    {/* Grid Background Lines */}
                    <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                      {timelineWeeks.map((w, i) => (
                        <div key={i} className="border-r border-slate-200/40 h-full" />
                      ))}
                    </div>

                    {/* Timeline Bar */}
                    <div
                      style={{ left: bar.left, width: bar.width }}
                      className={`absolute h-7 rounded-lg ${bar.color} text-white text-[11px] font-bold flex items-center justify-between px-2.5 shadow-sm transition-all group-hover:brightness-110 group-hover:scale-y-105`}
                    >
                      <span className="truncate pr-1">{task.name}</span>

                      {/* Assignee Circle */}
                      {task.assigneeAvatar ? (
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assignee}
                          className="w-5 h-5 rounded-full border border-white shrink-0"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                          {task.assignee.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtask Timeline Bars */}
                  {hasSubs &&
                    isExp &&
                    task.subtasks!.map((st, sIdx) => {
                      const subBar = getGanttBarStyle(idx, true);
                      const isDone = st.status === 'Deployed' || st.status === 'Completed';

                      return (
                        <div
                          key={`sub-bar-${st.id}`}
                          onClick={() => onSelectTask(task)}
                          className="h-[37px] relative flex items-center px-2 bg-slate-50/40 hover:bg-slate-100/50 cursor-pointer"
                        >
                          <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                            {timelineWeeks.map((w, i) => (
                              <div key={i} className="border-r border-slate-200/20 h-full" />
                            ))}
                          </div>

                          <div
                            style={{ left: `${Number(subBar.left.replace('%', '')) + sIdx * 5}%`, width: '18%' }}
                            className={`absolute h-5 rounded-md ${
                              isDone ? 'bg-emerald-400' : 'bg-indigo-400'
                            } text-white text-[10px] font-medium flex items-center px-2 truncate`}
                          >
                            <span className="truncate">{st.name}</span>
                          </div>
                        </div>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
