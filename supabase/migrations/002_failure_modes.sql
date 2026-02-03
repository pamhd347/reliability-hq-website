-- Component 3: Failure Modes, Causes & Effects
-- JA1011 requirement: capture Failure Modes (HOW) and Failure Causes (WHY) separately.

-- Failure modes table
CREATE TABLE IF NOT EXISTS rcm_failure_modes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES rcm_analyses(id) ON DELETE CASCADE,
  functional_failure_id UUID NOT NULL REFERENCES rcm_functional_failures(id) ON DELETE CASCADE,

  mode_number INTEGER NOT NULL DEFAULT 1,
  description TEXT NOT NULL, -- HOW it fails

  local_effect TEXT,
  system_effect TEXT,
  end_effect TEXT,

  evidence_of_failure TEXT,
  detection_method TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Failure causes table (linked to failure modes)
CREATE TABLE IF NOT EXISTS rcm_failure_causes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  failure_mode_id UUID NOT NULL REFERENCES rcm_failure_modes(id) ON DELETE CASCADE,

  cause_number INTEGER NOT NULL DEFAULT 1,
  description TEXT NOT NULL, -- WHY it fails
  mechanism TEXT NOT NULL, -- wear, corrosion, fatigue, etc.
  contributing_factors TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rcm_failure_modes_analysis_id ON rcm_failure_modes(analysis_id);
CREATE INDEX IF NOT EXISTS idx_rcm_failure_modes_functional_failure_id ON rcm_failure_modes(functional_failure_id);
CREATE INDEX IF NOT EXISTS idx_rcm_failure_causes_failure_mode_id ON rcm_failure_causes(failure_mode_id);

-- Row Level Security
ALTER TABLE rcm_failure_modes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rcm_failure_causes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rcm_failure_modes (via analysis ownership)
CREATE POLICY "Users can view failure modes for own analyses" ON rcm_failure_modes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage failure modes for own analyses" ON rcm_failure_modes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM rcm_analyses WHERE id = analysis_id AND user_id = auth.uid())
  );

-- RLS Policies for rcm_failure_causes (via analysis ownership through failure mode)
CREATE POLICY "Users can view failure causes for own analyses" ON rcm_failure_causes
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM rcm_failure_modes fm
      JOIN rcm_analyses a ON fm.analysis_id = a.id
      WHERE fm.id = rcm_failure_causes.failure_mode_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage failure causes for own analyses" ON rcm_failure_causes
  FOR ALL USING (
    EXISTS (
      SELECT 1
      FROM rcm_failure_modes fm
      JOIN rcm_analyses a ON fm.analysis_id = a.id
      WHERE fm.id = rcm_failure_causes.failure_mode_id AND a.user_id = auth.uid()
    )
  );

-- Updated_at trigger for failure modes
CREATE TRIGGER update_rcm_failure_modes_updated_at
  BEFORE UPDATE ON rcm_failure_modes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
