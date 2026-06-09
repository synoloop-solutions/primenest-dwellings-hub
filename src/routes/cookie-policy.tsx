import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — PrimeNest Realty" },
      { name: "description", content: "Learn how PrimeNest Realty uses cookies and how you can manage your preferences." },
      { property: "og:title", content: "Cookie Policy — PrimeNest Realty" },
      { property: "og:description", content: "How we use cookies and how to manage them." },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => (
    <LegalLayout title="Cookie Policy" updated="June 1, 2026">
      <p>This policy explains how we use cookies and similar technologies to recognize you when you visit our website.</p>
      <h2>What are cookies?</h2>
      <p>Cookies are small data files placed on your device. They help the site function and provide reporting information.</p>
      <h2>Types of cookies we use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for the site to function.</li>
        <li><strong>Analytics</strong> — help us understand how visitors use the site.</li>
        <li><strong>Marketing</strong> — used to personalize property recommendations.</li>
      </ul>
      <h2>Managing preferences</h2>
      <p>You can adjust your cookie preferences at any time using the consent banner shown on your first visit, or by clearing your browser storage.</p>
    </LegalLayout>
  ),
});
