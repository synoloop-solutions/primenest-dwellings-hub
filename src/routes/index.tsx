import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, ShieldCheck, TrendingUp, Users, Home as HomeIcon, ArrowRight, Building2, KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { AgentCard } from "@/components/agent-card";
import { BlogCard } from "@/components/blog-card";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { featuredProperties, statusLabels } from "@/data/properties";
import { agents } from "@/data/agents";
import { blogPosts } from "@/data/blog";
import type { PropertyStatus } from "@/data/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PrimeNest Realty — Find a Place You'll Love to Call Home" },
      { name: "description", content: "Discover luxury homes, apartments, and new developments. Search thousands of listings, connect with expert agents, and calculate your mortgage with PrimeNest Realty." },
      { property: "og:title", content: "PrimeNest Realty — Find Your Next Home" },
      { property: "og:description", content: "Luxury listings, expert agents, and powerful property search tools." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const categories = [
  { status: "for-sale" as PropertyStatus, label: "For Sale", icon: HomeIcon },
  { status: "for-rent" as PropertyStatus, label: "For Rent", icon: KeyRound },
  { status: "new-development" as PropertyStatus, label: "New Developments", icon: Building2 },
];

const whyUs = [
  { icon: ShieldCheck, title: "Trusted Expertise", desc: "Over 1,500 successful transactions with a 98% client satisfaction rate." },
  { icon: TrendingUp, title: "Market Intelligence", desc: "Data-driven pricing and negotiation that protects your bottom line." },
  { icon: Users, title: "Dedicated Agents", desc: "A personal advisor by your side from first viewing to closing day." },
  { icon: Sparkles, title: "White-Glove Service", desc: "Premium marketing, staging guidance, and concierge support throughout." },
];

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("any");

  const runSearch = () => {
    navigate({ to: "/properties", search: { q: q || undefined, status: status !== "any" ? status : undefined } as never });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=70"
            alt=""
            fetchPriority="high"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="container-pn flex min-h-[78vh] flex-col justify-center py-20 text-primary-foreground">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">PrimeNest Realty</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Find a place you'll love to call home
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
            Browse curated luxury homes, apartments, and new developments across the Bay Area —
            backed by agents who put your goals first.
          </p>

          <div className="mt-8 w-full max-w-3xl rounded-2xl bg-background/95 p-4 text-foreground shadow-2xl backdrop-blur sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Label htmlFor="hero-q" className="sr-only">Search location or keyword</Label>
                <Input
                  id="hero-q"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runSearch()}
                  placeholder="City, address or keyword"
                  className="h-12 pl-9"
                />
              </div>
              <div>
                <Label htmlFor="hero-status" className="sr-only">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="hero-status" className="h-12 sm:w-44"><SelectValue placeholder="Any status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any status</SelectItem>
                    {(Object.keys(statusLabels) as PropertyStatus[]).map((s) => (
                      <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={runSearch} className="h-12 bg-gold text-gold-foreground hover:bg-gold/90">
                <Search className="size-4" aria-hidden="true" /> Search
              </Button>
            </div>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[["1,500+", "Homes sold"], ["24", "Active listings"], ["6", "Expert agents"], ["98%", "Happy clients"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-bold text-gold">{n}</dt>
                <dd className="text-sm text-primary-foreground/75">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Categories */}
      <section className="container-pn relative z-10 -mt-10 grid gap-4 sm:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.status}
            to="/properties"
            search={{ status: c.status } as never}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg"
          >
            <span className="grid size-12 place-items-center rounded-lg bg-accent text-gold">
              <c.icon className="size-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold">{c.label}</p>
              <p className="text-sm text-muted-foreground">Explore listings</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ))}
      </section>

      {/* Featured */}
      <section className="container-pn section-pad">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Handpicked" title="Featured properties" description="A selection of our finest homes currently on the market." />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/properties">View all <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 6).map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline"><Link to="/properties">View all listings</Link></Button>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary">
        <div className="container-pn section-pad">
          <SectionHeading align="center" eyebrow="Why PrimeNest" title="The difference is in the details" description="We combine local expertise, market data, and genuine care to deliver results." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-xl bg-card p-6 text-center shadow-sm">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-gold">
                  <w.icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage preview */}
      <section className="container-pn section-pad">
        <SectionHeading align="center" eyebrow="Plan with confidence" title="Estimate your monthly payment" description="Use our mortgage calculator to understand what you can afford before you fall in love with a home." />
        <div className="mt-10">
          <MortgageCalculator />
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline"><Link to="/mortgage-calculator">Open full calculator</Link></Button>
        </div>
      </section>

      {/* Agents */}
      <section className="bg-secondary">
        <div className="container-pn section-pad">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Meet the team" title="Agents you can trust" />
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/agents">All agents <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.slice(0, 4).map((a) => <AgentCard key={a.id} agent={a} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-pn section-pad">
        <SectionHeading align="center" eyebrow="Client stories" title="Loved by buyers and sellers" />
        <div className="mt-12"><TestimonialCarousel /></div>
      </section>

      {/* Blog */}
      <section className="bg-secondary">
        <div className="container-pn section-pad">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" title="From our blog" />
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/blog">All articles <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => <BlogCard key={p.id} post={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pn py-16">
        <div className="overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to find your dream home?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Speak with a PrimeNest advisor today and let's start your search together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/properties">Browse listings</Link></Button>
            <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Contact us</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
