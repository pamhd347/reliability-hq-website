'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  explanation: string;
  yesNext: string | null;
  noNext: string | null;
  yesResult?: ConsequenceResult;
  noResult?: ConsequenceResult;
}

interface ConsequenceResult {
  category: 'hidden-safety' | 'hidden-operational' | 'safety' | 'environmental' | 'operational' | 'non-operational';
  title: string;
  description: string;
  color: string;
  action: string;
  tasks: string[];
}

const results: Record<string, ConsequenceResult> = {
  'hidden-safety': {
    category: 'hidden-safety',
    title: 'Hidden Failure with Safety Consequences',
    description: 'This is a hidden failure (not evident during normal operation) that protects against a hazard with safety consequences.',
    color: 'bg-red-500',
    action: 'MANDATORY: Failure-finding task required. If no suitable failure-finding task exists, redesign is mandatory.',
    tasks: [
      'Failure-finding task at appropriate interval',
      'Interval based on acceptable unavailability and protected event frequency',
      'If failure-finding not possible → REDESIGN MANDATORY',
    ],
  },
  'hidden-operational': {
    category: 'hidden-operational',
    title: 'Hidden Failure with Operational Consequences',
    description: 'This is a hidden failure that protects against an event with operational (economic) consequences only.',
    color: 'bg-orange-500',
    action: 'Failure-finding task required if economically justified.',
    tasks: [
      'Failure-finding task at economically justified interval',
      'Balance test cost against consequence of not testing',
      'If failure-finding not justified → accept risk or consider redesign',
    ],
  },
  'safety': {
    category: 'safety',
    title: 'Safety Consequences',
    description: 'This failure could cause injury, death, or significant safety hazard.',
    color: 'bg-red-600',
    action: 'MANDATORY: Must find an effective proactive task. If none exists, redesign is mandatory.',
    tasks: [
      'On-condition task (if technically feasible)',
      'Scheduled restoration (if age-reliability relationship exists)',
      'Scheduled discard (if age-reliability relationship exists)',
      'If NO effective proactive task → REDESIGN MANDATORY',
      'Run-to-failure is NOT acceptable',
    ],
  },
  'environmental': {
    category: 'environmental',
    title: 'Environmental Consequences',
    description: 'This failure could cause environmental harm, breach regulations, or result in significant environmental damage.',
    color: 'bg-green-600',
    action: 'Same as safety: Must find an effective proactive task or redesign.',
    tasks: [
      'On-condition task (if technically feasible)',
      'Scheduled restoration (if age-reliability relationship exists)',
      'Scheduled discard (if age-reliability relationship exists)',
      'If NO effective proactive task → REDESIGN MANDATORY',
      'Run-to-failure is NOT acceptable',
    ],
  },
  'operational': {
    category: 'operational',
    title: 'Operational Consequences',
    description: 'This failure affects production, output, quality, or causes significant economic impact beyond repair cost.',
    color: 'bg-amber-500',
    action: 'Proactive task must be economically justified (cost of prevention < cost of failure).',
    tasks: [
      'On-condition task (if cost-justified)',
      'Scheduled restoration (if cost-justified and age-related)',
      'Scheduled discard (if cost-justified and age-related)',
      'If NO cost-justified task → Run-to-failure acceptable',
      'Consider redesign if consequences unacceptable',
    ],
  },
  'non-operational': {
    category: 'non-operational',
    title: 'Non-Operational Consequences',
    description: 'The only consequence is the cost of repair. No safety, environmental, or operational impact.',
    color: 'bg-blue-500',
    action: 'Proactive task only if it costs less than repair. Run-to-failure often optimal.',
    tasks: [
      'On-condition task (only if cheaper than failure)',
      'Scheduled task (only if cheaper than failure)',
      'Run-to-failure is usually the correct answer',
      'Ensure spares and repair capability ready',
    ],
  },
};

