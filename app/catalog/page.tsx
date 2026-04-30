import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { FurnitureSVG } from "@/app/components/FurnitureSVG";
import { CATALOG, CATEGORIES } from "@/app/data/catalog";

export const metadata = {
  title: "Catalog — Atelier",
};

export default async function CatalogPage(props: PageProps<"/catalog">) {
  const sp = (await props.searchParams) as { c?: string | string[] };
  const raw = Array.isArray(sp.c) ? sp.c[0] : sp.c;
  const cat = CATEGORIES.find((c) => c === raw);
  const items = cat ? CATALOG.filter((p) => p.category === cat) : CATALOG;

  return (
    <main>
      <Nav active="catalog" />

      {/* Header */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20">
        <span className="tag">
          <span className="dot" />
          Spring index — XII pieces
        </span>
        <h1 className="font-display text-5xl sm:text-7xl mt-5 leading-[0.95]">
          The Catalog<span className="text-[var(--accent)]">.</span>
        </h1>
        <p className="text-[var(--ink-soft)] mt-5 max-w-2xl">
          A small, finite library of pieces from the studios we trust. Tap any item to
          place it in your live room — no account, no app.
        </p>

        <nav className="mt-10 flex flex-wrap gap-2 border-t border-[var(--line)] pt-6">
          <Chip href="/catalog" active={!cat}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c} href={`/catalog?c=${encodeURIComponent(c)}`} active={cat === c}>
              {c}
            </Chip>
          ))}
        </nav>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, idx) => (
          <Link
            key={p.id}
            href={`/visualize?product=${p.id}`}
            className="group block bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)] rounded-2xl p-5 transition-colors"
          >
            <div className="aspect-[4/5] bg-[var(--bg-2)] rounded-xl flex items-end justify-center overflow-hidden relative">
              <div className="w-[88%] max-h-[88%] transition-transform duration-500 group-hover:scale-105">
                <FurnitureSVG art={p.art} className="w-full h-full" />
              </div>
              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-soft)]">
                № {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                {p.category}
              </span>
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="glass text-[10px] uppercase tracking-[0.2em] rounded-full px-2.5 py-1">
                  Place in room →
                </span>
                <span className="flex items-center gap-1">
                  {p.swatches.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ background: s }}
                    />
                  ))}
                </span>
              </span>
            </div>
            <div className="pt-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="font-display text-2xl leading-tight">{p.name}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">
                    {p.designer} · {p.year}
                  </div>
                </div>
                <div className="text-base font-mono">${p.price.toLocaleString()}</div>
              </div>
              <p className="text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
                {p.blurb}
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-2 text-[11px] text-[var(--muted)]">
                <div>
                  <div className="uppercase tracking-[0.18em]">Materials</div>
                  <div className="text-[var(--ink-soft)] mt-1">
                    {p.materials.slice(0, 2).join(", ")}
                  </div>
                </div>
                <div>
                  <div className="uppercase tracking-[0.18em]">Origin</div>
                  <div className="text-[var(--ink-soft)] mt-1">{p.origin}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  );
}

function Chip({
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
      className={`text-[11px] uppercase tracking-[0.2em] rounded-full px-3 py-1.5 border transition-colors ${
        active
          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
          : "bg-transparent text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)]"
      }`}
    >
      {children}
    </Link>
  );
}
