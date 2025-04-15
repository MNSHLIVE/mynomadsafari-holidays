
import { useState } from "react";
import { Helmet } from "react-helmet";
import SectionHeading from "@/components/section-heading";
import { domesticItineraries, internationalItineraries } from "@/data/tour-itineraries";
import FiltersSection from "@/components/tour-itineraries/filters-section";
import ToursTabs from "@/components/tour-itineraries/tours-tabs";
import { 
  filterDomesticTours, 
  filterInternationalTours, 
  getUniqueDestinations 
} from "@/components/tour-itineraries/tour-filters";
import { TourData } from "@/components/tour-itineraries/types";

const TourItineraries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const uniqueDomesticDestinations = getUniqueDestinations(domesticItineraries);
  const uniqueInternationalDestinations = getUniqueDestinations(internationalItineraries);

  // Filter domestic tours based on search, destination, and duration
  const filteredDomesticTours = filterDomesticTours(
    domesticItineraries,
    searchTerm,
    selectedDestination,
    selectedDuration
  );

  // Filter international tours based on search, destination, and duration
  const filteredInternationalTours = filterInternationalTours(
    internationalItineraries,
    searchTerm,
    selectedDestination,
    selectedDuration
  );

  return (
    <>
      <Helmet>
        <title>Tour Itineraries | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Explore our carefully curated tour itineraries for domestic and international destinations. Find your perfect holiday package with My Nomadsafari Holidays."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title="Explore Our Tour Itineraries"
          subtitle="Detailed day-by-day plans for your perfect vacation"
          tag="Travel Plans"
        />

        <FiltersSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          uniqueDomesticDestinations={uniqueDomesticDestinations}
          uniqueInternationalDestinations={uniqueInternationalDestinations}
        />

        <ToursTabs
          domesticTours={filteredDomesticTours}
          internationalTours={filteredInternationalTours}
        />
      </div>
    </>
  );
};

export default TourItineraries;
