'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!data.ok) {
      setErr(data.message);
    } else {
      router.push('/dashboard');
    }
  }

  function handleGoogle() {
    alert('Google login is not set up yet.');
  }

  return (
    <div className="mx-auto max-w-md bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log in</h2>
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        {/* …Google SVG… */}
        Continue with Google
      </button>
      <div className="my-6 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-left">
          <span className="text-gray-700">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
        </label>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 font-semibold text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
