
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
    title: "Complete Travel Solutions",
    description: "Comprehensive travel services for both domestic and international destinations, covering all your travel needs."
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: "Customized Tour Packages",
    description: "Personalized itineraries tailored to your preferences, time constraints, and budget for any destination worldwide."
  },
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: "Travel Ticket Booking",
    description: "Hassle-free booking for flights, trains, and buses with the best rates and confirmed seats."
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: "Visa Assistance",
    description: "Expert guidance on visa requirements and application process for different countries around the globe."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance options to ensure a safe and secure journey anywhere in the world."
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support during your trip for any assistance you need, wherever you are."
  }
];

const ServicesSection = () => {
  return (
    <section className="section-padding container mx-auto px-4">
      <SectionHeading
        title="Comprehensive Travel Services"
        subtitle="We provide complete travel solutions for both domestic and international destinations"
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

      <div className="mt-12 text-center">
        <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
          My Nomadsafari Holidays is a full-service travel agency offering everything from luxury tours to budget-friendly packages, 
          adventure trips to relaxing getaways, and business travel to family vacations across India and worldwide.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
