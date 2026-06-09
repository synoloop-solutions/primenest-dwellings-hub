import { useEffect } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  BedDouble, Bath, Maximize, Car, Calendar, Sofa, CheckCircle2,
  MapPin, CalendarCheck, Heart, Scale, ChevronRight, Phone, Mail,
} from "lucide-react";
import { getProperty, properties, statusLabels, typeLabels } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { formatPrice, formatArea, formatNumber, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/image-gallery";
import { MapPlaceholder } from "@/components/map-placeholder";
import { NeighborhoodSection } from "@/components/neighborhood-section";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { MortgagePreQualForm } from "@/components/mortgage-prequal-form";
import { ScheduleViewingDialog } from "@/components/schedule-viewing-dialog";
import { ContactAgentForm } from "@/components/contact-agent-form";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — ${formatPrice(p.price, p.status)} | PrimeNest Realty` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: p.title },
        { property: "og:description", content: `${statusLabels[p.status]} · ${p.beds} bed · ${p.baths} bath · ${formatArea(p.area)}` },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/properties/${p.slug}` },
        { property: "og:image", content: p.gallery[0] },
        { property: "twitter:image", content: p.gallery[0] },
      ],
      links: [{ rel: "canonical", href: `/properties/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: p.title,
            description: p.description,
            image: p.gallery,
            address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city },
            offers: { "@type": "Offer", price: p.price, priceCurrency: "USD" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Properties", item: "/properties" },
              { "@type": "ListItem", position: 3, name: p.title, item: `/properties/${p.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="container-pn py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Property not found</h1>
      <p className="mt-3 text-muted-foreground">This listing may have been sold or removed.</p>
      <Button asChild className="mt-6"><Link to="/properties">Browse all properties</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="container-pn py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
      </div>
    );
  },
});

function Stat({ icon: Icon, label, value }: { icon: typeof BedDouble; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
      <span className="grid size-10 place-items-center rounded-lg bg-accent text-gold"><Icon className="size-5" aria-hidden="true" /></span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function PropertyDetail() {
  const { property } = Route.useLoaderData() as { property: Property };
  const agent = getAgent(property.agentId)!;
  const { isFavorite, toggle } = useFavorites();
  const { inCompare, toggle: toggleCompare, count, max } = useCompare();
  const { add: addRecent, ids: recentIds } = useRecentlyViewed();

  useEffect(() => { addRecent(property.id); }, [property.id, addRecent]);

  const fav = isFavorite(property.id);
  const cmp = inCompare(property.id);

  const related = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);
  const recent = recentIds
    .filter((id) => id !== property.id)
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div>
      <div className="container-pn pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to="/properties" className="hover:text-foreground">Properties</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="text-foreground">{property.title}</span>
        </nav>
      </div>

      <div className="container-pn py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground">{statusLabels[property.status]}</Badge>
              <span className="text-sm text-muted-foreground">{typeLabels[property.type]}</span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />{property.address}, {property.city}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{formatPrice(property.price, property.status)}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" aria-pressed={fav} onClick={() => toggle(property.id)}>
                <Heart className={cn("size-4", fav && "fill-gold text-gold")} aria-hidden="true" /> Save
              </Button>
              <Button variant="outline" size="sm" aria-pressed={cmp} disabled={!cmp && count >= max} onClick={() => toggleCompare(property.id)}>
                <Scale className={cn("size-4", cmp && "text-gold")} aria-hidden="true" /> Compare
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6"><ImageGallery images={property.gallery} title={property.title} /></div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat icon={BedDouble} label="Bedrooms" value={String(property.beds)} />
              <Stat icon={Bath} label="Bathrooms" value={String(property.baths)} />
              <Stat icon={Maximize} label="Area" value={formatArea(property.area)} />
              <Stat icon={Car} label="Parking" value={`${property.parking} spaces`} />
              <Stat icon={Calendar} label="Year built" value={String(property.yearBuilt)} />
              <Stat icon={Sofa} label="Furnished" value={property.furnished ? "Yes" : "No"} />
            </div>

            <section aria-labelledby="overview-h">
              <h2 id="overview-h" className="font-display text-2xl font-semibold">Overview</h2>
              <p className="mt-4 leading-relaxed text-foreground/85">{property.description}</p>
            </section>

            <section aria-labelledby="amenities-h">
              <h2 id="amenities-h" className="font-display text-2xl font-semibold">Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-gold" aria-hidden="true" />{a}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="floor-h">
              <h2 id="floor-h" className="font-display text-2xl font-semibold">Floor plans</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {property.floorPlans.map((fp) => (
                  <figure key={fp.name} className="overflow-hidden rounded-xl border border-border bg-card">
                    <img src={fp.image} alt={`${fp.name} floor plan`} loading="lazy" width={600} height={400} className="aspect-[3/2] w-full object-cover" />
                    <figcaption className="flex items-center justify-between p-4 text-sm">
                      <span className="font-medium">{fp.name}</span>
                      <span className="text-muted-foreground">{formatArea(fp.area)}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section aria-labelledby="neighborhood-h">
              <h2 id="neighborhood-h" className="font-display text-2xl font-semibold">Neighborhood</h2>
              <p className="mt-2 text-sm text-muted-foreground">What's nearby this property.</p>
              <div className="mt-5"><NeighborhoodSection neighborhood={property.neighborhood} /></div>
            </section>

            <section aria-labelledby="location-h">
              <h2 id="location-h" className="font-display text-2xl font-semibold">Location</h2>
              <div className="mt-4"><MapPlaceholder address={property.address} city={property.city} /></div>
            </section>

            <section aria-labelledby="mortgage-h">
              <h2 id="mortgage-h" className="font-display text-2xl font-semibold">Mortgage estimate</h2>
              <div className="mt-4"><MortgageCalculator initialPrice={property.price} /></div>
              <div className="mt-6"><MortgagePreQualForm defaultAmount={Math.round(property.price * 0.8)} /></div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={agent.photo} alt={agent.name} width={56} height={56} className="size-14 rounded-full object-cover" />
                <div>
                  <p className="font-display font-semibold">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild variant="outline" className="flex-1"><a href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}><Phone className="size-4" aria-hidden="true" /> Call</a></Button>
                <Button asChild variant="outline" className="flex-1"><a href={`mailto:${agent.email}`}><Mail className="size-4" aria-hidden="true" /> Email</a></Button>
              </div>
              <ScheduleViewingDialog
                property={property}
                trigger={
                  <Button className="mt-3 w-full bg-gold text-gold-foreground hover:bg-gold/90">
                    <CalendarCheck className="size-4" aria-hidden="true" /> Schedule a viewing
                  </Button>
                }
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold">Request information</h2>
              <p className="mt-1 text-sm text-muted-foreground">Send a message to {agent.name}.</p>
              <div className="mt-4"><ContactAgentForm agent={agent} propertyTitle={property.title} /></div>
            </div>

            <p className="px-1 text-xs text-muted-foreground">Listed {formatDate(property.createdAt)} · Ref #{property.id.toUpperCase()}</p>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="section-pad" aria-labelledby="related-h">
            <SectionHeading eyebrow="You may also like" title="Similar properties" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}

        {recent.length > 0 && (
          <section className="pb-16" aria-labelledby="recent-h">
            <SectionHeading eyebrow="Recently viewed" title="Pick up where you left off" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => p && <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
