
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HotelCategory, TourRegion } from "../tour-itineraries/types";
import { calculateTourCost } from "./international-calculator-utils";
import InternationalCalculatorForm from "./international-calculator-form";
import InternationalCalculatorResults from "./international-calculator-results";

interface InternationalTourCalculatorProps {
  className?: string;
}

const InternationalTourCalculator = ({ className }: InternationalTourCalculatorProps) => {
  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    totalCost: 0,
    perPersonCost: 0
  });
  const [calculationParams, setCalculationParams] = useState({
    region: "europe" as TourRegion,
    destination: "france",
    hotelCategory: "3-Star" as HotelCategory
  });

  const handleFormSubmit = (formData: {
    region: TourRegion;
    destination: string;
    nights: number;
    adults: number;
    children: number;
    infants: number;
    hotelCategory: HotelCategory;
  }) => {
    const { totalCost, perPersonCost } = calculateTourCost({
      region: formData.region,
      nights: formData.nights,
      adults: formData.adults,
      children: formData.children,
      hotelCategory: formData.hotelCategory
    });

    setCalculationResults({ totalCost, perPersonCost });
    setCalculationParams({
      region: formData.region,
      destination: formData.destination,
      hotelCategory: formData.hotelCategory
    });
    setShowResults(true);
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">International Tour Cost Estimator</h3>
          
          <InternationalCalculatorForm onSubmit={handleFormSubmit} />
          
          {showResults && (
            <InternationalCalculatorResults 
              totalCost={calculationResults.totalCost}
              perPersonCost={calculationResults.perPersonCost}
              region={calculationParams.region}
              destination={calculationParams.destination}
              hotelCategory={calculationParams.hotelCategory}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
