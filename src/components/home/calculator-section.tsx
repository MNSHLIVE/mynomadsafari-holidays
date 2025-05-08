
import { useState } from "react";
import SectionHeading from "@/components/section-heading";
import PackageCalculator from "@/components/package-calculator";
import InternationalTourCalculator from "@/components/international-tour-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CalculatorSection = () => {
  const [activeTab, setActiveTab] = useState("domestic");
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);

  const handleQuoteRequest = () => {
    setIsThankYouVisible(true);
    
    // Hide thank you message after 8 seconds
    setTimeout(() => {
      setIsThankYouVisible(false);
    }, 8000);
  };

  return (
    <section className="section-padding bg-muted/30 py-16" id="calculator-section">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Plan Your Perfect Trip"
          subtitle="Use our calculators to estimate your travel costs"
          tag="Tour Calculators"
        />
        
        {isThankYouVisible && (
          <div className="mb-8">
            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle className="h-5 w-5 text-primary" />
              <AlertTitle className="text-lg font-medium mb-2">Thank you for choosing My Nomadsafari Holidays!</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  We've received your inquiry and our travel experts will contact you shortly with a detailed itinerary and quote.
                </p>
                <p className="text-sm text-muted-foreground">
                  We look forward to serving you and creating an unforgettable travel experience.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        <Tabs 
          defaultValue="domestic" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="domestic">Domestic Tour Calculator</TabsTrigger>
              <TabsTrigger value="international">International Tour Estimator</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="domestic" className="mt-0">
            <PackageCalculator 
              className="max-w-4xl mx-auto"
              onRequestQuote={handleQuoteRequest}
            />
          </TabsContent>
          
          <TabsContent value="international" className="mt-0">
            <InternationalTourCalculator 
              className="max-w-4xl mx-auto" 
              onRequestQuote={handleQuoteRequest}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CalculatorSection;
