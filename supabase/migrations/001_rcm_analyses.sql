-- RCM Analysis Tables
-- Based on JA1011 Compliant RCM Analysis Structure

-- Main analyses table
CREATE TABLE IF NOT EXISTS rcm_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Project Info
  name TEXT NOT NULL,
  description TEXT,
  facility_id TEXT,
  facility_name TEXT,
  analysis_type TEXT NOT NULL DEFAULT 'INITIAL',
  trigger_reason TEXT,
  target_completion_date DATE,
  priority TEXT NOT NULL DEFAULT 'MEDIUM',
  criticality TEXT NOT NULL DEFAULT 'NOT_ASSESSED',
  
  -- System Boundary
  system_id TEXT,
  system_name TEXT,
  system_tag TEXT,
  boundary_diagram_url TEXT,
  boundary_notes TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'DRAFT',
  
  -- JSON storage for complex nested data
  project_info JSONB DEFAULT '{}',
  operating_context JSONB DEFAULT '{}',
  quality_gates JSONB DEFAULT '{}',
  audit_trail JSONB DEFAULT '[]',
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Equipment table (included and excluded)
CREATE TABLE IF NOT EXISTS rcm_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  
  equipment_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  name TEXT NOT NULL,
  equipment_class TEXT,
  equipment_type TEXT,
  manufacturer TEXT,
  model TEXT,
  serial_number TEXT,
  install_date DATE,
  parent_id TEXT,
  level INTEGER DEFAULT 0,
  
  is_in_scope BOOLEAN NOT NULL DEFAULT TRUE,
  inclusion_reason TEXT,
  exclusion_reason TEXT,
  exclusion_notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- System interfaces table
CREATE TABLE IF NOT EXISTS rcm_interfaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  
  interface_id TEXT NOT NULL,
  name TEXT NOT NULL,
  direction TEXT NOT NULL DEFAULT 'IN',
  type TEXT NOT NULL DEFAULT 'PROCESS',
  connected_system TEXT,
  parameters JSONB DEFAULT '[]',
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User expectations table
CREATE TABLE IF NOT EXISTS rcm_user_expectations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  
  expectation_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'PERFORMANCE',
  description TEXT NOT NULL,
  measurable BOOLEAN DEFAULT FALSE,
  target TEXT,
  unit TEXT,
  source TEXT,
  priority TEXT DEFAULT 'MEDIUM',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Functions table (Component 2)
CREATE TABLE IF NOT EXISTS rcm_functions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  
  function_id TEXT NOT NULL,
  equipment_id TEXT,
  function_number INTEGER NOT NULL,
  function_type TEXT NOT NULL DEFAULT 'PRIMARY',
  verb TEXT NOT NULL,
  noun TEXT NOT NULL,
  performance_standard TEXT,
  context TEXT,
  full_statement TEXT NOT NULL,
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Functional failures table (Component 2)
CREATE TABLE IF NOT EXISTS rcm_functional_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  function_id UUID NOT NULL REFERENCES rcm_functions(id) ON DELETE CASCADE,
  
  failure_id TEXT NOT NULL,
  failure_letter TEXT NOT NULL,
  description TEXT NOT NULL,
  failure_type TEXT DEFAULT 'TOTAL',
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rcm_analyses_user_id ON rcm_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_rcm_analyses_status ON rcm_analyses(status);
CREATE INDEX IF NOT EXISTS idx_rcm_equipment_analysis_id ON rcm_equipment(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_interfaces_analysis_id ON rcm_interfaces(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_user_expectations_analysis_id ON rcm_user_expectations(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_functions_analysis_id ON rcm_functions(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_functional_failures_function_id ON rcm_functional_failures(function_id);

-- Row Level Security
ALTER TABLE rcm_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_interfaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_user_expectations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_functions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_functional_failures ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rcm_analyses
CREATE POLICY "Users can view own analyses" ON rcm_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses" ON rcm_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON rcm_analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON rcm_analyses
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for rcm_equipment (via analysis ownership)
CREATE POLICY "Users can view equipment for own analyses" ON rcm_equipment
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage equipment for own analyses" ON rcm_equipment
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- RLS Policies for rcm_interfaces
CREATE POLICY "Users can view interfaces for own analyses" ON rcm_interfaces
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage interfaces for own analyses" ON rcm_interfaces
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- RLS Policies for rcm_user_expectations
CREATE POLICY "Users can view expectations for own analyses" ON rcm_user_expectations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage expectations for own analyses" ON rcm_user_expectations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- RLS Policies for rcm_functions
CREATE POLICY "Users can view functions for own analyses" ON rcm_functions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage functions for own analyses" ON rcm_functions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- RLS Policies for rcm_functional_failures
CREATE POLICY "Users can view failures for own functions" ON rcm_functional_failures
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rcm_functions f
      JOIN rcm_analyses a ON f.analysis_id = a.id
      WHERE f.id = function_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage failures for own functions" ON rcm_functional_failures
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM rcm_functions f
      JOIN rcm_analyses a ON f.analysis_id = a.id
      WHERE f.id = function_id AND a.user_id = auth.uid()
    )
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rcm_analyses_updated_at
  BEFORE UPDATE ON rcm_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rcm_functions_updated_at
  BEFORE UPDATE ON rcm_functions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
