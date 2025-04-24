
import { DestinationData } from "@/components/tour-itineraries/types";
import { northIndiaDestinations } from "./north-india";
import { southIndiaDestinations } from "./south-india";
import { westIndiaDestinations } from "./west-india";
import { pilgrimageDestinations } from "./pilgrimage-destinations";

export const indiaDestinations: DestinationData[] = [
  ...northIndiaDestinations,
  ...southIndiaDestinations,
  ...westIndiaDestinations,
  ...pilgrimageDestinations
];

// Re-export everything for backward compatibility
export * from "./north-india";
export * from "./south-india";
export * from "./west-india";
export * from "./pilgrimage-destinations";
