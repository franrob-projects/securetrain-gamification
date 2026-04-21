import { NextResponse } from 'next/server'

// Slack sends POST here when users interact with buttons/menus.
// Our buttons are just URL links so nothing to handle — return 200.
export async function POST() {
  return NextResponse.json({ ok: true })
}
