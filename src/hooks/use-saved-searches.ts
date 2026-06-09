import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export interface SavedSearch {
  id: string;
  name: string;
  createdAt: string;
  filters: {
    q?: string;
    status?: string;
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
  };
}

export function useSavedSearches() {
  const [searches, setSearches, hydrated] = useLocalStorage<SavedSearch[]>("pn:saved-searches", []);

  const add = useCallback(
    (search: Omit<SavedSearch, "id" | "createdAt">) =>
      setSearches((prev) => [
        { ...search, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ]),
    [setSearches],
  );
  const remove = useCallback(
    (id: string) => setSearches((prev) => prev.filter((s) => s.id !== id)),
    [setSearches],
  );

  return { searches, add, remove, count: searches.length, hydrated };
}
