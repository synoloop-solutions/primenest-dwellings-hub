export type PropertyStatus = "for-sale" | "for-rent" | "new-development" | "sold";
export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "condo"
  | "townhouse"
  | "penthouse";

export interface NeighborhoodPlace {
  name: string;
  distance: string;
  detail: string;
}

export interface PropertyNeighborhood {
  schools: NeighborhoodPlace[];
  hospitals: NeighborhoodPlace[];
  shopping: NeighborhoodPlace[];
  transportation: NeighborhoodPlace[];
}

export interface FloorPlan {
  name: string;
  area: number;
  image: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  beds: number;
  baths: number;
  area: number;
  parking: number;
  yearBuilt: number;
  furnished: boolean;
  amenities: string[];
  description: string;
  gallery: string[];
  floorPlans: FloorPlan[];
  agentId: string;
  featured: boolean;
  popularity: number;
  createdAt: string;
  neighborhood: PropertyNeighborhood;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
  rating: number;
  deals: number;
  experience: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Office {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}
