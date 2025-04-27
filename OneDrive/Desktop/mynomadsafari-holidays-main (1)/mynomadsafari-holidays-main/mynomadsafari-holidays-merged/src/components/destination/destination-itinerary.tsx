import { ItineraryDay } from "@/components/tour-itineraries/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";

interface DestinationItineraryProps {
  itinerary?: ItineraryDay[];
  destinationName: string;
  duration?: string;
}

const DestinationItinerary = ({ itinerary, destinationName, duration }: DestinationItineraryProps) => {
  if (!itinerary || itinerary.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Your Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingForm 
            defaultDestination={destinationName}
            packageName={destinationName}
            duration={duration}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {itinerary.map((day) => (
            <div key={day.day} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold mb-2">Day {day.day}: {day.title}</h3>
              <p className="text-gray-600">{day.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationItinerary; 