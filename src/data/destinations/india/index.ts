
// This file exports all Indian destinations
import { northIndiaDestinations } from "./north-india";
import { southIndiaDestinations } from "./south-india";
import { westIndiaDestinations } from "./west-india";
import { eastIndiaDestinations } from "./east-india";
import { pilgrimageDestinations } from "./pilgrimage-destinations";

// Export individual arrays
export {
  northIndiaDestinations,
  southIndiaDestinations,
  westIndiaDestinations,
  eastIndiaDestinations,
  pilgrimageDestinations
};

// Combine all Indian destinations into one array
export const indiaDestinations = [
  ...northIndiaDestinations,
  ...southIndiaDestinations,
  ...westIndiaDestinations,
  ...eastIndiaDestinations,
  ...pilgrimageDestinations
];
