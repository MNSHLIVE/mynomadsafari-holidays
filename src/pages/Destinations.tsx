
import { useState } from "react";
import Layout from "@/components/layout";
import SectionHeading from "@/components/section-heading";
import DestinationCard from "@/components/destination-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for destinations
const indianDestinations = [
  {
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800",
    description: "Experience the vibrant culture and royal heritage of the land of kings.",
    bestTime: "October - March",
    places: ["Jaipur (Amber Fort)", "Udaipur (Lake Pichola)", "Jaisalmer (Desert Safari)"],
    food: ["Dal Baati Churma", "Gatte ki Sabzi", "Laal Maas"],
    tips: ["Camel rides in Jaisalmer", "Palace stays in Udaipur", "Shopping for textiles in Jaipur"],
    majorTours: ["Golden Triangle Tour", "Royal Rajasthan Circuit", "Desert Festival Experience"],
    budgets: {
      budgeted: "$500-800",
      luxury: "$1500-2000",
      premier: "$3000+"
    }
  },
  {
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602851169118-3159e9696c14?q=80&w=800",
    description: "Discover the serene backwaters and lush greenery of God's own country.",
    bestTime: "September - March",
    places: ["Munnar (Tea Gardens)", "Alleppey (Backwaters)", "Kochi (Fort Kochi)"],
    food: ["Kerala Fish Curry", "Appam with Stew", "Puttu and Kadala Curry"],
    tips: ["Houseboat stay in Alleppey", "Ayurvedic treatments", "Tea plantation tours in Munnar"],
    majorTours: ["Kerala Backwater Magic", "Malabar Spice Route", "Wellness Retreat"],
    budgets: {
      budgeted: "$600-900",
      luxury: "$1800-2500",
      premier: "$3500+"
    }
  },
  {
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
    description: "Relax on sandy beaches and enjoy the vibrant nightlife of this coastal paradise.",
    bestTime: "November - February",
    places: ["Calangute Beach", "Old Goa Churches", "Dudhsagar Falls"],
    food: ["Goan Fish Curry", "Vindaloo", "Bebinca"],
    tips: ["Water sports at Baga Beach", "Heritage walk in Fontainhas", "Spice plantation tours"],
    majorTours: ["Beach Hopping Adventure", "Heritage & Nature Expedition", "Culinary Tour"],
    budgets: {
      budgeted: "$400-700",
      luxury: "$1200-1800",
      premier: "$2500+"
    }
  },
  {
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621432358-d4f4223897e7?q=80&w=800",
    description: "Experience the majestic Himalayas and charming hill stations.",
    bestTime: "March - June, September - November",
    places: ["Shimla (Mall Road)", "Manali (Rohtang Pass)", "Dharamshala (McLeodganj)"],
    food: ["Dham", "Chha Gosht", "Sidu"],
    tips: ["Trekking in Parvati Valley", "Paragliding in Bir Billing", "Apple orchard visits"],
    majorTours: ["Himalayan Explorer", "Adventure Sports Package", "Spiritual Retreat"],
    budgets: {
      budgeted: "$450-750",
      luxury: "$1300-1900",
      premier: "$2800+"
    }
  }
];

