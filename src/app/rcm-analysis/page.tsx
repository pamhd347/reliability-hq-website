'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface AnalysisSummary {
  id: string;
  name: string;
  systemName: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'APPROVED' | 'ARCHIVED';
  progress: number;
  lastUpdated: string;
  teamLead: string;
}

// Mock data for demonstration
const mockAnalyses: AnalysisSummary[] = [
  {
    id: '1',
    name: 'Cooling Water System RCM',
    systemName: 'CWS-001',
    status: 'IN_PROGRESS',
    progress: 45,
    lastUpdated: '2026-02-01',
    teamLead: 'John Smith',
  },
  {
    id: '2',
    name: 'Main Feed Pump Analysis',
    systemName: 'P-101A/B',
    status: 'PENDING_REVIEW',
    progress: 100,
    lastUpdated: '2026-01-28',
    teamLead: 'Sarah Johnson',
  },
  {
    id: '3',
    name: 'HVAC System Optimization',
    systemName: 'HVAC-BLDG1',
    status: 'DRAFT',
    progress: 10,
    lastUpdated: '2026-02-02',
    teamLead: 'Mike Chen',
  },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
  IN_PROGRESS: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
  PENDING_REVIEW: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending Review' },
  APPROVED: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
  ARCHIVED: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Archived' },
};

export default function RCMAnalysisPage() {
  const { user, loading } = useAuth();
  const [analyses, setAnalyses] = useState<AnalysisSummary[]>(mockAnalyses);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesFilter = filter === 'all' || analysis.status === filter;
    const matchesSearch = 
      analysis.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.systemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-deep-teal">
                Reliability HQ
              </Link>
              <span className="text-gray-300">/</span>
              <h1 className="text-lg font-semibold text-gray-900">RCM Analysis</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              ) : (
                <Link 
                  href="/login" 
                  className="text-sm text-deep-teal hover:underline"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">RCM Analyses</h2>
            <p className="text-gray-600 mt-1">
              Manage your Reliability Centred Maintenance analyses
            </p>
          </div>
          <Link
            href="/rcm-analysis/new"
            className="inline-flex items-center gap-2 bg-deep-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-deep-teal/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Analysis
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search analyses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
              >
                <option value="all">All</option>
                <option value="DRAFT">Draft</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="APPROVED">Approved</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Analyses List */}
        {filteredAnalyses.length > 0 ? (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => {
              const status = statusColors[analysis.status];
              return (
                <Link
                  key={analysis.id}
                  href={`/rcm-analysis/${analysis.id}`}
                  className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-deep-teal/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {analysis.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {analysis.systemName}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          {analysis.teamLead}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {analysis.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Progress Bar */}
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{analysis.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-deep-teal rounded-full transition-all"
                            style={{ width: `${analysis.progress}%` }}
                          />
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first RCM analysis'}
            </p>
            <Link
              href="/rcm-analysis/new"
              className="inline-flex items-center gap-2 bg-deep-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-deep-teal/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create New Analysis
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{analyses.length}</div>
            <div className="text-sm text-gray-500">Total Analyses</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">
              {analyses.filter(a => a.status === 'IN_PROGRESS').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-amber-600">
              {analyses.filter(a => a.status === 'PENDING_REVIEW').length}
            </div>
            <div className="text-sm text-gray-500">Pending Review</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">
              {analyses.filter(a => a.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-gray-500">Approved</div>
          </div>
        </div>

        {/* JA1011 Compliance Note */}
        <div className="mt-8 bg-deep-teal/5 border border-deep-teal/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-deep-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">SAE JA1011 Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">
                All analyses follow the SAE JA1011 standard for Reliability Centred Maintenance. 
                Each component includes quality gates to ensure compliance before progression.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
