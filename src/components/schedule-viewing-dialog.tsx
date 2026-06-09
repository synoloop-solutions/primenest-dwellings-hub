import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, CalendarCheck } from "lucide-react";
import type { Property } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { viewingSchema, type ViewingValues } from "@/lib/schemas";
import { useScheduledViewings } from "@/hooks/use-scheduled-viewings";
import { cn } from "@/lib/utils";

const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export function ScheduleViewingDialog({
  property,
  trigger,
}: {
  property: Property;
  trigger: React.ReactNode;
}) {
  const { add } = useScheduledViewings();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ViewingValues>({ resolver: zodResolver(viewingSchema) });

  const onSubmit = (v: ViewingValues) => {
    add({ propertyId: property.id, propertyTitle: property.title, ...v });
    setDone(true);
  };

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (!o) {
      setTimeout(() => { setDone(false); reset(); }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Schedule a viewing</DialogTitle>
          <DialogDescription>{property.title} — {property.address}, {property.city}</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-12 text-gold" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold">Viewing requested!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We've saved your request. An agent will confirm your appointment by email.
            </p>
            <Button className="mt-5" onClick={() => handleOpenChange(false)}>Done</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Preferred date</Label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn("mt-1.5 w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          <CalendarIcon className="size-4" aria-hidden="true" />
                          {field.value ? format(new Date(field.value), "MMM d") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(d) => field.onChange(d ? d.toISOString() : "")}
                          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date.message}</p>}
              </div>
              <div>
                <Label>Preferred time</Label>
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {times.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="sv-name">Full name</Label>
              <Input id="sv-name" {...register("name")} aria-invalid={!!errors.name} className="mt-1.5" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="sv-email">Email</Label>
              <Input id="sv-email" type="email" {...register("email")} aria-invalid={!!errors.email} className="mt-1.5" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="sv-phone">Phone</Label>
              <Input id="sv-phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} className="mt-1.5" />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              <CalendarCheck className="size-4" aria-hidden="true" /> Request viewing
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
