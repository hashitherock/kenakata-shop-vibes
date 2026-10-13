import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/store/shop-context";
import { formatBDT, FREE_SHIPPING_THRESHOLD } from "@/lib/shop";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border bg-card" role="group" aria-label={`Quantity for ${label}`}>
      <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted disabled:opacity-40" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span>
      <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted" onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
    </div>
  );
}

export function CartLines() {
  const { cart, setQty, removeLine } = useShop();
  return (
    <ul className="divide-y">
      {cart.map((l) => (
        <li key={l.key} className="flex gap-4 py-4 animate-in fade-in-0">
          <img src={l.product.image} alt={l.product.name} className="h-20 w-20 shrink-0 rounded-xl bg-product-bg object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex justify-between gap-2">
              <Link to="/product/$id" params={{ id: l.id }} className="truncate font-semibold hover:text-primary">{l.product.name}</Link>
              <span className="shrink-0 font-semibold">{formatBDT(l.product.price * l.qty)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{l.variant ? `${l.product.variants?.label}: ${l.variant} · ` : ""}{formatBDT(l.product.price)} each</p>
            <div className="mt-auto flex items-center justify-between">
              <QtyStepper value={l.qty} onChange={(n) => setQty(l.key, n)} label={l.product.name} />
              <button onClick={() => removeLine(l.key)} className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-destructive" aria-label={`Remove ${l.product.name}`}>
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CartSummary({ onCheckout }: { onCheckout?: () => void }) {
  const { totals, clearCart } = useShop();
  const [confirm, setConfirm] = useState(false);
  const left = FREE_SHIPPING_THRESHOLD - totals.subtotal;
  return (
    <div className="space-y-3">
      {left > 0 ? (
        <div className="rounded-xl bg-muted p-3 text-xs">
          Add <b>{formatBDT(left)}</b> more for free delivery
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} /></div>
        </div>
      ) : <div className="rounded-xl bg-muted p-3 text-xs font-medium">🎉 You've unlocked free delivery</div>}
      <dl className="space-y-1.5 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal ({totals.count} items)</dt><dd>{formatBDT(totals.subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{totals.shipping ? formatBDT(totals.shipping) : "Free"}</dd></div>
        <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Total</dt><dd>{formatBDT(totals.total)}</dd></div>
      </dl>
      <Button className="h-12 w-full rounded-full text-base" onClick={() => { toast.info("Checkout is a demo", { description: "No payment or order is processed in this preview." }); onCheckout?.(); }}>
        Checkout (demo)
      </Button>
      <Button variant="ghost" className="w-full rounded-full text-muted-foreground" onClick={() => setConfirm(true)}>Clear cart</Button>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
            <AlertDialogDescription>All {totals.count} items will be removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep items</AlertDialogCancel>
            <AlertDialogAction onClick={() => { clearCart(); toast("Cart cleared"); }}>Clear cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Empty({ icon: Icon, title, text, onClose }: { icon: typeof Heart; title: string; text: string; onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-muted"><Icon className="h-7 w-7 text-muted-foreground" /></div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-xs text-sm text-muted-foreground">{text}</p>
      <Button asChild className="mt-2 rounded-full" onClick={onClose}><Link to="/shop" search={{}}>Start shopping</Link></Button>
    </div>
  );
}

export function Drawers() {
  const { cart, wishlist, cartOpen, setCartOpen, wishOpen, setWishOpen, addToCart, toggleWishlist } = useShop();
  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader><SheetTitle>Your cart</SheetTitle><SheetDescription>Items are saved on this device.</SheetDescription></SheetHeader>
          {cart.length === 0 ? (
            <Empty icon={ShoppingBag} title="Your cart is empty" text="Browse our categories and add something you love." onClose={() => setCartOpen(false)} />
          ) : (
            <>
              <div className="-mx-6 flex-1 overflow-y-auto px-6"><CartLines /></div>
              <CartSummary />
              <Link to="/cart" onClick={() => setCartOpen(false)} className="text-center text-sm font-medium text-primary hover:underline">View full cart</Link>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Sheet open={wishOpen} onOpenChange={setWishOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader><SheetTitle>Wishlist</SheetTitle><SheetDescription>{wishlist.length} saved items</SheetDescription></SheetHeader>
          {wishlist.length === 0 ? (
            <Empty icon={Heart} title="No saved items yet" text="Tap the heart on any product to save it here." onClose={() => setWishOpen(false)} />
          ) : (
            <ul className="-mx-6 flex-1 divide-y overflow-y-auto px-6">
              {wishlist.map((p) => (
                <li key={p.id} className="flex gap-4 py-4">
                  <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl bg-product-bg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Link to="/product/$id" params={{ id: p.id }} onClick={() => setWishOpen(false)} className="truncate font-semibold hover:text-primary">{p.name}</Link>
                    <span className="text-sm font-semibold">{formatBDT(p.price)}</span>
                    <div className="mt-auto flex gap-2">
                      <Button size="sm" className="rounded-full" onClick={() => addToCart(p.id, 1, p.variants?.options[0])}>Add to cart</Button>
                      <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toggleWishlist(p.id)}>Remove</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
