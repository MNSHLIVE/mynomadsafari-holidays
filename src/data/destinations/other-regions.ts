
import { DestinationData } from "@/components/tour-itineraries/types";

export const otherDestinations: DestinationData[] = [
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
