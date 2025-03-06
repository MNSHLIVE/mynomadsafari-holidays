
import { ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "./main-nav";
import Footer from "./footer";
import WhatsAppButton from "./whatsapp-button";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Add WhatsApp widget script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    document.body.appendChild(script);
    
    // Create the WhatsApp widget container if it doesn't exist
    if (!document.getElementById("whatsapp-widget")) {
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "elfsight-app-whatsapp-chat";
      widgetContainer.id = "whatsapp-widget";
      widgetContainer.setAttribute("data-elfsight-app-lazy", "");
      widgetContainer.setAttribute("data-elfsight-app-widget-id", "whatsapp-chat-1");
      document.body.appendChild(widgetContainer);
    }
    
    // Define custom WhatsApp widget configuration
    window.addEventListener("load", function() {
      if (window.elfsightWhatsAppChatConfig) return;
      
      window.elfsightWhatsAppChatConfig = {
        phone: "+919968682200, +917042910449",
        name: "My Nomadsafari Holidays",
        message: "Hi! I'd like to know more about your travel packages.",
        position: "right",
        availability: "24/7",
        welcomeMessage: "Hello! How can we help you plan your perfect vacation?",
        buttonText: "Chat with us",
        buttonIcon: "whatsapp",
        buttonPosition: "right",
        headerTitle: "Chat with our offices",
        headerSubtitle: "Delhi and Mumbai offices available",
        style: {
          buttonColor: "#25D366",
          headerColor: "#128C7E"
        }
        // Removed the 'labels' property as it's not supported by the type
      };
      
      // Manually initiate widget rendering
      if (window.ElfsightApp) {
        window.ElfsightApp.initWidgets();
      }
    });
    
    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 pt-16">
        {children || <Outlet />}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
