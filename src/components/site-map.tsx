
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Train, Bus, Compass, Globe, FileCheck, Calculator, Map } from "lucide-react";

const SiteMap = () => {
  const categories = [
    {
      title: "Plan Your Trip",
      description: "Use our tools to plan and estimate your trip costs",
      items: [
        { name: "Cost Calculator", link: "/#calculator-section", icon: <Calculator className="h-4 w-4 mr-2" /> },
        { name: "Tour Packages", link: "/tours", icon: <Map className="h-4 w-4 mr-2" /> },
        { name: "Travel Guides", link: "/blog", icon: <Compass className="h-4 w-4 mr-2" /> },
      ]
    },
    {
      title: "Domestic Packages",
      description: "Explore the diverse wonders of India",
      items: [
        { name: "North India", link: "/destinations?region=north-india", icon: <Map className="h-4 w-4 mr-2" /> },
        { name: "South India", link: "/destinations?region=south-india", icon: <Map className="h-4 w-4 mr-2" /> },
        { name: "Hill Stations", link: "/destinations?category=mountains", icon: <Map className="h-4 w-4 mr-2" /> },
        { name: "Religious Tours", link: "/religious-tours", icon: <Map className="h-4 w-4 mr-2" /> },
      ]
    },
    {
      title: "International Tours",
      description: "Discover incredible destinations worldwide",
      items: [
        { name: "Southeast Asia", link: "/destinations?region=southeast-asia", icon: <Globe className="h-4 w-4 mr-2" /> },
        { name: "Middle East", link: "/destinations?region=middle-east", icon: <Globe className="h-4 w-4 mr-2" /> },
        { name: "Europe", link: "/destinations?region=europe", icon: <Globe className="h-4 w-4 mr-2" /> },
        { name: "View All", link: "/destinations?category=international", icon: <Globe className="h-4 w-4 mr-2" /> },
      ]
    },
    {
      title: "Visa Services",
      description: "Hassle-free visa processing for global destinations",
      items: [
        { name: "Tourist Visas", link: "/visa", icon: <FileCheck className="h-4 w-4 mr-2" /> },
        { name: "Business Visas", link: "/visa", icon: <FileCheck className="h-4 w-4 mr-2" /> },
        { name: "Visa Requirements", link: "/visa", icon: <FileCheck className="h-4 w-4 mr-2" /> },
      ]
    },
    {
      title: "Ticket Booking",
      description: "Book all your travel tickets in one place",
      items: [
        { name: "Flight Tickets", link: "/tickets", icon: <Plane className="h-4 w-4 mr-2" /> },
        { name: "Train Tickets", link: "/tickets", icon: <Train className="h-4 w-4 mr-2" /> },
        { name: "Bus Tickets", link: "/tickets", icon: <Bus className="h-4 w-4 mr-2" /> },
      ]
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Complete Travel Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My Nomadsafari Holidays provides comprehensive travel services for both domestic and international destinations,
            including customized tour packages, ticket booking, and visa assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.link} 
                        className="flex items-center text-sm hover:text-primary transition-colors"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteMap;
