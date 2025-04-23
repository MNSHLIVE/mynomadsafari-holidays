
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Sun, Tag } from "lucide-react";
import { destinations } from "@/data/destinations";
import SectionHeading from "@/components/section-heading";
import ToursSection from "@/components/home/tours-section";
import CTASection from "@/components/cta-section";
import { useState, useEffect } from "react";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedTours, setRelatedTours] = useState([]);
  
  useEffect(() => {
    if (slug) {
      // Find destination by slug (normalized name)
      const foundDestination = destinations.find(
        (d) => d.name.toLowerCase().replace(/\s+/g, "-") === slug
      );
      
      setDestination(foundDestination || null);
      
      // Set some mock related tours if we found the destination
      if (foundDestination) {
        // In a real app, you would fetch related tours from your API/data
        setRelatedTours([
          {
            imageSrc: "/Destination/Home/Featured-Tours/Rajasthan-Heritage.jpg",
            title: `${foundDestination.name} Explorer`,
            location: foundDestination.name,
            duration: "5 Days / 4 Nights",
            price: "₹15,999",
            bestTime: foundDestination.bestTimeToVisit || "October - March",
            packageType: "Budgeted",
            description: `Experience the beauty of ${foundDestination.name} with our curated tour package.`
          },
          {
            imageSrc: "/Destination/Home/Featured-Tours/Kerala-Backwaters.jpg",
            title: `${foundDestination.name} Adventure`,
            location: foundDestination.name,
            duration: "7 Days / 6 Nights",
            price: "₹24,999",
            bestTime: foundDestination.bestTimeToVisit || "October - March",
            packageType: "Luxury",
            description: `Discover the hidden treasures of ${foundDestination.name} with our premium tour.`
          }
        ]);
      }
      
      setLoading(false);
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-80 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the destination you were looking for.</p>
        <Button asChild>
          <Link to="/destinations">Back to All Destinations</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{destination.name} | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content={`Explore ${destination.name} with My Nomadsafari Holidays. ${destination.description}`}
        />
      </Helmet>
      
      <div className="bg-muted/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/destinations">
                <ArrowLeft className="h-4 w-4 mr-1" />
                All Destinations
              </Link>
            </Button>
            <span className="text-muted-foreground">/ {destination.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{destination.name}</h1>
            
            <div className="mb-6 rounded-xl overflow-hidden">
              <img 
                src={destination.imageSrc} 
                alt={destination.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                <span>{destination.region}</span>
              </div>
              {destination.bestTimeToVisit && (
                <div className="flex items-center text-sm">
                  <Sun className="h-4 w-4 mr-1 text-primary" />
                  <span>Best time: {destination.bestTimeToVisit}</span>
                </div>
              )}
              {destination.duration && (
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  <span>Recommended stay: {destination.duration}</span>
                </div>
              )}
              {destination.type && (
                <div className="flex items-center text-sm">
                  <Tag className="h-4 w-4 mr-1 text-primary" />
                  <span>{destination.type}</span>
                </div>
              )}
            </div>
            
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-3">About {destination.name}</h2>
              <p className="mb-4">{destination.description}</p>
              
              {destination.longDescription && (
                <div dangerouslySetInnerHTML={{ __html: destination.longDescription }} />
              )}
            </div>
            
            {destination.attractions && destination.attractions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Top Attractions</h2>
                <ul className="space-y-2">
                  {destination.attractions.map((attraction, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>{attraction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Interested in {destination.name}?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our travel experts to plan your perfect trip to {destination.name}.
              </p>
              <Button className="w-full" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              
              <div className="mt-8">
                <h4 className="font-medium mb-2">Highlights</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Customized itineraries
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Expert local guides
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Comfortable accommodations
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Convenient transportation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {relatedTours.length > 0 && (
        <ToursSection
          title={`Popular ${destination.name} Tours`}
          subtitle={`Explore our curated selection of ${destination.name} tour packages`}
          tag="Featured Tours"
          tours={relatedTours}
          viewAllLink="/tours"
          viewAllText="View All Tours"
          bgColor="bg-muted/30"
          showTabs={false}
        />
      )}
      
      <CTASection
        title={`Ready to Explore ${destination.name}?`}
        description="Contact us today to start planning your dream vacation with personalized service and expert advice."
        buttonText="Get in Touch"
        buttonLink="/contact"
        imageSrc={destination.imageSrc}
        align="center"
      />
    </>
  );
};

export default DestinationDetail;
