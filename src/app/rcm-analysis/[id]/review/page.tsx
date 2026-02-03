'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getAnalysis,
  updateAnalysis,
  getFailureModes,
  getFunctionalFailuresForAnalysis,
  getConsequenceClassifications,
  getTasksForAnalysis,
  listAuditLog,
  getApprovals,
  upsertApproval,
  getMocTriggers,
  createMocTrigger,
  resolveMocTrigger,
} from '@/lib/rcm-api';

type ApprovalRole = 'FACILITATOR' | 'OPERATIONS' | 'MAINTENANCE' | 'ENGINEERING';
const REQUIRED_ROLES: ApprovalRole[] = ['FACILITATOR', 'OPERATIONS', 'MAINTENANCE', 'ENGINEERING'];

type ApprovalRow = {
  role: string;
  approved_at: string | null;
  user_id: string | null;
  signature_text: string | null;
};

type MocRow = {
  id: string;
  trigger_type: string;
  description: string | null;
  triggered_at: string;
  resolved_at: string | null;
  resolution_notes: string | null;
};

type AuditRow = {
  id: string;
  timestamp: string;
  user_id: string | null;
  action: string;
  component: string;
  table_name: string;
  record_id: string | null;
  old_row: any;
  new_row: any;
  details: any;
};

function fmtDate(iso?: string | null) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function downloadText(filename: string, text: string, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows: Array<Record<string, any>>) {
  if (rows.length === 0) return '';

  const headerSet = new Set<string>();
  for (const r of rows) {
    Object.keys(r).forEach((k) => headerSet.add(k));
  }
  const headers = Array.from(headerSet);

  const escape = (v: any) => {
    const str = v === null || v === undefined ? '' : String(v);
    if (str.includes(',') || str.includes('\n') || str.includes('"')) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };

  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push(headers.map((h) => escape(r[h])).join(','));
  }
  return lines.join('\n');
}

