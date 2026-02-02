'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface ROIInputs {
  criticalAssets: number;
  avgMaintenanceCost: number;
  avgDowntimeHours: number;
  downtimeCostPerHour: number;
  currentPMTasks: number;
  avgLaborRate: number;
}

interface ROIResults {
  currentTotalCost: number;
  currentMaintenanceCost: number;
  currentDowntimeCost: number;
  projectedTotalCost: number;
  projectedMaintenanceCost: number;
  projectedDowntimeCost: number;
  pmTaskReduction: number;
  pmLaborSavings: number;
  annualSavings: number;
  paybackMonths: number;
  fiveYearROI: number;
  fiveYearSavings: number;
}

const defaultInputs: ROIInputs = {
  criticalAssets: 50,
  avgMaintenanceCost: 15000,
  avgDowntimeHours: 120,
  downtimeCostPerHour: 5000,
  currentPMTasks: 200,
  avgLaborRate: 45,
};

// Industry benchmark ranges
const BENCHMARKS = {
  maintenanceReduction: { low: 0.25, mid: 0.32, high: 0.40 }, // 25-40% reduction
  downtimeReduction: { low: 0.50, mid: 0.60, high: 0.70 },    // 50-70% reduction
  pmTaskReduction: { low: 0.30, mid: 0.40, high: 0.50 },      // 30-50% task reduction
  rcmImplementationCost: 5000, // Per critical asset (approximate)
  avgHoursPerPMTask: 2, // Average hours per PM task
};

