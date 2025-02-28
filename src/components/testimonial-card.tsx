
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
  rating?: number;
  className?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  avatarSrc,
  rating = 5,
  className,
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl bg-card border border-border/50 shadow-sm flex flex-col h-full card-hover",
        className
      )}
    >
      <Quote className="h-8 w-8 text-primary/30 mb-4" />
      
      <p className="text-foreground/90 mb-6 flex-grow">"{quote}"</p>
      
      <div className="flex items-center mt-auto">
        {avatarSrc ? (
          <img 
            src={avatarSrc} 
            alt={author} 
            className="w-10 h-10 rounded-full mr-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
            {author.charAt(0)}
          </div>
        )}
        
        <div>
          <p className="font-medium">{author}</p>
          {role && <p className="text-xs text-muted-foreground">{role}</p>}
        </div>
        
        {rating > 0 && (
          <div className="ml-auto flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-4 w-4",
                  i < rating ? "text-primary" : "text-gray-300 dark:text-gray-600"
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
