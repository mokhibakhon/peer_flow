// app/api/challenge/route.ts
export const runtime = 'edge';

import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // official SDK

// A 21-day mock for dev, so GET/POST both return something valid:
const MOCK_PLAN = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  title: `Day ${i + 1}`,
  description: `Mock description for day ${i + 1}.`,
}));

// --- GET handler: Dashboard will call /api/challenge with GET if you don't pass anything
export async function GET() {
  return NextResponse.json({ plan: MOCK_PLAN });
}

// --- POST handler: still supports your AI logic when you send learners[] in the body
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    // no JSON body? just return the mock
    return NextResponse.json({ plan: MOCK_PLAN });
  }

  const learners: { name: string; skill: string; level: string }[] =
    Array.isArray(body.learners) ? body.learners : [];

  // if you really need two learners before calling AI, else fallback:
  if (learners.length !== 2) {
    return NextResponse.json({ plan: MOCK_PLAN });
  }

  // Otherwise invoke OpenAI (make sure OPENAI_API_KEY is set in .env.local!)
  const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const prompt = `
You are a world-class coding tutor.
Generate a 21-day paired study plan for:
 • ${learners[0].name} — ${learners[0].level} in ${learners[0].skill}
 • ${learners[1].name} — ${learners[1].level} in ${learners[1].skill}

Return pure JSON:
[
  { "day": 1, "title": "...", "description": "..." },
  …
]
  `.trim();

  try {
    const completion = await ai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful tutor.' },
        { role: 'user', content: prompt },
      ],
    });

    const text = completion.choices[0].message?.content || '';
    const plan = JSON.parse(text);
    return NextResponse.json({ plan });
  } catch (err) {
    // on any parsing or API error, return our mock instead
    console.error('AI error', err);
    return NextResponse.json({ plan: MOCK_PLAN });
  }
}
