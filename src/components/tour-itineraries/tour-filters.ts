
import { TourData } from "./types";

// Get unique destinations from tour data
export const getUniqueDestinations = (tourData: TourData[]): string[] => {
  const destinations = new Set<string>();
  
  tourData.forEach(tour => {
    destinations.add(tour.location);
  });
  
  return Array.from(destinations);
};

// Filter domestic tours based on search term, destination, and duration
export const filterDomesticTours = (
  tours: TourData[],
  searchTerm: string,
  selectedDestination: string, 
  selectedDuration: string
): TourData[] => {
  return tours.filter(tour => {
    // Filter by search term
    const matchesSearchTerm = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by destination
    const matchesDestination = 
      selectedDestination === "all" || tour.location === selectedDestination;
    
    // Filter by duration
    let matchesDuration = true;
    if (selectedDuration !== "all") {
      const durationDays = extractDays(tour.duration);
      
      switch (selectedDuration) {
        case "1-3":
          matchesDuration = durationDays >= 1 && durationDays <= 3;
          break;
        case "4-7":
          matchesDuration = durationDays >= 4 && durationDays <= 7;
          break;
        case "8-14":
          matchesDuration = durationDays >= 8 && durationDays <= 14;
          break;
        case "15+":
          matchesDuration = durationDays >= 15;
          break;
      }
    }
    
    return matchesSearchTerm && matchesDestination && matchesDuration;
  });
};

// Filter international tours (same logic as domestic)
export const filterInternationalTours = (
  tours: TourData[],
  searchTerm: string,
  selectedDestination: string, 
  selectedDuration: string
): TourData[] => {
  return filterDomesticTours(tours, searchTerm, selectedDestination, selectedDuration);
};

// Helper function to extract number of days from duration string
const extractDays = (duration: string): number => {
  const match = duration.match(/(\d+)\s*Days/i);
  return match ? parseInt(match[1], 10) : 0;
};
