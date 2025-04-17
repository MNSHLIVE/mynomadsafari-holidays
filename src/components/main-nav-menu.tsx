
import * as React from "react";
import { Link } from "react-router-dom";
import { Plane, Train, Bus } from "lucide-react";
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
          <NavigationMenuTrigger>Tours</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/tour-itineraries"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Tour Itineraries
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse our collection of carefully crafted tour packages for domestic and international destinations.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem to="/religious-tours" title="Religious Tours">
                Spiritual journeys to sacred sites across India and around the world.
              </ListItem>
              <ListItem to="/group-tours" title="Group Tours">
                Special packages for families, friends, and corporate groups.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Book Tickets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/book-tickets"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Ticket Booking
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Book air, train, and bus tickets with our expert assistance for the best rates and confirmed seats.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem 
                to="/book-tickets" 
                title="Air Tickets" 
                icon={<Plane className="h-4 w-4 mr-2 text-primary" />}
              >
                Domestic and international flight bookings at competitive rates.
              </ListItem>
              <ListItem 
                to="/book-tickets" 
                title="Train Tickets" 
                icon={<Train className="h-4 w-4 mr-2 text-primary" />}
              >
                Regular and Tatkal bookings across Indian Railways.
              </ListItem>
              <ListItem 
                to="/book-tickets" 
                title="Bus Tickets" 
                icon={<Bus className="h-4 w-4 mr-2 text-primary" />}
              >
                AC, sleeper, and luxury bus bookings nationwide.
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
