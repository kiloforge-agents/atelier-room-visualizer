# Atelier — See it in your space

A web-based AR try-on for considered furniture and decor. Open your camera, drop a curated piece into your live room, and decide before you ever pay for shipping.

Built as a Progressive Web App so a small team can ship cross-platform without an app store. The camera feed is processed entirely on-device — nothing is uploaded.

## Stack

- Next.js 16 (App Router) on Turbopack
- TypeScript, Tailwind v4
- Pure web platform AR (`getUserMedia` + DOM compositing) — no native runtime, no headset
- Editorial illustrations rendered as inline SVG (no external 3D assets)

## Routes

| Path                       | Purpose                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `/`                        | Landing page — hero, manifesto, featured pieces, story.                                |
| `/catalog`                 | Full curated catalog with category filtering.                                          |
| `/visualize`               | Live camera stage with drag/scale/rotate/flip/opacity tools and snapshot export.      |
| `/visualize?product=<id>` | Pre-loads the chosen piece into the stage.                                             |

## Try it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## What's notable

- **Demo room fallback** — if the camera is denied or unavailable, a synthetic room (sun rectangle, baseboard, faded horizon) lets you continue placing pieces.
- **Snapshot export** — the stage (webcam frame + placed SVGs with their transforms) is composited to a 2× PNG you can save and share.
- **Keyboard, mouse-wheel, and pointer interactions** — arrow keys nudge, `[` / `]` rotate, `+` / `-` scale, scroll-wheel scales the selected piece, drag for placement.
- **Twelve curated pieces** across seating, tables, lighting, decor, storage, and textiles — each rendered as a self-contained illustration with its own drop-shadow so it composites cleanly over the live frame.
