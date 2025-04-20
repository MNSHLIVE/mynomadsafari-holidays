
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  slides: {
    imageSrc: string;
    title: string;
    subtitle?: string;
  }[];
  interval?: number;
  className?: string;
}

const HeroSlider = ({ slides, interval = 5000, className }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  // Preload the next image for smoother transitions
  useEffect(() => {
    // Preload current, next and previous images
    const imagesToPreload = [];
    const currentIdx = currentSlide;
    const nextIdx = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    const prevIdx = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    
    [currentIdx, nextIdx, prevIdx].forEach(idx => {
      if (!preloadedImages.includes(slides[idx].imageSrc)) {
        imagesToPreload.push(slides[idx].imageSrc);
      }
    });

    if (imagesToPreload.length) {
      const newPreloadedImages = [...preloadedImages, ...imagesToPreload];
      setPreloadedImages(newPreloadedImages);
      
      // Create image objects to trigger browser preloading
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [currentSlide, slides, preloadedImages]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    let slideTimer: number | undefined;
    
    if (isAutoPlaying) {
      slideTimer = window.setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (slideTimer) clearInterval(slideTimer);
    };
  }, [currentSlide, isAutoPlaying, interval]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({...prev, [index]: true}));
  };

  return (
    <div 
      className={cn("relative overflow-hidden min-h-[calc(100vh-64px)]", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image preloading div (hidden) */}
      <div className="hidden">
        {preloadedImages.map((src, idx) => (
          <img key={idx} src={src} alt="preload" />
        ))}
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className={cn(
            "absolute inset-0 bg-gray-200",
            loadedImages[index] ? "hidden" : "block"
          )} />
          <img
            src={slide.imageSrc}
            alt={slide.title}
            className={cn(
              "absolute w-full h-full object-cover",
              loadedImages[index] ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => handleImageLoad(index)}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40 hero-gradient" />
          
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center text-white pt-20 md:pt-0 animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/30 mb-4">
                Discover the World with Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-xl md:text-2xl text-white/80 mb-8">
                  {slide.subtitle}
                </p>
              )}
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#package-calculator" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 py-2">
                  Calculate Your Trip
                </a>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white/10 text-white hover:bg-white/20 h-11 rounded-md px-8 py-2">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-300"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-300"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
