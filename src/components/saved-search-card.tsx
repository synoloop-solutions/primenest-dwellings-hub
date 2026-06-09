import { Link } from "@tanstack/react-router";
import { Search, Trash2, MapPin, Home, Tag } from "lucide-react";
import type { SavedSearch } from "@/hooks/use-saved-searches";
import { statusLabels, typeLabels } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { PropertyStatus, PropertyType } from "@/data/types";

export function SavedSearchCard({ search, onDelete }: { search: SavedSearch; onDelete: () => void }) {
  const f = search.filters;
  const chips: { icon: typeof Tag; label: string }[] = [];
  if (f.q) chips.push({ icon: Search, label: `"${f.q}"` });
  if (f.status) chips.push({ icon: Tag, label: statusLabels[f.status as PropertyStatus] ?? f.status });
  if (f.type) chips.push({ icon: Home, label: typeLabels[f.type as PropertyType] ?? f.type });
  if (f.city) chips.push({ icon: MapPin, label: f.city });
  if (f.beds) chips.push({ icon: Home, label: `${f.beds}+ beds` });
  if (f.minPrice || f.maxPrice)
    chips.push({ icon: Tag, label: `$${(f.minPrice ?? 0).toLocaleString()}–${f.maxPrice ? f.maxPrice.toLocaleString() : "∞"}` });

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{search.name}</h3>
          <p className="text-xs text-muted-foreground">Saved {formatDate(search.createdAt)}</p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Delete saved search" onClick={onDelete}>
          <Trash2 className="size-4 text-muted-foreground hover:text-destructive" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.length ? (
          chips.map((c, i) => (
            <Badge key={i} variant="secondary" className="gap-1">
              <c.icon className="size-3" aria-hidden="true" />{c.label}
            </Badge>
          ))
        ) : (
          <Badge variant="secondary">All properties</Badge>
        )}
      </div>
      <Button asChild className="mt-5 w-full bg-gold text-gold-foreground hover:bg-gold/90">
        <Link to="/properties" search={f as never}>
          <Search className="size-4" aria-hidden="true" /> Re-run search
        </Link>
      </Button>
    </article>
  );
}
