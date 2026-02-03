'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { FunctionalFailure, RCMFunction } from '@/types/rcm-analysis';
import { getAnalysis } from '@/lib/rcm-api';

type Suggestion = Omit<RCMFunction, 'id' | 'functionalFailures'> & {
  functionalFailures: Array<Omit<FunctionalFailure, 'id' | 'functionId'>>;
};

function uuid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildSuggestions(equipmentTypes: string[]): Suggestion[] {
  const types = equipmentTypes.map((t) => t.toLowerCase());

  const suggestions: Suggestion[] = [];

  const isPump = types.some((t) => t.includes('pump'));
  const isMotor = types.some((t) => t.includes('motor'));
  const isHX = types.some((t) => t.includes('heat exchanger') || t.includes('shell') || t.includes('tube'));

  if (isPump) {
    suggestions.push(
      {
        functionStatement: 'Pump process fluid from suction source to discharge destination',
        performanceStandard: 'Deliver required flow and differential pressure within specified range without excessive vibration/leakage',
        context: 'Normal operating mode; within design envelope; specified fluid properties and NPSH available',
        functionalFailures: [
          { description: 'Unable to deliver required flow at required discharge pressure' },
          { description: 'Delivers flow/pressure outside required range (too low/too high/unstable)' },
          { description: 'Excessive leakage from mechanical seals or casing' },
        ],
      },
      {
        functionStatement: 'Provide containment of process fluid within pump pressure boundary',
        performanceStandard: 'No loss of containment above allowable leak rate; comply with safety/environmental requirements',
        context: 'All operating states including start-up, shutdown, and standby',
        functionalFailures: [
          { description: 'Loss of containment above allowable limit' },
          { description: 'Seal support system fails to maintain required conditions' },
        ],
      }
    );
  }

  if (isMotor) {
    suggestions.push({
      functionStatement: 'Provide mechanical power to driven equipment',
      performanceStandard: 'Deliver required torque and speed within nameplate limits; maintain acceptable temperature and current draw',
      context: 'Normal operation and start-up under expected load profile',
      functionalFailures: [
        { description: 'Fails to start when required' },
        { description: 'Trips/overheats during operation' },
        { description: 'Cannot maintain required speed/torque under load' },
      ],
    });
  }

  if (isHX) {
    suggestions.push({
      functionStatement: 'Transfer heat between process streams to achieve required outlet conditions',
      performanceStandard: 'Maintain required outlet temperature within specified tolerance at design flowrates',
      context: 'Normal operating conditions; specified fouling factor; design pressures and temperatures',
      functionalFailures: [
        { description: 'Unable to achieve required outlet temperature (insufficient heat transfer)' },
        { description: 'Excessive pressure drop across exchanger beyond allowable limit' },
        { description: 'Cross-contamination between shell/tube sides (leakage)' },
      ],
    });
  }

  // Always provide a generic suggestion if we couldn't detect anything
  if (suggestions.length === 0) {
    suggestions.push({
      functionStatement: 'Perform its primary intended function',
      performanceStandard: 'Meet required performance, capacity, and quality standards',
      context: 'Stated operating context and duty cycle',
      functionalFailures: [{ description: 'Fails to meet required performance standard' }],
    });
  }

  return suggestions;
}

