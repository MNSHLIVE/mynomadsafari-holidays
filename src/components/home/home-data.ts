// Shared data for home page components

export const heroSlides = [
  {
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000",
    title: "Your One-Stop Travel Expert – Explore the World Your Way",
    subtitle: "Personalized travel experiences, expert planning, and unforgettable adventures"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000",
    title: "Discover the Beauty of Incredible India",
    subtitle: "From the Himalayas to the backwaters, experience the diversity of India"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000",
    title: "International Adventures Await",
    subtitle: "Explore exotic destinations with our curated international packages"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000",
    title: "Door-to-Door Travel Solutions",
    subtitle: "We pick you up from home and drop you back - hassle-free travel guaranteed"
  }
];

export const popularDestinations = [
  {
    imageSrc: "/public/Destination/Domestic/main/Rajasthan-main.jpg",
    title: "Rajasthan, India",
    description: "Experience the vibrant culture and majestic forts of the royal state.",
    bestTime: "October - March",
    isPopular: true,
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Kerala-main.jpg",
    title: "Kerala, India",
    description: "Discover the serene backwaters and lush greenery of God's own country.",
    bestTime: "September - March",
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Goa-main.jpg",
    title: "Goa, India",
    description: "Relax on sandy beaches and enjoy the vibrant nightlife of this coastal paradise.",
    bestTime: "November - February",
  },
  {
    imageSrc: "/public/Destination/International/Main/Bali-main.jpg",
    title: "Bali, Indonesia",
    description: "Experience the perfect blend of beaches, culture, and adventure in this island paradise.",
    bestTime: "April - October",
  },
];

export const religiousDestinations = [
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg",
    title: "Varanasi",
    description: "Experience the spiritual capital of India along the sacred Ganges River.",
    bestTime: "October - March",
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Uttrakhand-main.jpg",
    title: "Haridwar & Rishikesh",
    description: "Visit the holy gateway to the Himalayas and the yoga capital of the world.",
    bestTime: "September - April",
  },
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/VaishnoDevi/VaishnoDevi-Main.jpg.jpg",
    title: "Amritsar",
    description: "Visit the Golden Temple, the holiest shrine in Sikhism.",
    bestTime: "October - March",
  },
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/SouthIndia/SouthIndia-Main.jpg.jpg",
    title: "Tirupati",
    description: "Visit one of the world's richest and most visited temples in South India.",
    bestTime: "September - February",
  },
];

export const internationalDestinations = [
  {
    imageSrc: "/public/Destination/International/Main/Dubai-main.jpg",
    title: "Dubai, UAE",
    description: "Experience the luxurious desert metropolis with futuristic architecture.",
    bestTime: "November - March",
  },
  {
    imageSrc: "/public/Destination/International/Main/Singapore-main.jpg",
    title: "Singapore",
    description: "Explore the vibrant city-state with its perfect blend of culture and modernity.",
    bestTime: "February - April",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800",
    title: "Paris, France",
    description: "Discover the romantic capital of the world with its iconic landmarks.",
    bestTime: "April - June, September - October",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800",
    title: "Tokyo, Japan",
    description: "Experience the ultra-modern metropolis with traditional Japanese culture.",
    bestTime: "March - May, September - November",
  },
];

export const hillStations = [
  {
    imageSrc: "/public/Destination/Domestic/main/Himachal-Main.jpg",
    title: "Shimla",
    description: "Experience the former summer capital of British India in the Himalayas.",
    bestTime: "March - June, September - November",
  },
  {
    imageSrc: "/public/Destination/Domestic/gallery/Nanital.jpg",
    title: "Manali",
    description: "Explore the breathtaking valleys and snow-capped mountains of this Himalayan resort.",
    bestTime: "October - June",
  },
  {
    imageSrc: "/public/Destination/Domestic/gallery/pangong-lake.jpg",
    title: "Darjeeling",
    description: "Visit the Queen of Hills known for its tea plantations and views of Kanchenjunga.",
    bestTime: "September - November, March - May",
  },
  {
    imageSrc: "/public/Destination/Domestic/gallery/Valley-Flowers.jpg",
    title: "Ooty",
    description: "Experience the Queen of Hill Stations in South India with its lush landscapes.",
    bestTime: "October - June",
  },
];

export const popularTours = [
  {
    imageSrc: "/public/Destination/Domestic/Tours/Himachal/Himachal-Adventure.jpg",
    title: "Golden Triangle Tour",
    location: "Delhi, Agra, Jaipur",
    duration: "6 Days",
    price: "Starting from ₹21,000",
    bestTime: "October - March",
    packageType: "Budgeted" as const,
  },
  {
    imageSrc: "/public/Destination/Domestic/Tours/Kerala/Kerala-Backwaters-Luxury.jpg",
    title: "Kerala Backwaters Luxury",
    location: "Kochi, Munnar, Alleppey",
    duration: "7 Days",
    price: "Starting from ₹35,000",
    bestTime: "September - March",
    packageType: "Luxury" as const,
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Rajasthan-3.jpg",
    title: "Premier Rajasthan Heritage",
    location: "Jaipur, Udaipur, Jodhpur",
    duration: "10 Days",
    price: "Starting from ₹75,000",
    bestTime: "October - March",
    packageType: "Premier" as const,
  },
];

