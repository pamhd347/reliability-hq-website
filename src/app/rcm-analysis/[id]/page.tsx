'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getAnalysis, getApprovals, getConsequenceClassifications, getFailureModes, getTasksForAnalysis } from '@/lib/rcm-api';

export default function AnalysisOverviewPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);

  const [modeCount, setModeCount] = useState(0);
  const [classifiedCount, setClassifiedCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [approvalCount, setApprovalCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await getAnalysis(id);
        if (cancelled) return;
        setAnalysis(res.analysis);

        if (user) {
          const [modes, cons, tasks, approvals] = await Promise.all([
            getFailureModes(id),
            getConsequenceClassifications(id),
            getTasksForAnalysis(id),
            getApprovals(id),
          ]);
          if (cancelled) return;

          setModeCount((modes ?? []).length);
          setClassifiedCount((cons ?? []).length);
          setTaskCount((tasks ?? []).length);
          setApprovalCount((approvals ?? []).filter((a: any) => !!a.approved_at).length);
        }
      } catch (e: unknown) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : 'Failed to load analysis';
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [id, user]);

  const component3Complete = modeCount > 0;
  const component4Complete = modeCount > 0 && classifiedCount >= modeCount;
  const component5Complete = modeCount > 0 && taskCount >= modeCount;
  const component6Complete = approvalCount >= 4;

  const progress = useMemo(() => {
    const total = 4;
    const done = [component3Complete, component4Complete, component5Complete, component6Complete].filter(Boolean).length;
    return { done, total };
  }, [component3Complete, component4Complete, component5Complete, component6Complete]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-teal" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-deep-teal">
                Reliability HQ
              </Link>
              <span className="text-gray-300">/</span>
              <Link href="/rcm-analysis" className="text-gray-600 hover:text-gray-900">
                RCM Analysis
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{(analysis?.['name'] as string | undefined) ?? 'Analysis'}</span>
            </div>
            <Link
              href={`/rcm-analysis/${id}/functions`}
              className="inline-flex items-center gap-2 rounded-lg bg-deep-teal px-3 py-2 text-sm font-medium text-white hover:bg-deep-teal/90"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M3 12h16.5" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">{(analysis?.['name'] as string | undefined) ?? 'RCM Analysis'}</h1>
          <p className="text-gray-600 mt-1">
            System:{' '}
            <span className="font-mono">
              {(analysis?.['system_tag'] as string | undefined) ?? (analysis?.['system_name'] as string | undefined) ?? '—'}
            </span>
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Progress: <span className="font-semibold text-gray-900">{progress.done}/{progress.total}</span> components complete
            </div>
            {user ? (
              <div className="text-xs text-gray-500">Based on saved data (failure modes, classifications, tasks, approvals).</div>
            ) : (
              <div className="text-xs text-gray-500">Sign in to see completion tracking.</div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/rcm-analysis/${id}/functions`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-deep-teal/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-navy">Component 2</div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">In progress</span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Functions & Functional Failures</div>
              <div className="text-sm text-gray-600 mt-2">Define what the system must do and what constitutes failure.</div>
            </Link>

            <Link
              href={`/rcm-analysis/${id}/failure-modes`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-deep-teal/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-navy">Component 3</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs border ${
                    component3Complete ? 'bg-green-50 text-green-800 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {user ? (component3Complete ? `Complete (${modeCount})` : `Not complete (${modeCount})`) : '—'}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Failure Modes, Causes & Effects</div>
              <div className="text-sm text-gray-600 mt-2">Capture HOW failures occur, WHY they occur, and their effects.</div>
            </Link>

            <Link
              href={`/rcm-analysis/${id}/consequences`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-deep-teal/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-navy">Component 4</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs border ${
                    component4Complete ? 'bg-green-50 text-green-800 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {user ? (component4Complete ? 'Complete' : `${classifiedCount}/${modeCount}`) : '—'}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Consequence Classification</div>
              <div className="text-sm text-gray-600 mt-2">Classify each failure mode consequence using a JA1011 decision tree.</div>
            </Link>

            <Link
              href={`/rcm-analysis/${id}/tasks`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-deep-teal/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-navy">Component 5</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs border ${
                    component5Complete ? 'bg-green-50 text-green-800 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {user ? (component5Complete ? 'Complete' : `${taskCount}/${modeCount}`) : '—'}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Task Selection</div>
              <div className="text-sm text-gray-600 mt-2">Assess feasibility and select scheduled tasks (or redesign) per JA1011.</div>
            </Link>

            <Link
              href={`/rcm-analysis/${id}/review`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-deep-teal/50 hover:shadow-md transition-all sm:col-span-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-navy">Component 6</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs border ${
                    component6Complete ? 'bg-green-50 text-green-800 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {user ? (component6Complete ? 'Ready to activate' : `${approvalCount}/4 approvals`) : '—'}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Review & Approval</div>
              <div className="text-sm text-gray-600 mt-2">Audit trail, approvals, management of change triggers, and exports.</div>
            </Link>

            <div className="block rounded-xl border border-gray-200 p-5 bg-slate-50 sm:col-span-2">
              <div className="text-sm font-semibold text-slate-navy">Component 1</div>
              <div className="text-lg font-bold text-gray-900 mt-1">Operating Context & Boundaries</div>
              <div className="text-sm text-gray-600 mt-2">Captured during creation (edit tooling to follow).</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
