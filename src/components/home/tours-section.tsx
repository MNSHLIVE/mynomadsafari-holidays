
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TourSectionProps {
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
    itinerary?: Array<{day: number, title: string, description: string}>;
  }>;
  viewAllLink: string;
  viewAllText: string;
  bgColor?: string;
  showTabs?: boolean;
}

const ToursSection = ({
  title,
  subtitle,
  tag,
  tours,
  viewAllLink,
  viewAllText,
  bgColor,
  showTabs = true,
}: TourSectionProps) => {
  return (
    <section className={`section-padding ${bgColor ? bgColor : ''}`}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          tag={tag}
        />

        {showTabs ? (
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Tours</TabsTrigger>
                <TabsTrigger value="budgeted">Budgeted</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
                <TabsTrigger value="premier">Premier</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour, index) => (
                  <TourCard
                    key={index}
                    imageSrc={tour.imageSrc}
                    title={tour.title}
                    location={tour.location}
                    duration={tour.duration}
                    price={tour.price}
                    bestTime={tour.bestTime}
                    packageType={tour.packageType}
                    description={tour.description}
                    itinerary={tour.itinerary}
                    link="/tours"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="budgeted" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Budgeted")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType}
                      description={tour.description}
                      itinerary={tour.itinerary}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="luxury" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Luxury")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType}
                      description={tour.description}
                      itinerary={tour.itinerary}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="premier" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter(tour => tour.packageType === "Premier")
                  .map((tour, index) => (
                    <TourCard
                      key={index}
                      imageSrc={tour.imageSrc}
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      price={tour.price}
                      bestTime={tour.bestTime}
                      packageType={tour.packageType}
                      description={tour.description}
                      itinerary={tour.itinerary}
                      link="/tours"
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <TourCard
                key={index}
                imageSrc={tour.imageSrc}
                title={tour.title}
                location={tour.location}
                duration={tour.duration}
                price={tour.price}
                bestTime={tour.bestTime}
                packageType={tour.packageType}
                description={tour.description}
                itinerary={tour.itinerary}
                link="/tours"
              />
            ))}
          </div>
        )}

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

export default ToursSection;
