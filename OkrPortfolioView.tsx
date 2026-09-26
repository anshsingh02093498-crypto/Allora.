import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, ChevronRight, ChevronDown, IndianRupee, Sparkles } from 'lucide-react';

interface OkrProjectRow {
  id: number;
  status: 'Preparing' | 'Paused' | 'Active' | 'Completed';
  title: string;
  progress: number;
  barColor: string;
  budget: number;
  actualCost: number;
  subItems?: { name: string; cost: number; progress: number }[];
}

export const OkrPortfolioView: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedKR, setSelectedKR] = useState<string | null>(null);

  const projects: OkrProjectRow[] = [
    {
      id: 1,
      status: 'Preparing',
      title: 'UPI 2.0 Merchant Switch',
      progress: 50,
      barColor: '#16a34a', // green
      budget: 1500000,
      actualCost: 532300.0,
      subItems: [
        { name: 'NPCI Sandbox certification', cost: 240000.0, progress: 100 },
        { name: 'High-throughput webhook decoupling', cost: 292300.0, progress: 60 }
      ]
    },
    {
      id: 2,
      status: 'Preparing',
      title: 'Bharat Health EHR Stack',
      progress: 27,
      barColor: '#dc2626', // coral red
      budget: 2000000,
      actualCost: 922700.0,
      subItems: [
        { name: 'ABDM Health ID gateway integration', cost: 580000.0, progress: 40 },
        { name: 'FHIR compliant electronic medical records', cost: 342700.0, progress: 15 }
      ]
    },
    {
      id: 3,
      status: 'Paused',
      title: 'ONDC Logistics Gateway',
      progress: 45,
      barColor: '#d97706', // amber
      budget: 2700000,
      actualCost: 1210200.0,
      subItems: [
        { name: 'Beckn protocol route dispatcher', cost: 710000.0, progress: 70 },
        { name: 'Hyperlocal rider SLA tracking engine', cost: 500200.0, progress: 20 }
      ]
    },
    {
      id: 4,
      status: 'Active',
      title: 'PM GatiShakti Route Tracker',
      progress: 74,
      barColor: '#16a34a',
      budget: 3500000,
      actualCost: 2418000.0,
      subItems: [
        { name: 'National highway GIS geofencing', cost: 1400000.0, progress: 85 },
        { name: 'Multi-modal freight optimization algorithms', cost: 1018000.0, progress: 65 }
      ]
    },
    {
      id: 5,
      status: 'Completed',
      title: 'Aadhaar e-KYC 3.0 Engine',
      progress: 100,
      barColor: '#16a34a',
      budget: 4800000,
      actualCost: 4425000.0,
      subItems: [
        { name: 'UIDAI security compliance audit', cost: 2200000.0, progress: 100 },
        { name: 'Biometric settlement & face-auth cluster', cost: 2225000.0, progress: 100 }
      ]
    }
  ];

  const getStatusBadge = (status: OkrProjectRow['status']) => {
    switch (status) {
      case 'Preparing':
        return 'bg-sky-100 text-sky-800 border border-sky-200';
      case 'Paused':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const krBars = [
    { key: 'KR1', title: 'UPI 2.0 Payments', amount: '₹70.5L', heightPercent: 88, color: '#86efac' },
    { key: 'KR2', title: 'Health Stack EHR', amount: '₹40.0L', heightPercent: 50, color: '#93c5fd' },
    { key: 'KR3', title: 'ONDC Logistics', amount: '₹15.7L', heightPercent: 20, color: '#fde047' },
    { key: 'KR4', title: 'Cloud FinOps', amount: '₹22.5L', heightPercent: 28, color: '#c4b5fd' },
    { key: 'KR5', title: 'Biometrics/KYC', amount: '₹22.5L', heightPercent: 28, color: '#f9a8d4' }
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* 1. Top Row: 4 Metric Cards in Indian Rupees (₹ Lakhs) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Actual Costs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center flex flex-col justify-center hover:border-emerald-300 transition-all"
        >
          <div className="text-[13px] font-medium text-slate-500 mb-1">Total Actual Costs</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center">
            <span>₹42.3 Lakhs</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">₹42,31,000 reconciled</div>
        </motion.div>

        {/* Total Planned Budget */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center flex flex-col justify-center hover:border-emerald-300 transition-all"
        >
          <div className="text-[13px] font-medium text-slate-500 mb-1">Total Planned Budget</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center">
            <span>₹68.7 Lakhs</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">₹68,74,000 allocated</div>
        </motion.div>

        {/* ROI */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center flex flex-col justify-center hover:border-emerald-300 transition-all"
        >
          <div className="text-[13px] font-medium text-slate-500 mb-1">Portfolio ROI</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">62.5%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Delivery value yield</div>
        </motion.div>

        {/* Remaining Budget */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center flex flex-col justify-center hover:border-emerald-300 transition-all"
        >
          <div className="text-[13px] font-medium text-slate-500 mb-1">Remaining Budget</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center">
            <span>₹26.4 Lakhs</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">₹26,43,000 reserve</div>
        </motion.div>
      </div>

      {/* 2. Middle Row: Side-by-side Chart Cards (Animated SVG Pie & Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Card: Budget by OKRs (Solid Pie Chart with Pastel Colors & Exterior Labels) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-[15px] font-bold text-slate-800">Budget by OKRs (₹ Lakhs)</div>
            <span className="text-xs font-semibold text-slate-400 font-mono">Q3 FY26-27</span>
          </div>

          <div className="relative w-full flex items-center justify-center min-h-[290px]">
            <svg viewBox="0 0 340 280" className="w-full max-w-[340px] h-auto overflow-visible select-none">
              {/* SLICE 1: KR1 (58%) - Lime Green */}
              <motion.path
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                d="M 160 140 L 124 63 A 85 85 0 1 0 168 55 Z"
                fill="#86efac"
                onClick={() => setSelectedKR('KR1')}
                className="hover:opacity-90 transition-all cursor-pointer"
              />
              <text x="120" y="145" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                58%
              </text>

              {/* SLICE 2: KR2 (20%) - Soft Sky Blue */}
              <motion.path
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                d="M 160 140 L 168 55 A 85 85 0 0 1 228 90 Z"
                fill="#93c5fd"
                onClick={() => setSelectedKR('KR2')}
                className="hover:opacity-90 transition-all cursor-pointer"
              />
              <text x="188" y="112" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">
                20%
              </text>

              {/* SLICE 3: KR3 (11%) - Soft Warm Yellow */}
              <motion.path
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                d="M 160 140 L 228 90 A 85 85 0 0 1 245 140 Z"
                fill="#fde047"
                onClick={() => setSelectedKR('KR3')}
                className="hover:opacity-90 transition-all cursor-pointer"
              />
              <text x="198" y="146" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">
                11%
              </text>

              {/* SLICE 4: KR4 (6%) - Soft Lavender */}
              <motion.path
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                d="M 160 140 L 245 140 A 85 85 0 0 1 236 175 Z"
                fill="#c4b5fd"
                onClick={() => setSelectedKR('KR4')}
                className="hover:opacity-90 transition-all cursor-pointer"
              />
              <text x="194" y="172" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
                6%
              </text>

              {/* SLICE 5: KR5 (5%) - Soft Pastel Pink */}
              <motion.path
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                d="M 160 140 L 236 175 A 85 85 0 0 1 205 198 L 160 140 Z"
                fill="#f9a8d4"
                onClick={() => setSelectedKR('KR5')}
                className="hover:opacity-90 transition-all cursor-pointer"
              />
              <text x="172" y="185" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">
                5%
              </text>

              {/* Exterior Labels (Indian Rupee Lakhs) */}
              <text x="45" y="88" fill="#334155" fontSize="12" fontWeight="bold">
                KR1
              </text>
              <text x="45" y="103" fill="#64748b" fontSize="11" fontWeight="medium">
                ₹25.1L
              </text>

              <text x="245" y="78" fill="#334155" fontSize="12" fontWeight="bold">
                KR2
              </text>
              <text x="245" y="93" fill="#64748b" fontSize="11" fontWeight="medium">
                ₹8.0L
              </text>

              <text x="260" y="148" fill="#334155" fontSize="12" fontWeight="bold">
                KR3
              </text>
              <text x="260" y="163" fill="#64748b" fontSize="11" fontWeight="medium">
                ₹4.7L
              </text>

              <text x="205" y="222" fill="#334155" fontSize="11" fontWeight="bold">
                KR4
              </text>
              <text x="205" y="235" fill="#64748b" fontSize="10" fontWeight="medium">
                ₹2.5L
              </text>

              <text x="160" y="232" fill="#334155" fontSize="11" fontWeight="bold">
                KR5
              </text>
              <text x="160" y="245" fill="#64748b" fontSize="10" fontWeight="medium">
                ₹2.0L
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Right Card: Actual Spend by OKRs (Smooth Animated Vertical Bars) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-[15px] font-bold text-slate-800">Actual Spend by OKRs (₹ Lakhs)</div>
            <span className="text-xs font-semibold text-slate-400 font-mono">Live Disbursals</span>
          </div>

          <div className="relative w-full h-[250px] flex flex-col justify-end pt-6 pb-6 px-4">
            {/* Horizontal Dashed Gridlines at 80, 40, 0 */}
            <div className="absolute top-[35px] left-8 right-4 flex items-center">
              <span className="text-xs font-semibold text-slate-400 w-6 text-right -ml-8 pr-2">80</span>
              <div className="flex-1 border-b border-dashed border-slate-200" />
            </div>

            <div className="absolute top-[115px] left-8 right-4 flex items-center">
              <span className="text-xs font-semibold text-slate-400 w-6 text-right -ml-8 pr-2">40</span>
              <div className="flex-1 border-b border-dashed border-slate-200" />
            </div>

            <div className="absolute bottom-[35px] left-8 right-4 flex items-center">
              <span className="text-xs font-semibold text-slate-400 w-6 text-right -ml-8 pr-2">0</span>
              <div className="flex-1 border-b border-dashed border-slate-200" />
            </div>

            {/* The 5 Animated Vertical Bars */}
            <div className="relative z-10 grid grid-cols-5 gap-3 sm:gap-6 pl-8 h-[160px] items-end">
              {krBars.map((bar, idx) => (
                <div key={bar.key} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 mb-1 group-hover:scale-105 transition-transform">
                    {bar.amount}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.heightPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                    style={{ backgroundColor: bar.color }}
                    className="w-full max-w-[48px] rounded-t-sm transition-all group-hover:brightness-95 cursor-pointer shadow-2xs"
                  />
                </div>
              ))}
            </div>

            {/* X Axis Labels */}
            <div className="grid grid-cols-5 gap-3 sm:gap-6 pl-8 pt-2 text-center text-xs font-bold text-slate-600">
              <div>KR1</div>
              <div>KR2</div>
              <div>KR3</div>
              <div>KR4</div>
              <div>KR5</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Table: Project Portfolio Table (In Indian Rupees) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[13px] font-bold text-slate-500 bg-slate-50/70">
                <th className="py-3 px-4 w-12 text-center">
                  <Settings className="w-4 h-4 text-slate-500 inline-block hover:text-slate-800 cursor-pointer" />
                </th>
                <th className="py-3 px-4 min-w-[120px]">Status</th>
                <th className="py-3 px-4 min-w-[220px]">Project Title</th>
                <th className="py-3 px-4 min-w-[160px]">Progress</th>
                <th className="py-3 px-4 min-w-[130px] text-right">Budget (₹)</th>
                <th className="py-3 px-4 min-w-[130px] text-right">Actual Cost (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {projects.map((proj) => {
                const isExpanded = expandedRow === proj.id;

                return (
                  <React.Fragment key={proj.id}>
                    <tr
                      onClick={() => setExpandedRow(isExpanded ? null : proj.id)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      {/* Row Index */}
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {proj.id}
                      </td>

                      {/* Status Pill */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold inline-block ${getStatusBadge(
                            proj.status
                          )}`}
                        >
                          {proj.status}
                        </span>
                      </td>

                      {/* Title with Chevron */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className="text-slate-500 font-normal">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 inline text-emerald-700" />
                          ) : (
                            <ChevronRight className="w-4 h-4 inline" />
                          )}
                        </span>
                        <span>{proj.title}</span>
                      </td>

                      {/* Progress: Text + Miniature Colored Bar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800 text-xs w-8 font-mono">
                            {proj.progress}%
                          </span>
                          <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden flex">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${proj.progress}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              style={{ backgroundColor: proj.barColor }}
                              className="h-full rounded-full"
                            />
                          </div>
                        </div>
                      </td>

                      {/* Budget in INR */}
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700 font-mono">
                        ₹{proj.budget.toLocaleString('en-IN')}
                      </td>

                      {/* Actual Cost in INR */}
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono">
                        ₹{proj.actualCost.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                    </tr>

                    {/* Expandable Sub-items */}
                    {isExpanded && proj.subItems && (
                      <tr className="bg-emerald-50/30">
                        <td colSpan={6} className="py-3 px-8 text-xs">
                          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
                            <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                              Sub-deliverables &amp; Milestones (Live Reconciliation)
                            </div>
                            {proj.subItems.map((sub, sIdx) => (
                              <div key={sIdx} className="flex items-center justify-between text-slate-700">
                                <span className="font-medium flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                  {sub.name}
                                </span>
                                <div className="flex items-center gap-4">
                                  <span className="text-slate-500 font-mono">{sub.progress}% completed</span>
                                  <span className="font-bold text-slate-900 font-mono">
                                    ₹{sub.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