export const religiousTours = [
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg",
    title: "Char Dham Yatra",
    location: "Uttarakhand, India",
    duration: "12 Days",
    price: "64000",
    bestTime: "May - June, September - October",
    packageType: "Premier" as const,
    description: "A spiritual journey to the four sacred Hindu temples in the Himalayas: Yamunotri, Gangotri, Kedarnath, and Badrinath.",
    itinerary: [
      {day: 1, title: "Arrival in Haridwar", description: "Welcome at Haridwar and transfer to hotel. Evening Ganga Aarti at Har Ki Pauri."},
      {day: 2, title: "Haridwar to Yamunotri", description: "Drive to Janki Chatti and trek to Yamunotri temple. Return to Barkot for overnight stay."},
      {day: 3, title: "Barkot to Gangotri", description: "Drive to Gangotri through scenic Himalayan landscapes. Visit Gangotri Temple."},
    ]
  },
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/DwarkaShirdi/Dwarkashirdi-Main.jpg",
    title: "Varanasi Spiritual Tour",
    location: "Uttar Pradesh, India",
    duration: "4 Days",
    price: "21332",
    bestTime: "October - March",
    packageType: "Budgeted" as const,
    description: "Experience the spiritual essence of India's oldest city with morning boat rides on the Ganges and evening aartis.",
    itinerary: [
      {day: 1, title: "Arrival in Varanasi", description: "Welcome at Varanasi Airport/Railway Station and transfer to hotel. Evening Ganga Aarti."},
      {day: 2, title: "Morning Boat Ride & Temples", description: "Early morning boat ride on the Ganges to witness sunrise. Visit important temples."},
      {day: 3, title: "Sarnath Excursion", description: "Day trip to Sarnath where Buddha gave his first sermon. Visit the Dhamek Stupa."},
    ]
  },
  {
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/Ashthavinayak/Asthavinayak-Main.jpg",
    title: "Golden Temple & Amritsar",
    location: "Punjab, India",
    duration: "3 Days",
    price: "15999",
    bestTime: "October - March",
    packageType: "Budgeted" as const,
    description: "Visit the magnificent Golden Temple and experience the vibrant Punjabi culture in Amritsar.",
    itinerary: [
      {day: 1, title: "Arrival in Amritsar", description: "Welcome at Amritsar and transfer to hotel. Evening visit to Golden Temple for Palki Ceremony."},
      {day: 2, title: "Golden Temple & Wagah Border", description: "Morning visit to Golden Temple. Afternoon visit to Wagah Border for the Retreat Ceremony."},
      {day: 3, title: "Amritsar City Tour", description: "Visit Jallianwala Bagh, Durgiana Temple, and local markets. Departure from Amritsar."},
    ]
  },
];

export const testimonials = [
  {
    quote: "My Nomadsafari Holidays arranged the most amazing trip to Rajasthan for us. Every detail was perfect, from the hotels to the guided tours. Highly recommend their Premier package!",
    author: "Sarah Thompson",
    role: "Traveled to Rajasthan",
    rating: 5,
  },
  {
    quote: "As a solo traveler, I was nervous about my trip to Bali, but the team at My Nomadsafari Holidays made it so easy and comfortable. The customized itinerary was exactly what I wanted.",
    author: "Michael Chen",
    role: "Traveled to Bali",
    rating: 5,
  },
  {
    quote: "The visa assistance service saved me so much time and stress. Everything was processed smoothly, and I received great advice about my trip to Thailand.",
    author: "Priya Sharma",
    role: "Traveled to Thailand",
    rating: 4,
  },
];

export const blogPosts = [
  {
    imageSrc: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800",
    title: "Top 5 Budget Destinations in India",
    excerpt: "Discover incredible places to visit in India without breaking the bank. From the beaches of Goa to the mountains of Himachal Pradesh.",
    date: "May 10, 2023",
    author: "Travel Expert",
    tags: ["Budget Travel", "India"],
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=800",
    title: "How to Plan a Luxury Bali Trip",
    excerpt: "Planning a luxury getaway to Bali? Here's everything you need to know about the best resorts, dining experiences, and private tours.",
    date: "April 22, 2023",
    author: "Travel Expert",
    tags: ["Luxury Travel", "Bali"],
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1580889240911-2ce51b401e15?q=80&w=800",
    title: "The Complete Guide to Visa Requirements",
    excerpt: "Navigate the complex world of travel visas with our comprehensive guide to requirements for popular destinations.",
    date: "March 15, 2023",
    author: "Travel Expert",
    tags: ["Travel Tips", "Visa"],
  },
];

