import type { BlogPost } from "./types";

const body = `
Buying or selling a home is one of the most significant financial decisions most people will ever make. Understanding the dynamics at play helps you act with confidence rather than emotion.

## Know the market before you move

Local conditions matter far more than national headlines. Inventory levels, average days on market, and recent comparable sales tell you whether you are negotiating from a position of strength or need to move quickly.

## Get your finances in order early

Pre-approval is not just paperwork. It signals to sellers that you are a serious buyer and gives you a precise budget so you never fall in love with a home you cannot afford.

## Work with people you trust

A great agent earns their fee many times over through negotiation, access to off-market listings, and steady guidance through inspections, appraisals, and closing. Choose someone who listens first.

## Think long term

The best property decisions account for resale value, neighborhood trajectory, and how your needs may evolve over the next five to ten years.
`;

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "first-time-home-buyer-guide",
    title: "The Complete First-Time Home Buyer's Guide for 2026",
    excerpt: "Everything you need to know before buying your first home, from pre-approval to closing day.",
    content: body,
    cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=70",
    category: "Buying",
    author: "Sophia Bennett",
    date: "2026-05-18",
    readTime: 8,
  },
  {
    id: "b2",
    slug: "staging-tips-sell-faster",
    title: "10 Staging Tips That Help Your Home Sell Faster",
    excerpt: "Small, low-cost changes that dramatically improve how buyers perceive your space.",
    content: body,
    cover: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=70",
    category: "Selling",
    author: "Marcus Cole",
    date: "2026-05-02",
    readTime: 6,
  },
  {
    id: "b3",
    slug: "understanding-mortgage-rates",
    title: "Understanding Mortgage Rates and How They Affect You",
    excerpt: "A plain-English breakdown of how interest rates shape your monthly payment and buying power.",
    content: body,
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
    category: "Finance",
    author: "Elena Rodriguez",
    date: "2026-04-21",
    readTime: 7,
  },
  {
    id: "b4",
    slug: "best-neighborhoods-families",
    title: "How to Choose the Best Neighborhood for Your Family",
    excerpt: "Schools, safety, commute, and community: the factors that matter most for growing families.",
    content: body,
    cover: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=70",
    category: "Lifestyle",
    author: "Priya Nair",
    date: "2026-04-09",
    readTime: 5,
  },
  {
    id: "b5",
    slug: "real-estate-investment-basics",
    title: "Real Estate Investment Basics for Beginners",
    excerpt: "How to evaluate rental yield, appreciation, and cash flow before buying your first investment.",
    content: body,
    cover: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1200&q=70",
    category: "Investment",
    author: "Daniel Okafor",
    date: "2026-03-27",
    readTime: 9,
  },
  {
    id: "b6",
    slug: "new-developments-what-to-know",
    title: "Buying New Construction: What Every Buyer Should Know",
    excerpt: "Pre-launch pricing, builder incentives, and the questions to ask before signing.",
    content: body,
    cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
    category: "New Developments",
    author: "Elena Rodriguez",
    date: "2026-03-12",
    readTime: 6,
  },
  {
    id: "b7",
    slug: "negotiation-strategies-buyers",
    title: "Negotiation Strategies Every Buyer Should Master",
    excerpt: "Proven tactics to get the best possible price without losing the home you love.",
    content: body,
    cover: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=70",
    category: "Buying",
    author: "Marcus Cole",
    date: "2026-02-28",
    readTime: 7,
  },
  {
    id: "b8",
    slug: "renting-vs-buying",
    title: "Renting vs. Buying: Which Is Right for You?",
    excerpt: "A clear framework for deciding whether to rent or buy in today's market.",
    content: body,
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
    category: "Finance",
    author: "James Whitfield",
    date: "2026-02-14",
    readTime: 6,
  },
  {
    id: "b9",
    slug: "home-maintenance-checklist",
    title: "The Seasonal Home Maintenance Checklist",
    excerpt: "Protect your investment year-round with this simple, room-by-room maintenance routine.",
    content: body,
    cover: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=70",
    category: "Lifestyle",
    author: "Sophia Bennett",
    date: "2026-01-30",
    readTime: 5,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
