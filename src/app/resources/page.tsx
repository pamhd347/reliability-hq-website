'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailSignupForm from '@/components/EmailSignupForm';

interface ChecklistItem {
  id: string;
  phase: string;
  text: string;
  tips?: string;
}

const rcmChecklist: ChecklistItem[] = [
  // Phase 1: Preparation
  { id: '1.1', phase: 'Preparation', text: 'Secure management commitment and sponsorship', tips: 'RCM requires resources and time. Get executive buy-in before starting.' },
  { id: '1.2', phase: 'Preparation', text: 'Select pilot system/equipment for initial analysis', tips: 'Choose something important enough to matter, but contained enough to finish.' },
  { id: '1.3', phase: 'Preparation', text: 'Assemble cross-functional analysis team', tips: 'Include operators, maintainers, engineers, and subject matter experts.' },
  { id: '1.4', phase: 'Preparation', text: 'Gather existing documentation (P&IDs, manuals, maintenance history)', tips: 'Historical failure data is gold. Collect everything you can find.' },
  { id: '1.5', phase: 'Preparation', text: 'Train team on RCM methodology', tips: 'Everyone should understand the seven questions and decision logic.' },
  
  // Phase 2: Operating Context
  { id: '2.1', phase: 'Operating Context', text: 'Define operating context and boundaries', tips: 'Specify load, environment, duty cycle, and interfaces with other systems.' },
  { id: '2.2', phase: 'Operating Context', text: 'Establish performance standards', tips: 'What output/quality/rate defines "working properly"?' },
  { id: '2.3', phase: 'Operating Context', text: 'Identify regulatory and safety requirements', tips: 'List any codes, standards, or legal requirements that apply.' },
  
  // Phase 3: Functions
  { id: '3.1', phase: 'Functions', text: 'List all functions (primary and secondary)', tips: 'Don\'t forget secondary functions: containment, appearance, safety devices.' },
  { id: '3.2', phase: 'Functions', text: 'Define performance standards for each function', tips: 'Quantify where possible: flow rate, pressure, temperature, etc.' },
  { id: '3.3', phase: 'Functions', text: 'Identify hidden functions', tips: 'Protective devices and standby equipment have hidden functions.' },
  
  // Phase 4: Functional Failures
  { id: '4.1', phase: 'Functional Failures', text: 'Identify all ways each function can fail', tips: 'Total loss, partial loss, over-performance are all functional failures.' },
  { id: '4.2', phase: 'Functional Failures', text: 'Document functional failure descriptions', tips: 'Be specific: "Fails to deliver at least 100 L/min" not just "pump fails".' },
  
  // Phase 5: Failure Modes & Effects
  { id: '5.1', phase: 'FMEA', text: 'Identify failure modes for each functional failure', tips: 'What physical events could cause each functional failure?' },
  { id: '5.2', phase: 'FMEA', text: 'Describe failure effects (local, system, plant)', tips: 'Describe what happens: evidence, safety impact, operational impact.' },
  { id: '5.3', phase: 'FMEA', text: 'Assess failure consequences (S/E/O/N)', tips: 'Safety, Environmental, Operational, or Non-operational consequences?' },
  { id: '5.4', phase: 'FMEA', text: 'Document in FMEA worksheet format', tips: 'Use a standardized template to ensure consistency.' },
  
  // Phase 6: Task Selection
  { id: '6.1', phase: 'Task Selection', text: 'Apply RCM decision logic to each failure mode', tips: 'Work through the decision diagram systematically for each mode.' },
  { id: '6.2', phase: 'Task Selection', text: 'Select appropriate maintenance tasks', tips: 'Condition-based, scheduled, failure-finding, or redesign.' },
  { id: '6.3', phase: 'Task Selection', text: 'Define task intervals and procedures', tips: 'Base intervals on P-F interval, cost analysis, or acceptable risk.' },
  { id: '6.4', phase: 'Task Selection', text: 'Identify any redesign requirements', tips: 'Some failure modes can\'t be managed by maintenance alone.' },
  
  // Phase 7: Implementation
  { id: '7.1', phase: 'Implementation', text: 'Develop maintenance procedures', tips: 'Turn task decisions into actionable work instructions.' },
  { id: '7.2', phase: 'Implementation', text: 'Load tasks into CMMS/EAM system', tips: 'Create PM work orders with proper intervals and resources.' },
  { id: '7.3', phase: 'Implementation', text: 'Train maintenance technicians', tips: 'Explain the "why" behind tasks, not just the "what".' },
  { id: '7.4', phase: 'Implementation', text: 'Communicate changes to operations', tips: 'Operators need to understand new monitoring and inspection activities.' },
  
  // Phase 8: Living Program
  { id: '8.1', phase: 'Living Program', text: 'Establish review triggers (failures, modifications, time)', tips: 'RCM is not "set and forget" - schedule periodic reviews.' },
  { id: '8.2', phase: 'Living Program', text: 'Track key metrics (failures, costs, availability)', tips: 'Measure to prove the program is working.' },
  { id: '8.3', phase: 'Living Program', text: 'Update analysis based on operating experience', tips: 'Real-world data should refine your failure mode list and intervals.' },
  { id: '8.4', phase: 'Living Program', text: 'Expand to additional systems', tips: 'Use lessons learned to improve the process for future analyses.' },
];

