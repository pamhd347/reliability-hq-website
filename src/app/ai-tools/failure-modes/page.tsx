'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FailureMode {
  mode: string;
  cause: string;
  effect: string;
  pfInterval: string;
  detection: string;
}

interface ComponentFailureModes {
  component: string;
  modes: FailureMode[];
}

// Comprehensive failure mode database
const failureModeDatabase: Record<string, ComponentFailureModes[]> = {
  'centrifugal-pump': [
    {
      component: 'Impeller',
      modes: [
        { mode: 'Impeller eroded', cause: 'Abrasive particles in fluid, cavitation', effect: 'Reduced flow rate and head, increased vibration', pfInterval: '2-6 months', detection: 'Performance monitoring, vibration analysis' },
        { mode: 'Impeller corroded', cause: 'Chemical attack, incompatible materials', effect: 'Reduced efficiency, eventual failure', pfInterval: '3-12 months', detection: 'Visual inspection, performance trending' },
        { mode: 'Impeller cracked/broken', cause: 'Fatigue, thermal shock, foreign object', effect: 'Sudden loss of pumping, severe vibration', pfInterval: 'Days to weeks', detection: 'Vibration spike, noise change' },
      ],
    },
    {
      component: 'Mechanical Seal',
      modes: [
        { mode: 'Seal faces worn', cause: 'Normal wear, dry running, contamination', effect: 'Increasing leakage over time', pfInterval: '2-8 weeks', detection: 'Visual inspection, leakage monitoring' },
        { mode: 'Seal fails catastrophically', cause: 'Thermal shock, pressure spike, installation error', effect: 'Major external leakage, pump shutdown', pfInterval: 'Hours to days', detection: 'Sudden leakage, seal temperature rise' },
        { mode: 'Seal springs weakened', cause: 'Fatigue, corrosion, high temperature', effect: 'Reduced seal face pressure, leakage', pfInterval: '1-3 months', detection: 'Increasing leakage rate' },
      ],
    },
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing worn due to fatigue', cause: 'Normal wear, excessive load, misalignment', effect: 'Increased vibration, noise, eventual seizure', pfInterval: '2-8 weeks', detection: 'Vibration analysis, temperature monitoring' },
        { mode: 'Bearing fails due to lubrication failure', cause: 'Insufficient lubricant, wrong lubricant, contamination', effect: 'Rapid wear, overheating, seizure', pfInterval: 'Days to 2 weeks', detection: 'Temperature rise, vibration increase' },
        { mode: 'Bearing damaged during installation', cause: 'Improper handling, incorrect fit, contamination', effect: 'Premature failure, early wear patterns', pfInterval: '1-6 months', detection: 'Early vibration signature changes' },
      ],
    },
    {
      component: 'Shaft',
      modes: [
        { mode: 'Shaft bent', cause: 'Thermal distortion, mechanical overload, improper handling', effect: 'Vibration, seal problems, bearing wear', pfInterval: '1-4 weeks after event', detection: 'Vibration analysis, runout measurement' },
        { mode: 'Shaft fatigue failure', cause: 'Cyclic loading, stress concentration, corrosion', effect: 'Catastrophic failure', pfInterval: 'Weeks to months', detection: 'Vibration changes, crack detection (rare)' },
      ],
    },
    {
      component: 'Casing',
      modes: [
        { mode: 'Casing eroded', cause: 'Abrasive wear, cavitation', effect: 'Reduced efficiency, potential leakage', pfInterval: '6-24 months', detection: 'Performance monitoring, wall thickness measurement' },
        { mode: 'Casing cracked', cause: 'Thermal stress, water hammer, external impact', effect: 'External leakage, structural failure risk', pfInterval: 'Variable', detection: 'Visual inspection, leak detection' },
      ],
    },
    {
      component: 'Motor/Drive',
      modes: [
        { mode: 'Motor winding failure', cause: 'Insulation breakdown, overheating, contamination', effect: 'Motor trips, pump stops', pfInterval: '1-4 weeks', detection: 'Insulation testing, temperature monitoring, current analysis' },
        { mode: 'Motor bearing failure', cause: 'Lubrication failure, fatigue, electrical pitting', effect: 'Increased noise, overheating, seizure', pfInterval: '2-6 weeks', detection: 'Vibration analysis, temperature monitoring' },
      ],
    },
  ],
  'electric-motor': [
    {
      component: 'Stator Windings',
      modes: [
        { mode: 'Winding insulation breakdown', cause: 'Age, overheating, contamination, voltage spikes', effect: 'Phase-to-phase or phase-to-ground fault, motor trips', pfInterval: '2-8 weeks', detection: 'Insulation resistance testing, partial discharge monitoring' },
        { mode: 'Winding short circuit', cause: 'Insulation failure, contamination, mechanical damage', effect: 'Immediate trip, possible fire', pfInterval: 'Hours to days', detection: 'Current imbalance, protection trip' },
        { mode: 'Winding overheated', cause: 'Overload, poor ventilation, high ambient temperature', effect: 'Accelerated insulation degradation', pfInterval: '1-6 months', detection: 'Temperature monitoring, thermal imaging' },
      ],
    },
    {
      component: 'Rotor',
      modes: [
        { mode: 'Rotor bar cracked/broken', cause: 'Thermal cycling, manufacturing defect, frequent starts', effect: 'Reduced torque, increased current, overheating', pfInterval: '1-6 months', detection: 'Current signature analysis, vibration analysis' },
        { mode: 'Rotor eccentricity', cause: 'Bearing wear, shaft bow, manufacturing tolerance', effect: 'Uneven air gap, vibration, localized heating', pfInterval: '2-8 weeks', detection: 'Vibration analysis, current analysis' },
      ],
    },
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing worn', cause: 'Fatigue, lubrication issues, contamination', effect: 'Vibration, noise, eventual seizure', pfInterval: '2-8 weeks', detection: 'Vibration analysis, temperature monitoring' },
        { mode: 'Bearing electrical pitting', cause: 'Shaft currents (especially VFD-driven)', effect: 'Premature bearing failure, noise', pfInterval: '1-6 months', detection: 'High-frequency vibration, bearing inspection' },
      ],
    },
    {
      component: 'Cooling System',
      modes: [
        { mode: 'Cooling fan damaged', cause: 'Fatigue, foreign object, corrosion', effect: 'Reduced cooling, motor overheating', pfInterval: '1-4 weeks', detection: 'Visual inspection, temperature rise, noise' },
        { mode: 'Air passages blocked', cause: 'Dust accumulation, debris', effect: 'Reduced airflow, overheating', pfInterval: '2-8 weeks', detection: 'Temperature monitoring, visual inspection' },
      ],
    },
    {
      component: 'Terminal Box',
      modes: [
        { mode: 'Connection loose', cause: 'Vibration, thermal cycling, improper installation', effect: 'Overheating, arcing, eventual failure', pfInterval: '1-4 weeks', detection: 'Thermal imaging, resistance testing' },
        { mode: 'Terminal corrosion', cause: 'Moisture ingress, chemical exposure', effect: 'High resistance, overheating', pfInterval: '1-6 months', detection: 'Visual inspection, thermal imaging' },
      ],
    },
  ],
  'control-valve': [
    {
      component: 'Valve Body',
      modes: [
        { mode: 'Body eroded', cause: 'Abrasive particles, high velocity, cavitation', effect: 'Reduced control accuracy, potential external leakage', pfInterval: '6-24 months', detection: 'Wall thickness measurement, leak testing' },
        { mode: 'Body corroded', cause: 'Chemical attack, wrong material selection', effect: 'Wall thinning, potential failure', pfInterval: '6-36 months', detection: 'Visual inspection, wall thickness measurement' },
      ],
    },
    {
      component: 'Trim (Plug & Seat)',
      modes: [
        { mode: 'Plug/seat worn', cause: 'Erosion, cavitation, normal wear', effect: 'Valve leaks through when closed, poor control', pfInterval: '3-12 months', detection: 'Valve signature testing, seat leakage test' },
        { mode: 'Trim cavitation damage', cause: 'High pressure drop, flashing', effect: 'Rapid trim erosion, noise, vibration', pfInterval: '1-6 months', detection: 'Noise increase, valve signature change' },
      ],
    },
    {
      component: 'Packing',
      modes: [
        { mode: 'Packing worn/leaking', cause: 'Normal wear, stem scoring, over-tightening', effect: 'External leakage along stem', pfInterval: '2-8 weeks', detection: 'Visual inspection, fugitive emissions monitoring' },
        { mode: 'Packing overtightened', cause: 'Attempt to stop leak, improper adjustment', effect: 'High friction, actuator strain, control issues', pfInterval: 'Immediate to weeks', detection: 'Valve response testing, actuator load' },
      ],
    },
    {
      component: 'Actuator',
      modes: [
        { mode: 'Diaphragm ruptured', cause: 'Age, over-pressure, chemical attack', effect: 'Loss of control, valve fails to position', pfInterval: 'Hours to days', detection: 'Air consumption increase, position error' },
        { mode: 'Actuator spring broken', cause: 'Fatigue, corrosion', effect: 'Loss of fail-safe function', pfInterval: 'Sudden', detection: 'Stroke testing, valve signature test' },
        { mode: 'Air supply line blocked', cause: 'Moisture, contamination, corrosion', effect: 'Slow response, loss of control', pfInterval: '1-4 weeks', detection: 'Response time testing' },
      ],
    },
    {
      component: 'Positioner',
      modes: [
        { mode: 'Positioner out of calibration', cause: 'Drift, vibration, temperature changes', effect: 'Control offset, poor response', pfInterval: '1-6 months', detection: 'Loop testing, calibration check' },
        { mode: 'Positioner electronics failed', cause: 'Age, power surge, contamination', effect: 'Loss of automatic control', pfInterval: 'Variable', detection: 'Position error, diagnostic alarms' },
      ],
    },
  ],
  'compressor': [
    {
      component: 'Impeller/Rotor',
      modes: [
        { mode: 'Impeller eroded', cause: 'Wet gas, particulates, liquid carryover', effect: 'Reduced efficiency, vibration', pfInterval: '3-12 months', detection: 'Performance monitoring, vibration analysis' },
        { mode: 'Rotor imbalance', cause: 'Fouling, erosion, blade damage', effect: 'High vibration, bearing wear', pfInterval: '1-4 weeks', detection: 'Vibration analysis' },
      ],
    },
    {
      component: 'Bearings (Journal)',
      modes: [
        { mode: 'Bearing wiped', cause: 'Oil starvation, overload, contamination', effect: 'High vibration, temperature, potential seizure', pfInterval: 'Hours to days', detection: 'Temperature monitoring, vibration' },
        { mode: 'Bearing worn', cause: 'Normal wear, contaminated oil', effect: 'Increased clearance, vibration', pfInterval: '2-8 weeks', detection: 'Vibration analysis, oil debris monitoring' },
      ],
    },
    {
      component: 'Seals (Dry Gas)',
      modes: [
        { mode: 'Primary seal leakage high', cause: 'Face damage, contamination, wear', effect: 'Increased seal gas consumption, potential hazard', pfInterval: '2-8 weeks', detection: 'Seal gas flow monitoring, vent flow' },
        { mode: 'Seal contaminated', cause: 'Process upset, liquid ingress', effect: 'Seal face damage, increased leakage', pfInterval: 'Days to weeks', detection: 'Seal gas flow change, vent analysis' },
      ],
    },
    {
      component: 'Lube Oil System',
      modes: [
        { mode: 'Oil pump fails', cause: 'Motor failure, coupling failure, pump wear', effect: 'Loss of lubrication, compressor trip', pfInterval: 'Sudden', detection: 'Oil pressure alarm, motor protection' },
        { mode: 'Oil cooler fouled', cause: 'Cooling water quality, oil degradation', effect: 'High oil temperature', pfInterval: '2-6 months', detection: 'Oil temperature trending' },
        { mode: 'Oil contaminated', cause: 'Process leak, water ingress, degradation', effect: 'Reduced lubrication, wear', pfInterval: '1-3 months', detection: 'Oil analysis' },
      ],
    },
    {
      component: 'Anti-Surge System',
      modes: [
        { mode: 'Surge valve fails to open', cause: 'Valve stuck, actuator failure, control failure', effect: 'Compressor surge if protection demanded', pfInterval: 'Variable', detection: 'Stroke testing, valve signature' },
        { mode: 'Surge controller miscalibrated', cause: 'Drift, incorrect setup', effect: 'Unnecessary recycle or inadequate protection', pfInterval: '1-12 months', detection: 'Controller testing, surge margin monitoring' },
      ],
    },
  ],
  'heat-exchanger': [
    {
      component: 'Tubes',
      modes: [
        { mode: 'Tubes fouled', cause: 'Biological growth, scaling, particulates', effect: 'Reduced heat transfer, increased pressure drop', pfInterval: '1-12 months', detection: 'Performance monitoring, pressure drop trending' },
        { mode: 'Tubes corroded', cause: 'Chemical attack, erosion-corrosion', effect: 'Wall thinning, potential tube failure', pfInterval: '6-36 months', detection: 'Eddy current testing, tube sampling' },
        { mode: 'Tube leaked', cause: 'Corrosion, erosion, vibration fatigue', effect: 'Cross-contamination, pressure transfer', pfInterval: 'Sudden (after degradation)', detection: 'Process monitoring, leak testing, pressure test' },
      ],
    },
    {
      component: 'Shell',
      modes: [
        { mode: 'Shell corroded', cause: 'Internal or external corrosion', effect: 'Wall thinning, potential breach', pfInterval: '12-60 months', detection: 'UT thickness testing, visual inspection' },
        { mode: 'Shell fouled (shellside)', cause: 'Scaling, deposits, biological', effect: 'Reduced heat transfer', pfInterval: '3-24 months', detection: 'Performance monitoring, cleaning frequency' },
      ],
    },
    {
      component: 'Tube Sheet',
      modes: [
        { mode: 'Tube-to-tubesheet joint leak', cause: 'Corrosion, vibration, thermal cycling', effect: 'Cross-contamination, loss of separation', pfInterval: '6-24 months', detection: 'Pressure test, helium leak test' },
        { mode: 'Tubesheet corroded', cause: 'Galvanic corrosion, chemical attack', effect: 'Joint integrity loss', pfInterval: '12-60 months', detection: 'Inspection, thickness measurement' },
      ],
    },
    {
      component: 'Gaskets/Seals',
      modes: [
        { mode: 'Gasket leaking', cause: 'Age, bolt relaxation, thermal cycling', effect: 'External leakage', pfInterval: '1-12 months', detection: 'Visual inspection, leak detection' },
        { mode: 'Floating head seal failed', cause: 'Wear, damage, incorrect assembly', effect: 'Process crossover or external leak', pfInterval: '6-24 months', detection: 'Pressure test, leak test' },
      ],
    },
  ],
};

