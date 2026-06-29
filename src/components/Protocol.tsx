import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery & Architecture",
    desc: "Deep-dive into your business to blueprint conversion pathways.",
    animation: "circles",
  },
  {
    title: "Build & Integrate",
    desc: "Hand-coded implementation with AI systems wired in.",
    animation: "scanner",
  },
  {
    title: "Launch & Optimize",
    desc: "Go live, monitor telemetry, and continuously improve.",
    animation: "ekg",
  },
];

const CirclesAnim = () => (
  <div className="relative w-40 h-40 mx-auto">
    {[60, 80, 100, 120].map((size, i) => (
      <div
        key={i}
        className="absolute inset-0 m-auto rounded-full border border-accent/30 rotate-slow"
        style={{
          width: size,
          height: size,
          animationDuration: `${15 + i * 5}s`,
          animationDirection: i % 2 === 0 ? "normal" : "reverse",
        }}
      />
    ))}
    <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-accent" />
  </div>
);

const ScannerAnim = () => (
  <div className="relative h-40 overflow-hidden">
    <div className="grid grid-cols-8 gap-2 p-4">
      {Array.from({ length: 32 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-muted-foreground/20" />
      ))}
    </div>
    <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent scan-line" />
  </div>
);

const EkgAnim = () => (
  <div className="flex items-center justify-center h-40">
    <svg viewBox="0 0 200 60" className="w-full max-w-xs">
      <polyline
        points="0,30 20,30 30,30 40,10 50,50 60,30 70,30 80,30 90,30 100,30 110,30 120,10 130,50 140,30 150,30 160,30 170,30 180,30 200,30"
        fill="none"
        stroke="hsl(43, 55%, 54%)"
        strokeWidth="2"
        strokeDasharray="1000"
        className="ekg-pulse"
      />
    </svg>
  </div>
);

const Protocol = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 20%",
          end: "bottom top",
          pin: true,
          pinSpacing: i === cards.length - 1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animations = [<CirclesAnim />, <ScannerAnim />, <EkgAnim />];

  return (
    <section ref={sectionRef} className="relative">
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-mono-data mb-3">Our Process</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          The <span className="font-drama italic text-accent">Protocol</span>
        </h2>
      </div>
      {steps.map((step, i) => (
        <div
          key={i}
          className="protocol-card h-screen flex items-center justify-center px-6"
        >
          <div className="bg-secondary border border-border rounded-3xl p-12 md:p-16 max-w-2xl w-full text-center">
            <p className="font-mono-data text-xs text-accent uppercase tracking-widest mb-4">
              Step {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-4">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-base mb-8">{step.desc}</p>
            {animations[i]}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Protocol;
