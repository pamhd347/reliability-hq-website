'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { 
  ProjectInfo, 
  TeamMember, 
  AnalysisType, 
  Priority, 
  Criticality,
  TeamRole 
} from '@/types/rcm-analysis';

// Step components will be separate for cleaner code
// For now, implementing Step 1: Project Information

const analysisTypes: { value: AnalysisType; label: string; description: string }[] = [
  { value: 'INITIAL', label: 'Initial Analysis', description: 'First-time RCM analysis for this system' },
  { value: 'SCHEDULED_REVIEW', label: 'Scheduled Review', description: 'Periodic review of existing analysis' },
  { value: 'MOC_TRIGGERED', label: 'Management of Change', description: 'Triggered by system modification' },
  { value: 'FAILURE_TRIGGERED', label: 'Failure Triggered', description: 'Response to unexpected failure event' },
  { value: 'OPTIMIZATION', label: 'Task Optimization', description: 'Optimize existing maintenance tasks' },
];

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'LOW', label: 'Low', color: 'bg-gray-100 text-gray-700' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { value: 'HIGH', label: 'High', color: 'bg-amber-100 text-amber-700' },
  { value: 'CRITICAL', label: 'Critical', color: 'bg-red-100 text-red-700' },
];

const criticalities: { value: Criticality; label: string; description: string }[] = [
  { value: 'SAFETY_CRITICAL', label: 'Safety Critical', description: 'Potential for injury or fatality' },
  { value: 'ENVIRONMENTAL_CRITICAL', label: 'Environmental Critical', description: 'Potential for environmental violation' },
  { value: 'PRODUCTION_CRITICAL', label: 'Production Critical', description: 'Direct impact on production' },
  { value: 'SUPPORT', label: 'Support Function', description: 'Supporting role, indirect impact' },
  { value: 'NOT_ASSESSED', label: 'Not Yet Assessed', description: 'To be determined during analysis' },
];

const teamRoles: { value: TeamRole; label: string; required: boolean }[] = [
  { value: 'FACILITATOR', label: 'Facilitator', required: true },
  { value: 'OPERATIONS_REP', label: 'Operations Representative', required: true },
  { value: 'MAINTENANCE_REP', label: 'Maintenance Representative', required: true },
  { value: 'ENGINEERING_REP', label: 'Engineering Representative', required: false },
  { value: 'RELIABILITY_ENGINEER', label: 'Reliability Engineer', required: false },
  { value: 'SUBJECT_MATTER_EXPERT', label: 'Subject Matter Expert', required: false },
  { value: 'REVIEWER', label: 'Reviewer', required: false },
  { value: 'OBSERVER', label: 'Observer', required: false },
];

