import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Star, Phone, Mail, Award, Briefcase, ChevronRight } from "lucide-react";
import type { Agent } from "@/data/types";
import { getAgentBySlug } from "@/data/agents";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { ContactAgentForm } from "@/components/contact-agent-form";

export const Route = createFileRoute("/agents/$slug")({
  loader: ({ params }) => {
    const agent = getAgentBySlug(params.slug);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.agent;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.name} — ${a.title} | PrimeNest Realty` },
        { name: "description", content: a.bio.slice(0, 155) },
        { property: "og:title", content: `${a.name} — PrimeNest Realty` },
        { property: "og:description", content: a.title },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/agents/${a.slug}` },
        { property: "og:image", content: a.photo },
      ],
      links: [{ rel: "canonical", href: `/agents/${a.slug}` }],
    };
  },
  component: AgentDetail,
  notFoundComponent: () => (
    <div className="container-pn py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Agent not found</h1>
      <Button asChild className="mt-6"><Link to="/agents">View all agents</Link></Button>
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

function AgentDetail() {
  const { agent } = Route.useLoaderData() as { agent: Agent };
  const listings = properties.filter((p) => p.agentId === agent.id).slice(0, 6);

  return (
    <div>
      <div className="container-pn pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to="/agents" className="hover:text-foreground">Agents</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="text-foreground">{agent.name}</span>
        </nav>
      </div>

      <div className="container-pn py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <img src={agent.photo} alt={agent.name} width={200} height={250} className="aspect-[4/5] w-44 shrink-0 rounded-xl object-cover" />
              <div>
                <h1 className="font-display text-3xl font-bold">{agent.name}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{agent.title}</p>
                <p className="mt-3 flex items-center gap-1.5">
                  <Star className="size-5 fill-gold text-gold" aria-hidden="true" />
                  <span className="font-semibold">{agent.rating}</span>
                  <span className="text-muted-foreground">· {agent.deals} closed deals</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.specialties.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>
                <div className="mt-5 flex gap-2">
                  <Button asChild variant="outline"><a href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}><Phone className="size-4" aria-hidden="true" /> Call</a></Button>
                  <Button asChild variant="outline"><a href={`mailto:${agent.email}`}><Mail className="size-4" aria-hidden="true" /> Email</a></Button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <Briefcase className="size-5 text-gold" aria-hidden="true" />
                <p className="mt-2 font-display text-2xl font-bold">{agent.experience} yrs</p>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Award className="size-5 text-gold" aria-hidden="true" />
                <p className="mt-2 font-display text-2xl font-bold">{agent.deals}</p>
                <p className="text-sm text-muted-foreground">Deals closed</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Star className="size-5 text-gold" aria-hidden="true" />
                <p className="mt-2 font-display text-2xl font-bold">{agent.rating}</p>
                <p className="text-sm text-muted-foreground">Avg. rating</p>
              </div>
            </div>

            <section className="mt-8" aria-labelledby="about-agent">
              <h2 id="about-agent" className="font-display text-2xl font-semibold">About {agent.name.split(" ")[0]}</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{agent.bio}</p>
            </section>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold">Get in touch</h2>
              <p className="mt-1 text-sm text-muted-foreground">Send {agent.name.split(" ")[0]} a message.</p>
              <div className="mt-4"><ContactAgentForm agent={agent} /></div>
            </div>
          </aside>
        </div>

        {listings.length > 0 && (
          <section className="section-pad" aria-labelledby="agent-listings">
            <SectionHeading eyebrow="Portfolio" title={`${agent.name.split(" ")[0]}'s listings`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
