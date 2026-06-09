import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const MAX = 4;

export function useCompare() {
  const [ids, setIds, hydrated] = useLocalStorage<string[]>("pn:compare", []);

  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX) return prev;
        return [...prev, id];
      }),
    [setIds],
  );
  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);
  const clear = useCallback(() => setIds([]), [setIds]);
  const inCompare = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, remove, clear, inCompare, count: ids.length, max: MAX, hydrated };
}
