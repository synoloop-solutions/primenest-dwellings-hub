import { createFileRoute } from "@tanstack/react-router";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { blogPosts } from "@/data/blog";

const staticPaths = [
  "/", "/properties", "/agents", "/blog", "/about", "/contact",
  "/mortgage-calculator", "/saved-searches", "/compare",
  "/privacy", "/terms", "/cookie-policy", "/accessibility",
];

function buildSitemap() {
  const urls = [
    ...staticPaths,
    ...properties.map((p) => `/properties/${p.slug}`),
    ...agents.map((a) => `/agents/${a.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
  ];
  const body = urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml" },
        }),
    },
  },
});
