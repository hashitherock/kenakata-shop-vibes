import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatBDT } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function SearchBox({ className, onDone }: { className?: string; onDone?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? products.filter((p) => p.name.toLowerCase().includes(t)).slice(0, 6) : [];
  }, [q]);

  const go = (id?: string) => {
    setOpen(false);
    if (id) navigate({ to: "/product/$id", params: { id } });
    else navigate({ to: "/shop", search: { q: q.trim() || undefined } });
    onDone?.();
  };

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(e) => { e.preventDefault(); go(active >= 0 ? matches[active]?.id : undefined); }}
    >
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        ref={inputRef}
        id="site-search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(matches.length - 1, a + 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(-1, a - 1)); }
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder="Search dresses, serums, cookware…"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && q.length > 0}
        aria-controls="search-suggestions"
        aria-activedescendant={active >= 0 ? `sugg-${active}` : undefined}
        className="h-11 w-full rounded-full border bg-card pl-11 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {q && (
        <button type="button" onClick={() => { setQ(""); inputRef.current?.focus(); }} aria-label="Clear search"
          className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
      )}
      {open && q.trim() && (
        <ul id="search-suggestions" role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover p-1.5 shadow-lift animate-in fade-in-0 slide-in-from-top-1">
          {matches.length === 0 ? (
            <li className="px-3 py-4 text-center text-sm text-muted-foreground">No products match “{q}”</li>
          ) : matches.map((p, i) => (
            <li key={p.id} id={`sugg-${i}`} role="option" aria-selected={i === active}>
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => go(p.id)}
                className={cn("flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm hover:bg-muted", i === active && "bg-muted")}>
                <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <span className="flex-1 truncate font-medium">{p.name}</span>
                <span className="text-muted-foreground">{formatBDT(p.price)}</span>
              </button>
            </li>
          ))}
          {matches.length > 0 && (
            <li><button type="submit" className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-primary hover:bg-muted">See all results for “{q}”</button></li>
          )}
        </ul>
      )}
    </form>
  );
}
