import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ARCanvas } from "@/app/components/ARCanvas";
import { findProduct } from "@/app/data/catalog";

export const metadata = {
  title: "Visualize — Atelier",
  description:
    "Place curated furniture in your live room with your camera, before you ever pay.",
};

export default async function VisualizePage(props: PageProps<"/visualize">) {
  const sp = (await props.searchParams) as { product?: string | string[] };
  const raw = Array.isArray(sp.product) ? sp.product[0] : sp.product;
  const initial = raw ? findProduct(raw) : undefined;

  return (
    <main>
      <Nav active="visualize" />

      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-10 lg:pt-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <span className="tag">
              <span className="dot" />
              Visualize
            </span>
            <h1 className="font-display text-5xl sm:text-6xl mt-4 leading-[0.96]">
              Your camera, your room,
              <br />
              <em>any of these twelve.</em>
            </h1>
            <p className="text-[var(--ink-soft)] mt-4">
              Click <em>Allow camera</em> for the live view, or stay in the demo room to
              get the feel of placement first. Drag to position, use the sliders to
              scale, rotate, and tune opacity until the proportions feel right.
              {initial ? (
                <>
                  {" "}
                  Started you off with{" "}
                  <span className="font-medium text-[var(--ink)]">{initial.name}</span>.
                </>
              ) : null}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs text-[var(--ink-soft)]">
            <div className="font-mono uppercase tracking-[0.22em]">
              Local · No upload
            </div>
            <Link
              href="/catalog"
              className="underline underline-offset-4 hover:text-[var(--ink)]"
            >
              Open the full catalog →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-8">
        <ARCanvas initialProductId={initial?.id} />
      </section>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-20 grid md:grid-cols-3 gap-6">
        <Tip
          n="01"
          title="Stand back, then place"
          body="Step a few feet back from where the piece would actually live. You'll get a more honest sense of its scale."
        />
        <Tip
          n="02"
          title="Mind your horizon"
          body="Put a piece on the floor first — drag it to where the wall meets the floor, then scale outward."
        />
        <Tip
          n="03"
          title="Save and sleep on it"
          body="Capture a snapshot. The pieces that feel right tomorrow are the ones to bring home."
        />
      </section>

      <Footer />
    </main>
  );
}

function Tip({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-6">
      <div className="font-mono text-xs tracking-[0.2em] text-[var(--accent-deep)]">
        {n}
      </div>
      <div className="font-display text-2xl mt-2">{title}</div>
      <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
