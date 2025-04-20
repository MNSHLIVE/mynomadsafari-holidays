
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SectionHeading from "@/components/section-heading";

interface ToursSearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ToursSearchHeader = ({ searchTerm, setSearchTerm }: ToursSearchHeaderProps) => {
  return (
    <div className="max-w-3xl mx-auto text-center px-4 mb-8 md:mb-12">
      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
        Explore Our Tours
      </span>
      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 break-words hyphens-auto">
        Curated Tour Packages
      </h1>
      <p className="text-base xs:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 break-words hyphens-auto">
        Discover our handpicked tours for your next adventure
      </p>
      
      <div className="relative max-w-md mx-auto mb-6 md:mb-8">
        <Input
          type="text"
          placeholder="Search tours by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4">
        <Link to="/religious-tours">
          <Button variant="outline" className="rounded-full text-sm md:text-base">
            Religious Tours
          </Button>
        </Link>
        <Link to="/group-tours">
          <Button variant="outline" className="rounded-full text-sm md:text-base">
            Group Tours
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToursSearchHeader;
