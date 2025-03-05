import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import DestinationCard from "@/components/destination-card";
import TourCard from "@/components/tour-card";
import TestimonialCard from "@/components/testimonial-card";
import BlogCard from "@/components/blog-card";
import CTASection from "@/components/cta-section";
import HeroSlider from "@/components/hero-slider";
import PackageCalculator from "@/components/package-calculator";
import { ArrowRight, Globe, MapPin, Compass, Shield, Headphones, PrayingHands, Mountains, Map, Plane, Beach, Buildings, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const heroSlides = [
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

const destinations = [
  {
    imageSrc: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800",
    title: "Rajasthan, India",
    description: "Experience the vibrant culture and majestic forts of the royal state.",
    bestTime: "October - March",
    isPopular: true,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1602851169118-3159e9696c14?q=80&w=800",
    title: "Kerala, India",
    description: "Discover the serene backwaters and lush greenery of God's own country.",
    bestTime: "September - March",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
    title: "Goa, India",
    description: "Relax on sandy beaches and enjoy the vibrant nightlife of this coastal paradise.",
    bestTime: "November - February",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=800",
    title: "Bali, Indonesia",
    description: "Experience the perfect blend of beaches, culture, and adventure in this island paradise.",
    bestTime: "April - October",
  },
];

const religiousDestinations = [
  {
    imageSrc: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    title: "Varanasi",
    description: "Experience the spiritual capital of India along the sacred Ganges River.",
    bestTime: "October - March",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1567948596429-b0a5f3a22c99?q=80&w=800",
    title: "Haridwar & Rishikesh",
    description: "Visit the holy gateway to the Himalayas and the yoga capital of the world.",
    bestTime: "September - April",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1511296255053-90e256ae9d9a?q=80&w=800",
    title: "Amritsar",
    description: "Visit the Golden Temple, the holiest shrine in Sikhism.",
    bestTime: "October - March",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1572450656106-512193c51392?q=80&w=800",
    title: "Tirupati",
    description: "Visit one of the world's richest and most visited temples in South India.",
    bestTime: "September - February",
  },
];

const internationalDestinations = [
  {
    imageSrc: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
    title: "Dubai, UAE",
    description: "Experience the luxurious desert metropolis with futuristic architecture.",
    bestTime: "November - March",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800",
    title: "Singapore",
    description: "Explore the vibrant city-state with its perfect blend of culture and modernity.",
    bestTime: "February - April",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
    title: "Paris, France",
    description: "Discover the romantic capital of the world with its iconic landmarks.",
    bestTime: "April - June, September - October",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=800",
    title: "Tokyo, Japan",
    description: "Experience the ultra-modern metropolis with traditional Japanese culture.",
    bestTime: "March - May, September - November",
  },
];

const hillStations = [
  {
    imageSrc: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=800",
    title: "Shimla",
    description: "Experience the former summer capital of British India in the Himalayas.",
    bestTime: "March - June, September - November",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
    title: "Manali",
    description: "Explore the breathtaking valleys and snow-capped mountains of this Himalayan resort.",
    bestTime: "October - June",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1589136777052-654282d74f57?q=80&w=800",
    title: "Darjeeling",
    description: "Visit the Queen of Hills known for its tea plantations and views of Kanchenjunga.",
    bestTime: "September - November, March - May",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800",
    title: "Ooty",
    description: "Experience the Queen of Hill Stations in South India with its lush landscapes.",
    bestTime: "October - June",
  },
];

const tours = [
  {
    imageSrc: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
    title: "Golden Triangle Tour",
    location: "Delhi, Agra, Jaipur",
    duration: "6 Days",
    price: "Starting from ₹21,000",
    bestTime: "October - March",
    packageType: "Budgeted",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
    title: "Kerala Backwaters Luxury",
    location: "Kochi, Munnar, Alleppey",
    duration: "7 Days",
    price: "Starting from ₹35,000",
    bestTime: "September - March",
    packageType: "Luxury",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1580439471383-30ab8d7b0e3c?q=80&w=800",
    title: "Premier Rajasthan Heritage",
    location: "Jaipur, Udaipur, Jodhpur",
    duration: "10 Days",
    price: "Starting from ₹75,000",
    bestTime: "October - March",
    packageType: "Premier",
  },
];

const religiousTours = [
  {
    imageSrc: "https://images.unsplash.com/photo-1561361058-c24cecabbe95?q=80&w=800",
    title: "Char Dham Yatra",
    location: "Uttarakhand, India",
    duration: "12 Days",
    price: "64000",
    bestTime: "May - June, September - October",
    packageType: "Premier",
    description: "A spiritual journey to the four sacred Hindu temples in the Himalayas: Yamunotri, Gangotri, Kedarnath, and Badrinath.",
    itinerary: [
      {day: 1, title: "Arrival in Haridwar", description: "Welcome at Haridwar and transfer to hotel. Evening Ganga Aarti at Har Ki Pauri."},
      {day: 2, title: "Haridwar to Yamunotri", description: "Drive to Janki Chatti and trek to Yamunotri temple. Return to Barkot for overnight stay."},
      {day: 3, title: "Barkot to Gangotri", description: "Drive to Gangotri through scenic Himalayan landscapes. Visit Gangotri Temple."},
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    title: "Varanasi Spiritual Tour",
    location: "Uttar Pradesh, India",
    duration: "4 Days",
    price: "21332",
    bestTime: "October - March",
    packageType: "Budgeted",
    description: "Experience the spiritual essence of India's oldest city with morning boat rides on the Ganges and evening aartis.",
    itinerary: [
      {day: 1, title: "Arrival in Varanasi", description: "Welcome at Varanasi Airport/Railway Station and transfer to hotel. Evening Ganga Aarti."},
      {day: 2, title: "Morning Boat Ride & Temples", description: "Early morning boat ride on the Ganges to witness sunrise. Visit important temples."},
      {day: 3, title: "Sarnath Excursion", description: "Day trip to Sarnath where Buddha gave his first sermon. Visit the Dhamek Stupa."},
    ]
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1608021584625-35f8646fe1d6?q=80&w=800",
    title: "Golden Temple & Amritsar",
    location: "Punjab, India",
    duration: "3 Days",
    price: "15999",
    bestTime: "October - March",
    packageType: "Budgeted",
    description: "Visit the magnificent Golden Temple and experience the vibrant Punjabi culture in Amritsar.",
    itinerary: [
      {day: 1, title: "Arrival in Amritsar", description: "Welcome at Amritsar and transfer to hotel. Evening visit to Golden Temple for Palki Ceremony."},
      {day: 2, title: "Golden Temple & Wagah Border", description: "Morning visit to Golden Temple. Afternoon visit to Wagah Border for the Retreat Ceremony."},
      {day: 3, title: "Amritsar City Tour", description: "Visit Jallianwala Bagh, Durgiana Temple, and local markets. Departure from Amritsar."},
    ]
  },
];

const testimonials = [
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

const blogPosts = [
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

const travelCategories = [
  { icon: <Beach className="h-6 w-6" />, name: "Beaches", link: "/destinations?category=beaches" },
  { icon: <Mountains className="h-6 w-6" />, name: "Mountains", link: "/destinations?category=mountains" },
  { icon: <PrayingHands className="h-6 w-6" />, name: "Pilgrimage", link: "/destinations?category=pilgrimage" },
  { icon: <Buildings className="h-6 w-6" />, name: "Heritage", link: "/destinations?category=heritage" },
  { icon: <Plane className="h-6 w-6" />, name: "International", link: "/destinations?category=international" },
  { icon: <Map className="h-6 w-6" />, name: "Adventure", link: "/destinations?category=adventure" },
];

const Index = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* Travel Categories Section */}
      <section className="py-10 container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {travelCategories.map((category, index) => (
            <Link to={category.link} key={index} className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 transition-all group-hover:bg-primary/20">
                {category.icon}
              </div>
              <span className="text-xs md:text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="Services We Offer"
          subtitle="We provide comprehensive travel services to make your journey memorable and hassle-free"
          tag="Our Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="h-8 w-8 text-primary" />,
              title: "Destination Planning",
              description: "Customized itineraries tailored to your preferences, time constraints, and budget."
            },
            {
              icon: <Compass className="h-8 w-8 text-primary" />,
              title: "Tour Packages",
              description: "All-inclusive tour packages for popular destinations, with various budget options."
            },
            {
              icon: <MapPin className="h-8 w-8 text-primary" />,
              title: "Visa Assistance",
              description: "Expert guidance on visa requirements and application process for different countries."
            },
            {
              icon: <Shield className="h-8 w-8 text-primary" />,
              title: "Travel Insurance",
              description: "Comprehensive travel insurance options to ensure a safe and secure journey."
            },
            {
              icon: <Headphones className="h-8 w-8 text-primary" />,
              title: "24/7 Support",
              description: "Round-the-clock customer support during your trip for any assistance you need."
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className="p-6 border border-border/50 rounded-xl bg-card shadow-sm hover-scale h-full"
            >
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Package Calculator Section */}
      <section className="section-padding bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Plan Your Perfect Trip"
            subtitle="Use our package calculator to estimate your travel costs"
            tag="Tour Calculator"
          />
          
          <PackageCalculator className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="Popular Destinations"
          subtitle="Explore our handpicked destinations for your next adventure"
          tag="Featured Destinations"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              imageSrc={destination.imageSrc}
              title={destination.title}
              description={destination.description}
              bestTime={destination.bestTime}
              isPopular={destination.isPopular}
              link="/destinations"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/destinations">
            <Button variant="outline" className="group">
              <span>View All Destinations</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Religious Destinations */}
      <section className="section-padding bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Popular Religious Places"
            subtitle="Embark on a spiritual journey to these sacred destinations"
            tag="Religious Tourism"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {religiousDestinations.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                link="/destinations?category=pilgrimage"
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/destinations?category=pilgrimage">
              <Button variant="outline" className="group">
                <span>Explore Religious Tours</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="section-padding bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Tour Packages"
            subtitle="Discover our carefully curated tour packages for unforgettable experiences"
            tag="Popular Tours"
          />

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Tours</TabsTrigger>
                <TabsTrigger value="budgeted">Budgeted</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
                <TabsTrigger value="premier">Premier</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour, index) => (
                  <TourCard
                    key={index}
                    imageSrc={tour.imageSrc}
                    title={tour.title}
                    location={tour.location}
                    duration={tour.duration}
                    price={tour.price}
                    bestTime={tour.bestTime}
                    packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                    link="/tours"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="budgeted" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Budgeted")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="luxury" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Luxury")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="premier" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Premier")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-10">
            <Link to="/tours">
              <Button variant="outline" className="group">
                <span>View All Tours</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Religious Tour Packages */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="Religious Tour Packages"
          subtitle="Discover our carefully curated religious tour packages for spiritual journeys"
          tag="Pilgrimages & Spiritual Tours"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {religiousTours.map((tour, index) => (
            <TourCard
              key={index}
              imageSrc={tour.imageSrc}
              title={tour.title}
              location={tour.location}
              duration={tour.duration}
              price={tour.price}
              bestTime={tour.bestTime}
              packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
              description={tour.description}
              itinerary={tour.itinerary}
              link="/tours?category=religious"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/tours?category=religious">
            <Button variant="outline" className="group">
              <span>View All Religious Tours</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* International Destinations */}
      <section className="section-padding bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="International Destinations"
            subtitle="Explore exotic locations around the world with our expertly crafted packages"
            tag="Global Expeditions"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalDestinations.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                link="/destinations?category=international"
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/destinations?category=international">
              <Button variant="outline" className="group">
                <span>Explore International Destinations</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hill Stations Section */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="Popular Hill Stations"
          subtitle="Escape to the serene mountains and breathtaking landscapes"
          tag="Mountain Retreats"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hillStations.map((destination, index) => (
            <DestinationCard
              key={index}
              imageSrc={destination.imageSrc}
              title={destination.title}
              description={destination.description}
              bestTime={destination.bestTime}
              link="/destinations?category=hillstations"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/destinations?category=hillstations">
            <Button variant="outline" className="group">
              <span>Explore Hill Stations</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="What Our Travelers Say"
          subtitle="Hear from our satisfied clients about their travel experiences with us"
          tag="Testimonials"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Plan Your Next Adventure?"
        description="Contact us today to start planning your dream vacation with personalized service and expert advice."
        buttonText="Get in Touch"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000"
        align="center"
      />

      {/* Recent Blog Posts */}
      <section className="section-padding container mx-auto px-4">
        <SectionHeading
          title="Travel Tips & Inspiration"
          subtitle="Read our latest blog posts for travel tips, destination guides, and inspiration"
          tag="From Our Blog"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              imageSrc={post.imageSrc}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              tags={post.tags}
              link="/blog"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="outline" className="group">
              <span>Read More Articles</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
