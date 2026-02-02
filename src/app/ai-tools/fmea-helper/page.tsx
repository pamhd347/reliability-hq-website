'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FMEARow {
  failureMode: string;
  potentialCauses: string[];
  localEffects: string;
  systemEffects: string;
  endEffects: string;
  detectionMethods: string[];
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
  recommendedActions: string[];
}

// Templates for common failure modes
const failureModeTemplates: Record<string, Partial<FMEARow>> = {
  // Bearing failures
  'bearing fails': {
    potentialCauses: [
      'Lubrication failure (insufficient, contaminated, or wrong lubricant)',
      'Fatigue (normal wear, excessive load)',
      'Misalignment (installation error, thermal growth)',
      'Contamination (dirt, water ingress)',
      'Electrical pitting (VFD-induced shaft currents)',
    ],
    localEffects: 'Increased vibration, elevated temperature, audible noise',
    systemEffects: 'Equipment performance degradation, potential secondary damage to seals and coupling',
    endEffects: 'Unplanned shutdown, production loss, potential safety hazard from rotating equipment failure',
    detectionMethods: [
      'Vibration monitoring (velocity and acceleration)',
      'Temperature monitoring',
      'Oil analysis (wear particles)',
      'Ultrasonic monitoring',
      'Operator rounds (noise, temperature by touch)',
    ],
  },
  'seal leaks': {
    potentialCauses: [
      'Seal face wear (normal wear, dry running)',
      'Seal face damage (thermal shock, particulates)',
      'Incorrect installation',
      'Shaft runout or vibration',
      'Process upset (pressure spike, temperature excursion)',
    ],
    localEffects: 'External leakage, loss of seal flush fluid',
    systemEffects: 'Environmental contamination, potential fire/safety hazard depending on fluid',
    endEffects: 'Equipment shutdown required, environmental cleanup, potential injury if hazardous fluid',
    detectionMethods: [
      'Visual inspection of seal area',
      'Seal temperature monitoring',
      'Seal flush flow monitoring',
      'Fugitive emissions monitoring',
      'Leak detection systems',
    ],
  },
  'motor fails to start': {
    potentialCauses: [
      'Power supply failure (breaker tripped, fuse blown)',
      'Control circuit fault (contactor failure, interlock)',
      'Motor protection trip (overload, ground fault)',
      'Mechanical binding (seized bearing, coupling)',
      'VFD fault (for VFD-driven motors)',
    ],
    localEffects: 'Motor does not rotate when commanded',
    systemEffects: 'Driven equipment unavailable, backup systems may start',
    endEffects: 'Production impact if no redundancy, potential safety consequence if critical service',
    detectionMethods: [
      'Start command feedback (motor running status)',
      'Current monitoring (no current draw)',
      'Protection relay status',
      'Operator observation',
      'SCADA/DCS alarms',
    ],
  },
  'valve fails to operate': {
    potentialCauses: [
      'Actuator failure (diaphragm rupture, spring break)',
      'Air supply failure (blocked line, regulator failure)',
      'Positioner fault (calibration drift, electronics)',
      'Mechanical binding (packing overtight, corrosion)',
      'Stem damage or galling',
    ],
    localEffects: 'Valve stuck in current position, no response to signal',
    systemEffects: 'Loss of process control, potential upset condition',
    endEffects: 'Process deviation, potential safety consequence for critical valves',
    detectionMethods: [
      'Position feedback vs command',
      'Valve signature testing',
      'Air consumption monitoring',
      'Operator observation',
      'Control system deviation alarms',
    ],
  },
  'pump cavitates': {
    potentialCauses: [
      'Insufficient NPSH available (low suction pressure)',
      'Suction strainer blocked',
      'High fluid temperature',
      'Air ingress on suction side',
      'Operating too far from BEP',
    ],
    localEffects: 'Noise, vibration, reduced flow, impeller damage',
    systemEffects: 'Reduced system flow, downstream process effects',
    endEffects: 'Production impact, accelerated pump damage, potential pump failure',
    detectionMethods: [
      'Noise detection (cavitation signature)',
      'Vibration analysis',
      'Discharge pressure/flow monitoring',
      'Suction pressure monitoring',
      'Performance trending',
    ],
  },
  'heat exchanger fouled': {
    potentialCauses: [
      'Scaling (hard water, chemical precipitation)',
      'Biological growth (cooling water systems)',
      'Particulate accumulation',
      'Corrosion products',
      'Process-side deposits',
    ],
    localEffects: 'Reduced heat transfer coefficient, increased pressure drop',
    systemEffects: 'Insufficient cooling/heating, process temperature deviation',
    endEffects: 'Production rate reduction, quality issues, equipment damage from overheating',
    detectionMethods: [
      'Temperature differential monitoring',
      'Pressure drop trending',
      'Heat transfer coefficient calculation',
      'Visual inspection (if accessible)',
      'Performance testing',
    ],
  },
  'instrument reads incorrectly': {
    potentialCauses: [
      'Calibration drift',
      'Sensing element failure',
      'Process connection blocked (impulse line)',
      'Environmental effects (temperature, vibration)',
      'Electrical interference',
    ],
    localEffects: 'Incorrect reading displayed/transmitted',
    systemEffects: 'Control system uses wrong value, potential control upset',
    endEffects: 'Process deviation, potential safety consequence if safety-critical instrument',
    detectionMethods: [
      'Comparison with redundant instruments',
      'Calibration checks',
      'Process mass balance cross-check',
      'Operator observation of process behavior',
      'Diagnostic alerts',
    ],
  },
};

