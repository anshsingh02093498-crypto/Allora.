import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project, ExtractedUpdate } from '../types';
import { PORTFOLIO_STATS, calculateRisk } from '../data/mockData';
import { OkrPortfolioView } from './views/OkrPortfolioView';
import { AnimatedPortfolioDonut } from './AnimatedPortfolioDonut';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  Rocket,
  ShieldCheck,
  LayoutDashboard,
  PieChart,
  Search,
  MessageSquare,
  Sparkles,
  Zap,
  SlidersHorizontal
} from 'lucide-react';

interface DashboardViewProps {
  projects: Project[];
  extractedUpdates: ExtractedUpdate[];
  onSelectProject: (p: Project) => void;
  onNavigateToTab: (tab: any, projectId?: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  extractedUpdates,
  onSelectProject,
  onNavigateToTab
}) => {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'okr_analytics'>('overview');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ON TRACK' | 'AT RISK' | 'DELAYED'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Live portfolio metrics
  const totalCount = PORTFOLIO_STATS.totalProjects; // 100
  const onTrackCount = PORTFOLIO_STATS.onTrack; // 72
  const atRiskCount = PORTFOLIO_STATS.atRisk; // 18
  const delayedCount = PORTFOLIO_STATS.delayed; // 10

  // Categories list
  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && p.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.manager.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Top critical project
  const criticalProject = projects.find((p) => p.status === 'DELAYED') || projects[0];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Sleek Modern Executive Action Bar (Clean LunarDesk style) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sky-50 text-sky-700 border border-sky-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> Executive Command
            </span>
            <span className="text-xs text-slate-400 font-medium">100 Live Enterprise Streams</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Portfolio Health &amp; Autonomous Operations Command
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Autonomous multi-signal risk forecasting aggregating WhatsApp, Jira, Emails, and Spreadsheets.
          </p>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            <button
              onClick={() => setDashboardTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                dashboardTab === 'overview'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Operations</span>
            </button>
            <button
              onClick={() => setDashboardTab('okr_analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                dashboardTab === 'okr_analytics'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>OKR Financials (₹)</span>
            </button>
          </div>

          <button
            onClick={() => onNavigateToTab('boost_mode', criticalProject.id)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
            title="Accelerate delayed initiatives with Boost Mode"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Boost Project Alpha</span>
            <span className="sm:hidden">Boost</span>
          </button>
        </div>
      </div>

      {dashboardTab === 'okr_analytics' ? (
        <OkrPortfolioView />
      ) : (
        <>
          {/* 2. Primary Portfolio KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Projects */}
            <div
              onClick={() => setStatusFilter('ALL')}
              className={`bg-white rounded-2xl p-5 border shadow-2xs hover:border-slate-300 transition-all cursor-pointer ${
                statusFilter === 'ALL' ? 'border-sky-400 ring-2 ring-sky-500/10' : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Portfolio
                </span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{totalCount}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                <span className="text-sky-600 font-bold">12 Deep Monitored</span> · 88 Signal Tracked
              </div>
            </div>

            {/* On Track (Sky Blue) */}
            <div
              onClick={() => setStatusFilter(statusFilter === 'ON TRACK' ? 'ALL' : 'ON TRACK')}
              className={`bg-white rounded-2xl p-5 border shadow-2xs transition-all cursor-pointer ${
                statusFilter === 'ON TRACK'
                  ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/20'
                  : 'border-slate-200/90 hover:border-sky-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  On Track
                </span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-sky-600">{onTrackCount}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">
                <span className="text-sky-700 font-bold">72% of portfolio</span> executing on schedule
              </div>
            </div>

            {/* At Risk (Amber) */}
            <div
              onClick={() => setStatusFilter(statusFilter === 'AT RISK' ? 'ALL' : 'AT RISK')}
              className={`bg-white rounded-2xl p-5 border shadow-2xs transition-all cursor-pointer ${
                statusFilter === 'AT RISK'
                  ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20'
                  : 'border-slate-200/90 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  At Risk
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-amber-600">{atRiskCount}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">
                <span className="text-amber-700 font-bold">18% bottlenecked</span> or high workload
              </div>
            </div>

            {/* Delayed (Rose) */}
            <div
              onClick={() => setStatusFilter(statusFilter === 'DELAYED' ? 'ALL' : 'DELAYED')}
              className={`bg-white rounded-2xl p-5 border shadow-2xs transition-all cursor-pointer ${
                statusFilter === 'DELAYED'
                  ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20'
                  : 'border-slate-200/90 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Delayed
                </span>
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-rose-600">{delayedCount}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">
                <span className="text-rose-700 font-bold">10% schedule slippage</span> detected
              </div>
            </div>
          </div>

          {/* 3. Interactive Animated Circular Donut Chart & Delivery Velocity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Animated Donut Chart Component */}
            <div className="lg:col-span-5 flex flex-col">
              <AnimatedPortfolioDonut
                onTrack={onTrackCount}
                atRisk={atRiskCount}
                delayed={delayedCount}
                selectedFilter={statusFilter}
                onFilterChange={(st) => setStatusFilter(st as any)}
              />
            </div>

            {/* Delivery Velocity & Animated Sprint Trajectory */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-600" />
                    Portfolio Delivery Velocity &amp; Sprint Trajectory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aggregated sprint burn-up across active streams (Target: 80% baseline)
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200/80">
                  Sprint Week 8
                </span>
              </div>

              {/* Animated Trend SVG Curve */}
              <div className="h-44 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="70" x2="600" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="110" x2="600" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="140" x2="600" y2="140" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="0" y1="50" x2="600" y2="50" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Gradient Fill under curve */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    d="M 0,95 Q 75,90 150,94 T 300,78 T 450,62 T 600,68 L 600,140 L 0,140 Z"
                    fill="url(#skyGradient)"
                  />

                  {/* Animated Stroke Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    d="M 0,95 Q 75,90 150,94 T 300,78 T 450,62 T 600,68"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {[
                    { x: 0, y: 95, label: 'Wk 1' },
                    { x: 150, y: 94, label: 'Wk 3' },
                    { x: 300, y: 78, label: 'Wk 5' },
                    { x: 450, y: 62, label: 'Wk 7' },
                    { x: 600, y: 68, label: 'Wk 8' }
                  ].map((pt, i) => (
                    <motion.circle
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.2, duration: 0.3 }}
                      cx={pt.x}
                      cy={pt.y}
                      r="4.5"
                      fill="#ffffff"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />
                  ))}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
                <span>Week 1</span>
                <span>Week 3</span>
                <span>Week 5 (Mid-term)</span>
                <span>Week 7</span>
                <span className="text-sky-700 font-bold">Week 8 (78% Velocity)</span>
              </div>
            </div>
          </div>

          {/* 4. Live Multi-Channel Signal Feed */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  Live Channel Ingestion Audit Log · Zero-PII Processing
                </span>
              </div>
              <button
                onClick={() => onNavigateToTab('connections')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Manage 400+ Connectors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {extractedUpdates.slice(0, 3).map((up) => (
                <div
                  key={up.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                        {up.source}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          up.riskImpact === 'HIGH'
                            ? 'bg-rose-100 text-rose-700'
                            : up.riskImpact === 'MEDIUM'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-sky-100 text-sky-700'
                        }`}
                      >
                        {up.riskImpact} IMPACT
                      </span>
                    </div>
                    <p className="text-slate-600 italic text-[11px] mb-2 leading-tight">
                      "{up.rawMessage}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 text-[11px]">
                    <div className="font-semibold text-slate-900">{up.extractedProject}</div>
                    <div className="text-slate-500 flex items-center justify-between mt-0.5 font-mono">
                      <span>Task: {up.extractedTask}</span>
                      <span className="text-slate-800 font-bold">+{up.estimatedDelay}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Monitored Enterprise Projects Directory & Risk Ledger */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Monitored Enterprise Projects ({filteredProjects.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time status, risk metrics, and autonomous intervention triggers.
                </p>
              </div>

              {/* Quick Search & Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter projects..."
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ON TRACK">On Track</option>
                  <option value="AT RISK">At Risk</option>
                  <option value="DELAYED">Delayed</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'ALL' ? 'All Domains' : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Project Name &amp; Code</th>
                    <th className="py-3 px-3">Domain</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Risk Level</th>
                    <th className="py-3 px-3">Progress</th>
                    <th className="py-3 px-3">Team Lead</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((p) => {
                    const risk = calculateRisk(p);
                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        onClick={() => onSelectProject(p)}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            PRJ-00{p.id} · Deadline: {p.deadline}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                              p.status === 'ON TRACK'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : p.status === 'AT RISK'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`font-bold font-mono ${
                              risk.riskScore > 65
                                ? 'text-rose-600'
                                : risk.riskScore > 35
                                ? 'text-amber-600'
                                : 'text-sky-600'
                            }`}
                          >
                            {risk.riskScore}/100 ({risk.riskLevel})
                          </span>
                        </td>
                        <td className="py-3 px-3 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${p.progress}%` }}
                                className={`h-full rounded-full ${
                                  p.status === 'ON TRACK'
                                    ? 'bg-sky-500'
                                    : p.status === 'AT RISK'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 font-mono">
                              {p.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {p.manager}
                        </td>
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onNavigateToTab('projects', p.id)}
                              className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] transition-colors"
                              title="Open Full Wrike Workspace"
                            >
                              Workspace
                            </button>
                            <button
                              onClick={() => onSelectProject(p)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                            >
                              Inspect
                            </button>
                            {p.status !== 'ON TRACK' && (
                              <button
                                onClick={() => onNavigateToTab('boost_mode', p.id)}
                                className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[11px] transition-colors"
                                title="Boost Sprints"
                              >
                                Boost
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
