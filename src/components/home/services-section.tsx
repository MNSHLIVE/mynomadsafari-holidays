
import SectionHeading from "@/components/section-heading";
import { Globe, Compass, MapPin, Shield, Headphones } from "lucide-react";

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceItemProps[] = [
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Destination Planning",
    description: "Customized itineraries tailored to your preferences, time constraints, and budget."
  },
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: "Tour Packages",
    description: "All-inclusive tour packages for popular destinations, with various budget options."
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Visa Assistance",
    description: "Expert guidance on visa requirements and application process for different countries."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance options to ensure a safe and secure journey."
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support during your trip for any assistance you need."
  }
];

const ServicesSection = () => {
  return (
    <section className="section-padding container mx-auto px-4">
      <SectionHeading
        title="Services We Offer"
        subtitle="We provide comprehensive travel services to make your journey memorable and hassle-free"
        tag="Our Services"
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
    </section>
  );
};

export default ServicesSection;
