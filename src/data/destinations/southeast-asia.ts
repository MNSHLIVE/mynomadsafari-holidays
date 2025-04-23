import { DestinationData } from "@/components/tour-itineraries/types";

export const southeastAsiaDestinations: DestinationData[] = [
  {
    name: "Thailand",
    region: "Southeast Asia",
    imageSrc: "/Destination/International/Main/Thailand-main.jpg",
    description: "Tropical beaches, opulent palaces, and a vibrant street life make Thailand unforgettable.",
    bestTimeToVisit: "November - March",
    budgetRange: {
      economy: "₹45,000 - ₹65,000",
      standard: "₹75,000 - ₹1,20,000",
      luxury: "₹1,50,000+"
    },
    highlights: [
      "Bangkok (Grand Palace)",
      "Phuket (Phi Phi Islands)",
      "Chiang Mai (Old City)",
      "Krabi (Railay Beach)",
      "Ayutthaya (Historical Park)"
    ],
    isHoneymoon: true
  },
  {
    name: "Bali",
    region: "Southeast Asia",
    imageSrc: "/Destination/International/Main/Bali-main.jpg",
    description: "Experience the perfect blend of beaches, culture, and adventure in this island paradise.",
    bestTimeToVisit: "April - October",
    budgetRange: {
      economy: "₹50,000 - ₹70,000",
      standard: "₹80,000 - ₹1,25,000",
      luxury: "₹1,60,000+"
    },
    highlights: [
      "Ubud (Monkey Forest)",
      "Seminyak (Beaches)",
      "Uluwatu Temple",
      "Tegallalang Rice Terraces",
      "Mount Batur"
    ],
    isHoneymoon: true
  },
  {
    name: "Singapore",
    region: "Southeast Asia",
    imageSrc: "/Destination/International/Main/Singapore-main.jpg",
    description: "A futuristic garden city with impeccable cleanliness, amazing food, and iconic landmarks.",
    bestTimeToVisit: "February - April, November - December",
    budgetRange: {
      economy: "₹55,000 - ₹75,000",
      standard: "₹85,000 - ₹1,30,000",
      luxury: "₹1,70,000+"
    },
    highlights: [
      "Gardens by the Bay",
      "Sentosa Island",
      "Marina Bay Sands",
      "Universal Studios",
      "Singapore Zoo"
    ]
  },
  {
    name: "Vietnam",
    region: "Southeast Asia",
    imageSrc: "/Destination/International/Main/Vietnam-main.jpg",
    description: "A country of breathtaking natural beauty with a unique heritage.",
    bestTimeToVisit: "February - April, August - October",
    budgetRange: {
      economy: "₹40,000 - ₹60,000",
      standard: "₹70,000 - ₹1,00,000",
      luxury: "₹1,30,000+"
    },
    highlights: [
      "Ha Long Bay",
      "Ho Chi Minh City",
      "Hoi An Ancient Town",
      "Sapa Rice Terraces",
      "Hue Imperial City"
    ]
  }
];
