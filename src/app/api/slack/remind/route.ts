import { NextRequest, NextResponse } from 'next/server'

async function sendReminder(): Promise<{ ok: boolean; error?: string }> {
  const base     = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const moduleId = process.env.SLACK_MODULE_ID ?? 'aml-financial-crime'
  const url      = `${base}/train/${moduleId}`

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      channel: process.env.SLACK_CHANNEL_ID,
      text: `📋 *Your compliance training is ready*\nStart today's module now — it takes around 10 minutes.\n👉 ${url}`,
    }),
  })

  const data = await res.json()
  return data.ok ? { ok: true } : { ok: false, error: data.error }
}

// Called by Vercel cron — Authorization: Bearer {CRON_SECRET} sent automatically
export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const result = await sendReminder()
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// Manual trigger — pass x-cron-secret header
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const result = await sendReminder()
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}
