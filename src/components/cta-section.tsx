
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const CTASection = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  className,
  align = "center",
}: CTASectionProps) => {
  return (
    <section
      className={cn(
        "py-16 px-4 relative overflow-hidden",
        imageSrc ? "text-white" : "bg-muted/30",
        className
      )}
    >
      {imageSrc && (
        <>
          <div className="absolute inset-0 bg-black/50 z-0" />
          <img
            src={imageSrc}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
        </>
      )}

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className={cn({
              "text-left": align === "left",
              "text-center": align === "center",
              "text-right": align === "right",
            })}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="mb-8 text-lg opacity-90">{description}</p>
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90"
              asChild
            >
              <Link to={buttonLink}>
                <span>{buttonText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
