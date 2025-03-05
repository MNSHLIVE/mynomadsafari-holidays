
import { Link } from "react-router-dom";
import { Palmtree, Mountain, Star, Building, Plane, Map } from "lucide-react";

interface TravelCategoryProps {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const travelCategories: TravelCategoryProps[] = [
  { icon: <Palmtree className="h-6 w-6" />, name: "Beaches", link: "/destinations?category=beaches" },
  { icon: <Mountain className="h-6 w-6" />, name: "Mountains", link: "/destinations?category=mountains" },
  { icon: <Star className="h-6 w-6" />, name: "Pilgrimage", link: "/destinations?category=pilgrimage" },
  { icon: <Building className="h-6 w-6" />, name: "Heritage", link: "/destinations?category=heritage" },
  { icon: <Plane className="h-6 w-6" />, name: "International", link: "/destinations?category=international" },
  { icon: <Map className="h-6 w-6" />, name: "Adventure", link: "/destinations?category=adventure" },
];

const TravelCategories = () => {
  return (
    <section className="py-10 container mx-auto px-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {travelCategories.map((category, index) => (
          <Link to={category.link} key={index} className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 transition-all group-hover:bg-primary/20">
              {category.icon}
            </div>
            <span className="text-xs md:text-sm text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TravelCategories;
