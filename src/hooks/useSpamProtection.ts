import { useState, useEffect, useCallback, useRef } from "react";

export function useSpamProtection(formKey: string) {
  const [honeypotValue, setHoneypotValue] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // On mount, check if there's an active cooldown from a previous submission
  useEffect(() => {
    const last = localStorage.getItem(`lastSubmit_${formKey}`);
    if (last) {
      const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
      if (elapsed < 60) {
        setCooldown(60 - elapsed);
      }
    }
  }, [formKey]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setRateLimited(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  const checkCanSubmit = useCallback((): { allowed: boolean; reason?: string } => {
    // Honeypot check — silent block
    if (honeypotValue) return { allowed: false };

    // Rate limit check
    const last = localStorage.getItem(`lastSubmit_${formKey}`);
    if (last) {
      const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
      if (elapsed < 60) {
        setRateLimited(true);
        setCooldown(60 - elapsed);
        return { allowed: false, reason: "Please wait before submitting again." };
      }
    }

    return { allowed: true };
  }, [honeypotValue, formKey]);

  const recordSubmission = useCallback(() => {
    localStorage.setItem(`lastSubmit_${formKey}`, String(Date.now()));
    setCooldown(60);
  }, [formKey]);

  const rateLimitMessage = rateLimited && cooldown > 0 ? "Please wait before submitting again." : "";
  const cooldownMessage = cooldown > 0 && !rateLimited ? `Submitted! You can submit again in ${cooldown}s` : "";
  const isDisabledByCooldown = cooldown > 0;

  return {
    honeypotValue,
    setHoneypotValue,
    checkCanSubmit,
    recordSubmission,
    rateLimitMessage,
    cooldownMessage,
    isDisabledByCooldown,
  };
}
