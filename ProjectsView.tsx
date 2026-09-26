import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Task, Employee } from '../types';
import { calculateRisk, formatCurrency, EMPLOYEES } from '../data/mockData';
import { WrikeTableView } from './views/WrikeTableView';
import { KanbanBoardView } from './views/KanbanBoardView';
import { GanttChartView } from './views/GanttChartView';
import { CalendarView } from './views/CalendarView';
import { TeamWorkloadView } from './views/TeamWorkloadView';
import { OkrPortfolioView } from './views/OkrPortfolioView';
import { AutomationsView } from './views/AutomationsView';
import { TaskFlyoutDrawer } from './TaskFlyoutDrawer';
import {
  Table as TableIcon,
  Kanban,
  Calendar,
  Clock,
  PieChart,
  Zap,
  Layers,
  Search,
  Filter,
  ArrowUpDown,
  Rocket,
  UsersRound,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ChevronDown,
  ArrowLeft,
  FolderGit2,
  FolderOpen
} from 'lucide-react';

export type WorkspaceViewTab =
  | 'table'
  | 'board'
  | 'gantt'
  | 'calendar'
  | 'workload'
  | 'okr'
  | 'automations';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onNavigateToTab: (tab: any, projectId?: number) => void;
  initialSearch?: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onNavigateToTab,
  initialSearch = ''
}) => {
  // Default to the first project so the full Wrike workspace opens immediately
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(projects[0]?.id || 1);
  const [activeViewTab, setActiveViewTab] = useState<WorkspaceViewTab>('table');

  // Search and filter state for projects directory
  const [search, setSearch] = useState<string>(initialSearch);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'risk' | 'progress' | 'name'>('risk');

  // Local state for tasks of active project
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const [projectTasks, setProjectTasks] = useState<Record<number, Task[]>>({
    [activeProject?.id || 1]: activeProject?.tasks || []
  });

  // Task flyout drawer state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskFlyoutOpen, setIsTaskFlyoutOpen] = useState<boolean>(false);

  const currentTasks = projectTasks[activeProject.id] || activeProject.tasks || [];

  const handleOpenTaskFlyout = (task: Task) => {
    setSelectedTask(task);
    setIsTaskFlyoutOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setProjectTasks((prev) => {
      const existing = prev[activeProject.id] || activeProject.tasks || [];
      const updatedList = existing.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      return { ...prev, [activeProject.id]: updatedList };
    });
    setSelectedTask(updatedTask);
  };

  const handleAddTask = (newTask: Partial<Task>) => {
    const task: Task = {
      id: newTask.id || `T-${Date.now().toString().slice(-4)}`,
      name: newTask.name || 'New Deliverable',
      assignee: newTask.assignee || 'Priya Sharma',
      status: newTask.status || 'New',
      blocked: !!newTask.blocked,
      duration: newTask.duration || '5d',
      effortHours: newTask.effortHours || 25,
      timeSpentHours: newTask.timeSpentHours || 0
    };
    setProjectTasks((prev) => {
      const existing = prev[activeProject.id] || activeProject.tasks || [];
      return { ...prev, [activeProject.id]: [...existing, task] };
    });
  };

  const categories = ['ALL', 'E-Commerce', 'FinTech', 'Healthcare', 'Logistics', 'GovTech', 'Retail', 'IoT'];

  const filteredProjects = projects
    .filter((p) => {
      if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
      if (categoryFilter !== 'ALL' && p.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.manager.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const riskA = calculateRisk(a).riskScore;
      const riskB = calculateRisk(b).riskScore;
      if (sortBy === 'risk') return riskB - riskA;
      if (sortBy === 'progress') return a.progress - b.progress;
      return a.name.localeCompare(b.name);
    });

  const viewTabs: { id: WorkspaceViewTab; label: string; icon: any }[] = [
    { id: 'table', label: 'Table', icon: TableIcon },
    { id: 'board', label: 'Board', icon: Kanban },
    { id: 'gantt', label: 'Gantt Chart', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'workload', label: 'Team Workload', icon: UsersRound },
    { id: 'okr', label: 'OKR Overview', icon: PieChart },
    { id: 'automations', label: 'Automations', icon: Zap }
  ];

  const currentRisk = calculateRisk(activeProject);

  // --------------------------------------------------------------------------
  // VIEW A: ALL PROJECTS DIRECTORY (When selectedProjectId === null)
  // --------------------------------------------------------------------------
  if (selectedProjectId === null) {
    return (
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Workspace Directory
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500">100 Projects Active</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Select a Project to Open Workspace
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Click any project below (such as E-Commerce Platform, UPI 2.0, or Healthcare Portal) to open its Table, Kanban Board, Gantt Chart, Calendar, and Workload.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong>{filteredProjects.length}</strong> of 100 projects
            </span>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by project name, category, or manager..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="ON TRACK">On Track</option>
              <option value="AT RISK">At Risk</option>
              <option value="DELAYED">Delayed</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="risk">Sort by: Risk Score</option>
              <option value="progress">Sort by: Progress</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>

        {/* Project Cards Grid (Click to Open Workspace) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((p) => {
            const risk = calculateRisk(p);

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => setSelectedProjectId(p.id)}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-500/80 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
                      {p.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        p.status === 'ON TRACK'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'AT RISK'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition-colors flex items-center justify-between">
                    <span>{p.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0" />
                  </h3>

                  <div className="text-xs text-slate-500 mt-1">
                    Lead: <span className="font-semibold text-slate-700">{p.manager}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-slate-800 font-mono">{p.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${p.progress}%` }}
                        className={`h-full rounded-full ${
                          p.status === 'ON TRACK'
                            ? 'bg-emerald-500'
                            : p.status === 'AT RISK'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer details */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono">Deadline: {p.deadline}</span>
                  <span className="text-emerald-800 font-bold group-hover:underline flex items-center gap-1">
                    <span>Open Workspace</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW B: DETAILED PROJECT WORKSPACE (Table, Board, Gantt, Calendar, etc.)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-4 pb-12">
      {/* Top Project Context Bar with "Back to Projects" Button */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {activeProject.category}
              </span>
              <span className="text-slate-300">•</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  activeProject.status === 'ON TRACK'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activeProject.status === 'AT RISK'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {activeProject.status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {activeProject.name}
            </h1>
            <p className="text-xs text-slate-500">
              Lead: <strong className="text-slate-700">{activeProject.manager}</strong> · Due: <span className="font-mono">{activeProject.deadline}</span> · Budget: <span className="font-mono font-bold text-slate-800">{formatCurrency(activeProject.budget)}</span>
            </p>
          </div>
        </div>

        {/* Quick Project Switcher Dropdown & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={activeProject.id}
            onChange={(e) => setSelectedProjectId(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.status})
              </option>
            ))}
          </select>

          <button
            onClick={() => onNavigateToTab('boost_mode', activeProject.id)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Boost Project</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Wrike-Style View Switcher (Table, Board, Gantt, Calendar, Workload, OKR) */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        {viewTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeViewTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveViewTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Workspace View Rendering */}
      <div>
        {activeViewTab === 'table' && (
          <WrikeTableView
            tasks={currentTasks}
            projectName={activeProject.name}
            onSelectTask={handleOpenTaskFlyout}
            onUpdateTask={handleUpdateTask}
            onAddTask={handleAddTask}
          />
        )}

        {activeViewTab === 'board' && (
          <KanbanBoardView
            tasks={currentTasks}
            onSelectTask={handleOpenTaskFlyout}
            onUpdateTask={handleUpdateTask}
            onAddTask={handleAddTask}
          />
        )}

        {activeViewTab === 'gantt' && (
          <GanttChartView
            tasks={currentTasks}
            onSelectTask={handleOpenTaskFlyout}
          />
        )}

        {activeViewTab === 'calendar' && (
          <CalendarView
            tasks={currentTasks}
            onSelectTask={handleOpenTaskFlyout}
          />
        )}

        {activeViewTab === 'workload' && (
          <TeamWorkloadView
            employees={EMPLOYEES}
            onTriggerReallocation={() => onNavigateToTab('talent_reallocation', activeProject.id)}
          />
        )}

        {activeViewTab === 'okr' && <OkrPortfolioView />}

        {activeViewTab === 'automations' && <AutomationsView />}
      </div>

      {/* Slide-out Task Editing Flyout Drawer */}
      <TaskFlyoutDrawer
        task={selectedTask}
        isOpen={isTaskFlyoutOpen}
        onClose={() => setIsTaskFlyoutOpen(false)}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};
