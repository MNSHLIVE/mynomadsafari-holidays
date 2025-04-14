
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DestinationCard from "@/components/destination-card";

export interface ContinentDestination {
  imageSrc: string;
  title: string;
  description: string;
  bestTime?: string;
  isPopular?: boolean;
  continent: string;
  path: string;
}

interface ContinentDestinationsProps {
  destinations: {
    asia: ContinentDestination[];
    europe: ContinentDestination[];
    americas: ContinentDestination[];
    africa: ContinentDestination[];
    adventure: ContinentDestination[];
    honeymoon: ContinentDestination[];
  };
}

const ContinentDestinations = ({ destinations }: ContinentDestinationsProps) => {
  const [activeTab, setActiveTab] = useState("asia");

  return (
    <div className="my-12">
      <Tabs defaultValue="asia" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-8 overflow-x-auto">
          <TabsList className="flex w-full justify-between">
            <TabsTrigger value="asia" className="px-3 py-2">Asia</TabsTrigger>
            <TabsTrigger value="europe" className="px-3 py-2">Europe</TabsTrigger>
            <TabsTrigger value="americas" className="px-3 py-2">Americas</TabsTrigger>
            <TabsTrigger value="africa" className="px-3 py-2">Africa</TabsTrigger>
            <TabsTrigger value="adventure" className="px-3 py-2">Adventure & Wildlife</TabsTrigger>
            <TabsTrigger value="honeymoon" className="px-3 py-2">Honeymoon Specials</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="asia" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.asia.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="europe" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.europe.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="americas" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.americas.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="africa" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.africa.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="adventure" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.adventure.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="honeymoon" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {destinations.honeymoon.map((destination, index) => (
              <DestinationCard
                key={index}
                imageSrc={destination.imageSrc}
                title={destination.title}
                description={destination.description}
                bestTime={destination.bestTime}
                isPopular={destination.isPopular}
                continent={destination.continent}
                link={`/destinations/${destination.path}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContinentDestinations;
