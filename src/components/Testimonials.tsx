import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Cyrille",
    photo: "/images/testimonials/cyrille.jpeg",
    rating: 5,
    quote: "This has been one of the best experiences working with the Okenu Marketing team. He took the time to truly listen to my ideas, goals, and the overall purpose of the website, and successfully translated those concepts into a functional and visually appealing site. Throughout the process, he guided me through important technical decisions, explaining what would work best for performance and usability. He also kept me updated as the project progressed, which made the entire experience smooth and transparent. The process felt very collaborative, as we both exchanged feedback and made adjustments until the final website fully matched the vision I had in mind.",
  },
  {
    name: "Kike",
    photo: "/images/testimonials/kike.jpeg",
    rating: 5,
    quote: "I absolutely loved working with you! You were timely, responsive, and true to your word. You delivered within the exact timeframe you promised and exceeded my expectations. Any adjustments I needed were handled quickly and professionally, sometimes within just hours. That level of efficiency and attention to detail is rare. I would highly recommend your services to anyone looking for quality and reliability. I will definitely be keeping you on to manage my website moving forward!",
  },
  {
    name: "Ijeoma",
    photo: "/images/testimonials/ijeoma.png",
    rating: 5,
    quote: "Exceptional, committed, caring, and respectful.",
  },
  {
    name: "Dayni",
    photo: "/images/testimonials/dayni.png",
    rating: 5,
    quote: "Gozie has been wonderful to work with — thorough, helpful, efficient and understanding to my business's needs and my niche market here in Australia. He is very easy to communicate with and is really driven to help you succeed.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-widest font-mono-data mb-3">
            Client Success Stories
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Trusted by <span className="font-drama italic text-accent">Growing Businesses</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground/70 text-base">
            Real results from real business owners who chose to invest in their online presence.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card group relative bg-secondary/70 backdrop-blur-sm border border-border/70 rounded-2xl p-8 hover:border-accent/60 hover:-translate-y-2 hover:shadow-[0_8px_30px_-10px_hsl(43_55%_54%/0.15)] transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20 group-hover:text-accent/40 transition-colors" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-base leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-border flex items-center gap-4">
                <img
                  src={t.photo}
                  alt={`${t.name} — client of Gozie Okenu`}
                  className="w-16 h-16 rounded-full object-cover object-[center_20%] border-2 border-border"
                  loading="lazy"
                />
                <p className="text-foreground font-semibold text-lg">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-secondary/70 backdrop-blur-sm border border-border/70 rounded-2xl">
          <div className="text-center">
            <p className="font-heading font-bold text-3xl md:text-4xl text-accent">50+</p>
            <p className="text-foreground/70 text-sm mt-1">Sites Launched</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-3xl md:text-4xl text-accent">100%</p>
            <p className="text-foreground/70 text-sm mt-1">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-3xl md:text-4xl text-accent">24/7</p>
            <p className="text-foreground/70 text-sm mt-1">AI Lead Capture</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-3xl md:text-4xl text-accent">3x</p>
            <p className="text-foreground/70 text-sm mt-1">Avg. Lead Increase</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
