import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingDialog } from "@/components/booking-dialog";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
        <Image
          src={imageError ? fallbackImageSrc : imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImageError(true);
            setIsLoaded(true);
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{duration}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <p className="text-lg font-bold">Starting from {price}</p>
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
