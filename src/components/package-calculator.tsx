
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface PackageCalculatorProps {
  className?: string;
}

const PackageCalculator = ({ className }: PackageCalculatorProps) => {
  const [distance, setDistance] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [passengers, setPassengers] = useState<number>(2);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [pricePerPerson, setPricePerPerson] = useState<number | null>(null);

  const calculatePackageCost = () => {
    // Base calculations
    const baseRate = 25; // Base rate per km
    const dayRate = 1000; // Base rate per day
    
    // Calculate base cost
    let totalCost = distance * baseRate + days * dayRate;
    
    // Add passenger cost
    if (passengers > 4) {
      totalCost += (passengers - 4) * 1000; // Extra cost per passenger beyond 4
    }
    
    // Adjust for longer trips
    if (days > 2) {
      totalCost *= 0.95; // 5% discount for trips longer than 2 days
    }
    
    // Calculate per person cost
    const perPersonCost = totalCost / passengers;
    
    setCalculatedPrice(Math.round(totalCost));
    setPricePerPerson(Math.round(perPersonCost));
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Domestic Tour Cost Calculator</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                min="0"
                placeholder="Total distance"
                value={distance || ""}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="days">Number of Days</Label>
              <Input
                id="days"
                type="number"
                min="1"
                placeholder="Trip duration"
                value={days || ""}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                placeholder="Number of travelers"
                value={passengers || ""}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <Button 
              onClick={calculatePackageCost}
              className="w-full sm:w-auto"
              disabled={!distance || !days || !passengers}
            >
              Calculate Tour Cost
            </Button>
          </div>
          
          {calculatedPrice !== null && pricePerPerson !== null && (
            <div className="mt-6 p-5 bg-muted/30 rounded-lg">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Package Cost:</p>
                  <p className="text-2xl font-bold">₹{calculatedPrice.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Cost Per Person:</p>
                  <p className="text-2xl font-bold">₹{pricePerPerson.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="font-semibold mb-2 flex items-center">
                    <span className="p-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full mr-2">
                      <Check className="w-4 h-4" />
                    </span>
                    Inclusions
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Private car with driver</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Fuel costs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Driver allowance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Toll taxes & parking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Pick up and drop from home</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-2 flex items-center">
                    <span className="p-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full mr-2">
                      <X className="w-4 h-4" />
                    </span>
                    Exclusions
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Accommodation</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Meals & beverages</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Entry tickets & activities</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Guide fees</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Personal expenses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-xs text-muted-foreground italic">
                <p>This is an indicative estimate only. Prices may vary based on vehicle type, route conditions, and specific requirements.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageCalculator;
