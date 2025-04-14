
export type TourTier = "Budgeted" | "Luxury" | "Premier";

export interface TourData {
  title: string;
  location: string;
  duration: string;
  price: string;
  bestTime: string;
  packageType: TourTier;
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

// Base rate constants for tour calculations
export const BASE_RATE_EUROPE_3STAR = 20000; // INR per person per day
export const BASE_RATE_SOUTH_ASIA_DUBAI = 15000; // INR for 2 adults for entire trip
export const MULTIPLIER_4STAR = 1.5;
export const MULTIPLIER_5STAR = 2.5;
export const ADDITIONAL_ADULT_COST = 5000; // For South Asia/Dubai, per additional adult
export const CHILD_COST = 3500; // For South Asia/Dubai, per child
