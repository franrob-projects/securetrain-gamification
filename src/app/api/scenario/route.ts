import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { moduleTitle, topics } = await req.json() as { moduleTitle: string; topics: string[] }

  const prompt = `You are a Gibraltar compliance training expert. Generate a realistic workplace scenario for a training module called "${moduleTitle}".

Topics covered: ${topics.join(', ')}

Return ONLY valid JSON matching this exact shape:
{
  "scenario": "2-3 sentence description of a realistic situation the trainee faces",
  "question": "A clear multiple-choice question about what they should do",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "1-2 sentences explaining why the correct answer is right and what the regulatory basis is"
}

Make it specific to Gibraltar regulation (GFSC, Gibraltar Gambling Commissioner, POCA 2015, etc.). Use realistic names and firms.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))

  return NextResponse.json(json)
}
