// app/video/[room]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function VideoRoomPage() {
  const { room } = useParams();             // the “room” slug from the URL
  const iframeSrc = `https://meet.jit.si/${room}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* back button */}
      <header className="p-4 border-b bg-white">
        <Link
          href="/find-a-peer"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to peers
        </Link>
      </header>

      {/* Jitsi iframe fills the rest */}
      <iframe
        src={iframeSrc}
        allow="camera; microphone; fullscreen; display-capture"
        className="flex-1 w-full"
      />
    </div>
  );
}