export default function FMEAHelperPage() {
  const [failureMode, setFailureMode] = useState('');
  const [equipment, setEquipment] = useState('');
  const [generatedRow, setGeneratedRow] = useState<FMEARow | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  const suggestions = Object.keys(failureModeTemplates);

  const generateFMEARow = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Find matching template
      const lowerFailure = failureMode.toLowerCase();
      let template: Partial<FMEARow> | null = null;
      
      for (const [key, value] of Object.entries(failureModeTemplates)) {
        if (lowerFailure.includes(key) || key.includes(lowerFailure.split(' ')[0])) {
          template = value;
          break;
        }
      }

      // Use generic template if no match
      if (!template) {
        template = {
          potentialCauses: [
            'Normal wear and degradation',
            'Operating outside design parameters',
            'Inadequate maintenance',
            'Material or manufacturing defect',
            'Environmental factors',
          ],
          localEffects: 'Component fails to perform intended function',
          systemEffects: 'System performance degraded or function lost',
          endEffects: 'Operational impact, potential safety or environmental consequence',
          detectionMethods: [
            'Operator observation',
            'Condition monitoring',
            'Performance testing',
            'Inspection',
            'Alarms and instrumentation',
          ],
        };
      }

      const row: FMEARow = {
        failureMode: failureMode,
        potentialCauses: template.potentialCauses || [],
        localEffects: template.localEffects || '',
        systemEffects: template.systemEffects || '',
        endEffects: template.endEffects || '',
        detectionMethods: template.detectionMethods || [],
        severity: 0,
        occurrence: 0,
        detection: 0,
        rpn: 0,
        recommendedActions: [
          'Review current maintenance strategy',
          'Consider condition monitoring if not in place',
          'Evaluate spares availability',
          'Update procedures if needed',
        ],
      };

      setGeneratedRow(row);
      setIsGenerating(false);
    }, 1200);
  };

  const copyAsText = () => {
    if (!generatedRow) return;
    
    const text = `FMEA ROW DATA

Equipment: ${equipment || '[Not specified]'}
Failure Mode: ${generatedRow.failureMode}

POTENTIAL CAUSES:
${generatedRow.potentialCauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

FAILURE EFFECTS:
- Local Effects: ${generatedRow.localEffects}
- System Effects: ${generatedRow.systemEffects}
- End Effects: ${generatedRow.endEffects}

DETECTION METHODS:
${generatedRow.detectionMethods.map((d, i) => `${i + 1}. ${d}`).join('\n')}

RECOMMENDED ACTIONS:
${generatedRow.recommendedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

---
Note: Severity, Occurrence, and Detection ratings should be assigned based on your organization's criteria and operating context.`;
    
    navigator.clipboard.writeText(text);
  };

  const copyAsCSV = () => {
    if (!generatedRow) return;
    
    const csv = `Equipment,Failure Mode,Potential Causes,Local Effects,System Effects,End Effects,Detection Methods,Recommended Actions
"${equipment || ''}","${generatedRow.failureMode}","${generatedRow.potentialCauses.join('; ')}","${generatedRow.localEffects}","${generatedRow.systemEffects}","${generatedRow.endEffects}","${generatedRow.detectionMethods.join('; ')}","${generatedRow.recommendedActions.join('; ')}"`;
    
    navigator.clipboard.writeText(csv);
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-white border-b border-light-grey">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/ai-tools" 
              className="flex items-center gap-2 text-mid-grey hover:text-deep-teal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-sm font-medium">Back to AI Tools</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-industrial-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy">FMEA Row Helper</h1>
            <p className="text-mid-grey mt-2">Generate causes, effects, and detection methods for your FMEA</p>
          </div>

          {/* Input Section */}
          {!generatedRow && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
              <h2 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                Describe the Failure Mode
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Equipment (optional)
                  </label>
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                    placeholder="e.g., Cooling water pump P-101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Failure Mode *
                  </label>
                  <input
                    type="text"
                    value={failureMode}
                    onChange={(e) => setFailureMode(e.target.value)}
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                    placeholder="e.g., Bearing fails due to fatigue"
                  />
                </div>

                <div>
                  <span className="text-sm text-mid-grey">Quick suggestions:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFailureMode(s.charAt(0).toUpperCase() + s.slice(1))}
                        className="text-xs px-3 py-1.5 bg-off-white rounded-full text-mid-grey hover:bg-deep-teal hover:text-white transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={generateFMEARow}
                disabled={!failureMode.trim() || isGenerating}
                className="w-full mt-6 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate FMEA Row'
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {generatedRow && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey overflow-hidden">
                <div className="bg-slate-navy px-6 py-4">
                  <p className="text-white/70 text-sm">{equipment || 'Equipment'}</p>
                  <h2 className="font-heading text-xl font-bold text-white">
                    {generatedRow.failureMode}
                  </h2>
                </div>
              </div>

              {/* Potential Causes */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">C</span>
                  Potential Causes
                </h3>
                <ul className="space-y-2">
                  {generatedRow.potentialCauses.map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-off-white rounded-lg">
                      <span className="w-6 h-6 bg-red-500/10 text-red-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-charcoal">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Effects */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">E</span>
                  Failure Effects
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-off-white rounded-lg">
                    <span className="text-sm font-medium text-mid-grey block mb-1">Local Effects</span>
                    <p className="text-charcoal">{generatedRow.localEffects}</p>
                  </div>
                  <div className="p-4 bg-off-white rounded-lg">
                    <span className="text-sm font-medium text-mid-grey block mb-1">System Effects</span>
                    <p className="text-charcoal">{generatedRow.systemEffects}</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-sm font-medium text-amber-700 block mb-1">End Effects (Consequences)</span>
                    <p className="text-charcoal">{generatedRow.endEffects}</p>
                  </div>
                </div>
              </div>

              {/* Detection Methods */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">D</span>
                  Detection Methods
                </h3>
                <ul className="space-y-2">
                  {generatedRow.detectionMethods.map((method, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-off-white rounded-lg">
                      <span className="w-6 h-6 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-charcoal">{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RPN Notice */}
              <div className="bg-industrial-amber/10 border border-industrial-amber/20 rounded-xl p-4">
                <p className="text-sm text-charcoal">
                  <strong>Note:</strong> Severity, Occurrence, and Detection ratings should be assigned based on your organization&apos;s criteria and the specific operating context. This tool provides the qualitative content; you determine the quantitative ratings.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setGeneratedRow(null);
                    setFailureMode('');
                    setEquipment('');
                  }}
                  className="flex-1 min-w-[150px] px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={copyAsText}
                  className="flex-1 min-w-[150px] bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy as Text
                </button>
                <button
                  onClick={copyAsCSV}
                  className="flex-1 min-w-[150px] bg-slate-navy text-white py-3 px-4 rounded-lg font-semibold hover:bg-deep-teal transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Copy as CSV
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
