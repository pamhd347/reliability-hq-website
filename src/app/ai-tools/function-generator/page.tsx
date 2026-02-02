'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GeneratedFunction {
  primary: string;
  secondary: string[];
  protective: string[];
  tips: string[];
}

// Equipment type templates with common functions
const equipmentTemplates: Record<string, {
  primaryTemplate: string;
  secondaryTemplates: string[];
  protectiveTemplates: string[];
  tips: string[];
}> = {
  pump: {
    primaryTemplate: 'To transfer {fluid} from {source} to {destination} at {flowRate} at {pressure}',
    secondaryTemplates: [
      'To contain {fluid} (no external leakage)',
      'To operate within acceptable noise levels (below {noiseLevel})',
      'To be capable of starting within {startTime} of demand',
    ],
    protectiveTemplates: [
      'To stop automatically on high temperature (above {tempLimit})',
      'To stop automatically on low suction pressure (below {pressureLimit})',
    ],
    tips: [
      'Always include flow rate AND pressure in pump functions',
      'Specify source and destination clearly',
      'Consider startup requirements separately from running requirements',
    ],
  },
  motor: {
    primaryTemplate: 'To provide rotational power to {drivenEquipment} at {speed} delivering {power}',
    secondaryTemplates: [
      'To contain electrical hazards (no exposed live parts)',
      'To operate within acceptable temperature limits (below {tempLimit})',
      'To be capable of starting within {startTime} under load',
    ],
    protectiveTemplates: [
      'To trip automatically on overcurrent (above {currentLimit})',
      'To trip automatically on high winding temperature (above {tempLimit})',
    ],
    tips: [
      'Include speed (RPM) and power (kW) in motor functions',
      'Consider variable speed requirements if VFD-driven',
      'Startup conditions may differ from running conditions',
    ],
  },
  valve: {
    primaryTemplate: 'To {action} flow of {fluid} in {system} {controlType}',
    secondaryTemplates: [
      'To contain {fluid} (no external leakage through packing)',
      'To provide position indication to {system}',
      'To be capable of {action} within {responseTime}',
    ],
    protectiveTemplates: [
      'To fail to {failPosition} position on loss of {signal}',
      'To relieve pressure above {setPoint} to protect {equipment}',
    ],
    tips: [
      'Specify whether isolation, control, or relief valve',
      'Include fail-safe position for control valves',
      'Relief valves: specify set pressure and capacity',
    ],
  },
  compressor: {
    primaryTemplate: 'To compress {gas} from {inletPressure} to {dischargePressure} at {flowRate}',
    secondaryTemplates: [
      'To contain {gas} (no external leakage)',
      'To deliver gas at acceptable temperature (below {tempLimit})',
      'To operate within acceptable vibration levels',
    ],
    protectiveTemplates: [
      'To trip automatically on high discharge temperature (above {tempLimit})',
      'To trip automatically on high vibration (above {vibrationLimit})',
      'To prevent reverse flow on shutdown',
    ],
    tips: [
      'Include both suction and discharge pressures',
      'Specify flow rate in appropriate units (m³/hr, SCFM)',
      'Consider recycle/anti-surge requirements',
    ],
  },
  heatExchanger: {
    primaryTemplate: 'To transfer heat from {hotSide} to {coldSide} achieving {tempChange}',
    secondaryTemplates: [
      'To contain {fluid} on {side} side (no external leakage)',
      'To contain {fluid} on {side} side (no cross-contamination)',
      'To operate within acceptable pressure drop (below {pressureDrop})',
    ],
    protectiveTemplates: [
      'To relieve pressure above {setPoint} on {side} side',
    ],
    tips: [
      'Specify heat duty (kW) or temperature change',
      'Consider both tube-side and shell-side containment',
      'Cross-contamination may be a critical function',
    ],
  },
  generic: {
    primaryTemplate: 'To {action} {object} {performanceStandard}',
    secondaryTemplates: [
      'To contain {contents} (no external leakage)',
      'To provide indication of {parameter} to {system}',
      'To operate within acceptable {parameter} levels',
    ],
    protectiveTemplates: [
      'To {action} automatically when {condition}',
      'To prevent {hazard} under {condition}',
    ],
    tips: [
      'Start function statements with "To" followed by a verb',
      'Always include quantified performance standards where possible',
      'Separate primary, secondary, and protective functions',
    ],
  },
};

