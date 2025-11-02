
import { IndianRupee, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import InternationalPackageDetails from "./international-package-details";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InternationalTourResultsProps {
  showResults: boolean;
  hotelCategory: string;
  totalCost: number;
  perPersonCost: number;
  formatCurrency: (amount: number) => string;
  destination: string;

  // Contact information props
  name: string;
  email: string;
  phone: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmitQuote: () => void;

  // Added missing props to fix type error
  departureCity: string;
  arrivalCity: string;
  departureDate: Date | null;
  returnDate: Date | null;
  tripType: string;
}

const InternationalTourResults = ({
  showResults,
  hotelCategory,
  totalCost,
  perPersonCost,
  formatCurrency,
  destination,
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  isSubmitting,
  isSubmitted,
  onSubmitQuote,
}: InternationalTourResultsProps) => {
  if (!showResults) return null;

  if (isSubmitted) {
    return (
      <div id="results" className="mt-8 p-6 border rounded-lg bg-muted/30">
        <Alert className="bg-primary/5 border-primary/20">
          <Check className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg font-semibold mb-3">
            Thank You! Your Estimated Cost: {formatCurrency(totalCost)}
          </AlertTitle>
          <AlertDescription className="space-y-3">
            <p className="font-medium">
              We've received your inquiry for <span className="text-primary">{destination || "International Tour"}</span>
            </p>
            <div className="bg-background/60 p-4 rounded-md border space-y-2">
              <p className="font-medium text-base">Total: {formatCurrency(totalCost)}</p>
              <p className="text-sm">Per Person: {formatCurrency(perPersonCost)}</p>
              <p className="text-sm text-muted-foreground italic">*Tentative cost subject to customization</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md border">
              <p className="font-medium mb-2">📧 Please check your email at: <span className="text-primary">{email}</span></p>
              <ul className="text-sm space-y-1.5 ml-4">
                <li>✓ Complete international package details</li>
                <li>✓ Best available rates discussion</li>
                <li>✓ Visa assistance information</li>
                <li>✓ Flexible payment options</li>
              </ul>
            </div>
            <p className="text-sm">
              <strong>Our international tour specialists will contact you within 24 hours</strong> to provide the best rates and create your dream vacation!
            </p>
            <p className="text-xs text-muted-foreground">
              Need immediate assistance? Feel free to contact us directly.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
        
        <div className="bg-background p-4 rounded-lg border mt-6">
          <h5 className="font-medium mb-3">Complete your inquiry</h5>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your contact details to receive a detailed itinerary
          </p>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="mb-1.5">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="mb-1.5">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="mb-1.5">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="Your contact number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <Button 
              className="w-full mt-2" 
              disabled={isSubmitting}
              onClick={onSubmitQuote}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                "Get Detailed Quote"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalTourResults;
