
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import DestinationCard from "@/components/destination-card";

interface DestinationsProps {
  title: string;
  subtitle: string;
  tag: string;
  destinations: Array<{
    imageSrc: string;
    title: string;
    description: string;
    bestTime?: string;
    isPopular?: boolean;
    slug?: string; // Add slug support
  }>;
  viewAllLink: string;
  viewAllText: string;
  bgColor?: string;
}

const DestinationsSection = ({
  title,
  subtitle,
  tag,
  destinations,
  viewAllLink,
  viewAllText,
  bgColor,
}: DestinationsProps) => {
  return (
    <section className={`section-padding ${bgColor ? bgColor : ''}`}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          tag={tag}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              imageSrc={destination.imageSrc}
              title={destination.title}
              description={destination.description}
              bestTime={destination.bestTime}
              isPopular={destination.isPopular}
              slug={destination.slug} // Pass slug if available
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="group" asChild>
            <Link to={viewAllLink}>
              <span>{viewAllText}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
