import React, { useState } from 'react';
import {
  INTEGRATION_PILLS,
  EXPANDED_INTEGRATIONS,
  INITIAL_EXTRACTED_UPDATES,
  IntegrationCardItem
} from '../data/mockData';
import { ExtractedUpdate, RiskLevel } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Lock,
  RefreshCw,
  Search,
  Send,
  Zap,
  SlidersHorizontal,
  Box,
  FileText,
  Folder,
  FileSpreadsheet,
  Mail,
  Calendar,
  HardDrive,
  Users,
  Layout,
  CheckSquare,
  Bot,
  GitBranch
} from 'lucide-react';

interface DataConnectionsViewProps {
  onNewParsedUpdate?: (update: ExtractedUpdate) => void;
}

export const DataConnectionsView: React.FC<DataConnectionsViewProps> = ({ onNewParsedUpdate }) => {
  const [integrations, setIntegrations] = useState<IntegrationCardItem[]>(EXPANDED_INTEGRATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'gallery' | 'sync' | 'integrate' | 'api' | 'live_nlp'>('gallery');

  // NLP Sandbox state
  const [rawInput, setRawInput] = useState<string>('');
  const [selectedPresetSource, setSelectedPresetSource] = useState<'WhatsApp' | 'Email' | 'Jira' | 'Slack'>('WhatsApp');
  const [liveExtracted, setLiveExtracted] = useState<ExtractedUpdate | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [liveStream, setLiveStream] = useState<ExtractedUpdate[]>(INITIAL_EXTRACTED_UPDATES);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Productivity',
    'Project Management',
    'Developer',
    'Collaboration',
    'Finance',
    'Analytics',
    'Digital Asset Management',
    'Customer Relations'
  ];

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      activeTab === 'gallery' ? true : item.type.toLowerCase() === activeTab.toLowerCase();
    return matchesCategory && matchesSearch && matchesType;
  });

  const handleTestNLP = (customText?: string) => {
    const textToProcess = customText || rawInput;
    if (!textToProcess) return;

    setIsProcessing(true);
    setTimeout(() => {
      const lower = textToProcess.toLowerCase();
      let extractedProject = 'E-Commerce Platform';
      let extractedTask = 'Feature Development';
      let estimatedDelay = '1-2 days';
      let riskImpact: RiskLevel = 'MEDIUM';

      if (lower.includes('payment') || lower.includes('webhook') || lower.includes('checkout')) {
        extractedProject = 'E-Commerce Platform';
        extractedTask = 'Payment Gateway Webhook';
        riskImpact = lower.includes('bug') || lower.includes('slip') || lower.includes('fail') ? 'HIGH' : 'LOW';
        estimatedDelay = '2 days';
      } else if (lower.includes('bank') || lower.includes('aws') || lower.includes('database') || lower.includes('rds')) {
        extractedProject = 'Mobile Banking App';
        extractedTask = 'Database Performance Optimization';
        riskImpact = 'MEDIUM';
        estimatedDelay = '1 day';
      }

      const newUpdate: ExtractedUpdate = {
        id: `LIVE-${Date.now()}`,
        source: selectedPresetSource,
        channel: `#live-stream-${selectedPresetSource.toLowerCase()}`,
        rawMessage: textToProcess,
        extractedProject,
        extractedTask,
        extractedStatus: riskImpact === 'HIGH' ? 'Blocked' : 'In Progress',
        estimatedDelay,
        riskImpact,
        timestamp: 'Just now',
        senderRole: 'Team Contributor'
      };

      setLiveExtracted(newUpdate);
      setLiveStream((prev) => [newUpdate, ...prev]);
      if (onNewParsedUpdate) {
        onNewParsedUpdate(newUpdate);
      }
      setIsProcessing(false);
      setRawInput('');
    }, 700);
  };

  const getIconComponent = (name: string) => {
    switch (name) {
      case 'Box': return Box;
      case 'FileText': return FileText;
      case 'Folder': return Folder;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Mail': return Mail;
      case 'Calendar': return Calendar;
      case 'HardDrive': return HardDrive;
      case 'Users': return Users;
      case 'Layout': return Layout;
      case 'CheckSquare': return CheckSquare;
      case 'Bot': return Bot;
      case 'GitBranch': return GitBranch;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Iconic Hero Section (Matching User Screenshot Exactly) */}
      <div className="text-center max-w-4xl mx-auto pt-4 pb-2 space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Connect the tools you love with <br className="hidden sm:block" />
          <span className="text-indigo-600">400+ integrations</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ALLORA Integrate easily syncs with almost any app your enterprise uses and automates project monitoring, risk detection, and talent mobility both outside and inside our platform.
        </p>
      </div>

      {/* 2. Horizontal Scrolling/Floating Integration Brand Pills (Directly from User Screenshot) */}
      <div className="overflow-hidden py-3 border-y border-slate-200/80 bg-slate-50/50">
        <div className="flex gap-2.5 items-center overflow-x-auto scrollbar-none px-4 sm:justify-center flex-wrap">
          {INTEGRATION_PILLS.map((pill) => (
            <div
              key={pill.name}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2 shrink-0 hover:border-indigo-400 hover:shadow-xs transition-all cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500/70" />
              <span>{pill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sub-tabs bar: Gallery, Allora Sync, Allora Integrate, API, Live NLP Stream */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'gallery', label: 'Gallery' },
            { id: 'sync', label: 'Allora Sync' },
            { id: 'integrate', label: 'Allora Integrate' },
            { id: 'api', label: 'AI & API' },
            { id: 'live_nlp', label: 'Live NLP Stream & Sandbox' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search inside Integrations */}
        {activeTab !== 'live_nlp' && (
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps & integrations..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* 4. Main Content: Split Sidebar & Grid (Matching Wrike Apps & Integrations 01:29) */}
      {activeTab !== 'live_nlp' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Category Navigation Sidebar */}
          <div className="md:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-2">
              Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === cat
                    ? 'bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200/60'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            ))}
          </div>

          {/* Right Grid of Rich Integration Cards (Wrike Style with Badges) */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((item) => {
              const Icon = getIconComponent(item.iconName);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-3 ${
                    item.connected
                      ? 'border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300'
                      : 'border-slate-200/70 opacity-80 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  {/* Top: Icon + Badges + Toggle */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.planBadge}
                      </span>

                      {/* Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleConnection(item.id)}
                        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          item.connected ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            item.connected ? 'translate-x-3' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Body: Title & Description */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Scoped Privacy Notice */}
                  <div className="pt-2 border-t border-slate-100 text-[10px] flex items-center justify-between text-slate-400">
                    <span className="truncate flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.allowedScopes}</span>
                    </span>
                    {item.lastSync && (
                      <span className="text-emerald-700 font-mono shrink-0 ml-1">{item.lastSync}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 5. Live NLP Parser & Communication Stream (SIH 103 Section 6 & 7) */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Message Tester */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Live Communication Ingestion Tester
                </h3>
                <span className="text-[11px] font-bold text-slate-400">NLP Sandbox</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Test how ALLORA automatically extracts structured project names, tasks, delays, and risk levels from raw chat without human intervention.
              </p>

              {/* Preset Buttons */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: 'WhatsApp Blocker', text: 'Guys payment API is failing in sandbox, need 2 more days' },
                  { label: 'Email QA Digest', text: 'Daily QA digest: 5 biometric settlement cases failed on staging' },
                  { label: 'Slack UI Update', text: 'UI team has completed all checkout screens and handed over to QA' }
                ].map((sample) => (
                  <button
                    key={sample.label}
                    onClick={() => {
                      setRawInput(sample.text);
                      handleTestNLP(sample.text);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="space-y-2">
                <textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="Type or paste any raw team update (e.g. 'Database query timing out, slipping by 1 day')..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none bg-slate-50"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleTestNLP()}
                    disabled={isProcessing || !rawInput.trim()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Parsing with NLP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Simulate Ingestion</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Extracted Structured JSON / Card */}
            <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    NLP Parsing Engine Output
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Zero PII Storage</span>
              </div>

              {liveExtracted ? (
                <div className="space-y-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 text-[10px] block font-mono">RAW INGESTED TEXT:</span>
                    <p className="text-slate-200 font-medium mt-0.5">"{liveExtracted.rawMessage}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block">EXTRACTED PROJECT:</span>
                      <strong className="text-indigo-300 text-xs">{liveExtracted.extractedProject}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block">EXTRACTED TASK:</span>
                      <strong className="text-slate-100 text-xs">{liveExtracted.extractedTask}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block">ESTIMATED SLIPPAGE:</span>
                      <strong className="text-amber-400 text-xs">+{liveExtracted.estimatedDelay}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block">RISK SEVERITY:</span>
                      <strong
                        className={`text-xs ${
                          liveExtracted.riskImpact === 'HIGH' ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {liveExtracted.riskImpact} RISK
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Click a preset or enter a team message on the left to inspect real-time NLP classification.
                </div>
              )}
            </div>
          </div>

          {/* Ingested Stream Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Ingested Communications Audit Log
              </h4>
              <span className="text-xs text-slate-400 font-mono">Live Sync Active</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {liveStream.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-slate-100 text-slate-700">
                        {item.source}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">{item.channel}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-semibold">{item.timestamp}</span>
                    </div>
                    <p className="text-slate-800 font-medium">"{item.rawMessage}"</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        item.riskImpact === 'HIGH'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {item.riskImpact} IMPACT
                    </span>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      Target: {item.extractedProject}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
