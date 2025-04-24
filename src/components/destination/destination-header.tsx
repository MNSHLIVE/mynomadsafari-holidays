
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface DestinationHeaderProps {
  name: string;
  region: string;
  image: string;
}

const DestinationHeader = ({ name, region, image }: DestinationHeaderProps) => {
  return (
    <div className="relative">
      <div className="h-64 md:h-80 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} in ${region}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full p-6">
        <div className="flex items-center text-white">
          <Button variant="ghost" size="sm" asChild className="mr-2 bg-black/40 hover:bg-black/60">
            <Link to="/destinations">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All Destinations
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>
        <p className="text-white/80 mt-2">{region}</p>
      </div>
    </div>
  );
};

export default DestinationHeader;
