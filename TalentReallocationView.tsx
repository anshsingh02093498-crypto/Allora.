import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { EMPLOYEES, calculateRisk } from '../data/mockData';
import { SihFeatureModal } from './SihFeatureModal';
import {
  UsersRound,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Check,
  Search,
  Filter,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TalentReallocationViewProps {
  projects: Project[];
  selectedProjectId?: number;
  onApplyReallocation?: (projectId: number, candidateName: string, role: string) => void;
}

export const TalentReallocationView: React.FC<TalentReallocationViewProps> = ({
  projects,
  selectedProjectId = 1,
  onApplyReallocation
}) => {
  const [activeProjectId, setActiveProjectId] = useState<number>(selectedProjectId);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('emp-2'); // Default to Priya Patel
  const [reallocationAuthorized, setReallocationAuthorized] = useState<boolean>(false);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [showFeatureModal, setShowFeatureModal] = useState<boolean>(false);

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const projectRisk = calculateRisk(currentProject);

  // Hardcoded target need for demo
  const targetRole = 'Senior Backend / Node.js Architect';

  // Scoring engine
  const scoredCandidates = EMPLOYEES.map((emp) => {
    let score = 50;
    const reasons: string[] = [];

    const hasNode = emp.skills.some((s) => s.toLowerCase().includes('node'));
    const hasPayment = emp.skills.some((s) => s.toLowerCase().includes('payment') || s.toLowerCase().includes('stripe') || s.toLowerCase().includes('upi'));
    const hasSQL = emp.skills.some((s) => s.toLowerCase().includes('sql') || s.toLowerCase().includes('postgres'));

    if (hasNode) {
      score += 25;
      reasons.push('Node.js microservices architecture match');
    }
    if (hasPayment) {
      score += 20;
      reasons.push('Payment gateway & UPI webhook expertise');
    }
    if (hasSQL) {
      score += 10;
      reasons.push('High-throughput database tuning');
    }

    if (emp.availability === 'HIGH') {
      score += 15;
      reasons.push('High immediate availability');
    } else if (emp.availability === 'MEDIUM') {
      score += 5;
    } else {
      score -= 20;
      reasons.push('High current workload');
    }

    if (emp.workload < 80) {
      score += 10;
      reasons.push(`Low workload buffer (${emp.workload}%)`);
    }

    if (emp.pastProjectsCount >= 5) {
      score += 10;
      reasons.push(`${emp.pastProjectsCount} shipped production systems`);
    }

    return {
      employee: emp,
      score: Math.min(98, Math.max(25, score)),
      reasons
    };
  })
    .filter((c) => {
      if (!searchSkill) return true;
      const q = searchSkill.toLowerCase();
      return (
        c.employee.name.toLowerCase().includes(q) ||
        c.employee.skills.some((s) => s.toLowerCase().includes(q)) ||
        c.employee.role.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.score - a.score);

  const selectedCandidate = scoredCandidates.find((c) => c.employee.id === selectedCandidateId) || scoredCandidates[0];

  const handleAuthorize = () => {
    setReallocationAuthorized(true);
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onApplyReallocation && selectedCandidate) {
      onApplyReallocation(currentProject.id, selectedCandidate.employee.name, targetRole);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Sleek Modern Header Banner with Discrete SIH Icon */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sky-50 text-sky-700 border border-sky-200/80 flex items-center gap-1">
              <UsersRound className="w-3.5 h-3.5 text-sky-600" /> Internal Talent Mobility
            </span>
            <span className="text-xs text-slate-400 font-medium">Autonomous Workload Rebalancing</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Cross-Project Talent Reallocation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Solve project bottlenecks by tapping internal certified staff with idle capacity across the organization—without recruitment lag.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Discrete Presentation Feature Notes Icon */}
          <button
            onClick={() => setShowFeatureModal(true)}
            className="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            title="View Feature Innovation & Slide Notes"
          >
            <Award className="w-4 h-4 text-sky-600" />
            <span>Feature Notes (PPT)</span>
          </button>

          <div className="shrink-0">
            <select
              value={activeProjectId}
              onChange={(e) => {
                setActiveProjectId(Number(e.target.value));
                setReallocationAuthorized(false);
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

      {/* 2. ANIMATED TALENT MOBILITY VISUAL TRAJECTORY */}
      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Live Reallocation Trajectory Simulation</span>
          <span className="text-sky-700 font-mono">
            Status: {reallocationAuthorized ? 'Transfer Authorized ✓' : 'Candidate Staged'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Source: Candidate with Available Capacity */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Source Project / Idle Capacity
            </span>
            <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>{selectedCandidate?.employee.name}</span>
              <span className="text-sky-700 text-xs font-mono">{selectedCandidate?.employee.workload}% load</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Current Role: {selectedCandidate?.employee.role}
            </p>
            <div className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              +45% idle bandwidth available safely
            </div>
          </div>

          {/* Middle: Animated Flow Arrow */}
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs border border-sky-200 mb-1"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
            <span className="text-[11px] font-bold text-slate-700">Instant Internal Assignment</span>
            <span className="text-[10px] text-slate-400">0 days onboarding lag · ₹0 agency fee</span>
          </div>

          {/* Target: Bottlenecked Project */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              Target Project (Bottlenecked)
            </span>
            <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>{currentProject.name}</span>
              <span className="text-rose-600 text-xs font-mono">
                {reallocationAuthorized ? 'Risk: 22/100' : `Risk: ${projectRisk.riskScore}/100`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Needs: {targetRole}
            </p>
            <div className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              {reallocationAuthorized ? 'Payment webhook bottleneck unblocked!' : 'Awaiting talent reinforcement'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Candidate Scoring Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ranked Candidates */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Ranked Candidates by Skill &amp; Availability Fit</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium font-mono">
              {scoredCandidates.length} Vetted Profiles
            </span>
          </div>

          <div className="space-y-3">
            {scoredCandidates.slice(0, 4).map((c) => {
              const isSelected = selectedCandidateId === c.employee.id;

              return (
                <div
                  key={c.employee.id}
                  onClick={() => setSelectedCandidateId(c.employee.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-400 ring-2 ring-sky-500/20 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{c.employee.name}</span>
                        <span className="text-xs text-slate-500">({c.employee.role})</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Workload: <strong>{c.employee.workload}%</strong> · Shipped: {c.employee.pastProjectsCount} projects
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-black text-sky-700 font-mono">
                        {c.score}% Match
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {c.reasons.map((r, rIdx) => (
                      <span
                        key={rIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-700"
                      >
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Candidate Action Panel */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Reallocation Impact</h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="text-slate-500 font-semibold">Selected Candidate:</div>
                <div className="font-bold text-slate-900 text-sm">{selectedCandidate?.employee.name}</div>
                <div className="text-slate-500">{selectedCandidate?.employee.role}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-1">
                <div className="text-sky-800 font-semibold">Projected Velocity Gain:</div>
                <div className="font-extrabold text-sky-900 text-base">+38% Sprint Burn-up</div>
                <div className="text-sky-700">Recovers 12 delayed story points before sprint review</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="text-slate-500 font-semibold">Cost Impact:</div>
                <div className="font-bold text-slate-900">₹0 External Cost</div>
                <div className="text-slate-500">Draws from active Q3 internal capacity pool</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleAuthorize}
              disabled={reallocationAuthorized}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {reallocationAuthorized ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Reallocation Active ✓</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Authorize 1-Click Reallocation</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Directly syncs to Wrike resource allocations &amp; Slack notification
            </p>
          </div>
        </div>
      </div>

      {/* SIH Presentation Deck Feature Modal */}
      <SihFeatureModal
        featureKey={showFeatureModal ? 'talent_reallocation' : null}
        onClose={() => setShowFeatureModal(false)}
      />
    </div>
  );
};
