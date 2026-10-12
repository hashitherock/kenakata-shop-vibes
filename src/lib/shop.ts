import type { Product } from "@/data/products";

export type SortKey = "popular" | "price-asc" | "price-desc" | "name" | "rating";

export const sortLabels: Record<SortKey, string> = {
  popular: "Most popular",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A–Z",
  rating: "Top rated",
};

export const formatBDT = (n: number) => `৳${Math.round(n).toLocaleString("en-IN")}`;

export const discountPct = (p: Pick<Product, "price" | "originalPrice">) =>
  p.originalPrice && p.originalPrice > p.price
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;

export type ProductFilters = {
  q?: string;
  category?: string;
  min?: number;
  max?: number;
  sort?: SortKey;
};

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  const q = f.q?.trim().toLowerCase();
  const out = list.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (f.min != null && p.price < f.min) return false;
    if (f.max != null && p.price > f.max) return false;
    return true;
  });
  const sort = f.sort ?? "popular";
  const cmp: Record<SortKey, (a: Product, b: Product) => number> = {
    popular: (a, b) => b.popularity - a.popularity,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
    rating: (a, b) => b.rating - a.rating,
  };
  return [...out].sort(cmp[sort]);
}

export const FREE_SHIPPING_THRESHOLD = 3000;
export const SHIPPING_FEE = 80;

export function cartTotals(lines: { price: number; qty: number }[]) {
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { count, subtotal, shipping, total: subtotal + shipping };
}
