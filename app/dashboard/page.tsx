// app/dashboard/page.tsx
'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Day = { day: number; title: string; description: string };
const STORAGE_KEY = 'peerflow_completed';

const fetcher = (url: string) =>
  fetch(url, { method: 'POST' }).then((res) => res.json());

export default function Dashboard() {
  // SWR for our stubbed 21-day plan
  const { data, error } = useSWR('/api/challenge', fetcher);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [roomSlug, setRoomSlug] = useState('');
  const [partner, setPartner] = useState('');

  // Hydrate room slug, partner & completed-map from localStorage
  useEffect(() => {
    // room slug
    let slug = localStorage.getItem('peerflow_room');
    if (!slug) {
      slug = `peerflow-${Date.now().toString(36)}`;
      localStorage.setItem('peerflow_room', slug);
    }
    setRoomSlug(slug);

    // partner stub
    const p = localStorage.getItem('peerflow_partner') || 'Not matched yet';
    setPartner(p);

    // completed map
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompleted(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  if (error) {
    return <p className="p-6 text-red-600">Failed to load your challenge.</p>;
  }
  if (!data) {
    return <p className="p-6 text-gray-500">Loading your 21-day plan…</p>;
  }

  const plan: Day[] = data.plan;
  const streak = plan.filter((d) => completed[d.day]).length;
  const weeks = [0, 1, 2].map((i) => plan.slice(i * 7, i * 7 + 7));

  function toggle(day: number) {
    setCompleted((prev) => ({ ...prev, [day]: !prev[day] }));
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    alert('Your progress has been saved!');
  }
  

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">21-Day Challenge</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Partner: <strong>{partner}</strong>
          </span>
          <Link href="/find-a-peer" className="text-accent hover:underline text-sm">
            Change
          </Link>
        </div>
      </header>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-semibold text-accent">{streak}/21</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-accent h-3"
            style={{ width: `${(streak / 21) * 100}%` }}
          />
        </div>
      </div>


{/* Action buttons */}
<div className="mb-8 flex flex-col sm:flex-row gap-4">
  <Link
    href={`/rooms/${roomSlug}`}
    className="inline-block bg-primary px-6 py-2 text-white rounded-md shadow hover:opacity-90 text-center"
  >
    Join Video Room
  </Link>
  <button
    onClick={saveProgress}
    className="inline-block bg-green-500 px-6 py-2 text-white rounded-md shadow hover:opacity-90"
  >
    Save Progress
  </button>
</div>


      {/* Weekly tasks */}
      <div className="space-y-10">
        {weeks.map((week, idx) => (
          <div key={idx}>
            <h2 className="text-lg font-semibold mb-3">Week {idx + 1}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {week.map(({ day, title, description }) => (
                <li
                  key={day}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border
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
                    <p className="mt-1 text-sm text-gray-600">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


