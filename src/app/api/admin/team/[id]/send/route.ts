import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { sendSlackReminder } from '@/lib/slackSender'
import { sendTeamsReminder } from '@/lib/teamsSender'
import { pickModule } from '@/lib/moduleRotation'

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

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => ({})) as { moduleId?: string }

  const { data: member, error } = await ctx.supabase
    .from('team_members')
    .select('id, name, sector, delivery_channel, slack_user_id')
    .eq('id', id)
    .single()

  if (error || !member) return NextResponse.json({ error: 'Team member not found' }, { status: 404 })

  const channel = member.delivery_channel ?? 'slack'
  const sector = (member.sector ?? 'both') as 'crypto' | 'gambling' | 'both'
  const moduleId = body.moduleId ?? pickModule({ sector, override: process.env.SLACK_MODULE_ID }).id

  if (channel === 'teams') {
    const result = await sendTeamsReminder({
      userName:     member.name,
      moduleId,
      teamMemberId: member.id,
    })
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 })
    return NextResponse.json({ ok: true, channel: 'teams' })
  }

  const result = await sendSlackReminder({
    userName:     member.name,
    moduleId,
    channel:      member.slack_user_id ?? undefined,
    teamMemberId: member.id,
  })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 })
  return NextResponse.json({ ok: true, channel: 'slack', ts: result.ts })
}
