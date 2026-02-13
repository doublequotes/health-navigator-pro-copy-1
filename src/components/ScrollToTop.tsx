import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  // Access current location from React Router
  const { pathname } = useLocation();

  useEffect(() => {
    // Smoothly scroll to top-left of the document
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null; // This component doesn't render any UI
};

export default ScrollToTop;