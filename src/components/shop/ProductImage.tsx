import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductImage({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2 bg-product-bg text-muted-foreground", className)}>
        <ImageOff className="h-8 w-8" aria-hidden />
        <span className="text-xs">Image unavailable</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={816}
      height={816}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
