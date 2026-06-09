import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import type { Agent } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryValues } from "@/lib/schemas";
import { useInquiryHistory } from "@/hooks/use-inquiry-history";

export function ContactAgentForm({ agent, propertyTitle }: { agent: Agent; propertyTitle?: string }) {
  const { add } = useInquiryHistory();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      message: propertyTitle ? `Hi ${agent.name}, I'm interested in "${propertyTitle}". Please get in touch.` : "",
    },
  });

  const onSubmit = (v: InquiryValues) => {
    add({ type: "agent", name: v.name, email: v.email, detail: propertyTitle });
    toast.success("Message sent", { description: `${agent.name} will respond shortly.` });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden="true" />
        <h3 className="mt-3 font-display text-lg font-semibold">Message sent!</h3>
        <p className="mt-1 text-sm text-muted-foreground">{agent.name} will be in touch with you very soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="ca-name">Name</Label>
        <Input id="ca-name" {...register("name")} aria-invalid={!!errors.name} className="mt-1.5" />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="ca-email">Email</Label>
        <Input id="ca-email" type="email" {...register("email")} aria-invalid={!!errors.email} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="ca-phone">Phone</Label>
        <Input id="ca-phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} className="mt-1.5" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      <div>
        <Label htmlFor="ca-msg">Message</Label>
        <Textarea id="ca-msg" rows={4} {...register("message")} className="mt-1.5" />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
        <Send className="size-4" aria-hidden="true" /> Send message
      </Button>
    </form>
  );
}
