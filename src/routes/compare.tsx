import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, X, Check, Minus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompare } from "@/hooks/use-compare";
import { properties, statusLabels, typeLabels } from "@/data/properties";
import { formatPrice, formatArea } from "@/lib/format";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Properties — PrimeNest Realty" },
      { name: "description", content: "Compare up to four properties side by side: price, bedrooms, bathrooms, area, parking, and amenities." },
      { property: "og:title", content: "Compare Properties — PrimeNest Realty" },
      { property: "og:description", content: "Side-by-side property comparison." },
      { property: "og:url", content: "/compare" },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids, remove, clear, hydrated } = useCompare();
  const items = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean);

  const allAmenities = Array.from(new Set(items.flatMap((p) => p!.amenities)));

  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn flex flex-wrap items-end justify-between gap-4 py-10">
          <SectionHeading eyebrow="Side by side" title="Compare properties" description="Weigh up the details before you decide." />
          {items.length > 0 && <Button variant="outline" onClick={clear}>Clear all</Button>}
        </div>
      </div>

      <div className="container-pn section-pad">
        {hydrated && items.length === 0 ? (
          <EmptyState
            icon={<Scale className="size-7" aria-hidden="true" />}
            title="Nothing to compare yet"
            description="Add properties using the compare icon on any listing — you can compare up to four at once."
            action={<Button asChild><Link to="/properties">Browse properties</Link></Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">Property comparison</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-40 p-3 text-left align-bottom text-sm font-medium text-muted-foreground">Property</th>
                  {items.map((p) => p && (
                    <th key={p.id} scope="col" className="p-3 align-top">
                      <div className="relative rounded-xl border border-border bg-card p-3 text-left">
                        <button onClick={() => remove(p.id)} aria-label={`Remove ${p.title}`} className="absolute right-2 top-2 text-muted-foreground hover:text-destructive">
                          <X className="size-4" aria-hidden="true" />
                        </button>
                        <Link to="/properties/$slug" params={{ slug: p.slug }}>
                          <img src={p.gallery[0]} alt={p.title} width={240} height={150} className="aspect-[8/5] w-full rounded-lg object-cover" />
                          <p className="mt-2 line-clamp-1 font-display font-semibold hover:text-gold">{p.title}</p>
                        </Link>
                        <Badge className="mt-1">{statusLabels[p.status]}</Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {([
                  ["Price", (p: typeof items[number]) => p && formatPrice(p.price, p.status)],
                  ["Type", (p: typeof items[number]) => p && typeLabels[p.type]],
                  ["Location", (p: typeof items[number]) => p && `${p.address}, ${p.city}`],
                  ["Bedrooms", (p: typeof items[number]) => p && String(p.beds)],
                  ["Bathrooms", (p: typeof items[number]) => p && String(p.baths)],
                  ["Area", (p: typeof items[number]) => p && formatArea(p.area)],
                  ["Parking", (p: typeof items[number]) => p && `${p.parking} spaces`],
                  ["Year built", (p: typeof items[number]) => p && String(p.yearBuilt)],
                  ["Furnished", (p: typeof items[number]) => p && (p.furnished ? "Yes" : "No")],
                ] as const).map(([label, fn], i) => (
                  <tr key={label} className={i % 2 ? "bg-secondary/50" : ""}>
                    <th scope="row" className="p-3 text-left font-medium">{label}</th>
                    {items.map((p) => p && <td key={p.id} className="p-3">{fn(p)}</td>)}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-3 text-left align-top font-medium">Amenities</th>
                  {items.map((p) => p && (
                    <td key={p.id} className="p-3 align-top">
                      <ul className="space-y-1.5">
                        {allAmenities.map((a) => (
                          <li key={a} className="flex items-center gap-2">
                            {p.amenities.includes(a)
                              ? <Check className="size-4 shrink-0 text-gold" aria-hidden="true" />
                              : <Minus className="size-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />}
                            <span className={p.amenities.includes(a) ? "" : "text-muted-foreground/50"}>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3" />
                  {items.map((p) => p && (
                    <td key={p.id} className="p-3">
                      <Button asChild size="sm" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                        <Link to="/properties/$slug" params={{ slug: p.slug }}>View details</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
