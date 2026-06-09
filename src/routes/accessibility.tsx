import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — PrimeNest Realty" },
      { name: "description", content: "Our commitment to making the PrimeNest Realty website accessible to everyone, including people with disabilities." },
      { property: "og:title", content: "Accessibility Statement — PrimeNest Realty" },
      { property: "og:description", content: "Our commitment to an accessible, inclusive website." },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <LegalLayout title="Accessibility Statement" updated="June 1, 2026">
      <p>PrimeNest Realty is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>
      <h2>Conformance status</h2>
      <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. This includes sufficient color contrast, keyboard navigation, descriptive labels, and semantic structure.</p>
      <h2>Measures we take</h2>
      <ul>
        <li>Semantic HTML with clear heading structure and landmarks</li>
        <li>Keyboard-accessible navigation and interactive elements</li>
        <li>Descriptive alternative text for meaningful images</li>
        <li>Visible focus indicators and accessible form labels</li>
      </ul>
      <h2>Feedback</h2>
      <p>If you encounter any accessibility barriers, please contact us at hello@primenest.com so we can address them.</p>
    </LegalLayout>
  ),
});
