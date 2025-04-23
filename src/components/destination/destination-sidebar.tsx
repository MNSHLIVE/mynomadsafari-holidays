
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DestinationSidebarProps {
  destinationName: string;
}

const DestinationSidebar = ({ destinationName }: DestinationSidebarProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Interested in {destinationName}?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Contact our travel experts to plan your perfect trip to {destinationName}.
      </p>
      <Button className="w-full" asChild>
        <Link to="/contact">Contact Us</Link>
      </Button>
      
      <div className="mt-8">
        <h4 className="font-medium mb-2">Highlights</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Customized itineraries
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Expert local guides
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Comfortable accommodations
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Convenient transportation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DestinationSidebar;
