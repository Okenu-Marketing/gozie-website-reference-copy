import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Essential",
    price: "Starting at $2,500",
    desc: "Core website build",
    features: ["Custom-coded website", "Mobile-responsive design", "SEO foundation", "Contact form integration"],
    highlighted: false,
  },
  {
    name: "Performance",
    price: "Starting at $5,000",
    desc: "Website + AI Receptionist",
    features: [
      "Everything in Essential",
      "AI-powered receptionist",
      "Lead qualification system",
      "Automated follow-ups",
      "Analytics dashboard",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full conversion infrastructure",
    features: [
      "Everything in Performance",
      "Automated booking system",
      "CRM integration",
      "Ongoing optimization",
      "Priority support",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="max-w-6xl mx-auto px-6 md:px-16 py-24">
      <div className="text-center mb-16">
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-mono-data mb-3">Investment</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          Choose your <span className="font-drama italic text-accent">tier</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card rounded-3xl p-8 border ${
              tier.highlighted
                ? "bg-accent/10 border-accent"
                : "bg-secondary border-border"
            }`}
          >
            <p className="font-mono-data text-xs text-accent uppercase tracking-widest mb-2">{tier.desc}</p>
            <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{tier.name}</h3>
            <p className="text-muted-foreground text-sm mb-6">{tier.price}</p>
            <ul className="space-y-3 mb-8">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/start"
              className={`block text-center py-3 rounded-full text-sm font-semibold transition-colors ${
                tier.highlighted
                  ? "bg-accent text-accent-foreground"
                  : "border border-border text-foreground hover:bg-secondary"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
