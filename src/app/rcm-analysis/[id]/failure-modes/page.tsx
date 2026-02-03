'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { FailureCause, FailureMode } from '@/types/rcm-analysis';
import {
  createFailureCause,
  createFailureMode,
  deleteFailureCause,
  deleteFailureMode,
  getAnalysis,
  getFailureModes,
  getFunctionalFailuresForAnalysis,
  updateFailureCause,
  updateFailureMode,
} from '@/lib/rcm-api';

type FunctionalFailureContext = {
  id: string;
  description: string;
  failureLetter: string;
  functionNumber: number;
  functionStatement: string;
};

type ModeRow = FailureMode & {
  // Persistence ids from DB (uuid strings)
  _dbId?: string;
  _analysisId?: string;
};

type CauseRow = FailureCause & {
  _dbId?: string;
};

type Suggestion = {
  title: string;
  modes: Array<{
    description: string;
    localEffect: string;
    systemEffect: string;
    endEffect: string;
    evidenceOfFailure: string;
    detectionMethod: string;
    causes: Array<{
      description: string;
      mechanism: string;
      contributingFactors?: string;
    }>;
  }>;
};

function uuid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toCauseLetter(idx: number) {
  const base = 'abcdefghijklmnopqrstuvwxyz';
  return base[idx] ?? `${idx + 1}`;
}

