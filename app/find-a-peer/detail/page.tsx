// app/dashboard/page.tsx
'use client';

import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';

type Day = {
  day: number;
  title: string;
  description: string;
};

export default function Dashboard() {
  // fetch the 21-day plan
  const { data, error } = useSWR(
    '/api/challenge',
    (url) => fetch(url, { method: 'POST' }).then((r) => r.json())
  );

  // track completion locally
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  if (error)
    return (
      <p className="p-6 text-red-600">Failed to load your challenge.</p>
    );
  if (!data)
    return <p className="p-6 text-gray-500">Loading your 21-day plan…</p>;

  const { plan }: { plan: Day[] } = data;

  function toggle(day: number) {
    setCompleted((c) => ({ ...c, [day]: !c[day] }));
  }

  const streak = plan.filter((d) => completed[d.day]).length;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header with Find-a-Peer and Join Video Room buttons */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">21-Day Challenge</h1>
        <div className="flex gap-2">
          <Link
            href="/find-a-peer"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-gray-900 hover:opacity-90"
          >
            Find a Peer
          </Link>
          <a
            href="https://meet.google.com/tbc-ofug-sug?pli=1&ijlm=1746284500666&hs=187&adhoc=1"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Join Video Room
          </a>
        </div>
      </header>

      {/* Streak counter */}
      <p className="mb-6 text-lg">
        Completed <span className="font-semibold">{streak}</span> of{' '}
        <span className="font-semibold">21</span> days
      </p>

      {/* Plan grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plan.map(({ day, title, description }) => (
          <li
            key={day}
            className={`
              flex items-start gap-4 rounded-2xl border p-4
              ${completed[day]
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200'}
            `}
          >
            <input
              type="checkbox"
              checked={!!completed[day]}
              onChange={() => toggle(day)}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
            <div>
              <h3 className="font-semibold">
                Day {day}: {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
