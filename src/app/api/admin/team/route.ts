import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

interface TeamMemberRow {
  id:         string
  email:      string
  name:       string
  job_title:  string | null
  sector:     'crypto' | 'gambling' | 'both'
  user_id:    string | null
  invited_at: string
}

interface CompletionRow {
  user_id:    string
  module_id:  string
  created_at: string
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

  const { data: members, error } = await ctx.supabase
    .from('team_members')
    .select('id, email, name, job_title, sector, user_id, invited_at')
    .order('invited_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Pull completions for any linked members
  const userIds = (members ?? []).map((m: TeamMemberRow) => m.user_id).filter(Boolean) as string[]
  const completionsByUser: Record<string, { module_id: string; created_at: string }[]> = {}

  if (userIds.length > 0) {
    const { data: completions } = await ctx.supabase
      .from('completions')
      .select('user_id, module_id, created_at')
      .in('user_id', userIds)

    for (const c of (completions ?? []) as CompletionRow[]) {
      if (!completionsByUser[c.user_id]) completionsByUser[c.user_id] = []
      completionsByUser[c.user_id].push({ module_id: c.module_id, created_at: c.created_at })
    }
  }

  const enriched = (members ?? []).map((m: TeamMemberRow) => ({
    ...m,
    completions: m.user_id ? (completionsByUser[m.user_id] ?? []) : [],
  }))

  return NextResponse.json({ members: enriched })
}

export async function POST(req: NextRequest) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body = await req.json().catch(() => ({})) as {
    email?: string
    name?: string
    job_title?: string
    sector?: string
  }

  if (!body.email || !body.name || !body.sector) {
    return NextResponse.json({ error: 'email, name, and sector are required' }, { status: 400 })
  }
  if (!['crypto', 'gambling', 'both'].includes(body.sector)) {
    return NextResponse.json({ error: 'sector must be crypto, gambling, or both' }, { status: 400 })
  }

  const cleanEmail = body.email.toLowerCase().trim()

  const { data, error } = await ctx.supabase
    .from('team_members')
    .insert({
      email:      cleanEmail,
      name:       body.name.trim(),
      job_title:  body.job_title?.trim() || null,
      sector:     body.sector,
      invited_by: ctx.user.id,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A team member with this email already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send Supabase invite email — creates auth.users entry, fires the
  // link_team_member_on_signup trigger, and emails them a sign-in link.
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const { error: inviteError } = await ctx.supabase.auth.admin.inviteUserByEmail(cleanEmail, {
    redirectTo: `${base}/`,
    data: {
      name:       body.name.trim(),
      invited_by: ctx.user.email,
    },
  })

  if (inviteError) {
    // Most common reason: user already exists in auth.users from a prior signup.
    // The team_member row is still created — they just won't get an invite email.
    console.warn('[invite-email]', inviteError.message)
    return NextResponse.json({
      member: data,
      invite: { sent: false, reason: inviteError.message },
    })
  }

  return NextResponse.json({
    member: data,
    invite: { sent: true },
  })
}
