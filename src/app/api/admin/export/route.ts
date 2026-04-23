import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'
import { MODULES } from '@/data/modules'

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

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v)
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET(req: NextRequest) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { data: members } = await ctx.supabase
    .from('team_members')
    .select('id, email, name, job_title, sector, user_id, invited_at')
    .order('name', { ascending: true })

  const userIds = ((members ?? []) as TeamMemberRow[]).map(m => m.user_id).filter(Boolean) as string[]
  const latestByUserModule: Record<string, string> = {}

  if (userIds.length > 0) {
    const { data: completions } = await ctx.supabase
      .from('completions')
      .select('user_id, module_id, created_at')
      .in('user_id', userIds)
      .order('created_at', { ascending: false })

    for (const c of (completions ?? []) as CompletionRow[]) {
      const key = `${c.user_id}:${c.module_id}`
      if (!latestByUserModule[key]) latestByUserModule[key] = c.created_at.slice(0, 10)
    }
  }

  const header = ['Name', 'Email', 'Role', 'Sector', 'Invited', ...MODULES.map(m => m.title)]
  const rows = [header.map(csvCell).join(',')]

  for (const m of (members ?? []) as TeamMemberRow[]) {
    const row = [
      m.name,
      m.email,
      m.job_title ?? '',
      m.sector,
      m.invited_at.slice(0, 10),
      ...MODULES.map(mod => m.user_id ? (latestByUserModule[`${m.user_id}:${mod.id}`] ?? '') : ''),
    ]
    rows.push(row.map(csvCell).join(','))
  }

  const csv = rows.join('\n')
  const today = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type':        'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="conply-compliance-${today}.csv"`,
    },
  })
}
