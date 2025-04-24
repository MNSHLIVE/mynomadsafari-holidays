
import { indiaDestinations } from "./india";
import { southeastAsiaDestinations } from "./southeast-asia";
import { middleEastDestinations } from "./middle-east";
import { europeDestinations } from "./europe";
import { otherRegionsDestinations } from "./other-regions";

// Export all destination arrays
export {
  indiaDestinations,
  southeastAsiaDestinations,
  middleEastDestinations,
  europeDestinations,
  otherRegionsDestinations
};

// Combine all destinations into one array
export const destinations = [
  ...indiaDestinations,
  ...southeastAsiaDestinations,
  ...middleEastDestinations,
  ...europeDestinations,
  ...otherRegionsDestinations
];

// Helper function to get unique regions
export const getRegions = () => {
  const regions = destinations.map(destination => destination.region);
  return [...new Set(regions)].sort();
};

// Helper function to get destinations by region
export const getDestinationsByRegion = (region: string) => {
  return destinations.filter(destination => destination.region === region);
};
