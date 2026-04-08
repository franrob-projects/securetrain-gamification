-- ============================================================
-- SecureTrain — Supabase Schema (Simplified)
-- Run this in your Supabase project → SQL Editor → New query
-- ============================================================

-- Users table (links to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  display_name TEXT,
  avatar_url  TEXT,
  sector      TEXT DEFAULT 'both' CHECK (sector IN ('crypto', 'gambling', 'both')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Module completions
CREATE TABLE IF NOT EXISTS public.completions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  module_id   TEXT NOT NULL,
  score       INT NOT NULL CHECK (score BETWEEN 0 AND 100),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completions ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own data
CREATE POLICY "users_own_data"      ON public.users      FOR ALL USING (auth.uid() = id);
CREATE POLICY "completions_own"     ON public.completions FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Trigger: auto-create user row on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Admin function to get user stats
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS TABLE(
  id UUID,
  email TEXT,
  display_name TEXT,
  completions_count BIGINT,
  avg_score NUMERIC
) LANGUAGE SQL SECURITY DEFINER AS $$
SELECT
  u.id,
  u.email,
  u.display_name,
  COUNT(c.id)::BIGINT AS completions_count,
  CASE WHEN COUNT(c.id) > 0 THEN AVG(c.score) ELSE NULL END AS avg_score
FROM public.users u
LEFT JOIN public.completions c ON c.user_id = u.id
GROUP BY u.id, u.email, u.display_name
ORDER BY completions_count DESC;
$$;
