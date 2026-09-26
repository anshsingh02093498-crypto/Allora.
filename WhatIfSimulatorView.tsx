import React, { useState } from 'react';
import { Project } from '../types';
import { calculateRisk, simulate, formatCurrency } from '../data/mockData';
import {
  SlidersHorizontal,
  Plus,
  Minus,
  DollarSign,
  Clock,
  Sparkles,
  TrendingDown,
  AlertCircle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface WhatIfSimulatorViewProps {
  projects: Project[];
  selectedProjectId?: number;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  projects,
  selectedProjectId = 1
}) => {
  const [activeProjectId, setActiveProjectId] = useState<number>(selectedProjectId);
  const [devs, setDevs] = useState<number>(1);
  const [testers, setTesters] = useState<number>(1);
  const [budgetIncrease, setBudgetIncrease] = useState<number>(50000);
  const [removeLowPriority, setRemoveLowPriority] = useState<boolean>(true);
  const [deadlineExtension, setDeadlineExtension] = useState<number>(0);

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];
  const baselineRisk = calculateRisk(project);

  // Run simulation calculation
  const simResult = simulate(
    baselineRisk.riskScore,
    baselineRisk.predictedDelay,
    devs,
    testers,
    budgetIncrease,
    removeLowPriority,
    deadlineExtension
  );

  const resetVariables = () => {
    setDevs(0);
    setTesters(0);
    setBudgetIncrease(0);
    setRemoveLowPriority(false);
    setDeadlineExtension(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-500/30 text-blue-300 border border-blue-500/40 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Section 18 Analysis
          </span>
          <span className="text-xs text-slate-400">Predictive Impact Sandbox · Consequence Evaluation</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
          What-If Scenario Simulator
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Evaluate critical managerial decisions before executing them. Test what happens if deadlines shrink, scope is deferred, or staffing is augmented—see instant mathematical predictions of risk, delay, and financial impact.
        </p>
      </div>

      {/* Project Selector & Quick Reset */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Simulate On Project:
          </label>
          <select
            value={activeProjectId}
            onChange={(e) => setActiveProjectId(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.status} · Progress: {p.progress}%)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetVariables}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 border border-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Sliders</span>
        </button>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                Scenario Variables
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Adjust &amp; observe outcome</span>
            </h3>

            {/* Additional Developers */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <div>
                  <span className="text-slate-800">Additional Developers</span>
                  <span className="block text-[11px] text-slate-400 font-normal">₹60,000 each / sprint</span>
                </div>
                <div className="text-sm font-extrabold text-indigo-600">+{devs}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDevs(Math.max(0, devs - 1))}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(devs / 5) * 100}%` }} />
                </div>
                <button
                  onClick={() => setDevs(Math.min(5, devs + 1))}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Additional Testers */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <div>
                  <span className="text-slate-800">Additional Testers</span>
                  <span className="block text-[11px] text-slate-400 font-normal">₹35,000 each / sprint</span>
                </div>
                <div className="text-sm font-extrabold text-indigo-600">+{testers}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTesters(Math.max(0, testers - 1))}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(testers / 5) * 100}%` }} />
                </div>
                <button
                  onClick={() => setTesters(Math.min(5, testers + 1))}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Budget Increase Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <div>
                  <span className="text-slate-800">Budget Infusion</span>
                  <span className="block text-[11px] text-slate-400 font-normal">Unlocks overtime and priority infrastructure</span>
                </div>
                <span className="font-extrabold text-slate-900">{formatCurrency(budgetIncrease)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={budgetIncrease}
                onChange={(e) => setBudgetIncrease(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Scope Pruning Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-800">Prune Non-Critical Scope</span>
                <span className="block text-[11px] text-slate-500">Defers 2 secondary features to v1.1</span>
              </div>
              <button
                type="button"
                onClick={() => setRemoveLowPriority(!removeLowPriority)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  removeLowPriority ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    removeLowPriority ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Deadline Extension Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <div>
                  <span className="text-slate-800">Deadline Adjustment</span>
                  <span className="block text-[11px] text-slate-400 font-normal">Client extension negotiations</span>
                </div>
                <span className="font-extrabold text-slate-900">+{deadlineExtension} Days</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={deadlineExtension}
                onChange={(e) => setDeadlineExtension(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Outcomes Comparison & Graphs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 Large KPI Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Risk Score */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Simulated Risk Score
              </span>
              <div className="text-3xl font-extrabold text-indigo-600">{simResult.risk}%</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Baseline: <span className="line-through">{baselineRisk.riskScore}%</span>{' '}
                <span className="text-emerald-600 font-bold">
                  ({baselineRisk.riskScore - simResult.risk}% drop)
                </span>
              </div>
            </div>

            {/* Delay Days */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Predicted Delay
              </span>
              <div className="text-3xl font-extrabold text-slate-900">{simResult.delay} Days</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Baseline: <span className="line-through">{baselineRisk.predictedDelay}d</span>{' '}
                <span className="text-emerald-600 font-bold">
                  ({Math.max(0, baselineRisk.predictedDelay - simResult.delay)}d saved)
                </span>
              </div>
            </div>

            {/* Additional Cost */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Estimated Cost Impact
              </span>
              <div className="text-2xl font-extrabold text-slate-900">{formatCurrency(simResult.cost)}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">
                Within approved budget buffer
              </div>
            </div>
          </div>

          {/* Visual Comparison Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center justify-between">
              <span>Mathematical Baseline vs. Simulated Projection</span>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Live Calculation
              </span>
            </h3>

            {/* Comparison Visual Bars */}
            <div className="space-y-6">
              {/* Risk comparison */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Risk Probability (%)</span>
                  <span>
                    Baseline {baselineRisk.riskScore}% → <strong className="text-indigo-600">Simulated {simResult.risk}%</strong>
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden">
                  <div
                    className="h-full bg-slate-400 opacity-50"
                    style={{ width: `${baselineRisk.riskScore}%` }}
                    title={`Baseline: ${baselineRisk.riskScore}%`}
                  />
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${simResult.risk}%` }}
                    title={`Simulated: ${simResult.risk}%`}
                  />
                </div>
              </div>

              {/* Delay comparison */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Predicted Delay (Days)</span>
                  <span>
                    Baseline {baselineRisk.predictedDelay}d → <strong className="text-indigo-600">Simulated {simResult.delay}d</strong>
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden">
                  <div
                    className="h-full bg-slate-400 opacity-50"
                    style={{ width: `${(baselineRisk.predictedDelay / 14) * 100}%` }}
                    title={`Baseline: ${baselineRisk.predictedDelay}d`}
                  />
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(simResult.delay / 14) * 100}%` }}
                    title={`Simulated: ${simResult.delay}d`}
                  />
                </div>
              </div>
            </div>

            {/* Decision Recommendation Summary */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Simulation Insight:</strong> Augmenting with +{devs} developer(s) and pruning non-critical features resolves the primary critical path blocker on {project.name}. The investment of {formatCurrency(simResult.cost)} recovers {Math.max(0, baselineRisk.predictedDelay - simResult.delay)} days and reduces failure probability by {baselineRisk.riskScore - simResult.risk}%.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
