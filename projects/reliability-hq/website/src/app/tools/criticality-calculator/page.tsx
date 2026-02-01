'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EquipmentEntry {
  id: string;
  name: string;
  safety: number;
  environmental: number;
  production: number;
  repairCost: number;
  mtbf: number;
  score: number;
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
}

const calculateCriticality = (
  safety: number,
  environmental: number,
  production: number,
  repairCost: number,
  mtbf: number
): { score: number; criticality: 'Critical' | 'High' | 'Medium' | 'Low' } => {
  // Weighted scoring (safety and environmental are weighted higher)
  const weightedScore = 
    (safety * 3) +          // Safety: 30% weight
    (environmental * 2.5) + // Environmental: 25% weight
    (production * 2) +      // Production: 20% weight
    (repairCost * 1.5) +    // Repair Cost: 15% weight
    (mtbf * 1);             // MTBF (inverse - low MTBF = high failure rate): 10% weight

  // Normalize to 0-100 scale
  const maxPossible = (10 * 3) + (10 * 2.5) + (10 * 2) + (10 * 1.5) + (10 * 1); // 100
  const normalizedScore = Math.round((weightedScore / maxPossible) * 100);

  let criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  if (normalizedScore >= 75) {
    criticality = 'Critical';
  } else if (normalizedScore >= 50) {
    criticality = 'High';
  } else if (normalizedScore >= 25) {
    criticality = 'Medium';
  } else {
    criticality = 'Low';
  }

  return { score: normalizedScore, criticality };
};

const getCriticalityColor = (criticality: string) => {
  switch (criticality) {
    case 'Critical': return 'bg-red-600';
    case 'High': return 'bg-industrial-amber';
    case 'Medium': return 'bg-yellow-500';
    case 'Low': return 'bg-green-600';
    default: return 'bg-mid-grey';
  }
};

const getCriticalityBorderColor = (criticality: string) => {
  switch (criticality) {
    case 'Critical': return 'border-red-600';
    case 'High': return 'border-industrial-amber';
    case 'Medium': return 'border-yellow-500';
    case 'Low': return 'border-green-600';
    default: return 'border-mid-grey';
  }
};

