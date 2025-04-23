
import { Link } from "react-router-dom";
import { CompanyInfo } from "./footer/company-info";
import { QuickLinks } from "./footer/quick-links";
import { ContactInfo } from "./footer/contact-info";
import { Newsletter } from "./footer/newsletter";

const Footer = () => {
  return (
    <footer className="bg-muted/50 dark:bg-muted/20 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <CompanyInfo />
          <QuickLinks />
          <ContactInfo />
          <Newsletter />
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} My Nomadsafari Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
