import React, { useState } from 'react';
import { HISTORICAL_TEAMS, EMPLOYEES } from '../data/mockData';
import { SihFeatureModal } from './SihFeatureModal';
import {
  Wand2,
  Sparkles,
  Users,
  CheckCircle2,
  Star,
  Layers,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  History,
  FileCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BuildBestTeamView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('E-Commerce');
  const [teamSaved, setTeamSaved] = useState<boolean>(false);
  const [showFeatureModal, setShowFeatureModal] = useState<boolean>(false);

  const categories = ['E-Commerce', 'FinTech', 'Healthcare', 'Logistics', 'Enterprise', 'AI & IoT'];

  // Find relevant historical project
  const matchedHistoricalProject =
    HISTORICAL_TEAMS.find((h) => h.category.toLowerCase() === selectedCategory.toLowerCase()) ||
    HISTORICAL_TEAMS[0];

  // Compose recommended squad role by role
  const recommendedRoles = [
    {
      role: 'Lead Backend Developer',
      candidate: EMPLOYEES.find((e) => e.skills.includes('Python') && e.availability !== 'LOW') || EMPLOYEES[0],
      matchScore: 96,
      reason: 'Previously delivered core transaction architecture with 99.98% reliability.'
    },
    {
      role: 'Frontend Architect',
      candidate: EMPLOYEES.find((e) => e.role.includes('Frontend') || e.skills.includes('React')) || EMPLOYEES[7],
      matchScore: 92,
      reason: 'Shipped high-performance design systems and responsive component suites.'
    },
    {
      role: 'UI/UX Lead Designer',
      candidate: EMPLOYEES.find((e) => e.role.includes('Designer')) || EMPLOYEES[2],
      matchScore: 95,
      reason: 'Designed previous award-winning enterprise user onboarding flows.'
    },
    {
      role: 'QA & Test Automation Lead',
      candidate: EMPLOYEES.find((e) => e.role.includes('QA') && e.workload < 80) || EMPLOYEES[4],
      matchScore: 90,
      reason: 'Built automated end-to-end regression suites for zero-defect launch.'
    },
    {
      role: 'DevOps & Cloud Engineer',
      candidate: EMPLOYEES.find((e) => e.skills.includes('Kubernetes') || e.role.includes('DevOps')) || EMPLOYEES[10],
      matchScore: 94,
      reason: 'Architected automated CI/CD pipeline and multi-region failover clusters.'
    }
  ];

  const handleSaveTeam = () => {
    setTeamSaved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner with Discrete Presentation Button */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sky-50 text-sky-700 border border-sky-200/80 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-sky-600" /> Best-Team Composition
            </span>
            <span className="text-xs text-slate-400 font-medium">Historical Similarity Mining · High-Cohesion Squads</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Build a Best Team (AI Squad Engine)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Mines previous organizational initiatives that succeeded in the same domain, evaluating peer chemistry and present availability.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowFeatureModal(true)}
            className="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            title="View Feature Innovation & Slide Notes"
          >
            <Award className="w-4 h-4 text-sky-600" />
            <span>Feature Notes (PPT)</span>
          </button>
        </div>
      </div>

      {/* Project Archetype Selector */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select New Project Domain
          </span>
          <span className="text-xs text-sky-700 font-semibold flex items-center gap-1">
            <History className="w-3.5 h-3.5" />
            Analyzing {HISTORICAL_TEAMS.length} Past Organizational Deliveries
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setTeamSaved(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Historical Precedent Card */}
      <div className="bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-white rounded-2xl p-5 border border-sky-100 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-200/80 text-sky-900 uppercase">
              Historical Precedent Match
            </span>
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-extrabold text-slate-900 ml-1">{matchedHistoricalProject.successRating} / 5.0</span>
            </div>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">{matchedHistoricalProject.projectName}</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Successfully delivered in {matchedHistoricalProject.durationMonths} months (Completed on {matchedHistoricalProject.completionDate}). Recommending proven high-chemistry contributors.
          </p>
        </div>

        <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-white border border-sky-200 text-sky-700 shrink-0 shadow-2xs">
          5 Core Roles Identified
        </div>
      </div>

      {/* Recommended Role by Role Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Recommended Team Composition (Role-by-Role Matching)
          </h3>
          <span className="text-xs text-slate-500 font-semibold">Peer Synergy Score: 94%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedRoles.map(({ role, candidate, matchScore, reason }, index) => (
            <div
              key={role}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
                    Role 0{index + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                    {matchScore}% Fit
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm mb-1">{role}</h4>

                <div className="flex items-center gap-3 my-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${candidate.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {candidate.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-slate-900 text-xs truncate">{candidate.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{candidate.role}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {reason}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Current Workload:</span>
                <span className="font-bold text-slate-800">{candidate.workload}% (Available)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation & Export Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-900 text-sm">Approve &amp; Form Proposed Squad</div>
          <p className="text-xs text-slate-500">
            Locks in internal allocations and generates the project onboarding charter for executive signoff.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {teamSaved && (
            <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Team Charter Initialized!
            </span>
          )}

          <button
            onClick={handleSaveTeam}
            disabled={teamSaved}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
              teamSaved
                ? 'bg-sky-700 text-white cursor-default'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{teamSaved ? 'Team Roster Saved' : 'Confirm Squad Roster'}</span>
          </button>
        </div>
      </div>

      {/* SIH Presentation Deck Feature Modal */}
      <SihFeatureModal
        featureKey={showFeatureModal ? 'build_team' : null}
        onClose={() => setShowFeatureModal(false)}
      />
    </div>
  );
};
