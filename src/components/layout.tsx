
import { ReactNode } from "react";
import MainNav from "./main-nav";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
