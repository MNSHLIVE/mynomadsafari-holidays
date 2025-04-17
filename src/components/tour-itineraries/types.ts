
export type TourTier = "Budgeted" | "Luxury" | "Premier";

export interface TourData {
  title: string;
  location: string;
  duration: string;
  price: string;
  bestTime: string;
  packageType: string;
  overview: string;
  imageSrc: string;
  destinations: string[];
  dailyPlans: Array<{day: number, title: string, description: string}>;
}

export interface DestinationData {
  name: string;
  region: string; // "India" | "Southeast Asia" | "Europe" | "Middle East" | etc.
  imageSrc: string;
  description: string;
  bestTimeToVisit: string;
  budgetRange: {
    economy: string;
    standard: string;
    luxury: string;
  };
  highlights: string[];
  isPilgrimage?: boolean;
  isHoneymoon?: boolean;
}
