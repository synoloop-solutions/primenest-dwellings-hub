# PrimeNest Realty — Real Estate Listing Website (with additions)

A modern, responsive, SEO- and accessibility-focused real estate site on the existing TanStack Start + Tailwind v4 + shadcn/ui template. No backend; all user state persists in LocalStorage; all images are real Unsplash/Pexels URLs in centralized data files.

## Target Lighthouse scores (build & QA goal)
- Performance: 90+ · Accessibility: 95+ · Best Practices: 95+ · SEO: 100
- Enforced via lazy-loaded below-fold images with explicit dimensions (no CLS), semantic HTML, single H1/page, labeled forms, ARIA on icon buttons, contrast-safe tokens, per-route metadata + JSON-LD.

## Design system
- Palette in `src/styles.css` (`:root`, oklch): Deep Navy primary, white bg, soft gray muted, warm beige secondary/accent, luxury gold accent for CTAs/highlights.
- Elegant display + clean sans fonts via `<link>` in `__root.tsx`, mapped through `@theme` tokens.
- Reusable: section spacing, container, card elevation, gold CTA variant, status badges.

## Centralized mock data (`src/data/`)
- `properties.ts` — ~24 properties (slug, address, lat/lng, price, status, type, beds, baths, area, parking, yearBuilt, furnished, amenities[], description, gallery[], floorPlans[], agentId, featured, popularity, createdAt) **plus `neighborhood` block**: nearby schools, hospitals, shopping centers, transportation (name, distance, rating/type).
- `agents.ts`, `blog.ts`, `testimonials.ts`, `categories.ts`, `offices.ts`, `images.ts`.

## State & utilities (`src/hooks/`, `src/lib/`)
- Generic `useLocalStorage`; built on it: `useFavorites`, `useRecentlyViewed`, `useSavedSearches`, `useInquiryHistory`, `useCookieConsent`, **`useScheduledViewings`**, **`useCompare`** (max 4).
- `mortgage.ts`, `format.ts`, Zod schemas for contact/inquiry/newsletter/viewing/pre-qual forms.

## Shared layout & components
- `Header` (sticky nav: Buy, Rent, New Developments, Luxury Homes, Agents, Blog, About, Contact; search shortcut; favorites + **compare** counters; contact CTA; mobile sheet).
- `Footer` (Company / Properties / Resources / Legal columns + newsletter + cookie settings; **link to Saved Searches & Compare**).
- Single `<main>` + `Layout` around `<Outlet />`.
- `PropertyCard` (adds **Compare toggle** alongside favorite), `PropertyGrid`, `PropertyFilters`, `SortSelect`, `ViewToggle`, `Pagination`.
- `ImageGallery`+lightbox, `MortgageCalculator`, `MapPlaceholder`, `AgentCard`, `BlogCard`, `TestimonialCarousel`, `ContactAgentForm`, `NewsletterForm`.
- `CookieConsentBanner` + `CookiePreferencesModal`.
- States: skeletons, `EmptyState`, success toasts; sticky mobile contact bar; lead-gen CTA blocks.

## New feature components
- **`ScheduleViewingDialog`** — shadcn date picker (date), time-slot select, name/email/phone (Zod-validated); saves to `useScheduledViewings`; success state. Triggered from property detail + sticky CTA.
- **`MortgagePreQualForm`** — under every mortgage calculator ("Want help financing this property? Book a mortgage consultation"): name, email, phone, amount, message; saves to inquiry history; success toast.
- **`NeighborhoodSection`** — tabs/cards for Nearby Schools, Hospitals, Shopping Centers, Transportation from property `neighborhood` data.
- **`CompareBar`** — floating bar showing selected properties with "Compare" CTA → `/compare`.
- **`SavedSearchCard`** — shows filters/location/type, Re-run CTA (navigates to `/properties` with search params), Delete.

## Routes (`src/routes/`)
- `index.tsx` — Home (hero+search, advanced search, featured listings, categories, why-choose-us, agent spotlight, mortgage preview, testimonials, recent blog, newsletter).
- `properties.tsx` — search + advanced filters, sorting, grid/list toggle, pagination, empty state; validated search params; **"Save this search" CTA** writing to `useSavedSearches`.
- `properties.$slug.tsx` — gallery+lightbox, info, features, **NeighborhoodSection**, map, floor plans, mortgage calculator + **MortgagePreQualForm**, **ScheduleViewingDialog** trigger, contact agent form, related + recently viewed; records recently-viewed; RealEstateListing + Breadcrumb JSON-LD.
- **`saved-searches.tsx` (`/saved-searches`)** — list of saved searches (filters, locations, property types), Re-run CTA, Delete, empty state.
- **`compare.tsx` (`/compare`)** — side-by-side table of up to 3–4 properties: image, price, beds, baths, area, parking, amenities, status; add/remove; empty state.
- `agents.tsx` / `agents.$slug.tsx`; `blog.tsx` / `blog.$slug.tsx`.
- `mortgage-calculator.tsx` (advanced: price, down payment, rate, term, tax, insurance) + pre-qual form.
- `contact.tsx`, `about.tsx`.
- `privacy.tsx`, `terms.tsx`, `cookie-policy.tsx`, `accessibility.tsx`.
- `sitemap[.]xml.tsx` server route (includes new routes); `public/robots.txt`.

## SEO
- Per-route `head()` (title/description/OG/Twitter); canonical on leaves only; article `og:type` for blog/detail.
- Organization JSON-LD in `__root.tsx`; RealEstateListing, Article, BreadcrumbList on leaves. Semantic HTML, breadcrumbs, internal linking.

## Accessibility & performance
- Keyboard nav, focus-visible, ARIA labels, labeled forms, contrast-safe tokens, `h-dvh`.
- Lazy below-fold images with width/height, responsive `srcset`, route-level code splitting.

## Technical notes
- Install `framer-motion`; add shadcn primitives as needed (sheet, dialog, select, slider, tabs, table, accordion, calendar, popover, sonner). zod/query/shadcn already present.
- All nav via `<Link>`/`params`; no hash-based section nav. No AI images — Unsplash URLs only.

## Build order
tokens & data (incl. neighborhood) → hooks/utils (incl. scheduled viewings, compare, saved searches) → layout & shared components → home → properties (+save search) → detail (+neighborhood, schedule viewing, pre-qual) → saved-searches → compare → agents → blog → mortgage/contact/about → legal + cookie consent → SEO/sitemap.

## Final QA audit pass
Review and fix as UX designer, a11y specialist, SEO consultant, CRO expert, and performance engineer: mobile responsiveness, a11y violations, Lighthouse weaknesses, missing metadata, broken flows, form usability, weak lead-gen, visual hierarchy, empty states, loading states, layout issues — to agency-portfolio quality.