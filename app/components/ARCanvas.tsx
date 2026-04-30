"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATALOG, CATEGORIES, type Product } from "@/app/data/catalog";
import { FurnitureSVG } from "@/app/components/FurnitureSVG";

type Placed = {
  uid: string;
  productId: string;
  /** center-x in canvas px */
  x: number;
  /** center-y in canvas px */
  y: number;
  scale: number;
  rotation: number;
  flipped: boolean;
  opacity: number;
};

type CamState = "idle" | "requesting" | "live" | "denied" | "error" | "demo";

type DragState = {
  uid: string;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
};

const DEMO_BG =
  "linear-gradient(135deg, #efe7dc 0%, #d8cdbd 35%, #cbb697 70%, #a89a82 100%)";

export function ARCanvas({ initialProductId }: { initialProductId?: string }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camState, setCamState] = useState<CamState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [placed, setPlaced] = useState<Placed[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<Product["category"] | "All">("All");
  const [grid, setGrid] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  const stageRect = useRef<{ w: number; h: number }>({ w: 1, h: 1 });
  const dragRef = useRef<DragState | null>(null);

  // Derived
  const filtered = useMemo(
    () =>
      activeCat === "All"
        ? CATALOG
        : CATALOG.filter((p) => p.category === activeCat),
    [activeCat]
  );

  const selectedItem = useMemo(
    () => placed.find((p) => p.uid === selected) ?? null,
    [placed, selected]
  );

  const selectedProduct = selectedItem
    ? CATALOG.find((p) => p.id === selectedItem.productId)
    : null;

  // ====== camera ======
  const startCamera = useCallback(async () => {
    setErrorMsg(null);
    setCamState("requesting");
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setCamState("error");
        setErrorMsg("Your browser doesn't support webcam access.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });
      streamRef.current = stream;
      const v = videoRef.current;
      if (v) {
        v.srcObject = stream;
        await v.play().catch(() => {});
      }
      setCamState("live");
    } catch (e: unknown) {
      const err = e as DOMException;
      if (err && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
        setCamState("denied");
        setErrorMsg(
          "Camera permission was declined. You can still try the demo room below."
        );
      } else {
        setCamState("error");
        setErrorMsg(
          err?.message || "We couldn't reach your camera. Try the demo room instead."
        );
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamState("idle");
  }, []);

  const useDemo = useCallback(() => {
    stopCamera();
    setCamState("demo");
  }, [stopCamera]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ====== stage measurement ======
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const ent of entries) {
        const r = ent.contentRect;
        stageRect.current = { w: r.width, h: r.height };
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ====== add / mutate / remove ======
  const addProduct = useCallback((p: Product) => {
    const w = stageRect.current.w;
    const h = stageRect.current.h;
    setPlaced((prev) => {
      const item: Placed = {
        uid: `${p.id}-${Date.now().toString(36)}-${Math.floor(Math.random() * 999)}`,
        productId: p.id,
        x: w / 2 + (Math.random() - 0.5) * 60,
        y: h * 0.7 + (Math.random() - 0.5) * 30,
        scale: Math.min(1, (w * 0.55) / Math.max(p.width, p.height)),
        rotation: 0,
        flipped: false,
        opacity: 1,
      };
      setSelected(item.uid);
      setShowHelp(false);
      return [...prev, item];
    });
    if (camState === "idle") setCamState("demo");
  }, [camState]);

  const updateSelected = useCallback(
    (patch: Partial<Placed>) => {
      if (!selected) return;
      setPlaced((prev) =>
        prev.map((p) => (p.uid === selected ? { ...p, ...patch } : p))
      );
    },
    [selected]
  );

  const removeSelected = useCallback(() => {
    if (!selected) return;
    setPlaced((prev) => prev.filter((p) => p.uid !== selected));
    setSelected(null);
  }, [selected]);

  const duplicateSelected = useCallback(() => {
    if (!selectedItem) return;
    setPlaced((prev) => [
      ...prev,
      {
        ...selectedItem,
        uid: `${selectedItem.productId}-${Date.now().toString(36)}-${Math.floor(
          Math.random() * 999
        )}`,
        x: selectedItem.x + 28,
        y: selectedItem.y + 18,
      },
    ]);
  }, [selectedItem]);

  const clearAll = useCallback(() => {
    setPlaced([]);
    setSelected(null);
  }, []);

  // ====== drag ======
  const onItemPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, item: Placed) => {
      e.stopPropagation();
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setSelected(item.uid);
      dragRef.current = {
        uid: item.uid,
        startX: e.clientX,
        startY: e.clientY,
        origX: item.x,
        origY: item.y,
      };
    },
    []
  );

  const onItemPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      setPlaced((prev) =>
        prev.map((p) =>
          p.uid === d.uid
            ? {
                ...p,
                x: clamp(d.origX + dx, 20, stageRect.current.w - 20),
                y: clamp(d.origY + dy, 20, stageRect.current.h - 20),
              }
            : p
        )
      );
    },
    []
  );

  const onItemPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      dragRef.current = null;
    },
    []
  );

  // ====== wheel-to-scale (when an item is selected) ======
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      if (!selected) return;
      // Only intercept if the cursor is over the stage area
      const target = e.target as HTMLElement;
      if (!stage.contains(target)) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.06 : 1 / 1.06;
      setPlaced((prev) =>
        prev.map((p) =>
          p.uid === selected
            ? { ...p, scale: clamp(p.scale * factor, 0.15, 3.5) }
            : p
        )
      );
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [selected]);

  // ====== keyboard ======
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      const item = placed.find((p) => p.uid === selected);
      if (!item) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeSelected();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateSelected({ y: item.y - (e.shiftKey ? 20 : 4) });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        updateSelected({ y: item.y + (e.shiftKey ? 20 : 4) });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        updateSelected({ x: item.x - (e.shiftKey ? 20 : 4) });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        updateSelected({ x: item.x + (e.shiftKey ? 20 : 4) });
      } else if (e.key === "[") {
        updateSelected({ rotation: item.rotation - 5 });
      } else if (e.key === "]") {
        updateSelected({ rotation: item.rotation + 5 });
      } else if (e.key === "+" || e.key === "=") {
        updateSelected({ scale: clamp(item.scale * 1.06, 0.15, 3.5) });
      } else if (e.key === "-") {
        updateSelected({ scale: clamp(item.scale / 1.06, 0.15, 3.5) });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, placed, removeSelected, updateSelected]);

  // ====== boot from initial product ======
  useEffect(() => {
    if (!initialProductId) return;
    const p = CATALOG.find((x) => x.id === initialProductId);
    if (!p) return;
    // give the stage a tick to measure
    const t = setTimeout(() => addProduct(p), 60);
    return () => clearTimeout(t);
  }, [initialProductId, addProduct]);

  // ====== capture snapshot ======
  const captureSnapshot = useCallback(async () => {
    const stage = stageRef.current;
    if (!stage) return;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    const canvas = document.createElement("canvas");
    canvas.width = W * 2;
    canvas.height = H * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(2, 2);

    // background — webcam frame OR demo gradient
    const v = videoRef.current;
    if (camState === "live" && v && v.readyState >= 2) {
      // cover-fit
      const vw = v.videoWidth;
      const vh = v.videoHeight;
      const stageRatio = W / H;
      const videoRatio = vw / vh;
      let sx = 0,
        sy = 0,
        sw = vw,
        sh = vh;
      if (videoRatio > stageRatio) {
        sw = vh * stageRatio;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / stageRatio;
        sy = (vh - sh) / 2;
      }
      ctx.drawImage(v, sx, sy, sw, sh, 0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#efe7dc");
      g.addColorStop(0.4, "#d8cdbd");
      g.addColorStop(1, "#a89a82");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      // mock floor line
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.55);
      ctx.lineTo(W, H * 0.55);
      ctx.stroke();
    }

    // Render each placed SVG as image
    for (const item of placed) {
      const product = CATALOG.find((p) => p.id === item.productId);
      if (!product) continue;
      const node = stage.querySelector<HTMLElement>(
        `[data-uid="${item.uid}"] svg`
      );
      if (!node) continue;
      const xml = new XMLSerializer().serializeToString(node);
      const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      try {
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const im = new Image();
          im.onload = () => res(im);
          im.onerror = rej;
          im.src = url;
        });
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.scale(item.flipped ? -item.scale : item.scale, item.scale);
        ctx.globalAlpha = item.opacity;
        ctx.drawImage(img, -product.width / 2, -product.height / 2, product.width, product.height);
        ctx.restore();
      } finally {
        URL.revokeObjectURL(url);
      }
    }

    // watermark
    ctx.fillStyle = "rgba(26,23,20,0.65)";
    ctx.font = "italic 14px serif";
    ctx.fillText("Atelier — placed in your room", 18, H - 16);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `atelier-room-${Date.now()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    }, "image/png");
  }, [camState, placed]);

  // ====== UI ======
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-4">
        <Stage
          stageRef={stageRef}
          camState={camState}
          videoRef={videoRef}
          startCamera={startCamera}
          useDemo={useDemo}
          stopCamera={stopCamera}
          errorMsg={errorMsg}
          grid={grid}
          showHelp={showHelp && placed.length === 0}
          onDeselect={() => setSelected(null)}
        >
          {placed.map((item) => {
            const product = CATALOG.find((p) => p.id === item.productId);
            if (!product) return null;
            const isSelected = item.uid === selected;
            return (
              <PlacedItem
                key={item.uid}
                item={item}
                product={product}
                selected={isSelected}
                onPointerDown={(e) => onItemPointerDown(e, item)}
                onPointerMove={onItemPointerMove}
                onPointerUp={onItemPointerUp}
                onPointerCancel={onItemPointerUp}
              />
            );
          })}
        </Stage>

        {/* Bottom toolbar */}
        <div className="glass rounded-2xl p-3 flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              className="btn btn-ghost text-sm py-2 px-3"
              onClick={camState === "live" ? stopCamera : startCamera}
              aria-pressed={camState === "live"}
            >
              <CameraIcon active={camState === "live"} />
              {camState === "live" ? "Stop camera" : "Start camera"}
            </button>
            <button
              className={`btn text-sm py-2 px-3 ${camState === "demo" ? "btn-primary" : "btn-ghost"}`}
              onClick={useDemo}
            >
              <RoomIcon />
              Demo room
            </button>
            <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[var(--muted)] ml-2">
              <span className={`dot ${camState === "live" ? "" : "opacity-30"}`} />
              {camState === "live"
                ? "Live feed"
                : camState === "demo"
                  ? "Demo room"
                  : camState === "denied"
                    ? "Camera denied"
                    : camState === "requesting"
                      ? "Asking…"
                      : "Camera off"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost text-sm py-2 px-3"
              onClick={() => setGrid((g) => !g)}
              aria-pressed={grid}
            >
              <GridIcon />
              Grid
            </button>
            <button
              className="btn btn-ghost text-sm py-2 px-3"
              onClick={clearAll}
              disabled={placed.length === 0}
            >
              <TrashIcon />
              Clear
            </button>
            <button className="btn btn-primary text-sm py-2 px-3" onClick={captureSnapshot}>
              <DownloadIcon />
              Save snapshot
            </button>
          </div>
        </div>

        {/* Selected toolbar */}
        {selectedItem && selectedProduct && (
          <SelectedTools
            item={selectedItem}
            product={selectedProduct}
            update={updateSelected}
            duplicate={duplicateSelected}
            remove={removeSelected}
          />
        )}
      </div>

      {/* Side panel: catalog */}
      <aside className="lg:max-h-[860px] flex flex-col gap-3">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Library
              </div>
              <div className="font-display text-xl">Drop pieces into your room</div>
            </div>
            <Link
              href="/catalog"
              className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] underline underline-offset-4"
            >
              View catalog
            </Link>
          </div>
          <div className="mt-3 -mx-1 flex flex-wrap gap-1.5">
            <ChipBtn
              active={activeCat === "All"}
              onClick={() => setActiveCat("All")}
            >
              All
            </ChipBtn>
            {CATEGORIES.map((c) => (
              <ChipBtn
                key={c}
                active={activeCat === c}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </ChipBtn>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-3 overflow-y-auto flex-1">
          <ul className="grid grid-cols-2 gap-2.5">
            {filtered.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => addProduct(p)}
                  className="group block w-full text-left rounded-xl bg-[var(--paper)] hover:bg-white border border-[var(--line)] hover:border-[var(--ink)] transition-all p-2"
                >
                  <div className="aspect-square rounded-lg bg-[var(--bg-2)] flex items-end justify-center overflow-hidden">
                    <FurnitureSVG
                      art={p.art}
                      className="w-[88%] max-h-[88%] transition-transform group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-1 pt-2 pb-0.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {p.category}
                    </div>
                    <div className="text-sm leading-tight mt-0.5">{p.name}</div>
                    <div className="text-xs text-[var(--ink-soft)] mt-0.5">
                      ${p.price.toLocaleString()}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Stage({
  stageRef,
  camState,
  videoRef,
  startCamera,
  useDemo,
  stopCamera,
  errorMsg,
  grid,
  showHelp,
  onDeselect,
  children,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>;
  camState: CamState;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  startCamera: () => void;
  useDemo: () => void;
  stopCamera: () => void;
  errorMsg: string | null;
  grid: boolean;
  showHelp: boolean;
  onDeselect: () => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div
      ref={stageRef}
      onPointerDown={(e) => {
        // Only deselect if clicked on stage itself, not a child item
        if (e.target === e.currentTarget) onDeselect();
      }}
      className="relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--bg-2)] border border-[var(--line)] no-select"
      aria-label="Augmented reality stage"
      role="region"
    >
      {/* Demo backdrop */}
      {camState !== "live" && (
        <div
          className="absolute inset-0"
          style={{ background: DEMO_BG }}
          aria-hidden
        >
          <div className="absolute inset-0">
            <div className="absolute left-0 right-0 top-[55%] h-px bg-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#a89a82]/55 to-transparent" />
            <Wall />
          </div>
        </div>
      )}

      {/* Webcam */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          camState === "live" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Optional perspective grid */}
      {grid && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
        >
          <g stroke="rgba(0,0,0,0.18)" strokeWidth="0.1">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`h${i}`} x1="0" x2="100" y1={(i * 60) / 13} y2={(i * 60) / 13} />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v${i}`} y1="0" y2="60" x1={(i * 100) / 13} x2={(i * 100) / 13} />
            ))}
          </g>
          <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.05">
            {Array.from({ length: 8 }).map((_, i) => {
              const x = 50;
              const y = 35;
              const r = 6 + i * 6;
              return (
                <line key={`p${i}`} x1={x - r} x2={x + r} y1={y + r * 0.6} y2={y + r * 0.6} />
              );
            })}
          </g>
        </svg>
      )}

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.35)",
        }}
      />

      {children}

      {/* Help overlay */}
      {showHelp && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="glass rounded-2xl px-6 py-5 text-center max-w-md mx-4">
            <div className="font-display italic text-2xl">Place a piece</div>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Tap any item from the library to drop it here. Drag to position, pinch or
              scroll to scale, [ ] to rotate.
            </p>
          </div>
        </div>
      )}

      {/* Camera permission hint */}
      {camState === "idle" && (
        <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-auto flex flex-wrap gap-2">
          <button onClick={startCamera} className="btn btn-primary text-xs py-2 px-3">
            <CameraIcon /> Allow camera
          </button>
          <button onClick={useDemo} className="btn btn-ghost text-xs py-2 px-3 bg-white/60">
            Use demo room
          </button>
        </div>
      )}

      {(camState === "denied" || camState === "error") && errorMsg && (
        <div className="absolute top-3 left-3 right-3 glass rounded-xl p-3 text-sm flex items-start gap-3">
          <span className="text-[var(--accent-deep)]">●</span>
          <div className="flex-1">
            <div className="font-medium">{errorMsg}</div>
            <div className="mt-1 flex gap-2">
              <button onClick={startCamera} className="btn btn-ghost text-xs py-1.5 px-2.5">
                Try again
              </button>
              <button onClick={useDemo} className="btn btn-primary text-xs py-1.5 px-2.5">
                Use demo room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live indicator */}
      {camState === "live" && (
        <div className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-[11px] flex items-center gap-2">
          <span className="dot" />
          Live · {id.slice(-6)}
          <button onClick={stopCamera} className="ml-1 underline underline-offset-2 text-[var(--ink-soft)] hover:text-[var(--ink)]">
            stop
          </button>
        </div>
      )}
    </div>
  );
}

