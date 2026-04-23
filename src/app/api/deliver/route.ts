import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { sendSlackReminder } from '@/lib/slackSender'
import { sendTeamsReminder } from '@/lib/teamsSender'
import { pickModule } from '@/lib/moduleRotation'

type MemberSector = 'crypto' | 'gambling' | 'both'

// Unified delivery endpoint called by Vercel cron.
// Queries team_members, routes each to their preferred channel,
// and rotates the training module weekly per sector.
export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const override = process.env.SLACK_MODULE_ID  // optional: pin the rotation
  const now = new Date()
  const supabase = createServerClient()

  const { data: members, error } = await supabase
    .from('team_members')
    .select('id, email, name, sector, delivery_channel, slack_user_id, teams_user_id')

  if (error) {
    console.error('[deliver] Failed to fetch team_members:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!members || members.length === 0) {
    const broadcastModule = pickModule({ date: now, override })
    console.log(`[deliver] No team members, broadcasting "${broadcastModule.id}"`)
    const slackResult = await sendSlackReminder({ moduleId: broadcastModule.id })
    const teamsResult = process.env.TEAMS_WEBHOOK_URL
      ? await sendTeamsReminder({ moduleId: broadcastModule.id })
      : { ok: true, error: 'TEAMS_WEBHOOK_URL not set, skipping' }

    return NextResponse.json({
      ok:       true,
      mode:     'broadcast',
      moduleId: broadcastModule.id,
      slack:    slackResult,
      teams:    teamsResult,
    })
  }

  const results: { email: string; channel: string; moduleId: string; ok: boolean; error?: string }[] = []

  for (const member of members) {
    const sector = (member.sector ?? 'both') as MemberSector
    const mod = pickModule({ date: now, sector, override })
    const channel = member.delivery_channel ?? 'slack'

    if (channel === 'teams') {
      const result = await sendTeamsReminder({
        userName:     member.name,
        moduleId:     mod.id,
        teamMemberId: member.id,
      })
      results.push({ email: member.email, channel: 'teams', moduleId: mod.id, ok: result.ok, error: result.error })
    } else {
      const result = await sendSlackReminder({
        userName:     member.name,
        moduleId:     mod.id,
        channel:      member.slack_user_id ?? undefined,
        teamMemberId: member.id,
      })
      results.push({ email: member.email, channel: 'slack', moduleId: mod.id, ok: result.ok, error: result.error })
    }
  }

  const sent   = results.filter(r => r.ok).length
  const failed = results.filter(r => !r.ok).length

  console.log(`[deliver] Sent: ${sent}, Failed: ${failed}`)

  return NextResponse.json({
    ok: failed === 0,
    mode: 'per-user',
    sent,
    failed,
    results,
  })
}
