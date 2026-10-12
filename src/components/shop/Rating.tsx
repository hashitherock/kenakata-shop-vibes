import { Star } from "lucide-react";

export function Rating({ value, reviews, size = "sm" }: { value: number; reviews?: number; size?: "sm" | "md" }) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5${reviews ? `, ${reviews} reviews` : ""}`}>
      <div className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={`${icon} ${i <= Math.round(value) ? "fill-star text-star" : "text-border"}`} />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {value.toFixed(1)}{reviews != null && ` (${reviews})`}
      </span>
    </div>
  );
}
