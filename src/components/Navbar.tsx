import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Websites", to: "/websites" },
  { label: "Local SEO", to: "/local-seo" },
  { label: "AI Receptionist", to: "/ai-receptionist" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl px-6 md:px-8 py-3.5 rounded-full transition-all duration-500 flex items-center justify-between bg-background/40 backdrop-blur-xl border border-border/40 shadow-lg">
      <Link to="/">
        <img src="/logo.png" alt="OkenuMarketing" className="h-12 w-auto -my-2" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className={`link-lift text-sm font-medium transition-colors ${
              location.pathname === l.to ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        to="/contact"
        className="hidden md:inline-flex items-center bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Contact
      </Link>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 bg-background/80 backdrop-blur-xl border border-border/40 rounded-3xl p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm font-medium ${
                location.pathname === l.to ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
