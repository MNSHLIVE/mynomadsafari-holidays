
import { TourItinerary } from './itinerary-types';

export const kashmirTours: TourItinerary[] = [
  {
    id: "kashmir-summer-special",
    title: "Kashmir Summer Special",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    duration: "6N/7D",
    overview: "Experience the paradise on earth with beautiful gardens, lakes, and meadows.",
    packageType: "Premier",
    price: "35999",
    bestTime: "April to June",
    imageSrc: "/Destination/Domestic/gallery/Valley-Flowers.jpg",
    location: "Jammu & Kashmir",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival at Srinagar",
        description: "Arrival at Srinagar, check-in to houseboat. Evening Shikara ride on Dal Lake."
      },
      {
        day: 2,
        title: "Gulmarg Day Tour",
        description: "Full day at Gulmarg, enjoy Gondola ride and view of snow-capped peaks."
      },
      {
        day: 3,
        title: "Pahalgam Adventure",
        description: "Travel to Pahalgam, visit Betaab Valley and Chandanwari."
      },
      {
        day: 4,
        title: "Pahalgam Exploration",
        description: "Visit Aru Valley and Baisaran Meadows."
      },
      {
        day: 5,
        title: "Return to Srinagar",
        description: "Return to Srinagar, visit Mughal Gardens and local markets."
      },
      {
        day: 6,
        title: "Sonmarg Trip",
        description: "Day trip to Sonmarg, visit Thajiwas Glacier."
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning visit to Shankaracharya Temple, departure from Srinagar."
      }
    ]
  }
];
