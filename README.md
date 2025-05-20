# Peer Flow

Find a coding buddy and conquer the AI‑powered 21‑day challenge.

## Tech stack

- **Next.js 14** (App Router) + TypeScript  
- **Tailwind CSS** 3 + Headless UI + Heroicons  
- **SWR** for data fetching  
- Fake email sign‑in (no backend)  
- Jitsi iframe for pair‑programming rooms  
- Stub **/api/challenge** route returns mock JSON (works offline)

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

### AI integration

The project ships with a stubbed endpoint so you can try it offline.  
To call the real OpenAI API create a file **.env.local** and add

```
OPENAI_API_KEY=your_key_here
```

Then replace the logic inside `app/api/challenge/route.ts`.

## Tooling

- ESLint, Prettier, Husky pre‑commit + Conventional Commit lint.

Enjoy!
# peer-flow
