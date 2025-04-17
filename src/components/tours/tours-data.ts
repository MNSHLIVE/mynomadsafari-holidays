
// Tour data for the Tours page
export const tours = [
  // Featured Door-to-Door Packages
  {
    id: 101,
    title: "Dubai Family Delight",
    imageSrc: "https://images.unsplash.com/photo-1582672750001-3bacac6a1cb5?q=80&w=800",
    location: "Dubai, UAE",
    duration: "7 Days",
    price: 159999,
    bestTime: "October - April",
    packageType: "Luxury",
    country: "UAE",
    region: "Middle East",
    description: "Experience the magic of Dubai with this exclusive family package. From doorstep pickup to airport transfers, everything is taken care of for a hassle-free vacation.",
    activities: ["Desert Safari", "Burj Khalifa Visit", "Dubai Mall Shopping", "Dhow Cruise Dinner"],
    included: ["Home Pickup & Drop", "5-Star Accommodation", "All Meals", "Private Tours", "Visa Processing", "Travel Insurance"],
    groupSize: "Family Package (4 persons)",
    highlight: "Door-to-Door Service",
    itinerary: [
      { day: 1, title: "Arrive in Dubai", description: "Welcome to Dubai! Our representative will greet you at the airport and transfer you to your luxury hotel. Rest of the day at leisure." },
      { day: 2, title: "Dubai City Tour", description: "Explore the highlights of Dubai including the Dubai Museum, Gold Souk, and enjoy a traditional abra ride across Dubai Creek." },
      { day: 3, title: "Burj Khalifa & Dubai Mall", description: "Visit the world's tallest building, Burj Khalifa. Enjoy shopping at Dubai Mall and watch the spectacular Dubai Fountain show." },
      { day: 4, title: "Desert Safari", description: "Experience an exciting desert safari with dune bashing, camel riding, and a BBQ dinner with entertainment under the stars." },
      { day: 5, title: "Waterpark Adventure", description: "Enjoy a full day at Aquaventure Waterpark with thrilling slides and attractions for the whole family." },
      { day: 6, title: "Abu Dhabi Day Trip", description: "Visit Sheikh Zayed Grand Mosque, Ferrari World, and other attractions in Abu Dhabi." },
      { day: 7, title: "Departure", description: "After breakfast, check out and transfer to the airport for your return flight." }
    ]
  },
  {
    id: 102,
    title: "Singapore Complete Experience",
    imageSrc: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800",
    location: "Singapore",
    duration: "6 Days",
    price: 145999,
    bestTime: "Year Round",
    packageType: "Luxury",
    country: "Singapore",
    region: "Southeast Asia",
    description: "Discover the beauty of Singapore with our complete package that takes care of every detail from your doorstep to Singapore and back.",
    activities: ["Gardens by the Bay", "Universal Studios", "Sentosa Island", "Singapore Flyer"],
    included: ["Home Pickup & Drop", "4-Star Accommodation", "Breakfast & Dinner", "Skip-the-line Attraction Tickets", "Visa Processing", "Travel Insurance"],
    groupSize: "Up to 6 people",
    highlight: "Door-to-Door Service",
    itinerary: [
      { day: 1, title: "Arrive in Singapore", description: "Arrive at Changi Airport and transfer to your hotel. Evening at leisure to explore the nearby area." },
      { day: 2, title: "City Tour", description: "Explore Singapore's highlights including Merlion Park, Gardens by the Bay, and Marina Bay Sands." },
      { day: 3, title: "Universal Studios", description: "Full day at Universal Studios Singapore with access to all attractions and shows." },
      { day: 4, title: "Sentosa Island", description: "Enjoy the beaches and attractions of Sentosa Island, including the S.E.A. Aquarium and cable car ride." },
      { day: 5, title: "Shopping & Cultural Tour", description: "Visit Chinatown, Little India, and enjoy shopping at Orchard Road." },
      { day: 6, title: "Departure", description: "Check out and transfer to Changi Airport for your return flight." }
    ]
  },
  {
    id: 103,
    title: "Enchanting Bali Getaway",
    imageSrc: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800",
    location: "Bali, Indonesia",
    duration: "8 Days",
    price: 135999,
    bestTime: "April - October",
    packageType: "Luxury",
    country: "Indonesia",
    region: "Southeast Asia",
    description: "A carefully crafted door-to-door Bali experience with personal assistance throughout the journey. Perfect for couples and honeymooners.",
    activities: ["Rice Terrace Trekking", "Temple Visits", "Sunset Dinner", "Spa Treatments", "Ubud Art Tour"],
    included: ["Home Pickup & Drop", "Villa Accommodation", "Daily Breakfast & Dinner", "Private Tours", "Visa On Arrival Assistance", "Travel Insurance"],
    groupSize: "Couple Package",
    highlight: "Door-to-Door Service"
  },
  {
    id: 104,
    title: "Thailand Family Adventure",
    imageSrc: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=800",
    location: "Bangkok, Phuket, Krabi",
    duration: "9 Days",
    price: 179999,
    bestTime: "November - March",
    packageType: "Luxury",
    country: "Thailand",
    region: "Southeast Asia",
    description: "Experience the best of Thailand with our comprehensive door-to-door package perfect for families seeking adventure and relaxation.",
    activities: ["Elephant Sanctuary Visit", "Island Hopping", "Thai Cooking Class", "Water Sports"],
    included: ["Home Pickup & Drop", "4-Star Resorts", "All Meals", "Private Guides", "Domestic Flights", "Travel Insurance"],
    groupSize: "Family Package (4 persons)",
    highlight: "Door-to-Door Service"
  },
  
  // Domestic Tours - Per day per person rate: ₹5,333
  {
    id: 5,
    title: "Goa Beach Getaway",
    imageSrc: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
    location: "North and South Goa",
    duration: "4 Days",
    price: 21332,
    bestTime: "November - February",
    packageType: "Budgeted",
    country: "India",
    region: "West India",
    description: "Enjoy the pristine beaches, vibrant nightlife, and Portuguese heritage of India's favorite coastal destination.",
    activities: ["Beach Activities", "Water Sports", "Night Markets", "Heritage Tours"],
    included: ["Hotel Accommodation", "Breakfast", "Airport Transfers", "Sightseeing"],
    groupSize: "Flexible",
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Arrive in Goa, relax at Baga Beach, nightlife at Tito's." },
      { day: 2, title: "Old Goa Exploration", description: "Explore Old Goa (Basilica of Bom Jesus), Dudhsagar Falls." },
      { day: 3, title: "South Goa", description: "South Goa (Palolem Beach), water sports." },
      { day: 4, title: "Departure", description: "Shopping at Anjuna Flea Market, depart." }
    ],
    highlights: ["Beaches", "Nightlife", "Portuguese Heritage"]
  },
  {
    id: 6,
    title: "Kerala Backwaters Luxury",
    imageSrc: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
    location: "Kochi, Munnar, Alleppey",
    duration: "6 Days",
    price: 31998,
    bestTime: "September - March",
    packageType: "Luxury",
    country: "India",
    region: "South India",
    description: "Experience the serene backwaters of Kerala in luxury houseboats, explore tea plantations, and enjoy Ayurvedic treatments.",
    activities: ["Houseboat Stay", "Tea Plantation Visit", "Ayurvedic Spa", "Wildlife Safari"],
    included: ["Luxury Accommodation", "All Meals", "Private Guides", "All Transportation"],
    groupSize: "Private Tour",
    itinerary: [
      { day: 1, title: "Arrival in Kochi", description: "Arrive in Kochi, Fort Kochi tour." },
      { day: 2, title: "Munnar Hills", description: "Munnar tea plantations, Eravikulam National Park." },
      { day: 3, title: "Thekkady Wildlife", description: "Thekkady (Periyar Wildlife Sanctuary)." },
      { day: 4, title: "Alleppey Backwaters", description: "Alleppey backwaters houseboat stay." },
      { day: 5, title: "Kovalam Beach", description: "Kovalam Beach relaxation." },
      { day: 6, title: "Departure", description: "Depart from Trivandrum." }
    ],
    highlights: ["Backwaters", "Hills", "Wildlife"]
  },
  {
    id: 7,
    title: "Premier Himachal Adventure",
    imageSrc: "https://images.unsplash.com/photo-1547378809-c0414f48c2d4?q=80&w=800",
    location: "Shimla, Kullu, Manali, Dharamshala",
    duration: "7 Days",
    price: 37331,
    bestTime: "October - March",
    packageType: "Premier",
    country: "India",
    region: "North India",
    description: "A luxury journey through the beautiful landscapes of Himachal Pradesh with premium accommodations and exclusive experiences.",
    activities: ["Snow Activities", "Paragliding", "Temple Visits", "Trekking"],
    included: ["Luxury Accommodations", "All Meals", "Private Guides", "Premium Transportation"],
    groupSize: "Private Tour",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", description: "Arrive in Shimla, Mall Road." },
      { day: 2, title: "Kufri Exploration", description: "Kufri sightseeing, snow activities." },
      { day: 3, title: "Journey to Manali", description: "Manali via Kullu Valley." },
      { day: 4, title: "Rohtang Adventure", description: "Rohtang Pass adventure." },
      { day: 5, title: "Solang Valley", description: "Solang Valley, paragliding." },
      { day: 6, title: "McLeod Ganj", description: "Dharamshala (McLeod Ganj)." },
      { day: 7, title: "Departure", description: "Depart from Dharamshala." }
    ],
    highlights: ["Snow", "Adventure", "Monasteries"]
  },
  
  // International Tours - Per day per person rate: ₹10,555
  {
    id: 1,
    title: "Dubai Discovery",
    imageSrc: "https://images.unsplash.com/photo-1582672750001-3bacac6a1cb5?q=80&w=800",
    location: "Dubai, UAE",
    duration: "7 Days",
    price: "73885",
    bestTime: "October - April",
    packageType: "Luxury",
    country: "UAE",
    region: "Middle East",
    description: "Experience the glamour of Dubai with this exclusive package. Visit the iconic Burj Khalifa, enjoy desert safaris, and shop at the Dubai Mall.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and City Tour",
        description: "Arrive in Dubai and check into your hotel. Evening city tour to see the illuminated skyline."
      },
      {
        day: 2,
        title: "Burj Khalifa and Dubai Mall",
        description: "Visit the tallest building in the world and enjoy shopping at the Dubai Mall. Evening fountain show."
      },
      {
        day: 3,
        title: "Desert Safari",
        description: "Experience the thrill of dune bashing, camel riding, and enjoy a BBQ dinner with traditional entertainment."
      },
      {
        day: 4,
        title: "Dubai Marina and JBR Walk",
        description: "Explore the stunning Dubai Marina and enjoy the beach at JBR. Evening dhow cruise with dinner."
      },
      {
        day: 5,
        title: "Abu Dhabi Day Trip",
        description: "Visit the capital city of UAE, including the Sheikh Zayed Grand Mosque and Ferrari World."
      },
      {
        day: 6,
        title: "Global Village and Miracle Garden",
        description: "Experience the cultural diversity at Global Village and visit the beautiful Miracle Garden."
      },
      {
        day: 7,
        title: "Departure",
        description: "Last-minute shopping and departure."
      }
    ]
  },
  {
    id: 2,
    title: "Singapore Explorer",
    imageSrc: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800",
    location: "Singapore",
    duration: "6 Days",
    price: "63330",
    bestTime: "Year Round",
    packageType: "Luxury",
    country: "Singapore",
    region: "Southeast Asia",
    description: "Discover the island city-state of Singapore with its futuristic architecture, lush gardens, and diverse culture.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and Marina Bay Sands",
        description: "Arrive in Singapore and check into your hotel. Evening visit to Marina Bay Sands and the spectacular light show."
      },
      {
        day: 2,
        title: "Sentosa Island",
        description: "Full day at Sentosa Island including Universal Studios, S.E.A. Aquarium, and Adventure Cove Waterpark."
      },
      {
        day: 3,
        title: "Gardens by the Bay and Singapore Flyer",
        description: "Visit the futuristic gardens and take a ride on the giant observation wheel for panoramic views."
      },
      {
        day: 4,
        title: "Cultural Heritage Tour",
        description: "Explore Chinatown, Little India, and Kampong Glam to experience Singapore's multicultural heritage."
      },
      {
        day: 5,
        title: "Singapore Zoo and Night Safari",
        description: "Day visit to the award-winning Singapore Zoo followed by the famous Night Safari experience."
      },
      {
        day: 6,
        title: "Departure",
        description: "Last-minute shopping at Orchard Road and departure."
      }
    ]
  },
  {
    id: 3,
    title: "Bali Bliss",
    imageSrc: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800",
    location: "Bali, Indonesia",
    duration: "8 Days",
    price: "84440",
    bestTime: "April - October",
    packageType: "Luxury",
    country: "Indonesia",
    region: "Southeast Asia",
    description: "Experience the paradise island of Bali with its stunning beaches, rice terraces, and spiritual retreats."
  },
  {
    id: 4,
    title: "Thailand Adventure",
    imageSrc: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=800",
    location: "Bangkok, Phuket, Krabi",
    duration: "9 Days",
    price: "94995",
    bestTime: "November - March",
    packageType: "Luxury",
    country: "Thailand",
    region: "Southeast Asia",
    description: "Experience the best of Thailand from the bustling capital to idyllic beaches and stunning limestone cliffs."
  },
];

export const regions = [
  "North India", 
  "South India", 
  "West India", 
  "Southeast Asia", 
  "Middle East"
];

export const activities = [
  "Beach Activities",
  "Cultural Shows",
  "Desert Safari",
  "Heritage Walks",
  "Houseboat Stay",
  "Island Hopping",
  "Monument Visits",
  "Spa Treatments",
  "Temple Visits",
  "Water Sports"
];

// Import these from their original location
export { honeymoonTours, adventureTours, jungleSafariTours } from "@/components/home/home-data";