export default function NewAnalysisPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [projectInfo, setProjectInfo] = useState<Partial<ProjectInfo>>({
    name: '',
    description: '',
    facilityId: '',
    facilityName: '',
    analysisType: 'INITIAL',
    priority: 'MEDIUM',
    criticality: 'NOT_ASSESSED',
    team: [],
    stakeholders: [],
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!projectInfo.name || projectInfo.name.length < 5) {
      newErrors.name = 'Project name must be at least 5 characters';
    }
    if (!projectInfo.description || projectInfo.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    if (!projectInfo.facilityName) {
      newErrors.facilityName = 'Facility is required';
    }
    if (projectInfo.analysisType === 'MOC_TRIGGERED' && !projectInfo.triggerReason) {
      newErrors.triggerReason = 'Trigger reason is required for MOC analyses';
    }
    if (!projectInfo.targetCompletionDate) {
      newErrors.targetCompletionDate = 'Target completion date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
    // Add validation for other steps as they're implemented
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    // TODO: Save to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push('/rcm-analysis');
  };

  const steps = [
    { number: 1, title: 'Project Information', description: 'Basic details and team' },
    { number: 2, title: 'System Boundary', description: 'Define what\'s included' },
    { number: 3, title: 'Operating Context', description: 'How the system operates' },
    { number: 4, title: 'Review & Confirm', description: 'Verify and proceed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <span className="text-gray-900 font-medium">New Analysis</span>
            </div>
            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    ${currentStep >= step.number 
                      ? 'bg-deep-teal text-white' 
                      : 'bg-gray-200 text-gray-500'}
                  `}>
                    {currentStep > step.number ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-0.5 mx-4 ${currentStep > step.number ? 'bg-deep-teal' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Step 1: Project Information */}
          {currentStep === 1 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Project Information</h2>
                <p className="text-gray-500 mt-1">
                  Define the basic details of your RCM analysis project.
                </p>
              </div>

              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectInfo.name || ''}
                    onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
                    placeholder="e.g., Cooling Water System RCM Analysis"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={projectInfo.description || ''}
                    onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                    placeholder="Describe the purpose and scope of this analysis..."
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                {/* Facility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facility <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectInfo.facilityName || ''}
                    onChange={(e) => setProjectInfo({ ...projectInfo, facilityName: e.target.value })}
                    placeholder="e.g., Main Manufacturing Plant"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                      errors.facilityName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.facilityName && <p className="mt-1 text-sm text-red-500">{errors.facilityName}</p>}
                </div>

                {/* Analysis Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {analysisTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setProjectInfo({ ...projectInfo, analysisType: type.value })}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          projectInfo.analysisType === type.value
                            ? 'border-deep-teal bg-deep-teal/5 ring-2 ring-deep-teal/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* MOC Trigger Reason (conditional) */}
                {projectInfo.analysisType === 'MOC_TRIGGERED' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trigger Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={projectInfo.triggerReason || ''}
                      onChange={(e) => setProjectInfo({ ...projectInfo, triggerReason: e.target.value })}
                      placeholder="Describe what change triggered this analysis..."
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                        errors.triggerReason ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.triggerReason && <p className="mt-1 text-sm text-red-500">{errors.triggerReason}</p>}
                  </div>
                )}

                {/* Target Completion Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Completion Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={projectInfo.targetCompletionDate ? new Date(projectInfo.targetCompletionDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setProjectInfo({ ...projectInfo, targetCompletionDate: new Date(e.target.value) })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                      errors.targetCompletionDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.targetCompletionDate && <p className="mt-1 text-sm text-red-500">{errors.targetCompletionDate}</p>}
                </div>

                {/* Priority & Criticality Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex gap-2">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setProjectInfo({ ...projectInfo, priority: p.value })}
                          className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                            projectInfo.priority === p.value
                              ? `${p.color} border-transparent ring-2 ring-offset-1 ring-gray-300`
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Criticality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Criticality</label>
                    <select
                      value={projectInfo.criticality || 'NOT_ASSESSED'}
                      onChange={(e) => setProjectInfo({ ...projectInfo, criticality: e.target.value as Criticality })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                    >
                      {criticalities.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas..."
                    onChange={(e) => setProjectInfo({ 
                      ...projectInfo, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: System Boundary (Placeholder) */}
          {currentStep === 2 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">System Boundary</h2>
                <p className="text-gray-500 mt-1">
                  Define the equipment included in this analysis.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">System boundary selection coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">This will include equipment hierarchy browser and interface definition.</p>
              </div>
            </div>
          )}

          {/* Step 3: Operating Context (Placeholder) */}
          {currentStep === 3 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Operating Context</h2>
                <p className="text-gray-500 mt-1">
                  Define how the system operates in its environment.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Operating context definition coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">This will include environment, duty cycle, redundancy, and user expectations.</p>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm (Placeholder) */}
          {currentStep === 4 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Review & Confirm</h2>
                <p className="text-gray-500 mt-1">
                  Review your setup before proceeding to function analysis.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Review summary coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">This will show JA1011 compliance checklist and team sign-off.</p>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between rounded-b-xl">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="/rcm-analysis"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </Link>
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 text-sm font-medium bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={() => {/* TODO: Create analysis and redirect */}}
                  className="px-6 py-2 text-sm font-medium bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90"
                >
                  Create Analysis
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Panel */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Why This Matters</h3>
              <p className="text-sm text-blue-700 mt-1">
                <strong>JA1011 Section 5.1:</strong> "The analysis must begin with a clear definition of the operating context..."
                Without proper context, functions cannot be properly defined, and the entire analysis is built on sand.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
