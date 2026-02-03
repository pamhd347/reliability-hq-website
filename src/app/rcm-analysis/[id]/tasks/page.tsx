'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getAnalysis,
  getFailureModes,
  getConsequenceClassifications,
  getTasksForAnalysis,
  upsertTask,
  deleteTask,
  type ConsequenceType,
  type RCMTaskType,
  type IntervalUnit,
} from '@/lib/rcm-api';

type FailureModeRow = {
  id: string;
  mode_number: number;
  description: string;
};

type ClassificationRow = {
  failure_mode_id: string;
  consequence_type: ConsequenceType;
};

type TaskRow = {
  id: string;
  failure_mode_id: string;
  task_type: RCMTaskType;
  description: string;
  interval: number | null;
  interval_unit: IntervalUnit | null;
  feasibility_assessment: Record<string, any>;
  cost_estimate: number | null;
  justification: string | null;
  assigned_to: string | null;
  updated_at: string;
};

type Assessment = {
  onCondition: {
    feasible: boolean;
    pfInterval: number | null;
    pfUnit: IntervalUnit;
    detectionMethod: string;
    monitoringCost: number | null;
    taskCost: number | null;
    consequenceCost: number | null;
    reducesRiskToTolerable: boolean; // for S/E
    costEffective: boolean; // for O/Econ
    interval: number | null;
    intervalUnit: IntervalUnit;
  };
  scheduledRestoration: {
    feasible: boolean;
    interval: number | null;
    intervalUnit: IntervalUnit;
    ageReliabilityData: string;
    taskCost: number | null;
    consequenceCost: number | null;
    reducesRiskToTolerable: boolean;
    costEffective: boolean;
  };
  scheduledDiscard: {
    feasible: boolean;
    interval: number | null;
    intervalUnit: IntervalUnit;
    ageReliabilityData: string;
    taskCost: number | null;
    consequenceCost: number | null;
    reducesRiskToTolerable: boolean;
    costEffective: boolean;
  };
  failureFinding: {
    feasible: boolean;
    interval: number | null;
    intervalUnit: IntervalUnit;
    basis: string;
    notes: string;
  };
};

function defaultAssessment(): Assessment {
  return {
    onCondition: {
      feasible: false,
      pfInterval: null,
      pfUnit: 'DAYS',
      detectionMethod: '',
      monitoringCost: null,
      taskCost: null,
      consequenceCost: null,
      reducesRiskToTolerable: false,
      costEffective: false,
      interval: null,
      intervalUnit: 'DAYS',
    },
    scheduledRestoration: {
      feasible: false,
      interval: null,
      intervalUnit: 'MONTHS',
      ageReliabilityData: '',
      taskCost: null,
      consequenceCost: null,
      reducesRiskToTolerable: false,
      costEffective: false,
    },
    scheduledDiscard: {
      feasible: false,
      interval: null,
      intervalUnit: 'MONTHS',
      ageReliabilityData: '',
      taskCost: null,
      consequenceCost: null,
      reducesRiskToTolerable: false,
      costEffective: false,
    },
    failureFinding: {
      feasible: false,
      interval: null,
      intervalUnit: 'MONTHS',
      basis: 'availability-based',
      notes: '',
    },
  };
}

function consequenceGroup(ct: ConsequenceType | null | undefined) {
  if (!ct) return 'UNKNOWN';
  if (ct === 'SAFETY' || ct === 'ENVIRONMENTAL' || ct === 'HIDDEN_SAFETY' || ct === 'HIDDEN_ENVIRONMENTAL') return 'SE';
  if (ct === 'OPERATIONAL' || ct === 'HIDDEN_OPERATIONAL') return 'O';
  return 'ECON';
}

function isHidden(ct: ConsequenceType | null | undefined) {
  return !!ct && ct.startsWith('HIDDEN_');
}

