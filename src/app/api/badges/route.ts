import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { getBadgeById, BADGES } from '@/data/badges'

export async function GET(req: NextRequest) {
  const supabase = createServerClient()

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { data: earnedRows } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', user.id)

  const earnedMap = new Map(earnedRows?.map(r => [r.badge_id, r.earned_at]) ?? [])

  const allBadges = BADGES.map(b => ({
    ...b,
    earned: earnedMap.has(b.id),
    earned_at: earnedMap.get(b.id) ?? null,
  }))

  return NextResponse.json(allBadges)
}
