/**
 * Embed regulation seed data and upsert into Supabase.
 *
 * Prerequisites:
 *   1. Enable pgvector in Supabase: Database → Extensions → enable `vector`
 *   2. Run the migration:        supabase/migrations/0001_regulation_chunks.sql
 *   3. Set OPENAI_API_KEY and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Run:
 *   npm run embed:regulations
 *
 * The script clears the regulation_chunks table and re-embeds from
 * src/data/regulation-seed.ts. Safe to re-run.
 */

import 'dotenv/config'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import { REGULATION_SEED } from '../src/data/regulation-seed'

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local')
    process.exit(1)
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
    process.exit(1)
  }

  const openai   = new OpenAI()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  )

  console.log(`📚 Embedding ${REGULATION_SEED.length} regulation chunks…`)

  // Wipe existing rows so re-runs stay clean
  const { error: delErr } = await supabase.from('regulation_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delErr) {
    console.error('❌ Failed to clear existing chunks:', delErr.message)
    process.exit(1)
  }

  let inserted = 0
  for (const chunk of REGULATION_SEED) {
    const embRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk.content,
    })
    const embedding = embRes.data[0].embedding

    const { error: insErr } = await supabase.from('regulation_chunks').insert({
      source:         chunk.source,
      document_title: chunk.document_title,
      section:        chunk.section,
      content:        chunk.content,
      embedding,
    })

    if (insErr) {
      console.error(`❌ Failed to insert "${chunk.section ?? chunk.document_title}":`, insErr.message)
      continue
    }

    inserted++
    process.stdout.write(`  ✓ ${chunk.source}${chunk.section ? ': ' + chunk.section : ''}\n`)
  }

  console.log(`\n✅ Inserted ${inserted}/${REGULATION_SEED.length} regulation chunks.`)
}

main().catch(err => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
