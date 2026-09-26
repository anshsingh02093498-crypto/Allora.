import React from 'react';
import { Project, RiskAnalysis } from '../types';
import { calculateRisk, formatCurrency } from '../data/mockData';
import {
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Rocket,
  UsersRound,
  SlidersHorizontal,
  Calendar,
  MessageSquare,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Flag
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateToTab: (tab: any, projectId?: number) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigateToTab
}) => {
  if (!project) return null;

  const risk: RiskAnalysis = calculateRisk(project);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                {project.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  project.status === 'ON TRACK'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : project.status === 'AT RISK'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">{project.name}</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Managed by <span className="font-semibold text-white">{project.manager}</span> · Deadline: {project.deadline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 flex-1">
          {/* Risk Engine Breakdown Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-lg ${
                  risk.riskLevel === 'HIGH'
                    ? 'bg-rose-600 shadow-md shadow-rose-600/20'
                    : risk.riskLevel === 'MEDIUM'
                    ? 'bg-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-emerald-600 shadow-md shadow-emerald-600/20'
                }`}
              >
                {risk.riskScore}%
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">
                  {risk.riskLevel} Project Risk Level
                </div>
                <div className="text-slate-500 text-[11px]">
                  Predicted Schedule Slippage:{' '}
                  <strong className="text-rose-600 font-mono">{risk.predictedDelay} Business Days</strong>
                </div>
              </div>
            </div>

            {/* Direct Action Triggers */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTab('boost_mode', project.id);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Boost Mode</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToTab('talent_reallocation', project.id);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <UsersRound className="w-3.5 h-3.5 text-indigo-600" />
                <span>Reallocate</span>
              </button>
            </div>
          </div>

          {/* Progress & Financial Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Actual Progress</span>
              <div className="text-lg font-extrabold text-slate-900">{project.progress}%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Target Progress</span>
              <div className="text-lg font-extrabold text-slate-700">{project.expectedProgress}%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Budget Used</span>
              <div className="text-lg font-extrabold text-slate-900">{formatCurrency(project.budgetUsed)}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Total Budget</span>
              <div className="text-lg font-extrabold text-slate-700">{formatCurrency(project.budget)}</div>
            </div>
          </div>

          {/* Root Causes Identified by Risk Engine */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Risk Engine Contributing Factors ({risk.factors.length})
            </h4>
            <div className="space-y-1.5">
              {risk.factors.map((factor, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 text-rose-900 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>{factor.label}:</strong> {factor.detail}</span>
                  </div>
                  <span className="font-bold text-rose-800 text-[10px] shrink-0 ml-2">{factor.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Progression */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-indigo-600" />
              Key Milestones &amp; Progression
            </h4>
            <div className="space-y-2">
              {project.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="w-2/3">
                    <div className="font-bold text-slate-900 text-xs">{m.name}</div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {m.status} ({m.progress}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ingested Channel Communication */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              Ingested Channel Communications &amp; Signals
            </h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-indigo-600">[{project.lastUpdateSource || 'Direct Pipeline'}]</span>
                <span className="text-slate-400">Live Ingested</span>
              </div>
              <p className="text-slate-700 italic font-serif text-[11px]">
                "{project.lastUpdateText || 'All task milestones reported on normal cadence.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
