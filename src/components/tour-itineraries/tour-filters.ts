
import { TourData } from "./types";

export const filterDomesticTours = (
  tours: TourData[],
  searchTerm: string,
  selectedDestination: string,
  selectedDuration: string
): TourData[] => {
  return tours.filter(tour => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tour.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = selectedDestination === "all" || tour.location === selectedDestination;
    
    const matchesDuration = selectedDuration === "all" || 
      (selectedDuration === "short" && tour.duration.includes("3 Nights")) || 
      (selectedDuration === "long" && tour.duration.includes("6 Nights"));
      
    return matchesSearch && matchesDestination && matchesDuration;
  });
};

export const filterInternationalTours = (
  tours: TourData[],
  searchTerm: string,
  selectedDestination: string,
  selectedDuration: string
): TourData[] => {
  return tours.filter(tour => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tour.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = selectedDestination === "all" || tour.location === selectedDestination;
    
    const matchesDuration = selectedDuration === "all" || 
      (selectedDuration === "short" && tour.duration.includes("4 Nights")) || 
      (selectedDuration === "long" && tour.duration.includes("8 Nights"));
      
    return matchesSearch && matchesDestination && matchesDuration;
  });
};

export const getUniqueDestinations = (tours: TourData[]): string[] => {
  return [...new Set(tours.map(tour => tour.location))];
};
