
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";

// Create a simple site config here instead of importing it
const siteConfig = {
  name: "My Nomadsafari Holidays"
};

// Create a simple Icons object
const Icons = {
  logo: ({ className, ...props }: { className?: string, [key: string]: any }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M18 6a4 4 0 0 0-4-4 7 7 0 0 0-7 7c0 4 3 6 4 6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a9 9 0 0 0 3-9Z" />
      <path d="M6.33 20H4a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h2" />
    </svg>
  )
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
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold">{siteConfig.name}</span>
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
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <Link to="/destinations" className="px-6 py-2">
              Destinations
            </Link>
            <Link to="/tours" className="px-6 py-2">
              Tours
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="group">
              Destinations
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background">
            <DropdownMenuLabel>Destinations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/destinations?category=domestic">
                Domestic Destinations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/destinations?category=international">
                International Destinations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/destinations?category=pilgrimage">
                Pilgrimage Destinations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/destinations?category=honeymoon">
                Honeymoon Destinations
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="group">
              Tours
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background">
            <DropdownMenuLabel>Tour Packages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/tour-itineraries">
                All Tour Itineraries
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/tours?category=domestic">
                Domestic Tours
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/religious-tours">
                Religious Tours
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/group-tours">
                Group Tours
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/tours?category=international">
                International Tours
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link to="/blog" className="px-3 py-2">
          Blog
        </Link>
        <Link to="/contact" className="px-3 py-2">
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
