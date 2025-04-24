
import { DestinationData } from "@/components/tour-itineraries/types";

export const eastIndiaDestinations: DestinationData[] = [
  {
    name: "Kolkata",
    region: "East India",
    imageSrc: "/Destination/Domestic/main/Kolkata-main.jpg",
    description: "Explore the cultural capital of India with its colonial architecture and vibrant art scene.",
    bestTimeToVisit: "October - March",
    budgetRange: {
      economy: "₹20,000 - ₹35,000",
      standard: "₹40,000 - ₹60,000",
      luxury: "₹70,000+"
    },
    highlights: [
      "Victoria Memorial",
      "Howrah Bridge",
      "Park Street",
      "College Street",
      "Sundarbans"
    ],
    slug: "kolkata"
  },
  {
    name: "Darjeeling",
    region: "East India",
    imageSrc: "/Destination/Domestic/gallery/Valley-Flowers.jpg",
    description: "Visit the 'Queen of Hills' known for its tea plantations and views of the Himalayas.",
    bestTimeToVisit: "March - June, September - November",
    budgetRange: {
      economy: "₹15,000 - ₹25,000",
      standard: "₹30,000 - ₹45,000",
      luxury: "₹50,000+"
    },
    highlights: [
      "Tiger Hill Sunrise",
      "Darjeeling Himalayan Railway",
      "Tea Gardens",
      "Batasia Loop",
      "Peace Pagoda"
    ],
    slug: "darjeeling"
  },
  {
    name: "Gangtok",
    region: "East India",
    imageSrc: "/Destination/Domestic/gallery/Jim-corbett.jpg",
    description: "Discover the capital city of Sikkim with its mountain views, monasteries, and vibrant culture.",
    bestTimeToVisit: "September - June",
    budgetRange: {
      economy: "₹18,000 - ₹28,000",
      standard: "₹35,000 - ₹50,000",
      luxury: "₹55,000+"
    },
    highlights: [
      "Nathula Pass",
      "Rumtek Monastery",
      "MG Road",
      "Tsomgo Lake",
      "Ganesh Tok"
    ],
    slug: "gangtok"
  }
];
