-- Components 4-6: Consequences, Tasks, Review
-- Adds consequence classifications, task selection, audit log, approvals, and MOC triggers.

-- ============================================
-- COMPONENT 4: CONSEQUENCE CLASSIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS rcm_consequence_classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  failure_mode_id UUID NOT NULL REFERENCES rcm_failure_modes(id) ON DELETE CASCADE,

  is_evident BOOLEAN NOT NULL DEFAULT TRUE,
  -- One of: SAFETY | ENVIRONMENTAL | OPERATIONAL | ECONOMIC | HIDDEN_SAFETY | HIDDEN_ENVIRONMENTAL | HIDDEN_OPERATIONAL | HIDDEN_ECONOMIC
  consequence_type TEXT NOT NULL,

  -- Stores the decision tree path/answers (JA1011 transparent logic)
  classification_path JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uniq_rcm_consequence_failure_mode UNIQUE (failure_mode_id)
);

CREATE INDEX IF NOT EXISTS idx_rcm_consequence_analysis_id ON rcm_consequence_classifications(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_consequence_failure_mode_id ON rcm_consequence_classifications(failure_mode_id);

ALTER TABLE rcm_consequence_classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view consequence classifications for own analyses" ON rcm_consequence_classifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage consequence classifications for own analyses" ON rcm_consequence_classifications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE TRIGGER update_rcm_consequence_classifications_updated_at
  BEFORE UPDATE ON rcm_consequence_classifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMPONENT 5: TASK SELECTION
-- ============================================
CREATE TABLE IF NOT EXISTS rcm_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  failure_mode_id UUID NOT NULL REFERENCES rcm_failure_modes(id) ON DELETE CASCADE,

  -- ON_CONDITION | SCHEDULED_RESTORATION | SCHEDULED_DISCARD | FAILURE_FINDING | RUN_TO_FAILURE | REDESIGN
  task_type TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',

  interval NUMERIC,
  interval_unit TEXT,

  feasibility_assessment JSONB NOT NULL DEFAULT '{}'::jsonb,
  cost_estimate NUMERIC,
  justification TEXT,
  assigned_to TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rcm_tasks_analysis_id ON rcm_tasks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_tasks_failure_mode_id ON rcm_tasks(failure_mode_id);

ALTER TABLE rcm_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks for own analyses" ON rcm_tasks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage tasks for own analyses" ON rcm_tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE TRIGGER update_rcm_tasks_updated_at
  BEFORE UPDATE ON rcm_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMPONENT 6: AUDIT LOG, APPROVALS, MOC
-- ============================================

CREATE TABLE IF NOT EXISTS rcm_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID DEFAULT auth.uid(),

  -- INSERT | UPDATE | DELETE
  action TEXT NOT NULL,
  component TEXT NOT NULL,

  table_name TEXT NOT NULL,
  record_id UUID,

  old_row JSONB,
  new_row JSONB,

  -- Extra notes for UI (optional)
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_rcm_audit_log_analysis_id ON rcm_audit_log(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_audit_log_timestamp ON rcm_audit_log(timestamp);

ALTER TABLE rcm_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit log for own analyses" ON rcm_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- Audit logs are written by triggers; allow insert for owners as well (for future manual notes)
CREATE POLICY "Users can insert audit log for own analyses" ON rcm_audit_log
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- Prevent updates/deletes to audit log from clients

CREATE TABLE IF NOT EXISTS rcm_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  user_id UUID DEFAULT auth.uid(),
  approved_at TIMESTAMPTZ,
  signature_text TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uniq_rcm_approvals_role UNIQUE (analysis_id, role)
);

CREATE INDEX IF NOT EXISTS idx_rcm_approvals_analysis_id ON rcm_approvals(analysis_id);

ALTER TABLE rcm_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view approvals for own analyses" ON rcm_approvals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage approvals for own analyses" ON rcm_approvals
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE TABLE IF NOT EXISTS rcm_moc_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  -- EQUIPMENT_MODIFICATION | OPERATING_CONTEXT_CHANGE | NEW_FAILURE_MODE | REGULATORY_CHANGE | OTHER
  trigger_type TEXT NOT NULL,
  description TEXT,
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rcm_moc_triggers_analysis_id ON rcm_moc_triggers(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_moc_triggers_triggered_at ON rcm_moc_triggers(triggered_at);

ALTER TABLE rcm_moc_triggers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view MOC triggers for own analyses" ON rcm_moc_triggers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage MOC triggers for own analyses" ON rcm_moc_triggers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE TRIGGER update_rcm_moc_triggers_updated_at
  BEFORE UPDATE ON rcm_moc_triggers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- AUDIT TRIGGERS (AUTO-LOG CHANGES)
-- ============================================

CREATE OR REPLACE FUNCTION rcm_audit_write()
RETURNS TRIGGER AS $$
DECLARE
  component_name TEXT;
  a_id UUID;
  rec_id UUID;
  old_json JSONB;
  new_json JSONB;
BEGIN
  component_name := COALESCE(TG_ARGV[0], 'unknown');
  IF (TG_OP = 'INSERT') THEN
    rec_id := (NEW.id);
    new_json := to_jsonb(NEW);
  ELSIF (TG_OP = 'UPDATE') THEN
    rec_id := (NEW.id);
    old_json := to_jsonb(OLD);
    new_json := to_jsonb(NEW);
  ELSIF (TG_OP = 'DELETE') THEN
    rec_id := (OLD.id);
    old_json := to_jsonb(OLD);
  END IF;

  -- Determine analysis_id for tables that don't carry it
  IF TG_TABLE_NAME IN ('rcm_analyses', 'rcm_functions', 'rcm_failure_modes', 'rcm_consequence_classifications', 'rcm_tasks', 'rcm_approvals', 'rcm_moc_triggers') THEN
    a_id := COALESCE(NEW.analysis_id, OLD.analysis_id);
    IF TG_TABLE_NAME = 'rcm_analyses' THEN
      a_id := COALESCE(NEW.id, OLD.id);
    END IF;
  ELSIF TG_TABLE_NAME = 'rcm_functional_failures' THEN
    SELECT analysis_id INTO a_id FROM rcm_functions WHERE id = COALESCE(NEW.function_id, OLD.function_id);
  ELSIF TG_TABLE_NAME = 'rcm_failure_causes' THEN
    SELECT analysis_id INTO a_id FROM rcm_failure_modes WHERE id = COALESCE(NEW.failure_mode_id, OLD.failure_mode_id);
  ELSE
    a_id := NULL;
  END IF;

  IF a_id IS NULL THEN
    -- If we can't resolve analysis_id, do not block the original write.
    RETURN COALESCE(NEW, OLD);
  END IF;

  INSERT INTO rcm_audit_log(
    analysis_id,
    action,
    component,
    table_name,
    record_id,
    old_row,
    new_row,
    details
  ) VALUES (
    a_id,
    TG_OP,
    component_name,
    TG_TABLE_NAME,
    rec_id,
    old_json,
    new_json,
    jsonb_build_object('trigger', 'db', 'table', TG_TABLE_NAME)
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach triggers to all key component tables
DROP TRIGGER IF EXISTS rcm_audit_rcm_analyses ON rcm_analyses;
CREATE TRIGGER rcm_audit_rcm_analyses
  AFTER INSERT OR UPDATE OR DELETE ON rcm_analyses
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('analysis');

DROP TRIGGER IF EXISTS rcm_audit_rcm_functions ON rcm_functions;
CREATE TRIGGER rcm_audit_rcm_functions
  AFTER INSERT OR UPDATE OR DELETE ON rcm_functions
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component2');

DROP TRIGGER IF EXISTS rcm_audit_rcm_functional_failures ON rcm_functional_failures;
CREATE TRIGGER rcm_audit_rcm_functional_failures
  AFTER INSERT OR UPDATE OR DELETE ON rcm_functional_failures
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component2');

DROP TRIGGER IF EXISTS rcm_audit_rcm_failure_modes ON rcm_failure_modes;
CREATE TRIGGER rcm_audit_rcm_failure_modes
  AFTER INSERT OR UPDATE OR DELETE ON rcm_failure_modes
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component3');

DROP TRIGGER IF EXISTS rcm_audit_rcm_failure_causes ON rcm_failure_causes;
CREATE TRIGGER rcm_audit_rcm_failure_causes
  AFTER INSERT OR UPDATE OR DELETE ON rcm_failure_causes
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component3');

DROP TRIGGER IF EXISTS rcm_audit_rcm_consequence_classifications ON rcm_consequence_classifications;
CREATE TRIGGER rcm_audit_rcm_consequence_classifications
  AFTER INSERT OR UPDATE OR DELETE ON rcm_consequence_classifications
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component4');

DROP TRIGGER IF EXISTS rcm_audit_rcm_tasks ON rcm_tasks;
CREATE TRIGGER rcm_audit_rcm_tasks
  AFTER INSERT OR UPDATE OR DELETE ON rcm_tasks
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component5');

DROP TRIGGER IF EXISTS rcm_audit_rcm_approvals ON rcm_approvals;
CREATE TRIGGER rcm_audit_rcm_approvals
  AFTER INSERT OR UPDATE OR DELETE ON rcm_approvals
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component6');

DROP TRIGGER IF EXISTS rcm_audit_rcm_moc_triggers ON rcm_moc_triggers;
CREATE TRIGGER rcm_audit_rcm_moc_triggers
  AFTER INSERT OR UPDATE OR DELETE ON rcm_moc_triggers
  FOR EACH ROW EXECUTE FUNCTION rcm_audit_write('component6');
