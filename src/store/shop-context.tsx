import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, type Product } from "@/data/products";
import { cartTotals } from "@/lib/shop";

export type CartLine = { key: string; id: string; qty: number; variant?: string };
export type CartLineView = CartLine & { product: Product };

type ShopState = {
  cart: CartLineView[];
  wishlist: Product[];
  totals: ReturnType<typeof cartTotals>;
  addToCart: (id: string, qty?: number, variant?: string) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishOpen: boolean;
  setWishOpen: (v: boolean) => void;
  bump: number;
};

const Ctx = createContext<ShopState | null>(null);
const CART_KEY = "kenakata-cart";
const WISH_KEY = "kenakata-wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem(CART_KEY) ?? "[]"));
      setWish(JSON.parse(localStorage.getItem(WISH_KEY) ?? "[]"));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wish));
  }, [wish, hydrated]);

  const addToCart = useCallback((id: string, qty = 1, variant?: string) => {
    const p = getProduct(id);
    if (!p) return;
    const key = `${id}|${variant ?? ""}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      return [...prev, { key, id, qty, variant }];
    });
    setBump((b) => b + 1);
    toast.success("Added to cart", {
      description: `${p.name}${variant ? ` · ${variant}` : ""} × ${qty}`,
      action: { label: "View cart", onClick: () => setCartOpen(true) },
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)));
  }, []);
  const removeLine = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((id: string) => {
    const p = getProduct(id);
    setWish((prev) => {
      const has = prev.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist", { description: p?.name });
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  const value = useMemo<ShopState>(() => {
    const cart = lines
      .map((l) => ({ ...l, product: getProduct(l.id)! }))
      .filter((l) => l.product);
    return {
      cart,
      wishlist: wish.map(getProduct).filter(Boolean) as Product[],
      totals: cartTotals(cart.map((l) => ({ price: l.product.price, qty: l.qty }))),
      addToCart, setQty, removeLine, clearCart, toggleWishlist,
      isWished: (id) => wish.includes(id),
      cartOpen, setCartOpen, wishOpen, setWishOpen, bump,
    };
  }, [lines, wish, cartOpen, wishOpen, bump, addToCart, setQty, removeLine, clearCart, toggleWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
