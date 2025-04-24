
import { DestinationData } from "@/components/tour-itineraries/types";

export const pilgrimageDestinations: DestinationData[] = [
  {
    name: "Varanasi",
    region: "North India",
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
    region: "North India",
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
    region: "North India",
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
