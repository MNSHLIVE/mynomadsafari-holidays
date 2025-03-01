
import { IndianRupee } from "lucide-react";

interface PackagePricingProps {
  type: "Budgeted" | "Luxury" | "Premier";
  className?: string;
}

const PackagePricing = ({ type, className }: PackagePricingProps) => {
  const prices = {
    "Budgeted": "₹21,000",
    "Luxury": "₹35,000",
    "Premier": "₹75,000"
  };

  return (
    <div className={className}>
      <div className="flex items-center">
        <IndianRupee className="h-4 w-4 mr-1 text-primary" />
        <span className="font-semibold">Starting from {prices[type]}</span>
      </div>
      <span className="text-xs text-muted-foreground">per person</span>
    </div>
  );
};

export default PackagePricing;
