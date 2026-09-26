import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertOctagon, TrendingUp, ShieldCheck } from 'lucide-react';

interface AnimatedPortfolioDonutProps {
  onTrack: number;
  atRisk: number;
  delayed: number;
  selectedFilter: string;
  onFilterChange: (status: string) => void;
}

export const AnimatedPortfolioDonut: React.FC<AnimatedPortfolioDonutProps> = ({
  onTrack,
  atRisk,
  delayed,
  selectedFilter,
  onFilterChange
}) => {
  const total = onTrack + atRisk + delayed || 1;
  const onTrackPct = Math.round((onTrack / total) * 100);
  const atRiskPct = Math.round((atRisk / total) * 100);
  const delayedPct = 100 - onTrackPct - atRiskPct;

  // SVG Geometry
  const size = 200;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Arc stroke dash calculations
  const onTrackLength = (onTrackPct / 100) * circumference;
  const atRiskLength = (atRiskPct / 100) * circumference;
  const delayedLength = (delayedPct / 100) * circumference;

  // Hover state for interactive central display
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Determine what to display in center
  const currentMetric = hoveredSegment || (selectedFilter !== 'ALL' ? selectedFilter : 'ON TRACK');
  let centerPct = onTrackPct;
  let centerLabel = 'On Track';
  let centerColor = 'text-sky-600';

  if (currentMetric === 'AT RISK') {
    centerPct = atRiskPct;
    centerLabel = 'At Risk';
    centerColor = 'text-amber-500';
  } else if (currentMetric === 'DELAYED') {
    centerPct = delayedPct;
    centerLabel = 'Delayed';
    centerColor = 'text-rose-500';
  } else if (currentMetric === 'ALL') {
    centerPct = onTrackPct;
    centerLabel = 'Health Index';
    centerColor = 'text-sky-600';
  }

  // Segment offset calculations (starting at 12 o'clock = -90deg)
  // Arc 1: On Track (start: 0)
  // Arc 2: At Risk (start: onTrackLength)
  // Arc 3: Delayed (start: onTrackLength + atRiskLength)
  const offsetOnTrack = 0;
  const offsetAtRisk = -onTrackLength;
  const offsetDelayed = -(onTrackLength + atRiskLength);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/70">
              Live Health Distribution
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Real-Time Risk Meter</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Portfolio Delivery Health
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>{total} Initiatives</span>
        </div>
      </div>

      {/* Main Visual Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-5">
        {/* Left: Animated Donut Chart */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-[200px] h-[200px] flex items-center justify-center">
            {/* Background Track Circle */}
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth={strokeWidth}
              />

              {/* Segment 1: On Track (Sky Blue) */}
              <motion.circle
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${onTrackLength} ${circumference}` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#0284c7" // refined soft steel/sky-blue
                strokeWidth={strokeWidth}
                strokeDashoffset={offsetOnTrack}
                strokeLinecap="round"
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredSegment('ON TRACK')}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => onFilterChange(selectedFilter === 'ON TRACK' ? 'ALL' : 'ON TRACK')}
              />

              {/* Segment 2: At Risk (Amber) */}
              <motion.circle
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${atRiskLength} ${circumference}` }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth={strokeWidth}
                strokeDashoffset={offsetAtRisk}
                strokeLinecap="round"
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredSegment('AT RISK')}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => onFilterChange(selectedFilter === 'AT RISK' ? 'ALL' : 'AT RISK')}
              />

              {/* Segment 3: Delayed (Rose) */}
              <motion.circle
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${delayedLength} ${circumference}` }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f43f5e"
                strokeWidth={strokeWidth}
                strokeDashoffset={offsetDelayed}
                strokeLinecap="round"
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredSegment('DELAYED')}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => onFilterChange(selectedFilter === 'DELAYED' ? 'ALL' : 'DELAYED')}
              />
            </svg>

            {/* Inner Center Statistics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <motion.span
                key={centerPct}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-3xl font-black tracking-tight ${centerColor}`}
              >
                {centerPct}%
              </motion.span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                {centerLabel}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {hoveredSegment ? 'Interactive Segment' : 'Active Status'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Click any segment or card below to filter the active initiatives
          </p>
        </div>

        {/* Right: Detailed Metric Cards with Status Filters */}
        <div className="md:col-span-6 space-y-2.5">
          {/* Card: On Track */}
          <div
            onClick={() => onFilterChange(selectedFilter === 'ON TRACK' ? 'ALL' : 'ON TRACK')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedFilter === 'ON TRACK'
                ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-500/20 shadow-xs'
                : 'bg-slate-50/70 border-slate-200/80 hover:bg-sky-50/40 hover:border-sky-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>On Track</span>
                  <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded-full">
                    {onTrackPct}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Executing within budget &amp; SLA milestones
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-sky-700">{onTrack}</span>
              <span className="text-[11px] text-slate-400 block">projects</span>
            </div>
          </div>

          {/* Card: At Risk */}
          <div
            onClick={() => onFilterChange(selectedFilter === 'AT RISK' ? 'ALL' : 'AT RISK')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedFilter === 'AT RISK'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
                : 'bg-slate-50/70 border-slate-200/80 hover:bg-amber-50/40 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>At Risk</span>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full">
                    {atRiskPct}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Capacity bottlenecks / dependencies lagging
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-amber-600">{atRisk}</span>
              <span className="text-[11px] text-slate-400 block">projects</span>
            </div>
          </div>

          {/* Card: Delayed */}
          <div
            onClick={() => onFilterChange(selectedFilter === 'DELAYED' ? 'ALL' : 'DELAYED')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedFilter === 'DELAYED'
                ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-500/20 shadow-xs'
                : 'bg-slate-50/70 border-slate-200/80 hover:bg-rose-50/40 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Critical Delay</span>
                  <span className="text-[10px] font-semibold text-rose-800 bg-rose-100 px-1.5 py-0.2 rounded-full">
                    {delayedPct}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Requires Boost Mode or Talent Reallocation
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-rose-600">{delayed}</span>
              <span className="text-[11px] text-slate-400 block">projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
