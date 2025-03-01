
import { useState } from "react";
import Layout from "@/components/layout";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Filter, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Tour data
const tours = [
  // Featured Door-to-Door Packages
  {
    id: 101,
    title: "Dubai Family Delight",
    imageSrc: "https://images.unsplash.com/photo-1582672750001-3bacac6a1cb5?q=80&w=800",
    location: "Dubai, UAE",
    duration: "7 Days",
    price: 1999,
    bestTime: "October - April",
    packageType: "Luxury",
    country: "UAE",
    region: "Middle East",
    description: "Experience the magic of Dubai with this exclusive family package. From doorstep pickup to airport transfers, everything is taken care of for a hassle-free vacation.",
    activities: ["Desert Safari", "Burj Khalifa Visit", "Dubai Mall Shopping", "Dhow Cruise Dinner"],
    included: ["Home Pickup & Drop", "5-Star Accommodation", "All Meals", "Private Tours", "Visa Processing", "Travel Insurance"],
    groupSize: "Family Package (4 persons)",
    highlight: "Door-to-Door Service"
  },
  {
    id: 102,
    title: "Singapore Complete Experience",
    imageSrc: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800",
    location: "Singapore",
    duration: "6 Days",
    price: 1850,
    bestTime: "Year Round",
    packageType: "Luxury",
    country: "Singapore",
    region: "Southeast Asia",
    description: "Discover the beauty of Singapore with our complete package that takes care of every detail from your doorstep to Singapore and back.",
    activities: ["Gardens by the Bay", "Universal Studios", "Sentosa Island", "Singapore Flyer"],
    included: ["Home Pickup & Drop", "4-Star Accommodation", "Breakfast & Dinner", "Skip-the-line Attraction Tickets", "Visa Processing", "Travel Insurance"],
    groupSize: "Up to 6 people",
    highlight: "Door-to-Door Service"
  },
  {
    id: 103,
    title: "Enchanting Bali Getaway",
    imageSrc: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800",
    location: "Bali, Indonesia",
    duration: "8 Days",
    price: 1750,
    bestTime: "April - October",
    packageType: "Luxury",
    country: "Indonesia",
    region: "Southeast Asia",
    description: "A carefully crafted door-to-door Bali experience with personal assistance throughout the journey. Perfect for couples and honeymooners.",
    activities: ["Rice Terrace Trekking", "Temple Visits", "Sunset Dinner", "Spa Treatments", "Ubud Art Tour"],
    included: ["Home Pickup & Drop", "Villa Accommodation", "Daily Breakfast & Dinner", "Private Tours", "Visa On Arrival Assistance", "Travel Insurance"],
    groupSize: "Couple Package",
    highlight: "Door-to-Door Service"
  },
  {
    id: 104,
    title: "Thailand Family Adventure",
    imageSrc: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=800",
    location: "Bangkok, Phuket, Krabi",
    duration: "9 Days",
    price: 2100,
    bestTime: "November - March",
    packageType: "Luxury",
    country: "Thailand",
    region: "Southeast Asia",
    description: "Experience the best of Thailand with our comprehensive door-to-door package perfect for families seeking adventure and relaxation.",
    activities: ["Elephant Sanctuary Visit", "Island Hopping", "Thai Cooking Class", "Water Sports"],
    included: ["Home Pickup & Drop", "4-Star Resorts", "All Meals", "Private Guides", "Domestic Flights", "Travel Insurance"],
    groupSize: "Family Package (4 persons)",
    highlight: "Door-to-Door Service"
  },
  
  // Domestic Tours - India
  {
    id: 201,
    title: "Goa Beach Paradise",
    imageSrc: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
    location: "North and South Goa",
    duration: "4 Days",
    price: 21000,
    bestTime: "November - February",
    packageType: "Budgeted",
    country: "India",
    region: "West India",
    description: "Explore the beautiful beaches of Goa, enjoy water sports, and experience the unique Portuguese-influenced culture.",
    activities: ["Beach Activities", "Water Sports", "Night Markets", "Heritage Tours"],
    included: ["Hotel Accommodation", "Breakfast", "Airport Transfers", "Sightseeing"],
    groupSize: "Flexible",
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Arrive in Goa, relax at Baga Beach, nightlife at Tito's." },
      { day: 2, title: "Old Goa Exploration", description: "Explore Old Goa (Basilica of Bom Jesus), Dudhsagar Falls." },
      { day: 3, title: "South Goa", description: "South Goa (Palolem Beach), water sports." },
      { day: 4, title: "Departure", description: "Shopping at Anjuna Flea Market, depart." }
    ],
    highlights: ["Beaches", "Nightlife", "Portuguese Heritage"]
  },
  {
    id: 202,
    title: "Kerala Backwaters Luxury",
    imageSrc: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
    location: "Kochi, Munnar, Alleppey",
    duration: "6 Days",
    price: 35000,
    bestTime: "September - March",
    packageType: "Luxury",
    country: "India",
    region: "South India",
    description: "Experience the serene backwaters of Kerala in luxury houseboats, explore tea plantations, and enjoy Ayurvedic treatments.",
    activities: ["Houseboat Stay", "Tea Plantation Visit", "Ayurvedic Spa", "Wildlife Safari"],
    included: ["Luxury Accommodation", "All Meals", "Private Guides", "All Transportation"],
    groupSize: "Private Tour",
    itinerary: [
      { day: 1, title: "Arrival in Kochi", description: "Arrive in Kochi, Fort Kochi tour." },
      { day: 2, title: "Munnar Hills", description: "Munnar tea plantations, Eravikulam National Park." },
      { day: 3, title: "Thekkady Wildlife", description: "Thekkady (Periyar Wildlife Sanctuary)." },
      { day: 4, title: "Alleppey Backwaters", description: "Alleppey backwaters houseboat stay." },
      { day: 5, title: "Kovalam Beach", description: "Kovalam Beach relaxation." },
      { day: 6, title: "Departure", description: "Depart from Trivandrum." }
    ],
    highlights: ["Backwaters", "Hills", "Wildlife"]
  },
  {
    id: 203,
    title: "Premier Himachal Adventure",
    imageSrc: "https://images.unsplash.com/photo-1547378809-c0414f48c2d4?q=80&w=800",
    location: "Shimla, Kullu, Manali, Dharamshala",
    duration: "7 Days",
    price: 75000,
    bestTime: "October - March",
    packageType: "Premier",
    country: "India",
    region: "North India",
    description: "A luxury journey through the beautiful landscapes of Himachal Pradesh with premium accommodations and exclusive experiences.",
    activities: ["Snow Activities", "Paragliding", "Temple Visits", "Trekking"],
    included: ["Luxury Accommodations", "All Meals", "Private Guides", "Premium Transportation"],
    groupSize: "Private Tour",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", description: "Arrive in Shimla, Mall Road." },
      { day: 2, title: "Kufri Exploration", description: "Kufri sightseeing, snow activities." },
      { day: 3, title: "Journey to Manali", description: "Manali via Kullu Valley." },
      { day: 4, title: "Rohtang Adventure", description: "Rohtang Pass adventure." },
      { day: 5, title: "Solang Valley", description: "Solang Valley, paragliding." },
      { day: 6, title: "McLeod Ganj", description: "Dharamshala (McLeod Ganj)." },
      { day: 7, title: "Departure", description: "Depart from Dharamshala." }
    ],
    highlights: ["Snow", "Adventure", "Monasteries"]
  },
  
  // International Tours
  {
    id: 301,
    title: "Dubai Luxury Experience",
    imageSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
    location: "Dubai, Abu Dhabi",
    duration: "5 Days",
    price: 75000,
    bestTime: "November - March",
    packageType: "Premier",
    country: "UAE",
    region: "Middle East",
    description: "Indulge in the ultimate luxury experience in Dubai with exclusive access to top attractions and premium accommodations.",
    activities: ["Desert Safari", "Burj Khalifa", "Shopping", "Yacht Cruise"],
    included: ["5-Star Accommodation", "Breakfast", "Some Dinners", "Private Tours", "VIP Access"],
    groupSize: "Private Tour",
    itinerary: [
      { day: 1, title: "Arrival in Dubai", description: "Arrive in Dubai, Dubai Mall, Burj Khalifa." },
      { day: 2, title: "Desert Safari", description: "Desert Safari, BBQ dinner." },
      { day: 3, title: "Abu Dhabi Day Trip", description: "Abu Dhabi (Sheikh Zayed Mosque)." },
      { day: 4, title: "Beach & Adventure", description: "Jumeirah Beach, Atlantis Aquaventure." },
      { day: 5, title: "Departure", description: "Shopping, depart." }
    ],
    highlights: ["Skyscrapers", "Desert", "Luxury"]
  },
  {
    id: 302,
    title: "Bali Island Explorer",
    imageSrc: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800",
    location: "Ubud, Seminyak, Nusa Dua",
    duration: "6 Days",
    price: 35000,
    bestTime: "April - October",
    packageType: "Luxury",
    country: "Indonesia",
    region: "Southeast Asia",
    description: "Discover the beauty of Bali with its stunning beaches, lush rice terraces, and rich cultural heritage.",
    activities: ["Temple Visits", "Rice Terrace Trekking", "Spa Treatments", "Water Sports"],
    included: ["4-Star Accommodations", "Breakfast", "Some Lunches", "Private Tours", "Airport Transfers"],
    groupSize: "Small Group (max 8)",
    itinerary: [
      { day: 1, title: "Arrival in Bali", description: "Arrive in Bali, Uluwatu Temple sunset." },
      { day: 2, title: "Ubud Exploration", description: "Ubud (Monkey Forest, rice terraces)." },
      { day: 3, title: "Island Adventure", description: "Nusa Penida island tour." },
      { day: 4, title: "Beach & Relaxation", description: "Seminyak Beach, spa day." },
      { day: 5, title: "Cultural Day", description: "Tanah Lot Temple, shopping." },
      { day: 6, title: "Departure", description: "Depart." }
    ],
    highlights: ["Beaches", "Temples", "Culture"]
  },
  {
    id: 303,
    title: "Thailand Highlights",
    imageSrc: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800",
    location: "Bangkok, Phuket, Chiang Mai",
    duration: "9 Days",
    price: 21000,
    bestTime: "November - March",
    packageType: "Budgeted",
    country: "Thailand",
    region: "Southeast Asia",
    description: "Experience the best of Thailand from bustling Bangkok to the beaches of Phuket and the mountains of Chiang Mai.",
    activities: ["Temple Tours", "Island Hopping", "Thai Cooking Class"],
    included: ["Hotel Accommodation", "Breakfast", "Guided Tours", "Domestic Flights"],
    groupSize: "Up to 15 people",
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", description: "Arrive in Bangkok, visit Grand Palace." },
      { day: 2, title: "Bangkok Exploration", description: "Floating markets, temple tours." },
      { day: 3, title: "Chiang Mai", description: "Fly to Chiang Mai, night markets." },
      { day: 4, title: "Elephant Sanctuary", description: "Visit ethical elephant sanctuary." },
      { day: 5, title: "Mountain Temple", description: "Doi Suthep temple, traditional dinner." },
      { day: 6, title: "Phuket", description: "Fly to Phuket, beach relaxation." },
      { day: 7, title: "Phi Phi Islands", description: "Island hopping tour to Phi Phi." },
      { day: 8, title: "Free Day in Phuket", description: "Optional activities or beach day." },
      { day: 9, title: "Departure", description: "Return to Bangkok for departure." }
    ],
    highlights: ["Temples", "Beaches", "Culture"]
  },
  
  // More tours can be added here
];

