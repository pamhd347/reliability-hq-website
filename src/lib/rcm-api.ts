import type {
  EquipmentItem,
  ExclusionItem,
  OperatingContext,
  ProjectInfo,
  SystemBoundary,
  SystemInterface,
  UserExpectation,
} from '@/types/rcm-analysis';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';

type JsonObject = Record<string, unknown>;

export interface CreateAnalysisInput {
  userId: string;
  projectInfo: Partial<ProjectInfo>;
  systemBoundary: Partial<SystemBoundary>;
  operatingContext: Partial<OperatingContext>;
  status?: string;
}

export interface UpdateAnalysisInput {
  projectInfo?: Partial<ProjectInfo>;
  systemBoundary?: Partial<SystemBoundary>;
  operatingContext?: Partial<OperatingContext>;
  status?: string;
}

function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
  const supabase = createClient();
  if (!supabase) {
    throw new Error('Supabase client not available.');
  }
  return supabase;
}

export async function createAnalysis(input: CreateAnalysisInput): Promise<{ id: string } & JsonObject> {
  const supabase = requireSupabase();

  const name = input.projectInfo.name ?? 'Untitled RCM Analysis';

  const analysisInsert = {
    user_id: input.userId,
    name,
    description: input.projectInfo.description ?? null,
    facility_id: input.projectInfo.facilityId ?? null,
    facility_name: input.projectInfo.facilityName ?? null,
    analysis_type: input.projectInfo.analysisType ?? 'INITIAL',
    trigger_reason: input.projectInfo.triggerReason ?? null,
    target_completion_date: input.projectInfo.targetCompletionDate
      ? new Date(input.projectInfo.targetCompletionDate).toISOString().slice(0, 10)
      : null,
    priority: input.projectInfo.priority ?? 'MEDIUM',
    criticality: input.projectInfo.criticality ?? 'NOT_ASSESSED',

    system_id: input.systemBoundary.systemId ?? null,
    system_name: input.systemBoundary.systemName ?? null,
    system_tag: input.systemBoundary.systemTag ?? null,
    boundary_diagram_url: input.systemBoundary.boundaryDiagramUrl ?? null,
    boundary_notes: input.systemBoundary.boundaryNotes ?? null,

    status: input.status ?? 'DRAFT',

    project_info: input.projectInfo as JsonObject,
    operating_context: input.operatingContext as JsonObject,
    quality_gates: {} as JsonObject,
    audit_trail: [] as unknown[],
  };

  const { data: analysis, error } = await supabase.from('rcm_analyses').insert(analysisInsert).select('*').single();
  if (error) throw error;

  const analysisId = (analysis as { id: string }).id;

  // Equipment
  const includedEquipment = (input.systemBoundary.includedEquipment ?? []) as EquipmentItem[];
  const excludedEquipment = (input.systemBoundary.excludedEquipment ?? []) as ExclusionItem[];

  const equipmentRows = [
    ...includedEquipment.map((e) => ({
      analysis_id: analysisId,
      equipment_id: e.equipmentId,
      tag: e.tag ?? null,
      name: e.name ?? null,
      equipment_class: e.equipmentClass ?? null,
      equipment_type: e.equipmentType ?? null,
      manufacturer: e.manufacturer ?? null,
      model: e.model ?? null,
      serial_number: e.serialNumber ?? null,
      install_date: e.installDate ? new Date(e.installDate).toISOString().slice(0, 10) : null,
      parent_id: e.parentId ?? null,
      level: e.level ?? 0,
      is_in_scope: e.isInScope ?? true,
      inclusion_reason: e.inclusionReason ?? null,
      exclusion_reason: null,
      exclusion_notes: null,
    })),
    ...excludedEquipment.map((e) => ({
      analysis_id: analysisId,
      equipment_id: e.equipmentId,
      tag: e.tag ?? null,
      name: e.name ?? null,
      equipment_class: null,
      equipment_type: null,
      manufacturer: null,
      model: null,
      serial_number: null,
      install_date: null,
      parent_id: null,
      level: 0,
      is_in_scope: false,
      inclusion_reason: null,
      exclusion_reason: e.exclusionReason,
      exclusion_notes: e.exclusionNotes ?? null,
    })),
  ];

  if (equipmentRows.length > 0) {
    const { error: eqErr } = await supabase.from('rcm_equipment').insert(equipmentRows);
    if (eqErr) throw eqErr;
  }

  // Interfaces
  const interfaces = (input.systemBoundary.interfaces ?? []) as SystemInterface[];
  if (interfaces.length > 0) {
    const rows = interfaces.map((i) => ({
      analysis_id: analysisId,
      interface_id: i.interfaceId,
      name: i.name,
      direction: i.direction,
      type: i.type,
      connected_system: i.connectedSystem ?? null,
      parameters: (i.parameters ?? []) as unknown[],
      notes: i.notes ?? null,
    }));
    const { error: ifErr } = await supabase.from('rcm_interfaces').insert(rows);
    if (ifErr) throw ifErr;
  }

  // User expectations
  const expectations = (input.operatingContext.userExpectations ?? []) as UserExpectation[];
  if (expectations.length > 0) {
    const rows = expectations.map((e) => ({
      analysis_id: analysisId,
      expectation_id: e.id,
      category: e.category,
      description: e.description,
      measurable: e.measurable,
      target: e.target ?? null,
      unit: e.unit ?? null,
      source: e.source ?? null,
      priority: e.priority,
    }));
    const { error: expErr } = await supabase.from('rcm_user_expectations').insert(rows);
    if (expErr) throw expErr;
  }

  return analysis as { id: string } & JsonObject;
}

