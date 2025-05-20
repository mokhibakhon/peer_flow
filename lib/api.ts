export async function fetchChallenge() {
  const res = await fetch('/api/challenge');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
