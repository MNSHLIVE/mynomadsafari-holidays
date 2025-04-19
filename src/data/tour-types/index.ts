
export * from './itinerary-types';
export * from './rajasthan-tours';
export * from './kerala-tours';
export * from './goa-tours';
export * from './himachal-tours';
export * from './international-tours';
export * from './udaipur-tours';
export * from './jaisalmer-tours';
export * from './kashmir-tours';

// For backward compatibility
import { rajasthanTours } from './rajasthan-tours';
import { keralaTours } from './kerala-tours';
import { goaTours } from './goa-tours';
import { himachalTours } from './himachal-tours';
import { udaipurTours } from './udaipur-tours';
import { jaisalmerTours } from './jaisalmer-tours';
import { kashmirTours } from './kashmir-tours';
import { dubaiTours, singaporeTours, baliTours } from './international-tours';

export const domesticItineraries = [
  ...rajasthanTours,
  ...keralaTours,
  ...goaTours,
  ...himachalTours,
  ...udaipurTours,
  ...jaisalmerTours,
  ...kashmirTours
];

export const internationalItineraries = [
  ...dubaiTours,
  ...singaporeTours,
  ...baliTours
];
