import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { retrieveRelevantChunks } from '@/lib/retrieval'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { moduleTitle, topics } = await req.json() as { moduleTitle: string; topics: string[] }

  // RAG: pull relevant Gibraltar regulation chunks (gracefully no-ops if disabled)
  const query  = `${moduleTitle} ${topics.join(' ')}`
  const chunks = await retrieveRelevantChunks(query, 4)

  const regulationContext = chunks.length > 0
    ? `
You MUST ground the scenario in the following official Gibraltar regulation excerpts. Quote and reference only what is provided here — do NOT invent additional regulation. Use the section/principle references shown below verbatim in the regulation reference line.

${chunks.map((c, i) => `[REGULATION ${i + 1}] ${c.source} — ${c.document_title}${c.section ? ` (${c.section})` : ''}
${c.content}`).join('\n\n')}
`
    : ''

  const prompt = `You are a Gibraltar compliance training expert. Generate a realistic workplace scenario for a training module called "${moduleTitle}".

Topics covered: ${topics.join(', ')}
${regulationContext}
Return ONLY valid JSON matching this exact shape:
{
  "scenario": "2-3 sentence description of a realistic situation the trainee faces",
  "question": "A clear multiple-choice question about what they should do",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "1-2 sentences explaining why the correct answer is right and what the regulatory basis is.\\nRegulation reference: [Act name and section or principle number]."
}

Make it specific to Gibraltar regulation (GFSC, Gibraltar Gambling Commissioner, POCA 2015, etc.). Use realistic names and firms.

The explanation field MUST end with a new line containing the regulation reference in this exact format:
Regulation reference: [Act name and section or principle number].

Examples of valid regulation references:
- Regulation reference: POCA 2015, Section 28 — MLRO appointment and reporting obligations.
- Regulation reference: GFSC DLT Regulatory Principles, Principle 7 — Systems and security protocols.
- Regulation reference: Gibraltar Gambling Act 2025, Section 42 — Staff training requirements.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))

  return NextResponse.json({
    ...json,
    _ragChunksUsed: chunks.length, // diagnostic — UI ignores this
  })
}
