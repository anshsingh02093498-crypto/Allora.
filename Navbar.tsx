import React from 'react';
import { LOGO_SRC } from '../data/mockData';
import { UserSession } from '../types';
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
  Bell,
  Search
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'projects'
  | 'okr'
  | 'talent_reallocation'
  | 'boost_mode'
  | 'build_team'
  | 'simulator'
  | 'connections'
  | 'ai_qa'
  | 'reports';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  user: UserSession;
  onLogout: () => void;
  criticalAlertsCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAlertsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onLogout,
  criticalAlertsCount,
  searchQuery,
  onSearchChange,
  onOpenAlertsModal
}) => {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as const, label: 'Workspaces', icon: FolderGit2 },
    { id: 'okr' as const, label: 'OKR Analytics', icon: PieChart },
    {
      id: 'talent_reallocation' as const,
      label: 'Talent Reallocation',
      icon: UsersRound,
      badge: 'Pillar 1'
    },
    {
      id: 'boost_mode' as const,
      label: 'Boost Mode',
      icon: Rocket,
      badge: 'Pillar 2'
    },
    {
      id: 'build_team' as const,
      label: 'Best Team',
      icon: Wand2,
      badge: 'Pillar 3'
    },
    { id: 'simulator' as const, label: 'What-If Sim', icon: SlidersHorizontal },
    { id: 'connections' as const, label: 'Data Ingestion', icon: ShieldCheck },
    { id: 'ai_qa' as const, label: 'AI Manager Q&A', icon: BotMessageSquare },
    { id: 'reports' as const, label: 'Reports', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl p-0.5 bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/20 flex items-center justify-center overflow-hidden">
              <img src={LOGO_SRC} alt="ALLORA Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-lg">ALLORA</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  AI Platform
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                AI Project Monitoring Platform
              </p>
            </div>
          </div>

          {/* Quick Universal Project Search */}
          <div className="hidden md:flex flex-1 max-w-xs items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects, tasks, or talent..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Critical Alerts Bell with Badge */}
            <button
              onClick={onOpenAlertsModal}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="View Ingestion & Risk Alerts"
            >
              <Bell className="w-4 h-4" />
              {criticalAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {criticalAlertsCount}
                </span>
              )}
            </button>

            {/* User Session Profile Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-none">{user.name}</div>
                <div className="text-[10px] font-medium text-indigo-600 leading-tight mt-0.5">
                  {user.roleTitle}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-50/80 border-t border-slate-200/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
