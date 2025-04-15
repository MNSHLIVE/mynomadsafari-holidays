
import { useState } from "react";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Plane, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const domesticGroupTours = [
  {
    id: 301,
    title: "Himalayan Adventure Group",
    imageSrc: "https://images.unsplash.com/photo-1626016771041-8dfa5139e4cd?q=80&w=800",
    location: "Himachal & Uttarakhand",
    duration: "8 Days",
    price: "35000",
    bestTime: "March - June, Sept - Nov",
    packageType: "Budgeted",
    groupSize: "15-20 people",
    departureDate: "15th May 2024",
    description: "Join our exciting group tour to the Himalayas and experience the beauty of the mountains with like-minded travelers.",
    itinerary: [
      { day: 1, title: "Delhi to Shimla", description: "Group meetup in Delhi and transfer to Shimla by AC coach." },
      { day: 2, title: "Shimla Sightseeing", description: "Explore Mall Road, Ridge, and Jakhu Temple in Shimla." },
      { day: 3, title: "Shimla to Manali", description: "Scenic drive to Manali via Kullu Valley." },
      { day: 4, title: "Manali Local Tour", description: "Visit Hadimba Temple, Vashisht Hot Springs, and Mall Road." },
      { day: 5, title: "Rohtang Pass Excursion", description: "Full day excursion to snow-covered Rohtang Pass (subject to weather)." },
      { day: 6, title: "Manali to Dharamshala", description: "Travel to Dharamshala, home of Dalai Lama." },
      { day: 7, title: "McLeod Ganj Tour", description: "Visit Dalai Lama Temple, Bhagsu Waterfall, and local Tibetan market." },
      { day: 8, title: "Return to Delhi", description: "Morning departure to Delhi. Tour ends." }
    ]
  },
  {
    id: 302,
    title: "Kerala Group Experience",
    imageSrc: "https://images.unsplash.com/photo-1602425224456-8c4ad652b571?q=80&w=800",
    location: "Kerala",
    duration: "6 Days",
    price: "28000",
    bestTime: "October - March",
    packageType: "Budgeted",
    groupSize: "15-20 people",
    departureDate: "10th November 2024",
    description: "Explore the backwaters, beaches, and tea plantations of Kerala with our specially designed group tour.",
    itinerary: [
      { day: 1, title: "Arrive in Kochi", description: "Group assembly at Kochi, welcome dinner." },
      { day: 2, title: "Kochi City Tour", description: "Visit Fort Kochi, Chinese Fishing Nets, and Mattancherry Palace." },
      { day: 3, title: "Kochi to Munnar", description: "Travel to Munnar, surrounded by tea plantations." },
      { day: 4, title: "Munnar to Thekkady", description: "Visit Eravikulam National Park and spice plantations." },
      { day: 5, title: "Thekkady to Alleppey", description: "Overnight houseboat stay in the backwaters." },
      { day: 6, title: "Departure from Kochi", description: "Return to Kochi for departure." }
    ]
  }
];

const internationalGroupTours = [
  {
    id: 401,
    title: "Thailand Group Package",
    imageSrc: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800",
    location: "Bangkok, Pattaya, Phuket",
    duration: "7 Days",
    price: "75000",
    bestTime: "November - March",
    packageType: "Budgeted",
    groupSize: "20-25 people",
    departureDate: "20th December 2024",
    description: "Join our Thailand group tour and experience the perfect blend of culture, beaches, and nightlife with fellow travelers.",
    itinerary: [
      { day: 1, title: "Arrive in Bangkok", description: "Group assembly at Bangkok Airport, transfer to hotel, and welcome dinner." },
      { day: 2, title: "Bangkok City Tour", description: "Visit Grand Palace, Wat Arun, and enjoy Chao Phraya river cruise." },
      { day: 3, title: "Bangkok to Pattaya", description: "Transfer to Pattaya, evening Alcazar Show." },
      { day: 4, title: "Coral Island Tour", description: "Speedboat to Coral Island, water sports activities." },
      { day: 5, title: "Pattaya to Phuket", description: "Fly to Phuket, evening at leisure at Patong Beach." },
      { day: 6, title: "Phi Phi Island Tour", description: "Speedboat tour to Phi Phi Islands and James Bond Island." },
      { day: 7, title: "Departure", description: "Transfer to Phuket airport for departure." }
    ]
  },
  {
    id: 402,
    title: "Dubai Group Adventure",
    imageSrc: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800",
    location: "Dubai & Abu Dhabi",
    duration: "6 Days",
    price: "85000",
    bestTime: "October - April",
    packageType: "Budgeted",
    groupSize: "20-25 people",
    departureDate: "15th February 2025",
    description: "Experience the glamour of Dubai and Abu Dhabi with our specially designed group tour package.",
    itinerary: [
      { day: 1, title: "Arrive in Dubai", description: "Group assembly at Dubai Airport, transfer to hotel, and welcome dinner." },
      { day: 2, title: "Dubai City Tour", description: "Visit Burj Khalifa, Dubai Mall, and Old Dubai." },
      { day: 3, title: "Desert Safari", description: "Dune bashing, camel riding, and BBQ dinner with entertainment." },
      { day: 4, title: "Abu Dhabi Day Trip", description: "Visit Sheikh Zayed Grand Mosque, Ferrari World, and Corniche." },
      { day: 5, title: "Dubai Shopping & Leisure", description: "Visit Global Village, Miracle Garden, and free time for shopping." },
      { day: 6, title: "Departure", description: "Transfer to Dubai airport for departure." }
    ]
  }
];

