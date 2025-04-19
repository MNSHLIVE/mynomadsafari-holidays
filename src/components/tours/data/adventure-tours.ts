
import { BaseTourType } from "./tour-core";

export const adventureTours: BaseTourType[] = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Rishikesh-Rafting.jpg",
    title: "Rishikesh River Rafting Adventure",
    location: "Rishikesh, Uttarakhand",
    duration: "4 Days",
    price: "15999",
    bestTime: "September - June",
    packageType: "Budgeted",
    description: "Experience thrilling white water rafting on the sacred Ganges River with camping and yoga.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Campfire",
        description: "Arrive in Rishikesh by afternoon. Check-in at riverside camp or hotel. Welcome drinks and orientation. Explore nearby riverbanks or take a nature walk. Evening bonfire with music and dinner."
      },
      {
        day: 2,
        title: "Rafting Adventure",
        description: "Early breakfast. Rafting through thrilling rapids like Roller Coaster, Golf Course & Club House (16 km stretch). Body surfing, cliff jumping, and swimming breaks. Return to camp for lunch. Optional yoga or meditation session in the evening. Campfire and stargazing."
      },
      {
        day: 3,
        title: "Adventure & Local Exploration",
        description: "Choose between Bungee Jumping / Zip-lining / Giant Swing (optional). Visit Lakshman Jhula, Ram Jhula, and the Beatles Ashram. Ganga Aarti at Triveni Ghat in the evening. Dinner and overnight stay."
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning breakfast. Check out and head back with river-side memories!"
      }
    ],
    additionalInfo: {
      howToReach: [
        "By Train: Haridwar Station (20 km away)",
        "By Road: 6-7 hour drive from Delhi",
        "By Air: Jolly Grant Airport, Dehradun (35 km away)"
      ],
      experiences: [
        "White water rafting in the Ganges",
        "Riverside camping and yoga sessions",
        "Bungee jumping and other extreme sports",
        "Spiritual exploration & Ganga Aarti ceremony"
      ]
    }
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1572845471572-8163485f89e8?q=80&w=800",
    title: "Ladakh Bike Expedition",
    location: "Ladakh",
    duration: "7 Days",
    price: "42999",
    bestTime: "June - September",
    packageType: "Premier",
    description: "Epic motorcycle journey through world's highest motorable passes and stunning landscapes.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh",
        description: "Arrive at Leh (3500m). Rest and acclimatize to high altitude. Visit Shanti Stupa and Leh Market in the evening. Briefing and bike check."
      },
      {
        day: 2,
        title: "Leh to Nubra Valley",
        description: "Start the ride to Nubra Valley via Khardung La (5,359 m). Visit Diskit Monastery & enjoy the desert landscape. Optional ATV ride or camel safari in Hunder. Overnight stay in Nubra camp."
      },
      {
        day: 3,
        title: "Nubra to Turtuk",
        description: "Ride to Turtuk village (near the India-Pakistan border). Explore the Baltistani culture and scenic beauty. Return to Nubra / Overnight stay."
      },
      {
        day: 4,
        title: "Nubra to Pangong Lake",
        description: "Ride to the stunning Pangong Lake (4,350 m). Enjoy the surreal views (famous from 3 Idiots movie). Camp by the lake under starry skies."
      },
      {
        day: 5,
        title: "Pangong to Leh",
        description: "Return ride to Leh via Chang La Pass. En route stop at Hemis Monastery or Shey Palace. Evening free for shopping or café hopping."
      },
      {
        day: 6,
        title: "Sham Valley Day Ride",
        description: "Visit Magnetic Hill, Zanskar-Indus Confluence, Gurudwara Pathar Sahib. Return to Leh for the night. Celebration dinner with the group."
      },
      {
        day: 7,
        title: "Departure",
        description: "Airport drop with unforgettable memories of the mountains."
      }
    ],
    additionalInfo: {
      howToReach: [
        "By Air: Leh Kushok Bakula Rimpochee Airport (connected to Delhi)",
        "By Road: Manali-Leh and Srinagar-Leh routes (for full overland journey)"
      ],
      experiences: [
        "Riding through Khardung La, Chang La, and high-altitude passes",
        "Camping beside Pangong Lake",
        "Exploring Nubra's sand dunes and monasteries",
        "Experiencing Ladakhi culture and cuisine"
      ]
    }
  }
];
