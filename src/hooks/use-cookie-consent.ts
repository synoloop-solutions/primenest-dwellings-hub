import { useLocalStorage } from "./use-local-storage";

export interface CookiePrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent, hydrated] = useLocalStorage<CookiePrefs | null>(
    "pn:cookie-consent",
    null,
  );
  return { consent, setConsent, hydrated };
}
