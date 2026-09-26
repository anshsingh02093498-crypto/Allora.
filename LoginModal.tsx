import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_SRC } from '../data/mockData';
import { UserSession } from '../types';
import {
  ShieldCheck,
  ArrowRight,
  Zap,
  Play,
  Pause,
  ChevronRight,
  Kanban,
  Table as TableIcon,
  GitCommit,
  Calendar as CalendarIcon,
  PieChart,
  CheckCircle2,
  Building2,
  Briefcase,
  UserCheck,
  Bot,
  Sparkles,
  TrendingUp,
  Clock,
  Quote,
  Check
} from 'lucide-react';

interface LoginModalProps {
  onLogin: (session: UserSession) => void;
}

type DemoView = 'board' | 'table' | 'gantt' | 'calendar' | 'chart';

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('manager@allora.ai');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('••••••••••••');
  const [selectedPersonaId, setSelectedPersonaId] = useState<'manager' | 'director' | 'talent_lead'>('manager');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-playing Demo Showcase State
  const [activeView, setActiveView] = useState<DemoView>('board');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Interactive hookable element states inside demo
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTabPrompt, setActiveTabPrompt] = useState<string | null>(null);

  const views: { id: DemoView; label: string; icon: any }[] = [
    { id: 'board', label: 'Board', icon: Kanban },
    { id: 'table', label: 'Table', icon: TableIcon },
    { id: 'gantt', label: 'Gantt Chart', icon: GitCommit },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'chart', label: 'Chart', icon: PieChart },
  ];

  const personas = [
    {
      id: 'manager' as const,
      name: 'Arjun Sharma',
      roleTitle: 'Senior Project Manager',
      email: 'arjun.sharma@allora.ai',
      badge: 'Project Ops',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      icon: Briefcase
    },
    {
      id: 'director' as const,
      name: 'Sarah Jenkins',
      roleTitle: 'Portfolio Director',
      email: 's.jenkins@allora.ai',
      badge: 'Executive',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      icon: Building2
    },
    {
      id: 'talent_lead' as const,
      name: 'Elena Rostova',
      roleTitle: 'Talent Allocation Lead',
      email: 'elena.r@allora.ai',
      badge: 'Resource Ops',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      icon: UserCheck
    }
  ];

  // Auto-advance loop for the Demo Showcase (3.6s per slide)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 40; // 40ms tick
    const totalDuration = 3600; // 3.6s per slide
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveView((current) => {
            const currentIndex = views.findIndex((v) => v.id === current);
            const nextIndex = (currentIndex + 1) % views.length;
            return views[nextIndex].id;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeView]);

  const handleSelectView = (view: DemoView) => {
    setActiveView(view);
    setProgress(0);
  };

  const handleInstantLogin = (personaKey: 'manager' | 'director' | 'talent_lead' = selectedPersonaId) => {
    setIsSubmitting(true);
    const p = personas.find((item) => item.id === personaKey) || personas[0];
    setTimeout(() => {
      onLogin({
        loggedIn: true,
        name: p.name,
        email: p.email,
        roleTitle: p.roleTitle,
        persona: p.id
      });
    }, 120);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPasswordForm) {
      setShowPasswordForm(true);
      return;
    }
    handleInstantLogin(selectedPersonaId);
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfdfd] text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Soft Wrike-inspired Emerald & Slate Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[350px] bg-sky-100/40 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. Sleek Modern Wrike-style Top Navbar */}
      <header className="w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl p-1.5 bg-slate-900 shadow-sm flex items-center justify-center border border-slate-800">
            <img src={LOGO_SRC} alt="ALLORA Logo" className="w-full h-full object-contain rounded-md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900">ALLORA</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Wrike-grade
              </span>
            </div>
          </div>
        </div>

        {/* Center: Wrike-style Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Product Overview</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Live Workspaces</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">100-Project Monitor</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Boost Mode</span>
        </nav>

        {/* Right: Quick Launch & Sign In CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleInstantLogin('manager')}
            className="hidden sm:inline-flex text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={() => handleInstantLogin('manager')}
            className="px-4 py-2 rounded-xl bg-[#00c067] hover:bg-[#00ad5d] active:scale-98 text-white text-xs font-black transition-all shadow-sm hover:shadow-md hover:shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-white fill-current" />
            <span>Try Allora Free</span>
          </button>
        </div>
      </header>

      {/* 2. Main Hero: 2-Column Responsive SaaS Showcase */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Punchy Wrike-style Headline + Hookable Feature Bento Boxes + Instant Login */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00c067] animate-ping" />
            <span>Modern Project Intelligence</span>
          </div>

          {/* Big Bold Punchy Headline (Wrike-styled) */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15]">
              Turn scattered information <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c067] via-teal-600 to-sky-600">
                into work that flows
              </span>
            </h1>

            {/* Emotional Quote in Clean Wrike Card */}
            <div className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-sm relative overflow-hidden flex items-start gap-3">
              <div className="w-1 bg-[#00c067] absolute left-0 top-0 bottom-0 rounded-l" />
              <Quote className="w-4 h-4 text-[#00c067] shrink-0 mt-0.5 ml-1" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-snug">
                &ldquo;Your time matters. Let us handle the details while you focus on what truly matters.&rdquo;
              </p>
            </div>
          </div>

          {/* 3 HOOKABLE INTERACTIVE BENTO BOXES (Eye-catching, numbers-driven, judge-impressive) */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {/* Box 1: Radar */}
            <motion.div
              whileHover={{ y: -2, borderColor: '#00c067' }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 transition-all"
            >
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Predictive</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">14 Days</div>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">Early warning before blockers reach Jira</p>
            </motion.div>

            {/* Box 2: Synchronized */}
            <motion.div
              whileHover={{ y: -2, borderColor: '#00c067' }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 transition-all"
            >
              <div className="flex items-center gap-1.5 text-sky-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Velocity</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">100 Projects</div>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">Real-time macro portfolio health</p>
            </motion.div>

            {/* Box 3: Boost Mode */}
            <motion.div
              whileHover={{ y: -2, borderColor: '#00c067' }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 transition-all"
            >
              <div className="flex items-center gap-1.5 text-violet-700">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Boost Mode</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">+35% Speed</div>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">Instant internal talent reallocation</p>
            </motion.div>
          </div>

          {/* STREAMLINED WRIKE-STYLE LOGIN & INSTANT DEMO ACCESS */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-lg shadow-slate-200/50 space-y-4">
            
            {/* Quick One-Click Judge Access Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00c067]" />
                Direct 1-Click Judge Access
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Active Session
              </span>
            </div>

            {/* BIG PROMINENT 1-CLICK DEMO BUTTON */}
            <button
              type="button"
              onClick={() => handleInstantLogin(selectedPersonaId)}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#00c067] hover:bg-[#00ad5d] active:scale-[0.99] text-white font-black text-sm shadow-md shadow-emerald-600/25 flex items-center justify-between transition-all cursor-pointer border border-[#00c067]"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-white text-xs">
                  {personas.find((p) => p.id === selectedPersonaId)?.name.charAt(0)}
                </div>
                <div>
                  <div className="leading-tight flex items-center gap-1.5">
                    <span>Enter as {personas.find((p) => p.id === selectedPersonaId)?.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-100 font-medium">
                    {personas.find((p) => p.id === selectedPersonaId)?.roleTitle} · 100 Live Projects
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>

            {/* Persona Switcher Chips */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Select Persona:</span>
                <span className="text-slate-400 font-normal">Click to switch</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {personas.map((p) => {
                  const isSelected = selectedPersonaId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPersonaId(p.id);
                        setEmail(p.email);
                      }}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50/80 border-[#00c067] shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold truncate ${isSelected ? 'text-emerald-800' : 'text-slate-800'}`}>
                          {p.name.split(' ')[0]}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-[#00c067]" />}
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium truncate">{p.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Standard Email Row */}
            <form onSubmit={handleEmailSubmit} className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#00c067] transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>Sign In</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {showPasswordForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-1"
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#00c067]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleInstantLogin(selectedPersonaId)}
                    className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                  >
                    Authenticate &amp; Open
                  </button>
                </motion.div>
              )}
            </form>

            {/* Trust Statement */}
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#00c067]" /> Zero-PII Tokenized Ingestion
              </span>
              <span>100 Repositories Synced</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Wrike-style Product Window (Hookable, Animated, Authentic) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-200/80 overflow-hidden flex flex-col">
            
            {/* Window Top Titlebar with macOS Controls & Project Breadcrumbs */}
            <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="text-slate-400">Workspaces /</span>
                  <span>FinTech &amp; Core Banking /</span>
                  <span className="text-slate-900 font-extrabold">Project Alpha</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00c067] animate-pulse" />
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                  SPRINT ACTIVE
                </span>
              </div>
            </div>

            {/* Interactive View Tabs Bar (Chart, Board, Table, Gantt Chart, Calendar) */}
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1">
                {views.map((v) => {
                  const Icon = v.icon;
                  const isActive = activeView === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleSelectView(v.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-slate-900 border border-slate-200/90 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00c067]' : 'text-slate-400'}`} />
                      <span>{v.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors shrink-0 ml-2 shadow-2xs cursor-pointer flex items-center gap-1 text-[11px] font-medium"
                title={isPlaying ? 'Pause auto demo' : 'Resume auto demo'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-slate-600" /> : <Play className="w-3.5 h-3.5 text-[#00c067]" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto'}</span>
              </button>
            </div>

            {/* Showcase Viewport (Clean Light Background & Crisp Wrike-like Cards) */}
            <div className="p-4 sm:p-5 h-[410px] overflow-hidden relative bg-slate-50/40 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                
                {/* 1. BOARD VIEW (Wrike Kanban Columns) */}
                {activeView === 'board' && (
                  <motion.div
                    key="board"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-3 h-full overflow-hidden"
                  >
                    {/* Column 1: New */}
                    <div className="bg-slate-100/80 rounded-xl p-2.5 border border-slate-200/80 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          <span>New (2)</span>
                        </span>
                      </div>
                      
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-400 transition-colors">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          Planning
                        </span>
                        <div className="text-xs font-bold text-slate-900">Determine Q3 Budget</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span className="font-mono font-bold text-slate-700">₹1.8 Cr</span>
                          <span className="text-slate-500">Sep 28</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-400 transition-colors">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">
                          Compliance
                        </span>
                        <div className="text-xs font-bold text-slate-900">PCI-DSS Audit Checklist</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span>Security Ops</span>
                          <span>Oct 02</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: In Progress (Bottlenecked Card Hookable) */}
                    <div className="bg-slate-100/80 rounded-xl p-2.5 border border-slate-200/80 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-700 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>In Progress (2)</span>
                        </span>
                      </div>

                      {/* Highlighted Warning Card */}
                      <div
                        onMouseEnter={() => setHoveredCard('upi')}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 shadow-xs space-y-1.5 cursor-pointer relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-wide bg-amber-200/90 text-amber-900 px-1.5 py-0.5 rounded">
                            Latency Alert
                          </span>
                          <span className="text-[10px] text-amber-800 font-mono font-bold">+12d lag</span>
                        </div>
                        <div className="text-xs font-bold text-amber-950">UPI Webhook Retry Engine</div>
                        <div className="flex items-center justify-between text-[10px] text-amber-900 pt-0.5">
                          <span>Rahul S. (135% load)</span>
                          <span className="font-bold text-[#00c067]">Boost Eligible</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">
                          Infrastructure
                        </span>
                        <div className="text-xs font-bold text-slate-900">PostgreSQL Connection Pool</div>
                        <div className="text-[10px] text-slate-500 pt-0.5">Elena R. · Tuning buffer size</div>
                      </div>
                    </div>

                    {/* Column 3: In Review */}
                    <div className="bg-slate-100/80 rounded-xl p-2.5 border border-slate-200/80 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-violet-700 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-violet-500" />
                          <span>In Review (1)</span>
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
                          Design QA
                        </span>
                        <div className="text-xs font-bold text-slate-900">Review Venue Floor Plan</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span className="text-emerald-600 font-bold">QA Passed</span>
                          <span>Sep 25</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 4: Done */}
                    <div className="bg-slate-100/80 rounded-xl p-2.5 border border-slate-200/80 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00c067]" />
                          <span>Done (3)</span>
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200 space-y-1 opacity-90">
                        <div className="text-xs font-semibold text-slate-400 line-through">Sign Cloud SLA Contract</div>
                        <div className="text-[10px] text-emerald-700 font-bold">Shipped on time</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200 space-y-1 opacity-90">
                        <div className="text-xs font-semibold text-slate-400 line-through">Kafka Stream Partitioning</div>
                        <div className="text-[10px] text-emerald-700 font-bold">99.99% uptime</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. TABLE VIEW (Crisp Wrike Grid) */}
                {activeView === 'table' && (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-full overflow-hidden flex flex-col bg-white rounded-xl border border-slate-200 p-2.5"
                  >
                    <div className="grid grid-cols-12 text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-200">
                      <span className="col-span-5">Task Name</span>
                      <span className="col-span-2 text-center">Status</span>
                      <span className="col-span-3">Assignee</span>
                      <span className="col-span-2 text-right">Capacity</span>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs overflow-y-auto">
                      {[
                        { name: '1. Conference in New York', status: 'In progress', statusColor: 'bg-amber-50 text-amber-700 border-amber-200', assignee: 'Freja McFarland', spent: '273h', cap: '45h' },
                        { name: '2. Plan event schedule', status: 'Done', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', assignee: 'Sofia Hammarén', spent: '18h', cap: '50h' },
                        { name: '3. Determine attendee list', status: 'Done', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', assignee: 'Shelley Sweet', spent: '3h', cap: '50h' },
                        { name: '4. Create catering plan', status: 'In review', statusColor: 'bg-violet-50 text-violet-700 border-violet-200', assignee: 'Reina Findley', spent: '16h', cap: '50h' },
                        { name: '5. Determine budget', status: 'In progress', statusColor: 'bg-amber-50 text-amber-700 border-amber-200', assignee: 'Kahlid Amos', spent: '25h', cap: '50h' },
                        { name: '6. Schedule tasks', status: 'In progress', statusColor: 'bg-amber-50 text-amber-700 border-amber-200', assignee: 'Macaulay Burgess', spent: '15h', cap: '50h' },
                        { name: '7. Sign contract', status: 'Done', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', assignee: 'Jessica Brown', spent: '14h', cap: '50h' },
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-12 py-2 items-center hover:bg-slate-50 transition-colors">
                          <span className="col-span-5 font-bold text-slate-800 truncate pr-2">{row.name}</span>
                          <div className="col-span-2 flex justify-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${row.statusColor}`}>
                              {row.status}
                            </span>
                          </div>
                          <span className="col-span-3 text-slate-600 truncate text-[11px]">{row.assignee}</span>
                          <span className="col-span-2 text-right font-mono text-slate-600 text-[11px] font-bold">{row.spent} / {row.cap}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. GANTT CHART VIEW (Wrike Interactive Timeline) */}
                {activeView === 'gantt' && (
                  <motion.div
                    key="gantt"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-full flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-3.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 pb-2 border-b border-slate-200">
                      <span>Milestone Timeline: Sep 15 - Oct 15</span>
                      <span className="text-[#00c067] font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Boost Mode Active (-5d Saved)
                      </span>
                    </div>

                    <div className="space-y-3 py-1">
                      {[
                        { label: 'Plan event & roadmap', left: '0%', width: '35%', color: 'bg-emerald-500', text: 'Completed Sep 18' },
                        { label: 'Determine attendee list', left: '20%', width: '30%', color: 'bg-emerald-500', text: 'Completed Sep 22' },
                        { label: 'Determine budget', left: '25%', width: '40%', color: 'bg-sky-500', text: 'Reconciling ₹1.8 Cr' },
                        { label: 'Create catering & venue plan', left: '45%', width: '35%', color: 'bg-amber-500', text: 'Delayed (+3 days lag)' },
                        { label: 'Schedule tasks & boost squad', left: '55%', width: '40%', color: 'bg-gradient-to-r from-[#00c067] to-teal-600', text: 'Boost: +2 Devs, -5d Saved' },
                      ].map((bar, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-800">{bar.label}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{bar.text}</span>
                          </div>
                          <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200/80">
                            <div
                              style={{ left: bar.left, width: bar.width }}
                              className={`absolute top-0 bottom-0 rounded-md ${bar.color} opacity-90 shadow-2xs`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
                      <span className="font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#00c067]" />
                        Critical Path Recovery:
                      </span>
                      <span className="font-mono text-emerald-800 font-black">5 Days Saved with Internal Reallocation</span>
                    </div>
                  </motion.div>
                )}

                {/* 4. CALENDAR VIEW (Clean Month Grid) */}
                {activeView === 'calendar' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-full flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-3"
                  >
                    <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-200">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 flex-1 pt-2">
                      {[
                        { d: 1, tag: 'Illustration' },
                        { d: 2, tag: null },
                        { d: 3, tag: 'Navigation' },
                        { d: 4, tag: null },
                        { d: 5, tag: null },
                        { d: 6, tag: null },
                        { d: 7, tag: null },
                        { d: 8, tag: 'Announce' },
                        { d: 9, tag: 'Scripting' },
                        { d: 10, tag: null },
                        { d: 11, tag: 'Wireframe' },
                        { d: 12, tag: null },
                        { d: 13, tag: null },
                        { d: 14, tag: 'Sprint Demo' },
                      ].map((cell, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 rounded-lg p-1.5 border border-slate-200 flex flex-col justify-between hover:border-[#00c067] transition-colors shadow-2xs"
                        >
                          <span className="text-[10px] font-mono text-slate-500 font-bold">{cell.d}</span>
                          {cell.tag ? (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 truncate">
                              {cell.tag}
                            </span>
                          ) : (
                            <div className="h-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 5. CHART VIEW (Wrike Macro Donut & Stats) */}
                {activeView === 'chart' && (
                  <motion.div
                    key="chart"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-full flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-3"
                  >
                    {/* Top 4 Metrics */}
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">All Tasks</div>
                        <div className="text-base font-black text-slate-900 font-mono">78</div>
                      </div>
                      <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-center">
                        <div className="text-[10px] font-bold text-rose-700 uppercase">Overdue</div>
                        <div className="text-base font-black text-rose-700 font-mono">11</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Spent Time</div>
                        <div className="text-base font-black text-slate-900 font-mono">40.1K</div>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <div className="text-[10px] font-bold text-emerald-700 uppercase">Efficiency</div>
                        <div className="text-base font-black text-[#00c067] font-mono">83.7%</div>
                      </div>
                    </div>

                    {/* Donut Chart Simulation */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-1">
                      <div className="sm:col-span-5 flex justify-center">
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#00c067" strokeWidth="14" strokeDasharray="71.6 167" strokeDashoffset="0" />
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#0284c7" strokeWidth="14" strokeDasharray="62 176" strokeDashoffset="-71.6" />
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#8b5cf6" strokeWidth="14" strokeDasharray="47.7 191" strokeDashoffset="-133.6" />
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="40.5 198" strokeDashoffset="-181.3" />
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#f43f5e" strokeWidth="14" strokeDasharray="16.7 222" strokeDashoffset="-221.8" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-xs font-black text-slate-900">100</span>
                            <span className="block text-[8px] text-slate-500 uppercase font-semibold">Projects</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-7 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#00c067]" /> Core features</span>
                          <span className="font-mono font-bold">30%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Integrations</span>
                          <span className="font-mono font-bold">26%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Infrastructure</span>
                          <span className="font-mono font-bold">20%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Security audit</span>
                          <span className="font-mono font-bold">17%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Bug triage</span>
                          <span className="font-mono font-bold">7%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 text-center font-medium">
                      Multi-signal synthesis across Jira, Slack standups, and GitHub PRs
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating AI Assistant Chat Bubble (Exactly like Wrike user's video) */}
              <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-md flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00c067] flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-slate-900">Hi there! I&apos;m ALLORA AI.</span>
                  <span className="text-slate-600 ml-1">
                    Our platform gives engineering leaders 360° visibility over 100 enterprise projects so you don&apos;t spend hours asking &ldquo;What&apos;s the status?&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Scrubber & Progress Indicator */}
            <div className="bg-slate-100/90 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">View {views.findIndex((v) => v.id === activeView) + 1} of {views.length}:</span>
                <span className="font-bold text-slate-900 uppercase tracking-wider">{activeView}</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="flex-1 max-w-xs mx-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-[#00c067] rounded-full transition-all duration-75"
                />
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <span>{isPlaying ? 'Auto-cycle' : 'Paused'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Sleek SaaS Minimal Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-3.5 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900">ALLORA</span>
          <span>· Enterprise Project Intelligence &amp; Autonomous Rebalancing</span>
        </div>
        <div>
          <span>Zero-PII Compliance · SSO Enabled</span>
        </div>
      </footer>
    </div>
  );
};
