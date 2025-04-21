import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, IndianRupee, FileText, CheckCircle } from "lucide-react";
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
import DestinationQueryForm from "./destination-query-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [imageError, setImageError] = useState(false);
  const [isItineraryDialogOpen, setIsItineraryDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);

  const packageColors = {
    Budgeted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Luxury: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Premier: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };

  const getItineraryPreview = () => {
    if (!itinerary || itinerary.length === 0) return null;
    return itinerary[0];
  };

  const itineraryPreview = getItineraryPreview();

  const formatPrice = (priceString: string) => {
    if (priceString.includes('₹')) return priceString;
    const priceNumber = typeof priceString === 'string' ? Number(priceString) : NaN;
    if (!isNaN(priceNumber)) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(priceNumber);
    }
    return priceString;
  };
  
  const handleBookingSubmitted = () => {
    setIsDetailDialogOpen(false);
    setIsThankYouVisible(true);
    
    // Hide thank you message after 8 seconds
    setTimeout(() => {
      setIsThankYouVisible(false);
    }, 8000);
  };
  
  // Fallback image for when loading fails
  const fallbackImageSrc = "/placeholder.svg";

  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl card-hover relative flex flex-col bg-card shadow-sm border border-border/50",
        className
      )}
    >
      {isThankYouVisible && (
        <div className="absolute inset-0 z-30 bg-background/95 flex items-center justify-center p-4">
          <Alert className="bg-primary/5 border-primary/20 max-w-xs">
            <CheckCircle className="h-5 w-5 text-primary" />
            <AlertTitle className="text-base font-medium">Thank you for choosing My Nomadsafari Holidays!</AlertTitle>
            <AlertDescription className="text-sm">
              We've received your inquiry for {title}. Our team will contact you shortly with a detailed itinerary.
            </AlertDescription>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3" 
              onClick={() => setIsThankYouVisible(false)}
            >
              Close
            </Button>
          </Alert>
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gray-200",
          isLoaded && !imageError ? "hidden" : "block"
        )} />
        <img
          src={imageError ? fallbackImageSrc : imageSrc}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            isLoaded && !imageError ? "block" : "invisible"
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImageError(true);
            setIsLoaded(true);
          }}
          loading="lazy"
          decoding="async"
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
          <Dialog open={isItineraryDialogOpen} onOpenChange={setIsItineraryDialogOpen}>
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
              <span className="font-semibold">{formatPrice(price)}</span>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>

          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img 
                    src={imageSrc} 
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      packageColors[packageType]
                    )}>
                      {packageType}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{duration}</span>
                    </div>
                    {bestTime && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Best time: {bestTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                )}
                
                {itinerary && itinerary.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Itinerary</h3>
                    <div className="space-y-4">
                      {itinerary.map((day) => (
                        <div key={day.day} className="p-4 border rounded-lg">
                          <h4 className="font-medium flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mr-2">
                              {day.day}
                            </span>
                            {day.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between pt-4 border-t">
                  <p className="text-xl font-semibold">{formatPrice(price)}</p>
                  <DestinationQueryForm 
                    destinationName={title}
                    buttonText="Book Now"
                    onFormSubmitted={handleBookingSubmitted}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
