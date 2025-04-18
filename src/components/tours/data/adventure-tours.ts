
import { BaseTourType } from "./tour-core";

export const adventureTours: BaseTourType[] = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Rishikesh-Rafting.jpg",
    title: "Rishikesh River Rafting Adventure",
    location: "Uttarakhand, India",
    duration: "4 Days",
    price: "15999",
    bestTime: "September - June",
    packageType: "Budgeted",
    description: "Experience thrilling white water rafting on the sacred Ganges River with camping and yoga.",
    itinerary: [
      { day: 1, title: "Arrival & Basic Training", description: "Arrive in Rishikesh, check-in to camp. Evening safety briefing and training." },
      { day: 2, title: "Beginner Rapids", description: "Start with 16km stretch covering Grade II & III rapids. Evening bonfire and camping." },
      { day: 3, title: "Advanced Rapids", description: "24km advanced rafting covering Grade III & IV rapids including famous 'Golf Course' rapid." },
      { day: 4, title: "Yoga & Departure", description: "Morning yoga session, leisure time for local exploration, and departure." }
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1572845471572-8163485f89e8?q=80&w=800",
    title: "Ladakh Bike Expedition",
    location: "Ladakh, India",
    duration: "11 Days",
    price: "42999",
    bestTime: "June - September",
    packageType: "Premier",
    description: "Epic motorcycle journey through world's highest motorable passes and stunning landscapes.",
    itinerary: [
      { day: 1, title: "Arrival in Leh", description: "Acclimatization day in Leh (11,500 ft), bike allocation and briefing." },
      { day: 2, title: "Local Monasteries", description: "Short ride to Hemis and Thiksey monasteries for acclimatization." },
      { day: 3, title: "Khardung La Pass", description: "Ride to world's highest motorable pass (18,380 ft) and Nubra Valley." },
      { day: 4, title: "Nubra Valley", description: "Explore Diskit Monastery, sand dunes, and double-humped camels." },
      { day: 5, title: "Pangong Lake", description: "Ride to stunning Pangong Lake (14,270 ft) via Shyok Valley." },
      { day: 6, title: "Return to Leh", description: "Return ride to Leh via Chang La Pass (17,688 ft)." },
      { day: 7, title: "Departure", description: "Final breakfast and departure with lifetime memories." }
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1525087740718-304971c5e6a4?q=80&w=800",
    title: "Spiti Valley Expedition",
    location: "Himachal Pradesh, India",
    duration: "10 Days",
    price: "35999",
    bestTime: "July - September",
    packageType: "Luxury",
    description: "Journey through the remote Buddhist kingdom with stunning landscapes and ancient monasteries.",
    itinerary: [
      { day: 1, title: "Start from Manali", description: "Drive from Manali to Kaza via Rohtang Pass and Kunzum La." },
      { day: 2, title: "Kaza Acclimatization", description: "Local sightseeing and acclimatization in Kaza (12,500 ft)." },
      { day: 3, title: "Key Monastery", description: "Visit Key Monastery and Kibber Village (14,200 ft)." },
      { day: 4, title: "Chandrataal Lake", description: "Drive to stunning Chandrataal Lake (14,100 ft). Camp under stars." },
      { day: 5, title: "Return to Manali", description: "Return journey to Manali via different route for new views." }
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=800",
    title: "Himachal Adventure Camp",
    location: "Himachal Pradesh, India",
    duration: "5 Days",
    price: "18999",
    bestTime: "April - June, September - November",
    packageType: "Budgeted",
    description: "Multi-activity camping experience in the beautiful Himalayan valleys.",
    itinerary: [
      { day: 1, title: "Camp Setup", description: "Arrive at basecamp in Solang Valley. Evening bonfire and briefing." },
      { day: 2, title: "Paragliding Day", description: "Paragliding experience and rock climbing basics." },
      { day: 3, title: "Trekking Day", description: "Day trek to nearby peak with packed lunch. Evening rappelling." },
      { day: 4, title: "River Activities", description: "River crossing and zip lining activities. Evening cultural show." },
      { day: 5, title: "Departure", description: "Morning yoga, leisure time, and departure." }
    ]
  }
];
