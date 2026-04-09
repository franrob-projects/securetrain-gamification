import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

async function sendReminder(opts: { userName?: string; moduleId?: string }): Promise<{ ok: boolean; error?: string }> {
  const base     = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const moduleId = opts.moduleId ?? process.env.SLACK_MODULE_ID ?? 'aml-financial-crime'
  // Append ?redirect so re-auth lands the user back on their assigned module
  const url      = `${base}/train/${moduleId}?redirect=/train/${moduleId}`

  const greeting = opts.userName
    ? `📋 *Reminder for ${opts.userName}: your compliance training is overdue*`
    : `📋 *Your compliance training is ready*`

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      channel: process.env.SLACK_CHANNEL_ID,
      text: `${greeting}\nStart today's module now — it takes around 10 minutes.\n👉 ${url}`,
    }),
  })

  const data = await res.json()
  return data.ok ? { ok: true } : { ok: false, error: data.error }
}

// Vercel cron — Authorization: Bearer {CRON_SECRET}
export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const result = await sendReminder({})
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// POST: either x-cron-secret (manual cron trigger) OR admin user token (per-user reminder from dashboard)
export async function POST(req: NextRequest) {
  const cronSecret = req.headers.get('x-cron-secret')
  const authHeader = req.headers.get('Authorization')

  let authorised = false

  if (cronSecret && cronSecret === process.env.CRON_SECRET) {
    authorised = true
  } else if (authHeader) {
    const supabase = createServerClient()
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)
    if (user) {
      const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
      if (profile?.role === 'admin') authorised = true
    }
  }

  if (!authorised) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({})) as { userName?: string; moduleId?: string }

  const result = await sendReminder({ userName: body.userName, moduleId: body.moduleId })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}
