import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Heart, Scale, Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { COMPANY } from "@/data/offices";

const nav = [
  { to: "/properties", label: "Buy", search: { status: "for-sale" } },
  { to: "/properties", label: "Rent", search: { status: "for-rent" } },
  { to: "/properties", label: "New Developments", search: { status: "new-development" } },
  { to: "/agents", label: "Agents" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count: favCount } = useFavorites();
  const { count: cmpCount } = useCompare();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container-pn flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Home className="size-4" aria-hidden="true" />
          </span>
          {COMPANY.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={"search" in item ? (item.search as never) : undefined}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="relative" aria-label={`Compare (${cmpCount})`}>
            <Link to="/compare">
              <Scale className="size-5" aria-hidden="true" />
              {cmpCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full bg-gold p-0 text-[10px] text-gold-foreground">
                  {cmpCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label={`Favorites (${favCount})`}>
            <Link to="/saved-searches" hash="favorites">
              <Heart className="size-5" aria-hidden="true" />
              {favCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full bg-gold p-0 text-[10px] text-gold-foreground">
                  {favCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button asChild className="ml-1 hidden bg-gold text-gold-foreground hover:bg-gold/90 sm:inline-flex">
            <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}>
              <Phone className="size-4" aria-hidden="true" />
              Call us
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-lg">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {nav.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      to={item.to}
                      search={"search" in item ? (item.search as never) : undefined}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link to="/saved-searches" className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent">
                    Saved & Favorites
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/mortgage-calculator" className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent">
                    Mortgage Calculator
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
