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

type Patchable = {
  delivery_channel?: 'slack' | 'teams'
  slack_user_id?:    string | null
  teams_user_id?:    string | null
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => ({})) as Patchable

  const update: Patchable = {}
  if (body.delivery_channel !== undefined) {
    if (!['slack', 'teams'].includes(body.delivery_channel)) {
      return NextResponse.json({ error: 'delivery_channel must be slack or teams' }, { status: 400 })
    }
    update.delivery_channel = body.delivery_channel
  }
  if (body.slack_user_id !== undefined) update.slack_user_id = body.slack_user_id?.trim() || null
  if (body.teams_user_id !== undefined) update.teams_user_id = body.teams_user_id?.trim() || null

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  const { data, error } = await ctx.supabase
    .from('team_members')
    .update(update)
    .eq('id', id)
    .select('id, delivery_channel, slack_user_id, teams_user_id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ member: data })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await requireAdmin(req)
  if (!ctx) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await params
  const { error } = await ctx.supabase.from('team_members').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
