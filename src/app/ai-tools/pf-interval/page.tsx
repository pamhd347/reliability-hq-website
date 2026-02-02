'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DetectionTechnique {
  name: string;
  description: string;
  typicalPfInterval: { min: number; max: number; unit: string };
  advantages: string[];
  limitations: string[];
  applicableTo: string[];
}

interface FailureModeCategory {
  category: string;
  examples: string[];
  techniques: DetectionTechnique[];
}

const failureModeData: FailureModeCategory[] = [
  {
    category: 'Bearing Degradation',
    examples: ['Rolling element fatigue', 'Bearing wear', 'Lubrication failure', 'Bearing cage damage'],
    techniques: [
      {
        name: 'Ultrasonic monitoring',
        description: 'High-frequency acoustic emission detection of early-stage degradation',
        typicalPfInterval: { min: 4, max: 12, unit: 'weeks' },
        advantages: ['Earliest detection', 'Works through noise', 'Detects lubrication issues'],
        limitations: ['Requires training', 'Equipment cost', 'Not all failure modes'],
        applicableTo: ['Rolling element bearings', 'Sleeve bearings'],
      },
      {
        name: 'Vibration analysis',
        description: 'Measurement of vibration velocity and acceleration at bearing frequencies',
        typicalPfInterval: { min: 2, max: 8, unit: 'weeks' },
        advantages: ['Well-established', 'Wide applicability', 'Trending capability'],
        limitations: ['Later detection than ultrasonic', 'Background noise issues'],
        applicableTo: ['All rotating equipment bearings'],
      },
      {
        name: 'Temperature monitoring',
        description: 'Continuous or periodic bearing temperature measurement',
        typicalPfInterval: { min: 1, max: 3, unit: 'weeks' },
        advantages: ['Simple', 'Inexpensive', 'Continuous possible'],
        limitations: ['Late indication', 'Ambient affects readings'],
        applicableTo: ['All bearings', 'Especially large/slow machines'],
      },
      {
        name: 'Oil analysis',
        description: 'Wear particle analysis and lubricant condition monitoring',
        typicalPfInterval: { min: 4, max: 12, unit: 'weeks' },
        advantages: ['Detects wear metals', 'Checks lubricant health', 'Root cause insight'],
        limitations: ['Oil-lubricated only', 'Lab turnaround time'],
        applicableTo: ['Oil-lubricated bearings', 'Gearboxes'],
      },
    ],
  },
  {
    category: 'Electrical Insulation Degradation',
    examples: ['Winding insulation breakdown', 'Phase-to-ground fault developing', 'Inter-turn short'],
    techniques: [
      {
        name: 'Partial discharge monitoring',
        description: 'Detection of electrical discharges within insulation',
        typicalPfInterval: { min: 4, max: 24, unit: 'weeks' },
        advantages: ['Online monitoring possible', 'Early detection', 'Trending'],
        limitations: ['MV/HV motors mainly', 'Complex interpretation'],
        applicableTo: ['Medium/high voltage motors', 'Transformers', 'Switchgear'],
      },
      {
        name: 'Insulation resistance testing',
        description: 'Measurement of insulation resistance to ground',
        typicalPfInterval: { min: 2, max: 8, unit: 'weeks' },
        advantages: ['Simple', 'Inexpensive', 'Well understood'],
        limitations: ['Offline test', 'Temperature correction needed'],
        applicableTo: ['All electric motors', 'Cables', 'Transformers'],
      },
      {
        name: 'Motor current signature analysis',
        description: 'Analysis of current waveform for electrical anomalies',
        typicalPfInterval: { min: 2, max: 12, unit: 'weeks' },
        advantages: ['Online', 'Non-intrusive', 'Multiple fault detection'],
        limitations: ['Interpretation expertise needed', 'Load variations affect'],
        applicableTo: ['Induction motors', 'VFD-driven motors'],
      },
      {
        name: 'Thermal imaging',
        description: 'Infrared detection of hot spots indicating degradation',
        typicalPfInterval: { min: 1, max: 4, unit: 'weeks' },
        advantages: ['Quick survey', 'Non-contact', 'Visual results'],
        limitations: ['Surface temperature only', 'Access requirements'],
        applicableTo: ['Motor terminals', 'Connections', 'Windings (external)'],
      },
    ],
  },
  {
    category: 'Seal/Packing Wear',
    examples: ['Mechanical seal face wear', 'Packing deterioration', 'O-ring degradation'],
    techniques: [
      {
        name: 'Visual inspection for leakage',
        description: 'Direct observation of seal area for weepage or leakage',
        typicalPfInterval: { min: 2, max: 6, unit: 'weeks' },
        advantages: ['Simple', 'No equipment needed', 'Immediate'],
        limitations: ['Access required', 'Subjective'],
        applicableTo: ['Mechanical seals', 'Packing glands', 'Gaskets'],
      },
      {
        name: 'Seal temperature monitoring',
        description: 'Temperature measurement at seal faces',
        typicalPfInterval: { min: 1, max: 3, unit: 'weeks' },
        advantages: ['Early warning', 'Continuous possible', 'Simple'],
        limitations: ['Requires sensor installation', 'Interpretation needed'],
        applicableTo: ['Mechanical seals', 'High-value pumps'],
      },
      {
        name: 'Seal flush flow monitoring',
        description: 'Monitoring seal support system flows',
        typicalPfInterval: { min: 1, max: 4, unit: 'weeks' },
        advantages: ['Continuous', 'Automated alarming possible'],
        limitations: ['Requires instrumentation', 'Indirect indication'],
        applicableTo: ['API Plan seals', 'Process pumps'],
      },
    ],
  },
  {
    category: 'Corrosion/Erosion',
    examples: ['Wall thinning', 'Pitting corrosion', 'Erosion wear', 'Flow-accelerated corrosion'],
    techniques: [
      {
        name: 'Ultrasonic thickness measurement',
        description: 'UT measurement of remaining wall thickness',
        typicalPfInterval: { min: 12, max: 52, unit: 'weeks' },
        advantages: ['Accurate', 'Trending possible', 'Non-destructive'],
        limitations: ['Point measurement', 'Access/prep required'],
        applicableTo: ['Piping', 'Vessels', 'Heat exchangers', 'Tanks'],
      },
      {
        name: 'Corrosion coupons',
        description: 'Sample material exposed to process for weight loss measurement',
        typicalPfInterval: { min: 12, max: 52, unit: 'weeks' },
        advantages: ['Actual environment', 'Low cost', 'Multiple locations'],
        limitations: ['Retrospective', 'Not real-time'],
        applicableTo: ['Process piping', 'Cooling water systems'],
      },
      {
        name: 'Visual inspection',
        description: 'Direct or camera inspection for visible degradation',
        typicalPfInterval: { min: 4, max: 26, unit: 'weeks' },
        advantages: ['Wide coverage', 'Obvious damage seen'],
        limitations: ['Surface only', 'Access issues'],
        applicableTo: ['External corrosion', 'Visible erosion', 'Coatings'],
      },
    ],
  },
  {
    category: 'Valve Degradation',
    examples: ['Seat erosion', 'Packing wear', 'Actuator problems', 'Positioner drift'],
    techniques: [
      {
        name: 'Valve signature analysis',
        description: 'Online testing of valve response and travel',
        typicalPfInterval: { min: 4, max: 26, unit: 'weeks' },
        advantages: ['Comprehensive', 'Online possible', 'Trending'],
        limitations: ['Requires smart positioner', 'Interpretation expertise'],
        applicableTo: ['Control valves', 'On/off valves with positioners'],
      },
      {
        name: 'Partial stroke testing',
        description: 'Periodic movement of valve to verify operation',
        typicalPfInterval: { min: 4, max: 12, unit: 'weeks' },
        advantages: ['Verifies function', 'Detects sticking'],
        limitations: ['May affect process', 'Not full stroke'],
        applicableTo: ['Safety valves', 'ESD valves', 'Critical isolation'],
      },
      {
        name: 'Seat leakage testing',
        description: 'Measurement of through-leakage when valve closed',
        typicalPfInterval: { min: 12, max: 52, unit: 'weeks' },
        advantages: ['Direct measurement', 'Class rating verification'],
        limitations: ['Often requires isolation', 'Shutdown may be needed'],
        applicableTo: ['Isolation valves', 'Control valves', 'Check valves'],
      },
    ],
  },
  {
    category: 'Filter/Strainer Blockage',
    examples: ['Filter element fouling', 'Strainer blockage', 'Coalescer degradation'],
    techniques: [
      {
        name: 'Differential pressure monitoring',
        description: 'Continuous measurement of pressure drop across element',
        typicalPfInterval: { min: 1, max: 4, unit: 'weeks' },
        advantages: ['Continuous', 'Direct indication', 'Simple'],
        limitations: ['Flow affects reading', 'Requires instrumentation'],
        applicableTo: ['All filters', 'Strainers', 'Coalescers'],
      },
      {
        name: 'Visual inspection',
        description: 'Direct inspection of filter element condition',
        typicalPfInterval: { min: 2, max: 12, unit: 'weeks' },
        advantages: ['See actual condition', 'Assess debris type'],
        limitations: ['Requires isolation/removal', 'Exposure risk'],
        applicableTo: ['All filter types'],
      },
    ],
  },
];

