import { Link } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/hooks/use-compare";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";

export function CompareBar() {
  const { ids, remove, clear, hydrated } = useCompare();
  if (!hydrated || ids.length === 0) return null;

  const items = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.2)] backdrop-blur">
      <div className="container-pn flex items-center gap-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Scale className="size-4 text-gold" aria-hidden="true" />
          <span className="hidden sm:inline">Compare</span>
          <span className="rounded-full bg-gold px-2 text-xs text-gold-foreground">{ids.length}</span>
        </div>
        <ul className="flex flex-1 gap-2 overflow-x-auto">
          {items.map((p) => p && (
            <li key={p.id} className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2 text-xs">
              <img src={p.gallery[0]} alt="" width={28} height={28} className="size-7 rounded-full object-cover" />
              <span className="max-w-28 truncate">{p.title}</span>
              <button onClick={() => remove(p.id)} aria-label={`Remove ${p.title} from compare`} className="text-muted-foreground hover:text-destructive">
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>Clear</Button>
          <Button asChild size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/compare">Compare</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
