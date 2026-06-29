import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BundlesTeaser = () => (
  <section className="max-w-5xl mx-auto px-6 md:px-16 py-24">
    <div className="text-center mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground"
      >
        Want It All?{" "}
        <span className="font-drama italic text-accent">Bundle and Save.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base"
      >
        Done-for-you packages that combine websites, SEO, and AI into one growth system.
      </motion.p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Starter Bundle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary/50 border border-border rounded-2xl p-8 flex flex-col"
      >
        <h3 className="font-heading font-bold text-xl text-foreground mb-4">Starter Bundle</h3>
        <ul className="space-y-3 text-muted-foreground text-sm flex-1">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Custom website
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Google Business Profile setup
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Business email
          </li>
        </ul>
        <Link
          to="/websites"
          className="mt-8 flex items-center justify-center gap-2 border border-border rounded-xl py-3.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Learn More →
        </Link>
      </motion.div>

      {/* Growth Bundle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative bg-secondary/50 border border-accent/40 rounded-2xl p-8 flex flex-col"
      >
        <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full">
          Most Popular
        </span>
        <h3 className="font-heading font-bold text-xl text-foreground mb-4">Growth Bundle</h3>
        <ul className="space-y-3 text-muted-foreground text-sm flex-1">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Full SEO system + 20–46 page website
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> AI Receptionist + appointment booking
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Google Business Profile + citations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span> Guaranteed results in 30 days
          </li>
        </ul>
        <Link
          to="/ai-receptionist"
          className="mt-8 flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-xl py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Learn More →
        </Link>
      </motion.div>
    </div>
  </section>
);

export default BundlesTeaser;
