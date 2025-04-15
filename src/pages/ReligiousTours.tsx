import React, { useState } from "react";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church, Landmark } from "lucide-react";
import DestinationQueryForm from "@/components/destination-query-form";
import { Badge } from "@/components/ui/badge";

const religiousTours = [
  {
    id: 201,
    title: "Char Dham Yatra",
    imageSrc: "https://images.unsplash.com/photo-1588096344356-9b798468eedb?q=80&w=800",
    location: "Uttarakhand, India",
    duration: "12 Days",
    price: "85000",
    bestTime: "May - June, Sept - Oct",
    packageType: "Premier",
    country: "India",
    region: "North India",
    description: "Embark on the sacred Char Dham pilgrimage covering Yamunotri, Gangotri, Kedarnath, and Badrinath temples in the Himalayas.",
    itinerary: [
      { day: 1, title: "Arrival in Haridwar", description: "Arrive in Haridwar and transfer to hotel. Evening Ganga Aarti." },
      { day: 2, title: "Haridwar to Barkot", description: "Drive to Barkot (210 km), gateway to Yamunotri." },
      { day: 3, title: "Yamunotri Temple", description: "Trek to Yamunotri temple (6 km), perform puja, and return to Barkot." },
      { day: 4, title: "Barkot to Uttarkashi", description: "Drive to Uttarkashi (100 km), visit Vishwanath Temple." },
      { day: 5, title: "Gangotri Temple", description: "Visit Gangotri temple and perform rituals." },
      { day: 6, title: "Uttarkashi to Guptkashi", description: "Drive to Guptkashi (220 km), visit Kashi Vishwanath Temple." },
      { day: 7, title: "Kedarnath Temple", description: "Helicopter to Kedarnath, visit temple, and return to Guptkashi." },
      { day: 8, title: "Guptkashi to Badrinath", description: "Drive to Badrinath (175 km) via Joshimath." },
      { day: 9, title: "Badrinath Temple", description: "Visit Badrinath temple and nearby attractions." },
      { day: 10, title: "Badrinath to Rudraprayag", description: "Drive to Rudraprayag (160 km)." },
      { day: 11, title: "Rudraprayag to Rishikesh", description: "Drive to Rishikesh (140 km), visit ashrams." },
      { day: 12, title: "Departure", description: "Transfer to Delhi for departure." }
    ]
  },
  {
    id: 202,
    title: "Varanasi Spiritual Tour",
    imageSrc: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=800",
    location: "Varanasi, India",
    duration: "5 Days",
    price: "35000",
    bestTime: "October - March",
    packageType: "Luxury",
    country: "India",
    region: "North India",
    description: "Experience the spiritual heart of India with a comprehensive tour of Varanasi and nearby Buddhist sites.",
    itinerary: [
      { day: 1, title: "Arrival in Varanasi", description: "Arrive in Varanasi and transfer to hotel. Evening Ganga Aarti at Dashashwamedh Ghat." },
      { day: 2, title: "Sunrise Boat Ride", description: "Early morning boat ride on the Ganges, visit prominent temples and ghats of Varanasi." },
      { day: 3, title: "Sarnath Excursion", description: "Day trip to Sarnath where Buddha gave his first sermon, visit Buddhist temples and Sarnath Museum." },
      { day: 4, title: "Varanasi Temples", description: "Visit Kashi Vishwanath Temple, Durga Temple, Sankat Mochan Hanuman Temple, and evening aarti." },
      { day: 5, title: "Departure", description: "Transfer to airport for departure." }
    ]
  },
  {
    id: 203,
    title: "Golden Temple & Amritsar",
    imageSrc: "https://images.unsplash.com/photo-1588100099020-2212b4c2449b?q=80&w=800",
    location: "Amritsar, Punjab",
    duration: "4 Days",
    price: "25000",
    bestTime: "October - March",
    packageType: "Budgeted",
    country: "India",
    region: "North India",
    description: "Visit the magnificent Golden Temple and explore the rich cultural heritage of Amritsar.",
    itinerary: [
      { day: 1, title: "Arrival in Amritsar", description: "Arrive in Amritsar and transfer to hotel. Evening visit to Golden Temple for Palki Sahib ceremony." },
      { day: 2, title: "Golden Temple & City Tour", description: "Full day tour of Golden Temple complex, Jallianwala Bagh, and Durgiana Temple." },
      { day: 3, title: "Wagah Border & Local Culture", description: "Visit Wagah Border for the retreat ceremony, explore local markets and authentic Punjabi cuisine." },
      { day: 4, title: "Departure", description: "Transfer to airport for departure." }
    ]
  },
  {
    id: 204,
    title: "South India Temple Tour",
    imageSrc: "https://images.unsplash.com/photo-1621373284020-87cea2607829?q=80&w=800",
    location: "Tamil Nadu & Kerala",
    duration: "8 Days",
    price: "60000",
    bestTime: "October - March",
    packageType: "Luxury",
    country: "India",
    region: "South India",
    description: "Explore the magnificent temples of South India, known for their Dravidian architecture and cultural significance.",
    itinerary: [
      { day: 1, title: "Arrival in Chennai", description: "Arrive in Chennai and transfer to Mahabalipuram." },
      { day: 2, title: "Mahabalipuram", description: "Visit Shore Temple, Five Rathas, and Arjuna's Penance." },
      { day: 3, title: "Kanchipuram", description: "Explore the temples of Kanchipuram, the City of Thousand Temples." },
      { day: 4, title: "Madurai", description: "Visit Meenakshi Amman Temple and experience the evening ceremony." },
      { day: 5, title: "Rameswaram", description: "Visit Ramanathaswamy Temple and Dhanushkodi." },
      { day: 6, title: "Thanjavur", description: "Explore Brihadeeswarar Temple (UNESCO World Heritage Site)." },
      { day: 7, title: "Tirupati", description: "Visit Tirumala Venkateswara Temple (optional darshan)." },
      { day: 8, title: "Departure", description: "Transfer to Chennai for departure." }
    ]
  },
  {
    id: 205,
    title: "Vaishno Devi Pilgrimage",
    imageSrc: "https://images.unsplash.com/photo-1574271143515-5cddf8da19be?q=80&w=800",
    location: "Katra, Jammu & Kashmir",
    duration: "5 Days",
    price: "30000",
    bestTime: "March - June, Sept - Oct",
    packageType: "Premier",
    country: "India",
    region: "North India",
    description: "Embark on a sacred journey to the holy shrine of Vaishno Devi, located in the Trikuta Mountains of Jammu & Kashmir.",
    itinerary: [
      { day: 1, title: "Arrival in Jammu", description: "Arrive in Jammu and transfer to hotel. Visit Raghunath Temple and local markets." },
      { day: 2, title: "Jammu to Katra", description: "Drive to Katra, the base town for Vaishno Devi pilgrimage. Evening preparation for the trek." },
      { day: 3, title: "Vaishno Devi Trek", description: "Early morning start for the 13 km trek to Vaishno Devi Shrine. Darshan and prayers at the temple." },
      { day: 4, title: "Bhairavnath Temple & Return", description: "Visit Bhairavnath Temple and return to Katra. Afternoon rest and local exploration." },
      { day: 5, title: "Departure", description: "Return to Jammu and departure." }
    ]
  },
  {
    id: 206,
    title: "Badrinath & Kedarnath Yatra",
    imageSrc: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800",
    location: "Uttarakhand, India",
    duration: "8 Days",
    price: "65000",
    bestTime: "May - June, Sept - Oct",
    packageType: "Luxury",
    country: "India",
    region: "North India",
    description: "Visit the sacred shrines of Badrinath and Kedarnath, two of the Char Dhams located in the beautiful Himalayas of Uttarakhand.",
    itinerary: [
      { day: 1, title: "Arrival in Haridwar", description: "Arrive in Haridwar and transfer to hotel. Evening Ganga Aarti at Har Ki Pauri." },
      { day: 2, title: "Haridwar to Joshimath", description: "Drive to Joshimath (250 km) via Devprayag and Rudraprayag." },
      { day: 3, title: "Joshimath to Badrinath", description: "Drive to Badrinath (45 km). Visit Badrinath Temple and Tapt Kund." },
      { day: 4, title: "Badrinath to Guptkashi", description: "Drive to Guptkashi (190 km) via Joshimath and Chamoli." },
      { day: 5, title: "Guptkashi to Kedarnath", description: "Drive to Sonprayag and trek to Kedarnath (16 km) or take helicopter services." },
      { day: 6, title: "Kedarnath Temple", description: "Early morning visit to Kedarnath Temple. Return to Guptkashi." },
      { day: 7, title: "Guptkashi to Rishikesh", description: "Drive to Rishikesh (180 km). Evening at leisure or visit ashrams." },
      { day: 8, title: "Departure", description: "Transfer to Dehradun for departure." }
    ]
  },
  {
    id: 207,
    title: "Jyotirlinga Darshan",
    imageSrc: "https://images.unsplash.com/photo-1545126178-862cdb469409?q=80&w=800",
    location: "Various locations across India",
    duration: "15 Days",
    price: "120000",
    bestTime: "October - March",
    packageType: "Premier",
    country: "India",
    region: "All India",
    description: "Embark on a spiritual journey to visit the sacred Jyotirlingas of Lord Shiva spread across different parts of India.",
    itinerary: [
      { day: 1, title: "Start in Varanasi", description: "Arrive in Varanasi and visit Kashi Vishwanath Temple, one of the 12 Jyotirlingas." },
      { day: 3, title: "Ujjain", description: "Visit Mahakaleshwar Temple in Ujjain, Madhya Pradesh." },
      { day: 5, title: "Omkareshwar", description: "Visit Omkareshwar Temple on an island in Narmada River, Madhya Pradesh." },
      { day: 7, title: "Somnath", description: "Visit the historic Somnath Temple in Gujarat." },
      { day: 9, title: "Dwarka", description: "Visit Nageshwar Temple near Dwarka, Gujarat." },
      { day: 11, title: "Nashik", description: "Visit Trimbakeshwar Temple in Nashik, Maharashtra." },
      { day: 13, title: "Rameswaram", description: "Visit Ramanathaswamy Temple in Rameswaram, Tamil Nadu." },
      { day: 15, title: "Conclusion", description: "Return journey with memories of the sacred pilgrimage." }
    ]
  },
  {
    id: 208,
    title: "Ashtavinayak Darshan",
    imageSrc: "https://images.unsplash.com/photo-1627894006066-b1872ba3fb2b?q=80&w=800",
    location: "Maharashtra, India",
    duration: "7 Days",
    price: "45000",
    bestTime: "October - March",
    packageType: "Budgeted",
    country: "India",
    region: "West India",
    description: "Visit the eight ancient temples of Lord Ganesha in Maharashtra, known as the Ashtavinayak.",
    itinerary: [
      { day: 1, title: "Start in Pune", description: "Arrive in Pune and visit Morgaon (Moreshwar) and Siddhatek (Siddhivinayak)." },
      { day: 2, title: "Pali and Mahad", description: "Visit Ballaleshwar Temple in Pali and Varadvinayak Temple in Mahad." },
      { day: 3, title: "Theur and Lenyadri", description: "Visit Chintamani Temple in Theur and Girijatmaj Temple in Lenyadri." },
      { day: 4, title: "Ozar and Ranjangaon", description: "Visit Vighneshwar Temple in Ozar and Mahaganapati Temple in Ranjangaon." },
      { day: 5, title: "Lonavala Exploration", description: "Relax in the scenic hill station of Lonavala." },
      { day: 6, title: "Matheran Hill Station", description: "Visit Matheran, a charming car-free hill station." },
      { day: 7, title: "Return to Pune", description: "Return to Pune for departure." }
    ]
  },
  {
    id: 209,
    title: "Devi Darshan Yatra",
    imageSrc: "https://images.unsplash.com/photo-1518911470819-083a8f8f5046?q=80&w=800",
    location: "Various locations across India",
    duration: "12 Days",
    price: "95000",
    bestTime: "October - March",
    packageType: "Luxury",
    country: "India",
    region: "All India",
    description: "Visit the most significant temples dedicated to various forms of the Divine Goddess across India.",
    itinerary: [
      { day: 1, title: "Start in Kolkata", description: "Arrive in Kolkata and visit Kalighat Temple and Dakshineswar Kali Temple." },
      { day: 3, title: "Kamakhya Temple", description: "Fly to Guwahati and visit the sacred Kamakhya Temple in Assam." },
      { day: 5, title: "Varanasi", description: "Visit Durga Temple and other sacred sites in Varanasi." },
      { day: 7, title: "Jammu", description: "Travel to Jammu for Vaishno Devi pilgrimage." },
      { day: 9, title: "Chennai", description: "Fly to Chennai and visit Kapaleeshwarar Temple." },
      { day: 11, title: "Kanyakumari", description: "Visit Kanyakumari Temple at the southernmost tip of India." },
      { day: 12, title: "Departure", description: "Return journey with blessings of the Divine Mother." }
    ]
  },
  {
    id: 210,
    title: "Shri Amarnath Yatra",
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/VaishnoDevi/VaishnoDevi-Main.jpg",
    location: "Jammu & Kashmir, India",
    duration: "4 Days",
    price: "45000",
    bestTime: "July - August",
    packageType: "Premier",
    country: "India",
    region: "North India",
    description: "Embark on the sacred journey to Shri Amarnath Cave, home to the naturally formed ice Shivalingam in the mountains of Kashmir.",
    itinerary: [
      { day: 1, title: "Arrival Srinagar - Sonmarg", description: "Welcome at Srinagar Airport with transfer to Sonmarg (3 hrs drive). Check into hotel and enjoy natural surroundings. Overnight stay in Sonmarg." },
      { day: 2, title: "Sonmarg - Baltal - Neelgrath - Panchtarni - Neelgrath - Baltal - Sonmarg", description: "Early morning breakfast followed by transfer to Neelgrath Helipad for helicopter ride to Panchtarni. Visit Amarnath Cave for darshan of the ice lingam. Evening return to Sonmarg for overnight stay." },
      { day: 3, title: "Sonmarg - Srinagar Local Sightseeing", description: "After breakfast, visit famous Mughal Gardens in Srinagar: Chashma Shahi (The Royal Springs), Nishat Bagh (Garden of Delight), and Shalimar Garden (Adobe of Love). Evening Shikara ride on Dal Lake (optional). Overnight stay in Srinagar." },
      { day: 4, title: "Departure Srinagar - Airport", description: "After breakfast, transfer to Srinagar Airport for your onward flight back home." }
    ]
  },
  {
    id: 211,
    title: "Kailash Mansarovar Yatra",
    imageSrc: "/public/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg",
    location: "Tibet (via Nepal)",
    duration: "9 Days",
    price: "140000",
    bestTime: "May - September",
    packageType: "Premier",
    country: "Tibet/Nepal",
    region: "Himalayas",
    description: "Experience the ultimate spiritual journey to Mount Kailash and Lake Mansarovar, considered sacred by Hindus, Buddhists, and Jains alike.",
    itinerary: [
      { day: 1, title: "Nepalgunj (165m)", description: "Arrive in Lucknow, transfer to Nepalgunj (5 hr drive). Welcome with Rudrakshya mala. Brief program in the evening by tour manager." },
      { day: 2, title: "Taklakot (3800m)", description: "Early morning flight to Simikot (1 hr), immigration clearance, then helicopter to Hilsa (15 min). Cross border to China and drive to Taklakot (1 hr)." },
      { day: 3, title: "Taklakot (3800m)", description: "Rest day for acclimatization at Taklakot. Walk around market for shopping and souvenirs." },
      { day: 4, title: "Lake Manasarovar (4560m)", description: "Drive from Purang to Lake Manasarovar (2 hrs). Perform Lake Parikrama (3 hrs) with holy bath and puja at Chiugompa." },
      { day: 5, title: "Diraphuk (4950m)", description: "Drive to Yama Dwar via Darchen (50 km/1.5 hrs). Darshan of Mt. Kailash (south face) and trek to Diraphuk (5-6 hrs/14 km)." },
      { day: 6, title: "Zuthulphuk (4850m)", description: "Early morning darshan of Golden Kailash. Trek from Diraphuk to Zuthulphuk passing through Dolma La High Pass (5600m) and Gauri Kunda (9-10 hrs/22 km)." },
      { day: 7, title: "Hilsa (3700m)/Simikot (2950m)", description: "Complete trek near Darchen (1.5 hrs/8 km) and drive to Taklakot. Exit to Hilsa (1 hr) and fly to Simikot by helicopter if conditions permit." },
      { day: 8, title: "Nepalgunj (165m)", description: "Early morning flight to Nepalgunj. Option to continue to Lucknow for groups of 3-5 people." },
      { day: 9, title: "Departure", description: "Morning breakfast and transfer to Lucknow. Airport drop for connecting flight to India." }
    ]
  }
];

