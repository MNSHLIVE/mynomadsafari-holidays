
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
            <span className="font-bold text-xl md:text-2xl text-brand-green">My Nomadsafari Holidays</span>
          </NavLink>
          <nav className="hidden md:flex gap-6">
            {["Home", "Destinations", "Tours", "Visa", "About", "Contact"].map((item) => (
              <NavLink 
                key={item} 
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                className={({isActive}) => 
                  cn(
                    "text-base font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-green after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                    isActive ? "text-brand-green" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
