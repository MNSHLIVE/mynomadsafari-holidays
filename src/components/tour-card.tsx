
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin, Calendar, Clock, BadgeIndianRupee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import DestinationQueryForm from "@/components/destination-query-form";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { PackageType } from "@/components/tours/data/tour-core";

interface TourCardProps {
  imageSrc: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  bestTime: string;
  packageType: PackageType;
  description?: string;
  itinerary?: Array<{day: number, title: string, description: string}>;
  link?: string;
  className?: string;
  eager?: boolean; // Add eager prop for image loading
}

const TourCard = ({
  imageSrc,
  title,
  location,
  duration,
  price,
  bestTime,
  packageType,
  description,
  itinerary,
  link = "/tours", // Default link if none provided
  className = "",
  eager = false, // Default to false
}: TourCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to determine badge variant based on package type
  const getPackageVariant = (packageType: PackageType) => {
    switch(packageType) {
      case "Luxury":
        return "default"; // Using default variant with amber styling
      case "Premier":
        return "secondary"; // Using secondary variant for purple
      default:
        return "outline"; // Default style for Budgeted
    }
  };
  
  return (
    <>
      <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img 
              src={imageSrc} 
              alt={title} 
              className="object-cover w-full h-full transition-all hover:scale-105 duration-300"
              loading={eager ? "eager" : "lazy"} // Use eager or lazy loading based on prop
            />
          </AspectRatio>
          <div className="absolute top-3 right-3">
            <Badge 
              variant={getPackageVariant(packageType)}
              className="font-medium opacity-90"
            >
              {packageType}
            </Badge>
          </div>
        </div>
        
        <CardContent className="pt-5">
          <div className="mb-3">
            <h3 className="font-bold text-xl truncate">{title}</h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 my-3 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{price}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Best Time: {bestTime}</span>
            </div>
          </div>
          
          {description && (
            <div className="my-3">
              <div className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
                {description}
              </div>
              {description.length > 100 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto mt-1 text-primary"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <span className="flex items-center">Read Less <ChevronUp className="ml-1 h-4 w-4" /></span>
                  ) : (
                    <span className="flex items-center">Read More <ChevronDown className="ml-1 h-4 w-4" /></span>
                  )}
                </Button>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <DestinationQueryForm 
              destinationName={title}
              buttonText="Enquire Now"
              buttonClassName="h-9"
            />
            
            {itinerary && itinerary.length > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(true)}
              >
                View Itinerary
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {itinerary && itinerary.length > 0 && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{title} - Itinerary</DialogTitle>
              <DialogDescription>Complete day-by-day plan</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {itinerary.map((day) => (
                <div key={day.day} className="border-b pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold mb-2 text-lg">
                    Day {day.day}: {day.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{day.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between">
              <DestinationQueryForm 
                destinationName={title}
                buttonText="Book This Itinerary"
              />
              
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TourCard;
