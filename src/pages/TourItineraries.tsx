
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
import DestinationQueryForm from "@/components/destination-query-form";

const TourItineraries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedTourName, setSelectedTourName] = useState("");

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

  // Combine all unique destinations for the filters dropdown
  const allDestinations = [...new Set([...uniqueDomesticDestinations, ...uniqueInternationalDestinations])];

  // Handle tour enquiry
  const handleTourEnquiry = (tourName: string) => {
    setSelectedTourName(tourName);
    setShowEnquiryForm(true);
  };

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
          destinations={allDestinations}
          onFilterChange={() => console.log("Filter change detected")}
        />

        <ToursTabs
          domesticTours={filteredDomesticTours}
          internationalTours={filteredInternationalTours}
          onTourEnquiry={handleTourEnquiry}
        />

        {showEnquiryForm && (
          <DestinationQueryForm 
            destinationName={selectedTourName} 
            initialOpen={true}
            onFormSubmitted={() => setShowEnquiryForm(false)}
          />
        )}
      </div>
    </>
  );
};

export default TourItineraries;
