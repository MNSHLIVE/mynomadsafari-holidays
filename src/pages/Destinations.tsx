import { useState } from "react";
import SectionHeading from "@/components/section-heading";
import DestinationCard from "@/components/destination-card";
import DestinationQueryForm from "@/components/destination-query-form";
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
    places: ["Jaipur (Amber Fort)", "Udaipur (Lake Pichola)", "Jaisalmer (Desert Safari)", "Jodhpur (Mehrangarh Fort)", "Pushkar (Sacred Lake)"],
    food: ["Dal Baati Churma", "Gatte ki Sabzi", "Laal Maas", "Ker Sangri", "Ghevar"],
    tips: ["Camel rides in Jaisalmer", "Palace stays in Udaipur", "Shopping for textiles in Jaipur", "Attend the Pushkar Fair", "Visit Ranthambore National Park"],
    majorTours: ["Golden Triangle Tour", "Royal Rajasthan Circuit", "Desert Festival Experience", "Heritage Palace Tour", "Wildlife Safari"],
    budgets: {
      budgeted: "₹35,000-60,000",
      luxury: "₹1,00,000-1,50,000",
      premier: "₹2,25,000+"
    }
  },
  {
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602851169118-3159e9696c14?q=80&w=800",
    description: "Discover the serene backwaters and lush greenery of God's own country.",
    bestTime: "September - March",
    places: ["Munnar (Tea Gardens)", "Alleppey (Backwaters)", "Kochi (Fort Kochi)", "Thekkady (Periyar Wildlife Sanctuary)", "Kovalam (Beaches)"],
    food: ["Kerala Fish Curry", "Appam with Stew", "Puttu and Kadala Curry", "Malabar Parotta", "Karimeen Pollichathu"],
    tips: ["Houseboat stay in Alleppey", "Ayurvedic treatments", "Tea plantation tours in Munnar", "Kathakali performances", "Spice garden visits"],
    majorTours: ["Kerala Backwater Magic", "Malabar Spice Route", "Wellness Retreat", "Beach & Backwater Combo", "Hill Station Escape"],
    budgets: {
      budgeted: "₹45,000-65,000",
      luxury: "₹1,25,000-1,75,000",
      premier: "₹2,50,000+"
    }
  },
  {
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
    description: "Relax on sandy beaches and enjoy the vibrant nightlife of this coastal paradise.",
    bestTime: "November - February",
    places: ["Calangute Beach", "Old Goa Churches", "Dudhsagar Falls", "Anjuna Flea Market", "Fort Aguada"],
    food: ["Goan Fish Curry", "Vindaloo", "Bebinca", "Sorpotel", "Feni"],
    tips: ["Water sports at Baga Beach", "Heritage walk in Fontainhas", "Spice plantation tours", "Sunset cruise on Mandovi River", "Visit during Carnival"],
    majorTours: ["Beach Hopping Adventure", "Heritage & Nature Expedition", "Culinary Tour", "Water Sports Package", "Nightlife Special"],
    budgets: {
      budgeted: "₹30,000-50,000",
      luxury: "₹85,000-1,25,000",
      premier: "₹1,75,000+"
    }
  },
  {
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800",
    description: "Experience the majestic Himalayas and charming hill stations.",
    bestTime: "March - June, September - November",
    places: ["Shimla (Mall Road)", "Manali (Rohtang Pass)", "Dharamshala (McLeodganj)", "Dalhousie", "Spiti Valley"],
    food: ["Dham", "Chha Gosht", "Sidu", "Madra", "Babru"],
    tips: ["Trekking in Parvati Valley", "Paragliding in Bir Billing", "Apple orchard visits", "Monasteries in Spiti", "Camping at Kheerganga"],
    majorTours: ["Himalayan Explorer", "Adventure Sports Package", "Spiritual Retreat", "Photography Tour", "Honeymoon Special"],
    budgets: {
      budgeted: "₹32,000-55,000",
      luxury: "₹90,000-1,35,000",
      premier: "₹2,00,000+"
    }
  },
  {
    state: "Leh-Ladakh",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=800",
    description: "Explore the high-altitude desert landscapes and Buddhist monasteries of this remote Himalayan region.",
    bestTime: "June - September",
    places: ["Leh Palace", "Pangong Lake", "Nubra Valley", "Magnetic Hill", "Thiksey Monastery"],
    food: ["Thukpa", "Momos", "Skyu", "Butter Tea", "Chhutagi"],
    tips: ["Acclimatize properly", "Motorcycle trips on Khardung La", "Camping at Pangong Lake", "Mountain biking", "Attend Hemis Festival"],
    majorTours: ["Ladakh Explorer", "Monastery Circuit", "Lakes & Passes Adventure", "Photography Tour", "Bike Expedition"],
    budgets: {
      budgeted: "₹50,000-75,000",
      luxury: "₹1,30,000-1,80,000",
      premier: "₹2,50,000+"
    }
  },
  {
    state: "Andaman & Nicobar",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800",
    description: "Discover pristine beaches, crystal clear waters, and rich marine life in this tropical paradise.",
    bestTime: "November - May",
    places: ["Radhanagar Beach", "Cellular Jail", "Ross Island", "Havelock Island", "Neil Island"],
    food: ["Seafood Platter", "Fish Curry", "Coconut Prawn Curry", "Macher Jhol", "Amritsari Fish"],
    tips: ["Scuba diving at North Bay", "Glass bottom boat ride", "Night kayaking in mangroves", "Trek to Mount Harriet", "Visit the limestone caves"],
    majorTours: ["Island Hopping Package", "Water Sports Adventure", "Honeymoon Special", "Beach Relaxation", "History & Culture Tour"],
    budgets: {
      budgeted: "₹45,000-70,000",
      luxury: "₹1,20,000-1,60,000",
      premier: "₹2,25,000+"
    }
  }
];

