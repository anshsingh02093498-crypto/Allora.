import React from 'react';
import { ExtractedUpdate } from '../types';
import { X, Bell, AlertTriangle, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  updates: ExtractedUpdate[];
  onNavigateToTab: (tab: any, projectId?: number) => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({
  isOpen,
  onClose,
  updates,
  onNavigateToTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Live Ingestion &amp; Risk Alerts</h3>
              <p className="text-[11px] text-slate-400">Streamed from connected channels</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-96 overflow-y-auto space-y-3">
          {updates.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border text-xs flex flex-col justify-between ${
                item.riskImpact === 'HIGH'
                  ? 'bg-rose-50/70 border-rose-200'
                  : item.riskImpact === 'MEDIUM'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    {item.source} · {item.extractedProject}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.riskImpact === 'HIGH'
                        ? 'bg-rose-200 text-rose-900'
                        : item.riskImpact === 'MEDIUM'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {item.riskImpact} RISK
                  </span>
                </div>
                <p className="text-slate-700 italic font-serif text-[11px] mb-2">
                  "{item.rawMessage}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Delay: <strong className="text-rose-600">{item.estimatedDelay}</strong></span>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToTab('boost_mode', 1);
                  }}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Resolve with Boost Mode</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