export async function getAnalysis(id: string): Promise<{
  analysis: JsonObject;
  equipment: JsonObject[];
  interfaces: JsonObject[];
  userExpectations: JsonObject[];
}> {
  const supabase = requireSupabase();

  const { data: analysis, error } = await supabase.from('rcm_analyses').select('*').eq('id', id).single();
  if (error) throw error;

  const [equipmentRes, interfacesRes, expectationsRes] = await Promise.all([
    supabase.from('rcm_equipment').select('*').eq('analysis_id', id),
    supabase.from('rcm_interfaces').select('*').eq('analysis_id', id),
    supabase.from('rcm_user_expectations').select('*').eq('analysis_id', id),
  ]);

  if (equipmentRes.error) throw equipmentRes.error;
  if (interfacesRes.error) throw interfacesRes.error;
  if (expectationsRes.error) throw expectationsRes.error;

  return {
    analysis: (analysis ?? {}) as JsonObject,
    equipment: (equipmentRes.data ?? []) as JsonObject[],
    interfaces: (interfacesRes.data ?? []) as JsonObject[],
    userExpectations: (expectationsRes.data ?? []) as JsonObject[],
  };
}

export async function listAnalyses(userId: string): Promise<JsonObject[]> {
  const supabase = requireSupabase();

  const { data, error } = await supabase
    .from('rcm_analyses')
    .select('id, name, system_name, system_tag, status, updated_at, created_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as JsonObject[];
}

function setIfDefined(obj: Record<string, unknown>, key: string, value: unknown) {
  if (value !== undefined) obj[key] = value;
}

export async function updateAnalysis(id: string, input: UpdateAnalysisInput): Promise<JsonObject> {
  const supabase = requireSupabase();

  const patch: Record<string, unknown> = {};

  if (input.projectInfo) {
    setIfDefined(patch, 'name', input.projectInfo.name);
    setIfDefined(patch, 'description', input.projectInfo.description);
    setIfDefined(patch, 'facility_id', input.projectInfo.facilityId);
    setIfDefined(patch, 'facility_name', input.projectInfo.facilityName);
    setIfDefined(patch, 'analysis_type', input.projectInfo.analysisType);
    setIfDefined(patch, 'trigger_reason', input.projectInfo.triggerReason);
    setIfDefined(
      patch,
      'target_completion_date',
      input.projectInfo.targetCompletionDate
        ? new Date(input.projectInfo.targetCompletionDate).toISOString().slice(0, 10)
        : undefined
    );
    setIfDefined(patch, 'priority', input.projectInfo.priority);
    setIfDefined(patch, 'criticality', input.projectInfo.criticality);
    setIfDefined(patch, 'project_info', input.projectInfo as JsonObject);
  }

  if (input.systemBoundary) {
    setIfDefined(patch, 'system_id', input.systemBoundary.systemId);
    setIfDefined(patch, 'system_name', input.systemBoundary.systemName);
    setIfDefined(patch, 'system_tag', input.systemBoundary.systemTag);
    setIfDefined(patch, 'boundary_diagram_url', input.systemBoundary.boundaryDiagramUrl);
    setIfDefined(patch, 'boundary_notes', input.systemBoundary.boundaryNotes);
  }

  if (input.operatingContext) {
    setIfDefined(patch, 'operating_context', input.operatingContext as JsonObject);
  }

  if (input.status) {
    setIfDefined(patch, 'status', input.status);
  }

  const { data, error } = await supabase.from('rcm_analyses').update(patch).eq('id', id).select('*').single();
  if (error) throw error;

  return (data ?? {}) as JsonObject;
}
