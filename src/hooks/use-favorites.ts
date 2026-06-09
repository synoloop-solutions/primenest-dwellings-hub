import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export function useFavorites() {
  const [ids, setIds, hydrated] = useLocalStorage<string[]>("pn:favorites", []);

  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  );
  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);
  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, remove, isFavorite, count: ids.length, hydrated };
}
