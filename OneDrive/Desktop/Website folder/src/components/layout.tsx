import { ReactNode, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "./main-nav";
import Footer from "./footer";
import WhatsAppButton from "./whatsapp-button";

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
  }, [location]);

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
