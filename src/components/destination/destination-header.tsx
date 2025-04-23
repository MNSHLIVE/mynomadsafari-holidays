
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface DestinationHeaderProps {
  destinationName: string;
}

const DestinationHeader = ({ destinationName }: DestinationHeaderProps) => {
  return (
    <div className="bg-muted/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/destinations">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All Destinations
            </Link>
          </Button>
          <span className="text-muted-foreground">/ {destinationName}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationHeader;
