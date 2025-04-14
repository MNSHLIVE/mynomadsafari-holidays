
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/destinations", label: "Destinations" },
    { href: "/visa", label: "Visa" },
    { href: "/tours", label: "Tours" },
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-primary flex items-center space-x-3"
            >
              <img 
                src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
                alt="My Nomadsafari Holidays" 
                className="h-10 w-auto"
              />
              <span className="text-lg md:text-xl font-medium">
                My Nomadsafari Holidays
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group py-2 px-3 rounded-md hover:bg-primary/10",
                  location.pathname === link.href 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 bg-primary rounded-full",
                    location.pathname === link.href 
                      ? "scale-x-100" 
                      : "group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="container mx-auto px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "block py-3 px-4 rounded-md text-base font-medium transition-colors",
                  location.pathname === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
