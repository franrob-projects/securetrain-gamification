// Generate a Supabase magic-link URL without sending an email.
// Usage: npx tsx scripts/magic-link.ts <email> [redirectTo]

import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const email = process.argv[2]
const redirectTo = process.argv[3] ?? 'https://www.conply.org/auth?redirect=%2Fadmin%3Fdemo%3D1'
if (!email) {
  console.error('Usage: tsx scripts/magic-link.ts <email> [redirectTo]')
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
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: { redirectTo },
  })
  if (error) { console.error(error); process.exit(1) }
  console.log('\nOpen this URL in your browser:\n')
  console.log(data.properties.action_link)
  console.log('')
}

main()
