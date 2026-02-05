ALTER TABLE question_attempts
  ADD COLUMN IF NOT EXISTS time_spent_ms INTEGER;

CREATE INDEX IF NOT EXISTS idx_attempts_session_question
  ON question_attempts(session_id, question_id);

CREATE INDEX IF NOT EXISTS idx_attempts_created_at
  ON question_attempts(created_at);