const equipmentTypes = [
  { value: 'centrifugal-pump', label: 'Centrifugal Pump', icon: '🔧' },
  { value: 'electric-motor', label: 'Electric Motor', icon: '⚡' },
  { value: 'control-valve', label: 'Control Valve', icon: '🎛️' },
  { value: 'compressor', label: 'Compressor', icon: '💨' },
  { value: 'heat-exchanger', label: 'Heat Exchanger', icon: '🌡️' },
];

export default function FailureModesPage() {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [results, setResults] = useState<ComponentFailureModes[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEquipmentSelect = (equipment: string) => {
    setSelectedEquipment(equipment);
    setSelectedComponents([]);
    setResults(null);
  };

  const handleComponentToggle = (component: string) => {
    setSelectedComponents(prev => 
      prev.includes(component) 
        ? prev.filter(c => c !== component)
        : [...prev, component]
    );
  };

  const selectAllComponents = () => {
    const allComponents = failureModeDatabase[selectedEquipment]?.map(c => c.component) || [];
    setSelectedComponents(allComponents);
  };

  const generateFailureModes = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const allModes = failureModeDatabase[selectedEquipment] || [];
      const filtered = selectedComponents.length > 0
        ? allModes.filter(c => selectedComponents.includes(c.component))
        : allModes;
      setResults(filtered);
      setIsGenerating(false);
    }, 1000);
  };

  const copyAllModes = () => {
    if (!results) return;
    
    let text = `FAILURE MODES FOR: ${equipmentTypes.find(e => e.value === selectedEquipment)?.label}\n\n`;
    
    results.forEach(component => {
      text += `== ${component.component.toUpperCase()} ==\n`;
      component.modes.forEach((mode, i) => {
        text += `\n${i + 1}. ${mode.mode}\n`;
        text += `   Cause: ${mode.cause}\n`;
        text += `   Effect: ${mode.effect}\n`;
        text += `   P-F Interval: ${mode.pfInterval}\n`;
        text += `   Detection: ${mode.detection}\n`;
      });
      text += '\n';
    });
    
    navigator.clipboard.writeText(text);
  };

  const totalModes = results?.reduce((sum, c) => sum + c.modes.length, 0) || 0;

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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-industrial-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy">Failure Mode Suggester</h1>
            <p className="text-mid-grey mt-2">Get comprehensive failure modes for common equipment types</p>
          </div>

          {/* Equipment Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
            <h2 className="font-heading font-semibold text-lg text-slate-navy mb-4">
              1. Select Equipment Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {equipmentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleEquipmentSelect(type.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedEquipment === type.value
                      ? 'border-deep-teal bg-deep-teal/5'
                      : 'border-light-grey hover:border-mid-grey'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{type.icon}</span>
                  <span className={`text-sm font-medium ${
                    selectedEquipment === type.value ? 'text-deep-teal' : 'text-charcoal'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Component Selection */}
          {selectedEquipment && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-lg text-slate-navy">
                  2. Select Components (optional)
                </h2>
                <button
                  onClick={selectAllComponents}
                  className="text-sm text-deep-teal hover:underline"
                >
                  Select all
                </button>
              </div>
              <p className="text-sm text-mid-grey mb-4">
                Leave blank to get all failure modes, or select specific components.
              </p>
              <div className="flex flex-wrap gap-2">
                {failureModeDatabase[selectedEquipment]?.map((component) => (
                  <button
                    key={component.component}
                    onClick={() => handleComponentToggle(component.component)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      selectedComponents.includes(component.component)
                        ? 'border-deep-teal bg-deep-teal text-white'
                        : 'border-light-grey text-charcoal hover:border-deep-teal'
                    }`}
                  >
                    {component.component}
                  </button>
                ))}
              </div>
              
              <button
                onClick={generateFailureModes}
                disabled={isGenerating}
                className="w-full mt-6 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors disabled:opacity-50"
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
                  'Generate Failure Modes'
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-deep-teal/10 border border-deep-teal/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-deep-teal font-semibold">{totalModes} failure modes</span>
                  <span className="text-mid-grey"> across {results.length} components</span>
                </div>
                <button
                  onClick={copyAllModes}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-deep-teal font-medium hover:bg-deep-teal hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy All
                </button>
              </div>

              {/* Failure Mode Cards */}
              {results.map((component, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-light-grey overflow-hidden">
                  <div className="bg-slate-navy/5 px-6 py-4 border-b border-light-grey">
                    <h3 className="font-heading font-semibold text-lg text-slate-navy">
                      {component.component}
                    </h3>
                    <p className="text-sm text-mid-grey">{component.modes.length} failure modes</p>
                  </div>
                  <div className="divide-y divide-light-grey">
                    {component.modes.map((mode, modeIdx) => (
                      <div key={modeIdx} className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="font-semibold text-charcoal">{mode.mode}</h4>
                          <span className="text-xs bg-industrial-amber/10 text-industrial-amber px-2 py-1 rounded-full whitespace-nowrap">
                            P-F: {mode.pfInterval}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-mid-grey block mb-1">Cause</span>
                            <span className="text-charcoal">{mode.cause}</span>
                          </div>
                          <div>
                            <span className="text-mid-grey block mb-1">Effect</span>
                            <span className="text-charcoal">{mode.effect}</span>
                          </div>
                          <div>
                            <span className="text-mid-grey block mb-1">Detection</span>
                            <span className="text-charcoal">{mode.detection}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Disclaimer */}
              <div className="bg-off-white rounded-xl p-4 text-sm text-mid-grey">
                <strong className="text-charcoal">Note:</strong> These are common failure modes based on industry experience. 
                Your specific equipment may have additional failure modes based on operating context, environment, and maintenance history. 
                Always validate against your actual conditions.
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedEquipment('');
                    setSelectedComponents([]);
                    setResults(null);
                  }}
                  className="flex-1 px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Start Over
                </button>
                <Link
                  href="/ai-tools/function-generator"
                  className="flex-1 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors text-center"
                >
                  Generate Function Statements →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
