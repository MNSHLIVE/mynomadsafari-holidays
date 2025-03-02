
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, IndianRupee, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface TourCardProps {
  imageSrc: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  bestTime?: string;
  packageType?: "Budgeted" | "Luxury" | "Premier";
  link?: string;
  className?: string;
  description?: string;
  itinerary?: Array<{day: number, title: string, description: string}>;
}

const TourCard = ({
  imageSrc,
  title,
  location,
  duration,
  price,
  bestTime,
  packageType = "Budgeted",
  link = "#",
  className,
  description,
  itinerary,
}: TourCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const packageColors = {
    Budgeted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Luxury: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Premier: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };

  // Function to get a preview of the itinerary (first day only)
  const getItineraryPreview = () => {
    if (!itinerary || itinerary.length === 0) return null;
    return itinerary[0];
  };

  const itineraryPreview = getItineraryPreview();

  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl card-hover relative flex flex-col bg-card shadow-sm border border-border/50",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gray-200",
          isLoaded ? "hidden" : "block"
        )} />
        <img
          src={imageSrc}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            isLoaded ? "block" : "invisible"
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            packageColors[packageType]
          )}>
            {packageType}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-primary" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1 text-primary" />
            <span>{duration}</span>
          </div>
          {bestTime && (
            <div className="flex items-center col-span-2">
              <Calendar className="w-3 h-3 mr-1 text-primary" />
              <span>Best time: {bestTime}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        )}

        {itineraryPreview && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <FileText className="w-3 h-3 mr-1 text-primary" />
              Day 1: {itineraryPreview.title}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {itineraryPreview.description}
            </p>
          </div>
        )}

        {itinerary && itinerary.length > 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mb-3 mt-auto">
                View Full Itinerary
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{title} - Full Itinerary</DialogTitle>
                <DialogDescription>Day-by-day plan for your journey</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {itinerary.map((day) => (
                  <div key={day.day} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-semibold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mr-2">
                        {day.day}
                      </span>
                      {day.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Request Detailed PDF</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-1 text-primary" />
              <span className="font-semibold">{price}</span>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>

          <Link to={link}>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
