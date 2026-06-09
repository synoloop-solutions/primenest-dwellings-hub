import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Clock, ChevronRight, User } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { getPost, blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { SectionHeading } from "@/components/section-heading";
import { NewsletterForm } from "@/components/newsletter-form";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — PrimeNest Realty Blog` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
        { property: "og:image", content: p.cover },
        { property: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            image: p.cover,
            datePublished: p.date,
            author: { "@type": "Person", name: p.author },
            publisher: { "@type": "Organization", name: "PrimeNest Realty" },
          }),
        },
      ],
    };
  },
  component: BlogDetail,
  notFoundComponent: () => (
    <div className="container-pn py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="container-pn py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
      </div>
    );
  },
});

function BlogDetail() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const fallback = related.length ? related : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <div>
      <div className="container-pn pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="line-clamp-1 text-foreground">{post.title}</span>
        </nav>
      </div>

      <article className="container-pn py-8">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><User className="size-4" aria-hidden="true" />{post.author}</span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4" aria-hidden="true" />{post.readTime} min read</span>
          </div>
        </div>

        <img src={post.cover} alt={post.title} width={1200} height={600} className="mx-auto mt-8 aspect-[2/1] w-full max-w-4xl rounded-2xl object-cover" />

        <div className="mx-auto mt-8 max-w-3xl">
          {paragraphs.map((para, i) =>
            para.startsWith("## ") ? (
              <h2 key={i} className="mt-8 font-display text-2xl font-semibold">{para.replace("## ", "")}</h2>
            ) : (
              <p key={i} className="mt-4 leading-relaxed text-foreground/85">{para}</p>
            ),
          )}

          <div className="mt-10 rounded-xl border border-border bg-secondary p-6">
            <h2 className="font-display text-lg font-semibold">Enjoying our insights?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Subscribe for new articles and listings.</p>
            <div className="mt-4 max-w-sm"><NewsletterForm /></div>
          </div>
        </div>
      </article>

      <section className="container-pn pb-16" aria-labelledby="related-articles">
        <SectionHeading eyebrow="Keep reading" title="Related articles" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fallback.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </section>
    </div>
  );
}
