import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TESTING_RECIPIENT = "test@example.com";
const TESTING_FROM = "Reference Copy <test@example.com>";
const VALID_FORM_TYPES = new Set(["website", "local-seo", "ai-receptionist", "partial-lead", "funnel-lead"]);
const GHL_LOCATION_ID = "YOUR_GHL_LOCATION_ID_HERE";
const GHL_API_VERSION = "2023-02-21";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, formData } = parseSubmission(await req.json());

    // Send Resend notification for all forms except funnel-lead (/start)
    let emailId: string | undefined;
    if (formType !== "funnel-lead") {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (!RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
      }

      const subject = formType === "partial-lead" && typeof formData._subject === "string" ? formData._subject : getSubject(formType, formData);
      const html = formType === "partial-lead" && typeof formData._html === "string" ? formData._html : buildEmailHtml(formType, formData);
      const from = formType === "partial-lead" ? "noreply@example.com" : TESTING_FROM;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [TESTING_RECIPIENT],
          subject,
          html,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Resend error:", result);
        return new Response(JSON.stringify({ error: result?.message || "Failed to send email", details: result }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      emailId = result.id;
    }

    // Push funnel leads to GoHighLevel (non-blocking — never fail the form)
    if (formType === "funnel-lead") {
      try {
        await pushToGHL(formData);
      } catch (e) {
        console.error("GHL push failed:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, id: emailId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseSubmission(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Invalid request body");
  }

  const { formType, formData } = payload as {
    formType?: unknown;
    formData?: unknown;
  };

  if (typeof formType !== "string" || !VALID_FORM_TYPES.has(formType)) {
    throw new Error("Invalid form type");
  }

  if (!formData || typeof formData !== "object" || Array.isArray(formData)) {
    throw new Error("formData must be an object");
  }

  const phone = normalizeText((formData as Record<string, unknown>).phone);
  const email = normalizeText((formData as Record<string, unknown>).email);

  if (!phone && !email) {
    throw new Error("Please enter either a phone number or an email address.");
  }

  if (email && !emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  return {
    formType,
    formData: formData as Record<string, unknown>,
  };
}

function getSubject(formType: string, data: any): string {
  const name = data.fullName || data.businessName || "Unknown";
  switch (formType) {
    case "website":
      return `🌐 New Website Inquiry — ${name}`;
    case "local-seo":
      return `📍 New Local SEO Inquiry — ${name}`;
    case "ai-receptionist":
      return `🤖 New AI Receptionist Inquiry — ${name}`;
    case "funnel-lead":
      return `🚀 New Funnel Lead (/start) — ${name}`;
    default:
      return `New Form Submission — ${name}`;
  }
}

async function pushToGHL(data: Record<string, unknown>) {
  const token = Deno.env.get("GHL_PRIVATE_INTEGRATION_TOKEN");
  if (!token) {
    console.warn("GHL_PRIVATE_INTEGRATION_TOKEN not set; skipping GHL push");
    return;
  }

  const fullName = String(data.fullName || "").trim();
  const [firstName, ...rest] = fullName.split(/\s+/);
  const lastName = rest.join(" ");
  const serviceInterest = String(data.serviceInterest || "");
  const challenge = String(data.challenge || "");
  const businessName = String(data.businessName || "");

  const contactPayload = compact({
    locationId: GHL_LOCATION_ID,
    firstName: firstName || fullName || "Unknown",
    lastName,
    name: fullName,
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    companyName: businessName,
    source: "Funnel /start",
    tags: ["funnel-start", serviceInterest ? `interest:${serviceInterest}` : ""].filter(Boolean),
    customFields: challenge
      ? [{ key: "contact.notes", field_value: `Biggest challenge: ${challenge}` }]
      : undefined,
  });

  const { ok, status, result } = await ghlRequest(token, "https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(contactPayload),
  });

  if (!ok) {
    console.error("GHL contact upsert failed:", status, JSON.stringify(result));
    return;
  }

  console.log("GHL contact upserted");

  // Post the challenge as a Note on the contact (separate endpoint)
  const contactId = extractContactId(result);
  if (challenge && contactId) {
    const note = await ghlRequest(token, `https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      body: JSON.stringify({ body: `Biggest challenge: ${challenge}` }),
    });
    if (!note.ok) {
      console.error("GHL note create failed:", note.status, JSON.stringify(note.result));
    } else {
      console.log("GHL note added");
    }
  }
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
  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    result = { raw: text };
  }
  return { ok: res.ok, status: res.status, result };
}

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== "")) as Partial<T>;
}

function extractContactId(result: unknown): string | undefined {
  if (!result || typeof result !== "object") return undefined;
  const payload = result as Record<string, unknown>;
  const contact = payload.contact;
  if (contact && typeof contact === "object" && "id" in contact && typeof (contact as Record<string, unknown>).id === "string") {
    return (contact as Record<string, string>).id;
  }
  return typeof payload.id === "string" ? payload.id : undefined;
}

function buildEmailHtml(formType: string, data: any): string {
  const rows = Object.entries(data)
    .filter(([_, v]) => v !== "" && v !== false && !(Array.isArray(v) && v.length === 0))
    .map(([key, value]) => {
      const label = escapeHtml(key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()));
      const displayValue = escapeHtml(Array.isArray(value) ? value.join(", ") : String(value));
      return `
        <tr>
          <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:40%;vertical-align:top;">${label}</td>
          <td style="padding:10px 12px;color:#1f2937;border-bottom:1px solid #e5e7eb;">${displayValue}</td>
        </tr>`;
    })
    .join("");

  const typeLabel =
    formType === "website"
      ? "Website"
      : formType === "local-seo"
        ? "Local SEO"
        : formType === "ai-receptionist"
          ? "AI Receptionist"
          : formType === "funnel-lead"
            ? "Funnel Lead"
            : formType;

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#111827;padding:24px 28px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;">New ${typeLabel} Submission</h1>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows}
        </table>
      </div>
      <div style="background:#f9fafb;padding:16px 28px;text-align:center;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">Sent from okenumarketing.com</p>
      </div>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
