
import { DestinationData } from "@/components/tour-itineraries/types";

export const southIndiaDestinations: DestinationData[] = [
  {
    name: "Kerala",
    region: "South India",
    imageSrc: "/Destination/Domestic/main/Kerala-main.jpg",
    description: "Discover the serene backwaters and lush greenery of God's own country.",
    bestTimeToVisit: "September - March",
    budgetRange: {
      economy: "₹35,000 - ₹50,000",
      standard: "₹60,000 - ₹90,000",
      luxury: "₹1,20,000+"
    },
    highlights: [
      "Munnar (Tea Gardens)",
      "Alleppey (Backwaters)",
      "Kochi (Fort Kochi)",
      "Thekkady (Periyar Wildlife Sanctuary)",
      "Kovalam (Beaches)"
    ],
    isHoneymoon: true
  }
];
