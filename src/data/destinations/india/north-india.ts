
import { DestinationData } from "@/components/tour-itineraries/types";

export const northIndiaDestinations: DestinationData[] = [
  {
    name: "Rajasthan",
    region: "North India",
    imageSrc: "/Destination/Domestic/main/Rajasthan-main.jpg",
    description: "Experience magnificent Rajasthan heritage tours 2025 with luxury palace stays, desert safaris in Jaisalmer, and royal cultural experiences. Discover the Pink City Jaipur, romantic Lake City Udaipur, and blue city Jodhpur with expert guides.",
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
    description: "Discover stunning Himachal Pradesh tour packages 2025 featuring scenic hill stations, adventure activities, and mountain getaways. Perfect for honeymoon tours with cozy stays in Shimla, Manali, and serene Dharamshala.",
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
    description: "Experience ultimate Ladakh adventure tours 2025 with high-altitude landscapes, pristine lakes like Pangong Tso, ancient Buddhist monasteries, and thrilling bike expeditions. Ideal for adventure seekers and spiritual travelers.",
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
