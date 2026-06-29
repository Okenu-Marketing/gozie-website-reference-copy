import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Target, ChevronRight, ChevronLeft, Check, Globe, Layers, ExternalLink } from "lucide-react";
import { useSpamProtection } from "@/hooks/useSpamProtection";
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
import { isValidEmail, isValidPhone } from "@/components/forms/FormComponents";

const goalOptions = [
  "Get more customers/clients",
  "Establish online presence",
  "Look more professional",
  "Improve search visibility (Google)",
  "Sell products/services online",
  "Showcase portfolio/work",
  "Share information about services",
  "Other",
];

const websiteOptions = [
  "No, this is my first website",
  "Yes, but I need a complete redesign",
  "Yes, but I need updates/improvements",
];

const contactOptions = ["Instagram DM", "Text message", "Phone call", "Email"];

interface FormData {
  fullName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  instagram: string;
  goals: string[];
  targetAudience: string;
  hasWebsite: string;
  budget: string;
  referenceWebsites: string;
  brandVibe: string;
  contentAcknowledged: boolean;
  contactMethod: string;
}

const defaultData: FormData = {
  fullName: "",
  businessName: "",
  businessType: "",
  phone: "",
  email: "",
  instagram: "",
  goals: [],
  targetAudience: "",
  hasWebsite: "",
  budget: "5000",
  referenceWebsites: "",
  brandVibe: "",
  contentAcknowledged: false,
  contactMethod: "",
};

const portfolioItems = [
  {
    src: "/mockups/YK_LAPTOP.jpg",
    name: "YK Officials",
    type: "Premium Barber",
    url: "ykofficials.com",
    desc: "Custom website with booking integration and social media presence for a premium barbershop in Kansas City.",
  },
  {
    src: "/mockups/MD_Laptop.jpg",
    name: "MD BodyShop",
    type: "Auto Body Experts",
    url: "mdbodyshop.okenumarketing.com",
    desc: "Professional site with quote request system and chat widget for Austin's family-run collision repair shop.",
  },
  {
    src: "/mockups/Landscaping_Computer.jpg",
    name: "Sky's The Limit",
    type: "Landscaping & Construction",
    url: "skysthelimitllc.okenumarketing.com",
    desc: "Bilingual multi-service website with free estimate forms and Google integration for a full-service contractor.",
  },
  {
    src: "/mockups/HVAC_Computer.jpg",
    name: "CoolAir Pro",
    type: "HVAC Services",
    url: "hvac.okenumarketing.com",
    desc: "Dark premium design with 24/7 booking, live chat, and emergency service CTAs for a climate control company.",
  },
  {
    src: "/mockups/Luu_Laptop.jpg",
    name: "Luu Auto Repair",
    type: "Auto Repair",
    url: "luuautorepair.okenumarketing.com",
    desc: "High-trust design with Google rating badge, click-to-call, and free estimate flow for a 20+ year auto shop.",
  },
  {
    src: "/mockups/MindfulCare_Laptop.jpg",
    name: "MindfulCare Solutions",
    type: "Mental Health Practice",
    url: "mindfulcaresolutions.com",
    desc: "Warm, professional site with multi-state licensing display and appointment scheduling for psychiatric care.",
  },
];

