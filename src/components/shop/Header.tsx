import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, User, X, ChevronDown, Truck } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/categories";
import { useShop } from "@/store/shop-context";
import { SearchBox } from "./SearchBox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Kenakata home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">K</span>
      <span className="font-display text-xl font-bold tracking-tight">kenakata</span>
    </Link>
  );
}

function CountBadge({ n, k }: { n: number; k?: number }) {
  if (!n) return null;
  return (
    <span key={k} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground animate-pop">
      {n}
    </span>
  );
}

const iconBtn = "relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-muted active:scale-95";

export function Header() {
  const { totals, wishlist, setCartOpen, setWishOpen, bump } = useShop();
  const [announce, setAnnounce] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {announce && (
        <div className="relative bg-primary-deep px-10 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm">
          <Truck className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden />
          Free delivery on orders over ৳3,000 · Use code <b>KENA10</b> for 10% off (demo)
          <button onClick={() => setAnnounce(false)} aria-label="Dismiss announcement"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-primary-foreground/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button className={`${iconBtn} lg:hidden`} onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          <SearchBox className="mx-4 hidden flex-1 md:block" />
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className={iconBtn} aria-label="Account menu"><User className="h-5 w-5" /></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Welcome, guest</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => toast.info("Sign-in is a demo", { description: "Accounts aren't enabled in this preview." })}>Sign in</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast.info("Order history is a demo")}>My orders</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setWishOpen(true)}>Wishlist</DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/help">Help centre</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className={iconBtn} onClick={() => setWishOpen(true)} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="h-5 w-5" /><CountBadge n={wishlist.length} k={wishlist.length} />
            </button>
            <button className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Cart, ${totals.count} items`}>
              <ShoppingBag className="h-5 w-5" /><CountBadge n={totals.count} k={bump} />
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden"><SearchBox /></div>
        <nav aria-label="Main" className="mx-auto hidden max-w-7xl items-center gap-1 px-6 pb-2 text-sm font-medium lg:flex">
          <Link to="/" className="rounded-full px-3 py-1.5 hover:bg-muted" activeProps={{ className: "bg-muted" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/shop" search={{}} className="rounded-full px-3 py-1.5 hover:bg-muted">Shop all</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-muted">
              Categories <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid w-[520px] grid-cols-2 gap-1 p-2">
              {categories.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link to="/shop" search={{ category: c.slug }} className="flex items-center gap-2">
                    <c.icon className="h-4 w-4 text-primary" /> {c.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/shop" search={{ sort: "price-asc" }} className="rounded-full px-3 py-1.5 hover:bg-muted">Deals</Link>
          <Link to="/help" className="rounded-full px-3 py-1.5 hover:bg-muted" activeProps={{ className: "bg-muted" }}>Help</Link>
        </nav>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
          <SheetHeader><SheetTitle className="text-left"><Logo /></SheetTitle></SheetHeader>
          <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1 text-sm">
            {[["/", "Home"], ["/help", "Help centre"]].map(([to, label]) => (
              <Link key={to} to={to as "/"} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-muted">{label}</Link>
            ))}
            <Link to="/shop" search={{}} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-muted">Shop all</Link>
            <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
            {categories.map((c) => (
              <Link key={c.slug} to="/shop" search={{ category: c.slug }} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted">
                <c.icon className="h-4 w-4 text-primary" /> {c.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
