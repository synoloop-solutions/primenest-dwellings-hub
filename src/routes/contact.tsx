import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { useInquiryHistory } from "@/hooks/use-inquiry-history";
import { offices, COMPANY } from "@/data/offices";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — PrimeNest Realty" },
      { name: "description", content: "Get in touch with PrimeNest Realty. Call, email, or visit one of our offices in San Francisco, Palo Alto, or Oakland." },
      { property: "og:title", content: "Contact Us — PrimeNest Realty" },
      { property: "og:description", content: "Reach our team by phone, email, or at one of our offices." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { add } = useInquiryHistory();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (v: ContactValues) => {
    add({ type: "contact", name: v.name, email: v.email, detail: v.message });
    toast.success("Message sent", { description: "We'll get back to you within one business day." });
    setDone(true);
  };

  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Get in touch" title="Contact PrimeNest" description="We'd love to hear from you. Reach out and a member of our team will respond shortly." />
        </div>
      </div>

      <div className="container-pn section-pad grid gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <Phone className="size-5 text-gold" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">Call us</p>
              <p className="font-medium">{COMPANY.phone}</p>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <Mail className="size-5 text-gold" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">Email us</p>
              <p className="font-medium">{COMPANY.email}</p>
            </a>
            <div className="rounded-xl border border-border bg-card p-5">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">Head office</p>
              <p className="font-medium">San Francisco</p>
            </div>
          </div>

          <div className="mt-8">
            <MapPlaceholder address="880 Market Street" city="San Francisco" />
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold">Our offices</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {offices.map((o) => (
              <div key={o.id} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display font-semibold">{o.city}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.address}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm"><Phone className="size-3.5 text-gold" aria-hidden="true" />{o.phone}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="size-3.5" aria-hidden="true" />{o.hours}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">Send us a message</h2>
            {done ? (
              <div className="mt-6 text-center">
                <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden="true" />
                <p className="mt-3 font-medium">Thanks for reaching out!</p>
                <p className="mt-1 text-sm text-muted-foreground">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
                <div>
                  <Label htmlFor="c-name">Name</Label>
                  <Input id="c-name" {...register("name")} aria-invalid={!!errors.name} className="mt-1.5" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" type="email" {...register("email")} aria-invalid={!!errors.email} className="mt-1.5" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone (optional)</Label>
                  <Input id="c-phone" type="tel" {...register("phone")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-msg">Message</Label>
                  <Textarea id="c-msg" rows={4} {...register("message")} aria-invalid={!!errors.message} className="mt-1.5" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                  <Send className="size-4" aria-hidden="true" /> Send message
                </Button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