function badgeForConsequence(ct: ConsequenceType | null | undefined) {
  if (!ct) return { label: 'Unclassified', className: 'bg-gray-100 text-gray-700 border-gray-200' };
  switch (ct) {
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

function taskLabel(t: RCMTaskType) {
  switch (t) {
    case 'ON_CONDITION':
      return 'On-condition task';
    case 'SCHEDULED_RESTORATION':
      return 'Scheduled restoration';
    case 'SCHEDULED_DISCARD':
      return 'Scheduled discard';
    case 'FAILURE_FINDING':
      return 'Failure-finding';
    case 'RUN_TO_FAILURE':
      return 'Run-to-failure';
    case 'REDESIGN':
      return 'Redesign (compulsory)';
  }
}

function computeRecommendation(ct: ConsequenceType | null | undefined, a: Assessment) {
  if (!ct) {
    return { type: null as RCMTaskType | null, reason: 'Consequence not classified yet (complete Component 4).' };
  }

  const group = consequenceGroup(ct);
  const hidden = isHidden(ct);

  const onCondOk =
    a.onCondition.feasible &&
    (group === 'SE' ? a.onCondition.reducesRiskToTolerable : a.onCondition.costEffective) &&
    a.onCondition.interval !== null &&
    a.onCondition.interval > 0;

  const restOk =
    a.scheduledRestoration.feasible &&
    (group === 'SE' ? a.scheduledRestoration.reducesRiskToTolerable : a.scheduledRestoration.costEffective) &&
    a.scheduledRestoration.interval !== null &&
    a.scheduledRestoration.interval > 0;

  const discOk =
    a.scheduledDiscard.feasible &&
    (group === 'SE' ? a.scheduledDiscard.reducesRiskToTolerable : a.scheduledDiscard.costEffective) &&
    a.scheduledDiscard.interval !== null &&
    a.scheduledDiscard.interval > 0;

  if (onCondOk) return { type: 'ON_CONDITION' as const, reason: 'Feasible and meets criteria.' };
  if (restOk) return { type: 'SCHEDULED_RESTORATION' as const, reason: 'Feasible and meets criteria.' };
  if (discOk) return { type: 'SCHEDULED_DISCARD' as const, reason: 'Feasible and meets criteria.' };

  // Hidden failures: if no proactive task, check failure-finding
  if (hidden) {
    const ffOk = a.failureFinding.feasible && a.failureFinding.interval !== null && a.failureFinding.interval > 0;
    if (ffOk) return { type: 'FAILURE_FINDING' as const, reason: 'No proactive task; failure-finding is feasible.' };

    if (group === 'SE') return { type: 'REDESIGN' as const, reason: 'Hidden S/E and no feasible proactive or failure-finding task.' };

    return { type: 'RUN_TO_FAILURE' as const, reason: 'Hidden and no feasible proactive or failure-finding task.' };
  }

  if (group === 'SE') {
    return { type: 'REDESIGN' as const, reason: 'No feasible task reduces risk to tolerable level.' };
  }

  // Operational/Economic
  return {
    type: 'RUN_TO_FAILURE' as const,
    reason: ct === 'ECONOMIC' ? 'E-only: run-to-failure is acceptable if no cost-effective task exists.' : 'No cost-effective scheduled task exists.',
  };
}

export default function TasksPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const analysisId = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [analysisName, setAnalysisName] = useState('');
  const [systemTag, setSystemTag] = useState('');

  const [modes, setModes] = useState<FailureModeRow[]>([]);
  const [classifications, setClassifications] = useState<ClassificationRow[]>([]);
  const [tasks, setTasks] = useState<TaskRow[]>([]);

  const [selectedModeId, setSelectedModeId] = useState<string>('');

  const [assessment, setAssessment] = useState<Assessment>(defaultAssessment());
  const [selectedTaskType, setSelectedTaskType] = useState<RCMTaskType | null>(null);

  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [costEstimate, setCostEstimate] = useState<number | null>(null);
  const [justification, setJustification] = useState('');
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
          const [modeRows, classRows, taskRows] = await Promise.all([
            getFailureModes(analysisId),
            getConsequenceClassifications(analysisId),
            getTasksForAnalysis(analysisId),
          ]);
          if (cancelled) return;

          const mappedModes: FailureModeRow[] = (modeRows ?? []).map((m: any) => ({
            id: m.id as string,
            mode_number: (m.mode_number as number) ?? 1,
            description: (m.description as string) ?? '',
          }));
          mappedModes.sort((a, b) => a.mode_number - b.mode_number);
          setModes(mappedModes);

          const mappedClass: ClassificationRow[] = (classRows ?? []).map((c: any) => ({
            failure_mode_id: c.failure_mode_id as string,
            consequence_type: c.consequence_type as ConsequenceType,
          }));
          setClassifications(mappedClass);

          const mappedTasks: TaskRow[] = (taskRows ?? []).map((t: any) => ({
            id: t.id as string,
            failure_mode_id: t.failure_mode_id as string,
            task_type: t.task_type as RCMTaskType,
            description: (t.description as string) ?? '',
            interval: (t.interval as number | null) ?? null,
            interval_unit: (t.interval_unit as IntervalUnit | null) ?? null,
            feasibility_assessment: (t.feasibility_assessment as any) ?? {},
            cost_estimate: (t.cost_estimate as number | null) ?? null,
            justification: (t.justification as string | null) ?? null,
            assigned_to: (t.assigned_to as string | null) ?? null,
            updated_at: (t.updated_at as string) ?? (t.created_at as string) ?? new Date().toISOString(),
          }));
          setTasks(mappedTasks);

          if (mappedModes.length > 0) setSelectedModeId(mappedModes[0].id);
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

  const consequenceByMode = useMemo(() => {
    const m = new Map<string, ConsequenceType>();
    classifications.forEach((c) => m.set(c.failure_mode_id, c.consequence_type));
    return m;
  }, [classifications]);

  const taskByMode = useMemo(() => {
    const m = new Map<string, TaskRow>();
    tasks.forEach((t) => m.set(t.failure_mode_id, t));
    return m;
  }, [tasks]);

  const selectedMode = useMemo(() => modes.find((m) => m.id === selectedModeId) ?? null, [modes, selectedModeId]);
  const selectedConsequence = useMemo(() => consequenceByMode.get(selectedModeId) ?? null, [consequenceByMode, selectedModeId]);
  const existingTask = useMemo(() => taskByMode.get(selectedModeId) ?? null, [taskByMode, selectedModeId]);

  // When selecting a failure mode, hydrate forms from saved task if present.
  useEffect(() => {
    if (!selectedModeId) return;
    const t = existingTask;
    if (!t) {
      setAssessment(defaultAssessment());
      setSelectedTaskType(null);
      setDescription('');
      setAssignedTo('');
      setCostEstimate(null);
      setJustification('');
      return;
    }

    const a = t.feasibility_assessment ?? {};

    setAssessment({
      ...defaultAssessment(),
      ...(a as any),
      onCondition: { ...defaultAssessment().onCondition, ...(a.onCondition ?? {}) },
      scheduledRestoration: { ...defaultAssessment().scheduledRestoration, ...(a.scheduledRestoration ?? {}) },
      scheduledDiscard: { ...defaultAssessment().scheduledDiscard, ...(a.scheduledDiscard ?? {}) },
      failureFinding: { ...defaultAssessment().failureFinding, ...(a.failureFinding ?? {}) },
    });

    setSelectedTaskType(t.task_type);
    setDescription(t.description ?? '');
    setAssignedTo(t.assigned_to ?? '');
    setCostEstimate(t.cost_estimate ?? null);
    setJustification(t.justification ?? '');
  }, [selectedModeId, existingTask]);

  // Interval calculator: default interval = half P-F (if user hasn't set interval)
  useEffect(() => {
    const pf = assessment.onCondition.pfInterval;
    if (pf === null || pf <= 0) return;

    // Only auto-set if interval is blank
    if (assessment.onCondition.interval === null) {
      setAssessment((prev) => ({
        ...prev,
        onCondition: {
          ...prev.onCondition,
          interval: Math.max(1, Math.floor(pf / 2)),
          intervalUnit: prev.onCondition.pfUnit,
        },
      }));
    }
  }, [assessment.onCondition.pfInterval, assessment.onCondition.pfUnit]);

  const recommendation = useMemo(() => computeRecommendation(selectedConsequence, assessment), [selectedConsequence, assessment]);

  useEffect(() => {
    // If user hasn't chosen explicitly, follow recommendation
    if (!selectedModeId) return;
    if (selectedTaskType === null) {
      setSelectedTaskType(recommendation.type);
    }
  }, [selectedModeId, recommendation.type, selectedTaskType]);

  const save = async () => {
    if (!user) return;
    if (!selectedModeId) return;
    if (!selectedTaskType) {
      setError('Select a task decision to save.');
      return;
    }

    const requiresJustification = selectedTaskType === 'RUN_TO_FAILURE' || selectedTaskType === 'REDESIGN';
    if (requiresJustification && !justification.trim()) {
      setError('Justification is required for Run-to-Failure or Redesign decisions.');
      return;
    }

    // Determine interval based on task type
    let interval: number | null = null;
    let intervalUnit: IntervalUnit | null = null;

    if (selectedTaskType === 'ON_CONDITION') {
      interval = assessment.onCondition.interval;
      intervalUnit = assessment.onCondition.intervalUnit;
    } else if (selectedTaskType === 'SCHEDULED_RESTORATION') {
      interval = assessment.scheduledRestoration.interval;
      intervalUnit = assessment.scheduledRestoration.intervalUnit;
    } else if (selectedTaskType === 'SCHEDULED_DISCARD') {
      interval = assessment.scheduledDiscard.interval;
      intervalUnit = assessment.scheduledDiscard.intervalUnit;
    } else if (selectedTaskType === 'FAILURE_FINDING') {
      interval = assessment.failureFinding.interval;
      intervalUnit = assessment.failureFinding.intervalUnit;
    }

    try {
      setSaving(true);
      setError(null);

      const saved = await upsertTask({
        id: existingTask?.id,
        analysisId,
        failureModeId: selectedModeId,
        taskType: selectedTaskType,
        description,
        interval,
        intervalUnit,
        feasibilityAssessment: assessment as any,
        costEstimate,
        justification: justification || null,
        assignedTo: assignedTo || null,
      });

      const savedRow: TaskRow = {
        id: saved['id'] as string,
        failure_mode_id: saved['failure_mode_id'] as string,
        task_type: saved['task_type'] as RCMTaskType,
        description: (saved['description'] as string) ?? '',
        interval: (saved['interval'] as number | null) ?? null,
        interval_unit: (saved['interval_unit'] as IntervalUnit | null) ?? null,
        feasibility_assessment: (saved['feasibility_assessment'] as any) ?? {},
        cost_estimate: (saved['cost_estimate'] as number | null) ?? null,
        justification: (saved['justification'] as string | null) ?? null,
        assigned_to: (saved['assigned_to'] as string | null) ?? null,
        updated_at: (saved['updated_at'] as string) ?? new Date().toISOString(),
      };

      setTasks((prev) => {
        const next = prev.filter((t) => t.failure_mode_id !== savedRow.failure_mode_id);
        return [savedRow, ...next];
      });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save task decision');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!user) return;
    if (!existingTask) return;
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== existingTask.id));
    try {
      await deleteTask(existingTask.id);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to delete task');
      setTasks(snapshot);
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
              <span className="text-gray-900 font-medium">Task Selection</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/rcm-analysis/${analysisId}/consequences`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Back to Consequences
              </Link>
              <Link
                href={`/rcm-analysis/${analysisId}/review`}
                className="inline-flex items-center gap-2 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
              >
                Next: Review & Approval
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
          <h1 className="text-2xl font-bold text-gray-900">Component 5 — Task Selection (JA1011)</h1>
          <p className="text-gray-600 mt-1">Select the most appropriate task option for each failure mode based on consequence and feasibility.</p>
          {systemTag && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <span className="font-mono">{systemTag}</span>
            </div>
          )}
        </div>

        {!user && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            You are not signed in. Sign in to load data and save task selections.
          </div>
        )}

        {user && modes.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="text-gray-900 font-semibold">No failure modes found</div>
            <div className="text-sm text-gray-600 mt-1">Complete Component 3 first.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: list */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-200">
                  <div className="text-sm font-semibold text-slate-navy">Failure modes</div>
                  <div className="text-xs text-gray-500 mt-1">With consequence badge + task status.</div>
                </div>
                <div className="p-3 max-h-[70vh] overflow-auto space-y-2">
                  {modes.map((m) => {
                    const ct = consequenceByMode.get(m.id);
                    const cb = badgeForConsequence(ct);
                    const t = taskByMode.get(m.id);
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
                            <div className="text-xs text-gray-500 mt-1">{t ? `Task: ${taskLabel(t.task_type)}` : 'No task selected'}</div>
                          </div>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${cb.className}`}>{cb.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="text-sm font-semibold text-slate-navy">Reminders</div>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li>
                    On-condition interval defaults to <span className="font-medium text-gray-900">½ P-F</span> (override if needed).
                  </li>
                  <li>
                    For Safety/Environmental consequences, if no suitable task exists then <span className="font-medium text-gray-900">REDESIGN IS COMPULSORY</span>.
                  </li>
                  <li>
                    Hidden failures require considering <span className="font-medium text-gray-900">failure-finding</span> when no proactive task exists.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Justification is mandatory</span> for Run-to-Failure and Redesign decisions.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-navy">Feasibility assessment</div>
                      <div className="mt-1 text-sm text-gray-600">
                        {selectedMode ? (
                          <>
                            For <span className="font-mono text-deep-teal font-semibold">FM {selectedMode.mode_number}</span> —{' '}
                            <span className="text-gray-900 font-medium">{selectedMode.description || '—'}</span>
                          </>
                        ) : (
                          'Select a failure mode to begin.'
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-xs text-gray-500">Recommended</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900">{recommendation.type ? taskLabel(recommendation.type) : '—'}</div>
                      <div className="mt-1 text-xs text-gray-500 max-w-[220px]">{recommendation.reason}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {!selectedMode ? (
                    <div className="text-sm text-gray-600">Select a failure mode from the left.</div>
                  ) : (
                    <>
                      {!selectedConsequence && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                          Consequence not classified yet. Complete Component 4 first.
                        </div>
                      )}

                      <Section title="1) On-condition task (condition monitoring)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Checkbox
                            label="Feasible"
                            checked={assessment.onCondition.feasible}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, feasible: v } }))
                            }
                          />

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Detection method</label>
                            <input
                              value={assessment.onCondition.detectionMethod}
                              onChange={(e) =>
                                setAssessment((p) => ({
                                  ...p,
                                  onCondition: { ...p.onCondition, detectionMethod: e.target.value },
                                }))
                              }
                              placeholder="e.g., vibration analysis, oil analysis, thermography"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            />
                          </div>

                          <NumberField
                            label="P-F interval"
                            value={assessment.onCondition.pfInterval}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, pfInterval: v, interval: null } }))
                            }
                          />

                          <Select
                            label="P-F unit"
                            value={assessment.onCondition.pfUnit}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, pfUnit: v as IntervalUnit } }))
                            }
                            options={['HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS']}
                          />

                          <NumberField
                            label="Recommended/selected interval"
                            value={assessment.onCondition.interval}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, interval: v } }))
                            }
                          />

                          <Select
                            label="Interval unit"
                            value={assessment.onCondition.intervalUnit}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, intervalUnit: v as IntervalUnit } }))
                            }
                            options={['HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS']}
                          />

                          <NumberField
                            label="Monitoring cost (per interval)"
                            value={assessment.onCondition.monitoringCost}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, monitoringCost: v } }))
                            }
                          />

                          <NumberField
                            label="Task cost (estimate)"
                            value={assessment.onCondition.taskCost}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, taskCost: v } }))
                            }
                          />

                          <NumberField
                            label="Consequence cost (estimate)"
                            value={assessment.onCondition.consequenceCost}
                            onChange={(v) =>
                              setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, consequenceCost: v } }))
                            }
                          />

                          {consequenceGroup(selectedConsequence) === 'SE' ? (
                            <Checkbox
                              label="Reduces risk to tolerable level"
                              checked={assessment.onCondition.reducesRiskToTolerable}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  onCondition: { ...p.onCondition, reducesRiskToTolerable: v },
                                }))
                              }
                            />
                          ) : (
                            <Checkbox
                              label="Cost-effective"
                              checked={assessment.onCondition.costEffective}
                              onChange={(v) =>
                                setAssessment((p) => ({ ...p, onCondition: { ...p.onCondition, costEffective: v } }))
                              }
                            />
                          )}
                        </div>
                      </Section>

                      <Section title="2) Scheduled restoration">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Checkbox
                            label="Feasible"
                            checked={assessment.scheduledRestoration.feasible}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, feasible: v },
                              }))
                            }
                          />

                          <Text
                            label="Age-reliability data / basis"
                            value={assessment.scheduledRestoration.ageReliabilityData}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, ageReliabilityData: v },
                              }))
                            }
                            placeholder="e.g., Weibull data, OEM guidance, historical MTBF"
                          />

                          <NumberField
                            label="Interval"
                            value={assessment.scheduledRestoration.interval}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, interval: v },
                              }))
                            }
                          />

                          <Select
                            label="Interval unit"
                            value={assessment.scheduledRestoration.intervalUnit}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, intervalUnit: v as IntervalUnit },
                              }))
                            }
                            options={['HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS']}
                          />

                          <NumberField
                            label="Task cost"
                            value={assessment.scheduledRestoration.taskCost}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, taskCost: v },
                              }))
                            }
                          />

                          <NumberField
                            label="Consequence cost"
                            value={assessment.scheduledRestoration.consequenceCost}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledRestoration: { ...p.scheduledRestoration, consequenceCost: v },
                              }))
                            }
                          />

                          {consequenceGroup(selectedConsequence) === 'SE' ? (
                            <Checkbox
                              label="Reduces risk to tolerable level"
                              checked={assessment.scheduledRestoration.reducesRiskToTolerable}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  scheduledRestoration: { ...p.scheduledRestoration, reducesRiskToTolerable: v },
                                }))
                              }
                            />
                          ) : (
                            <Checkbox
                              label="Cost-effective"
                              checked={assessment.scheduledRestoration.costEffective}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  scheduledRestoration: { ...p.scheduledRestoration, costEffective: v },
                                }))
                              }
                            />
                          )}
                        </div>
                      </Section>

                      <Section title="3) Scheduled discard">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Checkbox
                            label="Feasible"
                            checked={assessment.scheduledDiscard.feasible}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, feasible: v },
                              }))
                            }
                          />

                          <Text
                            label="Age-reliability data / basis"
                            value={assessment.scheduledDiscard.ageReliabilityData}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, ageReliabilityData: v },
                              }))
                            }
                            placeholder="e.g., wear-out age, OEM life limit"
                          />

                          <NumberField
                            label="Interval"
                            value={assessment.scheduledDiscard.interval}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, interval: v },
                              }))
                            }
                          />

                          <Select
                            label="Interval unit"
                            value={assessment.scheduledDiscard.intervalUnit}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, intervalUnit: v as IntervalUnit },
                              }))
                            }
                            options={['HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS']}
                          />

                          <NumberField
                            label="Task cost"
                            value={assessment.scheduledDiscard.taskCost}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, taskCost: v },
                              }))
                            }
                          />

                          <NumberField
                            label="Consequence cost"
                            value={assessment.scheduledDiscard.consequenceCost}
                            onChange={(v) =>
                              setAssessment((p) => ({
                                ...p,
                                scheduledDiscard: { ...p.scheduledDiscard, consequenceCost: v },
                              }))
                            }
                          />

                          {consequenceGroup(selectedConsequence) === 'SE' ? (
                            <Checkbox
                              label="Reduces risk to tolerable level"
                              checked={assessment.scheduledDiscard.reducesRiskToTolerable}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  scheduledDiscard: { ...p.scheduledDiscard, reducesRiskToTolerable: v },
                                }))
                              }
                            />
                          ) : (
                            <Checkbox
                              label="Cost-effective"
                              checked={assessment.scheduledDiscard.costEffective}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  scheduledDiscard: { ...p.scheduledDiscard, costEffective: v },
                                }))
                              }
                            />
                          )}
                        </div>
                      </Section>

                      {isHidden(selectedConsequence) && (
                        <Section title="4) Hidden failures — failure-finding (if no proactive task)">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Checkbox
                              label="Feasible"
                              checked={assessment.failureFinding.feasible}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  failureFinding: { ...p.failureFinding, feasible: v },
                                }))
                              }
                            />

                            <Text
                              label="Basis (availability-based interval)"
                              value={assessment.failureFinding.basis}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  failureFinding: { ...p.failureFinding, basis: v },
                                }))
                              }
                              placeholder="e.g., monthly proof test aligned with shutdowns"
                            />

                            <NumberField
                              label="Interval"
                              value={assessment.failureFinding.interval}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  failureFinding: { ...p.failureFinding, interval: v },
                                }))
                              }
                            />

                            <Select
                              label="Interval unit"
                              value={assessment.failureFinding.intervalUnit}
                              onChange={(v) =>
                                setAssessment((p) => ({
                                  ...p,
                                  failureFinding: { ...p.failureFinding, intervalUnit: v as IntervalUnit },
                                }))
                              }
                              options={['DAYS', 'WEEKS', 'MONTHS', 'YEARS']}
                            />

                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                              <textarea
                                value={assessment.failureFinding.notes}
                                onChange={(e) =>
                                  setAssessment((p) => ({
                                    ...p,
                                    failureFinding: { ...p.failureFinding, notes: e.target.value },
                                  }))
                                }
                                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                              />
                            </div>
                          </div>
                        </Section>
                      )}

                      <Section title="Decision">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Select
                            label="Selected task decision"
                            value={selectedTaskType ?? ''}
                            onChange={(v) => setSelectedTaskType(v as RCMTaskType)}
                            options={['ON_CONDITION', 'SCHEDULED_RESTORATION', 'SCHEDULED_DISCARD', 'FAILURE_FINDING', 'RUN_TO_FAILURE', 'REDESIGN']}
                            optionLabel={(v) => taskLabel(v as RCMTaskType)}
                          />

                          <Text
                            label="Task description"
                            value={description}
                            onChange={setDescription}
                            placeholder="e.g., Vibration route every 2 weeks"
                          />

                          <Text
                            label="Assigned to (optional)"
                            value={assignedTo}
                            onChange={setAssignedTo}
                            placeholder="e.g., Maintenance planner / CM team"
                          />

                          <NumberField label="Cost estimate (optional)" value={costEstimate} onChange={setCostEstimate} />

                          {(selectedTaskType === 'RUN_TO_FAILURE' || selectedTaskType === 'REDESIGN') && (
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-600 mb-1">Justification (required)</label>
                              <textarea
                                value={justification}
                                onChange={(e) => setJustification(e.target.value)}
                                className="w-full min-h-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                                placeholder="Document rationale and evidence (JA1011)."
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <button
                            onClick={remove}
                            disabled={!existingTask || saving}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Remove saved task
                          </button>

                          <button
                            onClick={save}
                            disabled={!user || saving || !selectedTaskType}
                            className="rounded-lg bg-deep-teal text-white px-5 py-2 text-sm font-medium hover:bg-deep-teal/90 disabled:opacity-50"
                          >
                            {saving ? 'Saving…' : 'Save task decision'}
                          </button>
                        </div>
                      </Section>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="text-sm font-semibold text-slate-navy">Task summary</div>
                <div className="mt-2 text-sm text-gray-600">
                  {tasks.length} task decision(s) saved / {modes.length} failure mode(s)
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-deep-teal focus:ring-deep-teal"
      />
      {label}
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number | null) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type="number"
        value={value ?? ''}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === '' ? null : Number(raw));
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
      />
    </div>
  );
}

function Text({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  optionLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  optionLabel?: (v: string) => string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabel ? optionLabel(o) : o}
          </option>
        ))}
      </select>
    </div>
  );
}
