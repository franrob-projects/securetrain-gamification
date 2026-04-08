import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  const supabase = createServerClient()

  // Get authenticated user
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { moduleId, score } = await req.json() as { moduleId: string; score: number }
  if (!moduleId || score === undefined) {
    return NextResponse.json({ error: 'moduleId and score required' }, { status: 400 })
  }

  // Save completion
  const newCompletion = { user_id: user.id, module_id: moduleId, score }
  const { error: compErr } = await supabase.from('completions').insert(newCompletion)
  if (compErr) return NextResponse.json({ error: compErr.message }, { status: 500 })

  return NextResponse.json({ saved: true, score })
}
