
import SectionHeading from "@/components/section-heading";
import { Globe, Compass, FileCheck, CreditCard, Headphones, Plane, Train, Map } from "lucide-react";

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceItemProps[] = [
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "End-to-End Travel Solutions",
    description: "Comprehensive luxury travel services for both domestic and international destinations, covering all your safari holidays and adventure travel needs across India."
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: "Customized Safari Tour Packages",
    description: "Personalized wildlife safari itineraries and heritage tours tailored to your preferences, covering Golden Triangle tours, Kerala backwaters, and Rajasthan cultural experiences."
  },
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: "All-Inclusive Travel Booking",
    description: "Hassle-free booking for flights, trains, and luxury accommodations with the best rates for your India tour packages and international vacations."
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: "Complete Visa Assistance",
    description: "Expert guidance on visa requirements and application process for international destinations, ensuring seamless travel planning for your luxury holidays."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Comprehensive Travel Insurance",
    description: "Complete travel insurance options for adventure travel India, wildlife safari packages, and international tours to ensure safe and secure journeys."
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "24/7 Luxury Support",
    description: "Round-the-clock premium customer support during your safari holidays and cultural heritage tours for any assistance you need, wherever you are in India or abroad."
  }
];

const ServicesSection = () => {
  return (
    <section className="section-padding container mx-auto px-4">
      <SectionHeading
        title="Best Tour Operators in India - End-to-End Travel Services"
        subtitle="We provide complete luxury travel solutions for domestic safari holidays and international destinations with customized tour packages"
        tag="Our Premium Services"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="p-6 border border-border/50 rounded-xl bg-card shadow-sm hover-scale h-full"
          >
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg max-w-4xl mx-auto text-muted-foreground">
          My Nomadsafari Holidays is India's premier full-service travel agency offering everything from luxury safari holidays 
          to budget-friendly adventure travel packages. We specialize in Golden Triangle tours, Kerala backwater experiences, 
          Rajasthan heritage tours, wildlife safari packages, and customized vacation planning across India and worldwide destinations. 
          Experience stress-free travel with our end-to-end tour operator services.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
