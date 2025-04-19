
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle"; 
import { useEffect, useState } from "react";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
              alt="My Nomadsafari Holidays"
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl md:text-2xl">My Nomadsafari Holidays</span>
          </NavLink>
          <nav className="hidden md:flex gap-6">
            <NavLink to="/" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              Home
            </NavLink>
            <NavLink to="/destinations" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              Destinations
            </NavLink>
            <NavLink to="/tours" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              Tours
            </NavLink>
            <NavLink to="/visa" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              Visa
            </NavLink>
            <NavLink to="/about" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => 
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }>
              Contact
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild>
            <NavLink to="/contact">Book Now</NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
