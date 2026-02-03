'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createAnalysis } from '@/lib/rcm-api';
import type { 
  ProjectInfo, 
  AnalysisType, 
  Priority, 
  Criticality,
  TeamRole,
  SystemBoundary,
  EquipmentItem,
  ExclusionItem,
  SystemInterface,
  InterfaceType,
  OperatingContext,
  OperatingEnvironment,
  DutyCycle,
  RedundancyConfig,
  UserExpectation,
  LocationType,
  ClimateType,
  HumidityLevel,
  DustLevel,
  VibrationLevel,
  DutyType,
  LoadProfile,
  StartupFrequency,
  RedundancyType,
  SwitchoverMode,
  ExclusionReason,
} from '@/types/rcm-analysis';

// ============================================
// CONSTANTS & OPTIONS
// ============================================

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

const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'INDOOR_CONTROLLED', label: 'Indoor - Climate Controlled' },
  { value: 'INDOOR_UNCONTROLLED', label: 'Indoor - Uncontrolled' },
  { value: 'OUTDOOR_SHELTERED', label: 'Outdoor - Sheltered' },
  { value: 'OUTDOOR_EXPOSED', label: 'Outdoor - Fully Exposed' },
  { value: 'UNDERGROUND', label: 'Underground' },
  { value: 'OFFSHORE', label: 'Offshore Platform' },
  { value: 'SUBSEA', label: 'Subsea' },
];

const climateTypes: { value: ClimateType; label: string }[] = [
  { value: 'TROPICAL', label: 'Tropical' },
  { value: 'DESERT', label: 'Desert/Arid' },
  { value: 'TEMPERATE', label: 'Temperate' },
  { value: 'ARCTIC', label: 'Arctic/Cold' },
  { value: 'MARINE', label: 'Marine/Coastal' },
  { value: 'MIXED', label: 'Mixed/Variable' },
];

const humidityLevels: { value: HumidityLevel; label: string; range: string }[] = [
  { value: 'LOW', label: 'Low', range: '< 30%' },
  { value: 'MODERATE', label: 'Moderate', range: '30-60%' },
  { value: 'HIGH', label: 'High', range: '60-80%' },
  { value: 'VERY_HIGH', label: 'Very High', range: '> 80%' },
];

const dustLevels: { value: DustLevel; label: string }[] = [
  { value: 'CLEAN', label: 'Clean Room / Minimal' },
  { value: 'LIGHT', label: 'Light Dust' },
  { value: 'MODERATE', label: 'Moderate Dust' },
  { value: 'HEAVY', label: 'Heavy / Industrial' },
];

const vibrationLevels: { value: VibrationLevel; label: string }[] = [
  { value: 'MINIMAL', label: 'Minimal' },
  { value: 'LOW', label: 'Low' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'HIGH', label: 'High' },
  { value: 'SEVERE', label: 'Severe' },
];

const dutyTypes: { value: DutyType; label: string; description: string }[] = [
  { value: 'CONTINUOUS', label: 'Continuous', description: '24/7 operation' },
  { value: 'INTERMITTENT', label: 'Intermittent', description: 'Frequent start/stop' },
  { value: 'STANDBY', label: 'Standby', description: 'Mostly idle, on-demand' },
  { value: 'CYCLIC', label: 'Cyclic', description: 'Regular on/off cycles' },
  { value: 'SEASONAL', label: 'Seasonal', description: 'Part of year only' },
];

const loadProfiles: { value: LoadProfile; label: string }[] = [
  { value: 'CONSTANT', label: 'Constant Load' },
  { value: 'VARIABLE', label: 'Variable Load' },
  { value: 'CYCLIC', label: 'Cyclic Pattern' },
  { value: 'PEAK_SHAVING', label: 'Peak Shaving' },
  { value: 'LOAD_FOLLOWING', label: 'Load Following' },
];

const startupFrequencies: { value: StartupFrequency; label: string; range: string }[] = [
  { value: 'RARE', label: 'Rare', range: '< 12/year' },
  { value: 'OCCASIONAL', label: 'Occasional', range: '12-52/year' },
  { value: 'FREQUENT', label: 'Frequent', range: '52-365/year' },
  { value: 'VERY_FREQUENT', label: 'Very Frequent', range: '> 365/year' },
];

const redundancyTypes: { value: RedundancyType; label: string; description: string }[] = [
  { value: 'NONE', label: 'None', description: 'Single point, no backup' },
  { value: 'ACTIVE', label: 'Active-Active', description: 'Both running simultaneously' },
  { value: 'STANDBY_HOT', label: 'Hot Standby', description: 'Ready, warm and pressurized' },
  { value: 'STANDBY_WARM', label: 'Warm Standby', description: 'Ready but not running' },
  { value: 'STANDBY_COLD', label: 'Cold Standby', description: 'Available but needs preparation' },
];

const switchoverModes: { value: SwitchoverMode; label: string }[] = [
  { value: 'AUTOMATIC', label: 'Fully Automatic' },
  { value: 'SEMI_AUTOMATIC', label: 'Semi-Automatic (operator confirm)' },
  { value: 'MANUAL', label: 'Manual Switchover' },
];

const interfaceTypes: { value: InterfaceType; label: string; icon: string }[] = [
  { value: 'PROCESS', label: 'Process Fluid', icon: '💧' },
  { value: 'UTILITY', label: 'Utility', icon: '⚡' },
  { value: 'ELECTRICAL', label: 'Electrical Power', icon: '🔌' },
  { value: 'SIGNAL', label: 'Signal/Control', icon: '📡' },
  { value: 'STRUCTURAL', label: 'Structural', icon: '🏗️' },
];

