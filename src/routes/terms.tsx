import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — PrimeNest Realty" },
      { name: "description", content: "The terms and conditions governing your use of the PrimeNest Realty website." },
      { property: "og:title", content: "Terms of Service — PrimeNest Realty" },
      { property: "og:description", content: "Terms and conditions for using our website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms of Service" updated="June 1, 2026">
      <p>By accessing this website, you agree to these terms. This is a demonstration website created to showcase a real estate platform; listings, agents, and data are fictional.</p>
      <h2>Use of the site</h2>
      <p>You agree to use the site lawfully and not to misuse any tools or content provided. Property information is illustrative and should not be relied upon for actual transactions.</p>
      <h2>Intellectual property</h2>
      <p>All branding, design, and content are provided for demonstration purposes. Photography is sourced from third-party stock providers and remains the property of their respective owners.</p>
      <h2>Limitation of liability</h2>
      <p>The site is provided "as is" without warranties of any kind. We are not liable for any decisions made based on demonstration content.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to hello@primenest.com.</p>
    </LegalLayout>
  ),
});
