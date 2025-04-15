
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

interface InternationalTourCalculatorProps {
  className?: string;
}

const InternationalTourCalculator = ({ className }: InternationalTourCalculatorProps) => {
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelCategory, setHotelCategory] = useState("3-Star");
  const [totalCost, setTotalCost] = useState(0);
  const [perPersonCost, setPerPersonCost] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showQuery, setShowQuery] = useState(false);

  const calculateCost = () => {
    // Base rates
    const baseRate3Star = 20000; // INR
    const multiplier4Star = 1.5;
    const multiplier5Star = 2.5;
    
    // Calculate PPPD based on hotel choice
    let chosenPPPD = baseRate3Star;
    if (hotelCategory === "4-Star") {
      chosenPPPD = baseRate3Star * multiplier4Star;
    } else if (hotelCategory === "5-Star") {
      chosenPPPD = baseRate3Star * multiplier5Star;
    }
    
    // Calculate cost for one adult
    const costOneAdult = chosenPPPD * nights;
    
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
            
            <Button type="submit" className="w-full mt-6">Calculate Estimate</Button>
          </form>
          
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
                      destinationName={destination || "International Tour"} 
                      buttonText="Submit Query"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
