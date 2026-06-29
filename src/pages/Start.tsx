import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { getSubmitFormErrorMessage, submitForm } from "@/lib/submitForm";
import { useToast } from "@/hooks/use-toast";

/* ── COUNTRY CODES ── */
const COUNTRIES = [
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+1", label: "CA", flag: "🇨🇦" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+234", label: "NG", flag: "🇳🇬" },
  { code: "+27", label: "ZA", flag: "🇿🇦" },
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+52", label: "MX", flag: "🇲🇽" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
];

const initial = {
  fullName: "",
  countryIdx: 0, // US default
  areaCode: "",
  phoneNumber: "",
  email: "",
  businessName: "",
  challenge: "",
};

/* ── VALIDATION ── */
// RFC-leaning email check: local@domain.tld, no spaces, TLD ≥ 2 chars
const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim()) &&
  email.trim().length <= 255;

const isValidAreaCode = (s: string) => /^\d{3}$/.test(s);
// 7 digits for US (NNN-NNNN); 6-12 for international flexibility
const isValidLocalNumber = (s: string, isUS: boolean) =>
  isUS ? /^\d{7}$/.test(s) : /^\d{6,12}$/.test(s);


const Start = () => {
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
  } = useSpamProtection("funnel-lead");

  const areaRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const country = COUNTRIES[data.countryIdx];
  const isUS = country.label === "US" || country.label === "CA";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = "Required";

    if (!data.areaCode) e.areaCode = "Required";
    else if (!isValidAreaCode(data.areaCode)) e.areaCode = "3 digits";

    if (!data.phoneNumber) e.phoneNumber = "Required";
    else if (!isValidLocalNumber(data.phoneNumber, isUS))
      e.phoneNumber = isUS ? "7 digits" : "6–12 digits";

    if (!data.email.trim() || !isValidEmail(data.email))
      e.email = "Enter a valid email address";
    if (!data.businessName.trim()) e.businessName = "Required";
    if (!data.challenge.trim()) e.challenge = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const gate = checkCanSubmit();
    if (!gate.allowed) {
      if (gate.reason) toast({ title: "Hold on", description: gate.reason });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        fullName: data.fullName,
        phone: `${country.code} (${data.areaCode}) ${data.phoneNumber}`,
        email: data.email,
        businessName: data.businessName,
        challenge: data.challenge,
      };
      await submitForm("funnel-lead", payload);
      recordSubmission();
      setSubmitted(true);

    } catch (err) {
      toast({
        title: "Submission failed",
        description: getSubmitFormErrorMessage(err),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory relative overflow-hidden">
      <SEO
        title="Apply to Work With Gozie — Website & Growth System"
        description="A short application to see if your business is a fit. Confidential. Reviewed within 24 hours."
        path="/start"
      />

      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--champagne) / 0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 110%, hsl(var(--champagne) / 0.08), transparent 60%)",
        }}
      />
      {/* Subtle grid */}
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
          {/* Left column — editorial intro */}
          <div className="md:col-span-5 md:sticky md:top-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6 flex items-center gap-3"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-champagne pulse-dot" />
              Now booking · Q2 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-drama text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ivory"
            >
              Apply to
              <br />
              work with <span className="italic text-champagne">me.</span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-ivory/60 mt-8 leading-relaxed max-w-md"
            >
              I take on a handful of partnerships each quarter. Tell me about
              your business and I'll personally review it within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 space-y-4 border-t border-ivory/10 pt-8"
            >
              {[
                "Personally reviewed within 24 hours",
                "Confidential, never shared",
                "No obligation to move forward",

              ].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm text-ivory/70">
                  <span className="mt-1.5 block w-1 h-1 rotate-45 bg-champagne shrink-0" />
                  {t}
                </div>
              ))}
            </motion.div>
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
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(var(--champagne) / 0.25), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-champagne/40 bg-champagne/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-champagne" />
                  </div>
                  <h3 className="font-drama text-4xl md:text-5xl mb-4 text-ivory">
                    Application received.
                  </h3>
                  <p className="text-ivory/60 mb-2 max-w-md mx-auto">
                    I'll personally review and reach out within 24 hours.
                  </p>
                  <p className="text-ivory/40 text-sm">
                    — Gozie
                  </p>
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
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-baseline justify-between pb-2 border-b border-ivory/10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                    Application
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 font-mono-data">
                    5 fields · ~60 sec
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
                {/* Phone — split into country, area, number */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">
                    Phone / WhatsApp <span className="text-champagne ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-[auto_1fr_2fr] gap-2 md:gap-3 items-stretch">
                    {/* Country */}
                    <div className="relative">
                      <select
                        value={data.countryIdx}
                        onChange={(e) => update("countryIdx", Number(e.target.value))}
                        className="appearance-none bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 pr-7 pl-1 text-ivory text-sm transition-colors cursor-pointer"
                        aria-label="Country code"
                      >
                        {COUNTRIES.map((c, i) => (
                          <option key={`${c.label}-${c.code}`} value={i} className="bg-obsidian text-ivory">
                            {c.flag} {c.label} {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-ivory/40 pointer-events-none" />
                    </div>
                    {/* Area code */}
                    <input
                      ref={areaRef}
                      type="text"
                      required
                      inputMode="numeric"
                      autoComplete="tel-area-code"
                      maxLength={3}
                      placeholder="555"
                      value={data.areaCode}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                        update("areaCode", v);
                        if (v.length === 3) numberRef.current?.focus();
                      }}
                      className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors text-center tracking-widest"
                      aria-label="Area code"
                    />
                    {/* Number */}
                    <input
                      ref={numberRef}
                      type="text"
                      required
                      inputMode="numeric"
                      autoComplete="tel-local"
                      maxLength={isUS ? 7 : 12}
                      placeholder={isUS ? "1234567" : "Number"}
                      value={data.phoneNumber}
                      onChange={(e) =>
                        update("phoneNumber", e.target.value.replace(/\D/g, "").slice(0, isUS ? 7 : 12))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !data.phoneNumber) areaRef.current?.focus();
                      }}
                      className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors tracking-wider"
                      aria-label="Phone number"
                    />
                  </div>
                  {(errors.areaCode || errors.phoneNumber) && (
                    <p className="text-xs text-destructive mt-2">
                      {errors.areaCode && `Area code: ${errors.areaCode}`}
                      {errors.areaCode && errors.phoneNumber && " · "}
                      {errors.phoneNumber && `Number: ${errors.phoneNumber}`}
                    </p>
                  )}
                  <p className="text-[11px] text-ivory/35 mt-2">
                    Area code required. Format: {country.code} ({isUS ? "NNN" : "Area"}) {isUS ? "NNN-NNNN" : "Number"}
                  </p>
                </div>

                <MinimalInput
                  label="Email"
                  type="email"
                  required
                  placeholder="e.g. jane@yourbusiness.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                />
                <MinimalInput
                  label="Business Name"
                  required
                  placeholder="e.g. Smith Plumbing Co."
                  value={data.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  error={errors.businessName}
                />

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-3">
                    Biggest challenge right now <span className="text-champagne ml-1">*</span>
                  </label>
                  <textarea
                    rows={1}
                    required
                    value={data.challenge}
                    onChange={(e) => update("challenge", e.target.value)}
                    className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors resize-none"
                    placeholder="e.g. Phone barely rings, no website yet, invisible on Google, etc."
                  />
                  {errors.challenge && (
                    <p className="text-xs text-destructive mt-2">{errors.challenge}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting || isDisabledByCooldown}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-champagne text-obsidian text-sm font-semibold tracking-wide hover:bg-champagne/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Submit Application"}
                    {!submitting && (
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </button>
                  {(rateLimitMessage || cooldownMessage) && (
                    <p className="text-xs text-center text-ivory/40 mt-4">
                      {rateLimitMessage || cooldownMessage}
                    </p>
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
}: {
  label: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">
      {label}
      {props.required && <span className="text-champagne ml-1">*</span>}
    </label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-ivory/15 focus:border-champagne outline-none py-2 text-ivory placeholder:text-ivory/25 transition-colors"
    />
    {hint && !error && (
      <p className="text-[11px] text-ivory/35 mt-2">{hint}</p>
    )}
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

export default Start;
