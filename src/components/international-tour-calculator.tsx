
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, IndianRupee } from "lucide-react";
import DestinationQueryForm from "./destination-query-form";
import { HotelCategory, TourRegion, RegionDestination, TourPricingData } from "./tour-itineraries/types";

interface InternationalTourCalculatorProps {
  className?: string;
}

const PRICING_DATA: TourPricingData = {
  // Southeast Asia (Base rate: Thailand. Others adjust +/- %)
  southeastAsia: {
    thailand: { "3-Star": 3500, "4-Star": 5250, "5-Star": 8750 },
    bali: { "3-Star": 3150, "4-Star": 4725, "5-Star": 7875 },     // 10% cheaper
    vietnam: { "3-Star": 3150, "4-Star": 4725, "5-Star": 7875 },   // 10% cheaper
    malaysia: { "3-Star": 4200, "4-Star": 6300, "5-Star": 10500 }, // 20% costlier
    singapore: { "3-Star": 4200, "4-Star": 6300, "5-Star": 10500 } // 20% costlier
  },
  // Europe (Base rate: France. Switzerland +25%, Italy neutral)
  europe: {
    france: { "3-Star": 8000, "4-Star": 12000, "5-Star": 20000 },
    switzerland: { "3-Star": 10000, "4-Star": 15000, "5-Star": 25000 }, // +25%
    italy: { "3-Star": 8000, "4-Star": 12000, "5-Star": 20000 },
    spain: { "3-Star": 7200, "4-Star": 10800, "5-Star": 18000 }, // 10% cheaper
    uk: { "3-Star": 9600, "4-Star": 14400, "5-Star": 24000 }, // 20% costlier
  },
  // Middle East
  dubai: {
    dubai: { "3-Star": 6000, "4-Star": 9000, "5-Star": 15000 }
  },
  // Maldives (Premium pricing)
  maldives: {
    maldives: { "3-Star": 8000, "4-Star": 12000, "5-Star": 20000 }
  }
};

const REGION_NAMES: Record<TourRegion, string> = {
  southeastAsia: "Southeast Asia",
  europe: "Europe",
  dubai: "Dubai",
  maldives: "Maldives"
};

const REGION_DESTINATIONS: Record<TourRegion, RegionDestination> = {
  southeastAsia: {
    thailand: "Thailand",
    bali: "Bali",
    vietnam: "Vietnam",
    malaysia: "Malaysia",
    singapore: "Singapore"
  },
  europe: {
    france: "France",
    switzerland: "Switzerland",
    italy: "Italy",
    spain: "Spain",
    uk: "United Kingdom"
  },
  dubai: {
    dubai: "Dubai"
  },
  maldives: {
    maldives: "Maldives"
  }
};

const InternationalTourCalculator = ({ className }: InternationalTourCalculatorProps) => {
  const [region, setRegion] = useState<TourRegion>("southeastAsia");
  const [destination, setDestination] = useState<string>("thailand");
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>("3-Star");
  const [totalCost, setTotalCost] = useState(0);
  const [perPersonCost, setPerPersonCost] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [availableDestinations, setAvailableDestinations] = useState<RegionDestination>(REGION_DESTINATIONS.southeastAsia);

  // Update destinations when region changes
  useEffect(() => {
    setAvailableDestinations(REGION_DESTINATIONS[region]);
    // Set first destination of the region as default
    const destinationKeys = Object.keys(REGION_DESTINATIONS[region]);
    setDestination(destinationKeys[0]);
  }, [region]);

  const calculateCost = () => {
    // Get base rate for selected destination and hotel category
    const baseRate = PRICING_DATA[region][destination][hotelCategory];
    
    // Calculate cost for one adult
    const costOneAdult = baseRate * nights;
    
    // Calculate total group cost
    let calculatedTotalCost = 0;
    
    // First adult pays full price
    if (adults >= 1) {
      calculatedTotalCost = costOneAdult;
    }
    
    // Additional adults pay 35% of first adult
    if (adults > 1) {
      calculatedTotalCost += costOneAdult * 0.35 * (adults - 1);
    }
    
    // Children pay 25% of first adult
    calculatedTotalCost += costOneAdult * 0.25 * children;
    
    // Infants are free
    
    // Calculate per person cost
    const totalPayingPersons = adults + children;
    let calculatedPerPersonCost = 0;
    
    if (totalPayingPersons > 0) {
      calculatedPerPersonCost = calculatedTotalCost / totalPayingPersons;
    }
    
    // Update state
    setTotalCost(Math.round(calculatedTotalCost));
    setPerPersonCost(Math.round(calculatedPerPersonCost));
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCost();
    window.scrollTo({ top: document.getElementById("results")?.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">International Tour Cost Estimator</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={region} 
                  onValueChange={(value) => setRegion(value as TourRegion)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(REGION_NAMES).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select 
                  value={destination} 
                  onValueChange={setDestination}
                  disabled={Object.keys(availableDestinations).length <= 1}
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
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
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
              
              <div className="md:col-span-2">
                <Button type="submit" className="w-full mt-2">Calculate Estimate</Button>
              </div>
            </div>
            
            {showResults && (
              <div id="results" className="mt-8 p-6 border rounded-lg bg-muted/30">
                <h4 className="text-lg font-medium mb-4">Your Estimated Costs</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
                    <p className="text-2xl font-bold flex items-center">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {formatCurrency(totalCost).replace('₹', '')}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="text-sm text-muted-foreground">Cost Per Person</p>
                    <p className="text-2xl font-bold flex items-center">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {formatCurrency(perPersonCost).replace('₹', '')}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="inclusions">
                      <AccordionTrigger className="text-base font-medium">
                        Package Inclusions
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Accommodation in {hotelCategory} Hotel</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Daily Breakfast</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Airport Transfers (Pick-up on arrival, Drop-off on departure)</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Welcome Drink on Arrival</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>All Applicable Taxes</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="exclusions">
                      <AccordionTrigger className="text-base font-medium">
                        Package Exclusions
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-2">
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>International Return Airfare</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Visa Fees & Travel Insurance</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>All Sightseeing & Local Transportation (other than specified airport transfers)</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Monument Entry Fees & Activity Tickets</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Lunches, Dinners & Beverages</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Personal Expenses (Tips, Shopping, Laundry, etc.)</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="text-sm text-muted-foreground italic">
                    <p>Disclaimer: This is an indicative estimate only. Prices may vary based on the specific destination, travel dates, availability, and final itinerary.</p>
                  </div>
                  
                  <div className="pt-4 mt-2">
                    {!showQuery ? (
                      <Button 
                        className="w-full" 
                        variant="default" 
                        onClick={() => setShowQuery(true)}
                      >
                        Get Detailed Quote
                      </Button>
                    ) : (
                      <DestinationQueryForm 
                        destinationName={`${REGION_DESTINATIONS[region][destination]} Tour Package`}
                        buttonText="Submit Query"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
