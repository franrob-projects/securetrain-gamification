import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { sendSlackReminder } from '@/lib/slackSender'
import { sendTeamsReminder } from '@/lib/teamsSender'

// Unified delivery endpoint called by Vercel cron.
// Queries team_members, routes each to their preferred channel.
export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const moduleId = process.env.SLACK_MODULE_ID ?? 'aml-financial-crime'
  const supabase = createServerClient()

  // Fetch all team members with their delivery preferences
  const { data: members, error } = await supabase
    .from('team_members')
    .select('id, email, name, delivery_channel, slack_user_id, teams_user_id')

  if (error) {
    console.error('[deliver] Failed to fetch team_members:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If no members configured yet, fall back to channel-wide broadcast
  if (!members || members.length === 0) {
    console.log('[deliver] No team members found, falling back to channel broadcast')
    const slackResult = await sendSlackReminder({ moduleId })
    const teamsResult = process.env.TEAMS_WEBHOOK_URL
      ? await sendTeamsReminder({ moduleId })
      : { ok: true, error: 'TEAMS_WEBHOOK_URL not set, skipping' }

    return NextResponse.json({
      ok: true,
      mode: 'broadcast',
      slack: slackResult,
      teams: teamsResult,
    })
  }

  // Per-user delivery
  const results: { email: string; channel: string; ok: boolean; error?: string }[] = []

  for (const member of members) {
    const channel = member.delivery_channel ?? 'slack'

    if (channel === 'teams') {
      const result = await sendTeamsReminder({
        userName:     member.name,
        moduleId,
        teamMemberId: member.id,
      })
      results.push({ email: member.email, channel: 'teams', ok: result.ok, error: result.error })
    } else {
      const result = await sendSlackReminder({
        userName:     member.name,
        moduleId,
        channel:      member.slack_user_id ?? undefined,
        teamMemberId: member.id,
      })
      results.push({ email: member.email, channel: 'slack', ok: result.ok, error: result.error })
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
