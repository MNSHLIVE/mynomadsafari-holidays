
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const SocialLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Follow Us</h3>
      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com/mynomadsafari/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary"
        >
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </a>
        <a
          href="https://www.facebook.com/mynomadsafari"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary"
        >
          <Facebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </a>
        <a
          href="https://www.linkedin.com/in/devandeshpande/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary"
        >
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </div>
  );
};
