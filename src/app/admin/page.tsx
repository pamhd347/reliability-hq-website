'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Agent definitions
const agents = [
  {
    id: 'villanelle',
    name: 'Villanelle',
    emoji: '🗡️',
    role: 'Coordinator',
    description: 'Drives the team, manages operations',
    status: 'working' as const,
  },
  {
    id: 'dr-marie',
    name: 'Dr. Marie Chen',
    emoji: '🔬',
    role: 'RCM Expert',
    description: 'Standards authority, tool designer',
    status: 'working' as const,
  },
  {
    id: 'eve',
    name: 'Eve Polastri',
    emoji: '📝',
    role: 'Content Strategist',
    description: 'Technical writing, content planning',
    status: 'resting' as const,
  },
];

// Project data
const completedItems = [
  { id: 1, title: 'RCM Fundamentals Course', type: 'course', date: '2026-02-02' },
  { id: 2, title: 'RCM Practitioner Course', type: 'course', date: '2026-02-02' },
  { id: 3, title: 'User Authentication System', type: 'feature', date: '2026-02-02' },
  { id: 4, title: 'Function Statement Generator', type: 'tool', date: '2026-02-02' },
  { id: 5, title: 'Failure Mode Suggester', type: 'tool', date: '2026-02-02' },
  { id: 6, title: 'Consequence Classifier', type: 'tool', date: '2026-02-02' },
  { id: 7, title: 'P-F Interval Estimator', type: 'tool', date: '2026-02-02' },
  { id: 8, title: 'FMEA Row Helper', type: 'tool', date: '2026-02-02' },
  { id: 9, title: 'RCM Wizard (Preview)', type: 'tool', date: '2026-02-02' },
  { id: 10, title: 'Equipment Database (250+ failure modes)', type: 'data', date: '2026-02-02' },
  { id: 11, title: 'ChatGPT vs Claude Article', type: 'article', date: '2026-02-02' },
  { id: 12, title: 'Run-to-Failure Article', type: 'article', date: '2026-02-02' },
  { id: 13, title: 'Function Statements (20 Examples)', type: 'article', date: '2026-02-02' },
  { id: 14, title: '5 Pump Failure Modes', type: 'article', date: '2026-02-02' },
  { id: 15, title: 'AI Failure Mode Libraries', type: 'article', date: '2026-02-02' },
  { id: 16, title: 'Tool Spec: Component 1 (Setup)', type: 'spec', date: '2026-02-02' },
  { id: 17, title: 'Tool Spec: Component 2 (Functions)', type: 'spec', date: '2026-02-02' },
  { id: 18, title: 'Tool Spec: Component 3 (Failure Modes)', type: 'spec', date: '2026-02-02' },
  { id: 19, title: 'Tool Spec: Component 4 (Consequences)', type: 'spec', date: '2026-02-02' },
];

const inProgressItems = [
  { id: 20, title: 'Tool Spec: Component 5 (Task Selection)', type: 'spec', agent: 'dr-marie', progress: 60 },
  { id: 21, title: 'Tool Spec: Component 6 (Export)', type: 'spec', agent: 'dr-marie', progress: 0 },
];

const pipelineItems = [
  { id: 30, title: 'Build RCM Tool Component 1', type: 'dev', priority: 'high' },
  { id: 31, title: 'Build RCM Tool Component 2', type: 'dev', priority: 'high' },
  { id: 32, title: 'Custom Domain Setup', type: 'infra', priority: 'medium' },
  { id: 33, title: 'LinkedIn Company Page', type: 'marketing', priority: 'high' },
  { id: 34, title: 'Email Marketing Setup', type: 'marketing', priority: 'medium' },
  { id: 35, title: 'More Blog Articles (28 planned)', type: 'content', priority: 'medium' },
  { id: 36, title: 'OG Image PNG Conversion', type: 'design', priority: 'low' },
];