function Wall() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="wallG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#efe7dc" />
          <stop offset="1" stopColor="#d3c5ad" />
        </linearGradient>
      </defs>
      <rect width="100" height="33" fill="url(#wallG)" />
      <line x1="0" x2="100" y1="33" y2="33" stroke="rgba(0,0,0,0.12)" strokeWidth="0.12" />
      {/* baseboard */}
      <rect x="0" y="32" width="100" height="1.5" fill="rgba(0,0,0,0.06)" />
      {/* sun rectangle */}
      <rect x="14" y="6" width="22" height="14" fill="#fbf4e2" opacity="0.55" />
      <rect x="14" y="6" width="22" height="14" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.1" />
    </svg>
  );
}

function PlacedItem({
  item,
  product,
  selected,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  item: Placed;
  product: Product;
  selected: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      data-uid={item.uid}
      className={`absolute no-select cursor-grab ${selected ? "z-30" : "z-20"} ${
        selected ? "" : "cursor-grab"
      }`}
      style={{
        left: item.x,
        top: item.y,
        width: product.width,
        height: product.height,
        marginLeft: -product.width / 2,
        marginTop: -product.height / 2,
        transform: `rotate(${item.rotation}deg) scale(${item.flipped ? -item.scale : item.scale}, ${item.scale})`,
        transformOrigin: "center",
        opacity: item.opacity,
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="cast-shadow w-full h-full">
        <FurnitureSVG art={product.art} className="w-full h-full" />
      </div>
      {selected && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              inset: -8,
              border: "1px dashed rgba(26,23,20,0.7)",
              borderRadius: 4,
            }}
          />
          {/* corner handles */}
          <div className="handle" style={{ left: -10, top: -10 }} />
          <div className="handle" style={{ right: -10, top: -10 }} />
          <div className="handle" style={{ left: -10, bottom: -10 }} />
          <div className="handle" style={{ right: -10, bottom: -10 }} />
        </>
      )}
    </div>
  );
}

function SelectedTools({
  item,
  product,
  update,
  duplicate,
  remove,
}: {
  item: Placed;
  product: Product;
  update: (patch: Partial<Placed>) => void;
  duplicate: () => void;
  remove: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Selected · {product.designer}
          </div>
          <div className="font-display text-xl leading-tight">{product.name}</div>
          <div className="text-xs text-[var(--ink-soft)]">
            {product.dimensions} · ${product.price.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="btn btn-ghost text-xs py-1.5 px-2.5"
            onClick={() => update({ flipped: !item.flipped })}
            aria-pressed={item.flipped}
            title="Mirror"
          >
            <FlipIcon /> Flip
          </button>
          <button
            className="btn btn-ghost text-xs py-1.5 px-2.5"
            onClick={duplicate}
            title="Duplicate"
          >
            <DuplicateIcon /> Duplicate
          </button>
          <button
            className="btn btn-ghost text-xs py-1.5 px-2.5"
            onClick={remove}
            title="Remove"
          >
            <TrashIcon /> Remove
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Slider
          label="Scale"
          value={item.scale}
          min={0.15}
          max={3.5}
          step={0.01}
          onChange={(v) => update({ scale: v })}
          format={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <Slider
          label="Rotation"
          value={item.rotation}
          min={-180}
          max={180}
          step={1}
          onChange={(v) => update({ rotation: v })}
          format={(v) => `${v.toFixed(0)}°`}
        />
        <Slider
          label="Opacity"
          value={item.opacity}
          min={0.2}
          max={1}
          step={0.01}
          onChange={(v) => update({ opacity: v })}
          format={(v) => `${(v * 100).toFixed(0)}%`}
        />
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Tip: arrow keys nudge ·{" "}
        <kbd className="font-mono px-1 py-0.5 rounded bg-[var(--bg-2)] border border-[var(--line)]">
          [
        </kbd>
        /
        <kbd className="font-mono px-1 py-0.5 rounded bg-[var(--bg-2)] border border-[var(--line)]">
          ]
        </kbd>{" "}
        rotate · <kbd className="font-mono px-1 py-0.5 rounded bg-[var(--bg-2)] border border-[var(--line)]">+</kbd>/
        <kbd className="font-mono px-1 py-0.5 rounded bg-[var(--bg-2)] border border-[var(--line)]">-</kbd>{" "}
        scale.
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-[var(--ink-soft)]">
        <span>{label}</span>
        <span className="font-mono">{format(value)}</span>
      </div>
      <input
        className="slim w-full mt-2"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

function ChipBtn({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] uppercase tracking-[0.16em] rounded-full px-3 py-1.5 border transition-colors ${
        active
          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
          : "bg-transparent text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)]"
      }`}
    >
      {children}
    </button>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* Inline icons */
function CameraIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 5.5C2 4.67 2.67 4 3.5 4H5l1-1.5h4L11 4h1.5C13.33 4 14 4.67 14 5.5v6c0 .83-.67 1.5-1.5 1.5h-9C2.67 13 2 12.33 2 11.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="8" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      {active && <circle cx="8" cy="8.5" r="1" fill="currentColor" />}
    </svg>
  );
}
function RoomIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M2 6 L8 2 L14 6 V13 H2 Z M6 13 V9 H10 V13"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <rect x="2" y="2" width="12" height="12" stroke="currentColor" fill="none" strokeWidth="1.1" />
      <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.1" />
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 4h10M6 4V2.5h4V4M5 4l1 9h4l1-9"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M8 2V11M4 8L8 12L12 8M3 14H13"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function FlipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 4l3 4-3 4M13 4l-3 4 3 4M8 2v12"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="0.5 1.5"
      />
    </svg>
  );
}
function DuplicateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="6" y="6" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
