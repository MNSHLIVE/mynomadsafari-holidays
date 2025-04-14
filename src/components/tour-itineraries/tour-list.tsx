
import TourCard from "@/components/tour-card";
import { TourData } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface TourListProps {
  tours: TourData[];
  isInternational?: boolean;
}

const TourList = ({ tours, isInternational = false }: TourListProps) => {
  const isMobile = useIsMobile();
  
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No tours found</h3>
        <p className="text-muted-foreground">
          Please try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour, index) => (
        <TourCard
          key={index}
          imageSrc={tour.imageSrc}
          title={tour.title}
          location={tour.location}
          duration={tour.duration}
          price={tour.price}
          bestTime={tour.bestTime}
          packageType={tour.packageType}
          description={isInternational ? 
            `International package: ${tour.overview?.substring(0, 60)}...` : 
            `Domestic package: ${tour.overview?.substring(0, 60)}...`}
          itinerary={isMobile ? (tour.dailyPlans?.slice(0, 1) || []) : tour.dailyPlans}
          link={`/tours?destination=${encodeURIComponent(tour.location)}&package=${encodeURIComponent(tour.title)}`}
        />
      ))}
    </div>
  );
};

export default TourList;
