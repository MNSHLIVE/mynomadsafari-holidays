
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { destinations } from "@/data/destinations";
import { useState, useEffect } from "react";
import { rajasthanTours } from "@/data/tour-types/rajasthan-tours";
import { keralaTours } from "@/data/tour-types/kerala-tours";
import { ErrorBoundary } from "@/components/error-boundary";
import { useToast } from "@/hooks/use-toast";
import ToursSection from "@/components/home/tours-section";
import CTASection from "@/components/cta-section";
import DestinationSkeleton from "@/components/destination/destination-skeleton";
import DestinationHeader from "@/components/destination/destination-header";
import DestinationInfo from "@/components/destination/destination-info";
import DestinationSidebar from "@/components/destination/destination-sidebar";
import DestinationContent from "@/components/destination/destination-content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedTours, setRelatedTours] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      if (slug) {
        const foundDestination = destinations.find(
          (d) => d.name.toLowerCase().replace(/\s+/g, "-") === slug
        );
        
        if (!foundDestination) {
          toast({
            variant: "destructive",
            title: "Destination not found",
            description: "We couldn't find the destination you're looking for."
          });
          setLoading(false);
          return;
        }
        
        setDestination(foundDestination);
        
        // Match tours based on destination name
        let tours = [];
        
        try {
          if (foundDestination.name === "Rajasthan") {
            tours = rajasthanTours.map(tour => ({
              imageSrc: tour.imageSrc,
              title: tour.title,
              location: tour.location,
              duration: tour.duration,
              price: tour.price,
              bestTime: tour.bestTime,
              packageType: tour.packageType,
              description: tour.overview,
              itinerary: tour.dailyPlans // Include the itinerary data
            }));
          } else if (foundDestination.name === "Kerala") {
            tours = keralaTours.map(tour => ({
              imageSrc: tour.imageSrc,
              title: tour.title,
              location: tour.location,
              duration: tour.duration,
              price: tour.price,
              bestTime: tour.bestTime,
              packageType: tour.packageType,
              description: tour.overview,
              itinerary: tour.dailyPlans // Include the itinerary data
            }));
          } else {
            tours = [
              {
                imageSrc: `/Destination/Domestic/main/${foundDestination.name.toLowerCase()}-main.jpg`,
                title: `${foundDestination.name} Explorer`,
                location: foundDestination.name,
                duration: "5 Days / 4 Nights",
                price: "₹15,999",
                bestTime: foundDestination.bestTimeToVisit || "October - March",
                packageType: "Budgeted",
                description: `Experience the beauty of ${foundDestination.name} with our curated tour package.`
              },
              {
                imageSrc: `/Destination/Domestic/main/${foundDestination.name.toLowerCase()}-3.jpg`,
                title: `${foundDestination.name} Adventure`,
                location: foundDestination.name,
                duration: "7 Days / 6 Nights",
                price: "₹24,999",
                bestTime: foundDestination.bestTimeToVisit || "October - March",
                packageType: "Luxury",
                description: `Discover the hidden treasures of ${foundDestination.name} with our premium tour.`
              }
            ];
          }
          
          setRelatedTours(tours);
        } catch (error) {
          console.error("Error loading tours:", error);
          toast({
            variant: "destructive",
            title: "Error loading tours",
            description: "There was an error loading the tour packages. Please try again."
          });
        }
      }
    } catch (error) {
      console.error("Error in destination detail:", error);
      toast({
        variant: "destructive",
        title: "Error loading destination",
        description: "There was an error loading the destination details. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }, [slug, toast]);
  
  if (loading) {
    return <DestinationSkeleton />;
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
    <ErrorBoundary>
      <Helmet>
        <title>{destination?.name || "Destination"} | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content={destination ? `Explore ${destination.name} with My Nomadsafari Holidays. ${destination.description}` : "Explore destinations with My Nomadsafari Holidays"}
        />
      </Helmet>
      
      <DestinationHeader destinationName={destination.name} />
      
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
            
            <DestinationInfo
              region={destination.region}
              bestTimeToVisit={destination.bestTimeToVisit}
              duration={destination.duration}
              type={destination.type}
            />
            
            <DestinationContent
              description={destination.description}
              longDescription={destination.longDescription}
              highlights={destination.highlights}
              attractions={destination.attractions}
            />
          </div>
          
          <div>
            <DestinationSidebar destinationName={destination.name} />
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
    </ErrorBoundary>
  );
};

export default DestinationDetail;
