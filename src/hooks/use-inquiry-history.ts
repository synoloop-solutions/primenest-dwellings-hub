import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export interface Inquiry {
  id: string;
  type: "contact" | "agent" | "pre-qualification" | "newsletter";
  name?: string;
  email: string;
  detail?: string;
  createdAt: string;
}

export function useInquiryHistory() {
  const [inquiries, setInquiries, hydrated] = useLocalStorage<Inquiry[]>("pn:inquiries", []);

  const add = useCallback(
    (i: Omit<Inquiry, "id" | "createdAt">) =>
      setInquiries((prev) => [
        { ...i, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ]),
    [setInquiries],
  );

  return { inquiries, add, hydrated };
}
