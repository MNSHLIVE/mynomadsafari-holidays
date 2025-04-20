
// Export all tour data from a central file
import { regions, activities, formatPrice } from './tour-core';
import type { PackageType, TourDay, BaseTourType, DetailedTourType } from './tour-core';
import { jungleSafariTours } from './jungle-safari-tours';
import { adventureTours } from './adventure-tours';
import { honeymoonTours } from './honeymoon-tours';
import { doorToDoorTours } from './door-to-door-tours';
import { hillStationTours } from './hill-station-tours';
import { religiousTours, religiousTourNote } from './religious-tours';

// Export all data for use in other files
export {
  regions,
  activities,
  jungleSafariTours,
  adventureTours,
  honeymoonTours,
  doorToDoorTours,
  hillStationTours,
  religiousTours,
  religiousTourNote,
  formatPrice,
};

// Export type definitions
export type { PackageType, TourDay, BaseTourType, DetailedTourType };

// For backward compatibility, maintain the original 'tours' export
export const tours = [
  ...doorToDoorTours,
  ...adventureTours,
  ...jungleSafariTours,
  ...honeymoonTours,
  ...hillStationTours,
  ...religiousTours
];
