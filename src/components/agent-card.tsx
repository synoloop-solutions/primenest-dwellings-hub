import { Link } from "@tanstack/react-router";
import { Star, Phone, Mail } from "lucide-react";
import type { Agent } from "@/data/types";
import { Button } from "@/components/ui/button";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card text-center shadow-sm transition-shadow hover:shadow-lg">
      <Link to="/agents/$slug" params={{ slug: agent.slug }}>
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={agent.photo}
            alt={agent.name}
            loading="lazy"
            width={400}
            height={500}
            className="size-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">
          <Link to="/agents/$slug" params={{ slug: agent.slug }} className="hover:text-gold">
            {agent.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{agent.title}</p>
        <p className="mt-2 flex items-center justify-center gap-1 text-sm">
          <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
          <span className="font-medium">{agent.rating}</span>
          <span className="text-muted-foreground">· {agent.deals} deals</span>
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button asChild size="icon" variant="outline" aria-label={`Call ${agent.name}`}>
            <a href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}><Phone className="size-4" aria-hidden="true" /></a>
          </Button>
          <Button asChild size="icon" variant="outline" aria-label={`Email ${agent.name}`}>
            <a href={`mailto:${agent.email}`}><Mail className="size-4" aria-hidden="true" /></a>
          </Button>
        </div>
      </div>
    </article>
  );
}
