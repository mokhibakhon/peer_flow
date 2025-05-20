'use client';

import { useParams } from 'next/navigation';

export default function Room() {
  const params = useParams();
  const { room } = params;
  return (
    <div className="aspect-video w-full max-w-4xl mx-auto">
      <iframe
        src={`https://meet.jit.si/${room}`}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full rounded-md shadow"
      />
    </div>
  );
}
