
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle"; 
import { useEffect, useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
              alt="My Nomadsafari Holidays"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-16"
            />
            <span className="font-bold font-montserrat text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl ml-2 text-brand-green">
              My Nomadsafari Holidays
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-1 md:gap-2 lg:gap-6">
            {["Home", "Destinations", "Tours", "Tickets", "Visa", "Blog", "Contact"].map((item) => (
              <NavLink 
                key={item} 
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                className={({isActive}) => 
                  cn(
                    "text-base lg:text-lg font-medium relative px-2 py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-green after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                    isActive ? "text-brand-green" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {item === "Kazakisthan" ? "Kazakhstan" : item}
              </NavLink>
            ))}
          </nav>
          
          {/* Calculate Trip Button */}
          <NavLink to="/trip-calculator">
            <Button variant="default" size="sm" className="bg-brand-green hover:bg-brand-green/90">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Trip
            </Button>
          </NavLink>
          
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b py-4 animate-fade-in shadow-md">
          <div className="container flex px-4">
            <nav className="flex flex-col w-full gap-2">
              {["Home", "Destinations", "Tours", "Tickets", "Visa", "Blog", "Contact"].map((item) => (
                <NavLink 
                  key={item} 
                  to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                  className={({isActive}) => 
                    cn(
                      "text-lg font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors",
                      isActive ? "text-brand-green bg-accent/50" : "text-muted-foreground hover:text-foreground"
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item === "Kazakisthan" ? "Kazakhstan" : item}
                </NavLink>
              ))}
              
              {/* Mobile Calculate Trip Button */}
              <NavLink 
                to="/trip-calculator"
                className="mx-4 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="default" size="sm" className="bg-brand-green hover:bg-brand-green/90 w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Trip
                </Button>
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
