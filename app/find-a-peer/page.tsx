// app/find-a-peer/page.tsx
'use client';

import { useState, useEffect } from 'react';

/* —— Uzbek-style names —— */
const NAMES = [
  'Aziz', 'Zarina', 'Dilshod', 'Javlon', 'Nigora', 'Bekzod',
  'Laylo', 'Odil', 'Maftuna', 'Sherzod', 'Umida', 'Kamron',
];

/* —— skills & levels —— */
const SKILLS: [string, string][] = [
  ['Python', 'Beginner'],
  ['JavaScript', 'Intermediate'],
  ['React', 'Beginner'],
  ['Node.js', 'Intermediate'],
  ['SQL', 'Intermediate'],
  ['Java', 'Beginner'],
  ['C#', 'Intermediate'],
  ['Docker', 'Intermediate'],
];

/* —— build random peer list —— */
function getRandomPeers(count = 12) {
  const shuffled = [...NAMES].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((name) => {
    const [skill, level] = SKILLS[Math.floor(Math.random() * SKILLS.length)];
    return { name, skill, level };
  });
}

const STORAGE_KEY = 'peerflow_invites';

export default function FindAPeer() {
  const [peers, setPeers] = useState(() => getRandomPeers());
  const [searchTerm, setSearchTerm] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  // hydrate invites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setInvites(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  function sendInvite(name: string) {
    if (invites.includes(name)) return;
    const next = [...invites, name];
    setInvites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    alert(`Invite sent to ${name}!`);
  }

  const filtered = peers.filter((p) =>
    p.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Find a coding buddy</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gray-500">
        Send an invite to someone to pair up, or reshuffle for new peers.
      </p>

      {/* controls */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <button
          onClick={() => setPeers(getRandomPeers())}
          className="rounded-md bg-accent px-5 py-2 font-medium text-gray-900 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          Refresh list
        </button>
        <input
          type="text"
          placeholder="Filter by skill…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      </div>

      {/* grid */}
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ name, skill, level }) => {
          const invited = invites.includes(name);
          return (
            <li
              key={name}
              className="flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="mt-1 text-gray-600">{skill}</p>
                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    level === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {level}
                </span>
              </div>

              <button
                onClick={() => sendInvite(name)}
                disabled={invited}
                className={`
                  mt-6 w-full rounded-md px-4 py-2 text-sm font-medium
                  ${
                    invited
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      : 'bg-accent text-gray-900 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
                  }
                `}
              >
                {invited ? 'Invite Sent' : 'Send Invite'}
              </button>
            </li>
          );
        })}

        {filtered.length === 0 && (
          <li className="col-span-full text-center text-gray-500">
            No peers match “{searchTerm}”
          </li>
        )}
      </ul>
    </div>
  );
}
