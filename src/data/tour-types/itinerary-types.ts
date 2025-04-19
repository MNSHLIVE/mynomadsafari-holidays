
export interface TourItinerary {
  id: string;
  title: string;
  destinations: string[];
  duration: string;
  overview: string;
  packageType: "Budgeted" | "Luxury" | "Premier";
  price: string;
  bestTime: string;
  imageSrc: string;
  location: string;
  dailyPlans: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  inclusions?: string[];
  exclusions?: string[];
  notes?: string;
}