const ReligiousTours = () => {
  const [selectedTour, setSelectedTour] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
          Spiritual Journeys
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Religious Tours
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Embark on a journey of spiritual discovery with our curated religious and pilgrimage tours
        </p>
      </div>

      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Landmark className="mr-2 h-5 w-5 text-primary" />
                  Sacred Pilgrimages Across India
                </h2>
                <p className="text-lg mb-4">
                  India is home to some of the world's most revered religious sites. Our carefully curated tours 
                  combine spiritual experiences with comfortable travel arrangements.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <Badge className="justify-start" variant="outline">Hindu Temples</Badge>
                  <Badge className="justify-start" variant="outline">Buddhist Sites</Badge>
                  <Badge className="justify-start" variant="outline">Sikh Gurdwaras</Badge>
                  <Badge className="justify-start" variant="outline">Sacred Rivers</Badge>
                </div>
              </div>
              <div className="md:w-1/4 flex justify-center">
                <DestinationQueryForm
                  destinationName="Religious Tours"
                  buttonText="Plan Your Pilgrimage"
                  buttonVariant="default"
                  className="px-6"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="hindu" className="w-full mb-10">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="hindu">Hindu Pilgrimages</TabsTrigger>
            <TabsTrigger value="buddhist">Buddhist Circuits</TabsTrigger>
            <TabsTrigger value="sikh">Sikh Pilgrimages</TabsTrigger>
            <TabsTrigger value="all">All Religious Tours</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hindu" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {religiousTours.filter(tour => 
              [201, 204, 205, 206, 207, 208, 209, 210, 211].includes(tour.id)
            ).map((tour) => (
              <TourCard
                key={tour.id}
                imageSrc={tour.imageSrc}
                title={tour.title}
                location={tour.location}
                duration={tour.duration}
                price={tour.price}
                bestTime={tour.bestTime}
                packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                description={tour.description}
                itinerary={tour.itinerary}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buddhist" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {religiousTours.filter(tour => tour.id === 202).map((tour) => (
              <TourCard
                key={tour.id}
                imageSrc={tour.imageSrc}
                title={tour.title}
                location={tour.location}
                duration={tour.duration}
                price={tour.price}
                bestTime={tour.bestTime}
                packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                description={tour.description}
                itinerary={tour.itinerary}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sikh" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {religiousTours.filter(tour => tour.id === 203).map((tour) => (
              <TourCard
                key={tour.id}
                imageSrc={tour.imageSrc}
                title={tour.title}
                location={tour.location}
                duration={tour.duration}
                price={tour.price}
                bestTime={tour.bestTime}
                packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                description={tour.description}
                itinerary={tour.itinerary}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {religiousTours.map((tour) => (
              <TourCard
                key={tour.id}
                imageSrc={tour.imageSrc}
                title={tour.title}
                location={tour.location}
                duration={tour.duration}
                price={tour.price}
                bestTime={tour.bestTime}
                packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                description={tour.description}
                itinerary={tour.itinerary}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 border my-10">
        <SectionHeading
          title="Benefits of Religious Tours"
          subtitle="Why choose our guided spiritual journeys"
          align="left"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Expert Spiritual Guides</h4>
              <p className="text-sm text-muted-foreground">Knowledgeable guides who understand the cultural and religious significance</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Priority Darshan</h4>
              <p className="text-sm text-muted-foreground">Skip long queues with our special arrangements at major temples</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Comfortable Accommodations</h4>
              <p className="text-sm text-muted-foreground">Stay in comfortable hotels near the pilgrimage sites</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Assistance with Rituals</h4>
              <p className="text-sm text-muted-foreground">Help with performing the appropriate rituals at each sacred site</p>
            </div>
          </div>
        </div>
      </div>

      <section className="my-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8 shadow-sm border border-primary/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-3/4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Custom Religious Tours</h2>
              <p className="text-lg mb-4">
                Looking for a personalized pilgrimage experience? We can create a custom itinerary based on your spiritual preferences, 
                time constraints, and specific temples or sites you wish to visit.
              </p>
              <p className="text-muted-foreground">
                Our team of experts will help you plan every detail of your sacred journey, from transportation and accommodation 
                to special pujas and ritual arrangements at the temples.
              </p>
            </div>
            <div className="md:w-1/4 flex justify-center">
              <DestinationQueryForm
                destinationName="Custom Religious Tour"
                buttonText="Request Custom Tour"
                buttonVariant="default"
                className="px-6"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Plan Your Spiritual Journey"
        description="Let us help you plan a meaningful and hassle-free pilgrimage to the most sacred sites."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </div>
  );
};

export default ReligiousTours;
