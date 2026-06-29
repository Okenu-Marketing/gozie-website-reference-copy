import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Websites", to: "/websites" },
  { label: "Local SEO", to: "/local-seo" },
  { label: "AI Receptionist", to: "/ai-receptionist" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="relative bg-background rounded-t-[4rem] border-t border-border mt-20">
    <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 md:py-24">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="font-heading font-bold text-xl text-foreground">
            OkenuMarketing
          </Link>
          <p className="text-muted-foreground text-sm mt-3 max-w-xs">
            Digital marketing agency in Austin, Texas. Custom websites, local SEO, and AI receptionist services engineered to turn traffic into booked appointments.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://www.instagram.com/gozie.okenu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@gozie.okenu" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-accent transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 3.76.9V6.69Z"/></svg>
            </a>
            <a href="https://www.youtube.com/@gozieokenu" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-accent transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/gokenu" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-accent transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <h4 className="font-heading font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
            Navigation
          </h4>
          <div className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
        <div>
          <h4 className="font-heading font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
            Contact
          </h4>
          <address className="not-italic space-y-2">
            <a
              href="mailto:info@okenumarketing.com"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@okenumarketing.com
            </a>
            <a
              href="tel:+15127102319"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              +1 (512) 710-2319
            </a>
            <p className="text-sm text-muted-foreground">Austin, Texas</p>
          </address>
          <div className="flex items-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="font-mono-data text-xs text-muted-foreground">
              System Operational
            </span>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} OkenuMarketing. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
