
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import SEOHead from "@/components/seo/seo-head";
import { createTouristDestinationSchema, createBreadcrumbSchema } from "@/components/seo/schema-data";
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
        console.log("Available destinations:", destinations.map(d => ({ name: d.name, slug: d.slug || d.name.toLowerCase().replace(/\s+/g, "-").replace(/,/g, "") })));
        
        // Update the logic to find destinations by slug or name
        const foundDestination = destinations.find(
          (d) => {
            // Try to match by slug if available, otherwise fall back to name-based slug
            const destinationSlug = d.slug || d.name.toLowerCase().replace(/\s+/g, "-").replace(/,/g, "");
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

  // Generate SEO data
  const destinationSlug = destination.slug || destination.name.toLowerCase().replace(/\s+/g, "-").replace(/,/g, "");
  const seoData = {
    title: `${destination.name} Tour Packages 2025 | Best Prices & Customized Itineraries`,
    description: `Discover ${destination.name} with expert travel planning. ${destination.description} Best ${destination.name} tour packages with accommodation, transport & 24/7 support. Book now for best deals!`,
    keywords: `${destination.name} tour packages, ${destination.name} tourism, ${destination.name} travel guide, places to visit ${destination.name}, ${destination.name} holiday packages, ${destination.name} tour operators, best time to visit ${destination.name}`,
    canonicalUrl: `https://www.mynomadsafariholidays.in/destinations/${destinationSlug}`,
    ogImage: destination.imageSrc || destination.mainImage || undefined,
    structuredData: [
      createTouristDestinationSchema(
        destination.name,
        destination.description,
        destination.imageSrc || destination.mainImage || ""
      ),
      createBreadcrumbSchema([
        { name: "Home", url: "https://www.mynomadsafariholidays.in/" },
        { name: "Destinations", url: "https://www.mynomadsafariholidays.in/destinations" },
        { name: destination.name, url: `https://www.mynomadsafariholidays.in/destinations/${destinationSlug}` }
      ])
    ]
  };

  return (
    <>
      <SEOHead {...seoData} />

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
