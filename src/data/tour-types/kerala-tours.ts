import { TourItinerary } from './itinerary-types';

export const keralaTours: TourItinerary[] = [
  // Kerala Itineraries
  {
    id: "kerala-backwater-bliss-4d",
    title: "Kerala Backwater Bliss - 4 Days",
    destinations: ["Cochin", "Munnar", "Alleppey"],
    duration: "3 Nights / 4 Days",
    overview: "Experience the historic charm of Cochin, the misty highlands of Munnar, and the serene backwaters of Alleppey on this short Kerala escape.",
    packageType: "Budgeted",
    price: "₹14,999",
    bestTime: "September to March",
    imageSrc: "/Destination/Domestic/main/Kerala-main.jpg",
    location: "Kerala",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Cochin & Fort Kochi Exploration",
        description: "Arrive at Cochin Airport (COK)/Railway Station. Meet our representative and transfer to your hotel. After check-in and freshening up, proceed for sightseeing in Fort Kochi. Visit the iconic Chinese Fishing Nets, St. Francis Church (India's oldest European church), Santa Cruz Basilica, and explore the charming streets of the Jewish Quarter and Mattancherry Palace (Dutch Palace). In the evening, option to attend a Kathakali dance performance (at additional cost). Overnight stay in Cochin."
      },
      {
        day: 2,
        title: "Cochin to Munnar (130 km / 4 hrs)",
        description: "After breakfast, drive to Munnar, a picturesque hill station known for its vast tea estates and misty mountains. En route, stop at Cheeyappara Waterfall and spice gardens. Upon arrival in Munnar, check-in at your hotel. Evening at leisure to explore the local market. Overnight stay in Munnar."
      },
      {
        day: 3,
        title: "Munnar to Alleppey (175 km / 4.5 hrs)",
        description: "After breakfast, check-out and drive to Alleppey, known as the 'Venice of the East'. En route, visit Periyar Lake (Thekkady) for a short boat cruise. Reach Alleppey by evening and check-in to a houseboat. Enjoy a sunset cruise through the tranquil backwaters, experiencing the unique ecosystem and village life along the banks. Dinner and overnight stay on the houseboat."
      },
      {
        day: 4,
        title: "Alleppey to Cochin & Departure (55 km / 1.5 hrs)",
        description: "Wake up to the serene backwater views. After breakfast on the houseboat, check-out and drive to Cochin Airport/Railway Station for your onward journey. En route, option to stop at local handicraft shops for souvenir shopping."
      }
    ],
    inclusions: [
      "Accommodation in comfortable 3-Star Hotels and standard houseboat",
      "Daily Breakfast at hotels and all meals on houseboat (Day 3 dinner and Day 4 breakfast)",
      "All transfers and sightseeing by private AC vehicle (Sedan for 1-3 pax, SUV for 4-6 pax)",
      "Airport/Railway Station pick-up and drop-off",
      "Driver allowance, tolls, parking fees",
      "All applicable taxes (GST)"
    ],
    exclusions: [
      "Airfare/Train tickets",
      "Monument entrance fees",
      "Boat rides and activity charges",
      "Meals not mentioned (Lunch & Dinner except on houseboat)",
      "Personal expenses (tips, laundry, phone calls)",
      "Travel Insurance",
      "Guide charges (available on request at additional cost)",
      "Any activity costs not mentioned in inclusions",
      "Anything not mentioned in inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget."
  },
  {
    id: "kerala-complete-experience-7d",
    title: "Kerala Complete Experience - 7 Days",
    destinations: ["Cochin", "Munnar", "Thekkady", "Kumarakom", "Alleppey", "Kovalam"],
    duration: "6 Nights / 7 Days",
    overview: "Discover the diverse landscapes of Kerala from colonial Cochin to the tea gardens of Munnar, wildlife of Thekkady, and pristine beaches of Kovalam.",
    packageType: "Premier",
    price: "₹26,999",
    bestTime: "September to March",
    imageSrc: "/Destination/Domestic/Tours/Kerala/Kerala-Backwaters-Luxury.jpg",
    location: "Kerala",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Cochin",
        description: "Arrive at Cochin Airport (COK)/Railway Station. Meet our representative and transfer to your hotel. After check-in, rest of the day at leisure. In the evening, option to witness the Kathakali dance performance (at additional cost). Overnight stay in Cochin."
      },
      {
        day: 2,
        title: "Cochin Sightseeing & Drive to Munnar (130 km / 4 hrs)",
        description: "After breakfast, proceed for Cochin sightseeing. Visit Fort Kochi area including Chinese Fishing Nets, St. Francis Church, Santa Cruz Basilica, Jewish Synagogue, and Dutch Palace. After lunch, drive to Munnar, enjoying the scenic beauty en route with waterfalls and spice plantations. Reach Munnar by evening and check-in at your hotel. Overnight stay in Munnar."
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        description: "After breakfast, proceed for a full-day Munnar sightseeing. Visit Mattupetty Dam, Echo Point, Tea Museum, Photo Point, and Eravikulam National Park (home to the endangered Nilgiri Tahr). Enjoy the panoramic views of the Western Ghats and vast tea estates. Evening free for leisure or shopping at the local market. Overnight stay in Munnar."
      },
      {
        day: 4,
        title: "Munnar to Thekkady (110 km / 3 hrs)",
        description: "After breakfast, check-out and drive to Thekkady, home to the Periyar Wildlife Sanctuary. Upon arrival, check-in at your hotel. In the afternoon, enjoy a boat ride on Periyar Lake to spot wildlife like elephants, bison, and various bird species. Evening option to attend a Kalaripayattu (ancient martial art form) show (at additional cost). Overnight stay in Thekkady."
      },
      {
        day: 5,
        title: "Thekkady to Kumarakom (130 km / 4 hrs)",
        description: "After breakfast, visit a spice plantation to learn about various spices grown in Kerala. Later, drive to Kumarakom, a cluster of islands on Vembanad Lake. Check-in at your resort and spend the rest of the day at leisure, enjoying the backwater views and resort facilities. Optional Ayurvedic massage can be arranged (at additional cost). Overnight stay in Kumarakom."
      },
      {
        day: 6,
        title: "Kumarakom to Alleppey Houseboat (30 km / 1 hr)",
        description: "After breakfast, check-out and drive to Alleppey to board your premium houseboat. Cruise through the picturesque backwaters of Kerala, witnessing local life and lush paddy fields along the banks. Enjoy lunch and dinner prepared by the onboard chef featuring Kerala cuisine. Overnight stay on the houseboat."
      },
      {
        day: 7,
        title: "Alleppey to Cochin & Departure (85 km / 2.5 hrs)",
        description: "After breakfast on the houseboat, check-out and drive to Cochin Airport/Railway Station for your onward journey. En route, option to visit local handicraft shops for souvenir shopping."
      }
    ],
    inclusions: [
      "Accommodation in comfortable 3-Star Hotels and deluxe houseboat",
      "Daily Breakfast at hotels and all meals on houseboat (Day 6 lunch, dinner and Day 7 breakfast)",
      "All transfers and sightseeing by private AC vehicle (Sedan for 1-3 pax, SUV for 4-6 pax)",
      "Airport/Railway Station pick-up and drop-off",
      "Driver allowance, tolls, parking fees",
      "All applicable taxes (GST)"
    ],
    exclusions: [
      "Airfare/Train tickets",
      "Monument entrance fees and boat rides",
      "Meals not mentioned (Lunch & Dinner except on houseboat)",
      "Personal expenses (tips, laundry, phone calls)",
      "Travel Insurance",
      "Guide charges (available on request at additional cost)",
      "Any activity costs not mentioned in inclusions",
      "Anything not mentioned in inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget."
  },
];
