import { useEffect, useLayoutEffect, useState } from "react";
import { Phone, Globe, LayoutDashboard, CalendarCheck, Users, PhoneCall, Zap, User, ChevronRight } from "lucide-react";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { getSubmitFormErrorMessage, submitForm } from "@/lib/submitForm";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FormInput, FormTextarea, RadioOption, CheckboxOption, FormSubmitted } from "@/components/forms/FormComponents";
import { isValidEmail, isValidPhone } from "@/components/forms/FormComponents";
import { useLocation } from "react-router-dom";

const features = [
  {
    icon: Phone,
    title: "AI on Your Phone Number",
    desc: "Connected directly to your business phone, answers calls and texts 24/7.",
  },
  {
    icon: Globe,
    title: "AI on Your Website",
    desc: "Embedded chat widget that captures leads and books appointments from your site.",
  },
  { icon: LayoutDashboard, title: "AI Dashboard", desc: "See every conversation, lead, and booking in one place." },
  { icon: CalendarCheck, title: "Appointment Booking", desc: "Automated scheduling that syncs with your calendar." },
  { icon: Users, title: "CRM Access", desc: "Full customer relationship management, track every lead and client." },
  { icon: PhoneCall, title: "Business Phone Number", desc: "A dedicated business phone number included with setup." },
];

const problemOptions = [
  "Missing calls",
  "No one answering after hours",
  "Can't keep up with leads",
  "All of the above",
];

const contactOptions = ["Instagram DM", "Text message", "Phone call", "Email"];

interface AiFormData {
  fullName: string;
  businessName: string;
  websiteUrl: string;
  businessType: string;
  phone: string;
  email: string;
  businessHours: string;
  services: string;
  problems: string[];
  aiGoals: string;
  budget: string;
  contactMethod: string;
}

const defaultData: AiFormData = {
  fullName: "",
  businessName: "",
  websiteUrl: "",
  businessType: "",
  phone: "",
  email: "",
  businessHours: "",
  services: "",
  problems: [],
  aiGoals: "",
  budget: "2500",
  contactMethod: "",
};

const GHLInlineWidget = ({ reserveSpace = false }: { reserveSpace?: boolean }) => {
  useEffect(() => {
    const containerId = "ghl-inline-container";
    const container = document.getElementById(containerId);
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "69d0981bd9608adbf770ec2a");
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <div
      id="ghl-inline-container"
      className={`w-full max-w-[700px] mx-auto ${reserveSpace ? "min-h-[620px] md:min-h-[560px]" : ""}`}
    />
  );
};

