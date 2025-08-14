// app/api/challenge/route.ts
export const runtime = 'edge';

import { NextResponse } from 'next/server';

// A 21-day mock plan for the platform
const MOCK_PLAN = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  title: `Day ${i + 1}`,
  description: `Mock description for day ${i + 1}.`,
}));

// --- GET handler: Dashboard will call /api/challenge with GET if you don't pass anything
export async function GET() {
  return NextResponse.json({ plan: MOCK_PLAN });
}

// --- POST handler: returns mock plan for now
export async function POST() {
  // Always return mock plan for now
  return NextResponse.json({ plan: MOCK_PLAN });
}
