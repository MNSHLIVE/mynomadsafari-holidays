
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InternationalTourForm from "./international-tour-form";
import InternationalTourResults from "./international-tour-results";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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
  
  // Contact information states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleQuoteSubmit = async () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all contact details");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Get the current date for travel_date
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      
      const requestData = {
        name,
        email,
        phone,
        destination_name: destination || "International Tour",
        adults,
        children,
        package_type: hotelCategory,
        estimated_price: `₹${totalCost.toLocaleString('en-IN')}`,
        special_requirements: `International Tour Package: ${nights} nights, ${adults} adults, ${children} children, ${infants} infants, ${hotelCategory} hotels. Per person cost: ₹${perPersonCost.toLocaleString('en-IN')}`,
        travel_date: formattedDate
      };
      
      console.log('[INTERNATIONAL_TOUR] Submitting data:', requestData);
      
      const { error } = await supabase.from('tour_package_requests').insert(requestData);
      
      if (error) {
        console.error("[INTERNATIONAL_TOUR] Error saving to Supabase:", error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      console.log('[INTERNATIONAL_TOUR] Successfully saved to database');
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      
      if (onRequestQuote) {
        onRequestQuote({
          ...requestData,
          days: nights,
          nights,
          infants,
          hotelCategory,
          perPersonCost: formatCurrency(perPersonCost),
        });
      }
    } catch (error: any) {
      console.error('[INTERNATIONAL_TOUR] Error in form submission:', error);
      setIsSubmitting(false);
      toast.error("Submission Error", {
        description: error.message || "Please try again or contact us directly by phone."
      });
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
            hotelCategory={hotelCategory}
            totalCost={totalCost}
            perPersonCost={perPersonCost}
            formatCurrency={formatCurrency}
            destination={destination}
            name={name}
            email={email}
            phone={phone}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            onSubmitQuote={handleQuoteSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
