import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-word", {
        opacity: 0.1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const line1 = "Most agencies focus on: traffic and impressions.".split(" ");
  const line2Words = ["We", "engineer:"];
  const highlight = "conversion infrastructure.";

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-16 max-w-5xl mx-auto text-center">
      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
        {line1.map((w, i) => (
          <span key={i} className="philosophy-word inline-block mr-2">{w}</span>
        ))}
      </p>
      <p className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
        {line2Words.map((w, i) => (
          <span key={i} className="philosophy-word inline-block mr-3">{w}</span>
        ))}
        <span className="philosophy-word font-drama italic text-accent inline-block">{highlight}</span>
      </p>
    </section>
  );
};

export default Philosophy;