const phases = ['Preparation', 'Operating Context', 'Functions', 'Functional Failures', 'FMEA', 'Task Selection', 'Implementation', 'Living Program'];

export default function ResourcesPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(phases));

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const togglePhase = (phase: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  const getPhaseProgress = (phase: string) => {
    const phaseItems = rcmChecklist.filter(item => item.phase === phase);
    const checkedCount = phaseItems.filter(item => checkedItems.has(item.id)).length;
    return { checked: checkedCount, total: phaseItems.length };
  };

  const totalProgress = {
    checked: checkedItems.size,
    total: rcmChecklist.length,
    percentage: Math.round((checkedItems.size / rcmChecklist.length) * 100),
  };

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
              Free RCM Resources
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Tools, checklists, and educational content to support your reliability journey. 
              No signup required for the tools—just start using them.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8 text-center">
            Interactive Tools
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* RCM Decision Diagram Card */}
            <Link 
              href="/tools/rcm-decision-diagram"
              className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-deep-teal/20 transition-colors">
                <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-navy mb-2 group-hover:text-deep-teal transition-colors">
                RCM Decision Diagram
              </h3>
              <p className="text-mid-grey mb-4">
                Interactive step-by-step tool to determine the right maintenance strategy for any failure mode. 
                Based on Moubray&apos;s methodology and SAE JA1011 standards.
              </p>
              <span className="text-deep-teal font-semibold text-sm inline-flex items-center gap-1">
                Try it free →
              </span>
            </Link>

            {/* Criticality Calculator Card */}
            <Link 
              href="/tools/criticality-calculator"
              className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-industrial-amber/20 transition-colors">
                <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-navy mb-2 group-hover:text-deep-teal transition-colors">
                Criticality Calculator
              </h3>
              <p className="text-mid-grey mb-4">
                Score and rank your equipment by criticality to prioritize maintenance resources and 
                identify where to focus your RCM analysis efforts.
              </p>
              <span className="text-deep-teal font-semibold text-sm inline-flex items-center gap-1">
                Try it free →
              </span>
            </Link>

            {/* ROI Calculator Card */}
            <Link 
              href="/tools/roi-calculator"
              className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600/20 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-navy mb-2 group-hover:text-deep-teal transition-colors">
                ROI Calculator
              </h3>
              <p className="text-mid-grey mb-4">
                Build the business case for RCM. Calculate potential savings, payback period, and 5-year ROI 
                using industry benchmarks. Executive-ready reports included.
              </p>
              <span className="text-deep-teal font-semibold text-sm inline-flex items-center gap-1">
                Try it free →
              </span>
            </Link>

            {/* Readiness Assessment Card */}
            <Link 
              href="/tools/readiness-assessment"
              className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-navy mb-2 group-hover:text-deep-teal transition-colors">
                Readiness Assessment
              </h3>
              <p className="text-mid-grey mb-4">
                Assess your organization&apos;s RCM readiness across 5 key areas. Get a personalized report with 
                category scores, recommendations, and suggested next steps.
              </p>
              <span className="text-deep-teal font-semibold text-sm inline-flex items-center gap-1">
                Take assessment →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* RCM Basics Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8 text-center">
              RCM Basics
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-off-white rounded-xl p-6 md:p-8 mb-8">
                <h3 className="font-heading text-xl font-semibold text-slate-navy mb-4">What is RCM?</h3>
                <p className="text-charcoal mb-4">
                  <strong>Reliability Centred Maintenance (RCM)</strong> is a structured methodology for determining 
                  the maintenance requirements of physical assets in their operating context. It was originally 
                  developed in the civil aviation industry and has since been adopted across manufacturing, 
                  utilities, mining, oil & gas, and other asset-intensive industries.
                </p>
                <p className="text-charcoal">
                  The goal of RCM is to preserve system function—not just the equipment itself. By focusing on 
                  what the asset needs to <em>do</em> rather than what it <em>is</em>, RCM helps organizations 
                  develop maintenance strategies that are both effective and efficient.
                </p>
              </div>

              <h3 className="font-heading text-xl font-semibold text-slate-navy mb-4">The Seven RCM Questions</h3>
              <p className="text-mid-grey mb-4">
                Every RCM analysis answers these seven questions for each asset in its operating context:
              </p>
              
              <ol className="space-y-4 mb-8">
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div>
                    <strong className="text-slate-navy">What are the functions?</strong>
                    <p className="text-mid-grey text-sm mt-1">What does the asset need to do? What performance standards must it meet?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div>
                    <strong className="text-slate-navy">What are the functional failures?</strong>
                    <p className="text-mid-grey text-sm mt-1">In what ways can it fail to fulfill those functions?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div>
                    <strong className="text-slate-navy">What are the failure modes?</strong>
                    <p className="text-mid-grey text-sm mt-1">What events cause each functional failure?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <div>
                    <strong className="text-slate-navy">What are the failure effects?</strong>
                    <p className="text-mid-grey text-sm mt-1">What happens when each failure occurs?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</span>
                  <div>
                    <strong className="text-slate-navy">What are the consequences?</strong>
                    <p className="text-mid-grey text-sm mt-1">Does it affect safety, environment, operations, or only repair costs?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">6</span>
                  <div>
                    <strong className="text-slate-navy">What can be done to prevent or predict the failure?</strong>
                    <p className="text-mid-grey text-sm mt-1">Is there an applicable and effective proactive task?</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-deep-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">7</span>
                  <div>
                    <strong className="text-slate-navy">What if no proactive task can be found?</strong>
                    <p className="text-mid-grey text-sm mt-1">Should we accept the risk, or is redesign required?</p>
                  </div>
                </li>
              </ol>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-deep-teal/5 rounded-xl p-6 border border-deep-teal/20">
                  <h4 className="font-heading font-semibold text-slate-navy mb-3">Key Standards</h4>
                  <ul className="text-sm text-mid-grey space-y-2">
                    <li><strong>SAE JA1011:</strong> Evaluation Criteria for RCM Processes</li>
                    <li><strong>SAE JA1012:</strong> Guide to the RCM Standard</li>
                    <li><strong>IEC 60300-3-11:</strong> Reliability centered maintenance</li>
                  </ul>
                </div>
                <div className="bg-industrial-amber/5 rounded-xl p-6 border border-industrial-amber/20">
                  <h4 className="font-heading font-semibold text-slate-navy mb-3">Essential Reading</h4>
                  <ul className="text-sm text-mid-grey space-y-2">
                    <li><strong>John Moubray:</strong> Reliability-centred Maintenance (RCM II)</li>
                    <li><strong>Nowlan & Heap:</strong> Original 1978 RCM Report</li>
                    <li><strong>Anthony Smith:</strong> RCM - Gateway to World Class Maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Checklist Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-slate-navy mb-4">
                RCM Implementation Checklist
              </h2>
              <p className="text-mid-grey">
                Track your progress through a complete RCM implementation. Click items to mark them complete.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-6 border border-light-grey mb-8 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-heading font-semibold text-slate-navy">Overall Progress</span>
                <span className="text-deep-teal font-bold">{totalProgress.percentage}%</span>
              </div>
              <div className="h-4 bg-light-grey rounded-full overflow-hidden">
                <div
                  className="h-full bg-deep-teal transition-all duration-500 rounded-full"
                  style={{ width: `${totalProgress.percentage}%` }}
                />
              </div>
              <p className="text-sm text-mid-grey mt-2">
                {totalProgress.checked} of {totalProgress.total} items complete
              </p>
            </div>

            {/* Checklist by Phase */}
            <div className="space-y-4">
              {phases.map((phase, phaseIndex) => {
                const progress = getPhaseProgress(phase);
                const isExpanded = expandedPhases.has(phase);
                const phaseItems = rcmChecklist.filter(item => item.phase === phase);
                
                return (
                  <div key={phase} className="bg-white rounded-xl border border-light-grey overflow-hidden shadow-sm">
                    <button
                      onClick={() => togglePhase(phase)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-off-white transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="bg-slate-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {phaseIndex + 1}
                        </span>
                        <div className="text-left">
                          <h3 className="font-heading font-semibold text-slate-navy">{phase}</h3>
                          <p className="text-sm text-mid-grey">
                            {progress.checked}/{progress.total} complete
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-2 bg-light-grey rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-deep-teal transition-all duration-300"
                            style={{ width: `${(progress.checked / progress.total) * 100}%` }}
                          />
                        </div>
                        <svg
                          className={`w-5 h-5 text-mid-grey transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="border-t border-light-grey px-6 py-4 space-y-3">
                        {phaseItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                              checkedItems.has(item.id) ? 'bg-deep-teal/5' : 'hover:bg-off-white'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              checkedItems.has(item.id)
                                ? 'bg-deep-teal border-deep-teal'
                                : 'border-light-grey'
                            }`}>
                              {checkedItems.has(item.id) && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${checkedItems.has(item.id) ? 'text-deep-teal line-through' : 'text-charcoal'}`}>
                                {item.text}
                              </p>
                              {item.tips && (
                                <p className="text-sm text-mid-grey mt-1">{item.tips}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-mid-grey mt-6">
              💡 Your progress is stored in your browser. Refresh or return later to continue.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Want More Free Resources?
            </h2>
            <p className="text-gray-200 mb-8">
              Join our mailing list for free templates, practical tips, and new resource announcements. 
              We respect your inbox—no spam, ever.
            </p>
            
            <EmailSignupForm />
            <p className="text-gray-300 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Premium Products CTA */}
      <section className="bg-slate-navy section-padding">
        <div className="container-max text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
            Ready for Professional-Grade Templates?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our free tools are great for learning and quick assessments. When you&apos;re ready for 
            comprehensive FMEA worksheets, decision logic templates, and complete analysis packages, 
            check out our premium products.
          </p>
          <Link
            href="/products"
            className="inline-block bg-industrial-amber text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Premium Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
