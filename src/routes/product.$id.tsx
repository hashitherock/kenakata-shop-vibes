import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { discountPct, formatBDT } from "@/lib/shop";
import { useShop } from "@/store/shop-context";
import { Rating } from "@/components/shop/Rating";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductImage } from "@/components/shop/ProductImage";
import { QtyStepper } from "@/components/shop/Drawers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Kenakata` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Kenakata` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Product not found — Kenakata" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">It may have sold out or moved.</p>
      <Button asChild className="mt-6 rounded-full"><Link to="/shop" search={{}}>Back to shop</Link></Button>
    </div>
  ),
  component: ProductPage,
});

const views = [
  { label: "Full view", cls: "" },
  { label: "Detail view", cls: "scale-[1.6]" },
  { label: "Close-up", cls: "scale-[2.2] origin-top-left" },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWished } = useShop();
  const [view, setView] = useState(0);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.options[0]);
  const cat = getCategory(product.category)!;
  const off = discountPct(product);
  const wished = isWished(product.id);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category).slice(0, 4)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/shop" search={{ category: cat.slug }} className="hover:text-foreground">{cat.name}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>
      <div key={product.id} className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3 animate-fade-up">
          <div className="aspect-square overflow-hidden rounded-3xl bg-product-bg">
            <ProductImage key={view} eager src={product.image} alt={`${product.name} — ${views[view].label}`} className={cn("animate-in fade-in-0 duration-300", views[view].cls)} />
          </div>
          <div className="flex gap-3" role="tablist" aria-label="Product images">
            {views.map((v, i) => (
              <button key={v.label} role="tab" aria-selected={view === i} aria-label={v.label} onClick={() => setView(i)}
                className={cn("h-20 w-20 overflow-hidden rounded-xl border-2 bg-product-bg transition", view === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                <img src={product.image} alt="" className={cn("h-full w-full object-cover", v.cls)} />
              </button>
            ))}
          </div>
        </div>
        <div className="animate-fade-up [animation-delay:80ms]">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{cat.name}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <div className="mt-3"><Rating value={product.rating} reviews={product.reviews} size="md" /></div>
          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold">{formatBDT(product.price)}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">{formatBDT(product.originalPrice)}</span>}
            {off > 0 && <span className="rounded-full bg-sale px-2.5 py-1 text-xs font-bold text-sale-foreground">Save {off}%</span>}
          </div>
          <p className={cn("mt-2 text-sm font-medium", product.stock === "Low stock" ? "text-sale" : "text-primary")}>● {product.stock}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          {product.variants && (
            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-semibold">{product.variants.label}: <span className="font-normal text-muted-foreground">{variant}</span></legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.options.map((o) => (
                  <button key={o} onClick={() => setVariant(o)} aria-pressed={variant === o}
                    className={cn("min-w-12 rounded-full border px-4 py-2 text-sm font-medium transition", variant === o ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-foreground")}>
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(99, n)))} label={product.name} />
            <Button size="lg" className="h-12 flex-1 rounded-full text-base active:scale-[0.98]" onClick={() => addToCart(product.id, qty, variant)}>
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to cart · {formatBDT(product.price * qty)}
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full" onClick={() => toggleWishlist(product.id)} aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}>
              <Heart className={cn("h-5 w-5", wished && "animate-pop fill-sale text-sale")} />
            </Button>
          </div>
          <ul className="mt-8 space-y-3 rounded-2xl border bg-card p-5 text-sm">
            <li className="flex gap-3"><Truck className="h-5 w-5 text-primary" /> Free delivery on orders over ৳3,000 · 2–4 days in Dhaka</li>
            <li className="flex gap-3"><RotateCcw className="h-5 w-5 text-primary" /> 7-day easy returns on unused items</li>
          </ul>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
