
import React from 'react';
import CTASection from '@/components/cta-section';

const GroupTours = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Group Tours</h1>
      
      <div className="prose max-w-none mb-8">
        <p className="text-lg">
          Explore our specially curated group tour packages designed for corporate teams, 
          families, friends, and special interest groups. Our group tours offer excellent value,
          expert guides, and customized experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3" 
            alt="Corporate Group Tour"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Corporate Group Tours</h2>
            <p className="text-muted-foreground mb-4">
              Team building retreats and corporate outings tailored to your company's needs.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Customizable team activities</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Meeting and conference facilities</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Corporate branding options</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac" 
            alt="Friends Group Tour"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Friends & Family Groups</h2>
            <p className="text-muted-foreground mb-4">
              Create lasting memories with specially designed tours for friend groups and family reunions.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Group discounts available</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Customized itineraries</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Group photo opportunities</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b" 
            alt="Educational Group Tour"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Educational Tours</h2>
            <p className="text-muted-foreground mb-4">
              School trips and educational journeys with informative guides and learning experiences.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Age-appropriate activities</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Educational content</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Expert guides specializing in history and culture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Group Tours?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Better Value</h3>
            <p className="text-sm text-muted-foreground">
              Group discounts and shared costs make your travel budget go further.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Expert Guides</h3>
            <p className="text-sm text-muted-foreground">
              Knowledgeable local guides to enhance your travel experience.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Peace of Mind</h3>
            <p className="text-sm text-muted-foreground">
              All logistics and arrangements handled by our expert team.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Shared Experiences</h3>
            <p className="text-sm text-muted-foreground">
              Create memories with friends, family, or colleagues.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Group Tour Planning Process</h2>
        <ol className="space-y-4">
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mr-3 shrink-0">1</span>
            <div>
              <h3 className="font-medium">Initial Consultation</h3>
              <p className="text-muted-foreground">We discuss your group's needs, interests, and budget constraints.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mr-3 shrink-0">2</span>
            <div>
              <h3 className="font-medium">Custom Itinerary Development</h3>
              <p className="text-muted-foreground">Our experts craft a tailored itinerary specifically for your group.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mr-3 shrink-0">3</span>
            <div>
              <h3 className="font-medium">Logistics & Bookings</h3>
              <p className="text-muted-foreground">We handle all accommodation, transportation, and activity reservations.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mr-3 shrink-0">4</span>
            <div>
              <h3 className="font-medium">Tour Execution</h3>
              <p className="text-muted-foreground">Expert guides lead your group throughout the journey.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mr-3 shrink-0">5</span>
            <div>
              <h3 className="font-medium">Follow-up & Memories</h3>
              <p className="text-muted-foreground">We provide photos and follow up to ensure satisfaction.</p>
            </div>
          </li>
        </ol>
      </div>
      
      <CTASection
        title="Ready to Plan Your Group Tour?"
        description="Contact us today to start planning an unforgettable group experience with personalized service and expert advice."
        buttonText="Get in Touch"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1539635278303-d4002c07eae3"
        align="center"
      />
    </div>
  );
};

export default GroupTours;
