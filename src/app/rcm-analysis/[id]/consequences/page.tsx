'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getAnalysis,
  getFailureModes,
  getConsequenceClassifications,
  upsertConsequenceClassification,
  type ConsequenceType,
} from '@/lib/rcm-api';

type FailureModeRow = {
  id: string;
  mode_number: number;
  description: string;
  functional_failure_id: string;
};

type ClassificationRow = {
  id: string;
  failure_mode_id: string;
  is_evident: boolean;
  consequence_type: ConsequenceType;
  classification_path: Record<string, unknown>;
  notes: string | null;
  updated_at: string;
};

type TreeState = {
  isEvident?: boolean;
  // evident path
  evidentSafety?: boolean;
  evidentEnvironmental?: boolean;
  evidentOperational?: boolean;
  // hidden path
  hiddenSafety?: boolean;
  hiddenEnvironmental?: boolean;
  hiddenOperational?: boolean;
};

function consequenceToBadge(type: ConsequenceType | null | undefined) {
  if (!type) return { label: 'Not classified', className: 'bg-gray-100 text-gray-700 border-gray-200' };

  switch (type) {
    case 'SAFETY':
      return { label: 'S', className: 'bg-red-50 text-red-800 border-red-200' };
    case 'ENVIRONMENTAL':
      return { label: 'E', className: 'bg-orange-50 text-orange-800 border-orange-200' };
    case 'OPERATIONAL':
      return { label: 'O', className: 'bg-amber-50 text-amber-900 border-amber-200' };
    case 'ECONOMIC':
      return { label: 'E-only', className: 'bg-blue-50 text-blue-800 border-blue-200' };
    case 'HIDDEN_SAFETY':
      return { label: 'H-S', className: 'bg-purple-50 text-purple-800 border-purple-200' };
    case 'HIDDEN_ENVIRONMENTAL':
      return { label: 'H-E', className: 'bg-purple-50 text-purple-800 border-purple-200' };
    case 'HIDDEN_OPERATIONAL':
      return { label: 'H-O', className: 'bg-purple-50 text-purple-800 border-purple-200' };
    case 'HIDDEN_ECONOMIC':
      return { label: 'H-Econ', className: 'bg-purple-50 text-purple-800 border-purple-200' };
  }
}

function deriveConsequence(state: TreeState): ConsequenceType | null {
  if (state.isEvident === undefined) return null;

  if (state.isEvident) {
    if (state.evidentSafety) return 'SAFETY';
    if (state.evidentEnvironmental) return 'ENVIRONMENTAL';
    if (state.evidentOperational) return 'OPERATIONAL';
    // if evident, and none of the above were true, it's economic-only by definition
    return 'ECONOMIC';
  }

  // Hidden failure: evaluate potential multiple-failure consequences
  if (state.hiddenSafety) return 'HIDDEN_SAFETY';
  if (state.hiddenEnvironmental) return 'HIDDEN_ENVIRONMENTAL';
  if (state.hiddenOperational) return 'HIDDEN_OPERATIONAL';
  return 'HIDDEN_ECONOMIC';
}

const HELP = {
  evident:
    'Evident failure: the failure is apparent to operating personnel during normal duties (alarms, obvious performance deviation, visible loss of function).',
  hidden:
    'Hidden failure: the failure is not apparent during normal duties; it may only be discovered by a specific check/test or when a second failure occurs.',
  safety:
    'Safety consequence: could cause injury or death (to employees, contractors, or public), or creates an intolerable safety risk.',
  environmental:
    'Environmental consequence: could breach environmental limits, permit conditions, or cause a reportable release.',
  operational:
    'Operational consequence: affects production capacity, product quality, or customer service (loss of function or degraded function).',
  economic:
    'Economic-only consequence: no safety/environment/operational impact; costs are limited to repair/replacement and associated maintenance resources.',
  hiddenNote:
    'Hidden failures are classified by asking: if this hidden failure occurred AND a second failure happened, would that combination lead to Safety / Environmental / Operational consequences?',
};

