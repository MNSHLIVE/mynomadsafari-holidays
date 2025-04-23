
import { useState } from "react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TourList from "./tour-list";
import { DomesticTourDetails, InternationalTourDetails } from "./types";

export interface DateRange {
  from: Date;
  to?: Date;
}

export const formatDateRange = (dateRange: DateRange): string => {
  const { from, to } = dateRange;
  
  // Format the "from" date
  const fromFormatted = format(from, "MMM d, yyyy");
  
  // Format the "to" date if it exists
  const toFormatted = to ? format(to, "MMM d, yyyy") : undefined;
  
  // Return the appropriate string
  return toFormatted ? `${fromFormatted} - ${toFormatted}` : fromFormatted;
};

interface ToursTabsProps {
  domesticTours: DomesticTourDetails[];
  internationalTours: InternationalTourDetails[];
  onTourEnquiry?: (tourName: string) => void;
}

const ToursTabs = ({ 
  domesticTours, 
  internationalTours,
  onTourEnquiry
}: ToursTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("domestic");

  return (
    <div>
      <Tabs defaultValue="domestic" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="domestic" className="flex-1">
              Domestic Tours
            </TabsTrigger>
            <TabsTrigger value="international" className="flex-1">
              International Tours
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="domestic" className="mt-0">
          <TourList 
            tours={domesticTours} 
            type="domestic"
            onTourEnquiry={onTourEnquiry} 
          />
        </TabsContent>

        <TabsContent value="international" className="mt-0">
          <TourList 
            tours={internationalTours} 
            type="international"
            onTourEnquiry={onTourEnquiry}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToursTabs;