const exclusionReasons: { value: ExclusionReason; label: string }[] = [
  { value: 'COVERED_ELSEWHERE', label: 'Covered in another analysis' },
  { value: 'OUT_OF_SCOPE', label: 'Out of scope for this analysis' },
  { value: 'DECOMMISSIONED', label: 'Decommissioned/Not in use' },
  { value: 'CONSUMABLE', label: 'Consumable item' },
  { value: 'OTHER', label: 'Other reason' },
];

// Sample equipment hierarchy for demo
const sampleEquipmentHierarchy: EquipmentItem[] = [
  { equipmentId: '1', tag: 'P-101', name: 'Cooling Water Pump A', equipmentClass: 'Rotating', equipmentType: 'Centrifugal Pump', level: 0, isInScope: true },
  { equipmentId: '1-1', tag: 'P-101-M', name: 'Pump Motor', equipmentClass: 'Rotating', equipmentType: 'Electric Motor', level: 1, parentId: '1', isInScope: true },
  { equipmentId: '1-2', tag: 'P-101-S', name: 'Mechanical Seal', equipmentClass: 'Static', equipmentType: 'Seal Assembly', level: 1, parentId: '1', isInScope: true },
  { equipmentId: '1-3', tag: 'P-101-C', name: 'Coupling', equipmentClass: 'Static', equipmentType: 'Flexible Coupling', level: 1, parentId: '1', isInScope: true },
  { equipmentId: '2', tag: 'P-102', name: 'Cooling Water Pump B (Standby)', equipmentClass: 'Rotating', equipmentType: 'Centrifugal Pump', level: 0, isInScope: true },
  { equipmentId: '2-1', tag: 'P-102-M', name: 'Pump Motor', equipmentClass: 'Rotating', equipmentType: 'Electric Motor', level: 1, parentId: '2', isInScope: true },
  { equipmentId: '3', tag: 'V-101', name: 'Suction Strainer', equipmentClass: 'Static', equipmentType: 'Strainer', level: 0, isInScope: true },
  { equipmentId: '4', tag: 'HX-101', name: 'Cooling Water Heat Exchanger', equipmentClass: 'Static', equipmentType: 'Shell & Tube', level: 0, isInScope: false },
  { equipmentId: '5', tag: 'TK-101', name: 'Cooling Tower Basin', equipmentClass: 'Static', equipmentType: 'Tank', level: 0, isInScope: false },
];

