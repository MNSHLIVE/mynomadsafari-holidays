
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Tours from "./pages/Tours";
import ReligiousTours from "./pages/ReligiousTours";
import GroupTours from "./pages/GroupTours";
import Visa from "./pages/Visa";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BookTickets from "./pages/BookTickets";
import TripCalculator from "./pages/TripCalculator";
import TravelCRM from "./pages/TravelCRM";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Faq from "./pages/Faq";
import { ErrorBoundary } from "@/components/error-boundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<Layout><NotFound /></Layout>}>
        <Route index element={<Index />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:slug" element={<DestinationDetail />} />
        <Route path="tours" element={<Tours />} />
        <Route path="packages" element={<Navigate to="/tours" replace />} />
        <Route path="religious-tours" element={<ReligiousTours />} />
        <Route path="group-tours" element={<GroupTours />} />
        <Route path="visa" element={<Visa />} />
        <Route path="tickets" element={<BookTickets />} />
        <Route path="book-tickets" element={<Navigate to="/tickets" replace />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="trip-calculator" element={<TripCalculator />} />
        <Route path="calculate-trip" element={<Navigate to="/trip-calculator" replace />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="refund" element={<Refund />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/crm/*" element={<TravelCRM />} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;
