
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle"; 
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MainNavMenu } from "./main-nav-menu";

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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
              alt="My Nomadsafari Holidays"
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg md:text-xl lg:text-2xl text-brand-green">My Nomadsafari Holidays</span>
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center justify-center flex-grow">
          <MainNavMenu />
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="default" 
            className="hidden md:inline-flex"
            onClick={() => window.location.href = '/tickets'}
          >
            Book Tickets
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b py-4">
          <nav className="container flex flex-col gap-4">
            {["Home", "Destinations", "Tours", "Tickets", "Visa", "About", "Contact"].map((item) => (
              <NavLink 
                key={item} 
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                className={({isActive}) => 
                  cn(
                    "text-lg font-medium px-4 py-2 rounded-md hover:bg-accent",
                    isActive ? "text-brand-green bg-accent" : "text-muted-foreground hover:text-foreground"
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
