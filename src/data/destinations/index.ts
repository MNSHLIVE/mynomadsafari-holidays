
import { DestinationData } from "@/components/tour-itineraries/types";
import { indiaDestinations } from "./india";
import { southeastAsiaDestinations } from "./southeast-asia";
import { middleEastDestinations } from "./middle-east";
import { europeanDestinations } from "./europe";
import { otherDestinations } from "./other-regions";

export const destinations: DestinationData[] = [
  ...indiaDestinations,
  ...southeastAsiaDestinations,
  ...middleEastDestinations,
  ...europeanDestinations,
  ...otherDestinations
];

export const getRegions = (): string[] => {
  return [...new Set(destinations.map(dest => dest.region))];
};

export const getDestinationsByRegion = (region: string): DestinationData[] => {
  return destinations.filter(dest => dest.region === region);
};

export const getPilgrimageDestinations = (): DestinationData[] => {
  return destinations.filter(dest => dest.isPilgrimage === true);
};

export const getHoneymoonDestinations = (): DestinationData[] => {
  return destinations.filter(dest => dest.isHoneymoon === true);
};

// Re-export everything for backward compatibility
export * from "./india";
export * from "./southeast-asia";
export * from "./middle-east";
export * from "./europe";
export * from "./other-regions";
