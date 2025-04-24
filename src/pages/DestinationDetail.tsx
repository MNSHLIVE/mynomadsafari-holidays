
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import DestinationHeader from "@/components/destination/destination-header";
import DestinationContent from "@/components/destination/destination-content";
import DestinationSidebar from "@/components/destination/destination-sidebar";
import DestinationSkeleton from "@/components/destination/destination-skeleton";
import { DestinationData } from "@/components/tour-itineraries/types";
import { destinations, getDestinationsByRegion } from "@/data/destinations";
import NotFound from "./NotFound";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<DestinationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (slug) {
        console.log("Looking for destination with slug:", slug);
        console.log("Available destinations:", destinations.map(d => ({ name: d.name, slug: d.slug || d.name.toLowerCase().replace(/\s+/g, "-") })));
        
        // Update the logic to find destinations by slug or name
        const foundDestination = destinations.find(
          (d) => {
            // Try to match by slug if available, otherwise fall back to name-based slug
            const destinationSlug = d.slug || d.name.toLowerCase().replace(/\s+/g, "-");
            return destinationSlug === slug;
          }
        );
        
        if (!foundDestination) {
          console.error(`Destination not found for slug: ${slug}`);
          toast({
            variant: "destructive",
            title: "Destination not found",
            description: "The destination you are looking for does not exist.",
          });
          setError(true);
        } else {
          setDestination(foundDestination);
        }
      }
    } catch (err) {
      console.error("Error finding destination:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while loading the destination.",
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug, toast]);

  if (loading) {
    return <DestinationSkeleton />;
  }

  if (error || !destination) {
    return <NotFound />;
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

      <div className="container mx-auto px-4 py-8">
        <DestinationHeader
          name={destination.name}
          region={destination.region}
          image={destination.imageSrc || destination.mainImage || ""}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <DestinationContent
              description={destination.description}
              highlights={destination.highlights}
            />
          </div>

          <div>
            <DestinationSidebar
              bestTimeToVisit={destination.bestTimeToVisit}
              budgetRange={destination.budgetRange}
              name={destination.name}
              region={destination.region}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
