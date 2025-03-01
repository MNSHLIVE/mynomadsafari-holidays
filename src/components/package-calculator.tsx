
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Hotel, Car, Calendar, Users, IndianRupee } from "lucide-react";
import { toast } from "sonner";

// Hotel rates per night in INR
const HOTEL_RATES = {
  "3-star": {
    single: 2500,
    double: 3500,
    triple: 4500,
  },
  "4-star": {
    single: 4500,
    double: 6000,
    triple: 7500,
  },
  "5-star": {
    single: 8000,
    double: 10000,
    triple: 12000,
  },
};

// Transport rates per km in INR
const TRANSPORT_RATES = {
  sedan: 16,
  suv: 20,
};

// Additional costs
const DRIVER_ALLOWANCE = 500; // per day
const TOLL_PARKING_ESTIMATE = 300; // per day

interface PackageCalculatorProps {
  className?: string;
}

const PackageCalculator = ({ className }: PackageCalculatorProps) => {
  // Form state
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [hotelType, setHotelType] = useState<"3-star" | "4-star" | "5-star">("3-star");
  const [roomType, setRoomType] = useState<"single" | "double" | "triple">("double");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [transportType, setTransportType] = useState<"sedan" | "suv">("sedan");
  const [distance, setDistance] = useState(250);
  const [packageType, setPackageType] = useState<"Budgeted" | "Luxury" | "Premier">("Budgeted");

  // Calculated costs
  const [hotelCost, setHotelCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Destinations list
  const destinations = [
    "Delhi",
    "Agra",
    "Jaipur",
    "Goa",
    "Mumbai",
    "Kerala",
    "Rajasthan",
    "Shimla",
    "Manali",
    "Ladakh",
    "Darjeeling",
    "Andaman",
    "Dubai",
    "Singapore",
    "Bali",
    "Thailand",
  ];

  // Calculate costs whenever inputs change
  useEffect(() => {
    // Hotel cost calculation
    const perNightCost = HOTEL_RATES[hotelType][roomType] * rooms;
    const totalHotelCost = perNightCost * days;
    setHotelCost(totalHotelCost);

    // Transport cost calculation
    // Assuming minimum 250km, and each day adds approximately 50km
    const estimatedDistance = Math.max(distance, 250 + (days - 1) * 50);
    const transportRate = TRANSPORT_RATES[transportType];
    const totalTransportCost = estimatedDistance * transportRate;
    setTransportCost(totalTransportCost);

    // Additional costs
    const driverAllowance = DRIVER_ALLOWANCE * days;
    const tollParking = TOLL_PARKING_ESTIMATE * days;
    setAdditionalCost(driverAllowance + tollParking);

    // Total package cost
    const total = totalHotelCost + totalTransportCost + driverAllowance + tollParking;
    setTotalCost(total);

    // Set package type based on hotel type
    if (hotelType === "5-star") {
      setPackageType("Premier");
    } else if (hotelType === "4-star") {
      setPackageType("Luxury");
    } else {
      setPackageType("Budgeted");
    }
  }, [days, hotelType, roomType, rooms, transportType, distance, adults, children]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }

    // Success message
    toast.success("Your package has been calculated! Our team will contact you shortly for more details.");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div id="package-calculator" className={className}>
      <Card className="w-full shadow-lg border-primary/10">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl flex items-center gap-2">
            <IndianRupee className="h-6 w-6" />
            Tour Package Calculator
          </CardTitle>
          <CardDescription>
            Plan your perfect trip with our easy-to-use package calculator
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination" className="flex items-center gap-1 mb-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    Destination
                  </Label>
                  <Select
                    value={destination}
                    onValueChange={setDestination}
                  >
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="days" className="flex items-center gap-1 mb-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Duration (Days)
                  </Label>
                  <Input
                    id="days"
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <Label htmlFor="adults" className="flex items-center gap-1 mb-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    Travelers
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adults" className="text-xs">Adults</Label>
                      <Input
                        id="adults"
                        type="number"
                        min={1}
                        max={20}
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="children" className="text-xs">Children (4-12 yrs)</Label>
                      <Input
                        id="children"
                        type="number"
                        min={0}
                        max={10}
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="distance" className="flex items-center gap-1 mb-1.5">
                    <Car className="h-4 w-4 text-primary" />
                    Estimated Distance (km)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    min={250}
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value) || 250)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum 250 km</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hotelType" className="flex items-center gap-1 mb-1.5">
                    <Hotel className="h-4 w-4 text-primary" />
                    Hotel Type
                  </Label>
                  <Select
                    value={hotelType}
                    onValueChange={(value) => setHotelType(value as "3-star" | "4-star" | "5-star")}
                  >
                    <SelectTrigger id="hotelType">
                      <SelectValue placeholder="Select hotel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-star">3-Star Hotel</SelectItem>
                      <SelectItem value="4-star">4-Star Hotel</SelectItem>
                      <SelectItem value="5-star">5-Star Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roomType" className="flex items-center gap-1 mb-1.5">
                    Room Type
                  </Label>
                  <Select
                    value={roomType}
                    onValueChange={(value) => setRoomType(value as "single" | "double" | "triple")}
                  >
                    <SelectTrigger id="roomType">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Room</SelectItem>
                      <SelectItem value="double">Double Room</SelectItem>
                      <SelectItem value="triple">Triple Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rooms" className="flex items-center gap-1 mb-1.5">
                    Number of Rooms
                  </Label>
                  <Input
                    id="rooms"
                    type="number"
                    min={1}
                    max={10}
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <Label htmlFor="transportType" className="flex items-center gap-1 mb-1.5">
                    <Car className="h-4 w-4 text-primary" />
                    Transport Type
                  </Label>
                  <Select
                    value={transportType}
                    onValueChange={(value) => setTransportType(value as "sedan" | "suv")}
                  >
                    <SelectTrigger id="transportType">
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan Car</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Estimated Package Cost</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hotel Cost:</span>
                    <span className="font-medium">{formatCurrency(hotelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transportation Cost:</span>
                    <span className="font-medium">{formatCurrency(transportCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Costs:</span>
                    <span className="font-medium">{formatCurrency(additionalCost)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Estimated Cost:</span>
                    <span className="text-primary">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Package Type: <span className="font-bold">{packageType}</span></h4>
                  <p className="text-sm text-muted-foreground">
                    This is an estimate based on your selections. Actual prices may vary based on availability, season, and specific requirements.
                  </p>
                  <div className="mt-3 text-xs">
                    <p>• Toll, parking, and driver allowance included</p>
                    <p>• Pick-up and drop-off from your home</p>
                    <p>• Customized itinerary</p>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Get Detailed Quote
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageCalculator;
