import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";
import { useInquiryHistory } from "@/hooks/use-inquiry-history";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "footer" }) {
  const { add } = useInquiryHistory();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = (values: NewsletterValues) => {
    add({ type: "newsletter", email: values.email });
    toast.success("You're subscribed!", { description: "Watch your inbox for new listings." });
    setDone(true);
    reset();
  };

  if (done) {
    return (
      <p className={cn("flex items-center gap-2 text-sm", variant === "footer" ? "text-primary-foreground/80" : "text-foreground")}>
        <CheckCircle2 className="size-4 text-gold" aria-hidden="true" /> Thanks for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2" noValidate>
      <div className="flex-1">
        <label htmlFor={`newsletter-${variant}`} className="sr-only">
          Email address
        </label>
        <Input
          id={`newsletter-${variant}`}
          type="email"
          placeholder="you@email.com"
          className={cn(variant === "footer" && "bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border-primary-foreground/20")}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90">
        Subscribe
      </Button>
    </form>
  );
}
