import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { evaluateNewBadges, calculateStreak } from '@/lib/badgeEngine'

export async function POST(req: NextRequest) {
  const supabase = createServerClient()

  // Get authenticated user
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { moduleId, score } = await req.json() as { moduleId: string; score: number }
  if (!moduleId || score === undefined) {
    return NextResponse.json({ error: 'moduleId and score required' }, { status: 400 })
  }

  // 1. Save completion
  const newCompletion = { user_id: user.id, module_id: moduleId, score }
  const { error: compErr } = await supabase.from('completions').insert(newCompletion)
  if (compErr) return NextResponse.json({ error: compErr.message }, { status: 500 })

  // 2. Fetch all completions for this user
  const { data: allCompletions } = await supabase
    .from('completions')
    .select('module_id, score, completed_at')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: true })

  // 3. Fetch already-earned badges
  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', user.id)

  const earned_badge_ids = earnedBadges?.map(b => b.badge_id) ?? []

  // 4. Fetch current streak record
  const { data: streakRow } = await supabase
    .from('streaks')
    .select('last_activity')
    .eq('user_id', user.id)
    .single()

  // 5. Evaluate new badges
  const completionRecord = {
    module_id: moduleId,
    score,
    completed_at: new Date().toISOString(),
  }

  const newBadges = evaluateNewBadges(
    {
      completions: allCompletions ?? [],
      current_streak: 0, // will be recalculated below
      earned_badge_ids,
    },
    completionRecord
  )

  // 6. Insert new badges
  if (newBadges.length > 0) {
    await supabase.from('user_badges').insert(
      newBadges.map(b => ({ user_id: user.id, badge_id: b.id }))
    )
  }

  // 7. Update streak
  const { current_streak, longest_streak } = calculateStreak(
    allCompletions ?? [],
    streakRow?.last_activity ?? null
  )

  await supabase.from('streaks').upsert({
    user_id: user.id,
    current_streak,
    longest_streak,
    last_activity: new Date().toISOString().split('T')[0],
  })

  return NextResponse.json({
    saved: true,
    score,
    streak: current_streak,
    newBadges: newBadges.map(b => ({ id: b.id, name: b.name, icon: b.icon, tier: b.tier })),
  })
}
