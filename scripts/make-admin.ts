// Promote an email to admin role in public.users.
// Usage: npx tsx scripts/make-admin.ts <email>

import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const email = process.argv[2]
if (!email) {
  console.error('Usage: tsx scripts/make-admin.ts <email>')
  process.exit(1)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

async function main() {
  // Find auth user by email — listUsers is paginated, scan up to 1000.
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (listErr) { console.error(listErr); process.exit(1) }
  const user = list.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (!user) {
    console.error(`No auth user found for ${email}. Request a magic link first to create the auth row.`)
    process.exit(1)
  }
  console.log(`Found auth user: ${user.id}`)

  const { error: upsertErr } = await supabase
    .from('users')
    .upsert({ id: user.id, email: user.email, role: 'admin' }, { onConflict: 'id' })
  if (upsertErr) { console.error(upsertErr); process.exit(1) }

  console.log(`✓ ${email} is now admin`)
}

main()
