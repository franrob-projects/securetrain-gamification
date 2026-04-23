import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

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

// Reports which environment-backed integrations are wired up.
// Returns booleans only — never the secret values themselves.
export async function GET(req: NextRequest) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  return NextResponse.json({
    slack: {
      botToken:  !!process.env.SLACK_BOT_TOKEN,
      channelId: !!process.env.SLACK_CHANNEL_ID,
    },
    teams: {
      webhook: !!process.env.TEAMS_WEBHOOK_URL,
    },
    anthropic: {
      apiKey: !!process.env.ANTHROPIC_API_KEY,
    },
    cron: {
      secret: !!process.env.CRON_SECRET,
    },
  })
}