const pamsTasks = [
  { id: 1, title: 'Create LinkedIn Company Page', priority: 'high', dueDate: '2026-02-03', status: 'pending' },
  { id: 2, title: 'Get DNS access for reliabilityhq.com', priority: 'high', dueDate: '2026-02-05', status: 'pending' },
  { id: 3, title: 'Review Dr. Marie\'s tool specs', priority: 'medium', dueDate: '2026-02-07', status: 'pending' },
  { id: 4, title: 'Test RCM Wizard and provide feedback', priority: 'medium', dueDate: '2026-02-10', status: 'pending' },
];

const dailyBriefing = {
  date: '2026-02-02',
  items: [
    {
      category: 'AI News',
      title: 'Claude 3.5 Sonnet benchmarks show improved reasoning',
      summary: 'Latest Claude model shows 15% improvement on technical reasoning tasks, particularly relevant for RCM analysis workflows.',
      source: 'Anthropic Blog',
    },
    {
      category: 'Reliability',
      title: 'SMRP releases updated maintenance metrics guide',
      summary: 'New guide includes AI-assisted maintenance planning metrics. Opportunity to align our tools with industry standards.',
      source: 'SMRP',
    },
    {
      category: 'Market',
      title: 'Reliability software market growing 12% annually',
      summary: 'Analysts project $8B market by 2028. AI-powered tools seeing fastest adoption in process industries.',
      source: 'Gartner',
    },
  ],
};

const typeColors: Record<string, string> = {
  course: 'bg-purple-100 text-purple-800',
  tool: 'bg-blue-100 text-blue-800',
  article: 'bg-green-100 text-green-800',
  feature: 'bg-amber-100 text-amber-800',
  data: 'bg-cyan-100 text-cyan-800',
  spec: 'bg-pink-100 text-pink-800',
  dev: 'bg-indigo-100 text-indigo-800',
  infra: 'bg-gray-100 text-gray-800',
  marketing: 'bg-orange-100 text-orange-800',
  content: 'bg-emerald-100 text-emerald-800',
  design: 'bg-rose-100 text-rose-800',
};

