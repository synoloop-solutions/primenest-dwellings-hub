import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PrimeNest Realty" },
      { name: "description", content: "How PrimeNest Realty collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — PrimeNest Realty" },
      { property: "og:description", content: "How we handle and protect your personal data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="June 1, 2026">
      <p>
        PrimeNest Realty ("we", "us") respects your privacy. This policy explains what information we
        collect, how we use it, and the choices you have. This is a demonstration website and no data
        you submit is transmitted to a server — form entries are stored only in your browser.
      </p>
      <h2>Information we collect</h2>
      <p>When you use our tools, you may provide your name, email, phone number, and property preferences. We also store favorites, saved searches, and viewing requests locally in your browser.</p>
      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and schedule property viewings</li>
        <li>To personalize property recommendations</li>
        <li>To send newsletters when you opt in</li>
      </ul>
      <h2>Your rights</h2>
      <p>You may clear your locally stored data at any time by clearing your browser storage. For questions, contact us at hello@primenest.com.</p>
      <h2>Cookies</h2>
      <p>We use cookies to improve your experience. See our Cookie Policy for details and to manage your preferences.</p>
    </LegalLayout>
  ),
});
