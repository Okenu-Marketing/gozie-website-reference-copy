import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, MapPin, Phone, Star, Briefcase, Mail } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Custom Website",
    desc: "Simple or complex, every site is mobile-optimized, SEO-ready, and built to convert visitors into customers. Delivered in 7 days.",
    area: "md:col-span-2 md:row-span-1",
  },
  {
    icon: MapPin,
    title: "Local SEO System",
    desc: "A 20–46 page SEO pyramid website, GBP setup, 70+ directory citations, and review automation — built to get your business found on Google.",
    area: "md:col-span-1 md:row-span-2",
  },
  {
    icon: Phone,
    title: "AI Receptionist",
    desc: "Your business answers every call and chat 24/7. Books appointments, qualifies leads, and never misses a customer — even while you sleep.",
    area: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Star,
    title: "Review Automation",
    desc: "Automated SMS and email sequences that generate Google reviews on autopilot. Includes a Google review QR code.",
    area: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Briefcase,
    title: "Google Business Profile Setup",
    desc: "We build and fully optimize your GBP so local customers find you first. Included with Local SEO.",
    badge: "Free",
    area: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Mail,
    title: "Professional Business Email",
    desc: "A branded email address (you@yourcompany.com) that makes your business look established from day one.",
    badge: "Free",
    area: "md:col-span-2 md:row-span-1",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="max-w-6xl mx-auto px-6 md:px-16 py-24">
      {/* Header */}
      <div className="mb-14">
        <p className="text-accent text-xs uppercase tracking-[0.25em] font-mono-data mb-2">What's Included</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground leading-tight">
          Your Core Growth&nbsp;
          <span className="font-drama italic text-accent">Toolkit</span>
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className={`service-card relative rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/80 to-secondary/30 p-7 flex flex-col justify-between overflow-hidden ${s.area}`}
          >
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
              movementDuration={1.5}
            />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-auto">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                {s.badge && (
                  <span className="bg-accent/15 text-accent text-[10px] uppercase tracking-wider font-mono-data px-2.5 py-1 rounded-full">
                    {s.badge}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h3 className="font-heading font-bold text-base text-foreground mb-1.5">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
