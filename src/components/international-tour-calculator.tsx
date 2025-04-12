
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
import { 
  AlertCircle,
  Check, 
  IndianRupee
} from "lucide-react";
import DestinationQueryForm from "./destination-query-form";
import { HotelCategory, TourRegion } from "./tour-itineraries/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface InternationalTourCalculatorProps {
  className?: string;
}

// Constants for pricing logic
const BASE_RATE_EUROPE_3STAR = 20000; // INR per person per day
const BASE_RATE_SOUTH_ASIA_DUBAI = 15000; // INR for 2 adults for entire trip
const MULTIPLIER_4STAR = 1.5;
const MULTIPLIER_5STAR = 2.5;
const ADDITIONAL_ADULT_COST = 5000; // For South Asia/Dubai, per additional adult
const CHILD_COST = 3500; // For South Asia/Dubai, per child

const REGION_NAMES: Record<TourRegion, string> = {
  europe: "Europe",
  southAsiaDubai: "South Asia/Dubai"
};

const REGION_DESTINATIONS: Record<TourRegion, Record<string, string>> = {
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

const InternationalTourCalculator = ({ className }: InternationalTourCalculatorProps) => {
  const [region, setRegion] = useState<TourRegion>("europe");
  const [destination, setDestination] = useState<string>("france");
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>("3-Star");
  const [totalCost, setTotalCost] = useState(0);
  const [perPersonCost, setPerPersonCost] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDestinations, setAvailableDestinations] = useState<Record<string, string>>(REGION_DESTINATIONS.europe);

  // Update destinations when region changes
  useEffect(() => {
    setAvailableDestinations(REGION_DESTINATIONS[region]);
    // Set first destination of the region as default
    const destinationKeys = Object.keys(REGION_DESTINATIONS[region]);
    setDestination(destinationKeys[0]);
  }, [region]);

  const validateInputs = (): boolean => {
    if (adults < 2) {
      setError("Minimum booking size is 2 adults");
      return false;
    }
    
    if (nights < 1) {
      setError("Number of nights must be at least 1");
      return false;
    }
    
    setError(null);
    return true;
  };

  const calculateCost = () => {
    if (!validateInputs()) {
      return;
    }

    let calculatedTotalCost = 0;
    let calculatedPerPersonCost = 0;

    // Calculate based on region
    if (region === "europe") {
      // Get chosen rate based on hotel category
      let chosenRatePerPersonPerDay = BASE_RATE_EUROPE_3STAR;
      
      if (hotelCategory === "4-Star") {
        chosenRatePerPersonPerDay = BASE_RATE_EUROPE_3STAR * MULTIPLIER_4STAR;
      } else if (hotelCategory === "5-Star") {
        chosenRatePerPersonPerDay = BASE_RATE_EUROPE_3STAR * MULTIPLIER_5STAR;
      }
      
      // Calculate cost for one adult
      const costOneAdult = chosenRatePerPersonPerDay * nights;
      
      // Calculate total cost: all adults at full price
      calculatedTotalCost = costOneAdult * adults;
      
      // Add cost for children (25% of adult cost)
      calculatedTotalCost += costOneAdult * 0.25 * children;
      
    } else { // southAsiaDubai
      // Base cost includes 2 adults for the entire stay
      calculatedTotalCost = BASE_RATE_SOUTH_ASIA_DUBAI;
      
      // Add cost for additional adults beyond the first two
      if (adults > 2) {
        calculatedTotalCost += (adults - 2) * ADDITIONAL_ADULT_COST;
      }
      
      // Add cost for children
      calculatedTotalCost += children * CHILD_COST;
    }
    
    // Calculate per-person cost
    const totalPayingPersons = adults + children;
    calculatedPerPersonCost = totalPayingPersons > 0 ? calculatedTotalCost / totalPayingPersons : 0;
    
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
    calculateCost();
    window.scrollTo({ top: document.getElementById("results")?.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">International Tour Cost Estimator</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-2 block">Destination Region</Label>
                <RadioGroup
                  value={region}
                  onValueChange={(value) => setRegion(value as TourRegion)}
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
                          {region === "europe" ? (
                            <>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Accommodation in {hotelCategory} Hotel</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Daily Breakfast at the hotel</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Accommodation. Standard type hotels can be updated</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Daily Breakfast</span>
                              </li>
                            </>
                          )}
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span><strong>Private Airport Transfers</strong> (Pick-up on arrival, Drop-off on departure)</span>
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
                          <li className="flex items-start text-sm">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Anything not mentioned under 'Inclusions'</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="text-sm text-muted-foreground italic">
                    <p>Disclaimer: This is an indicative estimate only. Prices may vary based on the specific destination, travel dates, availability, hotel selection and final itinerary. Please contact us for a detailed, customized quote.</p>
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
