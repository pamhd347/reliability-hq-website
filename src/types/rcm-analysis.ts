// ============================================
// RCM ANALYSIS TYPES
// Based on Dr. Marie Chen's Stage 1 Specifications
// JA1011 Compliant
// ============================================

// ============================================
// ENUMS & LITERAL TYPES
// ============================================

export type AnalysisStatus = 
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'ARCHIVED';

export type AnalysisType = 
  | 'INITIAL'
  | 'SCHEDULED_REVIEW'
  | 'MOC_TRIGGERED'
  | 'FAILURE_TRIGGERED'
  | 'OPTIMIZATION';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Criticality = 
  | 'SAFETY_CRITICAL'
  | 'ENVIRONMENTAL_CRITICAL'
  | 'PRODUCTION_CRITICAL'
  | 'SUPPORT'
  | 'NOT_ASSESSED';

export type TeamRole =
  | 'FACILITATOR'
  | 'OPERATIONS_REP'
  | 'MAINTENANCE_REP'
  | 'ENGINEERING_REP'
  | 'RELIABILITY_ENGINEER'
  | 'SUBJECT_MATTER_EXPERT'
  | 'REVIEWER'
  | 'OBSERVER';

export type ExclusionReason =
  | 'COVERED_ELSEWHERE'
  | 'OUT_OF_SCOPE'
  | 'DECOMMISSIONED'
  | 'CONSUMABLE'
  | 'OTHER';

export type InterfaceType =
  | 'PROCESS'
  | 'UTILITY'
  | 'ELECTRICAL'
  | 'SIGNAL'
  | 'STRUCTURAL';

export type LocationType = 
  | 'INDOOR_CONTROLLED'
  | 'INDOOR_UNCONTROLLED'
  | 'OUTDOOR_SHELTERED'
  | 'OUTDOOR_EXPOSED'
  | 'UNDERGROUND'
  | 'OFFSHORE'
  | 'SUBSEA';

export type ClimateType =
  | 'TROPICAL'
  | 'DESERT'
  | 'TEMPERATE'
  | 'ARCTIC'
  | 'MARINE'
  | 'MIXED';

export type HumidityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';
export type DustLevel = 'CLEAN' | 'LIGHT' | 'MODERATE' | 'HEAVY';
export type VibrationLevel = 'MINIMAL' | 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export type DutyType = 'CONTINUOUS' | 'INTERMITTENT' | 'STANDBY' | 'CYCLIC' | 'SEASONAL';
export type LoadProfile = 'CONSTANT' | 'VARIABLE' | 'CYCLIC' | 'PEAK_SHAVING' | 'LOAD_FOLLOWING';
export type StartupFrequency = 'RARE' | 'OCCASIONAL' | 'FREQUENT' | 'VERY_FREQUENT';

export type RedundancyType = 'NONE' | 'ACTIVE' | 'STANDBY_HOT' | 'STANDBY_WARM' | 'STANDBY_COLD';
export type SwitchoverMode = 'AUTOMATIC' | 'MANUAL' | 'SEMI_AUTOMATIC';

// ============================================
// PROJECT & ANALYSIS METADATA
// ============================================

