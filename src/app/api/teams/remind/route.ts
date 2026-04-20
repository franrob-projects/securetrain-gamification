import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { sendTeamsReminder } from '@/lib/teamsSender'

// Vercel cron: Authorization: Bearer {CRON_SECRET}
export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const result = await sendTeamsReminder({})
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// POST: admin-triggered reminder
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
  const result = await sendTeamsReminder({ userName: body.userName, moduleId: body.moduleId })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json({ ok: true })
}
