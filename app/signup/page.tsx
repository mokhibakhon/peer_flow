'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('peerflow_email', email);
      router.push('/dashboard');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-left">
          <span className="text-gray-700">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2 font-semibold text-white
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