const regions = [
  "North India", 
  "South India", 
  "West India", 
  "Southeast Asia", 
  "Middle East"
];

const activities = [
  "Beach Activities",
  "Cultural Shows",
  "Desert Safari",
  "Heritage Walks",
  "Houseboat Stay",
  "Island Hopping",
  "Monument Visits",
  "Spa Treatments",
  "Temple Visits",
  "Water Sports"
];

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filters, setFilters] = useState(false);
  const [selectedTour, setSelectedTour] = useState<number | null>(null);

  // Filter tours based on selection
  const filterTours = (tours: any[]) => {
    return tours.filter((tour) => {
      // Search term filter
      const matchesSearch = 
        searchTerm === "" || 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tour.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Region filter
      const matchesRegion = 
        selectedRegions.length === 0 || 
        selectedRegions.includes(tour.region);
      
      // Activities filter
      const matchesActivities = 
        selectedActivities.length === 0 || 
        tour.activities.some((activity: string) => selectedActivities.includes(activity));
      
      // Duration filter
      const matchesDuration = () => {
        if (selectedDuration === "") return true;
        const days = parseInt(tour.duration);
        switch (selectedDuration) {
          case "short":
            return days <= 5;
          case "medium":
            return days > 5 && days <= 9;
          case "long":
            return days > 9;
          default:
            return true;
        }
      };
      
      // Price filter
      const matchesPrice = 
        tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      return matchesSearch && matchesRegion && matchesActivities && matchesDuration() && matchesPrice;
    });
  };

  // Get door-to-door packages
  const doorToDoorPackages = tours.filter(tour => tour.highlight === "Door-to-Door Service");
  
  // Filter standard packages
  const indianTours = filterTours(tours.filter(tour => tour.country === "India" && !tour.highlight));
  const internationalTours = filterTours(tours.filter(tour => tour.country !== "India" && !tour.highlight));

  const clearFilters = () => {
    setSelectedRegions([]);
    setSelectedActivities([]);
    setSelectedDuration("");
    setPriceRange([0, 100000]);
    setSearchTerm("");
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity) 
        : [...prev, activity]
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Explore Our Tours
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Curated Tour Packages
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover our handpicked tours for your next adventure
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search tours by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Door-to-Door Service Banner */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8 shadow-sm border border-primary/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-3/4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">End-to-End Travel Solution</h2>
              <p className="text-lg mb-4">
                Experience hassle-free travel with our door-to-door service. We pick you up from your home, 
                take care of everything during your journey, and drop you back safely.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30">Home Pickup & Drop</Badge>
                <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30">Visa Assistance</Badge>
                <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30">Travel Insurance</Badge>
                <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30">24/7 Support</Badge>
              </div>
            </div>
            <div className="md:w-1/4 flex justify-center">
              <Button size="lg" className="rounded-full px-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Door-to-Door Packages */}
      <section className="container mx-auto px-4 mb-16">
        <SectionHeading
          title="Featured Door-to-Door Packages"
          subtitle="Premium packages with home pickup and drop service"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {doorToDoorPackages.map((tour) => (
            <TourCard
              key={tour.id}
              imageSrc={tour.imageSrc}
              title={tour.title}
              location={tour.location}
              duration={tour.duration}
              price={`₹${tour.price}`}
              bestTime={tour.bestTime}
              packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
              link={`/tours/${tour.id}`}
              className="relative"
            />
          ))}
        </div>

        <div className="bg-muted/30 rounded-xl p-6 mt-10">
          <h3 className="text-xl font-semibold mb-4">What's Included in Door-to-Door Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Home Pickup & Drop</h4>
                <p className="text-sm text-muted-foreground">Comfortable transportation from your doorstep</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Premium Accommodations</h4>
                <p className="text-sm text-muted-foreground">4 & 5-star hotels with breakfast included</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Visa Processing</h4>
                <p className="text-sm text-muted-foreground">Complete assistance with visa applications</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Travel Insurance</h4>
                <p className="text-sm text-muted-foreground">Comprehensive coverage for peace of mind</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Private Transfers</h4>
                <p className="text-sm text-muted-foreground">Between airports, hotels, and attractions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Dedicated support throughout your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden w-full mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between"
              onClick={() => setFilters(!filters)}
            >
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter Tours
              </span>
              {(selectedRegions.length > 0 || selectedActivities.length > 0 || selectedDuration !== "" || priceRange[0] > 0 || priceRange[1] < 100000) && (
                <Badge variant="secondary" className="ml-2">
                  Active Filters
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div className={cn(
            "lg:w-1/4 space-y-6",
            { "hidden": !filters, "block": filters, "lg:block": true }
          )}>
            <div className="bg-card rounded-lg border border-border/50 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range (₹)</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 100000]}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Duration</h4>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    <SelectItem value="short">Short (1-5 days)</SelectItem>
                    <SelectItem value="medium">Medium (6-9 days)</SelectItem>
                    <SelectItem value="long">Long (10+ days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Regions */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Regions</h4>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <label key={region} className="flex items-center space-x-2 cursor-pointer">
                      <div 
                        className={cn(
                          "w-4 h-4 border rounded flex items-center justify-center",
                          selectedRegions.includes(region) 
                            ? "bg-primary border-primary" 
                            : "border-muted-foreground"
                        )}
                        onClick={() => toggleRegion(region)}
                      >
                        {selectedRegions.includes(region) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h4 className="text-sm font-medium mb-3">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <Badge 
                      key={activity}
                      variant={selectedActivities.includes(activity) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleActivity(activity)}
                    >
                      {activity}
                      {selectedActivities.includes(activity) && (
                        <X className="ml-1 h-3 w-3" onClick={(e) => {
                          e.stopPropagation();
                          toggleActivity(activity);
                        }} />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tour Listings */}
          <div className="lg:w-3/4">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Tours</TabsTrigger>
                  <TabsTrigger value="india">India</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
                
                <div className="hidden md:flex items-center gap-2">
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="duration-short">Duration: Shortest</SelectItem>
                      <SelectItem value="duration-long">Duration: Longest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filterTours([...tours]).length > 0 ? (
                    filterTours([...tours]).map((tour) => (
                      <TourCard
                        key={tour.id}
                        imageSrc={tour.imageSrc}
                        title={tour.title}
                        location={tour.location}
                        duration={tour.duration}
                        price={`Starting from ₹${tour.price.toLocaleString()}`}
                        bestTime={tour.bestTime}
                        packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                        link={`#tour-${tour.id}`}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                      <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                      <Button onClick={clearFilters}>Clear All Filters</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="india" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {indianTours.length > 0 ? (
                    indianTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        imageSrc={tour.imageSrc}
                        title={tour.title}
                        location={tour.location}
                        duration={tour.duration}
                        price={`Starting from ₹${tour.price.toLocaleString()}`}
                        bestTime={tour.bestTime}
                        packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                        link={`#tour-${tour.id}`}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <h3 className="text-xl font-semibold mb-2">No Indian tours found</h3>
                      <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                      <Button onClick={clearFilters}>Clear All Filters</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="international" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {internationalTours.length > 0 ? (
                    internationalTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        imageSrc={tour.imageSrc}
                        title={tour.title}
                        location={tour.location}
                        duration={tour.duration}
                        price={`Starting from ₹${tour.price.toLocaleString()}`}
                        bestTime={tour.bestTime}
                        packageType={tour.packageType as "Budgeted" | "Luxury" | "Premier"}
                        link={`#tour-${tour.id}`}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <h3 className="text-xl font-semibold mb-2">No international tours found</h3>
                      <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                      <Button onClick={clearFilters}>Clear All Filters</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Tour Itineraries Section */}
            <div className="mt-16">
              <SectionHeading
                title="Tour Itineraries"
                subtitle="Detailed day-by-day plans for our popular packages"
                align="left"
              />

              <div className="mt-6 space-y-8">
                {tours.filter(tour => tour.itinerary).map(tour => (
                  <div 
                    key={tour.id} 
                    id={`tour-${tour.id}`}
                    className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-64 md:h-auto relative">
                        <img 
                          src={tour.imageSrc} 
                          alt={tour.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-bold">{tour.title}</h3>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{tour.location}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{tour.duration}</span>
                            </div>
                          </div>
                          <div>
                            <span className={cn(
                              "inline-block px-3 py-1 text-xs font-medium rounded-full",
                              tour.packageType === "Budgeted" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                              tour.packageType === "Luxury" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                              tour.packageType === "Premier" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                            )}>
                              {tour.packageType}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {tour.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2">Highlights</h4>
                          <div className="flex flex-wrap gap-2">
                            {tour.highlights?.map((highlight, index) => (
                              <Badge key={index} variant="outline" className="bg-primary/5">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="itinerary">
                              <AccordionTrigger className="text-lg font-semibold">
                                View Itinerary
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4 mt-2">
                                  {tour.itinerary?.map((day, index) => (
                                    <div key={index} className="flex">
                                      <div className="mr-4 flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                          {day.day}
                                        </div>
                                        {index < tour.itinerary?.length - 1 && (
                                          <div className="w-0.5 bg-border h-full mt-2"></div>
                                        )}
                                      </div>
                                      <div className="pb-6">
                                        <h5 className="font-semibold">{day.title}</h5>
                                        <p className="text-sm text-muted-foreground">{day.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div>
                            <span className="text-sm text-muted-foreground">Starting from</span>
                            <p className="text-xl font-bold">₹{tour.price.toLocaleString()}</p>
                          </div>
                          <Button>Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Information */}
            <div className="mt-12">
              <SectionHeading
                title="Tour Information"
                subtitle="Everything you need to know about our tours"
                align="left"
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What's included in the tour packages?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Our tour packages typically include:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Accommodation as per the package type (budget, luxury, or premier)</li>
                      <li>Transportation as mentioned in the itinerary</li>
                      <li>Meals as specified (usually breakfast; some packages include more meals)</li>
                      <li>Sightseeing and excursions as per the itinerary</li>
                      <li>English-speaking tour guide</li>
                      <li>All applicable taxes</li>
                    </ul>
                    <p className="mt-4 mb-2"><strong>Door-to-Door packages additionally include:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Pickup and drop from your home to the airport and back</li>
                      <li>Complete visa processing assistance</li>
                      <li>Travel insurance coverage</li>
                      <li>24/7 dedicated support throughout your journey</li>
                      <li>All meals during the tour (breakfast, lunch, and dinner)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I book a tour?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You can book a tour by contacting us through our website's contact form, 
                      by phone, or by email. We'll need your travel dates, the number of travelers, 
                      and your preferred package type. A 20% deposit is required to confirm your booking, 
                      with the balance due 30 days before the tour starts.
                    </p>
                    <p className="mt-4">
                      For Door-to-Door packages, our travel consultant will visit your home to discuss requirements
                      and customize the perfect itinerary for you.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What's the difference between budget, luxury, and premier packages?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">Our packages are categorized based on the level of accommodation, inclusions, and service:</p>
                    
                    <h4 className="font-semibold">Budgeted:</h4>
                    <ul className="list-disc list-inside mb-2 text-muted-foreground">
                      <li>3-star accommodation</li>
                      <li>Shared transportation with other travelers</li>
                      <li>Breakfast included</li>
                      <li>Standard sightseeing</li>
                    </ul>
                    
                    <h4 className="font-semibold">Luxury:</h4>
                    <ul className="list-disc list-inside mb-2 text-muted-foreground">
                      <li>4 to 5-star accommodation</li>
                      <li>Private transportation</li>
                      <li>Breakfast and some additional meals</li>
                      <li>Enhanced sightseeing experiences</li>
                      <li>Some additional amenities and experiences</li>
                    </ul>
                    
                    <h4 className="font-semibold">Premier:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>5-star luxury or boutique accommodation</li>
                      <li>Premium private transportation</li>
                      <li>Most meals included with some special dining experiences</li>
                      <li>VIP access at attractions</li>
                      <li>Personalized service with dedicated guides</li>
                      <li>Exclusive experiences not available in other packages</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can tours be customized?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Absolutely! We specialize in creating customized itineraries based on your preferences, 
                      interests, and budget. Just let us know what you're looking for, and we'll design a 
                      personalized tour experience for you. Customization options include accommodation upgrades, 
                      additional activities, special dietary requirements, and more.
                    </p>
                    <p className="mt-4">
                      Our Door-to-Door packages are especially flexible and can be fully tailored to your needs.
                      From the pickup time at your home to the specific experiences at your destination,
                      everything can be personalized.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Our standard cancellation policy is as follows:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>More than 30 days before departure: Full refund minus a $100 administrative fee</li>
                      <li>30-15 days before departure: 70% refund</li>
                      <li>14-7 days before departure: 50% refund</li>
                      <li>Less than 7 days before departure: No refund</li>
                    </ul>
                    <p className="mt-2">
                      We recommend purchasing travel insurance to protect against unforeseen circumstances.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>How does the Door-to-Door service work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">Our Door-to-Door service provides a completely hassle-free travel experience:</p>
                    
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>After booking, our representative contacts you to confirm pickup details and special requirements</li>
                      <li>On the day of departure, our chauffeur arrives at your home to transport you to the airport</li>
                      <li>Our airport representative assists with check-in and immigration procedures</li>
                      <li>Upon arrival at your destination, a dedicated guide welcomes you and handles all transfers</li>
                      <li>Throughout your trip, all transportation between attractions and hotels is pre-arranged</li>
                      <li>When returning home, our chauffeur meets you at the airport and drops you back at your doorstep</li>
                    </ol>
                    
                    <p className="mt-4">
                      This service is ideal for families, senior travelers, and anyone who prefers a stress-free vacation without
                      having to worry about logistics.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Journey?"
        description="Contact us today to book your perfect tour package or request a custom itinerary with our door-to-door service."
        buttonText="Contact Now"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000"
        align="center"
      />
    </Layout>
  );
};

export default Tours;
