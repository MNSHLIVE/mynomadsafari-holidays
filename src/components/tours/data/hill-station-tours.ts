
import { BaseTourType } from "./tour-core";

export const hillStationTours: BaseTourType[] = [
  {
    title: "Shimla Manali Delight",
    location: "Himachal Pradesh",
    duration: "5 Nights / 6 Days",
    price: "₹24,999",
    bestTime: "March to June",
    packageType: "Premier",
    imageSrc: "/Destination/Domestic/main/Himachal-Main.jpg",
    description: "Experience the charm of Himachal Pradesh with this comprehensive tour of Shimla and Manali.",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", description: "Arrive in Shimla and check-in to your hotel. Evening free to explore Mall Road." },
      { day: 2, title: "Shimla Local Sightseeing", description: "Visit Kufri, Jakhu Temple, Christ Church, and other local attractions." },
      { day: 3, title: "Shimla to Manali", description: "Scenic drive to Manali through Kullu Valley. Evening at leisure." },
      { day: 4, title: "Manali Local Sightseeing", description: "Visit Hadimba Temple, Vashisht Hot Springs, and Mall Road." },
      { day: 5, title: "Solang Valley", description: "Full day excursion to Solang Valley for adventure activities." },
      { day: 6, title: "Departure", description: "Morning free for shopping. Departure for your onward journey." }
    ]
  },
  {
    title: "Nainital Mussoorie Jim Corbett Adventure",
    location: "Uttarakhand",
    duration: "6 Nights / 7 Days",
    price: "₹27,999",
    bestTime: "March to June",
    packageType: "Luxury",
    imageSrc: "/Destination/Domestic/gallery/Nanital.jpg",
    description: "Explore the best of Uttarakhand combining hill stations and wildlife.",
    itinerary: [
      { day: 1, title: "Arrival in Nainital", description: "Check-in and evening boat ride at Naini Lake." },
      { day: 2, title: "Nainital Sightseeing", description: "Visit Snow View Point, Cave Garden, and Mall Road." },
      { day: 3, title: "Nainital to Mussoorie", description: "Scenic drive to Mussoorie. Evening at leisure." },
      { day: 4, title: "Mussoorie Exploration", description: "Visit Kempty Falls, Lal Tibba, and other attractions." },
      { day: 5, title: "Mussoorie to Jim Corbett", description: "Travel to Jim Corbett. Evening nature walk." },
      { day: 6, title: "Jungle Safari", description: "Morning and evening jungle safaris in the national park." },
      { day: 7, title: "Departure", description: "Return journey with fond memories of your vacation." }
    ]
  },
  {
    title: "South Indian Hill Station Tour",
    location: "Tamil Nadu & Karnataka",
    duration: "5 Nights / 6 Days",
    price: "₹22,999",
    bestTime: "March to June",
    packageType: "Budgeted",
    imageSrc: "/Destination/Domestic/gallery/Valley-Flowers.jpg",
    description: "Experience the beauty of South Indian hill stations.",
    itinerary: [
      { day: 1, title: "Bangalore Arrival", description: "Arrive in Bangalore and proceed to Ooty." },
      { day: 2, title: "Ooty Sightseeing", description: "Visit Botanical Gardens, Ooty Lake, and Tea Gardens." },
      { day: 3, title: "Ooty to Kodaikanal", description: "Travel to Kodaikanal. Evening boat ride at the lake." },
      { day: 4, title: "Kodaikanal Exploration", description: "Visit Pillar Rocks, Silver Cascade Falls, and more." },
      { day: 5, title: "Kodaikanal Leisure", description: "Day free for shopping and relaxation." },
      { day: 6, title: "Return Journey", description: "Departure for Bangalore and onward journey." }
    ]
  },
  {
    title: "Mahabaleshwar Strawberry Special",
    location: "Maharashtra",
    duration: "3 Nights / 4 Days",
    price: "₹15,999",
    bestTime: "November to June",
    packageType: "Budgeted",
    imageSrc: "/Destination/Domestic/gallery/Jim-corbett.jpg",
    description: "Visit India's strawberry capital and enjoy the pleasant weather.",
    itinerary: [
      { day: 1, title: "Arrival in Mahabaleshwar", description: "Check-in and evening visit to Sunset Point." },
      { day: 2, title: "Local Sightseeing", description: "Visit various points and strawberry farms." },
      { day: 3, title: "Panchgani Excursion", description: "Visit Table Land and other attractions." },
      { day: 4, title: "Departure", description: "Return journey with fresh strawberries." }
    ]
  }
];
