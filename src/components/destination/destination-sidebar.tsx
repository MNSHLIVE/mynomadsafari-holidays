
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import DestinationQueryForm from "@/components/destination-query-form";

interface DestinationSidebarProps {
  name: string;
  region: string;
  bestTimeToVisit: string;
  budgetRange: {
    economy: string;
    standard: string;
    luxury: string;
  };
}

const DestinationSidebar = ({ name, region, bestTimeToVisit, budgetRange }: DestinationSidebarProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Interested in {name}?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Contact our travel experts to plan your perfect trip to {name}.
      </p>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Region</h4>
            <p className="text-sm text-muted-foreground">{region}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Best Time to Visit</h4>
            <p className="text-sm text-muted-foreground">{bestTimeToVisit}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Budget Range</h4>
            <ul className="text-sm text-muted-foreground">
              <li>Economy: {budgetRange.economy}</li>
              <li>Standard: {budgetRange.standard}</li>
              <li>Luxury: {budgetRange.luxury}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <DestinationQueryForm 
        destinationName={name}
        buttonText="Enquire Now"
        buttonClassName="w-full"
      />
    </div>
  );
};

export default DestinationSidebar;
