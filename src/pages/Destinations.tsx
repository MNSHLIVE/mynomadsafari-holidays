
import { useState } from "react";
import { Helmet } from "react-helmet";
import SectionHeading from "@/components/section-heading";
import DestinationQueryForm from "@/components/destination-query-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  destinations, 
  getRegions, 
  getDestinationsByRegion, 
  getPilgrimageDestinations,
  getHoneymoonDestinations 
} from "@/data/destinations";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentRegion, setCurrentRegion] = useState("All");
  
  // Get unique regions
  const regions = ["All", ...getRegions()];
  
  // Filter destinations based on search and region
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = currentRegion === "All" || dest.region === currentRegion;
    
    return matchesSearch && matchesRegion;
  });
  
  // Special destination categories
  const pilgrimageDestinations = getPilgrimageDestinations();
  const honeymoonDestinations = getHoneymoonDestinations();

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <Helmet>
        <title>Destinations | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Explore our wide range of destinations across India, Southeast Asia, Europe, and more. Find your perfect travel destination with My Nomadsafari Holidays."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Explore
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Beautiful Destinations
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            From the vibrant streets of India to exotic international locations
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="all">All Destinations</TabsTrigger>
              <TabsTrigger value="pilgrimage">Pilgrimage</TabsTrigger>
              <TabsTrigger value="honeymoon">Honeymoon</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Region Selector */}
          <div className="flex justify-center mb-10 overflow-x-auto">
            <div className="flex gap-2 flex-wrap justify-center">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={currentRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentRegion(region)}
                  className="mb-2"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          {/* All Destinations Tab */}
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredDestinations.map((destination, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-xl card-hover bg-card shadow-sm border border-border/50"
                >
                  <img 
                    src={destination.imageSrc} 
                    alt={destination.name} 
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {destination.region}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span><strong>Best time:</strong> {destination.bestTimeToVisit}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3 mr-2" />
                        <span><strong>Starting from:</strong> {destination.budgetRange.economy.split(" - ")[0]}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <DestinationQueryForm 
                        destinationName={destination.name} 
                        buttonText="Enquire Now"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/20 hover:border-primary hover:bg-primary/5"
                        onClick={() => {
                          const element = document.getElementById(`destination-detail-${index}`);
                          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDestinations.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No destinations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
            
            {/* Detailed Destination Info */}
            <div className="mt-16 space-y-12">
              {filteredDestinations.map((destination, index) => (
                <div 
                  key={index}
                  id={`destination-detail-${index}`}
                  className="border border-border/50 rounded-lg p-6 shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img 
                        src={destination.imageSrc} 
                        alt={destination.name} 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{destination.name}</h2>
                        <Badge variant="secondary">{destination.region}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{destination.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" /> Best Time to Visit
                          </h4>
                          <p className="text-sm">{destination.bestTimeToVisit}</p>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> Region
                          </h4>
                          <p className="text-sm">{destination.region}</p>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" /> Budget Range
                          </h4>
                          <p className="text-sm">From {destination.budgetRange.economy.split(" - ")[0]}</p>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mb-2">Top Highlights</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {destination.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="bg-background">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      
                      <h4 className="font-semibold mb-2">Budget Options</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
                          <h5 className="font-medium text-blue-700 dark:text-blue-300 text-sm mb-1">Economy</h5>
                          <p>{destination.budgetRange.economy}</p>
                        </div>
                        <div className="bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-100 dark:border-purple-900/20">
                          <h5 className="font-medium text-purple-700 dark:text-purple-300 text-sm mb-1">Standard</h5>
                          <p>{destination.budgetRange.standard}</p>
                        </div>
                        <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20">
                          <h5 className="font-medium text-amber-700 dark:text-amber-300 text-sm mb-1">Luxury</h5>
                          <p>{destination.budgetRange.luxury}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <DestinationQueryForm 
                          destinationName={destination.name} 
                          buttonText="Plan Your Trip" 
                          buttonVariant="default"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Pilgrimage Tab */}
          <TabsContent value="pilgrimage" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {pilgrimageDestinations
                .filter(dest => dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((destination, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-xl card-hover bg-card shadow-sm border border-border/50"
                >
                  <img 
                    src={destination.imageSrc} 
                    alt={destination.name} 
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {destination.region}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span><strong>Best time:</strong> {destination.bestTimeToVisit}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3 mr-2" />
                        <span><strong>Starting from:</strong> {destination.budgetRange.economy.split(" - ")[0]}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <DestinationQueryForm 
                        destinationName={destination.name} 
                        buttonText="Enquire Now"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/20 hover:border-primary hover:bg-primary/5"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Honeymoon Tab */}
          <TabsContent value="honeymoon" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {honeymoonDestinations
                .filter(dest => dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((destination, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-xl card-hover bg-card shadow-sm border border-border/50"
                >
                  <img 
                    src={destination.imageSrc} 
                    alt={destination.name} 
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {destination.region}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span><strong>Best time:</strong> {destination.bestTimeToVisit}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3 mr-2" />
                        <span><strong>Starting from:</strong> {destination.budgetRange.economy.split(" - ")[0]}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <DestinationQueryForm 
                        destinationName={destination.name} 
                        buttonText="Enquire Now"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/20 hover:border-primary hover:bg-primary/5"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Destinations;