export default function ReviewPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const analysisId = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [analysis, setAnalysis] = useState<Record<string, any> | null>(null);
  const [approvals, setApprovals] = useState<ApprovalRow[]>([]);
  const [moc, setMoc] = useState<MocRow[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);

  const [statusSaving, setStatusSaving] = useState(false);

  const [newTriggerType, setNewTriggerType] = useState('EQUIPMENT_MODIFICATION');
  const [newTriggerDesc, setNewTriggerDesc] = useState('');

  const [auditDetailId, setAuditDetailId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await getAnalysis(analysisId);
        if (cancelled) return;
        setAnalysis(res.analysis as any);

        if (user) {
          const [ap, mocRows, auditRows] = await Promise.all([
            getApprovals(analysisId),
            getMocTriggers(analysisId),
            listAuditLog(analysisId, 200),
          ]);
          if (cancelled) return;

          setApprovals(
            (ap ?? []).map((r: any) => ({
              role: r.role as string,
              approved_at: (r.approved_at as string | null) ?? null,
              user_id: (r.user_id as string | null) ?? null,
              signature_text: (r.signature_text as string | null) ?? null,
            }))
          );

          setMoc(
            (mocRows ?? []).map((r: any) => ({
              id: r.id as string,
              trigger_type: (r.trigger_type as string) ?? 'OTHER',
              description: (r.description as string | null) ?? null,
              triggered_at: (r.triggered_at as string) ?? new Date().toISOString(),
              resolved_at: (r.resolved_at as string | null) ?? null,
              resolution_notes: (r.resolution_notes as string | null) ?? null,
            }))
          );

          setAudit(
            (auditRows ?? []).map((r: any) => ({
              id: r.id as string,
              timestamp: (r.timestamp as string) ?? new Date().toISOString(),
              user_id: (r.user_id as string | null) ?? null,
              action: (r.action as string) ?? 'UPDATE',
              component: (r.component as string) ?? '',
              table_name: (r.table_name as string) ?? '',
              record_id: (r.record_id as string | null) ?? null,
              old_row: r.old_row,
              new_row: r.new_row,
              details: r.details,
            }))
          );
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load review data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [analysisId, user]);

  const approvalsByRole = useMemo(() => {
    const map = new Map<string, ApprovalRow>();
    approvals.forEach((a) => map.set(a.role, a));
    return map;
  }, [approvals]);

  const allRequiredApproved = useMemo(() => {
    return REQUIRED_ROLES.every((r) => approvalsByRole.get(r)?.approved_at);
  }, [approvalsByRole]);

  const openMoc = useMemo(() => moc.filter((m) => !m.resolved_at), [moc]);

  const lastReviewDate = useMemo(() => {
    const approved = approvals
      .filter((a) => a.approved_at)
      .map((a) => a.approved_at as string)
      .sort();
    return approved.length > 0 ? approved[approved.length - 1] : null;
  }, [approvals]);

  const nextReviewDue = useMemo(() => {
    // Placeholder rule: 12 months from last approval; can be made configurable.
    if (!lastReviewDate) return null;
    const d = new Date(lastReviewDate);
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString();
  }, [lastReviewDate]);

  const setStatus = async (status: string) => {
    if (!user) return;
    if (!analysis) return;

    if (status === 'ACTIVE' && !allRequiredApproved) {
      setError('Cannot set status to ACTIVE until all required sign-offs are complete.');
      return;
    }

    try {
      setStatusSaving(true);
      setError(null);

      const updated = await updateAnalysis(analysisId, { status });
      setAnalysis(updated as any);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to update status');
    } finally {
      setStatusSaving(false);
    }
  };

  const toggleApproval = async (role: ApprovalRole, approved: boolean) => {
    if (!user) return;
    try {
      setError(null);
      const signatureText = `${user.email ?? 'user'} — ${role}`;
      const saved = await upsertApproval({ analysisId, role, approved, signatureText });
      const row: ApprovalRow = {
        role: saved['role'] as string,
        approved_at: (saved['approved_at'] as string | null) ?? null,
        user_id: (saved['user_id'] as string | null) ?? null,
        signature_text: (saved['signature_text'] as string | null) ?? null,
      };
      setApprovals((prev) => {
        const next = prev.filter((a) => a.role !== role);
        return [...next, row];
      });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to update approval');
    }
  };

  const addMoc = async () => {
    if (!user) return;
    try {
      setError(null);
      const saved = await createMocTrigger({ analysisId, triggerType: newTriggerType, description: newTriggerDesc });
      const row: MocRow = {
        id: saved['id'] as string,
        trigger_type: (saved['trigger_type'] as string) ?? newTriggerType,
        description: (saved['description'] as string | null) ?? null,
        triggered_at: (saved['triggered_at'] as string) ?? new Date().toISOString(),
        resolved_at: (saved['resolved_at'] as string | null) ?? null,
        resolution_notes: (saved['resolution_notes'] as string | null) ?? null,
      };
      setMoc((prev) => [row, ...prev]);
      setNewTriggerDesc('');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create MOC trigger');
    }
  };

  const resolve = async (id: string, resolved: boolean, notes?: string) => {
    if (!user) return;
    try {
      const saved = await resolveMocTrigger({ id, resolved, resolutionNotes: notes });
      setMoc((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                resolved_at: (saved['resolved_at'] as string | null) ?? null,
                resolution_notes: (saved['resolution_notes'] as string | null) ?? null,
              }
            : m
        )
      );
    } catch (e: any) {
      setError(e?.message ?? 'Failed to update MOC trigger');
    }
  };

  const exportFmeaCsv = async () => {
    if (!user) return;
    try {
      setError(null);
      const [ff, modes, cons, tasks] = await Promise.all([
        getFunctionalFailuresForAnalysis(analysisId),
        getFailureModes(analysisId),
        getConsequenceClassifications(analysisId),
        getTasksForAnalysis(analysisId),
      ]);

      const ffById = new Map<string, any>();
      (ff ?? []).forEach((r: any) => ffById.set(r.id as string, r));

      const consByMode = new Map<string, any>();
      (cons ?? []).forEach((c: any) => consByMode.set(c.failure_mode_id as string, c));

      const taskByMode = new Map<string, any>();
      (tasks ?? []).forEach((t: any) => taskByMode.set(t.failure_mode_id as string, t));

      const rows = (modes ?? []).map((m: any) => {
        const ffRow = ffById.get(m.functional_failure_id as string);
        const fn = ffRow?.rcm_functions;
        const c = consByMode.get(m.id as string);
        const t = taskByMode.get(m.id as string);

        return {
          function_number: fn?.function_number ?? '',
          functional_failure_letter: ffRow?.failure_letter ?? '',
          functional_failure: ffRow?.description ?? '',
          mode_number: m.mode_number ?? '',
          failure_mode: m.description ?? '',
          local_effect: m.local_effect ?? '',
          system_effect: m.system_effect ?? '',
          end_effect: m.end_effect ?? '',
          consequence_type: c?.consequence_type ?? '',
          task_type: t?.task_type ?? '',
          task_description: t?.description ?? '',
          interval: t?.interval ?? '',
          interval_unit: t?.interval_unit ?? '',
          justification: t?.justification ?? '',
        };
      });

      const csv = toCsv(rows);
      downloadText(`rcm-fmea-${analysisId}.csv`, csv, 'text/csv');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to export CSV');
    }
  };

  const exportTasksCsv = async () => {
    if (!user) return;
    try {
      setError(null);
      const taskRows = await getTasksForAnalysis(analysisId);
      const rows = (taskRows ?? []).map((t: any) => ({
        failure_mode_id: t.failure_mode_id,
        task_type: t.task_type,
        description: t.description,
        interval: t.interval,
        interval_unit: t.interval_unit,
        assigned_to: t.assigned_to,
        cost_estimate: t.cost_estimate,
      }));
      downloadText(`rcm-tasks-${analysisId}.csv`, toCsv(rows), 'text/csv');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to export tasks CSV');
    }
  };

  const exportAuditJson = () => {
    if (!user) return;
    downloadText(`rcm-audit-${analysisId}.json`, JSON.stringify(audit, null, 2), 'application/json');
  };

  const openAudit = useMemo(() => audit.find((a) => a.id === auditDetailId) ?? null, [audit, auditDetailId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-teal" />
      </div>
    );
  }

  const analysisName = (analysis?.name as string | undefined) ?? 'RCM Analysis';
  const systemTag = (analysis?.system_tag as string | undefined) ?? (analysis?.system_name as string | undefined) ?? '';
  const status = (analysis?.status as string | undefined) ?? 'DRAFT';

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
              <Link href={`/rcm-analysis/${analysisId}`} className="text-gray-600 hover:text-gray-900">
                {analysisName}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Review & Approval</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/rcm-analysis/${analysisId}/tasks`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Back to Tasks
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-navy text-white px-3 py-2 text-sm font-medium hover:opacity-90"
              >
                Print / PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Component 6 — Review & Living Program</h1>
          <p className="text-gray-600 mt-1">Audit trail, approvals, management of change triggers, and reporting exports.</p>
          {systemTag && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <span className="font-mono">{systemTag}</span>
            </div>
          )}
        </div>

        {!user && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            You are not signed in. Sign in to manage approvals, status, MOC triggers, and view audit log.
          </div>
        )}

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card title="Analysis status">
            <div className="text-sm text-gray-700">Current: <span className="font-semibold text-gray-900">{status}</span></div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Update status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!user || statusSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal disabled:opacity-50"
              >
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="APPROVED">Approved</option>
                <option value="ACTIVE">Active</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              {!allRequiredApproved && (
                <div className="mt-2 text-xs text-gray-500">Active is blocked until all required sign-offs are complete.</div>
              )}
            </div>
          </Card>

          <Card title="Review health">
            <div className="text-sm text-gray-700">Last review: <span className="font-semibold text-gray-900">{fmtDate(lastReviewDate)}</span></div>
            <div className="mt-2 text-sm text-gray-700">Next review due: <span className="font-semibold text-gray-900">{fmtDate(nextReviewDue)}</span></div>
          </Card>

          <Card title="Management of Change">
            <div className="text-sm text-gray-700">Open MOC items: <span className="font-semibold text-gray-900">{openMoc.length}</span></div>
            <div className="mt-2 text-xs text-gray-500">Any open MOC should prompt a review/revision.</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Approvals */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="text-sm font-semibold text-slate-navy">Team sign-off checklist</div>
              <div className="text-xs text-gray-500 mt-1">Electronic signature stored with timestamp and user.</div>
            </div>
            <div className="p-6 space-y-3">
              {REQUIRED_ROLES.map((role) => {
                const row = approvalsByRole.get(role);
                const approved = !!row?.approved_at;
                return (
                  <div key={role} className="rounded-lg border border-gray-200 p-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{role}</div>
                      <div className="text-xs text-gray-500 mt-1">{approved ? `Signed at ${fmtDate(row?.approved_at)}` : 'Pending'}</div>
                      {row?.signature_text && <div className="text-xs text-gray-500 mt-1">Signature: {row.signature_text}</div>}
                    </div>
                    <button
                      disabled={!user}
                      onClick={() => toggleApproval(role, !approved)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium border ${
                        approved
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          : 'bg-deep-teal text-white border-deep-teal hover:bg-deep-teal/90'
                      } disabled:opacity-50`}
                    >
                      {approved ? 'Revoke' : 'Sign'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOC */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="text-sm font-semibold text-slate-navy">MOC triggers</div>
              <div className="text-xs text-gray-500 mt-1">Log triggers that require review or revision of the RCM program.</div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Trigger type</label>
                  <select
                    value={newTriggerType}
                    onChange={(e) => setNewTriggerType(e.target.value)}
                    disabled={!user}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal disabled:opacity-50"
                  >
                    <option value="EQUIPMENT_MODIFICATION">Equipment modification</option>
                    <option value="OPERATING_CONTEXT_CHANGE">Operating context change</option>
                    <option value="NEW_FAILURE_MODE">New failure mode discovered</option>
                    <option value="REGULATORY_CHANGE">Regulatory change</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <input
                    value={newTriggerDesc}
                    onChange={(e) => setNewTriggerDesc(e.target.value)}
                    disabled={!user}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal disabled:opacity-50"
                    placeholder="What changed and why does it trigger review?"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  disabled={!user}
                  onClick={addMoc}
                  className="rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90 disabled:opacity-50"
                >
                  Add trigger
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {moc.length === 0 ? (
                  <div className="text-sm text-gray-500">No MOC triggers logged yet.</div>
                ) : (
                  moc.map((m) => (
                    <div key={m.id} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{m.trigger_type}</div>
                          <div className="text-xs text-gray-500 mt-1">Triggered: {fmtDate(m.triggered_at)}</div>
                          {m.description && <div className="text-sm text-gray-700 mt-2">{m.description}</div>}
                          {m.resolved_at && (
                            <div className="text-xs text-gray-500 mt-2">Resolved: {fmtDate(m.resolved_at)} — {m.resolution_notes ?? ''}</div>
                          )}
                        </div>
                        <div className="shrink-0">
                          {m.resolved_at ? (
                            <button
                              disabled={!user}
                              onClick={() => resolve(m.id, false)}
                              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                              Reopen
                            </button>
                          ) : (
                            <button
                              disabled={!user}
                              onClick={() => {
                                const notes = window.prompt('Resolution notes (optional):', '') ?? '';
                                resolve(m.id, true, notes);
                              }}
                              className="rounded-lg bg-slate-navy text-white px-3 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Exports */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="text-sm font-semibold text-slate-navy">Export / Reporting</div>
              <div className="text-xs text-gray-500 mt-1">CSV exports for worksheets and CMMS imports.</div>
            </div>
            <div className="p-6 space-y-3">
              <button
                disabled={!user}
                onClick={exportFmeaCsv}
                className="w-full rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90 disabled:opacity-50"
              >
                Export full FMEA worksheet (CSV)
              </button>
              <button
                disabled={!user}
                onClick={exportTasksCsv}
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Export task list for CMMS import (CSV)
              </button>
              <button
                disabled={!user}
                onClick={exportAuditJson}
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Export audit trail (JSON)
              </button>
              <div className="text-xs text-gray-500">PDF export: use Print / PDF in the top-right.</div>
            </div>
          </div>

          {/* Audit */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="text-sm font-semibold text-slate-navy">Audit trail</div>
              <div className="text-xs text-gray-500 mt-1">Auto-logged changes across components (database triggers).</div>
            </div>
            <div className="p-6">
              {audit.length === 0 ? (
                <div className="text-sm text-gray-500">No audit entries found yet.</div>
              ) : (
                <div className="space-y-2 max-h-[520px] overflow-auto">
                  {audit.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAuditDetailId(a.id)}
                      className="w-full text-left rounded-lg border border-gray-200 p-3 hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">{fmtDate(a.timestamp)}</div>
                          <div className="text-sm font-semibold text-gray-900">{a.action} — {a.table_name}</div>
                          <div className="text-xs text-gray-500 mt-1">component: {a.component}</div>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{a.action}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audit detail modal */}
        {openAudit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <div className="text-base font-semibold text-gray-900">Audit entry</div>
                  <div className="text-sm text-gray-600 mt-0.5">
                    {openAudit.action} on {openAudit.table_name} — {fmtDate(openAudit.timestamp)}
                  </div>
                </div>
                <button onClick={() => setAuditDetailId(null)} className="text-sm text-gray-600 hover:text-gray-900">
                  Close
                </button>
              </div>

              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-navy">Old value</div>
                  <pre className="mt-2 text-xs bg-slate-50 border border-gray-200 rounded-lg p-3 overflow-auto max-h-[420px]">
                    {JSON.stringify(openAudit.old_row, null, 2)}
                  </pre>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-navy">New value</div>
                  <pre className="mt-2 text-xs bg-slate-50 border border-gray-200 rounded-lg p-3 overflow-auto max-h-[420px]">
                    {JSON.stringify(openAudit.new_row, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    downloadText(`audit-${openAudit.id}.json`, JSON.stringify(openAudit, null, 2), 'application/json');
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Download entry
                </button>
                <button
                  onClick={() => setAuditDetailId(null)}
                  className="rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="text-sm font-semibold text-slate-navy">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
