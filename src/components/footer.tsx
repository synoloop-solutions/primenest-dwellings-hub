import { Link } from "@tanstack/react-router";
import { Home, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { COMPANY } from "@/data/offices";
import { NewsletterForm } from "./newsletter-form";

const cols = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/agents", label: "Our Agents" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Properties",
    links: [
      { to: "/properties", label: "All Listings" },
      { to: "/compare", label: "Compare Properties" },
      { to: "/saved-searches", label: "Saved Searches" },
      { to: "/mortgage-calculator", label: "Mortgage Calculator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/cookie-policy", label: "Cookie Policy" },
      { to: "/accessibility", label: "Accessibility" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-pn grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="grid size-8 place-items-center rounded-md bg-gold text-gold-foreground">
              <Home className="size-4" aria-hidden="true" />
            </span>
            {COMPANY.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            {COMPANY.tagline}. PrimeNest Realty helps buyers, sellers, and investors make confident
            real estate decisions across the Bay Area.
          </p>
          <div className="mt-6 max-w-sm">
            <p className="mb-2 text-sm font-medium">Get new listings in your inbox</p>
            <NewsletterForm variant="footer" />
          </div>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-pn flex flex-col items-center justify-between gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>{COMPANY.address}</p>
        </div>
      </div>
    </footer>
  );
}
