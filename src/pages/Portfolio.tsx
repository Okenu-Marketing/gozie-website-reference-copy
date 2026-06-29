import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const portfolioItems = [
  { src: "/mockups/YK_LAPTOP.jpg", name: "YK Officials", type: "Premium Barber", category: "Barbershops", url: "ykofficials.com", desc: "Custom website with booking integration and social media presence for a premium barbershop in Kansas City." },
  { src: "/mockups/MD_Laptop.jpg", name: "MD BodyShop", type: "Auto Body Experts", category: "Auto Services", url: "mdbodyshop.okenumarketing.com", desc: "Professional site with quote request system and chat widget for Austin's family-run collision repair shop." },
  { src: "/mockups/Landscaping_Computer.jpg", name: "Sky's The Limit", type: "Landscaping & Construction", category: "Home Services", url: "skysthelimitllc.okenumarketing.com", desc: "Bilingual multi-service website with free estimate forms and Google integration for a full-service contractor." },
  { src: "/mockups/HVAC_Computer.jpg", name: "CoolAir Pro", type: "HVAC Services", category: "Home Services", url: "hvac.okenumarketing.com", desc: "Dark premium design with 24/7 booking, live chat, and emergency service CTAs for a climate control company." },
  { src: "/mockups/Luu_Laptop.jpg", name: "Luu Auto Repair", type: "Auto Repair", category: "Auto Services", url: "luuautorepair.okenumarketing.com", desc: "High-trust design with Google rating badge, click-to-call, and free estimate flow for a 20+ year auto shop." },
  { src: "/mockups/MindfulCare_Laptop.jpg", name: "MindfulCare Solutions", type: "Mental Health Practice", category: "Healthcare", url: "mindfulcaresolutions.com", desc: "Warm, professional site with multi-state licensing display and appointment scheduling for psychiatric care." },
  { src: "/mockups/Tampa_SEO_Laptop.png", name: "Tampa Personal Injury", type: "SEO Pyramid Site", category: "SEO", url: "car-accident-healthline-tampa.netlify.app", desc: "A 46-page SEO pyramid site built for a Tampa personal injury practice to dominate local search results." },
];

const categories = ["All", ...new Set(portfolioItems.map((item) => item.category))];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === filter);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SEO
        title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
        description="Browse custom websites built by Gozie Okenu for local businesses. Mobile-optimized, SEO-ready designs for barbers, HVAC, auto repair, and more in Austin TX."
        path="/portfolio"
      />
      <Navbar />
      <main>

      {/* Header */}
      <div className="pt-32 pb-12 text-center px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight text-foreground">
          Full <span className="font-drama italic text-accent">Portfolio</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
          Each site is custom-coded, mobile-optimized, and designed to grow with the brand.
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-center px-6 mb-12">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[240px] bg-secondary/50 border-border rounded-xl h-14">
            <span className="text-muted-foreground mr-1">Filter by:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.name} className="bg-secondary/30 border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 group flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={item.src} alt={`${item.name} ${item.type} website designed by Gozie Okenu Austin TX`} width={800} height={500} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full">{item.category}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-xl text-foreground">{item.name}</h3>
                <p className="text-accent text-sm font-medium mt-1">{item.type}</p>
                <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer" className="font-mono-data text-xs text-accent/70 hover:text-accent transition-colors mt-3 underline underline-offset-2">{item.url}</a>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 flex-1">{item.desc}</p>
                <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 border border-border rounded-xl py-3.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  View Full Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t border-border">
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          Ready to build your <span className="font-drama italic text-accent">dream website</span>?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-base md:text-lg">
          Join these successful businesses and get a custom website that drives real results.
        </p>
        <Link
          to="/websites"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity mt-8"
        >
          Get Started Today <span>→</span>
        </Link>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
