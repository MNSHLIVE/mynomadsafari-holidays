
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InternationalTourForm from "./international-tour-form";
import InternationalTourResults from "./international-tour-results";

interface InternationalTourCalculatorProps {
  className?: string;
  onRequestQuote?: (details: any) => void;
}

const InternationalTourCalculator = ({
  className,
  onRequestQuote,
}: InternationalTourCalculatorProps) => {
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

  // Calculation logic
  const calculateCost = () => {
    const baseRate3Star = 20000;
    const multiplier4Star = 1.5;
    const multiplier5Star = 2.5;
    let chosenPPPD = baseRate3Star;
    if (hotelCategory === "4-Star") {
      chosenPPPD = baseRate3Star * multiplier4Star;
    } else if (hotelCategory === "5-Star") {
      chosenPPPD = baseRate3Star * multiplier5Star;
    }
    const costOneAdult = chosenPPPD * nights;
    let calculatedTotalCost = 0;
    if (adults >= 1) {
      calculatedTotalCost = costOneAdult;
    }
    if (adults > 1) {
      calculatedTotalCost += costOneAdult * 0.35 * (adults - 1);
    }
    calculatedTotalCost += costOneAdult * 0.25 * children;
    const totalPayingPersons = adults + children;
    let calculatedPerPersonCost = 0;
    if (totalPayingPersons > 0) {
      calculatedPerPersonCost = calculatedTotalCost / totalPayingPersons;
    }
    setTotalCost(Math.round(calculatedTotalCost));
    setPerPersonCost(Math.round(calculatedPerPersonCost));
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCost();
    window.scrollTo({
      top: document.getElementById("results")?.offsetTop,
      behavior: "smooth",
    });
  };

  const handleGetDetailedQuote = () => {
    if (onRequestQuote) {
      onRequestQuote({
        destination,
        adults,
        children,
        days: nights,
        estimatedPrice: formatCurrency(totalCost),
        nights,
        infants,
        hotelCategory,
        perPersonCost: formatCurrency(perPersonCost),
      });
    } else {
      setShowQuery(true);
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            International Tour Cost Estimator
          </h3>
          <InternationalTourForm
            destination={destination}
            nights={nights}
            adults={adults}
            children={children}
            infants={infants}
            hotelCategory={hotelCategory}
            setDestination={setDestination}
            setNights={setNights}
            setAdults={setAdults}
            setChildren={setChildren}
            setInfants={setInfants}
            setHotelCategory={setHotelCategory}
            onSubmit={handleSubmit}
          />
          <InternationalTourResults
            showResults={showResults}
            showQuery={showQuery}
            hotelCategory={hotelCategory}
            totalCost={totalCost}
            perPersonCost={perPersonCost}
            formatCurrency={formatCurrency}
            onGetDetailedQuote={handleGetDetailedQuote}
            setShowQuery={setShowQuery}
            destination={destination}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;

