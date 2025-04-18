
import { BaseTourType } from "./tour-core";

export const jungleSafariTours: BaseTourType[] = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Jim-corbett.jpg",
    title: "Jim Corbett Tiger Safari",
    location: "Uttarakhand, India",
    duration: "4 Days",
    price: "19999",
    bestTime: "November - June",
    packageType: "Luxury",
    description: "Experience India's oldest national park with our guided tiger tracking safaris and jungle expeditions.",
    itinerary: [
      { day: 1, title: "Arrival & Evening Safari", description: "Arrive at Jim Corbett, check-in to jungle resort. Evening jeep safari in Bijrani zone." },
      { day: 2, title: "Morning & Evening Safaris", description: "Early morning safari in Dhikala zone. After lunch, evening safari in Durga Devi zone." },
      { day: 3, title: "Full Day Safari Experience", description: "Full day canter safari in Dhikala zone with packed meals. Best chances for tiger sighting." },
      { day: 4, title: "Final Safari & Departure", description: "Early morning safari in Bijrani zone. After breakfast, departure with fond memories." }
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
      { day: 1, title: "Welcome to Tiger Territory", description: "Arrive at Nagpur, transfer to Tadoba. Evening safari in core zone." },
      { day: 2, title: "Double Safari Day", description: "Morning and evening safaris in different zones. High probability of tiger sightings." },
      { day: 3, title: "Final Safari & Return", description: "Morning safari followed by departure to Nagpur." }
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1566497472397-8a3c761b7498?q=80&w=800",
    title: "Kaziranga Wildlife Explorer",
    location: "Assam, India",
    duration: "4 Days",
    price: "23999",
    bestTime: "November - April",
    packageType: "Premier",
    description: "Discover the UNESCO site home to two-thirds of the world's one-horned rhinoceros population.",
    itinerary: [
      { day: 1, title: "Arrival & Orientation", description: "Arrive at Guwahati, transfer to Kaziranga. Evening nature walk and briefing." },
      { day: 2, title: "Central Range Safari", description: "Early morning elephant safari followed by jeep safari in Central Range." },
      { day: 3, title: "Eastern Range Explorer", description: "Full day exploration of Eastern Range, known for rhinos and water birds." },
      { day: 4, title: "Western Range & Departure", description: "Morning safari in Western Range, afternoon departure to Guwahati." }
    ]
  }
];
