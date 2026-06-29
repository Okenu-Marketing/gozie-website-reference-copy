import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- GHL Calendar Embed Component ---
const CalendarEmbed = () => {
  useEffect(() => {
    // Dynamically load the GHL script when the calendar mounts
    const script = document.createElement("script");
    script.src = "https://info.okenumarketing.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 bg-white rounded-[24px] shadow-2xl p-4 sm:p-8">
      <iframe 
        src="https://info.okenumarketing.com/widget/booking/ESBC5ShMejjXD03B8Ewb" 
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }} 
        scrolling="no" 
        id="ESBC5ShMejjXD03B8Ewb_1780852491688"
        title="Booking Calendar"
      ></iframe>
    </div>
  );
};

// --- Multi-Step Form Component ---
const OptInForm = ({ onComplete, onClose }: { onComplete: (businessType: string) => void; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [formData, setFormData] = useState({
    businessType: "",
    crewSize: "",
    timeline: "",
    spend: "",
    revenue: "",
    name: "",
    phone: ""
  });

  const nextStep = () => setStep(s => s + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    onComplete(formData.businessType);
  };

  const handleOptionSelect = (key: keyof typeof formData, value: string) => {
    if (key === "businessType" && value.includes("Looking to learn")) {
      setIsDisqualified(true);
      return;
    }
    setFormData(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="w-full">
      {/* Header and Progress Bar Container (Leaves room on the right for close button) */}
      <div className="flex items-center justify-between mb-8 pr-12">
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-yellow-500"
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-neutral-400 ml-4 shrink-0">
          Step {step} of 4
        </span>
      </div>

      {/* Form Content - Dynamically sizes to height of step content */}
      <div className="relative w-full transition-all duration-300">
        <AnimatePresence mode="wait">
          {isDisqualified ? (
            <motion.div key="disqualified" variants={variants} initial="enter" animate="center" exit="exit" className="w-full text-center py-8">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-neutral-900">Looking to Learn?</h3>
              <p className="text-lg text-neutral-500 font-medium mb-8">
                This specific page is strictly for Contractors and Local Businesses looking to hire us to build their systems. 
                <br/><br/>
                If you're looking to learn how I build these, head over to my YouTube channel for free tutorials!
              </p>
              <a href="https://www.youtube.com/@gozieokenu" target="_blank" rel="noreferrer" className="inline-block w-full h-14 leading-[56px] text-lg font-black bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition-all">
                Go to YouTube Channel
              </a>
            </motion.div>
          ) : step === 1 && (
            <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="w-full">
              <h3 className="text-2xl sm:text-3xl font-black text-left mb-6 tracking-tight text-neutral-900">What Kind of Business Do You Run?</h3>
              <div className="flex flex-col gap-3">
                {["Local Business", "Contracting Business", "Just looking to learn (Not looking to hire)"].map(opt => (
                  <button key={opt} type="button" onClick={() => handleOptionSelect("businessType", opt)} className="w-full py-4 px-5 text-left border-2 border-neutral-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50/50 hover:shadow-sm transition-all font-bold text-lg text-neutral-800 flex justify-between items-center group">
                    {opt}
                    <div className="w-6 h-6 rounded-full border-2 border-neutral-300 group-hover:border-yellow-500 group-hover:bg-yellow-500 flex items-center justify-center transition-colors">
                      <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="w-full">
              <h3 className="text-2xl sm:text-3xl font-black text-left mb-6 tracking-tight text-neutral-900">
                {formData.businessType === "Contracting Business" 
                  ? "How many crews do you have?" 
                  : "How many employees/staff do you have?"}
              </h3>
              <div className="flex flex-col gap-3">
                {formData.businessType === "Contracting Business" 
                  ? ["Just me", "1 crew", "2-3 crews", "4-6 crews", "6+ crews"].map(opt => (
                      <button key={opt} type="button" onClick={() => handleOptionSelect("crewSize", opt)} className="w-full py-4 px-5 text-left border-2 border-neutral-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50/50 transition-all font-bold text-lg text-neutral-800">
                        {opt}
                      </button>
                    ))
                  : ["Just me", "1-3 staff", "4-6 staff", "6-10 staff", "10+ staff"].map(opt => (
                      <button key={opt} type="button" onClick={() => handleOptionSelect("crewSize", opt)} className="w-full py-4 px-5 text-left border-2 border-neutral-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50/50 transition-all font-bold text-lg text-neutral-800">
                        {opt}
                      </button>
                    ))
                }
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="w-full">
              <h3 className="text-2xl sm:text-3xl font-black text-left mb-6 tracking-tight text-neutral-900">What is your current monthly revenue?</h3>
              <div className="flex flex-col gap-3">
                {["$0 - $10,000", "$10,000 - $25,000", "$25,000 - $100,000", "$100,000+"].map(opt => (
                  <button key={opt} type="button" onClick={() => handleOptionSelect("revenue", opt)} className="w-full py-4 px-5 text-left border-2 border-neutral-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50/50 transition-all font-bold text-lg text-neutral-800">
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-left mb-2">
                  <h3 className="text-2xl sm:text-3xl font-black mb-1 tracking-tight text-neutral-900">Where should we send your access?</h3>
                  <p className="text-neutral-500 font-semibold text-sm">Enter your details below to instantly unlock the video.</p>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Full Name</label>
                  <input required type="text" className="w-full border-2 border-neutral-200 rounded-xl p-4 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all font-medium text-neutral-800" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Mobile Phone Number</label>
                  <input required type="tel" className="w-full border-2 border-neutral-200 rounded-xl p-4 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all font-medium text-neutral-800" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="(555) 123-4567" />
                </div>

                <Button type="submit" className="w-full h-15 text-lg font-black mt-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-[0_8px_30px_rgb(234,179,8,0.25)] hover:shadow-[0_8px_30px_rgb(234,179,8,0.45)] transition-all">
                  Unlock The Video <ChevronRight className="ml-1 w-5 h-5 inline" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


// --- Main Funnel Page Component ---
export default function Funnel() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [businessType, setBusinessType] = useState("Contracting Business"); // Default

  const handleComplete = (type: string) => {
    setBusinessType(type || "Contracting Business");
    setShowModal(false);
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* HEADER */}
      <header className="w-full py-8 flex justify-center">
        <h2 className="text-2xl font-black tracking-tighter text-white">
          OKENU<span className="text-yellow-500">MARKETING</span>
        </h2>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* HERO TEXT */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.2] mb-6"
          >
            We Help <span className="text-yellow-500">Contractors</span> & <span className="text-yellow-500">Local Businesses</span> Get More <span className="text-yellow-500">Paying Clients</span> With <span className="text-yellow-500">Custom Websites</span>, <span className="text-yellow-500">AI Systems</span>, and <span className="text-yellow-500">5-Star Reviews</span> 👇
          </motion.h1>
        </div>

        {/* CONDITIONAL VIDEO / OPT-IN AREA */}
        {!isUnlocked ? (
          // LOCKED STATE
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Fake Video Thumbnail Area */}
            <div 
              className="w-full aspect-video bg-neutral-900 rounded-[24px] border-2 border-neutral-800 overflow-hidden relative shadow-2xl flex items-center justify-center group cursor-pointer hover:border-yellow-500/50 transition-all duration-500"
              onClick={() => setShowModal(true)}
            >
              {/* Blurred & Zoomed Background Image */}
              <div 
                className="absolute inset-0 z-0" 
                style={{ 
                  backgroundImage: "url('https://img.youtube.com/vi/lHDy9T3-A4s/maxresdefault.jpg')", 
                  backgroundSize: "130%", 
                  backgroundPosition: "bottom left",
                  filter: "blur(6px)"
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/10 to-transparent mix-blend-overlay z-0"></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-0"></div>
              
              {/* Play Button Container - Ensures perfect centering */}
              <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                {/* Pulsing ring directly behind the button */}
                <div className="absolute inset-0 bg-yellow-500/40 rounded-full animate-ping"></div>
                
                {/* The actual play button */}
                <div className="relative z-10 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] group-hover:scale-110 group-hover:bg-yellow-400 transition-all duration-300">
                  <Play className="w-10 h-10 text-neutral-950 ml-2 fill-current" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center space-y-6 w-full">
              <p className="text-xl md:text-2xl font-bold text-white">
                <u className="underline-offset-4 decoration-yellow-500">Step 1:</u> Watch this quick video to see what we do and how we help you grow
              </p>
              
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto px-12 h-16 text-xl md:text-2xl font-black bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 mx-auto block"
              >
                Click to See How it Works
              </Button>
            </div>
          </motion.div>
        ) : (
          // UNLOCKED STATE
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Real Video Player (Dynamic based on business type) */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-center text-yellow-500">
                  {businessType.includes("Contract") ? "The Ranking System" : "The Website System"}
                </h3>
                <div className="w-full aspect-video bg-black rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] border-2 border-neutral-800">
                  <iframe 
                    src={`https://www.youtube.com/embed/${businessType.includes("Contract") ? "lHDy9T3-A4s" : "BQR-zj2pqKw"}?autoplay=1&rel=0`}
                    className="w-full h-full" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* CALENDAR */}
            <div id="booking" className="mt-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                  <u className="underline-offset-4 decoration-yellow-500">Step 2:</u> Ready to scale? Book your strategy call.
                </h2>
                <p className="text-xl text-neutral-400 font-medium">Pick a time below to speak directly with our team.</p>
              </div>
              <CalendarEmbed />
            </div>

            {/* VALUE STACK */}
            <div className="mt-32 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">Here's Exactly What You Get</h2>
              
              <div className="bg-neutral-900 border-2 border-neutral-800 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-5 items-start">
                    <CheckCircle2 className="w-8 h-8 text-yellow-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-2xl font-bold">Custom High-Converting Website</h4>
                      <p className="text-neutral-400 mt-2 text-lg leading-relaxed">Built to turn your existing traffic into booked jobs, not just look pretty.</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <CheckCircle2 className="w-8 h-8 text-yellow-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-2xl font-bold">Google Business Profile (GBP) Optimization</h4>
                      <p className="text-neutral-400 mt-2 text-lg leading-relaxed">Rank higher in local map packs when people search for your services nearby.</p>
                    </div>
                  </div>
                  
                  {businessType.includes("Contract") && (
                    <>
                      <div className="flex gap-5 items-start">
                        <CheckCircle2 className="w-8 h-8 text-yellow-500 shrink-0 mt-1" />
                        <div>
                          <h4 className="text-2xl font-bold">AI Missed-Call Text Back</h4>
                          <p className="text-neutral-400 mt-2 text-lg leading-relaxed">Never lose a lead to a competitor because you were on a job site and missed the call.</p>
                        </div>
                      </div>
                      <div className="flex gap-5 items-start">
                        <CheckCircle2 className="w-8 h-8 text-yellow-500 shrink-0 mt-1" />
                        <div>
                          <h4 className="text-2xl font-bold">Automated Review System</h4>
                          <p className="text-neutral-400 mt-2 text-lg leading-relaxed">Automatically request reviews from happy clients, while redirecting bad reviews to a private feedback form.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-12 pt-10 border-t-2 border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                  <div>
                    <p className="text-yellow-500 text-sm uppercase tracking-widest font-bold mb-2">Total Investment</p>
                    <p className="text-5xl font-black">
                      {businessType.includes("Contract") ? "$497" : "$997"} 
                      {businessType.includes("Contract") && <span className="text-2xl text-neutral-400 font-bold"> Setup + $197/mo</span>}
                    </p>
                  </div>
                  <Button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="h-16 px-10 text-xl font-black bg-yellow-500 hover:bg-yellow-600 text-neutral-950 rounded-xl shadow-[0_8px_30px_rgb(234,179,8,0.2)] transition-all hover:scale-105">
                    Book Your Call Now
                  </Button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </main>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>
            
            {/* Modal Card - Transitioning height dynamically */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              layout
              className="relative w-full max-w-xl bg-white text-black rounded-[24px] shadow-2xl p-8 md:p-10 overflow-hidden z-10 transition-all duration-300"
            >
              {/* Close Button - Moved slightly higher and styled nicely to not overlap with progress bar */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-black z-20 bg-neutral-100 hover:bg-neutral-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
              
              {/* The form holds its own dynamic progress bar and step content */}
              <OptInForm 
                onComplete={handleComplete} 
                onClose={() => setShowModal(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
