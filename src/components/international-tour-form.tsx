
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

interface InternationalTourFormProps {
  destination: string;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  hotelCategory: string;
  setDestination: (val: string) => void;
  setNights: (val: number) => void;
  setAdults: (val: number) => void;
  setChildren: (val: number) => void;
  setInfants: (val: number) => void;
  setHotelCategory: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InternationalTourForm = ({
  destination,
  nights,
  adults,
  children,
  infants,
  hotelCategory,
  setDestination,
  setNights,
  setAdults,
  setChildren,
  setInfants,
  setHotelCategory,
  onSubmit,
}: InternationalTourFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="e.g., Dubai, Singapore, Bali"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1"
          />
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
