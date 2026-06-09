import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { preQualSchema, type PreQualValues } from "@/lib/schemas";
import { useInquiryHistory } from "@/hooks/use-inquiry-history";

export function MortgagePreQualForm({ defaultAmount = 0 }: { defaultAmount?: number }) {
  const { add } = useInquiryHistory();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreQualValues>({
    resolver: zodResolver(preQualSchema),
    defaultValues: { loanAmount: defaultAmount || undefined },
  });

  const onSubmit = (v: PreQualValues) => {
    add({ type: "pre-qualification", name: v.name, email: v.email, detail: `Loan: $${v.loanAmount}` });
    toast.success("Request received", { description: "A mortgage advisor will contact you within 1 business day." });
    setDone(true);
  };

  return (
    <div className="rounded-xl border border-gold/40 bg-accent/40 p-6 lg:p-8">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gold text-gold-foreground">
          <Landmark className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold">Want help financing this property?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Book a free mortgage consultation. Our advisors will help you get pre-qualified and find the best rate.
          </p>
        </div>
      </div>

      {done ? (
        <p className="mt-6 flex items-center gap-2 rounded-lg bg-card p-4 text-sm">
          <CheckCircle2 className="size-5 text-gold" aria-hidden="true" />
          Thanks! A mortgage advisor will reach out to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
          <div>
            <Label htmlFor="pq-name">Full name</Label>
            <Input id="pq-name" {...register("name")} aria-invalid={!!errors.name} className="mt-1.5" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="pq-phone">Phone</Label>
            <Input id="pq-phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} className="mt-1.5" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="pq-email">Email</Label>
            <Input id="pq-email" type="email" {...register("email")} aria-invalid={!!errors.email} className="mt-1.5" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="pq-amount">Loan amount needed</Label>
            <Input id="pq-amount" type="number" {...register("loanAmount")} aria-invalid={!!errors.loanAmount} className="mt-1.5" />
            {errors.loanAmount && <p className="mt-1 text-xs text-destructive">{errors.loanAmount.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="pq-msg">Anything else? (optional)</Label>
            <Textarea id="pq-msg" {...register("message")} className="mt-1.5" rows={3} />
          </div>
          <Button type="submit" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:bg-gold/90 sm:col-span-2">
            Book my consultation
          </Button>
        </form>
      )}
    </div>
  );
}
