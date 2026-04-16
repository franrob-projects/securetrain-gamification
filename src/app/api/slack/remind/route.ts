import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { MODULES } from '@/data/modules'

const THREAT_LABEL: Record<string, string> = {
  critical: '🔴  Critical priority',
  high:     '🟠  High priority',
  medium:   '🟡  Medium priority',
  low:      '🟢  Low priority',
}

const SECTOR_LABEL: Record<string, string> = {
  crypto:   'Crypto licensees',
  gambling: 'Gambling licensees',
  both:     'All Gibraltar licensees',
}

async function sendReminder(opts: { userName?: string; moduleId?: string }): Promise<{ ok: boolean; error?: string }> {
  const base     = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org'
  const moduleId = opts.moduleId ?? process.env.SLACK_MODULE_ID ?? 'aml-financial-crime'
  const module   = MODULES.find(m => m.id === moduleId) ?? MODULES[0]
  const url      = `${base}/train/${moduleId}`

  const isPersonal = !!opts.userName
  const headerText = isPersonal
    ? `${opts.userName}, your training is due`
    : `Today's compliance training`

  const shortDescription = module.description.length > 180
    ? module.description.slice(0, 180).trimEnd() + '…'
    : module.description

  const topicPreview = module.topics.slice(0, 3).map(t => `  •  ${t}`).join('\n')

  const metaLine = [
    THREAT_LABEL[module.threatLevel] ?? module.threatLevel,
    `⏱  ${module.durationMins} min`,
    SECTOR_LABEL[module.sector] ?? module.sector,
  ].join('    ·    ')

  const fallbackText = `${headerText}: ${module.title}`

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: headerText, emoji: true },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${module.title}*\n${shortDescription}`,
      },
    },
    {
      type: 'context',
      elements: [{ type: 'mrkdwn', text: metaLine }],
    },
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*What you'll cover*\n${topicPreview}`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: 'Start training', emoji: true },
          url,
          style: 'primary',
        },
        {
          type: 'button',
          text: { type: 'plain_text', text: 'View all modules', emoji: true },
          url: `${base}/progress`,
        },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `<${base}|Conply>  ·  Gibraltar compliance training, mapped to regulation`,
        },
      ],
    },
  ]

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      channel: process.env.SLACK_CHANNEL_ID,
      text:    fallbackText,
      attachments: [
        {
          color: '#5B54B8',
          blocks,
        },
      ],
      unfurl_links: false,
      unfurl_media: false,
    }),
  })

  const data = await res.json()
  return data.ok ? { ok: true } : { ok: false, error: data.error }
}

// Vercel cron: Authorization: Bearer {CRON_SECRET}
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
