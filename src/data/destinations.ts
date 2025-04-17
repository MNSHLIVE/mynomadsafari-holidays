import { DestinationData } from "@/components/tour-itineraries/types";

export const destinations: DestinationData[] = [
  // India
  {
    name: "Rajasthan",
    region: "India",
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
    name: "Kerala",
    region: "India",
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
  },
  {
    name: "Goa",
    region: "India",
    imageSrc: "/Destination/Domestic/main/Goa-main.jpg",
    description: "Relax on sandy beaches and enjoy the vibrant nightlife of this coastal paradise.",
    bestTimeToVisit: "November - February",
    budgetRange: {
      economy: "₹25,000 - ₹40,000",
      standard: "₹45,000 - ₹75,000",
      luxury: "₹90,000+"
    },
    highlights: [
      "Calangute Beach",
      "Old Goa Churches",
      "Dudhsagar Falls",
      "Anjuna Flea Market",
      "Fort Aguada"
    ],
    isHoneymoon: true
  },
  {
    name: "Himachal Pradesh",
    region: "India",
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
    region: "India",
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
  },
  {
    name: "Andaman & Nicobar",
    region: "India",
    imageSrc: "/Destination/Domestic/main/Andaman-main.jpg",
    description: "Discover pristine beaches, crystal clear waters, and rich marine life in this tropical paradise.",
    bestTimeToVisit: "November - May",
    budgetRange: {
      economy: "₹40,000 - ₹60,000",
      standard: "₹70,000 - ₹1,00,000",
      luxury: "₹1,30,000+"
    },
    highlights: [
      "Radhanagar Beach",
      "Cellular Jail",
      "Ross Island",
      "Havelock Island",
      "Neil Island"
    ],
    isHoneymoon: true
  },
  {
    name: "Varanasi",
    region: "India",
    imageSrc: "/Destination/Home/Religious-Places/Varanasi-religious.jpg",
    description: "Experience the spiritual heart of India along the sacred Ganges river.",
    bestTimeToVisit: "October - March",
    budgetRange: {
      economy: "₹20,000 - ₹35,000",
      standard: "₹40,000 - ₹60,000",
      luxury: "₹70,000+"
    },
    highlights: [
      "Ganga Aarti at Dasaswamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath (Buddha's First Sermon Site)",
      "Morning Boat Ride on Ganges",
      "Ramnagar Fort"
    ],
    isPilgrimage: true
  },
  {
    name: "Char Dham",
    region: "India",
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg",
    description: "Embark on the sacred journey to the four holy sites in the Indian Himalayas.",
    bestTimeToVisit: "May - June, September - October",
    budgetRange: {
      economy: "₹35,000 - ₹50,000",
      standard: "₹55,000 - ₹75,000",
      luxury: "₹85,000+"
    },
    highlights: [
      "Yamunotri",
      "Gangotri",
      "Kedarnath",
      "Badrinath"
    ],
    isPilgrimage: true
  },
  {
    name: "Haridwar & Rishikesh",
    region: "India",
    imageSrc: "/Destination/Home/Religious-Places/Haridwar-religious.jpg",
    description: "Visit the gateway to the gods and the yoga capital of the world along the sacred Ganges.",
    bestTimeToVisit: "September - April",
    budgetRange: {
      economy: "₹20,000 - ₹30,000",
      standard: "₹35,000 - ₹50,000",
      luxury: "₹60,000+"
    },
    highlights: [
      "Har Ki Pauri",
      "Ganga Aarti",
      "Lakshman Jhula",
      "Triveni Ghat",
      "Rajaji National Park"
    ],
    isPilgrimage: true
  },

  // International - Southeast Asia
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
  },

  // Middle East
  {
    name: "Dubai",
    region: "Middle East",
    imageSrc: "/Destination/International/Main/Dubai-main.jpg",
    description: "A glamorous city of superlatives, from the world's tallest building to man-made islands.",
    bestTimeToVisit: "November - March",
    budgetRange: {
      economy: "₹60,000 - ₹85,000",
      standard: "₹1,00,000 - ₹1,50,000",
      luxury: "₹2,00,000+"
    },
    highlights: [
      "Burj Khalifa",
      "Palm Jumeirah",
      "Dubai Mall",
      "Dubai Marina",
      "Desert Safari"
    ]
  },

  // Others
  {
    name: "Maldives",
    region: "Indian Ocean",
    imageSrc: "/Destination/International/Main/Maldives-main.jpg",
    description: "A tropical paradise of pristine white beaches, crystal clear lagoons and incredible underwater wildlife.",
    bestTimeToVisit: "November - April",
    budgetRange: {
      economy: "₹75,000 - ₹1,00,000",
      standard: "₹1,30,000 - ₹2,00,000",
      luxury: "₹3,00,000+"
    },
    highlights: [
      "Male",
      "Maafushi Island",
      "Biyadhoo Island",
      "Veligandu Island",
      "Alimatha Island"
    ],
    isHoneymoon: true
  },
  {
    name: "Nepal",
    region: "South Asia",
    imageSrc: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&auto=format&fit=crop&q=80",
    description: "Experience the majesty of the Himalayas and rich cultural heritage.",
    bestTimeToVisit: "March - May, September - November",
    budgetRange: {
      economy: "₹25,000 - ₹40,000",
      standard: "₹45,000 - ₹70,000",
      luxury: "₹90,000+"
    },
    highlights: [
      "Kathmandu Valley",
      "Pokhara",
      "Everest Base Camp Trek",
      "Chitwan National Park",
      "Pashupatinath Temple"
    ],
    isPilgrimage: true
  },
  {
    name: "Bhutan",
    region: "South Asia",
    imageSrc: "https://images.unsplash.com/photo-1557268038-29a7e3fd7483?w=800&auto=format&fit=crop&q=80",
    description: "Discover the Land of the Thunder Dragon with its pristine landscapes and ancient monasteries.",
    bestTimeToVisit: "March - May, September - November",
    budgetRange: {
      economy: "₹40,000 - ₹60,000",
      standard: "₹70,000 - ₹1,00,000",
      luxury: "₹1,20,000+"
    },
    highlights: [
      "Paro Taktsang (Tiger's Nest)",
      "Thimphu",
      "Punakha Dzong",
      "Dochula Pass",
      "Haa Valley"
    ]
  },
  {
    name: "Kazakhstan",
    region: "Central Asia",
    imageSrc: "https://images.unsplash.com/photo-1604897984704-ae346b746686?w=800&auto=format&fit=crop&q=80",
    description: "Explore vast steppes, modern cities, and the rich nomadic heritage of Central Asia.",
    bestTimeToVisit: "May - September",
    budgetRange: {
      economy: "₹50,000 - ₹70,000",
      standard: "₹80,000 - ₹1,20,000",
      luxury: "₹1,50,000+"
    },
    highlights: [
      "Almaty",
      "Nur-Sultan (Astana)",
      "Charyn Canyon",
      "Big Almaty Lake",
      "Kolsai Lakes"
    ]
  }
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
