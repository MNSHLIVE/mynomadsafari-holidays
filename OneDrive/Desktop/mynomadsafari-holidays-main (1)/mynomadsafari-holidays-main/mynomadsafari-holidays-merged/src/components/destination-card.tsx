import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingDialog } from "@/components/booking-dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  bestTime?: string;
  className?: string;
  isPopular?: boolean;
  slug?: string;
  duration: string;
  price: string;
}

const DestinationCard = ({
  imageSrc,
  title,
  description,
  bestTime,
  className,
  isPopular = false,
  slug,
  duration,
  price,
}: DestinationCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fallback image for when loading fails
  const fallbackImageSrc = "/placeholder.svg";

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative aspect-[4/3]">
        <img
          src={imageError ? fallbackImageSrc : imageSrc}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImageError(true);
            setIsLoaded(true);
          }}
          loading="lazy"
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{duration}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <p className="text-lg font-bold mb-4">Starting from {price}</p>
        <Link 
          to={`/destinations/${slug}`} 
          className="inline-block w-full mb-3"
        >
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <BookingDialog 
          defaultDestination={title}
          packageName={title}
          duration={duration}
          buttonText="Book This Tour"
          buttonClassName="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