export default function PFIntervalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTechnique, setSelectedTechnique] = useState<DetectionTechnique | null>(null);
  const [customPF, setCustomPF] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [showResult, setShowResult] = useState(false);

  const selectedFailureMode = failureModeData.find(f => f.category === selectedCategory);

  const calculateInterval = () => {
    if (!selectedTechnique) return null;
    
    const pf = customPF.min && customPF.max 
      ? { min: parseInt(customPF.min), max: parseInt(customPF.max), unit: 'weeks' }
      : selectedTechnique.typicalPfInterval;
    
    // Recommended interval = P-F interval / 2 (or less)
    const recommendedMin = Math.floor(pf.min / 2);
    const recommendedMax = Math.floor(pf.max / 2);
    
    return {
      pfInterval: pf,
      recommendedInterval: { min: Math.max(1, recommendedMin), max: Math.max(1, recommendedMax), unit: pf.unit },
    };
  };

  const result = calculateInterval();

  const copyResult = () => {
    if (!result || !selectedTechnique) return;
    
    const text = `P-F INTERVAL ANALYSIS

Failure Mode Category: ${selectedCategory}
Detection Technique: ${selectedTechnique.name}

P-F Interval: ${result.pfInterval.min}-${result.pfInterval.max} ${result.pfInterval.unit}
Recommended Task Interval: ${result.recommendedInterval.min}-${result.recommendedInterval.max} ${result.recommendedInterval.unit}

Rationale: Task interval should be ≤ half the P-F interval to ensure detection before functional failure.

Technique Details:
${selectedTechnique.description}

Advantages:
${selectedTechnique.advantages.map(a => `• ${a}`).join('\n')}

Limitations:
${selectedTechnique.limitations.map(l => `• ${l}`).join('\n')}`;
    
    navigator.clipboard.writeText(text);
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
            <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy">P-F Interval Estimator</h1>
            <p className="text-mid-grey mt-2">Estimate monitoring intervals based on failure patterns</p>
          </div>

          {/* Step 1: Select Failure Mode Category */}
          <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
            <h2 className="font-heading font-semibold text-lg text-slate-navy mb-4">
              1. Select Failure Mode Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {failureModeData.map((fm) => (
                <button
                  key={fm.category}
                  onClick={() => {
                    setSelectedCategory(fm.category);
                    setSelectedTechnique(null);
                    setShowResult(false);
                  }}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedCategory === fm.category
                      ? 'border-deep-teal bg-deep-teal/5'
                      : 'border-light-grey hover:border-mid-grey'
                  }`}
                >
                  <span className={`text-sm font-medium block ${
                    selectedCategory === fm.category ? 'text-deep-teal' : 'text-charcoal'
                  }`}>
                    {fm.category}
                  </span>
                </button>
              ))}
            </div>
            
            {selectedFailureMode && (
              <div className="mt-4 p-3 bg-off-white rounded-lg">
                <span className="text-xs text-mid-grey">Examples: </span>
                <span className="text-sm text-charcoal">{selectedFailureMode.examples.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Step 2: Select Detection Technique */}
          {selectedFailureMode && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
              <h2 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                2. Select Detection Technique
              </h2>
              <div className="space-y-3">
                {selectedFailureMode.techniques.map((tech) => (
                  <button
                    key={tech.name}
                    onClick={() => {
                      setSelectedTechnique(tech);
                      setShowResult(false);
                      setCustomPF({ min: '', max: '' });
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTechnique?.name === tech.name
                        ? 'border-deep-teal bg-deep-teal/5'
                        : 'border-light-grey hover:border-mid-grey'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className={`font-medium block ${
                          selectedTechnique?.name === tech.name ? 'text-deep-teal' : 'text-charcoal'
                        }`}>
                          {tech.name}
                        </span>
                        <span className="text-sm text-mid-grey">{tech.description}</span>
                      </div>
                      <span className="text-xs bg-industrial-amber/10 text-industrial-amber px-2 py-1 rounded-full whitespace-nowrap">
                        P-F: {tech.typicalPfInterval.min}-{tech.typicalPfInterval.max} {tech.typicalPfInterval.unit}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Adjust P-F (optional) and Calculate */}
          {selectedTechnique && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 mb-6">
              <h2 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                3. Adjust P-F Interval (Optional)
              </h2>
              <p className="text-sm text-mid-grey mb-4">
                The typical P-F interval is shown below. Adjust if you have site-specific data.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Minimum P-F ({selectedTechnique.typicalPfInterval.unit})
                  </label>
                  <input
                    type="number"
                    value={customPF.min}
                    onChange={(e) => setCustomPF({ ...customPF, min: e.target.value })}
                    placeholder={selectedTechnique.typicalPfInterval.min.toString()}
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Maximum P-F ({selectedTechnique.typicalPfInterval.unit})
                  </label>
                  <input
                    type="number"
                    value={customPF.max}
                    onChange={(e) => setCustomPF({ ...customPF, max: e.target.value })}
                    placeholder={selectedTechnique.typicalPfInterval.max.toString()}
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowResult(true)}
                className="w-full bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
              >
                Calculate Recommended Interval
              </button>
            </div>
          )}

          {/* Results */}
          {showResult && result && selectedTechnique && (
            <div className="space-y-6">
              {/* Main Result */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey overflow-hidden">
                <div className="bg-deep-teal px-6 py-4">
                  <h2 className="font-heading text-xl font-bold text-white">
                    Recommended Interval
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="text-center p-4 bg-off-white rounded-xl">
                      <span className="text-sm text-mid-grey block mb-1">P-F Interval</span>
                      <span className="text-2xl font-bold text-slate-navy">
                        {result.pfInterval.min}-{result.pfInterval.max}
                      </span>
                      <span className="text-lg text-slate-navy ml-1">{result.pfInterval.unit}</span>
                    </div>
                    <div className="text-center p-4 bg-deep-teal/10 rounded-xl border-2 border-deep-teal">
                      <span className="text-sm text-deep-teal block mb-1">Task Interval</span>
                      <span className="text-2xl font-bold text-deep-teal">
                        {result.recommendedInterval.min}-{result.recommendedInterval.max}
                      </span>
                      <span className="text-lg text-deep-teal ml-1">{result.recommendedInterval.unit}</span>
                    </div>
                  </div>

                  <div className="bg-industrial-amber/10 border border-industrial-amber/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-charcoal">
                      <strong>Rule:</strong> Task interval should be ≤ half the P-F interval. 
                      This ensures you have at least one inspection between potential failure (P) 
                      and functional failure (F).
                    </p>
                  </div>

                  <h3 className="font-semibold text-slate-navy mb-3">Technique Details</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm font-medium text-charcoal block mb-2">Advantages</span>
                      <ul className="space-y-1">
                        {selectedTechnique.advantages.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-mid-grey">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-charcoal block mb-2">Limitations</span>
                      <ul className="space-y-1">
                        {selectedTechnique.limitations.map((l, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-mid-grey">
                            <svg className="w-4 h-4 text-industrial-amber flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-charcoal block mb-2">Applicable To</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechnique.applicableTo.map((a, i) => (
                        <span key={i} className="text-xs bg-off-white text-mid-grey px-3 py-1 rounded-full">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedTechnique(null);
                    setShowResult(false);
                    setCustomPF({ min: '', max: '' });
                  }}
                  className="flex-1 px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={copyResult}
                  className="flex-1 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
