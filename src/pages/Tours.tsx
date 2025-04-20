
import { useState } from "react";
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
      <ToursSearchHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <DoorToDoorSection doorToDoorPackages={doorToDoorTours.slice(0, 3)} />

      {/* Religious Tours Section - Newly Added */}
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

      {/* Hill Station Tours Section */}
      <ThemeTourSection
        title="Summer Special Hill Station Tours"
        subtitle="Escape the summer heat with our specially curated hill station packages"
        tag="Summer Escapes"
        tours={hillStationTours}
        categorySlug="hill-stations"
        actionText="View All Hill Station Tours"
        actionIcon="mountain"
      />

      {/* Honeymoon Tours Section */}
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

      {/* Adventure Tours Section */}
      <ThemeTourSection
        title="Adventure Tours"
        subtitle="For thrill-seekers looking for an adrenaline-filled vacation"
        tag="Adventure Awaits"
        tours={adventureTours}
        categorySlug="adventure"
        actionText="Explore All Adventure Tours"
        actionIcon="mountain"
      />

      {/* Jungle Safari Section */}
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
