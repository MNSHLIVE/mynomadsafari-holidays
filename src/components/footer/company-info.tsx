
import { SocialLinks } from "./social-links";

export const CompanyInfo = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
          alt="My Nomadsafari Holidays" 
          className="h-10 w-auto"
        />
        <h3 className="font-bold text-lg text-primary">My Nomadsafari Holidays</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Your one-stop travel expert helping you explore the world your way since 2010.
      </p>
      <SocialLinks />
    </div>
  );
};
