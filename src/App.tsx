
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
