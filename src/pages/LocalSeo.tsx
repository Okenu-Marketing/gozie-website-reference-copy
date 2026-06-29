import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import {
  User,
  Target,
  ChevronRight,
  ChevronLeft,
  Search,
  MapPin,
  Star,
  FileText,
  Globe,
  MessageSquare,
  QrCode,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { getSubmitFormErrorMessage, submitForm } from "@/lib/submitForm";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  StepIndicator,
  FormInput,
  FormTextarea,
  RadioOption,
  CheckboxOption,
  FormSubmitted,
} from "@/components/forms/FormComponents";

const includedItems = [
  {
    icon: MapPin,
    title: "GBP Setup + Optimization",
    desc: "Complete Google Business Profile setup and optimization for local discovery.",
  },
  {
    icon: Globe,
    title: "20–46 Page SEO Pyramid Website",
    desc: "Homepage → Category pages → Service pages — built to dominate local search.",
  },
  {
    icon: FileText,
    title: "Technical SEO",
    desc: "Meta tags, schema markup, sitemap, robots.txt, canonical tags — all handled.",
  },
  {
    icon: Search,
    title: "Google Search Console Setup",
    desc: "Full setup + indexing so Google finds and ranks every page.",
  },
  {
    icon: Star,
    title: "70+ Directory Citations",
    desc: "Submitted via GHL Listings to build authority across the web.",
  },
  {
    icon: MessageSquare,
    title: "Review Automation",
    desc: "Automated review requests via SMS + email to build social proof.",
  },
  { icon: QrCode, title: "Google Review QR Code", desc: "Print-ready QR code for in-store review collection." },
  {
    icon: BarChart3,
    title: "30-Day Results Report",
    desc: "Before/after proof with impressions, clicks, and ranking data.",
  },
];

const goalOptions = ["Get more calls", "Show up on Google Maps", "Beat local competitors", "All of the above"];

const gbpOptions = ["Yes", "No", "Not Sure"];
const yesNoOptions = ["Yes", "No"];
const contactOptions = ["Instagram DM", "Text message", "Phone call", "Email"];

interface SeoFormData {
  fullName: string;
  businessName: string;
  niche: string;
  phone: string;
  email: string;
  cityState: string;
  hasWebsite: string;
  websiteUrl: string;
  referenceWebsites: string;
  hasGBP: string;
  hasLogo: string;
  howFound: string;
  goals: string[];
  budget: string;
  contactMethod: string;
}

const defaultData: SeoFormData = {
  fullName: "",
  businessName: "",
  niche: "",
  phone: "",
  email: "",
  cityState: "",
  hasWebsite: "",
  websiteUrl: "",
  referenceWebsites: "",
  hasGBP: "",
  hasLogo: "",
  howFound: "",
  goals: [],
  budget: "2500",
  contactMethod: "",
};

