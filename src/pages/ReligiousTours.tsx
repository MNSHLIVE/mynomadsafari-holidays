
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { religiousTours } from "@/components/tours/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TourCard from "@/components/tour-card";
import { PackageType } from "@/components/tours/data/tour-core";

const ReligiousTours = () => {
  const [isOpen, setIsOpen] = useState({});
  
  const toggleSection = (section) => {
    setIsOpen({
      ...isOpen,
      [section]: !isOpen[section],
    });
  };
  
  const pilgrimageTypes = ["Hindu", "Buddhist", "Jain", "Sikh", "Muslim", "Christian"];
  const [activeTab, setActiveTab] = useState(pilgrimageTypes[0]);
  
  const hinduPackages = religiousTours.map((tour, index) => ({
    key: index,
    imageSrc: tour.imageSrc,
    title: tour.title,
    location: tour.location,
    duration: tour.duration,
    price: String(tour.price), // Convert price to string
    bestTime: tour.bestTime,
    packageType: tour.packageType as PackageType,
    description: tour.description,
    link: `/religious-tours/${tour.title.toLowerCase().replace(/\s+/g, '-')}` // Added link prop
  }));
  
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Religious & Pilgrimage Tours | My Nomadsafari Holidays</title>
        <meta 
          name="description" 
          content="Embark on a spiritual journey with our curated selection of religious and pilgrimage tours across India and beyond."
        />
      </Helmet>
      
      <div className="bg-primary/5 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Religious & Pilgrimage Tours</h1>
            <p className="text-muted-foreground">Embark on a spiritual journey to the most sacred destinations. Our carefully curated pilgrimage packages combine spiritual experiences with comfortable travel.</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
            {pilgrimageTypes.map((type) => (
              <TabsTrigger key={type} value={type} className="min-w-[100px]">
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="Hindu" className="space-y-10">
            <section>
              <div className="flex items-center justify-between cursor-pointer pb-2 border-b" onClick={() => toggleSection('charDham')}>
                <h2 className="text-xl md:text-2xl font-semibold">Char Dham Yatra</h2>
                <Button variant="ghost" size="icon">
                  {isOpen['charDham'] ? <ChevronDown /> : <ChevronRight />}
                </Button>
              </div>
              
              {isOpen['charDham'] && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hinduPackages.filter(tour => tour.title.includes('Char Dham')).map((tour) => (
                    <TourCard
                      key={tour.key}
                      {...tour}
                    />
                  ))}
                </div>
              )}
            </section>
            
            <section>
              <div className="flex items-center justify-between cursor-pointer pb-2 border-b" onClick={() => toggleSection('jyotirlinga')}>
                <h2 className="text-xl md:text-2xl font-semibold">Jyotirlinga Darshan</h2>
                <Button variant="ghost" size="icon">
                  {isOpen['jyotirlinga'] ? <ChevronDown /> : <ChevronRight />}
                </Button>
              </div>
              
              {isOpen['jyotirlinga'] && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hinduPackages.filter(tour => tour.title.includes('Jyotirlinga')).map((tour) => (
                    <TourCard
                      key={tour.key}
                      {...tour}
                    />
                  ))}
                </div>
              )}
            </section>
            
            {/* Remaining sections can be added similarly */}
          </TabsContent>
          
          {/* Other religion tabs can be added here */}
          
          {["Buddhist", "Jain", "Sikh", "Muslim", "Christian"].map((religion) => (
            <TabsContent key={religion} value={religion}>
              <div className="text-center py-10">
                <h2 className="text-xl font-medium mb-4">{religion} Pilgrimage Packages</h2>
                <p className="text-muted-foreground mb-6">Coming soon! We're currently curating special {religion} pilgrimage packages.</p>
                <Button>Notify Me</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default ReligiousTours;
