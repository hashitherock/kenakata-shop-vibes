import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/categories";
import { useShop } from "@/store/shop-context";
import { discountPct, formatBDT } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished } = useShop();
  const wished = isWished(product.id);
  const [popKey, setPopKey] = useState(0);
  const off = discountPct(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-product-bg">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name}>
          <ProductImage src={product.image} alt={product.name} className="transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <span className="rounded-full bg-sale px-2.5 py-1 text-xs font-bold text-sale-foreground">-{off}%</span>}
          {product.badge && product.badge !== "Sale" && (
            <span className="rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">{product.badge}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => { toggleWishlist(product.id); setPopKey((k) => k + 1); }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition hover:scale-105 active:scale-95"
        >
          <Heart key={popKey} className={cn("h-4 w-4", wished && "animate-pop fill-sale text-sale")} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{getCategory(product.category)?.name}</p>
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 font-display text-base font-semibold leading-snug hover:text-primary">
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-bold">{formatBDT(product.price)}</span>
            {product.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(product.originalPrice)}</span>}
          </div>
          <Button
            size="icon"
            onClick={() => addToCart(product.id, 1, product.variants?.options[0])}
            aria-label={`Add ${product.name} to cart`}
            className="shrink-0 rounded-full transition active:scale-90"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden>
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
