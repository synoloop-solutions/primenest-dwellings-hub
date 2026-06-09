import type { Property, PropertyNeighborhood, PropertyStatus, PropertyType } from "./types";

const houseImgs = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=70",
];
const aptImgs = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70",
];
const villaImgs = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=70",
];
const luxImgs = [
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=70",
];

const floorPlanImg =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=60";

const allAmenities = [
  "Swimming Pool", "Gym", "Garden", "Smart Home", "Fireplace", "Balcony",
  "Central A/C", "Walk-in Closet", "Home Office", "Security System",
  "Solar Panels", "Wine Cellar", "Rooftop Terrace", "EV Charging",
];

function neighborhood(city: string): PropertyNeighborhood {
  return {
    schools: [
      { name: `${city} Elementary School`, distance: "0.4 mi", detail: "Public · Rated 9/10" },
      { name: "Riverside High School", distance: "1.1 mi", detail: "Public · Rated 8/10" },
      { name: "St. Augustine Academy", distance: "1.8 mi", detail: "Private · K-12" },
    ],
    hospitals: [
      { name: `${city} General Hospital`, distance: "1.2 mi", detail: "24/7 Emergency" },
      { name: "Lakeside Medical Center", distance: "2.5 mi", detail: "Specialist clinics" },
    ],
    shopping: [
      { name: "Market Square Mall", distance: "0.8 mi", detail: "120+ stores" },
      { name: "Fresh Grocer", distance: "0.3 mi", detail: "Daily groceries" },
      { name: "Artisan District", distance: "1.4 mi", detail: "Cafés & boutiques" },
    ],
    transportation: [
      { name: "Central Metro Station", distance: "0.6 mi", detail: "Lines A, C" },
      { name: "Bus Rapid Transit", distance: "0.2 mi", detail: "Routes 12, 30, 44" },
      { name: "International Airport", distance: "9.5 mi", detail: "20 min drive" },
    ],
  };
}

const cities = ["Westview", "Bayridge", "Maplewood", "Hillcrest", "Lakeshore", "Riverside"];
const streets = ["Oak", "Maple", "Sunset", "Harbor", "Birch", "Crescent", "Willow", "Park"];

interface Seed {
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  beds: number;
  baths: number;
  area: number;
  parking: number;
  year: number;
  furnished: boolean;
  featured?: boolean;
  imgs: string[];
}