const GroupTours = () => {
  const [activeTab, setActiveTab] = useState("domestic");

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
          Travel Together
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Group Tours
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join our scheduled group departures and enjoy the benefits of traveling with like-minded explorers
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8 shadow-sm border border-primary/20 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Group Tours?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Cost-Effective Travel</h4>
                  <p className="text-sm text-muted-foreground">Save money with our specially negotiated group rates</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Make New Friends</h4>
                  <p className="text-sm text-muted-foreground">Meet like-minded travelers and create lasting memories</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Enhanced Safety</h4>
                  <p className="text-sm text-muted-foreground">Travel safely in a group with our experienced guides</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Guaranteed Departures</h4>
                  <p className="text-sm text-muted-foreground">Fixed departure dates that you can plan around</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/4 flex justify-center items-center">
            <Button size="lg" className="rounded-full px-6 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              View All Departures
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="domestic" className="w-full mb-10" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="domestic">Domestic Group Tours</TabsTrigger>
            <TabsTrigger value="international">International Group Tours</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="domestic" className="mt-0">
          <SectionHeading
            title="Domestic Group Tours"
            subtitle="Explore India with like-minded travelers"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {domesticGroupTours.map((tour) => (
              <div key={tour.id} className="group overflow-hidden rounded-xl card-hover relative flex flex-col bg-card shadow-sm border border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.imageSrc}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {tour.packageType}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                  
                  <div className="grid grid-cols-1 gap-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-primary" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-primary" />
                      <span>Departure: {tour.departureDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1 text-primary" />
                      <span>Group Size: {tour.groupSize}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tour.description}</p>
                  
                  <Badge variant="outline" className="w-fit mb-3">
                    {tour.duration}
                  </Badge>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="font-semibold">₹{parseInt(tour.price).toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="international" className="mt-0">
          <SectionHeading
            title="International Group Tours"
            subtitle="Explore the world with our guided group packages"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {internationalGroupTours.map((tour) => (
              <div key={tour.id} className="group overflow-hidden rounded-xl card-hover relative flex flex-col bg-card shadow-sm border border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.imageSrc}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {tour.packageType}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-blue-500 text-white">
                      <Plane className="w-3 h-3 mr-1" />
                      Flight Included
                    </Badge>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                  
                  <div className="grid grid-cols-1 gap-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-primary" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-primary" />
                      <span>Departure: {tour.departureDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1 text-primary" />
                      <span>Group Size: {tour.groupSize}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tour.description}</p>
                  
                  <Badge variant="outline" className="w-fit mb-3">
                    {tour.duration}
                  </Badge>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="font-semibold">₹{parseInt(tour.price).toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 rounded-xl p-6 mt-10">
        <h3 className="text-xl font-semibold mb-4">What's Included in {activeTab === "domestic" ? "Domestic" : "International"} Group Tours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Accommodation</h4>
              <p className="text-sm text-muted-foreground">Comfortable hotels with breakfast</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Transportation</h4>
              <p className="text-sm text-muted-foreground">Air-conditioned vehicles for transfers</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Guided Tours</h4>
              <p className="text-sm text-muted-foreground">Professional guides at all destinations</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{activeTab === "international" ? "Return Flights" : "Some Meals"}</h4>
              <p className="text-sm text-muted-foreground">{activeTab === "international" ? "International flights from major cities" : "Selected meals as per itinerary"}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{activeTab === "international" ? "Visa Assistance" : "Monument Entries"}</h4>
              <p className="text-sm text-muted-foreground">{activeTab === "international" ? "Help with visa application process" : "Entry tickets to all monuments and attractions"}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Tour Manager</h4>
              <p className="text-sm text-muted-foreground">Dedicated tour manager throughout the journey</p>
            </div>
          </div>
        </div>
      </div>

      <CTASection 
        title="Join Our Next Group Departure"
        description="Limited seats available for our upcoming group tours. Book now to secure your spot!"
        buttonText="Book Now"
        buttonLink="/contact"
      />
    </div>
  );
};

export default GroupTours;
