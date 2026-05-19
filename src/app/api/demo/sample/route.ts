import { NextRequest, NextResponse } from 'next/server'
import { sendSlackReminder } from '@/lib/slackSender'
import { sendTeamsReminder } from '@/lib/teamsSender'

// Best-effort cooldown to keep the public demo button from spamming the
// configured Slack/Teams channel. Per-instance only — multiple warm
// Vercel functions could each let one through, which is fine for a demo.
let lastSendAt = 0
const COOLDOWN_MS = 10_000

export async function POST(req: NextRequest) {
  const now = Date.now()
  const elapsed = now - lastSendAt
  if (elapsed < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - elapsed) / 1000)
    return NextResponse.json({ error: `Please wait ${wait}s before sending another sample.` }, { status: 429 })
  }

  const body = await req.json().catch(() => ({})) as { channel?: string }
  const channel = body.channel === 'teams' ? 'teams' : 'slack'

  lastSendAt = now

  const result = channel === 'teams'
    ? await sendTeamsReminder({ userName: 'Demo viewer', demoMode: true })
    : await sendSlackReminder({ userName: 'Demo viewer', demoMode: true })

  if (!result.ok) {
    lastSendAt = 0 // failures shouldn't burn the cooldown
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ ok: true, channel })
}
