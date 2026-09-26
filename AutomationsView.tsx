import React, { useState } from 'react';
import { DEFAULT_AUTOMATION_RULES } from '../../data/mockData';
import { AutomationRule } from '../../types';
import {
  Zap,
  ArrowRight,
  Plus,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Sparkles,
  Layers
} from 'lucide-react';

export const AutomationsView: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(DEFAULT_AUTOMATION_RULES);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTrigger, setNewTrigger] = useState<string>('When status changes to Review required');
  const [newAction, setNewAction] = useState<string>('Notify QA team & verify test coverage');

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const rule: AutomationRule = {
      id: `auto-${Date.now()}`,
      title: newTitle.trim(),
      trigger: newTrigger,
      action: newAction,
      active: true,
      category: 'Status'
    };
    setRules([...rules, rule]);
    setIsCreating(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Zap className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Workflow Automations &amp; Triggers
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            "When this happens → then do that" rule builder. Eliminate manual tracking by triggering automatic talent reallocation, risk alerts, and milestone approvals.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Automation Rule</span>
        </button>
      </div>

      {/* New Rule Modal / Form */}
      {isCreating && (
        <form
          onSubmit={handleAddRule}
          className="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-md space-y-4 animate-fade-in"
        >
          <div className="font-extrabold text-sm text-slate-900">Create Workflow Automation</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                Rule Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Escalate Critical Delays"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                When this happens (Trigger)
              </label>
              <select
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="When status changes to Review required">
                  When status changes to 'Review required'
                </option>
                <option value="When risk score exceeds 70%">
                  When risk score exceeds 70%
                </option>
                <option value="When task is blocked for > 2 days">
                  When task is blocked for &gt; 2 days
                </option>
                <option value="When status changes to Deployed">
                  When status changes to 'Deployed'
                </option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                Then do that (Action)
              </label>
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Prompt manager to activate Boost Mode"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
            >
              Save Rule
            </button>
          </div>
        </form>
      )}

      {/* Rules Grid (Wrike 01:25 Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl bg-white border transition-all ${
              rule.active
                ? 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300'
                : 'border-slate-200/60 opacity-60 bg-slate-50/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="font-extrabold text-sm text-slate-900">{rule.title}</span>
                <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                  {rule.category}
                </span>
              </div>

              {/* Active Toggle */}
              <button
                type="button"
                onClick={() => toggleRule(rule.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  rule.active ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    rule.active ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Visual Trigger -> Action Box (Matching Wrike 01:25) */}
            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-extrabold text-[10px] shrink-0">
                  WHEN
                </span>
                <span className="font-semibold text-slate-800">{rule.trigger}</span>
              </div>

              <div className="flex items-center gap-2 pl-4 text-emerald-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px] shrink-0">
                  THEN
                </span>
                <span className="font-medium text-slate-700">{rule.action}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
