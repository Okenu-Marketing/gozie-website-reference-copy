import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_LOCATION_ID = "ZELODxuU9NhtYTb85ATh";
const GHL_API_VERSION = "2023-02-21";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OnboardingData = {
  fullName?: string;
  businessLegalName?: string;
  phone?: string;
  email?: string;
  address?: string;
  yearEstablished?: string;
  desiredDomain?: string;
  services?: string;
  serviceAreas?: string;
  primaryCity?: string;
  businessHours?: string;
  hasGBP?: string;
  hasWebsite?: string;
  websiteUrl?: string;
  ackUploads?: boolean;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const data = (body?.formData ?? {}) as OnboardingData;

    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    if (!email || !emailPattern.test(email)) throw new Error("Valid email is required.");
    if (!phone) throw new Error("Phone number is required.");

    const token = Deno.env.get("GHL_PRIVATE_INTEGRATION_TOKEN");
    if (!token) throw new Error("GHL_PRIVATE_INTEGRATION_TOKEN not configured");

    const fullName = String(data.fullName || "").trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(" ");

    const contactPayload = compact({
      locationId: GHL_LOCATION_ID,
      firstName: firstName || fullName || "Unknown",
      lastName,
      name: fullName,
      email,
      phone,
      companyName: String(data.businessLegalName || "").trim(),
      address1: String(data.address || "").trim(),
      city: String(data.primaryCity || "").trim(),
      website: String(data.websiteUrl || "").trim(),
      source: "Client Onboarding Form",
      tags: ["client-onboarding"],
      customFields: buildCustomFields(data),
    });

    const upsert = await ghlRequest(token, "https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      body: JSON.stringify(contactPayload),
    });

    if (!upsert.ok) {
      console.error("GHL upsert failed", upsert.status, upsert.result);
      throw new Error("Failed to save onboarding info");
    }

    const contactId = extractContactId(upsert.result);

    return new Response(JSON.stringify({ success: true, contactId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function buildCustomFields(d: OnboardingData): Array<{ key: string; field_value: string }> {
  const map: Array<[string, string | undefined]> = [
    ["business_phone_number", d.phone],
    ["business_email", d.email],
    ["business_or_home_address", d.address],
    ["year_established", d.yearEstablished],
    ["desired_website_domain", d.desiredDomain],
    ["full_list_of_services", d.services],
    ["service_areas", d.serviceAreas],
    ["primary_city_to_rank_in", d.primaryCity],
    ["business_hours", d.businessHours],
    ["do_you_have_an_existing_google_business_profile", d.hasGBP],
    ["do_you_have_an_existing_website", d.hasWebsite],
    ["existing_website_link", d.websiteUrl],
  ];

  return map
    .map(([key, value]) => ({ key, field_value: String(value ?? "").trim() }))
    .filter((f) => f.field_value !== "");
}

async function ghlRequest(token: string, url: string, init: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let result: unknown = {};
  try { result = text ? JSON.parse(text) : {}; } catch { result = { raw: text }; }
  return { ok: res.ok, status: res.status, result };
}

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined && v !== ""),
  ) as Partial<T>;
}

function extractContactId(result: unknown): string | undefined {
  if (!result || typeof result !== "object") return undefined;
  const p = result as Record<string, unknown>;
  const contact = p.contact;
  if (contact && typeof contact === "object" && "id" in contact) {
    const id = (contact as Record<string, unknown>).id;
    if (typeof id === "string") return id;
  }
  return typeof p.id === "string" ? p.id : undefined;
}
