import React, { useState } from 'react';
import { UserSession, Project, ExtractedUpdate } from './types';
import { PROJECTS, EXTRACTED_UPDATES, calculateRisk } from './data/mockData';
import { LoginModal } from './components/LoginModal';
import { NavTab } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { DashboardView } from './components/DashboardView';
import { ProjectsView } from './components/ProjectsView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TalentReallocationView } from './components/TalentReallocationView';
import { BoostModeView } from './components/BoostModeView';
import { BuildBestTeamView } from './components/BuildBestTeamView';
import { WhatIfSimulatorView } from './components/WhatIfSimulatorView';
import { DataConnectionsView } from './components/DataConnectionsView';
import { AiManagerQAView } from './components/AiManagerQAView';
import { ReportsView } from './components/ReportsView';
import { AlertsModal } from './components/AlertsModal';
import { OkrPortfolioView } from './components/views/OkrPortfolioView';
import { SihFeatureModal } from './components/SihFeatureModal';
import { FloatingAiChatDrawer } from './components/FloatingAiChatDrawer';

export default function App() {
  // Session State (Shows Login & Demo Video showcase first)
  const [session, setSession] = useState<UserSession | null>(null);

  // Global Navigation & Layout State
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedProjectIdForFeature, setSelectedProjectIdForFeature] = useState<number>(1);
  const [activeFeatureModal, setActiveFeatureModal] = useState<string | null>(null);

  // Projects State (allows real-time updates when reallocating or boosting)
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const [extractedUpdatesList, setExtractedUpdatesList] = useState<ExtractedUpdate[]>(EXTRACTED_UPDATES);

  // Modals State
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Handle Tab Switch with optional Project context
  const handleNavigateToTab = (tab: NavTab, projectId?: number) => {
    setActiveTab(tab);
    if (projectId) {
      setSelectedProjectIdForFeature(projectId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Talent Reallocation Application
  const handleApplyReallocation = (projectId: number, employeeId: string, role: string) => {
    setProjectsList((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'ON TRACK',
            progress: Math.min(100, p.progress + 15),
            lastUpdateSource: 'ALLORA Talent Engine',
            lastUpdateText: `Internal talent allocation authorized: ${employeeId} assigned as ${role}. Risk mitigated and timeline compressed.`
          };
        }
        return p;
      })
    );
  };

  // Handle New Real-Time Ingested Message
  const handleNewParsedUpdate = (newUpdate: ExtractedUpdate) => {
    setExtractedUpdatesList((prev) => [newUpdate, ...prev]);
  };

  // If not logged in, display the login portal
  if (!session || !session.loggedIn) {
    return <LoginModal onLogin={(sess) => setSession(sess)} />;
  }

  // Calculate critical alerts count
  const criticalAlertsCount = extractedUpdatesList.filter((u) => u.riskImpact === 'HIGH').length;

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex selection:bg-sky-500 selection:text-white">
      {/* 1. Modern SaaS Left Sidebar Navigation (LunarDesk / VerifyWise style) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleNavigateToTab}
        user={session}
        onLogout={() => setSession(null)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        onOpenFeatureModal={(key) => setActiveFeatureModal(key)}
      />

      {/* 2. Main Content Right Pane */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-18' : 'lg:pl-64'
        }`}
      >
        {/* Top Header Bar */}
        <HeaderBar
          activeTab={activeTab}
          searchQuery={globalSearch}
          onSearchChange={(q) => {
            setGlobalSearch(q);
            if (activeTab !== 'projects') {
              setActiveTab('projects');
            }
          }}
          criticalAlertsCount={criticalAlertsCount}
          onOpenAlertsModal={() => setIsAlertsOpen(true)}
          onOpenFeatureModal={(key) => setActiveFeatureModal(key)}
          user={session}
          onLogout={() => setSession(null)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={projectsList}
              extractedUpdates={extractedUpdatesList}
              onSelectProject={(p) => setInspectingProject(p)}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projectsList}
              onSelectProject={(p) => setInspectingProject(p)}
              onNavigateToTab={handleNavigateToTab}
              initialSearch={globalSearch}
            />
          )}

          {activeTab === 'okr' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    OKR &amp; Portfolio Financial Analytics
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Synchronized with Wrike and Enterprise ERP for budget vs. actual cost reconciliation (₹).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    Q3 Live Reconciled (₹ INR)
                  </span>
                </div>
              </div>
              <OkrPortfolioView />
            </div>
          )}

          {activeTab === 'talent_reallocation' && (
            <TalentReallocationView
              projects={projectsList}
              selectedProjectId={selectedProjectIdForFeature}
              onApplyReallocation={handleApplyReallocation}
            />
          )}

          {activeTab === 'boost_mode' && (
            <BoostModeView
              projects={projectsList}
              selectedProjectId={selectedProjectIdForFeature}
            />
          )}

          {activeTab === 'build_team' && <BuildBestTeamView />}

          {activeTab === 'simulator' && (
            <WhatIfSimulatorView
              projects={projectsList}
              selectedProjectId={selectedProjectIdForFeature}
            />
          )}

          {activeTab === 'connections' && (
            <DataConnectionsView onNewParsedUpdate={handleNewParsedUpdate} />
          )}

          {activeTab === 'ai_qa' && (
            <AiManagerQAView
              projects={projectsList}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'reports' && <ReportsView projects={projectsList} />}
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800">ALLORA</span>
              <span>· Enterprise Project Intelligence &amp; Monitoring Platform</span>
            </div>
            <div>
              <span>Zero-PII Multi-Channel Ingestion · Internal Talent Mobility · Predictive Risk Engine</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating AI Assistant Chatbot Drawer */}
      <FloatingAiChatDrawer
        projects={projectsList}
        onNavigateToTab={handleNavigateToTab}
      />

      {/* SIH Presentation Deck Feature Notes Modal */}
      <SihFeatureModal
        featureKey={activeFeatureModal}
        onClose={() => setActiveFeatureModal(null)}
      />

      {/* Inspect Project Modal */}
      <ProjectDetailModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
        onNavigateToTab={handleNavigateToTab}
      />

      {/* Alerts Modal */}
      <AlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        updates={extractedUpdatesList}
        onNavigateToTab={handleNavigateToTab}
      />
    </div>
  );
}
