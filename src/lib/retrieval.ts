import OpenAI from 'openai'
import { createServerClient } from '@/lib/supabaseServer'

export interface RetrievedChunk {
  id:             string
  source:         string
  document_title: string
  section:        string | null
  content:        string
  similarity:     number
}

// Retrieve the top N regulation chunks most relevant to a query.
// Gracefully degrades to [] if OPENAI_API_KEY is missing, pgvector isn't
// enabled, or the embeddings call fails — the scenario API will then
// fall back to non-RAG generation.
// Singleton — avoids re-parsing env and allocating a new HTTP client per request
const openai = process.env.OPENAI_API_KEY ? new OpenAI() : null

export async function retrieveRelevantChunks(query: string, count = 5): Promise<RetrievedChunk[]> {
  if (!openai) return []

  try {
    const embRes = await openai!.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    })
    const embedding = embRes.data[0].embedding

    const supabase = createServerClient()
    const { data, error } = await supabase.rpc('match_regulation_chunks', {
      query_embedding: embedding,
      match_count:     count,
      match_threshold: 0.3,
    })

    if (error) {
      console.error('[retrieval] RPC error:', error.message)
      return []
    }
    return (data ?? []) as RetrievedChunk[]
  } catch (err) {
    console.error('[retrieval] failed:', err)
    return []
  }
}
