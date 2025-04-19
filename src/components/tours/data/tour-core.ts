
// Core types and shared data for tours

export type PackageType = "Budgeted" | "Luxury" | "Premier";

export type TourDay = {
  day: number;
  title: string;
  description: string;
};

// Additional information for tours
export interface TourAdditionalInfo {
  howToReach?: string[];
  experiences?: string[];
  [key: string]: any; // Allow for other properties
}

export interface BaseTourType {
  imageSrc: string;
  title: string;
  location: string;
  duration: string;
  price: string | number;
  bestTime: string;
  packageType: PackageType;
  description?: string;
  itinerary?: TourDay[];
  additionalInfo?: TourAdditionalInfo;
}

export interface DetailedTourType extends BaseTourType {
  id: number;
  country: string;
  region: string;
  activities?: string[];
  included?: string[];
  groupSize?: string;
  highlight?: string;
}

export const regions = [
  "North India", 
  "South India", 
  "West India", 
  "Southeast Asia", 
  "Middle East"
];

export const activities = [
  "Beach Activities",
  "Cultural Shows",
  "Desert Safari",
  "Heritage Walks",
  "Houseboat Stay",
  "Island Hopping",
  "Monument Visits",
  "Spa Treatments",
  "Temple Visits",
  "Water Sports"
];

export const formatPrice = (price: string | number): string => {
  if (typeof price === 'string') {
    if (price.includes('₹')) return price;
    return `₹${price}`;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