const calculateROI = (inputs: ROIInputs): ROIResults => {
  // Current costs
  const currentMaintenanceCost = inputs.criticalAssets * inputs.avgMaintenanceCost;
  const currentDowntimeCost = inputs.avgDowntimeHours * inputs.downtimeCostPerHour;
  const currentTotalCost = currentMaintenanceCost + currentDowntimeCost;

  // Use mid-range benchmarks for projections
  const maintenanceReduction = BENCHMARKS.maintenanceReduction.mid;
  const downtimeReduction = BENCHMARKS.downtimeReduction.mid;
  const pmReduction = BENCHMARKS.pmTaskReduction.mid;

  // Projected costs after RCM
  const projectedMaintenanceCost = currentMaintenanceCost * (1 - maintenanceReduction);
  const projectedDowntimeCost = currentDowntimeCost * (1 - downtimeReduction);
  const projectedTotalCost = projectedMaintenanceCost + projectedDowntimeCost;

  // PM task savings
  const tasksReduced = Math.round(inputs.currentPMTasks * pmReduction);
  const pmLaborSavings = tasksReduced * BENCHMARKS.avgHoursPerPMTask * inputs.avgLaborRate;

  // Total annual savings
  const annualSavings = (currentTotalCost - projectedTotalCost) + pmLaborSavings;

  // Implementation cost estimate
  const implementationCost = inputs.criticalAssets * BENCHMARKS.rcmImplementationCost;

  // Payback period (in months)
  const paybackMonths = annualSavings > 0 ? Math.ceil((implementationCost / annualSavings) * 12) : 0;

  // 5-year ROI
  const fiveYearSavings = annualSavings * 5;
  const fiveYearROI = implementationCost > 0 ? ((fiveYearSavings - implementationCost) / implementationCost) * 100 : 0;

  return {
    currentTotalCost,
    currentMaintenanceCost,
    currentDowntimeCost,
    projectedTotalCost,
    projectedMaintenanceCost,
    projectedDowntimeCost,
    pmTaskReduction: tasksReduced,
    pmLaborSavings,
    annualSavings,
    paybackMonths,
    fiveYearROI,
    fiveYearSavings,
  };
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number): string => {
  return `${Math.round(value)}%`;
};

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = calculateROI(inputs);

  const handleInputChange = (field: keyof ROIInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setShowResults(false);
  };

  // Calculate bar chart heights (max 200px)
  const maxCost = Math.max(results.currentTotalCost, results.projectedTotalCost, 1);
  const currentBarHeight = (results.currentTotalCost / maxCost) * 200;
  const projectedBarHeight = (results.projectedTotalCost / maxCost) * 200;

  return (
    <div className="bg-off-white min-h-screen">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .print-break { page-break-before: always; }
          section { padding: 1rem !important; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Hero */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white no-print">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl">
            <Link 
              href="/resources" 
              className="text-gray-300 hover:text-white text-sm mb-4 inline-flex items-center gap-2"
            >
              ← Back to Resources
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              RCM ROI Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Quantify the business case for Reliability Centred Maintenance. Calculate potential savings, 
              payback period, and 5-year ROI using industry benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 no-print">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-2">
                Enter Your Data
              </h2>
              <p className="text-mid-grey mb-8">
                Provide estimates for your current maintenance situation. Don&apos;t worry about precision—
                reasonable estimates will give you a useful ballpark figure.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Critical Assets */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Number of Critical Assets
                  </label>
                  <input
                    type="number"
                    value={inputs.criticalAssets}
                    onChange={(e) => handleInputChange('criticalAssets', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="1"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Equipment that would benefit from RCM analysis
                  </p>
                </div>

                {/* Average Maintenance Cost */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Avg. Annual Maintenance Cost per Asset (£)
                  </label>
                  <input
                    type="number"
                    value={inputs.avgMaintenanceCost}
                    onChange={(e) => handleInputChange('avgMaintenanceCost', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Include parts, labor, and contractor costs
                  </p>
                </div>

                {/* Downtime Hours */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Avg. Unplanned Downtime Hours per Year
                  </label>
                  <input
                    type="number"
                    value={inputs.avgDowntimeHours}
                    onChange={(e) => handleInputChange('avgDowntimeHours', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Total hours across all critical assets
                  </p>
                </div>

                {/* Cost per Hour */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Cost of Downtime per Hour (£)
                  </label>
                  <input
                    type="number"
                    value={inputs.downtimeCostPerHour}
                    onChange={(e) => handleInputChange('downtimeCostPerHour', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Lost production + emergency repair premium
                  </p>
                </div>

                {/* PM Tasks */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Current PM Task Count
                  </label>
                  <input
                    type="number"
                    value={inputs.currentPMTasks}
                    onChange={(e) => handleInputChange('currentPMTasks', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Total recurring PM work orders per year
                  </p>
                </div>

                {/* Labor Rate */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Average Labor Rate (£/hour)
                  </label>
                  <input
                    type="number"
                    value={inputs.avgLaborRate}
                    onChange={(e) => handleInputChange('avgLaborRate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-mid-grey mt-1">
                    Fully loaded rate (including overheads)
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-deep-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-navy transition-colors"
                >
                  Calculate ROI
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-4 rounded-lg font-semibold text-mid-grey hover:text-charcoal border border-light-grey hover:border-charcoal transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results Section */}
            {showResults && (
              <div ref={resultsRef} className="mt-8 space-y-8">
                {/* Print Header */}
                <div className="print-only text-center mb-8">
                  <h1 className="font-heading text-3xl font-bold text-slate-navy">RCM ROI Analysis</h1>
                  <p className="text-mid-grey mt-2">Generated by Reliability HQ</p>
                  <p className="text-sm text-mid-grey">reliabilityhq.com</p>
                </div>

                {/* Key Metrics Dashboard */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl font-bold text-slate-navy">
                      ROI Summary
                    </h2>
                    <button
                      onClick={handlePrint}
                      className="no-print text-deep-teal hover:text-slate-navy font-medium text-sm flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print Report
                    </button>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-deep-teal rounded-xl p-6 text-white text-center">
                      <p className="text-sm text-teal-200 mb-1">Annual Savings</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.annualSavings)}</p>
                    </div>
                    <div className="bg-industrial-amber rounded-xl p-6 text-white text-center">
                      <p className="text-sm text-orange-200 mb-1">Payback Period</p>
                      <p className="text-3xl font-bold">{results.paybackMonths} months</p>
                    </div>
                    <div className="bg-slate-navy rounded-xl p-6 text-white text-center">
                      <p className="text-sm text-gray-300 mb-1">5-Year ROI</p>
                      <p className="text-3xl font-bold">{formatPercent(results.fiveYearROI)}</p>
                    </div>
                    <div className="bg-green-600 rounded-xl p-6 text-white text-center">
                      <p className="text-sm text-green-200 mb-1">5-Year Savings</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.fiveYearSavings)}</p>
                    </div>
                  </div>

                  {/* Before/After Comparison */}
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                    Annual Cost Comparison
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Bar Chart */}
                    <div className="flex items-end justify-center gap-12 h-64 pt-8">
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-bold text-charcoal mb-2">
                          {formatCurrency(results.currentTotalCost)}
                        </div>
                        <div 
                          className="w-24 bg-red-500 rounded-t-lg transition-all duration-500 relative"
                          style={{ height: `${currentBarHeight}px` }}
                        >
                          <div 
                            className="absolute bottom-0 w-full bg-red-400 rounded-t-lg"
                            style={{ height: `${(results.currentDowntimeCost / results.currentTotalCost) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm font-medium text-charcoal mt-3">Current</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-bold text-charcoal mb-2">
                          {formatCurrency(results.projectedTotalCost)}
                        </div>
                        <div 
                          className="w-24 bg-deep-teal rounded-t-lg transition-all duration-500 relative"
                          style={{ height: `${projectedBarHeight}px` }}
                        >
                          <div 
                            className="absolute bottom-0 w-full bg-teal-400 rounded-t-lg"
                            style={{ height: `${(results.projectedDowntimeCost / (results.projectedTotalCost || 1)) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm font-medium text-charcoal mt-3">With RCM</p>
                      </div>
                    </div>

                    {/* Cost Breakdown Table */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs text-mid-grey mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-red-500"></span>
                          <span>Maintenance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-red-400"></span>
                          <span>Downtime</span>
                        </div>
                      </div>
                      
                      <div className="bg-off-white rounded-lg p-4">
                        <h4 className="font-semibold text-slate-navy mb-3">Current Costs</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-mid-grey">Maintenance:</span>
                            <span className="font-medium">{formatCurrency(results.currentMaintenanceCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-mid-grey">Downtime:</span>
                            <span className="font-medium">{formatCurrency(results.currentDowntimeCost)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-light-grey">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-red-600">{formatCurrency(results.currentTotalCost)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-deep-teal/5 border border-deep-teal/20 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-navy mb-3">Projected Costs with RCM</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-mid-grey">Maintenance:</span>
                            <span className="font-medium">{formatCurrency(results.projectedMaintenanceCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-mid-grey">Downtime:</span>
                            <span className="font-medium">{formatCurrency(results.projectedDowntimeCost)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-deep-teal/20">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-deep-teal">{formatCurrency(results.projectedTotalCost)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Savings */}
                  <div className="bg-off-white rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                      Additional Efficiency Gains
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-mid-grey mb-1">PM Tasks Eliminated</p>
                        <p className="text-2xl font-bold text-slate-navy">
                          {results.pmTaskReduction} tasks
                          <span className="text-sm text-mid-grey font-normal ml-2">
                            ({formatPercent(BENCHMARKS.pmTaskReduction.mid * 100)} reduction)
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-mid-grey mb-1">PM Labor Savings</p>
                        <p className="text-2xl font-bold text-deep-teal">
                          {formatCurrency(results.pmLaborSavings)}
                          <span className="text-sm text-mid-grey font-normal ml-2">/year</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assumptions & Benchmarks */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8">
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                    Industry Benchmarks Used
                  </h3>
                  <p className="text-mid-grey text-sm mb-6">
                    These calculations use conservative mid-range estimates based on published RCM case studies and industry data.
                    Actual results vary based on implementation quality, equipment types, and organizational factors.
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Maintenance Cost Reduction</p>
                      <p className="font-bold text-slate-navy">{formatPercent(BENCHMARKS.maintenanceReduction.mid * 100)}</p>
                      <p className="text-xs text-mid-grey mt-1">Range: 25-40%</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Downtime Reduction</p>
                      <p className="font-bold text-slate-navy">{formatPercent(BENCHMARKS.downtimeReduction.mid * 100)}</p>
                      <p className="text-xs text-mid-grey mt-1">Range: 50-70%</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">PM Task Reduction</p>
                      <p className="font-bold text-slate-navy">{formatPercent(BENCHMARKS.pmTaskReduction.mid * 100)}</p>
                      <p className="text-xs text-mid-grey mt-1">Range: 30-50%</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Implementation Cost</p>
                      <p className="font-bold text-slate-navy">{formatCurrency(BENCHMARKS.rcmImplementationCost)}</p>
                      <p className="text-xs text-mid-grey mt-1">Per critical asset</p>
                    </div>
                  </div>
                </div>

                {/* Input Summary for Print */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 print-break">
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">
                    Your Input Data
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Critical Assets</p>
                      <p className="font-bold text-slate-navy">{inputs.criticalAssets}</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Avg. Maintenance Cost</p>
                      <p className="font-bold text-slate-navy">{formatCurrency(inputs.avgMaintenanceCost)}/asset</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Unplanned Downtime</p>
                      <p className="font-bold text-slate-navy">{inputs.avgDowntimeHours} hours/year</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Downtime Cost</p>
                      <p className="font-bold text-slate-navy">{formatCurrency(inputs.downtimeCostPerHour)}/hour</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Current PM Tasks</p>
                      <p className="font-bold text-slate-navy">{inputs.currentPMTasks}/year</p>
                    </div>
                    <div className="bg-off-white rounded-lg p-4">
                      <p className="text-mid-grey mb-1">Labor Rate</p>
                      <p className="font-bold text-slate-navy">{formatCurrency(inputs.avgLaborRate)}/hour</p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-deep-teal to-slate-navy rounded-2xl p-8 text-white text-center no-print">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Ready to Achieve These Savings?
                  </h3>
                  <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                    Start your RCM journey with our professional templates and training. 
                    Get the tools and knowledge to implement RCM properly and realize these ROI projections.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/products"
                      className="inline-block bg-industrial-amber text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Browse RCM Templates →
                    </Link>
                    <Link
                      href="/training"
                      className="inline-block bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
                    >
                      RCM Training →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-white section-padding no-print">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6 text-center">
              Understanding Your ROI
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-off-white rounded-xl p-6">
                <h3 className="font-heading font-semibold text-slate-navy mb-3">What This Calculator Does</h3>
                <p className="text-mid-grey text-sm leading-relaxed">
                  This tool estimates the financial return from implementing RCM using industry-standard benchmarks. 
                  It helps you build a business case by quantifying potential maintenance cost reductions, 
                  downtime savings, and PM optimization opportunities.
                </p>
              </div>
              
              <div className="bg-off-white rounded-xl p-6">
                <h3 className="font-heading font-semibold text-slate-navy mb-3">Important Caveats</h3>
                <ul className="text-mid-grey text-sm space-y-2">
                  <li>• Results depend on implementation quality</li>
                  <li>• Benefits typically take 12-24 months to materialize fully</li>
                  <li>• Some industries achieve higher/lower than benchmarks</li>
                  <li>• Consult with RCM professionals for detailed analysis</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-industrial-amber/5 border border-industrial-amber/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-heading font-semibold text-slate-navy mb-2">Pro Tip: Start with a Pilot</h4>
                  <p className="text-mid-grey text-sm">
                    Don&apos;t try to boil the ocean. Start with 5-10 critical assets, prove the methodology works, 
                    then scale up. Use the{' '}
                    <Link href="/tools/criticality-calculator" className="text-deep-teal hover:underline">
                      Criticality Calculator
                    </Link>{' '}
                    to identify your best candidates for a pilot program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
