
import { Helmet } from "react-helmet";
import SectionHeading from "@/components/section-heading";
import TourCard from "@/components/tour-card";
import CTASection from "@/components/cta-section";

const religiousTours = [
  {
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg",
    title: "Char Dham Yatra",
    location: "Uttarakhand",
    duration: "11 Days / 10 Nights",
    price: "Starting from ₹45,000",
    bestTime: "May - June, Sept - Oct",
    packageType: "Budgeted" as const,
    description: "Embark on the sacred journey to all four divine sites: Yamunotri, Gangotri, Kedarnath, and Badrinath, in the majestic Himalayas."
  },
  {
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/BadrinathKedarnath/BK-Main.jpg.jpg",
    title: "Badrinath-Kedarnath Pilgrimage",
    location: "Uttarakhand",
    duration: "7 Days / 6 Nights",
    price: "Starting from ₹35,000",
    bestTime: "May - June, Sept - Oct",
    packageType: "Budgeted" as const,
    description: "Visit two of the most sacred sites dedicated to Lord Vishnu and Lord Shiva nestled in the Garhwal Himalayas."
  },
  {
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/VaishnoDevi/VaishnoDevi-Main.jpg.jpg",
    title: "Vaishno Devi Darshan",
    location: "Jammu & Kashmir",
    duration: "4 Days / 3 Nights",
    price: "Starting from ₹18,000",
    bestTime: "March - July, Sept - Oct",
    packageType: "Budgeted" as const,
    description: "Trek to the holy cave shrine of Mata Vaishno Devi situated in the Trikuta Mountains."
  },
  {
    imageSrc: "/Destination/Home/Religious-Places/Varanasi-religious.jpg",
    title: "Varanasi Spiritual Journey",
    location: "Uttar Pradesh",
    duration: "5 Days / 4 Nights",
    price: "Starting from ₹22,000",
    bestTime: "October - March",
    packageType: "Luxury" as const,
    description: "Experience the spiritual essence of India's oldest city with Ganga aarti, temple visits, and boat rides on the sacred river."
  },
  {
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/Ashthavinayak/Asthavinayak-Main.jpg",
    title: "Ashtavinayak Yatra",
    location: "Maharashtra",
    duration: "6 Days / 5 Nights",
    price: "Starting from ₹25,000",
    bestTime: "Throughout the year",
    packageType: "Budgeted" as const,
    description: "Visit all eight sacred temples of Lord Ganesha spread across Maharashtra."
  },
  {
    imageSrc: "/Destination/Domestic/Tours/Pilgrimage/Hindu/SouthIndia/SouthIndia-Main.jpg.jpg",
    title: "South Indian Temple Trail",
    location: "Tamil Nadu & Kerala",
    duration: "9 Days / 8 Nights",
    price: "Starting from ₹40,000",
    bestTime: "October - March",
    packageType: "Luxury" as const,
    description: "Explore the ancient and magnificently carved temples of South India with their rich cultural heritage."
  }
];

const ReligiousTours = () => {
  return (
    <>
      <Helmet>
        <title>Religious Tours | My Nomadsafari Holidays</title>
        <meta
          name="description"
          content="Embark on spiritual journeys with our religious tour packages. Visit sacred sites, temples, and pilgrimage destinations with My Nomadsafari Holidays."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Pilgrimage
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Religious Tours & Pilgrimages
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Embark on a spiritual journey to sacred destinations across India
          </p>
        </div>
      </section>
      
      {/* Tours Section */}
      <section className="py-12 container mx-auto px-4">
        <SectionHeading
          title="Our Religious Tour Packages"
          subtitle="Carefully curated spiritual journeys to connect with your faith"
          tag="Sacred Journeys"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {religiousTours.map((tour, index) => (
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
              link={`/tour-itineraries?category=religious&package=${encodeURIComponent(tour.title)}`}
            />
          ))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Choose Our Pilgrimage Tours"
            subtitle="We take care of every detail so you can focus on your spiritual journey"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Experienced Guides</h3>
              <p className="text-muted-foreground">Our guides are well-versed in the religious and cultural significance of each site, enhancing your spiritual experience.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.9 4.9 14.2 14.2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comfortable Accommodations</h3>
              <p className="text-muted-foreground">Stay in carefully selected accommodations close to pilgrimage sites, offering comfort after a day of spiritual exploration.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <path d="M14 2v6h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hassle-Free Planning</h3>
              <p className="text-muted-foreground">We handle all logistics including permits, accommodations, and local transportation, allowing you to focus on your spiritual journey.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to Begin Your Spiritual Journey?"
        subtitle="Let us help you plan your perfect pilgrimage"
        buttonText="Enquire Now"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1623743593511-eaa32b8b4035?q=80&w=2000"
        align="center"
      />
    </>
  );
};

export default ReligiousTours;
