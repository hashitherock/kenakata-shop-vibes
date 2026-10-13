import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { filterProducts, sortLabels, type SortKey } from "@/lib/shop";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string; category?: string; sort?: SortKey };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    category: typeof s.category === "string" && getCategory(s.category) ? s.category : undefined,
    sort: typeof s.sort === "string" && s.sort in sortLabels ? (s.sort as SortKey) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop all products — Kenakata" },
      { name: "description", content: "Browse and filter products across all 13 Kenakata categories by price, rating and popularity." },
      { property: "og:title", content: "Shop all products — Kenakata" },
      { property: "og:description", content: "Filter by category, price and rating across 13 departments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Filters({ category, min, max, setMin, setMax, onPick }: {
  category?: string; min: string; max: string; setMin: (v: string) => void; setMax: (v: string) => void; onPick?: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h2>
        <ul className="space-y-0.5">
          <li>
            <Link to="/shop" search={(s: ShopSearch) => ({ ...s, category: undefined })} onClick={onPick}
              className={cn("block rounded-lg px-3 py-2 text-sm hover:bg-muted", !category && "bg-secondary font-semibold text-primary")}>All categories</Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to="/shop" search={(s: ShopSearch) => ({ ...s, category: c.slug })} onClick={onPick}
                aria-current={category === c.slug ? "true" : undefined}
                className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted", category === c.slug && "bg-secondary font-semibold text-primary")}>
                <c.icon className="h-4 w-4" aria-hidden /> {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price (৳)</legend>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="pmin">Minimum price</label>
          <input id="pmin" inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} placeholder="Min"
            className="h-10 w-full rounded-lg border bg-card px-3 text-sm" />
          <span className="text-muted-foreground">–</span>
          <label className="sr-only" htmlFor="pmax">Maximum price</label>
          <input id="pmax" inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} placeholder="Max"
            className="h-10 w-full rounded-lg border bg-card px-3 text-sm" />
        </div>
      </fieldset>
    </div>
  );
}

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [search.category, search.q, search.sort]);

  const list = useMemo(() => filterProducts(products, {
    ...search, min: min ? Number(min) : undefined, max: max ? Number(max) : undefined,
  }), [search, min, max]);

  const cat = getCategory(search.category);
  const hasFilters = !!(search.q || search.category || min || max || search.sort);
  const clearAll = () => { setMin(""); setMax(""); navigate({ search: {} }); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">{cat?.name ?? "Shop"}</span>
      </nav>
      <h1 className="text-3xl font-bold sm:text-4xl">{cat?.name ?? (search.q ? `Results for “${search.q}”` : "All products")}</h1>
      {cat && <p className="mt-1 text-muted-foreground">{cat.blurb}</p>}

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block"><Filters category={search.category} min={min} max={max} setMin={setMin} setMax={setMax} /></aside>
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Button variant="outline" className="rounded-full lg:hidden" onClick={() => setMobileFilters(true)}>
              <SlidersHorizontal className="mr-1 h-4 w-4" /> Filters
            </Button>
            <p className="text-sm text-muted-foreground" aria-live="polite"><b className="text-foreground">{list.length}</b> products</p>
            {search.q && (
              <button onClick={() => navigate({ search: (s) => ({ ...s, q: undefined }) })} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                “{search.q}” <X className="h-3 w-3" aria-label="Remove search filter" />
              </button>
            )}
            {hasFilters && <button onClick={clearAll} className="text-sm font-semibold text-primary hover:underline">Clear all</button>}
            <div className="ml-auto">
              <Select value={search.sort ?? "popular"} onValueChange={(v) => navigate({ search: (s) => ({ ...s, sort: v as SortKey }) })}>
                <SelectTrigger className="w-[190px] rounded-full bg-card" aria-label="Sort products"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(sortLabels) as SortKey[]).map((k) => <SelectItem key={k} value={k}>{sortLabels[k]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed bg-card px-6 py-20 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No products found</h2>
              <p className="max-w-sm text-sm text-muted-foreground">Try a different search, widen the price range, or browse another category.</p>
              <Button onClick={clearAll} className="mt-2 rounded-full">Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {list.map((p, i) => <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}><ProductCard product={p} /></div>)}
            </div>
          )}
        </div>
      </div>

      <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
        <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
          <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
          <div className="mt-6"><Filters category={search.category} min={min} max={max} setMin={setMin} setMax={setMax} onPick={() => setMobileFilters(false)} /></div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
