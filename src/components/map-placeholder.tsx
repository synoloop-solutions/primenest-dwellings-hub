import { MapPin } from "lucide-react";

export function MapPlaceholder({ address, city }: { address: string; city: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-secondary">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/4 top-1/3 h-2 w-24 rounded-full bg-gold/40" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/3 h-2 w-32 rounded-full bg-primary/20" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-gold text-gold-foreground shadow-lg ring-4 ring-background">
          <MapPin className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-3 rounded-md bg-background/90 px-3 py-1.5 text-sm font-medium shadow-sm">
          {address}, {city}
        </p>
      </div>
    </div>
  );
}
