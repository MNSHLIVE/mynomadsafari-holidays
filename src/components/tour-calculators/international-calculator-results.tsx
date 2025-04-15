
import { HotelCategory, TourRegion } from "../tour-itineraries/types";
import { Check, X } from "lucide-react";

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
  hotelCategory,
}: InternationalCalculatorResultsProps) => {
  return (
    <div className="mt-6 p-5 bg-muted/30 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Tour Cost Estimate</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Estimated for {destination} ({region})
      </p>
      
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Estimated Cost:</p>
          <p className="text-2xl font-bold">₹{totalCost.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Cost Per Person:</p>
          <p className="text-2xl font-bold">₹{perPersonCost.toLocaleString()}</p>
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
            {region === "europe" ? (
              <>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Accommodation in {hotelCategory} hotels</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Daily breakfast at the hotel</span>
                </li>
                <li className="flex items-start font-medium">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Private airport transfers (arrival & departure)</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Accommodation in standard hotels</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Daily breakfast</span>
                </li>
                <li className="flex items-start font-medium">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Private airport transfers (arrival & departure)</span>
                </li>
              </>
            )}
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
              <span>International return airfare</span>
            </li>
            <li className="flex items-start">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <span>Visa fees & travel insurance</span>
            </li>
            <li className="flex items-start">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <span>All sightseeing & local transportation</span>
            </li>
            <li className="flex items-start">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <span>Monument entry fees & activity tickets</span>
            </li>
            <li className="flex items-start">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <span>Lunches, dinners & beverages</span>
            </li>
            <li className="flex items-start">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <span>Personal expenses (tips, shopping, etc.)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-muted-foreground italic">
        <p>This is an indicative estimate only. Prices may vary based on specific destination, travel dates, availability, hotel selection and final itinerary. Please contact us for a detailed, customized quote.</p>
      </div>
    </div>
  );
};

export default InternationalCalculatorResults;
