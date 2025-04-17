
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MainNavMenu } from "@/components/main-nav-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Create a simple site config here instead of importing it
const siteConfig = {
  name: "My Nomadsafari Holidays"
};

interface MainNavProps {
  className?: string;
}

export function MainNav({
  className,
}: MainNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={cn("flex h-16 items-center space-x-4 sm:space-x-6 lg:justify-between lg:space-x-0", className)}>
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <img 
          src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
          alt="My Nomadsafari Holidays" 
          className="h-8 w-auto"
        />
        <span className="font-montserrat font-bold">{siteConfig.name}</span>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <SheetHeader className="pl-6 pb-10 pt-6">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Explore our site and discover new destinations and tours.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
                alt="My Nomadsafari Holidays" 
                className="h-8 w-auto"
              />
              <span className="font-montserrat font-bold">{siteConfig.name}</span>
            </Link>
            <Link to="/" className="px-6 py-2">
              Home
            </Link>
            <Link to="/about" className="px-6 py-2">
              About Us
            </Link>
            <Link to="/destinations" className="px-6 py-2">
              Destinations
            </Link>
            <Link to="/tour-itineraries" className="px-6 py-2">
              Tour Itineraries
            </Link>
            <Link to="/religious-tours" className="px-6 py-2">
              Religious Tours
            </Link>
            <Link to="/group-tours" className="px-6 py-2">
              Group Tours
            </Link>
            <Link to="/visa" className="px-6 py-2">
              Visa
            </Link>
            <Link to="/book-tickets" className="px-6 py-2">
              Book Tickets
            </Link>
            <Link to="/blog" className="px-6 py-2">
              Blog
            </Link>
            <Link to="/contact" className="px-6 py-2">
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex items-center gap-4">
        <Link to="/" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/" ? "font-medium text-primary" : ""
        )}>
          Home
        </Link>
        
        <Link to="/about" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/about" ? "font-medium text-primary" : ""
        )}>
          About Us
        </Link>
        
        <Link to="/destinations" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/destinations" ? "font-medium text-primary" : ""
        )}>
          Destinations
        </Link>
        
        <MainNavMenu />
        
        <Link to="/visa" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/visa" ? "font-medium text-primary" : ""
        )}>
          Visa
        </Link>

        <Link to="/blog" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/blog" ? "font-medium text-primary" : ""
        )}>
          Blog
        </Link>
        
        <Link to="/contact" className={cn(
          "px-3 py-2 hover:text-primary transition-colors",
          location.pathname === "/contact" ? "font-medium text-primary" : ""
        )}>
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
