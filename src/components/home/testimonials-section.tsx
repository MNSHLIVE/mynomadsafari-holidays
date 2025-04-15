
import SectionHeading from "@/components/section-heading";
import TestimonialCard from "@/components/testimonial-card";

interface TestimonialsProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    rating: number;
  }>;
}

const TestimonialsSection = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="section-padding container mx-auto px-4">
      <SectionHeading
        title="What Our Travelers Say"
        subtitle="Hear from our satisfied clients about their travel experiences with us"
        tag="Testimonials"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            rating={testimonial.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
