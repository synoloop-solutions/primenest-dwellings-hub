import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Bookmark, Heart, Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SavedSearchCard } from "@/components/saved-search-card";
import { PropertyCard } from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { useSavedSearches } from "@/hooks/use-saved-searches";
import { useFavorites } from "@/hooks/use-favorites";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/saved-searches")({
  head: () => ({
    meta: [
      { title: "Saved Searches & Favorites — PrimeNest Realty" },
      { name: "description", content: "Review your saved property searches and favorite listings. Re-run a search or pick up where you left off." },
      { property: "og:title", content: "Saved Searches & Favorites — PrimeNest Realty" },
      { property: "og:description", content: "Your saved searches and favorite properties in one place." },
      { property: "og:url", content: "/saved-searches" },
    ],
    links: [{ rel: "canonical", href: "/saved-searches" }],
  }),
  component: SavedSearchesPage,
});

function SavedSearchesPage() {
  const { searches, remove, hydrated } = useSavedSearches();
  const { ids: favIds, hydrated: favHydrated } = useFavorites();
  const favorites = favIds.map((id) => properties.find((p) => p.id === id)).filter(Boolean);

  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Your activity" title="Saved searches & favorites" description="Everything you've saved, ready when you are." />
        </div>
      </div>

      <div className="container-pn section-pad space-y-16">
        <section aria-labelledby="ss-h">
          <h2 id="ss-h" className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Bookmark className="size-5 text-gold" aria-hidden="true" /> Saved searches
          </h2>
          <div className="mt-6">
            {!hydrated ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : searches.length === 0 ? (
              <EmptyState
                icon={<Search className="size-7" aria-hidden="true" />}
                title="No saved searches yet"
                description="Run a property search and tap 'Save search' to store your filters here for quick access."
                action={<Button asChild><Link to="/properties">Start searching</Link></Button>}
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {searches.map((s) => (
                  <SavedSearchCard
                    key={s.id}
                    search={s}
                    onDelete={() => { remove(s.id); toast.success("Saved search removed"); }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="favorites" aria-labelledby="fav-h" className="scroll-mt-24">
          <h2 id="fav-h" className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Heart className="size-5 text-gold" aria-hidden="true" /> Favorite properties
          </h2>
          <div className="mt-6">
            {!favHydrated ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
              </div>
            ) : favorites.length === 0 ? (
              <EmptyState
                icon={<Heart className="size-7" aria-hidden="true" />}
                title="No favorites yet"
                description="Tap the heart on any listing to save it here for later."
                action={<Button asChild><Link to="/properties">Browse properties</Link></Button>}
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((p) => p && <PropertyCard key={p.id} property={p} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
