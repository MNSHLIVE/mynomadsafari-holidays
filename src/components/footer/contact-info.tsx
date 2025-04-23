
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Contact Us</h3>
      <ul className="space-y-3">
        {/* Mumbai Office */}
        <li className="flex items-start space-x-3">
          <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Mumbai Office:</span><br />
            My Nomadsafari Holidays, 102 T.V Tower Badlapur East, Thane, Mumbai - 421503
          </div>
        </li>
        {/* Delhi Office */}
        <li className="flex items-start space-x-3">
          <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Delhi Office:</span><br />
            My Nomadsafari Holidays, Dwarka Sec 3, New Delhi - 110078<br />
            Contact: Deven Deshpande
          </div>
        </li>
        {/* Phone Numbers */}
        <li className="flex items-start space-x-3">
          <Phone size={18} className="text-primary flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <a href="tel:+919968682200" className="block hover:text-primary transition-colors">Mumbai: +91 9968682200</a>
            <a href="tel:+917042910449" className="block hover:text-primary transition-colors">Delhi: +91 7042910449</a>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <Mail size={18} className="text-primary flex-shrink-0" />
          <a 
            href="mailto:info@mynomadsafariholidays.in"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            info@mynomadsafariholidays.in
          </a>
        </li>
      </ul>
    </div>
  );
};
