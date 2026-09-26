import React, { useState } from 'react';
import { Project, Employee } from '../types';
import { EMPLOYEES, calculateRisk, formatCurrency } from '../data/mockData';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AiManagerQAViewProps {
  projects: Project[];
  onNavigateToTab: (tab: any, projectId?: number) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionButton?: {
    label: string;
    tab: string;
    projectId?: number;
  };
}

export const AiManagerQAView: React.FC<AiManagerQAViewProps> = ({
  projects,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Good day! I am ALLORA Intelligence. I synthesize real-time data across your 100 portfolio projects, communication feeds (WhatsApp, Emails, Jira), and internal organizational skill inventories. What would you like to investigate?'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const presetQuestions = [
    'Which projects are currently at risk?',
    'Why is E-Commerce Platform delayed?',
    'Who has payment systems experience and is available?',
    'Which projects are likely to miss deadlines next week?',
    'Draft an executive risk summary for Project Alpha'
  ];

  const handleAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: questionText
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let actionBtn: Message['actionButton'] | undefined = undefined;

      const q = questionText.toLowerCase();

      if (q.includes('at risk') || q.includes('risk')) {
        const atRiskProjects = projects.filter((p) => p.status === 'AT RISK' || p.status === 'DELAYED');
        replyText = `Across your 100-project portfolio, **18 projects are classified as At Risk** and **10 are Delayed**.\n\nTop urgent attention is required on **E-Commerce Platform (78% risk)** due to payment gateway testing lag, and **Hospital Management System (70% risk)** due to missing senior compliance developers.`;
        actionBtn = {
          label: 'Inspect E-Commerce Rescue Plan',
          tab: 'boost_mode',
          projectId: 1
        };
      } else if (q.includes('why') || q.includes('e-commerce') || q.includes('delayed')) {
        const ecom = projects.find((p) => p.id === 1)!;
        const r = calculateRisk(ecom);
        replyText = `**E-Commerce Platform** is currently delayed by **${r.predictedDelay} days** due to two compounding factors:\n\n1. **Testing Lag & Defect Density**: 3 critical webhook bugs were reported on WhatsApp/Jira during payment integration.\n2. **Resource Shortage**: 2 QA automation engineers are absent or overallocated.\n\nActivating **Project Boost Mode** or reallocating an internal engineer with payment API experience can recover 3 days immediately.`;
        actionBtn = {
          label: 'Launch Boost Mode on E-Commerce',
          tab: 'boost_mode',
          projectId: 1
        };
      } else if (q.includes('payment') || q.includes('who has') || q.includes('available')) {
        const qualified = EMPLOYEES.filter((e) =>
          e.skills.some((s) => s.toLowerCase().includes('payment') || s.toLowerCase().includes('python'))
        );
        replyText = `I searched the internal employee directory across all departments:\n\n• **${qualified[0]?.name}**: ${qualified[0]?.role} (${qualified[0]?.availability} Availability, ${qualified[0]?.workload}% workload). Built BharatPay Gateway.\n• **${qualified[1]?.name}**: ${qualified[1]?.role} (${qualified[1]?.availability} Availability). Delivered Razorpay microservices.\n\nBoth can be assigned immediately via **Internal Talent Reallocation** without hiring lag.`;
        actionBtn = {
          label: 'Open Talent Reallocation',
          tab: 'talent_reallocation',
          projectId: 1
        };
      } else if (q.includes('deadline') || q.includes('next week')) {
        replyText = `Within the next 7 business days, **2 projects** are approaching critical release milestones:\n\n• **E-Commerce Platform**: Milestone 'Payment Gateway Integration' due in 3 days (Currently behind by 4 days).\n• **Mobile Banking App**: Milestone 'Security Audit' due in 6 days (Currently on track with 92% readiness).`;
        actionBtn = {
          label: 'View What-If Simulator',
          tab: 'simulator',
          projectId: 1
        };
      } else {
        replyText = `Based on real-time synthesis across your 100 enterprise projects: Portfolio milestone velocity is currently **88%**, with **72 projects On Track**. The automated risk heuristic flags that unblocking QA staffing on Project #1 and #3 yields the highest ROI for overall on-time execution.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          actionButton: actionBtn
        }
      ]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
            <BotMessageSquare className="w-3.5 h-3.5" /> Section 19 Decision Assistant
          </span>
          <span className="text-xs text-slate-400">Context-Aware LLM Engine · 100 Projects Portfolio Grounding</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
          AI Manager Q&amp;A Assistant
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Ask conversational questions to interrogate project risks, query root causes of delays, identify available skilled talent, or prepare executive milestone summaries in natural language.
        </p>
      </div>

      {/* Preset Fast Queries */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Frequently Inquired Decision Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(pq)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs text-slate-700 font-medium transition-all text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{pq}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chat Window */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-xs'
                }`}
              >
                {msg.sender === 'user' ? 'M' : <BotMessageSquare className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.actionButton && (
                  <div className="pt-2 mt-2 border-t border-slate-200">
                    <button
                      onClick={() => onNavigateToTab(msg.actionButton!.tab, msg.actionButton!.projectId)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>{msg.actionButton.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <BotMessageSquare className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span>ALLORA Intelligence is analyzing 100 project records...</span>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk(query);
            }}
            placeholder="Ask a question about projects, delays, budget burn, or talent..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleAsk(query)}
            disabled={!query.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send Question</span>
          </button>
        </div>
      </div>
    </div>
  );
};