const PortfolioGrid = () => (
  <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
    <div className="text-center mb-16">
      <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
        Real Sites. <span className="font-drama italic text-accent">Real Results.</span>
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base">
        Every project is custom-built, mobile-optimized, and SEO-ready; with hosting included.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolioItems.map((item) => (
        <div
          key={item.name}
          className="bg-secondary/50 border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 group flex flex-col"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={item.src}
              alt={`${item.name} ${item.type} website designed by Gozie Okenu Austin TX`}
              width={800}
              height={500}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-lg text-foreground">{item.name}</h3>
            <p className="text-accent text-sm font-medium mt-1">{item.type}</p>
            <a
              href={`https://${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-data text-xs text-accent/70 hover:text-accent transition-colors mt-2 underline underline-offset-2"
            >
              {item.url}
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3 flex-1">{item.desc}</p>
            <a
              href={`https://${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Site
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Websites = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(defaultData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const { toast } = useToast();
  const partialSentRef = useRef(false);
  const { honeypotValue, setHoneypotValue, checkCanSubmit, recordSubmission, rateLimitMessage, cooldownMessage, isDisabledByCooldown } = useSpamProtection("websites");
  useEffect(() => {
    if (window.location.hash === "#form") {
      setTimeout(() => {
        document.getElementById("form")?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }, 100);
    }
  }, []);

  const update = (field: keyof FormData, value: any) => setData((prev) => ({ ...prev, [field]: value }));

  const validateStep1 = () => {
    const newErrors: { phone?: string; email?: string } = {};
    if (!isValidPhone(data.phone)) newErrors.phone = "Please enter a valid phone number";
    if (!isValidEmail(data.email)) newErrors.email = "Please enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
          <FormSubmitted />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SEO
        title="Gozie Okenu | Web Design, Local SEO & AI in Austin, Texas"
        description="Get a custom-coded, mobile-optimized website delivered in 7 days. Gozie Okenu builds websites for local businesses in Austin TX that convert visitors into customers."
        path="/websites"
      />
      <Navbar />
      <main>
        {/* Portfolio Grid */}
        <PortfolioGrid />

        {/* Hero */}
        <section className="pb-16 text-center px-6">
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
            Websites That Work <span className="font-drama italic text-accent">While You Sleep</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            Mobile-optimized, SEO-ready, and built to turn visitors into customers; delivered in 7 days.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity mt-8"
          >
            Build my website <span>→</span>
          </a>
        </section>

        {/* Service Cards */}
        <section className="max-w-5xl mx-auto px-6 md:px-16 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Simple Website */}
            <div className="bg-secondary/50 border border-border rounded-2xl p-8 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">Simple Website</h3>
              <p className="text-accent text-sm font-medium mb-4">
                Best for: New businesses and service businesses that need a clean, professional presence fast.
              </p>
              <ul className="space-y-2.5 text-muted-foreground text-sm flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Homepage, about, services, contact form, gallery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Mobile optimized
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> SEO setup
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Hosting + maintenance + domain management
                </li>
              </ul>
            </div>

            {/* Complex Website */}
            <div className="bg-secondary/50 border border-accent/40 rounded-2xl p-8 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">Complex Website</h3>
              <p className="text-accent text-sm font-medium mb-4">
                Best for: Businesses needing online payments, user accounts, bookings, or event management.
              </p>
              <ul className="space-y-2.5 text-muted-foreground text-sm flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Everything in Simple, plus:
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Payment processing (Stripe or Square)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> User account creation + login system
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Event creation and management
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Team/appointment registration flows
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Admin dashboard
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Booking systems with calendar integration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Bug fixes + admin panel support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> Priority response
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              Let's create your website.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tell us about your project so we can build something amazing for you.
            </p>
            <p className="text-accent text-sm font-medium mt-3">Takes 2–3 minutes. No payment required.</p>
          </div>

          <StepIndicator step={step} />

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
                  label="Business/Brand Name"
                  placeholder="Your Business Name"
                  value={data.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
                <FormInput
                  label="What type of business/service do you offer?"
                  placeholder="e.g. Barbershop, HVAC, Auto Repair, Restaurant..."
                  value={data.businessType}
                  onChange={(e) => update("businessType", e.target.value)}
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={data.phone}
                  onChange={(e) => { update("phone", e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                  error={errors.phone}
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => { update("email", e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                  error={errors.email}
                />
                <FormInput
                  label="Instagram Username"
                  optional
                  prefix="@"
                  placeholder="yourusername"
                  value={data.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-10">
                <button
                  onClick={() => {
                    if (validateStep1()) {
                      setStep(2);
                      if (!partialSentRef.current) {
                        partialSentRef.current = true;
                        const rows = [
                          `<tr><td style="padding:8px 12px;font-weight:600;">Form</td><td style="padding:8px 12px;">Website Form</td></tr>`,
                          `<tr><td style="padding:8px 12px;font-weight:600;">Name</td><td style="padding:8px 12px;">${data.fullName}</td></tr>`,
                          `<tr><td style="padding:8px 12px;font-weight:600;">Business</td><td style="padding:8px 12px;">${data.businessName}</td></tr>`,
                          `<tr><td style="padding:8px 12px;font-weight:600;">Business Type</td><td style="padding:8px 12px;">${data.businessType}</td></tr>`,
                          `<tr><td style="padding:8px 12px;font-weight:600;">Phone</td><td style="padding:8px 12px;">${data.phone}</td></tr>`,
                          `<tr><td style="padding:8px 12px;font-weight:600;">Email</td><td style="padding:8px 12px;">${data.email}</td></tr>`,
                        ];
                        if (data.instagram.trim()) {
                          rows.push(`<tr><td style="padding:8px 12px;font-weight:600;">Instagram</td><td style="padding:8px 12px;">@${data.instagram}</td></tr>`);
                        }
                        supabase.functions.invoke("send-form-email", {
                          body: {
                            formType: "partial-lead",
                            formData: {
                              _subject: `⚠️ Partial Lead — Website Form — ${data.businessName || data.fullName}`,
                              _html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><p style="font-size:14px;color:#b45309;font-weight:600;">⚠️ This person started the form but has not submitted yet.<br/>Wait 10 minutes before reaching out — they may still complete it.</p><table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">${rows.join("")}</table></div>`,
                              phone: data.phone,
                              email: data.email,
                            },
                          },
                        }).catch(() => {});
                      }
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
                <h2 className="font-heading font-bold text-xl text-foreground">Project Details</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    What do you want this website to help with?
                  </label>
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
                <FormTextarea
                  label="Who is your target audience/customers?"
                  placeholder="e.g. Local families, car buyers, young professionals..."
                  value={data.targetAudience}
                  onChange={(e) => update("targetAudience", e.target.value)}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Do you currently have a website?
                  </label>
                  <div className="space-y-3">
                    {websiteOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={data.hasWebsite === opt}
                        onClick={() => update("hasWebsite", opt)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    How much do you want to invest in your website?
                  </label>
                  <p className="text-muted-foreground text-xs mb-4">
                    I work with a range of budgets from $500 to $20,000+. Your budget determines the time and level of
                    customization I can put into your site.
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
                <FormTextarea
                  label="Reference websites you like (Please provide at least 1 - it really helps!)"
                  placeholder="Please share at least one website URL..."
                  value={data.referenceWebsites}
                  onChange={(e) => update("referenceWebsites", e.target.value)}
                />
                <FormTextarea
                  label="How do you want your brand to come across?"
                  placeholder="e.g. professional & trustworthy, fun & energetic, luxury & elegant..."
                  value={data.brandVibe}
                  onChange={(e) => update("brandVibe", e.target.value)}
                />
                <div>
                  <h3 className="font-heading font-bold text-base text-foreground mb-3">Content & Images</h3>
                  <div className="bg-secondary/60 border border-border rounded-xl p-5 space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Please gather up all of your best content (videos, images, logos, etc.) that you want on your
                      website. I will need this content from you and will have you send it to me at your preferred
                      contact method after I reach out to you.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => update("contentAcknowledged", !data.contentAcknowledged)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                          data.contentAcknowledged ? "border-accent bg-accent" : "border-muted-foreground/40"
                        }`}
                      >
                        {data.contentAcknowledged && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                      </div>
                      <span className="text-sm text-foreground">
                        I understand – I will gather my content and send it when you contact me
                      </span>
                    </label>
                  </div>
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
                      await submitForm("website", data);
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

export default Websites;