const AiReceptionist = () => {
  const location = useLocation();
  const [data, setData] = useState<AiFormData>(defaultData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const { toast } = useToast();
  const { honeypotValue, setHoneypotValue, checkCanSubmit, recordSubmission, rateLimitMessage, cooldownMessage, isDisabledByCooldown } = useSpamProtection("ai");
  const shouldScrollToForm =
    location.hash === "#form" || ((location.state as { scrollToForm?: boolean } | null)?.scrollToForm ?? false);

  useLayoutEffect(() => {
    if (!shouldScrollToForm) return;

    const form = document.getElementById("form");
    if (!form) return;

    window.scrollTo({
      top: window.scrollY + form.getBoundingClientRect().top,
      left: 0,
      behavior: "auto",
    });
  }, [shouldScrollToForm]);

  const update = (field: keyof AiFormData, value: any) => setData((prev) => ({ ...prev, [field]: value }));

  const validateFields = () => {
    const newErrors: { phone?: string; email?: string } = {};
    if (!isValidPhone(data.phone)) newErrors.phone = "Please enter a valid phone number";
    if (!isValidEmail(data.email)) newErrors.email = "Please enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleProblem = (problem: string) => {
    setData((prev) => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter((p) => p !== problem)
        : [...prev.problems, problem],
    }));
  };

  if (submitted) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-28">
          <FormSubmitted
            title="You're all set!"
            message="We'll review your info and reach out shortly to get your AI receptionist set up."
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
        description="Never miss a call again. Gozie Okenu's AI receptionist answers 24/7, books appointments, and qualifies leads automatically for Austin TX businesses."
        path="/ai-receptionist"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-0 text-center px-6">
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
            Your Business, <span className="font-drama italic text-accent">Answering 24/7</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            An AI receptionist that books appointments, answers questions, and never misses a lead even at 3am.
          </p>
          <p className="mt-3 text-muted-foreground/70 text-xs italic">
            Trusted by businesses across industries to never miss another opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-16">
            {[
              "📞 Answers missed calls instantly",
              "📅 Books appointments automatically",
              "💬 Qualifies leads 24/7",
            ].map((chip) => (
              <span
                key={chip}
                className="border border-accent/40 text-accent text-xs font-medium px-4 py-1.5 rounded-full"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* GHL Inline AI Demo */}
        <section className="max-w-4xl mx-auto px-6 md:px-16 pt-8 pb-4">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              Try the AI <span className="font-drama italic text-accent">Live</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Chat with a real AI receptionist demo right now.
            </p>
          </div>
          <GHLInlineWidget reserveSpace={shouldScrollToForm} />
        </section>

        {/* What's Included */}
        <section className="max-w-6xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              What's <span className="font-drama italic text-accent">Included</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-secondary/50 border border-border rounded-2xl p-6 hover:border-accent/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Info */}
        <section className="max-w-3xl mx-auto px-6 py-10">
          <div className="bg-secondary/50 border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-bold text-lg text-foreground">How Usage Works</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              After setup, usage is pay-as-you-go; you only pay for what your AI actually does. Unlimited plans
              available too. Ask the AI above or reach out directly.
            </p>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="max-w-2xl mx-auto px-6 py-10">
          <div className="border-t border-accent/40 mb-10" />
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">Let's Set Up Your AI</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tell us about your business so we can build your perfect AI receptionist.
            </p>
            <p className="text-accent text-sm font-medium mt-3">Takes 2–3 minutes. No payment required.</p>
          </div>

          <div className="bg-secondary/30 border border-border rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <User className="w-5 h-5 text-accent" />
              <h2 className="font-heading font-bold text-xl text-foreground">Your Details</h2>
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
                label="Business Website URL"
                optional
                placeholder="https://example.com"
                value={data.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
              />
              <FormInput
                label="What type of business are you?"
                placeholder="e.g. Dentist, HVAC, Law Firm"
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
                label="What are your business hours?"
                placeholder="e.g. Mon-Fri 9am-5pm"
                value={data.businessHours}
                onChange={(e) => update("businessHours", e.target.value)}
              />
              <FormTextarea
                label="What services do you offer?"
                placeholder="List the services your business provides"
                value={data.services}
                onChange={(e) => update("services", e.target.value)}
              />

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">What's your biggest problem?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {problemOptions.map((problem) => (
                    <CheckboxOption
                      key={problem}
                      label={problem}
                      checked={data.problems.includes(problem)}
                      onClick={() => toggleProblem(problem)}
                    />
                  ))}
                </div>
              </div>

              <FormTextarea
                label="What do you need the AI to accomplish?"
                placeholder="e.g. Answer common questions, qualify leads before booking, follow up with missed calls, book appointments automatically..."
                value={data.aiGoals}
                onChange={(e) => update("aiGoals", e.target.value)}
              />

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  How much do you want to invest?
                </label>
                <p className="text-muted-foreground text-xs mb-4">
                  Your budget determines the capabilities of your AI receptionist.
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
            <div className="flex justify-end mt-10">
              <button
                disabled={submitting || !data.phone.trim() || !data.email.trim() || isDisabledByCooldown}
                onClick={async () => {
                  const { allowed, reason } = checkCanSubmit();
                  if (!allowed) return;
                  if (!validateFields()) return;
                  setSubmitting(true);
                  try {
                    await submitForm("ai-receptionist", data);
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
                {submitting ? "Submitting..." : "Submit Form"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {(rateLimitMessage || cooldownMessage) && (
              <p className="text-muted-foreground text-xs mt-3 text-right">{rateLimitMessage || cooldownMessage}</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AiReceptionist;
