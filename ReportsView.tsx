import React, { useState } from 'react';
import { Project } from '../types';
import { calculateRisk, formatCurrency } from '../data/mockData';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface ReportsViewProps {
  projects: Project[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ projects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const project = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const risk = calculateRisk(project);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Section 14 Executive Reporting
          </span>
          <span className="text-xs text-slate-400">Board-Ready Status Synthesis · One-Click Export</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
          Executive Project Status Report Generator
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Synthesize scattered operational updates into an official, C-level executive progress report comprising milestone velocity, completed deliverables, pending items, major risks, and AI-recommended mitigation actions.
        </p>
      </div>

      {/* Control Bar: Select Project & Print/Export */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Select Target Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status} · Progress {p.progress}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Report</span>
          </button>
        </div>
      </div>

      {/* The Printable Executive Report Document */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-8 font-sans">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">ALLORA</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                Executive Governance Audit
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{project.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Category: {project.category} · Project Manager: {project.manager}
            </p>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div>Report Date: {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
            <div>Deadline: <strong className="text-slate-800">{project.deadline}</strong></div>
            <div className="mt-1">
              Status:{' '}
              <span className={`font-bold ${
                project.status === 'ON TRACK'
                  ? 'text-emerald-600'
                  : project.status === 'AT RISK'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive KPI Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Current Progress</span>
            <span className="text-2xl font-extrabold text-slate-900">{project.progress}%</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Expected: {project.expectedProgress}%</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Risk Score</span>
            <span className={`text-2xl font-extrabold ${
              risk.riskLevel === 'HIGH' ? 'text-rose-600' : risk.riskLevel === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {risk.riskScore}%
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">{risk.riskLevel} Risk</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Predicted Delay</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">{risk.predictedDelay} Days</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Automated Heuristic</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Budget Consumed</span>
            <span className="text-2xl font-extrabold text-slate-900">{Math.round((project.budgetUsed / project.budget) * 100)}%</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">{formatCurrency(project.budgetUsed)}</span>
          </div>
        </div>

        {/* Section 2: Completed Deliverables & Pending Tasks (Section 14) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Completed Deliverables
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {project.tasks.filter((t) => t.status === 'Completed').length > 0 ? (
                project.tasks
                  .filter((t) => t.status === 'Completed')
                  .map((task) => (
                    <li key={task.id} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">{task.name}</div>
                        <div className="text-[10px] text-slate-500">Assignee: {task.assignee}</div>
                      </div>
                    </li>
                  ))
              ) : (
                <li className="text-slate-400 italic text-xs">Initial deliverables currently in progress.</li>
              )}
            </ul>
          </div>

          {/* Pending Tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Pending Sprint Deliverables
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {project.tasks.filter((t) => t.status !== 'Completed').length > 0 ? (
                project.tasks
                  .filter((t) => t.status !== 'Completed')
                  .map((task) => (
                    <li key={task.id} className="flex items-start justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${task.blocked ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        <div>
                          <div className="font-bold text-slate-900">{task.name}</div>
                          <div className="text-[10px] text-slate-500">Role: {task.role || 'Unassigned'} · Status: {task.status}</div>
                        </div>
                      </div>
                      {task.blocked && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-rose-100 text-rose-800">
                          BLOCKED
                        </span>
                      )}
                    </li>
                  ))
              ) : (
                <li className="text-slate-400 italic text-xs">All deliverables completed for this sprint.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Section 3: Major Risks & Roadblocks (Section 14) */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Detected Root Causes &amp; Major Risks ({risk.factors.length} Key Factors)
          </h3>

          <div className="space-y-2">
            {risk.factors.map((factor, i) => (
              <div key={i} className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-700">0{i + 1}.</span>
                  <div>
                    <strong className="text-slate-900">{factor.label}:</strong> {factor.detail}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold text-[10px] shrink-0">
                  {factor.percent}% Impact
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: AI Recommendations & Solutions (Section 14) */}
        <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3">
          <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            ALLORA Strategic Action Recommendations
          </h3>

          <ul className="space-y-2 text-xs text-indigo-900 pl-4 list-disc">
            <li className="leading-relaxed">
              <strong>Talent Reallocation:</strong> Identify and reassign internal developers with matching skills from lower-priority projects to resolve blocked deliverables without hiring overhead.
            </li>
            <li className="leading-relaxed">
              <strong>Project Boost Mode:</strong> Authorize sprint acceleration (+2 Developers, +2 Testers) within budget to compress remaining project timeline and recover {risk.predictedDelay} projected days of delay.
            </li>
            <li className="leading-relaxed">
              <strong>Scope Optimization:</strong> Defer non-critical secondary modules to v1.1 to protect core release deadlines and reduce defect accumulation.
            </li>
          </ul>
        </div>

        {/* Document Footer Signoff */}
        <div className="pt-6 border-t border-slate-200 flex justify-between text-xs text-slate-400">
          <span>Generated by ALLORA AI Platform · Enterprise Audit</span>
          <span>Verified by {project.manager} (Project Manager)</span>
        </div>
      </div>
    </div>
  );
};
