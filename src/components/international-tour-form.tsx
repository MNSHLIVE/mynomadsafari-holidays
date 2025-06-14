
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";

interface InternationalTourFormProps {
  destination: string;
  departureCity: string;
  arrivalCity: string;
  tripType: string;
  departureDate: Date | null;
  returnDate: Date | null;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  hotelCategory: string;
  setDestination: (val: string) => void;
  setDepartureCity: (val: string) => void;
  setArrivalCity: (val: string) => void;
  setTripType: (val: string) => void;
  setDepartureDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  setNights: (val: number) => void;
  setAdults: (val: number) => void;
  setChildren: (val: number) => void;
  setInfants: (val: number) => void;
  setHotelCategory: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const cityList = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Kochi",
  "Ahmedabad",
  "Goa",
  "Jaipur",
  "Pune",
  "Indore",
  "Lucknow",
  "Varanasi",
  "Dubai",
  "Singapore",
  "Bali",
  "London",
  "Bangkok",
  "Kuala Lumpur",
  "Male",
];

const InternationalTourForm = ({
  destination,
  departureCity,
  arrivalCity,
  tripType,
  departureDate,
  returnDate,
  nights,
  adults,
  children,
  infants,
  hotelCategory,
  setDestination,
  setDepartureCity,
  setArrivalCity,
  setTripType,
  setDepartureDate,
  setReturnDate,
  setNights,
  setAdults,
  setChildren,
  setInfants,
  setHotelCategory,
  onSubmit
}: InternationalTourFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="trip-type">Trip Type</Label>
          <Select value={tripType} onValueChange={setTripType}>
            <SelectTrigger className="mt-1" id="trip-type">
              <SelectValue placeholder="One Way / Round Trip" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Round Trip">Round Trip</SelectItem>
              <SelectItem value="One Way">One Way</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="departureCity">Boarding From</Label>
          <Select value={departureCity} onValueChange={setDepartureCity}>
            <SelectTrigger className="mt-1" id="departureCity">
              <SelectValue placeholder="Select Departure City" />
            </SelectTrigger>
            <SelectContent>
              {cityList.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="arrivalCity">Destination City</Label>
          <Select value={arrivalCity} onValueChange={setArrivalCity}>
            <SelectTrigger className="mt-1" id="arrivalCity">
              <SelectValue placeholder="Select Destination City" />
            </SelectTrigger>
            <SelectContent>
              {cityList.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="destination">Destination Country</Label>
          <Input
            id="destination"
            placeholder="e.g., Dubai, Singapore, Bali"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="departure-date">Departure Date</Label>
          <div className="relative mt-1">
            <Calendar
              mode="single"
              selected={departureDate || undefined}
              onSelect={setDepartureDate}
              fromDate={new Date()}
              className={cn(
                "w-full border rounded-md bg-background"
              )}
              id="departure-date"
            />
            {departureDate && (
              <span className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                {format(departureDate, "dd MMM yyyy")}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="return-date">Return Date</Label>
          <div className="relative mt-1">
            <Calendar
              mode="single"
              selected={returnDate || undefined}
              onSelect={setReturnDate}
              fromDate={departureDate || new Date()}
              disabled={tripType === "One Way"}
              className={cn(
                "w-full border rounded-md bg-background",
                tripType === "One Way" ? "opacity-50 pointer-events-none" : ""
              )}
              id="return-date"
            />
            {returnDate && tripType !== "One Way" && (
              <span className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                {format(returnDate, "dd MMM yyyy")}
              </span>
            )}
            {tripType === "One Way" && (
              <span className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                Not applicable
              </span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="nights">Number of Nights</Label>
          <Input
            id="nights"
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="adults">Adults (12+ years)</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="children">Children (5-11 years)</Label>
          <Input
            id="children"
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="infants">Infants (1-5 years)</Label>
          <Input
            id="infants"
            type="number"
            min={0}
            value={infants}
            onChange={(e) => setInfants(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="hotel-category">Preferred Hotel Category</Label>
          <Select value={hotelCategory} onValueChange={setHotelCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select hotel category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-Star">3-Star</SelectItem>
              <SelectItem value="4-Star">4-Star</SelectItem>
              <SelectItem value="5-Star">5-Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full mt-6">
        Calculate Estimate
      </Button>
    </form>
  );
};

export default InternationalTourForm;
