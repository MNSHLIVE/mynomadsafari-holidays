
import { TourItinerary } from './itinerary-types';

export const jaisalmerTours: TourItinerary[] = [
  {
    id: "jaisalmer-desert-safari",
    title: "Golden City Desert Safari",
    destinations: ["Jaisalmer"],
    duration: "4N/5D",
    overview: "Experience the magic of the Thar Desert with golden sand dunes and rich cultural heritage.",
    packageType: "Premier",
    price: "27999",
    bestTime: "October to February",
    imageSrc: "/Destination/Domestic/Main/Rajasthan-main.jpg",
    location: "Jaisalmer, Rajasthan",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival & Fort Visit",
        description: "Arrival at Jaisalmer, check-in to hotel. Evening visit to Jaisalmer Fort."
      },
      {
        day: 2,
        title: "Heritage Walk",
        description: "Visit Patwon Ki Haveli, Salim Singh Ki Haveli, and local markets."
      },
      {
        day: 3,
        title: "Desert Safari",
        description: "Full day desert safari at Sam Sand Dunes with camel ride and cultural program."
      },
      {
        day: 4,
        title: "Lakes & Temples",
        description: "Visit Gadsisar Lake, Bada Bagh, and ancient Jain temples."
      },
      {
        day: 5,
        title: "Departure",
        description: "After breakfast, departure from Jaisalmer."
      }
    ]
  }
];
