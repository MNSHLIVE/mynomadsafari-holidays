import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import DestinationCard from "@/components/destination-card";
import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { destinations, getRegions, getDestinationsByRegion } from "@/data/destinations";

interface DestinationData {
  name: string;
  description: string;
  imageSrc?: string;
  mainImage?: string;
  bestTimeToVisit: string;
  slug: string;
  duration?: string;
  price?: string;
}

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRegion === "all") {
      setFilteredDestinations(destinations);
    } else {
      setFilteredDestinations(getDestinationsByRegion(selectedRegion));
    }
  }, [selectedRegion]);

  const regions = getRegions();

  return (
    <>
      <Helmet>
        <title>Destinations | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Explore a wide range of destinations for your next holiday with My Nomadsafari Holidays."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title="Explore Our Destinations"
          subtitle="Discover your next adventure with our curated list of destinations"
          tag="Travel Destinations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Filter by Region:
              </label>
              <select
                id="region"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredDestinations.map((destination, index) => {
                // Generate slug from destination name if it's not already defined
                const slug = destination.slug || destination.name.toLowerCase().replace(/ /g, "-");
                
                return (
                  <DestinationCard
                    key={index}
                    imageSrc={destination.imageSrc || destination.mainImage || ""}
                    title={destination.name}
                    description={destination.description}
                    bestTime={destination.bestTimeToVisit}
                    slug={slug}
                    duration={destination.duration || "Contact for duration"}
                    price={destination.price || "Contact for price"}
                  />
                );
              })}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center mt-8">
                <p className="text-gray-500">No destinations found in this region.</p>
              </div>
            )}

            <div className="text-center mt-10">
              <Link to="/tours">
                <Button variant="outline" className="group">
                  <span>View Tour Packages</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Dream Vacation</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm 
                  defaultDestination={selectedDestination || ""}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destinations;
