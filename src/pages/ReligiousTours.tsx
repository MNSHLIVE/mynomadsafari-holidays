
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  }
];

const ReligiousTours = () => {
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
            {religiousTours.filter(tour => tour.id === 201 || tour.id === 204).map((tour) => (
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
