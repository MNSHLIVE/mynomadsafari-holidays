
import { DomesticTourDetails, InternationalTourDetails, BaseTourDetails } from "./types";

// Get unique destinations from a list of tours
export const getUniqueDestinations = (tours: BaseTourDetails[]): string[] => {
  return [...new Set(tours.map(tour => tour.destination))].sort();
};

// Filter domestic tours based on search term, destination, and duration
export const filterDomesticTours = (
  tours: DomesticTourDetails[],
  searchTerm: string,
  destination: string,
  duration: string
): DomesticTourDetails[] => {
  return tours.filter((tour) => {
    // Filter by search term (case-insensitive)
    const matchesSearch =
      !searchTerm ||
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by destination
    const matchesDestination =
      destination === "all" || tour.destination === destination;

    // Filter by duration
    let matchesDuration = duration === "all";
    
    if (!matchesDuration) {
      // Extract the number of days from the duration string
      const durationDays = parseInt(tour.duration.split(' ')[0]);
      
      if (duration === "short" && durationDays <= 3) matchesDuration = true;
      if (duration === "medium" && durationDays > 3 && durationDays <= 7) matchesDuration = true;
      if (duration === "long" && durationDays > 7) matchesDuration = true;
    }

    return matchesSearch && matchesDestination && matchesDuration;
  });
};

// Filter international tours based on search term, destination, and duration
export const filterInternationalTours = (
  tours: InternationalTourDetails[],
  searchTerm: string,
  destination: string,
  duration: string
): InternationalTourDetails[] => {
  return tours.filter((tour) => {
    // Filter by search term (case-insensitive)
    const matchesSearch =
      !searchTerm ||
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by destination
    const matchesDestination =
      destination === "all" || tour.destination === destination;

    // Filter by duration
    let matchesDuration = duration === "all";
    
    if (!matchesDuration) {
      // Extract the number of days from the duration string
      const durationDays = parseInt(tour.duration.split(' ')[0]);
      
      if (duration === "short" && durationDays <= 3) matchesDuration = true;
      if (duration === "medium" && durationDays > 3 && durationDays <= 7) matchesDuration = true;
      if (duration === "long" && durationDays > 7) matchesDuration = true;
    }

    return matchesSearch && matchesDestination && matchesDuration;
  });
};
