import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Real Estate Blog & Insights — PrimeNest Realty" },
      { name: "description", content: "Expert advice on buying, selling, financing, and investing in real estate. Read the latest guides and market insights from PrimeNest Realty." },
      { property: "og:title", content: "Blog & Insights — PrimeNest Realty" },
      { property: "og:description", content: "Guides and insights for buyers, sellers, and investors." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const posts = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);

  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Insights" title="The PrimeNest blog" description="Practical advice and market knowledge to help you make confident decisions." />
        </div>
      </div>
      <div className="container-pn section-pad">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <Button
              key={c}
              role="tab"
              aria-selected={cat === c}
              variant={cat === c ? "default" : "outline"}
              size="sm"
              className={cn(cat === c && "bg-gold text-gold-foreground hover:bg-gold/90")}
              onClick={() => setCat(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  );
}
