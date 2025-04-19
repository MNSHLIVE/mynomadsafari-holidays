
import { TourItinerary } from './itinerary-types';

export const udaipurTours: TourItinerary[] = [
  {
    id: "udaipur-lake-palace",
    title: "Udaipur Lake Palace Tour",
    destinations: ["Udaipur"],
    duration: "3N/4D",
    overview: "Experience the romantic city of lakes with its magnificent palaces and rich cultural heritage.",
    packageType: "Luxury",
    price: "24999",
    bestTime: "October to March",
    imageSrc: "/Destination/Domestic/Main/Rajasthan-3.jpg",
    location: "Udaipur, Rajasthan",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival & City Palace",
        description: "Arrival at Udaipur, check-in to hotel. Evening visit to City Palace and Jagdish Temple."
      },
      {
        day: 2,
        title: "Lake Tour & Cultural Show",
        description: "Visit Lake Pichola, Jag Mandir, and evening cultural show at Bagore Ki Haveli."
      },
      {
        day: 3,
        title: "Heritage Sites",
        description: "Visit Sajjangarh Palace, Fateh Sagar Lake, and Saheliyon Ki Bari."
      },
      {
        day: 4,
        title: "Departure",
        description: "After breakfast, departure with sweet memories of the City of Lakes."
      }
    ]
  }
];
