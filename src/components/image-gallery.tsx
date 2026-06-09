import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const go = (dir: number) => setActive((a) => (a + dir + images.length) % images.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl bg-muted">
        <div className="aspect-[16/10]">
          <img
            src={images[active]}
            alt={`${title} — photo ${active + 1} of ${images.length}`}
            width={1200}
            height={750}
            className="size-full object-cover"
          />
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90"
          aria-label="Previous photo"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90"
          aria-label="Next photo"
          onClick={() => go(1)}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-3 right-3 bg-background/90"
          onClick={() => setOpen(true)}
        >
          <Expand className="size-4" aria-hidden="true" /> View all
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-transparent transition",
              i === active && "ring-gold",
            )}
          >
            <img src={img} alt="" loading="lazy" width={300} height={225} className="size-full object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <DialogTitle className="sr-only">{title} photo gallery</DialogTitle>
          <div className="relative">
            <img
              src={images[active]}
              alt={`${title} — photo ${active + 1}`}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <Button size="icon" variant="secondary" className="absolute right-2 top-2 rounded-full" aria-label="Close" onClick={() => setOpen(false)}>
              <X className="size-5" aria-hidden="true" />
            </Button>
            <Button size="icon" variant="secondary" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full" aria-label="Previous photo" onClick={() => go(-1)}>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button size="icon" variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full" aria-label="Next photo" onClick={() => go(1)}>
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
