
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import { domesticItineraries, internationalItineraries } from "@/data/tour-itineraries";
import { Helmet } from "react-helmet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Define tour tier type
type TourTier = "Budgeted" | "Luxury" | "Premier";

const TourItineraries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const uniqueDomesticDestinations = [...new Set(domesticItineraries.map(tour => tour.location))];
  const uniqueInternationalDestinations = [...new Set(internationalItineraries.map(tour => tour.location))];

  // Filter domestic tours based on search, destination, and duration
  const filteredDomesticTours = domesticItineraries.filter(tour => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tour.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = selectedDestination === "all" || tour.location === selectedDestination;
    
    const matchesDuration = selectedDuration === "all" || 
      (selectedDuration === "short" && tour.duration.includes("3 Nights")) || 
      (selectedDuration === "long" && tour.duration.includes("6 Nights"));
      
    return matchesSearch && matchesDestination && matchesDuration;
  });

  // Filter international tours based on search, destination, and duration
  const filteredInternationalTours = internationalItineraries.filter(tour => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tour.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = selectedDestination === "all" || tour.location === selectedDestination;
    
    const matchesDuration = selectedDuration === "all" || 
      (selectedDuration === "short" && tour.duration.includes("4 Nights")) || 
      (selectedDuration === "long" && tour.duration.includes("8 Nights"));
      
    return matchesSearch && matchesDestination && matchesDuration;
  });

  return (
    <>
      <Helmet>
        <title>Tour Itineraries | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Explore our carefully curated tour itineraries for domestic and international destinations. Find your perfect holiday package with My Nomadsafari Holidays."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title="Explore Our Tour Itineraries"
          subtitle="Detailed day-by-day plans for your perfect vacation"
          tag="Travel Plans"
        />

        <div className="mb-8 bg-muted/30 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search destinations, activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Select
              value={selectedDestination}
              onValueChange={setSelectedDestination}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <Tabs defaultValue="domestic">
                    <TabsList className="mb-2">
                      <TabsTrigger value="domestic">Domestic</TabsTrigger>
                      <TabsTrigger value="international">International</TabsTrigger>
                    </TabsList>
                    <TabsContent value="domestic">
                      {uniqueDomesticDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </TabsContent>
                    <TabsContent value="international">
                      {uniqueInternationalDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </TabsContent>
                  </Tabs>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">Short Tours (3-4 Nights)</SelectItem>
                <SelectItem value="long">Long Tours (6-8 Nights)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="domestic" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="domestic">Domestic Tours</TabsTrigger>
            <TabsTrigger value="international">International Tours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="domestic" className="mt-0">
            {filteredDomesticTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDomesticTours.map((tour, index) => (
                  <TourCard
                    key={index}
                    imageSrc={tour.imageSrc}
                    title={tour.title}
                    location={tour.location}
                    duration={tour.duration}
                    price={tour.price}
                    bestTime={tour.bestTime}
                    packageType={tour.packageType as TourTier}
                    description={tour.overview}
                    itinerary={tour.dailyPlans}
                    link={`/tours?destination=${encodeURIComponent(tour.location)}&package=${encodeURIComponent(tour.title)}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No tours found</h3>
                <p className="text-muted-foreground">
                  Please try adjusting your search criteria
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="international" className="mt-0">
            {filteredInternationalTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternationalTours.map((tour, index) => (
                  <TourCard
                    key={index}
                    imageSrc={tour.imageSrc}
                    title={tour.title}
                    location={tour.location}
                    duration={tour.duration}
                    price={tour.price}
                    bestTime={tour.bestTime}
                    packageType={tour.packageType as TourTier}
                    description={tour.overview}
                    itinerary={tour.dailyPlans}
                    link={`/tours?destination=${encodeURIComponent(tour.location)}&package=${encodeURIComponent(tour.title)}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No tours found</h3>
                <p className="text-muted-foreground">
                  Please try adjusting your search criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default TourItineraries;
