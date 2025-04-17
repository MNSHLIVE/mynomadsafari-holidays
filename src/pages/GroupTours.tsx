
import { Helmet } from "react-helmet";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const domesticGroupTours = [
  {
    imageSrc: "/Destination/Domestic/main/Rajasthan-main.jpg",
    title: "Rajasthan Heritage Group Tour",
    location: "Rajasthan",
    duration: "8 Days / 7 Nights",
    price: "Starting from ₹35,000",
    bestTime: "October - March",
    packageType: "Budgeted" as const,
    description: "Experience the vibrant culture and royal heritage of Rajasthan with a group of like-minded travelers."
  },
  {
    imageSrc: "/Destination/Domestic/main/Kerala-main.jpg",
    title: "Kerala Group Adventure",
    location: "Kerala",
    duration: "7 Days / 6 Nights",
    price: "Starting from ₹32,000",
    bestTime: "September - March",
    packageType: "Budgeted" as const,
    description: "Discover the serene backwaters and lush greenery of God's own country with fellow travelers."
  },
  {
    imageSrc: "/Destination/Domestic/main/Himachal-Main.jpg",
    title: "Himachal Group Escapade",
    location: "Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    price: "Starting from ₹28,000",
    bestTime: "March - June, September - November",
    packageType: "Budgeted" as const,
    description: "Experience the majestic Himalayas and charming hill stations with a fun group of travelers."
  }
];

const internationalGroupTours = [
  {
    imageSrc: "/Destination/International/Main/Thailand-main.jpg",
    title: "Thailand Group Adventure",
    location: "Thailand",
    duration: "7 Days / 6 Nights",
    price: "Starting from ₹65,000",
    bestTime: "November - March",
    packageType: "Budgeted" as const,
    description: "Explore the beaches, temples, and vibrant cities of Thailand with a group of fellow adventurers."
  },
  {
    imageSrc: "/Destination/International/Main/Dubai-main.jpg",
    title: "Dubai Group Extravaganza",
    location: "Dubai",
    duration: "6 Days / 5 Nights",
    price: "Starting from ₹75,000",
    bestTime: "November - March",
    packageType: "Budgeted" as const,
    description: "Experience the glitz, glamour, and desert adventures of Dubai with a fun group."
  },
  {
    imageSrc: "/Destination/International/Main/Singapore-main.jpg",
    title: "Singapore Group Getaway",
    location: "Singapore",
    duration: "5 Days / 4 Nights",
    price: "Starting from ₹70,000",
    bestTime: "February - April, November - December",
    packageType: "Budgeted" as const,
    description: "Discover the futuristic city-state of Singapore with a group of like-minded travelers."
  }
];

const GroupTours = () => {
  return (
    <>
      <Helmet>
        <title>Group Tours | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Join our expertly curated group tours for both domestic and international destinations. Travel with like-minded people and create lasting memories with My Nomadsafari Holidays."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Travel Together
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Group Tours & Adventures
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Travel with like-minded people and create unforgettable memories together
          </p>
        </div>
      </section>
      
      {/* Group Tours Benefits Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Choose Group Tours"
            subtitle="Experience the benefits of traveling with others"
            align="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Meet New People</h3>
              <p className="text-sm text-muted-foreground">Connect with like-minded travelers and create lasting friendships.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-sm text-muted-foreground">Our expertly planned itineraries maximize your experiences.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Safety in Numbers</h3>
              <p className="text-sm text-muted-foreground">Enjoy increased security and peace of mind while traveling.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.9 4.9 1.4 1.4"></path>
                  <path d="m17.7 17.7 1.4 1.4"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.3 17.7-1.4 1.4"></path>
                  <path d="m19.1 4.9-1.4 1.4"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Cost-Effective</h3>
              <p className="text-sm text-muted-foreground">Benefit from group discounts and shared expenses.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tours Section */}
      <section className="py-16 container mx-auto px-4">
        <SectionHeading
          title="Our Group Tour Packages"
          subtitle="Expertly crafted group adventures for unforgettable experiences"
          tag="Featured Tours"
        />
        
        <Tabs defaultValue="domestic" className="w-full mt-8">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="domestic">Domestic Group Tours</TabsTrigger>
              <TabsTrigger value="international">International Group Tours</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="domestic" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domesticGroupTours.map((tour, index) => (
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
                  link={`/tour-itineraries?category=group&package=${encodeURIComponent(tour.title)}`}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="international" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalGroupTours.map((tour, index) => (
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
                  link={`/tour-itineraries?category=group&package=${encodeURIComponent(tour.title)}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="How Our Group Tours Work"
            subtitle="Simple steps to join our curated group adventures"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="bg-card p-6 pt-10 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-3">Choose Your Tour</h3>
                <p className="text-muted-foreground">Browse our selection of group tours and select one that matches your interests and schedule.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="bg-card p-6 pt-10 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-3">Reserve Your Spot</h3>
                <p className="text-muted-foreground">Book your place on the tour with a small deposit to secure your participation.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="bg-card p-6 pt-10 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-3">Join the Adventure</h3>
                <p className="text-muted-foreground">Meet your group and tour guide on the starting date and begin your memorable journey together.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to Join Our Next Group Adventure?"
        subtitle="Contact us to learn about upcoming group departures and availability"
        buttonText="Enquire Now"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?q=80&w=2000"
        align="center"
      />
    </>
  );
};

export default GroupTours;