const questions: Record<string, Question> = {
  'q1': {
    id: 'q1',
    question: 'Will the loss of function caused by this failure mode on its own become evident to the operating crew under normal circumstances?',
    explanation: 'Consider whether operators would notice the failure during normal rounds, through alarms, performance changes, or physical evidence (noise, leaks, etc.).',
    yesNext: 'q2',
    noNext: 'q5',
  },
  'q2': {
    id: 'q2',
    question: 'Does the failure mode cause a loss of function or secondary damage that could hurt or kill someone?',
    explanation: 'Consider direct injury (e.g., rotating equipment contact) and indirect hazards (e.g., fire, explosion, toxic release leading to injury).',
    yesNext: null,
    noNext: 'q3',
    yesResult: results['safety'],
  },
  'q3': {
    id: 'q3',
    question: 'Does the failure mode cause a loss of function or secondary damage that could breach any known environmental standard or regulation?',
    explanation: 'Consider emissions, discharges, spills, or any environmental impact that would violate permits or regulations.',
    yesNext: null,
    noNext: 'q4',
    yesResult: results['environmental'],
  },
  'q4': {
    id: 'q4',
    question: 'Does the failure mode have a direct adverse effect on operational capability (production, quality, customer service, etc.)?',
    explanation: 'Consider lost production, quality defects, delayed deliveries, or any impact beyond just the cost of repairing the failure.',
    yesNext: null,
    noNext: null,
    yesResult: results['operational'],
    noResult: results['non-operational'],
  },
  'q5': {
    id: 'q5',
    question: 'Does this hidden failure mode protect against a hazard that could hurt or kill someone (including multiple failure scenarios)?',
    explanation: 'Hidden failures often involve protective devices. Consider what happens if the protection has failed AND the protected event occurs.',
    yesNext: null,
    noNext: 'q6',
    yesResult: results['hidden-safety'],
  },
  'q6': {
    id: 'q6',
    question: 'Does this hidden failure mode protect against an event with operational or economic consequences?',
    explanation: 'Consider backup equipment, standby systems, or protective devices for operational events.',
    yesNext: null,
    noNext: null,
    yesResult: results['hidden-operational'],
    noResult: results['hidden-operational'], // Default to hidden-operational if hidden but no protected consequence identified
  },
};

