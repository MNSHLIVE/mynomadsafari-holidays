
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import { Heart, Mountain, TreePalm } from "lucide-react";

interface ThemeTourSectionProps {
  title: string;
  subtitle: string;
  tag: string;
  tours: Array<{
    imageSrc: string;
    title: string;
    location: string;
    duration: string;
    price: string;
    bestTime: string;
    packageType: "Budgeted" | "Luxury" | "Premier";
    description?: string;
  }>;
  categorySlug: string;
  actionText: string;
  actionIcon: "heart" | "mountain" | "tree";
  className?: string;
}

const ThemeTourSection = ({
  title,
  subtitle,
  tag,
  tours,
  categorySlug,
  actionText,
  actionIcon,
  className = "",
}: ThemeTourSectionProps) => {
  const getIcon = () => {
    switch (actionIcon) {
      case "heart":
        return <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />;
      case "mountain":
        return <Mountain className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />;
      case "tree":
        return <TreePalm className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />;
      default:
        return <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />;
    }
  };

  return (
    <section className={`container mx-auto px-4 mb-16 ${className}`}>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        tag={tag}
        align="center"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {tours.map((tour, index) => (
          <TourCard
            key={`${categorySlug}-${index}`}
            imageSrc={tour.imageSrc}
            title={tour.title}
            location={tour.location}
            duration={tour.duration}
            price={tour.price}
            bestTime={tour.bestTime}
            packageType={tour.packageType}
            link={`/tour-itineraries?category=${categorySlug}`}
            description={tour.description}
            className="animate-fade-in"
          />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Link to={`/tour-itineraries?category=${categorySlug}`}>
          <Button variant="outline" className="group">
            <span>{actionText}</span>
            {getIcon()}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ThemeTourSection;