const seeds: Seed[] = [
  { title: "Modern Hillside Villa", type: "villa", status: "for-sale", price: 2450000, beds: 5, baths: 4, area: 4200, parking: 3, year: 2021, furnished: true, featured: true, imgs: villaImgs },
  { title: "Downtown Luxury Penthouse", type: "penthouse", status: "for-sale", price: 3850000, beds: 4, baths: 4, area: 3600, parking: 2, year: 2022, furnished: true, featured: true, imgs: luxImgs },
  { title: "Sunlit Family House", type: "house", status: "for-sale", price: 985000, beds: 4, baths: 3, area: 2400, parking: 2, year: 2018, furnished: false, featured: true, imgs: houseImgs },
  { title: "Riverside Loft Apartment", type: "apartment", status: "for-rent", price: 3200, beds: 2, baths: 2, area: 1150, parking: 1, year: 2019, furnished: true, featured: true, imgs: aptImgs },
  { title: "Elegant Garden Townhouse", type: "townhouse", status: "for-sale", price: 1250000, beds: 3, baths: 3, area: 2100, parking: 2, year: 2020, furnished: false, imgs: houseImgs },
  { title: "Skyline View Condo", type: "condo", status: "for-sale", price: 720000, beds: 2, baths: 2, area: 1280, parking: 1, year: 2021, furnished: true, imgs: aptImgs },
  { title: "Coastal Contemporary Villa", type: "villa", status: "for-sale", price: 4100000, beds: 6, baths: 5, area: 5400, parking: 4, year: 2023, furnished: true, featured: true, imgs: villaImgs },
  { title: "Cozy Urban Studio", type: "apartment", status: "for-rent", price: 1850, beds: 1, baths: 1, area: 620, parking: 0, year: 2017, furnished: true, imgs: aptImgs },
  { title: "Heritage Brick House", type: "house", status: "for-sale", price: 875000, beds: 3, baths: 2, area: 1980, parking: 1, year: 1998, furnished: false, imgs: houseImgs },
  { title: "The Aurora Residences", type: "condo", status: "new-development", price: 640000, beds: 2, baths: 2, area: 1100, parking: 1, year: 2025, furnished: false, featured: true, imgs: aptImgs },
  { title: "Greenwood Estate", type: "villa", status: "for-sale", price: 3200000, beds: 5, baths: 5, area: 4800, parking: 3, year: 2020, furnished: true, imgs: villaImgs },
  { title: "Harborfront Penthouse", type: "penthouse", status: "for-sale", price: 5200000, beds: 4, baths: 5, area: 4100, parking: 3, year: 2024, furnished: true, featured: true, imgs: luxImgs },
  { title: "Maplewood Bungalow", type: "house", status: "for-sale", price: 615000, beds: 3, baths: 2, area: 1600, parking: 2, year: 2005, furnished: false, imgs: houseImgs },
  { title: "City Center Apartment", type: "apartment", status: "for-rent", price: 2650, beds: 2, baths: 1, area: 950, parking: 1, year: 2016, furnished: false, imgs: aptImgs },
  { title: "The Monarch Tower", type: "condo", status: "new-development", price: 890000, beds: 3, baths: 2, area: 1450, parking: 1, year: 2025, furnished: false, imgs: aptImgs },
  { title: "Lakeshore Modern Home", type: "house", status: "for-sale", price: 1450000, beds: 4, baths: 3, area: 2900, parking: 2, year: 2022, furnished: true, imgs: houseImgs },
  { title: "Quiet Crescent Townhouse", type: "townhouse", status: "for-rent", price: 3800, beds: 3, baths: 2, area: 1700, parking: 1, year: 2019, furnished: false, imgs: houseImgs },
  { title: "Designer Garden Villa", type: "villa", status: "for-sale", price: 2750000, beds: 5, baths: 4, area: 4000, parking: 3, year: 2021, furnished: true, imgs: villaImgs },
  { title: "Compact Smart Condo", type: "condo", status: "for-rent", price: 2200, beds: 1, baths: 1, area: 720, parking: 1, year: 2020, furnished: true, imgs: aptImgs },
  { title: "Sunset Boulevard House", type: "house", status: "for-sale", price: 1120000, beds: 4, baths: 3, area: 2550, parking: 2, year: 2017, furnished: false, imgs: houseImgs },
  { title: "The Vista Collection", type: "penthouse", status: "new-development", price: 2950000, beds: 3, baths: 3, area: 2800, parking: 2, year: 2026, furnished: false, featured: true, imgs: luxImgs },
  { title: "Birch Lane Family Home", type: "house", status: "for-sale", price: 795000, beds: 3, baths: 2, area: 2050, parking: 2, year: 2012, furnished: false, imgs: houseImgs },
  { title: "Park View Apartment", type: "apartment", status: "for-rent", price: 4100, beds: 3, baths: 2, area: 1400, parking: 1, year: 2021, furnished: true, imgs: aptImgs },
  { title: "Grand Willow Estate", type: "villa", status: "for-sale", price: 6500000, beds: 7, baths: 6, area: 7200, parking: 5, year: 2023, furnished: true, featured: true, imgs: villaImgs },
];

function slugify(s: string, i: number) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + (i + 1);
}

export const properties: Property[] = seeds.map((s, i) => {
  const city = cities[i % cities.length];
  const num = 100 + i * 7;
  const street = streets[i % streets.length];
  return {
    id: `p${i + 1}`,
    slug: slugify(s.title, i),
    title: s.title,
    address: `${num} ${street} Street`,
    city,
    lat: 37.77 + (i % 6) * 0.01,
    lng: -122.41 - (i % 6) * 0.01,
    price: s.price,
    status: s.status,
    type: s.type,
    beds: s.beds,
    baths: s.baths,
    area: s.area,
    parking: s.parking,
    yearBuilt: s.year,
    furnished: s.furnished,
    amenities: allAmenities.slice(i % 5, (i % 5) + 7),
    description:
      `${s.title} is a beautifully appointed ${s.type} located in the heart of ${city}. ` +
      `Spanning ${s.area.toLocaleString()} sq ft, it offers ${s.beds} bedrooms and ${s.baths} bathrooms ` +
      `with thoughtfully designed living spaces, premium finishes, and abundant natural light. ` +
      `Perfectly positioned near top schools, shopping, and transit, this home blends comfort with convenience.`,
    gallery: s.imgs,
    floorPlans: [
      { name: "Ground Floor", area: Math.round(s.area * 0.55), image: floorPlanImg },
      { name: "Upper Floor", area: Math.round(s.area * 0.45), image: floorPlanImg },
    ],
    agentId: `a${(i % 6) + 1}`,
    featured: !!s.featured,
    popularity: 100 - i * 3,
    createdAt: new Date(2025, 11 - (i % 11), 1 + (i % 27)).toISOString(),
    neighborhood: neighborhood(city),
  };
});

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const featuredProperties = properties.filter((p) => p.featured);

export const statusLabels: Record<PropertyStatus, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  "new-development": "New Development",
  sold: "Sold",
};

export const typeLabels: Record<PropertyType, string> = {
  house: "House",
  apartment: "Apartment",
  villa: "Villa",
  condo: "Condo",
  townhouse: "Townhouse",
  penthouse: "Penthouse",
};
