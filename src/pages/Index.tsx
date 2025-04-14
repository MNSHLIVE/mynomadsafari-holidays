
import { useState } from "react";
import CTASection from "@/components/cta-section";
import HeroSlider from "@/components/hero-slider";
import TravelCategories from "@/components/home/travel-categories";
import ServicesSection from "@/components/home/services-section";
import CalculatorSection from "@/components/home/calculator-section";
import DestinationsSection from "@/components/home/destinations-section";
import ToursSection from "@/components/home/tours-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import BlogSection from "@/components/home/blog-section";
import WhatsAppButton from "@/components/whatsapp-button";
import ContinentDestinations from "@/components/destinations/continent-destinations";
import { allContinentDestinations } from "@/data/continent-destinations";

import {
  heroSlides,
  popularDestinations,
  religiousDestinations,
  internationalDestinations,
  hillStations,
  popularTours,
  religiousTours,
  testimonials,
  blogPosts
} from "@/components/home/home-data";

const Index = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* Travel Categories Section */}
      <TravelCategories />

      {/* Services Section */}
      <ServicesSection />

      {/* Package Calculator Section */}
      <CalculatorSection />

      {/* Popular Destinations */}
      <DestinationsSection
        title="Popular Destinations"
        subtitle="Explore our handpicked destinations for your next adventure"
        tag="Featured Destinations"
        destinations={popularDestinations}
        viewAllLink="/destinations"
        viewAllText="View All Destinations"
      />

      {/* Global Destinations Showcase */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
              Global Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the World With Us</h2>
            <p className="text-muted-foreground">
              Discover amazing destinations across every continent with our expertly curated travel experiences
            </p>
          </div>
          
          <ContinentDestinations destinations={allContinentDestinations} />
        </div>
      </section>

      {/* Religious Destinations */}
      <DestinationsSection
        title="Popular Religious Places"
        subtitle="Embark on a spiritual journey to these sacred destinations"
        tag="Religious Tourism"
        destinations={religiousDestinations}
        viewAllLink="/destinations?category=pilgrimage"
        viewAllText="Explore Religious Tours"
      />

      {/* Featured Tours */}
      <ToursSection
        title="Featured Tour Packages"
        subtitle="Discover our carefully curated tour packages for unforgettable experiences"
        tag="Popular Tours"
        tours={popularTours}
        viewAllLink="/tours"
        viewAllText="View All Tours"
        bgColor="bg-muted/30 py-16"
        showTabs={true}
      />

      {/* Religious Tour Packages */}
      <ToursSection
        title="Religious Tour Packages"
        subtitle="Discover our carefully curated religious tour packages for spiritual journeys"
        tag="Pilgrimages & Spiritual Tours"
        tours={religiousTours}
        viewAllLink="/tours?category=religious"
        viewAllText="View All Religious Tours"
        showTabs={false}
      />

      {/* Hill Stations Section */}
      <DestinationsSection
        title="Popular Hill Stations"
        subtitle="Escape to the serene mountains and breathtaking landscapes"
        tag="Mountain Retreats"
        destinations={hillStations}
        viewAllLink="/destinations?category=hillstations"
        viewAllText="Explore Hill Stations"
        bgColor="bg-muted/30 py-16"
      />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

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
      <BlogSection posts={blogPosts} />

      {/* WhatsApp Button as a fallback */}
      <WhatsAppButton />
    </>
  );
};

export default Index;
