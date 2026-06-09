import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export interface ScheduledViewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  createdAt: string;
}

export function useScheduledViewings() {
  const [viewings, setViewings, hydrated] = useLocalStorage<ScheduledViewing[]>(
    "pn:viewings",
    [],
  );

  const add = useCallback(
    (v: Omit<ScheduledViewing, "id" | "createdAt">) =>
      setViewings((prev) => [
        { ...v, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ]),
    [setViewings],
  );
  const remove = useCallback(
    (id: string) => setViewings((prev) => prev.filter((x) => x.id !== id)),
    [setViewings],
  );

  return { viewings, add, remove, count: viewings.length, hydrated };
}
