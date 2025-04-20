
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Button asChild>
          <Link to="/" className="flex items-center">
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
