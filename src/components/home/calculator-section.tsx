
import SectionHeading from "@/components/section-heading";
import PackageCalculator from "@/components/package-calculator";

const CalculatorSection = () => {
  return (
    <section className="section-padding bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Plan Your Perfect Trip"
          subtitle="Use our package calculator to estimate your travel costs"
          tag="Tour Calculator"
        />
        
        <PackageCalculator className="max-w-4xl mx-auto" />
      </div>
    </section>
  );
};

export default CalculatorSection;
