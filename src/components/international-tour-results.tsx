
import { IndianRupee, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationQueryForm from "./destination-query-form";
import InternationalPackageDetails from "./international-package-details";

interface InternationalTourResultsProps {
  showResults: boolean;
  showQuery: boolean;
  hotelCategory: string;
  totalCost: number;
  perPersonCost: number;
  formatCurrency: (amount: number) => string;
  onGetDetailedQuote: () => void;
  setShowQuery: (b: boolean) => void;
  destination: string;
}

const InternationalTourResults = ({
  showResults,
  showQuery,
  hotelCategory,
  totalCost,
  perPersonCost,
  formatCurrency,
  onGetDetailedQuote,
  setShowQuery,
  destination,
}: InternationalTourResultsProps) => {
  if (!showResults) return null;

  return (
    <div id="results" className="mt-8 p-6 border rounded-lg bg-muted/30">
      <h4 className="text-lg font-medium mb-4">Your Estimated Costs</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-background rounded-lg border">
          <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
          <p className="text-2xl font-bold flex items-center">
            <IndianRupee className="h-5 w-5 mr-1" />
            {formatCurrency(totalCost).replace("₹", "")}
          </p>
        </div>
        <div className="p-4 bg-background rounded-lg border">
          <p className="text-sm text-muted-foreground">Cost Per Person</p>
          <p className="text-2xl font-bold flex items-center">
            <IndianRupee className="h-5 w-5 mr-1" />
            {formatCurrency(perPersonCost).replace("₹", "")}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <InternationalPackageDetails hotelCategory={hotelCategory} />
        <div className="text-sm text-muted-foreground italic">
          <p>
            Disclaimer: This is an indicative estimate only. Prices may vary
            based on the specific destination, travel dates, availability, and
            final itinerary.
          </p>
        </div>
        <div className="pt-4 mt-2">
          {!showQuery ? (
            <Button
              className="w-full"
              variant="default"
              onClick={onGetDetailedQuote}
            >
              Get Detailed Quote
            </Button>
          ) : (
            <DestinationQueryForm
              destinationName={destination || "International Tour"}
              buttonText="Submit Query"
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InternationalTourResults;
