import { TourItinerary } from './itinerary-types';

export const dubaiTours: TourItinerary[] = [
  // Dubai Itineraries
  {
    id: "dubai-discovery-5d",
    title: "Dubai Discovery - 5 Days",
    destinations: ["Dubai"],
    duration: "4 Nights / 5 Days",
    overview: "Experience the perfect blend of modern marvels and Arabian culture in the dazzling city of Dubai.",
    packageType: "Luxury",
    price: "₹45,999",
    bestTime: "October to April",
    imageSrc: "/Destination/International/Tours/Dubai/Dubai-Discovery.jpg",
    location: "Dubai",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Dubai",
        description: "Arrive at Dubai International Airport. Meet our representative and transfer to your hotel. After check-in, rest of the day at leisure to relax or explore the nearby area. Overnight stay in Dubai."
      },
      {
        day: 2,
        title: "Dubai City Tour & Burj Khalifa",
        description: "After breakfast, proceed for a half-day Dubai city tour. Visit Jumeirah Mosque (from outside), Jumeirah Beach, Burj Al Arab (photo stop), The Palm Jumeirah, and Dubai Marina. After lunch (on your own), visit the iconic Burj Khalifa, the world's tallest building, and enjoy the panoramic views from the observation deck. Explore the Dubai Mall, one of the world's largest shopping malls. Evening free for leisure or optional dhow cruise dinner along Dubai Creek (at additional cost). Overnight stay in Dubai."
      },
      {
        day: 3,
        title: "Desert Safari & BBQ Dinner",
        description: "Morning at leisure or optional visit to Miracle Garden or Dubai Frame (at additional cost). In the afternoon, enjoy an exciting Desert Safari experience with dune bashing in 4x4 vehicles. At the desert camp, experience camel riding, sand boarding, henna painting, and traditional Arabic attire. Enjoy a BBQ dinner with vegetarian and non-vegetarian options while watching a Tanoura dance and belly dance performance. Return to your hotel. Overnight stay in Dubai."
      },
      {
        day: 4,
        title: "Abu Dhabi City Tour (Optional)",
        description: "After breakfast, day free for leisure or choose from multiple options (at additional cost): 1) Full-day Abu Dhabi city tour including Sheikh Zayed Grand Mosque, Ferrari World (from outside), and Yas Mall. 2) Visit to theme parks like IMG Worlds of Adventure, Legoland, or Motiongate. 3) Dubai Parks & Resorts experience. Evening free for shopping at traditional souks or modern malls. Overnight stay in Dubai."
      },
      {
        day: 5,
        title: "Dubai Departure",
        description: "After breakfast, morning free for last-minute shopping or leisure. Later, check-out and transfer to Dubai International Airport for your flight back home, taking with you memories of an exciting Arabian adventure."
      }
    ],
    inclusions: [
      "4 Nights accommodation in selected hotel category",
      "Daily Breakfast at the hotel",
      "Airport transfers on SIC (Seat-in-Coach) basis",
      "Half-day Dubai city tour on SIC basis",
      "Burj Khalifa 124th floor non-prime time entry",
      "Desert Safari with BBQ dinner on SIC basis",
      "All applicable taxes"
    ],
    exclusions: [
      "International airfare",
      "UAE tourist visa fees",
      "Tourism Dirham Fee (to be paid directly at the hotel)",
      "Travel insurance",
      "Meals other than mentioned",
      "Any optional tours or activities mentioned",
      "Tips, porterage, and personal expenses",
      "Any services not specifically mentioned in the inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget. Ramadan and public holiday surcharges may apply."
  },
  {
    id: "dubai-family-delight-9d",
    title: "Dubai & Abu Dhabi Family Delight - 9 Days",
    destinations: ["Dubai", "Abu Dhabi"],
    duration: "8 Nights / 9 Days",
    overview: "A comprehensive family adventure covering Dubai and Abu Dhabi's best attractions, beaches, theme parks, and cultural experiences.",
    packageType: "Premier",
    price: "₹85,999",
    bestTime: "October to April",
    imageSrc: "/Destination/International/Tours/Dubai/Dubai-Family-Delight.jpg",
    location: "Dubai",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Dubai",
        description: "Arrive at Dubai International Airport. Meet our representative and transfer to your hotel. After check-in, rest of the day at leisure. Overnight stay in Dubai."
      },
      {
        day: 2,
        title: "Dubai City Tour & Burj Khalifa",
        description: "After breakfast, proceed for a half-day Dubai city tour covering the old and new Dubai. Visit Al Fahidi Historical District, Dubai Museum, and cross the Dubai Creek on a traditional abra boat. Explore the Gold and Spice Souks. After lunch (on your own), visit the Dubai Mall and ascend Burj Khalifa to the observation deck. Evening option to witness the magnificent Dubai Fountain show. Overnight stay in Dubai."
      },
      {
        day: 3,
        title: "Atlantis Aquaventure & The Palm Tour",
        description: "After breakfast, proceed to Atlantis The Palm for a full-day access to Aquaventure Waterpark and The Lost Chambers Aquarium. Enjoy thrilling water slides, river rides, and marine exhibits featuring thousands of aquatic animals. Later, enjoy a drive around the Palm Jumeirah island. Evening free for leisure. Overnight stay in Dubai."
      },
      {
        day: 4,
        title: "Desert Safari & BBQ Dinner",
        description: "Morning at leisure or optional visit to Dubai Miracle Garden or Butterfly Garden (at additional cost). In the afternoon, enjoy an exciting Desert Safari with dune bashing followed by camel riding, sand boarding, henna painting, and BBQ dinner with entertainment at a desert camp. Return to your hotel. Overnight stay in Dubai."
      },
      {
        day: 5,
        title: "Dubai Theme Parks Experience",
        description: "After breakfast, full-day visit to Dubai Parks & Resorts, the Middle East's largest integrated theme park destination. Choose from Motiongate Dubai, Bollywood Parks, or Legoland Dubai and Legoland Water Park (select any two parks). Return to your hotel by evening. Overnight stay in Dubai."
      },
      {
        day: 6,
        title: "Dubai to Abu Dhabi (150 km / 2 hrs)",
        description: "After breakfast, check-out and drive to Abu Dhabi, the capital city of the UAE. En route, visit the Sheikh Zayed Grand Mosque, one of the world's largest mosques. Upon arrival in Abu Dhabi, check-in at your hotel. Evening free to explore the Corniche beachfront. Overnight stay in Abu Dhabi."
      },
      {
        day: 7,
        title: "Abu Dhabi Ferrari World",
        description: "After breakfast, proceed to Ferrari World, the world's first Ferrari-branded theme park with the world's fastest roller coaster. Enjoy a full day of rides and attractions inspired by the Ferrari brand. Option to visit Yas Mall for shopping in the evening. Overnight stay in Abu Dhabi."
      },
      {
        day: 8,
        title: "Abu Dhabi City Tour & Warner Bros World",
        description: "After breakfast, proceed for Abu Dhabi city tour including Heritage Village, Emirates Palace Hotel (from outside), and Presidential Palace (from outside). Later, visit Warner Bros World, an indoor theme park featuring characters from Warner Bros' franchises like Looney Tunes and DC Comics. Return to your hotel. Overnight stay in Abu Dhabi."
      },
      {
        day: 9,
        title: "Abu Dhabi to Dubai & Departure",
        description: "After breakfast, check-out and transfer to Dubai International Airport for your flight back home, taking with you memories of an exciting UAE adventure."
      }
    ],
    inclusions: [
      "8 Nights accommodation (5 in Dubai, 3 in Abu Dhabi) in selected hotel category",
      "Daily Breakfast at the hotel",
      "Airport transfers on private basis",
      "Dubai city tour on SIC basis",
      "Burj Khalifa 124th floor non-prime time entry",
      "Aquaventure Waterpark & Lost Chambers entry",
      "Desert Safari with BBQ dinner on SIC basis",
      "Two parks access at Dubai Parks & Resorts",
      "Ferrari World entry tickets",
      "Warner Bros World entry tickets",
      "Inter-city transfers on private basis",
      "All applicable taxes"
    ],
    exclusions: [
      "International airfare",
      "UAE tourist visa fees",
      "Tourism Dirham Fee (to be paid directly at the hotel)",
      "Travel insurance",
      "Meals other than mentioned",
      "Any optional tours or activities mentioned",
      "Tips, porterage, and personal expenses",
      "Any services not specifically mentioned in the inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget. Ramadan and public holiday surcharges may apply."
  },
];