const priorityColors: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  low: 'border-l-green-500',
};

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [agentStatuses, setAgentStatuses] = useState(agents);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate agent status changes
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setAgentStatuses(prev => prev.map(agent => ({
        ...agent,
        status: agent.id === 'dr-marie' ? 'working' : 
                agent.id === 'villanelle' ? 'working' :
                Math.random() > 0.7 ? 'working' : 'resting'
      })));
    }, 5000);
    return () => clearInterval(statusTimer);
  }, []);

  const getStatusAnimation = (status: string) => {
    switch (status) {
      case 'working':
        return 'animate-bounce';
      case 'resting':
        return 'animate-pulse opacity-60';
      case 'error':
        return 'animate-ping text-red-500';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'working':
        return { text: 'Working', color: 'bg-green-500' };
      case 'resting':
        return { text: 'Resting', color: 'bg-gray-400' };
      case 'error':
        return { text: 'Error', color: 'bg-red-500' };
      default:
        return { text: 'Unknown', color: 'bg-gray-300' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Agent Sidebar */}
      <div className="w-20 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-6 gap-6">
        <div className="text-xs text-slate-400 font-medium mb-2">TEAM</div>
        {agentStatuses.map((agent) => {
          const statusInfo = getStatusLabel(agent.status);
          return (
            <div
              key={agent.id}
              className="relative group cursor-pointer"
              title={`${agent.name} - ${agent.role}`}
            >
              <div className={`text-3xl ${getStatusAnimation(agent.status)}`}>
                {agent.emoji}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusInfo.color} border-2 border-slate-800`} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-700 rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                <div className="font-semibold">{agent.name}</div>
                <div className="text-xs text-slate-400">{agent.role}</div>
                <div className="text-xs text-slate-300 mt-1">{agent.description}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                  <span className="text-xs">{statusInfo.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="flex-1" />
        
        <Link href="/" className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Reliability HQ Command Center</h1>
              <p className="text-slate-400 text-sm">
                {currentTime.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                {' • '}
                {currentTime.toLocaleTimeString('en-GB')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-400">Signed in as</div>
                <div className="font-medium">Pam</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-deep-teal flex items-center justify-center font-bold">
                P
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-3xl font-bold text-green-400">5</div>
              <div className="text-sm text-slate-400">Articles Published</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400">6</div>
              <div className="text-sm text-slate-400">AI Tools Live</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400">2</div>
              <div className="text-sm text-slate-400">Courses Available</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-3xl font-bold text-amber-400">250+</div>
              <div className="text-sm text-slate-400">Failure Modes in DB</div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Completed Column */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-green-500/20 px-4 py-3 border-b border-slate-700">
                <h2 className="font-semibold text-green-400 flex items-center gap-2">
                  <span>✅</span> Completed ({completedItems.length})
                </h2>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {completedItems.map((item) => (
                  <div key={item.id} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm">{item.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-amber-500/20 px-4 py-3 border-b border-slate-700">
                <h2 className="font-semibold text-amber-400 flex items-center gap-2">
                  <span>🔄</span> In Progress ({inProgressItems.length})
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {inProgressItems.map((item) => {
                  const agent = agentStatuses.find(a => a.id === item.agent);
                  return (
                    <div key={item.id} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-sm">{item.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {agent && (
                          <span className="text-lg" title={agent.name}>{agent.emoji}</span>
                        )}
                        <div className="flex-1 bg-slate-600 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{item.progress}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline Column */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-blue-500/20 px-4 py-3 border-b border-slate-700">
                <h2 className="font-semibold text-blue-400 flex items-center gap-2">
                  <span>📋</span> Pipeline ({pipelineItems.length})
                </h2>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {pipelineItems.map((item) => (
                  <div key={item.id} className={`bg-slate-700/50 rounded-lg p-3 border-l-4 ${priorityColors[item.priority]}`}>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm">{item.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Pam's Tasks */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-purple-500/20 px-4 py-3 border-b border-slate-700">
                <h2 className="font-semibold text-purple-400 flex items-center gap-2">
                  <span>📌</span> Your Tasks
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {pamsTasks.map((task) => (
                  <div key={task.id} className={`bg-slate-700/50 rounded-lg p-3 border-l-4 ${priorityColors[task.priority]}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-500 bg-slate-600 text-purple-500 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm">{task.title}</div>
                        <div className="text-xs text-slate-400">Due: {task.dueDate}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Briefing */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-cyan-500/20 px-4 py-3 border-b border-slate-700">
                <h2 className="font-semibold text-cyan-400 flex items-center gap-2">
                  <span>📰</span> Daily Briefing — {dailyBriefing.date}
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {dailyBriefing.items.map((item, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.category === 'AI News' ? 'bg-blue-500/20 text-blue-400' :
                        item.category === 'Reliability' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500">{item.source}</span>
                    </div>
                    <div className="font-medium text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-700">
              <h2 className="font-semibold text-slate-300 flex items-center gap-2">
                <span>⚡</span> Today&apos;s Activity
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {[
                  { time: '18:17', agent: '🗡️', text: 'Building command center dashboard' },
                  { time: '18:12', agent: '🔬', text: 'Completed Component 4 spec (Consequences)' },
                  { time: '18:08', agent: '📝', text: 'Published: AI Failure Mode Libraries article' },
                  { time: '18:02', agent: '📝', text: 'Published: 5 Pump Failure Modes article' },
                  { time: '17:55', agent: '🔬', text: 'Completed Component 3 spec (Failure Modes)' },
                  { time: '17:50', agent: '📝', text: 'Published: Function Statements article' },
                  { time: '17:43', agent: '🗡️', text: 'Renamed Sam to Eve Polastri' },
                  { time: '17:40', agent: '📝', text: 'Published: Run-to-Failure article' },
                  { time: '17:35', agent: '📝', text: 'Published: ChatGPT vs Claude article' },
                  { time: '17:00', agent: '🔬', text: 'Completed RCM Tool Vision document (38KB)' },
                  { time: '16:55', agent: '🔬', text: 'Expanded equipment database (+250 failure modes)' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 font-mono w-12">{activity.time}</span>
                    <span className="text-lg">{activity.agent}</span>
                    <span className="text-slate-300">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
