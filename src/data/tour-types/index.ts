
export * from './itinerary-types';
export * from './rajasthan-tours';
export * from './kerala-tours';
export * from './goa-tours';
export * from './himachal-tours';
export * from './international-tours';

// For backward compatibility
export const domesticItineraries = [
  ...rajasthanTours,
  ...keralaTours,
  ...goaTours,
  ...himachalTours
];

export const internationalItineraries = [
  ...dubaiTours,
  ...singaporeTours,
  ...baliTours
];
