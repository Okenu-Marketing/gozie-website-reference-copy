import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <SEO
        title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
        description="The page you're looking for doesn't exist. Return to Gozie Okenu's homepage for website design, local SEO, and AI receptionist services in Austin TX."
        path={location.pathname}
      />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-heading font-bold text-6xl md:text-8xl text-accent mb-4">404</h1>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