const internationalDestinations = [
  {
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=800",
    description: "Tropical beaches, opulent palaces, and a vibrant street life make Thailand unforgettable.",
    bestTime: "November - March",
    places: ["Bangkok (Grand Palace)", "Phuket (Phi Phi Islands)", "Chiang Mai (Old City)", "Krabi (Railay Beach)", "Ayutthaya (Historical Park)"],
    food: ["Pad Thai", "Tom Yum Goong", "Mango Sticky Rice", "Green Curry", "Som Tam (Papaya Salad)"],
    tips: ["Thai massage experience", "Island hopping tours", "Night markets exploration", "Temple etiquette", "Floating markets visit"],
    majorTours: ["Thailand Highlights", "Island Paradise Tour", "Northern Thailand Adventure", "Bangkok City Break", "Wellness Retreat"],
    budgets: {
      budgeted: "₹50,000-70,000",
      luxury: "₹1,40,000-2,10,000",
      premier: "₹2,80,000+"
    }
  },
  {
    country: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
    description: "A glamorous city of superlatives, from the world's tallest building to man-made islands.",
    bestTime: "November - March",
    places: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Dubai Marina", "Desert Safari"],
    food: ["Shawarma", "Al Harees", "Kunafa", "Machboos", "Luqaimat"],
    tips: ["Desert safari experience", "Dhow cruise dinner", "Shopping festival timing", "Visit the Dubai Frame", "Ski Dubai experience"],
    majorTours: ["Dubai City Explorer", "Luxury Shopping Experience", "Desert Adventure", "Family Fun Package", "Couple's Retreat"],
    budgets: {
      budgeted: "₹70,000-1,05,000",
      luxury: "₹1,75,000-2,80,000",
      premier: "₹4,20,000+"
    }
  },
  {
    country: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=800",
    description: "Experience the perfect blend of beaches, culture, and adventure in this island paradise.",
    bestTime: "April - October",
    places: ["Ubud (Monkey Forest)", "Seminyak (Beaches)", "Uluwatu Temple", "Tegallalang Rice Terraces", "Mount Batur"],
    food: ["Nasi Goreng", "Babi Guling", "Sate Lilit", "Lawar", "Bebek Betutu"],
    tips: ["Traditional Balinese dance shows", "Rice terrace trekking", "Temple ceremonies", "Sunrise hike at Mount Batur", "Balinese cooking class"],
    majorTours: ["Bali Cultural Immersion", "Beach & Wellness Retreat", "Adventure Seeker Package", "Honeymoon Special", "Digital Nomad Experience"],
    budgets: {
      budgeted: "₹56,000-84,000",
      luxury: "₹1,54,000-2,24,000",
      premier: "₹3,15,000+"
    }
  },
  {
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    description: "A futuristic garden city with impeccable cleanliness, amazing food, and iconic landmarks.",
    bestTime: "February - April, November - December",
    places: ["Gardens by the Bay", "Sentosa Island", "Marina Bay Sands", "Universal Studios", "Singapore Zoo"],
    food: ["Chili Crab", "Hainanese Chicken Rice", "Laksa", "Roti Prata", "Kaya Toast"],
    tips: ["Night Safari experience", "Sentosa Beach Club day", "Gardens by the Bay light show", "Hawker center food tour", "River cruise"],
    majorTours: ["Singapore Highlights", "Family Fun Package", "Culinary Tour", "Luxury City Break", "Gardens & Nature Tour"],
    budgets: {
      budgeted: "₹63,000-91,000",
      luxury: "₹1,68,000-2,45,000",
      premier: "₹3,50,000+"
    }
  },
  {
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?q=80&w=800",
    description: "A country of breathtaking natural beauty with a unique heritage.",
    bestTime: "February - April, August - October",
    places: ["Ha Long Bay", "Ho Chi Minh City", "Hoi An Ancient Town", "Sapa Rice Terraces", "Hue Imperial City"],
    food: ["Pho", "Banh Mi", "Vietnamese Coffee", "Bun Cha", "Fresh Spring Rolls"],
    tips: ["Overnight cruise in Ha Long Bay", "Cu Chi Tunnels tour", "Cooking classes in Hoi An", "Motorbike tour in Hanoi", "Mekong Delta exploration"],
    majorTours: ["Vietnam Highlights", "North to South Explorer", "Mekong Delta Experience", "Heritage Trail", "Foodie Tour"],
    budgets: {
      budgeted: "₹42,000-63,000",
      luxury: "₹1,26,000-1,75,000",
      premier: "₹2,45,000+"
    }
  },
  {
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800",
    description: "A tropical paradise of pristine white beaches, crystal clear lagoons and incredible underwater wildlife.",
    bestTime: "November - April",
    places: ["Male", "Maafushi Island", "Biyadhoo Island", "Veligandu Island", "Alimatha Island"],
    food: ["Mas Huni", "Garudhiya", "Bis Keemiya", "Masroshi", "Saagu Bondibai"],
    tips: ["Snorkeling with manta rays", "Stay in an overwater villa", "Sunset dolphin cruise", "Island hopping day trip", "Underwater dining experience"],
    majorTours: ["Maldives Luxury Escape", "Honeymoon Paradise", "Water Villa Experience", "Snorkeling & Diving Package", "Island Hopping Adventure"],
    budgets: {
      budgeted: "₹84,000-1,26,000",
      luxury: "₹2,80,000-4,90,000",
      premier: "₹7,00,000+"
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

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
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
        <Tabs defaultValue="india" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="india">India</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
          </div>

          {/* India Tab */}
          <TabsContent value="india" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredIndianDestinations.map((dest, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl card-hover bg-card shadow-sm border border-border/50">
                  <img 
                    src={dest.image} 
                    alt={dest.state} 
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{dest.state}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dest.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      <span className="font-medium">Best time to visit:</span> {dest.bestTime}
                    </p>
                    <div className="flex justify-between items-center">
                      <DestinationQueryForm 
                        destinationName={dest.state} 
                        buttonText="Enquire Now"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/20 hover:border-primary hover:bg-primary/5"
                        onClick={() => document.getElementById(`accordion-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    id={`accordion-${index}`}
                    className="border border-border/50 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="text-xl px-4 hover:bg-muted/30">
                      {dest.state}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4">
                        <div className="md:col-span-1">
                          <img 
                            src={dest.image} 
                            alt={dest.state} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="mt-4 flex justify-center">
                            <DestinationQueryForm 
                              destinationName={dest.state} 
                              buttonText="Plan Your Trip" 
                              buttonVariant="default"
                              className="w-full"
                            />
                          </div>
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

                      <div className="mt-6 space-y-4 px-4">
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

                      <div className="mt-6 px-4 pb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredInternationalDestinations.map((dest, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl card-hover bg-card shadow-sm border border-border/50">
                  <img 
                    src={dest.image} 
                    alt={dest.country} 
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{dest.country}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dest.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      <span className="font-medium">Best time to visit:</span> {dest.bestTime}
                    </p>
                    <div className="flex justify-between items-center">
                      <DestinationQueryForm 
                        destinationName={dest.country} 
                        buttonText="Enquire Now"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/20 hover:border-primary hover:bg-primary/5"
                        onClick={() => document.getElementById(`accordion-int-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <AccordionItem 
                    key={index} 
                    value={`item-int-${index}`}
                    id={`accordion-int-${index}`}
                    className="border border-border/50 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="text-xl px-4 hover:bg-muted/30">
                      {dest.country}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4">
                        <div className="md:col-span-1">
                          <img 
                            src={dest.image} 
                            alt={dest.country} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="mt-4 flex justify-center">
                            <DestinationQueryForm 
                              destinationName={dest.country} 
                              buttonText="Plan Your Trip" 
                              buttonVariant="default"
                              className="w-full"
                            />
                          </div>
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

                      <div className="mt-6 space-y-4 px-4">
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

                      <div className="mt-6 px-4 pb-4">
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
    </>
  );
};

export default Destinations;