const internationalDestinations = [
  {
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800",
    description: "Tropical beaches, opulent palaces, and a vibrant street life make Thailand unforgettable.",
    bestTime: "November - March",
    places: ["Bangkok (Grand Palace)", "Phuket (Phi Phi Islands)", "Chiang Mai (Old City)"],
    food: ["Pad Thai", "Tom Yum Goong", "Mango Sticky Rice"],
    tips: ["Thai massage experience", "Island hopping tours", "Night markets exploration"],
    majorTours: ["Thailand Highlights", "Island Paradise Tour", "Northern Thailand Adventure"],
    budgets: {
      budgeted: "$700-1000",
      luxury: "$2000-3000",
      premier: "$4000+"
    }
  },
  {
    country: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=800",
    description: "Experience the perfect blend of beaches, culture, and adventure in this island paradise.",
    bestTime: "April - October",
    places: ["Ubud (Monkey Forest)", "Seminyak (Beaches)", "Uluwatu Temple"],
    food: ["Nasi Goreng", "Babi Guling", "Sate Lilit"],
    tips: ["Traditional Balinese dance shows", "Rice terrace trekking", "Temple ceremonies"],
    majorTours: ["Bali Cultural Immersion", "Beach & Wellness Retreat", "Adventure Seeker Package"],
    budgets: {
      budgeted: "$800-1200",
      luxury: "$2200-3200",
      premier: "$4500+"
    }
  },
  {
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?q=80&w=800",
    description: "A country of breathtaking natural beauty with a unique heritage.",
    bestTime: "February - April, August - October",
    places: ["Ha Long Bay", "Ho Chi Minh City", "Hoi An Ancient Town"],
    food: ["Pho", "Banh Mi", "Vietnamese Coffee"],
    tips: ["Overnight cruise in Ha Long Bay", "Cu Chi Tunnels tour", "Cooking classes in Hoi An"],
    majorTours: ["Vietnam Highlights", "North to South Explorer", "Mekong Delta Experience"],
    budgets: {
      budgeted: "$600-900",
      luxury: "$1800-2500",
      premier: "$3500+"
    }
  },
  {
    country: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
    description: "A glamorous city of superlatives, from the world's tallest building to man-made islands.",
    bestTime: "November - March",
    places: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
    food: ["Shawarma", "Al Harees", "Kunafa"],
    tips: ["Desert safari experience", "Dhow cruise dinner", "Shopping festival timing"],
    majorTours: ["Dubai City Explorer", "Luxury Shopping Experience", "Desert Adventure"],
    budgets: {
      budgeted: "$1000-1500",
      luxury: "$2500-4000",
      premier: "$6000+"
    }
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIndianDestinations = indianDestinations.filter(dest => 
    dest.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInternationalDestinations = internationalDestinations.filter(dest => 
    dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
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
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="india" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="india">India</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
          </div>

          {/* India Tab */}
          <TabsContent value="india" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {filteredIndianDestinations.map((dest, index) => (
                <DestinationCard
                  key={index}
                  imageSrc={dest.image}
                  title={dest.state}
                  description={dest.description}
                  bestTime={dest.bestTime}
                  className="h-full"
                />
              ))}
            </div>

            <div className="space-y-6">
              <SectionHeading
                title="Explore Indian Destinations"
                subtitle="Detailed information about our popular Indian destinations"
                align="left"
              />

              <Accordion type="single" collapsible className="w-full">
                {filteredIndianDestinations.map((dest, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-xl">
                      {dest.state}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="md:col-span-1">
                          <img 
                            src={dest.image} 
                            alt={dest.state} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <p className="text-muted-foreground">{dest.description}</p>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                            <p>{dest.bestTime}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Places of Interest</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dest.places.map((place, idx) => (
                                <li key={idx}>{place}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Local Food to Try</h4>
                            <div className="flex flex-wrap gap-2">
                              {dest.food.map((item, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Exploration Tips</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dest.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-lg">Major Tours</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {dest.majorTours.map((tour, idx) => (
                            <div key={idx} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                              <h5 className="font-medium mb-2">{tour}</h5>
                              <Button variant="link" className="p-0 h-auto text-primary">
                                View Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-lg mb-4">Budget Tiers</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 border border-border rounded-lg bg-blue-50/50 dark:bg-blue-900/10">
                            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Budgeted</h5>
                            <p className="text-lg font-semibold">{dest.budgets.budgeted}</p>
                            <p className="text-sm text-muted-foreground">Economy options</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg bg-purple-50/50 dark:bg-purple-900/10">
                            <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Luxury</h5>
                            <p className="text-lg font-semibold">{dest.budgets.luxury}</p>
                            <p className="text-sm text-muted-foreground">High-end experiences</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg bg-amber-50/50 dark:bg-amber-900/10">
                            <h5 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Premier</h5>
                            <p className="text-lg font-semibold">{dest.budgets.premier}</p>
                            <p className="text-sm text-muted-foreground">Ultra-luxury services</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* International Tab */}
          <TabsContent value="international" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {filteredInternationalDestinations.map((dest, index) => (
                <DestinationCard
                  key={index}
                  imageSrc={dest.image}
                  title={dest.country}
                  description={dest.description}
                  bestTime={dest.bestTime}
                  className="h-full"
                />
              ))}
            </div>

            <div className="space-y-6">
              <SectionHeading
                title="Explore International Destinations"
                subtitle="Detailed information about our popular international destinations"
                align="left"
              />

              <Accordion type="single" collapsible className="w-full">
                {filteredInternationalDestinations.map((dest, index) => (
                  <AccordionItem key={index} value={`item-int-${index}`}>
                    <AccordionTrigger className="text-xl">
                      {dest.country}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="md:col-span-1">
                          <img 
                            src={dest.image} 
                            alt={dest.country} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <p className="text-muted-foreground">{dest.description}</p>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                            <p>{dest.bestTime}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Places of Interest</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dest.places.map((place, idx) => (
                                <li key={idx}>{place}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Local Food to Try</h4>
                            <div className="flex flex-wrap gap-2">
                              {dest.food.map((item, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Exploration Tips</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dest.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-lg">Major Tours</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {dest.majorTours.map((tour, idx) => (
                            <div key={idx} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                              <h5 className="font-medium mb-2">{tour}</h5>
                              <Button variant="link" className="p-0 h-auto text-primary">
                                View Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-lg mb-4">Budget Tiers</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 border border-border rounded-lg bg-blue-50/50 dark:bg-blue-900/10">
                            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Budgeted</h5>
                            <p className="text-lg font-semibold">{dest.budgets.budgeted}</p>
                            <p className="text-sm text-muted-foreground">Economy options</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg bg-purple-50/50 dark:bg-purple-900/10">
                            <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Luxury</h5>
                            <p className="text-lg font-semibold">{dest.budgets.luxury}</p>
                            <p className="text-sm text-muted-foreground">High-end experiences</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg bg-amber-50/50 dark:bg-amber-900/10">
                            <h5 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Premier</h5>
                            <p className="text-lg font-semibold">{dest.budgets.premier}</p>
                            <p className="text-sm text-muted-foreground">Ultra-luxury services</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Destinations;