export default function ConsequencesPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const analysisId = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [analysisName, setAnalysisName] = useState('');
  const [systemTag, setSystemTag] = useState('');

  const [modes, setModes] = useState<FailureModeRow[]>([]);
  const [classifications, setClassifications] = useState<ClassificationRow[]>([]);

  const [selectedModeId, setSelectedModeId] = useState<string>('');
  const [treeState, setTreeState] = useState<TreeState>({});
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await getAnalysis(analysisId);
        if (cancelled) return;
        setAnalysisName((res.analysis['name'] as string | undefined) ?? 'RCM Analysis');
        setSystemTag(
          (res.analysis['system_tag'] as string | undefined) ?? (res.analysis['system_name'] as string | undefined) ?? ''
        );

        if (user) {
          const [modeRows, classRows] = await Promise.all([
            getFailureModes(analysisId),
            getConsequenceClassifications(analysisId),
          ]);
          if (cancelled) return;

          const mappedModes: FailureModeRow[] = (modeRows ?? []).map((m: any) => ({
            id: m.id as string,
            mode_number: (m.mode_number as number) ?? 1,
            description: (m.description as string) ?? '',
            functional_failure_id: (m.functional_failure_id as string) ?? '',
          }));
          mappedModes.sort((a, b) => a.mode_number - b.mode_number);
          setModes(mappedModes);

          const mappedClass: ClassificationRow[] = (classRows ?? []).map((c: any) => ({
            id: c.id as string,
            failure_mode_id: c.failure_mode_id as string,
            is_evident: (c.is_evident as boolean) ?? true,
            consequence_type: c.consequence_type as ConsequenceType,
            classification_path: (c.classification_path as any) ?? {},
            notes: (c.notes as string | null) ?? null,
            updated_at: (c.updated_at as string) ?? (c.created_at as string) ?? new Date().toISOString(),
          }));
          setClassifications(mappedClass);

          if (mappedModes.length > 0) {
            setSelectedModeId(mappedModes[0].id);
          }
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [analysisId, user]);

  const classificationByMode = useMemo(() => {
    const map = new Map<string, ClassificationRow>();
    classifications.forEach((c) => map.set(c.failure_mode_id, c));
    return map;
  }, [classifications]);

  const selectedMode = useMemo(() => modes.find((m) => m.id === selectedModeId) ?? null, [modes, selectedModeId]);

  useEffect(() => {
    if (!selectedModeId) return;
    const existing = classificationByMode.get(selectedModeId);
    if (!existing) {
      setTreeState({});
      setNotes('');
      return;
    }

    // Rehydrate tree state from stored path when possible
    const p = (existing.classification_path ?? {}) as any;
    const rehydrated: TreeState = {
      isEvident: p.isEvident ?? existing.is_evident,
      evidentSafety: p.evidentSafety,
      evidentEnvironmental: p.evidentEnvironmental,
      evidentOperational: p.evidentOperational,
      hiddenSafety: p.hiddenSafety,
      hiddenEnvironmental: p.hiddenEnvironmental,
      hiddenOperational: p.hiddenOperational,
    };

    setTreeState(rehydrated);
    setNotes(existing.notes ?? '');
  }, [selectedModeId, classificationByMode]);

  const derived = useMemo(() => deriveConsequence(treeState), [treeState]);

  const save = async () => {
    if (!user) return;
    if (!selectedModeId) return;
    const consequenceType = derived;
    if (!consequenceType) {
      setError('Complete the decision tree before saving.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const saved = await upsertConsequenceClassification({
        analysisId,
        failureModeId: selectedModeId,
        isEvident: treeState.isEvident ?? true,
        consequenceType,
        classificationPath: {
          ...treeState,
          isEvident: treeState.isEvident,
          derived: consequenceType,
          updatedAt: new Date().toISOString(),
        },
        notes: notes || null,
      });

      const savedRow: ClassificationRow = {
        id: saved['id'] as string,
        failure_mode_id: saved['failure_mode_id'] as string,
        is_evident: (saved['is_evident'] as boolean) ?? true,
        consequence_type: saved['consequence_type'] as ConsequenceType,
        classification_path: (saved['classification_path'] as any) ?? {},
        notes: (saved['notes'] as string | null) ?? null,
        updated_at: (saved['updated_at'] as string) ?? new Date().toISOString(),
      };

      setClassifications((prev) => {
        const next = prev.filter((c) => c.failure_mode_id !== savedRow.failure_mode_id);
        return [savedRow, ...next];
      });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save classification');
    } finally {
      setSaving(false);
    }
  };

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
              <Link href={`/rcm-analysis/${analysisId}`} className="text-gray-600 hover:text-gray-900">
                {analysisName || 'Analysis'}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Consequence Classification</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/rcm-analysis/${analysisId}/failure-modes`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Back to Failure Modes
              </Link>
              <Link
                href={`/rcm-analysis/${analysisId}/tasks`}
                className="inline-flex items-center gap-2 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
              >
                Next: Task Selection
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M3 12h16.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Component 4 — Consequence Classification (JA1011)</h1>
          <p className="text-gray-600 mt-1">
            Classify each failure mode consequence using a JA1011-compliant decision tree.
          </p>
          {systemTag && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <span className="font-mono">{systemTag}</span>
            </div>
          )}
        </div>

        {!user && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            You are not signed in. Sign in to load failure modes and save consequence classifications.
          </div>
        )}

        {user && modes.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="text-gray-900 font-semibold">No failure modes found</div>
            <div className="text-sm text-gray-600 mt-1">Complete Component 3 first.</div>
            <div className="mt-4">
              <Link
                href={`/rcm-analysis/${analysisId}/failure-modes`}
                className="rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90"
              >
                Go to Failure Modes
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: failure modes list */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-200">
                  <div className="text-sm font-semibold text-slate-navy">Failure modes</div>
                  <div className="text-xs text-gray-500 mt-1">Select a failure mode to classify.</div>
                </div>
                <div className="p-3 max-h-[70vh] overflow-auto">
                  <div className="space-y-2">
                    {modes.map((m) => {
                      const existing = classificationByMode.get(m.id);
                      const badge = consequenceToBadge(existing?.consequence_type);
                      const selected = m.id === selectedModeId;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedModeId(m.id)}
                          className={`w-full text-left rounded-lg border px-3 py-3 hover:border-deep-teal/40 hover:bg-slate-50 transition-all ${
                            selected ? 'border-deep-teal bg-deep-teal/5' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs text-gray-500">
                                <span className="font-mono text-deep-teal font-semibold">FM {m.mode_number}</span>
                              </div>
                              <div className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{m.description || '—'}</div>
                            </div>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Definitions */}
              <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="text-sm font-semibold text-slate-navy">Definitions (JA1011)</div>
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <HelpRow title="Evident vs Hidden" body={`${HELP.evident} ${HELP.hidden}`} />
                  <HelpRow title="Safety" body={HELP.safety} />
                  <HelpRow title="Environmental" body={HELP.environmental} />
                  <HelpRow title="Operational" body={HELP.operational} />
                  <HelpRow title="Economic-only" body={HELP.economic} />
                </div>
              </div>
            </div>

            {/* Right: decision tree */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-navy">Interactive decision tree</div>
                      <div className="mt-1 text-sm text-gray-600">
                        {selectedMode ? (
                          <>
                            Classifying: <span className="font-mono text-deep-teal font-semibold">FM {selectedMode.mode_number}</span>{' '}
                            <span className="text-gray-900 font-medium">{selectedMode.description || '—'}</span>
                          </>
                        ) : (
                          'Select a failure mode to begin.'
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="text-xs text-gray-500">Result</div>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${
                            consequenceToBadge(derived).className
                          }`}
                        >
                          {consequenceToBadge(derived).label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {!selectedMode ? (
                    <div className="text-sm text-gray-600">Select a failure mode from the left to classify.</div>
                  ) : (
                    <div className="space-y-6">
                      <TreeNode
                        step="1"
                        title="Is the failure evident to operators during normal duties?"
                        help={HELP.evident}
                        value={treeState.isEvident}
                        onYes={() =>
                          setTreeState({
                            isEvident: true,
                            evidentSafety: undefined,
                            evidentEnvironmental: undefined,
                            evidentOperational: undefined,
                          })
                        }
                        onNo={() =>
                          setTreeState({
                            isEvident: false,
                            hiddenSafety: undefined,
                            hiddenEnvironmental: undefined,
                            hiddenOperational: undefined,
                          })
                        }
                      />

                      {treeState.isEvident === true && (
                        <div className="space-y-4">
                          <div className="text-sm text-gray-600">For evident failures, classify in order and stop at the first “YES”.</div>

                          <TreeNode
                            step="2a"
                            title="Does it have safety consequences?"
                            help={HELP.safety}
                            value={treeState.evidentSafety}
                            onYes={() =>
                              setTreeState((s) => ({
                                ...s,
                                evidentSafety: true,
                                evidentEnvironmental: false,
                                evidentOperational: false,
                              }))
                            }
                            onNo={() => setTreeState((s) => ({ ...s, evidentSafety: false }))}
                          />

                          {treeState.evidentSafety === false && (
                            <TreeNode
                              step="2b"
                              title="Does it have environmental consequences?"
                              help={HELP.environmental}
                              value={treeState.evidentEnvironmental}
                              onYes={() =>
                                setTreeState((s) => ({
                                  ...s,
                                  evidentEnvironmental: true,
                                  evidentOperational: false,
                                }))
                              }
                              onNo={() => setTreeState((s) => ({ ...s, evidentEnvironmental: false }))}
                            />
                          )}

                          {treeState.evidentSafety === false && treeState.evidentEnvironmental === false && (
                            <TreeNode
                              step="2c"
                              title="Does it have operational consequences?"
                              help={HELP.operational}
                              value={treeState.evidentOperational}
                              onYes={() => setTreeState((s) => ({ ...s, evidentOperational: true }))}
                              onNo={() => setTreeState((s) => ({ ...s, evidentOperational: false }))}
                            />
                          )}

                          {treeState.evidentSafety === false &&
                            treeState.evidentEnvironmental === false &&
                            treeState.evidentOperational === false && (
                              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                                <div className="font-semibold">Economic-only</div>
                                <div className="mt-1">No safety, environmental, or operational consequences identified. ({HELP.economic})</div>
                              </div>
                            )}
                        </div>
                      )}

                      {treeState.isEvident === false && (
                        <div className="space-y-4">
                          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900">
                            <div className="font-semibold">Hidden failure classification</div>
                            <div className="mt-1">{HELP.hiddenNote}</div>
                          </div>

                          <TreeNode
                            step="H-a"
                            title="In a multiple failure scenario, could this lead to safety consequences?"
                            help={HELP.safety}
                            value={treeState.hiddenSafety}
                            onYes={() =>
                              setTreeState((s) => ({
                                ...s,
                                hiddenSafety: true,
                                hiddenEnvironmental: false,
                                hiddenOperational: false,
                              }))
                            }
                            onNo={() => setTreeState((s) => ({ ...s, hiddenSafety: false }))}
                          />

                          {treeState.hiddenSafety === false && (
                            <TreeNode
                              step="H-b"
                              title="In a multiple failure scenario, could this lead to environmental consequences?"
                              help={HELP.environmental}
                              value={treeState.hiddenEnvironmental}
                              onYes={() =>
                                setTreeState((s) => ({
                                  ...s,
                                  hiddenEnvironmental: true,
                                  hiddenOperational: false,
                                }))
                              }
                              onNo={() => setTreeState((s) => ({ ...s, hiddenEnvironmental: false }))}
                            />
                          )}

                          {treeState.hiddenSafety === false && treeState.hiddenEnvironmental === false && (
                            <TreeNode
                              step="H-c"
                              title="In a multiple failure scenario, could this lead to operational consequences?"
                              help={HELP.operational}
                              value={treeState.hiddenOperational}
                              onYes={() => setTreeState((s) => ({ ...s, hiddenOperational: true }))}
                              onNo={() => setTreeState((s) => ({ ...s, hiddenOperational: false }))}
                            />
                          )}

                          {treeState.hiddenSafety === false &&
                            treeState.hiddenEnvironmental === false &&
                            treeState.hiddenOperational === false && (
                              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900">
                                <div className="font-semibold">Hidden — economic only</div>
                                <div className="mt-1">
                                  No safety/environment/operational consequence identified even in a multiple failure scenario.
                                </div>
                              </div>
                            )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full min-h-[90px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          placeholder="Assumptions, evidence, references, or rationale…"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            setTreeState({});
                            setNotes('');
                          }}
                          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Reset
                        </button>

                        <button
                          onClick={save}
                          disabled={!user || saving || !derived}
                          className="rounded-lg bg-deep-teal text-white px-5 py-2 text-sm font-medium hover:bg-deep-teal/90 disabled:opacity-50"
                        >
                          {saving ? 'Saving…' : 'Save classification'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="text-sm font-semibold text-slate-navy">Summary</div>
                <div className="mt-2 text-sm text-gray-600">
                  {classifications.length} classified / {modes.length} total failure mode(s)
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {modes.map((m) => {
                    const ct = classificationByMode.get(m.id)?.consequence_type;
                    const badge = consequenceToBadge(ct);
                    return (
                      <span key={m.id} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${badge.className}`}>
                        <span className="font-mono">FM {m.mode_number}</span>
                        <span className="font-semibold">{badge.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function HelpRow({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-900">{title}</div>
      <div className="text-xs text-gray-600 mt-0.5">{body}</div>
    </div>
  );
}

function TreeNode({
  step,
  title,
  help,
  value,
  onYes,
  onNo,
}: {
  step: string;
  title: string;
  help: string;
  value: boolean | undefined;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-gray-500">Step {step}</div>
          <div className="mt-1 text-sm font-semibold text-gray-900">{title}</div>
          <div className="mt-2 text-xs text-gray-600">{help}</div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={onYes}
            className={`rounded-lg px-3 py-2 text-sm font-medium border ${
              value === true ? 'bg-deep-teal text-white border-deep-teal' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Yes
          </button>
          <button
            onClick={onNo}
            className={`rounded-lg px-3 py-2 text-sm font-medium border ${
              value === false ? 'bg-slate-navy text-white border-slate-navy' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