export interface RCMAnalysis {
  id: string;
  projectInfo: ProjectInfo;
  systemBoundary: SystemBoundary;
  operatingContext: OperatingContext;
  qualityGates: QualityGateStatus;
  auditTrail: AuditEntry[];
  status: AnalysisStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ProjectInfo {
  name: string;
  description: string;
  facilityId: string;
  facilityName: string;
  analysisType: AnalysisType;
  triggerReason?: string;
  targetCompletionDate: Date;
  priority: Priority;
  criticality: Criticality;
  team: TeamMember[];
  stakeholders: string[];
  tags: string[];
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: TeamRole;
  department: string;
  signoffRequired: boolean;
  signoffDate?: Date;
  signoffStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// ============================================
// SYSTEM BOUNDARY DEFINITION
// ============================================

export interface SystemBoundary {
  systemId: string;
  systemName: string;
  systemTag: string;
  includedEquipment: EquipmentItem[];
  excludedEquipment: ExclusionItem[];
  interfaces: SystemInterface[];
  boundaryDiagramUrl?: string;
  boundaryNotes: string;
}

export interface EquipmentItem {
  equipmentId: string;
  tag: string;
  name: string;
  equipmentClass: string;
  equipmentType: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installDate?: Date;
  parentId?: string;
  level: number;
  isInScope: boolean;
  inclusionReason?: string;
}

export interface ExclusionItem {
  equipmentId: string;
  tag: string;
  name: string;
  exclusionReason: ExclusionReason;
  exclusionNotes: string;
}

export interface SystemInterface {
  interfaceId: string;
  name: string;
  direction: 'IN' | 'OUT' | 'BIDIRECTIONAL';
  type: InterfaceType;
  connectedSystem?: string;
  parameters: InterfaceParameter[];
  notes: string;
}

export interface InterfaceParameter {
  name: string;
  normalValue: string;
  unit: string;
  range: {
    min: number;
    max: number;
  };
}

// ============================================
// OPERATING CONTEXT
// ============================================

export interface OperatingContext {
  environment: OperatingEnvironment;
  dutyCycle: DutyCycle;
  redundancy: RedundancyConfig;
  protection: ProtectionSystems;
  regulatory: RegulatoryRequirements;
  userExpectations: UserExpectation[];
  assumptions: Assumption[];
  constraints: Constraint[];
}

export interface OperatingEnvironment {
  location: LocationType;
  climate: ClimateType;
  ambientTempRange: TemperatureRange;
  humidity: HumidityLevel;
  corrosiveAtmosphere: boolean;
  corrosiveAgents?: string[];
  dustLevel: DustLevel;
  vibrationEnvironment: VibrationLevel;
  accessConstraints: string;
  specialConditions: string[];
}

export interface TemperatureRange {
  min: number;
  max: number;
  unit: 'C' | 'F';
  normalOperating: number;
}

export interface DutyCycle {
  dutyType: DutyType;
  operatingHoursPerDay: number;
  operatingDaysPerWeek: number;
  operatingWeeksPerYear: number;
  annualOperatingHours: number;
  loadProfile: LoadProfile;
  averageLoad: number;
  peakLoad: number;
  loadUnit: string;
  startupFrequency: StartupFrequency;
  startupsPerYear: number;
  typicalRunDuration: number;
  runDurationUnit: 'HOURS' | 'DAYS' | 'WEEKS';
}

export interface RedundancyConfig {
  hasRedundancy: boolean;
  redundancyType?: RedundancyType;
  configuration?: string;
  switchoverMode?: SwitchoverMode;
  switchoverTime?: number;
  switchoverTimeUnit?: 'SECONDS' | 'MINUTES' | 'HOURS';
  switchoverCriteria?: string;
  standbyEquipment?: StandbyEquipmentItem[];
}

export interface StandbyEquipmentItem {
  equipmentId: string;
  tag: string;
  name: string;
  standbyType: 'HOT' | 'WARM' | 'COLD';
  testingFrequency: string;
  lastTestedDate?: Date;
}

export interface ProtectionSystems {
  hasProtection: boolean;
  systems: ProtectionSystemItem[];
  alarms: AlarmItem[];
}

export interface ProtectionSystemItem {
  systemId: string;
  name: string;
  type: 'SHUTDOWN' | 'ALARM_ONLY' | 'AUTOMATIC_RESPONSE' | 'INTERLOCK';
  triggerCondition: string;
  responseAction: string;
  testingFrequency: string;
  lastTestedDate?: Date;
  isIndependent: boolean;
}

export interface AlarmItem {
  alarmId: string;
  name: string;
  parameter: string;
  triggerValue: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  responseRequired: string;
}

export interface RegulatoryRequirements {
  applicableRegulations: Regulation[];
  industryStandards: Standard[];
  companyPolicies: Policy[];
  permitRequirements: string[];
}

export interface Regulation {
  code: string;
  title: string;
  relevantSections: string;
  complianceNotes: string;
}

export interface Standard {
  code: string;
  title: string;
  relevantSections: string;
  complianceNotes: string;
}

export interface Policy {
  policyId: string;
  title: string;
  requirements: string;
}

export interface UserExpectation {
  id: string;
  category: 'PERFORMANCE' | 'AVAILABILITY' | 'SAFETY' | 'ENVIRONMENTAL' | 'QUALITY' | 'OTHER';
  description: string;
  measurable: boolean;
  target?: string;
  unit?: string;
  source: string;
  priority: Priority;
}

export interface Assumption {
  id: string;
  description: string;
  basis: string;
  impact: string;
  validUntil?: Date;
}

export interface Constraint {
  id: string;
  type: 'RESOURCE' | 'ACCESS' | 'SCHEDULE' | 'BUDGET' | 'TECHNICAL' | 'OTHER';
  description: string;
  impact: string;
  mitigation?: string;
}

// ============================================
// COMPONENT 2: FUNCTIONS & FUNCTIONAL FAILURES
// ============================================

// JA1011: Function statements should describe: what the asset does, to what standard,
// and in what operating context.
export interface RCMFunction {
  id: string;
  functionStatement: string;
  performanceStandard: string;
  context: string;
  functionalFailures: FunctionalFailure[];
}

export interface FunctionalFailure {
  id: string;
  functionId: string;
  description: string;
}

// ============================================
// QUALITY GATES & AUDIT
// ============================================

export interface QualityGateStatus {
  component1: ComponentGateStatus;
  component2?: ComponentGateStatus;
  component3?: ComponentGateStatus;
  component4?: ComponentGateStatus;
  component5?: ComponentGateStatus;
  component6?: ComponentGateStatus;
}

export interface ComponentGateStatus {
  passed: boolean;
  checkedAt?: Date;
  checkedBy?: string;
  blockingIssues: GateIssue[];
  warnings: GateIssue[];
}

export interface GateIssue {
  code: string;
  message: string;
  field?: string;
  severity: 'BLOCKING' | 'WARNING' | 'INFO';
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  component: string;
  details: string;
  previousValue?: string;
  newValue?: string;
}

// ============================================
// FORM STATE HELPERS
// ============================================

export interface RCMAnalysisFormState {
  currentStep: 1 | 2 | 3 | 4;
  projectInfo: Partial<ProjectInfo>;
  systemBoundary: Partial<SystemBoundary>;
  operatingContext: Partial<OperatingContext>;
  isDirty: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export const initialFormState: RCMAnalysisFormState = {
  currentStep: 1,
  projectInfo: {},
  systemBoundary: {
    includedEquipment: [],
    excludedEquipment: [],
    interfaces: [],
    boundaryNotes: '',
  },
  operatingContext: {
    environment: {} as OperatingEnvironment,
    dutyCycle: {} as DutyCycle,
    redundancy: { hasRedundancy: false },
    protection: { hasProtection: false, systems: [], alarms: [] },
    regulatory: { applicableRegulations: [], industryStandards: [], companyPolicies: [], permitRequirements: [] },
    userExpectations: [],
    assumptions: [],
    constraints: [],
  },
  isDirty: false,
  errors: {},
  warnings: {},
};
