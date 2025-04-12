
import TourCard from "@/components/tour-card";
import { TourData, TourTier } from "./types";

interface TourListProps {
  tours: TourData[];
}

const TourList = ({ tours }: TourListProps) => {
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
          packageType={tour.packageType as TourTier}
          description={tour.overview}
          itinerary={tour.dailyPlans}
          link={`/tours?destination=${encodeURIComponent(tour.location)}&package=${encodeURIComponent(tour.title)}`}
        />
      ))}
    </div>
  );
};

export default TourList;
