
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TourList from "./tour-list";
import { TourData } from "./types";

interface ToursTabsProps {
  domesticTours: TourData[];
  internationalTours: TourData[];
}

const ToursTabs = ({ domesticTours, internationalTours }: ToursTabsProps) => {
  return (
    <Tabs defaultValue="domestic" className="w-full">
      <TabsList className="flex justify-center mb-8">
        <TabsTrigger value="domestic">Domestic Tours</TabsTrigger>
        <TabsTrigger value="international">International Tours</TabsTrigger>
      </TabsList>
      
      <TabsContent value="domestic" className="mt-0">
        {domesticTours.length > 0 ? (
          <TourList tours={domesticTours} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No tours found</h3>
            <p className="text-muted-foreground">
              Please try adjusting your search criteria
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="international" className="mt-0">
        {internationalTours.length > 0 ? (
          <TourList tours={internationalTours} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No tours found</h3>
            <p className="text-muted-foreground">
              Please try adjusting your search criteria
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ToursTabs;
