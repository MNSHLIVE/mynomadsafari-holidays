
import { MapPin, Sun, Calendar, Tag } from "lucide-react";

interface DestinationInfoProps {
  region: string;
  bestTimeToVisit?: string;
  duration?: string;
  type?: string;
}

const DestinationInfo = ({ region, bestTimeToVisit, duration, type }: DestinationInfoProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center text-sm">
        <MapPin className="h-4 w-4 mr-1 text-primary" />
        <span>{region}</span>
      </div>
      {bestTimeToVisit && (
        <div className="flex items-center text-sm">
          <Sun className="h-4 w-4 mr-1 text-primary" />
          <span>Best time: {bestTimeToVisit}</span>
        </div>
      )}
      {duration && (
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 text-primary" />
          <span>Recommended stay: {duration}</span>
        </div>
      )}
      {type && (
        <div className="flex items-center text-sm">
          <Tag className="h-4 w-4 mr-1 text-primary" />
          <span>{type}</span>
        </div>
      )}
    </div>
  );
};

export default DestinationInfo;
