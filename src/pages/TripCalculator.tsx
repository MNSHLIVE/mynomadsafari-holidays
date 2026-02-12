
import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/section-heading";
import PackageCalculator from "@/components/package-calculator";
import InternationalTourCalculator from "@/components/international-tour-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SEOHead from "@/components/seo/seo-head";
import { createBreadcrumbSchema, createOrganizationSchema } from "@/components/seo/schema-data";

const TripCalculator = () => {
  const [activeTab, setActiveTab] = useState("domestic");
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);

  const handleQuoteRequest = () => {
    setIsThankYouVisible(true);
    setTimeout(() => {
      setIsThankYouVisible(false);
    }, 8000);
  };

  const seoData = {
    title: "Trip Calculator | Plan Your Perfect Tour Package | MyNomadSafariHolidays",
    description: "Calculate your trip cost instantly with our advanced tour package calculator. Get accurate estimates for domestic and international tours with detailed breakdowns.",
    keywords: "trip calculator, tour cost calculator, package cost estimator, travel budget calculator, India tour cost, international trip calculator",
    canonicalUrl: "https://www.mynomadsafariholidays.in/trip-calculator",
    ogImage: "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
    structuredData: [
      createOrganizationSchema(),
      createBreadcrumbSchema([
        { name: "Home", url: "https://www.mynomadsafariholidays.in/" },
        { name: "Trip Calculator", url: "https://www.mynomadsafariholidays.in/trip-calculator" }
      ])
    ]
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Back to Home</Link>
            </Button>
          </div>
          
          <SectionHeading
            title="Calculate Your Perfect Trip"
            subtitle="Get instant cost estimates for your dream vacation with our advanced calculators"
            tag="Trip Cost Calculator"
          />
          
          {isThankYouVisible && (
            <div className="mb-8 max-w-4xl mx-auto">
              <Alert className="bg-primary/5 border-primary/20">
                <CheckCircle className="h-5 w-5 text-primary" />
                <AlertTitle className="text-lg font-semibold mb-2">Thank you for choosing My Nomadsafari Holidays!</AlertTitle>
                <AlertDescription className="space-y-3">
                  <p className="font-medium">We've received your inquiry and calculated your tentative trip cost.</p>
                  <div className="bg-background/50 p-3 rounded-md border">
                    <p className="font-medium mb-2">📧 Please check your email for:</p>
                    <ul className="text-sm space-y-1.5 ml-4">
                      <li>✓ Detailed itinerary with day-wise plans</li>
                      <li>✓ Best rate discussion with our experts</li>
                      <li>✓ Complete quote breakdown</li>
                      <li>✓ Customization options</li>
                    </ul>
                  </div>
                  <p className="text-sm">Our travel experts will contact you shortly to finalize your perfect trip and offer the best available rates!</p>
                  <p className="text-xs text-muted-foreground">We look forward to creating an unforgettable travel experience for you.</p>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <Tabs defaultValue="domestic" className="w-full max-w-4xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="domestic">Domestic Tour Calculator</TabsTrigger>
                <TabsTrigger value="international">International Tour Estimator</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="domestic" className="mt-0">
              <PackageCalculator className="max-w-4xl mx-auto" onRequestQuote={handleQuoteRequest} />
            </TabsContent>
            <TabsContent value="international" className="mt-0">
              <InternationalTourCalculator className="max-w-4xl mx-auto" onRequestQuote={handleQuoteRequest} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-background p-8 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Why Use Our Calculator?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div><h4 className="font-medium mb-2">Accurate Estimates</h4><p className="text-muted-foreground">Based on real market rates and our extensive experience</p></div>
                <div><h4 className="font-medium mb-2">Instant Results</h4><p className="text-muted-foreground">Get your cost breakdown in seconds, no waiting required</p></div>
                <div><h4 className="font-medium mb-2">Expert Support</h4><p className="text-muted-foreground">Our travel experts will refine your quote and create the perfect itinerary</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCalculator;
