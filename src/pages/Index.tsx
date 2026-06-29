import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import WhyWebsite from "@/components/WhyWebsite";
import Features from "@/components/Features";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Gozie Okenu",
  "description": "Digital marketing agency in Austin, Texas offering website design, local SEO, and AI receptionist services",
  "url": "https://gozieokenu.com",
  "areaServed": "Austin, Texas",
  "serviceType": ["Website Design", "Local SEO", "AI Receptionist"],
  "priceRange": "$$",
  "geo": {
    "@type": "GeoCoordinates",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  }
};

/* ─── NOISE OVERLAY ─── */
const NoiseOverlay = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

/* ─── MOCKUP CAROUSEL ─── */
const desktopMockups = [
  { src: "/mockups/YK_LAPTOP.jpg", alt: "YK Officials barber website designed by Gozie Okenu in Austin TX" },
  { src: "/mockups/MD_Laptop.jpg", alt: "MD BodyShop auto body website built by Gozie Okenu Austin web designer" },
  { src: "/mockups/Landscaping_Computer.jpg", alt: "Sky's The Limit landscaping website by Austin marketing agency" },
  { src: "/mockups/HVAC_Computer.jpg", alt: "CoolAir Pro HVAC website designed by Gozie Okenu Austin TX" },
  { src: "/mockups/Luu_Laptop.jpg", alt: "Luu Auto Repair website by Austin TX web design agency" },
  { src: "/mockups/MindfulCare_Laptop.jpg", alt: "MindfulCare Solutions mental health website by Gozie Okenu" },
];

const phoneMockups = [
  { src: "/mockups/phone/YK_Phone.jpg", alt: "YK Officials mobile website design by Austin agency" },
  { src: "/mockups/phone/MD_Phone.jpg", alt: "MD BodyShop mobile responsive website Austin TX" },
  { src: "/mockups/phone/Landscaping_Phone.jpg", alt: "Sky's The Limit mobile landscaping website" },
  { src: "/mockups/phone/HVAC_Phone.jpg", alt: "CoolAir Pro HVAC mobile website Austin" },
  { src: "/mockups/phone/Luu_Phone.jpg", alt: "Luu Auto Repair mobile website design" },
  { src: "/mockups/phone/MindfulCare_Phone.jpg", alt: "MindfulCare Solutions mobile website" },
];

const MockupCarousel = () => {
  const isMobile = useIsMobile();
  const mockups = isMobile ? phoneMockups : desktopMockups;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + mockups.length) % mockups.length);
  const next = () => goTo((current + 1) % mockups.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % mockups.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [mockups.length]);

  return (
    <div className="relative w-full h-full group" role="region" aria-label="Website portfolio carousel">
      {mockups.map((m, i) => (
        <img
          key={m.src}
          src={m.src}
          alt={m.alt}
          width={1200}
          height={750}
          className={`absolute inset-0 w-full h-full object-cover object-left-top md:object-left-top lg:object-cover lg:object-top rounded-xl transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <button onClick={prev} aria-label="Previous website mockup" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 backdrop-blur-sm border border-border/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80">
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button onClick={next} aria-label="Next website mockup" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 backdrop-blur-sm border border-border/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80">
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {mockups.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-accent w-6" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── INDEX PAGE ─── */
const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <SEO
        title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
        description="Gozie Okenu is a digital marketing agency in Austin, Texas. Custom websites, local SEO, and AI receptionist services to turn traffic into booked appointments."
        path="/"
        geoTags
        jsonLd={homepageJsonLd}
      />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />

        <div className="relative z-0 -mt-8 md:-mt-12">
          <ContainerScroll titleComponent={null}>
            <MockupCarousel />
          </ContainerScroll>
        </div>

        {/* Portfolio CTA */}
        <div className="relative z-10 text-center -mt-16 md:-mt-20 pb-12">
          <Link
            to="/websites"
            className="inline-flex items-center gap-2 border border-accent text-accent px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View Our Full Portfolio <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Features />

        {/* Get Started CTA after Three Ways to Grow */}
        <div className="text-center pb-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]"
          >
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Testimonials />

        {/* Get Started CTA after Reviews */}
        <div className="text-center pb-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]"
          >
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>

        <About />
        <Services />

        {/* Get Started CTA after Growth Toolkit */}
        <div className="text-center pb-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]"
          >
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>

        <WhyWebsite />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
