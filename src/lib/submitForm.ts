import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const CONTACT_REQUIRED_MESSAGE = "Please enter either a phone number or an email address.";
const INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";
const GENERIC_SUBMIT_MESSAGE = "Please try again or contact us directly.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactDetails(formData: Record<string, unknown>) {
  const phone = normalizeText(formData.phone);
  const email = normalizeText(formData.email);

  if (!phone && !email) {
    throw new Error(CONTACT_REQUIRED_MESSAGE);
  }

  if (email && !emailPattern.test(email)) {
    throw new Error(INVALID_EMAIL_MESSAGE);
  }
}

async function getHttpErrorMessage(error: FunctionsHttpError) {
  try {
    const payload = await error.context.clone().json();
    if (payload && typeof payload.error === "string" && payload.error.trim()) {
      return payload.error;
    }
  } catch {
    // Ignore JSON parsing issues and fall back to a generic message.
  }

  return GENERIC_SUBMIT_MESSAGE;
}

export function getSubmitFormErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return GENERIC_SUBMIT_MESSAGE;
}

export async function submitForm<T extends object>(formType: string, formData: T) {
  validateContactDetails(formData as Record<string, unknown>);

  const { data, error } = await supabase.functions.invoke("send-form-email", {
    body: { formType, formData },
  });

  if (error) {
    console.error("Form submission error:", error);

    if (error instanceof FunctionsHttpError) {
      throw new Error(await getHttpErrorMessage(error));
    }

    if (error instanceof FunctionsFetchError || error instanceof FunctionsRelayError) {
      throw new Error("We couldn't reach the form service. Please try again.");
    }

    throw new Error(GENERIC_SUBMIT_MESSAGE);
  }

  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
    throw new Error(data.error);
  }

  return data;
}
