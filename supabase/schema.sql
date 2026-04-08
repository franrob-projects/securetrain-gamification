-- ============================================================
-- ConPly — full Supabase schema
-- Run this first, then run add-role.sql
-- ============================================================

-- Users table (mirrors auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  display_name  TEXT,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Completions table
CREATE TABLE IF NOT EXISTS public.completions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  module_id   TEXT NOT NULL,
  score       INT NOT NULL CHECK (score BETWEEN 0 AND 100),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create a users row when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'display_name',
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RPC: user stats for admin dashboard
CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS TABLE (
  id                UUID,
  email             TEXT,
  display_name      TEXT,
  completions_count BIGINT,
  avg_score         NUMERIC
) AS $$
  SELECT
    u.id,
    u.email,
    u.display_name,
    COUNT(c.id)        AS completions_count,
    AVG(c.score)       AS avg_score
  FROM public.users u
  LEFT JOIN public.completions c ON c.user_id = u.id
  GROUP BY u.id, u.email, u.display_name;
$$ LANGUAGE sql SECURITY DEFINER;

-- Row Level Security
ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completions ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own row
DROP POLICY IF EXISTS "users: read own"   ON public.users;
DROP POLICY IF EXISTS "users: update own" ON public.users;
CREATE POLICY "users: read own"   ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users: update own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Completions: users can read/insert their own
DROP POLICY IF EXISTS "completions: read own"   ON public.completions;
DROP POLICY IF EXISTS "completions: insert own" ON public.completions;
CREATE POLICY "completions: read own"   ON public.completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "completions: insert own" ON public.completions FOR INSERT WITH CHECK (auth.uid() = user_id);
