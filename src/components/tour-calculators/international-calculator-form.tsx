
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HotelCategory, TourRegion } from "../tour-itineraries/types";
import { validateInputs } from "./international-calculator-utils";

export const REGION_NAMES: Record<TourRegion, string> = {
  europe: "Europe",
  southAsiaDubai: "South Asia/Dubai"
};

export const REGION_DESTINATIONS: Record<TourRegion, Record<string, string>> = {
  europe: {
    france: "France",
    switzerland: "Switzerland",
    italy: "Italy",
    spain: "Spain",
    uk: "United Kingdom"
  },
  southAsiaDubai: {
    dubai: "Dubai",
    thailand: "Thailand",
    bali: "Bali",
    vietnam: "Vietnam",
    singapore: "Singapore",
    malaysia: "Malaysia"
  }
};

interface InternationalCalculatorFormProps {
  onSubmit: (formData: {
    region: TourRegion;
    destination: string;
    nights: number;
    adults: number;
    children: number;
    infants: number;
    hotelCategory: HotelCategory;
  }) => void;
}

const InternationalCalculatorForm = ({ onSubmit }: InternationalCalculatorFormProps) => {
  const [region, setRegion] = useState<TourRegion>("europe");
  const [destination, setDestination] = useState<string>("france");
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>("3-Star");
  const [error, setError] = useState<string | null>(null);
  const [availableDestinations, setAvailableDestinations] = useState<Record<string, string>>(REGION_DESTINATIONS.europe);

  // Update destinations when region changes
  const handleRegionChange = (newRegion: TourRegion) => {
    setRegion(newRegion);
    setAvailableDestinations(REGION_DESTINATIONS[newRegion]);
    // Set first destination of the region as default
    const destinationKeys = Object.keys(REGION_DESTINATIONS[newRegion]);
    setDestination(destinationKeys[0]);
  };

  const handleAdultsChange = (value: string) => {
    const newValue = parseInt(value) || 0;
    setAdults(newValue);
    if (newValue < 2) {
      setError("Minimum booking size is 2 adults");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, error } = validateInputs(adults, nights);
    
    if (!isValid) {
      setError(error);
      return;
    }
    
    onSubmit({
      region,
      destination,
      nights,
      adults,
      children,
      infants,
      hotelCategory
    });
    
    // Scroll to results
    window.scrollTo({ top: document.getElementById("results")?.offsetTop, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-2 block">Destination Region</Label>
          <RadioGroup
            value={region}
            onValueChange={(value) => handleRegionChange(value as TourRegion)}
            className="flex flex-col sm:flex-row gap-4"
          >
            {Object.entries(REGION_NAMES).map(([key, name]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`region-${key}`} />
                <Label htmlFor={`region-${key}`}>{name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Select 
              value={destination} 
              onValueChange={setDestination}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(availableDestinations).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              (For future enhancements. Currently does not affect pricing within a region)
            </p>
          </div>
          
          <div>
            <Label htmlFor="nights">Number of Nights</Label>
            <Input
              id="nights"
              type="number"
              min={1}
              value={nights}
              onChange={(e) => setNights(parseInt(e.target.value) || 1)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="adults">Adults (12+ years)</Label>
            <Input
              id="adults"
              type="number"
              min={2}
              value={adults}
              onChange={(e) => handleAdultsChange(e.target.value)}
              className="mt-1"
            />
            {error && (
              <div className="text-destructive flex items-center gap-1 mt-1 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="children">Children (5-11 years)</Label>
            <Input
              id="children"
              type="number"
              min={0}
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
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
              onChange={(e) => setInfants(parseInt(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              (Free of charge, but we need this information for planning)
            </p>
          </div>
          
          <div>
            <Label htmlFor="hotel-category">Preferred Hotel Category</Label>
            <Select 
              value={hotelCategory} 
              onValueChange={(value) => setHotelCategory(value as HotelCategory)}
            >
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
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!!error || adults < 2}
          >
            Calculate Estimate
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InternationalCalculatorForm;
