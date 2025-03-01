
import Layout from "@/components/layout";
import SectionHeading from "@/components/section-heading";
import CTASection from "@/components/cta-section";
import { Check, Award, Users, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  const stats = [
    { value: "10+", label: "Years Experience", icon: <Clock className="h-8 w-8 text-primary" /> },
    { value: "1000+", label: "Happy Clients", icon: <Users className="h-8 w-8 text-primary" /> },
    { value: "50+", label: "Destinations", icon: <Globe className="h-8 w-8 text-primary" /> },
    { value: "100%", label: "Satisfaction", icon: <Award className="h-8 w-8 text-primary" /> },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Travel Partner
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized travel experiences and exceptional service since 2013
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Welcome to My Nomadsafari Holidays
            </h2>
            <p className="text-muted-foreground mb-6">
              As a solo travel expert with over a decade of experience, I founded My Nomadsafari Holidays with a simple mission: to provide personalized, hassle-free travel experiences that create lasting memories.
            </p>
            <p className="text-muted-foreground mb-6">
              What sets us apart is our attention to detail, deep knowledge of destinations, and commitment to understanding each client's unique preferences. Whether you're seeking a budget-friendly adventure or a luxury getaway, we craft experiences that perfectly match your travel style.
            </p>
            <div className="space-y-2">
              {[
                "Personalized itineraries tailored to your preferences",
                "Expert local insights and recommendations",
                "24/7 support throughout your journey",
                "Transparent pricing with no hidden fees",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <img
              src="https://images.unsplash.com/photo-1516689935744-2a213f28f940?q=80&w=800"
              alt="Travel Expert"
              className="rounded-xl shadow-lg w-full"
            />
            <div className="absolute -bottom-5 -right-5 bg-primary text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold">10+ Years</p>
              <p className="text-sm">of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-6 text-center rounded-xl bg-card border border-border/50 shadow-sm hover-scale",
                )}
              >
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 container mx-auto px-4">
        <SectionHeading
          title="Our Story"
          subtitle="How My Nomadsafari Holidays became your trusted travel partner"
          tag="Our Journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800"
              alt="Travel Journey"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
              <p className="text-muted-foreground">
                After years of exploring the world and helping friends and family plan their perfect trips, I decided to turn my passion into a profession. My Nomadsafari Holidays was born from a desire to share my knowledge and create meaningful travel experiences for others.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Growth</h3>
              <p className="text-muted-foreground">
                What started as a small operation has grown into a trusted travel service, with hundreds of satisfied clients who return year after year. We've expanded our destinations and services while maintaining the personalized approach that makes us special.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Philosophy</h3>
              <p className="text-muted-foreground">
                We believe travel should be transformative, educational, and enjoyable. Our philosophy centers on creating authentic experiences that connect travelers with local cultures, natural wonders, and unforgettable moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Choose My Nomadsafari"
            subtitle="What makes us different from other travel agencies"
            tag="Our Advantages"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Personalized Service",
                description: "Every itinerary is customized to your preferences, interests, and budget. No cookie-cutter packages here.",
                icon: <Users className="h-8 w-8 text-primary" />,
              },
              {
                title: "Destination Expertise",
                description: "In-depth knowledge of destinations in India and international locations, with insider tips and recommendations.",
                icon: <Globe className="h-8 w-8 text-primary" />,
              },
              {
                title: "Value for Money",
                description: "Carefully selected experiences and accommodations that offer the best value at every price point.",
                icon: <Award className="h-8 w-8 text-primary" />,
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance during your travels for peace of mind and immediate help if needed.",
                icon: <Clock className="h-8 w-8 text-primary" />,
              },
              {
                title: "Transparent Pricing",
                description: "Clear breakdown of costs with no hidden fees or unexpected charges – what you see is what you pay.",
                icon: <Check className="h-8 w-8 text-primary" />,
              },
              {
                title: "Sustainable Travel",
                description: "Commitment to responsible tourism practices that respect local communities and the environment.",
                icon: <Award className="h-8 w-8 text-primary" />,
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-6 border border-border/50 rounded-xl bg-card shadow-sm hover-scale h-full"
              >
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Journey?"
        description="Contact us today to plan your perfect trip with personalized service and expert guidance."
        buttonText="Plan Your Trip Now"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000"
        align="center"
      />
    </Layout>
  );
};

export default AboutUs;
