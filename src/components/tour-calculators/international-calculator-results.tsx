
import { useState } from "react";
import { Check, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DestinationQueryForm from "../destination-query-form";
import { formatCurrency } from "./international-calculator-utils";
import { HotelCategory, TourRegion } from "../tour-itineraries/types";
import { REGION_DESTINATIONS } from "./international-calculator-form";

interface InternationalCalculatorResultsProps {
  totalCost: number;
  perPersonCost: number;
  region: TourRegion;
  destination: string;
  hotelCategory: HotelCategory;
}

const InternationalCalculatorResults = ({
  totalCost,
  perPersonCost,
  region,
  destination,
  hotelCategory
}: InternationalCalculatorResultsProps) => {
  const [showQuery, setShowQuery] = useState(false);
  
  return (
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
  );
};

export default InternationalCalculatorResults;
