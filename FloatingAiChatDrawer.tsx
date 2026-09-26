import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { BotMessageSquare, X, Send, Sparkles, ArrowRight, ShieldCheck, Minimize2 } from 'lucide-react';
import { EMPLOYEES } from '../data/mockData';

interface FloatingAiChatDrawerProps {
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

export const FloatingAiChatDrawer: React.FC<FloatingAiChatDrawerProps> = ({
  projects,
  onNavigateToTab
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste! I am ALLORA AI Assistant. I continuously monitor multi-signal updates across all 100 enterprise projects. Ask me about project risks, talent matching, or sprint delays.'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Which projects are at risk?',
    'Why is Project Alpha delayed?',
    'Find available Node.js developers'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I analyzed our real-time telemetry across Jira, WhatsApp feeds, and ERP data.";
      let action: { label: string; tab: string; projectId?: number } | undefined;

      const q = textToSend.toLowerCase();
      if (q.includes('risk') || q.includes('delay') || q.includes('miss')) {
        reply = "Currently, Project Alpha (E-Commerce Platform) is in critical delay (+12 days) due to UPI payment gateway webhook timeouts. Cloud ERP Migration is also at risk (+5 days). I recommend activating Project Boost Mode.";
        action = {
          label: 'Launch Boost Mode on Alpha',
          tab: 'boost_mode',
          projectId: 1
        };
      } else if (q.includes('developer') || q.includes('talent') || q.includes('node')) {
        reply = "Sarah Jenkins (Fintech Analytics) has 45% idle capacity and 5 shipped Node.js production systems. Priya Patel is also certified in UPI webhooks. You can transfer capacity via Talent Rebalance.";
        action = {
          label: 'Open Talent Rebalance',
          tab: 'talent_reallocation',
          projectId: 1
        };
      } else {
        reply = `Signal update verified for "${textToSend}": All 100 repositories are synchronized. 72 initiatives are On Track, 18 are At Risk, and 10 require intervention.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          actionButton: action
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white shadow-xl flex items-center gap-2 group transition-transform hover:scale-105 cursor-pointer"
          title="Open AI Manager Q&A Assistant"
        >
          <BotMessageSquare className="w-5 h-5 text-white" />
          <span className="text-xs font-bold pr-1 hidden sm:inline">Ask AI Assistant</span>
          <span className="w-2.5 h-2.5 rounded-full bg-sky-300 animate-ping absolute top-1 right-1" />
        </motion.button>
      )}

      {/* Floating Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <BotMessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-none">ALLORA AI Assistant</h3>
                  <p className="text-[10px] text-sky-100 mt-0.5 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" /> Live Telemetry
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Minimize Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed text-[11px]">{m.text}</p>
                    {m.actionButton && (
                      <button
                        onClick={() => {
                          onNavigateToTab(m.actionButton!.tab, m.actionButton!.projectId);
                          setIsOpen(false);
                        }}
                        className="mt-2.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>{m.actionButton.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-500 text-[10px] p-2.5 rounded-2xl flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    <span>Analyzing project telemetry...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-1.5 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-1 overflow-x-auto scrollbar-none">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp)}
                  className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-sky-700 whitespace-nowrap transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(query);
              }}
              className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about risks, talent, or delay..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
