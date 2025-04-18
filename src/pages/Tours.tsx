
import { useState } from "react";
import ToursSearchHeader from "@/components/tours/tours-search-header";
import DoorToDoorSection from "@/components/tours/door-to-door-section";
import ThemeTourSection from "@/components/tours/theme-tour-section";
import { 
  honeymoonTours, 
  adventureTours, 
  jungleSafariTours 
} from "@/components/tours/tours-data";

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter door-to-door packages
  const doorToDoorPackages = [
    {
      id: 101,
      title: "Dubai Family Delight",
      imageSrc: "https://images.unsplash.com/photo-1582672750001-3bacac6a1cb5?q=80&w=800",
      location: "Dubai, UAE",
      duration: "7 Days",
      price: "₹159,999",
      bestTime: "October - April",
      packageType: "Luxury" as const,
      description: "Experience the magic of Dubai with this exclusive family package. From doorstep pickup to airport transfers, everything is taken care of for a hassle-free vacation.",
    },
    {
      id: 102,
      title: "Singapore Complete Experience",
      imageSrc: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800",
      location: "Singapore",
      duration: "6 Days",
      price: "₹145,999",
      bestTime: "Year Round",
      packageType: "Luxury" as const,
      description: "Discover the beauty of Singapore with our complete package that takes care of every detail from your doorstep to Singapore and back.",
    },
    {
      id: 103,
      title: "Enchanting Bali Getaway",
      imageSrc: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800",
      location: "Bali, Indonesia",
      duration: "8 Days",
      price: "₹135,999",
      bestTime: "April - October",
      packageType: "Luxury" as const,
      description: "A carefully crafted door-to-door Bali experience with personal assistance throughout the journey. Perfect for couples and honeymooners.",
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <ToursSearchHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <DoorToDoorSection doorToDoorPackages={doorToDoorPackages} />

      {/* Honeymoon Tours Section */}
      <ThemeTourSection
        title="Romantic Honeymoon Packages"
        subtitle="Begin your journey of love with our specially curated honeymoon packages"
        tag="Honeymoon Specials"
        tours={honeymoonTours}
        categorySlug="honeymoon"
        actionText="View All Honeymoon Packages"
        actionIcon="heart"
        className="bg-muted/30 py-16 rounded-lg"
      />

      {/* Adventure Tours Section */}
      <ThemeTourSection
        title="Adventure Tours"
        subtitle="For thrill-seekers looking for an adrenaline-filled vacation"
        tag="Adventure Awaits"
        tours={adventureTours}
        categorySlug="adventure"
        actionText="Explore All Adventure Tours"
        actionIcon="mountain"
      />

      {/* Jungle Safari Section */}
      <ThemeTourSection
        title="Jungle Safari Tours"
        subtitle="Explore wildlife in their natural habitat with our guided safari tours"
        tag="Wildlife Experiences"
        tours={jungleSafariTours}
        categorySlug="jungle"
        actionText="View All Jungle Safari Tours"
        actionIcon="tree"
        className="bg-muted/30 py-16 rounded-lg"
      />
    </div>
  );
};

export default Tours;
