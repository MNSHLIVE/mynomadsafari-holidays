
import { BaseTourType } from "./tour-core";

export const jungleSafariTours: BaseTourType[] = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Jim-corbett.jpg",
    title: "Jim Corbett Tiger Safari",
    location: "Uttarakhand, India",
    duration: "3 Days",
    price: "19999",
    bestTime: "November - June",
    packageType: "Luxury",
    description: "Experience India's oldest national park with our guided tiger tracking safaris and jungle expeditions.",
    itinerary: [
      { 
        day: 1, 
        title: "Arrival & Jungle Vibes", 
        description: "Arrive at Ramnagar, check-in at a jungle resort. Evening at leisure with a nature walk or local village visit." 
      },
      { 
        day: 2, 
        title: "Jeep Safari & Wildlife Exploration", 
        description: "Early morning Jeep Safari in Bijrani or Dhikala zone. Spot Bengal tigers, elephants, deer, and exotic birds. Return to resort for lunch. Optional evening safari or visit the Corbett Museum." 
      },
      { 
        day: 3, 
        title: "River Fun & Departure", 
        description: "Morning by the Kosi River – relax or try a short trek. Breakfast and check-out. Head back with memories of the wild." 
      }
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1544985361-b420d7a77f51?q=80&w=800",
    title: "Tadoba Tiger Trail",
    location: "Maharashtra, India",
    duration: "3 Days",
    price: "17999",
    bestTime: "October - June",
    packageType: "Premier",
    description: "100% Tiger sighting guarantee at Tadoba, Maharashtra's largest national park with highest tiger density.",
    itinerary: [
      { 
        day: 1, 
        title: "Welcome to the Wild", 
        description: "Arrive at Tadoba, check-in to a forest lodge. Relax with a sunset walk around the buffer zone. Enjoy tribal cuisine and cultural interaction." 
      },
      { 
        day: 2, 
        title: "Into the Jungle", 
        description: "Early morning Jeep Safari in the Moharli or Kolara gate. Spot tigers, sloth bears, leopards, wild dogs, and birds. Return for lunch and rest. Evening buffer zone safari or lake visit for bird watching." 
      },
      { 
        day: 3, 
        title: "Nature Connect & Goodbye", 
        description: "Morning walk or photography session. Breakfast and check-out with unforgettable wildlife memories." 
      }
    ]
  }
];

