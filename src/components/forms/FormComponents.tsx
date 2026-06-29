import { Check } from "lucide-react";

/* ─── VALIDATION HELPERS ─── */
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};

/* ─── STEP INDICATOR ─── */
export const StepIndicator = ({
  step,
  step1Label = "Your Information",
  step2Label = "Project Details",
}: {
  step: number;
  step1Label?: string;
  step2Label?: string;
}) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
          step >= 1
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-muted-foreground border border-border"
        }`}
      >
        {step > 1 ? <Check className="w-5 h-5" /> : "1"}
      </div>
      <span className="text-xs text-muted-foreground mt-2">{step1Label}</span>
    </div>
    <div
      className={`w-24 sm:w-40 h-0.5 mb-6 transition-colors ${
        step >= 2 ? "bg-accent" : "bg-border"
      }`}
    />
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
          step >= 2
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-muted-foreground border border-border"
        }`}
      >
        2
      </div>
      <span className="text-xs text-muted-foreground mt-2">{step2Label}</span>
    </div>
  </div>
);

/* ─── INPUT COMPONENT ─── */
export const FormInput = ({
  label,
  optional,
  prefix,
  error,
  ...props
}: {
  label: string;
  optional?: boolean;
  prefix?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-2">
      {label}
      {optional && <span className="text-muted-foreground font-normal ml-2">(optional)</span>}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          {prefix}
        </span>
      )}
      <input
        {...props}
        className={`w-full bg-secondary/60 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500/50 focus:border-red-500/50"
            : "border-border focus:ring-accent/50 focus:border-accent/50"
        } ${
          prefix ? "pl-10" : ""
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
  </div>
);

/* ─── TEXTAREA COMPONENT ─── */
export const FormTextarea = ({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
    <textarea
      {...props}
      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors min-h-[100px] resize-y"
    />
  </div>
);

/* ─── RADIO OPTION ─── */
export const RadioOption = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all ${
      selected
        ? "border-accent bg-accent/10 text-foreground"
        : "border-border bg-secondary/40 text-muted-foreground hover:border-muted-foreground/40"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          selected ? "border-accent" : "border-muted-foreground/40"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-accent" />}
      </div>
      {label}
    </div>
  </button>
);

/* ─── CHECKBOX OPTION ─── */
export const CheckboxOption = ({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left px-5 py-3.5 rounded-xl border text-sm transition-all ${
      checked
        ? "border-accent bg-accent/10 text-foreground"
        : "border-border bg-secondary/40 text-muted-foreground hover:border-muted-foreground/40"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
          checked ? "border-accent bg-accent" : "border-muted-foreground/40"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-accent-foreground" />}
      </div>
      {label}
    </div>
  </button>
);

/* ─── FORM SUBMITTED CONFIRMATION ─── */
export const FormSubmitted = ({ title = "Got it!", message }: { title?: string; message?: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center px-6">
    <div className="bg-secondary/30 border border-accent/30 rounded-3xl p-10 md:p-14 max-w-lg w-full text-center shadow-[0_0_40px_-10px_hsl(var(--accent)/0.2)]">
      <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-accent" />
      </div>
      <h1 className="font-heading font-bold text-3xl text-accent mb-5">{title}</h1>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {message || "We've received your details and will be reaching out shortly to discuss next steps."}
      </p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        In the meantime, feel free to reach out on Instagram{" "}
        <a
          href="https://www.instagram.com/gozie.okenu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          @gozie.okenu
        </a>{" "}
        if you have any questions.
      </p>
      <p className="text-accent italic text-sm">
        Looking forward to working with you,
        <br />
        — The Okenu Team
      </p>
    </div>
  </div>
);
