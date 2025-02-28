
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  tag?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  className,
  align = "center",
  tag,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "mb-10",
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
    >
      {tag && (
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3 animate-fade-in">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
