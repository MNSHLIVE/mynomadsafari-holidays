
import { ReactNode, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MainNav } from "./main-nav";
import Footer from "./footer";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page views on route change
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
    
    // Track Facebook page views
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Add WhatsApp widget script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    
    // Only append the script if it doesn't already exist
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      document.body.appendChild(script);
    }
    
    // Create the WhatsApp widget container if it doesn't exist
    if (!document.getElementById("whatsapp-widget")) {
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "elfsight-app-a66932d0-6134-4f31-a0eb-1464fb2300a4"; // Updated correct widget class
      widgetContainer.id = "whatsapp-widget";
      widgetContainer.setAttribute("data-elfsight-app-lazy", "");
      document.body.appendChild(widgetContainer);
    }
    
    return () => {
      // Don't remove the script on unmount to prevent reinitializing on route changes
      // This prevents duplicate scripts and errors
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 pt-8">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
