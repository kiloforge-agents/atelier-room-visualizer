import Link from "next/link";

export function Nav({ active }: { active?: "home" | "catalog" | "visualize" | "story" }) {
  return (
    <header className="relative z-50">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-7 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Atelier home">
          <Mark />
          <div className="leading-none">
            <div className="font-display text-2xl tracking-tight">Atelier</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mt-1">
              Try-on for the home
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--ink-soft)]">
          <NavLink href="/" active={active === "home"}>
            Index
          </NavLink>
          <NavLink href="/catalog" active={active === "catalog"}>
            Catalog
          </NavLink>
          <NavLink href="/visualize" active={active === "visualize"}>
            Visualize
          </NavLink>
          <NavLink href="/#story" active={active === "story"}>
            Story
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/visualize"
            className="btn btn-primary text-sm"
          >
            Open camera
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative py-1 transition-colors ${active ? "text-[var(--ink)]" : "hover:text-[var(--ink)]"}`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--ink)]" />
      )}
    </Link>
  );
}

function Mark() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="19" cy="19" r="18" fill="#1a1714" />
      <path
        d="M11 26 L19 10 L27 26 M14.5 21 H23.5"
        stroke="#fbf7f0"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
