import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import promo from "@/assets/promo.jpg";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/shop";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/shop/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenakata — Fashion, Beauty, Home & More in Bangladesh" },
      { name: "description", content: "Discover clothing, beauty, home, baby, pet and vehicle essentials across 13 curated categories, priced in BDT." },
      { property: "og:title", content: "Kenakata — Everyday goods, beautifully chosen" },
      { property: "og:description", content: "13 curated categories of everyday essentials, priced in BDT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHead({ title, sub, to }: { title: string; sub?: string; to?: { category?: string; sort?: "popular" } }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {sub && <p className="mt-1 text-muted-foreground">{sub}</p>}
      </div>
      {to && (
        <Link to="/shop" search={to} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Index() {
  const featured = filterProducts(products, { sort: "popular" }).slice(0, 8);
  const deals = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Linen dress, leather tote and skincare in a sunlit room" width={1600} height={912}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 hero-scrim" />
        <div className="absolute inset-0 bg-background/70 sm:hidden" />
        <div className="relative mx-auto flex min-h-[460px] max-w-7xl items-center px-4 py-16 sm:min-h-[560px] sm:px-6">
          <div className="max-w-lg animate-fade-up">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">Autumn edit · up to 25% off</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl">Everyday goods, beautifully chosen.</h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">From handloom kurtis to cookware and car gear — 13 curated categories, one easy cart.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
                <Link to="/shop" search={{}}>Shop now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-card/70 px-7 text-base">
                <Link to="/shop" search={{ sort: "price-asc" }}>See deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 text-sm sm:px-6 lg:grid-cols-4">
          {[[Truck, "Free delivery over ৳3,000"], [RotateCcw, "7-day easy returns"], [ShieldCheck, "Secure checkout"], [BadgeCheck, "100% authentic"]].map(([I, t], i) => {
            const Icon = I as typeof Truck;
            return <li key={i} className="flex items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-primary" /><span className="font-medium">{t as string}</span></li>;
          })}
        </ul>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="pt-16">
          <SectionHead title="Shop by category" sub="All 13 departments, one tap away" />
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-[repeat(13,minmax(0,1fr))]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/shop" search={{ category: c.slug }}
                  className="group flex h-full flex-col items-center gap-3 rounded-2xl border bg-card p-3 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lift">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold leading-tight">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="pt-20">
          <SectionHead title="Bestsellers" sub="What everyone's adding to cart this week" to={{ sort: "popular" }} />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Reveal>

        <Reveal className="pt-20">
          <section className="relative overflow-hidden rounded-3xl bg-primary-deep">
            <img src={promo} alt="" loading="lazy" width={1600} height={800} className="absolute inset-0 h-full w-full object-cover object-right" />
            <div className="absolute inset-0 promo-scrim" />
            <div className="relative max-w-md p-8 text-primary-foreground sm:p-14">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Beauty week</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Glow-up essentials, up to 21% off</h2>
              <p className="mt-3 opacity-80">Serums, lip colour and self-care favourites — while stocks last.</p>
              <Button asChild size="lg" className="mt-6 h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
                <Link to="/shop" search={{ category: "beauty-makeup" }}>Shop beauty</Link>
              </Button>
            </div>
          </section>
        </Reveal>

        <Reveal className="pt-20">
          <SectionHead title="Deals you'll love" sub="Marked down, not watered down" to={{}} />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {deals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Reveal>

        <Reveal className="grid gap-5 pt-20 md:grid-cols-2">
          {[
            { slug: "home-kitchen", t: "Make home feel new", s: "Cookware, tableware and more" },
            { slug: "pet-care", t: "For your best friend", s: "Cosy beds and everyday gear" },
          ].map((b, i) => (
            <Link key={b.slug} to="/shop" search={{ category: b.slug }}
              className={`group flex items-center justify-between gap-4 rounded-3xl p-8 transition hover:shadow-lift ${i ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>
              <div>
                <h3 className="text-2xl font-bold">{b.t}</h3>
                <p className="mt-1 opacity-80">{b.s}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
              <img src={products.find((p) => p.category === b.slug)!.image} alt="" loading="lazy" className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-36" />
            </Link>
          ))}
        </Reveal>
      </div>
    </>
  );
}