// JA1011 Compliance Checklist
const ja1011Checklist = [
  { id: 'ja1', section: '5.1', requirement: 'Operating context clearly defined', field: 'operatingContext' },
  { id: 'ja2', section: '5.1', requirement: 'System boundaries established', field: 'systemBoundary' },
  { id: 'ja3', section: '5.2', requirement: 'User expectations documented', field: 'userExpectations' },
  { id: 'ja4', section: '5.3', requirement: 'Equipment included in scope identified', field: 'includedEquipment' },
  { id: 'ja5', section: '5.3', requirement: 'Equipment excluded with justification', field: 'excludedEquipment' },
  { id: 'ja6', section: '5.4', requirement: 'System interfaces defined', field: 'interfaces' },
  { id: 'ja7', section: '5.5', requirement: 'Duty cycle and load profile specified', field: 'dutyCycle' },
  { id: 'ja8', section: '5.6', requirement: 'Redundancy configuration documented', field: 'redundancy' },
  { id: 'ja9', section: '5.7', requirement: 'Environment conditions specified', field: 'environment' },
  { id: 'ja10', section: '4.2', requirement: 'Analysis team assembled with required roles', field: 'team' },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function NewAnalysisPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1: Project Info State
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

  // Step 2: System Boundary State
  const [systemBoundary, setSystemBoundary] = useState<Partial<SystemBoundary>>({
    systemId: '',
    systemName: '',
    systemTag: '',
    includedEquipment: sampleEquipmentHierarchy.filter(e => e.isInScope),
    excludedEquipment: [],
    interfaces: [],
    boundaryNotes: '',
  });

  // Step 3: Operating Context State
  const [operatingContext, setOperatingContext] = useState<Partial<OperatingContext>>({
    environment: {
      location: 'INDOOR_CONTROLLED',
      climate: 'TEMPERATE',
      ambientTempRange: { min: 15, max: 35, unit: 'C', normalOperating: 25 },
      humidity: 'MODERATE',
      corrosiveAtmosphere: false,
      dustLevel: 'LIGHT',
      vibrationEnvironment: 'LOW',
      accessConstraints: '',
      specialConditions: [],
    },
    dutyCycle: {
      dutyType: 'CONTINUOUS',
      operatingHoursPerDay: 24,
      operatingDaysPerWeek: 7,
      operatingWeeksPerYear: 52,
      annualOperatingHours: 8760,
      loadProfile: 'CONSTANT',
      averageLoad: 80,
      peakLoad: 100,
      loadUnit: '%',
      startupFrequency: 'RARE',
      startupsPerYear: 4,
      typicalRunDuration: 2000,
      runDurationUnit: 'HOURS',
    },
    redundancy: {
      hasRedundancy: true,
      redundancyType: 'STANDBY_HOT',
      configuration: '1+1',
      switchoverMode: 'AUTOMATIC',
      switchoverTime: 30,
      switchoverTimeUnit: 'SECONDS',
    },
    userExpectations: [],
  });

  // UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedEquipment, setExpandedEquipment] = useState<Set<string>>(new Set(['1', '2']));
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(sampleEquipmentHierarchy);
  const [showAddInterface, setShowAddInterface] = useState(false);
  const [showAddExpectation, setShowAddExpectation] = useState(false);
  const [teamSignoffs, setTeamSignoffs] = useState<Record<string, boolean>>({});

  // New interface form state
  const [newInterface, setNewInterface] = useState<Partial<SystemInterface>>({
    name: '',
    direction: 'IN',
    type: 'PROCESS',
    connectedSystem: '',
    parameters: [],
    notes: '',
  });

  // New expectation form state
  const [newExpectation, setNewExpectation] = useState<Partial<UserExpectation>>({
    category: 'PERFORMANCE',
    description: '',
    measurable: false,
    target: '',
    unit: '',
    source: '',
    priority: 'MEDIUM',
  });

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================

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

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!systemBoundary.systemName || systemBoundary.systemName.length < 3) {
      newErrors.systemName = 'System name is required';
    }
    if (!systemBoundary.systemTag) {
      newErrors.systemTag = 'System tag is required';
    }
    const includedCount = equipmentList.filter(e => e.isInScope).length;
    if (includedCount === 0) {
      newErrors.equipment = 'At least one piece of equipment must be in scope';
    }
    if (!systemBoundary.interfaces || systemBoundary.interfaces.length === 0) {
      newErrors.interfaces = 'At least one interface must be defined';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    const env = operatingContext.environment;
    const duty = operatingContext.dutyCycle;

    if (!env?.location) {
      newErrors.location = 'Location type is required';
    }
    if (env?.ambientTempRange && env.ambientTempRange.min >= env.ambientTempRange.max) {
      newErrors.temperature = 'Min temperature must be less than max';
    }
    if (!duty?.dutyType) {
      newErrors.dutyType = 'Duty type is required';
    }
    if (duty?.operatingHoursPerDay && (duty.operatingHoursPerDay < 0 || duty.operatingHoursPerDay > 24)) {
      newErrors.operatingHours = 'Operating hours must be between 0 and 24';
    }
    if (duty?.averageLoad && duty?.peakLoad && duty.averageLoad > duty.peakLoad) {
      newErrors.load = 'Average load cannot exceed peak load';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // HANDLERS
  // ============================================

  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }
    
    if (isValid || currentStep === 3) { // Allow proceeding to review even with warnings
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSaveDraft = async () => {
    setSubmitError(null);

    if (!user) {
      setSubmitError('Please sign in to save an analysis.');
      router.push('/login');
      return;
    }

    try {
      setIsSubmitting(true);

      const includedEquipment = equipmentList.filter((e) => e.isInScope);
      const excludedEquipment = equipmentList
        .filter((e) => !e.isInScope)
        .map((e) => ({
          equipmentId: e.equipmentId,
          tag: e.tag,
          name: e.name,
          exclusionReason: 'OUT_OF_SCOPE' as const,
          exclusionNotes: 'Excluded during boundary definition',
        }));

      const analysis = await createAnalysis({
        userId: user.id,
        status: 'DRAFT',
        projectInfo,
        systemBoundary: {
          ...systemBoundary,
          includedEquipment,
          excludedEquipment,
        },
        operatingContext,
      });

      router.push(`/rcm-analysis/${analysis.id}`);
    } catch (e: any) {
      setSubmitError(e?.message ?? 'Failed to save draft.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEquipmentExpand = (equipmentId: string) => {
    const newExpanded = new Set(expandedEquipment);
    if (newExpanded.has(equipmentId)) {
      newExpanded.delete(equipmentId);
    } else {
      newExpanded.add(equipmentId);
    }
    setExpandedEquipment(newExpanded);
  };

  const toggleEquipmentScope = (equipmentId: string) => {
    setEquipmentList(prev => prev.map(eq => 
      eq.equipmentId === equipmentId ? { ...eq, isInScope: !eq.isInScope } : eq
    ));
  };

  const addInterface = () => {
    if (newInterface.name && newInterface.type) {
      const iface: SystemInterface = {
        interfaceId: `if-${Date.now()}`,
        name: newInterface.name || '',
        direction: newInterface.direction || 'IN',
        type: newInterface.type || 'PROCESS',
        connectedSystem: newInterface.connectedSystem,
        parameters: [],
        notes: newInterface.notes || '',
      };
      setSystemBoundary(prev => ({
        ...prev,
        interfaces: [...(prev.interfaces || []), iface],
      }));
      setNewInterface({ name: '', direction: 'IN', type: 'PROCESS', connectedSystem: '', parameters: [], notes: '' });
      setShowAddInterface(false);
    }
  };

  const removeInterface = (interfaceId: string) => {
    setSystemBoundary(prev => ({
      ...prev,
      interfaces: (prev.interfaces || []).filter(i => i.interfaceId !== interfaceId),
    }));
  };

  const addExpectation = () => {
    if (newExpectation.description) {
      const expectation: UserExpectation = {
        id: `exp-${Date.now()}`,
        category: newExpectation.category || 'PERFORMANCE',
        description: newExpectation.description || '',
        measurable: newExpectation.measurable || false,
        target: newExpectation.target,
        unit: newExpectation.unit,
        source: newExpectation.source || '',
        priority: newExpectation.priority || 'MEDIUM',
      };
      setOperatingContext(prev => ({
        ...prev,
        userExpectations: [...(prev.userExpectations || []), expectation],
      }));
      setNewExpectation({ category: 'PERFORMANCE', description: '', measurable: false, target: '', unit: '', source: '', priority: 'MEDIUM' });
      setShowAddExpectation(false);
    }
  };

  const removeExpectation = (expId: string) => {
    setOperatingContext(prev => ({
      ...prev,
      userExpectations: (prev.userExpectations || []).filter(e => e.id !== expId),
    }));
  };

  const handleCreateAnalysis = async () => {
    setSubmitError(null);

    if (!user) {
      setSubmitError('Please sign in to create an analysis.');
      router.push('/login');
      return;
    }

    try {
      setIsSubmitting(true);

      const includedEquipment = equipmentList.filter((e) => e.isInScope);
      const excludedEquipment = equipmentList
        .filter((e) => !e.isInScope)
        .map((e) => ({
          equipmentId: e.equipmentId,
          tag: e.tag,
          name: e.name,
          exclusionReason: 'OUT_OF_SCOPE' as const,
          exclusionNotes: 'Excluded during boundary definition',
        }));

      const analysis = await createAnalysis({
        userId: user.id,
        status: 'IN_PROGRESS',
        projectInfo,
        systemBoundary: {
          ...systemBoundary,
          includedEquipment,
          excludedEquipment,
        },
        operatingContext,
      });

      router.push(`/rcm-analysis/${analysis.id}`);
    } catch (e: any) {
      setSubmitError(e?.message ?? 'Failed to create analysis.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate annual operating hours
  const calculateAnnualHours = useCallback(() => {
    const duty = operatingContext.dutyCycle;
    if (duty) {
      const hours = (duty.operatingHoursPerDay || 0) * 
                    (duty.operatingDaysPerWeek || 0) * 
                    (duty.operatingWeeksPerYear || 0);
      return Math.round(hours);
    }
    return 0;
  }, [operatingContext.dutyCycle]);

  // Check JA1011 compliance
  const checkCompliance = (field: string): 'pass' | 'fail' | 'warning' => {
    switch (field) {
      case 'operatingContext':
        return operatingContext.environment?.location ? 'pass' : 'fail';
      case 'systemBoundary':
        return systemBoundary.systemName ? 'pass' : 'fail';
      case 'userExpectations':
        return (operatingContext.userExpectations?.length || 0) > 0 ? 'pass' : 'warning';
      case 'includedEquipment':
        return equipmentList.filter(e => e.isInScope).length > 0 ? 'pass' : 'fail';
      case 'excludedEquipment':
        return equipmentList.filter(e => !e.isInScope).length > 0 ? 'pass' : 'warning';
      case 'interfaces':
        return (systemBoundary.interfaces?.length || 0) > 0 ? 'pass' : 'fail';
      case 'dutyCycle':
        return operatingContext.dutyCycle?.dutyType ? 'pass' : 'fail';
      case 'redundancy':
        return operatingContext.redundancy?.hasRedundancy !== undefined ? 'pass' : 'warning';
      case 'environment':
        return operatingContext.environment?.location ? 'pass' : 'fail';
      case 'team':
        return (projectInfo.team?.length || 0) >= 1 ? 'pass' : 'warning';
      default:
        return 'warning';
    }
  };

  // ============================================
  // STEP DEFINITIONS
  // ============================================

  const steps = [
    { number: 1, title: 'Project Information', description: 'Basic details and team' },
    { number: 2, title: 'System Boundary', description: 'Define what\'s included' },
    { number: 3, title: 'Operating Context', description: 'How the system operates' },
    { number: 4, title: 'Review & Confirm', description: 'Verify and proceed' },
  ];

  // ============================================
  // RENDER HELPERS
  // ============================================

  const renderEquipmentTree = () => {
    const rootItems = equipmentList.filter(e => !e.parentId);
    
    const renderItem = (item: EquipmentItem) => {
      const children = equipmentList.filter(e => e.parentId === item.equipmentId);
      const hasChildren = children.length > 0;
      const isExpanded = expandedEquipment.has(item.equipmentId);
      
      return (
        <div key={item.equipmentId} className="select-none">
          <div 
            className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer ${
              item.isInScope ? 'bg-green-50' : 'bg-gray-50 opacity-60'
            }`}
            style={{ marginLeft: `${item.level * 24}px` }}
          >
            {hasChildren ? (
              <button 
                onClick={() => toggleEquipmentExpand(item.equipmentId)}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            ) : (
              <span className="w-5 h-5 flex items-center justify-center text-gray-300">•</span>
            )}
            
            <input
              type="checkbox"
              checked={item.isInScope}
              onChange={() => toggleEquipmentScope(item.equipmentId)}
              className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
            />
            
            <span className="font-mono text-sm text-deep-teal font-medium">{item.tag}</span>
            <span className="text-sm text-gray-700">{item.name}</span>
            <span className="text-xs text-gray-400 ml-auto">{item.equipmentType}</span>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="border-l-2 border-gray-200 ml-5">
              {children.map(child => renderItem(child))}
            </div>
          )}
        </div>
      );
    };
    
    return (
      <div className="space-y-1">
        {rootItems.map(item => renderItem(item))}
      </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================

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
        {submitError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {submitError}
          </div>
        )}

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
          
          {/* ============================================ */}
          {/* STEP 1: PROJECT INFORMATION */}
          {/* ============================================ */}
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

          {/* ============================================ */}
          {/* STEP 2: SYSTEM BOUNDARY */}
          {/* ============================================ */}
          {currentStep === 2 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">System Boundary</h2>
                <p className="text-gray-500 mt-1">
                  Define the equipment included in this analysis and the system interfaces.
                </p>
              </div>

              <div className="space-y-8">
                {/* System Identification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      System Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={systemBoundary.systemName || ''}
                      onChange={(e) => setSystemBoundary({ ...systemBoundary, systemName: e.target.value })}
                      placeholder="e.g., Cooling Water Pumping System"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                        errors.systemName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.systemName && <p className="mt-1 text-sm text-red-500">{errors.systemName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      System Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={systemBoundary.systemTag || ''}
                      onChange={(e) => setSystemBoundary({ ...systemBoundary, systemTag: e.target.value })}
                      placeholder="e.g., SYS-CW-100"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal ${
                        errors.systemTag ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.systemTag && <p className="mt-1 text-sm text-red-500">{errors.systemTag}</p>}
                  </div>
                </div>

                {/* Equipment Hierarchy Browser */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Equipment Hierarchy <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Check items to include in scope. Expand to see sub-components.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-100 rounded"></span>
                        In Scope ({equipmentList.filter(e => e.isInScope).length})
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-100 rounded"></span>
                        Excluded ({equipmentList.filter(e => !e.isInScope).length})
                      </span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto bg-white">
                    {renderEquipmentTree()}
                  </div>
                  {errors.equipment && <p className="mt-1 text-sm text-red-500">{errors.equipment}</p>}
                </div>

                {/* Excluded Equipment Reasons */}
                {equipmentList.filter(e => !e.isInScope).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Exclusion Justifications
                    </label>
                    <div className="space-y-2">
                      {equipmentList.filter(e => !e.isInScope).map(eq => (
                        <div key={eq.equipmentId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-sm text-gray-600">{eq.tag}</span>
                          <span className="text-sm text-gray-700">{eq.name}</span>
                          <select 
                            className="ml-auto text-sm border border-gray-200 rounded px-2 py-1 focus:ring-deep-teal focus:border-deep-teal"
                            defaultValue="OUT_OF_SCOPE"
                          >
                            {exclusionReasons.map(r => (
                              <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System Interfaces */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        System Interfaces <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Define inputs and outputs at the system boundary.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddInterface(true)}
                      className="text-sm text-deep-teal hover:text-deep-teal/80 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Interface
                    </button>
                  </div>

                  {/* Interface List */}
                  <div className="space-y-2">
                    {(systemBoundary.interfaces || []).map(iface => (
                      <div key={iface.interfaceId} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                        <span className="text-lg">{interfaceTypes.find(t => t.value === iface.type)?.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{iface.name}</div>
                          <div className="text-xs text-gray-500">
                            {iface.direction === 'IN' ? '→ Input' : iface.direction === 'OUT' ? '← Output' : '↔ Bidirectional'}
                            {iface.connectedSystem && ` from ${iface.connectedSystem}`}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          iface.direction === 'IN' ? 'bg-blue-100 text-blue-700' :
                          iface.direction === 'OUT' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {interfaceTypes.find(t => t.value === iface.type)?.label}
                        </span>
                        <button 
                          onClick={() => removeInterface(iface.interfaceId)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {(systemBoundary.interfaces || []).length === 0 && !showAddInterface && (
                      <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        No interfaces defined yet. Click "Add Interface" to define system boundaries.
                      </div>
                    )}
                  </div>
                  {errors.interfaces && <p className="mt-1 text-sm text-red-500">{errors.interfaces}</p>}

                  {/* Add Interface Form */}
                  {showAddInterface && (
                    <div className="mt-4 p-4 border border-deep-teal/30 rounded-lg bg-deep-teal/5">
                      <h4 className="font-medium text-sm text-gray-900 mb-3">New Interface</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Interface Name</label>
                          <input
                            type="text"
                            value={newInterface.name || ''}
                            onChange={(e) => setNewInterface({ ...newInterface, name: e.target.value })}
                            placeholder="e.g., Cooling Water Supply"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Connected System</label>
                          <input
                            type="text"
                            value={newInterface.connectedSystem || ''}
                            onChange={(e) => setNewInterface({ ...newInterface, connectedSystem: e.target.value })}
                            placeholder="e.g., Cooling Tower"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Direction</label>
                          <select
                            value={newInterface.direction}
                            onChange={(e) => setNewInterface({ ...newInterface, direction: e.target.value as 'IN' | 'OUT' | 'BIDIRECTIONAL' })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          >
                            <option value="IN">Input (into system)</option>
                            <option value="OUT">Output (from system)</option>
                            <option value="BIDIRECTIONAL">Bidirectional</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Interface Type</label>
                          <select
                            value={newInterface.type}
                            onChange={(e) => setNewInterface({ ...newInterface, type: e.target.value as InterfaceType })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          >
                            {interfaceTypes.map(t => (
                              <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => setShowAddInterface(false)}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addInterface}
                          className="px-3 py-1.5 text-sm bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90"
                        >
                          Add Interface
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Boundary Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boundary Notes (optional)
                  </label>
                  <textarea
                    value={systemBoundary.boundaryNotes || ''}
                    onChange={(e) => setSystemBoundary({ ...systemBoundary, boundaryNotes: e.target.value })}
                    placeholder="Any additional notes about the system boundary, assumptions, or clarifications..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 3: OPERATING CONTEXT */}
          {/* ============================================ */}
          {currentStep === 3 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Operating Context</h2>
                <p className="text-gray-500 mt-1">
                  Define how the system operates in its environment.
                </p>
              </div>

              <div className="space-y-8">
                {/* Environment Conditions */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">🌡️</span>
                    Environment Conditions
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Location Type */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                      <select
                        value={operatingContext.environment?.location || 'INDOOR_CONTROLLED'}
                        onChange={(e) => setOperatingContext({
                          ...operatingContext,
                          environment: { ...operatingContext.environment!, location: e.target.value as LocationType }
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                      >
                        {locationTypes.map(l => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Climate */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Climate</label>
                      <select
                        value={operatingContext.environment?.climate || 'TEMPERATE'}
                        onChange={(e) => setOperatingContext({
                          ...operatingContext,
                          environment: { ...operatingContext.environment!, climate: e.target.value as ClimateType }
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                      >
                        {climateTypes.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Humidity */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Humidity Level</label>
                      <select
                        value={operatingContext.environment?.humidity || 'MODERATE'}
                        onChange={(e) => setOperatingContext({
                          ...operatingContext,
                          environment: { ...operatingContext.environment!, humidity: e.target.value as HumidityLevel }
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                      >
                        {humidityLevels.map(h => (
                          <option key={h.value} value={h.value}>{h.label} ({h.range})</option>
                        ))}
                      </select>
                    </div>

                    {/* Temperature Range */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Ambient Temperature Range (°C)</label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={operatingContext.environment?.ambientTempRange?.min ?? 15}
                            onChange={(e) => setOperatingContext({
                              ...operatingContext,
                              environment: { 
                                ...operatingContext.environment!, 
                                ambientTempRange: { 
                                  ...operatingContext.environment!.ambientTempRange,
                                  min: parseInt(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            placeholder="Min"
                          />
                          <span className="text-xs text-gray-500 mt-0.5 block">Minimum</span>
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={operatingContext.environment?.ambientTempRange?.normalOperating ?? 25}
                            onChange={(e) => setOperatingContext({
                              ...operatingContext,
                              environment: { 
                                ...operatingContext.environment!, 
                                ambientTempRange: { 
                                  ...operatingContext.environment!.ambientTempRange,
                                  normalOperating: parseInt(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            placeholder="Normal"
                          />
                          <span className="text-xs text-gray-500 mt-0.5 block">Normal Operating</span>
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={operatingContext.environment?.ambientTempRange?.max ?? 35}
                            onChange={(e) => setOperatingContext({
                              ...operatingContext,
                              environment: { 
                                ...operatingContext.environment!, 
                                ambientTempRange: { 
                                  ...operatingContext.environment!.ambientTempRange,
                                  max: parseInt(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            placeholder="Max"
                          />
                          <span className="text-xs text-gray-500 mt-0.5 block">Maximum</span>
                        </div>
                      </div>
                      {errors.temperature && <p className="mt-1 text-sm text-red-500">{errors.temperature}</p>}
                    </div>

                    {/* Dust Level */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Dust Level</label>
                      <select
                        value={operatingContext.environment?.dustLevel || 'LIGHT'}
                        onChange={(e) => setOperatingContext({
                          ...operatingContext,
                          environment: { ...operatingContext.environment!, dustLevel: e.target.value as DustLevel }
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                      >
                        {dustLevels.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Vibration */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Vibration Environment</label>
                      <select
                        value={operatingContext.environment?.vibrationEnvironment || 'LOW'}
                        onChange={(e) => setOperatingContext({
                          ...operatingContext,
                          environment: { ...operatingContext.environment!, vibrationEnvironment: e.target.value as VibrationLevel }
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                      >
                        {vibrationLevels.map(v => (
                          <option key={v.value} value={v.value}>{v.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Corrosive Atmosphere */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Corrosive Atmosphere</label>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="corrosive"
                            checked={!operatingContext.environment?.corrosiveAtmosphere}
                            onChange={() => setOperatingContext({
                              ...operatingContext,
                              environment: { ...operatingContext.environment!, corrosiveAtmosphere: false }
                            })}
                            className="text-deep-teal focus:ring-deep-teal"
                          />
                          <span className="text-sm">No</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="corrosive"
                            checked={operatingContext.environment?.corrosiveAtmosphere}
                            onChange={() => setOperatingContext({
                              ...operatingContext,
                              environment: { ...operatingContext.environment!, corrosiveAtmosphere: true }
                            })}
                            className="text-deep-teal focus:ring-deep-teal"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duty Cycle */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm">⏱️</span>
                    Duty Cycle Definition
                  </h3>

                  <div className="space-y-4">
                    {/* Duty Type Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Duty Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {dutyTypes.map(d => (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => setOperatingContext({
                              ...operatingContext,
                              dutyCycle: { ...operatingContext.dutyCycle!, dutyType: d.value }
                            })}
                            className={`p-2 text-left border rounded-lg transition-all ${
                              operatingContext.dutyCycle?.dutyType === d.value
                                ? 'border-deep-teal bg-deep-teal/5 ring-2 ring-deep-teal/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-xs text-gray-900">{d.label}</div>
                            <div className="text-xs text-gray-500">{d.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Operating Schedule */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Hours/Day</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={operatingContext.dutyCycle?.operatingHoursPerDay ?? 24}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, operatingHoursPerDay: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Days/Week</label>
                        <input
                          type="number"
                          min="0"
                          max="7"
                          value={operatingContext.dutyCycle?.operatingDaysPerWeek ?? 7}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, operatingDaysPerWeek: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Weeks/Year</label>
                        <input
                          type="number"
                          min="0"
                          max="52"
                          value={operatingContext.dutyCycle?.operatingWeeksPerYear ?? 52}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, operatingWeeksPerYear: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Annual Hours</label>
                        <div className="px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg font-mono">
                          {calculateAnnualHours().toLocaleString()} hrs
                        </div>
                      </div>
                    </div>

                    {/* Load Profile */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Load Profile</label>
                        <select
                          value={operatingContext.dutyCycle?.loadProfile || 'CONSTANT'}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, loadProfile: e.target.value as LoadProfile }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        >
                          {loadProfiles.map(l => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Average Load (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={operatingContext.dutyCycle?.averageLoad ?? 80}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, averageLoad: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Peak Load (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={operatingContext.dutyCycle?.peakLoad ?? 100}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, peakLoad: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                    </div>
                    {errors.load && <p className="text-sm text-red-500">{errors.load}</p>}

                    {/* Startup Frequency */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Startup Frequency</label>
                        <select
                          value={operatingContext.dutyCycle?.startupFrequency || 'RARE'}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, startupFrequency: e.target.value as StartupFrequency }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        >
                          {startupFrequencies.map(s => (
                            <option key={s.value} value={s.value}>{s.label} ({s.range})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Startups/Year</label>
                        <input
                          type="number"
                          min="0"
                          value={operatingContext.dutyCycle?.startupsPerYear ?? 4}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            dutyCycle: { ...operatingContext.dutyCycle!, startupsPerYear: parseInt(e.target.value) }
                          })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Redundancy Configuration */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">🔄</span>
                    Redundancy Configuration
                  </h3>

                  <div className="space-y-4">
                    {/* Has Redundancy Toggle */}
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={operatingContext.redundancy?.hasRedundancy || false}
                          onChange={(e) => setOperatingContext({
                            ...operatingContext,
                            redundancy: { ...operatingContext.redundancy!, hasRedundancy: e.target.checked }
                          })}
                          className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
                        />
                        <span className="text-sm font-medium text-gray-700">System has redundancy</span>
                      </label>
                    </div>

                    {operatingContext.redundancy?.hasRedundancy && (
                      <div className="space-y-4 pt-2">
                        {/* Redundancy Type Selection */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">Redundancy Type</label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {redundancyTypes.filter(r => r.value !== 'NONE').map(r => (
                              <button
                                key={r.value}
                                type="button"
                                onClick={() => setOperatingContext({
                                  ...operatingContext,
                                  redundancy: { ...operatingContext.redundancy!, redundancyType: r.value }
                                })}
                                className={`p-2 text-left border rounded-lg transition-all ${
                                  operatingContext.redundancy?.redundancyType === r.value
                                    ? 'border-deep-teal bg-deep-teal/5 ring-2 ring-deep-teal/20'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="font-medium text-xs text-gray-900">{r.label}</div>
                                <div className="text-xs text-gray-500">{r.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Configuration & Switchover */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Configuration</label>
                            <input
                              type="text"
                              value={operatingContext.redundancy?.configuration || ''}
                              onChange={(e) => setOperatingContext({
                                ...operatingContext,
                                redundancy: { ...operatingContext.redundancy!, configuration: e.target.value }
                              })}
                              placeholder="e.g., 1+1, 2+1, N+1"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Switchover Mode</label>
                            <select
                              value={operatingContext.redundancy?.switchoverMode || 'AUTOMATIC'}
                              onChange={(e) => setOperatingContext({
                                ...operatingContext,
                                redundancy: { ...operatingContext.redundancy!, switchoverMode: e.target.value as SwitchoverMode }
                              })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            >
                              {switchoverModes.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Switchover Time (seconds)</label>
                            <input
                              type="number"
                              min="0"
                              value={operatingContext.redundancy?.switchoverTime ?? 30}
                              onChange={(e) => setOperatingContext({
                                ...operatingContext,
                                redundancy: { ...operatingContext.redundancy!, switchoverTime: parseInt(e.target.value) }
                              })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Expectations / Performance Standards */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">🎯</span>
                      User Expectations & Performance Standards
                    </h3>
                    <button
                      onClick={() => setShowAddExpectation(true)}
                      className="text-sm text-deep-teal hover:text-deep-teal/80 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Expectation
                    </button>
                  </div>

                  {/* Expectations List */}
                  <div className="space-y-2">
                    {(operatingContext.userExpectations || []).map(exp => (
                      <div key={exp.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          exp.category === 'SAFETY' ? 'bg-red-100 text-red-700' :
                          exp.category === 'PERFORMANCE' ? 'bg-blue-100 text-blue-700' :
                          exp.category === 'AVAILABILITY' ? 'bg-green-100 text-green-700' :
                          exp.category === 'ENVIRONMENTAL' ? 'bg-emerald-100 text-emerald-700' :
                          exp.category === 'QUALITY' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {exp.category}
                        </span>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">{exp.description}</div>
                          {exp.measurable && exp.target && (
                            <div className="text-xs text-gray-500 mt-1">
                              Target: {exp.target} {exp.unit}
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          exp.priority === 'CRITICAL' ? 'bg-red-50 text-red-600' :
                          exp.priority === 'HIGH' ? 'bg-amber-50 text-amber-600' :
                          exp.priority === 'MEDIUM' ? 'bg-blue-50 text-blue-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {exp.priority}
                        </span>
                        <button 
                          onClick={() => removeExpectation(exp.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {(operatingContext.userExpectations || []).length === 0 && !showAddExpectation && (
                      <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        No expectations defined. Add user expectations for comprehensive analysis.
                      </div>
                    )}
                  </div>

                  {/* Add Expectation Form */}
                  {showAddExpectation && (
                    <div className="mt-4 p-4 border border-deep-teal/30 rounded-lg bg-deep-teal/5">
                      <h4 className="font-medium text-sm text-gray-900 mb-3">New Expectation</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={newExpectation.category || 'PERFORMANCE'}
                            onChange={(e) => setNewExpectation({ ...newExpectation, category: e.target.value as UserExpectation['category'] })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          >
                            <option value="PERFORMANCE">Performance</option>
                            <option value="AVAILABILITY">Availability</option>
                            <option value="SAFETY">Safety</option>
                            <option value="ENVIRONMENTAL">Environmental</option>
                            <option value="QUALITY">Quality</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={newExpectation.priority || 'MEDIUM'}
                            onChange={(e) => setNewExpectation({ ...newExpectation, priority: e.target.value as Priority })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          >
                            {priorities.map(p => (
                              <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={newExpectation.description || ''}
                            onChange={(e) => setNewExpectation({ ...newExpectation, description: e.target.value })}
                            placeholder="e.g., System must maintain minimum flow rate of 500 GPM at all times"
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                          />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newExpectation.measurable || false}
                              onChange={(e) => setNewExpectation({ ...newExpectation, measurable: e.target.checked })}
                              className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
                            />
                            <span className="text-sm">Measurable target</span>
                          </label>
                          {newExpectation.measurable && (
                            <>
                              <input
                                type="text"
                                value={newExpectation.target || ''}
                                onChange={(e) => setNewExpectation({ ...newExpectation, target: e.target.value })}
                                placeholder="Target value"
                                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                              />
                              <input
                                type="text"
                                value={newExpectation.unit || ''}
                                onChange={(e) => setNewExpectation({ ...newExpectation, unit: e.target.value })}
                                placeholder="Unit"
                                className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => setShowAddExpectation(false)}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addExpectation}
                          className="px-3 py-1.5 text-sm bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90"
                        >
                          Add Expectation
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 4: REVIEW & CONFIRM */}
          {/* ============================================ */}
          {currentStep === 4 && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Review & Confirm</h2>
                <p className="text-gray-500 mt-1">
                  Review your setup before proceeding to function analysis.
                </p>
              </div>

              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Project Summary */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 bg-deep-teal/10 rounded flex items-center justify-center text-deep-teal text-xs">1</span>
                      Project Information
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-500 text-xs">Project Name</dt>
                        <dd className="text-gray-900 font-medium">{projectInfo.name || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Facility</dt>
                        <dd className="text-gray-900">{projectInfo.facilityName || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Analysis Type</dt>
                        <dd className="text-gray-900">{analysisTypes.find(t => t.value === projectInfo.analysisType)?.label || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Priority / Criticality</dt>
                        <dd className="text-gray-900">{projectInfo.priority} / {projectInfo.criticality}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* System Boundary Summary */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 bg-deep-teal/10 rounded flex items-center justify-center text-deep-teal text-xs">2</span>
                      System Boundary
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-500 text-xs">System</dt>
                        <dd className="text-gray-900 font-medium">{systemBoundary.systemName || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Tag</dt>
                        <dd className="text-gray-900 font-mono">{systemBoundary.systemTag || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Equipment In Scope</dt>
                        <dd className="text-gray-900">{equipmentList.filter(e => e.isInScope).length} items</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Interfaces Defined</dt>
                        <dd className="text-gray-900">{systemBoundary.interfaces?.length || 0} interfaces</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Operating Context Summary */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 bg-deep-teal/10 rounded flex items-center justify-center text-deep-teal text-xs">3</span>
                      Operating Context
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-500 text-xs">Environment</dt>
                        <dd className="text-gray-900">{locationTypes.find(l => l.value === operatingContext.environment?.location)?.label || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Duty Cycle</dt>
                        <dd className="text-gray-900">{dutyTypes.find(d => d.value === operatingContext.dutyCycle?.dutyType)?.label || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Annual Operating Hours</dt>
                        <dd className="text-gray-900">{calculateAnnualHours().toLocaleString()} hrs</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-xs">Redundancy</dt>
                        <dd className="text-gray-900">
                          {operatingContext.redundancy?.hasRedundancy 
                            ? `${redundancyTypes.find(r => r.value === operatingContext.redundancy?.redundancyType)?.label} (${operatingContext.redundancy?.configuration})`
                            : 'None'
                          }
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* JA1011 Compliance Checklist */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      JA1011 Compliance Checklist
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {ja1011Checklist.map(item => {
                      const status = checkCompliance(item.field);
                      return (
                        <div key={item.id} className="px-4 py-3 flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            status === 'pass' ? 'bg-green-100 text-green-600' :
                            status === 'warning' ? 'bg-amber-100 text-amber-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {status === 'pass' ? (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : status === 'warning' ? (
                              <span className="text-xs font-bold">!</span>
                            ) : (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                          <div className="flex-1">
                            <span className="text-sm text-gray-900">{item.requirement}</span>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">§{item.section}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Sign-off Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      Team Sign-off
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Required team members must acknowledge before proceeding.</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Facilitator - always required */}
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={teamSignoffs['facilitator'] || false}
                          onChange={(e) => setTeamSignoffs({ ...teamSignoffs, facilitator: e.target.checked })}
                          className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Facilitator</div>
                          <div className="text-xs text-gray-500">{user?.email || 'Current User'}</div>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Required</span>
                      </div>
                      
                      {/* Operations Rep */}
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={teamSignoffs['operations'] || false}
                          onChange={(e) => setTeamSignoffs({ ...teamSignoffs, operations: e.target.checked })}
                          className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Operations Representative</div>
                          <div className="text-xs text-gray-500">Not yet assigned</div>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Required</span>
                      </div>

                      {/* Maintenance Rep */}
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={teamSignoffs['maintenance'] || false}
                          onChange={(e) => setTeamSignoffs({ ...teamSignoffs, maintenance: e.target.checked })}
                          className="w-4 h-4 text-deep-teal rounded border-gray-300 focus:ring-deep-teal"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Maintenance Representative</div>
                          <div className="text-xs text-gray-500">Not yet assigned</div>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Required</span>
                      </div>
                    </div>

                    {/* Warning if not all signed */}
                    {(!teamSignoffs['facilitator'] || !teamSignoffs['operations'] || !teamSignoffs['maintenance']) && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                          <div className="text-sm text-amber-800">
                            <strong>Note:</strong> JA1011 requires sign-off from Facilitator, Operations, and Maintenance before proceeding. 
                            You can still create the analysis as a draft.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="p-4 bg-deep-teal/5 border border-deep-teal/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-deep-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Ready to Create Analysis</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Once created, you'll proceed to <strong>Component 2: Functions and Functional Failures</strong> where you'll 
                        define what the system must do and how it can fail to meet those requirements.
                      </p>
                    </div>
                  </div>
                </div>
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
                  onClick={handleCreateAnalysis}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm font-medium bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Analysis'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Panel - Context-aware */}
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
                {currentStep === 1 && (
                  <>
                    <strong>JA1011 Section 4.2:</strong> "The analysis team should include representation from operations, 
                    maintenance, and engineering..." Proper project setup ensures the right people are involved from the start.
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <strong>JA1011 Section 5.3:</strong> "The system boundary must be clearly defined before functions can be 
                    established..." A well-defined boundary prevents scope creep and ensures all critical equipment is analyzed.
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <strong>JA1011 Section 5.1:</strong> "The analysis must begin with a clear definition of the operating context..."
                    Without proper context, functions cannot be properly defined, and the entire analysis is built on sand.
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <strong>JA1011 Section 4.3:</strong> "All key information should be reviewed and validated by the analysis team 
                    before proceeding to function analysis..." This review ensures everyone agrees on the foundation.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
