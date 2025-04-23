
// Define interfaces for tour types
export interface BaseTourDetails {
  id: string;
  name: string;
  destination: string;
  description: string;
  duration: string;
  pricePerPerson: number;
  minGroupSize: number;
  startDate?: string;
  endDate?: string;
}

// Domestic tour details extend base tour details with any domestic-specific properties
export interface DomesticTourDetails extends BaseTourDetails {
  stateProvince: string;
  localHighlights?: string[];
}

// International tour details extend base tour details with any international-specific properties
export interface InternationalTourDetails extends BaseTourDetails {
  country: string;
  visaRequired: boolean;
  currencyCode?: string;
}

// Destination data interface
export interface DestinationData {
  name: string;
  region: string;
  imageSrc: string;
  description: string;
  bestTimeToVisit: string;
  budgetRange: {
    economy: string;
    standard: string;
    luxury: string;
  };
  highlights: string[];
  isHoneymoon?: boolean;
  isPilgrimage?: boolean;
}

