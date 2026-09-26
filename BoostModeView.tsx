import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { EMPLOYEES, calculateRisk } from '../data/mockData';
import { SihFeatureModal } from './SihFeatureModal';
import {
  Rocket,
  Zap,
  Clock,
  IndianRupee,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Plus,
  Minus,
  SlidersHorizontal,
  Flame,
  Check,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BoostModeViewProps {
  projects: Project[];
  selectedProjectId?: number;
}

export const BoostModeView: React.FC<BoostModeViewProps> = ({
  projects,
  selectedProjectId = 1
}) => {
  const [activeProjectId, setActiveProjectId] = useState<number>(selectedProjectId);
  const [budgetCap, setBudgetCap] = useState<number>(180000); // ₹1,80,000
  const [extraDevs, setExtraDevs] = useState<number>(2);
  const [extraTesters, setExtraTesters] = useState<number>(1);
  const [boostActivated, setBoostActivated] = useState<boolean>(false);
  const [showFeatureModal, setShowFeatureModal] = useState<boolean>(false);

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];
  const risk = calculateRisk(project);

  // Baseline calculation (e.g. 14 days remaining / predicted delay)
  const baseDaysToCompletion = 14;

  // Boost calculation
  const accelerationFactor = 1 + extraDevs * 0.35 + extraTesters * 0.25;
  const boostedDaysToCompletion = Math.max(
    4,
    Math.round(baseDaysToCompletion / accelerationFactor)
  );
  const timeSavedDays = baseDaysToCompletion - boostedDaysToCompletion;

  // Cost calculation in INR
  const totalCost = extraDevs * 60000 + extraTesters * 35000;
  const isOverBudget = totalCost > budgetCap;

  // Recommended candidates matching required boost roles
  const recommendedDevs = EMPLOYEES.filter(
    (e) => e.role.includes('Developer') && e.availability !== 'LOW'
  ).slice(0, extraDevs);

  const recommendedTesters = EMPLOYEES.filter(
    (e) => e.role.includes('QA') || e.role.includes('Tester')
  ).slice(0, extraTesters);

  const handleActivateBoost = () => {
    setBoostActivated(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner with Discrete SIH Button */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center gap-1">
              <Rocket className="w-3.5 h-3.5 text-amber-500" /> Sprint Boost Engine
            </span>
            <span className="text-xs text-slate-400 font-medium">Autonomous Capacity Scaling · Schedule Compression</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Project Boost Mode (Emergency Sprint Capacity)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            When project schedules slip, Boost Mode safely injects temporary engineering capacity from internal slack pools to recover velocity without hiring delays.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Discrete Presentation Feature Notes Icon */}
          <button
            onClick={() => setShowFeatureModal(true)}
            className="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            title="View Pitch Brief & Slide Notes"
          >
            <Award className="w-4 h-4 text-sky-600" />
            <span>Feature Notes (PPT)</span>
          </button>

          <div className="shrink-0">
            <select
              value={activeProjectId}
              onChange={(e) => {
                setActiveProjectId(Number(e.target.value));
                setBoostActivated(false);
              }}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Interactive Animated Sprint Timeline Compression */}
      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Sprint Timeline Compression Simulator</span>
          <span className="text-sky-700 font-mono">
            Accelerated: <strong>{timeSavedDays} Days Saved</strong>
          </span>
        </div>

        {/* Timeline 1: Standard Track (14 Days - Delayed) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-rose-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Standard Schedule (Delayed): 14 Days
            </span>
            <span className="font-mono text-rose-600 font-bold">+2 Days Slippage</span>
          </div>
          <div className="h-6 w-full bg-slate-200 rounded-xl overflow-hidden relative flex items-center px-3">
            <div
              style={{ width: '100%' }}
              className="absolute inset-0 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 opacity-80"
            />
            <span className="relative z-10 text-[11px] font-bold text-rose-900">
              14 Days to Launch (Bottlenecked at QA Sandbox)
            </span>
          </div>
        </div>

        {/* Timeline 2: Boost Mode Active (Animated Compression!) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-sky-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Boosted Schedule (+{extraDevs} Devs, +{extraTesters} Testers):
            </span>
            <span className="font-mono text-sky-700 font-bold">
              {boostedDaysToCompletion} Days to Launch (-{timeSavedDays}d)
            </span>
          </div>
          <div className="h-6 w-full bg-slate-200 rounded-xl overflow-hidden relative flex items-center px-3">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${(boostedDaysToCompletion / baseDaysToCompletion) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-sky-600 rounded-xl"
            />
            <span className="relative z-10 text-[11px] font-bold text-white flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" />
              Compressed to {boostedDaysToCompletion} Days
            </span>
          </div>
        </div>

        {/* Visual Step Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px]">
                1
              </span>
              <span>Signal Ingestion</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              WhatsApp log detects payment webhook timeout.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px]">
                2
              </span>
              <span>Algorithm Scaling</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Computes +{extraDevs} Devs and +{extraTesters} Testers ratio.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px]">
                3
              </span>
              <span>Zero-Cost Talent</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Allocates internal staff with verified idle buffer.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
            <div className="font-bold text-sky-700 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-mono text-[10px]">
                ✓
              </span>
              <span>Timely Release</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Saves {timeSavedDays} days within ₹{(totalCost / 1000).toFixed(0)}K budget.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Capacity Controls & Resource Allocator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-5">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <span>Capacity Stepper Controls</span>
          </h3>

          {/* Devs Stepper */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Additional Backend Developers</span>
              <span className="text-sky-700 font-bold font-mono">+{extraDevs}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExtraDevs(Math.max(0, extraDevs - 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center font-black text-xl text-slate-900 font-mono">
                {extraDevs}
              </div>
              <button
                onClick={() => setExtraDevs(Math.min(5, extraDevs + 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-500 text-right">₹60,000 per dev allocation</div>
          </div>

          {/* Testers Stepper */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Additional QA &amp; Test Engineers</span>
              <span className="text-sky-700 font-bold font-mono">+{extraTesters}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExtraTesters(Math.max(0, extraTesters - 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center font-black text-xl text-slate-900 font-mono">
                {extraTesters}
              </div>
              <button
                onClick={() => setExtraTesters(Math.min(4, extraTesters + 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-500 text-right">₹35,000 per QA allocation</div>
          </div>

          {/* Budget Feasibility Bar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Boost Allocation Cost:</span>
              <span className={`font-mono font-bold ${isOverBudget ? 'text-rose-700' : 'text-slate-900'}`}>
                ₹{totalCost.toLocaleString('en-IN')} / ₹{budgetCap.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (totalCost / budgetCap) * 100)}%` }}
                className={`h-full rounded-full ${isOverBudget ? 'bg-rose-500' : 'bg-sky-600'}`}
              />
            </div>
          </div>

          <button
            onClick={handleActivateBoost}
            disabled={isOverBudget || (extraDevs === 0 && extraTesters === 0)}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>{boostActivated ? 'Boost Activated ✓' : 'Execute Boost Allocation'}</span>
          </button>
        </div>

        {/* Recommended Staff Roster */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Recommended Internal Resource Pool (Zero Agency Overhead)</span>
            </h3>
            <span className="text-xs font-semibold text-sky-700">
              {recommendedDevs.length + recommendedTesters.length} Available Candidates
            </span>
          </div>

          <div className="space-y-3">
            {recommendedDevs.concat(recommendedTesters).map((emp) => (
              <div
                key={emp.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <span>{emp.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                      {emp.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span>Current Workload: <strong className="text-slate-700">{emp.workload}%</strong></span>
                    <span>•</span>
                    <span>{emp.pastProjectsCount} Projects Shipped</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    Ready for Deployment
                  </span>
                </div>
              </div>
            ))}
          </div>

          {boostActivated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-center gap-3"
            >
              <Check className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <strong>Sprint Boost Successfully Scheduled:</strong> +{extraDevs} Developers and +{extraTesters} QA Engineers assigned to {project.name}. Delivery pulled forward by {timeSavedDays} days.
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* SIH Presentation Deck Feature Modal */}
      <SihFeatureModal
        featureKey={showFeatureModal ? 'boost_mode' : null}
        onClose={() => setShowFeatureModal(false)}
      />
    </div>
  );
};