export default function ConsequenceClassifierPage() {
  const [currentQuestion, setCurrentQuestion] = useState<string>('q1');
  const [history, setHistory] = useState<{ questionId: string; answer: boolean }[]>([]);
  const [result, setResult] = useState<ConsequenceResult | null>(null);
  const [failureDescription, setFailureDescription] = useState('');
  const [started, setStarted] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    setHistory([...history, { questionId: currentQuestion, answer }]);
    
    const next = answer ? question.yesNext : question.noNext;
    const resultData = answer ? question.yesResult : question.noResult;
    
    if (resultData) {
      setResult(resultData);
    } else if (next) {
      setCurrentQuestion(next);
    }
  };

  const goBack = () => {
    if (history.length === 0) {
      setStarted(false);
      return;
    }
    
    const newHistory = [...history];
    const lastStep = newHistory.pop();
    setHistory(newHistory);
    setResult(null);
    
    if (lastStep) {
      setCurrentQuestion(lastStep.questionId);
    }
  };

  const reset = () => {
    setCurrentQuestion('q1');
    setHistory([]);
    setResult(null);
    setStarted(false);
    setFailureDescription('');
  };

  const copyResult = () => {
    if (!result) return;
    
    const text = `CONSEQUENCE CLASSIFICATION RESULT

Failure Mode: ${failureDescription || '[Not specified]'}

Category: ${result.title}

Description: ${result.description}

Required Action: ${result.action}

Recommended Tasks:
${result.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

---
Classified using RCM consequence evaluation logic per SAE JA1011`;
    
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
            {(started || result) && (
              <button
                onClick={reset}
                className="text-sm text-mid-grey hover:text-deep-teal"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-navy" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy">Consequence Classifier</h1>
            <p className="text-mid-grey mt-2">Interactive RCM decision logic for consequence evaluation</p>
          </div>

          {/* Start Screen */}
          {!started && !result && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-xl font-semibold text-slate-navy mb-4">
                Classify Failure Consequences
              </h2>
              <p className="text-mid-grey mb-6">
                This tool walks you through the RCM consequence evaluation logic step by step. 
                Answer each question to determine the consequence category and appropriate maintenance approach.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Failure mode being evaluated (optional)
                </label>
                <input
                  type="text"
                  value={failureDescription}
                  onChange={(e) => setFailureDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  placeholder="e.g., Pump bearing fails due to fatigue"
                />
              </div>

              <div className="bg-off-white rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-charcoal mb-2">How it works:</h3>
                <ol className="text-sm text-mid-grey space-y-1 list-decimal list-inside">
                  <li>Answer questions about your failure mode</li>
                  <li>The tool follows SAE JA1011 consequence logic</li>
                  <li>Get the correct consequence category</li>
                  <li>See recommended maintenance approach</li>
                </ol>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
              >
                Start Classification
              </button>
            </div>
          )}

          {/* Question Screen */}
          {started && !result && (
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-8">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-mid-grey">Question {history.length + 1}</span>
                <div className="flex-1 h-2 bg-light-grey rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-deep-teal transition-all" 
                    style={{ width: `${((history.length + 1) / 6) * 100}%` }}
                  />
                </div>
              </div>

              {failureDescription && (
                <div className="bg-off-white rounded-lg p-3 mb-6 text-sm">
                  <span className="text-mid-grey">Evaluating: </span>
                  <span className="text-charcoal font-medium">{failureDescription}</span>
                </div>
              )}

              <h2 className="font-heading text-xl font-semibold text-slate-navy mb-4">
                {question.question}
              </h2>
              
              <p className="text-mid-grey mb-8 text-sm bg-industrial-amber/10 border border-industrial-amber/20 rounded-lg p-4">
                💡 {question.explanation}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="py-4 px-6 rounded-xl border-2 border-green-500 text-green-700 font-semibold hover:bg-green-50 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="py-4 px-6 rounded-xl border-2 border-slate-navy text-slate-navy font-semibold hover:bg-slate-navy/5 transition-colors"
                >
                  No
                </button>
              </div>

              {history.length > 0 && (
                <button
                  onClick={goBack}
                  className="w-full mt-4 py-2 text-mid-grey hover:text-charcoal transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Go back
                </button>
              )}
            </div>
          )}

          {/* Result Screen */}
          {result && (
            <div className="space-y-6">
              {/* Result Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey overflow-hidden">
                <div className={`${result.color} px-6 py-4`}>
                  <h2 className="font-heading text-xl font-bold text-white">
                    {result.title}
                  </h2>
                </div>
                <div className="p-6">
                  {failureDescription && (
                    <div className="bg-off-white rounded-lg p-3 mb-4 text-sm">
                      <span className="text-mid-grey">Failure mode: </span>
                      <span className="text-charcoal font-medium">{failureDescription}</span>
                    </div>
                  )}
                  
                  <p className="text-charcoal mb-6">{result.description}</p>
                  
                  <div className="bg-slate-navy/5 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-slate-navy mb-2">Required Action</h3>
                    <p className="text-charcoal">{result.action}</p>
                  </div>

                  <h3 className="font-semibold text-slate-navy mb-3">Maintenance Task Options</h3>
                  <ul className="space-y-2">
                    {result.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-deep-teal/10 text-deep-teal rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-charcoal">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decision Path */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-slate-navy mb-4">Your Decision Path</h3>
                <div className="space-y-2">
                  {history.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 bg-light-grey rounded-full flex items-center justify-center text-mid-grey">
                        {i + 1}
                      </span>
                      <span className="text-mid-grey flex-1 truncate">
                        {questions[step.questionId].question.substring(0, 60)}...
                      </span>
                      <span className={`font-medium ${step.answer ? 'text-green-600' : 'text-slate-navy'}`}>
                        {step.answer ? 'Yes' : 'No'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors"
                >
                  Classify Another
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
