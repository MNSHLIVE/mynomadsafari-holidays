
export interface DestinationData {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  description: string;
  mainImage: string;
  galleryImages?: string[];
  bestTimeToVisit?: string;
  climate?: string;
  localCuisine?: string;
  topAttractions?: string[];
  popularActivities?: string[];
  isHoneymoon?: boolean;
  isPilgrimage?: boolean;
  isAdventure?: boolean;
  isHillStation?: boolean;
  isBeach?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  destinations: string[];
  duration: string;
  price: string;
  bestTimeToVisit: string;
  packageType: "Budgeted" | "Luxury" | "Premier";
  description: string;
  itinerary?: ItineraryDay[];
}
