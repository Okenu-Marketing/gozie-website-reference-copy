import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ─── Diagnostic Shuffler ─── */
const DiagnosticShuffler = () => {
  const labels = [
    { text: "Conversion Architecture", icon: "◆" },
    { text: "Performance Optimization", icon: "▲" },
    { text: "Responsive Engineering", icon: "●" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % labels.length), 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative h-40">
        <AnimatePresence mode="popLayout">
          {labels.map((label, i) => {
            const offset = (i - active + labels.length) % labels.length;
            return (
              <motion.div
                key={label.text}
                layout
                initial={{ y: 80, opacity: 0, scale: 0.8 }}
                animate={{
                  y: offset * 36,
                  opacity: 1 - offset * 0.35,
                  scale: 1 - offset * 0.06,
                  rotateX: offset * -4,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="absolute inset-x-0 top-0 w-full bg-background/80 backdrop-blur-sm border border-border/60 rounded-2xl px-6 py-5 flex items-center gap-4"
                style={{ zIndex: labels.length - offset }}
              >
                <span className="text-accent text-lg">{label.icon}</span>
                <span className="font-mono-data text-sm text-foreground tracking-wide">{label.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex gap-2 mt-2">
        {labels.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: i === active ? "100%" : "0%" }}
              transition={{ duration: i === active ? 2.8 : 0, ease: "linear" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Telemetry Typewriter ─── */
const TelemetryTypewriter = () => {
  const messages = ["New lead captured…", "Qualifying intent…", "Booking confirmed.", "Follow-up scheduled."];
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  useEffect(() => {
    if (charIndex < messages[lineIndex].length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCompletedLines((prev) => {
          const next = [...prev, messages[lineIndex]];
          return next.length > 4 ? next.slice(1) : next;
        });
        setLineIndex((l) => (l + 1) % messages.length);
        setCharIndex(0);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-background border border-border/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
        <motion.div
          className="absolute inset-x-0 h-px bg-accent/20"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-center gap-2.5 mb-5">
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-accent text-[11px] uppercase tracking-[0.2em] font-mono-data font-semibold">
            Live Feed
          </span>
          <div className="ml-auto flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-3 rounded-full bg-accent/40"
                animate={{ height: [12, 6, 12] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2.5 font-mono-data text-sm">
          {completedLines.map((msg, i) => (
            <motion.p
              key={`completed-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              className="text-muted-foreground"
            >
              <span className="text-accent/50 mr-2">›</span>
              {msg}
            </motion.p>
          ))}
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-foreground"
          >
            <span className="text-accent mr-2">›</span>
            {messages[lineIndex].slice(0, charIndex)}
            <motion.span
              className="text-accent inline-block ml-0.5"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              ▊
            </motion.span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

/* ─── Lead Automation Feed ─── */
const LeadAutomation = () => {
  const events = [
    { icon: "📞", label: "Missed call from (512) 555-0147", action: "Auto-text sent" },
    { icon: "💬", label: 'Lead replied: "Yes, I need a quote"', action: "Qualifying…" },
    { icon: "🔁", label: "Follow-up #2 triggered", action: "Sequence active" },
    { icon: "✅", label: "Lead converted → Appointment set", action: "Booked" },
  ];
  const [eventIndex, setEventIndex] = useState(0);
  const [log, setLog] = useState<(typeof events)[number][]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEventIndex((i) => {
        const nextIndex = (i + 1) % events.length;
        setLog((prev) => {
          const base = nextIndex === 0 ? [] : prev;
          const next = [...base, events[i]];
          return next.slice(-4);
        });
        return nextIndex;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(1, log.length / events.length);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-background border border-border/50 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-5">
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-accent text-[11px] uppercase tracking-[0.2em] font-mono-data font-semibold">
            Lead Recovery
          </span>
          <span className="ml-auto text-muted-foreground text-[10px] font-mono-data">24/7</span>
        </div>
        <div className="h-60 overflow-hidden space-y-2">
          <AnimatePresence initial={false}>
            {log.map((event, i) => (
              <motion.div
                key={`${event.label}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-start gap-3 px-3 py-2 rounded-xl border border-border/30 bg-secondary/20"
              >
                <span className="text-base mt-0.5">{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground font-medium truncate">{event.label}</p>
                  <p className="text-[10px] text-accent font-mono-data mt-0.5">{event.action}</p>
                </div>
                {i === log.length - 1 && (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 h-1 rounded-full bg-border/30 overflow-hidden">
          <motion.div
            className="h-full bg-accent/60 rounded-full"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Feature Row ─── */
const FeatureRow = ({
  number,
  title,
  description,
  ctaLabel,
  ctaLink,
  children,
  reversed,
}: {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  children: React.ReactNode;
  reversed?: boolean;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rowRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
    >
      <div className="flex-1 space-y-4">
        <span className="font-mono-data text-accent/60 text-xs tracking-[0.3em] uppercase">0{number}</span>
        <h3 className="font-heading font-bold text-2xl md:text-4xl text-foreground leading-tight">{title}</h3>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">{description}</p>
        <div className="pt-2">
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
          >
            {ctaLabel} <span>→</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full">{children}</div>
    </div>
  );
};

/* ─── Features Section ─── */
const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-6 md:px-16 py-24 md:py-36">
      <div className="text-center mb-20 md:mb-28">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono-data text-accent/60 text-xs tracking-[0.3em] uppercase"
        >
          What We Build
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground mt-4"
        >
          Three Ways to <span className="font-drama italic text-accent">Grow.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-muted-foreground text-sm md:text-base"
        >
          One partner. One system. Built around your business.
        </motion.p>
      </div>

      <div className="space-y-24 md:space-y-36">
        <FeatureRow
          number="1"
          title="Custom Websites"
          description="Mobile-optimized, SEO-ready, and built to convert, delivered in 7 days or less."
          ctaLabel="Start My Website"
          ctaLink="/websites#form"
        >
          <DiagnosticShuffler />
        </FeatureRow>

        <FeatureRow
          number="2"
          title="Local SEO"
          description="A full SEO system with guaranteed results in 30 days. Built for local businesses that want to get found and get called."
          ctaLabel="Rank My Business on Google"
          ctaLink="/local-seo#form"
          reversed
        >
          <TelemetryTypewriter />
        </FeatureRow>

        <FeatureRow
          number="3"
          title="AI Receptionist"
          description="Your business answers every call and chat, 24/7. Books appointments and qualifies leads while you sleep."
          ctaLabel="Try It Live"
          ctaLink="/ai-receptionist"
        >
          <LeadAutomation />
        </FeatureRow>
      </div>
    </section>
  );
};

export default Features;
