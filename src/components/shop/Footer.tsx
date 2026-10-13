import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { categories } from "@/data/categories";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-2xl font-bold">kenakata</p>
          <p className="text-sm opacity-75">Thoughtfully chosen everyday goods — from wardrobe to kitchen to garage — delivered across Bangladesh.</p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} aria-label={["Facebook", "Instagram", "YouTube"][i] + " (demo)"}
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-70">Shop</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm lg:grid-cols-1">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}><Link to="/shop" search={{ category: c.slug }} className="opacity-80 hover:opacity-100 hover:underline">{c.name}</Link></li>
            ))}
            <li><Link to="/shop" search={{}} className="font-semibold hover:underline">All categories →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-70">Support</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/help" className="hover:underline">Help centre & FAQ</Link></li>
            <li><Link to="/help" hash="delivery" className="hover:underline">Delivery info</Link></li>
            <li><Link to="/help" hash="returns" className="hover:underline">Returns & exchanges</Link></li>
            <li className="flex items-center gap-2 pt-2"><Phone className="h-4 w-4" /> +880 1XXX-XXXXXX (placeholder)</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@example.com (placeholder)</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-70">Newsletter</h3>
          <p className="mb-3 text-sm opacity-75">New drops and member-only offers, twice a month.</p>
          <form noValidate onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) setStatus({ ok: false, msg: "Please enter a valid email address." });
            else { setStatus({ ok: true, msg: "You're subscribed! (demo — nothing was sent)" }); setEmail(""); }
          }} className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
              placeholder="you@email.com" aria-invalid={status?.ok === false} aria-describedby="nl-status"
              className="h-11 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-sm placeholder:text-primary-foreground/50 outline-none focus:border-accent" />
            <button className="h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:brightness-105 active:scale-95">Subscribe</button>
          </form>
          <p id="nl-status" role="status" aria-live="polite" className={`mt-2 min-h-5 text-xs ${status?.ok ? "text-accent" : "text-sale-foreground"}`}>{status?.msg}</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Kenakata. Demo storefront — no real orders are processed.
      </div>
    </footer>
  );
}
