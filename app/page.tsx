// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  PlayIcon,
  UserGroupIcon,
  ArrowLongRightIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

/* ───────── PAGE ───────── */
export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section
        className="
          relative isolate overflow-hidden rounded-3xl bg-gray-900
          mx-4 lg:mx-8 mt-6
        "
      >
        <Image
          src="/background.png"
          alt=""
          fill
          className="object-cover opacity-70"
          priority
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Learn together, <span className="text-accent">level up faster</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Tired of hitting walls alone? Peer Flow matches you with a coding
            buddy at your level so you can learn, grow and celebrate
            achievements together.
          </p>
          <Link
            href="/find-a-peer"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent px-8 py-4 font-semibold text-gray-900 shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            Find Your Coding Buddy
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ───────── Features ───────── */}
      <section
        id="how-it-works"
        className="container mx-auto mt-28 max-w-4xl px-6 text-center"
      >
        <h2 className="text-4xl font-bold">Features that boost your progress</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          AI-generated 21-day challenges, instant partner matching, study-with-me
          sessions and a shared streak tracker keep you engaged every day.
        </p>

        <ul className="mt-16 mx-auto max-w-2xl space-y-12 pl-12 sm:pl-16 text-left">
          {[
            {
              icon: PlayIcon,
              title: 'AI-Generated 21-Day Challenges',
              copy: 'Tailored learning paths that adapt to your skill level.',
            },
            {
              icon: UserGroupIcon,
              title: 'Instant Matching & Built-in Video Rooms',
              copy:
                'Connect with a coding buddy in your timezone for seamless collaboration.',
            },
            {
              icon: ArrowRightIcon,
              title: 'Shared Streak',
              copy: 'Track your progress together.',
            },
          ].map(({ icon: Icon, title, copy }) => (
            <li
              key={title}
              className="grid max-w-2xl grid-cols-[48px_1fr] gap-6 mx-auto"
            >
              <Icon className="h-10 w-10 shrink-0 stroke-2" />
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-gray-500">{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
{/* ───────── Pricing tables ───────── */}
<section className="container mx-auto mt-32 max-w-5xl px-6">
  <h2 className="text-4xl font-bold text-center">Choose your plan</h2>
  <p className="mx-auto mt-4 max-w-xl text-center text-gray-500">
    Flexible plans for every budget and learning style
  </p>

  <div className="mt-12 grid gap-8 lg:grid-cols-2">
    {/* ——— Free card ——— */}
    <PricingCard
      name="Free"
      price="0 $"
      rows={[
        ['Study-room limit', '2 h / day'],
        ['Matching & 21-day plan', '✔'],
        ['AI nudges / reminders', '✔'],
        ['Instant re-match', '—'],
      ]}
      highlight={false}
    />

    {/* ——— Unlimited card ——— */}
    <PricingCard
      name="Unlimited"
      price="9 $ / month"
      rows={[
        ['Study-room limit', 'No limit'],
        ['Matching & 21-day plan', '✔ (priority queue)'],
        ['AI nudges / reminders', '✔'],
        ['Instant re-match', '✔'],
      ]}
      highlight
      cta={{ href: '/signup', label: 'Start free trial' }}
    />
  </div>
</section>


      {/* ───────── Call-to-action ───────── */}
      <section className="mt-32 bg-green-50 py-28 text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Start your coding adventure
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">
          Ready to level up your coding skills? Sign up for free or begin a free
          trial and experience the power of collaborative learning firsthand.
          Let’s code together!
        </p>

        <Link
          href="/signup"
          className="mt-12 inline-block rounded-full bg-accent px-12 py-5 text-lg font-semibold text-gray-900 shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          Start your free trial
        </Link>
      </section>

      {/* ───────── Study with me ───────── */}
<section className="container mx-auto mt-8 pb-32 max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold">How it works</h2>
        <p className="mx-auto mt-4 max-w-3xl text-gray-500">
          Join the community, find a coding buddy, tackle a 21-day challenge
          together, and track your team progress. It&apos;s that simple.
        </p>

        <div className="mt-20 flex flex-col items-center gap-16 lg:flex-row lg:justify-between">
          <HowItWorksStep
            icon={ClipboardDocumentListIcon}
            label="Sign up & set your goals"
          />
          <ArrowLongRightIcon className="hidden h-8 w-8 lg:block" />
          <HowItWorksStep
            icon={UserGroupIcon}
            label="Find your coding buddy"
          />
          <ArrowLongRightIcon className="hidden h-8 w-8 lg:block" />
          <HowItWorksStep
            icon={ClockIcon}
            label="Join the challenge & track progress"
          />
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="mt-20 bg-green-50 py-28">
      <div className="container mx-auto max-w-4xl px-6">

        <h2 className="text-3xl font-bold text-center">
          Frequently asked questions
        </h2>

        <FAQ
          q="How does the matching system work?"
          a="We use a simple questionnaire (time-zone, language & goals) to pair you with a compatible partner automatically."
        />
        <FAQ
          q="What if I don’t get along with my coding buddy?"
          a="You can request a rematch at any time—no questions asked."
        />
        <FAQ
          q="What kind of tasks are in the challenges?"
          a="Daily micro-projects, quizzes and pair-programming prompts targeting real-world skills in Python, JavaScript & more."
        />
        <FAQ
          q="How do I get started?"
          a="Click “Find Your Coding Buddy” at the top of the page and you’ll be guided through the quick onboarding flow."
        />
        </div>
      </section>
    </>
  );
}

/* ---------- PricingCard (NEW) ---------- */
type CardRow = [label: string, value: React.ReactNode];

type PricingCardProps = {
  name: string;
  price: string;
  rows: CardRow[];
  highlight?: boolean;
  badge?: string;
  cta?: { href: string; label: string };
};

function PricingCard({
  name,
  price,
  rows,
  highlight = false,
  badge,
  cta,
}: PricingCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow ring-1 ring-gray-200 ${
        highlight ? 'ring-2 ring-accent' : ''
      }`}
    >
      <table className="w-full table-fixed text-sm lg:text-base">
        <thead>
          <tr className="bg-green-50">
            <th className="py-6 text-center font-semibold">
              {name}
              {badge && (
                <span className="ml-2 rounded bg-accent/20 px-2 py-1 text-xs font-medium text-accent">
                  {badge}
                </span>
              )}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map(([label, value]) => (
            <tr key={label}>
              <td className="py-5 px-6">
                <div className="flex items-start justify-between">
                  <span className="font-medium">{label}</span>
                  <span className="ml-4 text-right">{value}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-green-50 font-semibold">
            <td className="py-6 text-center">
              {price}
              {cta && (
                <div className="mt-4">
                  <Link
                    href={cta.href}
                    className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-gray-900 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    {cta.label}
                  </Link>
                </div>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
/* ───────── helpers ───────── */
function PlanRow({
  label,
  free,
  pro,
}: {
  label: string;
  free: React.ReactNode;
  pro: React.ReactNode;
}) {
  return (
    <tr>
      <td className="py-4 pl-4 font-medium">{label}</td>
      <td className="py-4 text-center">{free}</td>
      <td className="py-4 text-center">{pro}</td>
    </tr>
  );
}

type StepProps = {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
};
function HowItWorksStep({ icon: Icon, label }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="h-24 w-24 stroke-[1.5]" />
      <p className="mt-6 text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}

type FAQProps = { q: string; a: string };
function FAQ({ q, a }: FAQProps) {
  return (
    <details className="group border-b py-6">
      <summary className="flex cursor-pointer items-center justify-between text-lg">
        {q}
        <span className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-gray-500">{a}</p>
    </details>
  );
}