export const singaporeTours: TourItinerary[] = [
  // Singapore Itineraries
  {
    id: "singapore-explorer-5d",
    title: "Singapore Explorer - 5 Days",
    destinations: ["Singapore"],
    duration: "4 Nights / 5 Days",
    overview: "Discover the perfect blend of urban sophistication, multicultural heritage, and family-friendly attractions in the Lion City.",
    packageType: "Budgeted",
    price: "₹42,999",
    bestTime: "Year-round (February-April for best weather)",
    imageSrc: "/Destination/International/Tours/Singapore/Singapore-Explorer.jpg",
    location: "Singapore",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrive at Singapore Changi Airport. Meet our representative and transfer to your hotel. After check-in, rest of the day at leisure to recover from journey fatigue or explore the nearby area. Optional evening visit to Gardens by the Bay to witness the spectacular Garden Rhapsody light and sound show (at additional cost). Overnight stay in Singapore."
      },
      {
        day: 2,
        title: "Singapore City Tour & Sentosa Island",
        description: "After breakfast, proceed for a half-day Singapore city tour. Visit Merlion Park for photos with the iconic Merlion statue, drive past the Civic District, visit Thian Hock Keng Temple, and explore the vibrant Little India and Chinatown neighborhoods. In the afternoon, transfer to Sentosa Island via cable car. Enjoy attractions including the S.E.A. Aquarium, and end the day with the Wings of Time show. Return to your hotel. Overnight stay in Singapore."
      },
      {
        day: 3,
        title: "Universal Studios Singapore",
        description: "After breakfast, proceed to Universal Studios Singapore for a full day of fun and entertainment. Experience thrilling rides and attractions based on your favorite movies and TV shows across seven themed zones including Hollywood, New York, Sci-Fi City, Ancient Egypt, Lost World, Far Far Away, and Madagascar. Return to your hotel in the evening. Overnight stay in Singapore."
      },
      {
        day: 4,
        title: "Free Day for Shopping or Optional Tours",
        description: "After breakfast, day free for shopping or optional tours (at additional cost): 1) Visit to River Safari and Singapore Zoo. 2) Singapore Flyer and Gardens by the Bay with Cloud Forest and Flower Dome. 3) Jurong Bird Park and Night Safari. Evening, enjoy a bumboat ride along Singapore River to admire the city skyline followed by dinner at Clarke Quay (dinner at additional cost). Overnight stay in Singapore."
      },
      {
        day: 5,
        title: "Singapore Departure",
        description: "After breakfast, morning free for last-minute shopping at Orchard Road or leisurely exploration. Later, check-out and transfer to Singapore Changi Airport for your flight back home."
      }
    ],
    inclusions: [
      "4 Nights accommodation in selected hotel category",
      "Daily Breakfast at the hotel",
      "Airport transfers on SIC basis",
      "Half-day Singapore city tour on SIC basis",
      "Sentosa Island tour with cable car and two attractions",
      "Wings of Time show (Standard seating)",
      "Universal Studios Singapore one-day pass",
      "All applicable taxes"
    ],
    exclusions: [
      "International airfare",
      "Singapore tourist visa fees",
      "Travel insurance",
      "Meals other than mentioned",
      "Any optional tours or activities mentioned",
      "Tips, porterage, and personal expenses",
      "Any services not specifically mentioned in the inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget."
  },
  {
    id: "singapore-malaysia-complete-9d",
    title: "Singapore & Malaysia Complete Experience - 9 Days",
    destinations: ["Singapore", "Kuala Lumpur", "Genting Highlands"],
    duration: "8 Nights / 9 Days",
    overview: "A comprehensive journey through Singapore and Malaysia covering urban marvels, theme parks, and cultural experiences in both countries.",
    packageType: "Luxury",
    price: "₹75,999",
    bestTime: "Year-round (February-April for best weather)",
    imageSrc: "/Destination/International/Tours/Singapore/Singapore-Complete-Experience.jpg",
    location: "Singapore",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrive at Singapore Changi Airport. Meet our representative and transfer to your hotel. After check-in, rest of the day at leisure. Overnight stay in Singapore."
      },
      {
        day: 2,
        title: "Singapore City Tour & Gardens by the Bay",
        description: "After breakfast, proceed for a half-day Singapore city tour visiting Merlion Park, Civic District, Thian Hock Keng Temple, Little India, and Chinatown. After lunch (on your own), visit Gardens by the Bay including the Flower Dome and Cloud Forest conservatories. Evening, enjoy the Garden Rhapsody light and sound show followed by the Marina Bay Sands light show. Overnight stay in Singapore."
      },
      {
        day: 3,
        title: "Universal Studios Singapore",
        description: "After breakfast, full day at Universal Studios Singapore to enjoy thrilling rides and attractions across seven themed zones. Return to your hotel in the evening. Overnight stay in Singapore."
      },
      {
        day: 4,
        title: "Sentosa Island Tour",
        description: "After breakfast, proceed to Sentosa Island for a full day of fun. Enjoy attractions including the S.E.A. Aquarium, Madame Tussauds (with Images of Singapore Live), Dolphin Island, and end the day with the Wings of Time show. Return to your hotel. Overnight stay in Singapore."
      },
      {
        day: 5,
        title: "Singapore to Kuala Lumpur (Train/Flight)",
        description: "After breakfast, check-out and transfer to railway station/airport for your journey to Kuala Lumpur, Malaysia's vibrant capital. Upon arrival, transfer to your hotel. Evening free to explore the nearby KLCC area and witness the Petronas Twin Towers illuminated at night. Overnight stay in Kuala Lumpur."
      },
      {
        day: 6,
        title: "Kuala Lumpur City Tour",
        description: "After breakfast, proceed for a half-day Kuala Lumpur city tour. Visit the King's Palace (from outside), National Monument, National Mosque, Independence Square, Sultan Abdul Samad Building, Petronas Twin Towers (photo stop), and Central Market. Afternoon, visit Batu Caves featuring a giant statue of Lord Murugan. Evening free for shopping at Bukit Bintang area. Overnight stay in Kuala Lumpur."
      },
      {
        day: 7,
        title: "Kuala Lumpur to Genting Highlands",
        description: "After breakfast, check-out and drive to Genting Highlands, Malaysia's hilltop resort. En route, stop at the Berjaya Hills French-themed village and enjoy the scenic cable car ride up to Genting (subject to operation). Upon arrival, check-in at your hotel. Afternoon and evening free to explore Skytropolis Indoor Theme Park or enjoy the Casino (for non-Malaysians above 21 years). Overnight stay in Genting Highlands."
      },
      {
        day: 8,
        title: "Genting to Kuala Lumpur",
        description: "After breakfast, morning free to explore Genting Highlands attractions and shopping outlets. After lunch (on your own), check-out and drive back to Kuala Lumpur. Evening free for last-minute shopping or optional KL Tower dinner with city views (at additional cost). Overnight stay in Kuala Lumpur."
      },
      {
        day: 9,
        title: "Kuala Lumpur Departure",
        description: "After breakfast, morning free for leisure. Later, check-out and transfer to Kuala Lumpur International Airport for your flight back home."
      }
    ],
    inclusions: [
      "8 Nights accommodation (4 in Singapore, 3 in Kuala Lumpur, 1 in Genting) in selected hotel category",
      "Daily Breakfast at the hotel",
      "Airport transfers on private basis",
      "Singapore city tour on SIC basis",
      "Universal Studios Singapore one-day pass",
      "Gardens by the Bay with two conservatories entry",
      "Sentosa Island tour with cable car and attractions",
      "Wings of Time show (Premium seating)",
      "Inter-city transfers as mentioned",
      "Kuala Lumpur city tour with Batu Caves",
      "All applicable taxes"
    ],
    exclusions: [
      "International airfare",
      "Singapore and Malaysia tourist visa fees",
      "Travel insurance",
      "Meals other than mentioned",
      "Any optional tours or activities mentioned",
      "Tips, porterage, and personal expenses",
      "Cable car ride in Genting if not operational",
      "Any services not specifically mentioned in the inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget."
  },
];

