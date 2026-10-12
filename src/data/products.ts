import w1 from "@/assets/products/w1.jpg";
import w2 from "@/assets/products/w2.jpg";
import m1 from "@/assets/products/m1.jpg";
import m2 from "@/assets/products/m2.jpg";
import b1 from "@/assets/products/b1.jpg";
import b2 from "@/assets/products/b2.jpg";
import p1 from "@/assets/products/p1.jpg";
import p2 from "@/assets/products/p2.jpg";
import f1 from "@/assets/products/f1.jpg";
import f2 from "@/assets/products/f2.jpg";
import h1 from "@/assets/products/h1.jpg";
import h2 from "@/assets/products/h2.jpg";
import bb1 from "@/assets/products/bb1.jpg";
import bb2 from "@/assets/products/bb2.jpg";
import hk1 from "@/assets/products/hk1.jpg";
import hk2 from "@/assets/products/hk2.jpg";
import c1 from "@/assets/products/c1.jpg";
import c2 from "@/assets/products/c2.jpg";
import s1 from "@/assets/products/s1.jpg";
import s2 from "@/assets/products/s2.jpg";
import pt1 from "@/assets/products/pt1.jpg";
import pt2 from "@/assets/products/pt2.jpg";
import t1 from "@/assets/products/t1.jpg";
import t2 from "@/assets/products/t2.jpg";
import v1 from "@/assets/products/v1.jpg";
import v2 from "@/assets/products/v2.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  popularity: number;
  badge?: "New" | "Bestseller" | "Sale" | "Limited";
  variants?: { label: string; options: string[] };
  stock: "In stock" | "Low stock" | "Out of stock";
};

