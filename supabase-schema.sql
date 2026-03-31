-- ============================================================
-- SecureTrain — Supabase Schema
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

-- Streaks
CREATE TABLE IF NOT EXISTS public.streaks (
  user_id       UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_activity  DATE
);

-- Earned badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id    TEXT NOT NULL,
  earned_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ============================================================
-- Leaderboard view (public, anonymised by display_name)
-- ============================================================
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  u.id,
  COALESCE(u.display_name, SPLIT_PART(u.email, '@', 1)) AS name,
  COUNT(DISTINCT c.module_id)        AS modules_completed,
  COALESCE(AVG(c.score), 0)::INT     AS avg_score,
  COALESCE(s.current_streak, 0)      AS streak,
  COUNT(DISTINCT ub.badge_id)        AS badge_count,
  -- Composite risk score: more completions + higher scores = lower risk
  GREATEST(0, 100 - (COUNT(DISTINCT c.module_id) * 8 + COALESCE(AVG(c.score), 0) * 0.4))::INT AS risk_score
FROM public.users u
LEFT JOIN public.completions c  ON c.user_id = u.id
LEFT JOIN public.streaks s      ON s.user_id = u.id
LEFT JOIN public.user_badges ub ON ub.user_id = u.id
GROUP BY u.id, u.display_name, u.email, s.current_streak
ORDER BY modules_completed DESC, avg_score DESC;

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own data
CREATE POLICY "users_own_data"      ON public.users      FOR ALL USING (auth.uid() = id);
CREATE POLICY "completions_own"     ON public.completions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "streaks_own"         ON public.streaks     FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "badges_own"          ON public.user_badges FOR ALL USING (auth.uid() = user_id);

-- Leaderboard is readable by all authenticated users
CREATE POLICY "leaderboard_read"    ON public.users       FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- Trigger: auto-create user row on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_activity)
  VALUES (NEW.id, 0, 0, NULL);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