export default function CriticalityCalculatorPage() {
  const [entries, setEntries] = useState<EquipmentEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({
    name: '',
    safety: 5,
    environmental: 5,
    production: 5,
    repairCost: 5,
    mtbf: 5,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setCurrentEntry(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Math.min(10, Math.max(1, value)),
    }));
  };

  const handleAddEquipment = () => {
    if (!currentEntry.name.trim()) {
      alert('Please enter an equipment name');
      return;
    }

    const { score, criticality } = calculateCriticality(
      currentEntry.safety,
      currentEntry.environmental,
      currentEntry.production,
      currentEntry.repairCost,
      currentEntry.mtbf
    );

    const newEntry: EquipmentEntry = {
      id: Date.now().toString(),
      name: currentEntry.name,
      safety: currentEntry.safety,
      environmental: currentEntry.environmental,
      production: currentEntry.production,
      repairCost: currentEntry.repairCost,
      mtbf: currentEntry.mtbf,
      score,
      criticality,
    };

    setEntries(prev => [...prev, newEntry].sort((a, b) => b.score - a.score));
    setCurrentEntry({
      name: '',
      safety: 5,
      environmental: 5,
      production: 5,
      repairCost: 5,
      mtbf: 5,
    });
  };

  const handleRemoveEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleClearAll = () => {
    setEntries([]);
  };

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl">
            <Link 
              href="/resources" 
              className="text-gray-300 hover:text-white text-sm mb-4 inline-flex items-center gap-2"
            >
              ← Back to Resources
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              Equipment Criticality Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Score and rank your equipment by criticality to prioritize maintenance resources and RCM analysis efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold text-slate-navy mb-6">
                Add Equipment
              </h2>

              {/* Equipment Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Equipment Name / Tag
                </label>
                <input
                  type="text"
                  value={currentEntry.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., P-101 Cooling Water Pump"
                  className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                />
              </div>

              {/* Scoring Sliders */}
              <div className="space-y-6">
                {/* Safety Impact */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-charcoal">
                      Safety Impact
                    </label>
                    <span className="text-sm font-bold text-deep-teal">{currentEntry.safety}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.safety}
                    onChange={(e) => handleInputChange('safety', parseInt(e.target.value))}
                    className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer accent-deep-teal"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    1 = No safety risk → 10 = Potential fatality or serious injury
                  </p>
                </div>

                {/* Environmental Impact */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-charcoal">
                      Environmental Impact
                    </label>
                    <span className="text-sm font-bold text-deep-teal">{currentEntry.environmental}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.environmental}
                    onChange={(e) => handleInputChange('environmental', parseInt(e.target.value))}
                    className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer accent-deep-teal"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    1 = No environmental risk → 10 = Major spill or regulatory breach
                  </p>
                </div>

                {/* Production Impact */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-charcoal">
                      Production Impact
                    </label>
                    <span className="text-sm font-bold text-deep-teal">{currentEntry.production}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.production}
                    onChange={(e) => handleInputChange('production', parseInt(e.target.value))}
                    className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer accent-deep-teal"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    1 = No production impact → 10 = Complete plant shutdown
                  </p>
                </div>

                {/* Repair Cost */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-charcoal">
                      Repair/Replacement Cost
                    </label>
                    <span className="text-sm font-bold text-deep-teal">{currentEntry.repairCost}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.repairCost}
                    onChange={(e) => handleInputChange('repairCost', parseInt(e.target.value))}
                    className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer accent-deep-teal"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    1 = Very low cost → 10 = Extremely expensive repair/replace
                  </p>
                </div>

                {/* MTBF Rating */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-charcoal">
                      Failure Frequency (Inverse MTBF)
                    </label>
                    <span className="text-sm font-bold text-deep-teal">{currentEntry.mtbf}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.mtbf}
                    onChange={(e) => handleInputChange('mtbf', parseInt(e.target.value))}
                    className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer accent-deep-teal"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    1 = Rarely fails (high MTBF) → 10 = Frequent failures (low MTBF)
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-off-white rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mid-grey">Calculated Score:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-navy">
                      {calculateCriticality(
                        currentEntry.safety,
                        currentEntry.environmental,
                        currentEntry.production,
                        currentEntry.repairCost,
                        currentEntry.mtbf
                      ).score}
                    </span>
                    <span className="text-mid-grey">/100</span>
                    <span className={`ml-3 px-3 py-1 rounded-full text-white text-sm font-medium ${getCriticalityColor(
                      calculateCriticality(
                        currentEntry.safety,
                        currentEntry.environmental,
                        currentEntry.production,
                        currentEntry.repairCost,
                        currentEntry.mtbf
                      ).criticality
                    )}`}>
                      {calculateCriticality(
                        currentEntry.safety,
                        currentEntry.environmental,
                        currentEntry.production,
                        currentEntry.repairCost,
                        currentEntry.mtbf
                      ).criticality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddEquipment}
                className="w-full mt-6 bg-deep-teal text-white px-6 py-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
              >
                Add Equipment to List
              </button>
            </div>

            {/* Results List */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-heading text-xl font-bold text-slate-navy">
                    Equipment Rankings
                  </h2>
                  {entries.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-mid-grey hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {entries.length === 0 ? (
                  <div className="text-center py-12 text-mid-grey">
                    <span className="text-4xl mb-4 block">📊</span>
                    <p>No equipment added yet.</p>
                    <p className="text-sm mt-1">Add equipment using the form to see rankings.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {entries.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`border-l-4 ${getCriticalityBorderColor(entry.criticality)} bg-off-white rounded-r-lg p-4`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <span className="bg-slate-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-heading font-semibold text-slate-navy">
                                {entry.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded text-white text-xs font-medium ${getCriticalityColor(entry.criticality)}`}>
                                  {entry.criticality}
                                </span>
                                <span className="text-sm text-mid-grey">
                                  Score: {entry.score}/100
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-mid-grey grid grid-cols-3 gap-x-4 gap-y-1">
                                <span>Safety: {entry.safety}</span>
                                <span>Environ: {entry.environmental}</span>
                                <span>Prod: {entry.production}</span>
                                <span>Cost: {entry.repairCost}</span>
                                <span>Freq: {entry.mtbf}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveEntry(entry.id)}
                            className="text-mid-grey hover:text-red-600 p-1"
                            aria-label="Remove"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        {/* Score Bar */}
                        <div className="mt-3">
                          <div className="h-2 bg-light-grey rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getCriticalityColor(entry.criticality)} transition-all duration-500`}
                              style={{ width: `${entry.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              {entries.length > 0 && (
                <div className="mt-6 bg-white rounded-xl border border-light-grey p-6">
                  <h3 className="font-heading font-semibold text-slate-navy mb-4">Summary</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {entries.filter(e => e.criticality === 'Critical').length}
                      </div>
                      <div className="text-xs text-mid-grey">Critical</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-industrial-amber">
                        {entries.filter(e => e.criticality === 'High').length}
                      </div>
                      <div className="text-xs text-mid-grey">High</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">
                        {entries.filter(e => e.criticality === 'Medium').length}
                      </div>
                      <div className="text-xs text-mid-grey">Medium</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {entries.filter(e => e.criticality === 'Low').length}
                      </div>
                      <div className="text-xs text-mid-grey">Low</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          <div className="mt-12 bg-white rounded-xl p-6 md:p-8 border border-light-grey">
            <h3 className="font-heading text-xl font-bold text-slate-navy mb-6">Understanding Equipment Criticality</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-heading font-semibold text-slate-navy mb-3">What is Equipment Criticality?</h4>
                <p className="text-mid-grey text-sm leading-relaxed mb-4">
                  Equipment criticality is a measure of how important a piece of equipment is to your operations, 
                  safety, and environmental compliance. It helps prioritize where to focus maintenance resources 
                  and RCM analysis efforts.
                </p>
                <p className="text-mid-grey text-sm leading-relaxed">
                  High-criticality equipment should receive detailed RCM analysis and proactive maintenance strategies, 
                  while low-criticality items might be suitable for run-to-failure or basic time-based maintenance.
                </p>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-slate-navy mb-3">Score Weighting</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center py-2 border-b border-light-grey">
                    <span className="text-charcoal">Safety Impact</span>
                    <span className="font-medium text-deep-teal">30%</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-light-grey">
                    <span className="text-charcoal">Environmental Impact</span>
                    <span className="font-medium text-deep-teal">25%</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-light-grey">
                    <span className="text-charcoal">Production Impact</span>
                    <span className="font-medium text-deep-teal">20%</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-light-grey">
                    <span className="text-charcoal">Repair/Replacement Cost</span>
                    <span className="font-medium text-deep-teal">15%</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-charcoal">Failure Frequency</span>
                    <span className="font-medium text-deep-teal">10%</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-4 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full bg-red-600`}></span>
                  <span className="font-semibold text-slate-navy">Critical (75-100)</span>
                </div>
                <p className="text-xs text-mid-grey">
                  Requires immediate attention. Full RCM analysis recommended. Proactive maintenance essential.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full bg-industrial-amber`}></span>
                  <span className="font-semibold text-slate-navy">High (50-74)</span>
                </div>
                <p className="text-xs text-mid-grey">
                  Important equipment. Detailed analysis recommended. Consider predictive maintenance.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full bg-yellow-500`}></span>
                  <span className="font-semibold text-slate-navy">Medium (25-49)</span>
                </div>
                <p className="text-xs text-mid-grey">
                  Standard maintenance approach. Basic preventive maintenance may be sufficient.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full bg-green-600`}></span>
                  <span className="font-semibold text-slate-navy">Low (1-24)</span>
                </div>
                <p className="text-xs text-mid-grey">
                  Run-to-failure may be acceptable. Minimal maintenance investment needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-navy section-padding">
        <div className="container-max text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Analyze Your Critical Equipment?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Once you&apos;ve identified your critical equipment, use our RCM Decision Diagram to determine 
            the right maintenance strategy, or get our comprehensive FMEA templates for full analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/rcm-decision-diagram"
              className="inline-block bg-deep-teal text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Try RCM Decision Diagram →
            </Link>
            <Link
              href="/products"
              className="inline-block bg-industrial-amber text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Templates →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
