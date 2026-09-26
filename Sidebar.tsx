import React, { useState } from 'react';
import { LOGO_SRC } from '../data/mockData';
import { UserSession } from '../types';
import { NavTab } from './Navbar';
import {
  LayoutDashboard,
  FolderGit2,
  PieChart,
  UsersRound,
  Rocket,
  Wand2,
  SlidersHorizontal,
  ShieldCheck,
  BotMessageSquare,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  TrendingUp,
  CircleDot
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab, projectId?: number) => void;
  user: UserSession;
  onLogout: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenFeatureModal?: (featureKey: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onLogout,
  collapsed,
  onToggleCollapse,
  onOpenFeatureModal
}) => {
  // State to manage whether the Dashboard nested options are expanded
  const [dashboardExpanded, setDashboardExpanded] = useState<boolean>(true);

  // Helper to handle sub navigation under Dashboard
  const handleDashboardSubClick = (sub: 'overview' | 'boost_alpha' | 'okr_financials') => {
    if (sub === 'overview') {
      onSelectTab('dashboard');
    } else if (sub === 'boost_alpha') {
      onSelectTab('boost_mode', 1);
    } else if (sub === 'okr_financials') {
      onSelectTab('okr');
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200/90 z-30 transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* 1. Header & Brand */}
      <div className="h-16 px-4 border-b border-slate-200/80 flex items-center justify-between shrink-0">
        {!collapsed ? (
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 shadow-xs flex items-center justify-center p-0.5 overflow-hidden">
              <img src={LOGO_SRC} alt="ALLORA" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">ALLORA</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/70">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 -mt-0.5">Project Monitoring</p>
            </div>
          </div>
        ) : (
          <div
            className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 shadow-xs flex items-center justify-center p-0.5 cursor-pointer"
            onClick={() => onSelectTab('dashboard')}
          >
            <img src={LOGO_SRC} alt="ALLORA" className="w-full h-full object-contain rounded-lg" />
          </div>
        )}

        {/* Collapse toggle button */}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors hidden lg:flex items-center justify-center"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Nav Groups & Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
        {/* GROUP 1: MAIN MENU */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
            </div>
          )}

          <div className="space-y-1">
            {/* Dashboard Item with Sub-options */}
            <div>
              <button
                onClick={() => {
                  onSelectTab('dashboard');
                  setDashboardExpanded((prev) => !prev);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                title={collapsed ? 'Dashboard' : undefined}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard
                    className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-sky-600' : 'text-slate-400'}`}
                  />
                  {!collapsed && <span>Dashboard</span>}
                </div>
                {!collapsed && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      dashboardExpanded ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Sub-options under Dashboard as requested: "Boost Project Alpha" & "OKR Financials" */}
              {!collapsed && dashboardExpanded && (
                <div className="ml-5 pl-2.5 my-1 space-y-1 border-l-2 border-slate-200">
                  <button
                    onClick={() => handleDashboardSubClick('overview')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                      activeTab === 'dashboard'
                        ? 'text-sky-700 bg-sky-50/50 font-bold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <CircleDot className="w-2.5 h-2.5 text-sky-600" />
                    <span>Executive Overview</span>
                  </button>

                  <button
                    onClick={() => handleDashboardSubClick('boost_alpha')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50/50"
                  >
                    <Rocket className="w-3 h-3 text-amber-500" />
                    <span>Boost Project Alpha</span>
                  </button>

                  <button
                    onClick={() => handleDashboardSubClick('okr_financials')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5 text-slate-600 hover:text-sky-700 hover:bg-sky-50/50"
                  >
                    <TrendingUp className="w-3 h-3 text-sky-600" />
                    <span>OKR Financials (₹)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Workspaces (Projects) */}
            <button
              onClick={() => onSelectTab('projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Workspaces (Projects)' : undefined}
            >
              <FolderGit2
                className={`w-4 h-4 ${activeTab === 'projects' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>Workspaces</span>}
            </button>

            {/* OKR Analytics */}
            <button
              onClick={() => onSelectTab('okr')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'okr'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'OKR Analytics' : undefined}
            >
              <PieChart
                className={`w-4 h-4 ${activeTab === 'okr' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>OKR Analytics</span>}
            </button>
          </div>
        </div>

        {/* GROUP 2: AI RESILIENCE & ORCHESTRATION */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Orchestration
            </div>
          )}

          <div className="space-y-1">
            {/* Talent Reallocation */}
            <button
              onClick={() => onSelectTab('talent_reallocation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'talent_reallocation'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Talent Reallocation' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <UsersRound
                  className={`w-4 h-4 ${
                    activeTab === 'talent_reallocation' ? 'text-sky-600' : 'text-slate-400'
                  }`}
                />
                {!collapsed && <span>Talent Rebalance</span>}
              </div>
            </button>

            {/* Boost Mode */}
            <button
              onClick={() => onSelectTab('boost_mode')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'boost_mode'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Boost Mode' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <Rocket
                  className={`w-4 h-4 ${activeTab === 'boost_mode' ? 'text-sky-600' : 'text-slate-400'}`}
                />
                {!collapsed && <span>Boost Mode</span>}
              </div>
            </button>

            {/* Best Team */}
            <button
              onClick={() => onSelectTab('build_team')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'build_team'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Best Team Matcher' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <Wand2
                  className={`w-4 h-4 ${activeTab === 'build_team' ? 'text-sky-600' : 'text-slate-400'}`}
                />
                {!collapsed && <span>Best Team AI</span>}
              </div>
            </button>

            {/* What-If Simulator */}
            <button
              onClick={() => onSelectTab('simulator')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'What-If Simulator' : undefined}
            >
              <SlidersHorizontal
                className={`w-4 h-4 ${activeTab === 'simulator' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>What-If Simulator</span>}
            </button>
          </div>
        </div>

        {/* GROUP 3: DATA & GOVERNANCE */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Data &amp; Governance
            </div>
          )}

          <div className="space-y-1">
            {/* Data Ingestion */}
            <button
              onClick={() => onSelectTab('connections')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'connections'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Data Ingestion' : undefined}
            >
              <ShieldCheck
                className={`w-4 h-4 ${activeTab === 'connections' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>Data Ingestion</span>}
            </button>

            {/* AI Manager Q&A */}
            <button
              onClick={() => onSelectTab('ai_qa')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'ai_qa'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'AI Manager Q&A' : undefined}
            >
              <BotMessageSquare
                className={`w-4 h-4 ${activeTab === 'ai_qa' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>AI Manager Q&amp;A</span>}
            </button>

            {/* Reports */}
            <button
              onClick={() => onSelectTab('reports')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'reports'
                  ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title={collapsed ? 'Executive Reports' : undefined}
            >
              <FileText
                className={`w-4 h-4 ${activeTab === 'reports' ? 'text-sky-600' : 'text-slate-400'}`}
              />
              {!collapsed && <span>Executive Reports</span>}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom User Profile & Sign Out */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{user.roleTitle}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs"
              title={`${user.name} (${user.roleTitle})`}
            >
              {user.name.charAt(0)}
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
