#!/usr/bin/env node
// Probe whether migration 0003_delivery_tracking.sql has been applied.
// Run: node scripts/check-delivery-migration.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]
    })
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

const checks = []

const { error: colErr } = await supabase
  .from('team_members')
  .select('id, delivery_channel, slack_user_id, teams_user_id')
  .limit(1)
checks.push({
  name: 'team_members.delivery_channel column',
  ok:   !colErr,
  err:  colErr?.message,
})

const { error: tableErr } = await supabase
  .from('delivery_log')
  .select('id')
  .limit(1)
checks.push({
  name: 'delivery_log table',
  ok:   !tableErr,
  err:  tableErr?.message,
})

let allGood = true
for (const c of checks) {
  console.log(`${c.ok ? 'ok  ' : 'FAIL'}  ${c.name}${c.err ? `  —  ${c.err}` : ''}`)
  if (!c.ok) allGood = false
}

if (!allGood) {
  console.log('\nMigration 0003_delivery_tracking.sql has NOT been applied.')
  console.log('Run supabase/migrations/0003_delivery_tracking.sql in the Supabase SQL editor.')
  process.exit(2)
}
console.log('\nMigration 0003 is applied.')
