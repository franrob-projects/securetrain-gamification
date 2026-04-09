-- Team members managed by admins from the dashboard.
-- A team_members row is created when an admin invites someone. When that
-- person signs in for the first time via the normal magic-link flow, the
-- trigger below auto-links their auth.users id into the row so completions
-- can be tracked against them.

CREATE TABLE IF NOT EXISTS team_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  job_title   TEXT,
  sector      TEXT NOT NULL CHECK (sector IN ('crypto', 'gambling', 'both')),
  invited_by  UUID REFERENCES auth.users(id),
  invited_at  TIMESTAMPTZ DEFAULT NOW(),
  user_id     UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS team_members_email_idx   ON team_members (email);
CREATE INDEX IF NOT EXISTS team_members_user_id_idx ON team_members (user_id);

-- Lock the table down — only the API endpoints (using the service role key)
-- should access it.
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Auto-link any existing team_members row when its email first signs in.
CREATE OR REPLACE FUNCTION link_team_member_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.team_members
  SET user_id = NEW.id
  WHERE LOWER(email) = LOWER(NEW.email) AND user_id IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS link_team_member_on_signup ON auth.users;
CREATE TRIGGER link_team_member_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION link_team_member_on_signup();
