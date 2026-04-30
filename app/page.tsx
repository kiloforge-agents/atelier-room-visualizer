import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { FurnitureSVG } from "@/app/components/FurnitureSVG";
import { CATALOG } from "@/app/data/catalog";

const featured = ["luna-lounge", "halcyon-sofa", "monolith-table", "arc-luminaire"]
  .map((id) => CATALOG.find((p) => p.id === id))
  .filter(Boolean) as typeof CATALOG;

export default function HomePage() {
  return (
    <main>
      <Nav active="home" />

      {/* HERO */}
      <section className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="tag">
              <span className="dot" />
              Spring index — XII pieces
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.95] mt-6 tracking-tight">
              See it
              <br />
              in your <em className="text-[var(--accent-deep)]">room</em>
              <span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-[var(--ink-soft)] max-w-xl leading-relaxed">
              Atelier is a quiet, browser-based try-on for considered furniture and decor.
              Open your camera, drop a piece into the room, and decide before you ever pay
              for shipping — or restock fees.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/visualize" className="btn btn-primary">
                Open the camera
                <ArrowIcon />
              </Link>
              <Link href="/catalog" className="btn btn-ghost">
                Browse the catalog
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-[var(--muted)] uppercase tracking-[0.2em]">
              <span>No app · No login</span>
              <span>Camera stays on-device</span>
              <span>One-time purchases</span>
            </div>
          </div>

          {/* Hero stage */}
          <div className="lg:col-span-5 relative">
            <HeroStage />
          </div>
        </div>
      </section>

      {/* MARQUEE STAT BAR */}
      <section className="mt-24 border-y border-[var(--line)] bg-[var(--paper)]/60">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-10">
          <Stat n="71%" label="of returned furniture in the US is abandoned to landfill within 6 months." />
          <Stat n="40%" label="lower return rate when shoppers can preview pieces in their own space." />
          <Stat n="2.4×" label="average dwell time on product pages with an in-room try-on." />
          <Stat n="0¢" label="of camera data leaves your device — everything is local." />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-24" id="how">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <span className="tag">
              <span className="dot" />
              How it works
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mt-5 leading-tight">
              A camera, a room,
              <br />a moment of certainty.
            </h2>
            <p className="text-[var(--ink-soft)] mt-5 max-w-sm">
              No headset, no markers, no app store. We use the web platform as it is —
              a browser, your camera, and a roomful of patience.
            </p>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-3 gap-5">
            <Step
              n="01"
              title="Allow the camera"
              body="On any laptop, tablet, or phone with a recent browser. The feed is processed in the open tab — never uploaded."
            />
            <Step
              n="02"
              title="Drop a piece"
              body="Tap an item from the curated library. It lands in the live frame, ready to drag, scale, mirror, and rotate."
            />
            <Step
              n="03"
              title="Live with it"
              body="Walk away. Make tea. Save a snapshot for your partner. Buy only what survives the second look."
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="tag">
              <span className="dot" />
              In the index
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mt-4">
              A short list, a long second look.
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden md:inline-flex text-sm text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent-deep)]"
          >
            View all twelve →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p, idx) => (
            <FeaturedCard key={p.id} product={p} idx={idx} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="border-t border-[var(--line)] bg-[var(--paper)]/60"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="tag">
              <span className="dot" />
              Story
            </span>
            <h2 className="font-display text-4xl lg:text-6xl mt-5 leading-[0.98]">
              We started Atelier
              <br />
              after returning a sofa
              <br />
              <em>twice.</em>
            </h2>
          </div>
          <div className="md:col-span-7 text-[var(--ink-soft)] text-lg leading-relaxed space-y-5 max-w-2xl">
            <p>
              The first time, the proportions were wrong. The second time the tone of the
              boucle clashed with a rug we had quietly loved for nine years. Both pieces
              spent a week in our home and a year in a warehouse — eventually, a landfill.
            </p>
            <p>
              Atelier is our small attempt to slow the cycle. Twelve pieces, made by people
              we've shaken hands with, in places we've actually visited. A web-based try-on
              that won't ask you to install anything. A purchase, when it happens, that you
              can keep.
            </p>
            <p className="font-display italic text-[var(--ink)] text-2xl">
              — H. Lindqvist & M. Okafor
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-24">
        <div className="rounded-3xl bg-[var(--ink)] text-[var(--paper)] p-10 lg:p-16 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(800px 240px at 80% 0%, #c9a14a 0%, transparent 60%), radial-gradient(700px 260px at 0% 100%, #b96a3f 0%, transparent 60%)",
            }}
          />
          <div className="relative grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <h3 className="font-display text-4xl lg:text-6xl leading-[1.02]">
                The chair, in your living room,
                <br /> in <em>about ninety seconds.</em>
              </h3>
              <p className="mt-5 text-white/70 max-w-xl">
                Open the camera, drop a piece, see it where it would actually live. No
                account. No app. No reason to wait.
              </p>
            </div>
            <div className="md:col-span-5 flex md:justify-end gap-3">
              <Link
                href="/visualize"
                className="btn bg-[var(--paper)] text-[var(--ink)] hover:bg-white"
              >
                Open the camera
                <ArrowIcon />
              </Link>
              <Link
                href="/catalog"
                className="btn btn-ghost border-white/40 text-white hover:border-white"
              >
                Browse first
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="font-display text-5xl lg:text-6xl leading-none">{n}</div>
      <div className="text-xs text-[var(--ink-soft)] max-w-[16ch] mt-2">{label}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--ink)] transition-colors">
      <div className="font-mono text-xs tracking-[0.2em] text-[var(--accent-deep)]">
        {n}
      </div>
      <div className="font-display text-2xl mt-2">{title}</div>
      <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

