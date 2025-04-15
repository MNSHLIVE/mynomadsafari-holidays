
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Destinations from "./pages/Destinations";
import Visa from "./pages/Visa";
import Tours from "./pages/Tours";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/destinations",
    element: <Destinations />,
  },
  {
    path: "/visa",
    element: <Visa />,
  },
  {
    path: "/tours",
    element: <Tours />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Add scroll behavior for hash links
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    // Handle hash navigation when page loads
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  });

  // Add smooth scroll for all hash links
  document.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      const href = e.target.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
}

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="nomadsafari-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
