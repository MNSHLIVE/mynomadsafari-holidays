import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToursSearchHeader from "@/components/tours/tours-search-header";
import DoorToDoorSection from "@/components/tours/door-to-door-section";
import ThemeTourSection from "@/components/tours/theme-tour-section";
import { 
  honeymoonTours, 
  adventureTours, 
  jungleSafariTours,
  doorToDoorTours,
  hillStationTours,
  religiousTours
} from "@/components/tours/data";

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Back to Home</Link>
        </Button>
      </div>

      <ToursSearchHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <ThemeTourSection
        title="Door to Door Convenience Packages"
        subtitle="Enjoy hassle-free travel with our all-inclusive door-to-door service"
        tag="Convenience at Your Doorstep"
        tours={doorToDoorTours}
        categorySlug="door-to-door"
        actionText="Explore Door-to-Door Packages"
        actionIcon="mountain"
        className="bg-secondary/10 py-16 rounded-lg"
      />

      <DoorToDoorSection doorToDoorPackages={doorToDoorTours.slice(0, 3)} />

      <ThemeTourSection
        title="Religious & Pilgrimage Tours"
        subtitle="Embark on a spiritual journey to sacred destinations across India"
        tag="Spiritual Journeys"
        tours={religiousTours}
        categorySlug="religious"
        actionText="View All Pilgrimage Tours"
        actionIcon="mountain"
        className="bg-primary/10 py-16 rounded-lg border border-primary/20"
      />

      <ThemeTourSection
        title="Summer Special Hill Station Tours"
        subtitle="Escape the summer heat with our specially curated hill station packages"
        tag="Summer Escapes"
        tours={hillStationTours}
        categorySlug="hill-stations"
        actionText="View All Hill Station Tours"
        actionIcon="mountain"
      />

      <ThemeTourSection
        title="Romantic Honeymoon Packages"
        subtitle="Begin your journey of love with our specially curated honeymoon packages"
        tag="Honeymoon Specials"
        tours={honeymoonTours}
        categorySlug="honeymoon"
        actionText="View All Honeymoon Packages"
        actionIcon="heart"
        className="bg-muted/30 py-16 rounded-lg"
      />

      <ThemeTourSection
        title="Adventure Tours"
        subtitle="For thrill-seekers looking for an adrenaline-filled vacation"
        tag="Adventure Awaits"
        tours={adventureTours}
        categorySlug="adventure"
        actionText="Explore All Adventure Tours"
        actionIcon="mountain"
      />

      <ThemeTourSection
        title="Jungle Safari Tours"
        subtitle="Explore wildlife in their natural habitat with our guided safari tours"
        tag="Wildlife Experiences"
        tours={jungleSafariTours}
        categorySlug="jungle"
        actionText="View All Jungle Safari Tours"
        actionIcon="tree"
        className="bg-muted/30 py-16 rounded-lg"
      />
    </div>
  );
};

export default Tours;
