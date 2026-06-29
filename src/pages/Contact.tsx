import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, MapPin, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cards = [
  {
    icon: Globe,
    title: "Build My Website",
    subtitle: "Custom websites delivered in 7 days. Simple or complex, built to convert.",
    cta: "Build My Website",
    to: "/websites#form",
  },
  {
    icon: MapPin,
    title: "Rank My Business on Google",
    subtitle: "Local SEO system with guaranteed results in 30 days or you don't pay.",
    cta: "Rank My Business on Google",
    to: "/local-seo#form",
  },
  {
    icon: Phone,
    title: "Automate My Calls",
    subtitle: "AI receptionist that answers 24/7 and books appointments automatically.",
    cta: "Automate My Calls",
    to: "/ai-receptionist",
    state: { scrollToForm: true },
  },
];

const Contact = () => (
  <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
    <SEO
      title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
      description="Get in touch with Gozie Okenu for custom website design, local SEO, or AI receptionist services in Austin, Texas. Free consultation available."
      path="/contact"
    />
    <Navbar />
    <main>
      <section className="relative flex flex-col items-center justify-center pt-32 md:pt-40 pb-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent text-xs font-semibold uppercase tracking-widest mb-4"
        >
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground text-center leading-tight"
        >
          What Can We Help You With?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base text-center leading-relaxed"
        >
          Pick the service you're interested in and we'll take it from there.
        </motion.p>

        <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link
                to={card.to}
                state={card.state}
                className="group bg-secondary/50 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/60 hover:shadow-[0_0_24px_-4px_hsl(var(--accent)/0.25)] transition-all duration-300 h-full"
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-muted-foreground text-sm text-center"
        >
          Not sure which you need? Chat with us using the button in the bottom right corner.
        </motion.p>
      </section>
    </main>

    <Footer />
  </div>
);

export default Contact;
