
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
        <TourList tours={domesticTours} isInternational={false} />
      </TabsContent>
      
      <TabsContent value="international" className="mt-0">
        <TourList tours={internationalTours} isInternational={true} />
      </TabsContent>
    </Tabs>
  );
};

export default ToursTabs;
