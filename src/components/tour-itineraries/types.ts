
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

// International Tour Calculator Types
export type HotelCategory = "3-Star" | "4-Star" | "5-Star";
export type TourRegion = "europe" | "southAsiaDubai";

export interface RegionDestination {
  [key: string]: string;
}
