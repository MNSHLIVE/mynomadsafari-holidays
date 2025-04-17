
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
    <div className="max-w-3xl mx-auto text-center mb-12">
      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
        Explore Our Tours
      </span>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Curated Tour Packages
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Discover our handpicked tours for your next adventure
      </p>
      
      <div className="relative max-w-md mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search tours by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <Link to="/religious-tours">
          <Button variant="outline" className="rounded-full">
            Religious Tours
          </Button>
        </Link>
        <Link to="/group-tours">
          <Button variant="outline" className="rounded-full">
            Group Tours
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToursSearchHeader;
