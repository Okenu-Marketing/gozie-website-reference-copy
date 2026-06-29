import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-accent/40"
        >
          <img
            src="/images/gozie-photo.jpg"
            alt="Gozie — Founder of OkenuMarketing"
            className="w-full h-full object-cover object-[center_25%] scale-110"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-bold text-4xl md:text-5xl text-foreground"
        >
          Meet{" "}
          <span className="font-heading font-bold text-accent">Gozie</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Your trusted AI & web specialist bringing automation, innovation, and leverage to every project.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-secondary border border-border rounded-3xl p-8 md:p-10 space-y-5 text-muted-foreground text-sm md:text-base leading-relaxed"
      >
        <p>
          Gozie is passionate about building AI-powered websites and systems that not only look incredible, but <em>generate leads on autopilot</em>. With an engineering mindset, he designs scalable digital infrastructures that turn traffic into revenue, day and night.
        </p>
        <p>
          At 21, Gozie earned his Civil Engineering degree from UT Austin, then took that same analytical mindset and applied it to digital marketing. He's booked 50+ appointments in under a month for fitness coaches, built a $20k pipeline in a single week for HVAC companies, and developed AI sales systems that have generated 5–10 qualified bookings per week consistently.
        </p>
        <p>
          Gozie believes every business deserves a digital presence that operates as a true 24/7 sales machine. His commitment to seamless automation, clean design, and measurable results has earned him the trust of business owners who are serious about scaling, and ready to dominate their market.
        </p>
        <blockquote className="border-l-4 border-accent pl-6 pt-2">
          <p className="font-heading font-semibold text-foreground mb-2 text-sm uppercase tracking-wider">
            Gozie's Philosophy
          </p>
          <p className="italic text-muted-foreground leading-relaxed">
            "A great website isn't just digital real estate, it's an automated growth engine. I don't build pages, I build systems that create leverage, save you time, and increase revenue so you can focus on what you do best."
          </p>
        </blockquote>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center mt-14 space-y-4"
      >
        <p className="text-muted-foreground text-sm">You've built a business you believe in. Let's make sure the world believes in it too.</p>
        <p className="text-3xl font-drama italic text-accent">OkenuMarketing</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-accent text-accent-foreground transition-opacity hover:opacity-90 shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]"
        >
          Get Started <span>→</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default About;
