import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Award, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export interface FeatureInfo {
  id: string;
  title: string;
  pillar: string;
  problemStatement: string;
  solutionSummary: string;
  keyDifferentiators: string[];
  presentationSlideTips: string[];
}

export const SIH_FEATURES: Record<string, FeatureInfo> = {
  talent_reallocation: {
    id: 'talent_reallocation',
    title: 'Internal Talent Mobility & Capacity Rebalancing',
    pillar: 'Core Innovation #1',
    problemStatement: 'Projects fall behind when critical skills are bottlenecked, while adjacent teams carry idle capacity. External hiring takes 4-8 weeks and costs lakhs.',
    solutionSummary: 'Autonomous skill-graph matching searches all enterprise employees across departments, identifying certified talent with >20% idle capacity to reallocate immediately.',
    keyDifferentiators: [
      'Zero agency recruitment or onboarding lead-time',
      'AI composite matching score (Domain 40% + Skill 40% + Availability 20%)',
      'One-click capacity rebalancing with simulated burnup impact'
    ],
    presentationSlideTips: [
      'Show how Sarah Jenkins from Fintech Analytics is moved to Cloud Migration',
      'Highlight zero extra cost: uses internal payroll capacity',
      'Emphasize project timeline recovery from 18 days delayed to On Track'
    ]
  },
  boost_mode: {
    id: 'boost_mode',
    title: 'Autonomous Project Boost Mode (Capacity Injection)',
    pillar: 'Core Innovation #2',
    problemStatement: 'When deadlines slip, managers resort to overtime, burnout, or panic re-scoping without predictable timeline recovery.',
    solutionSummary: 'Emergency sprint capacity multiplier draws certified engineers from low-priority internal projects and pre-cleared bench pools to compress project timelines by up to 35%.',
    keyDifferentiators: [
      'Interactive capacity slider with real-time completion date compression',
      'Zero recruitment lag: pre-allocated internal engineering cohorts',
      'Calculates burn-rate impact vs. SLA breach penalty savings'
    ],
    presentationSlideTips: [
      'Demonstrate dragging the Capacity Injection slider from 1.0x to 1.8x',
      'Point out the animated burnup trajectory closing the timeline gap',
      'Mention how it avoids contractual delay penalties of up to ₹85L'
    ]
  },
  build_team: {
    id: 'build_team',
    title: 'Best-Team Composition & Velocity Matcher',
    pillar: 'Core Innovation #3',
    problemStatement: 'Staffing new high-stakes initiatives is usually based on gut-feeling or whoever is loudest, leading to unbalanced skill profiles.',
    solutionSummary: 'Algorithmic team assembly analyzes project requirements and matches full-stack cohorts based on verified track record, historical velocity, and compatibility.',
    keyDifferentiators: [
      'Historical velocity and commit quality profiling',
      'Cross-functional role balancing (Frontend, Backend, DevOps, QA, Product)',
      'Budget and timeline optimization before kick-off'
    ],
    presentationSlideTips: [
      'Show instant generation of the dream cohort with 94% composite fit',
      'Show historical sprint velocity comparison across candidate rosters'
    ]
  },
  connections: {
    id: 'connections',
    title: 'Permission-Based Multi-Channel Signal Ingestion',
    pillar: 'Core Innovation #4',
    problemStatement: 'Critical project risks are hidden inside unstructured chats (WhatsApp, Slack) and spreadsheet logs that never reach Jira or Wrike in time.',
    solutionSummary: 'Zero-PII synthetic extraction parses informal messages with local Gemini NLP to detect blockers, scope creep, and sentiment shifts before they escalate.',
    keyDifferentiators: [
      'Granular consent toggles with data masking and zero-PII storage',
      'Multi-channel ingestion (WhatsApp, Slack, Jira, Git, Google Sheets)',
      'Automated extraction of blockers, deadlines, and sentiment risk'
    ],
    presentationSlideTips: [
      'Simulate pasting a WhatsApp audio transcript or Slack complaint',
      'Show the automated extraction into a structured risk ticket within 200ms'
    ]
  },
  simulator: {
    id: 'simulator',
    title: 'What-If Monte Carlo Schedule Simulator',
    pillar: 'Core Innovation #5',
    problemStatement: 'Managers cannot reliably answer executive questions like "What happens if we lose 2 backend developers or add 3 new features?"',
    solutionSummary: 'Deterministic simulation engine runs 500 stochastic scenarios varying team availability, scope creep, and defect rates to forecast project milestone probability.',
    keyDifferentiators: [
      'Probability distribution curve (P50, P80, P95 completion dates)',
      'Multi-variable stress testing (Attrition, Scope Spike, Vendor Outage)',
      'Actionable mitigation strategies ranked by ROI'
    ],
    presentationSlideTips: [
      'Adjust the Scope Creep slider and show P80 milestone date slipping by 14 days',
      'Toggle "Add 2 Senior Devs" to show instant recovery to green probability'
    ]
  }
};

interface SihFeatureModalProps {
  featureKey: string | null;
  onClose: () => void;
}

export const SihFeatureModal: React.FC<SihFeatureModalProps> = ({ featureKey, onClose }) => {
  if (!featureKey) return null;
  const feature = SIH_FEATURES[featureKey] || {
    id: featureKey,
    title: 'Platform Innovation Highlight',
    pillar: 'Core Feature',
    problemStatement: 'Addressing critical project monitoring and execution risk challenges.',
    solutionSummary: 'Autonomous predictive tracking and organizational resource optimization.',
    keyDifferentiators: ['AI-driven intelligence', 'Multi-channel ingestion', 'Zero-friction adoption'],
    presentationSlideTips: ['Focus on end-to-end impact and enterprise cost savings.']
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 text-white p-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-300" /> {feature.pillar}
                </span>
                <span className="text-xs text-sky-100">Presentation Deck Guide</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                {feature.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1">
                  <span>Industry Problem</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{feature.problemStatement}</p>
              </div>
              <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-600" />
                  <span>ALLORA Innovation</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{feature.solutionSummary}</p>
              </div>
            </div>

            {/* Key Differentiators */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Architectural Differentiators
              </h4>
              <div className="space-y-2">
                {feature.keyDifferentiators.map((diff, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-50 border border-slate-200/70 rounded-lg p-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium leading-relaxed">{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Presentation & PPT Slide Demo Tips */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Tips for PPT Presentation &amp; Jury Pitch</span>
              </h4>
              <ul className="space-y-1.5 text-amber-950">
                {feature.presentationSlideTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              Enterprise Feature Brief · Clean Mode
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
