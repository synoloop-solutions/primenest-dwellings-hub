import type { PropertyStatus } from "@/data/types";

export function formatPrice(price: number, status?: PropertyStatus): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
  return status === "for-rent" ? `${formatted}/mo` : formatted;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatArea(area: number): string {
  return `${formatNumber(area)} sq ft`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
