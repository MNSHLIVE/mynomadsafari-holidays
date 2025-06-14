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
  // New fields for enhanced form
  const [destination, setDestination] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [tripType, setTripType] = useState("Round Trip");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

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
    // Validate required new fields
    if (!departureCity || !arrivalCity || !departureDate) {
      toast.error("Please fill Boarding, Destination, and Departure Date.");
      return;
    }
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
      // Use actual travel dates if provided
      const formattedDepartureDate = departureDate
        ? format(departureDate, 'yyyy-MM-dd')
        : null;
      const formattedReturnDate = returnDate
        ? format(returnDate, 'yyyy-MM-dd')
        : null;

      const requestData = {
        name,
        email,
        phone,
        destination_name: destination || arrivalCity || "International Tour",
        adults,
        children,
        package_type: hotelCategory,
        estimated_price: `₹${totalCost.toLocaleString('en-IN')}`,
        special_requirements: `International Tour Package: ${nights} nights, ${adults} adults, ${children} children, ${infants} infants, ${hotelCategory} hotels. Per person cost: ₹${perPersonCost.toLocaleString('en-IN')}`,
        travel_date: formattedDepartureDate || format(new Date(), 'yyyy-MM-dd'),
        departure_city: departureCity,
        arrival_city: arrivalCity,
        departure_date: formattedDepartureDate,
        return_date: tripType === "Round Trip" ? formattedReturnDate : null,
        trip_type: tripType,
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
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            tripType={tripType}
            departureDate={departureDate}
            returnDate={returnDate}
            nights={nights}
            adults={adults}
            children={children}
            infants={infants}
            hotelCategory={hotelCategory}
            setDestination={setDestination}
            setDepartureCity={setDepartureCity}
            setArrivalCity={setArrivalCity}
            setTripType={setTripType}
            setDepartureDate={setDepartureDate}
            setReturnDate={setReturnDate}
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
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            departureDate={departureDate}
            returnDate={returnDate}
            tripType={tripType}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTourCalculator;
