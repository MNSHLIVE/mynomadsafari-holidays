
import { 
  HotelCategory, 
  TourRegion,
  BASE_RATE_EUROPE_3STAR,
  BASE_RATE_SOUTH_ASIA_DUBAI,
  MULTIPLIER_4STAR,
  MULTIPLIER_5STAR,
  ADDITIONAL_ADULT_COST,
  CHILD_COST
} from "../tour-itineraries/types";

interface CalculationParams {
  region: TourRegion;
  nights: number;
  adults: number;
  children: number;
  hotelCategory: HotelCategory;
}

export interface CalculationResult {
  totalCost: number;
  perPersonCost: number;
}

export const validateInputs = (adults: number, nights: number): { isValid: boolean; error: string | null } => {
  if (adults < 2) {
    return { isValid: false, error: "Minimum booking size is 2 adults" };
  }
  
  if (nights < 1) {
    return { isValid: false, error: "Number of nights must be at least 1" };
  }
  
  return { isValid: true, error: null };
};

export const calculateTourCost = ({
  region,
  nights,
  adults,
  children,
  hotelCategory
}: CalculationParams): CalculationResult => {
  let totalCost = 0;
  let perPersonCost = 0;

  // European calculation logic (per person per day based)
  if (region === "europe") {
    // Get base rate based on hotel category
    let chosenPPPD = BASE_RATE_EUROPE_3STAR;
    
    if (hotelCategory === "4-Star") {
      chosenPPPD = BASE_RATE_EUROPE_3STAR * MULTIPLIER_4STAR;
    } else if (hotelCategory === "5-Star") {
      chosenPPPD = BASE_RATE_EUROPE_3STAR * MULTIPLIER_5STAR;
    }
    
    // Calculate cost for one adult for the entire stay
    const costOneAdult = chosenPPPD * nights;
    
    // Calculate total cost for all adults
    totalCost = costOneAdult * adults;
    
    // Add child costs (25% of adult cost per night)
    totalCost += costOneAdult * 0.25 * children;
  } 
  // South Asia/Dubai calculation logic (fixed package price)
  else { 
    // Base cost for 2 adults for the entire trip
    totalCost = BASE_RATE_SOUTH_ASIA_DUBAI;
    
    // Add cost for additional adults beyond the first two
    if (adults > 2) {
      totalCost += (adults - 2) * ADDITIONAL_ADULT_COST;
    }
    
    // Add cost for children
    totalCost += children * CHILD_COST;
  }
  
  // Calculate per-person cost
  const totalPayingPersons = adults + children;
  perPersonCost = totalPayingPersons > 0 ? totalCost / totalPayingPersons : 0;
  
  return {
    totalCost: Math.round(totalCost),
    perPersonCost: Math.round(perPersonCost)
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
