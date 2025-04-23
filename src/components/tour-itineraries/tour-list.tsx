
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import { DomesticTourDetails, InternationalTourDetails } from "./types";
import { formatDateRange } from "./tours-tabs";

interface TourListProps {
  tours: (DomesticTourDetails | InternationalTourDetails)[];
  type: "domestic" | "international";
  onTourEnquiry?: (tourName: string) => void;
}

const TourList = ({ tours, type, onTourEnquiry }: TourListProps) => {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No tours found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find available tours.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => {
        // Format the date range if present
        let dateDisplay = "Flexible dates";
        if (tour.startDate && tour.endDate) {
          try {
            const fromDate = new Date(tour.startDate);
            const toDate = new Date(tour.endDate);
            
            if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
              dateDisplay = formatDateRange({
                from: fromDate,
                to: toDate
              });
            }
          } catch (error) {
            console.error("Error formatting dates:", error);
          }
        }

        return (
          <Card key={tour.id} className="flex flex-col h-full shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{tour.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tour.destination}
                  </CardDescription>
                </div>
                <div className="bg-primary/10 px-2 py-1 rounded text-sm font-medium text-primary">
                  {type === "domestic" ? "Domestic" : "International"}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{dateDisplay}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Min. {tour.minGroupSize} people</span>
                </div>
                <div className="flex items-center text-sm">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Starting from ₹{tour.pricePerPerson.toLocaleString()}/person</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {tour.description}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full" 
                onClick={() => onTourEnquiry && onTourEnquiry(tour.name)}
              >
                Enquire Now
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default TourList;
