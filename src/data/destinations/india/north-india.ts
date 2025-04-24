
import { DestinationData } from "@/components/tour-itineraries/types";

export const northIndiaDestinations: DestinationData[] = [
  {
    name: "Rajasthan",
    region: "North India",
    imageSrc: "/Destination/Domestic/main/Rajasthan-main.jpg",
    description: "Experience the vibrant culture and royal heritage of the land of kings.",
    bestTimeToVisit: "October - March",
    budgetRange: {
      economy: "₹30,000 - ₹45,000",
      standard: "₹50,000 - ₹80,000",
      luxury: "₹1,00,000+"
    },
    highlights: [
      "Jaipur (Amber Fort)",
      "Udaipur (Lake Pichola)",
      "Jaisalmer (Desert Safari)",
      "Jodhpur (Mehrangarh Fort)",
      "Pushkar (Sacred Lake)"
    ]
  },
  {
    name: "Himachal Pradesh",
    region: "North India",
    imageSrc: "/Destination/Domestic/main/Himachal-Main.jpg",
    description: "Experience the majestic Himalayas and charming hill stations.",
    bestTimeToVisit: "March - June, September - November",
    budgetRange: {
      economy: "₹28,000 - ₹42,000",
      standard: "₹50,000 - ₹75,000",
      luxury: "₹90,000+"
    },
    highlights: [
      "Shimla (Mall Road)",
      "Manali (Rohtang Pass)",
      "Dharamshala (McLeodganj)",
      "Dalhousie",
      "Spiti Valley"
    ],
    isHoneymoon: true
  },
  {
    name: "Ladakh",
    region: "North India",
    imageSrc: "/Destination/Domestic/main/Ladhak-main.jpg",
    description: "Explore the high-altitude desert landscapes and Buddhist monasteries of this remote Himalayan region.",
    bestTimeToVisit: "June - September",
    budgetRange: {
      economy: "₹40,000 - ₹60,000",
      standard: "₹70,000 - ₹1,00,000",
      luxury: "₹1,30,000+"
    },
    highlights: [
      "Leh Palace",
      "Pangong Lake",
      "Nubra Valley",
      "Magnetic Hill",
      "Thiksey Monastery"
    ]
  }
];
