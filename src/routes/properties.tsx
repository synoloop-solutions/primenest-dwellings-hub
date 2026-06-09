import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { LayoutGrid, List, BookmarkPlus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters, emptyFilters, type FilterState } from "@/components/property-filters";
import { EmptyState } from "@/components/empty-state";
import { properties } from "@/data/properties";
import { useSavedSearches } from "@/hooks/use-saved-searches";
import { cn } from "@/lib/utils";

interface PropSearch {
  q?: string;
  status?: string;
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
}

export const Route = createFileRoute("/properties")({
  validateSearch: (search: Record<string, unknown>): PropSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    status: typeof search.status === "string" ? search.status : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
    city: typeof search.city === "string" ? search.city : undefined,
    minPrice: search.minPrice != null ? Number(search.minPrice) : undefined,
    maxPrice: search.maxPrice != null ? Number(search.maxPrice) : undefined,
    beds: search.beds != null ? Number(search.beds) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Properties for Sale & Rent — PrimeNest Realty" },
      { name: "description", content: "Search luxury homes, apartments, condos, and new developments. Filter by price, location, type, and bedrooms to find your perfect property." },
      { property: "og:title", content: "Browse Properties — PrimeNest Realty" },
      { property: "og:description", content: "Search and filter thousands of premium listings." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

const PAGE_SIZE = 9;
const cities = Array.from(new Set(properties.map((p) => p.city))).sort();

function PropertiesPage() {
  const search = Route.useSearch();
  const { add } = useSavedSearches();

  const [filters, setFilters] = useState<FilterState>({
    ...emptyFilters,
    q: search.q ?? "",
    status: search.status ?? "any",
    type: search.type ?? "any",
    city: search.city ?? "any",
    minPrice: search.minPrice != null ? String(search.minPrice) : "",
    maxPrice: search.maxPrice != null ? String(search.maxPrice) : "",
    beds: search.beds != null ? String(search.beds) : "any",
  });
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const update = (next: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...next }));
    setPage(1);
  };

  const filtered = useMemo(() => {
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const beds = filters.beds !== "any" ? Number(filters.beds) : 0;
    const q = filters.q.trim().toLowerCase();

    const list = properties.filter((p) => {
      if (filters.status !== "any" && p.status !== filters.status) return false;
      if (filters.type !== "any" && p.type !== filters.type) return false;
      if (filters.city !== "any" && p.city !== filters.city) return false;
      if (p.price < min || p.price > max) return false;
      if (p.beds < beds) return false;
      if (q && !(`${p.title} ${p.city} ${p.address}`.toLowerCase().includes(q))) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "popular") return b.popularity - a.popularity;
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
    return list;
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const saveSearch = () => {
    add({
      name: filters.q ? `"${filters.q}"` : "My property search",
      filters: {
        q: filters.q || undefined,
        status: filters.status !== "any" ? filters.status : undefined,
        type: filters.type !== "any" ? filters.type : undefined,
        city: filters.city !== "any" ? filters.city : undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        beds: filters.beds !== "any" ? Number(filters.beds) : undefined,
      },
    });
    toast.success("Search saved", { description: "Find it anytime on your Saved Searches page." });
  };

  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Listings" title="Find your property" />
        </div>
      </div>

      <div className="container-pn section-pad">
        <PropertyFilters values={filters} onChange={update} onReset={() => { setFilters(emptyFilters); setPage(1); }} cities={cities} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground">{filtered.length}</span> properties found
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={saveSearch}>
              <BookmarkPlus className="size-4" aria-hidden="true" /> Save search
            </Button>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40" aria-label="Sort by"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-md border border-border">
              <Button variant="ghost" size="icon" className={cn("rounded-r-none", view === "grid" && "bg-accent")} aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
                <LayoutGrid className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" className={cn("rounded-l-none", view === "list" && "bg-accent")} aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}>
                <List className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {pageItems.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={<Building2 className="size-7" aria-hidden="true" />}
              title="No properties match your filters"
              description="Try widening your price range or clearing some filters to see more results."
              action={<Button onClick={() => { setFilters(emptyFilters); setPage(1); }}>Clear filters</Button>}
            />
          </div>
        ) : (
          <div className={cn("mt-8", view === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-5")}>
            {pageItems.map((p) => <PropertyCard key={p.id} property={p} layout={view} />)}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="icon" className="size-9" aria-current={page === i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </nav>
        )}
      </div>
    </div>
  );
}
