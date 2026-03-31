import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

export async function GET() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}
