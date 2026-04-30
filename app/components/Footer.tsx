"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--line)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="font-display text-3xl leading-tight">
            Returns are an aesthetic <em>and</em> ecological problem.
          </div>
          <p className="text-[var(--ink-soft)] mt-4 max-w-md">
            Atelier exists so the chair you keep is the chair you chose. We hope your
            second-guessing happens here, not on a freight truck.
          </p>
        </div>
        <div className="md:col-span-2 md:col-start-7">
          <Heading>Visit</Heading>
          <ul className="mt-4 space-y-2 text-[var(--ink-soft)]">
            <li>
              <Link href="/catalog" className="hover:text-[var(--ink)]">
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/visualize" className="hover:text-[var(--ink)]">
                Visualize
              </Link>
            </li>
            <li>
              <Link href="/#story" className="hover:text-[var(--ink)]">
                Our story
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <Heading>Studio</Heading>
          <ul className="mt-4 space-y-2 text-[var(--ink-soft)]">
            <li>Press</li>
            <li>Trade</li>
            <li>Designers</li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <Heading>Letter</Heading>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">
            One short note each season — new pieces, a quiet essay, no marketing.
          </p>
          <form
            className="mt-4 flex items-center gap-2 border-b border-[var(--line)] pb-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@home.com"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-[var(--muted)]"
            />
            <button className="text-xs uppercase tracking-[0.2em] text-[var(--ink)] hover:text-[var(--accent-deep)]">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-3">
            <span className="font-mono">Atelier — MMXXV</span>
            <span className="hidden sm:inline">·</span>
            <span>Lisboa &middot; Brooklyn &middot; Mexico City</span>
          </div>
          <div className="flex items-center gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Press kit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
      {children}
    </div>
  );
}