export const honeymoonTours = [
  {
    imageSrc: "/public/Destination/International/Tours/Bali/Bali-Bliss.jpg",
    title: "Romantic Bali Retreat",
    location: "Bali, Indonesia",
    duration: "7 Days",
    price: "Starting from ₹85,000",
    bestTime: "April - October",
    packageType: "Luxury" as const,
    description: "A perfect romantic escape for newlyweds featuring private villa stays, couple spa treatments, and candlelit beach dinners.",
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Kerala-main.jpg",
    title: "Kerala Romance",
    location: "Kerala, India",
    duration: "6 Days",
    price: "Starting from ₹45,000",
    bestTime: "September - March",
    packageType: "Luxury" as const,
    description: "Enjoy private houseboat cruises through backwaters, romantic hillside resorts in Munnar, and sunset beach experiences.",
  },
  {
    imageSrc: "/public/Destination/International/Main/Maldives-main.jpg",
    title: "Maldives Paradise",
    location: "Maldives",
    duration: "5 Days",
    price: "Starting from ₹110,000",
    bestTime: "November - April",
    packageType: "Premier" as const,
    description: "Overwater bungalows, crystal clear waters, private island experiences, and underwater dining create unforgettable memories.",
  }
];

export const adventureTours = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Rishikesh-Rafting.jpg",
    title: "Rishikesh Adventure",
    location: "Uttarakhand, India",
    duration: "5 Days",
    price: "Starting from ₹25,000",
    bestTime: "September - June",
    packageType: "Budgeted" as const,
    description: "Experience white water rafting, bungee jumping, cliff jumping, and trekking in the adventure capital of India.",
  },
  {
    imageSrc: "/public/Destination/Domestic/main/Ladhak-main.jpg",
    title: "Ladakh Bike Expedition",
    location: "Ladakh, India",
    duration: "10 Days",
    price: "Starting from ₹45,000",
    bestTime: "June - September",
    packageType: "Premier" as const,
    description: "A thrilling motorcycle journey through the highest motorable roads, stunning passes, and remote villages of Ladakh.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800",
    title: "Nepal Everest Base Camp Trek",
    location: "Nepal",
    duration: "14 Days",
    price: "Starting from ₹65,000",
    bestTime: "March - May, September - November",
    packageType: "Premier" as const,
    description: "Trek to the base of the world's highest mountain through stunning Himalayan landscapes and Sherpa villages.",
  }
];

export const jungleSafariTours = [
  {
    imageSrc: "/public/Destination/Domestic/gallery/Jim-corbett.jpg",
    title: "Jim Corbett Tiger Safari",
    location: "Uttarakhand, India",
    duration: "3 Days",
    price: "Starting from ₹18,000",
    bestTime: "November - June",
    packageType: "Budgeted" as const,
    description: "Explore India's oldest national park with jeep safaris to spot tigers, elephants, and diverse wildlife in their natural habitat.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?q=80&w=800",
    title: "Ranthambore Tiger Reserve",
    location: "Rajasthan, India",
    duration: "4 Days",
    price: "Starting from ₹22,000",
    bestTime: "October - June",
    packageType: "Luxury" as const,
    description: "Visit one of India's best tiger reserves with guided safaris, luxurious jungle lodges, and the historic Ranthambore Fort.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800",
    title: "Kaziranga Rhino Safari",
    location: "Assam, India",
    duration: "4 Days",
    price: "Starting from ₹24,000",
    bestTime: "November - April",
    packageType: "Luxury" as const,
    description: "Encounter the one-horned rhinoceros, wild elephants, and tigers in this UNESCO World Heritage Site.",
  }
];

export const europeanDestinations = [
  {
    imageSrc: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800",
    title: "Paris, France",
    description: "Experience the romance, history, and culture of the City of Light with its iconic landmarks.",
    bestTime: "April - June, September - October"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800",
    title: "Rome, Italy",
    description: "Discover ancient history, remarkable art, and world-class cuisine in the Eternal City.",
    bestTime: "April - May, September - October"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800",
    title: "Santorini, Greece",
    description: "Visit the stunning white-washed buildings, blue-domed churches, and breathtaking views of this Greek island paradise.",
    bestTime: "April - October"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1565622832101-358788927c53?q=80&w=800",
    title: "Swiss Alps, Switzerland",
    description: "Experience scenic mountain views, charming villages, and world-class skiing in this Alpine wonderland.",
    bestTime: "December - April (for skiing), June - September (for hiking)"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
    title: "London, United Kingdom",
    description: "Explore the historic landmarks, cultural attractions, and vibrant neighborhoods of this global metropolis.",
    bestTime: "May - September"
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1561704061-7b246d29c9a9?q=80&w=800",
    title: "Barcelona, Spain",
    description: "Enjoy the unique architecture, beautiful beaches, and lively atmosphere of this Mediterranean gem.",
    bestTime: "April - June, September - October"
  }
];
