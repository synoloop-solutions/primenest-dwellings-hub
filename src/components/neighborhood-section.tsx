import { GraduationCap, Hospital, ShoppingBag, TrainFront } from "lucide-react";
import type { PropertyNeighborhood, NeighborhoodPlace } from "@/data/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { key: "schools", label: "Schools", icon: GraduationCap },
  { key: "hospitals", label: "Healthcare", icon: Hospital },
  { key: "shopping", label: "Shopping", icon: ShoppingBag },
  { key: "transportation", label: "Transport", icon: TrainFront },
] as const;

function PlaceList({ places, Icon }: { places: NeighborhoodPlace[]; Icon: typeof GraduationCap }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {places.map((p) => (
        <li key={p.name} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-gold">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-muted-foreground">{p.detail}</p>
          </div>
          <span className="ml-auto whitespace-nowrap text-sm font-medium text-gold">{p.distance}</span>
        </li>
      ))}
    </ul>
  );
}

export function NeighborhoodSection({ neighborhood }: { neighborhood: PropertyNeighborhood }) {
  return (
    <Tabs defaultValue="schools">
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted p-1">
        {tabs.map((t) => (
          <TabsTrigger key={t.key} value={t.key} className="gap-1.5">
            <t.icon className="size-4" aria-hidden="true" />
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.key} value={t.key} className="mt-5">
          <PlaceList places={neighborhood[t.key]} Icon={t.icon} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
