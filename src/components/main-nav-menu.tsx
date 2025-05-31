
import * as React from "react";
import { Link } from "react-router-dom";
import { Plane, Train, Bus, Heart, Mountain, TreePalm, Globe, FileCheck, MapPin, Calculator } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function MainNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-green after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">India Tour Packages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/tours"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Best India Tour Packages 2024
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse our collection of carefully crafted luxury safari holidays and adventure travel packages for domestic and international destinations. From budget-friendly options to premium experiences.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem to="/tours" title="Luxury Safari Holidays" icon={<MapPin className="h-4 w-4 mr-2 text-primary" />}>
                Explore diverse wildlife and cultural beauty of India with our comprehensive luxury tour packages.
              </ListItem>
              <ListItem to="/destinations?category=international" title="International Adventure Tours" icon={<Globe className="h-4 w-4 mr-2 text-primary" />}>
                Discover exciting global destinations with our expertly crafted international travel packages.
              </ListItem>
              <ListItem to="/religious-tours" title="Heritage & Religious Tours" icon={<Mountain className="h-4 w-4 mr-2 text-primary" />}>
                Spiritual journeys and cultural heritage tours to sacred sites across India and around the world.
              </ListItem>
              <ListItem to="/group-tours" title="Customized Group Tours" icon={<Mountain className="h-4 w-4 mr-2 text-primary" />}>
                Special luxury packages for families, friends, and corporate groups with personalized itineraries.
              </ListItem>
              <ListItem 
                to="/#calculator-section" 
                title="Tour Package Calculator" 
                icon={<Calculator className="h-4 w-4 mr-2 text-primary" />}
              >
                Estimate your India tour package cost with our easy-to-use calculator tool for budget planning.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-green after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">End-to-End Travel Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/services"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Comprehensive Luxury Travel Services
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beyond just safari holidays, we offer complete travel solutions including ticket booking, visa services, and customized adventure travel planning for stress-free journeys.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem 
                to="/tickets" 
                title="Flight Ticket Booking" 
                icon={<Plane className="h-4 w-4 mr-2 text-primary" />}
              >
                Domestic and international flight bookings at competitive rates for your India tour packages.
              </ListItem>
              <ListItem 
                to="/tickets" 
                title="Train Ticket Booking" 
                icon={<Train className="h-4 w-4 mr-2 text-primary" />}
              >
                Regular and Tatkal bookings across Indian Railways for convenient adventure travel.
              </ListItem>
              <ListItem 
                to="/tickets" 
                title="Luxury Bus Services" 
                icon={<Bus className="h-4 w-4 mr-2 text-primary" />}
              >
                AC, sleeper, and luxury bus bookings nationwide for comfortable safari holiday journeys.
              </ListItem>
              <ListItem 
                to="/visa" 
                title="Complete Visa Services" 
                icon={<FileCheck className="h-4 w-4 mr-2 text-primary" />}
              >
                Complete visa assistance for international destinations and luxury travel planning.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    to: string;
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, children, to, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
