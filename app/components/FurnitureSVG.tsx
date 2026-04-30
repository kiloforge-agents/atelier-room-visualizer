import type { ArtKey } from "@/app/data/catalog";

type Props = {
  art: ArtKey;
  className?: string;
  /** Render with internal drop-shadow (for AR overlay) */
  shadow?: boolean;
};

/**
 * Editorial illustrations of each catalog piece.
 * Drawn on a 200×200 viewBox unless otherwise noted, with transparent
 * backgrounds and self-contained shadows so they composite cleanly on top
 * of the webcam feed.
 */
export function FurnitureSVG({ art, className, shadow = false }: Props) {
  const filterId = `f-${art}`;
  const shadowFilter = shadow ? `url(#${filterId})` : undefined;

  switch (art) {
    case "lounge-chair":
      return (
        <svg
          className={className}
          viewBox="0 0 220 240"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="leather" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#a45a30" />
              <stop offset="1" stopColor="#6e3a1d" />
            </linearGradient>
            <linearGradient id="wood1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#9a6c40" />
              <stop offset="1" stopColor="#5b3a22" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* back legs */}
            <path d="M52 200 L70 70" stroke="url(#wood1)" strokeWidth="6" strokeLinecap="round" />
            <path d="M168 200 L150 70" stroke="url(#wood1)" strokeWidth="6" strokeLinecap="round" />
            {/* seat cushion */}
            <path
              d="M40 150 Q40 120 70 118 L150 118 Q180 120 180 150 L180 175 Q180 188 168 188 L52 188 Q40 188 40 175 Z"
              fill="url(#leather)"
            />
            {/* seam */}
            <path
              d="M48 148 Q48 126 72 124 L148 124 Q172 126 172 148"
              fill="none"
              stroke="#3a2b21"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            {/* back */}
            <path
              d="M62 130 Q60 60 110 50 Q160 60 158 130 Z"
              fill="url(#leather)"
            />
            <path
              d="M70 122 Q72 70 110 62 Q148 70 150 122"
              fill="none"
              stroke="#3a2b21"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            {/* front legs */}
            <path d="M55 188 L48 220" stroke="url(#wood1)" strokeWidth="7" strokeLinecap="round" />
            <path d="M165 188 L172 220" stroke="url(#wood1)" strokeWidth="7" strokeLinecap="round" />
            {/* arm */}
            <path
              d="M40 152 Q34 132 50 130 Q60 132 60 150"
              fill="url(#leather)"
            />
            <path
              d="M180 152 Q186 132 170 130 Q160 132 160 150"
              fill="url(#leather)"
            />
          </g>
        </svg>
      );

    case "boucle-sofa":
      return (
        <svg
          className={className}
          viewBox="0 0 360 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="boucle" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#fbf4e6" />
              <stop offset="1" stopColor="#cbb697" />
            </radialGradient>
            <pattern id="bouclePattern" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.6" fill="#efe7dc" />
              <circle cx="0" cy="0" r="0.8" fill="#dccdb1" />
              <circle cx="6" cy="6" r="0.8" fill="#dccdb1" />
            </pattern>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* feet */}
            <rect x="30" y="170" width="14" height="22" rx="3" fill="#3a2b21" />
            <rect x="316" y="170" width="14" height="22" rx="3" fill="#3a2b21" />
            <rect x="170" y="170" width="14" height="22" rx="3" fill="#3a2b21" />
            {/* base */}
            <rect x="20" y="100" width="320" height="80" rx="20" fill="url(#boucle)" />
            <rect x="20" y="100" width="320" height="80" rx="20" fill="url(#bouclePattern)" opacity="0.55" />
            {/* arms */}
            <rect x="14" y="80" width="40" height="100" rx="20" fill="url(#boucle)" />
            <rect x="14" y="80" width="40" height="100" rx="20" fill="url(#bouclePattern)" opacity="0.55" />
            <rect x="306" y="80" width="40" height="100" rx="20" fill="url(#boucle)" />
            <rect x="306" y="80" width="40" height="100" rx="20" fill="url(#bouclePattern)" opacity="0.55" />
            {/* back */}
            <rect x="44" y="40" width="272" height="80" rx="22" fill="url(#boucle)" />
            <rect x="44" y="40" width="272" height="80" rx="22" fill="url(#bouclePattern)" opacity="0.55" />
            {/* cushions */}
            <g opacity="0.7">
              <line x1="120" y1="106" x2="120" y2="170" stroke="#bda483" strokeWidth="2" />
              <line x1="240" y1="106" x2="240" y2="170" stroke="#bda483" strokeWidth="2" />
              <line x1="180" y1="48" x2="180" y2="116" stroke="#bda483" strokeWidth="2" />
            </g>
          </g>
        </svg>
      );

    case "marble-coffee":
      return (
        <svg
          className={className}
          viewBox="0 0 320 130"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="marble" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fbf7f0" />
              <stop offset="1" stopColor="#d6cdbb" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* base */}
            <rect x="60" y="105" width="200" height="6" rx="2" fill="#1a1714" />
            <rect x="74" y="40" width="6" height="65" fill="#1a1714" />
            <rect x="240" y="40" width="6" height="65" fill="#1a1714" />
            <rect x="74" y="40" width="172" height="6" fill="#1a1714" />
            {/* slab */}
            <rect x="40" y="22" width="240" height="22" rx="3" fill="url(#marble)" />
            {/* veining */}
            <g stroke="#9a8e7d" strokeWidth="0.8" fill="none" opacity="0.5">
              <path d="M58 30 Q120 22 180 36 Q230 42 268 30" />
              <path d="M70 38 Q150 32 210 40" />
              <path d="M44 36 Q60 32 90 38" />
            </g>
            {/* slab edge */}
            <rect x="40" y="22" width="240" height="22" rx="3" fill="none" stroke="#9a8e7d" strokeWidth="0.6" />
          </g>
        </svg>
      );

    case "arc-floor-lamp":
      return (
        <svg
          className={className}
          viewBox="0 0 280 380"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="brass" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#c9a14a" />
              <stop offset="1" stopColor="#7d6a4f" />
            </linearGradient>
            <radialGradient id="bulb" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#fff8df" />
              <stop offset="1" stopColor="#e7c884" />
            </radialGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* marble base */}
            <ellipse cx="220" cy="358" rx="44" ry="10" fill="#1a1714" />
            <rect x="184" y="334" width="72" height="22" rx="4" fill="#1a1714" />
            <rect x="190" y="332" width="60" height="6" fill="#3a2b21" />
            {/* arc stem */}
            <path
              d="M218 332 C 218 200, 80 60, 60 60"
              fill="none"
              stroke="url(#brass)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* shade */}
            <path
              d="M30 60 L90 60 L82 110 L38 110 Z"
              fill="#fbf4e2"
              stroke="#c9a14a"
              strokeWidth="1"
            />
            {/* glow */}
            <ellipse cx="60" cy="120" rx="40" ry="8" fill="url(#bulb)" opacity="0.7" />
          </g>
        </svg>
      );

    case "pendant-lamp":
      return (
        <svg
          className={className}
          viewBox="0 0 200 220"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="opal" cx="0.5" cy="0.45" r="0.6">
              <stop offset="0" stopColor="#fff8df" />
              <stop offset="0.7" stopColor="#f1e9d2" />
              <stop offset="1" stopColor="#cdb78c" />
            </radialGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <line x1="100" y1="0" x2="100" y2="92" stroke="#7d6a4f" strokeWidth="2" />
            <rect x="92" y="2" width="16" height="6" fill="#c9a14a" />
            {/* dome */}
            <path
              d="M30 142 Q30 80 100 80 Q170 80 170 142 Z"
              fill="url(#opal)"
            />
            <ellipse cx="100" cy="142" rx="70" ry="8" fill="#cdb78c" opacity="0.7" />
            {/* highlight */}
            <ellipse cx="80" cy="108" rx="22" ry="10" fill="#fff8df" opacity="0.6" />
            {/* glow halo */}
            <ellipse cx="100" cy="158" rx="92" ry="12" fill="#fff1c8" opacity="0.45" />
          </g>
        </svg>
      );

    case "round-mirror":
      return (
        <svg
          className={className}
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="mirrorFace" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0" stopColor="#f1ece2" />
              <stop offset="0.6" stopColor="#dad2c2" />
              <stop offset="1" stopColor="#8a7e70" />
            </radialGradient>
            <linearGradient id="oakFrame" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#cbb697" />
              <stop offset="1" stopColor="#8a7e70" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <circle cx="110" cy="110" r="100" fill="url(#oakFrame)" />
            <circle cx="110" cy="110" r="86" fill="url(#mirrorFace)" />
            <path
              d="M64 70 Q90 110 70 160"
              stroke="#fbf7f0"
              strokeOpacity="0.6"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>
      );

    case "monstera":
      return (
        <svg
          className={className}
          viewBox="0 0 240 320"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="leaf1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5a8351" />
              <stop offset="1" stopColor="#1f2e1d" />
            </linearGradient>
            <linearGradient id="pot" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e3d8c7" />
              <stop offset="1" stopColor="#a89a82" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* pot */}
            <path
              d="M70 240 L170 240 L160 310 L80 310 Z"
              fill="url(#pot)"
            />
            <ellipse cx="120" cy="240" rx="50" ry="8" fill="#a89a82" />
            {/* stems */}
            <path d="M118 240 Q116 200 100 170" stroke="#3a4f2e" strokeWidth="3" fill="none" />
            <path d="M122 240 Q126 190 150 160" stroke="#3a4f2e" strokeWidth="3" fill="none" />
            <path d="M120 240 Q120 210 130 110" stroke="#3a4f2e" strokeWidth="3" fill="none" />
            {/* leaves */}
            <MonsteraLeaf cx={80} cy={160} rotate={-30} />
            <MonsteraLeaf cx={170} cy={150} rotate={30} />
            <MonsteraLeaf cx={130} cy={100} rotate={5} />
            <MonsteraLeaf cx={60} cy={100} rotate={-50} scale={0.8} />
            <MonsteraLeaf cx={180} cy={80} rotate={45} scale={0.8} />
          </g>
        </svg>
      );

    case "side-table":
      return (
        <svg
          className={className}
          viewBox="0 0 150 220"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="ash" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e0c69b" />
              <stop offset="1" stopColor="#a07a52" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <ellipse cx="75" cy="200" rx="58" ry="10" fill="#a07a52" />
            <rect x="60" y="60" width="30" height="142" rx="6" fill="url(#ash)" />
            <ellipse cx="75" cy="60" rx="58" ry="12" fill="url(#ash)" />
            <ellipse cx="75" cy="58" rx="58" ry="6" fill="#f0e0c2" />
            <line x1="32" y1="60" x2="118" y2="60" stroke="#7c5a36" strokeWidth="0.5" opacity="0.6" />
          </g>
        </svg>
      );

    case "bookshelf":
      return (
        <svg
          className={className}
          viewBox="0 0 240 380"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="walnut" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#8a4a28" />
              <stop offset="1" stopColor="#3a2417" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <rect x="20" y="10" width="200" height="360" rx="4" fill="url(#walnut)" />
            <rect x="30" y="20" width="180" height="340" rx="2" fill="#2c1d12" />
            {/* shelves */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="30" y={20 + i * 68} width="180" height="6" fill="url(#walnut)" />
            ))}
            {/* books */}
            <Books y={32} colors={["#c9a14a", "#3e5a3a", "#a45a30", "#7d6a4f", "#e3d8c7"]} />
            <Books y={100} colors={["#3a2b21", "#cbb697", "#5b3a22", "#a07a52"]} reverse />
            <Books y={168} colors={["#8a7e70", "#c9a14a", "#3e5a3a", "#cbb697", "#a45a30"]} />
            <Books y={236} colors={["#1f2e1d", "#a07a52", "#cbb697", "#3a2b21"]} reverse />
            <Books y={304} colors={["#a45a30", "#3a2b21", "#c9a14a"]} />
          </g>
        </svg>
      );

    case "wool-rug":
      return (
        <svg
          className={className}
          viewBox="0 0 380 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="rugBg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f6efdf" />
              <stop offset="1" stopColor="#cbb697" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <rect x="10" y="20" width="360" height="160" rx="4" fill="url(#rugBg)" />
            {/* fringe */}
            <g stroke="#cbb697" strokeWidth="2">
              {Array.from({ length: 36 }).map((_, i) => (
                <line key={`l${i}`} x1={20 + i * 10} y1="180" x2={20 + i * 10} y2="194" />
              ))}
              {Array.from({ length: 36 }).map((_, i) => (
                <line key={`u${i}`} x1={20 + i * 10} y1="20" x2={20 + i * 10} y2="6" />
              ))}
            </g>
            {/* horizon stripe */}
            <rect x="20" y="92" width="340" height="14" fill="#a89a82" opacity="0.55" />
            <line x1="20" y1="100" x2="360" y2="100" stroke="#7d6a4f" strokeWidth="1" opacity="0.5" />
          </g>
        </svg>
      );

    case "ceramic-vase":
      return (
        <svg
          className={className}
          viewBox="0 0 130 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="vase" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0" stopColor="#f0e7d3" />
              <stop offset="1" stopColor="#a89a82" />
            </radialGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            <ellipse cx="65" cy="190" rx="40" ry="6" fill="#a89a82" />
            <path
              d="M40 60 Q35 110 50 180 L80 180 Q95 110 90 60 Q85 40 65 38 Q45 40 40 60 Z"
              fill="url(#vase)"
            />
            <ellipse cx="65" cy="40" rx="22" ry="6" fill="#3a2b21" opacity="0.4" />
          </g>
        </svg>
      );

    case "credenza":
      return (
        <svg
          className={className}
          viewBox="0 0 380 180"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="reedOak" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#cbb697" />
              <stop offset="1" stopColor="#8a6a44" />
            </linearGradient>
            <linearGradient id="travertine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fbf4e2" />
              <stop offset="1" stopColor="#cbb697" />
            </linearGradient>
            <DropShadow id={filterId} />
          </defs>
          <g filter={shadowFilter}>
            {/* legs */}
            <rect x="20" y="140" width="8" height="32" fill="#3a2b21" />
            <rect x="352" y="140" width="8" height="32" fill="#3a2b21" />
            {/* body */}
            <rect x="14" y="40" width="352" height="108" rx="4" fill="url(#reedOak)" />
            {/* reeded vertical lines */}
            <g stroke="#8a6a44" strokeWidth="1.4" opacity="0.55">
              {Array.from({ length: 50 }).map((_, i) => (
                <line key={i} x1={20 + i * 7} y1="44" x2={20 + i * 7} y2="144" />
              ))}
            </g>
            {/* travertine top */}
            <rect x="6" y="28" width="368" height="14" rx="3" fill="url(#travertine)" />
            <rect x="6" y="28" width="368" height="14" rx="3" fill="none" stroke="#a89a82" strokeWidth="0.5" />
            {/* hardware */}
            <rect x="184" y="86" width="12" height="3" rx="1.5" fill="#c9a14a" />
            <rect x="184" y="100" width="12" height="3" rx="1.5" fill="#c9a14a" />
          </g>
        </svg>
      );
  }
}

function DropShadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dy="14" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.45" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function MonsteraLeaf({
  cx,
  cy,
  rotate = 0,
  scale = 1,
}: {
  cx: number;
  cy: number;
  rotate?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C -10 -30 -40 -50 -55 -40 C -70 -22 -55 18 -25 38 C -10 48 8 44 14 30 C 22 12 14 -16 0 0 Z"
        fill="url(#leaf1)"
      />
      <path
        d="M-10 -8 L -45 -28 M-10 4 L -50 -10 M -8 16 L -42 18"
        stroke="#1f2e1d"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </g>
  );
}

function Books({
  y,
  colors,
  reverse = false,
}: {
  y: number;
  colors: string[];
  reverse?: boolean;
}) {
  let x = reverse ? 196 : 36;
  const widths = [10, 14, 8, 12, 16, 9, 13, 11];
  const items: React.ReactElement[] = [];
  for (let i = 0; i < colors.length; i++) {
    const w = widths[i % widths.length];
    const cx = reverse ? x - w : x;
    items.push(
      <rect
        key={i}
        x={cx}
        y={y + (i % 2 === 0 ? 0 : 4)}
        width={w}
        height={64 - (i % 2 === 0 ? 0 : 4)}
        rx="1"
        fill={colors[i]}
        opacity="0.95"
      />
    );
    x = reverse ? x - w - 2 : x + w + 2;
  }
  // a single tilted book at the end
  items.push(
    <rect
      key="t"
      x={reverse ? x - 18 : x}
      y={y + 30}
      width="32"
      height="6"
      rx="1"
      fill={colors[colors.length - 1]}
      transform={`rotate(${reverse ? -8 : 8} ${reverse ? x - 2 : x + 16} ${y + 33})`}
    />
  );
  return <g>{items}</g>;
}
