-- Delivery tracking: log every message sent via Slack or Teams,
-- and let each team member specify their preferred channel.

-- 1. Add delivery preferences to team_members
ALTER TABLE team_members
  ADD COLUMN IF NOT EXISTS delivery_channel TEXT DEFAULT 'slack'
    CHECK (delivery_channel IN ('slack', 'teams')),
  ADD COLUMN IF NOT EXISTS slack_user_id TEXT,
  ADD COLUMN IF NOT EXISTS teams_user_id TEXT;

-- 2. Delivery log: one row per message sent
CREATE TABLE IF NOT EXISTS delivery_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id  UUID REFERENCES team_members(id) ON DELETE SET NULL,
  channel         TEXT NOT NULL CHECK (channel IN ('slack', 'teams')),
  module_id       TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message   TEXT,
  message_ts      TEXT,                       -- Slack ts / Teams message ID
  delivered_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS delivery_log_member_idx ON delivery_log (team_member_id);
CREATE INDEX IF NOT EXISTS delivery_log_date_idx   ON delivery_log (delivered_at DESC);

-- RLS: only service-role can write; admins can read via API
ALTER TABLE delivery_log ENABLE ROW LEVEL SECURITY;
