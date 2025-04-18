
// Export all tour data from a central file
import { regions, activities, formatPrice } from './tour-core';
import type { PackageType, TourDay, BaseTourType, DetailedTourType } from './tour-core';
import { jungleSafariTours } from './jungle-safari-tours';
import { adventureTours } from './adventure-tours';
import { honeymoonTours } from './honeymoon-tours';
import { doorToDoorTours } from './door-to-door-tours';

// Export all data for use in other files
export {
  regions,
  activities,
  jungleSafariTours,
  adventureTours,
  honeymoonTours,
  doorToDoorTours,
  formatPrice,
};

// Export type definitions
export type { PackageType, TourDay, BaseTourType, DetailedTourType };

// For backward compatibility, maintain the original 'tours' export
export const tours = [
  ...doorToDoorTours,
  ...adventureTours,
  ...jungleSafariTours,
  ...honeymoonTours
  // Add other tours as needed for backward compatibility
];