export const baliTours: TourItinerary[] = [
  // Bali Itinerary
  {
    id: "bali-bliss-5d",
    title: "Bali Tropical Bliss - 5 Days",
    destinations: ["Kuta", "Ubud", "Nusa Dua"],
    duration: "4 Nights / 5 Days",
    overview: "Experience the essence of Bali with this perfect short getaway covering beaches, culture, and adventure.",
    packageType: "Budgeted",
    price: "₹39,999",
    bestTime: "April to October",
    imageSrc: "/Destination/International/Tours/Bali/Bali-Bliss.jpg",
    location: "Bali",
    dailyPlans: [
      {
        day: 1,
        title: "Arrival in Bali",
        description: "Arrive at Ngurah Rai International Airport, Denpasar. Meet our representative and transfer to your hotel in Kuta/Seminyak area. After check-in, rest of the day at leisure to relax at the hotel pool or nearby beach. Evening free to explore the vibrant Kuta area or enjoy a relaxing Balinese massage (at additional cost). Overnight stay in Kuta/Seminyak."
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "After breakfast, proceed for a full-day tour to Ubud, Bali's cultural heart. Visit the sacred Monkey Forest, Ubud Palace, and explore the local art market. After lunch at a local restaurant (included), visit a traditional Balinese house compound, and stop at Tegalalang Rice Terraces for spectacular views. On the way back, visit one of the coffee plantations to taste authentic Balinese coffee including the famous Luwak coffee. Return to your hotel by evening. Overnight stay in Kuta/Seminyak."
      },
      {
        day: 3,
        title: "Water Sports & Uluwatu Temple Tour",
        description: "After breakfast, proceed to Tanjung Benoa Beach for exciting water sports activities. Enjoy parasailing, banana boat ride, and jet ski (package of 3 activities included). After lunch (on your own), relax at your hotel. In the evening, visit the magnificent cliff-top Uluwatu Temple and witness the mesmerizing Kecak Fire Dance performance as the sun sets over the Indian Ocean. Later, enjoy a seafood dinner at Jimbaran Bay (at additional cost). Return to your hotel. Overnight stay in Kuta/Seminyak."
      },
      {
        day: 4,
        title: "Bali Swing & Tanah Lot Sunset Tour",
        description: "After breakfast, proceed to visit the famous Bali Swing for an Instagram-worthy experience swinging over the jungle canopy. Continue to Tegenungan Waterfall where you can swim in the refreshing waters. After lunch at a local restaurant (included), visit the Taman Ayun Temple. End the day at Tanah Lot Temple, one of Bali's most iconic landmarks perched on a rock formation in the sea, perfect for sunset views. Return to your hotel. Overnight stay in Kuta/Seminyak."
      },
      {
        day: 5,
        title: "Bali Departure",
        description: "After breakfast, morning free for last-minute shopping or leisure. Later, check-out and transfer to Ngurah Rai International Airport for your flight back home."
      }
    ],
    inclusions: [
      "4 Nights accommodation in selected hotel category",
      "Daily Breakfast at the hotel",
      "Airport transfers on private basis",
      "Full-day Ubud tour including lunch",
      "Water sports package (3 activities) at Tanjung Benoa",
      "Uluwatu Temple tour with Kecak dance performance",
      "Bali Swing and Tanah Lot sunset tour including lunch",
      "All transfers and sightseeing by private air-conditioned vehicle",
      "English-speaking guide during tours",
      "All entrance fees as per itinerary",
      "All applicable taxes"
    ],
    exclusions: [
      "International airfare",
      "Visa on arrival fees (if applicable)",
      "Travel insurance",
      "Meals other than mentioned",
      "Any optional tours or activities mentioned",
      "Tips, porterage, and personal expenses",
      "Any services not specifically mentioned in the inclusions"
    ],
    notes: "This is a suggested itinerary. Contact My Nomadsafari Holidays to customize it to your preferences and budget."
  }
];
