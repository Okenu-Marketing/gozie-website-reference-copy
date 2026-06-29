import { Link } from "react-router-dom";
import { Globe, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const serviceCards = [
  {
    icon: Globe,
    title: "You Don't Have a Website",
    subtitle: "Get a custom site that actually brings in customers. Live in 7 days.",
    cta: "Build My Website",
    to: "/websites",
  },
  {
    icon: MapPin,
    title: "Your Website Is Invisible on Google",
    subtitle:
      "A 46-page SEO website, GBP setup, and 70+ citations. Guaranteed 3x impressions in 30 days or you don't pay.",
    cta: "Rank My Business on Google",
    to: "/local-seo",
  },
  {
    icon: Phone,
    title: "You're Missing Calls and Losing Leads",
    subtitle: "An AI receptionist that answers 24/7, books appointments, and never drops a lead.",
    cta: "Automate My Calls",
    to: "/ai-receptionist",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-visible pt-24 md:pt-28 pb-2 md:pb-4 z-30"
    >
      <div className="relative z-30 text-center px-6 animate-fade-in">
        <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
          Your Customer Acquisition System. <span className="font-drama italic text-accent">Live in 7 Days.</span>
        </h1>
        <h2 className="mt-4 max-w-2xl mx-auto text-foreground/70 text-sm md:text-base leading-relaxed font-normal">
          Custom websites, local SEO, and AI receptionists built for local businesses ready to grow.
        </h2>
      </div>

      <p className="relative z-30 mt-12 text-accent text-xs font-semibold uppercase tracking-widest text-center animate-fade-in">
        What's holding your business back?
      </p>

      <div className="relative z-30 w-full max-w-5xl mx-auto px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {serviceCards.map((card, i) => (
          <motion.div key={card.to} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
            <Link
              to={card.to}
              className="relative z-30 group bg-secondary/50 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/60 hover:shadow-[0_0_24px_-4px_hsl(var(--accent)/0.25)] transition-all duration-300 h-full"
            >
              <card.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-base text-foreground leading-snug">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{card.subtitle}</p>
              <span className="inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold group-hover:opacity-90 transition-opacity mt-auto">
                {card.cta} <span className="ml-1">→</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
