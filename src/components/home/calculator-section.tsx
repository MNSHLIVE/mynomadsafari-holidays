
import SectionHeading from "@/components/section-heading";
import PackageCalculator from "@/components/package-calculator";
import InternationalTourCalculator from "@/components/international-tour-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CalculatorSection = () => {
  return (
    <section className="section-padding bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Plan Your Perfect Trip"
          subtitle="Use our calculators to estimate your travel costs"
          tag="Tour Calculators"
        />
        
        <Tabs defaultValue="domestic" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="domestic">Domestic Tour Calculator</TabsTrigger>
              <TabsTrigger value="international">International Tour Estimator</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="domestic" className="mt-0">
            <PackageCalculator className="max-w-4xl mx-auto" />
          </TabsContent>
          
          <TabsContent value="international" className="mt-0">
            <InternationalTourCalculator className="max-w-4xl mx-auto" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CalculatorSection;
