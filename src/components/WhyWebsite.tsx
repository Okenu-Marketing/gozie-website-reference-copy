import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Clock, DollarSign, Layers, TrendingUp, ShieldOff } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const costItems = [
  { icon: Eye, stat: "97%", title: "97% Of Customers Search Online First", desc: "If you're not showing up on Google, you don't exist to nearly all potential customers actively searching for your services right now." },
  { icon: Clock, stat: "60%", title: "60% Of Leads Want to Book After Hours", desc: "Without an AI receptionist, you're losing customers who want to schedule at 10pm or 6am. Your competitors are capturing them while you sleep." },
  { icon: DollarSign, stat: "$0", title: "Every Missed Call Is a Missed Payment", desc: "Every unanswered call is a lost customer. An AI receptionist answers 24/7 and books the appointment before they call someone else." },
  { icon: Layers, stat: "46", title: "46 Pages Working For You With Local SEO", desc: "A single-page website won't rank. Our SEO pyramid builds 20–46 targeted pages so Google sends customers to you — not your competitors." },
  { icon: TrendingUp, stat: "3x", title: "3x Guaranteed Impressions in 30 Days", desc: "We guarantee 3x Google impressions in 30 days for existing businesses. New businesses get 1,000 impressions guaranteed — or your money back." },
  { icon: ShieldOff, stat: "75%", title: "A Weak Online Presence Kills Your Credibility", desc: "75% of consumers judge credibility based on your online presence. No website or weak SEO? They assume you're not a serious business." },
];

const WhyWebsite = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cost-card", {
        y: 50,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-destructive text-sm font-medium">Reality Check</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Every Day You're Invisible Online<br />
            <span className="font-drama italic text-destructive">Is Costing You Customers</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-foreground/70 text-base md:text-lg">
            While you're waiting, your competitors are capturing leads, booking jobs, and building credibility online. Here's what you're actually losing:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {costItems.map((item) => (
            <div key={item.title} className="cost-card group relative bg-secondary/70 backdrop-blur-sm border border-border/70 rounded-2xl p-6 hover:border-destructive/60 transition-all duration-300">
              <div className="absolute -top-3 right-6">
                <span className="inline-block bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">{item.stat}</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-destructive/20 flex items-center justify-center mb-4 group-hover:bg-destructive/30 transition-colors">
                <item.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/70 text-base mb-6">Stop leaving customers on the table. Get the system that works as hard as you do.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--destructive)/0.4)] hover:shadow-[0_0_30px_hsl(var(--destructive)/0.6)]"
          >
            Get Started <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyWebsite;