function FeaturedCard({
  product,
  idx,
}: {
  product: (typeof CATALOG)[number];
  idx: number;
}) {
  const tilts = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];
  return (
    <Link
      href={`/visualize?product=${product.id}`}
      className="group block relative bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-4 hover:border-[var(--ink)] transition-colors"
    >
      <div className="aspect-[4/5] bg-[var(--bg-2)] rounded-xl flex items-end justify-center overflow-hidden relative">
        <div className={`w-[88%] max-h-[88%] floaty ${tilts[idx % tilts.length]} transition-transform duration-500 group-hover:scale-105`}>
          <FurnitureSVG art={product.art} className="w-full h-full" />
        </div>
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          № {String(idx + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          {product.category}
        </span>
      </div>
      <div className="pt-4 px-1 flex items-end justify-between gap-3">
        <div>
          <div className="font-display text-xl leading-tight">{product.name}</div>
          <div className="text-xs text-[var(--muted)] mt-0.5">
            {product.designer} · {product.year}
          </div>
        </div>
        <div className="text-sm font-mono">${product.price.toLocaleString()}</div>
      </div>
      <div className="px-1 pt-3 mt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-soft)]">
        <span>Place in your room →</span>
        <span className="flex items-center gap-1">
          {product.swatches.slice(0, 3).map((s) => (
            <span
              key={s}
              className="w-3 h-3 rounded-full border border-black/10"
              style={{ background: s }}
            />
          ))}
        </span>
      </div>
    </Link>
  );
}

function HeroStage() {
  // A static composition of three pieces inside a "phone frame", suggesting AR.
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-[var(--line)] bg-gradient-to-b from-[#efe7dc] via-[#d8cdbd] to-[#a89a82] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]">
        {/* horizon */}
        <div className="absolute inset-x-0 top-[55%] h-px bg-black/10" />
        {/* sun rectangle */}
        <div
          className="absolute"
          style={{
            left: "12%",
            top: "10%",
            width: "32%",
            height: "22%",
            background: "rgba(251,244,226,0.65)",
          }}
        />
        {/* shadow strip */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/15 to-transparent" />

        {/* furniture */}
        <div className="absolute" style={{ left: "8%", bottom: "8%", width: "44%" }}>
          <div className="cast-shadow">
            <FurnitureSVG art="lounge-chair" className="w-full h-auto" />
          </div>
        </div>
        <div className="absolute" style={{ left: "48%", bottom: "10%", width: "30%" }}>
          <div className="cast-shadow">
            <FurnitureSVG art="side-table" className="w-full h-auto" />
          </div>
        </div>
        <div className="absolute" style={{ right: "6%", top: "18%", width: "22%" }}>
          <div className="cast-shadow">
            <FurnitureSVG art="ceramic-vase" className="w-full h-auto" />
          </div>
        </div>

        {/* AR HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]">
          <span className="glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <span className="dot" /> Live · 24fps
          </span>
          <span className="glass rounded-full px-2.5 py-1 font-mono">
            12.4 m²
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-[11px]">
          <span className="glass rounded-full px-3 py-1.5">Luna Lounge · 76% scale</span>
          <span className="glass rounded-full px-3 py-1.5">Drag · Rotate · Save</span>
        </div>

        {/* corner registration marks */}
        <Marks />
      </div>

      {/* Floating reviews */}
      <div className="hidden lg:block absolute -left-6 top-12 glass rounded-2xl p-3 max-w-[210px] shadow-lg rotate-[-4deg]">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Beta tester · Maya, NYC
        </div>
        <p className="text-sm mt-1 leading-snug">
          “I returned three sofas last year. Atelier saved me from buying a fourth.”
        </p>
      </div>
      <div className="hidden lg:block absolute -right-6 bottom-16 glass rounded-2xl p-3 max-w-[210px] shadow-lg rotate-[3deg]">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Beta tester · Jonas, Berlin
        </div>
        <p className="text-sm mt-1 leading-snug">
          “First AR thing that felt like a tool, not a stunt.”
        </p>
      </div>
    </div>
  );
}

function Marks() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 125"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g stroke="rgba(26,23,20,0.7)" strokeWidth="0.4" fill="none">
        <path d="M2 6 V2 H6" />
        <path d="M94 2 H98 V6" />
        <path d="M2 119 V123 H6" />
        <path d="M94 123 H98 V119" />
      </g>
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
