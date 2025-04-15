
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import ReligiousTours from "./pages/ReligiousTours";
import GroupTours from "./pages/GroupTours";
import Visa from "./pages/Visa";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Faq from "./pages/Faq";
import TourItineraries from "./pages/TourItineraries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Layout><NotFound /></Layout>}>
      <Route index element={<Index />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="destinations" element={<Destinations />} />
      <Route path="tours" element={<Tours />} />
      <Route path="religious-tours" element={<ReligiousTours />} />
      <Route path="group-tours" element={<GroupTours />} />
      <Route path="visa" element={<Visa />} />
      <Route path="blog" element={<Blog />} />
      <Route path="contact" element={<Contact />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="refund" element={<Refund />} />
      <Route path="faq" element={<Faq />} />
      <Route path="tour-itineraries" element={<TourItineraries />} />
    </Route>
  )
);

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App;
