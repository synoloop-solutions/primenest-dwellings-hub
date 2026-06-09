import { Link } from "@tanstack/react-router";
import { Heart, Scale, BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/data/types";
import { statusLabels, typeLabels } from "@/data/properties";
import { formatPrice, formatArea } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "for-sale": "bg-primary text-primary-foreground",
  "for-rent": "bg-gold text-gold-foreground",
  "new-development": "bg-emerald-600 text-white",
  sold: "bg-muted-foreground text-background",
};

export function PropertyCard({ property, layout = "grid" }: { property: Property; layout?: "grid" | "list" }) {
  const { isFavorite, toggle } = useFavorites();
  const { inCompare, toggle: toggleCompare, count, max } = useCompare();
  const fav = isFavorite(property.id);
  const cmp = inCompare(property.id);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg",
        layout === "list" && "sm:flex",
      )}
    >
      <div className={cn("relative", layout === "list" ? "sm:w-72 sm:shrink-0" : "")}>
        <Link to="/properties/$slug" params={{ slug: property.slug }} aria-label={property.title}>
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={property.gallery[0]}
              alt={property.title}
              loading="lazy"
              width={640}
              height={480}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <Badge className={cn("absolute left-3 top-3", statusStyles[property.status])}>
          {statusLabels[property.status]}
        </Badge>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full bg-background/90 hover:bg-background"
            aria-label={cmp ? "Remove from compare" : "Add to compare"}
            aria-pressed={cmp}
            disabled={!cmp && count >= max}
            onClick={() => toggleCompare(property.id)}
          >
            <Scale className={cn("size-4", cmp && "text-gold")} aria-hidden="true" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full bg-background/90 hover:bg-background"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={fav}
            onClick={() => toggle(property.id)}
          >
            <Heart className={cn("size-4", fav && "fill-gold text-gold")} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-xl font-semibold text-primary">
            {formatPrice(property.price, property.status)}
          </p>
          <span className="text-xs text-muted-foreground">{typeLabels[property.type]}</span>
        </div>
        <h3 className="mt-1 line-clamp-1 font-display text-lg font-medium">
          <Link to="/properties/$slug" params={{ slug: property.slug }} className="hover:text-gold">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </p>
        <ul className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-foreground/80">
          <li className="flex items-center gap-1.5"><BedDouble className="size-4 text-gold" aria-hidden="true" />{property.beds} <span className="sr-only">bedrooms</span></li>
          <li className="flex items-center gap-1.5"><Bath className="size-4 text-gold" aria-hidden="true" />{property.baths} <span className="sr-only">bathrooms</span></li>
          <li className="flex items-center gap-1.5"><Maximize className="size-4 text-gold" aria-hidden="true" />{formatArea(property.area)}</li>
        </ul>
      </div>
    </article>
  );
}