export default function FunctionsPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [analysisName, setAnalysisName] = useState<string>('');
  const [systemTag, setSystemTag] = useState<string>('');
  const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);

  const [functions, setFunctions] = useState<RCMFunction[]>([]);

  const suggestions = useMemo(() => buildSuggestions(equipmentTypes), [equipmentTypes]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setLoadError(null);

        const res = await getAnalysis(id);
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
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.message ?? 'Failed to load analysis');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const addFunction = () => {
    const newFn: RCMFunction = {
      id: uuid('fn'),
      functionStatement: '',
      performanceStandard: '',
      context: '',
      functionalFailures: [],
    };
    setFunctions((prev) => [newFn, ...prev]);
  };

  const updateFunction = (fnId: string, patch: Partial<RCMFunction>) => {
    setFunctions((prev) => prev.map((f) => (f.id === fnId ? { ...f, ...patch } : f)));
  };

  const removeFunction = (fnId: string) => {
    setFunctions((prev) => prev.filter((f) => f.id !== fnId));
  };

  const addFailure = (fnId: string, description: string) => {
    if (!description.trim()) return;

    const failure: FunctionalFailure = {
      id: uuid('ff'),
      functionId: fnId,
      description: description.trim(),
    };

    setFunctions((prev) =>
      prev.map((f) => (f.id === fnId ? { ...f, functionalFailures: [...f.functionalFailures, failure] } : f))
    );
  };

  const removeFailure = (fnId: string, failureId: string) => {
    setFunctions((prev) =>
      prev.map((f) =>
        f.id === fnId
          ? { ...f, functionalFailures: f.functionalFailures.filter((ff) => ff.id !== failureId) }
          : f
      )
    );
  };

  const applySuggestion = (s: Suggestion) => {
    const fnId = uuid('fn');
    const newFn: RCMFunction = {
      id: fnId,
      functionStatement: s.functionStatement,
      performanceStandard: s.performanceStandard,
      context: s.context,
      functionalFailures: s.functionalFailures.map((ff) => ({
        id: uuid('ff'),
        functionId: fnId,
        description: ff.description,
      })),
    };

    setFunctions((prev) => [newFn, ...prev]);
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
              <Link href={`/rcm-analysis/${id}`} className="text-gray-600 hover:text-gray-900">
                {analysisName || 'Analysis'}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Functions</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSuggestions(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-industrial-amber text-slate-navy px-3 py-2 text-sm font-medium hover:opacity-90"
              >
                <span className="text-base">✨</span>
                AI Suggest
              </button>
              <button
                onClick={addFunction}
                className="inline-flex items-center gap-2 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Function
              </button>
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
          <h1 className="text-2xl font-bold text-gray-900">Functions & Functional Failures</h1>
          <p className="text-gray-600 mt-1">
            Capture JA1011-compliant function statements (what, to what standard, and in what context) and define what constitutes
            functional failure for each.
          </p>
          {systemTag && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <span className="font-mono">{systemTag}</span>
            </div>
          )}
        </div>

        {/* Guidance card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-slate-navy">JA1011 format guide</h2>
          <div className="mt-2 text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium text-gray-900">Function statement</span>: what the asset does (verb + object) and where.
            </p>
            <p>
              <span className="font-medium text-gray-900">Performance standard</span>: capacity/range/quality (e.g., flow, pressure,
              temperature, availability).
            </p>
            <p>
              <span className="font-medium text-gray-900">Operating context</span>: mode and constraints (duty, environment, start/stop,
              standby, regulatory limits).
            </p>
          </div>
        </div>

        {/* Function cards */}
        <div className="space-y-4">
          {functions.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <div className="text-gray-900 font-semibold">No functions added yet</div>
              <div className="text-sm text-gray-600 mt-1">Add a function statement, or use AI Suggest to get a starting point.</div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowSuggestions(true)}
                  className="rounded-lg bg-industrial-amber text-slate-navy px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  AI Suggest
                </button>
                <button
                  onClick={addFunction}
                  className="rounded-lg bg-deep-teal text-white px-4 py-2 text-sm font-medium hover:bg-deep-teal/90"
                >
                  Add Function
                </button>
              </div>
            </div>
          ) : (
            functions.map((fn) => (
              <FunctionCard
                key={fn.id}
                fn={fn}
                onChange={(patch) => updateFunction(fn.id, patch)}
                onRemove={() => removeFunction(fn.id)}
                onAddFailure={(desc) => addFailure(fn.id, desc)}
                onRemoveFailure={(failureId) => removeFailure(fn.id, failureId)}
              />
            ))
          )}
        </div>

        {/* Suggestions modal */}
        {showSuggestions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <div className="text-base font-semibold text-gray-900">AI function suggestions</div>
                  <div className="text-sm text-gray-600 mt-0.5">
                    Suggestions are generated from equipment types in your boundary definition.
                  </div>
                </div>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
              </div>

              <div className="px-6 py-4">
                {!user && (
                  <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    You are not signed in. Suggestions still work, but you won’t be able to save this analysis to the database.
                  </div>
                )}

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

                <div className="space-y-3">
                  {suggestions.map((s, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{s.functionStatement}</div>
                          <div className="mt-1 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Standard:</span> {s.performanceStandard}
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Context:</span> {s.context}
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-medium text-gray-500">Functional failures</div>
                            <ul className="list-disc ml-5 mt-1 text-sm text-gray-600 space-y-1">
                              {s.functionalFailures.map((ff, i) => (
                                <li key={i}>{ff.description}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <button
                          onClick={() => applySuggestion(s)}
                          className="shrink-0 rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
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

function FunctionCard({
  fn,
  onChange,
  onRemove,
  onAddFailure,
  onRemoveFailure,
}: {
  fn: RCMFunction;
  onChange: (patch: Partial<RCMFunction>) => void;
  onRemove: () => void;
  onAddFailure: (desc: string) => void;
  onRemoveFailure: (failureId: string) => void;
}) {
  const [newFailure, setNewFailure] = useState('');

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-navy">Function</div>
          <div className="text-xs text-gray-500">JA1011 format: statement + standard + context</div>
        </div>
        <button onClick={onRemove} className="text-sm text-gray-500 hover:text-red-600">
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Function statement</label>
          <textarea
            value={fn.functionStatement}
            onChange={(e) => onChange({ functionStatement: e.target.value })}
            placeholder="e.g., Pump cooling water from basin to headers"
            className="w-full min-h-[80px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Performance standard</label>
          <textarea
            value={fn.performanceStandard}
            onChange={(e) => onChange({ performanceStandard: e.target.value })}
            placeholder="e.g., 250 m³/h at 4.5 barg ±5% with vibration < 6 mm/s"
            className="w-full min-h-[80px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Operating context</label>
          <textarea
            value={fn.context}
            onChange={(e) => onChange({ context: e.target.value })}
            placeholder="e.g., Continuous duty, indoor controlled environment, automatic standby switchover"
            className="w-full min-h-[80px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-navy">Functional failures</h3>
          <span className="text-xs text-gray-500">Define what constitutes failure of this function</span>
        </div>

        <div className="mt-3 space-y-2">
          {fn.functionalFailures.length === 0 ? (
            <div className="text-sm text-gray-500">No functional failures added yet.</div>
          ) : (
            fn.functionalFailures.map((ff) => (
              <div key={ff.id} className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-3">
                <div className="text-sm text-gray-700 flex-1">{ff.description}</div>
                <button
                  onClick={() => onRemoveFailure(ff.id)}
                  className="text-xs text-gray-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            value={newFailure}
            onChange={(e) => setNewFailure(e.target.value)}
            placeholder="Add a functional failure (e.g., cannot maintain required flow)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
          />
          <button
            onClick={() => {
              onAddFailure(newFailure);
              setNewFailure('');
            }}
            className="rounded-lg bg-deep-teal text-white px-3 py-2 text-sm font-medium hover:bg-deep-teal/90"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
