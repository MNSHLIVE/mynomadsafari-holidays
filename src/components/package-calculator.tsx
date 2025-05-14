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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Hotel, Car, Calendar, Users, IndianRupee, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

const TRANSPORT_RATES = {
  sedan: 16,
  suv: 20,
  tempo9: 24,
  tempo16: 32,
  minibus: 45,
};

const getVehicleType = (adults: number) => {
  if (adults >= 16) return "minibus";
  if (adults >= 9) return "tempo16";
  if (adults >= 7) return "tempo9";
  if (adults >= 5) return "suv";
  return "sedan";
};

const INTERNATIONAL_BASE_COSTS = {
  "3-star": 45000,
  "4-star": 75000,
  "5-star": 120000,
};

const DRIVER_ALLOWANCE = 500;
const TOLL_PARKING_ESTIMATE = 300;

const calculateDistance = (days: number) => {
  return days * 250;
};

interface PackageCalculatorProps {
  className?: string;
  onRequestQuote?: (details: any) => void;
}

const PackageCalculator = ({ className, onRequestQuote }: PackageCalculatorProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatorType, setCalculatorType] = useState<"domestic" | "international">("domestic");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [hotelType, setHotelType] = useState<"3-star" | "4-star" | "5-star">("3-star");
  const [roomType, setRoomType] = useState<"single" | "double" | "triple">("double");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [transportType, setTransportType] = useState<"sedan" | "suv" | "tempo9" | "tempo16" | "minibus">("sedan");
  const [distance, setDistance] = useState(750);
  const [packageType, setPackageType] = useState<"Budgeted" | "Luxury" | "Premier">("Budgeted");
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);
  
  // Contact information states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [hotelCost, setHotelCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const domesticDestinations = [
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
    "Varanasi",
    "Udaipur",
    "Jaisalmer",
    "Pushkar",
    "Amritsar",
    "Rishikesh",
    "Mussoorie",
    "Nainital",
    "Ooty",
    "Kodaikanal",
    "Pondicherry",
    "Hampi",
    "Mysore",
    "Gokarna",
    "Shillong",
    "Tawang",
    "Spiti Valley",
    "Auli",
    "Mount Abu",
    "Konark",
    "Khajuraho"
  ];

  const internationalDestinations = [
    "Dubai",
    "Singapore",
    "Bali",
    "Thailand",
    "Malaysia",
    "Europe",
    "USA",
    "Australia",
    "Japan",
    "South Africa",
    "Egypt",
    "Maldives",
    "London",
    "Paris",
    "Rome",
    "Bangkok",
    "Tokyo",
    "Kyoto",
    "Sydney",
    "Melbourne",
    "Auckland",
    "Queenstown",
    "Amsterdam",
    "Barcelona",
    "Madrid",
    "Santorini",
    "Mykonos",
    "Swiss Alps",
    "Canadian Rockies",
    "Machu Picchu",
    "Rio de Janeiro",
    "Cairo",
    "Istanbul",
    "Cappadocia",
    "Buenos Aires",
    "Mexico City",
    "Cancun",
    "Hong Kong",
    "Seoul",
    "Prague",
    "Vienna",
    "Budapest",
    "Berlin",
    "Florence",
    "Venice",
    "Lisbon",
    "Seville",
    "Edinburgh",
    "Dublin",
    "Reykjavik",
    "Stockholm",
    "Copenhagen",
    "Oslo",
    "Helsinki"
  ];

  useEffect(() => {
    if (adults > 4) {
      setRooms(Math.max(2, Math.ceil(adults / 3)));
    } else if (rooms > 1 && adults <= 2) {
      setRooms(1);
    }
    
    const recommendedVehicle = getVehicleType(adults);
    if (calculatorType === "domestic") {
      setTransportType(recommendedVehicle as any);
    }
  }, [adults]);

  useEffect(() => {
    if (calculatorType === "domestic") {
      const calculatedDistance = calculateDistance(days);
      setDistance(calculatedDistance);
    }
  }, [days, calculatorType]);

  useEffect(() => {
    if (calculatorType === "domestic") {
      const perNightCost = HOTEL_RATES[hotelType][roomType] * rooms;
      const totalHotelCost = perNightCost * days;
      setHotelCost(totalHotelCost);

      const vehicleType = getVehicleType(adults);
      const transportRate = TRANSPORT_RATES[vehicleType];
      const totalTransportCost = distance * transportRate;
      setTransportCost(totalTransportCost);

      const driverAllowance = DRIVER_ALLOWANCE * days;
      const tollParking = TOLL_PARKING_ESTIMATE * days;
      setAdditionalCost(driverAllowance + tollParking);

      const total = totalHotelCost + totalTransportCost + driverAllowance + tollParking;
      setTotalCost(total);
    } else {
      const baseCost = INTERNATIONAL_BASE_COSTS[hotelType];
      const adultsCost = baseCost * adults;
      const childrenCost = baseCost * 0.7 * children;
      let roomUpgrade = 0;
      if (roomType === "double") roomUpgrade = 0.15 * baseCost * adults;
      if (roomType === "triple") roomUpgrade = 0.25 * baseCost * adults;
      const totalBaseCost = adultsCost + childrenCost;
      setHotelCost(totalBaseCost * 0.6);
      setTransportCost(totalBaseCost * 0.3);
      setAdditionalCost(totalBaseCost * 0.1 + roomUpgrade);
      const total = totalBaseCost + roomUpgrade;
      setTotalCost(total);
    }

    if (hotelType === "5-star") {
      setPackageType("Premier");
    } else if (hotelType === "4-star") {
      setPackageType("Luxury");
    } else {
      setPackageType("Budgeted");
    }
  }, [days, hotelType, roomType, rooms, transportType, distance, adults, children, calculatorType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination) {
      toast.error("Please enter a destination");
      return;
    }

    if (!travelDate) {
      toast.error("Please select a travel date");
      return;
    }
    
    setShowResults(true);
    
    window.scrollTo({
      top: document.getElementById("results")?.offsetTop,
      behavior: "smooth",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDaysChange = (increment: boolean) => {
    setDays(prevDays => {
      const newValue = increment ? prevDays + 1 : prevDays - 1;
      return Math.max(1, Math.min(30, newValue));
    });
  };

  const handleAdultsChange = (increment: boolean) => {
    setAdults(prevAdults => {
      const newValue = increment ? prevAdults + 1 : prevAdults - 1;
      return Math.max(1, Math.min(20, newValue));
    });
  };

  const handleChildrenChange = (increment: boolean) => {
    setChildren(prevChildren => {
      const newValue = increment ? prevChildren + 1 : prevChildren - 1;
      return Math.max(0, Math.min(10, newValue));
    });
  };

  const handleRoomsChange = (increment: boolean) => {
    setRooms(prevRooms => {
      const newValue = increment ? prevRooms + 1 : prevRooms - 1;
      return Math.max(1, Math.min(10, newValue));
    });
  };
  
  const handleQuoteSubmit = async () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all contact details");
      return;
    }
    
    if (!travelDate) {
      toast.error("Please select a travel date");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const formattedTravelDate = format(travelDate, "yyyy-MM-dd");
      
      const requestData = {
        name,
        email,
        phone,
        destination_name: destination || (calculatorType === "domestic" ? "Domestic Tour" : "International Tour"),
        adults,
        children,
        package_type: packageType,
        estimated_price: formatCurrency(totalCost),
        special_requirements: `${calculatorType === "domestic" ? "Domestic" : "International"} Tour Package: ${days} days, ${adults} adults, ${children} children, ${hotelType} hotel, ${roomType} room(s), ${calculatorType === "domestic" ? transportType : ""} transport. Travel date: ${travelDate ? format(travelDate, "PPP") : "Not specified"}`,
        travel_date: formattedTravelDate
      };
      
      const { error } = await supabase.from('tour_package_requests').insert(requestData);
      
      if (error) {
        console.error("[FORM] Error saving to Supabase:", error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      
      if (onRequestQuote) {
        onRequestQuote({
          ...requestData,
          days,
          hotelType,
          roomType,
          rooms,
          transportType: calculatorType === "domestic" ? transportType : undefined,
          travelDate
        });
      }
    } catch (error: any) {
      console.error('[FORM] Error in form submission:', error);
      setIsSubmitting(false);
      toast.error("Submission Error", {
        description: error.message || "Please try again or contact us directly by phone."
      });
    }
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
          <Tabs defaultValue="domestic" value={calculatorType} onValueChange={(value) => setCalculatorType(value as "domestic" | "international")}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="domestic">Domestic Tour</TabsTrigger>
              <TabsTrigger value="international">International Tour</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="destination" className="flex items-center gap-1 mb-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      Destination
                    </Label>
                    <Input
                      id="destination"
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter destination name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="days" className="flex items-center gap-1 mb-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      Duration (Days)
                    </Label>
                    <div className="flex">
                      <div className="flex-1 flex items-center">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="rounded-r-none"
                          onClick={() => handleDaysChange(false)}
                          disabled={days <= 1}
                        >
                          -
                        </Button>
                        <Input
                          id="days"
                          type="number"
                          min={1}
                          max={30}
                          value={days}
                          onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                          className="rounded-none text-center"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="rounded-l-none"
                          onClick={() => handleDaysChange(true)}
                          disabled={days >= 30}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="travelDate" className="flex items-center gap-1 mb-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      Travel Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="travelDate"
                        >
                          {travelDate ? format(travelDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={travelDate}
                          onSelect={setTravelDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="adults" className="flex items-center gap-1 mb-1.5">
                      <Users className="h-4 w-4 text-primary" />
                      Travelers
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="adults" className="text-xs">Adults</Label>
                        <div className="flex">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="rounded-r-none"
                            onClick={() => handleAdultsChange(false)}
                            disabled={adults <= 1}
                          >
                            -
                          </Button>
                          <Input
                            id="adults"
                            type="number"
                            min={1}
                            max={20}
                            value={adults}
                            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                            className="rounded-none text-center"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="rounded-l-none"
                            onClick={() => handleAdultsChange(true)}
                            disabled={adults >= 20}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="children" className="text-xs">Children (4-12 yrs)</Label>
                        <div className="flex">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="rounded-r-none"
                            onClick={() => handleChildrenChange(false)}
                            disabled={children <= 0}
                          >
                            -
                          </Button>
                          <Input
                            id="children"
                            type="number"
                            min={0}
                            max={10}
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                            className="rounded-none text-center"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="rounded-l-none"
                            onClick={() => handleChildrenChange(true)}
                            disabled={children >= 10}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {calculatorType === "domestic" && (
                    <div>
                      <Label htmlFor="distance" className="flex items-center gap-1 mb-1.5">
                        <Car className="h-4 w-4 text-primary" />
                        Estimated Distance (km)
                      </Label>
                      <Input
                        id="distance"
                        type="number"
                        value={distance}
                        readOnly
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Based on {days} days (250km per day)</p>
                    </div>
                  )}
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
                    <div className="flex">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        className="rounded-r-none"
                        onClick={() => handleRoomsChange(false)}
                        disabled={rooms <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="rooms"
                        type="number"
                        min={1}
                        max={10}
                        value={rooms}
                        onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                        className="rounded-none text-center"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        className="rounded-l-none"
                        onClick={() => handleRoomsChange(true)}
                        disabled={rooms >= 10}
                      >
                        +
                      </Button>
                    </div>
                    {adults > 4 && (
                      <p className="text-xs text-amber-600 mt-1">
                        2+ rooms recommended for {adults} adults
                      </p>
                    )}
                  </div>

                  {calculatorType === "domestic" && (
                    <div>
                      <Label htmlFor="transportType" className="flex items-center gap-1 mb-1.5">
                        <Car className="h-4 w-4 text-primary" />
                        Transport Type
                      </Label>
                      <Select
                        value={transportType}
                        onValueChange={(value) => setTransportType(value as "sedan" | "suv" | "tempo9" | "tempo16" | "minibus")}
                      >
                        <SelectTrigger id="transportType">
                          <SelectValue placeholder="Select transport type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan Car</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="tempo9">Tempo 9</SelectItem>
                          <SelectItem value="tempo16">Tempo 16</SelectItem>
                          <SelectItem value="minibus">Minibus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                Calculate Estimate
              </Button>
            </form>
          </Tabs>
          
          {showResults && (
            <div id="results" className="mt-8">
              {isSubmitted ? (
                <Alert className="bg-primary/5 border-primary/20">
                  <Check className="h-5 w-5 text-primary" />
                  <AlertTitle className="text-lg font-medium mb-2">Thank you for your inquiry!</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      We've received your request about {destination || (calculatorType === "domestic" ? "Domestic Tour" : "International Tour")} and will contact you at {email} within 24 hours with a customized itinerary.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      If you have any urgent questions, please feel free to contact us directly.
                    </p>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="p-6 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-3 text-lg">Estimated Package Cost</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      {calculatorType === "domestic" && adults >= 5 && (
                        <div className="text-sm mt-2 bg-primary/5 p-2 rounded">
                          <p className="font-medium">Recommended Vehicle: {transportType === "tempo9" ? "9-seater Tempo Traveller" : 
                                                   transportType === "tempo16" ? "16-seater Tempo Traveller" : 
                                                   transportType === "minibus" ? "Mini Bus" : 
                                                   transportType === "suv" ? "SUV" : "Sedan"}</p>
                          <p className="text-xs text-muted-foreground">
                            {adults >= 16 ? "For large groups (16+ people)" : 
                             adults >= 9 ? "For medium groups (9-15 people)" : 
                             adults >= 7 ? "For groups of 7-8 people" : 
                             "Based on your group size"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Package Type: <span className="font-bold">{packageType}</span></h4>
                      <p className="text-sm text-muted-foreground">
                        This is an estimate based on your selections. Actual prices may vary based on availability, season, and specific requirements.
                      </p>
                      <div className="mt-3 text-xs">
                        {calculatorType === "domestic" ? (
                          <>
                            <p>• Toll, parking, and driver allowance included</p>
                            <p>• Pick-up and drop-off from your home</p>
                            <p>• Customized itinerary</p>
                          </>
                        ) : (
                          <>
                            <p>• All flights and transfers included</p>
                            <p>• Local sightseeing with guide</p>
                            <p>• All taxes and visa assistance</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-background p-4 rounded-lg border">
                    <h5 className="font-medium mb-3">Complete your inquiry</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your contact details to receive a detailed itinerary
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="name" className="mb-1.5">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="mb-1.5">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="mb-1.5">
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Your contact number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      disabled={isSubmitting}
                      onClick={handleQuoteSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin mr-2 h-4 w-4" />
                          Submitting...
                        </>
                      ) : (
                        "Get Detailed Quote"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageCalculator;
