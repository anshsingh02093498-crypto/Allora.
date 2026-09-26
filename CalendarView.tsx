import React, { useState } from 'react';
import { Task } from '../../types';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';

interface CalendarViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onSelectTask }) => {
  const [currentMonth, setCurrentMonth] = useState<string>('September 2026');

  // Days of week
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calendar dates representation (for September 2026)
  // Sep 1 is Tuesday, so Monday is previous month or blank (day 31)
  const calendarCells = [
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true, isToday: true }, // Current local date in environment
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false }
  ];

  // Scheduled events on dates (Wrike style multi-day bars)
  const scheduledTasks = [
    {
      id: 'T-101',
      title: 'UI Design & Catalog Library',
      daysSpan: [1, 2, 3, 4],
      color: 'bg-emerald-500 text-white',
      assignee: 'Priya Nair'
    },
    {
      id: 'T-102',
      title: 'Backend Catalog Microservice',
      daysSpan: [7, 8, 9, 10, 11],
      color: 'bg-indigo-600 text-white',
      assignee: 'Rahul Sharma'
    },
    {
      id: 'T-103',
      title: 'Payment Gateway Integration',
      daysSpan: [15, 16, 17, 18],
      color: 'bg-amber-500 text-white',
      assignee: 'Aman Verma',
      blocked: true
    },
    {
      id: 'T-104',
      title: 'End-to-End Regression Testing',
      daysSpan: [21, 22, 23, 24, 25],
      color: 'bg-purple-600 text-white',
      assignee: 'Karan Singhania'
    },
    {
      id: 'T-105',
      title: 'Production SSL & Kubernetes Deploy',
      daysSpan: [28, 29, 30],
      color: 'bg-slate-700 text-white',
      assignee: 'Kabir Mehta'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Calendar Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs">
            Today
          </button>
          <div className="flex items-center gap-1.5 font-extrabold text-sm text-slate-800">
            <button className="p-1 rounded hover:bg-slate-200 text-slate-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>{currentMonth}</span>
            <button className="p-1 rounded hover:bg-slate-200 text-slate-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Month View</span>
          <span className="text-xs text-slate-300">|</span>
          <label className="text-xs text-slate-600 font-medium flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
            <span>Show weekends</span>
          </label>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100/70 text-center py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 divide-x divide-y divide-slate-200/80 bg-slate-50/20">
        {calendarCells.map((cell, idx) => {
          // Check if any scheduled tasks fall on this day
          const matchingTasks = scheduledTasks.filter(
            (t) => cell.isCurrentMonth && t.daysSpan.includes(cell.day)
          );

          return (
            <div
              key={idx}
              className={`min-h-[105px] p-2 flex flex-col justify-between transition-colors ${
                cell.isCurrentMonth ? 'bg-white hover:bg-slate-50/70' : 'bg-slate-50 text-slate-300'
              }`}
            >
              {/* Day Number Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    cell.isToday
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : cell.isCurrentMonth
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {cell.day}
                </span>

                {cell.isToday && (
                  <span className="text-[10px] font-extrabold text-indigo-600 uppercase">Today</span>
                )}
              </div>

              {/* Task Badges on this Day */}
              <div className="space-y-1 mt-1 flex-1">
                {matchingTasks.map((t) => {
                  const originalTask = tasks.find((tk) => tk.id === t.id) || tasks[0];
                  return (
                    <div
                      key={t.id}
                      onClick={() => onSelectTask(originalTask)}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold truncate cursor-pointer shadow-2xs flex items-center justify-between ${t.color} hover:brightness-110`}
                      title={`${t.title} (${t.assignee})`}
                    >
                      <span className="truncate">{t.title}</span>
                      <span className="text-[9px] opacity-80 shrink-0 ml-1">{t.assignee.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
