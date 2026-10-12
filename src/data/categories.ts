import {
  Shirt, User, Sparkles, Droplets, Watch, HeartPulse, Baby, CookingPot,
  SprayCan, PenTool, PawPrint, Trophy, Car, type LucideIcon,
} from "lucide-react";

export type Category = { slug: string; name: string; icon: LucideIcon; blurb: string };

/** Exactly 13 approved categories — do not add, remove or rename. */
export const categories: Category[] = [
  { slug: "womens-clothing", name: "Women's Clothing", icon: Shirt, blurb: "Dresses, kurtis & everyday wear" },
  { slug: "mens-clothing", name: "Men's Clothing", icon: User, blurb: "Shirts, trousers & essentials" },
  { slug: "beauty-makeup", name: "Beauty & Makeup", icon: Sparkles, blurb: "Lips, skin & glow" },
  { slug: "personal-care", name: "Personal Care", icon: Droplets, blurb: "Hair, oral & body care" },
  { slug: "fashion-lifestyle", name: "Fashion & Lifestyle", icon: Watch, blurb: "Bags, watches & accessories" },
  { slug: "health-wellness", name: "Health & Wellness", icon: HeartPulse, blurb: "Fitness & home health" },
  { slug: "baby-care", name: "Baby Care", icon: Baby, blurb: "Gentle picks for little ones" },
  { slug: "home-kitchen", name: "Home & Kitchen", icon: CookingPot, blurb: "Cookware & tableware" },
  { slug: "cleaning-supplies", name: "Cleaning Supplies", icon: SprayCan, blurb: "Mops, soaps & tools" },
  { slug: "stationery-office", name: "Stationery & Office", icon: PenTool, blurb: "Notebooks & desk gear" },
  { slug: "pet-care", name: "Pet Care", icon: PawPrint, blurb: "Beds, leashes & more" },
  { slug: "toys-sports", name: "Toys & Sports", icon: Trophy, blurb: "Play, learn & move" },
  { slug: "vehicle-essentials", name: "Vehicle Essentials", icon: Car, blurb: "On-the-road must-haves" },
];

export const getCategory = (slug?: string) => categories.find((c) => c.slug === slug);