export default function FunctionGeneratorPage() {
  const [step, setStep] = useState(1);
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [generatedFunctions, setGeneratedFunctions] = useState<GeneratedFunction | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const equipmentTypes = [
    { value: 'pump', label: 'Pump' },
    { value: 'motor', label: 'Electric Motor' },
    { value: 'valve', label: 'Valve' },
    { value: 'compressor', label: 'Compressor' },
    { value: 'heatExchanger', label: 'Heat Exchanger' },
    { value: 'generic', label: 'Other Equipment' },
  ];

  const parameterQuestions: Record<string, { key: string; label: string; placeholder: string }[]> = {
    pump: [
      { key: 'fluid', label: 'What fluid does it pump?', placeholder: 'e.g., cooling water, crude oil, process fluid' },
      { key: 'source', label: 'Where does it pump FROM?', placeholder: 'e.g., storage tank T-101, main sump' },
      { key: 'destination', label: 'Where does it pump TO?', placeholder: 'e.g., heat exchanger headers, process vessel' },
      { key: 'flowRate', label: 'What flow rate is required?', placeholder: 'e.g., 450-550 m³/hr, 100 GPM minimum' },
      { key: 'pressure', label: 'What discharge pressure is required?', placeholder: 'e.g., 3.0-3.5 bar, 50 psi minimum' },
    ],
    motor: [
      { key: 'drivenEquipment', label: 'What equipment does it drive?', placeholder: 'e.g., pump P-101, compressor C-201' },
      { key: 'speed', label: 'What speed is required?', placeholder: 'e.g., 1480 RPM, 3600 RPM' },
      { key: 'power', label: 'What power output?', placeholder: 'e.g., 75 kW, 100 HP' },
    ],
    valve: [
      { key: 'action', label: 'What action does it perform?', placeholder: 'e.g., isolate, regulate, relieve' },
      { key: 'fluid', label: 'What fluid does it handle?', placeholder: 'e.g., steam, cooling water, nitrogen' },
      { key: 'system', label: 'What system is it part of?', placeholder: 'e.g., feed water system, fuel gas system' },
      { key: 'controlType', label: 'How is it controlled?', placeholder: 'e.g., on demand, automatically based on level' },
    ],
    compressor: [
      { key: 'gas', label: 'What gas does it compress?', placeholder: 'e.g., air, nitrogen, natural gas' },
      { key: 'inletPressure', label: 'What is the inlet pressure?', placeholder: 'e.g., atmospheric, 2 bar' },
      { key: 'dischargePressure', label: 'What discharge pressure is required?', placeholder: 'e.g., 7 bar, 150 psi' },
      { key: 'flowRate', label: 'What flow rate is required?', placeholder: 'e.g., 500 m³/hr, 1000 SCFM' },
    ],
    heatExchanger: [
      { key: 'hotSide', label: 'What is the hot side fluid?', placeholder: 'e.g., process fluid at 150°C, steam' },
      { key: 'coldSide', label: 'What is the cold side fluid?', placeholder: 'e.g., cooling water, process feed' },
      { key: 'tempChange', label: 'What temperature change is required?', placeholder: 'e.g., cool process from 150°C to 40°C' },
    ],
    generic: [
      { key: 'action', label: 'What action does it perform?', placeholder: 'e.g., store, separate, filter' },
      { key: 'object', label: 'What does it act on?', placeholder: 'e.g., process fluid, compressed air' },
      { key: 'performanceStandard', label: 'What performance standard?', placeholder: 'e.g., at 95% efficiency, within 5 minutes' },
    ],
  };

  const generateFunctions = () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const template = equipmentTemplates[equipmentType] || equipmentTemplates.generic;
      
      // Generate primary function by filling in template
      let primary = template.primaryTemplate;
      Object.entries(parameters).forEach(([key, value]) => {
        primary = primary.replace(`{${key}}`, value || `[${key}]`);
      });

      // Generate secondary functions
      const secondary = template.secondaryTemplates.map(t => {
        let func = t;
        Object.entries(parameters).forEach(([key, value]) => {
          func = func.replace(`{${key}}`, value || `[specify]`);
        });
        // Replace any remaining placeholders
        func = func.replace(/\{[^}]+\}/g, '[specify]');
        return func;
      });

      // Generate protective functions
      const protective = template.protectiveTemplates.map(t => {
        let func = t;
        Object.entries(parameters).forEach(([key, value]) => {
          func = func.replace(`{${key}}`, value || `[specify]`);
        });
        func = func.replace(/\{[^}]+\}/g, '[specify]');
        return func;
      });

      setGeneratedFunctions({
        primary,
        secondary,
        protective,
        tips: template.tips,
      });
      setIsGenerating(false);
      setStep(3);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllFunctions = () => {
    if (!generatedFunctions) return;
    
    const allText = `PRIMARY FUNCTION:
${generatedFunctions.primary}

SECONDARY FUNCTIONS:
${generatedFunctions.secondary.map((f, i) => `${i + 1}. ${f}`).join('\n')}

PROTECTIVE FUNCTIONS:
${generatedFunctions.protective.map((f, i) => `${i + 1}. ${f}`).join('\n')}`;
    
    navigator.clipboard.writeText(allText);
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
            <span className="text-sm text-mid-grey">Step {step} of 3</span>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy">Function Statement Generator</h1>
            <p className="text-mid-grey mt-2">Generate properly formatted RCM function statements</p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full ${s <= step ? 'bg-deep-teal' : 'bg-light-grey'}`} />
              </div>
            ))}
          </div>

          {/* Step 1: Select Equipment Type */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-xl font-semibold text-slate-navy mb-2">
                What type of equipment?
              </h2>
              <p className="text-mid-grey mb-6">
                Select the equipment type to get tailored function templates.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {equipmentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEquipmentType(type.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      equipmentType === type.value
                        ? 'border-deep-teal bg-deep-teal/5'
                        : 'border-light-grey hover:border-mid-grey'
                    }`}
                  >
                    <span className={`font-medium ${
                      equipmentType === type.value ? 'text-deep-teal' : 'text-charcoal'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Equipment description (optional)
                </label>
                <textarea
                  value={equipmentDescription}
                  onChange={(e) => setEquipmentDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  rows={3}
                  placeholder="e.g., Horizontal centrifugal pump, 75 kW motor, mechanical seal, used for cooling water supply to heat exchangers"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!equipmentType}
                className="w-full mt-6 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Enter Parameters */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-xl font-semibold text-slate-navy mb-2">
                Define the performance requirements
              </h2>
              <p className="text-mid-grey mb-6">
                Answer these questions to generate accurate function statements.
              </p>

              <div className="space-y-4">
                {parameterQuestions[equipmentType]?.map((q) => (
                  <div key={q.key}>
                    <label className="block text-sm font-medium text-charcoal mb-1">
                      {q.label}
                    </label>
                    <input
                      type="text"
                      value={parameters[q.key] || ''}
                      onChange={(e) => setParameters({ ...parameters, [q.key]: e.target.value })}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                      placeholder={q.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={generateFunctions}
                  disabled={isGenerating}
                  className="flex-1 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors disabled:opacity-50"
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
                    'Generate Functions'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && generatedFunctions && (
            <div className="space-y-6">
              {/* Primary Function */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-lg text-slate-navy flex items-center gap-2">
                    <span className="w-6 h-6 bg-deep-teal text-white rounded-full flex items-center justify-center text-sm">1</span>
                    Primary Function
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedFunctions.primary)}
                    className="text-sm text-deep-teal hover:underline flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="bg-deep-teal/5 border border-deep-teal/20 rounded-lg p-4">
                  <p className="text-charcoal font-medium">{generatedFunctions.primary}</p>
                </div>
              </div>

              {/* Secondary Functions */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-industrial-amber text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Secondary Functions
                </h3>
                <div className="space-y-2">
                  {generatedFunctions.secondary.map((func, i) => (
                    <div key={i} className="bg-off-white rounded-lg p-3 flex items-start justify-between gap-2">
                      <p className="text-charcoal text-sm">{func}</p>
                      <button
                        onClick={() => copyToClipboard(func)}
                        className="text-mid-grey hover:text-deep-teal flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protective Functions */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-slate-navy text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Protective Functions
                </h3>
                <div className="space-y-2">
                  {generatedFunctions.protective.map((func, i) => (
                    <div key={i} className="bg-off-white rounded-lg p-3 flex items-start justify-between gap-2">
                      <p className="text-charcoal text-sm">{func}</p>
                      <button
                        onClick={() => copyToClipboard(func)}
                        className="text-mid-grey hover:text-deep-teal flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-industrial-amber/10 border border-industrial-amber/20 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-slate-navy flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  Tips for This Equipment Type
                </h3>
                <ul className="space-y-2">
                  {generatedFunctions.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                      <svg className="w-4 h-4 text-industrial-amber flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setEquipmentType('');
                    setParameters({});
                    setGeneratedFunctions(null);
                  }}
                  className="flex-1 px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={copyAllFunctions}
                  className="flex-1 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy All Functions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
