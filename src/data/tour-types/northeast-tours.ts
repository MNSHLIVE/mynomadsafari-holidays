
import { TourItinerary } from './itinerary-types';

export const northeastTours: TourItinerary[] = [
  {
    id: "northeast-explorer",
    title: "Northeast Explorer - Meghalaya, Assam & Arunachal",
    destinations: ["Shillong", "Cherrapunjee", "Mawlynnong", "Kaziranga", "Dirang", "Tawang"],
    duration: "6N/7D",
    overview: "Experience the untouched beauty of Northeast India, from living root bridges to the world's largest river island, majestic monasteries and national parks.",
    packageType: "Premier",
    price: "39999",
    bestTime: "October to May",
    imageSrc: "/Destination/Domestic/gallery/Valley-Flowers.jpg",
    location: "Meghalaya, Assam & Arunachal Pradesh",
    dailyPlans: [
      {
        day: 1,
        title: "Guwahati to Shillong",
        description: "Arrival at Guwahati Airport. Visit Kamakhya Temple and enjoy an optional Brahmaputra River cruise. Drive to Shillong (100 km/3 hrs) with a stop at the beautiful Umiam Lake. Overnight in Shillong."
      },
      {
        day: 2,
        title: "Shillong to Cherrapunjee",
        description: "Explore Shillong's attractions - Elephant Falls and Shillong Peak. Drive to Cherrapunjee (54 km/2 hrs). Visit Nohkalikai Falls, Mawsmai Caves, and Seven Sisters Falls. Optional trek to Arwah Caves. Overnight in Cherrapunjee."
      },
      {
        day: 3,
        title: "Cherrapunjee - Dawki - Mawlynnong - Shillong",
        description: "Visit Dawki and experience boating in the crystal-clear Umngot River. Explore Mawlynnong, Asia's cleanest village, and see the famous living root bridge. Return to Shillong for overnight stay."
      },
      {
        day: 4,
        title: "Shillong to Kaziranga National Park",
        description: "Drive to Kaziranga National Park (230 km/5-6 hrs), a UNESCO World Heritage Site famous for one-horned rhinoceros. Evening cultural program or local village visit. Overnight in Kaziranga."
      },
      {
        day: 5,
        title: "Kaziranga to Dirang",
        description: "Morning Jeep Safari at Kaziranga's Eastern Range to spot rhinos, elephants, and other wildlife. Drive to Dirang (270 km/7-8 hrs) in Arunachal Pradesh. Overnight in Dirang."
      },
      {
        day: 6,
        title: "Dirang to Tawang",
        description: "Journey through breathtaking landscapes to Tawang. Enroute, visit Sela Pass (13,700 ft) and Jaswant Garh War Memorial. In Tawang, explore the magnificent Tawang Monastery, the largest in India. Overnight in Tawang."
      },
      {
        day: 7,
        title: "Tawang - Bomdila - Guwahati - Departure",
        description: "Return journey with scenic stops at Bomdila and drive back to Guwahati for your departure. (This can be split into 2 days for a more relaxed journey if preferred)."
      }
    ],
    inclusions: [
      "Accommodation in 3-star hotels/homestays",
      "Daily breakfast and dinner",
      "Private vehicle for transfers and sightseeing",
      "Inner Line Permits for Arunachal Pradesh",
      "Safari charges at Kaziranga (1 safari)",
      "Experienced driver and local guides",
      "All applicable taxes"
    ],
    exclusions: [
      "Airfare",
      "Lunch and personal expenses",
      "Additional activities not mentioned in itinerary",
      "Camera fees",
      "Tips and gratuities",
      "Travel insurance"
    ],
    notes: "This itinerary covers significant distances in mountainous terrain. Road conditions in the Northeast can be challenging at times. Inner Line Permits are required for Arunachal Pradesh and will be arranged by us."
  }
];