const LocalSeo = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SeoFormData>(defaultData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const partialSentRef = useRef(false);
  const { honeypotValue, setHoneypotValue, checkCanSubmit, recordSubmission, rateLimitMessage, cooldownMessage, isDisabledByCooldown } = useSpamProtection("localseo");
  useEffect(() => {
    if (window.location.hash === "#form") {
      setTimeout(() => {
        document.getElementById("form")?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }, 100);
    }
  }, []);

  const update = (field: keyof SeoFormData, value: any) => setData((prev) => ({ ...prev, [field]: value }));

  const toggleGoal = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }));
  };

  if (submitted) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-28">
          <FormSubmitted
            title="We're on it!"
            message="We'll analyze your current Google ranking and reach out shortly with next steps."
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SEO
        title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
        description="Dominate Google search with Gozie Okenu's local SEO system. 46-page SEO pyramid, GBP setup, 70+ citations, and 3x impressions guaranteed in 30 days in Austin TX."
        path="/local-seo"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 text-center px-6">
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
            Get Found. Get Called. <span className="font-drama italic text-accent">Get Paid.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A full local SEO system built for businesses that need real customers, not just rankings.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity mt-8"
          >
            Rank My Business on Google <span>→</span>
          </a>
        </section>

        {/* SEO Demo — at the top */}
        <section className="max-w-5xl mx-auto px-6 md:px-16 py-16">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              See a <span className="font-drama italic text-accent">Real Example</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              A 46-page SEO pyramid site built for a Tampa personal injury practice.
            </p>
          </div>
          <div className="bg-secondary/30 border border-border rounded-2xl overflow-hidden">
            <iframe
              src="https://tampaaccidentnetwork.com"
              title="Tampa personal injury SEO pyramid website — live preview"
              className="w-full h-[500px] md:h-[700px] border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <p className="text-center mt-4">
            <a
              href="https://tampaaccidentnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline text-sm"
            >
              Visit the full site →
            </a>
          </p>
        </section>

        {/* What's Included */}
        <section className="max-w-6xl mx-auto px-6 md:px-16 py-16">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              What's <span className="font-drama italic text-accent">Included</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {includedItems.map((item) => (
              <div
                key={item.title}
                className="bg-secondary/50 border border-border rounded-2xl p-6 hover:border-accent/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="max-w-4xl mx-auto px-6 md:px-16 py-16">
          <div className="bg-accent/10 border border-accent/30 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
              The <span className="font-drama italic text-accent">Guarantee</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="bg-background/50 border border-border rounded-2xl p-6">
                <p className="text-accent text-xs uppercase tracking-wider font-mono-data mb-2">Existing Businesses</p>
                <p className="text-foreground font-heading font-bold text-lg mb-2">3x Impressions in 30 Days</p>
                <p className="text-muted-foreground text-sm">or you don't pay.</p>
              </div>
              <div className="bg-background/50 border border-border rounded-2xl p-6">
                <p className="text-accent text-xs uppercase tracking-wider font-mono-data mb-2">New Businesses</p>
                <p className="text-foreground font-heading font-bold text-lg mb-2">1,000 Impressions in 30 Days</p>
                <p className="text-muted-foreground text-sm">or you don't pay.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              Let's rank your business
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tell us about your business so we can help you rank on Google.
            </p>
            <p className="text-accent text-sm font-medium mt-3">Takes 2–3 minutes. No payment required.</p>
          </div>

          <StepIndicator step={step} step1Label="Your Information" step2Label="Your Situation" />

          {step === 1 && (
            <div className="bg-secondary/30 border border-border rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <User className="w-5 h-5 text-accent" />
                <h2 className="font-heading font-bold text-xl text-foreground">Your Information</h2>
              </div>
              <div className="space-y-6">
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                />
                <FormInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={data.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
                <FormInput
                  label="Business Name"
                  placeholder="Your Business Name"
                  value={data.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
                <FormInput
                  label="What type of business/niche are you in?"
                  placeholder="e.g. HVAC, Dentist, Auto Repair"
                  value={data.niche}
                  onChange={(e) => update("niche", e.target.value)}
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-10">
                <button
                  onClick={() => {
                    setStep(2);
                    if (!partialSentRef.current) {
                      partialSentRef.current = true;
                      const rows = [
                        `<tr><td style="padding:8px 12px;font-weight:600;">Form</td><td style="padding:8px 12px;">Local SEO Form</td></tr>`,
                        `<tr><td style="padding:8px 12px;font-weight:600;">Name</td><td style="padding:8px 12px;">${data.fullName}</td></tr>`,
                        `<tr><td style="padding:8px 12px;font-weight:600;">Business</td><td style="padding:8px 12px;">${data.businessName}</td></tr>`,
                        `<tr><td style="padding:8px 12px;font-weight:600;">Business Niche</td><td style="padding:8px 12px;">${data.niche}</td></tr>`,
                        `<tr><td style="padding:8px 12px;font-weight:600;">Phone</td><td style="padding:8px 12px;">${data.phone}</td></tr>`,
                        `<tr><td style="padding:8px 12px;font-weight:600;">Email</td><td style="padding:8px 12px;">${data.email}</td></tr>`,
                      ];
                      supabase.functions.invoke("send-form-email", {
                        body: {
                          formType: "partial-lead",
                          formData: {
                            _subject: `⚠️ Partial Lead — Local SEO Form — ${data.businessName || data.fullName}`,
                            _html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><p style="font-size:14px;color:#b45309;font-weight:600;">⚠️ This person started the form but has not submitted yet.<br/>Wait 10 minutes before reaching out — they may still complete it.</p><table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">${rows.join("")}</table></div>`,
                            phone: data.phone,
                            email: data.email,
                          },
                        },
                      }).catch(() => {});
                    }
                  }}
                  disabled={!data.phone.trim() || !data.email.trim()}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-secondary/30 border border-border rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <Target className="w-5 h-5 text-accent" />
                <h2 className="font-heading font-bold text-xl text-foreground">Your Situation</h2>
              </div>
              <div className="space-y-8">
                <FormInput
                  label="What city/state do you want to rank in?"
                  placeholder="e.g. Austin, TX"
                  value={data.cityState}
                  onChange={(e) => update("cityState", e.target.value)}
                />

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Do you have an existing website?
                  </label>
                  <div className="space-y-3">
                    {yesNoOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={data.hasWebsite === opt}
                        onClick={() => update("hasWebsite", opt)}
                      />
                    ))}
                  </div>
                </div>

                {data.hasWebsite === "Yes" && (
                  <FormInput
                    label="What's your website URL?"
                    placeholder="https://example.com"
                    value={data.websiteUrl}
                    onChange={(e) => update("websiteUrl", e.target.value)}
                  />
                )}

                <FormTextarea
                  label="Reference websites you like for your new SEO site"
                  placeholder="Share URLs of websites whose style or layout you like..."
                  value={data.referenceWebsites}
                  onChange={(e) => update("referenceWebsites", e.target.value)}
                />

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Do you have a Google Business Profile?
                  </label>
                  <div className="space-y-3">
                    {gbpOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={data.hasGBP === opt}
                        onClick={() => update("hasGBP", opt)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Do you have a logo?</label>
                  <div className="space-y-3">
                    {yesNoOptions.map((opt) => (
                      <RadioOption
                        key={`logo-${opt}`}
                        label={opt}
                        selected={data.hasLogo === opt}
                        onClick={() => update("hasLogo", opt)}
                      />
                    ))}
                  </div>
                </div>

                <FormTextarea
                  label="How are people currently finding your business?"
                  placeholder="e.g. Word of mouth, Google, social media..."
                  value={data.howFound}
                  onChange={(e) => update("howFound", e.target.value)}
                />

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">What's your biggest goal?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goalOptions.map((goal) => (
                      <CheckboxOption
                        key={goal}
                        label={goal}
                        checked={data.goals.includes(goal)}
                        onClick={() => toggleGoal(goal)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    How much do you want to invest?
                  </label>
                  <p className="text-muted-foreground text-xs mb-4">
                    Your budget determines the scope and depth of your SEO campaign.
                  </p>
                  <div className="flex items-center gap-2 bg-secondary/60 border border-border rounded-xl px-4 py-3">
                    <span className="text-muted-foreground text-sm">$</span>
                    <input
                      type="number"
                      min={500}
                      max={20000}
                      step={500}
                      value={data.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="flex-1 bg-transparent text-foreground text-sm focus:outline-none"
                    />
                  </div>
                  <p className="text-accent text-xs mt-2">Enter amount between $500 - $20,000+</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    How would you like me to contact you?
                  </label>
                  <div className="space-y-3">
                    {contactOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={data.contactMethod === opt}
                        onClick={() => update("contactMethod", opt)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  disabled={submitting || !data.phone.trim() || !data.email.trim() || isDisabledByCooldown}
                  onClick={async () => {
                    const { allowed, reason } = checkCanSubmit();
                    if (!allowed) return;
                    setSubmitting(true);
                    try {
                      await submitForm("local-seo", data);
                      recordSubmission();
                      setSubmitted(true);
                    } catch (error) {
                      toast({
                        title: "Something went wrong",
                        description: getSubmitFormErrorMessage(error),
                        variant: "destructive",
                      });
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Form"}
                </button>
              </div>
              {(rateLimitMessage || cooldownMessage) && (
                <p className="text-muted-foreground text-xs mt-3 text-right">{rateLimitMessage || cooldownMessage}</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocalSeo;
