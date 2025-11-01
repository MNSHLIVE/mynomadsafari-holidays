
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { religiousTours } from "@/components/tours/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TourCard from "@/components/tour-card";
import { PackageType } from "@/components/tours/data/tour-core";
import DestinationQueryForm from "@/components/destination-query-form";

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
  
  const formatTourPackages = (tours) => {
    return tours.map((tour, index) => ({
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
  };
  
  const hinduPackages = formatTourPackages(religiousTours);
  
  // Define sections with their titles and filters
  const hinduSections = [
    {
      id: 'charDham',
      title: 'Char Dham Yatra',
      filter: (tour) => tour.title.includes('Char Dham')
    },
    {
      id: 'jyotirlinga',
      title: 'Jyotirlinga Darshan',
      filter: (tour) => tour.title.includes('Jyotirlinga')
    },
    {
      id: 'vaishnoDevi',
      title: 'Vaishno Devi',
      filter: (tour) => tour.title.includes('Vaishno Devi')
    },
    {
      id: 'badrinathKedarnath',
      title: 'Badrinath-Kedarnath',
      filter: (tour) => tour.title.includes('Badrinath')
    },
    {
      id: 'southIndia',
      title: 'South India Temple Tours',
      filter: (tour) => tour.title.includes('South India')
    },
    {
      id: 'otherHindu',
      title: 'Other Hindu Pilgrimages',
      filter: (tour) => !tour.title.includes('Char Dham') && 
                        !tour.title.includes('Jyotirlinga') && 
                        !tour.title.includes('Vaishno Devi') && 
                        !tour.title.includes('Badrinath') && 
                        !tour.title.includes('South India')
    },
  ];
  
  // Helper to render tours based on filter
  const renderTours = (tours, filter) => {
    const filteredTours = tours.filter(filter);
    
    if (filteredTours.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tours available in this category yet.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div key={tour.key} className="flex flex-col h-full">
            <TourCard
              key={tour.key}
              imageSrc={tour.imageSrc}
              title={tour.title}
              location={tour.location}
              duration={tour.duration}
              price={tour.price}
              bestTime={tour.bestTime}
              packageType={tour.packageType}
              description={tour.description}
              link={tour.link}
              className="flex-grow"
              eager={true} // Add eager prop to load images quickly
            />
            <div className="mt-3">
              <DestinationQueryForm 
                destinationName={tour.title}
                buttonText="Enquire Now"
                buttonClassName="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
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
            {hinduSections.map((section) => (
              <section key={section.id}>
                <div className="flex items-center justify-between cursor-pointer pb-2 border-b" onClick={() => toggleSection(section.id)}>
                  <h2 className="text-xl md:text-2xl font-semibold">{section.title}</h2>
                  <Button variant="ghost" size="icon">
                    {isOpen[section.id] ? <ChevronDown /> : <ChevronRight />}
                  </Button>
                </div>
                
                {isOpen[section.id] && renderTours(hinduPackages, section.filter)}
              </section>
            ))}
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