function buildSuggestions(equipmentTypes: string[]): Suggestion[] {
  const types = equipmentTypes.map((t) => t.toLowerCase());

  const suggestions: Suggestion[] = [];

  const isPump = types.some((t) => t.includes('pump'));
  const isMotor = types.some((t) => t.includes('motor'));
  const isHX = types.some((t) => t.includes('heat exchanger') || t.includes('shell') || t.includes('tube'));

  if (isPump) {
    suggestions.push({
      title: 'Common pump failure modes',
      modes: [
        {
          description: 'Fails to deliver required flow/pressure (loss of performance)',
          localEffect: 'Reduced discharge pressure/flow; unstable operation; increased vibration',
          systemEffect: 'Downstream starvation; inability to meet process demand',
          endEffect: 'Production loss; potential safety/environmental impact if process control is compromised',
          evidenceOfFailure: 'Low flow/pressure trend; cavitation noise; high vibration; alarms/trips',
          detectionMethod: 'Trend monitoring (flow/pressure/power); vibration analysis; operator rounds',
          causes: [
            {
              description: 'Impeller wear/erosion increases internal recirculation',
              mechanism: 'Erosion/Wear',
              contributingFactors: 'Abrasives in fluid; high velocity; poor material selection',
            },
            {
              description: 'Cavitation damage due to inadequate NPSH',
              mechanism: 'Cavitation',
              contributingFactors: 'Blocked suction strainer; low suction head; high temperature',
            },
          ],
        },
        {
          description: 'Loss of containment (seal/casing leakage)',
          localEffect: 'Leakage at seal/casing; housekeeping and slip hazard',
          systemEffect: 'Potential environmental release; reduced availability due to shutdown',
          endEffect: 'Safety/environmental incident; production downtime',
          evidenceOfFailure: 'Visible leakage; seal pot level changes; VOC detector alarm',
          detectionMethod: 'Operator inspection; leak detection; seal system monitoring',
          causes: [
            { description: 'Seal face wear due to dry running', mechanism: 'Wear', contributingFactors: 'Seal flush loss; air ingress; improper start-up' },
            { description: 'O-ring/elastomer degradation', mechanism: 'Chemical/thermal degradation', contributingFactors: 'Incompatible materials; high temperature' },
          ],
        },
      ],
    });
  }

  if (isMotor) {
    suggestions.push({
      title: 'Common electric motor failure modes',
      modes: [
        {
          description: 'Fails to start on demand',
          localEffect: 'Motor does not run; overload/relay trip',
          systemEffect: 'Driven equipment unavailable',
          endEffect: 'Loss of production; potential safety risk if backup not available',
          evidenceOfFailure: 'Start command issued but no current draw; protection trip indication',
          detectionMethod: 'MCC/PLC alarms; current signature; operator observation',
          causes: [
            { description: 'Starter/contactor failure (contacts burnt)', mechanism: 'Electrical wear', contributingFactors: 'High starts; arcing; poor maintenance' },
            { description: 'Supply undervoltage or phase loss', mechanism: 'Electrical', contributingFactors: 'Loose connections; upstream faults' },
          ],
        },
        {
          description: 'Overheats / trips during operation',
          localEffect: 'High winding temperature; nuisance trips',
          systemEffect: 'Unplanned shutdown of driven equipment',
          endEffect: 'Production loss; potential secondary damage',
          evidenceOfFailure: 'RTD temperature trend high; thermal overload trip; smell/discoloration',
          detectionMethod: 'Temperature monitoring; infrared thermography; motor current monitoring',
          causes: [
            { description: 'Bearing degradation increasing load', mechanism: 'Fatigue/Wear', contributingFactors: 'Misalignment; inadequate lubrication; contamination' },
            { description: 'Cooling path blocked (fan/vents)', mechanism: 'Contamination', contributingFactors: 'Dust build-up; damaged fan' },
          ],
        },
      ],
    });
  }

  if (isHX) {
    suggestions.push({
      title: 'Common heat exchanger failure modes',
      modes: [
        {
          description: 'Insufficient heat transfer (cannot meet outlet temperature)',
          localEffect: 'Outlet temperature deviates from target; control valve saturates',
          systemEffect: 'Upstream/downstream process constraints; energy inefficiency',
          endEffect: 'Production loss; quality issues; increased energy cost',
          evidenceOfFailure: 'Rising approach temperature; increased duty demand; trending deviation',
          detectionMethod: 'Performance trending; DP/temperature monitoring; periodic efficiency calculations',
          causes: [
            { description: 'Fouling on heat transfer surfaces', mechanism: 'Fouling', contributingFactors: 'Poor water quality; process contamination; low velocity' },
            { description: 'Air/gas binding reducing effective area', mechanism: 'Operational', contributingFactors: 'Poor venting; start-up procedure issues' },
          ],
        },
        {
          description: 'Cross-contamination due to tube/shell leak',
          localEffect: 'Leakage between streams; off-spec product',
          systemEffect: 'Potential corrosion/contamination of connected systems',
          endEffect: 'Safety/environmental incident; major downtime',
          evidenceOfFailure: 'Unexpected composition change; pressure imbalance; tracer detection',
          detectionMethod: 'Sampling/chemistry; leak detection; pressure monitoring',
          causes: [
            { description: 'Tube wall thinning and rupture', mechanism: 'Corrosion/Erosion', contributingFactors: 'Wrong metallurgy; high velocity; corrosive fluid' },
            { description: 'Thermal fatigue cracking', mechanism: 'Fatigue', contributingFactors: 'Thermal cycling; rapid start/stop' },
          ],
        },
      ],
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      title: 'Generic failure mode starters',
      modes: [
        {
          description: 'Fails to meet required performance standard',
          localEffect: 'Local performance deviation',
          systemEffect: 'System performance degraded',
          endEffect: 'Production/safety/environment impact depending on service',
          evidenceOfFailure: 'Alarms; deviation trending; operator observation',
          detectionMethod: 'Trend monitoring; inspections; functional tests',
          causes: [
            { description: 'Normal wear beyond acceptable limit', mechanism: 'Wear' },
            { description: 'Contamination ingression', mechanism: 'Contamination' },
          ],
        },
      ],
    });
  }

  return suggestions;
}

