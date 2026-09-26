import React, { useState } from 'react';
import { Employee } from '../../types';
import {
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Calendar,
  Search
} from 'lucide-react';

interface TeamWorkloadViewProps {
  employees: Employee[];
  onTriggerReallocation: (employeeId: string) => void;
}

export const TeamWorkloadView: React.FC<TeamWorkloadViewProps> = ({
  employees,
  onTriggerReallocation
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr'];

  // Synthetic schedule matrix for team members (mirroring Wrike's Workload view)
  const workloadData = [
    {
      id: 'EMP-01',
      name: 'Rahul Sharma',
      role: 'Lead Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
      dailyCapacities: ['100%', '150%', '150%', '100%', '80%'],
      tasks: [
        { name: 'Payment API & Sandbox Webhooks', days: [0, 1, 2], color: 'bg-amber-100 text-amber-800 border-amber-300' },
        { name: 'Redis Cache & Concurrency Locks', days: [2, 3, 4], color: 'bg-indigo-100 text-indigo-800 border-indigo-300' }
      ]
    },
    {
      id: 'EMP-02',
      name: 'Aman Verma',
      role: 'Senior Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces',
      dailyCapacities: ['100%', '100%', '150%', '150%', '100%'],
      tasks: [
        { name: 'Stripe Merchant Webhook Debugging', days: [1, 2, 3], color: 'bg-rose-100 text-rose-800 border-rose-300' },
        { name: 'Idempotency Key Verification', days: [3, 4], color: 'bg-sky-100 text-sky-800 border-sky-300' }
      ]
    },
    {
      id: 'EMP-03',
      name: 'Priya Nair',
      role: 'Senior UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
      dailyCapacities: ['50%', '100%', '50%', '40%', '80%'],
      tasks: [
        { name: 'Research target audience & checkout UX', days: [0, 1], color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
        { name: 'Create sketches and interactive prototypes', days: [1, 2, 3, 4], color: 'bg-purple-100 text-purple-800 border-purple-300' }
      ]
    },
    {
      id: 'EMP-07',
      name: 'Karan Singhania',
      role: 'QA & Integration Tester',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces',
      dailyCapacities: ['60%', '60%', '50%', '50%', '40%'],
      tasks: [
        { name: 'Postman Collections & Regression Matrix', days: [0, 1, 2], color: 'bg-teal-100 text-teal-800 border-teal-300' }
      ]
    },
    {
      id: 'EMP-11',
      name: 'Kabir Mehta',
      role: 'DevOps & Cloud Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
      dailyCapacities: ['80%', '80%', '100%', '80%', '70%'],
      tasks: [
        { name: 'Kubernetes Ingress & Cloudflare DNS', days: [1, 2, 3], color: 'bg-slate-200 text-slate-800 border-slate-300' }
      ]
    }
  ];

  const filteredTeam = workloadData.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col space-y-4 p-6">
      {/* Top Banner Alert & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900">Project Team Workload</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 2 Team Members Overloaded (150%)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Capacity management matrix tracking developer burn rate and sprint bandwidth.
          </p>
        </div>

        {/* Date interval & search */}
        <div className="flex items-center gap-3">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Sep 14 – 20</span>
          </div>
        </div>
      </div>

      {/* Workload Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
              <th className="py-3 px-4 text-left w-72">Team Member</th>
              {days.map((day) => (
                <th key={day} className="py-3 px-4 text-center min-w-[120px]">
                  {day}
                </th>
              ))}
              <th className="py-3 px-4 text-right w-44">Talent Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredTeam.map((member) => {
              const hasOverload = member.dailyCapacities.includes('150%');

              return (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Member Info */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {member.name}
                          {hasOverload && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{member.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Daily Capacities & Tasks */}
                  {member.dailyCapacities.map((cap, dIdx) => {
                    const is150 = cap === '150%';
                    const activeDayTasks = member.tasks.filter((t) => t.days.includes(dIdx));

                    return (
                      <td key={dIdx} className="py-4 px-2 align-top text-center">
                        {/* Capacity Badge (Wrike Style with Pink 150% Box) */}
                        <div className="flex justify-center mb-2">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              is150
                                ? 'bg-rose-100 text-rose-800 border-2 border-rose-400 shadow-xs ring-2 ring-rose-200'
                                : cap === '100%'
                                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {cap}
                          </span>
                        </div>

                        {/* Scheduled Task Blocks */}
                        <div className="space-y-1">
                          {activeDayTasks.map((task, tIdx) => (
                            <div
                              key={tIdx}
                              className={`p-1.5 rounded-lg text-[10px] font-bold border truncate text-left shadow-2xs ${task.color}`}
                              title={task.name}
                            >
                              <span className="truncate block">{task.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}

                  {/* Talent Reallocation Action */}
                  <td className="py-4 px-4 align-top text-right">
                    {hasOverload ? (
                      <button
                        onClick={() => onTriggerReallocation(member.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 ml-auto shadow-xs transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Reallocate Work</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Balanced
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
