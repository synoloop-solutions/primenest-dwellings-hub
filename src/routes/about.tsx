import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, TrendingUp, Target, Award } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Button } from "@/components/ui/button";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/agent-card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PrimeNest Realty" },
      { name: "description", content: "Learn about PrimeNest Realty — our mission, values, and the dedicated team helping clients buy, sell, and invest in real estate across the Bay Area." },
      { property: "og:title", content: "About PrimeNest Realty" },
      { property: "og:description", content: "Our mission, values, and the team behind PrimeNest Realty." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Client first", desc: "Your goals drive every decision we make." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest advice, transparent process, no surprises." },
  { icon: TrendingUp, title: "Excellence", desc: "We hold ourselves to the highest standards in the industry." },
  { icon: Target, title: "Results", desc: "We measure success by the outcomes we deliver for you." },
];

function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="container-pn grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">About us</p>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Helping you find home since 2008</h1>
            <p className="mt-5 text-primary-foreground/85">
              PrimeNest Realty was founded on a simple belief: buying or selling a home should feel
              exciting, not stressful. Nearly two decades later, we've helped thousands of families,
              investors, and first-time buyers find exactly the right place — backed by data, driven by care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/properties">Browse listings</Link></Button>
              <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Get in touch</Link></Button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=70"
            alt="The PrimeNest Realty team in their office"
            width={700}
            height={500}
            className="aspect-[7/5] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="container-pn section-pad">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[["1,500+", "Homes sold"], ["$2.4B", "In transactions"], ["18", "Years of service"], ["98%", "Client satisfaction"]].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="font-display text-3xl font-bold text-gold">{n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-pn section-pad">
          <SectionHeading align="center" eyebrow="What drives us" title="Our values" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-card p-6 text-center shadow-sm">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-gold"><v.icon className="size-7" aria-hidden="true" /></span>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pn section-pad">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Our people" title="Meet the team" />
          <Button asChild variant="outline" className="hidden sm:inline-flex"><Link to="/agents">All agents</Link></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.slice(0, 4).map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-pn section-pad">
          <SectionHeading align="center" eyebrow="Client stories" title="What our clients say" />
          <div className="mt-12"><TestimonialCarousel /></div>
        </div>
      </section>

      <section className="container-pn py-16">
        <div className="flex flex-col items-center rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground">
          <Award className="size-10 text-gold" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl font-bold">Let's find your next home together</h2>
          <p className="mt-3 max-w-xl text-primary-foreground/80">Whether you're buying, selling, or investing, our team is ready to help.</p>
          <Button asChild className="mt-8 bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/contact">Start the conversation</Link></Button>
        </div>
      </section>
    </div>
  );
}

void Users;
