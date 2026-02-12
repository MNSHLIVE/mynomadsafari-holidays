
import { Link } from "react-router-dom";
import SectionHeading from "@/components/section-heading";
import CTASection from "@/components/cta-section";
import SEOHead from "@/components/seo/seo-head";
import { createBreadcrumbSchema } from "@/components/seo/schema-data";
import { Check, Award, Users, Clock, Globe, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  const stats = [
    { value: "10+", label: "Years Experience", icon: <Clock className="h-8 w-8 text-primary" /> },
    { value: "1000+", label: "Happy Clients", icon: <Users className="h-8 w-8 text-primary" /> },
    { value: "50+", label: "Destinations", icon: <Globe className="h-8 w-8 text-primary" /> },
    { value: "100%", label: "Satisfaction", icon: <Award className="h-8 w-8 text-primary" /> },
  ];

  const seoData = {
    title: "About MyNomadSafariHolidays - Best Tour Operators in India | Luxury Travel Agency",
    description: "Learn about India's trusted travel partner with 10+ years experience in luxury safari holidays, adventure travel, and customized tour packages. End-to-end travel solutions across India.",
    keywords: "best tour operators India, luxury travel agency, safari holidays expert, adventure travel India, end-to-end tour operators, trusted travel partner India",
    canonicalUrl: "https://www.mynomadsafariholidays.in/about",
    structuredData: createBreadcrumbSchema([
      { name: "Home", url: "https://www.mynomadsafariholidays.in/" },
      { name: "About Us", url: "https://www.mynomadsafariholidays.in/about" }
    ])
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Back to Home</Link>
          </Button>
        </div>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            About India's Best Tour Operators
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Travel Partner for Luxury Safari Holidays
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized adventure travel experiences and exceptional end-to-end tour operator services since 2013
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome to My Nomadsafari Holidays - Best Tour Operators in India</h2>
            <p className="text-muted-foreground mb-6">As a luxury travel expert with over a decade of experience in safari holidays and adventure travel, I founded My Nomadsafari Holidays with a simple mission: to provide personalized, hassle-free India tour packages that create lasting memories through wholesome travel experiences.</p>
            <p className="text-muted-foreground mb-6">What sets us apart as the best tour operators in India is our attention to detail, deep knowledge of destinations like Kerala, Rajasthan, and Himachal, and commitment to understanding each client's unique preferences. Whether you're seeking budget-friendly adventure travel or luxury safari holidays, we craft customized vacation experiences that perfectly match your travel style.</p>
            <div className="space-y-2">
              {["Personalized luxury safari itineraries tailored to your preferences", "Expert local insights for Golden Triangle and heritage tours", "24/7 premium support throughout your India tour packages", "Transparent pricing with no hidden fees for all travel services"].map((item, index) => (
                <div key={index} className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-0.5" /><span>{item}</span></div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <img src="/Destination/Home/Featured-Tours/Rajasthan-Heritage.jpg" alt="Best Tour Operators India - Luxury Travel Expert" className="rounded-xl shadow-lg w-full object-cover h-[400px]" />
            <div className="absolute -bottom-5 -right-5 bg-primary text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold">10+ Years</p><p className="text-sm">Safari Holidays Experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={cn("p-6 text-center rounded-xl bg-card border border-border/50 shadow-sm hover-scale")}>
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <SectionHeading title="Our Story - From Adventure Travel Enthusiast to Best Tour Operators" subtitle="How My Nomadsafari Holidays became India's trusted travel partner for luxury safari holidays" tag="Our Journey" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div><img src="/Destination/Home/Hero/Rajasthan-hero.jpg" alt="Luxury Travel Journey - Safari Holidays India" className="rounded-xl shadow-lg w-full h-[400px] object-cover" /></div>
          <div className="space-y-6">
            <div><h3 className="text-xl font-semibold mb-2">The Beginning of Safari Holiday Excellence</h3><p className="text-muted-foreground">After years of exploring India's diverse landscapes and helping friends and family plan their perfect safari holidays and adventure travel experiences, I decided to turn my passion into a profession. My Nomadsafari Holidays was born from a desire to share my knowledge and create meaningful luxury travel experiences for others seeking authentic India tour packages.</p></div>
            <div><h3 className="text-xl font-semibold mb-2">Growing as Best Tour Operators in India</h3><p className="text-muted-foreground">What started as a small operation has grown into India's trusted travel service, with hundreds of satisfied clients who return year after year for our customized safari vacations. We've expanded our destinations and luxury travel services while maintaining the personalized approach that makes us the best tour operators for wholesome travel experiences.</p></div>
            <div><h3 className="text-xl font-semibold mb-2">Our Philosophy for Luxury Safari Holidays</h3><p className="text-muted-foreground">We believe adventure travel should be transformative, educational, and enjoyable. Our philosophy centers on creating authentic India tour packages that connect travelers with local cultures, natural wonders, and unforgettable moments through carefully curated safari holidays and heritage tours.</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Choose MyNomadSafari as Your Tour Operators" subtitle="What makes us the best tour operators for luxury safari holidays and adventure travel in India" tag="Our Advantages" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Personalized Safari Holiday Service", description: "Every luxury itinerary is customized to your preferences, interests, and budget. No cookie-cutter India tour packages here - each safari vacation is uniquely crafted.", icon: <Users className="h-8 w-8 text-primary" /> },
              { title: "Destination Expertise for Adventure Travel", description: "In-depth knowledge of India's best destinations including Kerala, Rajasthan, Himachal, and international locations, with insider tips for authentic safari holidays.", icon: <Globe className="h-8 w-8 text-primary" /> },
              { title: "Best Value Luxury Travel Packages", description: "Carefully selected experiences and accommodations that offer the best value at every price point for your customized safari vacations and heritage tours.", icon: <Award className="h-8 w-8 text-primary" /> },
              { title: "24/7 Premium Support", description: "Round-the-clock assistance during your luxury safari holidays for peace of mind and immediate help if needed during your adventure travel experience.", icon: <Clock className="h-8 w-8 text-primary" /> },
              { title: "Transparent Pricing for All Tours", description: "Clear breakdown of costs with no hidden fees or unexpected charges for our India tour packages – what you see is what you pay for your safari holidays.", icon: <Check className="h-8 w-8 text-primary" /> },
              { title: "Sustainable Adventure Travel", description: "Commitment to responsible tourism practices that respect local communities and the environment during your luxury safari holidays and cultural experiences.", icon: <Award className="h-8 w-8 text-primary" /> },
            ].map((item, index) => (
              <div key={index} className="p-6 border border-border/50 rounded-xl bg-card shadow-sm hover-scale h-full">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Start Your Safari Holiday Adventure?" description="Contact the best tour operators in India today to plan your perfect luxury travel experience with personalized service and expert guidance." buttonText="Plan Your India Tour Package Now" buttonLink="/contact" imageSrc="/Destination/Home/Hero/Kerala-hero.jpg" align="center" />
    </>
  );
};

export default AboutUs;
