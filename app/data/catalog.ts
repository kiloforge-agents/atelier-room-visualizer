export type Product = {
  id: string;
  name: string;
  designer: string;
  category: "Seating" | "Tables" | "Lighting" | "Decor" | "Storage" | "Textiles";
  price: number;
  currency: string;
  year: string;
  origin: string;
  materials: string[];
  dimensions: string;
  blurb: string;
  description: string;
  /** Default footprint in CSS pixels at 1× scale on AR canvas. */
  width: number;
  height: number;
  /** Reference SVG illustration id rendered by <FurnitureSVG /> */
  art: ArtKey;
  /** Palette for the small color preview chips */
  swatches: string[];
};

export type ArtKey =
  | "lounge-chair"
  | "boucle-sofa"
  | "marble-coffee"
  | "arc-floor-lamp"
  | "pendant-lamp"
  | "round-mirror"
  | "monstera"
  | "side-table"
  | "bookshelf"
  | "wool-rug"
  | "ceramic-vase"
  | "credenza";

export const CATALOG: Product[] = [
  {
    id: "luna-lounge",
    name: "Luna Lounge",
    designer: "Hera Lindqvist",
    category: "Seating",
    price: 1840,
    currency: "USD",
    year: "2024",
    origin: "Hand-built in Porto",
    materials: ["European oak", "Vegetable-tanned leather", "Brass"],
    dimensions: 'W 30" × D 33" × H 31"',
    blurb: "A deep-shouldered lounge chair with a softened spine.",
    description:
      "Carved from solid oak and wrapped in vegetable-tanned leather that ages to a deep cognac. Designed for the long evening read.",
    width: 220,
    height: 240,
    art: "lounge-chair",
    swatches: ["#8a4a28", "#3a2b21", "#d8b48c"],
  },
  {
    id: "halcyon-sofa",
    name: "Halcyon Sofa",
    designer: "Studio Mareva",
    category: "Seating",
    price: 4290,
    currency: "USD",
    year: "2023",
    origin: "Woven in Lisbon",
    materials: ["Boucle wool", "Alder hardwood frame", "Down feather"],
    dimensions: 'W 86" × D 38" × H 30"',
    blurb: "A pillowed boucle sofa with confident, low arms.",
    description:
      "Six-foot frame of slow-grown alder, hand-tufted in undyed Portuguese boucle. Generous seat depth invites two-hour conversations.",
    width: 360,
    height: 200,
    art: "boucle-sofa",
    swatches: ["#efe7dc", "#cbb697", "#3a2b21"],
  },
  {
    id: "monolith-table",
    name: "Monolith Coffee Table",
    designer: "Anders Sjö",
    category: "Tables",
    price: 1190,
    currency: "USD",
    year: "2024",
    origin: "Quarried in Carrara",
    materials: ["Statuario marble", "Patinated steel"],
    dimensions: 'W 44" × D 28" × H 14"',
    blurb: "A single block of Statuario, balanced on a hairline base.",
    description:
      "An honest slab of Italian marble, edges hand-rubbed soft. The patinated steel base reads like a drawn line beneath it.",
    width: 320,
    height: 130,
    art: "marble-coffee",
    swatches: ["#f1ece2", "#9a8e7d", "#1a1714"],
  },
  {
    id: "arc-luminaire",
    name: "Arc Luminaire",
    designer: "Atelier Vide",
    category: "Lighting",
    price: 920,
    currency: "USD",
    year: "2022",
    origin: "Spun in Copenhagen",
    materials: ["Brushed brass", "Marble plinth", "Linen shade"],
    dimensions: 'W 76" arc × H 78"',
    blurb: "An overhead arc that reads from across the room.",
    description:
      "A six-foot arc of brushed brass, weighted by a plinth of black marble. Pairs especially well over a low sofa.",
    width: 280,
    height: 380,
    art: "arc-floor-lamp",
    swatches: ["#c9a14a", "#1a1714", "#fbf4e2"],
  },
  {
    id: "halo-pendant",
    name: "Halo Pendant",
    designer: "Mira Okafor",
    category: "Lighting",
    price: 540,
    currency: "USD",
    year: "2024",
    origin: "Blown in Murano",
    materials: ["Hand-blown opal glass", "Brass canopy"],
    dimensions: 'Ø 18" × H 9"',
    blurb: "A dome of opal glass that warms the room evenly.",
    description:
      "Glass spun by a single artisan in Murano, edges left raw. Casts a soft, lantern-warm light without glare.",
    width: 200,
    height: 220,
    art: "pendant-lamp",
    swatches: ["#fbf4e2", "#c9a14a", "#7d6a4f"],
  },
  {
    id: "sol-mirror",
    name: "Sol Mirror",
    designer: "Studio Mareva",
    category: "Decor",
    price: 380,
    currency: "USD",
    year: "2023",
    origin: "Hand-finished in Seville",
    materials: ["Aged oak", "Antique mirror glass"],
    dimensions: 'Ø 36"',
    blurb: "A round of aged oak, holding an honest reflection.",
    description:
      "Solid oak, lightly limed and oiled. The mirror is bevelled and finished with a faint silver patina — a flattering, gentle reflection.",
    width: 220,
    height: 220,
    art: "round-mirror",
    swatches: ["#8a7e70", "#dad2c2", "#f1ece2"],
  },
  {
    id: "monstera-companion",
    name: "Companion Monstera",
    designer: "House of Loma",
    category: "Decor",
    price: 165,
    currency: "USD",
    year: "—",
    origin: "Grown in California",
    materials: ["Living plant", "Stoneware vessel"],
    dimensions: 'H 38–46"',
    blurb: "A statuesque monstera in a hand-thrown stoneware pot.",
    description:
      "Three-year-old monstera, deep green with confident fenestration. Arrives in a hand-thrown stoneware vessel, glazed in matte oat.",
    width: 240,
    height: 320,
    art: "monstera",
    swatches: ["#3e5a3a", "#1f2e1d", "#e3d8c7"],
  },
  {
    id: "north-side",
    name: "North Side Table",
    designer: "Anders Sjö",
    category: "Tables",
    price: 460,
    currency: "USD",
    year: "2024",
    origin: "Turned in Helsinki",
    materials: ["Ash hardwood", "Natural oil finish"],
    dimensions: 'Ø 16" × H 22"',
    blurb: "A turned ash side table with a column-soft profile.",
    description:
      "Turned from a single piece of ash on a slow lathe. The narrow stem and wide foot give it the carriage of a small column.",
    width: 150,
    height: 220,
    art: "side-table",
    swatches: ["#d8b48c", "#a07a52", "#3a2b21"],
  },
  {
    id: "cordoba-shelf",
    name: "Córdoba Shelf",
    designer: "Atelier Vide",
    category: "Storage",
    price: 2150,
    currency: "USD",
    year: "2023",
    origin: "Joined in Valencia",
    materials: ["Walnut", "Brass shelf pins"],
    dimensions: 'W 36" × D 14" × H 78"',
    blurb: "A walnut bookshelf with the discipline of a library.",
    description:
      "Five quiet shelves of solid walnut, joined by hand. Designed to hold your books, your records, and your reasons.",
    width: 240,
    height: 380,
    art: "bookshelf",
    swatches: ["#5b3a22", "#8a4a28", "#c9a14a"],
  },
  {
    id: "high-plain-rug",
    name: "High Plain Rug",
    designer: "House of Loma",
    category: "Textiles",
    price: 980,
    currency: "USD",
    year: "2024",
    origin: "Hand-knotted in Oaxaca",
    materials: ["Undyed wool", "Natural cotton warp"],
    dimensions: '8\' × 10\'',
    blurb: "A hand-knotted wool rug with a quiet horizon line.",
    description:
      "Knotted by Zapotec weavers from undyed local wool. The faint horizon stripe is from the natural variation in the fleece.",
    width: 380,
    height: 200,
    art: "wool-rug",
    swatches: ["#efe7dc", "#cbb697", "#8a7e70"],
  },
  {
    id: "vessel-no-3",
    name: "Vessel No. 3",
    designer: "Mira Okafor",
    category: "Decor",
    price: 220,
    currency: "USD",
    year: "2024",
    origin: "Wheel-thrown in Brooklyn",
    materials: ["Stoneware", "Matte slip"],
    dimensions: 'Ø 9" × H 14"',
    blurb: "A tall stoneware vessel, hand-thrown and matte.",
    description:
      "Generous-shouldered stoneware vessel, finished in a matte oat slip. Wide enough for a single dramatic stem.",
    width: 130,
    height: 200,
    art: "ceramic-vase",
    swatches: ["#e3d8c7", "#a07a52", "#3a2b21"],
  },
  {
    id: "praia-credenza",
    name: "Praia Credenza",
    designer: "Hera Lindqvist",
    category: "Storage",
    price: 3260,
    currency: "USD",
    year: "2022",
    origin: "Built in Porto",
    materials: ["Reeded oak", "Travertine top", "Brass handles"],
    dimensions: 'W 70" × D 18" × H 28"',
    blurb: "A reeded-oak credenza with a soft travertine crown.",
    description:
      "Long, low credenza with hand-reeded oak doors and a single piece of travertine on top — quiet enough to live behind a sofa.",
    width: 380,
    height: 180,
    art: "credenza",
    swatches: ["#a07a52", "#efe7dc", "#c9a14a"],
  },
];

export const CATEGORIES: Array<Product["category"]> = [
  "Seating",
  "Tables",
  "Lighting",
  "Storage",
  "Decor",
  "Textiles",
];

export function findProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}
