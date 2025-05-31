
import * as React from "react"
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const destinations = [
  {
    title: "Golden Triangle Tours",
    href: "/destinations/golden-triangle-tours",
    description: "Luxury heritage tours covering Delhi, Agra & Jaipur with cultural experiences"
  },
  {
    title: "Kerala Backwater Packages", 
    href: "/destinations/kerala-tour-packages",
    description: "Premium houseboat stays and Ayurveda retreats in God's Own Country"
  },
  {
    title: "Rajasthan Heritage Tours",
    href: "/destinations/rajasthan-heritage-tours", 
    description: "Royal palace stays and desert safari experiences in Land of Kings"
  },
  {
    title: "Himachal Adventure Tours",
    href: "/destinations/himachal-adventure-tours",
    description: "Mountain trekking, adventure sports and luxury hill station stays"
  },
  {
    title: "Kashmir Luxury Packages",
    href: "/destinations?region=kashmir",
    description: "Premium Dal Lake houseboats and Gulmarg ski resort packages"
  },
  {
    title: "Goa Beach & Wildlife Tours", 
    href: "/destinations?region=goa",
    description: "Beach resorts combined with wildlife sanctuary experiences"
  }
]

const tourPackages = [
  {
    title: "Wildlife Safari Packages",
    href: "/tours?category=wildlife",
    description: "Luxury tiger safari tours with premium jungle lodges and expert guides"
  },
  {
    title: "Cultural Heritage Tours", 
    href: "/tours?category=cultural",
    description: "Immersive cultural experiences with local traditions and heritage sites"
  },
  {
    title: "Adventure Travel India",
    href: "/tours?category=adventure", 
    description: "Trekking, rafting, and mountain biking with luxury accommodations"
  },
  {
    title: "Honeymoon Tour Packages",
    href: "/tours?category=honeymoon",
    description: "Romantic getaways with private dining and luxury spa experiences"
  },
  {
    title: "Family Holiday Packages",
    href: "/tours?category=family",
    description: "Kid-friendly adventures with educational experiences across India"
  },
  {
    title: "Luxury Train Journeys",
    href: "/tours?category=luxury-trains",
    description: "Palace on Wheels and other premium train experiences"
  }
]

const services = [
  {
    title: "End-to-End Travel Solutions",
    href: "/tickets",
    description: "Complete flight & train booking with luxury accommodations"
  },
  {
    title: "International Visa Assistance", 
    href: "/visa",
    description: "Expert guidance for global destinations with hassle-free processing"
  },
  {
    title: "Customized Safari Vacations",
    href: "/contact",
    description: "Personalized itineraries with wildlife experiences and luxury stays"
  },
  {
    title: "Group Tour Packages",
    href: "/group-tours", 
    description: "Special rates for corporate groups and family reunions"
  }
]

const MainNavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {destinations.map((destination) => (
                <Link
                  key={destination.href}
                  to={destination.href}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  )}
                >
                  <div className="text-sm font-medium leading-none">{destination.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {destination.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Tour Packages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {tourPackages.map((tour) => (
                <Link
                  key={tour.href}
                  to={tour.href}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  )}
                >
                  <div className="text-sm font-medium leading-none">{tour.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {tour.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
              {services.map((service) => (
                <Link
                  key={service.href}
                  to={service.href}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  )}
                >
                  <div className="text-sm font-medium leading-none">{service.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            to="/religious-tours"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            )}
          >
            Religious Tours
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainNavMenu
