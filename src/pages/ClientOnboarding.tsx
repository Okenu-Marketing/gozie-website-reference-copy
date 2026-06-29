import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const initial = {
  fullName: "",
  businessLegalName: "",
  phone: "",
  email: "",
  address: "",
  state: "",
  yearEstablished: "",
  desiredDomain: "",
  services: "",
  serviceAreas: "",
  primaryCity: "",
  businessHours: "",
  hasGBP: "",
  hasWebsite: "",
  websiteUrl: "",
  ackUploads: false,
};

const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim()) && email.trim().length <= 255;

const ClientOnboarding = () => {
  const [data, setData] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const {
    honeypotValue,
    setHoneypotValue,
    checkCanSubmit,
    recordSubmission,
    rateLimitMessage,
    cooldownMessage,
    isDisabledByCooldown,
  } = useSpamProtection("client-onboarding");

  const update = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) => setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    const requiredStrings: (keyof typeof initial)[] = [
      "fullName",
      "businessLegalName",
      "phone",
      "email",
      "address",
      "state",
      "yearEstablished",
      "desiredDomain",
      "services",
      "serviceAreas",
      "primaryCity",
      "businessHours",
      "hasGBP",
      "hasWebsite",
    ];
    requiredStrings.forEach((k) => {
      if (!String(data[k]).trim()) e[k] = "Required";
    });
    if (data.email && !isValidEmail(data.email)) e.email = "Enter a valid email address";
    if (data.hasWebsite === "yes" && !data.websiteUrl.trim()) e.websiteUrl = "Required";
    if (!data.ackUploads) e.ackUploads = "Please acknowledge to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({ title: "Missing info", description: "Please complete all required fields.", variant: "destructive" });
      return;
    }
    const gate = checkCanSubmit();
    if (!gate.allowed) {
      if (gate.reason) toast({ title: "Hold on", description: gate.reason });
      return;
    }
    setSubmitting(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("ghl-onboarding", {
        body: { formData: data },
      });
      if (error) throw error;
      if (res && typeof res === "object" && "error" in res && typeof (res as any).error === "string") {
        throw new Error((res as any).error);
      }
      recordSubmission();
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory relative overflow-hidden">
      <SEO
        title="Client Onboarding — Gozie Okenu"
        description="Complete your onboarding so we can begin your build right away."
        path="/client-onboarding"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--champagne) / 0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 110%, hsl(var(--champagne) / 0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--ivory)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--ivory)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="h-8" />

      <section className="relative z-10 px-6 pt-12 md:pt-20 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left column */}
          <div className="md:col-span-5 md:sticky md:top-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6 flex items-center gap-3"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-champagne pulse-dot" />
              Onboarding
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-drama text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ivory"
            >
              Client onboarding <span className="italic text-champagne">form.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-ivory/60 mt-8 leading-relaxed max-w-md"
            >
              Fill this out completely so we can get started on your build right away.
            </motion.p>
          </div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-7"
          >
            {submitted ? (
              <div className="relative p-12 md:p-16 rounded-[2rem] border border-champagne/30 bg-ivory/[0.02] backdrop-blur-sm text-center overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, hsl(var(--champagne) / 0.25), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-champagne/40 bg-champagne/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-champagne" />
                  </div>
                  <h3 className="font-drama text-4xl md:text-5xl mb-4 text-ivory">Onboarding received.</h3>
                  <p className="text-ivory/60 mb-2 max-w-md mx-auto">
                    Check your email, we'll send a Google Drive link shortly so you can upload your project photos,
                    logo, and team photos.
                  </p>
                  <p className="text-ivory/40 text-sm">- Gozie</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="relative rounded-[2rem] border border-ivory/10 bg-ivory/[0.02] backdrop-blur-sm p-8 md:p-12 space-y-7"
              >
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  aria-hidden="true"
                />

                <div className="flex items-baseline justify-between pb-2 border-b border-ivory/10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">Onboarding</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 font-mono-data">
                    Complete all fields
                  </span>
                </div>

                <MinimalInput
                  label="Full Name"
                  required
                  placeholder="e.g. Jane Smith"
                  value={data.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  error={errors.fullName}
                />

                <MinimalInput
                  label="Business Legal Name"
                  required
                  placeholder="e.g. Smith Plumbing LLC"
                  hint="Exactly as it appears on legal documents."
                  value={data.businessLegalName}
                  onChange={(e) => update("businessLegalName", e.target.value)}
                  error={errors.businessLegalName}
                />

                <MinimalInput
                  label="BUSINESS PHONE NUMBER"
                  required
                  type="tel"
                  placeholder="e.g. 555-123-4567"
                  hint="The number customers call. (If you don't have a dedicated business line yet, just use your personal cell)."
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  error={errors.phone}
                />

                <MinimalInput
                  label="BUSINESS EMAIL"
                  required
                  type="email"
                  placeholder="e.g. contact@yourbusiness.com"
                  hint="If you don't have a business email yet, use your personal email."
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                />

                <MinimalInput
                  label="Business or Home Address"
                  required
                  placeholder="Street, City, ZIP"
                  hint="Used for Google Business Profile setup only, home address not shown publicly."
                  value={data.address}
                  onChange={(e) => update("address", e.target.value)}
                  error={errors.address}
                />

                <MinimalInput
                  label="State"
                  required
                  placeholder="e.g. Texas"
                  value={data.state}
                  onChange={(e) => update("state", e.target.value)}
                  error={errors.state}
                />

                <MinimalInput
                  label="Year Established"
                  required
                  placeholder="e.g. 2014"
                  inputMode="numeric"
                  maxLength={4}
                  value={data.yearEstablished}
                  onChange={(e) => update("yearEstablished", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  error={errors.yearEstablished}
                />

                <MinimalInput
                  label="Desired Website Domain"
                  required
                  placeholder="e.g. smithplumbing.com"
                  hint="What do you want your website address to be?"
                  value={data.desiredDomain}
                  onChange={(e) => update("desiredDomain", e.target.value)}
                  error={errors.desiredDomain}
                />

                <MinimalTextarea
                  label="Full List of Services"
                  required
                  placeholder="e.g. Drain cleaning, water heater installation, leak repair, sewer line replacement, fixture installation…"
                  hint="Please include every service you offer, be thorough."
                  value={data.services}
                  onChange={(e) => update("services", e.target.value)}
                  error={errors.services}
                />

                <MinimalTextarea
                  label="Service Areas"
                  required
                  placeholder="e.g. Austin 78701, Round Rock 78664, Cedar Park 78613, Pflugerville 78660…"
                  hint="All cities and zip codes you serve."
                  value={data.serviceAreas}
                  onChange={(e) => update("serviceAreas", e.target.value)}
                  error={errors.serviceAreas}
                />

                <MinimalInput
                  label="Primary City to Rank In"
                  required
                  placeholder="e.g. Austin"
                  hint="If you serve multiple areas, which city matters most?"
                  value={data.primaryCity}
                  onChange={(e) => update("primaryCity", e.target.value)}
                  error={errors.primaryCity}
                />

                <MinimalInput
                  label="Business Hours"
                  required
                  placeholder="e.g. Mon–Fri 8am–6pm, Sat 9am–2pm"
                  value={data.businessHours}
                  onChange={(e) => update("businessHours", e.target.value)}
                  error={errors.businessHours}
                />

                <MinimalSelect
                  label="Do you have an existing Google Business Profile?"
                  required
                  value={data.hasGBP}
                  onChange={(e) => update("hasGBP", e.target.value)}
                  error={errors.hasGBP}
                />

                <MinimalSelect
                  label="Do you have an existing website?"
                  required
                  value={data.hasWebsite}
                  onChange={(e) => update("hasWebsite", e.target.value)}
                  error={errors.hasWebsite}
                />

                {data.hasWebsite === "yes" && (
                  <MinimalInput
                    label="Website URL"
                    required
                    placeholder="https://yourbusiness.com"
                    hint="Paste your existing website URL."
                    value={data.websiteUrl}
                    onChange={(e) => update("websiteUrl", e.target.value)}
                    error={errors.websiteUrl}
                  />
                )}

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <span className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={data.ackUploads}
                        onChange={(e) => update("ackUploads", e.target.checked)}
                        className="peer sr-only"
                      />
                      <span className="block w-4 h-4 rounded-sm border border-ivory/30 peer-checked:bg-champagne peer-checked:border-champagne transition-colors" />
                      {data.ackUploads && (
                        <Check className="absolute inset-0 w-4 h-4 text-obsidian pointer-events-none" strokeWidth={3} />
                      )}
                    </span>
                    <span className="text-xs text-ivory/60 leading-relaxed">
                      I understand I need to upload any photos, logos, or branding materials I have to the Google Drive
                      link I'll receive after submitting this form.
                    </span>
                  </label>
                  {errors.ackUploads && <p className="text-xs text-destructive mt-2 ml-7">{errors.ackUploads}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting || isDisabledByCooldown}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-champagne text-obsidian text-sm font-semibold tracking-wide hover:bg-champagne/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting…" : "Submit"}
                    {!submitting && (
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </button>
                  <p className="text-xs text-center text-ivory/50 mt-4 leading-relaxed">
                    Once submitted, we'll send you a Google Drive link to upload your project photos, logo, and team
                    photos.
                  </p>
                  {(rateLimitMessage || cooldownMessage) && (
                    <p className="text-xs text-center text-ivory/40 mt-3">{rateLimitMessage || cooldownMessage}</p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-10 text-center text-xs text-ivory/30 tracking-wide">
        © {new Date().getFullYear()} Gozie Okenu
      </footer>
    </div>
  );
};

const MinimalInput = ({
  label,
  error,
  hint,
  ...props
}: { label: string; error?: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">
      {label}
      {props.required && <span className="text-champagne ml-1">*</span>}
    </label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors"
    />
    {hint && !error && <p className="text-[11px] text-ivory/35 mt-2">{hint}</p>}
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

const MinimalTextarea = ({
  label,
  error,
  hint,
  ...props
}: { label: string; error?: string; hint?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">
      {label}
      {props.required && <span className="text-champagne ml-1">*</span>}
    </label>
    <textarea
      rows={3}
      {...props}
      className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors resize-none"
    />
    {hint && !error && <p className="text-[11px] text-ivory/35 mt-2">{hint}</p>}
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

const MinimalSelect = ({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">
      {label}
      {props.required && <span className="text-champagne ml-1">*</span>}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 pr-8 text-ivory transition-colors cursor-pointer"
      >
        <option value="" className="bg-obsidian text-ivory">
          Select…
        </option>
        <option value="yes" className="bg-obsidian text-ivory">
          Yes
        </option>
        <option value="no" className="bg-obsidian text-ivory">
          No
        </option>
      </select>
      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-ivory/40 pointer-events-none" />
    </div>
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

export default ClientOnboarding;
