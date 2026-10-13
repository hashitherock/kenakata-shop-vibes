import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/store/shop-context";
import { CartLines, CartSummary } from "@/components/shop/Drawers";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Kenakata" },
      { name: "description", content: "Review the items in your Kenakata cart, adjust quantities and see your total in BDT." },
      { property: "og:title", content: "Your cart — Kenakata" },
      { property: "og:description", content: "Review items and totals before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart } = useShop();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Your cart</h1>
      {cart.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed bg-card px-6 py-20 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Button asChild className="mt-2 rounded-full"><Link to="/shop" search={{}}>Start shopping</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border bg-card px-5"><CartLines /></div>
          <aside className="h-fit rounded-3xl border bg-card p-6 lg:sticky lg:top-36"><CartSummary /></aside>
        </div>
      )}
    </div>
  );
}
