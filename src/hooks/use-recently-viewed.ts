import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const MAX = 6;

export function useRecentlyViewed() {
  const [ids, setIds, hydrated] = useLocalStorage<string[]>("pn:recently-viewed", []);

  const add = useCallback(
    (id: string) => setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX)),
    [setIds],
  );

  return { ids, add, hydrated };
}
