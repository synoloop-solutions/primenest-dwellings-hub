import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statusLabels, typeLabels } from "@/data/properties";
import type { PropertyStatus, PropertyType } from "@/data/types";

export interface FilterState {
  q: string;
  status: string;
  type: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
}

export const emptyFilters: FilterState = {
  q: "", status: "any", type: "any", city: "any", minPrice: "", maxPrice: "", beds: "any",
};

const statuses = Object.keys(statusLabels) as PropertyStatus[];
const types = Object.keys(typeLabels) as PropertyType[];

export function PropertyFilters({
  values,
  onChange,
  onReset,
  cities,
}: {
  values: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  cities: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Label htmlFor="filter-q" className="sr-only">Search properties</Label>
        <Input
          id="filter-q"
          value={values.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search by title, city or address"
          className="pl-9"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="filter-status">Status</Label>
          <Select value={values.status} onValueChange={(v) => onChange({ status: v })}>
            <SelectTrigger id="filter-status" className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any status</SelectItem>
              {statuses.map((s) => <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="filter-type">Property type</Label>
          <Select value={values.type} onValueChange={(v) => onChange({ type: v })}>
            <SelectTrigger id="filter-type" className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {types.map((t) => <SelectItem key={t} value={t}>{typeLabels[t]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="filter-city">City</Label>
          <Select value={values.city} onValueChange={(v) => onChange({ city: v })}>
            <SelectTrigger id="filter-city" className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any city</SelectItem>
              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="filter-beds">Bedrooms</Label>
          <Select value={values.beds} onValueChange={(v) => onChange({ beds: v })}>
            <SelectTrigger id="filter-beds" className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {[1, 2, 3, 4, 5].map((b) => <SelectItem key={b} value={String(b)}>{b}+ beds</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="filter-min">Min price</Label>
          <Input id="filter-min" type="number" inputMode="numeric" value={values.minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} placeholder="0" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="filter-max">Max price</Label>
          <Input id="filter-max" type="number" inputMode="numeric" value={values.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} placeholder="Any" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        <span>Refine your results</span>
        <Button variant="ghost" size="sm" className="ml-auto" onClick={onReset}>
          <X className="size-4" aria-hidden="true" /> Reset
        </Button>
      </div>
    </div>
  );
}
