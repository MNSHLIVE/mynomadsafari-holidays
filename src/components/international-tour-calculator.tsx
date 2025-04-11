
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
import DestinationQueryForm from "./destination-query-form";
import { IndianRupee, Hotel, Users, Calendar, Globe } from "lucide-react";

// Constants for the calculator
const BASE_RATE_3_STAR = 20000; // INR per person per day
const MULTIPLIER_4_STAR = 1.5;
const MULTIPLIER_5_STAR = 2.5;
const ADULT_ADDITIONAL_FACTOR = 0.35;
const CHILD_FACTOR = 0.25;

interface InternationalTourCalculatorProps {
  className?: string;
}

const InternationalTourCalculator: React.FC<InternationalTourCalculatorProps> = ({ className }) => {
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelCategory, setHotelCategory] = useState<"3-star" | "4-star" | "5-star">("3-star");

  // Calculated values
  const [chosenPPPD, setChosenPPPD] = useState(BASE_RATE_3_STAR);
  const [costOneAdult, setCostOneAdult] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [perPersonCost, setPerPersonCost] = useState(0);

  // International destinations
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
  ];

  // Calculate costs whenever inputs change
  useEffect(() => {
    // Calculate PPPD based on hotel category
    let calculatedPPPD = BASE_RATE_3_STAR;
    if (hotelCategory === "4-star") {
      calculatedPPPD = BASE_RATE_3_STAR * MULTIPLIER_4_STAR;
    } else if (hotelCategory === "5-star") {
      calculatedPPPD = BASE_RATE_3_STAR * MULTIPLIER_5_STAR;
    }
    setChosenPPPD(calculatedPPPD);

    // Calculate cost for one adult
    const calculatedCostOneAdult = calculatedPPPD * nights;
    setCostOneAdult(calculatedCostOneAdult);

    // Calculate total group cost
    let calculatedTotalCost = 0;
    if (adults >= 1) {
      calculatedTotalCost = calculatedCostOneAdult; // Cost for first adult
      
      if (adults > 1) {
        calculatedTotalCost += calculatedCostOneAdult * ADULT_ADDITIONAL_FACTOR * (adults - 1); // Cost for additional adults
      }
      
      // Add cost for children
      if (children > 0) {
        calculatedTotalCost += calculatedCostOneAdult * CHILD_FACTOR * children;
      }
    }
    setTotalCost(calculatedTotalCost);

    // Calculate per-person cost
    const totalPayingPersons = adults + children;
    if (totalPayingPersons > 0) {
      setPerPersonCost(calculatedTotalCost / totalPayingPersons);
    } else {
      setPerPersonCost(0);
    }
  }, [nights, adults, children, infants, hotelCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination) {
      return;
    }

    setShowQueryForm(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={className}>
      <Card className="w-full shadow-lg border-primary/10">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6" />
            International Tour Cost Estimator
          </CardTitle>
          <CardDescription>
            Get an estimated cost for your international trip based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination" className="flex items-center gap-1 mb-1.5">
                    <Globe className="h-4 w-4 text-primary" />
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
                      {internationalDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nights" className="flex items-center gap-1 mb-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Number of Nights
                  </Label>
                  <Input
                    id="nights"
                    type="number"
                    min={1}
                    max={30}
                    value={nights}
                    onChange={(e) => setNights(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <Label htmlFor="hotelCategory" className="flex items-center gap-1 mb-1.5">
                    <Hotel className="h-4 w-4 text-primary" />
                    Hotel Category
                  </Label>
                  <Select
                    value={hotelCategory}
                    onValueChange={(value) => setHotelCategory(value as "3-star" | "4-star" | "5-star")}
                  >
                    <SelectTrigger id="hotelCategory">
                      <SelectValue placeholder="Select hotel category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-star">3-Star Hotel</SelectItem>
                      <SelectItem value="4-star">4-Star Hotel</SelectItem>
                      <SelectItem value="5-star">5-Star Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="adults" className="flex items-center gap-1 mb-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    Number of Adults (12+ years)
                  </Label>
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
                  <Label htmlFor="children" className="flex items-center gap-1 mb-1.5">
                    Number of Children (5-11 years)
                  </Label>
                  <Input
                    id="children"
                    type="number"
                    min={0}
                    max={10}
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="infants" className="flex items-center gap-1 mb-1.5">
                    Number of Infants (1-5 years)
                  </Label>
                  <Input
                    id="infants"
                    type="number"
                    min={0}
                    max={5}
                    value={infants}
                    onChange={(e) => setInfants(parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Infants travel free</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Tour Cost Estimate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Rate ({hotelCategory}):</span>
                    <span className="font-medium">{formatCurrency(chosenPPPD)} PPPD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost for First Adult ({nights} nights):</span>
                    <span className="font-medium">{formatCurrency(costOneAdult)}</span>
                  </div>
                  {adults > 1 && (
                    <div className="flex justify-between">
                      <span>Cost for {adults - 1} Additional Adult(s):</span>
                      <span className="font-medium">{formatCurrency(costOneAdult * ADULT_ADDITIONAL_FACTOR * (adults - 1))}</span>
                    </div>
                  )}
                  {children > 0 && (
                    <div className="flex justify-between">
                      <span>Cost for {children} Children:</span>
                      <span className="font-medium">{formatCurrency(costOneAdult * CHILD_FACTOR * children)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Estimated Cost:</span>
                    <span className="text-primary">{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Cost Per Person:</span>
                    <span className="font-semibold">{formatCurrency(perPersonCost)}</span>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Inclusions:</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5 mb-4">
                    <li>Accommodation in {hotelCategory} hotels</li>
                    <li>Daily Breakfast</li>
                    <li>Airport Transfers (Pick-up & Drop-off)</li>
                  </ul>
                  
                  <h4 className="font-medium mb-2">Exclusions:</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>International Return Airfare</li>
                    <li>Visa Fees & Travel Insurance</li>
                    <li>Sightseeing & Local Transportation</li>
                    <li>Monument Entry Fees & Activity Tickets</li>
                    <li>Lunches, Dinners & Beverages</li>
                    <li>Personal Expenses (Tips, Shopping, etc.)</li>
                    <li>Anything not mentioned under 'Inclusions'</li>
                  </ul>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    This is an indicative estimate only. Prices may vary based on the specific destination, travel dates, 
                    availability, and final itinerary. Please contact us for a detailed, customized quote.
                  </p>
                </div>
              </div>
            </div>

            {showQueryForm ? (
              <DestinationQueryForm 
                destinationName={`International Tour - ${destination} (${nights} nights)`} 
                buttonText="Get Customized Quote"
                buttonVariant="default"
                className="w-full mt-6"
              />
            ) : (
              <Button type="submit" className="w-full mt-6">
                Get Customized Quote
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
