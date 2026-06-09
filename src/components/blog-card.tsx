import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <Link to="/blog/$slug" params={{ slug: post.slug }}>
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            width={640}
            height={400}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit">{post.category}</Badge>
        <h3 className="mt-3 line-clamp-2 font-display text-lg font-semibold">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-gold">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{post.readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
