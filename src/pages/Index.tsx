
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
import { ArrowRight, Globe, MapPin, Compass, Shield, Headphones } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const tours = [
  {
    imageSrc: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
    title: "Golden Triangle Tour",
    location: "Delhi, Agra, Jaipur",
    duration: "6 Days",
    price: "$600",
    bestTime: "October - March",
    packageType: "Budgeted",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
    title: "Kerala Backwaters Luxury",
    location: "Kochi, Munnar, Alleppey",
    duration: "7 Days",
    price: "$1800",
    bestTime: "September - March",
    packageType: "Luxury",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1580439471383-30ab8d7b0e3c?q=80&w=800",
    title: "Premier Rajasthan Heritage",
    location: "Jaipur, Udaipur, Jodhpur",
    duration: "10 Days",
    price: "$3500",
    bestTime: "October - March",
    packageType: "Premier",
  },
];

const testimonials = [
  {
    quote: "WanderLuxe Travel arranged the most amazing trip to Rajasthan for us. Every detail was perfect, from the hotels to the guided tours. Highly recommend their Premier package!",
    author: "Sarah Thompson",
    role: "Traveled to Rajasthan",
    rating: 5,
  },
  {
    quote: "As a solo traveler, I was nervous about my trip to Bali, but the team at WanderLuxe made it so easy and comfortable. The customized itinerary was exactly what I wanted.",
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

const Index = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-64px)]">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000"
          alt="Hero"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 hero-gradient" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center text-white pt-20 md:pt-0">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/30 mb-4 animate-fade-in">
              Discover the World with Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "200ms" }}>
              Your One-Stop Travel Expert – Explore the World Your Way
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
              Personalized travel experiences, expert planning, and unforgettable adventures
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <Link to="/destinations">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore Destinations
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
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
