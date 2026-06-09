import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialCarousel() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((t) => (
        <figure
          key={t.id}
          className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
            "{t.quote}"
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <img
              src={t.avatar}
              alt={t.name}
              loading="lazy"
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
