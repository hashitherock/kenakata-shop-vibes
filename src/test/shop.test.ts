import { describe, it, expect } from "vitest";
import { cartTotals, filterProducts, formatBDT } from "@/lib/shop";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

describe("store rules", () => {
  it("has exactly 13 categories and no grocery", () => {
    expect(categories).toHaveLength(13);
    expect(categories.some((c) => /grocer|supermarket/i.test(c.name))).toBe(false);
  });

  it("every product belongs to an approved category", () => {
    const slugs = new Set(categories.map((c) => c.slug));
    expect(products.every((p) => slugs.has(p.category))).toBe(true);
  });

  it("sorts by price low to high", () => {
    const r = filterProducts(products, { sort: "price-asc" });
    expect(r[0].price).toBeLessThanOrEqual(r[r.length - 1].price);
    expect(r[0].id).toBe("magnetic-phone-mount");
  });

  it("filters by search and category", () => {
    expect(filterProducts(products, { q: "kurti" }).map((p) => p.id)).toEqual(["handloom-kurti"]);
    expect(filterProducts(products, { category: "pet-care" })).toHaveLength(2);
  });

  it("calculates cart totals with ৳80 shipping under ৳3000", () => {
    expect(cartTotals([{ price: 1000, qty: 2 }])).toEqual({ count: 2, subtotal: 2000, shipping: 80, total: 2080 });
    expect(cartTotals([{ price: 1500, qty: 2 }]).shipping).toBe(0);
    expect(cartTotals([]).total).toBe(0);
  });

  it("formats BDT", () => {
    expect(formatBDT(123456)).toBe("৳1,23,456");
  });
});