export default function FailureModesPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const analysisId = params.id;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [analysisName, setAnalysisName] = useState('');
  const [systemTag, setSystemTag] = useState('');
  const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);

  const [functionalFailures, setFunctionalFailures] = useState<FunctionalFailureContext[]>([]);
  const [modes, setModes] = useState<ModeRow[]>([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestForFailureId, setSuggestForFailureId] = useState<string>('');

  const suggestions = useMemo(() => buildSuggestions(equipmentTypes), [equipmentTypes]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setLoadError(null);

        const res = await getAnalysis(analysisId);
        if (cancelled) return;

        setAnalysisName((res.analysis['name'] as string | undefined) ?? 'RCM Analysis');
        setSystemTag(
          (res.analysis['system_tag'] as string | undefined) ?? (res.analysis['system_name'] as string | undefined) ?? ''
        );

        const types = (res.equipment ?? [])
          .filter((e: any) => e.is_in_scope)
          .map((e: any) => e.equipment_type)
          .filter(Boolean);
        setEquipmentTypes(Array.from(new Set(types)) as string[]);

        // Functional failures context (needs auth due to RLS)
        if (user) {
          const ffRows = await getFunctionalFailuresForAnalysis(analysisId);
          if (cancelled) return;

          const ff = (ffRows ?? []).map((row: any) => {
            const fn = row.rcm_functions;
            return {
              id: row.id as string,
              description: (row.description as string) ?? '',
              failureLetter: (row.failure_letter as string) ?? '?',
              functionNumber: (fn?.function_number as number) ?? 0,
              functionStatement: (fn?.full_statement as string) ?? '',
            } as FunctionalFailureContext;
          });
          setFunctionalFailures(ff);

          const modeRows = await getFailureModes(analysisId);
          if (cancelled) return;

          const mapped: ModeRow[] = (modeRows ?? []).map((m: any) => ({
            id: m.id as string,
            functionalFailureId: m.functional_failure_id as string,
            modeNumber: (m.mode_number as number) ?? 1,
            description: (m.description as string) ?? '',
            causes: ((m.rcm_failure_causes ?? []) as any[]).map((c: any) => ({
              id: c.id as string,
              description: (c.description as string) ?? '',
              mechanism: (c.mechanism as string) ?? '',
              contributingFactors: (c.contributing_factors as string | null | undefined) ?? undefined,
            })),
            localEffect: (m.local_effect as string | null | undefined) ?? '',
            systemEffect: (m.system_effect as string | null | undefined) ?? '',
            endEffect: (m.end_effect as string | null | undefined) ?? '',
            evidenceOfFailure: (m.evidence_of_failure as string | null | undefined) ?? '',
            detectionMethod: (m.detection_method as string | null | undefined) ?? '',
            notes: (m.notes as string | null | undefined) ?? undefined,
          }));

          setModes(mapped);
        }
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.message ?? 'Failed to load failure modes');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [analysisId, user]);

  const failureById = useMemo(() => {
    const map = new Map<string, FunctionalFailureContext>();
    functionalFailures.forEach((f) => map.set(f.id, f));
    return map;
  }, [functionalFailures]);

  const modesByFailure = useMemo(() => {
    const grouped = new Map<string, ModeRow[]>();
    modes.forEach((m) => {
      const arr = grouped.get(m.functionalFailureId) ?? [];
      arr.push(m);
      grouped.set(m.functionalFailureId, arr);
    });
    // keep modes in numeric order
    grouped.forEach((arr) => arr.sort((a, b) => a.modeNumber - b.modeNumber));
    return grouped;
  }, [modes]);

  const nextModeNumber = (functionalFailureId: string) => {
    const existing = modesByFailure.get(functionalFailureId) ?? [];
    return existing.length === 0 ? 1 : Math.max(...existing.map((m) => m.modeNumber)) + 1;
  };

  const addMode = async (functionalFailureId: string) => {
    const newMode: ModeRow = {
      id: uuid('fm'),
      functionalFailureId,
      modeNumber: nextModeNumber(functionalFailureId),
      description: '',
      causes: [],
      localEffect: '',
      systemEffect: '',
      endEffect: '',
      evidenceOfFailure: '',
      detectionMethod: '',
      notes: '',
    };

    // optimistic
    setModes((prev) => [newMode, ...prev]);

    if (!user) return;

    try {
      const saved = await createFailureMode({
        analysisId,
        functionalFailureId,
        modeNumber: newMode.modeNumber,
        description: '',
        localEffect: '',
        systemEffect: '',
        endEffect: '',
        evidenceOfFailure: '',
        detectionMethod: '',
        notes: '',
      });

      const dbId = saved['id'] as string;
      setModes((prev) => prev.map((m) => (m.id === newMode.id ? { ...m, id: dbId } : m)));
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to create failure mode');
    }
  };

  const removeMode = async (modeId: string) => {
    const snapshot = modes;
    setModes((prev) => prev.filter((m) => m.id !== modeId));

    if (!user) return;

    try {
      await deleteFailureMode(modeId);
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to delete failure mode');
      setModes(snapshot);
    }
  };

  const patchMode = async (modeId: string, patch: Partial<FailureMode>) => {
    setModes((prev) => prev.map((m) => (m.id === modeId ? ({ ...m, ...patch } as ModeRow) : m)));

    if (!user) return;

    try {
      await updateFailureMode(modeId, {
        modeNumber: patch.modeNumber,
        description: patch.description,
        localEffect: patch.localEffect,
        systemEffect: patch.systemEffect,
        endEffect: patch.endEffect,
        evidenceOfFailure: patch.evidenceOfFailure,
        detectionMethod: patch.detectionMethod,
        notes: patch.notes,
      });
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to update failure mode');
    }
  };

  const addCause = async (modeId: string) => {
    const mode = modes.find((m) => m.id === modeId);
    if (!mode) return;

    const newCause: CauseRow = {
      id: uuid('fc'),
      description: '',
      mechanism: '',
      contributingFactors: '',
    };

    setModes((prev) =>
      prev.map((m) => (m.id === modeId ? { ...m, causes: [...m.causes, newCause] } : m))
    );

    if (!user) return;

    try {
      const causeNumber = mode.causes.length + 1;
      const saved = await createFailureCause({
        failureModeId: modeId,
        causeNumber,
        description: '',
        mechanism: 'Wear',
        contributingFactors: '',
      });

      const dbId = saved['id'] as string;
      setModes((prev) =>
        prev.map((m) =>
          m.id === modeId ? { ...m, causes: m.causes.map((c) => (c.id === newCause.id ? { ...c, id: dbId } : c)) } : m
        )
      );
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to create failure cause');
    }
  };

  const patchCause = async (modeId: string, causeId: string, patch: Partial<FailureCause>) => {
    setModes((prev) =>
      prev.map((m) =>
        m.id === modeId
          ? { ...m, causes: m.causes.map((c) => (c.id === causeId ? ({ ...c, ...patch } as CauseRow) : c)) }
          : m
      )
    );

    if (!user) return;

    try {
      await updateFailureCause(causeId, {
        description: patch.description,
        mechanism: patch.mechanism,
        contributingFactors: patch.contributingFactors,
      });
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to update failure cause');
    }
  };

  const removeCause = async (modeId: string, causeId: string) => {
    const snapshot = modes;

    setModes((prev) =>
      prev.map((m) => (m.id === modeId ? { ...m, causes: m.causes.filter((c) => c.id !== causeId) } : m))
    );

    if (!user) return;

    try {
      await deleteFailureCause(causeId);
    } catch (e: any) {
      setLoadError(e?.message ?? 'Failed to delete failure cause');
      setModes(snapshot);
    }
  };

  const applySuggestion = async (functionalFailureId: string, suggestion: Suggestion) => {
    const base = nextModeNumber(functionalFailureId);

    for (let i = 0; i < suggestion.modes.length; i++) {
      const sMode = suggestion.modes[i];

      const tempId = uuid('fm');
      const newMode: ModeRow = {
        id: tempId,
        functionalFailureId,
        modeNumber: base + i,
        description: sMode.description,
        causes: sMode.causes.map((c) => ({
          id: uuid('fc'),
          description: c.description,
          mechanism: c.mechanism,
          contributingFactors: c.contributingFactors,
        })),
        localEffect: sMode.localEffect,
        systemEffect: sMode.systemEffect,
        endEffect: sMode.endEffect,
        evidenceOfFailure: sMode.evidenceOfFailure,
        detectionMethod: sMode.detectionMethod,
        notes: '',
      };

      setModes((prev) => [newMode, ...prev]);

      if (!user) continue;

      const savedMode = await createFailureMode({
        analysisId,
        functionalFailureId,
        modeNumber: newMode.modeNumber,
        description: newMode.description,
        localEffect: newMode.localEffect,
        systemEffect: newMode.systemEffect,
        endEffect: newMode.endEffect,
        evidenceOfFailure: newMode.evidenceOfFailure,
        detectionMethod: newMode.detectionMethod,
        notes: newMode.notes ?? '',
      });

      const dbModeId = savedMode['id'] as string;

      // replace mode id
      setModes((prev) => prev.map((m) => (m.id === tempId ? { ...m, id: dbModeId } : m)));

      // persist causes
      for (let cIdx = 0; cIdx < newMode.causes.length; cIdx++) {
        const cause = newMode.causes[cIdx];
        const savedCause = await createFailureCause({
          failureModeId: dbModeId,
          causeNumber: cIdx + 1,
          description: cause.description,
          mechanism: cause.mechanism,
          contributingFactors: cause.contributingFactors ?? '',
        });
        const dbCauseId = savedCause['id'] as string;
        setModes((prev) =>
          prev.map((m) =>
            m.id === dbModeId
              ? { ...m, causes: m.causes.map((cc) => (cc.id === cause.id ? { ...cc, id: dbCauseId } : cc)) }
              : m
          )
        );
      }
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
              <span className="text-gray-900 font-medium">Failure Modes</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (functionalFailures.length > 0) {
                    setSuggestForFailureId(functionalFailures[0].id);
                  }
                  setShowSuggestions(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-industrial-amber text-slate-navy px-3 py-2 text-sm font-medium hover:opacity-90"
              >
                <span className="text-base">✨</span>
                AI Suggest
              </button>
              <Link
                href={`/rcm-analysis/${analysisId}/functions`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Back to Functions
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {loadError}
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Failure Modes, Causes & Effects</h1>
          <p className="text-gray-600 mt-1">
            JA1011 requires capturing <span className="font-medium text-gray-900">Failure Modes</span> (HOW) and{' '}
            <span className="font-medium text-gray-900">Failure Causes</span> (WHY) separately.
          </p>
          {systemTag && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <span className="font-mono">{systemTag}</span>
            </div>
          )}
        </div>

        {!user && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            You are not signed in. You can draft failure modes here, but they will not be saved to the database.
          </div>
        )}

        {/* Guidance card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-slate-navy">Numbering guide</h2>
          <div className="mt-2 text-sm text-gray-600 space-y-2">
            <p>
              Use the form <span className="font-mono text-gray-900">Function.Failure.Mode.Cause</span> (e.g.,{' '}
              <span className="font-mono text-gray-900">1.A.2.a</span>).
            </p>
            <p>
              <span className="font-medium text-gray-900">Mode</span> is the event (HOW it fails).{' '}
              <span className="font-medium text-gray-900">Cause</span> is the mechanism (WHY).
            </p>
            <p>
              Effects should be captured at three levels: <span className="font-medium text-gray-900">local → system → end</span>.
            </p>
          </div>
        </div>

        {user && functionalFailures.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="text-gray-900 font-semibold">No functional failures found</div>
            <div className="text-sm text-gray-600 mt-1">Complete Component 2 (Functions & Functional Failures) first.</div>
            <div className="mt-4">
              <Link
                href={`/rcm-analysis/${analysisId}/functions`}
                className="rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90"
              >
                Go to Functions
              </Link>
            </div>
          </div>
        ) : functionalFailures.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-700">
            Sign in to load functional failures from Component 2 and save failure modes to the database.
          </div>
        ) : (
          <div className="space-y-6">
            {functionalFailures
              .slice()
              .sort((a, b) => (a.functionNumber === b.functionNumber ? a.failureLetter.localeCompare(b.failureLetter) : a.functionNumber - b.functionNumber))
              .map((ff) => {
                const ffModes = modesByFailure.get(ff.id) ?? [];
                const prefix = `${ff.functionNumber}.${ff.failureLetter}`;

                return (
                  <section key={ff.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-navy">Functional failure</div>
                        <div className="mt-1 text-lg font-bold text-gray-900">
                          <span className="font-mono mr-2 text-deep-teal">{prefix}</span>
                          {ff.description}
                        </div>
                        {ff.functionStatement && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Function:</span> {ff.functionStatement}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => addMode(ff.id)}
                        className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Mode
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {ffModes.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                          <div className="text-gray-900 font-semibold">No failure modes yet</div>
                          <div className="text-sm text-gray-600 mt-1">Add at least one mode (HOW) and one cause (WHY).</div>
                        </div>
                      ) : (
                        ffModes.map((mode) => (
                          <FailureModeCard
                            key={mode.id}
                            mode={mode}
                            prefix={prefix}
                            onRemove={() => removeMode(mode.id)}
                            onPatch={(p) => patchMode(mode.id, p)}
                            onAddCause={() => addCause(mode.id)}
                            onPatchCause={(causeId, p) => patchCause(mode.id, causeId, p)}
                            onRemoveCause={(causeId) => removeCause(mode.id, causeId)}
                          />
                        ))
                      )}
                    </div>
                  </section>
                );
              })}
          </div>
        )}

        {/* Suggestions modal */}
        {showSuggestions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <div className="text-base font-semibold text-gray-900">AI failure mode suggestions</div>
                  <div className="text-sm text-gray-600 mt-0.5">
                    Suggestions are based on equipment types in your boundary definition.
                  </div>
                </div>
                <button onClick={() => setShowSuggestions(false)} className="text-sm text-gray-600 hover:text-gray-900">
                  Close
                </button>
              </div>

              <div className="px-6 py-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {equipmentTypes.length > 0 ? (
                    equipmentTypes.map((t) => (
                      <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No equipment types found (using generic suggestions).</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apply suggestions to functional failure</label>
                  <select
                    value={suggestForFailureId}
                    onChange={(e) => setSuggestForFailureId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                    disabled={functionalFailures.length === 0}
                  >
                    <option value="" disabled>
                      {functionalFailures.length === 0 ? 'No functional failures available' : 'Select a functional failure'}
                    </option>
                    {functionalFailures.map((ff) => (
                      <option key={ff.id} value={ff.id}>
                        {ff.functionNumber}.{ff.failureLetter} — {ff.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  {suggestions.map((s, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{s.title}</div>
                          <div className="mt-2 text-sm text-gray-600">
                            Includes {s.modes.length} starter mode(s), each with suggested causes.
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            if (!suggestForFailureId) return;
                            await applySuggestion(suggestForFailureId, s);
                            setShowSuggestions(false);
                          }}
                          disabled={!suggestForFailureId}
                          className="shrink-0 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90 disabled:opacity-50"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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

function FailureModeCard({
  mode,
  prefix,
  onPatch,
  onRemove,
  onAddCause,
  onPatchCause,
  onRemoveCause,
}: {
  mode: ModeRow;
  prefix: string;
  onPatch: (patch: Partial<FailureMode>) => void;
  onRemove: () => void;
  onAddCause: () => void;
  onPatchCause: (causeId: string, patch: Partial<FailureCause>) => void;
  onRemoveCause: (causeId: string) => void;
}) {
  const modeCode = `${prefix}.${mode.modeNumber}`;

  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-navy">Failure mode</div>
          <div className="mt-1 text-sm text-gray-600">
            <span className="font-mono text-deep-teal font-semibold">{modeCode}</span>
            <span className="ml-2">(HOW it fails)</span>
          </div>
        </div>
        <button onClick={onRemove} className="text-sm text-gray-500 hover:text-red-600">
          Remove
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mode description (HOW)</label>
          <textarea
            value={mode.description}
            onChange={(e) => onPatch({ description: e.target.value })}
            placeholder="e.g., Seal fails open causing loss of containment"
            className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local effect</label>
            <textarea
              value={mode.localEffect}
              onChange={(e) => onPatch({ localEffect: e.target.value })}
              className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">System effect</label>
            <textarea
              value={mode.systemEffect}
              onChange={(e) => onPatch({ systemEffect: e.target.value })}
              className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End effect</label>
            <textarea
              value={mode.endEffect}
              onChange={(e) => onPatch({ endEffect: e.target.value })}
              className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Evidence of failure</label>
            <textarea
              value={mode.evidenceOfFailure}
              onChange={(e) => onPatch({ evidenceOfFailure: e.target.value })}
              placeholder="What proves this mode has occurred?"
              className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detection method</label>
            <textarea
              value={mode.detectionMethod}
              onChange={(e) => onPatch({ detectionMethod: e.target.value })}
              placeholder="How will we detect it (monitoring/inspection/test)?"
              className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={mode.notes ?? ''}
            onChange={(e) => onPatch({ notes: e.target.value })}
            className="w-full min-h-[70px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-navy">Failure causes</h3>
            <div className="text-xs text-gray-500">WHY the failure mode occurs (mechanism) — multiple allowed</div>
          </div>
          <button
            onClick={onAddCause}
            className="inline-flex items-center gap-2 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Cause
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {mode.causes.length === 0 ? (
            <div className="text-sm text-gray-500">No causes added yet.</div>
          ) : (
            mode.causes.map((cause, idx) => (
              <CauseCard
                key={cause.id}
                code={`${modeCode}.${toCauseLetter(idx)}`}
                cause={cause}
                onPatch={(p) => onPatchCause(cause.id, p)}
                onRemove={() => onRemoveCause(cause.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CauseCard({
  code,
  cause,
  onPatch,
  onRemove,
}: {
  code: string;
  cause: FailureCause;
  onPatch: (patch: Partial<FailureCause>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-gray-600">
          <span className="font-mono text-deep-teal font-semibold">{code}</span>
          <span className="ml-2">(WHY)</span>
        </div>
        <button onClick={onRemove} className="text-xs text-gray-500 hover:text-red-600">
          Remove
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Cause description</label>
          <input
            value={cause.description}
            onChange={(e) => onPatch({ description: e.target.value })}
            placeholder="e.g., Inadequate lubrication causes bearing wear"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Mechanism</label>
          <select
            value={cause.mechanism}
            onChange={(e) => onPatch({ mechanism: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          >
            <option value="">Select…</option>
            <option value="Wear">Wear</option>
            <option value="Corrosion">Corrosion</option>
            <option value="Fatigue">Fatigue</option>
            <option value="Erosion">Erosion</option>
            <option value="Fouling">Fouling</option>
            <option value="Contamination">Contamination</option>
            <option value="Cavitation">Cavitation</option>
            <option value="Electrical">Electrical</option>
            <option value="Thermal">Thermal</option>
            <option value="Operational">Operational</option>
            <option value="Design">Design</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-medium text-gray-600 mb-1">Contributing factors (optional)</label>
          <input
            value={cause.contributingFactors ?? ''}
            onChange={(e) => onPatch({ contributingFactors: e.target.value })}
            placeholder="e.g., Dust ingress, misalignment, poor start-up procedure"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>
      </div>
    </div>
  );
}
