import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

interface DeliveryLogRow {
  id:             string
  team_member_id: string | null
  channel:        'slack' | 'teams'
  module_id:      string
  status:         'pending' | 'sent' | 'failed'
  error_message:  string | null
  message_ts:     string | null
  delivered_at:   string
}

async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth) return null
  const supabase = createServerClient()
  const token = auth.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)
  if (!user) return null
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return null
  return { user, supabase }
}

export async function GET(req: NextRequest) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const url = new URL(req.url)
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '100', 10) || 100, 500)

  const { data: logs, error } = await ctx.supabase
    .from('delivery_log')
    .select('id, team_member_id, channel, module_id, status, error_message, message_ts, delivered_at')
    .order('delivered_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const memberIds = Array.from(new Set(((logs ?? []) as DeliveryLogRow[]).map(l => l.team_member_id).filter(Boolean))) as string[]
  const membersById: Record<string, { name: string; email: string }> = {}

  if (memberIds.length > 0) {
    const { data: members } = await ctx.supabase
      .from('team_members')
      .select('id, name, email')
      .in('id', memberIds)
    for (const m of members ?? []) {
      membersById[m.id] = { name: m.name, email: m.email }
    }
  }

  const enriched = ((logs ?? []) as DeliveryLogRow[]).map(l => ({
    ...l,
    member_name:  l.team_member_id ? membersById[l.team_member_id]?.name  ?? null : null,
    member_email: l.team_member_id ? membersById[l.team_member_id]?.email ?? null : null,
  }))

  return NextResponse.json({ logs: enriched })
}
