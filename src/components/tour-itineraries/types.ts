
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
