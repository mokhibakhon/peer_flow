import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Peer Flow',
  description: 'Find a coding buddy & conquer the 21-day AI challenge together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + ' min-h-screen flex flex-col'}>
        {/* ───── Navigation / header ───── */}
        <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-gray-200">
          <div className="mx-auto max-w-screen-xl grid grid-cols-3 items-center px-6 lg:px-8 py-5">
            {/* ── Left nav (learning links) ── */}
            <nav className="flex gap-6 text-sm font-medium">
              <a
                href="#how-it-works"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                How it works
              </a>

              <Link
                href="/find-a-peer"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                Find a Peer
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                21-Day Streak
              </Link>
            </nav>

            {/* ── Centre logo ── */}
            <Link
              href="/"
              className="justify-self-center font-semibold text-lg lg:text-xl"
            >
              Peer Flow
            </Link>

       {/* ── Right nav (auth links) ── */}
<div className="justify-self-end flex items-center gap-4 text-sm font-medium">
  <Link
    href="/login"
    className="py-2 hover:text-primary
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="rounded-md bg-accent px-4 py-2 text-gray-900 hover:opacity-90
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
  >
    Sign up
  </Link>
</div>

          </div>
        </header>

        {/* ───── Page content ───── */}
        <main className="flex-1">{children}</main>

      </body>
    </html>
  );
}
