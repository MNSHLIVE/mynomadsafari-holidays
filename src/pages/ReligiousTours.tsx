
import React from 'react';
import { Helmet } from "react-helmet";
import SectionHeading from "@/components/section-heading";
import { religiousTours, religiousTourNote } from "@/components/tours/data";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";

const ReligiousTours = () => {
  return (
    <>
      <Helmet>
        <title>Religious Tours | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Embark on a spiritual journey with our carefully curated religious and pilgrimage tour packages across India."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <SectionHeading
          title="Religious & Pilgrimage Tours"
          subtitle="Embark on a spiritual journey to the most sacred destinations across India"
          tag="Spiritual Journeys"
          align="center"
        />
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-muted-foreground">
            Our religious tours are designed to provide a meaningful and spiritual experience, 
            with careful attention to accommodations, transportation, and special arrangements 
            for religious ceremonies and rituals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {religiousTours.map((tour, index) => (
            <TourCard
              key={index}
              imageSrc={tour.imageSrc}
              title={tour.title}
              location={tour.location}
              duration={tour.duration}
              price={tour.price}
              bestTime={tour.bestTime}
              packageType={tour.packageType}
              description={tour.description}
            />
          ))}
        </div>
        
        <div className="bg-muted/30 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Our Religious Tour Services Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Comfortable accommodation near temples/shrines</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Experienced guides knowledgeable in religious customs</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Arrangement for special pujas and rituals</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Assistance with temple protocols and customs</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Priority darshan arrangements where possible</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Vegetarian meal options throughout the journey</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Safe and comfortable transportation</span>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center bg-primary/20 text-primary rounded-full w-6 h-6 mr-3 shrink-0">✓</span>
              <span>Assistance with prasad and offerings</span>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>{religiousTourNote}</p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Pilgrimage Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Varanasi</h3>
              <p className="text-xs text-muted-foreground">Uttar Pradesh</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Amritsar</h3>
              <p className="text-xs text-muted-foreground">Punjab</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Rishikesh</h3>
              <p className="text-xs text-muted-foreground">Uttarakhand</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Tirupati</h3>
              <p className="text-xs text-muted-foreground">Andhra Pradesh</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Shirdi</h3>
              <p className="text-xs text-muted-foreground">Maharashtra</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium">Haridwar</h3>
              <p className="text-xs text-muted-foreground">Uttarakhand</p>
            </div>
          </div>
        </div>
        
        <CTASection
          title="Ready to Begin Your Spiritual Journey?"
          description="Contact us today to customize your religious tour package according to your preferences and requirements."
          buttonText="Enquire Now"
          buttonLink="/contact"
          imageSrc="/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg"
          align="center"
        />
      </div>
    </>
  );
};

export default ReligiousTours;
