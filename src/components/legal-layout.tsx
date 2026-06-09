import type { ReactNode } from "react";
import { SectionHeading } from "@/components/section-heading";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-border bg-secondary">
        <div className="container-pn py-10">
          <SectionHeading eyebrow="Legal" title={title} />
          <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        </div>
      </div>
      <div className="container-pn section-pad">
        <div className="prose-legal mx-auto max-w-3xl space-y-6 text-foreground/85 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </div>
  );
}
