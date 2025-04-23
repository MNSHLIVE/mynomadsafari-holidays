import { DestinationData } from "@/components/tour-itineraries/types";

export const indiaDestinations: DestinationData[] = [
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
  }
];
