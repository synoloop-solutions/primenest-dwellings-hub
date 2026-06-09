import { useState } from "react";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function CookieConsentBanner() {
  const { consent, setConsent, hydrated } = useCookieConsent();
  const [openPrefs, setOpenPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  if (!hydrated || consent) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card p-4 shadow-lg">
        <div className="container-pn flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Cookie className="size-6 shrink-0 text-gold" aria-hidden="true" />
          <p className="flex-1 text-sm text-muted-foreground">
            We use cookies to improve your browsing experience, analyze site traffic, and personalize content.
            See our <a href="/cookie-policy" className="font-medium text-foreground underline">Cookie Policy</a>.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenPrefs(true)}>Preferences</Button>
            <Button variant="outline" size="sm" onClick={() => setConsent({ necessary: true, analytics: false, marketing: false })}>
              Reject all
            </Button>
            <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={() => setConsent({ necessary: true, analytics: true, marketing: true })}>
              Accept all
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openPrefs} onOpenChange={setOpenPrefs}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="font-display">Cookie preferences</DialogTitle></DialogHeader>
          <div className="space-y-5 py-2">
            <div className="flex items-center justify-between">
              <div><Label>Strictly necessary</Label><p className="text-xs text-muted-foreground">Required for the site to function.</p></div>
              <Switch checked disabled aria-label="Necessary cookies (always on)" />
            </div>
            <div className="flex items-center justify-between">
              <div><Label htmlFor="c-analytics">Analytics</Label><p className="text-xs text-muted-foreground">Help us understand site usage.</p></div>
              <Switch id="c-analytics" checked={analytics} onCheckedChange={setAnalytics} />
            </div>
            <div className="flex items-center justify-between">
              <div><Label htmlFor="c-marketing">Marketing</Label><p className="text-xs text-muted-foreground">Personalized property recommendations.</p></div>
              <Switch id="c-marketing" checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => { setConsent({ necessary: true, analytics, marketing }); setOpenPrefs(false); }} className="bg-gold text-gold-foreground hover:bg-gold/90">
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
