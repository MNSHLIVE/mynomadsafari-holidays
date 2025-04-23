
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TourList from "./tour-list";
import { TourData } from "./types";
import { format } from "date-fns";

// Format date ranges properly
export const formatDateRange = (dateRange: { from: Date | string, to?: Date | string }) => {
  try {
    const fromDate = typeof dateRange.from === 'string' ? new Date(dateRange.from) : dateRange.from;
    
    if (!dateRange.to) {
      return format(fromDate, "MMMM d, yyyy");
    }
    
    const toDate = typeof dateRange.to === 'string' ? new Date(dateRange.to) : dateRange.to;
    return `${format(fromDate, "MMMM d")} - ${format(toDate, "MMMM d, yyyy")}`;
  } catch (error) {
    console.error("Error formatting date range:", error, dateRange);
    return "Invalid date";
  }
};

interface TourTabsProps {
  domesticTours: TourData[];
  internationalTours: TourData[];
  pilgrimageTours?: TourData[];
}

const ToursTabs = ({ domesticTours, internationalTours, pilgrimageTours }: TourTabsProps) => {
  const [activeTab, setActiveTab] = useState("domestic");
  const [filteredDomesticTours, setFilteredDomesticTours] = useState<TourData[]>(domesticTours);
  const [filteredInternationalTours, setFilteredInternationalTours] = useState<TourData[]>(internationalTours);
  const [filteredPilgrimageTours, setFilteredPilgrimageTours] = useState<TourData[]>(pilgrimageTours || []);

  useEffect(() => {
    setFilteredDomesticTours(domesticTours);
    setFilteredInternationalTours(internationalTours);
    if (pilgrimageTours) {
      setFilteredPilgrimageTours(pilgrimageTours);
    }
  }, [domesticTours, internationalTours, pilgrimageTours]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="domestic">Domestic Tours</TabsTrigger>
          <TabsTrigger value="international">International Tours</TabsTrigger>
          {pilgrimageTours && pilgrimageTours.length > 0 && (
            <TabsTrigger value="pilgrimage">Pilgrimage Tours</TabsTrigger>
          )}
        </TabsList>
      </div>

      <TabsContent value="domestic" className="space-y-6">
        <TourList tours={filteredDomesticTours} />
      </TabsContent>

      <TabsContent value="international" className="space-y-6">
        <TourList tours={filteredInternationalTours} />
      </TabsContent>

      {pilgrimageTours && pilgrimageTours.length > 0 && (
        <TabsContent value="pilgrimage" className="space-y-6">
          <TourList tours={filteredPilgrimageTours} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ToursTabs;
