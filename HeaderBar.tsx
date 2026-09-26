import React from 'react';
import { Search, Bell, Sparkles, Award, ShieldAlert, LogOut } from 'lucide-react';
import { NavTab } from './Navbar';
import { UserSession } from '../types';

interface HeaderBarProps {
  activeTab: NavTab;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  criticalAlertsCount: number;
  onOpenAlertsModal: () => void;
  onOpenFeatureModal: (featureKey: string) => void;
  user: UserSession;
  onLogout?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeTab,
  searchQuery,
  onSearchChange,
  criticalAlertsCount,
  onOpenAlertsModal,
  onOpenFeatureModal,
  user,
  onLogout
}) => {
  // Breadcrumbs and subtitle depending on current tab
  const tabMetadata: Record<NavTab, { title: string; subtitle: string; featureKey?: string }> = {
    dashboard: {
      title: 'Executive Dashboard',
      subtitle: 'Executive Project Operations Command · Real-Time Multi-Signal Monitoring'
    },
    projects: {
      title: 'Workspaces & Projects',
      subtitle: 'Track and organize all your team’s projects, tasks, and sprints in one place'
    },
    okr: {
      title: 'OKR & Portfolio Financials',
      subtitle: 'Synchronized with Wrike and Enterprise ERP for budget vs. actual cost reconciliation (₹)'
    },
    talent_reallocation: {
      title: 'Talent Rebalance Engine',
      subtitle: 'Cross-functional skills mobility & autonomous capacity reallocation',
      featureKey: 'talent_reallocation'
    },
    boost_mode: {
      title: 'Autonomous Project Boost Mode',
      subtitle: 'Emergency sprint capacity multiplier & timeline acceleration',
      featureKey: 'boost_mode'
    },
    build_team: {
      title: 'Best-Team Composition AI',
      subtitle: 'Algorithmic cohort matching by verified track record and historical velocity',
      featureKey: 'build_team'
    },
    simulator: {
      title: 'What-If Monte Carlo Simulator',
      subtitle: 'Deterministic stress-testing & stochastic milestone completion probability',
      featureKey: 'simulator'
    },
    connections: {
      title: 'Data Ingestion & Connectors',
      subtitle: 'Zero-PII synthetic extraction from WhatsApp, Slack, Jira, Git, and ERP',
      featureKey: 'connections'
    },
    ai_qa: {
      title: 'AI Project Intelligence Q&A',
      subtitle: 'Grounded intelligence across all project signals, risks, and milestones'
    },
    reports: {
      title: 'Executive Reports & Audits',
      subtitle: 'Automated executive governance briefs and audit compliance exports'
    }
  };

  const currentMeta = tabMetadata[activeTab] || tabMetadata.dashboard;

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left: Breadcrumbs & Dynamic Title */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <span>ALLORA</span>
          <span>/</span>
          <span className="text-slate-600 font-semibold capitalize">{activeTab.replace('_', ' ')}</span>
        </div>
        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
          {currentMeta.title}
        </h1>
      </div>

      {/* Center/Right: Search, Presentation Feature Notes Button, Alerts, User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Search input (visible on sm+) */}
        <div className="hidden sm:flex items-center relative w-48 md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects or tasks... ⌘K"
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        {/* SIH Presentation Notes Discrete Icon Button (as user requested: "ye jo uniqueness feature likha hai isse ak icon dedo user click karega tabhi dikhega") */}
        <button
          onClick={() => onOpenFeatureModal(currentMeta.featureKey || 'talent_reallocation')}
          className="px-2.5 py-1.5 rounded-xl border border-sky-200 bg-sky-50/90 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
          title="Click to view Feature Innovation & PPT Slide Notes"
        >
          <Award className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden md:inline">Feature Notes (PPT)</span>
          <span className="md:hidden">PPT</span>
        </button>

        {/* Critical Alerts Bell */}
        <button
          onClick={onOpenAlertsModal}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/90"
          title="View Ingestion & Risk Alerts"
        >
          <Bell className="w-4 h-4" />
          {criticalAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {criticalAlertsCount}
            </span>
          )}
        </button>

        {/* Quick User Avatar Badge & Sign Out */}
        <div className="flex items-center gap-1.5 pl-1">
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-xs"
            title={`${user.name} (${user.roleTitle})`}
          >
            {user.name.charAt(0)}
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out to Login Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
