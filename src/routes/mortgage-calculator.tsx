import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { MortgagePreQualForm } from "@/components/mortgage-prequal-form";

export const Route = createFileRoute("/mortgage-calculator")({
  head: () => ({
    meta: [
      { title: "Mortgage Calculator — PrimeNest Realty" },
      { name: "description", content: "Estimate your monthly mortgage payment including principal, interest, property tax, and insurance. Then book a free consultation to get pre-qualified." },
      { property: "og:title", content: "Mortgage Calculator — PrimeNest Realty" },
      { property: "og:description", content: "Calculate your monthly payment and get pre-qualified." },
      { property: "og:url", content: "/mortgage-calculator" },
    ],
    links: [{ rel: "canonical", href: "/mortgage-calculator" }],
  }),
  component: MortgagePage,
});

function MortgagePage() {
  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Plan ahead" title="Mortgage calculator" description="Understand your monthly costs and what you can comfortably afford." />
        </div>
      </div>
      <div className="container-pn section-pad space-y-8">
        <MortgageCalculator />
        <MortgagePreQualForm />
      </div>
    </div>
  );
}
