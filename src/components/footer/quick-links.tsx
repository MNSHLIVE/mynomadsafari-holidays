
import { Link } from "react-router-dom";

export const QuickLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Quick Links</h3>
      <ul className="space-y-2">
        {[
          { label: "About Us", href: "/about" },
          { label: "Destinations", href: "/destinations" },
          { label: "Tours", href: "/tours" },
          { label: "Visa Services", href: "/visa" },
          { label: "Blog", href: "/blog" },
          { label: "Contact Us", href: "/contact" },
        ].map((link) => (
          <li key={link.href}>
            <Link 
              to={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