export const products: Product[] = [
  { id: "linen-wrap-dress", name: "Sage Linen Wrap Dress", category: "womens-clothing", description: "Breathable pure linen midi dress with flutter sleeves and a self-tie waist. Made for humid summer days.", price: 3450, originalPrice: 4200, image: w1, rating: 4.7, reviews: 214, popularity: 96, badge: "Bestseller", variants: { label: "Size", options: ["XS", "S", "M", "L", "XL"] }, stock: "In stock" },
  { id: "handloom-kurti", name: "Terracotta Handloom Kurti", category: "womens-clothing", description: "Soft handloom cotton kurti with hand block-printed floral buti and a notched neckline.", price: 1890, image: w2, rating: 4.6, reviews: 158, popularity: 88, badge: "New", variants: { label: "Size", options: ["S", "M", "L", "XL"] }, stock: "In stock" },
  { id: "oxford-shirt", name: "Classic Oxford Shirt", category: "mens-clothing", description: "A wardrobe staple in sky blue oxford cotton with a button-down collar and chest pocket.", price: 2250, originalPrice: 2650, image: m1, rating: 4.5, reviews: 302, popularity: 91, variants: { label: "Size", options: ["S", "M", "L", "XL", "XXL"] }, stock: "In stock" },
  { id: "chino-trousers", name: "Straight-Fit Chinos", category: "mens-clothing", description: "Mid-weight stretch twill chinos in khaki with a clean straight leg.", price: 2490, image: m2, rating: 4.4, reviews: 121, popularity: 74, variants: { label: "Waist", options: ["30", "32", "34", "36"] }, stock: "Low stock" },
  { id: "matte-lipstick-trio", name: "Velvet Matte Lipstick Trio", category: "beauty-makeup", description: "Three long-wear matte shades — rose, nude and brick — in a gold bullet.", price: 1650, originalPrice: 2100, image: b1, rating: 4.8, reviews: 489, popularity: 98, badge: "Sale", stock: "In stock" },
  { id: "vitamin-c-serum", name: "Vitamin C Glow Serum", category: "beauty-makeup", description: "15% vitamin C serum with ferulic acid to brighten and even skin tone. 30 ml.", price: 1290, image: b2, rating: 4.6, reviews: 367, popularity: 93, stock: "In stock" },
  { id: "herbal-shampoo", name: "Herbal Botanical Shampoo", category: "personal-care", description: "Sulfate-free shampoo with plant extracts for soft, healthy hair. 500 ml.", price: 780, image: p1, rating: 4.3, reviews: 205, popularity: 80, stock: "In stock" },
  { id: "sonic-toothbrush", name: "Sonic Electric Toothbrush", category: "personal-care", description: "Five cleaning modes, two-minute smart timer and a 30-day battery.", price: 3290, originalPrice: 3990, image: p2, rating: 4.7, reviews: 176, popularity: 85, badge: "Sale", stock: "In stock" },
  { id: "leather-tote", name: "Cognac Leather Tote", category: "fashion-lifestyle", description: "Full-grain leather tote with a roomy interior that fits a 14\" laptop.", price: 5990, originalPrice: 6900, image: f1, rating: 4.9, reviews: 92, popularity: 89, badge: "Limited", variants: { label: "Colour", options: ["Cognac", "Black"] }, stock: "Low stock" },
  { id: "minimal-watch", name: "Minimalist Gold Watch", category: "fashion-lifestyle", description: "Slim 36 mm case with a sunray white dial and forest green leather strap.", price: 4590, image: f2, rating: 4.6, reviews: 133, popularity: 82, stock: "In stock" },
  { id: "yoga-mat", name: "Eco Grip Yoga Mat", category: "health-wellness", description: "6 mm non-slip natural rubber mat with carry strap.", price: 1990, originalPrice: 2400, image: h1, rating: 4.5, reviews: 241, popularity: 84, stock: "In stock" },
  { id: "bp-monitor", name: "Digital BP Monitor", category: "health-wellness", description: "Upper-arm blood pressure monitor with large display and 60-reading memory.", price: 3150, image: h2, rating: 4.4, reviews: 87, popularity: 70, stock: "In stock" },
  { id: "baby-onesie-set", name: "Organic Onesie Set (3)", category: "baby-care", description: "Three soft organic cotton bodysuits with envelope necks for easy changes.", price: 1450, image: bb1, rating: 4.8, reviews: 198, popularity: 87, badge: "Bestseller", variants: { label: "Age", options: ["0-3M", "3-6M", "6-12M"] }, stock: "In stock" },
  { id: "glass-feeding-bottles", name: "Glass Feeding Bottles (2)", category: "baby-care", description: "Anti-colic borosilicate bottles with protective silicone sleeves. 150 ml.", price: 1190, image: bb2, rating: 4.6, reviews: 74, popularity: 66, stock: "In stock" },
  { id: "ceramic-dinner-set", name: "Speckled Ceramic Dinner Set", category: "home-kitchen", description: "Handmade stoneware set: dinner plate, side plate and bowl. Dishwasher safe.", price: 2750, originalPrice: 3200, image: hk1, rating: 4.7, reviews: 112, popularity: 79, stock: "In stock" },
  { id: "granite-frying-pan", name: "Granite Non-stick Pan 26cm", category: "home-kitchen", description: "PFOA-free granite coating, induction-ready base and cool-touch handle.", price: 1850, image: hk2, rating: 4.5, reviews: 263, popularity: 90, badge: "Bestseller", stock: "In stock" },
  { id: "spray-mop", name: "Microfiber Spray Mop", category: "cleaning-supplies", description: "Built-in 400 ml spray tank with a washable microfiber pad and 360° head.", price: 1590, image: c1, rating: 4.4, reviews: 145, popularity: 76, stock: "In stock" },
  { id: "eco-dish-kit", name: "Eco Dish Care Kit", category: "cleaning-supplies", description: "Refillable glass soap dispensers, beechwood brush and a plant-fibre sponge.", price: 990, originalPrice: 1250, image: c2, rating: 4.6, reviews: 68, popularity: 64, badge: "New", stock: "In stock" },
  { id: "leather-notebook", name: "Leather Journal & Pen", category: "stationery-office", description: "A5 refillable journal with 192 dotted pages and a brass ballpoint.", price: 1350, image: s1, rating: 4.8, reviews: 156, popularity: 81, stock: "In stock" },
  { id: "desk-organizer", name: "Walnut Desk Organizer", category: "stationery-office", description: "Solid walnut caddy with pen slots and a sticky-note tray.", price: 1750, image: s2, rating: 4.5, reviews: 59, popularity: 62, stock: "Low stock" },
  { id: "cat-bed", name: "Cloud Plush Cat Bed", category: "pet-care", description: "Ultra-soft donut bed with raised rim and non-slip base. Machine washable.", price: 1690, originalPrice: 1990, image: pt1, rating: 4.8, reviews: 227, popularity: 86, stock: "In stock" },
  { id: "rope-leash-set", name: "Rope Leash & Collar Set", category: "pet-care", description: "Braided rope leash with leather trims and a matching adjustable collar.", price: 1290, image: pt2, rating: 4.5, reviews: 94, popularity: 68, variants: { label: "Size", options: ["S", "M", "L"] }, stock: "In stock" },
  { id: "wooden-blocks", name: "Wooden Building Blocks", category: "toys-sports", description: "24 sustainably sourced beech blocks in child-safe colours.", price: 1450, image: t1, rating: 4.9, reviews: 132, popularity: 83, badge: "New", stock: "In stock" },
  { id: "cricket-bat", name: "Willow Cricket Bat", category: "toys-sports", description: "Handcrafted willow bat with grip, plus a leather match ball.", price: 3890, originalPrice: 4500, image: t2, rating: 4.6, reviews: 101, popularity: 92, variants: { label: "Size", options: ["5", "6", "Short Handle"] }, stock: "In stock" },
  { id: "magnetic-phone-mount", name: "Magnetic Vent Phone Mount", category: "vehicle-essentials", description: "Strong N52 magnets, 360° rotation and a secure vent clip.", price: 890, image: v1, rating: 4.3, reviews: 318, popularity: 78, stock: "In stock" },
  { id: "tyre-inflator", name: "Portable Tyre Inflator", category: "vehicle-essentials", description: "Digital air compressor with auto shut-off, LED light and nozzle kit.", price: 3490, originalPrice: 4100, image: v2, rating: 4.7, reviews: 143, popularity: 88, badge: "Sale", stock: "In stock" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
