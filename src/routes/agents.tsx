import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";
import { AgentCard } from "@/components/agent-card";
import { agents } from "@/data/agents";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Our Agents — PrimeNest Realty" },
      { name: "description", content: "Meet the PrimeNest Realty team of expert real estate agents specializing in luxury homes, rentals, new developments, and investment properties." },
      { property: "og:title", content: "Our Agents — PrimeNest Realty" },
      { property: "og:description", content: "Experienced agents ready to guide your next move." },
      { property: "og:url", content: "/agents" },
    ],
    links: [{ rel: "canonical", href: "/agents" }],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="The team" title="Meet our agents" description="A dedicated group of professionals with deep local knowledge and a passion for service." />
        </div>
      </div>
      <div className="container-pn section-pad">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      </div>
    </div>
  );
}
